import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GenStacker - AI Content Generator Tools',
  description: 'Generate blogs, ads, SEO content and more using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
