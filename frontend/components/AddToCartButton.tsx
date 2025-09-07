'use client';

import React from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import { ShoppingCart, Check } from 'lucide-react';

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
}

export default function AddToCartButton({ course, className = '' }: AddToCartButtonProps) {
    const { addItem, isInCart } = useCart();
    const isInCartState = isInCart(course.id);

    const handleAddToCart = () => {
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
        };

        addItem(cartItem);
    };

    if (isInCartState) {
        return (
            <button
                disabled
                className={`flex w-full items-center justify-center space-x-2 rounded-lg bg-green-600 px-4 py-3 text-white font-medium cursor-not-allowed ${className}`}
            >
                <Check className="h-5 w-5" />
                <span>Adicionado ao Carrinho</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition-colors ${className}`}
        >
            <ShoppingCart className="h-5 w-5" />
            <span>Adicionar ao Carrinho</span>
        </button>
    );
}
