'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { SWRConfig } from 'swr';

import { SwrRefreshSeconds } from '@/configs';

export function Providers({ children }: { children: React.ReactNode }) {
  const refreshIntervalMs = Math.max(0, Number.isFinite(SwrRefreshSeconds) ? SwrRefreshSeconds : 0) * 1000;
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          refreshInterval: refreshIntervalMs,
        }}
      >
        <NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </NextThemesProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
