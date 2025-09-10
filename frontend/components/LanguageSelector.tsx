'use client';

import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '@/lib/i18n';

interface LanguageSelectorProps {
    className?: string;
    showLabel?: boolean;
    variant?: 'dropdown' | 'buttons' | 'compact';
}

export function LanguageSelector({
    className = '',
    showLabel = true,
    variant = 'dropdown'
}: LanguageSelectorProps) {
    const { language, setLanguage, availableLanguages } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (newLanguage: SupportedLanguage) => {
        setLanguage(newLanguage);
        setIsOpen(false);
    };

    const currentLanguage = SUPPORTED_LANGUAGES[language];

    if (variant === 'buttons') {
        return (
            <div className={`flex flex-wrap gap-2 ${className}`}>
                {showLabel && (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Idioma:
                    </span>
                )}
                {availableLanguages.map((langCode) => {
                    const lang = SUPPORTED_LANGUAGES[langCode];
                    const isActive = langCode === language;

                    return (
                        <button
                            key={langCode}
                            onClick={() => handleLanguageChange(langCode)}
                            className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                }
              `}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.nativeName}</span>
                            {isActive && <Check className="w-4 h-4" />}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <Globe className="w-4 h-4 text-gray-500" />
                <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                    className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 border-none outline-none cursor-pointer"
                >
                    {availableLanguages.map((langCode) => {
                        const lang = SUPPORTED_LANGUAGES[langCode];
                        return (
                            <option key={langCode} value={langCode}>
                                {lang.flag} {lang.nativeName}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {showLabel && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Idioma
                </label>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
          flex items-center justify-between w-full px-4 py-3 rounded-lg border
          bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600
          hover:border-gray-400 dark:hover:border-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors
        `}
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">{currentLanguage.flag}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {currentLanguage.nativeName}
                    </span>
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <>
                    {/* Overlay para fechar ao clicar fora */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Lista de idiomas */}
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                        {availableLanguages.map((langCode) => {
                            const lang = SUPPORTED_LANGUAGES[langCode];
                            const isActive = langCode === language;

                            return (
                                <button
                                    key={langCode}
                                    onClick={() => handleLanguageChange(langCode)}
                                    className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700
                    transition-colors first:rounded-t-lg last:rounded-b-lg
                    ${isActive ? 'bg-blue-50 dark:bg-blue-900' : ''}
                  `}
                                >
                                    <span className="text-xl">{lang.flag}</span>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                            {lang.nativeName}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {lang.name}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

export default LanguageSelector;


