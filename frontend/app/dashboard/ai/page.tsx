'use client';

import React, { useState } from 'react';
import { MessageSquare, Code, Brain, Zap } from 'lucide-react';

interface PersonalizedRecommendation {
    id: string;
    title: string;
    description: string;
    type: 'course' | 'exercise' | 'project';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface CodeAnalysis {
    score: number;
    suggestions: string[];
    complexity: 'low' | 'medium' | 'high';
}

export default function AIPage() {
    const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
    const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysis | null>(null);

    const tabs = [
        { id: 'chat', label: 'Chat IA', icon: MessageSquare, description: 'Converse com a IA superinteligente' },
        { id: 'code', label: 'Análise de Código', icon: Code, description: 'Analise e otimize seu código' }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">IA Superinteligente</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Seu assistente pessoal de programação com capacidades avançadas de análise de código,
                        explicação de conceitos e suporte técnico especializado.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-800 rounded-xl p-6 text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Code className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Revisão de Código</h3>
                        <p className="text-gray-400">Analise e melhore seu código com sugestões inteligentes</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 text-center">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Brain className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Explicação de Conceitos</h3>
                        <p className="text-gray-400">Entenda conceitos complexos de forma simples</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Debug Inteligente</h3>
                        <p className="text-gray-400">Encontre e corrija erros automaticamente</p>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <a
                        href="/ai"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                    >
                        <Brain className="w-5 h-5 mr-2" />
                        Acessar IA Completa
                    </a>
                </div>
            </div>
        </div>
    );
}