'use client';

import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { CourseItem } from '../lib/payment-service';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';

interface CoursePurchaseButtonProps {
    course: CourseItem;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    showPrice?: boolean;
    className?: string;
}

export default function CoursePurchaseButton({
    course,
    variant = 'primary',
    size = 'md',
    showPrice = true,
    className = ''
}: CoursePurchaseButtonProps) {
    const { addItem, isInCart, getTotalItems } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    const isInCartValue = isInCart(course.id);

    const handleAddToCart = async () => {
        if (isInCartValue) return;

        setIsAdding(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));

            addItem(course);
            setJustAdded(true);

            // Reset "just added" state after 2 seconds
            setTimeout(() => setJustAdded(false), 2000);
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600';
            case 'secondary':
                return 'bg-gray-600 text-white hover:bg-gray-700 border-gray-600';
            case 'outline':
                return 'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50';
            default:
                return 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600';
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-2 text-sm';
            case 'md':
                return 'px-4 py-2 text-base';
            case 'lg':
                return 'px-6 py-3 text-lg';
            default:
                return 'px-4 py-2 text-base';
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {showPrice && (
                <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(course.price)}
                    </span>
                    {course.originalPrice && course.originalPrice > course.price && (
                        <>
                            <span className="text-lg text-gray-500 line-through">
                                {formatPrice(course.originalPrice)}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                                -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                            </span>
                        </>
                    )}
                </div>
            )}

            <button
                onClick={handleAddToCart}
                disabled={isInCartValue || isAdding}
                className={`
          w-full flex items-center justify-center space-x-2 rounded-lg border-2 font-medium transition-all duration-200
          ${getVariantClasses()}
          ${getSizeClasses()}
          ${isInCartValue ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
          ${justAdded ? 'animate-pulse' : ''}
        `}
            >
                {isAdding ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Adicionando...</span>
                    </>
                ) : justAdded ? (
                    <>
                        <Check className="w-5 h-5" />
                        <span>Adicionado!</span>
                    </>
                ) : isInCartValue ? (
                    <>
                        <Check className="w-5 h-5" />
                        <span>No Carrinho</span>
                    </>
                ) : (
                    <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Adicionar ao Carrinho</span>
                    </>
                )}
            </button>

            {isInCartValue && (
                <div className="text-center">
                    <p className="text-sm text-green-600 font-medium">
                        ✓ Este curso está no seu carrinho
                    </p>
                    <p className="text-xs text-gray-500">
                        {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} no carrinho
                    </p>
                </div>
            )}

            {/* Course Info */}
            <div className="text-center space-y-1">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">{course.duration}</span> de conteúdo
                </p>
                <p className="text-sm text-gray-600">
                    Nível: <span className="font-medium capitalize">{course.level}</span>
                </p>
                {course.discount && course.discount > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                        Economize {formatPrice(course.discount)}!
                    </p>
                )}
            </div>

            {/* Trust Signals */}
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Garantia 7 dias</span>
                </div>
                <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Acesso vitalício</span>
                </div>
                <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Certificado</span>
                </div>
            </div>
        </div>
    );
}
