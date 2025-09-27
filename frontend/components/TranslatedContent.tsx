'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface TranslatedContentProps {
    translationKey: string;
    fallback?: string;
    className?: string;
    children?: React.ReactNode;
}

export function TranslatedContent({
    translationKey,
    fallback = '',
    className = '',
    children
}: TranslatedContentProps) {
    const { t, locale } = useTranslation();
    const [translatedContent, setTranslatedContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const translateContent = async () => {
            if (!translationKey) return;

            setIsLoading(true);
            setError(null);

            try {
                // Simular tradução via API
                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: translationKey,
                        from: 'pt',
                        to: locale.split('-')[0]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    setTranslatedContent(data.translatedText || fallback);
                } else {
                    setTranslatedContent(fallback);
                }
            } catch (err) {
                console.error('Translation error:', err);
                setTranslatedContent(fallback);
                setError('Erro na tradução');
            } finally {
                setIsLoading(false);
            }
        };

        translateContent();
    }, [translationKey, locale, fallback]);

    if (isLoading) {
        return (
            <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-4 ${className}`}>
                <div className="h-full bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`text-red-500 text-sm ${className}`}>
                {error}
            </div>
        );
    }

    return (
        <div className={className}>
            {translatedContent || fallback}
            {children}
        </div>
    );
}

// Componente para legendas de vídeo
export function VideoSubtitles({
    text,
    className = ''
}: {
    text: string;
    className?: string;
}) {
    return (
        <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black bg-opacity-75 text-white text-center rounded-lg max-w-4xl ${className}`}>
            {text}
        </div>
    );
}

// Componente para conteúdo de erro
export function ErrorContent({
    message,
    className = ''
}: {
    message: string;
    className?: string;
}) {
    return (
        <div className={`p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center ${className}`}>
            <p className="text-red-500">{message}</p>
        </div>
    );
}