'use client';

import { useState } from 'react';
import {
    CreditCard,
    Smartphone,
    Globe,
    DollarSign,
    CheckCircle,
    Copy,
    Download,
    Eye,
    EyeOff,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Monitor,
    Wifi,
    WifiOff
} from 'lucide-react';
import Link from 'next/link';
import StripePayment from '../components/StripePayment';

interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    available: boolean;
    processingTime: string;
    fees: string;
    international: boolean;
}

interface Currency {
    code: string;
    name: string;
    symbol: string;
    rate: number;
}

export default function PaymentPage() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('pix');
    const [selectedCurrency, setSelectedCurrency] = useState('BRL');
    const [showPixCode, setShowPixCode] = useState(false);
    const [copied, setCopied] = useState(false);
    const [paymentStep, setPaymentStep] = useState<'method' | 'payment' | 'success'>('method');

    const courseData = {
        title: "Fundamentos de Desenvolvimento Web",
        instructor: "Alexandre Mendes",
        price: 197,
        originalPrice: 297,
        discount: 34,
        duration: "80 horas",
        lessons: 80,
        certificate: true,
        mentorship: true
    };

    const paymentMethods: PaymentMethod[] = [
        {
            id: 'pix',
            name: 'PIX',
            icon: <Smartphone className="w-5 h-5" />,
            description: 'Pagamento instantâneo brasileiro',
            available: true,
            processingTime: 'Instantâneo',
            fees: 'Grátis',
            international: false
        },
        {
            id: 'stripe',
            name: 'Cartão de Crédito',
            icon: <CreditCard className="w-5 h-5" />,
            description: 'Visa, Mastercard, American Express',
            available: true,
            processingTime: '2-3 dias',
            fees: '2.9% + R$ 0.30',
            international: true
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: <Globe className="w-5 h-5" />,
            description: 'Pagamento internacional seguro',
            available: true,
            processingTime: '1-2 dias',
            fees: '3.5% + R$ 0.50',
            international: true
        },
        {
            id: 'crypto',
            name: 'Criptomoedas',
            icon: <DollarSign className="w-5 h-5" />,
            description: 'Bitcoin, Ethereum, USDT',
            available: true,
            processingTime: '10-30 minutos',
            fees: '1%',
            international: true
        },
        {
            id: 'bank_transfer',
            name: 'Transferência Bancária',
            icon: <Monitor className="w-5 h-5" />,
            description: 'Transferência direta para conta',
            available: true,
            processingTime: '1-3 dias úteis',
            fees: 'R$ 5.00',
            international: true
        }
    ];

    const currencies: Currency[] = [
        { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$', rate: 1 },
        { code: 'USD', name: 'Dólar Americano', symbol: '$', rate: 0.21 },
        { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.19 },
        { code: 'GBP', name: 'Libra Esterlina', symbol: '£', rate: 0.16 },
        { code: 'CAD', name: 'Dólar Canadense', symbol: 'C$', rate: 0.28 },
        { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$', rate: 0.32 }
    ];

    const formatPrice = (price: number, currency: string) => {
        const currencyData = currencies.find(c => c.code === currency);
        const convertedPrice = price * (currencyData?.rate || 1);
        return `${currencyData?.symbol}${convertedPrice.toFixed(2)}`;
    };

    const handleCopyPixCode = () => {
        navigator.clipboard.writeText('21986289597');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePaymentSuccess = () => {
        setPaymentStep('success');
    };

    const handlePaymentError = (error: string) => {
        console.error('Erro no pagamento:', error);
        // Aqui você pode adicionar tratamento de erro
    };

    if (paymentStep === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Pagamento Confirmado!</h2>
                    <p className="text-gray-600 mb-8">
                        Seu pagamento foi processado com sucesso. Você receberá um email de confirmação em breve.
                    </p>
                    <Link
                        href="/courses"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                        Acessar Cursos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/courses" className="text-blue-600 hover:text-blue-700">
                                ← Voltar aos Cursos
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Finalizar Compra</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalhes do Curso</h2>

                            <div className="flex items-start space-x-6 mb-8">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl font-bold text-blue-600">F</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{courseData.title}</h3>
                                    <p className="text-gray-600 mb-4">Instrutor: {courseData.instructor}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Duração:</span>
                                            <p className="font-medium">{courseData.duration}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Aulas:</span>
                                            <p className="font-medium">{courseData.lessons} aulas</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Certificado:</span>
                                            <p className="font-medium text-green-600">Incluído</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Mentoria:</span>
                                            <p className="font-medium text-green-600">Incluída</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Escolha o Método de Pagamento</h3>

                                {/* Currency Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Moeda de Pagamento
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {currencies.map((currency) => (
                                            <button
                                                key={currency.code}
                                                onClick={() => setSelectedCurrency(currency.code)}
                                                className={`p-3 border rounded-lg text-left transition-colors ${selectedCurrency === currency.code
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="font-medium text-gray-900">{currency.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {formatPrice(courseData.price, currency.code)}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Methods Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedPaymentMethod === method.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => setSelectedPaymentMethod(method.id)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600">
                                                    {method.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2">
                                                        <h4 className="font-medium text-gray-900">{method.name}</h4>
                                                        {method.international && (
                                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                                Internacional
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">{method.description}</p>
                                                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                                                        <span>⏱️ {method.processingTime}</span>
                                                        <span>💳 {method.fees}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Form */}
                            {selectedPaymentMethod === 'pix' && (
                                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pagamento PIX</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white rounded-lg p-4 border">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700">Chave PIX:</span>
                                                <button
                                                    onClick={handleCopyPixCode}
                                                    className="text-blue-600 hover:text-blue-700 text-sm"
                                                >
                                                    {copied ? 'Copiado!' : 'Copiar'}
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                                                    {showPixCode ? '21986289597' : '•••••••••••'}
                                                </code>
                                                <button
                                                    onClick={() => setShowPixCode(!showPixCode)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPixCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <div className="flex items-start space-x-3">
                                                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-medium text-yellow-800">Instruções:</p>
                                                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                                                        <li>• Copie a chave PIX acima</li>
                                                        <li>• Abra seu app bancário</li>
                                                        <li>• Cole a chave e confirme o pagamento</li>
                                                        <li>• Aguarde a confirmação automática</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedPaymentMethod === 'stripe' && (
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cartão de Crédito</h3>
                                    <StripePayment
                                        amount={courseData.price}
                                        currency={selectedCurrency}
                                        onSuccess={handlePaymentSuccess}
                                        onError={handlePaymentError}
                                    />
                                </div>
                            )}

                            {selectedPaymentMethod === 'paypal' && (
                                <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">PayPal</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white rounded-lg p-4 border">
                                            <p className="text-sm text-gray-600 mb-4">
                                                Você será redirecionado para o PayPal para completar o pagamento de forma segura.
                                            </p>

                                            {/* PayPal Button */}
                                            <a
                                                href="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=fenixdevacademy@gmail.com&item_name=Curso%20Fenix%20Academy&amount=197.00&currency_code=BRL&return=https://fenixacademy.com/payment/paypal?st=Completed&cancel_return=https://fenixacademy.com/payment/paypal?st=Canceled&notify_url=https://fenixacademy.com/api/paypal/webhook"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                            >
                                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M20.067 8.478c.492.315.844.825.844 1.478 0 .653-.352 1.163-.844 1.478-.492.315-1.163.478-1.844.478H5.777c-.681 0-1.352-.163-1.844-.478C3.441 12.319 3.089 11.809 3.089 11.156c0-.653.352-1.163.844-1.478.492-.315 1.163-.478 1.844-.478h12.446c.681 0 1.352.163 1.844.478z" />
                                                </svg>
                                                <span>Pagar com PayPal</span>
                                            </a>

                                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <div className="flex items-start space-x-3">
                                                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-yellow-800">Informações importantes:</p>
                                                        <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                                                            <li>• Valor: {formatPrice(courseData.price, selectedCurrency)}</li>
                                                            <li>• Email: fenixdevacademy@gmail.com</li>
                                                            <li>• Após o pagamento, você será redirecionado automaticamente</li>
                                                            <li>• Acesso ao curso será liberado em até 24h</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedPaymentMethod === 'crypto' && (
                                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Criptomoedas</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white rounded-lg p-4 border">
                                            <p className="text-sm text-gray-600 mb-4">
                                                Escolha sua criptomoeda preferida:
                                            </p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['Bitcoin', 'Ethereum', 'USDT'].map((crypto) => (
                                                    <button
                                                        key={crypto}
                                                        className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                                                    >
                                                        <div className="font-medium text-gray-900">{crypto}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {formatPrice(courseData.price, selectedCurrency)}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedPaymentMethod === 'bank_transfer' && (
                                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Transferência Bancária</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white rounded-lg p-4 border">
                                            <h4 className="font-medium text-gray-900 mb-2">Dados Bancários:</h4>
                                            <div className="space-y-2 text-sm">
                                                <div><span className="font-medium">Banco:</span> Nubank</div>
                                                <div><span className="font-medium">Agência:</span> 0001</div>
                                                <div><span className="font-medium">Conta:</span> 12345678-9</div>
                                                <div><span className="font-medium">Titular:</span> Fenix Academy</div>
                                                <div><span className="font-medium">CNPJ:</span> 12.345.678/0001-90</div>
                                            </div>
                                            <div className="mt-4 p-3 bg-gray-50 rounded">
                                                <p className="text-sm text-gray-600">
                                                    <strong>Valor:</strong> {formatPrice(courseData.price, selectedCurrency)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Curso:</span>
                                    <span className="font-medium">{courseData.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Preço original:</span>
                                    <span className="line-through text-gray-500">
                                        {formatPrice(courseData.originalPrice, selectedCurrency)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Desconto:</span>
                                    <span className="text-green-600">-{courseData.discount}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Taxa ({paymentMethods.find(m => m.id === selectedPaymentMethod)?.fees}):</span>
                                    <span className="text-gray-600">
                                        {selectedPaymentMethod === 'pix' ? 'Grátis' :
                                            selectedPaymentMethod === 'stripe' ? formatPrice(5.7, selectedCurrency) :
                                                selectedPaymentMethod === 'paypal' ? formatPrice(6.9, selectedCurrency) :
                                                    selectedPaymentMethod === 'crypto' ? formatPrice(2, selectedCurrency) :
                                                        formatPrice(5, selectedCurrency)}
                                    </span>
                                </div>
                                <hr />
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total:</span>
                                    <span className="text-blue-600">
                                        {formatPrice(courseData.price, selectedCurrency)}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Acesso vitalício</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Certificado incluído</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Mentoria personalizada</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Suporte 24/7</span>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Oferta especial:</strong> Desconto de R$ 97 para os primeiros 1.000 alunos!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 