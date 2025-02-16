import type { Metadata, Viewport } from 'next';
import { EB_Garamond } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const aktiveGrotesk = localFont({
  src: 'fonts/aktivgrotesk-regular.woff2',
  variable: '--font-aktiv-grotesk-regular',
});

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

export const metadata: Metadata = {
  title: {
    template: '%s | A Pattern Language Index',
    default: 'A Pattern Language Index',
  },
  description: 'A guide to the seminal architecture book by Christopher Alexander.',
};

export const viewport: Viewport = {
  themeColor: '#d5f3d3',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.variable} ${aktiveGrotesk.variable} ${garamondAtf.variable}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
