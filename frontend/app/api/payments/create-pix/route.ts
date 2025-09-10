import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
    try {
        const { amount, currency = 'BRL' } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Valor inválido' },
                { status: 400 }
            );
        }

        // Criar PaymentIntent para PIX
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency,
            payment_method_types: ['pix'],
            metadata: {
                source: 'fenix-academy',
                payment_type: 'pix',
            },
        });

        // Simular dados do PIX (em produção, você usaria um provedor real como PagSeguro, Mercado Pago, etc.)
        const pixCode = `PIX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const qrCode = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`; // QR Code mockado
        const expiresAt = Date.now() + (30 * 60 * 1000); // 30 minutos

        return NextResponse.json({
            paymentIntentId: paymentIntent.id,
            qrCode,
            pixCode,
            expiresAt,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
        });
    } catch (error) {
        console.error('Erro ao criar pagamento PIX:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}