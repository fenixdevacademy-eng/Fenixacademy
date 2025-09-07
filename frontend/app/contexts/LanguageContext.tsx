'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { defaultLanguage, supportedLanguages } from '../translations';

interface LanguageContextType {
    currentLanguage: string;
    setLanguage: (language: string) => void;
    supportedLanguages: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
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
    };

    const value: LanguageContextType = {
        currentLanguage,
        setLanguage,
        supportedLanguages
    };

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






