'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Lightbulb,
    Zap,
    Code,
    Star,
    Clock,
    TrendingUp,
    Brain,
    Sparkles
} from 'lucide-react';

interface SmartSuggestion {
    id: string;
    type: 'optimization' | 'pattern' | 'best-practice' | 'refactor' | 'security';
    title: string;
    description: string;
    code: string;
    language: string;
    confidence: number;
    impact: 'low' | 'medium' | 'high';
    category: string;
    tags: string[];
}

interface SmartSuggestionsProps {
    content: string;
    language: string;
    theme: 'dark' | 'light';
    onSuggestionApply?: (suggestion: SmartSuggestion) => void;
}

const smartSuggestions: SmartSuggestion[] = [
    {
        id: '1',
        type: 'optimization',
        title: 'Otimizar Loop de Array',
        description: 'Substituir for loop por método funcional mais eficiente',
        code: '// Antes:\nfor (let i = 0; i < items.length; i++) {\n  result.push(items[i] * 2);\n}\n\n// Depois:\nconst result = items.map(item => item * 2);',
        language: 'javascript',
        confidence: 95,
        impact: 'medium',
        category: 'Performance',
        tags: ['array', 'functional', 'performance']
    },
    {
        id: '2',
        type: 'best-practice',
        title: 'Adicionar Tratamento de Erro',
        description: 'Implementar try-catch para operações assíncronas',
        code: '// Adicionar:\ntry {\n  const result = await fetchData();\n  return result;\n} catch (error) {\n  console.error(\'Erro ao buscar dados:\', error);\n  throw error;\n}',
        language: 'javascript',
        confidence: 88,
        impact: 'high',
        category: 'Error Handling',
        tags: ['async', 'error-handling', 'best-practice']
    },
    {
        id: '3',
        type: 'pattern',
        title: 'Implementar Padrão Singleton',
        description: 'Aplicar padrão Singleton para classe de configuração',
        code: 'class Config {\n  private static instance: Config;\n  \n  private constructor() {}\n  \n  public static getInstance(): Config {\n    if (!Config.instance) {\n      Config.instance = new Config();\n    }\n    return Config.instance;\n  }\n}',
        language: 'typescript',
        confidence: 92,
        impact: 'medium',
        category: 'Design Pattern',
        tags: ['singleton', 'pattern', 'typescript']
    },
    {
        id: '4',
        type: 'security',
        title: 'Sanitizar Input do Usuário',
        description: 'Adicionar validação e sanitização para entrada do usuário',
        code: '// Adicionar validação:\nfunction sanitizeInput(input: string): string {\n  return input\n    .trim()\n    .replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, \'\')\n    .replace(/[<>"\']/g, \'\');\n}',
        language: 'typescript',
        confidence: 85,
        impact: 'high',
        category: 'Security',
        tags: ['security', 'validation', 'sanitization']
    },
    {
        id: '5',
        type: 'refactor',
        title: 'Extrair Função Comum',
        description: 'Extrair lógica repetitiva para função reutilizável',
        code: '// Extrair para:\nfunction formatCurrency(amount: number, currency: string = \'BRL\'): string {\n  return new Intl.NumberFormat(\'pt-BR\', {\n    style: \'currency\',\n    currency: currency\n  }).format(amount);\n}',
        language: 'typescript',
        confidence: 90,
        impact: 'medium',
        category: 'Refactoring',
        tags: ['refactor', 'reusability', 'utility']
    }
];

export default function SmartSuggestions({
    content,
    language,
    theme,
    onSuggestionApply
}: SmartSuggestionsProps) {
    const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Analisar código e gerar sugestões
    const analyzeCode = useCallback(() => {
        setIsAnalyzing(true);

        // Simular análise de código
        setTimeout(() => {
            const relevantSuggestions = smartSuggestions.filter(suggestion =>
                suggestion.language === language.toLowerCase() ||
                suggestion.language === 'javascript' // Fallback para JS/TS
            );

            setSuggestions(relevantSuggestions.slice(0, 3));
            setIsAnalyzing(false);
            setShowSuggestions(true);
        }, 1500);
    }, [language]);

    // Analisar código quando o conteúdo mudar
    useEffect(() => {
        if (content.length > 100) { // Só analisar se houver conteúdo suficiente
            const timeoutId = setTimeout(analyzeCode, 2000); // Debounce
            return () => clearTimeout(timeoutId);
        }
    }, [content, analyzeCode]);

    // Obter ícone baseado no tipo
    const getSuggestionIcon = (type: string) => {
        switch (type) {
            case 'optimization': return <Zap size={16} />;
            case 'pattern': return <Code size={16} />;
            case 'best-practice': return <Star size={16} />;
            case 'refactor': return <Lightbulb size={16} />;
            case 'security': return <Brain size={16} />;
            default: return <Sparkles size={16} />;
        }
    };

    // Obter cor baseada no impacto
    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    // Obter cor baseada no tipo
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'optimization': return '#3b82f6';
            case 'pattern': return '#8b5cf6';
            case 'best-practice': return '#10b981';
            case 'refactor': return '#f59e0b';
            case 'security': return '#ef4444';
            default: return '#6b7280';
        }
    };

    if (!showSuggestions || suggestions.length === 0) {
        return null;
    }

    return (
        <div
            className="fixed bottom-4 left-4 w-96 max-h-96 overflow-y-auto rounded-lg border shadow-2xl z-40"
            style={{
                background: theme === 'dark' ? '#2d2d30' : '#ffffff',
                borderColor: theme === 'dark' ? '#3c3c3c' : '#e5e7eb',
                color: theme === 'dark' ? '#d4d4d4' : '#000000'
            }}
        >
            <div className="p-4 border-b" style={{ borderColor: theme === 'dark' ? '#3c3c3c' : '#e5e7eb' }}>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Brain size={20} />
                        Sugestões Inteligentes
                    </h3>
                    <div className="flex items-center gap-2">
                        {isAnalyzing && (
                            <div className="flex items-center gap-1 text-sm opacity-60">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                                Analisando...
                            </div>
                        )}
                        <button
                            onClick={() => setShowSuggestions(false)}
                            className="p-1 rounded hover:bg-opacity-20 transition-colors"
                        >
                            ×
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {suggestions.map((suggestion) => (
                    <div
                        key={suggestion.id}
                        className="rounded-lg border p-3 transition-all duration-200 hover:shadow-md"
                        style={{
                            borderColor: theme === 'dark' ? '#3c3c3c' : '#e5e7eb',
                            background: theme === 'dark' ? '#1e1e1e' : '#f8f9fa'
                        }}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div
                                    className="p-1 rounded"
                                    style={{ color: getTypeColor(suggestion.type) }}
                                >
                                    {getSuggestionIcon(suggestion.type)}
                                </div>
                                <h4 className="font-medium text-sm">{suggestion.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className="px-2 py-1 rounded text-xs font-medium"
                                    style={{
                                        background: getImpactColor(suggestion.impact) + '20',
                                        color: getImpactColor(suggestion.impact)
                                    }}
                                >
                                    {suggestion.impact.toUpperCase()}
                                </span>
                                <span className="text-xs opacity-60">
                                    {suggestion.confidence}%
                                </span>
                            </div>
                        </div>

                        <p className="text-xs opacity-80 mb-3 line-clamp-2">
                            {suggestion.description}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className="px-2 py-1 rounded text-xs"
                                    style={{
                                        background: theme === 'dark' ? '#3c3c3c' : '#e5e7eb',
                                        color: theme === 'dark' ? '#d4d4d4' : '#374151'
                                    }}
                                >
                                    {suggestion.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    <span className="text-xs opacity-60">
                                        {suggestion.confidence}% confiança
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => onSuggestionApply?.(suggestion)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors"
                                style={{
                                    background: '#3b82f6',
                                    color: '#ffffff'
                                }}
                            >
                                <Sparkles size={14} />
                                Aplicar
                            </button>
                            <button
                                className="px-3 py-2 rounded text-sm border transition-colors"
                                style={{
                                    borderColor: theme === 'dark' ? '#5a5a5a' : '#d1d5db',
                                    color: theme === 'dark' ? '#d4d4d4' : '#374151'
                                }}
                            >
                                Ver Código
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-3 border-t text-center" style={{ borderColor: theme === 'dark' ? '#3c3c3c' : '#e5e7eb' }}>
                <button
                    onClick={analyzeCode}
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                    Analisar Novamente
                </button>
            </div>
        </div>
    );
}
