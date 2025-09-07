'use client';

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Palette, Sparkles, X } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

export default function ThemeToggle() {
    const { currentTheme, themeConfig, isDarkMode, toggleDarkMode } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Botão Flutuante */}
            <div className="fixed bottom-8 left-8 z-40">
                <div className="relative group">
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Personalizar Tema 🎨
                        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>

                    {/* Botão Principal */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="group relative w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group-hover:rotate-12"
                    >
                        <Palette className="w-8 h-8 text-white" />

                        {/* Indicador de Tema Ativo */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
                            <span className="text-lg">{themeConfig.icon}</span>
                        </div>

                        {/* Badge de Modo */}
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl flex items-center justify-center shadow-lg border border-white">
                            {isDarkMode ? (
                                <span className="text-xs">🌙</span>
                            ) : (
                                <span className="text-xs">☀️</span>
                            )}
                        </div>
                    </button>
                </div>
            </div>

            {/* Seletor de Temas */}
            <ThemeSelector isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}






