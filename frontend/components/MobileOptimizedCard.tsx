'use client'

import React from 'react'

interface MobileOptimizedCardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
    glow?: boolean
    simplified?: boolean
    onClick?: () => void
}

export default function MobileOptimizedCard({
    children,
    className = '',
    hover = true,
    glow = false,
    simplified = false,
    onClick
}: MobileOptimizedCardProps) {
    const baseClasses = `
    relative overflow-hidden
    ${simplified
            ? 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4'
            : 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6'
        }
    ${hover ? 'hover:bg-white/15 hover:border-white/30' : ''}
    transition-all duration-300 ease-out
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim()

    return (
        <div
            className={`${baseClasses} ${hover ? 'hover:scale-105 hover:-translate-y-1' : ''} ${onClick ? 'active:scale-95' : ''} animate-fade-in-up`}
            onClick={onClick}
        >
            {glow && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm -z-10" />
            )}

            {children}
        </div>
    )
}


