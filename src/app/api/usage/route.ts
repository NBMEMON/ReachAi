import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { syncUserToDatabase, resetUsageIfNeeded } from '@/lib/auth-sync';
import { PLANS } from '@/config/plans';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawUser = await syncUserToDatabase(userId);
    if (!rawUser) {
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }
    const dbUser = await resetUsageIfNeeded(rawUser);

    const plan = dbUser.plan as keyof typeof PLANS;
    const planDetails = PLANS[plan];

    return NextResponse.json({
      emailsGenerated: dbUser.emails_generated,
      emailsLimit: planDetails?.emailsPerMonth || 10,
      scrapesUsed: dbUser.scrapes_used,
      scrapesLimit: planDetails?.scrapesPerMonth || 5,
      currentPlan: plan,
      resetDate: dbUser.usage_reset_date,
    });
  } catch (error) {
    console.error('Usage fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 });
  }
}
