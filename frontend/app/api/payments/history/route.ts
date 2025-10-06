'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Dados mock do histórico de pagamentos
        const payments = [
            {
                id: 'pay_123456789',
                amount: 197.90,
                currency: 'BRL',
                status: 'completed',
                method: 'pix',
                course: 'Python para Data Science',
                createdAt: '2025-01-15T10:30:00Z',
                completedAt: '2025-01-15T10:35:00Z'
            },
            {
                id: 'pay_987654321',
                amount: 297.90,
                currency: 'BRL',
                status: 'pending',
                method: 'boleto',
                course: 'Desenvolvimento Web Completo',
                createdAt: '2025-01-14T14:20:00Z',
                dueDate: '2025-01-17T23:59:59Z'
            },
            {
                id: 'pay_456789123',
                amount: 147.90,
                currency: 'BRL',
                status: 'failed',
                method: 'credit',
                course: 'JavaScript Avançado',
                createdAt: '2025-01-13T09:15:00Z',
                failedAt: '2025-01-13T09:20:00Z',
                errorMessage: 'Cartão recusado'
            }
        ];

        return NextResponse.json({
            success: true,
            data: payments
        });

    } catch (error) {
        console.error('Erro ao buscar histórico de pagamentos:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

