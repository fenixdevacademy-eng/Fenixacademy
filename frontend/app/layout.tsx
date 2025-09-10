import Script from "next/script"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Providers } from './components/Providers'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from '../contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { PerformanceMonitor } from './components/PerformanceMonitor'
import ErrorBoundary from '../components/ErrorBoundary'
import FloatingAIButton from '../components/FloatingAIButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Fenix Academy - CS50 Quality Education | Cursos de Programação',
    template: '%s | Fenix Academy'
  },
  description: 'Aprenda programação com a qualidade do CS50 de Harvard, mas com foco no mercado brasileiro. Cursos de Web Development, Python, React, Node.js, Data Science e muito mais. 20+ cursos, 50k+ alunos formados, 95% taxa de empregabilidade.',
  keywords: [
    'programação', 'curso', 'web development', 'python', 'react', 'nodejs', 'javascript',
    'CS50', 'harvard', 'data science', 'machine learning', 'frontend', 'backend',
    'full stack', 'desenvolvimento web', 'curso online', 'tecnologia', 'carreira tech',
    'programação brasil', 'curso programação', 'aprender programar', 'desenvolvedor',
    'engenharia de software', 'ciência da computação', 'bootcamp', 'mentoria'
  ],
  authors: [{ name: 'Fenix Academy', url: 'https://fenixacademy.com.br' }],
  creator: 'Fenix Academy',
  publisher: 'Fenix Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fenixacademy.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://fenixacademy.com.br',
    title: 'Fenix Academy - CS50 Quality Education | Cursos de Programação',
    description: 'Aprenda programação com a qualidade do CS50 de Harvard, mas com foco no mercado brasileiro. 20+ cursos, 50k+ alunos formados, 95% taxa de empregabilidade.',
    siteName: 'Fenix Academy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fenix Academy - CS50 Quality Education | Cursos de Programação',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fenix Academy - CS50 Quality Education | Cursos de Programação',
    description: 'Aprenda programação com a qualidade do CS50 de Harvard, mas com foco no mercado brasileiro. 20+ cursos, 50k+ alunos formados, 95% taxa de empregabilidade.',
    images: ['/og-image.jpg'],
    creator: '@fenixacademy',
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
  },
  category: 'education',
  classification: 'Educational Technology',
  referrer: 'origin-when-cross-origin',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-gray-900 text-white`}>
        <ErrorBoundary>
          <Providers>
            <LanguageProvider>
              <AuthProvider>
                <ThemeProvider>
                  <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-1">
                      {children}
                    </main>
                    <Footer />
                    <FloatingAIButton />
                  </div>
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#1f2937',
                        color: '#fff',
                        border: '1px solid #374151',
                      },
                    }}
                  />
                  <PerformanceMonitor />
                </ThemeProvider>
              </AuthProvider>
            </LanguageProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}