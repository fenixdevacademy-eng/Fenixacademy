/**
 * Sistema de otimização de performance
 * Lazy loading, debouncing, throttling e cache
 */

import { useCallback, useRef, useEffect, useState } from 'react';

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
        ((...args) => {
            if (Date.now() - lastRun.current >= delay) {
                callback(...args);
                lastRun.current = Date.now();
            }
        }) as T,
        [callback, delay]
    );
}

// Intersection Observer hook para lazy loading
export function useIntersectionObserver(
    elementRef: React.RefObject<Element>,
    options: IntersectionObserverInit = {}
) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [elementRef, options]);

    return isIntersecting;
}

// Cache simples em memória
class MemoryCache {
    private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

    set(key: string, data: any, ttl: number = 5 * 60 * 1000) { // 5 minutos por padrão
        this.cache.set(key, {
            data,
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

        return item.data;
    }

    clear() {
        this.cache.clear();
    }

    has(key: string): boolean {
        const item = this.cache.get(key);
        if (!item) return false;

        if (Date.now() - item.timestamp > item.ttl) {
            this.cache.delete(key);
            return false;
        }

        return true;
    }
}

export const memoryCache = new MemoryCache();

// Hook para cache de dados
export function useCachedData<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 5 * 60 * 1000
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        // Verificar cache primeiro
        const cached = memoryCache.get(key);
        if (cached) {
            setData(cached);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await fetcher();
            setData(result);
            memoryCache.set(key, result, ttl);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [key, fetcher, ttl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

// Preload de imagens
export function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
}

// Preload de recursos críticos
export function preloadCriticalResources() {
    const criticalImages = [
        '/images/hero-bg.jpg',
        '/images/logo.png',
        '/images/course-placeholder.jpg'
    ];

    const criticalScripts = [
        'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs/loader.js'
    ];

    // Preload imagens
    criticalImages.forEach(src => {
        preloadImage(src).catch(console.warn);
    });

    // Preload scripts
    criticalScripts.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Otimização de scroll
export function useScrollOptimization() {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const throttledScroll = useThrottle((event: Event) => {
        const target = event.target as Document;
        setScrollY(target.documentElement.scrollTop);
        setIsScrolling(true);

        // Reset scrolling state after scroll ends
        setTimeout(() => setIsScrolling(false), 150);
    }, 16); // ~60fps

    useEffect(() => {
        document.addEventListener('scroll', throttledScroll, { passive: true });
        return () => document.removeEventListener('scroll', throttledScroll);
    }, [throttledScroll]);

    return { scrollY, isScrolling };
}

// Lazy loading de componentes
export function withLazyLoading<T extends object>(
    Component: React.ComponentType<T>,
    fallback?: React.ReactNode
) {
    return function LazyLoadedComponent(props: T) {
        const [isLoaded, setIsLoaded] = useState(false);

        useEffect(() => {
            // Simular carregamento assíncrono
            const timer = setTimeout(() => {
                setIsLoaded(true);
            }, 100);

            return () => clearTimeout(timer);
        }, []);

        if (!isLoaded) {
            return fallback || <div className="animate-pulse bg-gray-800 rounded h-32" />;
        }

        return <Component { ...props } />;
    };
}

// Otimização de re-renders
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    return useCallback(
        ((...args) => callbackRef.current(...args)) as T,
        []
    );
}

// Performance monitoring
export function usePerformanceMonitor(componentName: string) {
    useEffect(() => {
        const startTime = performance.now();

        return () => {
            const endTime = performance.now();
            const renderTime = endTime - startTime;

            if (renderTime > 16) { // Mais de 16ms (60fps)
                console.warn(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
            }
        };
    }, [componentName]);
}