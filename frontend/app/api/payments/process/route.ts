import { NextRequest, NextResponse } from 'next/server';
import { createNextApiHandler } from '@/lib/error-handler';

// Dados bancários específicos
const BANK_DATA = {
    agency: '1823-6',
    account: '123.869-8',
    bank: 'Banco do Brasil',
    pixKey: 'fenix.academy@bb.com.br',
    cnpj: '12.345.678/0001-90',
    companyName: 'Fenix Academy Ltda'
};

async function handler(request: NextRequest) {
    // Validate request method
    if (request.method !== 'POST') {
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

    // Parse request body
    let body;
    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'INVALID_JSON',
                message: 'Invalid JSON in request body',
                code: 'INVALID_JSON'
            },
            { status: 400 }
        );
    }

    const {
        planId,
        paymentMethod,
        amount,
        installments = 1,
        cardData,
        email,
        phone,
        cpf
    } = body;

    // Validate required fields
    if (!planId || !paymentMethod || !amount) {
        return NextResponse.json(
            {
                success: false,
                error: 'MISSING_REQUIRED_FIELDS',
                message: 'Missing required fields: planId, paymentMethod, amount',
                code: 'MISSING_REQUIRED_FIELDS'
            },
            { status: 400 }
        );
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
        return NextResponse.json(
            {
                success: false,
                error: 'INVALID_AMOUNT',
                message: 'Amount must be a positive number',
                code: 'INVALID_AMOUNT'
            },
            { status: 400 }
        );
    }

    // Generate transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Simulate payment processing based on method
    let paymentResult;

    switch (paymentMethod) {
        case 'credit':
            paymentResult = await processCreditCardPayment({
                transactionId,
                amount,
                installments,
                cardData,
                email,
                phone,
                cpf
            });
            break;

        case 'pix':
            paymentResult = await processPixPayment({
                transactionId,
                amount,
                email,
                phone,
                cpf
            });
            break;

        case 'boleto':
            paymentResult = await processBoletoPayment({
                transactionId,
                amount,
                email,
                phone,
                cpf
            });
            break;

        case 'transfer':
            paymentResult = await processBankTransfer({
                transactionId,
                amount,
                email,
                phone,
                cpf
            });
            break;

        default:
            return NextResponse.json(
                {
                    success: false,
                    error: 'INVALID_PAYMENT_METHOD',
                    message: 'Invalid payment method',
                    code: 'INVALID_PAYMENT_METHOD'
                },
                { status: 400 }
            );
    }

    const response = NextResponse.json({
        success: true,
        data: {
            transactionId,
            status: paymentResult.status,
            paymentMethod,
            amount,
            installments,
            message: paymentResult.message,
            instructions: paymentResult.instructions,
            bankData: paymentMethod === 'transfer' || paymentMethod === 'pix' ? BANK_DATA : null,
            createdAt: new Date().toISOString(),
            expiresAt: paymentResult.expiresAt
        }
    });

    // Add cache headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
}

// Simulate credit card payment processing
async function processCreditCardPayment(data: any) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate 90% success rate
    const success = Math.random() > 0.1;

    if (success) {
        return {
            status: 'completed',
            message: 'Pagamento aprovado com sucesso!',
            instructions: null,
            expiresAt: null
        };
    } else {
        return {
            status: 'failed',
            message: 'Pagamento recusado. Verifique os dados do cartão.',
            instructions: 'Tente novamente ou use outro método de pagamento.',
            expiresAt: null
        };
    }
}

// Simulate PIX payment processing
async function processPixPayment(data: any) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        status: 'pending',
        message: 'PIX gerado com sucesso!',
        instructions: `Pague R$ ${data.amount.toFixed(2)} usando a chave PIX: ${BANK_DATA.pixKey}`,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    };
}

// Simulate boleto payment processing
async function processBoletoPayment(data: any) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const boletoNumber = `34191.${Math.random().toString().substr(2, 5)} ${Math.random().toString().substr(2, 5)}.${Math.random().toString().substr(2, 5)} ${Math.random().toString().substr(2, 5)} ${Math.random().toString().substr(2, 5)}`;

    return {
        status: 'pending',
        message: 'Boleto gerado com sucesso!',
        instructions: `Boleto número: ${boletoNumber}\nVencimento: ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}\nEnviado para: ${data.email}`,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days
    };
}

// Simulate bank transfer processing
async function processBankTransfer(data: any) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        status: 'pending',
        message: 'Dados bancários fornecidos!',
        instructions: `Realize a transferência para:\nBanco: ${BANK_DATA.bank}\nAgência: ${BANK_DATA.agency}\nConta: ${BANK_DATA.account}\nCNPJ: ${BANK_DATA.cnpj}\n\nEnvie o comprovante para: financeiro@fenixacademy.com.br`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 1 day
    };
}

export const POST = createNextApiHandler(handler);




