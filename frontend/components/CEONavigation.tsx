'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function CEONavigation() {
  const { isCEO } = useAuth();

  if (!isCEO) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 border-b border-purple-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm font-medium">
              👑 Área do CEO
            </span>
            <div className="flex space-x-4">
              <Link 
                href="/ceo-dashboard" 
                className="text-white hover:text-purple-200 text-sm transition duration-300"
              >
                Dashboard Executivo
              </Link>
              <Link 
                href="/gestao-trafego" 
                className="text-white hover:text-purple-200 text-sm transition duration-300"
              >
                Gestão de Tráfego
              </Link>
              <Link 
                href="/my-courses" 
                className="text-white hover:text-purple-200 text-sm transition duration-300"
              >
                Todos os Cursos
              </Link>
            </div>
          </div>
          <div className="text-white text-xs">
            Acesso Total • Lucas Silva Petris
          </div>
        </div>
      </div>
    </div>
  );
}