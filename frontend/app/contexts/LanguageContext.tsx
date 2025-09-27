'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const defaultLanguage = 'pt';
const supportedLanguages = ['pt', 'en', 'es'];

interface LanguageContextType {
    currentLanguage: string;
    setLanguage: (language: string) => void;
    supportedLanguages: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<string>(defaultLanguage);

    useEffect(() => {
        // Carregar idioma salvo no localStorage
        const savedLanguage = localStorage.getItem('fenix-language');
        if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    const setLanguage = (language: string) => {
        if (supportedLanguages.includes(language)) {
            setCurrentLanguage(language);
            localStorage.setItem('fenix-language', language);
        }
    }

    const value = {
        currentLanguage,
        setLanguage,
        supportedLanguages
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}