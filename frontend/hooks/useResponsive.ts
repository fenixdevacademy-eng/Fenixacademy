'use client';

import { useState, useEffect } from 'react';
import { breakpoints, isMobile, isTablet, isDesktop } from '../lib/responsive';

export interface ResponsiveState {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLandscape: boolean;
    isPortrait: boolean;
    breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    orientation: 'landscape' | 'portrait';
    isTouch: boolean;
    isHover: boolean;
}

export function useResponsive(): ResponsiveState {
    const [state, setState] = useState<ResponsiveState>({
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isLandscape: false,
        isPortrait: false,
        breakpoint: 'xs',
        orientation: 'portrait',
        isTouch: false,
        isHover: false,
    });

    useEffect(() => {
        const updateState = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isLandscape = width > height;
            const isPortrait = height > width;

            // Determine breakpoint
            let breakpoint: ResponsiveState['breakpoint'] = 'xs';
            if (width >= parseInt(breakpoints['2xl'])) breakpoint = '2xl';
            else if (width >= parseInt(breakpoints.xl)) breakpoint = 'xl';
            else if (width >= parseInt(breakpoints.lg)) breakpoint = 'lg';
            else if (width >= parseInt(breakpoints.md)) breakpoint = 'md';
            else if (width >= parseInt(breakpoints.sm)) breakpoint = 'sm';

            // Detect touch capability
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            // Detect hover capability
            const isHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

            setState({
                width,
                height,
                isMobile: isMobile(width),
                isTablet: isTablet(width),
                isDesktop: isDesktop(width),
                isLandscape,
                isPortrait,
                breakpoint,
                orientation: isLandscape ? 'landscape' : 'portrait',
                isTouch,
                isHover,
            });
        };

        // Initial state
        updateState();

        // Listen for resize events
        window.addEventListener('resize', updateState);
        window.addEventListener('orientationchange', updateState);

        // Listen for media query changes
        const mediaQueries = [
            window.matchMedia(`(max-width: ${breakpoints.sm})`),
            window.matchMedia(`(max-width: ${breakpoints.md})`),
            window.matchMedia(`(max-width: ${breakpoints.lg})`),
            window.matchMedia(`(max-width: ${breakpoints.xl})`),
            window.matchMedia(`(max-width: ${breakpoints['2xl']})`),
            window.matchMedia('(hover: hover) and (pointer: fine)'),
            window.matchMedia('(hover: none) and (pointer: coarse)'),
        ];

        const handleMediaChange = () => updateState();
        mediaQueries.forEach(mq => mq.addEventListener('change', handleMediaChange));

        return () => {
            window.removeEventListener('resize', updateState);
            window.removeEventListener('orientationchange', updateState);
            mediaQueries.forEach(mq => mq.removeEventListener('change', handleMediaChange));
        };
    }, []);

    return state;
}

// Hook for specific breakpoint detection
export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
    const { width } = useResponsive();
    return width >= parseInt(breakpoints[breakpoint]);
}

// Hook for mobile detection
export function useIsMobile(): boolean {
    const { isMobile } = useResponsive();
    return isMobile;
}

// Hook for tablet detection
export function useIsTablet(): boolean {
    const { isTablet } = useResponsive();
    return isTablet;
}

// Hook for desktop detection
export function useIsDesktop(): boolean {
    const { isDesktop } = useResponsive();
    return isDesktop;
}

// Hook for touch detection
export function useIsTouch(): boolean {
    const { isTouch } = useResponsive();
    return isTouch;
}

// Hook for hover detection
export function useIsHover(): boolean {
    const { isHover } = useResponsive();
    return isHover;
}

// Hook for orientation detection
export function useOrientation(): 'landscape' | 'portrait' {
    const { orientation } = useResponsive();
    return orientation;
}

// Hook for window dimensions
export function useWindowSize(): { width: number; height: number } {
    const { width, height } = useResponsive();
    return { width, height };
}

// Hook for responsive values
export function useResponsiveValue<T>(
    mobile: T,
    tablet?: T,
    desktop?: T
): T {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    if (isMobile) return mobile;
    if (isTablet && tablet !== undefined) return tablet;
    if (isDesktop && desktop !== undefined) return desktop;

    return mobile;
}

// Hook for conditional rendering based on screen size
export function useResponsiveRender() {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    return {
        mobile: isMobile,
        tablet: isTablet,
        desktop: isDesktop,
        showOnMobile: isMobile,
        showOnTablet: isTablet,
        showOnDesktop: isDesktop,
        hideOnMobile: !isMobile,
        hideOnTablet: !isTablet,
        hideOnDesktop: !isDesktop,
    };
}

// Hook for responsive class names
export function useResponsiveClasses(
    base: string,
    md?: string,
    lg?: string
): string {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    if (isMobile) return base;
    if (isTablet && md) return md;
    if (isDesktop && lg) return lg;

    return base;
}

// Hook for responsive spacing
export function useResponsiveSpacing(
    mobile: string,
    tablet?: string,
    desktop?: string
): string {
    return useResponsiveValue(mobile, tablet, desktop);
}

// Hook for responsive typography
export function useResponsiveTypography() {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    if (isMobile) {
        return {
            h1: 'text-2xl font-bold',
            h2: 'text-xl font-semibold',
            h3: 'text-lg font-medium',
            h4: 'text-base font-medium',
            h5: 'text-sm font-medium',
            h6: 'text-xs font-medium',
            body: 'text-sm',
            small: 'text-xs',
            caption: 'text-xs text-gray-500',
        };
    }

    if (isTablet) {
        return {
            h1: 'text-3xl font-bold',
            h2: 'text-2xl font-semibold',
            h3: 'text-xl font-medium',
            h4: 'text-lg font-medium',
            h5: 'text-base font-medium',
            h6: 'text-sm font-medium',
            body: 'text-base',
            small: 'text-sm',
            caption: 'text-sm text-gray-500',
        };
    }

    return {
        h1: 'text-4xl font-bold',
        h2: 'text-3xl font-semibold',
        h3: 'text-2xl font-medium',
        h4: 'text-xl font-medium',
        h5: 'text-lg font-medium',
        h6: 'text-base font-medium',
        body: 'text-base',
        small: 'text-sm',
        caption: 'text-sm text-gray-500',
    };
}

// Hook for responsive grid
export function useResponsiveGrid() {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    if (isMobile) {
        return {
            columns: 1,
            gap: 'gap-4',
            padding: 'p-4',
        };
    }

    if (isTablet) {
        return {
            columns: 2,
            gap: 'gap-6',
            padding: 'p-6',
        };
    }

    return {
        columns: 3,
        gap: 'gap-8',
        padding: 'p-8',
    };
}

// Hook for responsive container
export function useResponsiveContainer() {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    if (isMobile) {
        return 'container mx-auto px-4 max-w-sm';
    }

    if (isTablet) {
        return 'container mx-auto px-6 max-w-4xl';
    }

    return 'container mx-auto px-8 max-w-7xl';
}
