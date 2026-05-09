import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { summarizeScrapedContent } from '@/lib/claude';
import { syncUserToDatabase, resetUsageIfNeeded } from '@/lib/auth-sync';
import { createAdminClient } from '@/lib/supabase';
import { PLANS } from '@/config/plans';
import * as cheerio from 'cheerio';

// External HTTP fetch (10 s timeout) + AI summarization can exceed 10 s.
// 60 s gives headroom; requires Vercel Pro (Hobby cap is 10 s).
export const maxDuration = 60;

const RESPONSE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

function isPrivateHost(hostname: string): boolean {
  // Reject localhost and common loopback names
  if (hostname === 'localhost' || hostname === '::1') return true;

  // Reject IPv6 loopback / link-local
  if (hostname.startsWith('[')) return true;

  const parts = hostname.split('.').map(Number);
  if (parts.length !== 4 || parts.some(isNaN)) return false;
  const [a, b] = parts;

  return (
    a === 10 ||                        // 10.0.0.0/8
    a === 127 ||                       // 127.0.0.0/8
    (a === 172 && b >= 16 && b <= 31) || // 172.16.0.0/12
    (a === 192 && b === 168) ||        // 192.168.0.0/16
    (a === 169 && b === 254)           // 169.254.0.0/16 (link-local / cloud metadata)
  );
}

function validateUrl(raw: string): { valid: false; error: string } | { valid: true; parsed: URL } {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { valid: false, error: 'Only HTTP and HTTPS URLs are allowed' };
  }

  if (isPrivateHost(parsed.hostname)) {
    return { valid: false, error: 'URL resolves to a private or reserved address' };
  }

  return { valid: true, parsed };
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Sync user, reset monthly counters if needed, then check limits
    const rawUser = await syncUserToDatabase(userId);
    if (!rawUser) {
      return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
    }
    const dbUser = await resetUsageIfNeeded(rawUser);

    const plan = dbUser.plan as keyof typeof PLANS;
    const scrapeLimit = PLANS[plan]?.scrapesPerMonth || 5;

    // Atomically claim one scrape slot before doing the expensive HTTP fetch
    const adminClient = createAdminClient();
    const { data: claimed, error: rpcError } = await adminClient.rpc(
      'increment_scrapes_if_below_limit',
      { p_user_id: dbUser.id, p_limit: scrapeLimit }
    );
    if (rpcError) throw rpcError;
    if (!claimed) {
      return NextResponse.json(
        { error: 'Monthly scrape limit reached. Please upgrade your plan.' },
        { status: 403 }
      );
    }

    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const validation = validateUrl(url);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Fetch the webpage
    const response = await fetch(validation.parsed.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; ReachAI/1.0; +https://reachai.app)',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch website' },
        { status: 422 }
      );
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > RESPONSE_SIZE_LIMIT) {
      return NextResponse.json({ error: 'Website response is too large' }, { status: 422 });
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > RESPONSE_SIZE_LIMIT) {
      return NextResponse.json({ error: 'Website response is too large' }, { status: 422 });
    }
    const html = new TextDecoder().decode(buffer);
    const $ = cheerio.load(html);

    // Remove scripts, styles, and nav elements
    $('script, style, nav, footer, header, iframe, noscript').remove();

    // Extract meaningful text
    const textContent = $('body').text().replace(/\s+/g, ' ').trim();

    if (!textContent || textContent.length < 50) {
      return NextResponse.json(
        { error: 'Could not extract meaningful content' },
        { status: 422 }
      );
    }

    // Summarize with AI (via OpenRouter)
    const scrapedData = await summarizeScrapedContent(textContent);

    // Slot already claimed atomically above; just log the action
    await adminClient
      .from('usage_logs')
      .insert({ user_id: dbUser.id, action: 'prospect_scraped' });

    return NextResponse.json(scrapedData);
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape website' },
      { status: 500 }
    );
  }
}
