'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { transactionId } = body;

        if (!transactionId) {
            return NextResponse.json({
                success: false,
                error: 'ID da transação é obrigatório'
            }, { status: 400 });
        }

        // Simular retry do pagamento
        const retryResult = {
            transactionId,
            status: 'processing',
            retryAttempt: 1,
            message: 'Tentativa de pagamento iniciada',
            estimatedCompletion: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutos
        }

        console.log('Retry de pagamento:', retryResult);

        return NextResponse.json({
            success: true,
            data: retryResult
        });

    } catch (error) {
        console.error('Erro ao tentar pagamento novamente:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





