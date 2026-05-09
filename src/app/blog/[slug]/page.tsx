import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const blogPosts: Record<string, { title: string; date: string; readTime: string; category: string; content: string }> = {
  'cold-email-subject-lines': {
    title: '15 Cold Email Subject Lines That Get 40%+ Open Rates',
    date: '2024-12-10',
    readTime: '5 min',
    category: 'Outreach',
    content: `Your subject line is the gatekeeper. No matter how good your email body is, it's worthless if nobody opens it. Here are 15 proven subject line formulas used by top SDRs.\n\n## 1. The Mutual Connection\n"[Mutual contact] suggested I reach out"\n\nThis works because it leverages social proof and trust. When someone sees a familiar name, they're 4x more likely to open.\n\n## 2. The Observation\n"Noticed [specific thing] about [company]"\n\nShowing you've done research immediately sets you apart from generic mass emails.\n\n## 3. The Question\n"Quick question about [their initiative]"\n\nQuestions create an open loop in the reader's mind that they want to close by reading.\n\n## 4. The Result\n"How [similar company] increased [metric] by [number]%"\n\nLeading with results gives the prospect a concrete reason to care.\n\n## 5. The Congratulation\n"Congrats on [recent achievement]!"\n\nPeople love recognition. Starting with genuine praise opens doors.\n\n## Key Takeaways\n\n- Keep subject lines under 50 characters\n- Personalize with the prospect's name or company\n- Create curiosity without being clickbaity\n- A/B test your subject lines\n- Use ReachAI to automatically generate personalized subject lines`,
  },
  'cold-email-personalization-guide': {
    title: 'The Complete Guide to Cold Email Personalization in 2025',
    date: '2024-12-05',
    readTime: '8 min',
    category: 'Strategy',
    content: `Generic cold emails are dead. In 2025, personalization isn't optional — it's the minimum bar. Here's how to personalize at scale.\n\n## Why Personalization Matters\n\nStudies show personalized cold emails get 3x higher response rates than generic templates. But manual personalization takes 15-20 minutes per email.\n\n## The Personalization Framework\n\n### Level 1: Basic (Name + Company)\nUsing just the prospect's name and company name. This is table stakes.\n\n### Level 2: Role-Based\nTailoring the value proposition to their specific role and responsibilities.\n\n### Level 3: Research-Based\nReferencing recent news, blog posts, or company announcements.\n\n### Level 4: AI-Powered (ReachAI)\nAutomatically scraping prospect websites and generating contextually relevant emails using AI.\n\n## Tools for Personalization at Scale\n\nReachAI combines web scraping and AI to achieve Level 4 personalization in seconds, not minutes.`,
  },
  'cold-email-vs-linkedin-outreach': {
    title: 'Cold Email vs LinkedIn Outreach: Which Converts Better?',
    date: '2024-11-28',
    readTime: '6 min',
    category: 'Comparison',
    content: `Both cold email and LinkedIn outreach have their place in modern sales. But which channel actually converts better? Let's look at the data.\n\n## Cold Email: The Numbers\n- Average open rate: 20-25%\n- Average reply rate: 2-5%\n- Scalability: High (hundreds per day)\n- Cost: Low\n\n## LinkedIn: The Numbers\n- Average acceptance rate: 25-35%\n- Average reply rate: 15-25%\n- Scalability: Limited (100 connections/week)\n- Cost: LinkedIn Sales Navigator ($99/mo)\n\n## The Verdict\n\nLinkedIn has higher per-message conversion rates, but cold email wins on scalability and cost. The best strategy? Use both.\n\n## The Winning Combination\n\n1. Use ReachAI to send personalized cold emails at scale\n2. Follow up with a LinkedIn connection request\n3. Use the email engagement data to prioritize LinkedIn outreach\n\nThis multi-channel approach typically yields 40-60% higher conversion rates.`,
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: 'Not Found' };
  return { title: `${post.title} — ReachAI Blog`, description: post.content.slice(0, 160) };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <article className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center gap-1 text-gray-400 text-sm hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-xs font-medium">{post.category}</span>
          <span className="flex items-center gap-1 text-gray-500 text-xs"><Calendar className="w-3 h-3" />{post.date}</span>
          <span className="flex items-center gap-1 text-gray-500 text-xs"><Clock className="w-3 h-3" />{post.readTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{post.title}</h1>
        <div className="prose prose-invert prose-sm max-w-none">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold text-white mt-8 mb-3">{para.replace('## ', '')}</h2>;
            if (para.startsWith('### ')) return <h3 key={i} className="text-lg font-medium text-white mt-6 mb-2">{para.replace('### ', '')}</h3>;
            if (para.startsWith('- ')) return <ul key={i} className="space-y-1 my-3">{para.split('\n').map((li, j) => <li key={j} className="text-gray-400 text-sm flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>{li.replace('- ', '')}</li>)}</ul>;
            return <p key={i} className="text-gray-400 text-sm leading-relaxed mb-4">{para}</p>;
          })}
        </div>
      </article>
      <Footer />
    </main>
  );
}
