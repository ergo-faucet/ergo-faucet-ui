import type { Metadata } from 'next';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
