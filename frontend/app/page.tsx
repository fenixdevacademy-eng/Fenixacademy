'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Code,
  Database,
  Smartphone,
  Shield,
  CheckCircle,
  TrendingUp,
  Award,
  MessageCircle,
  Zap,
  Sparkles,
  Rocket,
  Brain,
  Target,
  BookOpen
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'
import { FunctionalButton } from '@/components/FunctionalButton'
import AnimatedSection from '@/components/AnimatedSection'
import FenixStory from '@/components/sections/FenixStory'
import FenixTeam from '@/components/sections/FenixTeam'
import FenixMission from '@/components/sections/FenixMission'

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  // Dados das features
  const features = [
    {
      iconName: "Code",
      title: "Desenvolvimento Web",
      description: "React, Next.js, Node.js e muito mais",
      color: "from-blue-500 to-cyan-500",
      tech: ["React", "Next.js", "TypeScript", "Node.js"]
    },
    {
      iconName: "Database",
      title: "Data Science",
      description: "Python, Machine Learning, IA",
      color: "from-green-500 to-emerald-500",
      tech: ["Python", "TensorFlow", "Pandas", "NumPy"]
    },
    {
      iconName: "Smartphone",
      title: "Mobile",
      description: "React Native, Flutter, iOS",
      color: "from-purple-500 to-pink-500",
      tech: ["React Native", "Flutter", "Swift", "Kotlin"]
    },
    {
      iconName: "Shield",
      title: "Cybersecurity",
      description: "Segurança da informação",
      color: "from-red-500 to-orange-500",
      tech: ["Ethical Hacking", "Penetration Testing", "Security Analysis"]
    }
  ]

  // Dados das estatísticas
  const stats = [
    { number: "50K+", label: "Alunos Formados", icon: Users },
    { number: "95%", label: "Taxa de Empregabilidade", icon: TrendingUp },
    { number: "20+", label: "Cursos Disponíveis", icon: BookOpen },
    { number: "4.9", label: "Avaliação Média", icon: Star }
  ]

  // Dados dos depoimentos
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Desenvolvedora Frontend",
      company: "Google",
      content: "A Fênix transformou minha carreira. Em 6 meses consegui meu primeiro emprego como desenvolvedora.",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Data Scientist",
      company: "Microsoft",
      content: "Os cursos são excepcionais. Conteúdo atualizado e professores experientes.",
      rating: 5,
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Mobile Developer",
      company: "Apple",
      content: "Metodologia hands-on que realmente funciona. Recomendo para todos!",
      rating: 5,
      avatar: "AC"
    }
  ]

  // Função para obter ícones
  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-12 h-12" }
    switch (iconName) {
      case "Code": return <Code {...iconProps} />
      case "Database": return <Database {...iconProps} />
      case "Smartphone": return <Smartphone {...iconProps} />
      case "Shield": return <Shield {...iconProps} />
      default: return <Code {...iconProps} />
    }
  }

  useEffect(() => {
    setIsLoaded(true)

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [features.length])


  return (
    <div className="min-h-screen relative overflow-hidden">
      <AdvancedParticles />
      <VisualEffects />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 tech-grid opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium animate-glow">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
                  <span className="gradient-text-neon">Plataforma #1 do Brasil</span>
                </div>

                <h1 className="text-6xl lg:text-8xl font-bold text-white leading-tight">
                  Transforme sua{' '}
                  <span className="gradient-text-neon animate-neon">
                    carreira
                  </span>{' '}
                  em tecnologia
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Aprenda com os melhores especialistas e conquiste o emprego dos seus sonhos.
                  Mais de <span className="gradient-text font-bold">50.000 alunos</span> já transformaram suas vidas conosco.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register" className="btn-primary group flex items-center justify-center gap-3 text-lg px-8 py-4">
                  <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                  <span>Começar Agora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn-tech group flex items-center justify-center gap-3 text-lg px-8 py-4">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Ver Demo</span>
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`card group hover:scale-110 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl lg:text-4xl font-bold gradient-text group-hover:animate-glow">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-300">{stat.label}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse-slow">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative z-10 group">
                <div className="glass-tech rounded-3xl p-12 text-center group-hover:scale-105 transition-all duration-500 animate-hologram">
                  <div className="text-white">
                    <div className="text-8xl font-bold mb-6 animate-float">🚀</div>
                    <h3 className="text-3xl font-bold mb-4 gradient-text-neon">Dashboard Interativo</h3>
                    <p className="text-blue-100 text-lg">Acesse sua jornada de aprendizado</p>
                  </div>
                </div>

                <div className="absolute -top-8 -right-8 glass-tech text-white px-6 py-4 rounded-2xl text-sm font-bold animate-glow">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>95% de empregabilidade</span>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 glass-tech text-white px-6 py-4 rounded-2xl text-sm font-bold animate-pulse-slow">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>+50K alunos formados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 tech-grid opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium mb-6 animate-glow">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="gradient-text-neon">Metodologia Comprovada</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Por que escolher a <span className="gradient-text-neon animate-neon">Fênix</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Oferecemos a melhor experiência de aprendizado com metodologia comprovada e suporte especializado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`card group hover:scale-110 transition-all duration-500 cursor-pointer ${activeFeature === index ? 'border-blue-400 shadow-2xl' : ''
                  }`}
                onClick={() => setActiveFeature(index)}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-pulse-slow`}>
                  {getIcon(feature.iconName)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 tech-grid opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-tech text-white text-sm font-medium mb-6 animate-glow">
              <MessageCircle className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="gradient-text-neon">Depoimentos Reais</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              O que nossos <span className="gradient-text-neon animate-neon">alunos</span> dizem
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Histórias reais de transformação e sucesso profissional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card group hover:scale-105 transition-all duration-500"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" />
                    ))}
                  </div>

                  <p className="text-gray-300 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-300">{testimonial.role}</div>
                      <div className="text-sm gradient-text font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* História da Fênix Academy */}
      <FenixStory />

      {/* Equipe da Fênix Academy */}
      <FenixTeam />

      {/* Missão, Visão e Valores */}
      <FenixMission />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="absolute inset-0 tech-grid opacity-20"></div>

        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 animate-glow">
            Pronto para transformar sua{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-neon">
              carreira
            </span>?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Junte-se a mais de 50.000 profissionais que já mudaram suas vidas com a Fênix
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <FunctionalButton
              href="/auth/register"
              variant="primary"
              size="xl"
              icon={<Sparkles className="w-6 h-6" />}
              iconPosition="left"
              glowEffect={true}
              rippleEffect={true}
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
            >
              Começar Agora
            </FunctionalButton>
            <FunctionalButton
              href="/expanded-courses"
              variant="outline"
              size="xl"
              icon={<Play className="w-6 h-6" />}
              iconPosition="left"
              glowEffect={true}
              rippleEffect={true}
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              Ver Demo Gratuita
            </FunctionalButton>
          </div>
        </div>
      </section>
    </div>
  )
}