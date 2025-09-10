import { NextRequest, NextResponse } from 'next/server';

interface TranslateRequest {
    text: string;
    from: string;
    to: string;
}

interface TranslateResponse {
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
}

// Mapeamento de idiomas para códigos da API
const LANGUAGE_MAP: Record<string, string> = {
    'pt': 'pt',
    'en': 'en',
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'it': 'it',
    'ja': 'ja',
    'ko': 'ko',
    'zh': 'zh',
    'ru': 'ru',
    'ar': 'ar',
    'auto': 'auto'
};

// Traduções básicas para demonstração
const BASIC_TRANSLATIONS: Record<string, Record<string, string>> = {
    'pt': {
        'en': 'Hello, welcome to Fenix Academy!',
        'es': '¡Hola, bienvenido a Fenix Academy!',
        'fr': 'Bonjour, bienvenue à Fenix Academy!',
        'de': 'Hallo, willkommen bei Fenix Academy!',
        'it': 'Ciao, benvenuto a Fenix Academy!',
        'ja': 'こんにちは、Fenix Academyへようこそ！',
        'ko': '안녕하세요, Fenix Academy에 오신 것을 환영합니다!',
        'zh': '你好，欢迎来到Fenix Academy！',
        'ru': 'Привет, добро пожаловать в Fenix Academy!',
        'ar': 'مرحباً، أهلاً بك في أكاديمية فينيكس!'
    },
    'en': {
        'pt': 'Olá, bem-vindo à Fenix Academy!',
        'es': '¡Hola, bienvenido a Fenix Academy!',
        'fr': 'Bonjour, bienvenue à Fenix Academy!',
        'de': 'Hallo, willkommen bei Fenix Academy!',
        'it': 'Ciao, benvenuto a Fenix Academy!',
        'ja': 'こんにちは、Fenix Academyへようこそ！',
        'ko': '안녕하세요, Fenix Academy에 오신 것을 환영합니다!',
        'zh': '你好，欢迎来到Fenix Academy！',
        'ru': 'Привет, добро пожаловать в Fenix Academy!',
        'ar': 'مرحباً، أهلاً بك في أكاديمية فينيكس!'
    }
};

export async function POST(request: NextRequest) {
    try {
        const body: TranslateRequest = await request.json();
        const { text, from, to } = body;

        if (!text || !from || !to) {
            return NextResponse.json(
                { error: 'Missing required fields: text, from, to' },
                { status: 400 }
            );
        }

        // Normalizar códigos de idioma
        const sourceLang = LANGUAGE_MAP[from] || from;
        const targetLang = LANGUAGE_MAP[to] || to;

        // Se for a mesma linguagem, retornar o texto original
        if (sourceLang === targetLang) {
            return NextResponse.json({
                translatedText: text,
                sourceLanguage: sourceLang,
                targetLanguage: targetLang
            } as TranslateResponse);
        }

        // Em produção, usar uma API real de tradução como Google Translate, DeepL, etc.
        // Por enquanto, usar traduções básicas ou simular
        let translatedText = text;

        // Verificar se temos uma tradução básica
        if (BASIC_TRANSLATIONS[sourceLang] && BASIC_TRANSLATIONS[sourceLang][targetLang]) {
            translatedText = BASIC_TRANSLATIONS[sourceLang][targetLang];
        } else if (BASIC_TRANSLATIONS[targetLang] && BASIC_TRANSLATIONS[targetLang][sourceLang]) {
            // Tentar tradução reversa
            translatedText = BASIC_TRANSLATIONS[targetLang][sourceLang];
        } else {
            // Simular tradução com placeholder
            translatedText = `[${targetLang.toUpperCase()}] ${text}`;
        }

        // Simular delay da API
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({
            translatedText,
            sourceLanguage: sourceLang,
            targetLanguage: targetLang
        } as TranslateResponse);

    } catch (error) {
        console.error('Translation API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Endpoint para obter idiomas suportados
export async function GET() {
    const supportedLanguages = [
        { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇧🇷' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
        { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪' },
        { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹' },
        { code: 'ja', name: '日本語', nativeName: '日本語', flag: '🇯🇵' },
        { code: 'ko', name: '한국어', nativeName: '한국어', flag: '🇰🇷' },
        { code: 'zh', name: '中文', nativeName: '中文', flag: '🇨🇳' },
        { code: 'ru', name: 'Русский', nativeName: 'Русский', flag: '🇷🇺' },
        { code: 'ar', name: 'العربية', nativeName: 'العربية', flag: '🇸🇦' }
    ];

    return NextResponse.json({ languages: supportedLanguages });
}


