'use client';

import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function CartButton() {
    const { state, toggleCart } = useCart();
    const { itemCount } = state;

    return (
        <button
            onClick={toggleCart}
            className="relative flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
        >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Carrinho</span>

            {/* Badge com quantidade */}
            {itemCount > 0 && (
                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {itemCount > 99 ? '99+' : itemCount}
                </div>
            )}
        </button>
    );
}
