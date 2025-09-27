'use client'

import React from 'react'
import {
  Flame,
  Target,
  Users,
  Award,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Globe,
  Heart,
  Star
} from 'lucide-react'

export default function FenixStory() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium mb-6 animate-glow">
            <Flame className="w-5 h-5 mr-2 text-orange-400" />
            <span className="gradient-text-neon">Nossa História</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            A <span className="gradient-text-neon animate-neon">Fênix</span> nasceu de um sonho
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transformar vidas através da educação em tecnologia, democratizando o acesso ao conhecimento de qualidade
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-white">
                De uma ideia simples a uma <span className="gradient-text">revolução educacional</span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Em 2020, durante a pandemia, percebemos que o mercado de tecnologia estava em expansão,
                mas faltavam profissionais qualificados. Decidimos criar uma plataforma que não apenas
                ensinasse tecnologia, mas transformasse vidas.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                A Fênix Academy nasceu com a missão de democratizar o acesso à educação de qualidade
                em tecnologia, oferecendo cursos práticos, mentoria especializada e suporte completo
                para a inserção no mercado de trabalho.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="card text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">50K+ Alunos</h4>
                <p className="text-gray-300 text-sm">Transformaram suas vidas</p>
              </div>

              <div className="card text-center group hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">95% Empregabilidade</h4>
                <p className="text-gray-300 text-sm">Taxa de sucesso</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-tech rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-500">
              <div className="text-6xl mb-6 animate-float">🔥</div>
              <h4 className="text-2xl font-bold text-white mb-4 gradient-text-neon">
                Renascimento Profissional
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Assim como a fênix renasce das cinzas, nossos alunos renascem profissionalmente,
                encontrando novas oportunidades e carreiras prósperas na tecnologia.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-16">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Nossa <span className="gradient-text">Jornada</span>
          </h3>

          <div className="space-y-12">
            {[
              {
                year: "2020",
                title: "O Início",
                description: "Fundação da Fênix Academy com o objetivo de democratizar a educação em tecnologia",
                icon: Lightbulb,
                color: "from-yellow-500 to-orange-500"
              },
              {
                year: "2021",
                title: "Primeiros Sucessos",
                description: "Primeiros 1.000 alunos formados e 90% de empregabilidade alcançada",
                icon: TrendingUp,
                color: "from-green-500 to-emerald-500"
              },
              {
                year: "2022",
                title: "Expansão Nacional",
                description: "Expansão para todo o Brasil com cursos presenciais e online",
                icon: Globe,
                color: "from-blue-500 to-cyan-500"
              },
              {
                year: "2023",
                title: "Reconhecimento",
                description: "Prêmio de melhor plataforma de educação em tecnologia do Brasil",
                icon: Award,
                color: "from-purple-500 to-pink-500"
              },
              {
                year: "2024",
                title: "Futuro Brilhante",
                description: "Meta de formar 100.000 profissionais até 2025",
                icon: Star,
                color: "from-pink-500 to-rose-500"
              }
            ].map((milestone, index) => (
              <div key={index} className="flex items-center space-x-8">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <milestone.icon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-2xl font-bold gradient-text">{milestone.year}</span>
                    <h4 className="text-2xl font-bold text-white">{milestone.title}</h4>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Valores */}
        <div className="mt-24">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Nossos <span className="gradient-text">Valores</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excelência",
                description: "Comprometimento com a qualidade máxima em todos os nossos cursos e serviços",
                icon: Award,
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Inovação",
                description: "Sempre buscando novas tecnologias e metodologias de ensino",
                icon: Lightbulb,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Paixão",
                description: "Amor genuíno por transformar vidas através da educação",
                icon: Heart,
                color: "from-red-500 to-pink-500"
              }
            ].map((value, index) => (
              <div key={index} className="card text-center group hover:scale-105 transition-all duration-300">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{value.title}</h4>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}