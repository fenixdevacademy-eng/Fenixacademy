'use client';

﻿// Serviço de IA integrado com OpenAI
export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface ChatResponse {
    message: string;
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    }
}

export class OpenAIService {
    private static apiKey: string = process.env.OPENAI_API_KEY || '';
    private static baseUrl: string = 'https://api.openai.com/v1';

    static async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`},
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: 'Você é a IA superinteligente da Fenix Academy, especializada em programação e desenvolvimento. Você ajuda estudantes com:\n- Explicação de conceitos de programação\n- Revisão e debug de código\n- Sugestões de melhorias\n- Geração de código\n- Resolução de problemas técnicos\n\nSempre seja didático, claro e forneça exemplos práticos quando possível. Responda em português brasileiro.'
                        },
                        ...messages
                    ],
                    max_tokens: 2000,
                    temperature: 0.7})});

            if (!response.ok) {
                throw new Error(`Erro na API OpenAI: ${response.status}`);
            }

            const data = await response.json();

            return {
                message: data.choices[0].message.content,
                usage: data.usage
            }
        } catch (error) {
            console.error('Erro ao comunicar com OpenAI:', error);
            throw new Error('Erro ao processar sua mensagem. Tente novamente.');
        }
    }

    static async analyzeCode(code: string, language: string): Promise<string> {
        const messages: ChatMessage[] = [
            {
                role: 'user',
                content: `Analise este código ${language} e forneça feedback detalhado:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nInclua:\n- Análise de qualidade\n- Sugestões de melhoria\n- Possíveis problemas\n- Boas práticas aplicáveis`
            }
        ];

        const response = await this.sendMessage(messages);
        return response.message;
    }

    static async generateCode(prompt: string, language: string): Promise<string> {
        const messages: ChatMessage[] = [
            {
                role: 'user',
                content: `Gere código ${language} baseado na seguinte solicitação:\n\n${prompt}\n\nInclua comentários explicativos e siga as melhores práticas da linguagem.`
            }
        ];

        const response = await this.sendMessage(messages);
        return response.message;
    }

    static async explainConcept(concept: string, language?: string): Promise<string> {
        const messages: ChatMessage[] = [
            {
                role: 'user',
                content: `Explique o conceito "${concept}"${language ? ` em ${language}` : ''} de forma didática e clara. Inclua exemplos práticos e quando usar este conceito.`
            }
        ];

        const response = await this.sendMessage(messages);
        return response.message;
    }

    static async debugCode(code: string, language: string, error?: string): Promise<string> {
        const messages: ChatMessage[] = [
            {
                role: 'user',
                content: `Ajude-me a debugar este código ${language}:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n${error ? `Erro reportado: ${error}\n\n` : ''}Identifique possíveis problemas e forneça soluções.`
            }
        ];

        const response = await this.sendMessage(messages);
        return response.message;
    }

    static async generateLearningPath(topics: string[]): Promise<string> {
        const messages: ChatMessage[] = [
            {
                role: 'user',
                content: `Crie um caminho de aprendizado estruturado para os seguintes tópicos: ${topics.join(', ')}.\n\nInclua:\n- Ordem de aprendizado\n- Tempo estimado para cada tópico\n- Recursos recomendados\n- Projetos práticos\n- Níveis de dificuldade`
            }
        ];

        const response = await this.sendMessage(messages);
        return response.message;
    }
}

export const openAIService = new OpenAIService();