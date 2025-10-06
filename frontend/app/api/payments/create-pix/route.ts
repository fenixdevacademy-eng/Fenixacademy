'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

// Simulação de configuração do PIX
const pixConfig = {
    merchantId: process.env.PIX_MERCHANT_ID || 'merchant_123',
    apiKey: process.env.PIX_API_KEY || 'pix_key_mock'
}

export async function POST(request: NextRequest) {
    try {
        const { amount, currency = 'BRL' } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({
                success: false,
                error: 'Valor inválido'
            }, { status: 400 });
        }

        const pixPayment = {
            id: `pix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            qrCode: `00020126580014br.gov.bcb.pix0114${Math.random().toString(36).substr(2, 20)}520400005303986540${amount.toFixed(2)}5802BR5913Fenix Academy6009Sao Paulo62070503***6304${Math.random().toString(36).substr(2, 4)}`,
            qrCodeText: `PIX: R$ ${amount.toFixed(2)} - Fenix Academy`,
            amount,
            currency,
            status: 'pending',
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutos
        }

        return NextResponse.json({
            success: true,
            pixPayment
        });

    } catch (error) {
        console.error('Erro ao criar PIX:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}