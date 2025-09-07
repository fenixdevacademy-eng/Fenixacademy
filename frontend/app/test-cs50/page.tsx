'use client';

import React from 'react';
import CS50EnhancedDisplay from '../components/CS50EnhancedDisplay';

export default function TestCS50Page() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="text-center py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    🧪 Teste do Sistema CS50
                </h1>
                <p className="text-gray-600">
                    Testando se o componente CS50EnhancedDisplay está funcionando
                </p>
            </div>

            <CS50EnhancedDisplay courseId="1" />
        </div>
    );
}





