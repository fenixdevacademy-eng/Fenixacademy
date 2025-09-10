'use client';

import React from 'react';
import { useResponsive, useResponsiveValue } from '../hooks/useResponsive';

interface ResponsiveLayoutProps {
    children: React.ReactNode;
    className?: string;
    container?: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function ResponsiveLayout({
    children,
    className = '',
    container = true,
    maxWidth = 'xl',
    padding = 'md',
    gap = 'md',
}: ResponsiveLayoutProps) {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    // Responsive container classes
    const containerClasses = useResponsiveValue(
        // Mobile
        'w-full',
        // Tablet
        'w-full max-w-4xl mx-auto',
        // Desktop
        'w-full max-w-7xl mx-auto'
    );

    // Responsive padding classes
    const paddingClasses = useResponsiveValue(
        // Mobile
        padding === 'none' ? '' : padding === 'sm' ? 'p-2' : padding === 'md' ? 'p-4' : padding === 'lg' ? 'p-6' : 'p-8',
        // Tablet
        padding === 'none' ? '' : padding === 'sm' ? 'p-4' : padding === 'md' ? 'p-6' : padding === 'lg' ? 'p-8' : 'p-10',
        // Desktop
        padding === 'none' ? '' : padding === 'sm' ? 'p-6' : padding === 'md' ? 'p-8' : padding === 'lg' ? 'p-10' : 'p-12'
    );

    // Responsive gap classes
    const gapClasses = useResponsiveValue(
        // Mobile
        gap === 'none' ? '' : gap === 'sm' ? 'gap-2' : gap === 'md' ? 'gap-4' : gap === 'lg' ? 'gap-6' : 'gap-8',
        // Tablet
        gap === 'none' ? '' : gap === 'sm' ? 'gap-4' : gap === 'md' ? 'gap-6' : gap === 'lg' ? 'gap-8' : 'gap-10',
        // Desktop
        gap === 'none' ? '' : gap === 'sm' ? 'gap-6' : gap === 'md' ? 'gap-8' : gap === 'lg' ? 'gap-10' : 'gap-12'
    );

    // Max width classes
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full',
    };

    const finalClassName = [
        container ? containerClasses : '',
        maxWidth !== 'full' ? maxWidthClasses[maxWidth] : '',
        paddingClasses,
        gapClasses,
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={finalClassName}>
            {children}
        </div>
    );
}

// Responsive Grid Component
interface ResponsiveGridProps {
    children: React.ReactNode;
    columns?: { mobile: number; tablet?: number; desktop?: number };
    gap?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export function ResponsiveGrid({
    children,
    columns = { mobile: 1, tablet: 2, desktop: 3 },
    gap = 'md',
    className = '',
}: ResponsiveGridProps) {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    const gridColumns = useResponsiveValue(
        columns.mobile,
        columns.tablet,
        columns.desktop
    );

    const gapClasses = useResponsiveValue(
        gap === 'sm' ? 'gap-2' : gap === 'md' ? 'gap-4' : gap === 'lg' ? 'gap-6' : 'gap-8',
        gap === 'sm' ? 'gap-4' : gap === 'md' ? 'gap-6' : gap === 'lg' ? 'gap-8' : 'gap-10',
        gap === 'sm' ? 'gap-6' : gap === 'md' ? 'gap-8' : gap === 'lg' ? 'gap-10' : 'gap-12'
    );

    const finalClassName = [
        'grid',
        `grid-cols-${gridColumns}`,
        gapClasses,
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={finalClassName}>
            {children}
        </div>
    );
}

// Responsive Flex Component
interface ResponsiveFlexProps {
    children: React.ReactNode;
    direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    wrap?: boolean;
    gap?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export function ResponsiveFlex({
    children,
    direction = 'row',
    justify = 'start',
    align = 'start',
    wrap = false,
    gap = 'md',
    className = '',
}: ResponsiveFlexProps) {
    const gapClasses = useResponsiveValue(
        gap === 'sm' ? 'gap-2' : gap === 'md' ? 'gap-4' : gap === 'lg' ? 'gap-6' : 'gap-8',
        gap === 'sm' ? 'gap-4' : gap === 'md' ? 'gap-6' : gap === 'lg' ? 'gap-8' : 'gap-10',
        gap === 'sm' ? 'gap-6' : gap === 'md' ? 'gap-8' : gap === 'lg' ? 'gap-10' : 'gap-12'
    );

    const finalClassName = [
        'flex',
        `flex-${direction}`,
        `justify-${justify}`,
        `items-${align}`,
        wrap ? 'flex-wrap' : '',
        gapClasses,
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={finalClassName}>
            {children}
        </div>
    );
}

// Responsive Text Component
interface ResponsiveTextProps {
    children: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
    className?: string;
}

export function ResponsiveText({
    children,
    variant = 'body',
    className = '',
}: ResponsiveTextProps) {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    const textClasses = useResponsiveValue(
        // Mobile
        {
            h1: 'text-2xl font-bold',
            h2: 'text-xl font-semibold',
            h3: 'text-lg font-medium',
            h4: 'text-base font-medium',
            h5: 'text-sm font-medium',
            h6: 'text-xs font-medium',
            body: 'text-sm',
            small: 'text-xs',
            caption: 'text-xs text-gray-500',
        }[variant],
        // Tablet
        {
            h1: 'text-3xl font-bold',
            h2: 'text-2xl font-semibold',
            h3: 'text-xl font-medium',
            h4: 'text-lg font-medium',
            h5: 'text-base font-medium',
            h6: 'text-sm font-medium',
            body: 'text-base',
            small: 'text-sm',
            caption: 'text-sm text-gray-500',
        }[variant],
        // Desktop
        {
            h1: 'text-4xl font-bold',
            h2: 'text-3xl font-semibold',
            h3: 'text-2xl font-medium',
            h4: 'text-xl font-medium',
            h5: 'text-lg font-medium',
            h6: 'text-base font-medium',
            body: 'text-base',
            small: 'text-sm',
            caption: 'text-sm text-gray-500',
        }[variant]
    );

    const finalClassName = [textClasses, className].filter(Boolean).join(' ');

    return (
        <span className={finalClassName}>
            {children}
        </span>
    );
}

// Responsive Button Component
interface ResponsiveButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export function ResponsiveButton({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    onClick,
    disabled = false,
    type = 'button',
}: ResponsiveButtonProps) {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    const sizeClasses = useResponsiveValue(
        // Mobile
        size === 'sm' ? 'px-3 py-1 text-xs' : size === 'md' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base',
        // Tablet
        size === 'sm' ? 'px-4 py-2 text-sm' : size === 'md' ? 'px-5 py-2 text-base' : 'px-6 py-3 text-lg',
        // Desktop
        size === 'sm' ? 'px-4 py-2 text-sm' : size === 'md' ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'
    );

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
        outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
        ghost: 'hover:bg-gray-100 text-gray-700',
    };

    const finalClassName = [
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        sizeClasses,
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={finalClassName}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

// Responsive Card Component
interface ResponsiveCardProps {
    children: React.ReactNode;
    padding?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    hover?: boolean;
}

export function ResponsiveCard({
    children,
    padding = 'md',
    className = '',
    hover = false,
}: ResponsiveCardProps) {
    const paddingClasses = useResponsiveValue(
        // Mobile
        padding === 'sm' ? 'p-3' : padding === 'md' ? 'p-4' : padding === 'lg' ? 'p-6' : 'p-8',
        // Tablet
        padding === 'sm' ? 'p-4' : padding === 'md' ? 'p-6' : padding === 'lg' ? 'p-8' : 'p-10',
        // Desktop
        padding === 'sm' ? 'p-6' : padding === 'md' ? 'p-8' : padding === 'lg' ? 'p-10' : 'p-12'
    );

    const finalClassName = [
        'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
        paddingClasses,
        hover ? 'hover:shadow-md transition-shadow' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={finalClassName}>
            {children}
        </div>
    );
}
