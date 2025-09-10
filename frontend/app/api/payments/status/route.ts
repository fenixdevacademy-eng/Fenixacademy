import { NextRequest, NextResponse } from 'next/server';
import { createNextApiHandler } from '@/lib/error-handler';

async function handler(request: NextRequest) {
    // Validate request method
    if (request.method !== 'GET') {
        return NextResponse.json(
            {
                success: false,
                error: 'INVALID_REQUEST_METHOD',
                message: `Method ${request.method} not allowed`,
                code: 'INVALID_REQUEST_METHOD'
            },
            { status: 405 }
        );
    }

    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
        return NextResponse.json(
            {
                success: false,
                error: 'MISSING_TRANSACTION_ID',
                message: 'Transaction ID is required',
                code: 'MISSING_TRANSACTION_ID'
            },
            { status: 400 }
        );
    }

    // Simulate payment status check
    // In a real application, this would query the payment processor's API
    const statuses = ['pending', 'processing', 'completed', 'failed', 'cancelled'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    // Simulate different statuses based on transaction ID
    let status = 'pending';
    let message = 'Pagamento pendente';
    let canRetry = false;

    if (transactionId.includes('TXN-2024-001')) {
        status = 'completed';
        message = 'Pagamento aprovado e processado com sucesso';
    } else if (transactionId.includes('TXN-2024-002')) {
        status = 'completed';
        message = 'PIX processado com sucesso';
    } else if (transactionId.includes('TXN-2024-003')) {
        status = 'pending';
        message = 'Aguardando confirmação do pagamento';
    } else if (transactionId.includes('failed')) {
        status = 'failed';
        message = 'Pagamento falhou. Tente novamente.';
        canRetry = true;
    } else {
        // Random status for new transactions
        status = randomStatus;
        switch (status) {
            case 'completed':
                message = 'Pagamento aprovado com sucesso!';
                break;
            case 'processing':
                message = 'Processando pagamento...';
                break;
            case 'failed':
                message = 'Pagamento falhou. Verifique os dados e tente novamente.';
                canRetry = true;
                break;
            case 'cancelled':
                message = 'Pagamento cancelado pelo usuário.';
                canRetry = true;
                break;
            default:
                message = 'Aguardando processamento...';
        }
    }

    const response = NextResponse.json({
        success: true,
        data: {
            transactionId,
            status,
            message,
            canRetry,
            lastChecked: new Date().toISOString(),
            nextCheck: new Date(Date.now() + 30 * 1000).toISOString() // 30 seconds
        }
    });

    // Add cache headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
}

export const GET = createNextApiHandler(handler);




