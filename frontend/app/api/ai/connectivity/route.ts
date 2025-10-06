'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const apiKey = process.env.OPENAI_API_KEY || '';

        // Teste de conectividade com a API da OpenAI
        const testResponse = await fetch('https://api.openai.com/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'}});

        if (testResponse.ok) {
            const data = await testResponse.json();
            return NextResponse.json({
                success: true,
                message: 'Conexão com OpenAI estabelecida com sucesso',
                apiKeyValid: true,
                modelsAvailable: data.data?.length || 0,
                timestamp: new Date().toISOString()
            });
        } else {
            const errorData = await testResponse.json().catch(() => ({}));
            return NextResponse.json({
                success: false,
                message: 'Falha na conexão com OpenAI',
                apiKeyValid: false,
                error: errorData.error || `HTTP ${testResponse.status}`,
                timestamp: new Date().toISOString()
            }, { status: 400 });
        }

    } catch (error) {
        console.error('Erro ao testar conectividade:', error);
        return NextResponse.json({
            success: false,
            message: 'Erro de conectividade',
            apiKeyValid: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
