'use client';

import React, { useState } from 'react';
import { X, CreditCard, Shield, CheckCircle, Lock, ArrowRight, Gift, Star, Crown, BookOpen } from 'lucide-react';
import CouponInput from './CouponInput';
import { CouponValidation } from '@/lib/coupons/coupon-service';
import { analyticsService } from '@/lib/analytics/analytics-service';
import { stripeService } from '@/lib/payments/stripe-service';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPlan: {
        id: string;
        name: string;
        price: number;
        originalPrice?: number;
        period: string;
        features: string[];
        icon: React.ComponentType<any>;
        color: string;
    };
    onSuccess: (planId: string) => void;
}

export function CheckoutModal({ isOpen, onClose, selectedPlan, onSuccess }: CheckoutModalProps) {
    const [step, setStep] = useState<'plan' | 'payment' | 'success'>('plan');
    const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto'>('credit');
    const [isProcessing, setIsProcessing] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<CouponValidation | null>(null);
    const [finalAmount, setFinalAmount] = useState(selectedPlan.price);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cpf: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handlePayment = async () => {
        setIsProcessing(true);

        try {
            // Track checkout started
            await analyticsService.trackCheckoutStarted(selectedPlan.id, selectedPlan.name, finalAmount);

            // Simular processamento de pagamento
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Track successful payment
            await analyticsService.trackSubscriptionCompleted(selectedPlan.id, selectedPlan.name, finalAmount);

            setIsProcessing(false);
            setStep('success');
            onSuccess(selectedPlan.id);
        } catch (error) {
            console.error('Erro no pagamento:', error);
            await analyticsService.trackPaymentFailed(selectedPlan.id, selectedPlan.name, error instanceof Error ? error.message : 'Erro desconhecido');
            setIsProcessing(false);
        }
    };

    const handleCouponApplied = (validation: CouponValidation) => {
        setAppliedCoupon(validation);
        setFinalAmount(validation.finalAmount || selectedPlan.price);
    };

    const handleCouponRemoved = () => {
        setAppliedCoupon(null);
        setFinalAmount(selectedPlan.price);
    };

    const getPlanIcon = (planId: string) => {
        switch (planId) {
            case 'free': return <BookOpen className="w-6 h-6" />;
            case 'pro': return <Star className="w-6 h-6" />;
            case 'enterprise': return <Crown className="w-6 h-6" />;
            default: return <BookOpen className="w-6 h-6" />;
        }
    };

    const getPlanColor = (planId: string) => {
        switch (planId) {
            case 'free': return 'bg-gray-500';
            case 'pro': return 'bg-blue-500';
            case 'enterprise': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Finalizar Assinatura
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 'plan' && (
                        <div className="space-y-6">
                            {/* Plan Summary */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-3 rounded-full ${getPlanColor(selectedPlan.id)} text-white`}>
                                        {getPlanIcon(selectedPlan.id)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {selectedPlan.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Plano selecionado
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                        R$ {selectedPlan.price}
                                    </span>
                                    {selectedPlan.originalPrice && (
                                        <span className="text-lg text-gray-500 line-through">
                                            R$ {selectedPlan.originalPrice}
                                        </span>
                                    )}
                                    <span className="text-gray-600 dark:text-gray-400">
                                        /{selectedPlan.period}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Inclui:</h4>
                                    {selectedPlan.features.slice(0, 5).map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            {feature}
                                        </div>
                                    ))}
                                    {selectedPlan.features.length > 5 && (
                                        <p className="text-sm text-gray-500">
                                            +{selectedPlan.features.length - 5} benefícios adicionais
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                    <h4 className="font-medium text-gray-900 dark:text-white">Seguro</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Pagamento 100% seguro</p>
                                </div>
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <Gift className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <h4 className="font-medium text-gray-900 dark:text-white">Garantia</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">30 dias de garantia</p>
                                </div>
                                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <Lock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                    <h4 className="font-medium text-gray-900 dark:text-white">Privacidade</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Dados protegidos</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep('payment')}
                                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                            >
                                Continuar para Pagamento
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {step === 'payment' && (
                        <div className="space-y-6">
                            {/* Payment Method Selection */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Escolha a forma de pagamento
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setPaymentMethod('credit')}
                                        className={`p-4 border-2 rounded-lg text-left transition-colors ${paymentMethod === 'credit'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        <CreditCard className="w-6 h-6 text-blue-500 mb-2" />
                                        <div className="font-medium text-gray-900 dark:text-white">Cartão de Crédito</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Visa, Mastercard, Elo</div>
                                    </button>

                                    <button
                                        onClick={() => setPaymentMethod('pix')}
                                        className={`p-4 border-2 rounded-lg text-left transition-colors ${paymentMethod === 'pix'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        <div className="w-6 h-6 bg-green-500 rounded mb-2 flex items-center justify-center">
                                            <span className="text-white font-bold text-xs">PIX</span>
                                        </div>
                                        <div className="font-medium text-gray-900 dark:text-white">PIX</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Aprovação instantânea</div>
                                    </button>

                                    <button
                                        onClick={() => setPaymentMethod('boleto')}
                                        className={`p-4 border-2 rounded-lg text-left transition-colors ${paymentMethod === 'boleto'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        <div className="w-6 h-6 bg-orange-500 rounded mb-2 flex items-center justify-center">
                                            <span className="text-white font-bold text-xs">B</span>
                                        </div>
                                        <div className="font-medium text-gray-900 dark:text-white">Boleto</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Aprovação em até 3 dias</div>
                                    </button>
                                </div>
                            </div>

                            {/* Payment Form */}
                            {paymentMethod === 'credit' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Nome completo
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="Seu nome completo"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                CPF
                                            </label>
                                            <input
                                                type="text"
                                                name="cpf"
                                                value={formData.cpf}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="000.000.000-00"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="seu@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Número do cartão
                                        </label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="0000 0000 0000 0000"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Validade
                                            </label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="MM/AA"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="000"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'pix' && (
                                <div className="text-center py-8">
                                    <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-gray-500 dark:text-gray-400">QR Code PIX</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Escaneie o QR Code com seu app do banco ou copie o código PIX
                                    </p>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                        <code className="text-sm text-gray-800 dark:text-gray-200">
                                            PIX-CODE-AQUI-123456789
                                        </code>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'boleto' && (
                                <div className="text-center py-8">
                                    <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-gray-500 dark:text-gray-400">Boleto</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        O boleto será enviado para seu email após a confirmação
                                    </p>
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                        Gerar Boleto
                                    </button>
                                </div>
                            )}

                            {/* Coupon Input */}
                            <CouponInput
                                planId={selectedPlan.id}
                                amount={selectedPlan.price}
                                onCouponApplied={handleCouponApplied}
                                onCouponRemoved={handleCouponRemoved}
                                appliedCoupon={appliedCoupon}
                            />

                            {/* Payment Summary */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700 dark:text-gray-300">Plano {selectedPlan.name}</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        R$ {selectedPlan.price}
                                    </span>
                                </div>
                                {appliedCoupon && appliedCoupon.isValid && (
                                    <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400 mb-2">
                                        <span>Desconto ({appliedCoupon.coupon?.name})</span>
                                        <span>-R$ {appliedCoupon.discount?.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                                    <span>Taxa de processamento</span>
                                    <span>Grátis</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
                                    <div className="flex justify-between items-center font-semibold text-lg">
                                        <span>Total</span>
                                        <span className="text-blue-600 dark:text-blue-400">
                                            R$ {finalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep('plan')}
                                    className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Voltar
                                </button>
                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processando...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            Finalizar Pagamento
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Pagamento Aprovado!
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Sua assinatura do plano <strong>{selectedPlan.name}</strong> foi ativada com sucesso.
                                Você receberá um email de confirmação em breve.
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    Próximos passos:
                                </h4>
                                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <li>• Acesse sua área de membros</li>
                                    <li>• Explore os cursos disponíveis</li>
                                    <li>• Configure seu perfil de aprendizado</li>
                                    <li>• Conecte-se com a comunidade</li>
                                </ul>
                            </div>

                            <button
                                onClick={onClose}
                                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                            >
                                Começar a Aprender
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CheckoutModal;
