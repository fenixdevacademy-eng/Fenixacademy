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

interface ModernHeaderProps {
    className?: string;
    onNavigation?: (path: string) => void;
    onSettingsChange?: (settings: HeaderSettings) => void;
    onThemeChange?: (theme: 'light' | 'dark') => void;
    onLanguageChange?: (language: string) => void;
}

interface HeaderSettings {
    enabled: boolean;
    height: number;
    enableSearch: boolean;
    enableNotifications: boolean;
    enableUserMenu: boolean;
    enableThemeToggle: boolean;
    enableLanguageSwitcher: boolean;
    enableBreadcrumbs: boolean;
    enableLogo: boolean;
    enableNavigation: boolean;
    enableMobileMenu: boolean;
    enableSticky: boolean;
    enableTransparency: boolean;
    enableAnimations: boolean;
    enableHoverEffects: boolean;
    enableLoadingAnimations: boolean;
    enableKeyboardNavigation: boolean;
    enableScreenReader: boolean;
    enableHighContrast: boolean;
    enableReducedMotion: boolean;
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

const defaultSettings: HeaderSettings = {
    enabled: true,
    height: 64,
    enableSearch: true,
    enableNotifications: true,
    enableUserMenu: true,
    enableThemeToggle: true,
    enableLanguageSwitcher: true,
    enableBreadcrumbs: true,
    enableLogo: true,
    enableNavigation: true,
    enableMobileMenu: true,
    enableSticky: true,
    enableTransparency: false,
    enableAnimations: true,
    enableHoverEffects: true,
    enableLoadingAnimations: true,
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    enableHighContrast: false,
    enableReducedMotion: false
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

export function ModernHeader({
    className = '',
    onNavigation,
    onSettingsChange,
    onThemeChange,
    onLanguageChange
}: ModernHeaderProps) {
    const [settings, setSettings] = useState<HeaderSettings>(defaultSettings);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('pt-BR');
    const [windowWidth, setWindowWidth] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);

            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Apply theme
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleSettingsChange = (newSettings: Partial<HeaderSettings>) => {
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

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    };

    const renderNavigationItem = (item: NavigationItem, level = 0) => {
        const Icon = item.icon;
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = item.children?.some(child => child.isActive) || false;

        return (
            <div key={item.id} className="relative group">
                <button
                    onClick={() => {
                        if (hasChildren) {
                            // Toggle children visibility
                        } else {
                            handleNavigation(item.path);
                        }
                    }}
                    disabled={item.isDisabled}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${item.isActive
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        } ${item.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                        <div className="py-1">
                            {item.children?.map(child => (
                                <button
                                    key={child.id}
                                    onClick={() => handleNavigation(child.path)}
                                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {child.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <header
            ref={headerRef}
            className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${settings.enableSticky ? 'sticky top-0 z-50' : ''
                } ${className}`}
            style={{ height: `${settings.height}px` }}
        >
            <div className="flex items-center justify-between h-full px-4">
                {/* Logo and Navigation */}
                <div className="flex items-center gap-4">
                    {settings.enableLogo && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Fenix
                            </h1>
                        </div>
                    )}

                    {settings.enableNavigation && windowWidth >= 768 && (
                        <nav className="hidden md:flex items-center gap-1">
                            {navigationItems.map(item => renderNavigationItem(item))}
                        </nav>
                    )}
                </div>

                {/* Search, Notifications, and User Menu */}
                <div className="flex items-center gap-2">
                    {settings.enableSearch && (
                        <div className="relative">
                            <button
                                onClick={handleSearchToggle}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                title="Buscar"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {isSearchOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                    <div className="p-4">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                placeholder="Buscar cursos, projetos, usuários..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {settings.enableNotifications && (
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                title="Notificações"
                            >
                                <Bell className="w-5 h-5" />
                            </button>

                            {isNotificationsOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                            Notificações
                                        </h3>
                                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                                            Nenhuma notificação
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {settings.enableThemeToggle && (
                        <button
                            onClick={handleThemeToggle}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            title="Alternar tema"
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
                                title="Menu do usuário"
                            >
                                <User className="w-5 h-5" />
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
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

                    {/* Mobile Menu Button */}
                    {settings.enableMobileMenu && windowWidth < 768 && (
                        <button
                            onClick={handleMobileMenuToggle}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            title="Menu"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && windowWidth < 768 && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="px-4 py-2">
                        <nav className="space-y-1">
                            {navigationItems.map(item => renderNavigationItem(item))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

