'use client';

import React, { useState } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';
import {
    Home,
    GraduationCap,
    Users,
    Brain,
    Terminal,
    CreditCard,
    User,
    Settings,
    HelpCircle,
    BookOpen,
    Target,
    Zap,
    ChevronDown,
    Search
} from 'lucide-react';

export interface QuickNavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
    description?: string;
    badge?: string;
    category?: string;
}

export interface QuickNavigationProps {
    className?: string;
    showSearch?: boolean;
    showCategories?: boolean;
    maxItems?: number;
}

const defaultNavItems: QuickNavItem[] = [
    {
        name: 'Início',
        href: '/',
        icon: <Home className="h-5 w-5" />,
        description: 'Página principal',
        category: 'Geral'
    },
    {
        name: 'Cursos',
        href: '/courses',
        icon: <GraduationCap className="h-5 w-5" />,
        description: 'Todos os cursos disponíveis',
        category: 'Aprendizado'
    },
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: <Target className="h-5 w-5" />,
        description: 'Seu painel de controle',
        category: 'Pessoal'
    },
    {
        name: 'Comunidade',
        href: '/community',
        icon: <Users className="h-5 w-5" />,
        description: 'Conecte-se com outros alunos',
        category: 'Social'
    },
    {
        name: 'IA Assistant',
        href: '/ai',
        icon: <Brain className="h-5 w-5" />,
        description: 'Assistente de IA para programação',
        category: 'Ferramentas',
        badge: 'Novo'
    },
    {
        name: 'IDE Avançado',
        href: '/ide-advanced',
        icon: <Terminal className="h-5 w-5" />,
        description: 'Ambiente de desenvolvimento',
        category: 'Ferramentas'
    },
    {
        name: 'Pagamentos',
        href: '/payments',
        icon: <CreditCard className="h-5 w-5" />,
        description: 'Gerenciar pagamentos',
        category: 'Financeiro'
    },
    {
        name: 'Perfil',
        href: '/profile',
        icon: <User className="h-5 w-5" />,
        description: 'Configurações do perfil',
        category: 'Pessoal'
    },
    {
        name: 'Configurações',
        href: '/settings',
        icon: <Settings className="h-5 w-5" />,
        description: 'Preferências da conta',
        category: 'Pessoal'
    },
    {
        name: 'Suporte',
        href: '/support',
        icon: <HelpCircle className="h-5 w-5" />,
        description: 'Central de ajuda',
        category: 'Suporte'
    },
    {
        name: 'Blog',
        href: '/blog',
        icon: <BookOpen className="h-5 w-5" />,
        description: 'Artigos e tutoriais',
        category: 'Conteúdo'
    },
    {
        name: 'Conteúdo Expandido',
        href: '/expanded-courses',
        icon: <Zap className="h-5 w-5" />,
        description: 'Cursos avançados',
        category: 'Aprendizado',
        badge: 'Premium'
    }
];

const QuickNavigation = React.forwardRef<HTMLDivElement, QuickNavigationProps>(
    ({
        className,
        showSearch = true,
        showCategories = true,
        maxItems = 8,
        ...props
    }, ref) => {
        const { navigate, isCurrentPath } = useNavigation();
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedCategory, setSelectedCategory] = useState<string>('all');

        const categories = ['all', ...Array.from(new Set(defaultNavItems.map(item => item.category).filter(Boolean)))];

        const filteredItems = defaultNavItems
            .filter(item => {
                const matchesSearch = !searchQuery ||
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description?.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

                return matchesSearch && matchesCategory;
            })
            .slice(0, maxItems);

        const handleItemClick = (href: string) => {
            navigate(href);
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "theme-surface rounded-xl p-6 border theme-border shadow-lg",
                    className
                )}
                {...props}
            >
                <div className="mb-4">
                    <h3 className="text-lg font-semibold theme-text mb-2">Navegação Rápida</h3>
                    {showSearch && (
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-text-secondary" />
                            <input
                                type="text"
                                placeholder="Buscar páginas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 theme-surface border theme-border rounded-lg text-theme-text placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-theme-primary"
                            />
                        </div>
                    )}
                </div>

                {showCategories && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-sm font-medium transition-all duration-200",
                                        selectedCategory === category
                                            ? "theme-gradient-primary text-white"
                                            : "theme-surface text-theme-text-secondary hover:text-theme-text border theme-border"
                                    )}
                                >
                                    {category === 'all' ? 'Todas' : category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-2">
                    {filteredItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleItemClick(item.href)}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left",
                                isCurrentPath(item.href)
                                    ? "theme-gradient-primary text-white shadow-lg"
                                    : "theme-surface hover:opacity-80 border theme-border"
                            )}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={cn(
                                    "flex-shrink-0",
                                    isCurrentPath(item.href) ? "text-white" : "text-theme-primary"
                                )}>
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">{item.name}</span>
                                        {item.badge && (
                                            <span className={cn(
                                                "px-2 py-1 rounded-full text-xs font-bold",
                                                isCurrentPath(item.href)
                                                    ? "bg-white/20 text-white"
                                                    : "bg-theme-primary/20 text-theme-primary"
                                            )}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    {item.description && (
                                        <p className={cn(
                                            "text-sm",
                                            isCurrentPath(item.href) ? "text-white/80" : "text-theme-text-secondary"
                                        )}>
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {isCurrentPath(item.href) && (
                                <div className="flex-shrink-0">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-8">
                        <Search className="h-12 w-12 text-theme-text-secondary mx-auto mb-4" />
                        <p className="text-theme-text-secondary">Nenhuma página encontrada</p>
                    </div>
                )}
            </div>
        );
    }
);

QuickNavigation.displayName = "QuickNavigation";

export default QuickNavigation;