'use client';

import React, { useState } from 'react';
import { Gift, CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';
import { couponService, CouponValidation } from '@/lib/coupons/coupon-service';

interface CouponInputProps {
    planId: string;
    amount: number;
    onCouponApplied: (validation: CouponValidation) => void;
    onCouponRemoved: () => void;
    appliedCoupon?: CouponValidation | null;
    className?: string;
}

export function CouponInput({
    planId,
    amount,
    onCouponApplied,
    onCouponRemoved,
    appliedCoupon,
    className = ''
}: CouponInputProps) {
    const [code, setCode] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleApplyCoupon = async () => {
        if (!code.trim()) return;

        setIsValidating(true);
        setError(null);

        try {
            const validation = await couponService.validateCoupon(code, planId, amount);

            if (validation.isValid) {
                onCouponApplied(validation);
                setCode('');
            } else {
                setError(validation.error || 'Cupom inválido');
            }
        } catch (error) {
            setError('Erro ao validar cupom');
        } finally {
            setIsValidating(false);
        }
    };

    const handleRemoveCoupon = () => {
        onCouponRemoved();
        setCode('');
        setError(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleApplyCoupon();
        }
    };

    const getCouponSuggestions = () => {
        const suggestions = [
            { code: 'WELCOME20', description: '20% de desconto para novos usuários' },
            { code: 'STUDENT50', description: '50% de desconto para estudantes' },
            { code: 'EARLYBIRD30', description: '30% de desconto early bird' },
            { code: 'TRIAL7', description: '7 dias grátis para testar' },
        ];

        return suggestions.filter(suggestion =>
            suggestion.code.toLowerCase().includes(code.toLowerCase())
        );
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Coupon Input */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Código do Cupom
                </label>
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value.toUpperCase());
                                setError(null);
                                setShowSuggestions(e.target.value.length > 0);
                            }}
                            onKeyPress={handleKeyPress}
                            placeholder="Digite o código do cupom"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            disabled={isValidating || !!appliedCoupon}
                        />
                        {isValidating && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Loader className="w-4 h-4 animate-spin text-blue-500" />
                            </div>
                        )}
                    </div>
                    <button
                        onClick={appliedCoupon ? handleRemoveCoupon : handleApplyCoupon}
                        disabled={isValidating || (!code.trim() && !appliedCoupon)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${appliedCoupon
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                            }`}
                    >
                        {appliedCoupon ? (
                            <>
                                <XCircle className="w-4 h-4" />
                                Remover
                            </>
                        ) : (
                            <>
                                <Gift className="w-4 h-4" />
                                Aplicar
                            </>
                        )}
                    </button>
                </div>

                {/* Suggestions */}
                {showSuggestions && !appliedCoupon && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                        {getCouponSuggestions().map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCode(suggestion.code);
                                    setShowSuggestions(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                            >
                                <div className="font-medium text-gray-900 dark:text-white">
                                    {suggestion.code}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {suggestion.description}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Applied Coupon */}
            {appliedCoupon && appliedCoupon.isValid && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-green-800 dark:text-green-200">
                            Cupom aplicado com sucesso!
                        </span>
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                        <div className="font-medium">{appliedCoupon.coupon?.name}</div>
                        <div>Desconto: R$ {appliedCoupon.discount?.toFixed(2)}</div>
                        <div>Valor final: R$ {appliedCoupon.finalAmount?.toFixed(2)}</div>
                    </div>
                </div>
            )}

            {/* Available Coupons */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cupons Disponíveis:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                        { code: 'WELCOME20', discount: '20%', description: 'Novos usuários' },
                        { code: 'STUDENT50', discount: '50%', description: 'Estudantes' },
                        { code: 'EARLYBIRD30', discount: '30%', description: 'Early bird' },
                        { code: 'TRIAL7', discount: '7 dias grátis', description: 'Teste grátis' },
                    ].map((coupon, index) => (
                        <div
                            key={index}
                            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {coupon.code}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {coupon.description}
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    {coupon.discount}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CouponInput;

