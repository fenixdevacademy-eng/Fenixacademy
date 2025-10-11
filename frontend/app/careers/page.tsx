'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { ActionButtons } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Carreiras</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Junte-se à nossa equipe e faça parte da revolução da educação tecnológica!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <ActionButtons.ViewPricing size="lg" />
                        <ActionButtons.ContactUs size="lg" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                    </div>
                            <h3 className="text-xl font-semibold mb-2">Desenvolvedor Frontend</h3>
                            <p className="text-gray-600 mb-4">React, Next.js, TypeScript</p>
                            <p className="text-sm text-gray-500 mb-6">Remoto • Tempo Integral</p>
                </div>
                        <ActionButtons.ContactUs className="w-full" />
                        </div>

                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                                </svg>
                                            </div>
                            <h3 className="text-xl font-semibold mb-2">Desenvolvedor Backend</h3>
                            <p className="text-gray-600 mb-4">Node.js, Python, PostgreSQL</p>
                            <p className="text-sm text-gray-500 mb-6">Remoto • Tempo Integral</p>
                                            </div>
                        <ActionButtons.ContactUs className="w-full" />
                                                </div>

                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                                </svg>
                                                    </div>
                            <h3 className="text-xl font-semibold mb-2">Designer UX/UI</h3>
                            <p className="text-gray-600 mb-4">Figma, Adobe XD, Prototipagem</p>
                            <p className="text-sm text-gray-500 mb-6">Remoto • Tempo Integral</p>
                                                    </div>
                        <ActionButtons.ContactUs className="w-full" />
                                        </div>
                                </div>

                <div className="bg-blue-600 rounded-lg p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Não encontrou a vaga ideal?</h2>
                    <p className="text-blue-100 mb-6">
                        Envie seu currículo mesmo assim! Estamos sempre procurando talentos excepcionais.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <ActionButtons.ContactUs variant="secondary" size="lg" />
                        <ActionButtons.JoinCommunity variant="outline" size="lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}