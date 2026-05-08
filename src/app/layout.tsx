import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'GIORAPTOR — Forex Broker Technology Provider',
    template: '%s · GIORAPTOR'
  },
  description:
    'GIORAPTOR delivers complete brokerage infrastructure: trading platforms, dealer systems, CRM, client portals, IB and affiliate portals, PAMM, copy trading, and turnkey brokerage websites.',
  keywords: [
    'forex broker technology',
    'brokerage platform',
    'white label forex',
    'dealer system',
    'broker CRM',
    'PAMM',
    'copy trading',
    'IB portal',
    'multi-asset trading'
  ],
  authors: [{ name: 'GIORAPTOR' }],
  creator: 'GIORAPTOR',
  metadataBase: new URL('https://gioraptor.com'),
  openGraph: {
    title: 'GIORAPTOR — Forex Broker Technology Provider',
    description:
      'Complete brokerage infrastructure and multi-asset trading solutions for the next generation of brokers.',
    type: 'website',
    siteName: 'GIORAPTOR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GIORAPTOR',
    description:
      'Complete brokerage infrastructure and multi-asset trading solutions.'
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-screen flex flex-col">
        <PageBackground />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
