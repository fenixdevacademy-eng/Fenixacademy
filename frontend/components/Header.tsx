'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NavLinks } from '@/components/ui/NavigationLink';
import { ActionButtons } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href={ROUTES.home} className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Fenix Academy</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLinks.Home className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <NavLinks.Courses className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <NavLinks.Pricing className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <NavLinks.Blog className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <NavLinks.Careers className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <NavLinks.Contact className="text-gray-700 hover:text-blue-600 transition-colors" />
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLinks.Login className="text-gray-700 hover:text-blue-600 transition-colors" />
                        <ActionButtons.Register />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
                            <NavLinks.Home className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors" />
                            <NavLinks.Courses className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors" />
                            <NavLinks.Pricing className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors" />
                            <NavLinks.Blog className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors" />
                            <NavLinks.Careers className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors" />
                            <NavLinks.Contact className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors" />
                            <div className="border-t border-gray-200 pt-3 mt-3">
                                <NavLinks.Login className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors" />
                                <div className="px-3 py-2">
                                    <ActionButtons.Register className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

