import { BackendUrl } from '@/configs';

import { useAuthStore } from './auth-store';

let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

/**
 * Refresh access token using HttpOnly refresh cookie
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  if (isRefreshing) {
    return new Promise((resolve) => refreshQueue.push(() => resolve(true)));
  }

  isRefreshing = true;

  try {
    const response = await fetch(`${BackendUrl}/auth/ergo/refresh-token`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) return false;

    const data = await response.json();
    useAuthStore.getState().setAccessToken(data.newToken);

    refreshQueue.forEach((cb) => cb());
    refreshQueue = [];
    return true;
  } catch {
    return false;
  } finally {
    isRefreshing = false;
  }
};

/**
 * Authenticated fetch wrapper
 * - Attaches Bearer token
 * - Refreshes on 401 and retries once
 */
export const authFetch = async (url: string, options: RequestInit = {}) => {
  let accessToken = useAuthStore.getState().accessToken;
  if (!accessToken) throw new Error('No access token, please login.');

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${accessToken}`);
  headers.set('Content-Type', 'application/json');

  let response = await fetch(`${BackendUrl}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  // Handle 401 → attempt refresh
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) throw new Error('Authentication failed, please login again.');

    accessToken = useAuthStore.getState().accessToken;
    headers.set('Authorization', `Bearer ${accessToken}`);

    response = await fetch(`${BackendUrl}${url}`, {
      ...options,
      headers,
      credentials: 'include',
    });
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

// SWR fetcher for authenticated endpoints
export const swrAuthFetcher = (url: string) => authFetch(url);
