'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

// Taxas de câmbio simuladas (em produção, usar API real como exchangerate-api.com)
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

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const from = searchParams.get('from')?.toUpperCase();
        const to = searchParams.get('to')?.toUpperCase();
        const amount = parseFloat(searchParams.get('amount') || '0');

        if (!from || !to || isNaN(amount)) {
            return NextResponse.json({
                success: false,
                error: 'Parâmetros obrigatórios: from, to, amount'
            }, { status: 400 });
        }

        if (!EXCHANGE_RATES[from] || !EXCHANGE_RATES[to]) {
            return NextResponse.json({
                success: false,
                error: 'Moeda não suportada'
            }, { status: 400 });
        }

        // Converter para USD primeiro, depois para a moeda de destino
        const usdAmount = amount / EXCHANGE_RATES[from];
        const convertedAmount = usdAmount * EXCHANGE_RATES[to];

        return NextResponse.json({
            success: true,
            data: {
                from,
                to,
                originalAmount: amount,
                convertedAmount: Math.round(convertedAmount * 100) / 100,
                rate: EXCHANGE_RATES[to] / EXCHANGE_RATES[from],
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Erro na conversão de moeda:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { from, to, amount } = body;

        if (!from || !to || !amount) {
            return NextResponse.json({
                success: false,
                error: 'Dados obrigatórios: from, to, amount'
            }, { status: 400 });
        }

        const response = await GET(new NextRequest(`${request.url}?from=${from}&to=${to}&amount=${amount}`));
        return response;

    } catch (error) {
        console.error('Erro na conversão de moeda:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
