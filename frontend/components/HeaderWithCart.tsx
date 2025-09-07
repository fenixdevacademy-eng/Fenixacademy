'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import ShoppingCartComponent from './ShoppingCart';

export default function HeaderWithCart() {
    const { getTotalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const totalItems = getTotalItems();

    return (
        <>
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">F</span>
                                </div>
                                <span className="ml-2 text-xl font-bold text-gray-900">
                                    Fenix Academy
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <Link
                                href="/courses"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Cursos
                            </Link>
                            <Link
                                href="/about"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Sobre
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Contato
                            </Link>
                        </nav>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-lg mx-8">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar cursos..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Right side actions */}
                        <div className="flex items-center space-x-4">
                            {/* Search button for mobile */}
                            <button className="md:hidden p-2 text-gray-400 hover:text-gray-600">
                                <Search className="h-5 w-5" />
                            </button>

                            {/* User menu */}
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <User className="h-5 w-5" />
                            </button>

                            {/* Shopping cart */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-gray-400 hover:text-gray-600"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-gray-400 hover:text-gray-600"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                                <Link
                                    href="/courses"
                                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Cursos
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sobre
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contato
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Shopping Cart Modal */}
            <ShoppingCartComponent
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
}
