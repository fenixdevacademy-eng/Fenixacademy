'use client';

import React, { useState } from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';

interface AddToCartButtonProps {
    course: {
        id: string;
        title: string;
        price: number;
        currency: string;
        thumbnail: string;
        category: string;
        level: string;
        duration_hours: number;
        total_lessons: number;
        total_modules: number;
    };
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
    showText?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

export default function AddToCartButton({
    course,
    className = '',
    variant = 'primary',
    size = 'md',
    showIcon = true,
    showText = true,
    disabled = false,
    loading = false
}: AddToCartButtonProps) {
    const { addItem, isInCart, removeItem } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const isInCartState = isInCart(course.id);

    const handleAddToCart = async () => {
        if (isInCartState) {
            removeItem(course.id);
            return;
        }

        setIsAdding(true);

        try {
            const cartItem: CartItem = {
                id: course.id,
                title: course.title,
                price: course.price,
                currency: course.currency,
                thumbnail: course.thumbnail,
                category: course.category,
                level: course.level,
                duration_hours: course.duration_hours,
                total_lessons: course.total_lessons,
                total_modules: course.total_modules,
                quantity: 1
            };

            await addItem(cartItem);
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return isInCartState
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white';
            case 'secondary':
                return isInCartState
                    ? 'bg-green-100 hover:bg-green-200 text-green-800'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800';
            case 'outline':
                return isInCartState
                    ? 'border-green-600 text-green-600 hover:bg-green-50'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50';
            case 'ghost':
                return isInCartState
                    ? 'text-green-600 hover:bg-green-50'
                    : 'text-blue-600 hover:bg-blue-50';
            default:
                return 'bg-blue-600 hover:bg-blue-700 text-white';
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 text-sm';
            case 'md':
                return 'px-4 py-2 text-sm';
            case 'lg':
                return 'px-6 py-3 text-base';
            default:
                return 'px-4 py-2 text-sm';
        }
    };

    const getIconSize = () => {
        switch (size) {
            case 'sm':
                return 'w-3 h-3';
            case 'md':
                return 'w-4 h-4';
            case 'lg':
                return 'w-5 h-5';
            default:
                return 'w-4 h-4';
        }
    };

    const getButtonText = () => {
        if (loading || isAdding) {
            return 'Adicionando...';
        }
        if (isInCartState) {
            return 'Remover do Carrinho';
        }
        return 'Adicionar ao Carrinho';
    };

    const getIcon = () => {
        if (loading || isAdding) {
            return <Loader2 className={`${getIconSize()} animate-spin`} />;
        }
        if (isInCartState) {
            return <Check className={getIconSize()} />;
        }
        return <ShoppingCart className={getIconSize()} />;
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={disabled || loading || isAdding}
            className={`
                inline-flex items-center gap-2 rounded-lg font-medium transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${getVariantClasses()}
                ${getSizeClasses()}
                ${className}
            `}
        >
            {showIcon && getIcon()}
            {showText && getButtonText()}
        </button>
    );
}