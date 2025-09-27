import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import { Providers } from './components/Providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'})

export const metadata: Metadata = {
  title: {
    default: 'Fênix Dev Academy | Cursos de Programação',
    template: '%s | Fênix Dev Academy'
  },
  description: 'Aprenda programação com padrão internacional de qualidade. Cursos de Web Development, Python, React, Node.js, Data Science e muito mais.',
  keywords: [
    'programação', 'curso', 'web development', 'python', 'react', 'nodejs', 'javascript',
    'data science', 'machine learning', 'frontend', 'backend', 'full stack'
  ],
  authors: [{ name: 'Fênix Dev Academy' }],
  creator: 'Fênix Dev Academy',
  publisher: 'Fênix Dev Academy',
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL('https://fenixdevacademy.com.br'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://fenixdevacademy.com.br',
    title: 'Fênix Dev Academy | Cursos de Programação',
    description: 'Aprenda programação com padrão internacional de qualidade.',
    siteName: 'Fênix Dev Academy'},
  twitter: {
    card: 'summary_large_image',
    title: 'Fênix Dev Academy | Cursos de Programação',
    description: 'Aprenda programação com padrão internacional de qualidade.'},
  robots: {
    index: true,
    follow: true},
  category: 'education'}

export default function RootLayout({
  children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            <AdvancedParticles />
            <VisualEffects />

            <Navigation />
            <main className="relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}