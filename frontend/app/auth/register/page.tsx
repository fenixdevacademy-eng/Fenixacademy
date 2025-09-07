"use client";

import React, { useState } from 'react';
import AnimatedComponent from '../../../components/AnimatedComponent';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        setError(data.message || 'Erro no registro');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatedComponent
          animation="slideUp"
          duration={0.6}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-3xl font-bold text-white">🌟</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Fenix Academy</h1>
          <p className="text-teal-200 text-lg">Comece sua jornada hoje mesmo</p>
        </AnimatedComponent>

        <AnimatedComponent
          animation="scaleIn"
          duration={0.5}
          delay={0.2}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">Junte-se à Academia</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-teal-100 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-100 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-100 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-100 mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <AnimatedComponent
                animation="slideLeft"
                className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-red-200 text-sm"
              >
                {error}
              </AnimatedComponent>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-3 px-6 rounded-xl hover:from-green-500 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-teal-200 text-xs">
              Ao criar uma conta, você concorda com nossos{' '}
              <Link href="/terms" className="text-green-400 hover:text-green-300">
                Termos de Serviço
              </Link>
            </p>
          </div>
        </AnimatedComponent>

        <AnimatedComponent
          animation="fadeIn"
          duration={0.5}
          delay={0.4}
          className="text-center mt-6"
        >
          <p className="text-teal-200">
            Já tem uma conta?{' '}
            <Link href="/auth/login" className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-300">
              Faça login
            </Link>
          </p>
        </AnimatedComponent>

        <AnimatedComponent
          animation="slideUp"
          duration={0.5}
          delay={0.6}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="text-teal-200">
            <div className="text-2xl mb-1">🎓</div>
            <div className="text-xs">Certificação</div>
          </div>
          <div className="text-teal-200">
            <div className="text-2xl mb-1">💻</div>
            <div className="text-xs">Projetos Reais</div>
          </div>
          <div className="text-teal-200">
            <div className="text-2xl mb-1">🚀</div>
            <div className="text-xs">Carreira</div>
          </div>
        </AnimatedComponent>
      </div>
    </div>
  );
}