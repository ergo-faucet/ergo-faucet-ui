'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useEffect, useRef } from 'react';

import { toast } from 'sonner';

/**
 * Listens for auth callback query params and shows a Sonner notification.
 * Then cleans the URL (removes auth-related params) without a full reload.
 */
const URLAuthNotifierInner = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const hasHandledRef = useRef(false);

  useEffect(() => {
    if (hasHandledRef.current) return; // avoid double-run in React Strict Mode

    let authMethod = searchParams.get('authMethod');
    let status = searchParams.get('authMethodStatus');
    let message = searchParams.get('message');

    // Fallback parsing for malformed URLs with an extra '?' before auth params
    // Example: ...&selected=1?authMethod=google&authMethodStatus=success&message=...
    if (!authMethod || !status) {
      const href = typeof window !== 'undefined' ? window.location.href : '';
      const getParam = (name: string) => {
        const re = new RegExp(`[?&]${name}=([^&#]*)`);
        const match = href.match(re);
        return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
      };
      authMethod = authMethod ?? getParam('authMethod');
      status = status ?? getParam('authMethodStatus');
      message = message ?? getParam('message');
    }

    if (!authMethod || !status) return;

    const isSuccess = status === 'success' || status === 'true';
    const title = `${authMethod} authentication`;
    const description = message ?? (isSuccess ? 'Authentication succeeded.' : 'Authentication failed.');

    // show toast slightly delayed to ensure Toaster is mounted
    setTimeout(() => {
      toast(title, {
        description,
        action: undefined,
      });
    }, 50);

    // mark handled to avoid duplicate toasts
    hasHandledRef.current = true;

    // Defer URL cleaning more to avoid interrupting the toast render
    setTimeout(() => {
      // remove auth-related params from URL (normal case)
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('authMethod');
      newParams.delete('authMethodStatus');
      newParams.delete('message');

      const newQuery = newParams.toString();
      let url = newQuery ? `${pathname}?${newQuery}` : pathname;

      // If URL was malformed with '?authMethod', strip trailing auth segment explicitly
      if (typeof window !== 'undefined') {
        const href = window.location.href;
        const idxQ = href.indexOf('?authMethod=');
        const idxA = href.indexOf('&authMethod=');
        const cutIdx = idxQ >= 0 ? idxQ : idxA;
        if (cutIdx >= 0) {
          const origin = window.location.origin;
          const base = href.substring(0, cutIdx);
          // convert absolute to relative for Next router
          url = base.startsWith(origin) ? base.substring(origin.length) : base;
        }
      }

      router.replace(url);
    }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export const URLAuthNotifier = () => (
  <Suspense fallback={null}>
    <URLAuthNotifierInner />
  </Suspense>
);
