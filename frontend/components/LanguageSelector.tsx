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

export default function LanguageSelector({
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
                {availableLanguages.map((lang) => {
                    const langData = SUPPORTED_LANGUAGES[lang];
                    return (
                        <button
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${language === lang
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {langData.flag} {langData.name}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {showLabel && (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Idioma:
                    </span>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                    <span className="text-sm">{currentLanguage.flag}</span>
                    <span className="text-sm font-medium">{currentLanguage.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLanguage.flag}</span>
                <span className="text-sm">{currentLanguage.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dark:bg-gray-800 dark:border-gray-600">
                    <div className="py-1">
                        {availableLanguages.map((lang) => {
                            const langData = SUPPORTED_LANGUAGES[lang];
                            return (
                                <button
                                    key={lang}
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${language === lang ? 'bg-blue-50 dark:bg-blue-900' : ''
                                        }`}
                                >
                                    <span className="text-lg">{langData.flag}</span>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {langData.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {langData.nativeName}
                                        </div>
                                    </div>
                                    {language === lang && (
                                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Overlay to close dropdown when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}