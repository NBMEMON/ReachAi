import { Navbar } from '@/components/landing/Navbar';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';

export const metadata = {
  title: 'Pricing — ReachAI',
  description: 'Simple, transparent pricing for AI-powered cold email personalization.',
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
