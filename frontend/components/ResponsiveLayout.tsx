'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Menu,
    X,
    Search,
    Bell,
    User,
    Settings,
    Home,
    BookOpen,
    Code,
    Target,
    Users,
    MessageCircle,
    HelpCircle,
    LogOut,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Edit,
    Trash2,
    Copy,
    Share2,
    Download,
    Upload,
    RefreshCw,
    Play,
    Pause,
    Square,
    RotateCcw,
    Zap,
    Brain,
    Database,
    Cloud,
    Shield,
    Lock,
    Unlock,
    Power,
    PowerOff,
    Monitor,
    Smartphone,
    Tablet,
    Globe,
    Server,
    Sun,
    Moon
} from 'lucide-react';

interface ResponsiveLayoutProps {
    className?: string;
    children: React.ReactNode;
    onNavigation?: (path: string) => void;
    onSettingsChange?: (settings: LayoutSettings) => void;
    onThemeChange?: (theme: 'light' | 'dark') => void;
    onLanguageChange?: (language: string) => void;
}

interface LayoutSettings {
    enabled: boolean;
    sidebarCollapsed: boolean;
    sidebarWidth: number;
    headerHeight: number;
    footerHeight: number;
    enableSidebar: boolean;
    enableHeader: boolean;
    enableFooter: boolean;
    enableBreadcrumbs: boolean;
    enableSearch: boolean;
    enableNotifications: boolean;
    enableUserMenu: boolean;
    enableThemeToggle: boolean;
    enableLanguageSwitcher: boolean;
    enableResponsiveBreakpoints: boolean;
    breakpoints: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    animations: {
        enableTransitions: boolean;
        transitionDuration: number;
        enableHoverEffects: boolean;
        enableLoadingAnimations: boolean;
    };
    accessibility: {
        enableKeyboardNavigation: boolean;
        enableScreenReader: boolean;
        enableHighContrast: boolean;
        enableReducedMotion: boolean;
    };
}

interface NavigationItem {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    path: string;
    children?: NavigationItem[];
    badge?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    isVisible?: boolean;
}

const defaultSettings: LayoutSettings = {
    enabled: true,
    sidebarCollapsed: false,
    sidebarWidth: 256,
    headerHeight: 64,
    footerHeight: 48,
    enableSidebar: true,
    enableHeader: true,
    enableFooter: true,
    enableBreadcrumbs: true,
    enableSearch: true,
    enableNotifications: true,
    enableUserMenu: true,
    enableThemeToggle: true,
    enableLanguageSwitcher: true,
    enableResponsiveBreakpoints: true,
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1280
    },
    animations: {
        enableTransitions: true,
        transitionDuration: 300,
        enableHoverEffects: true,
        enableLoadingAnimations: true
    },
    accessibility: {
        enableKeyboardNavigation: true,
        enableScreenReader: true,
        enableHighContrast: false,
        enableReducedMotion: false
    }
};

const navigationItems: NavigationItem[] = [
    {
        id: 'home',
        label: 'Início',
        icon: Home,
        path: '/',
        isActive: true
    },
    {
        id: 'courses',
        label: 'Cursos',
        icon: BookOpen,
        path: '/courses',
        children: [
            {
                id: 'courses-all',
                label: 'Todos os Cursos',
                icon: BookOpen,
                path: '/courses'
            },
            {
                id: 'courses-my',
                label: 'Meus Cursos',
                icon: BookOpen,
                path: '/courses/my'
            },
            {
                id: 'courses-favorites',
                label: 'Favoritos',
                icon: BookOpen,
                path: '/courses/favorites'
            }
        ]
    },
    {
        id: 'projects',
        label: 'Projetos',
        icon: Code,
        path: '/projects',
        children: [
            {
                id: 'projects-all',
                label: 'Todos os Projetos',
                icon: Code,
                path: '/projects'
            },
            {
                id: 'projects-my',
                label: 'Meus Projetos',
                icon: Code,
                path: '/projects/my'
            },
            {
                id: 'projects-templates',
                label: 'Templates',
                icon: Code,
                path: '/projects/templates'
            }
        ]
    },
    {
        id: 'community',
        label: 'Comunidade',
        icon: Users,
        path: '/community',
        children: [
            {
                id: 'community-forum',
                label: 'Fórum',
                icon: Users,
                path: '/community/forum'
            },
            {
                id: 'community-chat',
                label: 'Chat',
                icon: MessageCircle,
                path: '/community/chat'
            },
            {
                id: 'community-events',
                label: 'Eventos',
                icon: Users,
                path: '/community/events'
            }
        ]
    },
    {
        id: 'help',
        label: 'Ajuda',
        icon: HelpCircle,
        path: '/help',
        children: [
            {
                id: 'help-docs',
                label: 'Documentação',
                icon: HelpCircle,
                path: '/help/docs'
            },
            {
                id: 'help-support',
                label: 'Suporte',
                icon: HelpCircle,
                path: '/help/support'
            },
            {
                id: 'help-faq',
                label: 'FAQ',
                icon: HelpCircle,
                path: '/help/faq'
            }
        ]
    }
];

export function ResponsiveLayout({
    className = '',
    children,
    onNavigation,
    onSettingsChange,
    onThemeChange,
    onLanguageChange
}: ResponsiveLayoutProps) {
    const [settings, setSettings] = useState<LayoutSettings>(defaultSettings);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('pt-BR');
    const [windowWidth, setWindowWidth] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const sidebarRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);

            if (window.innerWidth < settings.breakpoints.mobile) {
                setIsSidebarOpen(false);
                setIsMobileMenuOpen(false);
            } else if (window.innerWidth < settings.breakpoints.tablet) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [settings.breakpoints]);

    useEffect(() => {
        // Apply theme
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleSettingsChange = (newSettings: Partial<LayoutSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        onSettingsChange?.(updatedSettings);
    };

    const handleNavigation = (path: string) => {
        onNavigation?.(path);
        setIsMobileMenuOpen(false);
    };

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
        onThemeChange?.(isDarkMode ? 'light' : 'dark');
    };

    const handleLanguageChange = (language: string) => {
        setCurrentLanguage(language);
        onLanguageChange?.(language);
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const renderNavigationItem = (item: NavigationItem, level = 0) => {
        const Icon = item.icon;
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = item.children?.some(child => child.isActive) || false;

        return (
            <div key={item.id} className="mb-1">
                <button
                    onClick={() => {
                        if (hasChildren) {
                            // Toggle children visibility
                        } else {
                            handleNavigation(item.path);
                        }
                    }}
                    disabled={item.isDisabled}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${item.isActive
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        } ${item.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ paddingLeft: `${12 + level * 16}px` }}
                >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                            {item.badge}
                        </span>
                    )}
                    {hasChildren && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                </button>

                {hasChildren && isExpanded && (
                    <div className="mt-1 space-y-1">
                        {item.children?.map(child => renderNavigationItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const renderHeader = () => (
        <header
            ref={headerRef}
            className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
            style={{ height: `${settings.headerHeight}px` }}
        >
            <div className="flex items-center justify-between h-full px-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSidebarToggle}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        Fenix
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {settings.enableSearch && (
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    )}

                    {settings.enableNotifications && (
                        <button
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                        </button>
                    )}

                    {settings.enableThemeToggle && (
                        <button
                            onClick={handleThemeToggle}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    )}

                    {settings.enableLanguageSwitcher && (
                        <select
                            value={currentLanguage}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="pt-BR">Português</option>
                            <option value="en-US">English</option>
                            <option value="es-ES">Español</option>
                        </select>
                    )}

                    {settings.enableUserMenu && (
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                    <div className="py-1">
                                        <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            Perfil
                                        </button>
                                        <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            Configurações
                                        </button>
                                        <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );

    const renderSidebar = () => (
        <aside
            ref={sidebarRef}
            className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } ${windowWidth < settings.breakpoints.mobile ? 'fixed inset-y-0 left-0 z-40' : ''}`}
            style={{ width: `${settings.sidebarWidth}px` }}
        >
            <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Menu
                    </h2>
                    <button
                        onClick={handleSidebarToggle}
                        className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <nav className="space-y-2">
                    {navigationItems.map(item => renderNavigationItem(item))}
                </nav>
            </div>
        </aside>
    );

    const renderFooter = () => (
        <footer
            ref={footerRef}
            className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            style={{ height: `${settings.footerHeight}px` }}
        >
            <div className="flex items-center justify-between h-full px-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    © 2024 Fenix. Todos os direitos reservados.
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <button className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        Termos
                    </button>
                    <button className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        Privacidade
                    </button>
                    <button className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        Suporte
                    </button>
                </div>
            </div>
        </footer>
    );

    const renderMobileMenu = () => (
        <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Menu
                        </h2>
                        <button
                            onClick={handleMobileMenuToggle}
                            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {navigationItems.map(item => renderNavigationItem(item))}
                    </nav>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
            {settings.enableHeader && renderHeader()}

            <div className="flex">
                {settings.enableSidebar && renderSidebar()}

                <main className="flex-1 min-h-screen">
                    {isLoading && (
                        <div className="flex items-center justify-center h-64">
                            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                        </div>
                    )}

                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>

            {settings.enableFooter && renderFooter()}

            {windowWidth < settings.breakpoints.mobile && renderMobileMenu()}
        </div>
    );
}

