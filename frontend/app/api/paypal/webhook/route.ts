import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const params = new URLSearchParams(body);

        // Verificar se é uma notificação do PayPal
        const paymentStatus = params.get('payment_status');
        const transactionId = params.get('txn_id');
        const receiverEmail = params.get('receiver_email');
        const mcGross = params.get('mc_gross');
        const mcCurrency = params.get('mc_currency');

        console.log('PayPal Webhook received:', {
            paymentStatus,
            transactionId,
            receiverEmail,
            mcGross,
            mcCurrency
        });

        // Verificar se o email do receiver é correto
        if (receiverEmail !== 'fenixdevacademy@gmail.com') {
            console.error('Invalid receiver email:', receiverEmail);
            return NextResponse.json({ error: 'Invalid receiver email' }, { status: 400 });
        }

        // Verificar se o valor está correto
        if (mcGross !== '197.00' || mcCurrency !== 'BRL') {
            console.error('Invalid payment amount:', { mcGross, mcCurrency });
            return NextResponse.json({ error: 'Invalid payment amount' }, { status: 400 });
        }

        // Processar pagamento baseado no status
        if (paymentStatus === 'Completed') {
            // Pagamento confirmado - liberar acesso ao curso
            console.log('Payment completed:', transactionId);

            // Aqui você pode:
            // 1. Salvar no banco de dados
            // 2. Enviar email de confirmação
            // 3. Liberar acesso ao curso
            // 4. Registrar no sistema de analytics

            // Simular processamento
            if (transactionId) {
                await processPaymentSuccess({
                    transactionId,
                    amount: mcGross,
                    currency: mcCurrency,
                    email: params.get('payer_email') || '',
                    payerName: params.get('first_name') + ' ' + params.get('last_name') || ''
                });
            }

        } else if (paymentStatus === 'Refunded') {
            // Pagamento reembolsado - revogar acesso
            console.log('Payment refunded:', transactionId);

            if (transactionId) {
                await processPaymentRefund({
                    transactionId,
                    amount: mcGross,
                    currency: mcCurrency
                });
            }

        } else if (paymentStatus === 'Canceled_Reversal') {
            // Pagamento cancelado - revogar acesso
            console.log('Payment canceled:', transactionId);

            if (transactionId) {
                await processPaymentCancel({
                    transactionId,
                    amount: mcGross,
                    currency: mcCurrency
                });
            }
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('PayPal webhook error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function processPaymentSuccess(data: {
    transactionId: string;
    amount: string;
    currency: string;
    email: string;
    payerName: string;
}) {
    try {
        // Simular processamento de pagamento bem-sucedido
        console.log('Processing successful payment:', data);

        // 1. Salvar no banco de dados
        // await savePaymentToDatabase(data);

        // 2. Enviar email de confirmação
        // await sendConfirmationEmail(data.email, data.payerName);

        // 3. Liberar acesso ao curso
        // await grantCourseAccess(data.email);

        // 4. Registrar no analytics
        // await trackPaymentEvent('payment_success', data);

        console.log('Payment processed successfully');

    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
}

async function processPaymentRefund(data: {
    transactionId: string;
    amount: string;
    currency: string;
}) {
    try {
        console.log('Processing payment refund:', data);

        // 1. Revogar acesso ao curso
        // await revokeCourseAccess(data.transactionId);

        // 2. Enviar email de reembolso
        // await sendRefundEmail(data.transactionId);

        // 3. Registrar no analytics
        // await trackPaymentEvent('payment_refund', data);

        console.log('Refund processed successfully');

    } catch (error) {
        console.error('Error processing refund:', error);
        throw error;
    }
}

async function processPaymentCancel(data: {
    transactionId: string;
    amount: string;
    currency: string;
}) {
    try {
        console.log('Processing payment cancellation:', data);

        // 1. Revogar acesso ao curso
        // await revokeCourseAccess(data.transactionId);

        // 2. Enviar email de cancelamento
        // await sendCancellationEmail(data.transactionId);

        // 3. Registrar no analytics
        // await trackPaymentEvent('payment_cancel', data);

        console.log('Cancellation processed successfully');

    } catch (error) {
        console.error('Error processing cancellation:', error);
        throw error;
    }
} 