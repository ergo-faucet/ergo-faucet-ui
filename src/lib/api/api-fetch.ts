import { BackendUrl } from '@/configs';

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${BackendUrl}${url}`, {
    ...options,
    credentials: options.credentials ?? 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};

// fetcher for SWR
export const swrFetcher = async (url: string, options?: RequestInit | { arg?: RequestInit }) => {
  let requestInit: RequestInit | undefined;

  // If options has 'arg' (SWR mutation), use it; otherwise use options directly
  if (options && 'arg' in options) {
    requestInit = options.arg;
  } else {
    requestInit = options as RequestInit | undefined;
  }

  return apiFetch(url, requestInit);
};
