'use client';

import React from 'react';

interface FenixLogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function FenixLogo({ size = 'md', className = '' }: FenixLogoProps) {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    };

    return (
        <div className={`flex items-center ${className}`}>
            <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                F
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Fenix Academy</span>
        </div>
    );
}