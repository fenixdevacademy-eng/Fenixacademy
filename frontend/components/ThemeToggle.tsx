'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
    currentTheme?: 'light' | 'dark';
    onToggle?: (theme: 'light' | 'dark') => void;
    className?: string;
}

export function ThemeToggle({
    currentTheme = 'light',
    onToggle,
    className = ''
}: ThemeToggleProps) {
    const isDarkMode = currentTheme === 'dark';

    const handleToggle = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        onToggle?.(newTheme);

        // Aplicar tema ao documento
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
            title={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
            {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
                <Moon className="w-5 h-5 text-gray-600" />
            )}
        </button>
    );
}