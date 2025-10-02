import { useState, useEffect } from 'react';
import { detectLanguage } from './index';

export interface Translation {
    [key: string]: string;
}

export const translations: { [locale: string]: Translation } = {
    'pt-BR': {
        'welcome': 'Bem-vindo',
        'hello': 'Olá',
        'goodbye': 'Tchau',
        'loading': 'Carregando...',
        'error': 'Erro',
        'success': 'Sucesso'
    },
    'en-US': {
        'welcome': 'Welcome',
        'hello': 'Hello',
        'goodbye': 'Goodbye',
        'loading': 'Loading...',
        'error': 'Error',
        'success': 'Success'
    },
    'es-ES': {
        'welcome': 'Bienvenido',
        'hello': 'Hola',
        'goodbye': 'Adiós',
        'loading': 'Cargando...',
        'error': 'Error',
        'success': 'Éxito'
    }
};

export const useTranslation = (locale: string = detectLanguage()) => {
    const [currentLocale, setCurrentLocale] = useState(locale);

    useEffect(() => {
        setCurrentLocale(locale);
    }, [locale]);

    const t = (key: string): string => {
        return translations[currentLocale]?.[key] || key;
    };

    return { t, locale: currentLocale };
};











