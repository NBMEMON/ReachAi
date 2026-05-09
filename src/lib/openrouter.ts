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
  { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (Recommended)' },
  { id: 'google/gemma-3-27b-it:free', name: 'Google Gemma 3 27B' },
  { id: 'deepseek/deepseek-chat-v3.1:free', name: 'DeepSeek V3.1' },
  { id: 'qwen/qwen-2.5-72b-instruct:free', name: 'Qwen 2.5 72B' },
] as const;

export const DEFAULT_MODEL = FREE_MODELS[0].id;
export const FALLBACK_MODELS = [FREE_MODELS[1].id, FREE_MODELS[2].id, FREE_MODELS[3].id] as const;
