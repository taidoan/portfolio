import { Inter, Barlow, Barlow_Condensed } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--ff-body',
});

export const barlow = Barlow({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--ff-display',
});

export const barlow_condensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--ff-display-condensed',
});
