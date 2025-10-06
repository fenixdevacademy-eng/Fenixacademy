'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

interface TutorRequest {
    message: string;
    courseId?: string;
    lessonId?: string;
    userId?: string;
    personality: 'encouraging' | 'technical' | 'casual';
    context: Array<{ type: string; content: string }>;
}

export async function POST(request: NextRequest) {
    try {
        const body: TutorRequest = await request.json();
        const { message, personality, context } = body;

        // Simular resposta do tutor IA baseada na personalidade
        const responses = {
            encouraging: [
                "Excelente pergunta! Vamos quebrar isso em partes menores para facilitar o entendimento. 🚀",
                "Você está no caminho certo! Deixe-me te ajudar a entender melhor esse conceito. 💪",
                "Que bom que você está perguntando! Isso mostra que você está realmente aprendendo. 🌟",
                "Não se preocupe, todo desenvolvedor já passou por isso! Vamos resolver juntos. 🤝"
            ],
            technical: [
                "Analisando sua pergunta do ponto de vista técnico...",
                "Vou explicar os detalhes de implementação:",
                "Do ponto de vista da arquitetura de software:",
                "Tecnicamente falando, a melhor abordagem seria:"
            ],
            casual: [
                "Opa! Boa pergunta, vamos resolver isso juntos! 😄",
                "Cara, essa é uma dúvida super comum! Deixa eu te explicar...",
                "Ah, entendi! Vamos quebrar isso aí de um jeito simples:",
                "Show! Vou te dar uma mão com isso, é mais fácil do que parece! 👍"
            ]
        }

        // Respostas baseadas no conteúdo da mensagem
        let response = "";
        let suggestions: string[] = [];
        let difficulty: 'easy' | 'medium' | 'hard' = 'medium';

        // Análise simples da mensagem para personalizar resposta
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('erro') || lowerMessage.includes('bug') || lowerMessage.includes('não funciona')) {
            response = responses[personality][0] + "\n\nVamos debugar isso passo a passo:\n\n1. Primeiro, verifique se não há erros de sintaxe\n2. Confirme se todas as dependências estão instaladas\n3. Teste com dados simples primeiro\n4. Use console.log() para verificar valores";
            suggestions = ["Mostre-me o código", "Qual é a mensagem de erro?", "Teste este exemplo"];
            difficulty = 'easy';
        } else if (lowerMessage.includes('explicar') || lowerMessage.includes('como funciona')) {
            response = responses[personality][1] + "\n\nVou explicar de forma clara:\n\n" +
                "Conceito: O que estamos estudando é fundamental para...\n" +
                "Aplicação: Na prática, você vai usar isso quando...\n" +
                "Exemplo: Imagine que você tem...";
            suggestions = ["Me dê um exemplo prático", "Como aplicar isso?", "Mostre código"];
            difficulty = 'medium';
        } else if (lowerMessage.includes('exercício') || lowerMessage.includes('prática')) {
            response = responses[personality][2] + "\n\nVamos fazer um exercício prático:\n\n" +
                "🎯 **Desafio:** Crie uma função que...\n" +
                "💡 **Dica:** Use os conceitos que aprendemos\n" +
                "🔧 **Ferramentas:** Você pode usar...\n" +
                "✅ **Validação:** Teste com estes casos...";
            suggestions = ["Mostre a solução", "Preciso de mais dicas", "Qual a próxima etapa?"];
            difficulty = 'hard';
        } else if (lowerMessage.includes('melhorar') || lowerMessage.includes('otimizar')) {
            response = responses[personality][3] + "\n\nVamos otimizar seu código:\n\n" +
                "🔍 **Análise:** Seu código está bom, mas podemos melhorar...\n" +
                "⚡ **Performance:** Para melhorar a velocidade...\n" +
                "📚 **Boas Práticas:** Lembre-se de...\n" +
                "🎨 **Legibilidade:** Para deixar mais claro...";
            suggestions = ["Mostre o código otimizado", "Explique cada melhoria", "Mais dicas de performance"];
            difficulty = 'medium';
        } else {
            response = responses[personality][0] + "\n\nEntendi sua pergunta! Vou te ajudar da melhor forma possível.\n\n" +
                "Baseado no que você perguntou, vou te dar uma explicação completa e prática.\n\n" +
                "Se precisar de mais detalhes ou exemplos específicos, é só me avisar!";
            suggestions = ["Preciso de mais detalhes", "Me dê um exemplo", "Como aplicar isso?"];
            difficulty = 'easy';
        }

        // Adicionar personalização baseada no contexto
        if (context.length > 0) {
            response += "\n\n📚 **Contexto da nossa conversa:**\n" +
                "Vejo que você já estava trabalhando em algo relacionado. Isso vai te ajudar a conectar os conceitos!";
        }

        return NextResponse.json({
            success: true,
            response,
            suggestions,
            difficulty,
            personality,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Erro no tutor IA:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}




