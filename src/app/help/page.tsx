'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

const categories = [
  {
    title: 'Getting Started',
    faqs: [
      { q: 'How do I create an account?', a: 'Click "Get Started Free" on the homepage or navigate to /sign-up. You can sign up with your email or Google account. No credit card required.' },
      { q: 'Is ReachAI really free?', a: 'Yes! The free plan gives you 10 AI-generated emails and 5 prospect scrapes per month. Free AI models are powered by OpenRouter — no credit card or billing setup needed.' },
      { q: 'How do I generate my first email?', a: 'Go to Dashboard → Email Generator. Enter your prospect\'s name, company, and role. Fill in your own info and value proposition. Select a tone, then click "Generate Email." Your personalized email appears in seconds.' },
    ],
  },
  {
    title: 'Email Generation',
    faqs: [
      { q: 'What makes ReachAI emails different from templates?', a: 'Unlike static templates, ReachAI analyzes your prospect\'s specific information (and optionally their website) to generate unique, contextually relevant emails. Each email references real details about the prospect.' },
      { q: 'What is the personalization score?', a: 'Each generated email receives a score from 1–100 based on how personalized, clear, and likely to get a reply it is. The AI also provides 2–3 tips to improve the email further.' },
      { q: 'Can I edit the generated email?', a: 'Yes! The generated email is a starting point. Copy it to your clipboard, paste it into your email client, and make any edits you want before sending.' },
      { q: 'What tones are available?', a: 'Professional, Friendly, Casual, Bold, Humorous, and Urgent. Each tone adjusts the AI\'s writing style to match your outreach strategy.' },
    ],
  },
  {
    title: 'Prospect Scraping',
    faqs: [
      { q: 'How does website scraping work?', a: 'When you enter a prospect\'s website URL, ReachAI visits the page, extracts text content, and uses AI to identify the company description, recent news, products/services, and team information. This data is then used to make your email more personalized.' },
      { q: 'What websites work best for scraping?', a: 'Company "About" pages, blog posts, press/news pages, and product pages work best. Some websites may block automated scraping — in that case, you can manually add context in the "Additional Context" field.' },
      { q: 'Does scraping count against my limits?', a: 'Yes, each scrape counts against your monthly scrape limit (5 for free, 50 for Starter, unlimited for Pro). Scraping is optional — you can generate emails without it.' },
    ],
  },
  {
    title: 'AI Models & Limits',
    faqs: [
      { q: 'What AI models does ReachAI use?', a: 'ReachAI uses free models via OpenRouter: Llama 3.1 8B (default), Mistral 7B (fallback), and Google Gemma 2 9B. You can switch models in Settings → AI Model.' },
      { q: 'I\'m getting a "rate limit" error — what do I do?', a: 'Free AI models have rate limits (~20 requests per minute). Wait 30 seconds and try again. If the primary model is unavailable, ReachAI automatically retries with a fallback model.' },
      { q: 'Do I need an OpenRouter account?', a: 'No. ReachAI handles the AI integration for you. Our platform provides the API key — you just use the app.' },
    ],
  },
  {
    title: 'Billing & Plans',
    faqs: [
      { q: 'What plans are available?', a: 'Free (10 emails/month), Starter ($19/month — 100 emails), and Pro ($49/month — unlimited emails). Visit the Pricing page for full details.' },
      { q: 'How do I upgrade my plan?', a: 'Go to Settings → Billing → "Upgrade Now" or visit the Pricing page. Payments are processed securely via Lemon Squeezy.' },
      { q: 'Can I cancel anytime?', a: 'Yes. You can cancel your subscription at any time. Your access continues until the end of the current billing period. After that, you revert to the free plan.' },
    ],
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredCategories = categories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(faq =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.faqs.length > 0);

  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <div className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How can we help?</h1>
          <p className="text-gray-400 text-lg mb-8">
            Find answers to common questions about ReachAI.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for answers..."
              className="w-full bg-[#111128] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        <div className="space-y-10">
          {filteredCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                {category.title}
              </h2>
              <div className="space-y-2">
                {category.faqs.map((faq, i) => {
                  const key = `${category.title}-${i}`;
                  return (
                    <div key={key} className="bg-[#111128] border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(openIndex === key ? null : key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                      >
                        <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${openIndex === key ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openIndex === key && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <p className="px-5 pb-4 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500">No results found. Try a different search term.</p>
            </div>
          )}
        </div>

        <div className="mt-16 bg-[#111128] border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
          <p className="text-gray-400 text-sm mb-6">
            Can&apos;t find what you&apos;re looking for? Reach out to our support team.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
