/**
 * Sentry Client-Side Configuration
 * 
 * This file configures Sentry for the browser/client side.
 * 
 * Setup:
 * 1. Run: npx @sentry/wizard@latest -i nextjs
 * 2. Or install manually: npm install @sentry/nextjs
 * 3. Set NEXT_PUBLIC_SENTRY_DSN in .env.local
 */

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
    
    // Session Replay
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
    
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
      Sentry.browserTracingIntegration(),
    ],
    
    // Filter out noisy errors
    ignoreErrors: [
      // Browser extensions
      /^chrome-extension:/,
      /^moz-extension:/,
      // Network errors that are expected
      'NetworkError',
      'Failed to fetch',
      // User cancellation
      'AbortError',
    ],
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    beforeSend(event: any) {
      // Sanitize URLs with sensitive data
      if (event.request?.url) {
        const url = new URL(event.request.url);
        url.searchParams.delete('token');
        url.searchParams.delete('code');
        event.request.url = url.toString();
      }
      return event;
    },
  });
} else {
  console.log('[Sentry] No DSN configured. Error tracking disabled.');
}
