'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ActionButtons, NavLinks } from '@/components/ui/NavigationLink';
import { ROUTES } from '@/lib/routes';
import {
  Code,
  BookOpen,
  Users,
  Award,
  Shield,
  Brain,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  User,
  DollarSign,
  Trophy,
  Monitor,
  Settings,
  Share2,
  Star,
  Sparkles,
  Crown
} from 'lucide-react';

export default function FenixHomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(featureInterval);
  }, []);

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Desenvolvedor Full Stack",
      company: "Google",
      content: "A Fênix transformou minha carreira! Em 6 meses consegui uma vaga na Google ganhando 5x mais.",
      avatar: "👨‍💻",
      rating: 5
    },
    {
      name: "Ana Santos",
      role: "Tech Lead",
      company: "Microsoft",
      content: "A metodologia da Fênix é revolucionária. Aprendi React, Node.js e consegui liderar uma equipe de 15 devs.",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Pedro Costa",
      role: "CTO",
      company: "Startup Unicorn",
      content: "A Fênix me deu as habilidades para fundar minha própria startup. Hoje valemos $1B!",
      avatar: "👨‍🚀",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Desenvolvedores Formados", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "98%", label: "Taxa de Sucesso", icon: Award, color: "from-green-500 to-emerald-500" },
    { number: "500+", label: "Projetos Reais", icon: Code, color: "from-purple-500 to-pink-500" },
    { number: "24/7", label: "Suporte Premium", icon: Shield, color: "from-orange-500 to-red-500" }
  ];

  const features = [
    {
      icon: Brain,
      title: "IA Tutor Personalizada",
      description: "Assistente inteligente que adapta o aprendizado ao seu ritmo e estilo",
      color: "from-purple-500 to-pink-500",
      benefits: ["Aprendizado adaptativo", "Feedback instantâneo", "Metas personalizadas"]
    },
    {
      icon: Code,
      title: "IDE Profissional",
      description: "Ambiente de desenvolvimento completo com todas as ferramentas",
      color: "from-blue-500 to-cyan-500",
      benefits: ["Editor avançado", "Debug integrado", "Templates prontos"]
    },
    {
      icon: Target,
      title: "Projetos Reais",
      description: "Construa aplicações reais que impressionam recrutadores",
      color: "from-green-500 to-emerald-500",
      benefits: ["Portfolio profissional", "Experiência prática", "Certificados"]
    },
    {
      icon: Users,
      title: "Comunidade Elite",
      description: "Conecte-se com desenvolvedores de alto nível e mentores",
      color: "from-orange-500 to-red-500",
      benefits: ["Networking", "Mentoria", "Colaboração"]
    },
    {
      icon: TrendingUp,
      title: "Carreira Acelerada",
      description: "Metodologia comprovada para acelerar sua carreira em tech",
      color: "from-indigo-500 to-purple-500",
      benefits: ["Preparação para entrevistas", "Soft skills", "Negociação salarial"]
    },
    {
      icon: Shield,
      title: "Garantia de Sucesso",
      description: "Se não conseguir um emprego em 6 meses, devolvemos seu dinheiro",
      color: "from-pink-500 to-rose-500",
      benefits: ["Garantia de 6 meses", "Suporte dedicado", "Refund total"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-orange-900 relative overflow-hidden">

      {/* Elementos de background estáticos */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-ember-fall"
              style={{
                left: `${(i * 3.33) % 100}%`,
                top: `${(i * 2.5) % 100}%`,
                animationDelay: `${(i * 0.2) % 5}s`,
                animationDuration: `${3 + (i % 4)}s`
              }}
            />
          ))}

          {/* Faíscas maiores */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`spark-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-sparkle"
              style={{
                left: `${(i * 6.67) % 100}%`,
                top: `${(i * 4.2) % 100}%`,
                animationDelay: `${(i * 0.3) % 3}s`,
                animationDuration: `${2 + (i % 2)}s`
              }}
            />
          ))}
        </div>
      )}

      <Header />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Orbs de gradiente animados */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-500/40 to-orange-500/40 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-orange-500/40 to-yellow-500/40 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-red-500/40 to-pink-500/40 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  {/* Main Icon Container */}
                  <div className="relative bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-8 group-hover:scale-110 transition-transform duration-300">
                    <Code className="h-20 w-20 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>

                  {/* Orbiting Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-spin">
                    <Star className="h-4 w-4 text-white m-2" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-red-400 to-orange-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}>
                    <BookOpen className="h-3 w-3 text-white m-1.5" />
                  </div>
                </div>
              </div>

              <h1 className="text-7xl font-bold text-white mb-8 leading-tight">
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-fire relative">
                  TRANSFORME SUA CARREIRA
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent opacity-0 animate-pulse" style={{ animationDelay: '1s' }}>
                    TRANSFORME SUA CARREIRA
                  </div>
                </span>
                <br />
                <span className="text-5xl text-white mt-4 block relative group">
                  <span className="relative z-10">EM 6 MESES</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    EM 6 MESES
                  </div>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </span>
              </h1>

              <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                A plataforma mais revolucionária do Brasil para desenvolvedores!
                <br />
                <span className="text-red-300 font-semibold">
                  De iniciante a profissional em tech com salários de R$ 15.000+
                </span>
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-16">
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center gap-3 border border-red-500/30 animate-fire-glow">
                  <Sparkles className="h-6 w-6 text-yellow-400 animate-flame-flicker" />
                  <span className="text-white font-semibold text-lg">Tecnologia Revolucionária</span>
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center gap-3 border border-orange-500/30 animate-fire-glow">
                  <Brain className="h-6 w-6 text-red-400 animate-flame-flicker" />
                  <span className="text-white font-semibold text-lg">IA Avançada</span>
                </div>
                <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center gap-3 border border-yellow-500/30 animate-fire-glow">
                  <Crown className="h-6 w-6 text-orange-400 animate-flame-flicker" />
                  <span className="text-white font-semibold text-lg">Premium Quality</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link
                  href={ROUTES.register}
                  className="group relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center">
                    <Code className="inline h-6 w-6 mr-3" />
                    <span className="text-xl">COMEÇAR AGORA - GRÁTIS</span>
                    <ArrowRight className="inline h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
                <Link
                  href={ROUTES.courses}
                  className="group bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm hover:from-orange-500/30 hover:to-red-500/30 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 border border-orange-500/30 hover:border-orange-500/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center">
                    <BookOpen className="inline h-6 w-6 mr-3" />
                    <span className="text-xl">EXPLORAR CURSOS</span>
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Seção de Estatísticas - Tema Fênix */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Números que Comprovam Nossa Excelência
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Resultados reais de desenvolvedores que transformaram suas carreiras conosco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center">
                <div className={`bg-gradient-to-r ${stat.color} rounded-3xl p-8 mb-6 transform group-hover:scale-110 transition-all duration-300 shadow-2xl animate-fire-glow`}>
                  <stat.icon className="h-16 w-16 text-white mx-auto animate-flame-flicker" />
                </div>
                <div className="text-5xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Navegação Rápida */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-gray-900/50 to-red-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Acesse Rapidamente
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Navegue facilmente pelas principais funcionalidades da plataforma
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <Link
              href={ROUTES.login}
              className="group bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-300 transform hover:scale-105 border border-red-500/30 hover:border-orange-500/50 text-center"
            >
              <User className="h-8 w-8 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Entrar</span>
            </Link>

            <Link
              href={ROUTES.register}
              className="group bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-orange-500/20 hover:to-yellow-500/20 transition-all duration-300 transform hover:scale-105 border border-orange-500/30 hover:border-yellow-500/50 text-center"
            >
              <User className="h-8 w-8 text-orange-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Cadastrar</span>
            </Link>

            <Link
              href={ROUTES.courses}
              className="group bg-gradient-to-br from-yellow-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-yellow-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 border border-yellow-500/30 hover:border-red-500/50 text-center"
            >
              <BookOpen className="h-8 w-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Cursos</span>
            </Link>

            <Link
              href={ROUTES.ide}
              className="group bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300 transform hover:scale-105 border border-red-500/30 hover:border-pink-500/50 text-center"
            >
              <Code className="h-8 w-8 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">IDE</span>
            </Link>

            <Link
              href={ROUTES.ai}
              className="group bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-300 transform hover:scale-105 border border-pink-500/30 hover:border-purple-500/50 text-center"
            >
              <Brain className="h-8 w-8 text-pink-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">IA Tutor</span>
            </Link>

            <Link
              href={ROUTES.dashboard}
              className="group bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300 transform hover:scale-105 border border-purple-500/30 hover:border-blue-500/50 text-center"
            >
              <Monitor className="h-8 w-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Dashboard</span>
            </Link>

            <Link
              href={ROUTES.pricing}
              className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 transform hover:scale-105 border border-blue-500/30 hover:border-cyan-500/50 text-center"
            >
              <DollarSign className="h-8 w-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Preços</span>
            </Link>

            <Link
              href="/progress"
              className="group bg-gradient-to-br from-cyan-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-cyan-500/20 hover:to-green-500/20 transition-all duration-300 transform hover:scale-105 border border-cyan-500/30 hover:border-green-500/50 text-center"
            >
              <TrendingUp className="h-8 w-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Progresso</span>
            </Link>

            <Link
              href="/certificates"
              className="group bg-gradient-to-br from-green-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-green-500/20 hover:to-yellow-500/20 transition-all duration-300 transform hover:scale-105 border border-green-500/30 hover:border-yellow-500/50 text-center"
            >
              <Award className="h-8 w-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Certificados</span>
            </Link>

            <Link
              href="/community"
              className="group bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-300 transform hover:scale-105 border border-yellow-500/30 hover:border-orange-500/50 text-center"
            >
              <Users className="h-8 w-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Comunidade</span>
            </Link>

            <Link
              href="/contact"
              className="group bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 border border-orange-500/30 hover:border-red-500/50 text-center"
            >
              <MessageCircle className="h-8 w-8 text-orange-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Contato</span>
            </Link>

            <Link
              href="/help"
              className="group bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300 transform hover:scale-105 border border-red-500/30 hover:border-pink-500/50 text-center"
            >
              <Settings className="h-8 w-8 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium text-sm">Ajuda</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Recursos - Tema Fênix */}
      <section id="metodologia" className="relative z-10 py-32 overflow-hidden">
        {/* Background Animation - Chamas */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/20 via-transparent to-orange-900/20"></div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-fire-glow"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-fire-glow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Por Que a Fênix é Revolucionária?
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tecnologia de ponta e metodologia comprovada para acelerar seu aprendizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-8 hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-red-500/30 hover:border-orange-500/50 relative overflow-hidden animate-fire-glow ${activeFeature === index ? 'ring-2 ring-red-500/50 shadow-2xl shadow-red-500/25' : ''
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full animate-sparkle opacity-0 group-hover:opacity-100"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full animate-sparkle opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.5s' }}></div>

                <div className={`bg-gradient-to-r ${feature.color} rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300 relative`}>
                  <feature.icon className="h-12 w-12 text-white relative z-10" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed relative z-10">
                  {feature.description}
                </p>
                <ul className="space-y-2 relative z-10">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-300 group-hover:text-white transition-colors">
                      <CheckCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos - Tema Fênix */}
      <section id="sucesso" className="relative z-10 py-32 bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-sm overflow-hidden">
        {/* Background Elements - Chamas */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-fire-glow"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-2xl animate-fire-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-fire-glow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Histórias de Sucesso Reais
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Desenvolvedores que transformaram suas vidas com a Fênix
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-12 border border-red-500/30 relative overflow-hidden group animate-fire-glow">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 w-2 h-2 bg-red-400 rounded-full animate-sparkle"></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-orange-400 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>

              <div className="text-center relative z-10">
                <div className="text-6xl mb-6 animate-bounce-gentle">{testimonials[currentTestimonial].avatar}</div>
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl text-white mb-8 leading-relaxed relative">
                  <div className="absolute -left-4 top-0 text-4xl text-red-400 opacity-50">"</div>
                  {testimonials[currentTestimonial].content}
                  <div className="absolute -right-4 bottom-0 text-4xl text-red-400 opacity-50">"</div>
                </blockquote>
                <div className="text-white">
                  <div className="text-xl font-bold mb-2">{testimonials[currentTestimonial].name}</div>
                  <div className="text-lg text-red-300 mb-1">{testimonials[currentTestimonial].role}</div>
                  <div className="text-lg text-orange-300">{testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 relative ${index === currentTestimonial ? 'bg-red-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                    }`}
                >
                  {index === currentTestimonial && (
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Tema Fênix */}
      <section className="relative z-10 py-32 overflow-hidden">
        {/* Background Elements - Chamas */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/30 via-transparent to-orange-900/30"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-fire-glow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-fire-glow" style={{ animationDelay: '1s' }}></div>

          {/* Floating Fire Elements */}
          <div className="absolute top-32 right-32 text-5xl opacity-10 animate-float">🔥</div>
          <div className="absolute bottom-32 left-32 text-4xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>⚡</div>
          <div className="absolute top-1/2 left-20 text-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>💥</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-16 border border-red-500/30 relative overflow-hidden group animate-fire-glow">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Floating Particles */}
            <div className="absolute top-8 left-8 w-2 h-2 bg-red-400 rounded-full animate-sparkle"></div>
            <div className="absolute top-12 right-12 w-1 h-1 bg-orange-400 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-8 left-12 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-12 right-8 w-1 h-1 bg-red-400 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>

            <h2 className="text-5xl font-bold text-white mb-6 relative z-10">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Pronto para Transformar Sua Carreira?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto relative z-10">
              Junte-se a mais de 50.000 desenvolvedores que já transformaram suas vidas com a Fênix.
              <br />
              <span className="text-red-300 font-semibold">
                Garantia de 6 meses ou seu dinheiro de volta!
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8 relative z-10">
              <Link
                href={ROUTES.register}
                className="group relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center">
                  <Code className="inline h-6 w-6 mr-3" />
                  <span className="text-xl">COMEÇAR AGORA - GRÁTIS</span>
                  <ArrowRight className="inline h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
              <Link
                href="/contact"
                className="group bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm hover:from-orange-500/30 hover:to-red-500/30 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 border border-orange-500/30 hover:border-orange-500/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center">
                  <MessageCircle className="inline h-6 w-6 mr-3" />
                  <span className="text-xl">FALAR COM CONSULTOR</span>
                </div>
              </Link>
            </div>

            <div className="flex justify-center items-center space-x-8 text-gray-400 relative z-10">
              <div className="flex items-center group">
                <Shield className="h-5 w-5 mr-2 group-hover:text-red-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">Garantia de 6 meses</span>
              </div>
              <div className="flex items-center group">
                <Users className="h-5 w-5 mr-2 group-hover:text-orange-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">50K+ alunos</span>
              </div>
              <div className="flex items-center group">
                <Award className="h-5 w-5 mr-2 group-hover:text-yellow-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">98% de sucesso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}