import { BackendUrl } from '@/configs';

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${BackendUrl}${url}`, {
    ...options,
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
export const swrFetcher = (url: string) => apiFetch(url);
