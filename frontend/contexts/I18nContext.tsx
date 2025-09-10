'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation, UseTranslationReturn } from '@/lib/i18n/useTranslation';
import { SupportedLanguage } from '@/lib/i18n';

interface I18nContextType extends UseTranslationReturn {
    isInitialized: boolean;
    initializeLanguage: (language: SupportedLanguage) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
    children: React.ReactNode;
    defaultLanguage?: SupportedLanguage;
}

export function I18nProvider({ children, defaultLanguage }: I18nProviderProps) {
    const translation = useTranslation();
    const [isInitialized, setIsInitialized] = useState(false);

    // Inicializar idioma
    useEffect(() => {
        const savedLanguage = localStorage.getItem('fenix-language') as SupportedLanguage;
        const initialLanguage = savedLanguage || defaultLanguage || 'pt';

        if (savedLanguage !== initialLanguage) {
            translation.setLanguage(initialLanguage);
        }

        setIsInitialized(true);
    }, [defaultLanguage, translation]);

    const initializeLanguage = (language: SupportedLanguage) => {
        translation.setLanguage(language);
        setIsInitialized(true);
    };

    const value: I18nContextType = {
        ...translation,
        isInitialized,
        initializeLanguage
    };

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n(): I18nContextType {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}

// Hook para verificar se o i18n está inicializado
export function useI18nInitialized(): boolean {
    const { isInitialized } = useI18n();
    return isInitialized;
}

// Hook para obter apenas as funções de tradução
export function useI18nTranslation() {
    const { t, language, setLanguage, isRTL } = useI18n();
    return { t, language, setLanguage, isRTL };
}

// Hook para obter apenas as funções de formatação
export function useI18nFormatting() {
    const { formatCurrency, formatDate, formatNumber, formatTime, formatDateTime } = useI18n();
    return { formatCurrency, formatDate, formatNumber, formatTime, formatDateTime };
}

export default I18nProvider;


