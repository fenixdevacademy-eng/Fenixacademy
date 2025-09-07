"use client";

import React, { useState, useEffect } from 'react';
import AnimatedComponent from '../../../components/AnimatedComponent';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        router.push('/dashboard');
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatedComponent
          animation="slideUp"
          duration={0.6}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-3xl font-bold text-white">🔥</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Fenix Academy</h1>
          <p className="text-blue-200 text-lg">Transforme sua carreira em tecnologia</p>
        </AnimatedComponent>

        <AnimatedComponent
          animation="scaleIn"
          duration={0.5}
          delay={0.2}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">Bem-vindo de volta!</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-blue-900 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <AnimatedComponent
                animation="slideLeft"
                duration={0.3}
                className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-red-200 text-sm"
              >
                {error}
              </AnimatedComponent>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-blue-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Entrando...' : 'Entrar na Academia'}
            </button>
          </form>
        </AnimatedComponent>

        <AnimatedComponent
          animation="fadeIn"
          duration={0.5}
          delay={0.4}
          className="text-center mt-6"
        >
          <p className="text-blue-200">
            Não tem uma conta?{' '}
            <Link href="/auth/register" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300">
              Registre-se agora
            </Link>
          </p>
        </AnimatedComponent>
      </div>
    </div>
  );
}