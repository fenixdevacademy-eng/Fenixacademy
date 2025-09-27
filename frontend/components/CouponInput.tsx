'use client';

import React, { useState } from 'react';
import { Gift, CheckCircle, XCircle, AlertCircle, Loader2, X } from 'lucide-react';

interface CouponInputProps {
    planId: string;
    amount: number;
    onCouponApplied: (validation: CouponValidation) => void;
    onCouponRemoved: () => void;
    appliedCoupon?: CouponValidation | null;
    className?: string;
}

interface CouponValidation {
    isValid: boolean;
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    description?: string;
    expiresAt?: string;
    minAmount?: number;
    maxDiscount?: number;
    error?: string;
}

const CouponInput: React.FC<CouponInputProps> = ({
    planId,
    amount,
    onCouponApplied,
    onCouponRemoved,
    appliedCoupon,
    className = ''
}) => {
    const [code, setCode] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleApplyCoupon = async () => {
        if (!code.trim()) return;

        setIsValidating(true);
        setError(null);

        try {
            // Simulate API call
            const validation = await validateCoupon(code, planId, amount);

            if (validation.isValid) {
                onCouponApplied(validation);
                setCode('');
                setShowSuggestions(false);
            } else {
                setError(validation.error || 'Cupom inválido');
            }
        } catch (err) {
            setError('Erro ao validar cupom');
        } finally {
            setIsValidating(false);
        }
    };

    const validateCoupon = async (code: string, planId: string, amount: number): Promise<CouponValidation> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock validation logic
        const mockCoupons = {
            'WELCOME10': {
                isValid: true,
                code: 'WELCOME10',
                discountType: 'percentage' as const,
                discountValue: 10,
                description: '10% de desconto para novos usuários',
                minAmount: 50
            },
            'SAVE20': {
                isValid: true,
                code: 'SAVE20',
                discountType: 'fixed' as const,
                discountValue: 20,
                description: 'R$ 20 de desconto',
                minAmount: 100
            },
            'PREMIUM15': {
                isValid: true,
                code: 'PREMIUM15',
                discountType: 'percentage' as const,
                discountValue: 15,
                description: '15% de desconto em planos premium',
                minAmount: 200
            }
        };

        const coupon = mockCoupons[code.toUpperCase() as keyof typeof mockCoupons];

        if (!coupon) {
            return {
                isValid: false,
                code,
                discountType: 'percentage',
                discountValue: 0,
                error: 'Cupom não encontrado'
            };
        }

        if (coupon.minAmount && amount < coupon.minAmount) {
            return {
                isValid: false,
                code,
                discountType: 'percentage',
                discountValue: 0,
                error: `Valor mínimo de R$ ${coupon.minAmount} necessário`
            };
        }

        return coupon;
    };

    const handleRemoveCoupon = () => {
        onCouponRemoved();
        setError(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleApplyCoupon();
        }
    };

    const formatDiscount = (validation: CouponValidation) => {
        if (validation.discountType === 'percentage') {
            return `${validation.discountValue}%`;
        } else {
            return `R$ ${validation.discountValue}`;
        }
    };

    const calculateDiscount = (validation: CouponValidation) => {
        if (validation.discountType === 'percentage') {
            return (amount * validation.discountValue) / 100;
        } else {
            return validation.discountValue;
        }
    };

    const suggestions = [
        { code: 'WELCOME10', description: '10% de desconto para novos usuários' },
        { code: 'SAVE20', description: 'R$ 20 de desconto' },
        { code: 'PREMIUM15', description: '15% de desconto em planos premium' }
    ];

    return (
        <div className={`coupon-input ${className}`}>
            {appliedCoupon ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="font-medium text-green-900">
                                    Cupom {appliedCoupon.code} aplicado
                                </p>
                                <p className="text-sm text-green-700">
                                    Desconto de {formatDiscount(appliedCoupon)} aplicado
                                </p>
                                {appliedCoupon.description && (
                                    <p className="text-xs text-green-600">
                                        {appliedCoupon.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleRemoveCoupon}
                            className="p-1 hover:bg-green-100 rounded"
                        >
                            <X className="w-4 h-4 text-green-600" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onFocus={() => setShowSuggestions(true)}
                                placeholder="Digite o código do cupom"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Gift className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <button
                            onClick={handleApplyCoupon}
                            disabled={!code.trim() || isValidating}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isValidating ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                'Aplicar'
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                            <XCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {showSuggestions && (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Cupons disponíveis:</p>
                            <div className="space-y-2">
                                {suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion.code}
                                        onClick={() => {
                                            setCode(suggestion.code);
                                            setShowSuggestions(false);
                                        }}
                                        className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm"
                                    >
                                        <div className="font-medium text-gray-900">
                                            {suggestion.code}
                                        </div>
                                        <div className="text-gray-600">
                                            {suggestion.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CouponInput;