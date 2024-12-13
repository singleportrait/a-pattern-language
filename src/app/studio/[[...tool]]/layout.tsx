import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A Pattern Language',
  description: 'By Christopher Alexander',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
