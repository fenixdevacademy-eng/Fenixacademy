'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { ActionButtons } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Preços</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Escolha o plano ideal para acelerar sua carreira em tecnologia
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-4">Básico</h3>
                            <div className="text-4xl font-bold text-blue-600 mb-2">R$ 29</div>
                            <div className="text-gray-600 mb-6">por mês</div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Acesso a cursos básicos
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Suporte por email
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Certificados
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Comunidade Discord
                            </li>
                        </ul>
                        <ActionButtons.GetStarted className="w-full" />
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-600 hover:shadow-xl transition-shadow relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                Mais Popular
                            </div>
                        </div>
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-4">Pro</h3>
                            <div className="text-4xl font-bold text-blue-600 mb-2">R$ 59</div>
                            <div className="text-gray-600 mb-6">por mês</div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Todos os cursos
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Suporte prioritário
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Projetos práticos
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Mentoria 1:1
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Acesso ao IDE Avançado
                            </li>
                        </ul>
                        <ActionButtons.GetStarted className="w-full" />
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                            <div className="text-4xl font-bold text-blue-600 mb-2">R$ 199</div>
                            <div className="text-gray-600 mb-6">por mês</div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Tudo do Pro
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Treinamento corporativo
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Relatórios avançados
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                Suporte 24/7
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-3">✓</span>
                                API personalizada
                            </li>
                        </ul>
                        <ActionButtons.ContactUs className="w-full" />
                    </div>
                </div>

                <div className="bg-blue-600 rounded-lg p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Ainda tem dúvidas?</h2>
                    <p className="text-blue-100 mb-6">
                        Nossa equipe está pronta para ajudar você a escolher o plano ideal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <ActionButtons.ContactUs variant="secondary" size="lg" />
                        <ActionButtons.GetHelp variant="outline" size="lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}