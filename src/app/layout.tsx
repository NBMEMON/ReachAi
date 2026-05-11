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

const BASE_URL = 'https://reachai.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ReachAI — AI-Powered Cold Email Generator',
    template: '%s | ReachAI',
  },
  description:
    'Generate hyper-personalized cold emails in seconds. AI scrapes prospect websites and writes emails that get replies.',
  keywords: [
    'cold email',
    'AI email generator',
    'sales outreach',
    'email personalization',
    'cold outreach',
    'AI sales tool',
    'prospect research',
    'cold email software',
  ],
  authors: [{ name: 'ReachAI', url: BASE_URL }],
  creator: 'ReachAI',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'ReachAI — AI-Powered Cold Email Generator',
    description:
      'Generate hyper-personalized cold emails in seconds. AI scrapes prospect websites and writes emails that get replies.',
    type: 'website',
    url: BASE_URL,
    siteName: 'ReachAI',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ReachAI — AI Cold Email Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReachAI — AI-Powered Cold Email Generator',
    description:
      'Generate hyper-personalized cold emails in seconds. AI scrapes prospect websites and writes emails that get replies.',
    images: ['/og-image.png'],
    creator: '@reachai',
  },
  alternates: {
    canonical: BASE_URL,
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
