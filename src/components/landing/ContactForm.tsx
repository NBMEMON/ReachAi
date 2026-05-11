'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#111128] border border-emerald-500/20 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Message sent!</h2>
        <p className="text-gray-400 text-sm">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111128] border border-white/10 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 block">Subject</label>
          <input
            type="text"
            required
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            placeholder="What can we help with?"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 block">Message</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us more..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
          />
        </div>
        <Button type="submit" size="lg" className="w-full">
          <Send className="w-4 h-4 mr-2" /> Send Message
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/5 grid md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</p>
            <p className="text-gray-300 text-sm">support@reachai.app</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Response Time</p>
            <p className="text-gray-300 text-sm">Within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
