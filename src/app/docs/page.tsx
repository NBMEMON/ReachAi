import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import Link from 'next/link';
import { BookOpen, Zap, FileText, Settings, Globe, Sparkles, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation — ReachAI',
  description: 'Learn how to use ReachAI to generate personalized cold emails. Getting started guide, API usage, and tips.',
};

const sections = [
  {
    icon: Zap,
    title: 'Quick Start',
    content: [
      { step: '1', text: 'Sign up for a free account — no credit card required.' },
      { step: '2', text: 'Navigate to the Dashboard → Email Generator.' },
      { step: '3', text: 'Enter your prospect\'s name, company, and role.' },
      { step: '4', text: 'Fill in your own details and value proposition.' },
      { step: '5', text: 'Select a tone (Professional, Friendly, Casual, Bold, Humorous, or Urgent).' },
      { step: '6', text: 'Click "Generate Email" — your personalized email appears in seconds.' },
      { step: '7', text: 'Review the score and tips, then copy to clipboard.' },
    ],
  },
  {
    icon: Globe,
    title: 'Prospect Scraping',
    content: [
      { step: '1', text: 'Enter your prospect\'s website URL in the Website field.' },
      { step: '2', text: 'ReachAI will automatically visit the site and extract relevant information.' },
      { step: '3', text: 'The AI identifies company descriptions, recent news, products, and team info.' },
      { step: '4', text: 'This data is used to add deeper personalization hooks to your email.' },
      { step: '5', text: 'Scraping works best on company "About" pages, blog posts, and press pages.' },
    ],
  },
  {
    icon: FileText,
    title: 'Templates',
    content: [
      { step: '1', text: 'Go to Templates in the sidebar.' },
      { step: '2', text: 'Browse pre-built templates (Sales, Networking, Follow-up, Partnership, Recruiting).' },
      { step: '3', text: 'Click "Use Template" on any card to apply it to your next email.' },
      { step: '4', text: 'Create your own templates by clicking "New Template" — add a name, description, and prompt instructions.' },
      { step: '5', text: 'Custom templates let you define the exact style and structure the AI should follow.' },
    ],
  },
  {
    icon: Settings,
    title: 'AI Model Selection',
    content: [
      { step: '1', text: 'Go to Settings → AI Model tab.' },
      { step: '2', text: 'Choose from three free models: Llama 3.1 8B (recommended), Mistral 7B, or Google Gemma 2 9B.' },
      { step: '3', text: 'Click "Save Preference" to store your choice.' },
      { step: '4', text: 'All models are 100% free via OpenRouter — no credit card needed.' },
      { step: '5', text: 'If you hit rate limits (~20 req/min), wait 30 seconds and retry.' },
    ],
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Documentation
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Getting started with ReachAI</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Everything you need to start generating personalized cold emails in minutes.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-[#111128] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <div className="space-y-3">
                {section.content.map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
          <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Ready to get started?</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Create your free account and generate your first personalized cold email in under 60 seconds.
          </p>
          <Link href="/sign-up" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
