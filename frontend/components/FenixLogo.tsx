'use client';

/**
 * Logo oficial da Fênix Dev Academy
 * Componente SVG responsivo e otimizado
 */

import React from 'react';

interface FenixLogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    variant?: 'full' | 'icon' | 'text';
    className?: string;
    showText?: boolean;
}

const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
}

const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
}

export default function FenixLogo({
    size = 'md',
    variant = 'full',
    className = '',
    showText = true
}: FenixLogoProps) {
    const iconSize = sizeClasses[size];
    const textSize = textSizeClasses[size];

    const PhoenixIcon = () => (
        <svg
            viewBox="0 0 100 100"
            className={`${iconSize} ${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Cabeça e pescoço */}
            <path
                d="M25 35 C25 25, 35 20, 45 25 C50 27, 55 30, 60 35"
                fill="url(#phoenixGradient1)"
                stroke="url(#phoenixGradient1)"
                strokeWidth="2"
            />

            {/* Corpo */}
            <path
                d="M45 35 C45 40, 50 45, 55 50 C50 55, 45 60, 40 65"
                fill="url(#phoenixGradient2)"
                stroke="url(#phoenixGradient2)"
                strokeWidth="2"
            />

            {/* Asa esquerda */}
            <path
                d="M25 35 C15 30, 10 20, 15 10 C20 5, 30 8, 35 15 C30 20, 25 25, 25 35"
                fill="url(#phoenixGradient3)"
                stroke="url(#phoenixGradient3)"
                strokeWidth="2"
            />

            {/* Asa direita */}
            <path
                d="M60 35 C70 30, 80 20, 75 10 C70 5, 60 8, 55 15 C60 20, 60 25, 60 35"
                fill="url(#phoenixGradient4)"
                stroke="url(#phoenixGradient4)"
                strokeWidth="2"
            />

            {/* Cauda */}
            <path
                d="M40 65 C30 70, 20 75, 15 80 C10 85, 5 90, 10 95 C15 90, 20 85, 25 80 C30 75, 35 70, 40 65"
                fill="url(#phoenixGradient5)"
                stroke="url(#phoenixGradient5)"
                strokeWidth="2"
            />

            {/* Olho */}
            <circle
                cx="50"
                cy="30"
                r="3"
                fill="#FFFFFF"
            />

            {/* Gradientes */}
            <defs>
                <linearGradient id="phoenixGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>

                <linearGradient id="phoenixGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E40AF" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>

                <linearGradient id="phoenixGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>

                <linearGradient id="phoenixGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>

                <linearGradient id="phoenixGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="30%" stopColor="#EC4899" />
                    <stop offset="60%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>
            </defs>
        </svg>
    );

    if (variant === 'icon') {
        return <PhoenixIcon />;
    }

    if (variant === 'text') {
        return (
            <div className={`flex flex-col items-center ${className}`}>
                <div className={`font-bold text-white ${textSize}`}>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        FÊNIX DEV
                    </span>
                </div>
                <div className={`font-bold text-white ${textSize} -mt-1`}>
                    ACADEMY
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <PhoenixIcon />
            {showText && (
                <div className="flex flex-col">
                    <div className={`font-bold text-white ${textSize}`}>
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            FÊNIX DEV
                        </span>
                    </div>
                    <div className={`font-bold text-white ${textSize} -mt-1`}>
                        ACADEMY
                    </div>
                </div>
            )}
        </div>
    );
}

