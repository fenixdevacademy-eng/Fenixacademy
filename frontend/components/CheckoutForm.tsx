'use client';

import React, { useState, useEffect } from 'react';
import { usePayment, CartItem, PaymentData, BillingAddress } from '../lib/payment-service';
import { usePixelTracking } from '../lib/pixel-tracking';
import { CreditCard, Smartphone, FileText, Zap, Wallet, Lock, Check } from 'lucide-react';

interface CheckoutFormProps {
    items: CartItem[];
    onSuccess: (result: any) => void;
    onError: (error: string) => void;
    className?: string;
}

export default function CheckoutForm({ items, onSuccess, onError, className = '' }: CheckoutFormProps) {
    const {
        getPaymentMethods,
        calculateCartTotal,
        processPayment,
        validatePaymentData,
        formatCurrency,
        formatCardNumber,
        validateCardNumber,
        validateExpiryDate,
        validateCVV
    } = usePayment();

    const { trackEvent } = usePixelTracking();

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState<PaymentData>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        billingAddress: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'BR'
        }
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [installments, setInstallments] = useState(1);

    const subtotal = calculateCartTotal(items);
    const total = subtotal - discount;

    useEffect(() => {
        trackEvent('checkout_started', {
            items: items.length,
            total: subtotal
        });
    }, [items, subtotal, trackEvent]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleAddressChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            billingAddress: {
                ...prev.billingAddress,
                [field]: value
            }
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (paymentMethod === 'card') {
            if (!formData.cardNumber) {
                newErrors.cardNumber = 'Número do cartão é obrigatório';
            } else if (!validateCardNumber(formData.cardNumber)) {
                newErrors.cardNumber = 'Número do cartão inválido';
            }

            if (!formData.expiryDate) {
                newErrors.expiryDate = 'Data de validade é obrigatória';
            } else if (!validateExpiryDate(formData.expiryDate)) {
                newErrors.expiryDate = 'Data de validade inválida';
            }

            if (!formData.cvv) {
                newErrors.cvv = 'CVV é obrigatório';
            } else if (!validateCVV(formData.cvv)) {
                newErrors.cvv = 'CVV inválido';
            }

            if (!formData.cardholderName) {
                newErrors.cardholderName = 'Nome do portador é obrigatório';
            }
        }

        // Validate billing address
        if (!formData.billingAddress.street) {
            newErrors.street = 'Endereço é obrigatório';
        }
        if (!formData.billingAddress.city) {
            newErrors.city = 'Cidade é obrigatória';
        }
        if (!formData.billingAddress.state) {
            newErrors.state = 'Estado é obrigatório';
        }
        if (!formData.billingAddress.zipCode) {
            newErrors.zipCode = 'CEP é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCouponSubmit = async () => {
        if (!couponCode) return;

        try {
            // Simulate coupon validation
            const response = await fetch('/api/coupons/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: couponCode })
            });

            if (response.ok) {
                const data = await response.json();
                setDiscount(data.discount);
                trackEvent('coupon_applied', { code: couponCode, discount: data.discount });
            } else {
                setErrors({ coupon: 'Cupom inválido' });
            }
        } catch (error) {
            setErrors({ coupon: 'Erro ao validar cupom' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        try {
            const paymentData = {
                ...formData,
                amount: total,
                installments,
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            };

            const result = await processPayment(paymentData);

            trackEvent('purchase_completed', {
                transaction_id: result.transactionId,
                value: total,
                currency: 'BRL',
                items: items.length
            });

            onSuccess(result);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro no processamento do pagamento';
            onError(errorMessage);
            trackEvent('purchase_failed', { error: errorMessage });
        } finally {
            setIsProcessing(false);
        }
    };

    const formatCardNumberInput = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
        return formatted.slice(0, 19); // Max 16 digits + 3 spaces
    };

    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    return (
        <div className={`checkout-form ${className}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Forma de Pagamento</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`p-4 border rounded-lg flex items-center gap-3 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                        >
                            <CreditCard className="w-5 h-5" />
                            <span>Cartão de Crédito</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('pix')}
                            className={`p-4 border rounded-lg flex items-center gap-3 ${paymentMethod === 'pix' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                        >
                            <Zap className="w-5 h-5" />
                            <span>PIX</span>
                        </button>
                    </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                    <div className="space-y-4">
                        <h4 className="text-md font-medium text-gray-900">Dados do Cartão</h4>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Número do Cartão
                            </label>
                            <input
                                type="text"
                                value={formData.cardNumber}
                                onChange={(e) => handleInputChange('cardNumber', formatCardNumberInput(e.target.value))}
                                placeholder="1234 5678 9012 3456"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.cardNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Validade
                                </label>
                                <input
                                    type="text"
                                    value={formData.expiryDate}
                                    onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                                    placeholder="MM/AA"
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.expiryDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    value={formData.cvv}
                                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                                    placeholder="123"
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.cvv ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.cvv && (
                                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome do Portador
                            </label>
                            <input
                                type="text"
                                value={formData.cardholderName}
                                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                                placeholder="Nome como no cartão"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.cardholderName && (
                                <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Parcelas
                            </label>
                            <select
                                value={installments}
                                onChange={(e) => setInstallments(parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {[1, 2, 3, 4, 5, 6, 10, 12].map(num => (
                                    <option key={num} value={num}>
                                        {num}x de {formatCurrency(total / num)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* PIX Payment */}
                {paymentMethod === 'pix' && (
                    <div className="text-center py-8">
                        <Zap className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Pagamento via PIX</h4>
                        <p className="text-gray-600 mb-4">Você será redirecionado para o PIX após confirmar o pedido</p>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-700">
                                <strong>Total:</strong> {formatCurrency(total)}
                            </p>
                        </div>
                    </div>
                )}

                {/* Billing Address */}
                <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Endereço de Cobrança</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Endereço
                            </label>
                            <input
                                type="text"
                                value={formData.billingAddress.street}
                                onChange={(e) => handleAddressChange('street', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.street ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.street && (
                                <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cidade
                            </label>
                            <input
                                type="text"
                                value={formData.billingAddress.city}
                                onChange={(e) => handleAddressChange('city', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estado
                            </label>
                            <input
                                type="text"
                                value={formData.billingAddress.state}
                                onChange={(e) => handleAddressChange('state', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.state ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CEP
                            </label>
                            <input
                                type="text"
                                value={formData.billingAddress.zipCode}
                                onChange={(e) => handleAddressChange('zipCode', e.target.value.replace(/\D/g, '').slice(0, 8))}
                                placeholder="00000-000"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.zipCode && (
                                <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Coupon Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cupom de Desconto
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Digite o código do cupom"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={handleCouponSubmit}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Aplicar
                        </button>
                    </div>
                    {errors.coupon && (
                        <p className="text-red-500 text-sm mt-1">{errors.coupon}</p>
                    )}
                    {discount > 0 && (
                        <p className="text-green-600 text-sm mt-1">
                            Desconto aplicado: {formatCurrency(discount)}
                        </p>
                    )}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Resumo do Pedido</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Desconto:</span>
                                <span>-{formatCurrency(discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4" />
                    <span>Seus dados estão protegidos com criptografia SSL</span>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Processando...
                        </>
                    ) : (
                        <>
                            <Check className="w-4 h-4" />
                            Finalizar Compra
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}