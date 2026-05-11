import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import * as Sentry from '@sentry/nextjs';
import { buildEmailPrompt, generateEmail } from '@/lib/claude';
import { createAdminClient } from '@/lib/supabase';
import { syncUserToDatabase, resetUsageIfNeeded } from '@/lib/auth-sync';
import { PLANS } from '@/config/plans';
import { rateLimiters, rateLimitExceeded } from '@/lib/ratelimit';
import type { GenerateEmailRequest } from '@/types';

// AI generation with multi-model fallback can take up to ~30 s.
// 60 s gives headroom; requires Vercel Pro (Hobby cap is 10 s).
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { success: rlSuccess, limit: rlLimit, reset: rlReset } = await rateLimiters.generateEmail.limit(userId);
    if (!rlSuccess) return rateLimitExceeded(rlLimit, rlReset);

    const body: GenerateEmailRequest = await req.json();

    if (!body.prospectName || !body.prospectCompany || !body.senderName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sync user and roll over counters if a new month has started
    const rawUser = await syncUserToDatabase(userId);
    if (!rawUser) {
      return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
    }
    const dbUser = await resetUsageIfNeeded(rawUser);

    const plan = dbUser.plan as keyof typeof PLANS;
    const limit = PLANS[plan]?.emailsPerMonth || 10;

    const adminClient = createAdminClient();

    // Atomically claim one email slot. The UPDATE only fires when
    // emails_generated < limit, so concurrent requests cannot both
    // read the same count and bypass the cap.
    const { data: claimed, error: rpcError } = await adminClient.rpc(
      'increment_emails_if_below_limit',
      { p_user_id: dbUser.id, p_limit: limit }
    );
    if (rpcError) throw rpcError;
    if (!claimed) {
      return NextResponse.json(
        { error: 'Monthly email limit reached. Please upgrade your plan.' },
        { status: 403 }
      );
    }

    // Fetch template if provided
    let templatePrompt = null;
    if (body.templateId) {
      const { data: template } = await adminClient
        .from('templates')
        .select('prompt_template')
        .eq('id', body.templateId)
        .single();
      if (template) templatePrompt = template.prompt_template;
    }

    // Generate — slot already claimed; a failure here costs one slot
    const prompt = buildEmailPrompt(body, null, templatePrompt);
    let result;
    try {
      result = await generateEmail(prompt, body.model);
    } catch (apiError: any) {
      console.error('OpenRouter API Error:', apiError);
      if (apiError?.status === 429) {
        return NextResponse.json(
          { error: 'All free AI models are rate-limited right now. Please wait 60 seconds and try again.' },
          { status: 429 }
        );
      }
      if (apiError?.status === 503) {
        return NextResponse.json(
          { error: 'All AI models are temporarily unavailable. Please try again in a minute.' },
          { status: 503 }
        );
      }
      Sentry.captureException(apiError, { tags: { route: 'generate-email', phase: 'ai-generation' } });
      return NextResponse.json(
        { error: apiError instanceof Error ? apiError.message : 'AI generation failed. Please try again.' },
        { status: 500 }
      );
    }

    // Persist email record and usage log (increment already handled by RPC above)
    const { error: insertError } = await adminClient
      .from('emails')
      .insert({
        user_id: dbUser.id,
        prospect_name: body.prospectName,
        prospect_company: body.prospectCompany,
        prospect_role: body.prospectRole || '',
        prospect_website: body.prospectWebsite || null,
        scraped_context: body.additionalContext || null,
        tone: body.tone || 'professional',
        subject_line: result.subjectLine,
        email_body: result.emailBody,
        score: result.score,
      });

    if (insertError) {
      console.error('Failed to save email to DB:', insertError);
    } else {
      await adminClient
        .from('usage_logs')
        .insert({ user_id: dbUser.id, action: 'email_generated' });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Email generation error:', error);
    Sentry.captureException(error, { tags: { route: 'generate-email' } });
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}
