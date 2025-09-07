'use client';

import { useState, useEffect, useCallback } from 'react';

interface AnimationState {
    isVisible: boolean;
    hasAnimated: boolean;
}

interface UseAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export const useAnimation = (options: UseAnimationOptions = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true
    } = options;

    const [animationState, setAnimationState] = useState<AnimationState>({
        isVisible: false,
        hasAnimated: false
    });

    const [ref, setRef] = useState<HTMLElement | null>(null);

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setAnimationState(prev => ({
                    ...prev,
                    isVisible: true
                }));
            } else if (!triggerOnce) {
                setAnimationState(prev => ({
                    ...prev,
                    isVisible: false
                }));
            }
        });
    }, [triggerOnce]);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin
        });

        observer.observe(ref);

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }
        };
    }, [ref, handleIntersection, threshold, rootMargin]);

    const controls = {
        start: () => setAnimationState(prev => ({ ...prev, isVisible: true })),
        stop: () => setAnimationState(prev => ({ ...prev, isVisible: false })),
        reset: () => setAnimationState({ isVisible: false, hasAnimated: false })
    };

    return {
        ref: setRef,
        isVisible: animationState.isVisible,
        hasAnimated: animationState.hasAnimated,
        controls
    };
};

export const useHoverAnimation = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return {
        isHovered,
        hoverProps: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave
        }
    };
};

export const useScrollAnimation = (direction: 'up' | 'down' = 'up') => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getTransform = () => {
        const factor = direction === 'up' ? -1 : 1;
        return `translateY(${scrollY * 0.1 * factor}px)`;
    };

    return {
        scrollY,
        transform: getTransform()
    };
}; 