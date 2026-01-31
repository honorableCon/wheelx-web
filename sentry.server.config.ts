/**
 * Sentry Server-Side Configuration
 * 
 * This file configures Sentry for Node.js server-side rendering.
 */

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
    
    // Filter out noisy errors
    ignoreErrors: [
      'ECONNRESET',
      'ETIMEDOUT',
    ],
    
    beforeSend(event) {
      // Remove sensitive headers
      if (event.request?.headers) {
        delete event.request.headers.authorization;
        delete event.request.headers.cookie;
      }
      return event;
    },
  });
} else {
  console.log('[Sentry] No DSN configured. Server error tracking disabled.');
}
