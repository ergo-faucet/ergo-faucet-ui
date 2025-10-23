import { apiFetch } from './api-fetch';
import { useAuthStore } from './auth-store';

let isRefreshing = false;
let refreshQueue: Array<() => void> = [];

/**
 * Refresh access token using HttpOnly refresh cookie
 */
const refreshAccessToken = async (): Promise<boolean> => {
  if (isRefreshing) {
    return new Promise((resolve) => refreshQueue.push(() => resolve(true)));
  }

  isRefreshing = true;

  try {
    const response = await apiFetch('/auth/ergo/refresh-token', {
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

  // merged headers
  const mergedHeaders = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  // first request
  let response;
  try {
    response = await apiFetch(url, {
      ...options,
      headers: mergedHeaders,
      credentials: 'include',
    });
    return response;
  } catch (error) {
    // only retry on 401
    if (!(error instanceof Error) || !error.message.includes('401')) throw error;
  }

  // attempt token refresh
  const refreshed = await refreshAccessToken();
  if (!refreshed) throw new Error('Authentication failed, please login again.');

  // retry with new token
  accessToken = useAuthStore.getState().accessToken;
  const retryHeaders = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  const retryResponse = await apiFetch(url, {
    ...options,
    headers: retryHeaders,
    credentials: 'include',
  });

  return retryResponse;
};

// SWR fetcher for authenticated endpoints
export const swrAuthFetcher = async (url: string, options?: RequestInit | { arg?: RequestInit }) => {
  const token = useAuthStore.getState().accessToken;
  if (!token) throw new Error('No access token, please login.');

  let requestInit: RequestInit | undefined;

  if (options && 'arg' in options) {
    requestInit = options.arg;
  } else {
    requestInit = options as RequestInit | undefined;
  }

  return authFetch(url, requestInit);
};
