'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How does ReachAI personalize emails?', a: 'ReachAI uses advanced AI models to analyze prospect data including their name, role, company, and optionally scraped website content. It identifies personalization hooks like recent news, product launches, or shared interests and weaves them naturally into your cold email.' },
  { q: 'Is the free plan really free?', a: 'Yes! The free plan includes 10 AI-generated emails per month and 5 prospect scrapes. No credit card required. Upgrade anytime if you need more volume.' },
  { q: 'How does prospect scraping work?', a: "When you provide a prospect's website URL, ReachAI automatically visits the page, extracts relevant information, and summarizes it. This data is then used to make your email more personalized and relevant." },
  { q: 'Can I use my own email templates?', a: 'Absolutely! You can create custom templates or use our pre-built ones. Templates define the style and structure of your generated emails while the AI handles personalization.' },
  { q: 'What AI model powers ReachAI?', a: 'ReachAI is powered by multiple free AI models via OpenRouter — including Llama 3.1, Mistral, and Google Gemma. You can switch models in Settings. No credit card needed.' },
  { q: 'Is my data secure?', a: 'Yes. All data is encrypted at rest and in transit. We use Supabase with row-level security, and we never share your prospect data or generated emails with third parties.' },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Frequently asked questions</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-[#111128] border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left">
                <span className="text-white text-sm font-medium">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
