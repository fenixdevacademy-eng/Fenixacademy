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

// Configurações completas dos temas
export interface ThemeConfig {
    id: ThemeType;
    name: string;
    description: string;
    icon: string;
    colors: ThemeColors;
    gradients: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
}

// Contexto do tema
interface ThemeContextType {
    currentThemeType: ThemeType;
    themeConfig: ThemeConfig;
    setTheme: (theme: ThemeType) => void;
    availableThemes: ThemeConfig[];
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Configurações dos temas
const themes: ThemeConfig[] = [
    {
        id: 'fenix-default',
        name: 'Fenix Padrão',
        description: 'Tema clássico azul e roxo da Fenix',
        icon: '🔥',
        colors: {
            primary: '#3B82F6',
            secondary: '#8B5CF6',
            accent: '#06B6D4',
            background: '#FFFFFF',
            surface: '#F8FAFC',
            text: '#1E293B',
            textSecondary: '#64748B',
            border: '#E2E8F0',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            secondary: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
            accent: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)'
        }
    },
    {
        id: 'fenix-dark',
        name: 'Fenix Escuro',
        description: 'Tema escuro elegante e moderno',
        icon: '🌙',
        colors: {
            primary: '#6366F1',
            secondary: '#A855F7',
            accent: '#06B6D4',
            background: '#0F172A',
            surface: '#1E293B',
            text: '#F1F5F9',
            textSecondary: '#94A3B8',
            border: '#334155',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
            secondary: 'linear-gradient(135deg, #A855F7 0%, #06B6D4 100%)',
            accent: 'linear-gradient(135deg, #06B6D4 0%, #6366F1 100%)',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
        }
    }
];

// Provider do tema
interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: ThemeType;
}

export function ThemeProvider({ children, defaultTheme = 'fenix-default' }: ThemeProviderProps) {
    const [currentThemeType, setCurrentThemeType] = useState<ThemeType>(defaultTheme);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Obter configuração do tema atual
    const themeConfig = themes.find(theme => theme.id === currentThemeType) || themes[0];

    // Carregar tema salvo
    useEffect(() => {
        const savedTheme = localStorage.getItem('fenix-theme') as ThemeType;
        const savedDarkMode = localStorage.getItem('fenix-dark-mode') === 'true';

        if (savedTheme) {
            setCurrentThemeType(savedTheme);
        }
        setIsDarkMode(savedDarkMode);
    }, []);

    // Aplicar tema ao documento
    useEffect(() => {
        const root = document.documentElement;

        // Aplicar cores do tema
        Object.entries(themeConfig.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Aplicar gradientes
        Object.entries(themeConfig.gradients).forEach(([key, value]) => {
            root.style.setProperty(`--gradient-${key}`, value);
        });

        // Aplicar modo escuro
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [themeConfig, isDarkMode]);

    const setTheme = (theme: ThemeType) => {
        setCurrentThemeType(theme);
        localStorage.setItem('fenix-theme', theme);
    };

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('fenix-dark-mode', newDarkMode.toString());
    };

    const value: ThemeContextType = {
        currentThemeType,
        themeConfig,
        setTheme,
        availableThemes: themes,
        isDarkMode,
        toggleDarkMode
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// Hook para usar o contexto do tema
export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
}