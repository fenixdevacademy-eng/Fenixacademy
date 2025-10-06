'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Verificar se a API key está configurada
        const apiKey = process.env.OPENAI_API_KEY || '';

        // Verificar se a API key tem o formato correto
        const isValidFormat = apiKey.startsWith('sk-') && apiKey.length > 20;

        return NextResponse.json({
            success: true,
            message: 'Status da API OpenAI',
            apiKeyConfigured: !!apiKey,
            apiKeyValidFormat: isValidFormat,
            apiKeyLength: apiKey.length,
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Erro ao verificar status da API:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}
