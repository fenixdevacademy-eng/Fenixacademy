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
    | 'fenix-earth'        // Tema terra (marrom/bege);

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
    currentTheme: ThemeType;
    themeConfig: ThemeConfig;
    setTheme: (theme: ThemeType) => void;
    availableThemes: ThemeConfig[];
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

// Criação do contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Configurações dos temas
export const themeConfigs: Record<ThemeType, ThemeConfig> = {
    'fenix-default': {
        id: 'fenix-default',
        name: 'Fenix Default',
        description: 'Tema clássico da Fenix com azul e roxo',
        icon: '🔥',
        colors: {
            primary: '#3B82F6',
            secondary: '#8B5CF6',
            accent: '#F59E0B',
            background: '#0F172A',
            surface: '#1E293B',
            text: '#FFFFFF',
            textSecondary: '#94A3B8',
            border: '#334155',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'from-blue-500 to-purple-600',
            secondary: 'from-purple-500 to-pink-600',
            accent: 'from-yellow-400 to-orange-500',
            background: 'from-gray-900 via-blue-900 to-purple-900'
        }
    },

    'fenix-dark': {
        id: 'fenix-dark',
        name: 'Fenix Dark',
        description: 'Tema escuro elegante e minimalista',
        icon: '🌙',
        colors: {
            primary: '#6366F1',
            secondary: '#8B5CF6',
            accent: '#F59E0B',
            background: '#0A0A0A',
            surface: '#1A1A1A',
            text: '#FFFFFF',
            textSecondary: '#A3A3A3',
            border: '#262626',
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'from-indigo-500 to-purple-600',
            secondary: 'from-purple-500 to-pink-600',
            accent: 'from-yellow-400 to-orange-500',
            background: 'from-black via-gray-900 to-gray-800'
        }
    },

    'fenix-sunset': {
        id: 'fenix-sunset',
        name: 'Fenix Sunset',
        description: 'Tema quente inspirado no pôr do sol',
        icon: '🌅',
        colors: {
            primary: '#F97316',
            secondary: '#DC2626',
            accent: '#F59E0B',
            background: '#1C1917',
            surface: '#292524',
            text: '#FFFFFF',
            textSecondary: '#D6D3D1',
            border: '#44403C',
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'from-orange-500 to-red-600',
            secondary: 'from-red-500 to-pink-600',
            accent: 'from-yellow-400 to-orange-500',
            background: 'from-stone-900 via-orange-900 to-red-900'
        }
    },

    'fenix-forest': {
        id: 'fenix-forest',
        name: 'Fenix Forest',
        description: 'Tema natural inspirado na floresta',
        icon: '🌲',
        colors: {
            primary: '#10B981',
            secondary: '#059669',
            accent: '#F59E0B',
            background: '#064E3B',
            surface: '#065F46',
            text: '#FFFFFF',
            textSecondary: '#A7F3D0',
            border: '#047857',
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'from-green-500 to-emerald-600',
            secondary: 'from-emerald-500 to-teal-600',
            accent: 'from-yellow-400 to-orange-500',
            background: 'from-emerald-900 via-green-900 to-teal-900'
        }
    },

    'fenix-ocean': {
        id: 'fenix-ocean',
        name: 'Fenix Ocean',
        description: 'Tema refrescante inspirado no oceano',
        icon: '🌊',
        colors: {
            primary: '#06B6D4',
            secondary: '#0891B2',
            accent: '#F59E0B',
            background: '#0C4A6E',
            surface: '#0E7490',
            text: '#FFFFFF',
            textSecondary: '#A5F3FC',
            border: '#0284C7',
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'from-cyan-500 to-blue-600',
            secondary: 'from-blue-500 to-indigo-600',
            accent: 'from-yellow-400 to-orange-500',
            background: 'from-blue-900 via-cyan-900 to-blue-800'
        }
    },

    'fenix-royal': {
        id: 'fenix-royal',
        name: 'Fenix Royal',
        description: 'Tema luxuoso com roxo e dourado',
        icon: '👑',
        colors: {
            primary: '#8B5CF6',
            secondary: '#A855F7',
            accent: '#F59E0B',
            background: '#1E1B4B',
            surface: '#312E81',
            text: '#FFFFFF',
            textSecondary: '#C4B5FD',
            border: '#4C1D95',
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'from-purple-500 to-violet-600',
            secondary: 'from-violet-500 to-purple-600',
            accent: 'from-yellow-400 to-orange-500',
            background: 'from-purple-900 via-violet-900 to-indigo-900'
        }
    },

    'fenix-neon': {
        id: 'fenix-neon',
        name: 'Fenix Neon',
        description: 'Tema vibrante com cores neon',
        icon: '✨',
        colors: {
            primary: '#EC4899',
            secondary: '#06B6D4',
            accent: '#F59E0B',
            background: '#0F0F23',
            surface: '#1A1A2E',
            text: '#FFFFFF',
            textSecondary: '#F1F5F9',
            border: '#2D2D44',
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'from-pink-500 to-cyan-600',
            secondary: 'from-cyan-500 to-pink-600',
            accent: 'from-yellow-400 to-orange-500',
            background: 'from-slate-900 via-purple-900 to-cyan-900'
        }
    },

    'fenix-earth': {
        id: 'fenix-earth',
        name: 'Fenix Earth',
        description: 'Tema terroso e acolhedor',
        icon: '🌍',
        colors: {
            primary: '#A16207',
            secondary: '#92400E',
            accent: '#F59E0B',
            background: '#292524',
            surface: '#44403C',
            text: '#FFFFFF',
            textSecondary: '#D6D3D1',
            border: '#78716C',
            success: '#22C55E',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6'
        },
        gradients: {
            primary: 'from-amber-600 to-orange-700',
            secondary: 'from-orange-600 to-amber-700',
            accent: 'from-yellow-400 to-orange-500',
            background: 'from-stone-800 via-amber-900 to-orange-900'
        }
    }
};

// Hook personalizado para usar o tema
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Provider do tema
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('fenix-default');
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Carregar tema salvo no localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('fenix-theme') as ThemeType;
        const savedDarkMode = localStorage.getItem('fenix-dark-mode');

        if (savedTheme && themeConfigs[savedTheme]) {
            setCurrentTheme(savedTheme);
        }

        if (savedDarkMode !== null) {
            setIsDarkMode(JSON.parse(savedDarkMode));
        }
    }, []);

    // Salvar tema no localStorage
    useEffect(() => {
        localStorage.setItem('fenix-theme', currentTheme);
    }, [currentTheme]);

    // Salvar modo escuro no localStorage
    useEffect(() => {
        localStorage.setItem('fenix-dark-mode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    // Aplicar tema ao documento
    useEffect(() => {
        const theme = themeConfigs[currentTheme];
        const root = document.documentElement;

        // Aplicar variáveis CSS customizadas
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Aplicar classe de tema
        root.className = `theme-${currentTheme} ${isDarkMode ? 'dark' : 'light'}`;

        // Aplicar gradientes como variáveis CSS
        Object.entries(theme.gradients).forEach(([key, value]) => {
            root.style.setProperty(`--gradient-${key}`, value);
        });
    }, [currentTheme, isDarkMode]);

    const setTheme = (theme: ThemeType) => {
        if (themeConfigs[theme]) {
            setCurrentTheme(theme);
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const value: ThemeContextType = {
        currentTheme,
        themeConfig: themeConfigs[currentTheme],
        setTheme,
        availableThemes: Object.values(themeConfigs),
        isDarkMode,
        toggleDarkMode
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};










