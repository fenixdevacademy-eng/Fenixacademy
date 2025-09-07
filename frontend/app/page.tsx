"use client";

import React, { useState, useEffect } from 'react';
import AnimatedComponent from '../components/AnimatedComponent';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import IDEDemo from '../components/IDEDemo';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState(0);

  // Rastrear posição do mouse para efeitos parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Rotação automática dos benefícios
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: "✅",
      title: "Garantia de 30 dias",
      subtitle: "100% de satisfação",
      gradient: "from-green-500 to-emerald-500",
      description: "Se não ficar satisfeito, devolvemos seu dinheiro"
    },
    {
      icon: "🔒",
      title: "Pagamento seguro",
      subtitle: "SSL certificado",
      gradient: "from-blue-500 to-cyan-500",
      description: "Transações protegidas com criptografia avançada"
    },
    {
      icon: "🎯",
      title: "Acesso vitalício",
      subtitle: "Sem mensalidades",
      gradient: "from-yellow-500 to-orange-500",
      description: "Aprenda no seu ritmo, sem pressão de tempo"
    }
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Hero Section - Design Premium com Interatividade */}
        <section
          className="relative overflow-hidden py-24 lg:py-32"
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
        >
          {/* Background Elements Interativos */}
          <div className="absolute inset-0">
            <div
              className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000"
              style={{
                transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`,
                scale: isHoveringHero ? 1.2 : 1
              }}
            ></div>
            <div
              className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000"
              style={{
                transform: `translate(${(mousePosition.x - window.innerWidth / 2) * -0.03}px, ${(mousePosition.y - window.innerHeight / 2) * -0.03}px)`,
                scale: isHoveringHero ? 1.3 : 1
              }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse transition-all duration-1000"
              style={{
                transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`,
                scale: isHoveringHero ? 1.1 : 1
              }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Conteúdo Principal - Design Premium com Interatividade */}
              <AnimatedComponent
                animation="slideLeft"
                delay={0.3}
                duration={0.8}
                className="text-left"
              >
                {/* Tag Premium Interativa */}
                <div className="group inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl mb-8 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-bold tracking-wide group-hover:scale-105 transition-transform duration-300">#1 PLATAFORMA DE ENSINO DE PROGRAMAÇÃO</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">
                    🚀
                  </div>
                </div>

                {/* Título Principal - Design Revolucionário com Interatividade */}
                <h1 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
                  Transforme sua{' '}
                  <span
                    className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse hover:animate-bounce transition-all duration-300 cursor-pointer inline-block hover:scale-110"
                    title="Clique para ver mais sobre carreiras!"
                  >
                    carreira
                  </span>
                  <br />
                  <span
                    className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent hover:animate-pulse transition-all duration-300 cursor-pointer inline-block hover:scale-110"
                    title="Clique para ver mais sobre programação!"
                  >
                    com programação
                  </span>
                </h1>

                {/* Descrição Premium com Interatividade */}
                <p className="text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl font-light">
                  Aprenda programação do{' '}
                  <span className="text-white font-semibold hover:text-blue-300 transition-colors duration-300 cursor-pointer" title="Do básico ao avançado!">
                    zero ao avançado
                  </span>{' '}
                  com projetos reais,{' '}
                  <span className="text-white font-semibold hover:text-purple-300 transition-colors duration-300 cursor-pointer" title="Mentoria personalizada disponível!">
                    mentoria personalizada
                  </span>{' '}
                  e uma{' '}
                  <span className="text-white font-semibold hover:text-green-300 transition-colors duration-300 cursor-pointer" title="Comunidade ativa de desenvolvedores!">
                    comunidade ativa
                  </span>{' '}
                  de desenvolvedores.
                </p>

                {/* Botões de Call-to-Action - Design Premium com Interatividade */}
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <AnimatedComponent
                    animation="scaleIn"
                    className="hover:scale-105 active:scale-95 transition-transform duration-200"
                  >
                    <Link href="/assinaturas" className="group inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-10 py-5 rounded-2xl text-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden">
                      <span className="relative z-10">Ver Assinaturas</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10">→</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </AnimatedComponent>

                  <AnimatedComponent
                    animation="scaleIn"
                    className="hover:scale-105 active:scale-95 transition-transform duration-200"
                  >
                    <Link href="/courses" className="group inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl text-white font-bold px-10 py-5 rounded-2xl text-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-2xl hover:shadow-white/25 relative overflow-hidden">
                      <span className="relative z-10">Ver Cursos</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10">→</span>
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </AnimatedComponent>

                  <AnimatedComponent
                    animation="scaleIn"
                    className="hover:scale-105 active:scale-95 transition-transform duration-200"
                  >
                    <Link href="/auth/register" className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-8 py-5 rounded-2xl text-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden">
                      <span className="relative z-10">Cadastrar</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10">→</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </AnimatedComponent>
                </div>

                {/* Benefícios Premium com Interatividade Avançada */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`group relative p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden ${activeBenefit === index ? 'ring-2 ring-white/30 scale-105' : ''
                        }`}
                      onClick={() => setActiveBenefit(index)}
                      onMouseEnter={() => setActiveBenefit(index)}
                    >
                      {/* Background animado */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                      {/* Conteúdo */}
                      <div className="relative z-10 flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">{benefit.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">
                            {benefit.title}
                          </div>
                          <div className="text-gray-400 text-sm group-hover:text-blue-200 transition-colors duration-300">
                            {benefit.subtitle}
                          </div>
                        </div>
                      </div>

                      {/* Descrição expandida */}
                      <div className={`mt-3 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${activeBenefit === index ? 'opacity-100 translate-y-0' : ''
                        }`}>
                        {benefit.description}
                      </div>

                      {/* Indicador de ativo */}
                      {activeBenefit === index && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedComponent>

              {/* Lado Direito - Hero Visual Premium com Interatividade */}
              <AnimatedComponent
                animation="slideRight"
                delay={0.5}
                duration={0.8}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-lg lg:max-w-xl group">
                  {/* Card Principal com Interatividade */}
                  <div
                    className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer"
                    style={{
                      transform: `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg)`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl group-hover:opacity-20 transition-opacity duration-500"></div>

                    {/* Header do Card com Interatividade */}
                    <div className="relative z-10 text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <span className="text-4xl group-hover:animate-bounce">🚀</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Fenix Academy</h3>
                      <p className="text-blue-200 text-lg group-hover:text-blue-100 transition-colors duration-300">Transformando carreiras através da tecnologia</p>
                    </div>

                    {/* Stats do Card com Interatividade */}
                    <div className="relative z-10 grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <div className="text-5xl font-black text-yellow-400 mb-3 group-hover:text-yellow-300 group-hover:scale-110 transition-all duration-300">50K+</div>
                        <div className="text-blue-200 text-sm group-hover:text-blue-100 transition-colors duration-300">Alunos Ativos</div>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <div className="text-5xl font-black text-purple-400 mb-3 group-hover:text-purple-300 group-hover:scale-110 transition-all duration-300">200+</div>
                        <div className="text-blue-200 text-sm group-hover:text-blue-100 transition-colors duration-300">Cursos</div>
                      </div>
                    </div>

                    {/* Badge de Oferta com Interatividade */}
                    <div className="relative z-10 mt-6 text-center">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse hover:animate-bounce transition-all duration-300 cursor-pointer group">
                        <span className="group-hover:rotate-12 transition-transform duration-300">🔥</span>
                        <span>OFERTA LIMITADA</span>
                      </div>
                    </div>
                  </div>

                  {/* Elementos Flutuantes com Interatividade */}
                  <div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce hover:animate-spin transition-all duration-300 cursor-pointer group"
                    style={{
                      transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.05}px, ${(mousePosition.y - window.innerHeight / 2) * 0.05}px)`
                    }}
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">⚡</span>
                  </div>
                  <div
                    className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce hover:animate-ping transition-all duration-300 cursor-pointer group"
                    style={{
                      transform: `translate(${(mousePosition.x - window.innerWidth / 2) * -0.03}px, ${(mousePosition.y - window.innerHeight / 2) * -0.03}px)`
                    }}
                  >
                    <span className="text-xl group-hover:scale-125 transition-transform duration-300">💎</span>
                  </div>
                </div>
              </AnimatedComponent>
            </div>
          </div>
        </section>

        {/* Seção de Cursos em Destaque - Design Premium com Interatividade */}
        <section className="py-24 bg-gradient-to-br from-white/5 via-blue-900/20 to-purple-900/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedComponent
              animation="fadeIn"
              duration={0.8}
              className="text-center mb-20"
            >
              <div className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-6 py-3 rounded-2xl border border-blue-500/30 mb-8 hover:from-blue-500/30 hover:to-purple-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">⭐</span>
                <span className="text-sm font-bold tracking-wide group-hover:scale-105 transition-transform duration-300">CURSOS EM DESTAQUE</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                Cursos{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:animate-pulse transition-all duration-300 cursor-pointer inline-block hover:scale-110">
                  Revolucionários
                </span>
              </h2>

              <p className="text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed font-light">
                Escolha entre nossa ampla gama de cursos e comece sua jornada
                em desenvolvimento web, mobile, DevOps e muito mais.
              </p>
            </AnimatedComponent>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Curso 1 - Fundamentos Web com Interatividade Avançada */}
              <AnimatedComponent
                animation="slideUp"
                delay={0.1}
                duration={0.6}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden cursor-pointer"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  <span className="text-white text-xs font-bold">🔥</span>
                </div>

                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="text-4xl group-hover:animate-bounce">🌐</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                      <span className="text-white text-xs font-bold">🔥</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    Fundamentos Web
                  </h3>

                  <p className="text-blue-200 mb-6 leading-relaxed text-lg group-hover:text-blue-100 transition-colors duration-300">
                    Aprenda HTML, CSS e JavaScript do zero com projetos práticos e mentoria personalizada.
                  </p>

                  <div className="space-y-4 mb-6">
                    {['HTML5 Semântico', 'CSS3 Avançado', 'JavaScript ES6+'].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-black text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">R$ 97</span>
                      <span className="text-gray-400 line-through text-sm group-hover:text-gray-300 transition-colors duration-300">R$ 197</span>
                    </div>
                    <div className="text-green-400 text-sm font-bold bg-green-500/20 px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                      -51%
                    </div>
                  </div>

                  <Link href="/courses/fundamentos-desenvolvimento-web" className="group/btn w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-2xl text-lg hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2 relative overflow-hidden">
                    <span className="relative z-10">Saiba mais</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10">→</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </AnimatedComponent>

              {/* Curso 2 - React Avançado com Interatividade Avançada */}
              <AnimatedComponent
                animation="slideUp"
                delay={0.2}
                duration={0.6}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-500/25 relative overflow-hidden cursor-pointer"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  <span className="text-white text-xs font-bold">⚡</span>
                </div>

                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="text-4xl group-hover:animate-bounce">⚛️</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                      <span className="text-white text-xs font-bold">⚡</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors duration-300">
                    React Avançado
                  </h3>

                  <p className="text-blue-200 mb-6 leading-relaxed text-lg group-hover:text-blue-100 transition-colors duration-300">
                    Domine React com hooks, context, padrões avançados e arquitetura escalável.
                  </p>

                  <div className="space-y-4 mb-6">
                    {['Hooks Avançados', 'Context API', 'Performance'].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-black text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">R$ 97</span>
                      <span className="text-gray-400 line-through text-sm group-hover:text-gray-300 transition-colors duration-300">R$ 297</span>
                    </div>
                    <div className="text-green-400 text-sm font-bold bg-green-500/20 px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                      -67%
                    </div>
                  </div>

                  <Link href="/courses/react-js-avancado" className="group/btn w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-4 rounded-2xl text-lg hover:from-green-400 hover:to-teal-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25 flex items-center justify-center space-x-2 relative overflow-hidden">
                    <span className="relative z-10">Saiba mais</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10">→</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </AnimatedComponent>

              {/* Curso 3 - Python Data Science com Interatividade Avançada */}
              <AnimatedComponent
                animation="slideUp"
                delay={0.3}
                duration={0.6}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-yellow-500/25 relative overflow-hidden cursor-pointer"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  <span className="text-white text-xs font-bold">🚀</span>
                </div>

                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="text-4xl group-hover:animate-bounce">🐍</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                      <span className="text-white text-xs font-bold">🚀</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                    Python Data Science
                  </h3>

                  <p className="text-blue-200 mb-6 leading-relaxed text-lg group-hover:text-blue-100 transition-colors duration-300">
                    Análise de dados, machine learning e visualização com Python e bibliotecas modernas.
                  </p>

                  <div className="space-y-4 mb-6">
                    {['Pandas & NumPy', 'Machine Learning', 'Visualização'].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-black text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">R$ 97</span>
                      <span className="text-gray-400 line-through text-sm group-hover:text-gray-300 transition-colors duration-300">R$ 397</span>
                    </div>
                    <div className="text-green-400 text-sm font-bold bg-green-500/20 px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                      -76%
                    </div>
                  </div>

                  <Link href="/courses/python-data-science" className="group/btn w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-4 rounded-2xl text-lg hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 flex items-center justify-center space-x-2 relative overflow-hidden">
                    <span className="relative z-10">Saiba mais</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10">→</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </AnimatedComponent>
            </div>

            {/* CTA para Ver Todos os Cursos com Interatividade */}
            <div className="text-center mt-16">
              <AnimatedComponent
                animation="fadeIn"
                delay={0.5}
                duration={0.8}
              >
                <Link href="/courses" className="group inline-flex items-center space-x-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl text-white font-bold px-12 py-5 rounded-2xl text-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-2xl hover:shadow-white/25 relative overflow-hidden hover:scale-105">
                  <span className="relative z-10">Ver Todos os Cursos</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10">→</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </AnimatedComponent>
            </div>
          </div>
        </section>

        {/* Seção da IDE - Demonstração Interativa */}
        <IDEDemo />

        {/* Seção de Estatísticas - Design Premium com Interatividade Avançada */}
        <section className="py-24 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Estatística 1 - Alunos Ativos */}
              <AnimatedComponent
                animation="scaleIn"
                delay={0.1}
                duration={0.6}
                className="group text-center p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer relative overflow-hidden"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-3xl group-hover:animate-bounce">👥</span>
                  </div>
                  <div className="text-5xl font-black text-yellow-400 mb-3 group-hover:text-yellow-300 group-hover:scale-110 transition-all duration-300">
                    50K+
                  </div>
                  <div className="text-blue-200 text-lg font-semibold group-hover:text-blue-100 transition-colors duration-300">
                    Alunos Ativos
                  </div>
                  <div className="text-gray-400 text-sm mt-2 group-hover:text-gray-300 transition-colors duration-300">
                    Em todo o Brasil
                  </div>

                  {/* Barra de progresso animada */}
                  <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full group-hover:animate-pulse transition-all duration-500" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </AnimatedComponent>

              {/* Estatística 2 - Cursos Disponíveis */}
              <AnimatedComponent
                animation="scaleIn"
                delay={0.2}
                duration={0.6}
                className="group text-center p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer relative overflow-hidden"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-3xl group-hover:animate-bounce">📚</span>
                  </div>
                  <div className="text-5xl font-black text-purple-400 mb-3 group-hover:text-purple-300 group-hover:scale-110 transition-all duration-300">
                    200+
                  </div>
                  <div className="text-blue-200 text-lg font-semibold group-hover:text-blue-100 transition-colors duration-300">
                    Cursos Disponíveis
                  </div>
                  <div className="text-gray-400 text-sm mt-2 group-hover:text-gray-300 transition-colors duration-300">
                    Do básico ao avançado
                  </div>

                  {/* Barra de progresso animada */}
                  <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full group-hover:animate-pulse transition-all duration-500" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </AnimatedComponent>

              {/* Estatística 3 - Taxa de Satisfação */}
              <AnimatedComponent
                animation="scaleIn"
                delay={0.3}
                duration={0.6}
                className="group text-center p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 cursor-pointer relative overflow-hidden"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-3xl group-hover:animate-bounce">⭐</span>
                  </div>
                  <div className="text-5xl font-black text-green-400 mb-3 group-hover:text-green-300 group-hover:scale-110 transition-all duration-300">
                    95%
                  </div>
                  <div className="text-blue-200 text-lg font-semibold group-hover:text-blue-100 transition-colors duration-300">
                    Taxa de Satisfação
                  </div>
                  <div className="text-gray-400 text-sm mt-2 group-hover:text-gray-300 transition-colors duration-300">
                    Alunos recomendam
                  </div>

                  {/* Estrelas animadas */}
                  <div className="flex justify-center mt-4 space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="text-yellow-400 group-hover:animate-pulse transition-all duration-300"
                        style={{ animationDelay: `${star * 100}ms` }}
                      >
                        ★
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedComponent>

              {/* Estatística 4 - Suporte Disponível */}
              <AnimatedComponent
                animation="scaleIn"
                delay={0.4}
                duration={0.6}
                className="group text-center p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 cursor-pointer relative overflow-hidden"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-3xl group-hover:animate-bounce">🔄</span>
                  </div>
                  <div className="text-5xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300">
                    24/7
                  </div>
                  <div className="text-blue-200 text-lg font-semibold group-hover:text-blue-100 transition-colors duration-300">
                    Suporte Disponível
                  </div>
                  <div className="text-gray-400 text-sm mt-2 group-hover:text-gray-300 transition-colors duration-300">
                    Sempre online
                  </div>

                  {/* Indicador de status online */}
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse group-hover:animate-bounce"></div>
                    <span className="text-green-400 text-sm font-medium group-hover:text-green-300 transition-colors duration-300">
                      Online
                    </span>
                  </div>
                </div>
              </AnimatedComponent>
            </div>
          </div>
        </section>

        {/* Seção de Depoimentos - Design Premium com Interatividade Avançada */}
        <section className="py-24 bg-gradient-to-br from-white/5 via-purple-900/10 to-blue-900/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedComponent
              animation="fadeIn"
              duration={0.8}
              className="text-center mb-20"
            >
              <div className="group inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-6 py-3 rounded-2xl border border-purple-500/30 mb-8 hover:from-purple-500/30 hover:to-pink-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">💬</span>
                <span className="text-sm font-bold tracking-wide group-hover:scale-105 transition-transform duration-300">DEPOIMENTOS REAIS</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                O que nossos{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent hover:animate-pulse transition-all duration-300 cursor-pointer inline-block hover:scale-110">
                  alunos dizem
                </span>
              </h2>

              <p className="text-2xl text-purple-200 max-w-4xl mx-auto leading-relaxed font-light">
                Histórias reais de transformação e sucesso na carreira de milhares de desenvolvedores.
              </p>
            </AnimatedComponent>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Depoimento 1 - Maria Silva com Interatividade */}
              <AnimatedComponent
                animation="slideUp"
                delay={0.1}
                duration={0.6}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer relative overflow-hidden"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      M
                    </div>
                    <div className="ml-4">
                      <div className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors duration-300">
                        Maria Silva
                      </div>
                      <div className="text-blue-200 text-sm group-hover:text-blue-100 transition-colors duration-300">
                        Desenvolvedora Frontend
                      </div>
                      <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                        São Paulo, SP
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <svg className="absolute top-0 left-0 w-8 h-8 text-yellow-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-300 text-lg leading-relaxed pl-8 group-hover:text-gray-200 transition-colors duration-300">
                      "A Fenix Academy transformou minha carreira completamente. Em 6 meses consegui meu primeiro emprego como desenvolvedora frontend com salário 3x maior!"
                    </p>
                    <svg className="absolute bottom-0 right-0 w-8 h-8 text-yellow-400 opacity-20 transform rotate-180 group-hover:opacity-40 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex text-yellow-400 text-xl group-hover:scale-110 transition-transform duration-300">
                      ★★★★★
                    </div>
                    <div className="text-green-400 text-sm font-bold bg-green-500/20 px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                      Verificado
                    </div>
                  </div>

                  {/* Barra de progresso do salário */}
                  <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full group-hover:animate-pulse transition-all duration-500" style={{ width: '300%' }}></div>
                  </div>
                  <div className="text-center mt-2 text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Salário: 3x maior
                  </div>
                </div>
              </AnimatedComponent>

              {/* Depoimento 2 - João Santos com Interatividade */}
              <AnimatedComponent
                animation="slideUp"
                delay={0.2}
                duration={0.6}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-500/25 cursor-pointer relative overflow-hidden"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      J
                    </div>
                    <div className="ml-4">
                      <div className="text-white font-bold text-lg group-hover:text-green-300 transition-colors duration-300">
                        João Santos
                      </div>
                      <div className="text-green-200 text-sm group-hover:text-green-100 transition-colors duration-300">
                        Full Stack Developer
                      </div>
                      <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                        Rio de Janeiro, RJ
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <svg className="absolute top-0 left-0 w-8 h-8 text-yellow-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-300 text-lg leading-relaxed pl-8 group-hover:text-gray-200 transition-colors duration-300">
                      "Os projetos práticos e a mentoria personalizada fizeram toda a diferença no meu aprendizado. Hoje trabalho em uma startup de sucesso!"
                    </p>
                    <svg className="absolute bottom-0 right-0 w-8 h-8 text-yellow-400 opacity-20 transform rotate-180 group-hover:opacity-40 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex text-yellow-400 text-xl group-hover:scale-110 transition-transform duration-300">
                      ★★★★★
                    </div>
                    <div className="text-green-400 text-sm font-bold bg-green-500/20 px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                      Verificado
                    </div>
                  </div>

                  {/* Badge de startup */}
                  <div className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium group-hover:scale-105 transition-transform duration-300">
                    <span>🚀</span>
                    <span>Startup de Sucesso</span>
                  </div>
                </div>
              </AnimatedComponent>

              {/* Depoimento 3 - Ana Costa com Interatividade */}
              <AnimatedComponent
                animation="slideUp"
                delay={0.3}
                duration={0.6}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-yellow-500/25 cursor-pointer relative overflow-hidden"
              >
                {/* Background animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Elementos flutuantes */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      A
                    </div>
                    <div className="ml-4">
                      <div className="text-white font-bold text-lg group-hover:text-yellow-300 transition-colors duration-300">
                        Ana Costa
                      </div>
                      <div className="text-yellow-200 text-sm group-hover:text-yellow-100 transition-colors duration-300">
                        Data Scientist
                      </div>
                      <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                        Belo Horizonte, MG
                      </div>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <svg className="absolute top-0 left-0 w-8 h-8 text-yellow-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-300 text-lg leading-relaxed pl-8 group-hover:text-gray-200 transition-colors duration-300">
                      "Consegui migrar de área e hoje trabalho com dados em uma empresa de tecnologia. A Fenix me deu a base perfeita para essa transição!"
                    </p>
                    <svg className="absolute bottom-0 right-0 w-8 h-8 text-yellow-400 opacity-20 transform rotate-180 group-hover:opacity-40 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex text-yellow-400 text-xl group-hover:scale-110 transition-transform duration-300">
                      ★★★★★
                    </div>
                    <div className="text-green-400 text-sm font-bold bg-green-500/20 px-3 py-1 rounded-full group-hover:scale-110 transition-transform duration-300">
                      Verificado
                    </div>
                  </div>

                  {/* Badge de migração de carreira */}
                  <div className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-medium group-hover:scale-105 transition-transform duration-300">
                    <span>🔄</span>
                    <span>Migração de Carreira</span>
                  </div>
                </div>
              </AnimatedComponent>
            </div>

            {/* CTA para Ver Mais Depoimentos com Interatividade */}
            <div className="text-center mt-16">
              <AnimatedComponent
                animation="fadeIn"
                delay={0.5}
                duration={0.8}
              >
                <Link href="/testimonials" className="group inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl text-purple-300 font-bold px-12 py-5 rounded-2xl text-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden hover:scale-105">
                  <span className="relative z-10">Ver Mais Depoimentos</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10">→</span>
                  <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </AnimatedComponent>
            </div>
          </div>
        </section>

        {/* Seção CTA Final - Design Premium com Interatividade Avançada */}
        <section className="py-24 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-sm relative overflow-hidden">
          {/* Background Elements Interativos */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse transition-all duration-1000" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <AnimatedComponent
                animation="fadeIn"
                duration={0.8}
                className="mb-12"
              >
                <div className="group inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-6 py-3 rounded-2xl border border-yellow-500/30 mb-8 hover:from-yellow-500/30 hover:to-orange-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                  <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🚀</span>
                  <span className="text-sm font-bold tracking-wide group-hover:scale-105 transition-transform duration-300">OFERTA LIMITADA</span>
                </div>

                <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
                  Comece sua{' '}
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent hover:animate-pulse transition-all duration-300 cursor-pointer inline-block hover:scale-110">
                    jornada
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:animate-pulse transition-all duration-300 cursor-pointer inline-block hover:scale-110">
                    hoje mesmo
                  </span>
                </h2>

                <p className="text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed font-light mb-12">
                  Junte-se a mais de 50.000 desenvolvedores que já transformaram suas carreiras com a Fenix Academy.
                  <br />
                  <span className="text-white font-semibold hover:text-yellow-300 transition-colors duration-300 cursor-pointer">
                    Aproveite a oferta especial de lançamento!
                  </span>
                </p>
              </AnimatedComponent>

              {/* Cards de Benefícios com Interatividade */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    icon: "💎",
                    title: "Acesso Vitalício",
                    description: "Todos os cursos inclusos para sempre",
                    gradient: "from-blue-500 to-purple-500",
                    color: "blue"
                  },
                  {
                    icon: "🎯",
                    title: "Preço Especial",
                    description: "R$ 97 em vez de R$ 997",
                    gradient: "from-green-500 to-emerald-500",
                    color: "green"
                  },
                  {
                    icon: "⏰",
                    title: "Oferta Limitada",
                    description: "Apenas para os primeiros 1.000 alunos",
                    gradient: "from-red-500 to-pink-500",
                    color: "red"
                  }
                ].map((benefit, index) => (
                  <AnimatedComponent
                    key={index}
                    animation="scaleIn"
                    delay={0.1 + index * 0.1}
                    duration={0.6}
                    className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden"
                  >
                    {/* Background animado */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>

                    {/* Elementos flutuantes */}
                    <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${benefit.gradient} rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}></div>

                    <div className="relative z-10 text-center">
                      <div className={`w-20 h-20 bg-gradient-to-r ${benefit.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        <span className="text-4xl group-hover:animate-bounce">{benefit.icon}</span>
                      </div>

                      <h3 className={`text-2xl font-bold text-white mb-4 group-hover:text-${benefit.color}-300 transition-colors duration-300`}>
                        {benefit.title}
                      </h3>

                      <p className="text-blue-200 text-lg group-hover:text-blue-100 transition-colors duration-300">
                        {benefit.description}
                      </p>

                      {/* Indicador de destaque */}
                      <div className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-medium group-hover:scale-105 transition-transform duration-300">
                        <span>✨</span>
                        <span>Exclusivo</span>
                      </div>
                    </div>
                  </AnimatedComponent>
                ))}
              </div>

              {/* Botões de Ação com Interatividade Avançada */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <AnimatedComponent
                  animation="slideUp"
                  delay={0.4}
                  duration={0.6}
                  className="hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <Link href="/checkout" className="group inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-12 py-6 rounded-2xl text-2xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 relative overflow-hidden">
                    <span className="relative z-10">Começar Agora</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10">🚀</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </AnimatedComponent>

                <AnimatedComponent
                  animation="slideUp"
                  delay={0.5}
                  duration={0.6}
                  className="hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <Link href="/courses" className="group inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl text-white font-bold px-12 py-6 rounded-2xl text-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-2xl hover:shadow-white/25 relative overflow-hidden">
                    <span className="relative z-10">Ver Cursos</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10">📚</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </AnimatedComponent>
              </div>

              {/* Contador Regressivo com Interatividade */}
              <AnimatedComponent
                animation="fadeIn"
                delay={0.6}
                duration={0.8}
                className="mb-12"
              >
                <div className="group inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 px-6 py-3 rounded-2xl border border-red-500/30 hover:from-red-500/30 hover:to-pink-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                  <span className="text-2xl group-hover:animate-pulse">⏰</span>
                  <span className="text-sm font-bold tracking-wide group-hover:scale-105 transition-transform duration-300">
                    OFERTA EXPIRA EM: 23:59:59
                  </span>
                </div>
              </AnimatedComponent>

              {/* Garantias com Interatividade */}
              <AnimatedComponent
                animation="fadeIn"
                delay={0.7}
                duration={0.8}
              >
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                  {[
                    { icon: "✅", text: "Garantia de 30 dias" },
                    { icon: "🔒", text: "Pagamento 100% seguro" },
                    { icon: "🎯", text: "Acesso imediato" },
                    { icon: "📱", text: "Suporte 24/7" }
                  ].map((guarantee, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 group cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                      <span className="text-lg group-hover:animate-bounce transition-all duration-300">{guarantee.icon}</span>
                      <span className="group-hover:text-white transition-colors duration-300">{guarantee.text}</span>
                    </div>
                  ))}
                </div>
              </AnimatedComponent>
            </div>
          </div>
        </section>

        {/* Footer - Design Premium com Interatividade Avançada */}
        <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16 relative overflow-hidden">
          {/* Background Elements Interativos */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse transition-all duration-1000"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse transition-all duration-1000" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Coluna 1 - Logo e Descrição com Interatividade */}
              <div className="lg:col-span-2">
                <div className="group mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-3xl group-hover:animate-bounce">🚀</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  Fenix Academy
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Transformando carreiras através da tecnologia. Aprenda programação do zero ao avançado com projetos reais e mentoria personalizada.
                </p>

                {/* Redes Sociais com Interatividade */}
                <div className="flex space-x-4">
                  {[
                    { icon: "📘", label: "Facebook", href: "#" },
                    { icon: "📷", label: "Instagram", href: "#" },
                    { icon: "🐦", label: "Twitter", href: "#" },
                    { icon: "💼", label: "LinkedIn", href: "#" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="group w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/25 border border-white/20 hover:border-white/40"
                      title={social.label}
                    >
                      <span className="text-xl group-hover:animate-bounce transition-all duration-300">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Coluna 2 - Links Rápidos com Interatividade */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6 group-hover:text-blue-300 transition-colors duration-300">
                  Links Rápidos
                </h4>

                <ul className="space-y-3">
                  {[
                    { text: "Início", href: "/" },
                    { text: "Cursos", href: "/courses" },
                    { text: "Sobre Nós", href: "/about" },
                    { text: "Contato", href: "/contact" }
                  ].map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="group flex items-center space-x-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                        <span>{link.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coluna 3 - Suporte com Interatividade */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6 group-hover:text-green-300 transition-colors duration-300">
                  Suporte
                </h4>

                <ul className="space-y-3">
                  {[
                    { text: "Central de Ajuda", href: "/help" },
                    { text: "Documentação", href: "/docs" },
                    { text: "Comunidade", href: "/community" },
                    { text: "Status", href: "/status" }
                  ].map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="group flex items-center space-x-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                        <span>{link.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Linha de Separação com Interatividade */}
            <div className="border-t border-white/20 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-white/50 transition-all duration-500"></div>
            </div>

            {/* Linha Inferior com Interatividade */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                © 2024 Fenix Academy. Todos os direitos reservados.
              </div>

              <div className="flex space-x-6 text-sm">
                {[
                  { text: "Termos de Uso", href: "/terms" },
                  { text: "Política de Privacidade", href: "/privacy" },
                  { text: "Cookies", href: "/cookies" }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white group-hover:scale-105 transition-all duration-300"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>

            {/* Voltar ao Topo com Interatividade */}
            <div className="text-center mt-8">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl text-blue-300 px-6 py-3 rounded-2xl border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                <span className="group-hover:-translate-y-1 transition-transform duration-300">⬆️</span>
                <span className="font-semibold group-hover:text-blue-200 transition-colors duration-300">
                  Voltar ao Topo
                </span>
              </button>
            </div>
          </div>
        </footer>

        {/* Chat Flutuante - Design Premium */}
        <div className="fixed bottom-6 right-6">
          <AnimatedComponent
            animation="bounce"
            delay={1}
            className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:scale-110 group"
          >
            <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </AnimatedComponent>
        </div>

        {/* Botão de Tema */}
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}