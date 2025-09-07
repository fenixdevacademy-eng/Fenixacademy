'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  User,
  BookOpen,
  GraduationCap,
  Users,
  MessageCircle,
  Bell,
  Search,
  LogOut,
  TrendingUp,
  Crown,
  Code
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Cursos', href: '/courses', icon: BookOpen },
    { name: 'IDE 2.0', href: '/fenix-ide-v2', icon: Code },
    { name: 'Assinaturas', href: '/assinaturas', icon: Crown },
    { name: 'Carreiras', href: '/careers', icon: GraduationCap },
    { name: 'Gestão de Tráfego', href: '/gestao-trafego', icon: TrendingUp },
    { name: 'Meu Perfil', href: '/profile', icon: User },
    { name: 'Comunidade', href: '/community', icon: Users },
    { name: 'Suporte', href: '/support', icon: MessageCircle },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700'
      : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <svg width="48" height="48" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                <defs>
                  <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#FF6B35", stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: "#F7931E", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Círculo de fundo */}
                <circle cx="100" cy="100" r="90" fill="url(#phoenixGradient)" opacity="0.9" />

                {/* Corpo da Fênix */}
                <path d="M100 160 Q80 140 70 120 Q60 100 70 80 Q80 60 100 40 Q120 60 130 80 Q140 100 130 120 Q120 140 100 160"
                  fill="#FF4500" stroke="#8B0000" strokeWidth="2" />

                {/* Asas */}
                <path d="M60 90 Q40 70 30 50 Q20 30 40 20 Q60 30 70 50 Q80 70 60 90"
                  fill="#FF6347" stroke="#8B0000" strokeWidth="1.5" />
                <path d="M140 90 Q160 70 170 50 Q180 30 160 20 Q140 30 130 50 Q120 70 140 90"
                  fill="#FF6347" stroke="#8B0000" strokeWidth="1.5" />

                {/* Cabeça */}
                <circle cx="100" cy="50" r="15" fill="#FFD700" />

                {/* Bico */}
                <path d="M100 35 L95 25 L105 25 Z" fill="#FF4500" />

                {/* Olhos */}
                <circle cx="95" cy="45" r="3" fill="#000" />
                <circle cx="105" cy="45" r="3" fill="#000" />

                {/* Chamas */}
                <path d="M90 30 Q85 20 90 15 Q95 20 90 30" fill="#FF4500" opacity="0.8" />
                <path d="M110 30 Q115 20 110 15 Q105 20 110 30" fill="#FF4500" opacity="0.8" />

                {/* Cauda com chamas */}
                <path d="M100 160 Q90 170 80 180 Q70 190 60 185 Q70 175 80 165 Q90 155 100 160"
                  fill="#FFD700" opacity="0.9" />
                <path d="M100 160 Q110 170 120 180 Q130 190 140 185 Q130 175 120 165 Q110 155 100 160"
                  fill="#FFD700" opacity="0.9" />

                {/* Efeito de brilho */}
                <circle cx="100" cy="100" r="60" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.3" filter="url(#glow)" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl lg:text-2xl transition-colors ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
                }`}>
                FENIX DEV
              </span>
              <span className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 dark:text-gray-400' : 'text-blue-200'
                }`}>
                ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <button className={`p-2 rounded-lg transition-all duration-200 ${isScrolled
              ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}>
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className={`p-2 rounded-lg transition-all duration-200 relative ${isScrolled
              ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                  >
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Meu Perfil
                    </Link>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Dashboard
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Configurações
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => {
                        // Simular logout
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Link href="/courses" className="btn-primary">
              Começar Agora
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Aluno Fenix</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className="text-sm text-white/90 hover:text-white transition-colors">
                    Entrar
                  </Link>
                  <Link href="/auth/register" className="text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg transition-colors">
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${isScrolled
              ? 'text-gray-600 dark:text-gray-400'
              : 'text-white'
              }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="px-4 py-2 space-y-2">
                  <Link href="/profile" className="block py-2 text-gray-700 dark:text-gray-300">
                    Meu Perfil
                  </Link>
                  <Link href="/dashboard" className="block py-2 text-gray-700 dark:text-gray-300">
                    Dashboard
                  </Link>
                  <Link href="/settings" className="block py-2 text-gray-700 dark:text-gray-300">
                    Configurações
                  </Link>
                </div>

                <div className="px-4 pt-4 space-y-2">
                  <Link href="/courses" className="btn-primary w-full text-center">
                    Começar Agora
                  </Link>
                  <div className="flex space-x-2">
                    {isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        className="flex-1 text-center py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Sair
                      </button>
                    ) : (
                      <>
                        <Link href="/auth/login" className="flex-1 text-center py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          Entrar
                        </Link>
                        <Link href="/auth/register" className="flex-1 text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Cadastrar
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 