import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase';
import { syncUserToDatabase } from '@/lib/auth-sync';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const dbUser = await syncUserToDatabase(userId);
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const { error } = await createAdminClient()
      .from('emails')
      .delete()
      .eq('id', id)
      .eq('user_id', dbUser.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete email:', error);
    return NextResponse.json({ error: 'Failed to delete email' }, { status: 500 });
  }
}
