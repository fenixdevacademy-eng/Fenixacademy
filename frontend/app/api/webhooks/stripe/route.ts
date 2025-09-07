import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'No signature provided' },
            { status: 400 }
        );
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 }
        );
    }

    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log('Payment succeeded:', paymentIntent.id);

                // Handle successful payment
                // - Update order status in database
                // - Send confirmation email
                // - Grant course access
                // - Track conversion in analytics

                break;

            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;
                console.log('Payment failed:', failedPayment.id);

                // Handle failed payment
                // - Update order status
                // - Send failure notification
                // - Log for analysis

                break;

            case 'customer.subscription.created':
                const subscription = event.data.object;
                console.log('Subscription created:', subscription.id);

                // Handle subscription creation
                // - Grant access to premium content
                // - Set up recurring billing

                break;

            case 'customer.subscription.updated':
                const updatedSubscription = event.data.object;
                console.log('Subscription updated:', updatedSubscription.id);

                // Handle subscription changes
                // - Update access levels
                // - Handle plan changes

                break;

            case 'customer.subscription.deleted':
                const deletedSubscription = event.data.object;
                console.log('Subscription cancelled:', deletedSubscription.id);

                // Handle subscription cancellation
                // - Revoke access
                // - Send cancellation email

                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook handler error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}
