'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Brain, Zap, Code, Lightbulb, TrendingUp, Clock, Star } from 'lucide-react';

// Tipos principais
export interface CodeContext {
    language: string;
    currentLine: string;
    previousLines: string[];
    nextLines: string[];
    cursorPosition: number;
    fileContent: string;
    imports: string[];
    variables: string[];
    functions: string[];
    classes: string[];
    scope: 'global' | 'function' | 'class' | 'loop' | 'conditional' | 'try-catch';
    intent: 'function' | 'loop' | 'condition' | 'variable' | 'class' | 'import' | 'comment' | 'unknown';
}

export interface CodeSuggestion {
    id: string;
    code: string;
    explanation: string;
    confidence: number;
    category: 'snippet' | 'completion' | 'optimization' | 'best-practice';
    language: string;
    tags: string[];
    usage: number;
    lastUsed: number;
    complexity: 'simple' | 'medium' | 'advanced';
}

export interface LanguageProvider {
    language: string;
    extensions: string[];
    analyzeContext: (context: CodeContext) => CodeSuggestion[];
    generateSuggestions: (context: CodeContext) => CodeSuggestion[];
    getBestPractices: (context: CodeContext) => CodeSuggestion[];
}

// Engine Principal
export class CodeSuggestionEngine {
    private languageProviders: Map<string, LanguageProvider> = new Map();
    private suggestionCache: Map<string, CodeSuggestion[]> = new Map();
    private contextHistory: CodeContext[] = [];

    // Registrar provedor de linguagem
    registerLanguageProvider(provider: LanguageProvider): void {
        this.languageProviders.set(provider.language, provider);
        console.log(`Provider registrado para: ${provider.language}`);
    }

    // Analisar contexto do código
    analyzeContext(
        language: string,
        currentLine: string,
        previousLines: string[],
        nextLines: string[],
        cursorPosition: number,
        fileContent: string
    ): CodeContext {
        const context: CodeContext = {
            language,
            currentLine,
            previousLines: previousLines.slice(-5), // Últimas 5 linhas
            nextLines: nextLines.slice(0, 3), // Próximas 3 linhas
            cursorPosition,
            fileContent,
            imports: this.extractImports(fileContent, language),
            variables: this.extractVariables(fileContent, language),
            functions: this.extractFunctions(fileContent, language),
            classes: this.extractClasses(fileContent, language),
            scope: this.determineScope(previousLines, currentLine),
            intent: this.determineIntent(currentLine, previousLines, cursorPosition)
        };

        // Adicionar ao histórico
        this.contextHistory.push(context);
        if (this.contextHistory.length > 10) {
            this.contextHistory.shift();
        }

        return context;
    }

    // Gerar sugestões baseadas no contexto
    generateSuggestions(context: CodeContext): CodeSuggestion[] {
        const cacheKey = this.generateCacheKey(context);

        // Verificar cache primeiro
        if (this.suggestionCache.has(cacheKey)) {
            return this.suggestionCache.get(cacheKey)!;
        }

        const provider = this.languageProviders.get(context.language);
        if (!provider) {
            return this.getFallbackSuggestions(context);
        }

        // Gerar sugestões usando o provedor específico da linguagem
        const suggestions = [
            ...provider.generateSuggestions(context),
            ...provider.getBestPractices(context),
            ...this.getContextualSuggestions(context)
        ];

        // Aplicar ranking e filtros
        const rankedSuggestions = this.rankSuggestions(suggestions, context);

        // Cache das sugestões
        this.suggestionCache.set(cacheKey, rankedSuggestions);

        return rankedSuggestions;
    }

    // Ranking inteligente das sugestões
    private rankSuggestions(suggestions: CodeSuggestion[], context: CodeContext): CodeSuggestion[] {
        return suggestions
            .map(suggestion => ({
                ...suggestion,
                score: this.calculateScore(suggestion, context)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 8) // Top 8 sugestões
            .map(({ score, ...suggestion }) => suggestion);
    }

    // Calcular score da sugestão
    private calculateScore(suggestion: CodeSuggestion, context: CodeContext): number {
        let score = suggestion.confidence * 0.4; // 40% baseado na confiança

        // Bônus por uso recente
        const daysSinceLastUse = (Date.now() - suggestion.lastUsed) / (1000 * 60 * 60 * 24);
        if (daysSinceLastUse < 7) score += 0.2;

        // Bônus por popularidade
        score += Math.min(suggestion.usage / 100, 0.2);

        // Bônus por relevância contextual
        if (this.isContextuallyRelevant(suggestion, context)) {
            score += 0.3;
        }

        // Bônus por complexidade apropriada
        if (this.isComplexityAppropriate(suggestion, context)) {
            score += 0.1;
        }

        return Math.min(score, 1.0);
    }

    // Verificar relevância contextual
    private isContextuallyRelevant(suggestion: CodeSuggestion, context: CodeContext): boolean {
        const currentText = context.currentLine.toLowerCase();
        const suggestionText = suggestion.code.toLowerCase();

        // Verificar se há palavras-chave em comum
        const currentWords = currentText.split(/\s+/);
        const suggestionWords = suggestionText.split(/\s+/);

        const commonWords = currentWords.filter(word =>
            suggestionWords.includes(word) && word.length > 2
        );

        return commonWords.length > 0;
    }

    // Verificar se a complexidade é apropriada
    private isComplexityAppropriate(suggestion: CodeSuggestion, context: CodeContext): boolean {
        const contextComplexity = this.getContextComplexity(context);

        switch (suggestion.complexity) {
            case 'simple':
                return true; // Sempre apropriado
            case 'medium':
                return contextComplexity >= 0.3;
            case 'advanced':
                return contextComplexity >= 0.7;
            default:
                return true;
        }
    }

    // Determinar complexidade do contexto
    private getContextComplexity(context: CodeContext): number {
        let complexity = 0;

        if (context.scope === 'function') complexity += 0.2;
        if (context.scope === 'class') complexity += 0.3;
        if (context.scope === 'loop') complexity += 0.2;
        if (context.scope === 'conditional') complexity += 0.1;

        if (context.functions.length > 3) complexity += 0.2;
        if (context.classes.length > 1) complexity += 0.2;
        if (context.variables.length > 5) complexity += 0.1;

        return Math.min(complexity, 1.0);
    }

    // Extrair imports do arquivo
    private extractImports(content: string, language: string): string[] {
        const imports: string[] = [];

        switch (language) {
            case 'javascript':
            case 'typescript':
                const jsImports = content.match(/import\s+.*?from\s+['"`]([^'"`]+)['"`]/g);
                if (jsImports) imports.push(...jsImports);
                break;
            case 'python':
                const pyImports = content.match(/import\s+(\w+)|from\s+(\w+)\s+import/g);
                if (pyImports) imports.push(...pyImports);
                break;
            case 'java':
                const javaImports = content.match(/import\s+([\w.]+);/g);
                if (javaImports) imports.push(...javaImports);
                break;
            case 'csharp':
                const csImports = content.match(/using\s+([\w.]+);/g);
                if (csImports) imports.push(...csImports);
                break;
        }

        return imports;
    }

    // Extrair variáveis do arquivo
    private extractVariables(content: string, language: string): string[] {
        const variables: string[] = [];

        switch (language) {
            case 'javascript':
            case 'typescript':
                const jsVars = content.match(/(?:const|let|var)\s+(\w+)/g);
                if (jsVars) variables.push(...jsVars);
                break;
            case 'python':
                const pyVars = content.match(/(\w+)\s*=/g);
                if (pyVars) variables.push(...pyVars);
                break;
            case 'java':
            case 'csharp':
                const csVars = content.match(/(?:int|string|bool|double|float)\s+(\w+)/g);
                if (csVars) variables.push(...csVars);
                break;
        }

        return variables;
    }

    // Extrair funções do arquivo
    private extractFunctions(content: string, language: string): string[] {
        const functions: string[] = [];

        switch (language) {
            case 'javascript':
            case 'typescript':
                const jsFuncs = content.match(/(?:function\s+(\w+)|(\w+)\s*=>)/g);
                if (jsFuncs) functions.push(...jsFuncs);
                break;
            case 'python':
                const pyFuncs = content.match(/def\s+(\w+)/g);
                if (pyFuncs) functions.push(...pyFuncs);
                break;
            case 'java':
            case 'csharp':
                const csFuncs = content.match(/(?:public|private|protected)?\s*(?:static)?\s*\w+\s+(\w+)\s*\(/g);
                if (csFuncs) functions.push(...csFuncs);
                break;
        }

        return functions;
    }

    // Extrair classes do arquivo
    private extractClasses(content: string, language: string): string[] {
        const classes: string[] = [];

        switch (language) {
            case 'javascript':
            case 'typescript':
                const jsClasses = content.match(/class\s+(\w+)/g);
                if (jsClasses) classes.push(...jsClasses);
                break;
            case 'python':
                const pyClasses = content.match(/class\s+(\w+)/g);
                if (pyClasses) classes.push(...pyClasses);
                break;
            case 'java':
            case 'csharp':
                const csClasses = content.match(/class\s+(\w+)/g);
                if (csClasses) classes.push(...csClasses);
                break;
        }

        return classes;
    }

    // Determinar escopo atual
    private determineScope(previousLines: string[], currentLine: string): CodeContext['scope'] {
        const recentCode = [...previousLines, currentLine].join('\n');

        if (recentCode.includes('class')) return 'class';
        if (recentCode.includes('function') || recentCode.includes('def') || recentCode.includes('=>')) return 'function';
        if (recentCode.includes('for') || recentCode.includes('while')) return 'loop';
        if (recentCode.includes('if') || recentCode.includes('else')) return 'conditional';
        if (recentCode.includes('try') || recentCode.includes('catch')) return 'try-catch';

        return 'global';
    }

    // Determinar intenção do desenvolvedor
    private determineIntent(currentLine: string, previousLines: string[], cursorPosition: number): CodeContext['intent'] {
        const line = currentLine.toLowerCase();
        const beforeCursor = currentLine.substring(0, cursorPosition).toLowerCase();

        if (line.includes('function') || line.includes('def')) return 'function';
        if (line.includes('for') || line.includes('while')) return 'loop';
        if (line.includes('if') || line.includes('else')) return 'condition';
        if (line.includes('class')) return 'class';
        if (line.includes('import') || line.includes('using')) return 'import';
        if (line.includes('//') || line.includes('#')) return 'comment';
        if (beforeCursor.includes('const') || beforeCursor.includes('let') || beforeCursor.includes('var')) return 'variable';

        return 'unknown';
    }

    // Gerar chave de cache
    private generateCacheKey(context: CodeContext): string {
        return `${context.language}:${context.scope}:${context.intent}:${context.currentLine.substring(0, 50)}`;
    }

    // Sugestões de fallback
    private getFallbackSuggestions(context: CodeContext): CodeSuggestion[] {
        return [
            {
                id: 'fallback-1',
                code: '// TODO: Implementar lógica aqui',
                explanation: 'Comentário TODO para marcar implementação pendente',
                confidence: 0.8,
                category: 'snippet',
                language: context.language,
                tags: ['todo', 'comment'],
                usage: 100,
                lastUsed: Date.now(),
                complexity: 'simple'
            }
        ];
    }

    // Sugestões contextuais baseadas no histórico
    private getContextualSuggestions(context: CodeContext): CodeSuggestion[] {
        const suggestions: CodeSuggestion[] = [];

        // Analisar padrões no histórico
        const similarContexts = this.contextHistory.filter(ctx =>
            ctx.language === context.language &&
            ctx.scope === context.scope &&
            ctx.intent === context.intent
        );

        if (similarContexts.length > 0) {
            // Sugerir padrões comuns
            suggestions.push({
                id: 'contextual-1',
                code: '// Padrão similar encontrado no histórico',
                explanation: 'Baseado em código similar escrito anteriormente',
                confidence: 0.7,
                category: 'snippet',
                language: context.language,
                tags: ['contextual', 'pattern'],
                usage: 50,
                lastUsed: Date.now(),
                complexity: 'simple'
            });
        }

        return suggestions;
    }

    // Limpar cache
    clearCache(): void {
        this.suggestionCache.clear();
    }

    // Obter estatísticas
    getStats(): { totalSuggestions: number; cacheSize: number; historySize: number } {
        return {
            totalSuggestions: Array.from(this.suggestionCache.values()).flat().length,
            cacheSize: this.suggestionCache.size,
            historySize: this.contextHistory.length
        };
    }
}

// Hook React para usar o engine
export function useCodeSuggestionEngine() {
    const [engine] = useState(() => new CodeSuggestionEngine());
    const [suggestions, setSuggestions] = useState<CodeSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const generateSuggestions = useCallback(async (context: CodeContext) => {
        setIsLoading(true);
        try {
            const newSuggestions = engine.generateSuggestions(context);
            setSuggestions(newSuggestions);
        } catch (error) {
            console.error('Erro ao gerar sugestões:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, [engine]);

    const registerLanguageProvider = useCallback((provider: LanguageProvider) => {
        engine.registerLanguageProvider(provider);
    }, [engine]);

    return {
        engine,
        suggestions,
        isLoading,
        generateSuggestions,
        registerLanguageProvider
    };
}

export default CodeSuggestionEngine;
