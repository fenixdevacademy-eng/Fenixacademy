'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface TranslatedTextProps {
    translationKey: string;
    values?: Record<string, any>;
    count?: number;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    children?: React.ReactNode;
    fallback?: string;
}

export function TranslatedText({
    translationKey,
    values = {},
    count,
    className = '',
    as: Component = 'span',
    children,
    fallback
}: TranslatedTextProps) {
    const { t } = useTranslation();

    const text = t(translationKey, { ...values, count });

    return (
        <Component className={className}>
            {text || fallback || children || translationKey}
        </Component>
    );
}

// Componentes específicos para casos comuns
export function TranslatedButton({
    translationKey,
    values,
    count,
    className = '',
    children,
    ...props
}: TranslatedTextProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            count={count}
            as="button"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
            children={children}
            {...props}
        />
    );
}

export function TranslatedLabel({
    translationKey,
    values,
    count,
    className = '',
    children,
    ...props
}: TranslatedTextProps & React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            count={count}
            as="label"
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
            children={children}
            {...props}
        />
    );
}

export function TranslatedHeading({
    translationKey,
    values,
    count,
    level = 1,
    className = '',
    children,
    ...props
}: TranslatedTextProps & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.HTMLAttributes<HTMLHeadingElement>) {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    const headingClasses = {
        1: 'text-4xl font-bold',
        2: 'text-3xl font-bold',
        3: 'text-2xl font-semibold',
        4: 'text-xl font-semibold',
        5: 'text-lg font-medium',
        6: 'text-base font-medium'
    };

    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            count={count}
            as={HeadingTag}
            className={`${headingClasses[level]} ${className}`}
            children={children}
            {...props}
        />
    );
}

export function TranslatedParagraph({
    translationKey,
    values,
    count,
    className = '',
    children,
    ...props
}: TranslatedTextProps & React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            count={count}
            as="p"
            className={`text-gray-700 dark:text-gray-300 ${className}`}
            children={children}
            {...props}
        />
    );
}

export function TranslatedSpan({
    translationKey,
    values,
    count,
    className = '',
    children,
    ...props
}: TranslatedTextProps & React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <TranslatedText
            translationKey={translationKey}
            values={values}
            count={count}
            as="span"
            className={className}
            children={children}
            {...props}
        />
    );
}

// Hook para usar em componentes customizados
export function useTranslatedText(translationKey: string, values?: Record<string, any>, count?: number) {
    const { t } = useTranslation();
    return t(translationKey, { ...values, count });
}

export default TranslatedText;


