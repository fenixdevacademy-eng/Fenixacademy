// Índice principal do sistema de internacionalização
export { useTranslation } from './useTranslation';

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

export const getLanguageByCode = (code: string): Language | undefined => {
  return supportedLanguages.find(lang => lang.code === code);
};

export const getDefaultLanguage = (): Language => {
  return supportedLanguages[0]; // pt-BR
};

export const detectLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language || navigator.languages[0];
    const supportedCode = supportedLanguages.find(lang => 
      browserLang.startsWith(lang.code.split('-')[0])
    );
    return supportedCode?.code || 'pt-BR';
  }
  return 'pt-BR';
};
