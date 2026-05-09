'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Globe,
  FileText,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Personalization',
    description:
      'Our AI analyzes prospect data and generates emails that feel like they were written just for them.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Smart Prospect Research',
    description:
      'Automatically scrape and analyze prospect websites to find personalization hooks.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: FileText,
    title: 'Template Library',
    description:
      'Start with proven templates or create your own. Every template is customizable.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: TrendingUp,
    title: 'Performance Scoring',
    description:
      'Each email gets a personalization score with tips to improve your outreach.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Your data is encrypted at rest and in transit. SOC2-ready infrastructure.',
    gradient: 'from-red-500 to-rose-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Generate personalized emails in under 10 seconds. No more staring at blank screens.',
    gradient: 'from-indigo-500 to-violet-500',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need to{' '}
            <span className="gradient-text">close deals</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful AI tools designed to help sales professionals write better
            emails, faster.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-[#111128] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-4`}
              >
                <div className="w-full h-full bg-[#111128] rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
