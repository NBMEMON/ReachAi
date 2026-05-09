'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Alex Rivera', role: 'SDR Lead at SalesForge', text: 'ReachAI increased our reply rate from 3% to 12%. The personalization quality is insane — prospects think I spent 20 minutes researching them.', avatar: 'AR' },
  { name: 'Jessica Kim', role: 'Founder at GrowthPilot', text: 'I used to spend hours writing cold emails. Now I generate 50 personalized emails in the time it took me to write 5. Game changer.', avatar: 'JK' },
  { name: 'Marcus Johnson', role: 'VP Sales at CloudSync', text: 'The prospect scraping feature is incredibly smart. It pulls relevant info I would have missed and weaves it into the email naturally.', avatar: 'MJ' },
  { name: 'Priya Patel', role: 'AE at DataStack', text: 'Booked 3 meetings in my first week using ReachAI. The AI genuinely understands context and writes emails that sound human.', avatar: 'PP' },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by <span className="gradient-text">sales teams</span> everywhere
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-[#111128] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
