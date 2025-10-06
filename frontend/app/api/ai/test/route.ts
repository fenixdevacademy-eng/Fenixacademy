'use client';

﻿import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/lib/ai/openai-service';

export async function GET(request: NextRequest) {
    try {
        // Teste simples para verificar se a API está funcionando
        const testMessage = [
            {
                role: 'user' as const,
                content: 'Olá! Este é um teste de conexão. Responda apenas "Conexão estabelecida com sucesso!"'
            }
        ];

        const response = await OpenAIService.sendMessage(testMessage);

        return NextResponse.json({
            success: true,
            message: 'API OpenAI funcionando corretamente',
            response: response.message,
            usage: response.usage
        });

    } catch (error) {
        console.error('Erro no teste da API:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}
