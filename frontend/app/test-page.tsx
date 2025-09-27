"use client";

import React from 'react';

export default function TestPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-blue-500 mb-4">
                    Teste de Estilos
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                    Esta é uma página de teste para verificar se os estilos estão funcionando.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-600 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Card Azul</h2>
                        <p className="text-blue-100">Este é um card com fundo azul.</p>
                    </div>
                    <div className="bg-green-600 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Card Verde</h2>
                        <p className="text-green-100">Este é um card com fundo verde.</p>
                    </div>
                    <div className="bg-purple-600 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Card Roxo</h2>
                        <p className="text-purple-100">Este é um card com fundo roxo.</p>
                    </div>
                </div>
                <div className="mt-8">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                        Botão de Teste
                    </button>
                </div>
            </div>
        </div>
    );
}




