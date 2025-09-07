'use client';

import React from 'react';
import { InteractiveAnalytics } from '../components/InteractiveAnalytics';

export default function AnalyticsDemoPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header da Demonstração */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-bold mb-4">
                        📊 Demonstração: Analytics dos Elementos Interativos
                    </h1>
                    <p className="text-xl opacity-90">
                        Monitore o engajamento, performance e progresso dos usuários com elementos interativos
                    </p>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <InteractiveAnalytics
                    userId="demo_user_001"
                    showUserStats={true}
                    showElementStats={true}
                    showTrends={true}
                />
            </div>

            {/* Footer Informativo */}
            <div className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">📈 Métricas Principais</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Engajamento do usuário</li>
                                <li>• Taxa de conclusão</li>
                                <li>• Tempo médio de uso</li>
                                <li>• Satisfação do usuário</li>
                                <li>• Caminho de aprendizado</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">🎯 Benefícios</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Identificar elementos populares</li>
                                <li>• Otimizar experiência do usuário</li>
                                <li>• Personalizar recomendações</li>
                                <li>• Medir eficácia do aprendizado</li>
                                <li>• Tomar decisões baseadas em dados</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">🚀 Funcionalidades</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• Dashboard em tempo real</li>
                                <li>• Relatórios personalizáveis</li>
                                <li>• Insights automáticos</li>
                                <li>• Exportação de dados</li>
                                <li>• Integração com outros sistemas</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                        <p className="text-gray-400">
                            🎉 Sistema de Analytics completo para monitorar e otimizar a experiência de aprendizado!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
