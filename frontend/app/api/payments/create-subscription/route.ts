import { NextRequest, NextResponse } from 'next/server';

// Simulação de configuração do Stripe
const stripeConfig = {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_mock',
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_mock'
}

export async function POST(request: NextRequest) {
    try {
        const { planId, customerEmail, customerName } = await request.json();

        if (!planId || !customerEmail || !customerName) {
            return NextResponse.json({
                success: false,
                error: 'Dados obrigatórios: planId, customerEmail, customerName'
            }, { status: 400 });
        }

        const subscription = {
            id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            planId,
            customerEmail,
            customerName,
            status: 'active',
            startDate: new Date().toISOString(),
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            amount: 29.90,
            currency: 'BRL'
        }

        return NextResponse.json({
            success: true,
            subscription
        });

    } catch (error) {
        console.error('Erro ao criar assinatura:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}