'use client';

import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
    onLanguageChange: (language: string) => void;
    currentLanguage: string;
    className?: string;
}

const languages = [
    {
        code: 'pt',
        name: 'Português',
        flag: '🇧🇷',
        nativeName: 'Português (Brasil)'
    },
    {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
        nativeName: 'English'
    },
    {
        code: 'es',
        name: 'Español',
        flag: '🇪🇸',
        nativeName: 'Español'
    },
    {
        code: 'fr',
        name: 'Français',
        flag: '🇫🇷',
        nativeName: 'Français'
    },
    {
        code: 'de',
        name: 'Deutsch',
        flag: '🇩🇪',
        nativeName: 'Deutsch'
    },
    {
        code: 'it',
        name: 'Italiano',
        flag: '🇮🇹',
        nativeName: 'Italiano'
    },
    {
        code: 'ja',
        name: '日本語',
        flag: '🇯🇵',
        nativeName: '日本語'
    },
    {
        code: 'ko',
        name: '한국어',
        flag: '🇰🇷',
        nativeName: '한국어'
    },
    {
        code: 'zh',
        name: '中文',
        flag: '🇨🇳',
        nativeName: '中文'
    }
];

export default function LanguageSelector({
    onLanguageChange,
    currentLanguage,
    className = ''
}: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

    const handleLanguageSelect = (languageCode: string) => {
        onLanguageChange(languageCode);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLang.flag}</span>
                <span className="text-sm">{currentLang.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageSelect(language.code)}
                                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 ${currentLanguage === language.code ? 'bg-blue-50' : ''
                                    }`}
                            >
                                <span className="text-lg">{language.flag}</span>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">
                                        {language.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {language.nativeName}
                                    </div>
                                </div>
                                {currentLanguage === language.code && (
                                    <Check className="w-4 h-4 text-blue-600" />
                                )}
                            </button>
                        ))}
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