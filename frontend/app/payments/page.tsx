'use client';

import React, { useState, useEffect } from 'react';
import {
  Check,
  CreditCard,
  Lock,
  Shield,
  Clock,
  Award,
  Zap,
  Copy,
  Download,
  QrCode,
  Building2,
  Smartphone,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
  EyeOff,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard as CardIcon,
  Banknote,
  Receipt
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Dados bancários específicos
const BANK_DATA = {
  agency: '1823-6',
  account: '123.869-8',
  bank: 'Banco do Brasil',
  pixKey: 'fenix.academy@bb.com.br',
  cnpj: '12.345.678/0001-90',
  companyName: 'Fenix Academy Ltda'
};

const plans = [
  {
    id: 'basic',
    name: "Básico",
    price: 97,
    originalPrice: 197,
    period: "mês",
    features: [
      "Acesso a 3 cursos",
      "Suporte por email",
      "Certificados básicos",
      "Projetos práticos"
    ],
    popular: false,
    color: 'gray'
  },
  {
    id: 'pro',
    name: "Pro",
    price: 197,
    originalPrice: 397,
    period: "mês",
    features: [
      "Acesso a todos os cursos",
      "Suporte prioritário",
      "Certificados premium",
      "Mentoria em grupo",
      "Projetos avançados",
      "Comunidade exclusiva"
    ],
    popular: true,
    color: 'blue'
  },
  {
    id: 'founder',
    name: "Fundador",
    price: 997,
    originalPrice: 1997,
    period: "vitalício",
    features: [
      "Acesso vitalício a tudo",
      "Suporte VIP 24/7",
      "Certificados especiais",
      "Mentoria individual",
      "Comunidade fundadores",
      "Roadmap personalizado",
      "Garantia de 30 dias"
    ],
    popular: false,
    color: 'purple'
  }
];

const paymentMethods = [
  {
    id: "credit",
    name: "Cartão de Crédito",
    icon: CreditCard,
    description: "Pague em até 12x sem juros",
    available: true,
    processingTime: "Imediato"
  },
  {
    id: "pix",
    name: "PIX",
    icon: Zap,
    description: "Pagamento instantâneo",
    available: true,
    processingTime: "Imediato"
  },
  {
    id: "boleto",
    name: "Boleto Bancário",
    icon: Clock,
    description: "Vencimento em 3 dias",
    available: true,
    processingTime: "3 dias úteis"
  },
  {
    id: "transfer",
    name: "Transferência Bancária",
    icon: Building2,
    description: "Dados bancários fornecidos",
    available: true,
    processingTime: "1 dia útil"
  }
];

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  installments: number;
  email: string;
  phone: string;
  cpf: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default function PaymentsPage() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Plan, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    installments: 1,
    email: '',
    phone: '',
    cpf: '',
    address: {
      street: '',
      number: '',
      complement: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [showPixCode, setShowPixCode] = useState(false);
  const [showBankData, setShowBankData] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('pending');

  // Validação de formulário
  const validateForm = () => {
    if (selectedPayment === 'credit') {
      return formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardName;
    }
    if (selectedPayment === 'pix') {
      return true; // PIX não precisa de dados adicionais
    }
    if (selectedPayment === 'boleto') {
      return formData.email;
    }
    if (selectedPayment === 'transfer') {
      return formData.email;
    }
    return false;
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatZipCode = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (field === 'phone') {
      formattedValue = formatPhone(value);
    } else if (field === 'zipCode') {
      formattedValue = formatZipCode(value);
    }

    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: formattedValue
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: formattedValue
      }));
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    setPaymentStatus('processing');

    try {
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simular sucesso/erro baseado no método de pagamento
      const success = Math.random() > 0.1; // 90% de chance de sucesso

      if (success) {
        setPaymentStatus('success');
        toast.success('Pagamento processado com sucesso!');

        // Simular redirecionamento após 3 segundos
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000);
      } else {
        setPaymentStatus('error');
        toast.error('Erro no processamento do pagamento. Tente novamente.');
      }
    } catch (error) {
      setPaymentStatus('error');
      toast.error('Erro no processamento do pagamento');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado para a área de transferência!`);
  };

  const downloadBankData = () => {
    const bankDataText = `
DADOS BANCÁRIOS - FENIX ACADEMY
================================

Banco: ${BANK_DATA.bank}
Agência: ${BANK_DATA.agency}
Conta: ${BANK_DATA.account}
CNPJ: ${BANK_DATA.cnpj}
Razão Social: ${BANK_DATA.companyName}

PIX:
Chave PIX: ${BANK_DATA.pixKey}

Para pagamento via transferência, utilize os dados acima.
O comprovante deve ser enviado para: financeiro@fenixacademy.com.br
    `;

    const blob = new Blob([bankDataText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados-bancarios-fenix-academy.txt';
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Dados bancários baixados!');
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pagamento Aprovado!</h1>
          <p className="text-gray-600 mb-6">
            Seu pagamento foi processado com sucesso. Você receberá um email de confirmação em breve.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Plano: {plans[selectedPlan].name}</p>
            <p>Valor: R$ {plans[selectedPlan].price}</p>
            <p>Método: {paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
          </div>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Redirecionando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Escolha Seu Plano
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selecione o plano ideal para sua jornada de aprendizado
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, label: 'Plano', icon: Award },
              { step: 2, label: 'Pagamento', icon: CreditCard },
              { step: 3, label: 'Confirmação', icon: CheckCircle }
            ].map(({ step: stepNumber, label, icon: Icon }) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${step >= stepNumber ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                  {label}
                </span>
                {stepNumber < 3 && (
                  <div className={`w-8 h-0.5 ml-4 ${step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-lg border-2 p-8 ${plan.popular ? 'border-blue-500' : 'border-gray-200'
                } ${selectedPlan === index ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">R$ {plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="text-gray-500 line-through">
                    De R$ {plan.originalPrice}
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(index)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${selectedPlan === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {selectedPlan === index ? 'Selecionado' : 'Selecionar Plano'}
              </button>
            </div>
          ))}
        </div>

        {/* Método de Pagamento */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Método de Pagamento</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors duration-200 ${selectedPayment === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => method.available && setSelectedPayment(method.id)}
              >
                <div className="flex items-center space-x-3">
                  <method.icon className="h-6 w-6 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                    <div className="text-xs text-gray-500">{method.processingTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulário de Cartão */}
          {selectedPayment === "credit" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Dados do Cartão</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do Cartão *
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Validade *
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/AA"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome no Cartão *
                  </label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    placeholder="Nome como está no cartão"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parcelas
                  </label>
                  <select
                    value={formData.installments}
                    onChange={(e) => handleInputChange('installments', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 6, 9, 12].map(num => (
                      <option key={num} value={num}>
                        {num}x de R$ {(plans[selectedPlan].price / num).toFixed(2)} sem juros
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* PIX */}
          {selectedPayment === "pix" && (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
                <QrCode className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Pagamento via PIX
                </h3>
                <p className="text-gray-600 mb-4">
                  Escaneie o QR Code ou copie a chave PIX para pagar
                </p>

                <div className="bg-white p-4 rounded border mb-4">
                  <div className="text-sm text-gray-500 mb-2">Chave PIX:</div>
                  <div className="flex items-center space-x-2">
                    <div className="font-mono text-sm bg-gray-100 p-2 rounded flex-1">
                      {BANK_DATA.pixKey}
                    </div>
                    <button
                      onClick={() => copyToClipboard(BANK_DATA.pixKey, 'Chave PIX')}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Após o pagamento, envie o comprovante para: financeiro@fenixacademy.com.br
                </div>
              </div>
            </div>
          )}

          {/* Boleto */}
          {selectedPayment === "boleto" && (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
                <Receipt className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Boleto Bancário
                </h3>
                <p className="text-gray-600 mb-4">
                  O boleto será gerado e enviado para seu email
                </p>

                <div className="space-y-4">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Seu email para receber o boleto"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Gerar Boleto
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transferência Bancária */}
          {selectedPayment === "transfer" && (
            <div className="py-8">
              <div className="bg-gray-100 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dados Bancários
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowBankData(!showBankData)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                    >
                      {showBankData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={downloadBankData}
                      className="p-2 text-green-500 hover:bg-green-50 rounded"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {showBankData && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={BANK_DATA.bank}
                            readOnly
                            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded"
                          />
                          <button
                            onClick={() => copyToClipboard(BANK_DATA.bank, 'Banco')}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Agência</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={BANK_DATA.agency}
                            readOnly
                            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded"
                          />
                          <button
                            onClick={() => copyToClipboard(BANK_DATA.agency, 'Agência')}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Conta</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={BANK_DATA.account}
                            readOnly
                            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded"
                          />
                          <button
                            onClick={() => copyToClipboard(BANK_DATA.account, 'Conta')}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={BANK_DATA.cnpj}
                            readOnly
                            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded"
                          />
                          <button
                            onClick={() => copyToClipboard(BANK_DATA.cnpj, 'CNPJ')}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium">Importante:</p>
                          <p>Após realizar a transferência, envie o comprovante para: financeiro@fenixacademy.com.br</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Seu email para receber a confirmação"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resumo do Pedido */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Plano selecionado:</span>
              <span className="font-medium">{plans[selectedPlan].name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Método de pagamento:</span>
              <span className="font-medium">
                {paymentMethods.find(m => m.id === selectedPayment)?.name}
              </span>
            </div>
            {selectedPayment === 'credit' && formData.installments > 1 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Parcelas:</span>
                <span className="font-medium">{formData.installments}x de R$ {(plans[selectedPlan].price / formData.installments).toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>R$ {plans[selectedPlan].price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Pagamento */}
        <div className="text-center">
          <button
            onClick={handlePayment}
            disabled={loading || !validateForm()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center mx-auto space-x-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                <span>Finalizar Compra</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
            <Shield className="h-4 w-4 mr-2" />
            <span>Pagamento seguro com criptografia SSL</span>
          </div>
        </div>

        {/* Garantia */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <div className="flex items-center space-x-3">
            <Award className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">Garantia de 30 Dias</h3>
              <p className="text-green-700">
                Se você não ficar satisfeito, devolvemos 100% do seu dinheiro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}