'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Zap, Mail, BarChart3 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8"
        >
          <Zap className="w-4 h-4" />
          <span>AI-powered cold email personalization</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-white">Write Emails</span>
          <br />
          <span className="gradient-text">That Actually Get</span>
          <br />
          <span className="text-white">Replies</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          ReachAI uses AI to research your prospects and generate
          hyper-personalized cold emails in seconds. Boost your reply rates by 3x.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/sign-up">
            <Button size="lg" className="group">
              Start for Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg">
              See How It Works
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {[
            { icon: Mail, stat: '50K+', label: 'Emails Generated' },
            { icon: BarChart3, stat: '3.2x', label: 'Higher Reply Rate' },
            { icon: Zap, stat: '<10s', label: 'Generation Time' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-white">{item.stat}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl border border-white/10 bg-[#111128] overflow-hidden shadow-2xl shadow-blue-500/10">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-gray-500">ReachAI — Email Generator</span>
            </div>
            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Input side */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Prospect Details</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5">
                      <span className="text-xs text-gray-500">Name</span>
                      <p className="text-white text-sm">Sarah Chen</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5">
                      <span className="text-xs text-gray-500">Company</span>
                      <p className="text-white text-sm">TechFlow Inc.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5">
                      <span className="text-xs text-gray-500">Role</span>
                      <p className="text-white text-sm">VP of Engineering</p>
                    </div>
                  </div>
                </div>
                {/* Output side */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Generated Email</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs">Score: 92</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                    <p className="text-blue-400 font-medium text-sm">
                      Re: TechFlow&apos;s scaling challenges
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Hi Sarah, I noticed TechFlow just closed a Series B — congrats! Scaling
                      engineering teams post-funding is both exciting and chaotic. We helped
                      DataPipe reduce their onboarding time by 60% during a similar growth
                      phase. Would a 15-min chat make sense?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
