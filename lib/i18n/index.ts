export interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
}

export const supportedLanguages: Language[] = [
    {
        code: 'pt-BR',
        name: 'Português (Brasil)',
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

export const getDefaultLanguage = (): Language => {
    return supportedLanguages[0]; // Português como padrão
};

export const detectLanguage = (): string => {
    if (typeof window !== 'undefined') {
        const browserLang = navigator.language || 'pt-BR';
        const supportedCode = supportedLanguages.find(lang =>
            browserLang.startsWith(lang.code.split('-')[0])
        );
        return supportedCode?.code || 'pt-BR';
    }
    return 'pt-BR';
};









