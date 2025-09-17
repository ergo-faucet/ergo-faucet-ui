import type { Metadata } from 'next';

import LeftSidebar from '@/components/navbar/left-sidebar';
import { Toaster } from '@/components/ui/sonner';
import { robotoCondensed } from '@/fonts';
import { Providers } from '@/providers';

import { URLAuthNotifier } from '../components/url-auth-notifier';
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
          <div className='flex h-full w-full items-start justify-start bg-gray-300 dark:bg-gray-900'>
            <LeftSidebar className='sticky top-0 h-screen' />
            {children}
          </div>
          <Toaster position='top-center' richColors closeButton expand={false} />
          <URLAuthNotifier />
        </Providers>
      </body>
    </html>
  );
}
