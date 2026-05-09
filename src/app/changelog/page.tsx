import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Rocket, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog — ReachAI',
  description: 'See what\'s new in ReachAI. Latest features, improvements, and bug fixes.',
};

const changelog = [
  {
    version: '1.2.0',
    date: '2025-05-01',
    title: 'OpenRouter Integration & Free Models',
    changes: [
      'Switched AI backend to OpenRouter for free model access',
      'Added model selector in Settings — choose from Llama 3.1, Mistral, or Gemma',
      'No credit card required for AI features',
      'Added automatic fallback to secondary model on outages',
      'Improved rate limit handling with user-friendly error messages',
    ],
  },
  {
    version: '1.1.0',
    date: '2025-04-15',
    title: 'Templates & History',
    changes: [
      'Custom email template creation',
      'Pre-built template library (Sales, Networking, Follow-up, Partnership, Recruiting)',
      'Full email history with search and filtering',
      'Template usage tracking — apply any template from the Generator',
      'Copy-to-clipboard for generated emails',
    ],
  },
  {
    version: '1.0.0',
    date: '2025-03-01',
    title: 'Initial Launch',
    changes: [
      'AI-powered cold email generation',
      'Prospect website scraping and analysis',
      'Personalization scoring (1–100) with improvement tips',
      'Multiple email tones: Professional, Friendly, Casual, Bold, Humorous, Urgent',
      'User authentication via Clerk',
      'Free tier with 10 emails/month',
      'Starter and Pro subscription plans via Stripe',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <div className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Changelog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">What&apos;s new</h1>
          <p className="text-gray-400 text-lg">Latest features, improvements, and fixes.</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10" />

          <div className="space-y-12">
            {changelog.map((release) => (
              <div key={release.version} className="relative pl-12">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-10 h-10 bg-[#111128] border border-white/10 rounded-xl flex items-center justify-center z-10">
                  <Rocket className="w-4 h-4 text-blue-400" />
                </div>

                <div className="bg-[#111128] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
                      v{release.version}
                    </span>
                    <span className="text-gray-500 text-xs">{release.date}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-4">{release.title}</h3>
                  <ul className="space-y-2">
                    {release.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <Tag className="w-3.5 h-3.5 text-gray-600 mt-0.5 shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
