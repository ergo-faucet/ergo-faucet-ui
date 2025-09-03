import { BackendUrl } from '@/configs';

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${BackendUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return await response.json();
};
