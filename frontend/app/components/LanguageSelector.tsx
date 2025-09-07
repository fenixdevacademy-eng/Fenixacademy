'use client';

import React, { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
    onLanguageChange: (language: string) => void;
    currentLanguage: string;
}

const languages = [
    {
        code: 'pt-BR',
        name: 'Português',
        flag: '🇧🇷',
        nativeName: 'Português'
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
        code: 'de',
        name: 'Deutsch',
        flag: '🇩🇪',
        nativeName: 'Deutsch'
    }
];

export default function LanguageSelector({ onLanguageChange, currentLanguage }: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

    const handleLanguageSelect = (languageCode: string) => {
        onLanguageChange(languageCode);
        setIsOpen(false);
    };

    // Verificação de segurança para evitar erros de linter
    if (!currentLang) {
        return null;
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{currentLang.flag}</span>
                <span className="text-sm text-gray-700">{currentLang.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageSelect(language.code)}
                                className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors ${currentLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">{language.flag}</span>
                                    <div>
                                        <div className="font-medium">{language.name}</div>
                                        <div className="text-xs text-gray-500">{language.nativeName}</div>
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
        </div>
    );
}
