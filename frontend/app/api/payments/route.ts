import { NextRequest, NextResponse } from 'next/server';
import { createApiHandler } from '@/lib/error-handler';

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

    // Mock payment history
    const payments = [
        {
            id: 1,
            courseId: 1,
            courseTitle: "Fundamentos de Desenvolvimento Web",
            amount: 197.00,
            currency: "BRL",
            status: "completed",
            paymentMethod: "credit_card",
            transactionId: "TXN-2024-001",
            createdAt: "2024-01-15T10:30:00Z",
            completedAt: "2024-01-15T10:32:00Z",
            invoiceUrl: "/invoices/invoice-001.pdf"
        },
        {
            id: 2,
            courseId: 2,
            courseTitle: "React JS Avançado",
            amount: 447.00,
            currency: "BRL",
            status: "completed",
            paymentMethod: "pix",
            transactionId: "TXN-2024-002",
            createdAt: "2024-01-10T14:20:00Z",
            completedAt: "2024-01-10T14:25:00Z",
            invoiceUrl: "/invoices/invoice-002.pdf"
        },
        {
            id: 3,
            courseId: 3,
            courseTitle: "Node.js APIs REST",
            amount: 297.00,
            currency: "BRL",
            status: "pending",
            paymentMethod: "credit_card",
            transactionId: "TXN-2024-003",
            createdAt: "2024-01-20T09:15:00Z",
            completedAt: null,
            invoiceUrl: null
        }
    ];

    const response = NextResponse.json({
        success: true,
        data: {
            payments,
            bankData: BANK_DATA,
            total: payments.length,
            timestamp: new Date().toISOString()
        }
    });

    // Add cache headers
    response.headers.set('Cache-Control', 'private, max-age=60');

    return response;
}

async function postHandler(request: NextRequest) {
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

    // Validate content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        return NextResponse.json(
            {
                success: false,
                error: 'INVALID_CONTENT_TYPE',
                message: 'Content-Type must be application/json',
                code: 'INVALID_CONTENT_TYPE'
            },
            { status: 400 }
        );
    }

    // Parse and validate body
    let body;
    try {
        body = await request.json();
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

    const { courseId, courseTitle, amount, paymentMethod, currency = "BRL" } = body;

    // Validate required fields
    if (!courseId || !courseTitle || !amount || !paymentMethod) {
        return NextResponse.json(
            {
                success: false,
                error: 'MISSING_REQUIRED_FIELDS',
                message: 'Missing required fields: courseId, courseTitle, amount, paymentMethod',
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

    // Mock payment processing
    const payment = {
        id: Math.floor(Math.random() * 1000) + 4,
        courseId,
        courseTitle,
        amount,
        currency,
        status: "pending",
        paymentMethod,
        transactionId: `TXN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        createdAt: new Date().toISOString(),
        completedAt: null,
        invoiceUrl: null
    };

    return NextResponse.json({
        success: true,
        data: payment,
        message: 'Pagamento iniciado com sucesso',
        timestamp: new Date().toISOString()
    });
}

export const GET = createApiHandler(handler);
export const POST = createApiHandler(postHandler);