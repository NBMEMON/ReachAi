import OpenAI from 'openai';

// Lazy-initialize the client so it only runs server-side at request time,
// not at module evaluation (which also happens in the browser for shared imports).
let _client: OpenAI | null = null;

export function getOpenRouterClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY!,
      defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'ReachAI',
      },
    });
  }
  return _client;
}

// Free models available on OpenRouter (no credit card needed)
// This is safe to import from client components (no secrets here)
export const FREE_MODELS = [
  { id: 'openai/gpt-oss-120b:free', name: 'GPT-OSS 120B (Recommended)' },
  { id: 'minimax/minimax-m2.5:free', name: 'MiniMax M2.5' },
  { id: 'google/gemma-4-31b-it:free', name: 'Google Gemma 4 31B' },
  { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B' },
  { id: 'nvidia/nemotron-3-super-120b-a12b:free', name: 'Nvidia Nemotron 120B' },
] as const;

export const DEFAULT_MODEL = FREE_MODELS[0].id;
export const FALLBACK_MODELS = [FREE_MODELS[1].id, FREE_MODELS[2].id, FREE_MODELS[3].id, FREE_MODELS[4].id] as const;
