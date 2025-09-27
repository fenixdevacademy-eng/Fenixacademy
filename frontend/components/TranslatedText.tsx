'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface TranslatedTextProps {
    translationKey: string;
    values?: Record<string, any>;
    count?: number;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

export function TranslatedText({
    translationKey,
    values = {},
    count,
    className = '',
    as: Component = 'span',
    ...props
}: TranslatedTextProps) {
    const { t } = useTranslation();

    const translatedText = t(translationKey, { ...values, count });

    return (
        <Component
            className={className}
            {...props}
        >
            {translatedText}
        </Component>
    );
}

// Componente para botões traduzidos
export function TranslatedButton({
    translationKey,
    values = {},
    className = '',
    ...props
}: TranslatedTextProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            as="button"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
            {...props}
        />
    );
}

// Componente para labels traduzidos
export function TranslatedLabel({
    translationKey,
    values = {},
    className = '',
    ...props
}: TranslatedTextProps & React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            as="label"
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
            {...props}
        />
    );
}

// Componente para títulos traduzidos
export function TranslatedHeading({
    translationKey,
    values = {},
    level = 1,
    className = '',
    ...props
}: TranslatedTextProps & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.HTMLAttributes<HTMLHeadingElement>) {
    const headingClasses = {
        1: 'text-3xl font-bold',
        2: 'text-2xl font-semibold',
        3: 'text-xl font-semibold',
        4: 'text-xl font-semibold',
        5: 'text-lg font-medium',
        6: 'text-base font-medium'
    };

    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            as={`h${level}` as keyof JSX.IntrinsicElements}
            className={`${headingClasses[level]} ${className}`}
            {...props}
        />
    );
}

// Componente para parágrafos traduzidos
export function TranslatedParagraph({
    translationKey,
    values = {},
    className = '',
    ...props
}: TranslatedTextProps & React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            as="p"
            className={`text-gray-700 dark:text-gray-300 ${className}`}
            {...props}
        />
    );
}

// Componente para spans traduzidos
export function TranslatedSpan({
    translationKey,
    values = {},
    className = '',
    ...props
}: TranslatedTextProps & React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            as="span"
            className={className}
            {...props}
        />
    );
}

// Hook para tradução simples
export function useTranslatedText(translationKey: string, values: Record<string, any> = {}, count?: number) {
    const { t } = useTranslation();
    return t(translationKey, { ...values, count });
}