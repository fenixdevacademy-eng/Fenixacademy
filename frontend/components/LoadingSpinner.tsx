'use client';

/**
 * Componente de Loading Spinner reutilizável
 * Diferentes tamanhos e estilos para diferentes contextos
 */

import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'secondary' | 'white' | 'gray';
    text?: string;
    className?: string;
}

export default function LoadingSpinner({
    size = 'md',
    color = 'primary',
    text,
    className = ''
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
    }

    const colorClasses = {
        primary: 'text-blue-500',
        secondary: 'text-purple-500',
        white: 'text-white',
        gray: 'text-gray-500'
    }

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}></div>
            {text && (
                <p className={`mt-2 text-sm ${colorClasses[color]}`}>
                    {text}
                </p>
            )}
        </div>
    );
}

// Componente específico para páginas
export function PageLoadingSpinner({ text = 'Carregando...' }: { text?: string }) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <LoadingSpinner size="xl" color="primary" text={text} />
        </div>
    );
}

// Componente específico para cards
export function CardLoadingSpinner() {
    return (
        <div className="flex items-center justify-center p-8">
            <LoadingSpinner size="lg" color="primary" text="Carregando conteúdo..." />
        </div>
    );
}

// Componente específico para botões
export function ButtonLoadingSpinner({ text }: { text?: string }) {
    return (
        <div className="flex items-center justify-center">
            <LoadingSpinner size="sm" color="white" text={text} />
        </div>
    );
}
