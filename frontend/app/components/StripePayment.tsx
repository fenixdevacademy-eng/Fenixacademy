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
    amount: number;
    onSuccess: () => void;
    onError: (error: string) => void;
}

export default function StripePayment({ amount, onSuccess, onError }: StripePaymentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price / 100);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!cardData.number) newErrors.number = 'Número do cartão é obrigatório';
        if (!cardData.expiry) newErrors.expiry = 'Data de validade é obrigatória';
        if (!cardData.cvv) newErrors.cvv = 'CVV é obrigatório';
        if (!cardData.name) newErrors.name = 'Nome é obrigatório';

        // Validação básica do número do cartão
        if (cardData.number && cardData.number.replace(/\s/g, '').length < 13) {
            newErrors.number = 'Número do cartão inválido';
        }

        // Validação do CVV
        if (cardData.cvv && cardData.cvv.length < 3) {
            newErrors.cvv = 'CVV deve ter pelo menos 3 dígitos';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Simular processamento do Stripe
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simular sucesso
            onSuccess();
        } catch (error) {
            onError('Erro ao processar pagamento. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setCardData(prev => ({ ...prev, [field]: value }));

        // Limpar erro do campo quando usuário começa a digitar
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-6">
                <Lock className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-bold text-white">Pagamento Seguro</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informações do curso */}
                <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Curso</h4>
                    <p className="text-gray-300 text-sm">Total: {formatPrice(amount)}</p>
                </div>

                {/* Número do cartão */}
                <div>
                    <label className="block text-white text-sm font-medium mb-2">
                        Número do Cartão
                    </label>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={cardData.number}
                            onChange={(e) => handleInputChange('number', formatCardNumber(e.target.value))}
                            placeholder="1234 5678 9012 3456"
                            className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.number ? 'border-red-500' : 'border-white/20'
                                }`}
                            maxLength={19}
                        />
                    </div>
                    {errors.number && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.number}
                        </p>
                    )}
                </div>

                {/* Validade e CVV */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            Validade
                        </label>
                        <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) => handleInputChange('expiry', formatExpiry(e.target.value))}
                            placeholder="MM/AA"
                            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.expiry ? 'border-red-500' : 'border-white/20'
                                }`}
                            maxLength={5}
                        />
                        {errors.expiry && (
                            <p className="text-red-400 text-sm mt-1 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.expiry}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            CVV
                        </label>
                        <input
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                            placeholder="123"
                            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.cvv ? 'border-red-500' : 'border-white/20'
                                }`}
                            maxLength={4}
                        />
                        {errors.cvv && (
                            <p className="text-red-400 text-sm mt-1 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.cvv}
                            </p>
                        )}
                    </div>
                </div>

                {/* Nome no cartão */}
                <div>
                    <label className="block text-white text-sm font-medium mb-2">
                        Nome no Cartão
                    </label>
                    <input
                        type="text"
                        value={cardData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Nome completo"
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-white/20'
                            }`}
                    />
                    {errors.name && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Botão de pagamento */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processando...
                        </>
                    ) : (
                        <>
                            <Lock className="w-5 h-5 mr-2" />
                            Finalizar Pagamento
                        </>
                    )}
                </button>

                {/* Informações de segurança */}
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-4 text-gray-300 text-sm">
                        <div className="flex items-center space-x-1">
                            <Lock className="w-4 h-4" />
                            <span>SSL Criptografado</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>Pagamento Seguro</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
} 