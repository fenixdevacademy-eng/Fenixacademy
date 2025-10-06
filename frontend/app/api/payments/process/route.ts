'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

// Taxas de câmbio simuladas
const EXCHANGE_RATES: Record<string, number> = {
    'USD': 1.0,
    'BRL': 5.2,
    'EUR': 0.85,
    'GBP': 0.73,
    'CAD': 1.35,
    'AUD': 1.50,
    'JPY': 110.0,
    'INR': 74.0,
    'MXN': 20.0,
    'ARS': 100.0,
    'CLP': 800.0,
    'COP': 3800.0,
    'PEN': 3.7,
    'UYU': 42.0,
    'PYG': 7000.0,
    'BOB': 6.9,
    'CNY': 6.4,
    'KRW': 1200.0,
    'SGD': 1.35,
    'HKD': 7.8}

interface PaymentData {
    planId?: string;
    paymentMethod?: string;
    amount?: number;
    currency?: string;
    courseId?: string;
    cardData?: any;
    pixData?: any;
    paypalData?: any;
    userEmail?: string;
    userName?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => ({}));
        const {
            planId,
            paymentMethod,
            amount,
            currency = 'USD',
            courseId,
            cardData,
            pixData,
            paypalData,
            userEmail,
            userName
        } = body as PaymentData;

        if (!planId && !courseId) {
            return NextResponse.json({
                success: false,
                error: 'Dados obrigatórios: planId ou courseId'
            }, { status: 400 });
        }

        if (!paymentMethod) {
            return NextResponse.json({
                success: false,
                error: 'Método de pagamento obrigatório'
            }, { status: 400 });
        }

        if (!amount || amount <= 0) {
            return NextResponse.json({
                success: false,
                error: 'Valor inválido'
            }, { status: 400 });
        }

        // Validar moeda
        if (!EXCHANGE_RATES[currency]) {
            return NextResponse.json({
                success: false,
                error: 'Moeda não suportada'
            }, { status: 400 });
        }

        // Simular processamento do pagamento com diferentes métodos
        let paymentResult: any = {
            id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            planId: planId || courseId,
            paymentMethod,
            amount,
            currency,
            status: 'processing',
            transactionId: `txn_${Date.now()}`,
            processedAt: new Date().toISOString()
        }

        // Simular diferentes tipos de pagamento
        switch (paymentMethod) {
            case 'credit_card':
            case 'debit_card':
                if (!cardData) {
                    return NextResponse.json({
                        success: false,
                        error: 'Dados do cartão obrigatórios'
                    }, { status: 400 });
                }
                paymentResult.status = 'succeeded';
                paymentResult.cardLast4 = cardData.number?.slice(-4);
                paymentResult.cardBrand = 'visa'; // Simulado
                break;

            case 'pix':
                paymentResult.status = 'pending';
                paymentResult.pixKey = 'pix@fenixdevacademy.com';
                paymentResult.pixQrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
                paymentResult.pixExpiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min
                break;

            case 'paypal':
                if (!paypalData) {
                    return NextResponse.json({
                        success: false,
                        error: 'Dados do PayPal obrigatórios'
                    }, { status: 400 });
                }
                paymentResult.status = 'succeeded';
                paymentResult.paypalOrderId = `pp_${Date.now()}`;
                break;

            case 'bank_transfer':
                paymentResult.status = 'pending';
                paymentResult.bankAccount = '12345-6';
                paymentResult.bankCode = '001';
                break;

            default:
                paymentResult.status = 'succeeded';
        }

        // Calcular taxas e conversões
        const usdAmount = amount / EXCHANGE_RATES[currency];
        const processingFee = usdAmount * 0.029 + 0.30; // 2.9% + $0.30
        const totalAmount = usdAmount + processingFee;

        paymentResult.originalAmount = amount;
        paymentResult.originalCurrency = currency;
        paymentResult.usdAmount = usdAmount;
        paymentResult.processingFee = processingFee;
        paymentResult.totalAmount = totalAmount;
        paymentResult.exchangeRate = EXCHANGE_RATES[currency];

        // Simular delay de processamento
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            data: {
                payment: paymentResult,
                message: 'Pagamento processado com sucesso',
                instructions: paymentMethod === 'pix' ? 'Escaneie o QR Code ou copie a chave PIX para finalizar o pagamento' : undefined
            }
        });

    } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}