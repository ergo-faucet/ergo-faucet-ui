// import { useWalletStore } from '@/store/wallet-store';
'use client';

import { getSession } from 'next-auth/react';

import { apiFetch } from './api-fetch';

// import { useWalletStore } from '@/store/wallet-store';

// import { useWalletStore } from '@/store/wallet-store';

// import { useWalletStore } from '@/store/wallet-store';

const getAccessToken = async (): Promise<string | null> => {
  const session = await getSession();
  return session?.accessToken ?? null;
};

/**
 * Authenticated fetch wrapper
 * - Attaches Bearer token from Auth.js session
 */
export const authFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error('No access token, please login.');

  const mergedHeaders = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  return apiFetch(url, {
    ...options,
    headers: mergedHeaders,
    credentials: 'include',
  });
};

// SWR fetcher for authenticated endpoints
export const swrAuthFetcher = async (url: string, options?: RequestInit | { arg?: RequestInit }) => {
  let requestInit: RequestInit | undefined;

  if (options && 'arg' in options) {
    requestInit = options.arg;
  } else {
    requestInit = options as RequestInit | undefined;
  }

  return authFetch(url, requestInit);
};
