'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { paymentIntentId, courseSlug, tier, amount } = body;

        // Validar dados obrigatórios
        if (!paymentIntentId || !courseSlug || !tier || !amount) {
            return NextResponse.json({
                success: false,
                error: 'Dados obrigatórios não fornecidos'
            }, { status: 400 });
        }

        // Simular confirmação de pagamento
        const payment = {
            id: paymentIntentId,
            status: 'succeeded',
            amount: amount,
            currency: 'brl',
            course_slug: courseSlug,
            tier: tier,
            transaction_id: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            paid_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 ano
        }

        // Simular delay de processamento
        await new Promise(resolve => setTimeout(resolve, 1500));

        return NextResponse.json({
            success: true,
            payment: payment,
            message: 'Pagamento confirmado com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao confirmar pagamento:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}



