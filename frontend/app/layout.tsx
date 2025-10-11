import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import DeployVersion from '@/components/DeployVersion';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fênix Dev Academy - Transforme sua Carreira em Tech',
  description: 'A plataforma mais revolucionária do Brasil para desenvolvedores. Aprenda React, Node.js, Python e mais com IA tutor personalizada.',
  keywords: 'desenvolvimento, programação, React, Node.js, Python, JavaScript, cursos online, tecnologia',
  authors: [{ name: 'Fênix Dev Academy' }],
  creator: 'Fênix Dev Academy',
  publisher: 'Fênix Dev Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fenixdevacademy.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://fenixdevacademy.com.br',
    title: 'Fênix Dev Academy - Transforme sua Carreira em Tech',
    description: 'A plataforma mais revolucionária do Brasil para desenvolvedores. Aprenda React, Node.js, Python e mais com IA tutor personalizada.',
    siteName: 'Fênix Dev Academy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fênix Dev Academy - Transforme sua Carreira em Tech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fênix Dev Academy - Transforme sua Carreira em Tech',
    description: 'A plataforma mais revolucionária do Brasil para desenvolvedores. Aprenda React, Node.js, Python e mais com IA tutor personalizada.',
    images: ['/twitter-image.jpg'],
    creator: '@fenixdevacademy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Meta tags para prevenir cache */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="cache-control" content="max-age=0" />
        <meta name="expires" content="0" />
        <meta name="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
        <meta name="pragma" content="no-cache" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Fênix Dev Academy",
              "description": "A plataforma mais revolucionária do Brasil para desenvolvedores",
              "url": "https://fenixdevacademy.com.br",
              "logo": "https://fenixdevacademy.com.br/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-11-99999-9999",
                "contactType": "customer service",
                "availableLanguage": "Portuguese"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
              },
              "sameAs": [
                "https://www.facebook.com/fenixdevacademy",
                "https://www.instagram.com/fenixdevacademy",
                "https://www.linkedin.com/company/fenixdevacademy",
                "https://twitter.com/fenixdevacademy"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>

        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if (typeof window !== 'undefined' && 'performance' in window) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    }
                  }, 0);
                });
              }
              
              // Error tracking
              if (typeof window !== 'undefined') {
                window.addEventListener('error', function(e) {
                  console.error('Global Error:', e.error);
                });
                
                // Unhandled promise rejection tracking
                window.addEventListener('unhandledrejection', function(e) {
                  console.error('Unhandled Promise Rejection:', e.reason);
                });
              }
            `
          }}
        />
        <DeployVersion />
      </body>
    </html>
  );
}