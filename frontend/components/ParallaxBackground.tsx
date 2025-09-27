'use client';

/**
 * Componente de fundo com efeito parallax
 * Cria profundidade visual com elementos em movimento
 */

import React, { useEffect, useRef } from 'react';

interface ParallaxBackgroundProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

export default function ParallaxBackground({
    children,
    speed = 0.5,
    className = ''
}: ParallaxBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -speed;
                containerRef.current.style.transform = `translateY(${rate}px)`;
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 ${className}`}
            style={{ willChange: 'transform' }}
        >
            {children}
        </div>
    );
}

