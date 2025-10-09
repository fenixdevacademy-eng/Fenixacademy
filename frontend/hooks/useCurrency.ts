'use client';

import { useState, useEffect } from 'react';

interface CurrencyHook {
    currency: string;
    setCurrency: (currency: string) => void;
    formatPrice: (price: number) => string;
    convertPrice: (price: number, fromCurrency?: string) => number;
}

export function useCurrency(): CurrencyHook {
    const [currency, setCurrency] = useState('BRL');

    const formatPrice = (price: number): string => {
        const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency,
        });
        return formatter.format(price);
    };

    const convertPrice = (price: number, fromCurrency: string = 'USD'): number => {
        // Taxas de conversão mockadas
        const rates: { [key: string]: number } = {
            'USD': 1,
            'BRL': 5.2,
            'EUR': 0.85,
        };

        const fromRate = rates[fromCurrency] || 1;
        const toRate = rates[currency] || 1;

        return (price / fromRate) * toRate;
    };

    return {
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
    };
}