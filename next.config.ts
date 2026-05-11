import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Suppress build output unless running in CI
  silent: !process.env.CI,

  // Proxy Sentry requests through /monitoring to bypass ad-blockers
  tunnelRoute: '/monitoring',

  // Upload source maps for readable production stack traces
  // Requires SENTRY_AUTH_TOKEN environment variable
  widenClientFileUpload: true,

  webpack: {
    treeshake: {
      // Strip Sentry's internal debug logging from production bundles
      removeDebugLogging: true,
    },
  },
});
