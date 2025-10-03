'use client';

import React from 'react';
import {
  Rocket,
  Zap,
  Star,
  Heart,
  Globe,
  Code,
  BookOpen,
  Users,
  Award,
  Sparkles,
  Crown,
  Shield,
  Brain,
  Target,
  TrendingUp
} from 'lucide-react';

export default function RevolutionaryFenixPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header Revolucionário */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-xl opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-6">
                  <Rocket className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                FÊNIX DEV ACADEMY
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              🚀 A plataforma de desenvolvimento mais revolucionária do Brasil!
              Transforme sua carreira com tecnologia de ponta e aprendizado inteligente.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">Tecnologia Revolucionária</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">IA Avançada</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-2">
                <Crown className="h-5 w-5 text-purple-400" />
                <span className="text-white font-medium">Premium Quality</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Rocket className="inline h-5 w-5 mr-2" />
                Começar Agora
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border border-white/20">
                <BookOpen className="inline h-5 w-5 mr-2" />
                Explorar Cursos
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Seção de Recursos Revolucionários */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              🚀 Recursos Revolucionários
            </h2>
            <p className="text-xl text-gray-300">
              Tecnologia de ponta para acelerar seu aprendizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "IDE Avançada",
                description: "Ambiente de desenvolvimento profissional com IA integrada",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Brain,
                title: "IA Tutor",
                description: "Assistente inteligente que adapta o aprendizado ao seu ritmo",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Segurança Premium",
                description: "Proteção avançada para seus projetos e dados",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Target,
                title: "Metas Inteligentes",
                description: "Sistema de objetivos personalizados com IA",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: TrendingUp,
                title: "Analytics Avançado",
                description: "Métricas detalhadas do seu progresso",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: Users,
                title: "Comunidade Elite",
                description: "Conecte-se com desenvolvedores de alto nível",
                color: "from-pink-500 to-rose-500"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className={`bg-gradient-to-r ${feature.color} rounded-lg p-3 w-fit mb-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Estatísticas Revolucionárias */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              📊 Números Revolucionários
            </h2>
            <p className="text-xl text-gray-300">
              Resultados que comprovam nossa excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Desenvolvedores Formados", icon: Users },
              { number: "98%", label: "Taxa de Sucesso", icon: Award },
              { number: "500+", label: "Projetos Reais", icon: Code },
              { number: "24/7", label: "Suporte Premium", icon: Shield }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 w-fit mx-auto mb-4">
                  <stat.icon className="h-12 w-12 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Revolucionário */}
      <footer className="bg-black/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-3">
              <Rocket className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            FÊNIX DEV ACADEMY
          </h3>
          <p className="text-gray-400 mb-6">
            🚀 Transformando desenvolvedores em profissionais de elite
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white">© 2025 Fênix Dev Academy</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white">🚀 Versão Revolucionária</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}