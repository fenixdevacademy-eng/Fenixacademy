'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Code,
    Zap,
    Lightbulb,
    ChevronRight,
    Star,
    Clock,
    TrendingUp
} from 'lucide-react';

interface Suggestion {
    id: string;
    label: string;
    insertText: string;
    detail: string;
    documentation: string;
    kind: 'keyword' | 'function' | 'variable' | 'class' | 'module' | 'property' | 'snippet';
    sortText: string;
    filterText: string;
    icon: React.ReactNode;
    category: string;
    usage: number;
    lastUsed: number;
}

interface AutocompleteContext {
    language: string;
    currentLine: string;
    cursorPosition: number;
    beforeCursor: string;
    afterCursor: string;
    currentWord: string;
    previousWords: string[];
    nextWords: string[];
    scope: 'global' | 'function' | 'class' | 'loop' | 'conditional';
}

interface IntelligentAutocompleteProps {
    language: string;
    currentLine: string;
    cursorPosition: number;
    onSuggestionSelect: (suggestion: Suggestion) => void;
    theme: 'dark' | 'light';
    visible: boolean;
    onClose: () => void;
}

export default function IntelligentAutocomplete({
    language,
    currentLine,
    cursorPosition,
    onSuggestionSelect,
    theme,
    visible,
    onClose
}: IntelligentAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDocumentation, setShowDocumentation] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Base de conhecimento de sugestões por linguagem
    const languageSuggestions: Record<string, Suggestion[]> = {
        javascript: [
            // Keywords
            {
                id: 'function',
                label: 'function',
                insertText: 'function ${1:functionName}(${2:parameters}) {\n\t${3:// function body}\n}',
                detail: 'Declare a function',
                documentation: 'Declares a function with the specified parameters. Use ${1}, ${2}, etc. for tab stops.',
                kind: 'keyword',
                sortText: '01',
                filterText: 'function',
                icon: <Code className="w-4 h-4 text-blue-500" />,
                category: 'Keywords',
                usage: 100,
                lastUsed: Date.now()
            },
            {
                id: 'const',
                label: 'const',
                insertText: 'const ${1:variableName} = ${2:value}',
                detail: 'Declare a constant',
                documentation: 'Declares a block-scoped constant that cannot be reassigned.',
                kind: 'keyword',
                sortText: '02',
                filterText: 'const',
                icon: <Code className="w-4 h-4 text-blue-500" />,
                category: 'Keywords',
                usage: 95,
                lastUsed: Date.now()
            },
            {
                id: 'let',
                label: 'let',
                insertText: 'let ${1:variableName} = ${2:value}',
                detail: 'Declare a variable',
                documentation: 'Declares a block-scoped variable that can be reassigned.',
                kind: 'keyword',
                sortText: '03',
                filterText: 'let',
                icon: <Code className="w-4 h-4 text-blue-500" />,
                category: 'Keywords',
                usage: 90,
                lastUsed: Date.now()
            },
            {
                id: 'if',
                label: 'if',
                insertText: 'if (${1:condition}) {\n\t${2:// code}\n}',
                detail: 'If statement',
                documentation: 'Executes a block of code if a specified condition is true.',
                kind: 'keyword',
                sortText: '04',
                filterText: 'if',
                icon: <Code className="w-4 h-4 text-blue-500" />,
                category: 'Keywords',
                usage: 85,
                lastUsed: Date.now()
            },
            {
                id: 'for',
                label: 'for',
                insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// code}\n}',
                detail: 'For loop',
                documentation: 'Creates a loop that executes a block of code a number of times.',
                kind: 'keyword',
                sortText: '05',
                filterText: 'for',
                icon: <Code className="w-4 h-4 text-blue-500" />,
                category: 'Keywords',
                usage: 80,
                lastUsed: Date.now()
            },
            // Functions
            {
                id: 'console.log',
                label: 'console.log',
                insertText: 'console.log(${1:value})',
                detail: 'Log to console',
                documentation: 'Outputs a message to the web console.',
                kind: 'function',
                sortText: '06',
                filterText: 'console.log',
                icon: <Zap className="w-4 h-4 text-green-500" />,
                category: 'Console',
                usage: 99,
                lastUsed: Date.now()
            },
            {
                id: 'setTimeout',
                label: 'setTimeout',
                insertText: 'setTimeout(() => {\n\t${1:// code}\n}, ${2:delay})',
                detail: 'Execute after delay',
                documentation: 'Calls a function or evaluates an expression after a specified number of milliseconds.',
                kind: 'function',
                sortText: '07',
                filterText: 'setTimeout',
                icon: <Zap className="w-4 h-4 text-green-500" />,
                category: 'Timing',
                usage: 70,
                lastUsed: Date.now()
            },
            // Array methods
            {
                id: 'map',
                label: 'map',
                insertText: '${1:array}.map(${2:item} => {\n\t${3:// transform item}\n\treturn ${4:transformedItem}\n})',
                detail: 'Array map method',
                documentation: 'Creates a new array with the results of calling a function for every array element.',
                kind: 'function',
                sortText: '08',
                filterText: 'map',
                icon: <Zap className="w-4 h-4 text-green-500" />,
                category: 'Array Methods',
                usage: 75,
                lastUsed: Date.now()
            },
            {
                id: 'filter',
                label: 'filter',
                insertText: '${1:array}.filter(${2:item} => {\n\t${3:// return true to keep item}\n\treturn ${4:condition}\n})',
                detail: 'Array filter method',
                documentation: 'Creates a new array with all elements that pass the test implemented by the provided function.',
                kind: 'function',
                sortText: '09',
                filterText: 'filter',
                icon: <Zap className="w-4 h-4 text-green-500" />,
                category: 'Array Methods',
                usage: 70,
                lastUsed: Date.now()
            },
            // Snippets
            {
                id: 'arrow-function',
                label: 'Arrow Function',
                insertText: 'const ${1:functionName} = (${2:parameters}) => {\n\t${3:// function body}\n}',
                detail: 'Arrow function declaration',
                documentation: 'Creates a concise arrow function expression.',
                kind: 'snippet',
                sortText: '10',
                filterText: 'arrow function',
                icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
                category: 'Snippets',
                usage: 85,
                lastUsed: Date.now()
            },
            {
                id: 'try-catch',
                label: 'Try-Catch',
                insertText: 'try {\n\t${1:// code that might throw}\n} catch (${2:error}) {\n\t${3:// handle error}\n}',
                detail: 'Error handling block',
                documentation: 'Creates a try-catch block for error handling.',
                kind: 'snippet',
                sortText: '11',
                filterText: 'try catch',
                icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
                category: 'Snippets',
                usage: 65,
                lastUsed: Date.now()
            }
        ],
        python: [
            {
                id: 'def',
                label: 'def',
                insertText: 'def ${1:function_name}(${2:parameters}):\n\t${3:"""docstring"""}\n\t${4:pass}',
                detail: 'Define a function',
                documentation: 'Defines a new function in Python.',
                kind: 'keyword',
                sortText: '01',
                filterText: 'def',
                icon: <Code className="w-4 h-4 text-blue-500" />,
                category: 'Keywords',
                usage: 95,
                lastUsed: Date.now()
            },
            {
                id: 'class',
                label: 'class',
                insertText: 'class ${1:ClassName}:\n\t${2:"""docstring"""}\n\tdef __init__(self):\n\t\t${3:pass}',
                detail: 'Define a class',
                documentation: 'Defines a new class in Python.',
                kind: 'keyword',
                sortText: '02',
                filterText: 'class',
                icon: <Code className="w-4 h-4 text-blue-500" />,
                category: 'Keywords',
                usage: 80,
                lastUsed: Date.now()
            },
            {
                id: 'if',
                label: 'if',
                insertText: 'if ${1:condition}:\n\t${2:pass}',
                detail: 'If statement',
                documentation: 'Conditional statement in Python.',
                kind: 'keyword',
                sortText: '03',
                filterText: 'if',
                icon: <Code className="w-4 h-4 text-blue-500" />,
                category: 'Keywords',
                usage: 90,
                lastUsed: Date.now()
            },
            {
                id: 'for',
                label: 'for',
                insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:pass}',
                detail: 'For loop',
                documentation: 'Iterates over an iterable object.',
                kind: 'keyword',
                sortText: '04',
                filterText: 'for',
                icon: <Code className="w-4 h-4 text-blue-500" />,
                category: 'Keywords',
                usage: 85,
                lastUsed: Date.now()
            },
            {
                id: 'print',
                label: 'print',
                insertText: 'print(${1:value})',
                detail: 'Print function',
                documentation: 'Prints the specified message to the console.',
                kind: 'function',
                sortText: '05',
                filterText: 'print',
                icon: <Zap className="w-4 h-4 text-green-500" />,
                category: 'Built-in Functions',
                usage: 99,
                lastUsed: Date.now()
            }
        ],
        html: [
            {
                id: 'html5',
                label: 'HTML5 Template',
                insertText: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Page Title}</title>\n</head>\n<body>\n\t${2}\n</body>\n</html>',
                detail: 'HTML5 document structure',
                documentation: 'Complete HTML5 document template with proper meta tags.',
                kind: 'snippet',
                sortText: '01',
                filterText: 'html5 template',
                icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
                category: 'Templates',
                usage: 95,
                lastUsed: Date.now()
            },
            {
                id: 'div',
                label: 'div',
                insertText: '<div class="${1:class-name}">\n\t${2}\n</div>',
                detail: 'Division element',
                documentation: 'Generic container for grouping content.',
                kind: 'snippet',
                sortText: '02',
                filterText: 'div',
                icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
                category: 'Elements',
                usage: 90,
                lastUsed: Date.now()
            },
            {
                id: 'form',
                label: 'form',
                insertText: '<form action="${1:action}" method="${2:post}">\n\t${3}\n\t<button type="submit">${4:Submit}</button>\n</form>',
                detail: 'Form element',
                documentation: 'Creates an interactive form for user input.',
                kind: 'snippet',
                sortText: '03',
                filterText: 'form',
                icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
                category: 'Forms',
                usage: 75,
                lastUsed: Date.now()
            }
        ],
        css: [
            {
                id: 'flexbox',
                label: 'Flexbox Container',
                insertText: 'display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};\nflex-direction: ${3:row};',
                detail: 'Flexbox layout properties',
                documentation: 'Common flexbox properties for modern layout.',
                kind: 'snippet',
                sortText: '01',
                filterText: 'flexbox flex',
                icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
                category: 'Layout',
                usage: 85,
                lastUsed: Date.now()
            },
            {
                id: 'grid',
                label: 'CSS Grid',
                insertText: 'display: grid;\ngrid-template-columns: ${1:repeat(auto-fit, minmax(200px, 1fr))};\ngap: ${2:1rem};',
                detail: 'CSS Grid layout',
                documentation: 'Modern CSS Grid layout system.',
                kind: 'snippet',
                sortText: '02',
                filterText: 'grid',
                icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
                category: 'Layout',
                usage: 70,
                lastUsed: Date.now()
            },
            {
                id: 'media-query',
                label: 'Media Query',
                insertText: '@media (max-width: ${1:768px}) {\n\t${2}\n}',
                detail: 'Responsive design media query',
                documentation: 'CSS media query for responsive design.',
                kind: 'snippet',
                sortText: '03',
                filterText: 'media query responsive',
                icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
                category: 'Responsive',
                usage: 80,
                lastUsed: Date.now()
            }
        ]
    };

    // Analisar contexto atual
    const analyzeContext = (): AutocompleteContext => {
        const beforeCursor = currentLine.substring(0, cursorPosition);
        const afterCursor = currentLine.substring(cursorPosition);
        const words = currentLine.split(/\s+/);
        const currentWordIndex = words.findIndex(word =>
            beforeCursor.endsWith(word) || beforeCursor.includes(word + ' ')
        );

        let scope: AutocompleteContext['scope'] = 'global';
        if (beforeCursor.includes('function') || beforeCursor.includes('=>')) scope = 'function';
        if (beforeCursor.includes('class')) scope = 'class';
        if (beforeCursor.includes('for') || beforeCursor.includes('while')) scope = 'loop';
        if (beforeCursor.includes('if') || beforeCursor.includes('else')) scope = 'conditional';

        return {
            language,
            currentLine,
            cursorPosition,
            beforeCursor,
            afterCursor,
            currentWord: currentWordIndex >= 0 ? words[currentWordIndex] : '',
            previousWords: words.slice(0, currentWordIndex),
            nextWords: words.slice(currentWordIndex + 1),
            scope
        };
    };

    // Gerar sugestões baseadas no contexto
    const generateSuggestions = (context: AutocompleteContext): Suggestion[] => {
        const baseSuggestions = languageSuggestions[context.language] || [];
        let contextualSuggestions = [...baseSuggestions];

        // Filtrar por contexto
        if (context.scope === 'function') {
            contextualSuggestions = contextualSuggestions.filter(s =>
                s.kind === 'function' || s.kind === 'variable'
            );
        } else if (context.scope === 'class') {
            contextualSuggestions = contextualSuggestions.filter(s =>
                s.kind === 'class' || s.kind === 'property'
            );
        }

        // Ordenar por relevância (uso + contexto)
        contextualSuggestions.sort((a, b) => {
            const aScore = a.usage + (context.currentWord.includes(a.label.toLowerCase()) ? 50 : 0);
            const bScore = b.usage + (context.currentWord.includes(b.label.toLowerCase()) ? 50 : 0);
            return bScore - aScore;
        });

        return contextualSuggestions;
    };

    // Filtrar sugestões baseado no termo de busca
    const filterSuggestions = (suggestions: Suggestion[], term: string): Suggestion[] => {
        if (!term) return suggestions;

        return suggestions.filter(suggestion =>
            suggestion.label.toLowerCase().includes(term.toLowerCase()) ||
            suggestion.detail.toLowerCase().includes(term.toLowerCase()) ||
            suggestion.filterText.toLowerCase().includes(term.toLowerCase())
        );
    };

    // Atualizar sugestões quando o contexto mudar
    useEffect(() => {
        if (!visible) return;

        const context = analyzeContext();
        const allSuggestions = generateSuggestions(context);
        const filtered = filterSuggestions(allSuggestions, context.currentWord);

        setSuggestions(allSuggestions);
        setFilteredSuggestions(filtered);
        setSelectedIndex(0);
        setSearchTerm(context.currentWord);
    }, [language, currentLine, cursorPosition, visible]);

    // Navegação com teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!visible) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
                    );
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredSuggestions[selectedIndex]) {
                        onSuggestionSelect(filteredSuggestions[selectedIndex]);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [visible, filteredSuggestions, selectedIndex, onSuggestionSelect, onClose]);

    // Fechar quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (!visible || filteredSuggestions.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className={`absolute z-50 w-96 max-h-80 overflow-hidden rounded-lg shadow-2xl border ${theme === 'dark'
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
            style={{
                top: '100%',
                left: '0',
                marginTop: '4px'
            }}
        >
            {/* Header */}
            <div className={`px-3 py-2 border-b ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                        💡 {filteredSuggestions.length} sugestões
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>↑↓ navegar</span>
                        <span>Enter selecionar</span>
                        <span>Esc fechar</span>
                    </div>
                </div>
            </div>

            {/* Lista de Sugestões */}
            <div className="max-h-64 overflow-y-auto">
                {filteredSuggestions.map((suggestion, index) => (
                    <div
                        key={suggestion.id}
                        className={`px-3 py-2 cursor-pointer transition-colors ${index === selectedIndex
                                ? theme === 'dark'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-100 text-blue-900'
                                : theme === 'dark'
                                    ? 'hover:bg-gray-700'
                                    : 'hover:bg-gray-50'
                            }`}
                        onClick={() => onSuggestionSelect(suggestion)}
                        onMouseEnter={() => setSelectedIndex(index)}
                    >
                        <div className="flex items-center space-x-3">
                            {suggestion.icon}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium truncate">
                                        {suggestion.label}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        {suggestion.category}
                                    </span>
                                </div>
                                <div className={`text-sm ${index === selectedIndex
                                        ? theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
                                        : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {suggestion.detail}
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Star className="w-3 h-3" />
                                <span>{suggestion.usage}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer com Documentação */}
            {filteredSuggestions[selectedIndex] && (
                <div className={`px-3 py-2 border-t ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                    }`}>
                    <div className="text-sm">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-700">
                                {filteredSuggestions[selectedIndex].label}
                            </span>
                            <button
                                onClick={() => setShowDocumentation(!showDocumentation)}
                                className="text-blue-600 hover:text-blue-700 text-xs"
                            >
                                {showDocumentation ? 'Ocultar' : 'Documentação'}
                            </button>
                        </div>
                        {showDocumentation && (
                            <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                {filteredSuggestions[selectedIndex].documentation}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}



