'use client';

﻿import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/lib/ai/openai-service';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, messages, type, code, language } = body;

        let response;

        switch (type) {
            case 'analyze_code':
                if (!code || !language) {
                    return NextResponse.json({
                        success: false,
                        error: 'Código e linguagem são obrigatórios para análise'
                    }, { status: 400 });
                }
                response = await OpenAIService.analyzeCode(code, language);
                break;

            case 'generate_code':
                if (!message || !language) {
                    return NextResponse.json({
                        success: false,
                        error: 'Prompt e linguagem são obrigatórios para geração de código'
                    }, { status: 400 });
                }
                response = await OpenAIService.generateCode(message, language);
                break;

            case 'explain_concept':
                if (!message) {
                    return NextResponse.json({
                        success: false,
                        error: 'Conceito é obrigatório para explicação'
                    }, { status: 400 });
                }
                response = await OpenAIService.explainConcept(message, language);
                break;

            case 'debug_code':
                if (!code || !language) {
                    return NextResponse.json({
                        success: false,
                        error: 'Código e linguagem são obrigatórios para debug'
                    }, { status: 400 });
                }
                response = await OpenAIService.debugCode(code, language, body.error);
                break;

            case 'learning_path':
                if (!body.topics || !Array.isArray(body.topics)) {
                    return NextResponse.json({
                        success: false,
                        error: 'Tópicos são obrigatórios para gerar caminho de aprendizado'
                    }, { status: 400 });
                }
                response = await OpenAIService.generateLearningPath(body.topics);
                break;

            case 'chat':
            default:
                if (!messages || !Array.isArray(messages)) {
                    return NextResponse.json({
                        success: false,
                        error: 'Mensagens são obrigatórias para chat'
                    }, { status: 400 });
                }
                const chatResponse = await OpenAIService.sendMessage(messages);
                response = chatResponse.message;
                break;
        }

        return NextResponse.json({
            success: true,
            response: response,
            type: type || 'chat'
        });

    } catch (error) {
        console.error('Erro na API de IA:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Erro interno do servidor'
        }, { status: 500 });
    }
}
