import type { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for AI-powered cold email generation. Start free — no credit card required. Upgrade when you need more.',
  alternates: { canonical: 'https://reachai.app/pricing' },
  openGraph: {
    title: 'ReachAI Pricing — Start Free, Upgrade Anytime',
    description:
      'Simple, transparent pricing for AI-powered cold email generation. Start free — no credit card required.',
    url: 'https://reachai.app/pricing',
  },
  twitter: {
    title: 'ReachAI Pricing — Start Free, Upgrade Anytime',
    description:
      'Simple, transparent pricing for AI cold email generation. Free plan available.',
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a] pt-20">
      <Navbar />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
