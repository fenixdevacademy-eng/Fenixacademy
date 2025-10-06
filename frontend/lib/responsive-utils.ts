'use client';

﻿/**
 * Utilitários responsivos unificados para o Fenix Academy
 * Centraliza todas as classes e breakpoints responsivos
 */

import { useState, useEffect } from 'react';

// Breakpoints do Tailwind CSS
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'} as const;

// Classes responsivas comuns
export const responsiveClasses = {
    // Containers
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    containerSm: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    containerLg: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',

    // Grids
    grid: {
        cols1: 'grid grid-cols-1',
        cols2: 'grid grid-cols-1 md:grid-cols-2',
        cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        cols4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        cols6: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6'},

    // Flexbox
    flex: {
        col: 'flex flex-col',
        row: 'flex flex-row',
        colMd: 'flex flex-col md:flex-row',
        rowMd: 'flex flex-row md:flex-col',
        wrap: 'flex flex-wrap',
        nowrap: 'flex flex-nowrap',
        center: 'flex items-center justify-center',
        between: 'flex items-center justify-between',
        start: 'flex items-start',
        end: 'flex items-end'},

    // Spacing
    spacing: {
        section: 'py-8 md:py-12 lg:py-16',
        sectionSm: 'py-6 md:py-8 lg:py-12',
        sectionLg: 'py-12 md:py-16 lg:py-24',
        gap: 'gap-4 md:gap-6 lg:gap-8',
        gapSm: 'gap-2 md:gap-4',
        gapLg: 'gap-6 md:gap-8 lg:gap-12'},

    // Text
    text: {
        h1: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold',
        h2: 'text-2xl md:text-3xl lg:text-4xl font-bold',
        h3: 'text-xl md:text-2xl lg:text-3xl font-semibold',
        h4: 'text-lg md:text-xl lg:text-2xl font-semibold',
        h5: 'text-base md:text-lg lg:text-xl font-medium',
        h6: 'text-sm md:text-base lg:text-lg font-medium',
        body: 'text-sm md:text-base',
        small: 'text-xs md:text-sm',
        large: 'text-base md:text-lg lg:text-xl'},

    // Buttons
    button: {
        primary: 'px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-lg',
        secondary: 'px-3 py-2 md:px-4 md:py-2 text-sm font-medium rounded-md',
        large: 'px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-lg',
        small: 'px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm font-medium rounded'},

    // Cards
    card: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
    cardHover: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow',
    cardInteractive: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer',

    // Forms
    input: 'w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    textarea: 'w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical',
    select: 'w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',

    // Navigation
    nav: 'hidden md:flex items-center space-x-6',
    navMobile: 'md:hidden flex flex-col space-y-2',
    navItem: 'text-sm md:text-base font-medium transition-colors',
    navItemActive: 'text-blue-600 dark:text-blue-400',
    navItemHover: 'hover:text-blue-600 dark:hover:text-blue-400',

    // Layout
    sidebar: 'w-64 md:w-72 lg:w-80',
    main: 'flex-1 min-w-0',
    content: 'p-4 md:p-6 lg:p-8',

    // Images
    image: 'w-full h-auto object-cover',
    imageRounded: 'w-full h-auto object-cover rounded-lg',
    imageCircle: 'w-full h-auto object-cover rounded-full',

    // Animations
    transition: 'transition-all duration-200 ease-in-out',
    transitionSlow: 'transition-all duration-300 ease-in-out',
    hover: 'hover:scale-105 hover:shadow-lg transition-transform duration-200',

    // Shadows
    shadow: 'shadow-sm',
    shadowMd: 'shadow-md',
    shadowLg: 'shadow-lg',
    shadowXl: 'shadow-xl',

    // Borders
    border: 'border border-gray-200 dark:border-gray-700',
    borderRounded: 'border border-gray-200 dark:border-gray-700 rounded-lg',
    borderRoundedLg: 'border border-gray-200 dark:border-gray-700 rounded-xl',

    // Backgrounds
    bg: 'bg-white dark:bg-gray-900',
    bgSecondary: 'bg-gray-50 dark:bg-gray-800',
    bgTertiary: 'bg-gray-100 dark:bg-gray-700',

    // Text colors
    text: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-600 dark:text-gray-400',
    textTertiary: 'text-gray-500 dark:text-gray-500',
    textMuted: 'text-gray-400 dark:text-gray-600',

    // Status colors
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400'} as const;

// Hook para detectar tamanho da tela
export const useResponsive = () => {
    const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');

    useEffect(() => {
        const updateScreenSize = () => {
            const width = window.innerWidth;
            if (width < 640) setScreenSize('sm');
            else if (width < 768) setScreenSize('md');
            else if (width < 1024) setScreenSize('lg');
            else if (width < 1280) setScreenSize('xl');
            else setScreenSize('2xl');
        }

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    return {
        screenSize,
        isMobile: screenSize === 'sm',
        isTablet: screenSize === 'md',
        isDesktop: screenSize === 'lg' || screenSize === 'xl' || screenSize === '2xl',
        isLarge: screenSize === 'xl' || screenSize === '2xl'}
}

// Utilitários para classes condicionais
export const cn = (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(' ');
}

// Classes responsivas para diferentes componentes
export const componentClasses = {
    // Header
    header: {
        container: 'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800',
        transparent: 'bg-transparent',
        height: 'h-16',
        logo: 'flex items-center space-x-2',
        nav: 'hidden lg:flex items-center space-x-1',
        mobileButton: 'lg:hidden p-2 rounded-lg transition-colors'},

    // Cards
    courseCard: {
        container: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300',
        image: 'w-full h-48 md:h-56 lg:h-64 object-cover',
        content: 'p-4 md:p-6',
        title: 'text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2',
        description: 'text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-3',
        footer: 'px-4 md:px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600'},

    // Forms
    form: {
        container: 'space-y-4 md:space-y-6',
        group: 'space-y-2',
        label: 'block text-sm font-medium text-gray-700 dark:text-gray-300',
        input: 'w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        error: 'text-sm text-red-600 dark:text-red-400',
        help: 'text-sm text-gray-500 dark:text-gray-400'},

    // Buttons
    button: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg transition-colors',
        secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg transition-colors',
        outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg transition-colors',
        ghost: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-lg transition-colors',
        icon: 'p-2 rounded-lg transition-colors'},

    // Modals
    modal: {
        overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50',
        container: 'fixed inset-0 z-50 flex items-center justify-center p-4',
        content: 'bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto',
        header: 'px-6 py-4 border-b border-gray-200 dark:border-gray-700',
        body: 'px-6 py-4',
        footer: 'px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3'},

    // Tables
    table: {
        container: 'overflow-x-auto',
        table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
        thead: 'bg-gray-50 dark:bg-gray-800',
        th: 'px-4 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
        tbody: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
        td: 'px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'}} as const;

export default responsiveClasses;