'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ShoppingCart,
    CreditCard,
    Zap,
    Star,
    Clock,
    CheckCircle,
    Lock,
    Gift
} from 'lucide-react';

interface Course {
    id: string;
    title: string;
    description: string;
    price?: number;
    original_price?: number;
    discount_percentage?: number;
    slug?: string;
}

interface ExpandedCheckoutButtonProps {
    course: Course;
    tier?: 'basic' | 'premium' | 'vip';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showPricing?: boolean;
}

export function ExpandedCheckoutButton({
    course,
    tier = 'premium',
    className = '',
    size = 'md',
    showPricing = true
}: ExpandedCheckoutButtonProps) {
    const courseSlug = course.slug || course.id;
    const courseTitle = course.title;
    const courseDescription = course.description;
    const price = course.price || 297;
    const originalPrice = course.original_price || 497;
    const discount = course.discount_percentage || 40;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const getTierInfo = (tierId: string) => {
        const tiers = {
            basic: { name: 'Básico', duration: '3 meses', color: 'blue' },
            premium: { name: 'Premium', duration: '6 meses', color: 'purple', popular: true },
            vip: { name: 'VIP', duration: '12 meses', color: 'gold', best: true }
        }
        return tiers[tierId as keyof typeof tiers] || tiers.premium;
    }

    const tierInfo = getTierInfo(tier);

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-4 py-2 text-sm';
            case 'lg':
                return 'px-8 py-4 text-lg';
            default:
                return 'px-6 py-3 text-base';
        }
    }

    const getTierColor = () => {
        switch (tierInfo.color) {
            case 'blue':
                return 'from-blue-600 to-blue-700';
            case 'purple':
                return 'from-purple-600 to-purple-700';
            case 'gold':
                return 'from-yellow-500 to-orange-600';
            default:
                return 'from-blue-600 to-purple-600';
        }
    }

    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            // Simular delay de carregamento
            await new Promise(resolve => setTimeout(resolve, 500));

            // Redirecionar para página de pagamento
            router.push(`/expanded-payment?course=${courseSlug}&tier=${tier}`);
        } catch (error) {
            console.error('Erro ao iniciar checkout:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`bg-white rounded-xl shadow-lg border overflow-hidden ${className}`}>
            {showPricing && (
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{courseTitle}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{courseDescription}</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2">
                                {tierInfo.popular && (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                        Popular
                                    </span>
                                )}
                                {tierInfo.best && (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                        Melhor Valor
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">R$ {price}</span>
                            {originalPrice && (
                                <span className="text-sm text-gray-500 line-through">R$ {originalPrice}</span>
                            )}
                            {discount && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                    {discount}% OFF
                                </span>
                            )}
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>{tierInfo.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-6">
                <div className="space-y-4">
                    {/* Features */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Conteúdo 3x mais detalhado</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span>Metodologia CS50 aplicada</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-purple-500" />
                            <span>Casos brasileiros reais</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Gift className="w-4 h-4 text-orange-500" />
                            <span>Exercícios e quizzes interativos</span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className={`w-full bg-gradient-to-r ${getTierColor()} text-white ${getSizeClasses()} rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2`}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Processando...</span>
                            </>
                        ) : (
                            <>
                                <Lock className="w-4 h-4" />
                                <span>Comprar Agora</span>
                            </>
                        )}
                    </button>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Lock className="w-3 h-3" />
                        <span>Pagamento 100% seguro</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpandedCheckoutButton;