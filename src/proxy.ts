import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/history(.*)',
  '/templates(.*)',
  '/settings(.*)',
  '/api/((?!webhooks/stripe).*)',
]);

// Sentry tunnel — must never be intercepted by auth middleware
const isSentryTunnel = createRouteMatcher(['/monitoring(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isSentryTunnel(req)) return;

  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
