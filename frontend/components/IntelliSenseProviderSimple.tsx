'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface IntelliSenseSuggestion {
    label: string;
    kind: 'keyword' | 'function' | 'variable' | 'class' | 'interface' | 'property' | 'method' | 'snippet' | 'module';
    detail?: string;
    documentation?: string;
    insertText: string;
    insertTextRules?: 'InsertAsSnippet' | 'InsertAsText';
    sortText?: string;
    filterText?: string;
    range?: {
        startLineNumber: number;
        endLineNumber: number;
        startColumn: number;
        endColumn: number;
    };
}

interface IntelliSenseContextType {
    getSuggestions: (model: any, position: any, language: string) => IntelliSenseSuggestion[];
    getSnippets: (language: string) => IntelliSenseSuggestion[];
    getHoverInfo: (model: any, position: any, language: string) => string | null;
    getSignatureHelp: (model: any, position: any, language: string) => any;
    getCompletions: (model: any, position: any, language: string) => IntelliSenseSuggestion[];
}

const IntelliSenseContext = createContext<IntelliSenseContextType | null>(null);

export const useIntelliSense = () => {
    const context = useContext(IntelliSenseContext);
    if (!context) {
        throw new Error('useIntelliSense must be used within IntelliSenseProvider');
    }
    return context;
};

// Snippets básicos por linguagem
const basicSnippets = {
    javascript: [
        {
            label: 'function',
            insertText: 'function ${1:name}(${2:params}) {\n\t${3:// code}\n\treturn ${4:value};\n}',
            detail: 'Function Declaration',
            documentation: 'Creates a new function with parameters and return value'
        },
        {
            label: 'arrow',
            insertText: 'const ${1:name} = (${2:params}) => {\n\t${3:// code}\n\treturn ${4:value};\n};',
            detail: 'Arrow Function',
            documentation: 'Creates an arrow function expression'
        },
        {
            label: 'class',
            insertText: 'class ${1:ClassName} {\n\tconstructor(${2:params}) {\n\t\t${3:// initialization}\n\t}\n\n\t${4:method}() {\n\t\t${5:// implementation}\n\t}\n}',
            detail: 'Class Declaration',
            documentation: 'Creates a new class with constructor and methods'
        }
    ],
    typescript: [
        {
            label: 'interface',
            insertText: 'interface ${1:InterfaceName} {\n\t${2:property}: ${3:type};\n}',
            detail: 'Interface Declaration',
            documentation: 'Creates a TypeScript interface'
        },
        {
            label: 'type',
            insertText: 'type ${1:TypeName} = ${2:type};',
            detail: 'Type Alias',
            documentation: 'Creates a TypeScript type alias'
        }
    ],
    python: [
        {
            label: 'def',
            insertText: 'def ${1:function_name}(${2:params}):\n\t${3:"""Docstring"""}\n\t${4:# code}\n\treturn ${5:value}',
            detail: 'Function Definition',
            documentation: 'Creates a Python function'
        },
        {
            label: 'class',
            insertText: 'class ${1:ClassName}:\n\tdef __init__(self, ${2:params}):\n\t\t${3:# initialization}\n\n\tdef ${4:method}(self):\n\t\t${5:# implementation}',
            detail: 'Class Definition',
            documentation: 'Creates a Python class'
        }
    ],
    html: [
        {
            label: 'div',
            insertText: '<div className="${1:class-name}">\n\t${2:content}\n</div>',
            detail: 'Div Container',
            documentation: 'Creates a div container element'
        }
    ]
};

export const IntelliSenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Obter sugestões básicas
    const getSuggestions = useCallback((model: any, position: any, language: string): IntelliSenseSuggestion[] => {
        const word = model.getWordUntilPosition(position);
        const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };

        const suggestions: IntelliSenseSuggestion[] = [];
        const lang = language.toLowerCase();

        // Adicionar snippets básicos
        if (basicSnippets[lang as keyof typeof basicSnippets]) {
            const snippets = basicSnippets[lang as keyof typeof basicSnippets];
            snippets.forEach(snippet => {
                suggestions.push({
                    label: snippet.label,
                    kind: 'snippet',
                    detail: snippet.detail,
                    documentation: snippet.documentation,
                    insertText: snippet.insertText,
                    insertTextRules: 'InsertAsSnippet',
                    range,
                    sortText: '0' + snippet.label
                });
            });
        }

        return suggestions;
    }, []);

    // Obter snippets
    const getSnippets = useCallback((language: string): IntelliSenseSuggestion[] => {
        const lang = language.toLowerCase();
        const snippets = basicSnippets[lang as keyof typeof basicSnippets] || [];

        return snippets.map(snippet => ({
            label: snippet.label,
            kind: 'snippet',
            detail: snippet.detail,
            documentation: snippet.documentation,
            insertText: snippet.insertText,
            insertTextRules: 'InsertAsSnippet'
        }));
    }, []);

    // Obter informações de hover
    const getHoverInfo = useCallback((model: any, position: any, language: string): string | null => {
        const word = model.getWordAtPosition(position);
        if (!word) return null;

        return `**${word.word}** - ${language} keyword or identifier`;
    }, []);

    // Obter ajuda de assinatura
    const getSignatureHelp = useCallback((model: any, position: any, language: string) => {
        return {
            signatures: [],
            activeSignature: 0,
            activeParameter: 0
        };
    }, []);

    // Obter completions gerais
    const getCompletions = useCallback((model: any, position: any, language: string): IntelliSenseSuggestion[] => {
        return getSuggestions(model, position, language);
    }, [getSuggestions]);

    const value: IntelliSenseContextType = {
        getSuggestions,
        getSnippets,
        getHoverInfo,
        getSignatureHelp,
        getCompletions
    };

    return (
        <IntelliSenseContext.Provider value={value}>
            {children}
        </IntelliSenseContext.Provider>
    );
};
