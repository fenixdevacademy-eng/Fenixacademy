'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { SupportedLanguage } from '@/lib/i18n';

interface TranslatedContentProps {
    content: string;
    sourceLanguage?: string;
    targetLanguage?: string;
    className?: string;
    showOriginal?: boolean;
    showTranslation?: boolean;
    autoTranslate?: boolean;
    onTranslationComplete?: (translatedContent: string) => void;
}

export function TranslatedContent({
    content,
    sourceLanguage = 'auto',
    targetLanguage,
    className = '',
    showOriginal = true,
    showTranslation = true,
    autoTranslate = false,
    onTranslationComplete
}: TranslatedContentProps) {
    const { t, language } = useTranslation();
    const [translatedContent, setTranslatedContent] = useState<string>('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [translationError, setTranslationError] = useState<string | null>(null);
    const [showBoth, setShowBoth] = useState(false);

    const finalTargetLanguage = targetLanguage || language;

    // Função para traduzir conteúdo
    const translateContent = async (text: string, from: string, to: string) => {
        try {
            setIsTranslating(true);
            setTranslationError(null);

            // Simular tradução (em produção, usar API real)
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    from,
                    to
                })
            });

            if (!response.ok) {
                throw new Error('Translation failed');
            }

            const data = await response.json();
            return data.translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            setTranslationError(t('errors.translation', 'Erro na tradução'));
            return text; // Retornar texto original em caso de erro
        } finally {
            setIsTranslating(false);
        }
    };

    // Traduzir automaticamente se habilitado
    useEffect(() => {
        if (autoTranslate && content && finalTargetLanguage !== sourceLanguage) {
            translateContent(content, sourceLanguage, finalTargetLanguage)
                .then(translated => {
                    setTranslatedContent(translated);
                    onTranslationComplete?.(translated);
                });
        }
    }, [content, sourceLanguage, finalTargetLanguage, autoTranslate, onTranslationComplete]);

    // Função para alternar entre original e tradução
    const toggleView = () => {
        setShowBoth(!showBoth);
    };

    // Função para traduzir manualmente
    const handleTranslate = async () => {
        if (content && finalTargetLanguage !== sourceLanguage) {
            const translated = await translateContent(content, sourceLanguage, finalTargetLanguage);
            setTranslatedContent(translated);
            onTranslationComplete?.(translated);
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Controles */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('common.language', 'Idioma')}: {finalTargetLanguage.toUpperCase()}
                    </span>
                    {isTranslating && (
                        <div className="flex items-center gap-2 text-blue-600">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">{t('common.translating', 'Traduzindo...')}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {!autoTranslate && (
                        <button
                            onClick={handleTranslate}
                            disabled={isTranslating}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {t('common.translate', 'Traduzir')}
                        </button>
                    )}

                    {showOriginal && showTranslation && (
                        <button
                            onClick={toggleView}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            {showBoth ? t('common.showTranslation', 'Mostrar Tradução') : t('common.showBoth', 'Mostrar Ambos')}
                        </button>
                    )}
                </div>
            </div>

            {/* Conteúdo original */}
            {showOriginal && (showBoth || !showTranslation) && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('common.original', 'Original')} ({sourceLanguage.toUpperCase()})
                    </h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                            {content}
                        </p>
                    </div>
                </div>
            )}

            {/* Conteúdo traduzido */}
            {showTranslation && (showBoth || !showOriginal) && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('common.translation', 'Tradução')} ({finalTargetLanguage.toUpperCase()})
                    </h4>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                        {translationError ? (
                            <p className="text-red-600 dark:text-red-400">{translationError}</p>
                        ) : (
                            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                                {translatedContent || content}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Erro de tradução */}
            {translationError && (
                <div className="p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm">
                        {translationError}
                    </p>
                </div>
            )}
        </div>
    );
}

// Componente para legendas de vídeo
export function VideoSubtitles({
    subtitles,
    currentTime,
    className = ''
}: {
    subtitles: Array<{
        startTime: number;
        endTime: number;
        text: string;
        language: string;
    }>;
    currentTime: number;
    className?: string;
}) {
    const { language } = useTranslation();

    // Filtrar legendas pelo idioma atual
    const currentSubtitles = subtitles.filter(sub => sub.language === language);

    // Encontrar legenda atual
    const currentSubtitle = currentSubtitles.find(
        sub => currentTime >= sub.startTime && currentTime <= sub.endTime
    );

    if (!currentSubtitle) {
        return null;
    }

    return (
        <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black bg-opacity-75 text-white text-center rounded-lg max-w-4xl ${className}`}>
            <p className="text-lg font-medium">{currentSubtitle.text}</p>
        </div>
    );
}

// Componente para legendas de áudio
export function AudioSubtitles({
    subtitles,
    currentTime,
    className = ''
}: {
    subtitles: Array<{
        startTime: number;
        endTime: number;
        text: string;
        language: string;
    }>;
    currentTime: number;
    className?: string;
}) {
    const { language } = useTranslation();

    // Filtrar legendas pelo idioma atual
    const currentSubtitles = subtitles.filter(sub => sub.language === language);

    // Encontrar legenda atual
    const currentSubtitle = currentSubtitles.find(
        sub => currentTime >= sub.startTime && currentTime <= sub.endTime
    );

    if (!currentSubtitle) {
        return null;
    }

    return (
        <div className={`p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center ${className}`}>
            <p className="text-gray-900 dark:text-white">{currentSubtitle.text}</p>
        </div>
    );
}

export default TranslatedContent;


