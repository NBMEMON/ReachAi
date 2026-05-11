import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Sparkles, Users, Target, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'ReachAI helps sales professionals write hyper-personalized cold emails at scale using AI. Learn about our mission, values, and the technology behind the product.',
  alternates: { canonical: 'https://reachai.app/about' },
  openGraph: {
    title: 'About ReachAI — Our Mission',
    description:
      'ReachAI helps sales professionals write hyper-personalized cold emails at scale using AI.',
    url: 'https://reachai.app/about',
  },
  twitter: {
    title: 'About ReachAI — Our Mission',
    description:
      'ReachAI helps sales professionals write hyper-personalized cold emails at scale using AI.',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Helping sales teams write emails that <span className="gradient-text">actually get replies</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            ReachAI was built by sales professionals who were tired of spending hours personalizing cold emails. We believe AI should handle the research and writing so you can focus on building relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Target, title: 'Our Mission', description: 'To democratize high-quality cold email personalization. Every sales rep — from solo founders to enterprise SDRs — should have access to AI-powered outreach that drives real results.' },
            { icon: Users, title: 'Who We Serve', description: 'Sales Development Representatives, Account Executives, founders doing outbound, recruiters, business development managers, and anyone who sends cold emails as part of their workflow.' },
            { icon: Sparkles, title: 'How It Works', description: 'ReachAI scrapes prospect websites, extracts key personalization hooks, and generates emails tailored to each recipient. Our AI references real company data to create emails that feel hand-written.' },
            { icon: Heart, title: 'Our Values', description: 'We believe in transparency, user privacy, and building tools that enhance human work rather than replace it. Your data is yours — we never sell it or use it to train models.' },
          ].map((item) => (
            <div key={item.title} className="bg-[#111128] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Built with modern technology</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto mb-6">
            ReachAI is built on Next.js, Supabase, and OpenRouter. We use free, open-source AI models to keep costs low and pass those savings on to our users. Our free tier requires no credit card and gives you real AI-powered emails from day one.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Next.js', 'Supabase', 'OpenRouter', 'Clerk Auth', 'TypeScript'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
