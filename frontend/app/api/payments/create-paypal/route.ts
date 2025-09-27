import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { items = [], billingAddress, total, currency = 'BRL' } = await request.json();

        const transactionId = `paypal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const paypalOrder = {
            transactionId,
            orderId: `PAYPAL_${Date.now()}`,
            amount: total,
            currency,
            status: 'pending',
            approvalUrl: `https://paypal.com/checkout/${transactionId}`,
            items
        }

        return NextResponse.json({
            success: true,
            paypalOrder
        });

    } catch (error) {
        console.error('Erro ao criar PayPal order:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}