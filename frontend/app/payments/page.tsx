'use client';

import React, { useState } from 'react';
import { Check, CreditCard, Lock, Shield, Clock, Award, Zap } from 'lucide-react';

const plans = [
  {
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
    popular: false
  },
  {
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
    popular: true
  },
  {
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
    popular: false
  }
];

const paymentMethods = [
  {
    id: "credit",
    name: "Cartão de Crédito",
    icon: CreditCard,
    description: "Pague em até 12x sem juros"
  },
  {
    id: "pix",
    name: "PIX",
    icon: Zap,
    description: "Pagamento instantâneo"
  },
  {
    id: "boleto",
    name: "Boleto Bancário",
    icon: Clock,
    description: "Vencimento em 3 dias"
  }
];

export default function PaymentsPage() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Simulação de processamento
    setTimeout(() => {
      setLoading(false);
      alert("Pagamento processado com sucesso!");
    }, 2000);
  };

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors duration-200 ${selectedPayment === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center space-x-3">
                  <method.icon className="h-6 w-6 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulário de Cartão */}
          {selectedPayment === "credit" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome no Cartão
                </label>
                <input
                  type="text"
                  placeholder="Nome como está no cartão"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* PIX */}
          {selectedPayment === "pix" && (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Pagamento via PIX
                </h3>
                <p className="text-gray-600 mb-4">
                  Escaneie o QR Code ou copie o código PIX para pagar
                </p>
                <div className="bg-white p-4 rounded border">
                  <div className="text-sm text-gray-500 mb-2">Código PIX:</div>
                  <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                    fenix.academy@pix.com
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Boleto */}
          {selectedPayment === "boleto" && (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Boleto Bancário
                </h3>
                <p className="text-gray-600 mb-4">
                  O boleto será gerado e enviado para seu email
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                  Gerar Boleto
                </button>
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
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center mx-auto space-x-2 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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