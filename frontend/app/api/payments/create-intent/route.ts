import { NextRequest, NextResponse } from 'next/server';

// Simulação de configuração do Stripe
const stripeConfig = {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_mock',
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_mock'
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

        // Simular criação de payment intent
        const paymentIntent = {
            id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            amount: Math.round(amount * 100), // Converter para centavos
            currency,
            status: 'requires_payment_method',
            client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`
        }

        return NextResponse.json({
            success: true,
            paymentIntent
        });

    } catch (error) {
        console.error('Erro ao criar payment intent:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}