'use client';

import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';

interface CourseItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image?: string;
    instructor?: string;
    isFree?: boolean;
    isPremium?: boolean;
}
import { ShoppingCart, Check, Loader2, Zap, Lock, Star } from 'lucide-react';

interface CoursePurchaseButtonProps {
    course: CourseItem;
    variant?: 'primary' | 'secondary' | 'outline' | 'success';
    size?: 'sm' | 'md' | 'lg';
    showPrice?: boolean;
    className?: string;
    onPurchase?: (course: CourseItem) => void;
}

export default function CoursePurchaseButton({
    course,
    variant = 'primary',
    size = 'md',
    showPrice = true,
    className = '',
    onPurchase
}: CoursePurchaseButtonProps) {
    const { addItem, isInCart, getTotalItems } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    const isInCartItem = isInCart(course.id);
    const totalItems = getTotalItems();

    const handleAddToCart = async () => {
        if (isAdding) return;

        setIsAdding(true);

        try {
            await addItem(course);
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 2000);
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDirectPurchase = () => {
        if (onPurchase) {
            onPurchase(course);
        } else {
            // Navigate to purchase page
            window.location.href = `/course/${course.id}/purchase`;
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const getButtonClasses = () => {
        const baseClasses = 'flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200';

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base'
        };

        const variantClasses = {
            primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md',
            secondary: 'bg-gray-600 text-white hover:bg-gray-700 shadow-sm hover:shadow-md',
            outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
            success: 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md'
        };

        return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
    };

    const getIcon = () => {
        if (isAdding) return <Loader2 className="w-4 h-4 animate-spin" />;
        if (justAdded) return <Check className="w-4 h-4" />;
        if (isInCartItem) return <Check className="w-4 h-4" />;
        if (course.isFree) return <Zap className="w-4 h-4" />;
        if (course.isPremium) return <Star className="w-4 h-4" />;
        return <ShoppingCart className="w-4 h-4" />;
    };

    const getButtonText = () => {
        if (isAdding) return 'Adicionando...';
        if (justAdded) return 'Adicionado!';
        if (isInCartItem) return 'No Carrinho';
        if (course.isFree) return 'Começar Grátis';
        if (course.isPremium) return 'Comprar Premium';
        return 'Adicionar ao Carrinho';
    };

    const getButtonVariant = () => {
        if (justAdded || isInCartItem) return 'success';
        return variant;
    };

    return (
        <div className="space-y-2">
            <button
                onClick={isInCartItem ? handleDirectPurchase : handleAddToCart}
                disabled={isAdding}
                className={getButtonClasses()}
                style={{
                    backgroundColor: getButtonVariant() === 'success' ? '#10b981' : undefined,
                    color: getButtonVariant() === 'success' ? 'white' : undefined
                }}
            >
                {getIcon()}
                {getButtonText()}
            </button>

            {showPrice && (
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        {course.isFree ? (
                            <span className="text-green-600 font-semibold">Grátis</span>
                        ) : (
                            <>
                                <span className="text-lg font-bold text-gray-900">
                                    {formatPrice(course.price)}
                                </span>
                                {course.originalPrice && course.originalPrice > course.price && (
                                    <span className="text-sm text-gray-500 line-through">
                                        {formatPrice(course.originalPrice)}
                                    </span>
                                )}
                            </>
                        )}
                    </div>

                    {course.originalPrice && course.originalPrice > course.price && (
                        <div className="text-xs text-green-600 font-medium">
                            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                        </div>
                    )}
                </div>
            )}

            {totalItems > 0 && (
                <div className="text-center text-xs text-gray-600">
                    {totalItems} item{totalItems > 1 ? 's' : ''} no carrinho
                </div>
            )}

            {course.isPremium && (
                <div className="flex items-center justify-center gap-1 text-xs text-yellow-600">
                    <Star className="w-3 h-3" />
                    <span>Conteúdo Premium</span>
                </div>
            )}

            {course.isFree && (
                <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                    <Zap className="w-3 h-3" />
                    <span>100% Gratuito</span>
                </div>
            )}
        </div>
    );
}