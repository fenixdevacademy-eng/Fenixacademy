'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Menu, X } from 'lucide-react';

interface FenixHeaderProps {
    showAuthButtons?: boolean;
    currentPage?: string;
}

export default function FenixHeader({ showAuthButtons = true, currentPage = '' }: FenixHeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navigationLinks = [
        { href: '/courses', label: 'Cursos' },
        { href: '/ide', label: 'IDE' },
        { href: '/ai', label: 'IA Tutor' },
        { href: '/pricing', label: 'Preços' },
        { href: '/about', label: 'Sobre' },
        { href: '/contact', label: 'Contato' },
    ];

    return (
        <header className="relative z-10">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-2">
                            <Code className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                            Fênix Dev Academy
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-white hover:text-red-300 transition-colors ${currentPage === link.href ? 'text-red-300 font-semibold' : ''
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {showAuthButtons && (
                            <div className="flex items-center space-x-3 ml-4">
                                <Link
                                    href="/login"
                                    className="text-white hover:text-red-300 transition-colors px-4 py-2 rounded-lg border border-white/20 hover:border-red-300"
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Começar Agora
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Menu mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-red-300 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-white/20">
                        <div className="flex flex-col space-y-4">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-white hover:text-red-300 transition-colors py-2 ${currentPage === link.href ? 'text-red-300 font-semibold' : ''
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {showAuthButtons && (
                                <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                                    <Link
                                        href="/login"
                                        className="text-white hover:text-red-300 transition-colors py-2 text-center rounded-lg border border-white/20 hover:border-red-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2 px-6 rounded-lg transition-all duration-300 text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Começar Agora
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}



