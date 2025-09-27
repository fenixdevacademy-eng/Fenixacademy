"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../hooks/useCart';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import ShoppingCart from './ShoppingCart';

export default function HeaderWithCart() {
    const { getTotalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const totalItems = getTotalItems();

    return (
        <>
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="text-xl font-bold">Fenix</Link>
                        <button
                            aria-label="Abrir carrinho"
                            className="relative p-2 rounded hover:bg-gray-100"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCartIcon className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 text-xs bg-blue-600 text-white rounded-full px-1 min-w-5 text-center">
                                {totalItems > 99 ? '99+' : totalItems}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <ShoppingCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
}