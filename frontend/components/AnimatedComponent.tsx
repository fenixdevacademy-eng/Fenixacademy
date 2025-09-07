'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedComponentProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounce';
    delay?: number;
    duration?: number;
    onAnimationComplete?: () => void;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
    children,
    className = '',
    animation = 'fadeIn',
    delay = 0,
    duration = 0.5,
    onAnimationComplete
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (delay && delay > 0) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, delay * 1000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
        }
    }, [delay]);

    useEffect(() => {
        if (isVisible && onAnimationComplete) {
            const timer = setTimeout(() => {
                onAnimationComplete();
            }, duration * 1000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onAnimationComplete]);

    const getAnimationClasses = () => {
        const baseClasses = 'transition-all ease-out';

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
                return baseClasses;
        }
    };

    return (
        <div
            className={`${getAnimationClasses()} ${className}`}
            style={{ transitionDuration: `${duration}s` }}
        >
            {children}
        </div>
    );
};

export default AnimatedComponent; 