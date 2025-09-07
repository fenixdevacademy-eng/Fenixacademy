import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
    try {
        const { items, billingAddress, total, currency = 'BRL' } = await request.json();

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100), // Convert to cents
            currency: currency.toLowerCase(),
            metadata: {
                billing_email: billingAddress.email,
                billing_name: `${billingAddress.firstName} ${billingAddress.lastName}`,
                items: JSON.stringify(items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })))
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        console.error('Stripe payment intent error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao criar intenção de pagamento'
            },
            { status: 500 }
        );
    }
}
