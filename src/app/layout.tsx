import type { Metadata } from 'next';

import LeftNavbar from '@/components/navbar/left-navbar';
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
        <LeftNavbar className='sticky top-0 h-screen' />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
