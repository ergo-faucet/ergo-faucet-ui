import { BackendUrl } from '@/configs';

import { apiFetch } from './api-fetch';
import { useAuthStore } from './auth-store';

let isRefreshing = false;
let refreshQueue: Array<() => void> = []; // to prevent race conditions

/**
 * Refresh access token using HttpOnly refresh cookie
 */
const refreshAccessToken = async (): Promise<boolean> => {
  if (isRefreshing) {
    // wait for ongoing refresh
    return new Promise((resolve) => refreshQueue.push(() => resolve(true)));
  }

  isRefreshing = true;

  try {
    const data = await apiFetch('/auth/ergo/refresh-token', {
      method: 'GET',
      credentials: 'include', // sends HttpOnly cookie
    });

    if (!data.ok) return false;

    useAuthStore.getState().setAccessToken(data.newToken);

    // resolve queued requests
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
 */
export const authFetch = async (url: string, options: RequestInit = {}) => {
  let accessToken = useAuthStore.getState().accessToken;
  if (!accessToken) throw new Error('No access token, please login.');

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${accessToken}`);

  let response = await apiFetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) throw new Error('Authentication failed, please login.');

    // Retry after refresh
    accessToken = useAuthStore.getState().accessToken;
    headers.set('Authorization', `Bearer ${accessToken}`);
    response = await fetch(`${BackendUrl}${url}`, {
      ...options,
      headers,
      credentials: 'include',
    });
  }

  return response.json();
};
