'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Wand2, Send } from 'lucide-react';

const steps = [
  { icon: UserPlus, step: '01', title: 'Enter Prospect Info', description: "Add your prospect's name, company, role, and website URL.", color: 'blue' },
  { icon: Search, step: '02', title: 'AI Researches', description: 'ReachAI scrapes their website and finds personalization hooks.', color: 'purple' },
  { icon: Wand2, step: '03', title: 'Generate Email', description: 'AI writes a hyper-personalized email with subject line and CTA.', color: 'pink' },
  { icon: Send, step: '04', title: 'Send & Track', description: 'Copy your email, send it, and track performance with analytics.', color: 'emerald' },
];

const gradients: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  pink: 'from-pink-500 to-pink-600',
  emerald: 'from-emerald-500 to-emerald-600',
};

const bgColors: Record<string, string> = {
  blue: 'bg-blue-500/10 border-blue-500/20',
  purple: 'bg-purple-500/10 border-purple-500/20',
  pink: 'bg-pink-500/10 border-pink-500/20',
  emerald: 'bg-emerald-500/10 border-emerald-500/20',
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From prospect to <span className="gradient-text">personalized email</span> in under 30 seconds
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl ${bgColors[s.color]} border mb-6`}>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradients[s.color]} flex items-center justify-center shadow-lg`}>
                  <s.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Step {s.step}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
