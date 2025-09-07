import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '../contexts/LanguageContext'
import { Providers } from '../components/Providers'
import { Toaster } from 'react-hot-toast'
import { PerformanceMonitor } from '../components/PerformanceMonitor'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Dashboard CEO - Fenix Academy',
    description: 'Área exclusiva do CEO da Fenix Academy',
    robots: {
        index: false,
        follow: false,
    },
}

export default function CEODashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <meta name="theme-color" content="#0f172a" />
            </head>
            <body className={`${inter.className} antialiased`} suppressHydrationWarning>
                <ThemeProvider>
                    <AuthProvider>
                        <LanguageProvider>
                            <Providers>
                                <div className="min-h-screen bg-gray-50">
                                    {children}
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
            </body>
        </html>
    )
}



