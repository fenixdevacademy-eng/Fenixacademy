'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

interface InvoiceData {
    invoiceNumber: string;
    customerName: string;
    customerEmail: string;
    courseTitle: string;
    amount: number;
    discount: number;
    finalAmount: number;
    paymentMethod: string;
    installments?: number;
    installmentValue?: number;
    issueDate: string;
    dueDate: string;
    status: 'paid' | 'pending' | 'cancelled';
    pixKey?: string;
    cardData?: {
        last4: string;
        brand: string;
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            courseTitle,
            amount,
            discount,
            finalAmount,
            paymentMethod,
            installments = 1,
            pixKey,
            cardData
        } = body;

        // Gerar número da fatura
        const invoiceNumber = `FENIX-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        // Calcular data de vencimento (7 dias para PIX, 30 dias para cartão)
        const issueDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(issueDate.getDate() + (paymentMethod === 'pix' ? 7 : 30));

        const invoiceData: InvoiceData = {
            invoiceNumber,
            customerName: 'Cliente Fênix Academy',
            customerEmail: 'cliente@fenixdevacademy.com',
            courseTitle,
            amount,
            discount,
            finalAmount,
            paymentMethod,
            installments: paymentMethod === 'credit_card' ? installments : 1,
            installmentValue: paymentMethod === 'credit_card' ? finalAmount / installments : finalAmount,
            issueDate: issueDate.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0],
            status: 'paid',
            pixKey,
            cardData: cardData ? {
                last4: cardData.number.slice(-4),
                brand: getCardBrand(cardData.number)
            } : undefined
        }

        // Simular salvamento da fatura (em produção, salvaria no banco de dados)
        console.log('Fatura gerada:', invoiceData);

        // Retornar dados da fatura
        return NextResponse.json({
            success: true,
            invoice: invoiceData,
            message: 'Fatura gerada com sucesso'
        });

    } catch (error) {
        console.error('Erro ao gerar fatura:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
}

// Função para identificar a bandeira do cartão
function getCardBrand(cardNumber: string): string {
    const number = cardNumber.replace(/\s/g, '');

    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'Mastercard';
    if (/^3[47]/.test(number)) return 'American Express';
    if (/^6/.test(number)) return 'Discover';
    if (/^3[0689]/.test(number)) return 'Diners Club';

    return 'Cartão';
}

// Função para gerar PDF da fatura (simulação)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const invoiceNumber = searchParams.get('invoiceNumber');

        if (!invoiceNumber) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Número da fatura é obrigatório'
                },
                { status: 400 }
            );
        }

        // Simular geração de PDF (em produção, usaria uma biblioteca como puppeteer ou jsPDF)
        const pdfUrl = `/api/invoices/${invoiceNumber}.pdf`;

        return NextResponse.json({
            success: true,
            pdfUrl,
            message: 'PDF da fatura gerado com sucesso'
        });

    } catch (error) {
        console.error('Erro ao gerar PDF da fatura:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor'
            },
            { status: 500 }
        );
    }
}
