'use client';

import React, { useState, useEffect } from 'react';
import { usePayment, CartItem, PaymentData, BillingAddress } from '../lib/payment-service';
import { usePixelTracking } from '../lib/pixel-tracking';
import { CreditCard, Smartphone, FileText, Zap, Wallet } from 'lucide-react';

interface CheckoutFormProps {
    items: CartItem[];
    onSuccess: (result: any) => void;
    onError: (error: string) => void;
}

export default function CheckoutForm({ items, onSuccess, onError }: CheckoutFormProps) {
    const {
        getPaymentMethods,
        calculateCartTotal,
        processPayment,
        validatePaymentData,
        formatCurrency,
        formatCardNumber,
        formatExpiryDate,
        formatDocument,
        formatZipCode,
        formatPhone,
    } = usePayment();

    const { trackAddToCart, trackPurchase } = usePixelTracking();

    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethods] = useState(getPaymentMethods());
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Payment form data
    const [paymentData, setPaymentData] = useState<PaymentData>({
        method: '',
        installments: 1
    });

    const [billingAddress, setBillingAddress] = useState<BillingAddress>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        document: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'BR'
    });

    const { subtotal, discount, total, savings } = calculateCartTotal(items);

    // Track cart view
    useEffect(() => {
        items.forEach(item => {
            trackAddToCart(item.name, item.id, item.price);
        });
    }, [items, trackAddToCart]);

    const handlePaymentMethodSelect = (methodId: string) => {
        setSelectedMethod(methodId);
        setPaymentData(prev => ({ ...prev, method: methodId }));
    };

    const handleInputChange = (field: string, value: string) => {
        if (field.startsWith('payment.')) {
            const paymentField = field.replace('payment.', '');
            setPaymentData(prev => ({ ...prev, [paymentField]: value }));
        } else {
            setBillingAddress(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleFormatInput = (field: string, value: string, formatter: (value: string) => string) => {
        const formatted = formatter(value);
        handleInputChange(field, formatted);
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            if (!selectedMethod) {
                onError('Selecione um método de pagamento');
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            const errors = validatePaymentData(paymentData, billingAddress);
            if (errors.length > 0) {
                onError(errors.join(', '));
                return;
            }
            setCurrentStep(3);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmitPayment = async () => {
        setIsProcessing(true);

        try {
            const result = await processPayment(items, paymentData, billingAddress);

            if (result.success) {
                // Track successful purchase
                trackPurchase(result.transactionId || '', total, 'BRL', items);
                onSuccess(result);
            } else {
                onError(result.error || 'Erro ao processar pagamento');
            }
        } catch (error) {
            onError(error instanceof Error ? error.message : 'Erro inesperado');
        } finally {
            setIsProcessing(false);
        }
    };

    const getPaymentIcon = (type: string) => {
        switch (type) {
            case 'credit_card':
            case 'debit_card':
                return <CreditCard className="w-6 h-6" />;
            case 'pix':
                return <Zap className="w-6 h-6" />;
            case 'boleto':
                return <FileText className="w-6 h-6" />;
            case 'paypal':
                return <Wallet className="w-6 h-6" />;
            default:
                return <Smartphone className="w-6 h-6" />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-center space-x-8">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-600'
                                }`}>
                                {step}
                            </div>
                            {step < 3 && (
                                <div className={`w-16 h-1 ml-4 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4 space-x-16">
                    <span className="text-sm text-gray-600">Pagamento</span>
                    <span className="text-sm text-gray-600">Dados</span>
                    <span className="text-sm text-gray-600">Confirmação</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Checkout Form */}
                <div className="space-y-6">
                    {/* Step 1: Payment Method Selection */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Método de Pagamento</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {paymentMethods.filter(method => method.enabled).map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => handlePaymentMethodSelect(method.id)}
                                        className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${selectedMethod === method.id
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {getPaymentIcon(method.type)}
                                        <span className="font-medium">{method.name}</span>
                                        <span className="text-2xl">{method.icon}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Payment Details */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Dados do Pagamento</h2>

                            {/* Card Details */}
                            {(paymentData.method === 'credit_card' || paymentData.method === 'debit_card') && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Número do Cartão
                                        </label>
                                        <input
                                            type="text"
                                            value={paymentData.cardNumber || ''}
                                            onChange={(e) => handleFormatInput('payment.cardNumber', e.target.value, formatCardNumber)}
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            maxLength={19}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Validade
                                            </label>
                                            <input
                                                type="text"
                                                value={paymentData.cardExpiry || ''}
                                                onChange={(e) => handleFormatInput('payment.cardExpiry', e.target.value, formatExpiryDate)}
                                                placeholder="MM/AA"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                maxLength={5}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                value={paymentData.cardCvv || ''}
                                                onChange={(e) => handleInputChange('payment.cardCvv', e.target.value)}
                                                placeholder="123"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                maxLength={4}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nome no Cartão
                                        </label>
                                        <input
                                            type="text"
                                            value={paymentData.cardName || ''}
                                            onChange={(e) => handleInputChange('payment.cardName', e.target.value)}
                                            placeholder="Nome como está no cartão"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    {paymentData.method === 'credit_card' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Parcelas
                                            </label>
                                            <select
                                                value={paymentData.installments || 1}
                                                onChange={(e) => handleInputChange('payment.installments', e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                                                    <option key={num} value={num}>
                                                        {num}x de {formatCurrency(total / num)} sem juros
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* PIX Details */}
                            {paymentData.method === 'pix' && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center space-x-2 text-green-800">
                                        <Zap className="w-5 h-5" />
                                        <span className="font-medium">Pagamento via PIX</span>
                                    </div>
                                    <p className="text-sm text-green-700 mt-2">
                                        Você será redirecionado para gerar o PIX após confirmar os dados.
                                    </p>
                                </div>
                            )}

                            {/* Billing Address */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Dados de Cobrança</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nome *
                                        </label>
                                        <input
                                            type="text"
                                            value={billingAddress.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sobrenome *
                                        </label>
                                        <input
                                            type="text"
                                            value={billingAddress.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={billingAddress.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Telefone *
                                        </label>
                                        <input
                                            type="tel"
                                            value={billingAddress.phone}
                                            onChange={(e) => handleFormatInput('phone', e.target.value, formatPhone)}
                                            placeholder="(11) 99999-9999"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            CPF/CNPJ *
                                        </label>
                                        <input
                                            type="text"
                                            value={billingAddress.document}
                                            onChange={(e) => handleFormatInput('document', e.target.value, formatDocument)}
                                            placeholder="000.000.000-00"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CEP *
                                    </label>
                                    <input
                                        type="text"
                                        value={billingAddress.zipCode}
                                        onChange={(e) => handleFormatInput('zipCode', e.target.value, formatZipCode)}
                                        placeholder="00000-000"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Rua *
                                        </label>
                                        <input
                                            type="text"
                                            value={billingAddress.street}
                                            onChange={(e) => handleInputChange('street', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Número *
                                        </label>
                                        <input
                                            type="text"
                                            value={billingAddress.number}
                                            onChange={(e) => handleInputChange('number', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Complemento
                                    </label>
                                    <input
                                        type="text"
                                        value={billingAddress.complement}
                                        onChange={(e) => handleInputChange('complement', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bairro *
                                        </label>
                                        <input
                                            type="text"
                                            value={billingAddress.neighborhood}
                                            onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cidade *
                                        </label>
                                        <input
                                            type="text"
                                            value={billingAddress.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Estado *
                                        </label>
                                        <select
                                            value={billingAddress.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Selecione</option>
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Confirmação do Pedido</h2>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Resumo do Pedido</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Método de Pagamento:</span>
                                        <span className="font-medium">
                                            {paymentMethods.find(m => m.id === selectedMethod)?.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Email:</span>
                                        <span className="font-medium">{billingAddress.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Telefone:</span>
                                        <span className="font-medium">{billingAddress.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">Termos e Condições</h3>
                                <p className="text-sm text-blue-800">
                                    Ao finalizar o pagamento, você concorda com nossos{' '}
                                    <a href="/terms" className="underline hover:no-underline">
                                        Termos de Uso
                                    </a>{' '}
                                    e{' '}
                                    <a href="/privacy" className="underline hover:no-underline">
                                        Política de Privacidade
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                        <button
                            onClick={handlePreviousStep}
                            disabled={currentStep === 1}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Voltar
                        </button>

                        {currentStep < 3 ? (
                            <button
                                onClick={handleNextStep}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Continuar
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmitPayment}
                                disabled={isProcessing}
                                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processando...' : 'Finalizar Pagamento'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h3>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                                    <p className="text-sm text-gray-600">{item.category}</p>
                                    <p className="text-sm text-gray-600">{item.duration}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900">
                                        {formatCurrency(item.price)}
                                    </p>
                                    {item.originalPrice && item.originalPrice > item.price && (
                                        <p className="text-sm text-gray-500 line-through">
                                            {formatCurrency(item.originalPrice)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Desconto:</span>
                                <span>-{formatCurrency(discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total:</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        {savings > 0 && (
                            <div className="text-sm text-green-600 text-center">
                                Você economizou {formatCurrency(savings)}!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
