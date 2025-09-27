'use client';

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Menu,
  X,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Monitor,
  Flag,
  Check
} from 'lucide-react';

interface InternationalHeaderProps {
  className?: string;
  onLanguageChange?: (language: string) => void;
  onThemeChange?: (theme: string) => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

interface Theme {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const languages: Language[] = [
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷', rtl: false },
  { code: 'en-US', name: 'English (US)', nativeName: 'English (United States)', flag: '🇺🇸', rtl: false },
  { code: 'es-ES', name: 'Spanish (Spain)', nativeName: 'Español (España)', flag: '🇪🇸', rtl: false },
  { code: 'fr-FR', name: 'French (France)', nativeName: 'Français (France)', flag: '🇫🇷', rtl: false },
  { code: 'de-DE', name: 'German (Germany)', nativeName: 'Deutsch (Deutschland)', flag: '🇩🇪', rtl: false },
  { code: 'it-IT', name: 'Italian (Italy)', nativeName: 'Italiano (Italia)', flag: '🇮🇹', rtl: false },
  { code: 'ja-JP', name: 'Japanese (Japan)', nativeName: '日本語 (日本)', flag: '🇯🇵', rtl: false },
  { code: 'ko-KR', name: 'Korean (Korea)', nativeName: '한국어 (대한민국)', flag: '🇰🇷', rtl: false },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文 (简体)', flag: '🇨🇳', rtl: false },
  { code: 'ar-SA', name: 'Arabic (Saudi Arabia)', nativeName: 'العربية (السعودية)', flag: '🇸🇦', rtl: true }
];

const themes: Theme[] = [
  { id: 'light', name: 'Light', icon: <Sun className="w-4 h-4" /> },
  { id: 'dark', name: 'Dark', icon: <Moon className="w-4 h-4" /> },
  { id: 'system', name: 'System', icon: <Monitor className="w-4 h-4" /> }
];

export function InternationalHeader({
  className = '',
  onLanguageChange,
  onThemeChange,
  onMenuToggle
}: InternationalHeaderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [currentTheme, setCurrentTheme] = useState<string>('system');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('language');
    const savedTheme = localStorage.getItem('theme');

    if (savedLanguage) {
      const lang = languages.find(l => l.code === savedLanguage);
      if (lang) setCurrentLanguage(lang);
    }

    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setIsLanguageDropdownOpen(false);
    localStorage.setItem('language', language.code);
    onLanguageChange?.(language.code);
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    setIsThemeDropdownOpen(false);
    localStorage.setItem('theme', theme);
    onThemeChange?.(theme);
  };

  const handleMenuToggle = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    onMenuToggle?.(newMenuState);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className={`bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleMenuToggle}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 lg:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Fenix Academy
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-4">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar cursos, tutoriais..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <button
                  type="button"
                  onClick={handleSearchToggle}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={handleSearchToggle}
                className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Buscar...</span>
              </button>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="text-sm font-medium hidden sm:block">
                  {currentLanguage.code.toUpperCase()}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Idioma
                    </div>
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <span className="text-lg">{language.flag}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {language.nativeName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {language.name}
                          </div>
                        </div>
                        {currentLanguage.code === language.code && (
                          <Check className="w-4 h-4 text-blue-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                title="Tema"
              >
                {currentTheme === 'light' ? (
                  <Sun className="w-5 h-5" />
                ) : currentTheme === 'dark' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Monitor className="w-5 h-5" />
                )}
              </button>

              {isThemeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Tema
                    </div>
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        {theme.icon}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {theme.name}
                        </span>
                        {currentTheme === theme.id && (
                          <Check className="w-4 h-4 text-blue-500 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center gap-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* User Dropdown - Simplified for now */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 hidden">
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    <span className="text-gray-900 dark:text-white">Perfil</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    <span className="text-gray-900 dark:text-white">Configurações</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-gray-900 dark:text-white">Sair</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="px-4 py-2 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Cursos
            </a>
            <a href="#" className="block px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Tutoriais
            </a>
            <a href="#" className="block px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Projetos
            </a>
            <a href="#" className="block px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Sobre
            </a>
          </div>
        </div>
      )}
    </header>
  );
}