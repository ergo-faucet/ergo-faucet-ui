'use client';

import { useEffect } from 'react';

import { BackendUrl } from '@/configs';
import { useAuthStore } from '@/lib/api/auth-store';

/**
 * Component that initializes authentication state on app load
 * by attempting to refresh the access token using HttpOnly cookies
 */
export const AuthInitializer = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch(`${BackendUrl}/auth/ergo/refresh-token`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.newToken) {
            setAccessToken(data.newToken);
          }
        }
      } catch {
        // Silent fail - auth initialization is optional
      }
    };

    initializeAuth();
  }, [setAccessToken]);

  return null; // This component doesn't render anything
};
