import { Volkhov, Roboto_Condensed, Viga, Inter } from 'next/font/google';

export const volkhov = Volkhov({
  subsets: ['latin'],
  weight: ['400'],
});

export const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
});

export const viga = Viga({
  subsets: ['latin'],
  weight: ['400'],
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});
