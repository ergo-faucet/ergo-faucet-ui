import { Inter, Roboto_Condensed, Open_Sans } from 'next/font/google';

export const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});
