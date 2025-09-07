'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Filter, X, Lightbulb, ArrowRight, Code, Zap, BookOpen, Star, Clock, TrendingUp } from 'lucide-react';
import { CodeSuggestion, CodeSuggestionEngine } from './CodeSuggestionEngine';

interface IntelligentCodeSuggestionsProps {
    visible: boolean;
    onClose: () => void;
    onApplySuggestion: (suggestion: CodeSuggestion) => void;
    engine: CodeSuggestionEngine | null;
    language: string;
    fileContent: string;
    currentLine: string;
    previousLines: string[];
    nextLines: string[];
}

export default function IntelligentCodeSuggestions({
    visible,
    onClose,
    onApplySuggestion,
    engine,
    language,
    fileContent,
    currentLine,
    previousLines,
    nextLines
}: IntelligentCodeSuggestionsProps) {
    const [suggestions, setSuggestions] = useState<CodeSuggestion[]>([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState<CodeSuggestion[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
    const [showExplanations, setShowExplanations] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Gerar sugestões quando o componente ficar visível
    useEffect(() => {
        if (visible && engine) {
            generateSuggestions();
        }
    }, [visible, engine, language, fileContent, currentLine]);

    // Filtrar sugestões quando mudar critérios
    useEffect(() => {
        let filtered = suggestions;

        // Filtrar por categoria
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(s => s.category === selectedCategory);
        }

        // Filtrar por complexidade
        if (selectedComplexity !== 'all') {
            filtered = filtered.filter(s => s.complexity === selectedComplexity);
        }

        // Filtrar por termo de busca
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(s =>
                s.code.toLowerCase().includes(term) ||
                s.explanation.toLowerCase().includes(term) ||
                s.tags.some(tag => tag.toLowerCase().includes(term))
            );
        }

        // Ordenar por confiança e uso
        filtered.sort((a, b) => {
            // Priorizar por confiança
            if (Math.abs(a.confidence - b.confidence) > 0.1) {
                return b.confidence - a.confidence;
            }
            // Depois por uso
            return b.usage - a.usage;
        });

        setFilteredSuggestions(filtered);
        setSelectedIndex(0);
    }, [suggestions, searchTerm, selectedCategory, selectedComplexity]);

    // Gerar sugestões usando o engine
    const generateSuggestions = useCallback(async () => {
        if (!engine) return;

        setIsLoading(true);
        try {
            const context = {
                language,
                fileContent,
                currentLine,
                previousLines,
                nextLines,
                cursorPosition: 0, // Valor padrão
                imports: [], // Array vazio
                variables: [], // Array vazio
                functions: [], // Array vazio
                classes: [], // Array vazio
                scope: detectScope(),
                intent: detectIntent()
            };

            const newSuggestions = await engine.generateSuggestions(context);
            setSuggestions(newSuggestions);
        } catch (error) {
            console.error('Erro ao gerar sugestões:', error);
        } finally {
            setIsLoading(false);
        }
    }, [engine, language, fileContent, currentLine, previousLines, nextLines]);

    // Detectar escopo atual
    const detectScope = (): 'global' | 'function' | 'class' | 'loop' | 'conditional' | 'try-catch' => {
        const lines = [...previousLines, currentLine];
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i].trim();
            if (line.includes('class ')) return 'class';
            if (line.includes('def ') || line.includes('function ')) return 'function';
            if (line.includes('for ') || line.includes('while ')) return 'loop';
            if (line.includes('if ') || line.includes('elif ') || line.includes('else:')) return 'conditional';
            if (line.includes('try:') || line.includes('catch:') || line.includes('except:')) return 'try-catch';
        }
        return 'global';
    };

    // Detectar intenção atual
    const detectIntent = (): 'function' | 'loop' | 'condition' | 'variable' | 'class' | 'import' | 'comment' | 'unknown' => {
        const line = currentLine.trim();
        if (line.includes('def ') || line.includes('function ')) return 'function';
        if (line.includes('for ') || line.includes('while ')) return 'loop';
        if (line.includes('if ') || line.includes('elif ')) return 'condition';
        if (line.includes('=') && !line.includes('==')) return 'variable';
        if (line.includes('class ')) return 'class';
        if (line.includes('import ') || line.includes('from ')) return 'import';
        if (line.includes('//') || line.includes('#') || line.includes('/*')) return 'comment';
        return 'unknown';
    };

    // Aplicar sugestão
    const applySuggestion = (suggestion: CodeSuggestion) => {
        onApplySuggestion(suggestion);
        onClose();
    };

    // Navegação por teclado
    const handleKeyDown = (e: React.KeyboardEvent) => {
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
                    applySuggestion(filteredSuggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                onClose();
                break;
        }
    };

    // Obter cor da categoria
    const getCategoryColor = (category: string): string => {
        const colors: { [key: string]: string } = {
            'snippet': 'bg-blue-100 text-blue-800 border-blue-200',
            'best-practice': 'bg-green-100 text-green-800 border-green-200',
            'completion': 'bg-purple-100 text-purple-800 border-purple-200',
            'next-line': 'bg-orange-100 text-orange-800 border-orange-200',
            'error-fix': 'bg-red-100 text-red-800 border-red-200'
        };
        return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Obter cor da complexidade
    const getComplexityColor = (complexity: string): string => {
        const colors: { [key: string]: string } = {
            'simple': 'bg-green-100 text-green-700',
            'medium': 'bg-yellow-100 text-yellow-700',
            'advanced': 'bg-red-100 text-red-700'
        };
        return colors[complexity] || 'bg-gray-100 text-gray-700';
    };

    // Obter ícone da categoria
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'snippet': return <Code className="w-4 h-4" />;
            case 'best-practice': return <Star className="w-4 h-4" />;
            case 'completion': return <Zap className="w-4 h-4" />;
            case 'next-line': return <ArrowRight className="w-4 h-4" />;
            case 'error-fix': return <Lightbulb className="w-4 h-4" />;
            default: return <BookOpen className="w-4 h-4" />;
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={containerRef}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-11/12 max-w-4xl max-h-[90vh] overflow-hidden"
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <Lightbulb className="w-6 h-6 text-yellow-500" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Sugestões Inteligentes de Código
                        </h2>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {language.toUpperCase()}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Filtros e Busca */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Busca */}
                        <div className="relative flex-1 min-w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar sugestões..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filtro de Categoria */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todas as Categorias</option>
                            <option value="snippet">Snippets</option>
                            <option value="best-practice">Boas Práticas</option>
                            <option value="completion">Completar</option>
                            <option value="next-line">Próxima Linha</option>
                            <option value="error-fix">Correções</option>
                        </select>

                        {/* Filtro de Complexidade */}
                        <select
                            value={selectedComplexity}
                            onChange={(e) => setSelectedComplexity(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todas as Complexidades</option>
                            <option value="simple">Simples</option>
                            <option value="medium">Médio</option>
                            <option value="advanced">Avançado</option>
                        </select>

                        {/* Toggle Explicações */}
                        <button
                            onClick={() => setShowExplanations(!showExplanations)}
                            className={`px-3 py-2 rounded-lg transition-colors ${showExplanations
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            {showExplanations ? 'Ocultar' : 'Mostrar'} Explicações
                        </button>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <span className="ml-3 text-gray-600 dark:text-gray-400">
                                Gerando sugestões...
                            </span>
                        </div>
                    ) : filteredSuggestions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <Lightbulb className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Nenhuma sugestão encontrada
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Tente ajustar os filtros ou digite mais código para obter sugestões.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-y-auto max-h-[60vh] p-4">
                            <div className="space-y-3">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <div
                                        key={suggestion.id}
                                        className={`p-4 border rounded-lg cursor-pointer transition-all ${index === selectedIndex
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        onClick={() => setSelectedIndex(index)}
                                    >
                                        {/* Header da Sugestão */}
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-2">
                                                <div className={`p-2 rounded-lg ${getCategoryColor(suggestion.category)}`}>
                                                    {getCategoryIcon(suggestion.category)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {suggestion.id}
                                                        </span>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${getComplexityColor(suggestion.complexity)}`}>
                                                            {suggestion.complexity}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="flex items-center space-x-1">
                                                            <Star className="w-3 h-3" />
                                                            <span>{suggestion.confidence.toFixed(1)}</span>
                                                        </span>
                                                        <span className="flex items-center space-x-1">
                                                            <TrendingUp className="w-3 h-3" />
                                                            <span>{suggestion.usage}</span>
                                                        </span>
                                                        <span className="flex items-center space-x-1">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{Math.floor((Date.now() - suggestion.lastUsed) / (1000 * 60 * 60 * 24))}d</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Código */}
                                        <div className="mb-3">
                                            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm">
                                                <code className="text-gray-800 dark:text-gray-200">
                                                    {suggestion.code}
                                                </code>
                                            </pre>
                                        </div>

                                        {/* Explicação */}
                                        {showExplanations && (
                                            <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                                    {suggestion.explanation}
                                                </p>
                                            </div>
                                        )}

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {suggestion.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Botão Aplicar */}
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => applySuggestion(suggestion)}
                                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                                            >
                                                <Code className="w-4 h-4" />
                                                <span>Aplicar Sugestão</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-4">
                            <span>
                                {filteredSuggestions.length} de {suggestions.length} sugestões
                            </span>
                            <span>
                                Use ↑↓ para navegar, Enter para aplicar, Esc para fechar
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>Powered by Fenix IDE 2.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
