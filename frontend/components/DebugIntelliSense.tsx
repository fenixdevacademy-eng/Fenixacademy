'use client';

import React, { useState } from 'react';
import IntelliSense, { useIntelliSense } from './IntelliSense';

export default function DebugIntelliSense() {
    const [text, setText] = useState('');
    const intelliSense = useIntelliSense();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        console.log('=== DEBUG INTELLISENSE ===');
        console.log('Texto digitado:', newText);
        console.log('Comprimento:', newText.length);

        if (newText.length > 0) {
            const context = {
                language: 'javascript',
                currentLine: newText,
                cursorPosition: newText.length,
                fileContent: newText,
                lineNumber: 0,
                column: newText.length,
                wordBeforeCursor: newText.split(' ').pop() || ''
            };

            console.log('Contexto enviado:', context);
            intelliSense.showIntelliSense(context);
        } else {
            intelliSense.hideIntelliSense();
        }
    };

    const handleSelect = (suggestion: any) => {
        console.log('=== SUGESTÃO SELECIONADA ===');
        console.log('Sugestão completa:', suggestion);
        setText(suggestion.insertText);
        intelliSense.hideIntelliSense();
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">🐛 Debug do IntelliSense</h1>

            <div className="grid grid-cols-2 gap-8">
                {/* Editor */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Editor de Teste</h2>
                    <div className="relative">
                        <textarea
                            value={text}
                            onChange={handleChange}
                            placeholder="Digite algo para testar..."
                            className="w-full h-64 p-4 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none font-mono"
                        />

                        <IntelliSense
                            visible={intelliSense.isVisible}
                            context={intelliSense.context || {
                                language: 'javascript',
                                currentLine: '',
                                cursorPosition: 0,
                                fileContent: '',
                                lineNumber: 0,
                                column: 0,
                                wordBeforeCursor: ''
                            }}
                            onSelect={handleSelect}
                            onClose={() => intelliSense.hideIntelliSense()}
                            theme="light"
                        />
                    </div>
                </div>

                {/* Debug Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Informações de Debug</h2>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Estado do IntelliSense:</h3>
                        <ul className="space-y-1 text-sm">
                            <li>✅ Visível: <code className="bg-gray-200 px-2 py-1 rounded">{intelliSense.isVisible ? 'Sim' : 'Não'}</code></li>
                            <li>✅ Contexto: <code className="bg-gray-200 px-2 py-1 rounded">{intelliSense.context ? 'Sim' : 'Não'}</code></li>
                            <li>✅ Texto: <code className="bg-gray-200 px-2 py-1 rounded">"{text}"</code></li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">Como testar:</h3>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                            <li>Digite qualquer texto no editor</li>
                            <li>Verifique o console para logs detalhados</li>
                            <li>As sugestões devem aparecer automaticamente</li>
                            <li>Clique em uma sugestão para testar</li>
                        </ol>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-yellow-800 mb-2">Logs esperados:</h3>
                        <ul className="space-y-1 text-sm text-yellow-700">
                            <li>• "showIntelliSense chamado com:"</li>
                            <li>• "JavaScriptIntelliSense.getSuggestions chamado com:"</li>
                            <li>• "Keywords geradas: X"</li>
                            <li>• "Total de sugestões finais: X"</li>
                            <li>• "IntelliSense renderizando:"</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">⚠️ Problemas conhecidos:</h3>
                <ul className="space-y-1 text-sm text-red-700">
                    <li>• Se aparecer "Novas sugestões geradas: 0", há problema na geração</li>
                    <li>• Se aparecer "IntelliSense não visível ou sem sugestões", há problema na filtragem</li>
                    <li>• Verifique se todos os métodos de sugestão estão retornando arrays</li>
                </ul>
            </div>
        </div>
    );
}









