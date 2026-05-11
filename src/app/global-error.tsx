'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';

interface GlobalErrorProps {
  error: Error & { digest?: string };
}

export default function GlobalError({ error }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        {/* Renders the built-in Next.js error page UI */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
