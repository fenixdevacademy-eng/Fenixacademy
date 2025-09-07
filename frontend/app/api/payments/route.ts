import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
    try {
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

        return NextResponse.json({
            success: true,
            data: payments,
            total: payments.length
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao carregar histórico de pagamentos'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { courseId, courseTitle, amount, paymentMethod, currency = "BRL" } = body;

        // Mock payment processing
        const payment: any = {
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

        // Simulate payment processing delay
        setTimeout(() => {
            payment.status = "completed";
            payment.completedAt = new Date().toISOString();
            payment.invoiceUrl = `/invoices/invoice-${payment.id}.pdf`;
        }, 2000);

        return NextResponse.json({
            success: true,
            data: payment,
            message: 'Pagamento iniciado com sucesso'
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao processar pagamento'
            },
            { status: 500 }
        );
    }
} 