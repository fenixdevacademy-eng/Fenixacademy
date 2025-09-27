import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const payments = [
            {
                id: 1,
                courseId: 1,
                userId: 'user-123',
                amount: 299.90,
                currency: 'BRL',
                status: 'completed',
                paymentMethod: 'credit_card',
                createdAt: '2024-01-15T10:30:00Z'
            },
            {
                id: 2,
                courseId: 2,
                userId: 'user-123',
                amount: 499.90,
                currency: 'BRL',
                status: 'completed',
                paymentMethod: 'pix',
                createdAt: '2024-02-20T14:45:00Z'
            }
        ];

        return NextResponse.json({
            success: true,
            payments
        });

    } catch (error) {
        console.error('Erro ao buscar pagamentos:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}