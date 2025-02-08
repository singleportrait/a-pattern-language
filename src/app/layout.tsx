import type { Metadata } from 'next';
import { EB_Garamond, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const garamondAtf = localFont({
  src: 'fonts/garamond-atf-subhead-regular.woff2',
  variable: '--font-garamond-atf-subhead',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'A Pattern Language Index',
  description: 'A guide to the seminal architecture book by Christopher Alexander.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.variable} ${inter.variable} ${garamondAtf.variable}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
