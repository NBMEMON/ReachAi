import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ReachAI — AI-Powered Cold Email Personalization',
  description:
    'Generate hyper-personalized cold emails in seconds with AI. Boost your response rates by 3x with intelligent prospect research and custom email generation.',
  keywords: [
    'cold email',
    'AI email',
    'email personalization',
    'sales outreach',
    'cold outreach',
    'AI sales tool',
  ],
  openGraph: {
    title: 'ReachAI — AI-Powered Cold Email Personalization',
    description:
      'Generate hyper-personalized cold emails in seconds. Boost your response rates by 3x.',
    type: 'website',
    url: 'https://reachai.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReachAI — AI-Powered Cold Email Personalization',
    description:
      'Generate hyper-personalized cold emails in seconds. Boost your response rates by 3x.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#111128',
          colorText: '#e2e8f0',
          colorInputBackground: '#1a1a3e',
          colorInputText: '#e2e8f0',
          borderRadius: '0.75rem',
        },
      }}
    >
      <html lang="en" className={inter.variable}>
        <body className="antialiased">
          {children}
          <Toaster theme="dark" richColors position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
