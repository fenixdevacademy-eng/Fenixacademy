'use client';

import React, { useState } from 'react';
import IntelliSense, { useIntelliSense } from './IntelliSense';

export default function IntelliSenseTest() {
    const [text, setText] = useState('');
    const intelliSense = useIntelliSense();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);

        // Simular ativação do IntelliSense
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
            intelliSense.showIntelliSense(context);
        } else {
            intelliSense.hideIntelliSense();
        }
    };

    const handleSelect = (suggestion: any) => {
        console.log('Sugestão selecionada:', suggestion);
        setText(suggestion.insertText);
        intelliSense.hideIntelliSense();
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Teste do IntelliSense</h1>
            <div className="relative">
                <textarea
                    value={text}
                    onChange={handleChange}
                    placeholder="Digite algo para testar o IntelliSense..."
                    className="w-full h-32 p-4 border border-gray-300 rounded"
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

            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Status do IntelliSense:</h2>
                <p>Visível: {intelliSense.isVisible ? 'Sim' : 'Não'}</p>
                <p>Contexto: {intelliSense.context ? 'Sim' : 'Não'}</p>
                <p>Texto digitado: "{text}"</p>
            </div>
        </div>
    );
}









