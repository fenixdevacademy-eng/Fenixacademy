import Script from "next/script"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Providers } from './components/Providers'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { PerformanceMonitor } from './components/PerformanceMonitor'

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
    default: 'Fenix Academy - CS50 Quality Education',
    template: '%s | Fenix Academy'
  },
  description: 'Plataforma de educação em programação com qualidade CS50 da Harvard University. Aprenda desenvolvimento web, mobile, data science e muito mais com projetos reais.',
  keywords: ['programação', 'educação', 'desenvolvimento web', 'CS50', 'Harvard', 'cursos online'],
  authors: [{ name: 'Fenix Academy Team' }],
  creator: 'Fenix Academy',
  publisher: 'Fenix Academy',
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
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://fenixdevacademy.com',
    siteName: 'Fenix Academy',
    title: 'Fenix Academy - CS50 Quality Education',
    description: 'Plataforma de educação em programação com qualidade CS50 da Harvard University',
    images: [
      {
        url: 'https://fenixdevacademy.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fenix Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fenix Academy - CS50 Quality Education',
    description: 'Plataforma de educação em programação com qualidade CS50 da Harvard University',
    images: ['https://fenixdevacademy.com/twitter-image.jpg'],
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#ffffff" />
        <script src="/monaco-editor.config.js" defer></script>
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>
              <Providers>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1 pt-16">
                    {children}
                  </main>
                  <Footer />
                </div>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'hsl(var(--background))',
                      color: 'hsl(var(--foreground))',
                      border: '1px solid hsl(var(--border))',
                    },
                  }}
                />
                <PerformanceMonitor />
              </Providers>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>

        {/* Analytics Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA-XXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
} 