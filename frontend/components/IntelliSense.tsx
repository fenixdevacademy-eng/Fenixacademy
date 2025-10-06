'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Code, Lightbulb, Zap } from 'lucide-react';

interface IntelliSenseProps {
    suggestions?: string[];
    onSuggestionSelect?: (suggestion: string) => void;
}

export default function IntelliSense({ suggestions = [], onSuggestionSelect }: IntelliSenseProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(suggestions);

    useEffect(() => {
        setCurrentSuggestions(suggestions);
    }, [suggestions]);

    const defaultSuggestions = [
        'console.log()',
        'function()',
        'const variable =',
        'if (condition)',
        'for (let i = 0; i <',
        'return',
        'import { } from',
        'useState(',
        'useEffect(',
        'async function',
        'await',
        'try { } catch',
        'class Component',
        'extends React.Component'
    ];

    const allSuggestions = currentSuggestions.length > 0 ? currentSuggestions : defaultSuggestions;

    return (
        <div className="intellisense-container">
            <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-bold text-white">IntelliSense</h2>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">Sugestões de código</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    {allSuggestions.slice(0, 10).map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => onSuggestionSelect?.(suggestion)}
                            className="text-left p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm transition-colors"
                        >
                            <Code className="h-3 w-3 inline mr-2 text-blue-400" />
                            {suggestion}
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-gray-400">
                        {allSuggestions.length} sugestões disponíveis
                    </span>
                </div>
            </div>
        </div>
    );
}

