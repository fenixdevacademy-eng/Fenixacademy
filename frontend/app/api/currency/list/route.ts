'use client';

﻿import { NextResponse } from 'next/server';

const SUPPORTED_CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
    { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' },
    { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
    { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
    { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
    { code: 'UYU', name: 'Uruguayan Peso', symbol: '$', flag: '🇺🇾' },
    { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', flag: '🇵🇾' },
    { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', flag: '🇧🇴' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
];

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            data: {
                currencies: SUPPORTED_CURRENCIES,
                defaultCurrency: 'USD',
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Erro ao listar moedas:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
