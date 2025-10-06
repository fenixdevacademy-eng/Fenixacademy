'use client';

﻿/**
 * Assistente de IA para Fenix Academy
 * Sugestões inteligentes, ajuda contextual e análise de código
 */

import React, { useState, useEffect, useCallback } from 'react';

interface AISuggestion {
    type: 'code' | 'concept' | 'resource' | 'exercise' | 'tip';
    title: string;
    description: string;
    confidence: number;
    action?: {
        type: 'navigate' | 'execute' | 'show' | 'copy';
        data: any;
    }
}

interface CodeAnalysis {
    issues: Array<{
        type: 'error' | 'warning' | 'suggestion';
        message: string;
        line?: number;
        column?: number;
        suggestion?: string;
    }>;
    suggestions: AISuggestion[];
    complexity: number;
    readability: number;
}

interface LearningContext {
    currentCourse?: string;
    currentModule?: string;
    currentLesson?: string;
    userLevel: 'beginner' | 'intermediate' | 'advanced';
    recentTopics: string[];
    weakAreas: string[];
    strongAreas: string[];
}

class AIAssistant {
    private apiKey: string;
    private baseUrl: string;
    private context: LearningContext;

    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
        this.baseUrl = 'https://api.openai.com/v1';
        this.context = {
            userLevel: 'beginner',
            recentTopics: [],
            weakAreas: [],
            strongAreas: []
        }
    }

    // Atualizar contexto de aprendizado
    updateContext(context: Partial<LearningContext>): void {
        this.context = { ...this.context, ...context }
    }

    // Analisar código
    async analyzeCode(code: string, language: string): Promise<CodeAnalysis> {
        try {
            const prompt = this.buildCodeAnalysisPrompt(code, language);
            const response = await this.callOpenAI(prompt);

            return this.parseCodeAnalysis(response);
        } catch (error) {
            console.error('Erro ao analisar código:', error);
            return {
                issues: [],
                suggestions: [],
                complexity: 0,
                readability: 0
            }
        }
    }

    // Gerar sugestões de aprendizado
    async generateLearningSuggestions(topic: string): Promise<AISuggestion[]> {
        try {
            const prompt = this.buildLearningSuggestionsPrompt(topic);
            const response = await this.callOpenAI(prompt);

            return this.parseSuggestions(response);
        } catch (error) {
            console.error('Erro ao gerar sugestões:', error);
            return [];
        }
    }

    // Explicar conceito
    async explainConcept(concept: string, level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): Promise<string> {
        try {
            const prompt = this.buildExplanationPrompt(concept, level);
            const response = await this.callOpenAI(prompt);

            return response.trim();
        } catch (error) {
            console.error('Erro ao explicar conceito:', error);
            return 'Desculpe, não foi possível explicar este conceito no momento.';
        }
    }

    // Gerar exercício personalizado
    async generateExercise(topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<{
        title: string;
        description: string;
        instructions: string[];
        starterCode?: string;
        solution?: string;
        hints: string[];
    }> {
        try {
            const prompt = this.buildExercisePrompt(topic, difficulty);
            const response = await this.callOpenAI(prompt);

            return this.parseExercise(response);
        } catch (error) {
            console.error('Erro ao gerar exercício:', error);
            return {
                title: 'Exercício não disponível',
                description: 'Não foi possível gerar um exercício personalizado.',
                instructions: [],
                hints: []
            }
        }
    }

    // Sugerir próximos passos
    async suggestNextSteps(): Promise<AISuggestion[]> {
        try {
            const prompt = this.buildNextStepsPrompt();
            const response = await this.callOpenAI(prompt);

            return this.parseSuggestions(response);
        } catch (error) {
            console.error('Erro ao sugerir próximos passos:', error);
            return [];
        }
    }

    // Chat com IA
    async chat(message: string, context?: string): Promise<string> {
        try {
            const prompt = this.buildChatPrompt(message, context);
            const response = await this.callOpenAI(prompt);

            return response.trim();
        } catch (error) {
            console.error('Erro no chat com IA:', error);
            return 'Desculpe, não foi possível processar sua mensagem no momento.';
        }
    }

    // Chamada para OpenAI API
    private async callOpenAI(prompt: string): Promise<string> {
        if (!this.apiKey) {
            throw new Error('API key não configurada');
        }

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'},
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Você é um assistente de IA especializado em programação e educação. Responda sempre em português brasileiro e seja didático e claro.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Prompts
    private buildCodeAnalysisPrompt(code: string, language: string): string {
        return `
Analise o seguinte código ${language} e forneça:
1. Problemas encontrados (erros, warnings, sugestões)
2. Sugestões de melhoria
3. Nível de complexidade (1-10)
4. Nível de legibilidade (1-10)

Código:
\`\`\`${language}
${code}
\`\`\`

Responda em formato JSON.
        `;
    }

    private buildLearningSuggestionsPrompt(topic: string): string {
        return `
Com base no tópico "${topic}" e no contexto do usuário (nível: ${this.context.userLevel}), 
sugira recursos de aprendizado, exercícios e conceitos relacionados.

Contexto:
- Tópicos recentes: ${this.context.recentTopics.join(', ')}
- Áreas fracas: ${this.context.weakAreas.join(', ')}
- Áreas fortes: ${this.context.strongAreas.join(', ')}

Forneça 5 sugestões em formato JSON.
        `;
    }

    private buildExplanationPrompt(concept: string, level: string): string {
        return `
Explique o conceito "${concept}" de forma clara e didática para um nível ${level}.
Use exemplos práticos e analogias quando apropriado.
Mantenha a explicação concisa mas completa.
        `;
    }

    private buildExercisePrompt(topic: string, difficulty: string): string {
        return `
Crie um exercício de programação sobre "${topic}" com dificuldade ${difficulty}.
Inclua:
- Título do exercício
- Descrição clara
- Instruções passo a passo
- Código inicial (se aplicável)
- Solução
- 3 dicas progressivas

Formato JSON.
        `;
    }

    private buildNextStepsPrompt(): string {
        return `
Com base no contexto de aprendizado atual, sugira os próximos passos para o usuário.

Contexto:
- Curso atual: ${this.context.currentCourse || 'Nenhum'}
- Módulo atual: ${this.context.currentModule || 'Nenhum'}
- Aula atual: ${this.context.currentLesson || 'Nenhum'}
- Nível: ${this.context.userLevel}
- Tópicos recentes: ${this.context.recentTopics.join(', ')}

Forneça 3-5 sugestões em formato JSON.
        `;
    }

    private buildChatPrompt(message: string, context?: string): string {
        return `
Contexto: ${context || 'Conversa geral sobre programação'}

Mensagem do usuário: ${message}

Responda de forma útil e educativa, considerando que o usuário está aprendendo programação.
        `;
    }

    // Parsers
    private parseCodeAnalysis(response: string): CodeAnalysis {
        try {
            const data = JSON.parse(response);
            return {
                issues: data.issues || [],
                suggestions: data.suggestions || [],
                complexity: data.complexity || 0,
                readability: data.readability || 0
            }
        } catch {
            return {
                issues: [],
                suggestions: [],
                complexity: 0,
                readability: 0
            }
        }
    }

    private parseSuggestions(response: string): AISuggestion[] {
        try {
            const data = JSON.parse(response);
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    private parseExercise(response: string): any {
        try {
            return JSON.parse(response);
        } catch {
            return {
                title: 'Exercício não disponível',
                description: 'Não foi possível gerar um exercício personalizado.',
                instructions: [],
                hints: []
            }
        }
    }
}

// Instância singleton
export const aiAssistant = new AIAssistant();

// Hook para usar IA em componentes React
export function useAIAssistant() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeCode = useCallback(async (code: string, language: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await aiAssistant.analyzeCode(code, language);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const generateSuggestions = useCallback(async (topic: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await aiAssistant.generateLearningSuggestions(topic);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const explainConcept = useCallback(async (concept: string, level?: 'beginner' | 'intermediate' | 'advanced') => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await aiAssistant.explainConcept(concept, level);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            return 'Erro ao explicar conceito';
        } finally {
            setIsLoading(false);
        }
    }, []);

    const generateExercise = useCallback(async (topic: string, difficulty: 'easy' | 'medium' | 'hard') => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await aiAssistant.generateExercise(topic, difficulty);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const chat = useCallback(async (message: string, context?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await aiAssistant.chat(message, context);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            return 'Erro no chat';
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateContext = useCallback((context: Partial<LearningContext>) => {
        aiAssistant.updateContext(context);
    }, []);

    return {
        isLoading,
        error,
        analyzeCode,
        generateSuggestions,
        explainConcept,
        generateExercise,
        chat,
        updateContext
    }
}

// Tipos para exportação
export type { AISuggestion, CodeAnalysis, LearningContext }
