import type { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ContactForm } from '@/components/landing/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the ReachAI team. We respond to all inquiries within 24 hours.',
  alternates: { canonical: 'https://reachai.app/contact' },
  openGraph: {
    title: 'Contact ReachAI',
    description: 'Get in touch with the ReachAI team. We respond within 24 hours.',
    url: 'https://reachai.app/contact',
  },
  twitter: {
    title: 'Contact ReachAI',
    description: 'Get in touch with the ReachAI team. We respond within 24 hours.',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <div className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in touch</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a question, feedback, or partnership inquiry? We&apos;d love to hear from you.
          </p>
        </div>
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
