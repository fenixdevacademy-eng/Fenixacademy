'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { course, tier, method, amount, coupon } = body;

        // Validar dados obrigatórios
        if (!course || !tier || !method || !amount) {
            return NextResponse.json({
                success: false,
                error: 'Dados obrigatórios não fornecidos'
            }, { status: 400 });
        }

        // Simular processamento de pagamento baseado no método
        let paymentResult;

        switch (method) {
            case 'pix':
                paymentResult = {
                    id: `pix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    type: 'pix',
                    qr_code: `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substr(2, 36)}5204000053039865405${amount.toFixed(2)}5802BR5913Fenix Academy6009Sao Paulo62070503***6304${Math.random().toString(36).substr(2, 4)}`,
                    expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
                    status: 'pending'
                }
                break;

            case 'boleto':
                paymentResult = {
                    id: `boleto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    type: 'boleto',
                    barcode: `${Math.random().toString().substr(2, 47)}`,
                    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias
                    status: 'pending'
                }
                break;

            case 'card':
                paymentResult = {
                    id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    type: 'card',
                    client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
                    status: 'requires_payment_method'
                }
                break;

            default:
                return NextResponse.json({
                    success: false,
                    error: 'Método de pagamento não suportado'
                }, { status: 400 });
        }

        // Simular delay de processamento
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            payment_id: paymentResult.id,
            payment_data: paymentResult,
            course: course,
            tier: tier,
            amount: amount,
            coupon: coupon,
            created_at: new Date().toISOString()
        });

    } catch (error) {
        console.error('Erro ao criar payment intent:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}



