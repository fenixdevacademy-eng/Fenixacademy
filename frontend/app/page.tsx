"use client";

import React, { useState, useEffect } from 'react';
import AnimatedComponent from '../components/AnimatedComponent';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import IDEDemo from '../components/IDEDemo';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CodeBracketIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { useResponsive, useResponsiveValue } from '../hooks/useResponsive';
import ResponsiveLayout, { ResponsiveGrid, ResponsiveFlex, ResponsiveText, ResponsiveButton, ResponsiveCard } from '../components/ResponsiveLayout';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [activeCourse, setActiveCourse] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { isMobile, isTablet, isDesktop, width, height } = useResponsive();

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
      setActiveBenefit(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotação automática dos cursos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCourse(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animação de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    {
      icon: AcademicCapIcon,
      title: "Qualidade CS50",
      description: "Conteúdo do mesmo nível do curso mais famoso de Harvard",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: RocketLaunchIcon,
      title: "Projetos Reais",
      description: "Desenvolva aplicações que impressionam recrutadores",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: UserGroupIcon,
      title: "Carreira Garantida",
      description: "Conecte-se com empresas que contratam nossos alunos",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const courses = [
    {
      title: "Web Fundamentals",
      description: "HTML, CSS, JavaScript do zero ao avançado",
      duration: "12 semanas",
      students: "2.5k+",
      price: "R$ 297",
      originalPrice: "R$ 597",
      badge: "Mais Popular",
      features: ["Projetos práticos", "Certificado", "Suporte 24/7"],
      color: "from-blue-600 to-purple-600",
      icon: CodeBracketIcon
    },
    {
      title: "Python Data Science",
      description: "Análise de dados e Machine Learning",
      duration: "16 semanas",
      students: "1.8k+",
      price: "R$ 397",
      originalPrice: "R$ 797",
      badge: "Em Alta",
      features: ["Projetos reais", "Portfolio", "Mentoria"],
      color: "from-green-600 to-teal-600",
      icon: AcademicCapIcon
    },
    {
      title: "React Avançado",
      description: "Desenvolvimento moderno com React 18",
      duration: "10 semanas",
      students: "1.2k+",
      price: "R$ 347",
      originalPrice: "R$ 697",
      badge: "Novo",
      features: ["Hooks avançados", "Context API", "Testes"],
      color: "from-cyan-600 to-blue-600",
      icon: RocketLaunchIcon
    }
  ];

  const stats = [
    { number: "20+", label: "Cursos Disponíveis", icon: AcademicCapIcon },
    { number: "50k+", label: "Alunos Formados", icon: UserGroupIcon },
    { number: "95%", label: "Taxa de Empregabilidade", icon: StarIcon }
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
        {/* Hero Section */}
        <section
          className={`relative ${isMobile ? 'min-h-[80vh]' : 'min-h-screen'} flex items-center justify-center`}
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
        >
          {/* Background com efeito parallax */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
            style={{
              transform: isMobile ? 'none' : `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          />

          {/* Partículas flutuantes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white opacity-20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <ResponsiveText
                variant="h1"
                className={`${isMobile ? 'text-4xl' : isTablet ? 'text-6xl' : 'text-8xl'} font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent`}
              >
                Fenix Academy
              </ResponsiveText>
              <ResponsiveText
                variant="body"
                className={`${isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl'} text-gray-300 mb-8 max-w-3xl mx-auto`}
              >
                Aprenda programação com a qualidade do CS50 de Harvard,
                mas com foco no mercado brasileiro e projetos reais.
              </ResponsiveText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <ResponsiveButton
                variant="primary"
                size={isMobile ? 'sm' : 'md'}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                onClick={() => window.location.href = '/courses'}
              >
                <PlayIcon className="w-5 h-5" />
                Ver Cursos
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </ResponsiveButton>
              <ResponsiveButton
                variant="outline"
                size={isMobile ? 'sm' : 'md'}
                className="px-8 py-4 border-2 border-white rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                onClick={() => window.location.href = '/ide-advanced'}
              >
                <CodeBracketIcon className="w-5 h-5" />
                Testar IDE
              </ResponsiveButton>
            </motion.div>

            {/* Estatísticas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="max-w-4xl mx-auto"
            >
              <ResponsiveGrid
                columns={{ mobile: 1, tablet: 2, desktop: 3 }}
                gap="lg"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className={`${isMobile ? 'w-6 h-6' : isTablet ? 'w-7 h-7' : 'w-8 h-8'} text-blue-400 group-hover:text-purple-400 transition-colors`} />
                    </div>
                    <div className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold text-blue-400 group-hover:text-purple-400 transition-colors`}>
                      {stat.number}
                    </div>
                    <div className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-400 group-hover:text-gray-300 transition-colors`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </ResponsiveGrid>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center mb-16"
            >
              Por que escolher a Fenix Academy?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`p-8 rounded-xl border-2 transition-all duration-500 ${activeBenefit === index
                    ? 'border-blue-500 bg-blue-900/20 scale-105 shadow-2xl'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:shadow-xl'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 mx-auto`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">{benefit.title}</h3>
                  <p className="text-gray-400 text-center">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 px-4 bg-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center mb-16"
            >
              Nossos Cursos Mais Populares
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl ${activeCourse === index ? 'ring-2 ring-blue-500 shadow-2xl' : ''
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${course.color} text-sm rounded-full font-semibold`}>
                      {course.badge}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{course.price}</div>
                      <div className="text-sm text-gray-400 line-through">{course.originalPrice}</div>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${course.color} flex items-center justify-center mr-4`}>
                      <course.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{course.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4">{course.description}</p>

                  <div className="flex justify-between text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4" />
                      {course.students} alunos
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircleIcon className="text-green-400 mr-2 w-4 h-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/course/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`w-full bg-gradient-to-r ${course.color} text-center py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 block group`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Começar Agora
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IDE Demo Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center mb-16"
            >
              Experimente Nossa IDE Avançada
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl"
            >
              <IDEDemo />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold mb-6"
            >
              Pronto para transformar sua carreira?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Junte-se a milhares de desenvolvedores que já mudaram suas vidas com a Fenix Academy.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/courses"
                className="px-8 py-4 bg-white text-gray-900 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <AcademicCapIcon className="w-5 h-5" />
                Ver Todos os Cursos
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <UserGroupIcon className="w-5 h-5" />
                Falar com Consultor
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Theme Toggle */}
        <div className="fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}