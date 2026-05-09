import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — ReachAI',
  description: 'ReachAI Terms of Service. Read our terms and conditions for using the platform.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <article className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: May 1, 2025</p>
        </div>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using ReachAI (the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, you may not use the Service. We may modify these Terms at any time. Continued use after modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              ReachAI is a software-as-a-service (SaaS) platform that uses artificial intelligence to generate personalized cold emails. The Service includes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>AI-powered email generation based on prospect and sender information</li>
              <li>Automated website scraping for prospect research</li>
              <li>Email template management and customization</li>
              <li>Email history and analytics tracking</li>
              <li>Personalization scoring and improvement suggestions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Account Registration</h2>
            <p>
              To use the Service, you must create an account through our authentication provider (Clerk). You agree to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly notify us of any unauthorized access to your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
            <p className="mt-3">
              You must be at least 16 years of age to create an account and use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Subscription Plans and Billing</h2>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">4.1 Free Tier</h3>
            <p>
              The free tier includes a limited number of email generations and prospect scrapes per month. No payment information is required. We reserve the right to modify free tier limits at any time.
            </p>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">4.2 Paid Plans</h3>
            <p>
              Paid subscriptions are processed through Lemon Squeezy. By subscribing to a paid plan, you authorize Lemon Squeezy to charge your payment method on a recurring basis. You may cancel your subscription at any time through the billing portal. Cancellation takes effect at the end of the current billing period.
            </p>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">4.3 Refunds</h3>
            <p>
              We offer a 14-day money-back guarantee for new paid subscriptions. After 14 days, refunds are provided at our sole discretion. Free tier usage is not eligible for any refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Acceptable Use</h2>
            <p>You agree NOT to use the Service to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Send spam, unsolicited bulk email, or emails in violation of anti-spam laws (CAN-SPAM, GDPR, CASL)</li>
              <li>Generate phishing, fraudulent, deceptive, or misleading emails</li>
              <li>Impersonate other individuals or organizations</li>
              <li>Scrape websites in violation of those websites&apos; terms of service or robots.txt</li>
              <li>Generate content that is harassing, threatening, defamatory, or promotes illegal activity</li>
              <li>Attempt to circumvent usage limits, rate limits, or access controls</li>
              <li>Use automated scripts or bots to access the Service beyond normal browser usage</li>
              <li>Reverse-engineer, decompile, or disassemble any part of the Service</li>
              <li>Resell, sublicense, or redistribute the Service without our written consent</li>
            </ul>
            <p className="mt-3">
              Violation of this section may result in immediate account termination without notice or refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">6.1 Your Content</h3>
            <p>
              You retain ownership of all content you input into the Service (prospect data, sender data, custom templates). You grant us a limited, non-exclusive license to process this content solely for the purpose of providing the Service.
            </p>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">6.2 Generated Content</h3>
            <p>
              Emails generated by the Service are yours to use. We do not claim ownership of AI-generated email content. However, AI-generated content may not be unique — similar prompts may produce similar outputs for different users.
            </p>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">6.3 Our Property</h3>
            <p>
              The Service, including its design, code, algorithms, branding, and documentation, is our proprietary property and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. AI-Generated Content Disclaimer</h2>
            <p>
              The Service uses third-party AI models (via OpenRouter) to generate email content. You acknowledge that:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>AI-generated content may contain errors, inaccuracies, or inappropriate suggestions</li>
              <li>You are solely responsible for reviewing, editing, and approving all generated content before sending</li>
              <li>AI models may produce different results over time as they are updated by their providers</li>
              <li>We do not guarantee any specific response rate, conversion rate, or business outcome</li>
              <li>Personalization scores are AI-generated estimates and should not be treated as guarantees</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Service Availability</h2>
            <p>
              We strive to maintain high availability but do not guarantee uninterrupted or error-free access. The Service may be unavailable due to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Scheduled or unscheduled maintenance</li>
              <li>Third-party service outages (Clerk, Supabase, OpenRouter, Lemon Squeezy)</li>
              <li>AI model rate limits or temporary unavailability</li>
              <li>Force majeure events beyond our control</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, REACHAI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE SERVICE.
            </p>
            <p className="mt-3">
              Our total aggregate liability to you shall not exceed the amount you paid for the Service in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless ReachAI from any claims, damages, losses, or expenses (including reasonable attorney&apos;s fees) arising from your use of the Service, your violation of these Terms, or emails you send using content generated by the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Termination</h2>
            <p>
              We may suspend or terminate your account at any time for violation of these Terms or for any other reason at our discretion. You may terminate your account at any time by contacting us. Upon termination, your right to use the Service ceases immediately and your data will be handled in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ReachAI operates, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">13. Contact</h2>
            <p>
              For questions about these Terms, contact us at: <a href="mailto:legal@reachai.app" className="text-blue-400 hover:underline">legal@reachai.app</a>
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
