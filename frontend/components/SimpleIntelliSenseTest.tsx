'use client';

import React, { useState } from 'react';

export default function SimpleIntelliSenseTest() {
    const [text, setText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = [
        { id: '1', label: 'console.log', detail: 'function' },
        { id: '2', label: 'function', detail: 'keyword' },
        { id: '3', label: 'const', detail: 'keyword' },
        { id: '4', label: 'let', detail: 'keyword' },
        { id: '5', label: 'var', detail: 'keyword' }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        // Mostrar sugestões se há texto
        setShowSuggestions(newText.length > 0);
    };

    const handleSelect = (suggestion: any) => {
        console.log('Sugestão selecionada:', suggestion);
        setText(suggestion.label);
        setShowSuggestions(false);
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">🧪 Teste Simples do IntelliSense</h1>

            <div className="space-y-4">
                <div className="relative">
                    <label className="block text-sm font-medium mb-2">
                        Digite algo para testar:
                    </label>
                    <textarea
                        value={text}
                        onChange={handleChange}
                        placeholder="Digite 'con', 'fun', 'const' para ver sugestões..."
                        className="w-full h-32 p-4 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                    />

                    {/* IntelliSense Simples */}
                    {showSuggestions && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-blue-300 rounded-lg shadow-xl z-50">
                            {suggestions.map((suggestion) => (
                                <div
                                    key={suggestion.id}
                                    className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    onClick={() => handleSelect(suggestion)}
                                >
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                    <div>
                                        <div className="font-medium text-gray-800">{suggestion.label}</div>
                                        <div className="text-sm text-gray-500">{suggestion.detail}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Status:</h2>
                    <ul className="space-y-1 text-sm">
                        <li>✅ Texto digitado: <code className="bg-gray-200 px-2 py-1 rounded">"{text}"</code></li>
                        <li>✅ Sugestões visíveis: <code className="bg-gray-200 px-2 py-1 rounded">{showSuggestions ? 'Sim' : 'Não'}</code></li>
                        <li>✅ Número de sugestões: <code className="bg-gray-200 px-2 py-1 rounded">{suggestions.length}</code></li>
                    </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Como testar:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                        <li>Digite qualquer texto no campo acima</li>
                        <li>As sugestões devem aparecer automaticamente</li>
                        <li>Clique em uma sugestão para selecioná-la</li>
                        <li>Verifique o console para logs detalhados</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}









