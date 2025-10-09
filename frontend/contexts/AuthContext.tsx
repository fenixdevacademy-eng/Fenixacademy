'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
            try {
              const userData = JSON.parse(savedUser);
              setUser(userData);
              setIsAuthenticated(true);
            } catch (tokenError) {
              console.error('Erro ao verificar token:', tokenError);
              localStorage.removeItem('fenix-jwt-token');
              localStorage.removeItem('fenix_user');
            }
          }
        } catch (error) {
          console.error('Erro geral no AuthContext:', error);
          if (typeof window !== 'undefined') {
            try {
              localStorage.removeItem('fenix-jwt-token');
              localStorage.removeItem('fenix_user');
            } catch (storageError) {
              console.error('Erro ao limpar localStorage:', storageError);
            }
          }
        } finally {
          setIsHydrated(true);
        }
      } else {
        // Se não estiver no browser, apenas marcar como hidratado
        setIsHydrated(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const login = (token: string, userData?: User) => {
    if (!userData) {
      console.error('Dados do usuário são obrigatórios para login');
      return;
    }

    // Limpar dados antigos primeiro
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fenix_user');
      localStorage.removeItem('fenix-jwt-token');
    }

    setUser(userData);
    setIsAuthenticated(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('fenix_user', JSON.stringify(userData));
      localStorage.setItem('fenix-jwt-token', token);
    }

    console.log('✅ Login realizado:', userData.name);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('fenix_user');
      localStorage.removeItem('fenix-jwt-token');
    }

    console.log('👋 Logout realizado');
  };

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
    // Retornar valores padrão durante SSR
    return {
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      login: () => { },
      logout: () => { },
      isCEO: false
    };
  }
  return context;
}