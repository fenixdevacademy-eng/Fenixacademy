'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">F</span>
                            </div>
                            <span className="text-white font-bold text-xl">Fênix Dev Academy</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Início
                            </Link>
                            <Link href="/cursos" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Cursos
                            </Link>
                            <Link href="/ide-advanced" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
                                <span>💻</span>
                                <span>IDE Fênix</span>
                            </Link>
                            <Link href="/sobre" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Sobre
                            </Link>
                            <Link href="/contato" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Contato
                            </Link>
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-4">
                            <Link
                                href="/auth/login"
                                className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Entrar
                            </Link>
                            <Link
                                href="/auth/register"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                            >
                                Começar Agora
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-purple-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Abrir menu principal</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/40 backdrop-blur-md">
                        <Link href="/" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium">
                            Início
                        </Link>
                        <Link href="/cursos" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium">
                            Cursos
                        </Link>
                        <Link href="/ide-advanced" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2">
                            <span>💻</span>
                            <span>IDE Fênix</span>
                        </Link>
                        <Link href="/sobre" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium">
                            Sobre
                        </Link>
                        <Link href="/contato" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium">
                            Contato
                        </Link>
                        <div className="pt-4 pb-3 border-t border-white/10">
                            <Link href="/auth/login" className="text-white hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium">
                                Entrar
                            </Link>
                            <Link href="/auth/register" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white block px-3 py-2 rounded-lg text-base font-medium mt-2">
                                Começar Agora
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
