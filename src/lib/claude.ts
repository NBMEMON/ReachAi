import { getOpenRouterClient, DEFAULT_MODEL, FALLBACK_MODELS, FREE_MODELS } from './openrouter';
import type { GenerateEmailRequest, ScrapedData } from '@/types';

/**
 * Sanitizes a single-line field: collapses whitespace/newlines to a single
 * space and strips ASCII control characters. Prevents a user-supplied value
 * from breaking out of the "- Label: value" line structure in the prompt.
 */
function sanitizeLine(value: string): string {
  return value
    .replace(/[\r\n\t]+/g, ' ')       // newlines / tabs → space
    .replace(/[\x00-\x1F\x7F]/g, '')  // remaining ASCII control chars
    .trim();
}

/**
 * Sanitizes a multi-line field: strips null bytes and other non-printable
 * control characters while preserving intentional newlines, then caps the
 * result at maxLength characters.
 */
function sanitizeMultiline(value: string, maxLength: number): string {
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // control chars except \n (0x0A) and \r (0x0D)
    .replace(/\r\n?/g, '\n')                             // normalise line endings
    .trim()
    .slice(0, maxLength);
}

export function buildEmailPrompt(
  request: GenerateEmailRequest,
  scrapedData?: ScrapedData | null,
  templatePrompt?: string | null
): string {
  const senderName      = sanitizeLine(request.senderName);
  const senderCompany   = sanitizeLine(request.senderCompany);
  const senderRole      = sanitizeLine(request.senderRole);
  const valueProposition = sanitizeLine(request.valueProposition);
  const prospectName    = sanitizeLine(request.prospectName);
  const prospectCompany = sanitizeLine(request.prospectCompany);
  const prospectRole    = sanitizeLine(request.prospectRole ?? '');

  let prompt = `You are an expert cold email copywriter. Generate a highly personalized cold email based on the following details.

SENDER INFORMATION:
- Name: ${senderName}
- Company: ${senderCompany}
- Role: ${senderRole}
- Value Proposition: ${valueProposition}

PROSPECT INFORMATION:
- Name: ${prospectName}
- Company: ${prospectCompany}
- Role: ${prospectRole}`;

  if (scrapedData) {
    const companyDescription = sanitizeLine(scrapedData.companyDescription);
    const recentNews         = scrapedData.recentNews.map(sanitizeLine).join(', ');
    const products           = scrapedData.products.map(sanitizeLine).join(', ');
    const teamInfo           = sanitizeLine(scrapedData.teamInfo);

    prompt += `

RESEARCH DATA (from prospect's website):
- Company Description: ${companyDescription}
- Recent News: ${recentNews}
- Products/Services: ${products}
- Team Info: ${teamInfo}`;
  }

  if (request.additionalContext) {
    // Multi-line field: allow newlines but cap at 500 chars to limit injection surface
    const additionalContext = sanitizeMultiline(request.additionalContext, 500);
    prompt += `

ADDITIONAL CONTEXT:
${additionalContext}`;
  }

  prompt += `

TONE: ${sanitizeLine(request.tone)}

${templatePrompt ? `TEMPLATE STYLE:\n${sanitizeMultiline(templatePrompt, 2000)}\n\n` : ''}INSTRUCTIONS:
1. Write a compelling subject line (max 50 characters)
2. Write the email body (max 150 words)
3. Make it feel personal — reference specific details about the prospect
4. Include a clear, low-friction CTA
5. Score the email from 1-100 based on personalization, clarity, and likely response rate
6. Provide 2-3 tips to improve the email further

RESPOND IN THIS EXACT JSON FORMAT:
{
  "subjectLine": "...",
  "emailBody": "...",
  "score": 85,
  "tips": ["tip1", "tip2", "tip3"]
}`;

  return prompt;
}

/**
 * Safely parse JSON from model response, with fallback extraction.
 */
function safeParseJSON(rawText: string): any {
  try {
    return JSON.parse(rawText);
  } catch {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Model did not return valid JSON');
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Try calling OpenRouter with cascading fallback across all free models.
 * On 429/503: waits briefly, then tries the next model in the list.
 */
async function callWithFallback(
  messages: Array<{ role: 'system' | 'user'; content: string }>,
  preferredModel: string,
  opts: { max_tokens: number; temperature: number }
): Promise<string> {
  // Build model queue: preferred first, then fallbacks (skip duplicates)
  const modelQueue = [preferredModel, ...FALLBACK_MODELS.filter(m => m !== preferredModel)];
  let lastError: any = null;

  for (const model of modelQueue) {
    try {
      const completion = await getOpenRouterClient().chat.completions.create({
        model,
        messages,
        max_tokens: opts.max_tokens,
        temperature: opts.temperature,
      });
      return completion.choices[0]?.message?.content || '';
    } catch (error: any) {
      lastError = error;
      if (error?.status === 429 || error?.status === 503) {
        console.warn(`Model ${model} returned ${error.status}, trying next fallback...`);
        // Brief delay before trying next model to avoid hammering the API
        await sleep(2000);
        continue;
      }
      // Non-retryable error — throw immediately
      throw error;
    }
  }

  // All models exhausted — throw the last error
  throw lastError;
}

export async function generateEmail(prompt: string, model?: string) {
  const isValidModel = FREE_MODELS.some(m => m.id === model);
  const selectedModel = isValidModel ? model! : DEFAULT_MODEL;

  const rawText = await callWithFallback(
    [
      { role: 'system', content: 'You are an expert cold email copywriter. Always respond with valid JSON only, no additional text.' },
      { role: 'user', content: prompt },
    ],
    selectedModel,
    { max_tokens: 1000, temperature: 0.7 }
  );

  return safeParseJSON(rawText);
}

export async function summarizeScrapedContent(rawContent: string): Promise<ScrapedData> {
  const userPrompt = `Analyze this website content and extract key information for a sales outreach email.

WEBSITE CONTENT:
${rawContent.slice(0, 5000)}

RESPOND IN THIS EXACT JSON FORMAT:
{
  "companyDescription": "Brief 2-sentence company description",
  "recentNews": ["news item 1", "news item 2"],
  "products": ["product/service 1", "product/service 2"],
  "teamInfo": "Any relevant team/leadership info"
}`;

  const rawText = await callWithFallback(
    [
      { role: 'system', content: 'You are a data extraction assistant. Always respond with valid JSON only.' },
      { role: 'user', content: userPrompt },
    ],
    DEFAULT_MODEL,
    { max_tokens: 512, temperature: 0.3 }
  );

  const parsed = safeParseJSON(rawText);
  return { ...parsed, rawContent: rawContent.slice(0, 2000) };
}
