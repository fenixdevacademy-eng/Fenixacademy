'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useToastNotifications } from './Toast';
import FenixLogo from './FenixLogo';
import { NAVIGATION, routeHelpers } from '@/lib/routes';
import {
    BookOpen,
    Zap,
    Target,
    Brain,
    Code,
    Trophy,
    Search,
    ChevronDown,
    Menu,
    X,
    Home,
    GraduationCap,
    Terminal,
    Users,
    HelpCircle,
    Bell,
    User,
    Settings
} from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    submenu?: NavItem[];
    badge?: string;
    external?: boolean;
}

export default function UnifiedNavigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isExpandedOpen, setIsExpandedOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const { showInfo } = useToastNotifications();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navigation = NAVIGATION.MAIN;

    const isActive = (href: string) => routeHelpers.isActive(pathname, href);

    const closeMenus = () => {
        setIsMenuOpen(false);
        setIsExpandedOpen(false);
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            showInfo('Busca iniciada', `Procurando por: ${searchQuery}`);
            // Redirecionar para página de busca
            window.location.href = `${NAVIGATION.MAIN[2].submenu?.[2].href}?q=${encodeURIComponent(searchQuery)}`;
        }
    }

    return (
        <>
            {/* Main Navigation */}
            <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" onClick={closeMenus}>
                            <FenixLogo
                                size="md"
                                variant="full"
                                className={isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navigation.map((item) => (
                                <div key={item.name} className="relative group">
                                    {item.submenu ? (
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsExpandedOpen(!isExpandedOpen)}
                                                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                                                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                                    : isScrolled
                                                        ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                                    }`}
                                            >
                                                {item.icon && <item.icon className="w-4 h-4" />}
                                                <span>{item.name}</span>
                                                {item.badge && (
                                                    <span className="px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                <ChevronDown className="w-4 h-4" />
                                            </button>

                                            {isExpandedOpen && (
                                                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                                                    {item.submenu.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${isActive(subItem.href)
                                                                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600'
                                                                }`}
                                                            onClick={() => setIsExpandedOpen(false)}
                                                        >
                                                            {subItem.icon && <subItem.icon className="w-4 h-4" />}
                                                            <span>{subItem.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                                                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                                : isScrolled
                                                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {item.icon && <item.icon className="w-4 h-4" />}
                                            <span>{item.name}</span>
                                            {item.badge && (
                                                <span className="px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <button className={`p-2 rounded-lg transition-colors ${isScrolled
                                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                : 'text-white/90 hover:bg-white/10'
                                }`}>
                                <Bell className="w-5 h-5" />
                            </button>
                            <Link
                                href="/profile"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isScrolled
                                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <User className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled
                                ? 'text-gray-700 dark:text-gray-300'
                                : 'text-white'
                                }`}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4">
                            <div className="space-y-1">
                                {navigation.map((item) => (
                                    <div key={item.name}>
                                        {item.submenu ? (
                                            <div>
                                                <button
                                                    onClick={() => setIsExpandedOpen(!isExpandedOpen)}
                                                    className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                                                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                        }`}
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        {item.icon && <item.icon className="w-4 h-4" />}
                                                        <span>{item.name}</span>
                                                        {item.badge && (
                                                            <span className="px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpandedOpen ? 'rotate-180' : ''
                                                        }`} />
                                                </button>

                                                {isExpandedOpen && (
                                                    <div className="ml-6 mt-1 space-y-1">
                                                        {item.submenu.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${isActive(subItem.href)
                                                                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                                                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                                    }`}
                                                                onClick={closeMenus}
                                                            >
                                                                {subItem.icon && <subItem.icon className="w-4 h-4" />}
                                                                <span>{subItem.name}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                                                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                    }`}
                                                onClick={closeMenus}
                                            >
                                                {item.icon && <item.icon className="w-4 h-4" />}
                                                <span>{item.name}</span>
                                                {item.badge && (
                                                    <span className="px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Actions */}
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <div className="flex items-center space-x-4">
                                    <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                                        <Bell className="w-5 h-5" />
                                    </button>
                                    <Link
                                        href="/profile"
                                        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                        onClick={closeMenus}
                                    >
                                        <User className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                        onClick={closeMenus}
                                    >
                                        <Settings className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Expanded Content Banner - Only show on non-home pages */}
                {pathname !== '/' && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-center space-x-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <Zap className="w-4 h-4" />
                                    <span className="font-medium">Novo: Conteúdo Expandido 3x Mais Detalhado!</span>
                                </div>
                                <Link
                                    href="/expanded-courses"
                                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                                    onClick={closeMenus}
                                >
                                    Explorar Agora
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer for fixed header */}
            <div className="h-16" />
        </>
    );
}


