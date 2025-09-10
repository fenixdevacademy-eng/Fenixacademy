'use client';

import React, { useState } from 'react';
import { useTheme, ThemeType, ThemeConfig } from '../contexts/ThemeContext';
import {
    Palette,
    X,
    Check,
    Moon,
    Sun,
    Settings,
    Sparkles,
    Eye
} from 'lucide-react';

interface ThemeSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
    const {
        currentTheme,
        themeConfig,
        setTheme,
        availableThemes,
        isDarkMode,
        toggleDarkMode
    } = useTheme();

    const [previewTheme, setPreviewTheme] = useState<ThemeType | null>(null);

    if (!isOpen) return null;

    const handleThemeChange = (theme: ThemeType) => {
        setTheme(theme);
        setPreviewTheme(null);
    };

    const handleThemePreview = (theme: ThemeType) => {
        setPreviewTheme(theme);
    };

    const handleClosePreview = () => {
        setPreviewTheme(null);
    };

    const getActiveTheme = () => {
        return previewTheme ? availableThemes.find(t => t.id === previewTheme) : themeConfig;
    };

    const activeTheme = getActiveTheme();

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-gray-700/50">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                            <Palette className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Personalizar Tema
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Escolha o tema perfeito para sua experiência
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Toggle Dark/Light Mode */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 hover:scale-110 shadow-lg"
                            title={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
                        >
                            {isDarkMode ? (
                                <Sun className="w-5 h-5 text-yellow-600" />
                            ) : (
                                <Moon className="w-5 h-5 text-blue-600" />
                            )}
                        </button>

                        <button
                            onClick={onClose}
                            className="p-3 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-xl hover:from-red-200 hover:to-red-300 dark:hover:from-red-800/30 dark:hover:to-red-700/30 transition-all duration-300 hover:scale-110 shadow-lg"
                        >
                            <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar - Lista de Temas */}
                    <div className="w-1/2 p-6 border-r border-gray-200/50 dark:border-gray-700/50 overflow-y-auto">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                            Temas Disponíveis
                        </h3>

                        <div className="space-y-3">
                            {availableThemes.map((theme) => (
                                <div
                                    key={theme.id}
                                    className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${(previewTheme || currentTheme) === theme.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                        }`}
                                    onClick={() => handleThemePreview(theme.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-2xl">{theme.icon}</div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {theme.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {theme.description}
                                                </p>
                                            </div>
                                        </div>

                                        {(previewTheme || currentTheme) === theme.id && (
                                            <div className="flex items-center space-x-2">
                                                {currentTheme === theme.id && (
                                                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                                                        Ativo
                                                    </span>
                                                )}
                                                <Check className="w-5 h-5 text-blue-500" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Preview das cores do tema */}
                                    <div className="flex space-x-2 mt-3">
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                                            style={{ backgroundColor: theme.colors.primary }}
                                        />
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                                            style={{ backgroundColor: theme.colors.secondary }}
                                        />
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                                            style={{ backgroundColor: theme.colors.accent }}
                                        />
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                                            style={{ backgroundColor: theme.colors.success }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview do Tema */}
                    <div className="w-1/2 p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <Eye className="w-5 h-5 mr-2 text-blue-500" />
                                Preview do Tema
                            </h3>

                            {previewTheme && previewTheme !== currentTheme && (
                                <button
                                    onClick={() => handleThemeChange(previewTheme)}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:scale-105"
                                >
                                    Aplicar Tema
                                </button>
                            )}
                        </div>

                        {activeTheme && (
                            <div className="space-y-6">
                                {/* Informações do Tema */}
                                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg">
                                    <div className="text-4xl mb-4">{activeTheme.icon}</div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {activeTheme.name}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {activeTheme.description}
                                    </p>

                                    {previewTheme && previewTheme !== currentTheme && (
                                        <div className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
                                            <span>👀</span>
                                            <span>Visualizando preview</span>
                                        </div>
                                    )}
                                </div>

                                {/* Paleta de Cores */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg overflow-hidden">
                                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                                        <h5 className="font-semibold text-gray-900 dark:text-white">Paleta de Cores</h5>
                                    </div>

                                    <div className="p-4 space-y-3">
                                        {Object.entries(activeTheme.colors).map(([key, color]) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-8 h-8 rounded-lg border-2 border-white dark:border-gray-700 shadow-sm"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                    <span className="text-sm font-mono text-gray-900 dark:text-white">
                                                        {color}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Gradientes */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg overflow-hidden">
                                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                                        <h5 className="font-semibold text-gray-900 dark:text-white">Gradientes</h5>
                                    </div>

                                    <div className="p-4 space-y-3">
                                        {Object.entries(activeTheme.gradients).map(([key, gradient]) => (
                                            <div key={key} className="space-y-2">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                                <div
                                                    className={`h-12 rounded-lg bg-gradient-to-r ${gradient} shadow-lg`}
                                                />
                                                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                                                    {gradient}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Exemplo de Componente */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg overflow-hidden">
                                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                                        <h5 className="font-semibold text-gray-900 dark:text-white">Exemplo de Componente</h5>
                                    </div>

                                    <div className="p-4">
                                        <div className="space-y-3">
                                            <button
                                                className={`w-full py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r ${activeTheme.gradients.primary} shadow-lg hover:scale-105 transition-transform duration-300`}
                                            >
                                                Botão Primário
                                            </button>

                                            <div className={`p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gradient-to-r ${activeTheme.gradients.background}`}>
                                                <h6 className="font-semibold text-white mb-2">Card de Exemplo</h6>
                                                <p className="text-white/80 text-sm">
                                                    Este é um exemplo de como o tema se aplica aos componentes.
                                                </p>
                                            </div>

                                            <div className="flex space-x-2">
                                                <div className="flex-1 p-3 rounded-lg bg-green-500 text-white text-center text-sm font-medium">
                                                    Sucesso
                                                </div>
                                                <div className="flex-1 p-3 rounded-lg bg-yellow-500 text-white text-center text-sm font-medium">
                                                    Aviso
                                                </div>
                                                <div className="flex-1 p-3 rounded-lg bg-red-500 text-white text-center text-sm font-medium">
                                                    Erro
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}










