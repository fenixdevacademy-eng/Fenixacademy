'use client';

import React, { useState } from 'react';
import { Check, Palette } from 'lucide-react';

interface Theme {
    id: string;
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        surface: string;
        text: string;
    };
}

const themes: Theme[] = [
    {
        id: 'default',
        name: 'default',
        colors: {
            primary: '#3B82F6',
            secondary: '#1E40AF',
            accent: '#F59E0B',
            background: '#FFFFFF',
            surface: '#F8FAFC',
            text: '#1F2937'
        }
    },
    {
        id: 'dark',
        name: 'dark',
        colors: {
            primary: '#60A5FA',
            secondary: '#3B82F6',
            accent: '#FBBF24',
            background: '#111827',
            surface: '#1F2937',
            text: '#F9FAFB'
        }
    },
    {
        id: 'ocean',
        name: 'ocean',
        colors: {
            primary: '#0EA5E9',
            secondary: '#0284C7',
            accent: '#06B6D4',
            background: '#F0F9FF',
            surface: '#E0F2FE',
            text: '#0C4A6E'
        }
    },
    {
        id: 'forest',
        name: 'forest',
        colors: {
            primary: '#10B981',
            secondary: '#059669',
            accent: '#34D399',
            background: '#F0FDF4',
            surface: '#DCFCE7',
            text: '#064E3B'
        }
    }
];

interface ThemeSelectorProps {
    currentTheme?: string;
    onThemeChange?: (theme: Theme) => void;
    className?: string;
}

export function ThemeSelector({
    currentTheme = 'default',
    onThemeChange,
    className = ''
}: ThemeSelectorProps) {
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);

    const handleThemeSelect = (theme: Theme) => {
        setSelectedTheme(theme.id);
        onThemeChange?.(theme);

        // Aplicar tema ao CSS
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Seletor de Tema
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme)}
                        className={`relative p-4 rounded-lg border-2 transition-all ${selectedTheme === theme.id
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                                {theme.name}
                            </span>
                            {selectedTheme === theme.id && (
                                <Check className="w-4 h-4 text-blue-500" />
                            )}
                        </div>

                        <div className="flex gap-1">
                            <div
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: theme.colors.primary }}
                                title="Primary"
                            />
                            <div
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: theme.colors.secondary }}
                                title="Secondary"
                            />
                            <div
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: theme.colors.accent }}
                                title="Accent"
                            />
                            <div
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: theme.colors.background }}
                                title="Background"
                            />
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Escolha um tema para personalizar a aparência da aplicação.
                </p>
            </div>
        </div>
    );
}