import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | A Pattern Language Index',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
