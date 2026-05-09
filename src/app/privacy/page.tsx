import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — ReachAI',
  description: 'ReachAI Privacy Policy. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      <Navbar />
      <article className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: May 1, 2025</p>
        </div>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              ReachAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application and related services (collectively, the &quot;Service&quot;).
            </p>
            <p className="mt-3">
              By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">2.1 Account Information</h3>
            <p>When you create an account through our authentication provider (Clerk), we collect:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Profile picture (if provided via OAuth)</li>
              <li>Authentication tokens and session data</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">2.2 User-Generated Content</h3>
            <p>When you use the Service to generate emails, we store:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Prospect information you provide (name, company, role, website URL)</li>
              <li>Your sender information (name, company, role, value proposition)</li>
              <li>Generated email subject lines and body text</li>
              <li>Email personalization scores and improvement tips</li>
              <li>Custom email templates you create</li>
              <li>Scraped website content summaries from prospect URLs you submit</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">2.3 Usage Data</h3>
            <p>We automatically collect:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Number of emails generated and prospect scrapes performed</li>
              <li>Feature usage patterns (e.g., which templates are most used)</li>
              <li>Subscription plan and billing status</li>
            </ul>

            <h3 className="text-lg font-medium text-white mt-4 mb-2">2.4 Payment Information</h3>
            <p>
              Payment processing is handled entirely by Lemon Squeezy. We do not store credit card numbers, bank account details, or other financial information on our servers. We receive only a customer identifier and subscription status from Lemon Squeezy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Provide, maintain, and improve the Service</li>
              <li>Generate personalized cold emails based on your inputs</li>
              <li>Scrape and summarize prospect websites you provide for email personalization</li>
              <li>Track your usage against your plan limits</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send service-related communications (e.g., usage alerts, account notifications)</li>
              <li>Respond to support requests</li>
              <li>Detect, prevent, and address technical issues and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gray-400">
              <li><strong className="text-white">Clerk</strong> — Authentication and user management. Processes your email, name, and login credentials. <a href="https://clerk.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener">Clerk Privacy Policy</a></li>
              <li><strong className="text-white">Supabase</strong> — Database hosting. Stores your generated emails, templates, and usage data with row-level security. <a href="https://supabase.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener">Supabase Privacy Policy</a></li>
              <li><strong className="text-white">OpenRouter</strong> — AI model provider. Processes the email generation prompts you submit (prospect data, sender data, template instructions). OpenRouter does not store your prompts or generated content beyond the request lifecycle. <a href="https://openrouter.ai/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener">OpenRouter Privacy Policy</a></li>
              <li><strong className="text-white">Lemon Squeezy</strong> — Payment processing. Handles all billing, subscriptions, and payment data. <a href="https://www.lemonsqueezy.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener">Lemon Squeezy Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p>
              We retain your account data and generated emails for as long as your account is active. You may request deletion of your account and associated data at any time by contacting us at <a href="mailto:privacy@reachai.app" className="text-blue-400 hover:underline">privacy@reachai.app</a>.
            </p>
            <p className="mt-3">
              Upon account deletion, we will remove your personal data from our active databases within 30 days. Backup copies may persist for up to 90 days before being automatically purged.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>All data is encrypted in transit via TLS/HTTPS</li>
              <li>Database access is secured with row-level security (RLS) policies</li>
              <li>Authentication tokens are securely managed by Clerk</li>
              <li>API keys and secrets are stored as server-side environment variables, never exposed to the client</li>
              <li>Regular security reviews and dependency updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Export your data in a portable format</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at <a href="mailto:privacy@reachai.app" className="text-blue-400 hover:underline">privacy@reachai.app</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
            <p>
              We use essential cookies for authentication and session management via Clerk. We do not use advertising or tracking cookies. Third-party services may set their own cookies as described in their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Children&apos;s Privacy</h2>
            <p>
              The Service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will take steps to delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically. Continued use of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mt-2 text-gray-400">
              Email: <a href="mailto:privacy@reachai.app" className="text-blue-400 hover:underline">privacy@reachai.app</a>
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
