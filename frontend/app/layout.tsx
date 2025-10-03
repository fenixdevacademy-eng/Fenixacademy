import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fênix Dev Academy - Plataforma Revolucionária',
  description: '🚀 A plataforma de desenvolvimento mais revolucionária do Brasil! Transforme sua carreira com tecnologia de ponta.',
  keywords: 'desenvolvimento, programação, cursos, tecnologia, IA, revolucionário',
  authors: [{ name: 'Fênix Dev Academy' }],
  creator: 'Fênix Dev Academy',
  publisher: 'Fênix Dev Academy',
  robots: 'index, follow',
  openGraph: {
    title: 'Fênix Dev Academy - Plataforma Revolucionária',
    description: '🚀 A plataforma de desenvolvimento mais revolucionária do Brasil!',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Fênix Dev Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fênix Dev Academy - Plataforma Revolucionária',
    description: '🚀 A plataforma de desenvolvimento mais revolucionária do Brasil!',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8B5CF6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#8B5CF6" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}