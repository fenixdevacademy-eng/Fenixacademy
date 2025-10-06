'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get('stripe-signature');

        if (!signature) {
            return NextResponse.json({
                error: 'No signature provided'
            }, { status: 400 });
        }

        // Processar webhook do Stripe
        console.log('Stripe Webhook recebido:', {
            signature,
            body: body.substring(0, 100) + '...'
        });

        // Em produção, verificar a assinatura do Stripe
        // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Erro no webhook do Stripe:', error);
        return NextResponse.json({
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}