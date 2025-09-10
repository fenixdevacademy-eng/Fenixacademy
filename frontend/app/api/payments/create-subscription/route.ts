import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
    try {
        const { planId, customerEmail, customerName } = await request.json();

        if (!planId || !customerEmail || !customerName) {
            return NextResponse.json(
                { error: 'Dados obrigatórios não fornecidos' },
                { status: 400 }
            );
        }

        // Criar ou buscar cliente
        let customer;
        const existingCustomers = await stripe.customers.list({
            email: customerEmail,
            limit: 1,
        });

        if (existingCustomers.data.length > 0) {
            customer = existingCustomers.data[0];
        } else {
            customer = await stripe.customers.create({
                email: customerEmail,
                name: customerName,
                metadata: {
                    source: 'fenix-academy',
                },
            });
        }

        // Criar assinatura
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    price: planId,
                },
            ],
            payment_behavior: 'default_incomplete',
            payment_settings: {
                save_default_payment_method: 'on_subscription',
            },
            expand: ['latest_invoice.payment_intent'],
            metadata: {
                source: 'fenix-academy',
                plan_name: planId.includes('yearly') ? 'Pro Anual' : planId.includes('pro') ? 'Pro' : 'Enterprise',
            },
        });

        return NextResponse.json({
            id: subscription.id,
            status: subscription.status,
            current_period_start: subscription.current_period_start,
            current_period_end: subscription.current_period_end,
            plan: {
                id: planId,
                name: planId.includes('yearly') ? 'Pro Anual' : planId.includes('pro') ? 'Pro' : 'Enterprise',
                amount: subscription.items.data[0].price.unit_amount,
            },
            customer: {
                id: customer.id,
                email: customer.email,
            },
            client_secret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        });
    } catch (error) {
        console.error('Erro ao criar assinatura:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

