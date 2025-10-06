'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const subscription = await request.json();

        // Validar assinatura
        if (!subscription.endpoint || !subscription.keys) {
            return NextResponse.json(
                { error: 'Assinatura inválida' },
                { status: 400 }
            );
        }

        // Aqui você salvaria a assinatura no banco de dados
        // Por enquanto, vamos apenas logar
        console.log('Nova assinatura push recebida:', {
            endpoint: subscription.endpoint,
            keys: subscription.keys
        });

        // Simular salvamento no banco
        // await savePushSubscription(subscription);

        return NextResponse.json(
            { message: 'Assinatura registrada com sucesso' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao processar assinatura push:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { endpoint } = await request.json();

        if (!endpoint) {
            return NextResponse.json(
                { error: 'Endpoint é obrigatório' },
                { status: 400 }
            );
        }

        // Remover assinatura do banco de dados
        // await removePushSubscription(endpoint);

        console.log('Assinatura push removida:', endpoint);

        return NextResponse.json(
            { message: 'Assinatura removida com sucesso' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao remover assinatura push:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

