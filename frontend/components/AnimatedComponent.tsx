'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedComponentProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounce';
    delay?: number;
    duration?: number;
    onAnimationComplete?: () => void;
}

export default function AnimatedComponent({
    children,
    className = '',
    animation = 'fadeIn',
    delay = 0,
    duration = 0.5,
    onAnimationComplete
}: AnimatedComponentProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (delay && delay > 0) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                if (onAnimationComplete) {
                    setTimeout(onAnimationComplete, duration * 1000);
                }
            }, delay * 1000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
            if (onAnimationComplete) {
                setTimeout(onAnimationComplete, duration * 1000);
            }
        }
    }, [delay, duration, onAnimationComplete]);

    const getAnimationClasses = () => {
        const baseClasses = `transition-all duration-${Math.round(duration * 1000)} ease-out`;
        switch (animation) {
            case 'fadeIn':
                return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
            case 'slideUp':
                return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
            case 'slideLeft':
                return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`;
            case 'slideRight':
                return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`;
            case 'scaleIn':
                return `${baseClasses} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
            case 'bounce':
                return `${baseClasses} ${isVisible ? 'opacity-100 animate-bounce' : 'opacity-0'}`;
            default:
                return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
        }
    }

    return (
        <div className={`${getAnimationClasses()} ${className}`}>
            {children}
        </div>
    );
}