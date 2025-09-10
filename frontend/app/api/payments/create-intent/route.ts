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

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                source: 'fenix-academy',
            },
        });

        return NextResponse.json({
            id: paymentIntent.id,
            client_secret: paymentIntent.client_secret,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
        });
    } catch (error) {
        console.error('Erro ao criar PaymentIntent:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}