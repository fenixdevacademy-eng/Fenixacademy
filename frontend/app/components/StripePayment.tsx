'use client';

import { useState } from 'react';
import {
    CreditCard,
    Lock,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';

interface StripePaymentProps {
    course: {
        id: string;
        title: string;
        price: number;
        currency: string;
    };
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export default function StripePayment({ course, onSuccess, onError }: StripePaymentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePayment = async () => {
        setIsLoading(true);
        setPaymentStatus('processing');
        setErrorMessage('');

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate success
            setPaymentStatus('success');
            onSuccess?.();
        } catch (error) {
            setPaymentStatus('error');
            setErrorMessage('Erro ao processar pagamento');
            onError?.('Erro ao processar pagamento');
        } finally {
            setIsLoading(false);
        }
    };

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency.toUpperCase()
        }).format(price);
    };

    if (paymentStatus === 'success') {
        return (
            <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Pagamento Realizado com Sucesso!
                </h3>
                <p className="text-gray-600">
                    Você agora tem acesso ao curso {course.title}
                </p>
            </div>
        );
    }

    if (paymentStatus === 'error') {
        return (
            <div className="text-center py-8">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Erro no Pagamento
                </h3>
                <p className="text-gray-600 mb-4">
                    {errorMessage}
                </p>
                <button
                    onClick={() => {
                        setPaymentStatus('idle');
                        setErrorMessage('');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Tentar Novamente
                </button>
            </div>
        );
    }

    return (
        <div className="stripe-payment">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Finalizar Pagamento
                    </h3>
                </div>

                {/* Course Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">
                        {course.title}
                    </h4>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Valor:</span>
                        <span className="text-lg font-semibold text-gray-900">
                            {formatPrice(course.price, course.currency)}
                        </span>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Número do Cartão
                        </label>
                        <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Validade
                            </label>
                            <input
                                type="text"
                                placeholder="MM/AA"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVV
                            </label>
                            <input
                                type="text"
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome no Cartão
                        </label>
                        <input
                            type="text"
                            placeholder="João Silva"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                        Seus dados estão protegidos com criptografia SSL
                    </span>
                </div>

                {/* Payment Button */}
                <button
                    onClick={handlePayment}
                    disabled={isLoading || paymentStatus === 'processing'}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading || paymentStatus === 'processing' ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processando...
                        </>
                    ) : (
                        <>
                            <CreditCard className="w-4 h-4" />
                            Pagar {formatPrice(course.price, course.currency)}
                        </>
                    )}
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center mt-4">
                    Ao continuar, você concorda com nossos{' '}
                    <a href="/terms" className="text-blue-600 hover:underline">
                        Termos de Uso
                    </a>{' '}
                    e{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                        Política de Privacidade
                    </a>
                </p>
            </div>
        </div>
    );
}