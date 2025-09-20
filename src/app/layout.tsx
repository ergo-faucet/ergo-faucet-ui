import type { Metadata } from 'next';

import { AuthInitializer } from '@/components/auth-initializer';
import LeftSidebar from '@/components/navbar/left-sidebar';
import { robotoCondensed } from '@/fonts';
import { Providers } from '@/providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Ergo Fuacet UI',
  description: 'Do tasks and win rewards',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`antialiased transition-colors ${robotoCondensed.className}`}>
        <Providers>
          <AuthInitializer />
          <div className='flex h-full w-full items-start justify-start bg-gray-300 dark:bg-gray-900'>
            <LeftSidebar className='sticky top-0 h-screen' />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
