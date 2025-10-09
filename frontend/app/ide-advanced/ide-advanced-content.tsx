'use client';

import React from 'react';

export default function IDEAdvancedContent() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    IDE Avançado - Fenix Academy
                </h1>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Funcionalidades do IDE</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>• Editor de código com syntax highlighting</li>
                        <li>• Terminal integrado</li>
                        <li>• Sistema de arquivos</li>
                        <li>• Debugger avançado</li>
                        <li>• Extensões personalizáveis</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}