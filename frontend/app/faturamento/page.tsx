'use client';

import React from 'react';
import { DollarSign, TrendingUp, Target, Users, Zap, Crown, Gift, Star, ArrowUp, ArrowDown, Minus, Globe } from 'lucide-react';
import RevenueProjection from '../../components/RevenueProjection';
import GlobalRevenueProjection from '../../components/GlobalRevenueProjection';

export default function FaturamentoPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Projeção de Faturamento
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Análise detalhada do potencial de faturamento da Fenix Academy considerando mercados brasileiro e internacional
                    </p>
                </div>

                {/* Tabs */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="flex justify-center">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
                            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium">
                                🇧🇷 Brasil
                            </button>
                            <button className="px-6 py-3 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                                🌍 Global
                            </button>
                        </div>
                    </div>
                </div>

                {/* Brazil Projection */}
                <div className="max-w-6xl mx-auto">
                    <RevenueProjection />
                </div>

                {/* Global Projection */}
                <div className="max-w-6xl mx-auto mt-12">
                    <GlobalRevenueProjection />
                </div>

                {/* Additional Insights */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Market Analysis */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Target className="w-6 h-6 text-blue-500" />
                                Análise de Mercado
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <span className="text-gray-700 dark:text-gray-300">TAM (Total Addressable Market)</span>
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">50M pessoas</span>
                                </div>

                                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <span className="text-gray-700 dark:text-gray-300">SAM (Serviceable Addressable Market)</span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">10M pessoas</span>
                                </div>

                                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <span className="text-gray-700 dark:text-gray-300">SOM (Serviceable Obtainable Market)</span>
                                    <span className="font-semibold text-purple-600 dark:text-purple-400">100K pessoas</span>
                                </div>

                                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                    <span className="text-gray-700 dark:text-gray-300">Crescimento Anual do Setor</span>
                                    <span className="font-semibold text-orange-600 dark:text-orange-400">+25%</span>
                                </div>
                            </div>
                        </div>

                        {/* Competitive Advantages */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Zap className="w-6 h-6 text-yellow-500" />
                                Vantagens Competitivas
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <Crown className="w-5 h-5 text-yellow-500" />
                                    <span className="text-gray-700 dark:text-gray-300">IA Superinteligente exclusiva</span>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <Gift className="w-5 h-5 text-blue-500" />
                                    <span className="text-gray-700 dark:text-gray-300">Sistema de referência com recompensas</span>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <Star className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-700 dark:text-gray-300">Sistema de cupons inteligente</span>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <Users className="w-5 h-5 text-purple-500" />
                                    <span className="text-gray-700 dark:text-gray-300">Chat de suporte 24/7</span>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-pink-500" />
                                    <span className="text-gray-700 dark:text-gray-300">Analytics avançado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue Scenarios */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                            📊 Cenários de Faturamento - Primeiro Mês
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Conservative */}
                            <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <ArrowDown className="w-6 h-6 text-red-500" />
                                    <h4 className="text-lg font-semibold text-red-700 dark:text-red-300">Conservador</h4>
                                </div>
                                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                                    R$ 8.500
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Cenário com baixo investimento em marketing
                                </div>
                                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <li>• 200 usuários ativos</li>
                                    <li>• 2% taxa de conversão</li>
                                    <li>• R$ 5.000 marketing</li>
                                    <li>• ROI: 70%</li>
                                </ul>
                            </div>

                            {/* Realistic */}
                            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Minus className="w-6 h-6 text-blue-500" />
                                    <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Realista</h4>
                                </div>
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                    R$ 15.200
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Cenário com investimento moderado e execução adequada
                                </div>
                                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <li>• 400 usuários ativos</li>
                                    <li>• 3.5% taxa de conversão</li>
                                    <li>• R$ 10.000 marketing</li>
                                    <li>• ROI: 152%</li>
                                </ul>
                            </div>

                            {/* Optimistic */}
                            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <ArrowUp className="w-6 h-6 text-green-500" />
                                    <h4 className="text-lg font-semibold text-green-700 dark:text-green-300">Otimista</h4>
                                </div>
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                                    R$ 28.500
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Cenário com alto investimento e execução excelente
                                </div>
                                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <li>• 750 usuários ativos</li>
                                    <li>• 5% taxa de conversão</li>
                                    <li>• R$ 20.000 marketing</li>
                                    <li>• ROI: 142%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Success Factors */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            🎯 Fatores de Sucesso para Alcançar o Faturamento
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Marketing Digital</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Investir R$ 10-20K em Google Ads, Facebook Ads e SEO
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">IA Superinteligente</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Diferencial competitivo que aumenta conversão em 50%
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎁</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Programa de Referência</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Sistema que pode gerar 15-20% das vendas
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎫</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sistema de Cupons</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Aumenta conversão em 25% com descontos estratégicos
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">💬</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Suporte 24/7</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Chat inteligente que reduz abandono de carrinho
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics Avançado</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Otimização contínua baseada em dados reais
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Summary */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
                        <h3 className="text-3xl font-bold mb-6 text-center">
                            🌍 Resumo Global - Primeiro Mês
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">R$ 15.200</div>
                                <div className="text-lg opacity-90">Brasil</div>
                                <div className="text-sm opacity-75">Investimento: R$ 10.000</div>
                            </div>

                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">$45.000</div>
                                <div className="text-lg opacity-90">Global (USD)</div>
                                <div className="text-sm opacity-75">Investimento: $50.000</div>
                            </div>

                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">R$ 225.000</div>
                                <div className="text-lg opacity-90">Global (BRL)</div>
                                <div className="text-sm opacity-75">Total convertido</div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold mb-2">
                                🚀 Potencial Total: R$ 240.200
                            </div>
                            <p className="text-lg opacity-90 mb-6">
                                Faturamento combinado Brasil + Global no primeiro mês
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                    Ver Estratégia Global
                                </button>
                                <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                                    Calcular ROI Global
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
