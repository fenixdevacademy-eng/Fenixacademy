'use client';

﻿/**
 * Sistema de otimização de performance
 * Lazy loading, debouncing, throttling e cache
 */

import React, { useCallback, useRef, useEffect, useState } from 'react';

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// Throttle hook
export function useThrottle<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): T {
    const lastRun = useRef(Date.now());

    return useCallback(
        (...args: Parameters<T>) => {
            if (Date.now() - lastRun.current >= delay) {
                lastRun.current = Date.now();
                return callback(...args);
            }
        },
        [callback, delay]
    ) as T;
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
    elementRef: React.RefObject<Element>,
    options?: IntersectionObserverInit
) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            options
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [elementRef, options]);

    return isIntersecting;
}

// Virtual scrolling hook
export function useVirtualScroll<T>(
    items: T[],
    itemHeight: number,
    containerHeight: number
) {
    const [scrollTop, setScrollTop] = useState(0);

    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        startIndex + Math.ceil(containerHeight / itemHeight) + 1,
        items.length
    );

    const visibleItems = items.slice(startIndex, endIndex);
    const totalHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;

    return {
        visibleItems,
        totalHeight,
        offsetY,
        setScrollTop
    };
}

// Memory cache
class MemoryCache {
    private cache = new Map<string, { value: any; timestamp: number; ttl: number }>();

    set(key: string, value: any, ttl: number = 300000) { // 5 minutes default
        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            ttl
        });
    }

    get(key: string): any | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > item.ttl) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    clear() {
        this.cache.clear();
    }

    size() {
        return this.cache.size;
    }
}

export const memoryCache = new MemoryCache();

// Image lazy loading
export function useLazyImage(src: string, placeholder?: string) {
    const [imageSrc, setImageSrc] = useState(placeholder || '');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const img = new Image();

        img.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
            setIsError(false);
        };

        img.onerror = () => {
            setIsError(true);
            setIsLoaded(false);
        };

        img.src = src;
    }, [src]);

    return { imageSrc, isLoaded, isError };
}

// Component lazy loading
export function lazyLoadComponent<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
) {
    return React.lazy(importFunc);
}

// Bundle analyzer
export function analyzeBundle() {
    if (typeof window === 'undefined') return null;

    const performance = window.performance;
    if (!performance || !performance.getEntriesByType) return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        totalTime: navigation.loadEventEnd - navigation.fetchStart
    };
}

// Resource hints
export function preloadResource(href: string, as: string, type?: string) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
}

export function prefetchResource(href: string) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
}

// Performance monitoring
export function usePerformanceMonitor() {
    const [metrics, setMetrics] = useState<any>(null);

    useEffect(() => {
        const updateMetrics = () => {
            const analysis = analyzeBundle();
            if (analysis) {
                setMetrics(analysis);
            }
        };

        // Update metrics after page load
        if (document.readyState === 'complete') {
            updateMetrics();
        } else {
            window.addEventListener('load', updateMetrics);
        }

        return () => {
            window.removeEventListener('load', updateMetrics);
        };
    }, []);

    return metrics;
}

// Code splitting utilities
export function createAsyncComponent<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ComponentType
) {
    const LazyComponent = React.lazy(importFunc);

    return function AsyncComponent(props: React.ComponentProps<T>) {
        return React.createElement(
            React.Suspense,
            { fallback: fallback ? React.createElement(fallback) : React.createElement('div', null, 'Loading...') },
            React.createElement(LazyComponent, props)
        );
    };
}

// Memoization utilities
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map();

    return ((...args: Parameters<T>) => {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    }) as T;
}

// Deep comparison for React.memo
export function areEqual<T>(prevProps: T, nextProps: T): boolean {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

// Bundle size optimization
export function optimizeImports() {
    // This would be used in build process
    return {
        // Tree shaking helpers
        treeShake: true,
        // Dynamic imports
        dynamicImports: true,
        // Code splitting
        codeSplitting: true
    };
}

// Service Worker utilities
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }
}

// Critical CSS inlining
export function inlineCriticalCSS(css: string) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// Resource prioritization
export function prioritizeResource(url: string, priority: 'high' | 'low' = 'high') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'script';
    if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
    }
    document.head.appendChild(link);
}

// Performance budget
export const PERFORMANCE_BUDGET = {
    FCP: 1800, // First Contentful Paint
    LCP: 2500, // Largest Contentful Paint
    FID: 100,  // First Input Delay
    CLS: 0.1,  // Cumulative Layout Shift
    TTFB: 600  // Time to First Byte
};

// Performance scoring
export function calculatePerformanceScore(metrics: any): number {
    if (!metrics) return 0;

    let score = 100;

    if (metrics.firstContentfulPaint > PERFORMANCE_BUDGET.FCP) score -= 20;
    if (metrics.totalTime > PERFORMANCE_BUDGET.LCP) score -= 20;
    if (metrics.domContentLoaded > PERFORMANCE_BUDGET.TTFB) score -= 20;

    return Math.max(0, score);
}

// Export all utilities
export const performanceUtils = {
    useDebounce,
    useThrottle,
    useIntersectionObserver,
    useVirtualScroll,
    useLazyImage,
    usePerformanceMonitor,
    memoryCache,
    analyzeBundle,
    preloadResource,
    prefetchResource,
    createAsyncComponent,
    memoize,
    areEqual,
    optimizeImports,
    registerServiceWorker,
    inlineCriticalCSS,
    prioritizeResource,
    calculatePerformanceScore
};