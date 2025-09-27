'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

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

                if (triggerOnce) {
                    setAnimationState(prev => ({
                        ...prev,
                        hasAnimated: true
                    }));
                }
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
            observer.unobserve(ref);
        };
    }, [ref, handleIntersection, threshold, rootMargin]);

    const resetAnimation = useCallback(() => {
        setAnimationState({
            isVisible: false,
            hasAnimated: false
        });
    }, []);

    const triggerAnimation = useCallback(() => {
        setAnimationState(prev => ({
            ...prev,
            isVisible: true,
            hasAnimated: true
        }));
    }, []);

    return {
        ref: setRef,
        isVisible: animationState.isVisible,
        hasAnimated: animationState.hasAnimated,
        resetAnimation,
        triggerAnimation
    };
};

// Hook para animações de fade
export const useFadeAnimation = (options: UseAnimationOptions = {}) => {
    const animation = useAnimation(options);

    return {
        ...animation,
        className: `transition-opacity duration-1000 ${animation.isVisible ? 'opacity-100' : 'opacity-0'
            }`
    };
};

// Hook para animações de slide
export const useSlideAnimation = (direction: 'up' | 'down' | 'left' | 'right' = 'up', options: UseAnimationOptions = {}) => {
    const animation = useAnimation(options);

    const getTransform = () => {
        if (!animation.isVisible) {
            switch (direction) {
                case 'up': return 'translateY(20px)';
                case 'down': return 'translateY(-20px)';
                case 'left': return 'translateX(20px)';
                case 'right': return 'translateX(-20px)';
                default: return 'translateY(20px)';
            }
        }
        return 'translateY(0)';
    };

    return {
        ...animation,
        className: `transition-transform duration-700 ease-out ${animation.isVisible ? 'transform-none' : ''
            }`,
        style: {
            transform: getTransform()
        }
    };
};