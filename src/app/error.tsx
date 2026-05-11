'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-2xl font-semibold text-red-400">Something went wrong</h2>
      <p className="max-w-md text-slate-400">
        An unexpected error occurred. Our team has been notified.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
