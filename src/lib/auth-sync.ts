import { createAdminClient } from './supabase';
import { clerkClient } from '@clerk/nextjs/server';

const USER_FIELDS = 'id, plan, emails_generated, scrapes_used, usage_reset_date';

export type DbUser = {
  id: string;
  plan: string;
  emails_generated: number;
  scrapes_used: number;
  usage_reset_date: string;
};

export async function syncUserToDatabase(userId: string): Promise<DbUser | null> {
  try {
    const adminClient = createAdminClient();

    const { data: existingUser, error: selectError } = await adminClient
      .from('users')
      .select(USER_FIELDS)
      .eq('clerk_id', userId)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('DB select error:', selectError.code, selectError.message);
    }

    if (existingUser) {
      return existingUser as DbUser;
    }

    // Fetch user details from Clerk
    console.log('User not found in DB, fetching from Clerk for:', userId);
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    const email = clerkUser.emailAddresses[0]?.emailAddress || '';
    const name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim();

    const nextResetDate = firstOfNextMonth();

    const { data: newUser, error } = await adminClient
      .from('users')
      .insert({
        clerk_id: userId,
        email,
        name: name || null,
        plan: 'free',
        emails_generated: 0,
        scrapes_used: 0,
        usage_reset_date: nextResetDate,
      })
      .select(USER_FIELDS)
      .single();

    if (error) {
      console.error('Error creating user in Supabase:', error);
      throw error;
    }

    return newUser as DbUser;
  } catch (error) {
    console.error('Auth sync error:', error);
    return null;
  }
}

/**
 * If the stored reset date is in the past, zeroes out email and scrape counters
 * and advances the reset date to the first of next month.
 * Returns the user record with current (possibly just-reset) counts.
 */
export async function resetUsageIfNeeded(dbUser: DbUser): Promise<DbUser> {
  const now = new Date();
  const resetDate = new Date(dbUser.usage_reset_date);

  if (now < resetDate) {
    return dbUser;
  }

  const nextResetDate = firstOfNextMonth();
  const adminClient = createAdminClient();

  const { data: updated } = await adminClient
    .from('users')
    .update({
      emails_generated: 0,
      scrapes_used: 0,
      usage_reset_date: nextResetDate,
    })
    .eq('id', dbUser.id)
    .select(USER_FIELDS)
    .single();

  return (updated as DbUser) ?? {
    ...dbUser,
    emails_generated: 0,
    scrapes_used: 0,
    usage_reset_date: nextResetDate,
  };
}

function firstOfNextMonth(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).toISOString();
}
