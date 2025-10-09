'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos de temas disponíveis
export type ThemeType =
    | 'fenix-default'      // Tema padrão da Fenix (azul/roxo)
    | 'fenix-dark'         // Tema escuro elegante
    | 'fenix-sunset'       // Tema pôr do sol (laranja/vermelho)
    | 'fenix-forest'       // Tema floresta (verde/esmeralda)
    | 'fenix-ocean'        // Tema oceano (azul/ciano)
    | 'fenix-royal'        // Tema real (roxo/dourado)
    | 'fenix-neon'         // Tema neon (rosa/ciano)
    | 'fenix-earth';       // Tema terra (marrom/bege)

// Interface para as cores do tema
export interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
}

// Interface do contexto
interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    colors: ThemeColors;
}

// Cores padrão do tema Fenix
const defaultColors: ThemeColors = {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#EC4899',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
};

// Criação do contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider do tema
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>('fenix-default');

    // Carregar tema salvo do localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('fenix-theme') as ThemeType;
            if (savedTheme) {
                setTheme(savedTheme);
            }
        }
    }, []);

    // Salvar tema no localStorage quando mudar
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('fenix-theme', theme);
        }
    }, [theme]);

    const colors = defaultColors; // Por enquanto, usar cores padrão

    return (
        <ThemeContext.Provider value={{ theme, setTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Hook para usar o contexto do tema
export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        // Return default values during SSR
        return {
            theme: 'fenix-default' as ThemeType,
            setTheme: () => { },
            colors: defaultColors,
        };
    }
    return context;
}