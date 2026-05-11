import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ArrowRight, Calendar } from 'lucide-react';

const posts = [
  {
    slug: 'cold-email-subject-lines',
    title: '15 Cold Email Subject Lines That Get 40%+ Open Rates',
    excerpt: 'Discover the proven subject line formulas top SDRs use to break through crowded inboxes.',
    date: '2024-12-10',
    category: 'Outreach',
    readTime: '5 min',
  },
  {
    slug: 'cold-email-personalization-guide',
    title: 'The Complete Guide to Cold Email Personalization in 2025',
    excerpt: 'Learn how to research prospects and personalize every email for maximum response rates.',
    date: '2024-12-05',
    category: 'Strategy',
    readTime: '8 min',
  },
  {
    slug: 'cold-email-vs-linkedin-outreach',
    title: 'Cold Email vs LinkedIn Outreach: Which Converts Better?',
    excerpt: 'A data-driven comparison of cold email and LinkedIn outreach strategies.',
    date: '2024-11-28',
    category: 'Comparison',
    readTime: '6 min',
  },
];

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Expert insights on cold email strategy, sales outreach, and AI-powered personalization. Tips to improve your open rates and book more meetings.',
  alternates: { canonical: 'https://reachai.app/blog' },
  openGraph: {
    title: 'ReachAI Blog — Cold Email Tips & Sales Outreach Insights',
    description:
      'Expert insights on cold email strategy, sales outreach, and AI-powered personalization.',
    url: 'https://reachai.app/blog',
  },
  twitter: {
    title: 'ReachAI Blog — Cold Email Tips & Sales Outreach Insights',
    description:
      'Expert insights on cold email, sales outreach, and AI personalization.',
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <section className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
        <p className="text-gray-400 text-lg mb-12">Insights on cold email, sales outreach, and AI.</p>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="block group bg-[#111128] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-xs font-medium">{post.category}</span>
                <span className="flex items-center gap-1 text-gray-500 text-xs"><Calendar className="w-3 h-3" />{post.date}</span>
                <span className="text-gray-600 text-xs">{post.readTime} read</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
