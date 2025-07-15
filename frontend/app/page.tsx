'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Play, 
  Code, 
  Users, 
  Award, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Globe,
  MessageCircle
} from 'lucide-react'

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Desenvolvedora Frontend",
      company: "TechCorp",
      content: "A Fenix Academy transformou minha carreira. Em 6 meses, consegui minha primeira vaga como desenvolvedora!",
      rating: 5,
      avatar: "/avatars/maria.jpg"
    },
    {
      name: "João Santos",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      content: "Os projetos práticos e a mentoria personalizada fizeram toda a diferença. Recomendo para qualquer pessoa!",
      rating: 5,
      avatar: "/avatars/joao.jpg"
    },
    {
      name: "Ana Costa",
      role: "Python Developer",
      company: "DataTech",
      content: "Do zero ao emprego em 8 meses. A metodologia da Fenix é incrível e os instrutores são excepcionais.",
      rating: 5,
      avatar: "/avatars/ana.jpg"
    }
  ]

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Projetos Reais",
      description: "Desenvolva projetos do mundo real para construir um portfólio impressionante"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Mentoria Personalizada",
      description: "Acompanhamento individual com especialistas da área"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certificados Reconhecidos",
      description: "Certificados válidos e reconhecidos pelo mercado"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros desenvolvedores e expanda sua rede"
    }
  ]

  const stats = [
    { number: "10K+", label: "Alunos Formados" },
    { number: "95%", label: "Taxa de Empregabilidade" },
    { number: "50+", label: "Cursos Disponíveis" },
    { number: "24/7", label: "Suporte Disponível" }
  ]

  const courses = [
    {
      id: 1,
      title: "Python para Iniciantes",
      description: "Aprenda Python do zero com projetos práticos",
      duration: "8 semanas",
      level: "Iniciante",
      price: "497",
      originalPrice: "997",
      image: "/courses/python-basics.jpg",
      features: ["40+ aulas", "10 projetos práticos", "Certificado", "Suporte"],
      students: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: "JavaScript Completo",
      description: "Do básico ao avançado em JavaScript moderno",
      duration: "12 semanas",
      level: "Intermediário",
      price: "697",
      originalPrice: "1397",
      image: "/courses/javascript-complete.jpg",
      features: ["60+ aulas", "15 projetos práticos", "Certificado", "Suporte"],
      students: 980,
      rating: 4.9
    },
    {
      id: 3,
      title: "React & Next.js",
      description: "Desenvolva aplicações web modernas",
      duration: "10 semanas",
      level: "Avançado",
      price: "797",
      originalPrice: "1597",
      image: "/courses/react-nextjs.jpg",
      features: ["50+ aulas", "12 projetos práticos", "Certificado", "Suporte"],
      students: 750,
      rating: 4.7
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background text-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/80 text-white">
                  <Star className="w-4 h-4 mr-2 text-white" />
                  #1 Plataforma de Ensino de Programação
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                  Transforme sua carreira com{' '}
                  <span className="text-primary">programação</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                  Aprenda programação do zero ao avançado com projetos reais, 
                  mentoria personalizada e uma comunidade ativa de desenvolvedores.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses" className="btn-primary text-lg px-8 py-4">
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2 text-primary" />
                  Ver Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Garantia de 30 dias</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-primary mr-2" />
                  <span>Pagamento seguro</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-primary mr-2" />
                  <span>Acesso vitalício</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="relative w-full h-96 lg:h-[500px]">
                <Image
                  src="/hero-image.png"
                  alt="Fenix Academy - Plataforma de Ensino"
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Por que escolher a Fenix Academy?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Nossa metodologia única combina teoria e prática para garantir 
              que você aprenda programação de forma eficiente e divertida.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center group hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Cursos em Destaque
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Escolha o caminho perfeito para sua jornada na programação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:scale-105 transition-transform"
              >
                <div className="relative mb-6">
                  <div className="relative w-full h-48">
                    <Image
                    src={course.image}
                    alt={course.title}
                      fill
                      className="object-cover"
                  />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                      {course.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {course.description}
                </p>

                <div className="space-y-2 mb-6">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students} alunos
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                        R$ {course.price}
                    </span>
                    <span className="text-gray-500 line-through ml-2">
                        R$ {course.originalPrice}
                    </span>
                    </div>
                    <Link href={`/courses/${course.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Ver curso
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="inline-flex items-center justify-center px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors text-lg">
              Ver Todos os Cursos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              O que nossos alunos dizem
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Histórias reais de transformação e sucesso
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
            >
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl italic mb-6">
                &ldquo;{testimonials[currentTestimonial].content}&rdquo;
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="relative w-12 h-12">
                  <Image
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                    fill
                    className="object-cover rounded-full"
                />
                </div>
                <div className="text-left">
                  <div className="font-semibold">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Pronto para transformar sua carreira?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Junte-se a milhares de desenvolvedores que já transformaram 
              suas vidas com a Fenix Academy
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg">
                Começar Gratuitamente
              </Link>
              <Link href="/courses" className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors text-lg backdrop-blur-sm">
                Ver Cursos
              </Link>
            </div>

            <div className="mt-8 text-sm text-blue-200">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Precisa de ajuda? Fale com nossos especialistas
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 