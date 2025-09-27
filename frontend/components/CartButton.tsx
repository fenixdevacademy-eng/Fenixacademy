'use client';

import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
    className?: string;
    showBadge?: boolean;
    variant?: 'default' | 'minimal' | 'large';
}

export default function CartButton({
    className = '',
    showBadge = true,
    variant = 'default'
}: CartButtonProps) {
    const { state, toggleCart } = useCart();
    const { itemCount } = state;

    const getButtonClasses = () => {
        const baseClasses = 'relative flex items-center justify-center transition-colors';

        switch (variant) {
            case 'minimal':
                return `${baseClasses} p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg`;
            case 'large':
                return `${baseClasses} px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium`;
            default:
                return `${baseClasses} p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg`;
        }
    };

    const getIconSize = () => {
        switch (variant) {
            case 'large':
                return 'w-5 h-5';
            default:
                return 'w-5 h-5';
        }
    };

    return (
        <button
            onClick={toggleCart}
            className={`${getButtonClasses()} ${className}`}
            aria-label={`Carrinho com ${itemCount} itens`}
        >
            <ShoppingCart className={getIconSize()} />

            {showBadge && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                </span>
            )}
        </button>
    );
}