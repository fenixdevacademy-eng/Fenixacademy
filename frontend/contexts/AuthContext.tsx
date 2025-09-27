'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { verifyToken } from '@/lib/auth/jwt';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  access_level: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (token: string, userData?: User) => void;
  logout: () => void;
  isCEO: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Aguardar hidratação antes de acessar localStorage
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try {
          const savedToken = localStorage.getItem('fenix-jwt-token');
          const savedUser = localStorage.getItem('fenix_user');

          if (savedToken && savedUser) {
            // Verificar se o token ainda é válido
            const decoded = verifyToken(savedToken);
            if (decoded) {
              const userData = JSON.parse(savedUser);
              setUser(userData);
              setIsAuthenticated(true);
            } else {
              // Token inválido, limpar dados
              localStorage.removeItem('fenix-jwt-token');
              localStorage.removeItem('fenix_user');
            }
          }
        } catch (error) {
          console.error('Erro ao verificar token:', error);
          // Limpar dados em caso de erro
          if (typeof window !== 'undefined') {
            localStorage.removeItem('fenix-jwt-token');
            localStorage.removeItem('fenix_user');
          }
        }
        setIsHydrated(true);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const login = (token: string, userData?: User) => {
    if (!userData) {
      console.error('Dados do usuário são obrigatórios para login');
      return;
    }

    // Limpar dados antigos primeiro
    localStorage.removeItem('fenix_user');
    localStorage.removeItem('fenix-jwt-token');

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('fenix_user', JSON.stringify(userData));
    localStorage.setItem('fenix-jwt-token', token);
    console.log('✅ Login realizado:', userData.name);
  }

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fenix_user');
    localStorage.removeItem('fenix-jwt-token');
    console.log('👋 Logout realizado');
  }

  const isCEO = user?.role === 'CEO' && user?.access_level === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isHydrated,
      login,
      logout,
      isCEO
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}