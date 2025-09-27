'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Users,
  Globe,
  Code,
  BookOpen,
  Award,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Rocket,
  Brain
} from 'lucide-react'

interface Value {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  examples: string[]
}

interface Principle {
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

function FenixMission() {
  const [activeValue, setActiveValue] = useState(0)

  const mission = {
    title: "Nossa Missão",
    content: "Democratizar o acesso à educação tecnológica de qualidade no Brasil, formando profissionais preparados para os desafios do futuro digital.",
    icon: <Target className="w-12 h-12" />,
    color: "from-blue-500 to-cyan-500"
  }

  const vision = {
    title: "Nossa Visão",
    content: "Ser a principal referência em educação tecnológica online do Brasil até 2030, impactando positivamente a vida de mais de 1 milhão de pessoas.",
    icon: <Eye className="w-12 h-12" />,
    color: "from-purple-500 to-pink-500"
  }

  const values: Value[] = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Paixão pela Educação",
      description: "Acreditamos que a educação é a ferramenta mais poderosa para transformar vidas e construir um futuro melhor.",
      color: "from-red-500 to-pink-500",
      examples: [
        "Cursos desenvolvidos com amor e dedicação",
        "Suporte personalizado para cada aluno",
        "Metodologias inovadoras e eficazes",
        "Investimento contínuo em qualidade"
      ]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excelência Técnica",
      description: "Comprometidos com o mais alto padrão de qualidade em todos os nossos cursos e serviços.",
      color: "from-blue-500 to-cyan-500",
      examples: [
        "Conteúdo sempre atualizado",
        "Instrutores especialistas",
        "Projetos práticos e reais",
        "Certificações reconhecidas"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Comunidade Forte",
      description: "Construímos uma comunidade unida de aprendizes, mentores e profissionais da tecnologia.",
      color: "from-green-500 to-emerald-500",
      examples: [
        "Fóruns de discussão ativos",
        "Networking entre alunos",
        "Mentorias personalizadas",
        "Eventos e workshops exclusivos"
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Inovação Constante",
      description: "Sempre na vanguarda da tecnologia e metodologias de ensino mais eficazes.",
      color: "from-yellow-500 to-orange-500",
      examples: [
        "IA para personalização",
        "Realidade virtual e aumentada",
        "Gamificação do aprendizado",
        "Tecnologias emergentes"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Transparência",
      description: "Praticamos a transparência em todas as nossas relações e processos internos.",
      color: "from-indigo-500 to-purple-500",
      examples: [
        "Preços claros e justos",
        "Políticas transparentes",
        "Comunicação honesta",
        "Feedback construtivo"
      ]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Impacto Social",
      description: "Comprometidos em gerar impacto positivo na sociedade através da educação.",
      color: "from-teal-500 to-cyan-500",
      examples: [
        "Cursos gratuitos para comunidades",
        "Parcerias com ONGs",
        "Programas de inclusão digital",
        "Bolsas de estudo"
      ]
    }
  ]

  const principles: Principle[] = [
    {
      title: "Aprendizado Prático",
      description: "Focamos em projetos reais e aplicações práticas do conhecimento.",
      icon: <Code className="w-6 h-6" />,
      color: "text-blue-400"
    },
    {
      title: "Mentoria Personalizada",
      description: "Cada aluno recebe suporte individualizado para seu desenvolvimento.",
      icon: <Users className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      title: "Tecnologia de Ponta",
      description: "Utilizamos as mais modernas ferramentas e tecnologias do mercado.",
      icon: <Brain className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      title: "Comunidade Ativa",
      description: "Promovemos networking e colaboração entre nossos alunos.",
      icon: <Heart className="w-6 h-6" />,
      color: "text-red-400"
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-green-900/20 to-teal-900/20">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      <div className="absolute inset-0 tech-grid opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Nossa Essência</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold gradient-text-neon mb-6">
            Missão, Visão e Valores
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Os princípios que guiam nossa jornada e definem quem somos como empresa
            e como comunidade educacional.
          </p>
        </motion.div>

        {/* Missão e Visão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          {/* Missão */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-tech rounded-3xl p-8 text-center"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${mission.color} rounded-full mb-6`}>
              {mission.icon}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">{mission.title}</h3>
            <p className="text-gray-300 text-lg leading-relaxed">{mission.content}</p>
          </motion.div>

          {/* Visão */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-tech rounded-3xl p-8 text-center"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${vision.color} rounded-full mb-6`}>
              {vision.icon}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">{vision.title}</h3>
            <p className="text-gray-300 text-lg leading-relaxed">{vision.content}</p>
          </motion.div>
        </motion.div>

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Nossos Valores
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-tech rounded-2xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setActiveValue(index)}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-full mb-4`}>
                  {value.icon}
                </div>

                <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                <p className="text-gray-300 mb-4">{value.description}</p>

                <div className="space-y-2">
                  {value.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Princípios Fundamentais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Princípios Fundamentais
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="glass-tech rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className={`${principle.color} mb-4 flex justify-center`}>
                  {principle.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{principle.title}</h4>
                <p className="text-gray-300 text-sm">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compromisso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="glass-tech rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Nosso Compromisso
            </h3>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Estamos comprometidos em oferecer a melhor experiência educacional possível,
              sempre priorizando o sucesso e o desenvolvimento de nossos alunos. Cada decisão
              que tomamos é guiada por nossos valores e pela missão de democratizar a educação tecnológica.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-gray-300">Comprometidos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
                <div className="text-gray-300">Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">∞</div>
                <div className="text-gray-300">Dedicados</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 mx-auto"
            >
              <Rocket className="w-5 h-5" />
              Fazer Parte da Nossa Missão
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FenixMission





