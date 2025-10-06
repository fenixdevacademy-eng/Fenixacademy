'use client';

﻿import { useState, useEffect, useCallback } from 'react';

export interface Currency {
    code: string;
    name: string;
    symbol: string;
    flag: string;
}

export interface CurrencyConversion {
    from: string;
    to: string;
    originalAmount: number;
    convertedAmount: number;
    rate: number;
    timestamp: string;
}

export const useCurrency = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

    // Carregar lista de moedas
    const loadCurrencies = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/currency/list');
            const data = await response.json();

            if (data.success) {
                setCurrencies(data.data.currencies);
                setSelectedCurrency(data.data.defaultCurrency);
            } else {
                setError(data.error || 'Erro ao carregar moedas');
            }
        } catch (err) {
            setError('Erro ao carregar moedas');
        } finally {
            setLoading(false);
        }
    }, []);

    // Converter moeda
    const convertCurrency = useCallback(async (
        from: string,
        to: string,
        amount: number
    ): Promise<CurrencyConversion | null> => {
        try {
            const response = await fetch(
                `/api/currency/convert?from=${from}&to=${to}&amount=${amount}`
            );
            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                setError(data.error || 'Erro na conversão');
                return null;
            }
        } catch (err) {
            setError('Erro na conversão de moeda');
            return null;
        }
    }, []);

    // Formatar valor monetário
    const formatCurrency = useCallback((amount: number, currencyCode: string): string => {
        const currency = currencies.find(c => c.code === currencyCode);
        if (!currency) return `${amount.toFixed(2)} ${currencyCode}`;

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2});

        return formatter.format(amount);
    }, [currencies]);

    // Obter símbolo da moeda
    const getCurrencySymbol = useCallback((currencyCode: string): string => {
        const currency = currencies.find(c => c.code === currencyCode);
        return currency?.symbol || currencyCode;
    }, [currencies]);

    // Obter bandeira da moeda
    const getCurrencyFlag = useCallback((currencyCode: string): string => {
        const currency = currencies.find(c => c.code === currencyCode);
        return currency?.flag || '🌍';
    }, [currencies]);

    useEffect(() => {
        loadCurrencies();
    }, [loadCurrencies]);

    return {
        currencies,
        loading,
        error,
        selectedCurrency,
        setSelectedCurrency,
        convertCurrency,
        formatCurrency,
        getCurrencySymbol,
        getCurrencyFlag,
        loadCurrencies
    }
}
