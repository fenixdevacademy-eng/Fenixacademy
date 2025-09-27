'use client';

/**
 * Componente de contador animado
 * Anima números de forma suave e elegante
 */

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    delay?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export default function AnimatedCounter({
    value,
    duration = 2000,
    delay = 0,
    className = '',
    prefix = '',
    suffix = '',
    decimals = 0
}: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    startAnimation();
                }
            },
            { threshold: 0.1 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    const startAnimation = () => {
        setTimeout(() => {
            const startTime = Date.now();
            const startValue = 0;
            const endValue = value;

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = startValue + (endValue - startValue) * easeOut;

                setDisplayValue(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setDisplayValue(endValue);
                }
            }

            requestAnimationFrame(animate);
        }, delay);
    }

    const formatValue = (val: number) => {
        const formatted = val.toFixed(decimals);
        return `${prefix}${formatted}${suffix}`;
    }

    return (
        <span ref={counterRef} className={className}>
            {formatValue(displayValue)}
        </span>
    );
}

