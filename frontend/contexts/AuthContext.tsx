'use client';

import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  access_level: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isCEO: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('fenix_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Verificar credenciais do CEO
    if (email === 'fenixdevacademy@gmail.com' && password === '060223lk') {
      const ceoUser: User = {
        id: 1,
        name: 'Lucas Silva Petris',
        email: 'fenixdevacademy@gmail.com',
        role: 'CEO',
        access_level: 'admin'
      };
      
      setUser(ceoUser);
      setIsAuthenticated(true);
      localStorage.setItem('fenix_user', JSON.stringify(ceoUser));
      return true;
    }
    
    // Aqui você pode adicionar outras verificações de usuário
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fenix_user');
  };

  const isCEO = user?.role === 'CEO' && user?.access_level === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      isCEO
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}