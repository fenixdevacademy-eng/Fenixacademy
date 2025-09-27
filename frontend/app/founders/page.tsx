'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function FoundersPage() {
    const benefits = [
        {
            icon: Star,
            title: "Acesso Vitalício",
            description: "Acesso a todos os cursos e atualizações futuras sem custo adicional"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Programa Founders
                </h1>
                <p className="text-lg text-gray-600">
                    Conteúdo do programa founders será carregado em breve...
                </p>
            </div>
        </div>
    );
}