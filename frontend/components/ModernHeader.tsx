'use client';

import React, { useState } from 'react';
import { Menu, X, Sun, Moon, User, Settings, LogOut, BookOpen, GraduationCap } from 'lucide-react';
import SearchAutocomplete from './SearchAutocomplete';
import CartButton from './CartButton';
import NotificationSystem from './NotificationSystem';
import { useCart } from '../contexts/CartContext';

interface ModernHeaderProps {
    className?: string;
}

export default function ModernHeader({ className = '' }: ModernHeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { state } = useCart();

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        // Aqui você implementaria a lógica real de dark mode
        document.documentElement.classList.toggle('dark');
    };

    // Navegação principal
    const navigation = [
        { name: 'Cursos', href: '/courses', icon: BookOpen },
        { name: 'Carreira', href: '/career', icon: GraduationCap },
        { name: 'Comunidade', href: '/community' },
        { name: 'Suporte', href: '/support' }
    ];

    // Menu do usuário
    const userMenuItems = [
        { name: 'Meu Perfil', href: '/profile', icon: User },
        { name: 'Configurações', href: '/settings', icon: Settings },
        { name: 'Sair', href: '/logout', icon: LogOut, action: 'logout' }
    ];

    return (
        <header className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo e Navegação Principal */}
                    <div className="flex items-center space-x-8">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a href="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <GraduationCap className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">
                                    Fenix Academy
                                </span>
                            </a>
                        </div>

                        {/* Navegação Desktop */}
                        <nav className="hidden md:flex space-x-8">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors group"
                                >
                                    {item.icon && <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />}
                                    <span>{item.name}</span>
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Área Direita */}
                    <div className="flex items-center space-x-4">
                        {/* Busca */}
                        <div className="hidden lg:block w-80">
                            <SearchAutocomplete
                                placeholder="Buscar cursos, módulos, lições..."
                                onCourseSelect={(course) => {
                                    console.log('Curso selecionado:', course.title);
                                    // Implementar navegação para o curso
                                }}
                            />
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex items-center space-x-2">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                title={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
                            >
                                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>

                            {/* Notificações */}
                            <NotificationSystem />

                            {/* Carrinho */}
                            <CartButton />

                            {/* Menu do Usuário */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <User className="h-4 w-4 text-white" />
                                    </div>
                                </button>

                                {/* Dropdown do Usuário */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                        {userMenuItems.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => {
                                                    if (item.action === 'logout') {
                                                        // Implementar logout
                                                        console.log('Logout');
                                                    }
                                                    setIsUserMenuOpen(false);
                                                }}
                                                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Menu Mobile */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Mobile */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        {/* Busca Mobile */}
                        <div className="mb-4">
                            <SearchAutocomplete
                                placeholder="Buscar cursos..."
                                onCourseSelect={(course) => {
                                    console.log('Curso selecionado:', course.title);
                                    setIsMobileMenuOpen(false);
                                }}
                            />
                        </div>

                        {/* Navegação Mobile */}
                        <nav className="space-y-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                                >
                                    {item.icon && <item.icon className="h-5 w-5" />}
                                    <span>{item.name}</span>
                                </a>
                            ))}
                        </nav>

                        {/* Menu do Usuário Mobile */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="space-y-2">
                                {userMenuItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => {
                                            if (item.action === 'logout') {
                                                console.log('Logout');
                                            }
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Barra de Progresso Global */}
            <div className="w-full h-1 bg-gray-200">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                    style={{
                        width: `${(state.itemCount / 20) * 100}%` // Progresso baseado no carrinho
                    }}
                />
            </div>
        </header>
    );
}
