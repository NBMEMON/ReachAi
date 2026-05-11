import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ReachAI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://reachai.app',
  description:
    'AI-powered cold email generator that scrapes prospect websites and writes hyper-personalized emails that get replies.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Plan',
      price: '0',
      priceCurrency: 'USD',
      description: '10 emails/month, 5 website scrapes',
    },
    {
      '@type': 'Offer',
      name: 'Starter Plan',
      price: '19',
      priceCurrency: 'USD',
      description: '100 emails/month, 50 website scrapes',
    },
    {
      '@type': 'Offer',
      name: 'Pro Plan',
      price: '49',
      priceCurrency: 'USD',
      description: 'Unlimited emails, unlimited scrapes',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
  },
  featureList: [
    'AI-powered email generation',
    'Prospect website scraping',
    'Multiple email tones',
    'Custom templates',
    'Email quality scoring',
    'Email history',
  ],
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0a0a1a]">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
