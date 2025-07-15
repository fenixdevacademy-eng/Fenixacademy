import Script from "next/script"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Providers } from './components/Providers'
import { appWithTranslation } from 'next-i18next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fenix Academy - Aprenda Programação do Zero ao Avançado',
  description: 'Plataforma de ensino de programação com cursos práticos, projetos reais e mentoria personalizada. Do básico ao avançado em Python, JavaScript, React e muito mais.',
  keywords: 'programação, cursos, python, javascript, react, desenvolvimento web, tecnologia, educação',
  authors: [{ name: 'Fenix Academy' }],
  creator: 'Fenix Academy',
  publisher: 'Fenix Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fenixacademy.com'),
  openGraph: {
    title: 'Fenix Academy - Aprenda Programação do Zero ao Avançado',
    description: 'Plataforma de ensino de programação com cursos práticos, projetos reais e mentoria personalizada.',
    url: 'https://fenixacademy.com',
    siteName: 'Fenix Academy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fenix Academy - Plataforma de Ensino de Programação',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fenix Academy - Aprenda Programação do Zero ao Avançado',
    description: 'Plataforma de ensino de programação com cursos práticos, projetos reais e mentoria personalizada.',
    images: ['/og-image.jpg'],
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3B82F6" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://js.stripe.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Fenix Academy",
              "description": "Plataforma de ensino de programação com cursos práticos",
              "url": "https://fenixacademy.com",
              "logo": "https://fenixacademy.com/logo.png",
              "sameAs": [
                "https://www.linkedin.com/company/fenix-academy",
                "https://twitter.com/fenixacademy",
                "https://www.instagram.com/fenixacademy"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contato@fenixacademy.com"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        
        {/* Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}




        />
      </body>
    </html>
  );
}

export default RootLayout; 