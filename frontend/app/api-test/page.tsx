'use client';

import React, { useState } from 'react';

export default function ApiTestPage() {
    const [testResult, setTestResult] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const testApi = async (apiPath: string) => {
        setLoading(true);
        setTestResult('');

        try {
            console.log(`🧪 Testando API: ${apiPath}`);
            const response = await fetch(apiPath);
            const data = await response.json();

            console.log('📡 Resposta:', response.status, data);

            if (response.ok) {
                setTestResult(`✅ Sucesso! Status: ${response.status}\n\nDados: ${JSON.stringify(data, null, 2)}`);
            } else {
                setTestResult(`❌ Erro! Status: ${response.status}\n\nErro: ${JSON.stringify(data, null, 2)}`);
            }
        } catch (error) {
            console.error('❌ Erro na requisição:', error);
            setTestResult(`❌ Erro na requisição: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🧪 Teste de APIs CS50
                    </h1>
                    <p className="text-xl text-gray-600">
                        Teste as APIs para verificar se estão funcionando corretamente
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Testar APIs</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <button
                            onClick={() => testApi('/api/courses/content/1')}
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            Testar API Original (curso 1)
                        </button>

                        <button
                            onClick={() => testApi('/api/courses/cs50-content/1')}
                            disabled={loading}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Testar Nova API CS50 (curso 1)
                        </button>

                        <button
                            onClick={() => testApi('/api/courses/content/2')}
                            disabled={loading}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                        >
                            Testar API Original (curso 2)
                        </button>

                        <button
                            onClick={() => testApi('/api/courses/cs50-content/2')}
                            disabled={loading}
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                        >
                            Testar Nova API CS50 (curso 2)
                        </button>
                    </div>

                    {loading && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <span className="text-gray-600">Testando API...</span>
                        </div>
                    )}
                </div>

                {testResult && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Resultado do Teste</h3>
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            {testResult}
                        </pre>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Informações dos Cursos</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Cursos Disponíveis</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>1 - web-fundamentals</li>
                                <li>2 - react-advanced</li>
                                <li>3 - nodejs-apis</li>
                                <li>4 - python-data-science</li>
                                <li>5 - devops-docker</li>
                                <li>6 - aws-cloud</li>
                                <li>7 - react-native-mobile</li>
                                <li>8 - flutter-mobile</li>
                                <li>9 - blockchain-smart-contracts</li>
                                <li>10 - ciberseguranca</li>
                                <li>11 - gestao-trafego</li>
                            </ul>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-2">APIs para Testar</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li><code>/api/courses/content/[id]</code> - API Original</li>
                                <li><code>/api/courses/cs50-content/[id]</code> - Nova API CS50</li>
                                <li>Substitua [id] por um número de 1 a 11</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





