// Internationalization configuration
export interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
}

export const supportedLanguages: Language[] = [
    {
        code: 'pt-BR',
        name: 'Portuguese (Brazil)',
        nativeName: 'Português (Brasil)',
        flag: '🇧🇷'
    },
    {
        code: 'en-US',
        name: 'English (US)',
        nativeName: 'English (US)',
        flag: '🇺🇸'
    },
    {
        code: 'es-ES',
        name: 'Spanish (Spain)',
        nativeName: 'Español (España)',
        flag: '🇪🇸'
    }
];

export const getBrowserLanguage = (): string => {
    if (typeof window === 'undefined') return 'pt-BR';

    const browserLang = navigator.language || 'pt-BR';
    const supportedCode = supportedLanguages.find(lang =>
        browserLang.startsWith(lang.code.split('-')[0])
    );

    return supportedCode?.code || 'pt-BR';
};

export const getLanguageByCode = (code: string): Language | undefined => {
    return supportedLanguages.find(lang => lang.code === code);
};