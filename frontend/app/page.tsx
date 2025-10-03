'use client';

import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  Play,
  ArrowRight,
  CheckCircle,
  Timer,
  Flame,
  Diamond,
  Thunderbolt,
  Eye,
  MousePointer,
  Keyboard,
  Monitor,
  Smartphone,
  Tablet,
  Gamepad2,
  Headphones,
  Mic,
  Camera,
  Video,
  Image,
  FileText,
  Folder,
  Download,
  Upload,
  Share2,
  MessageCircle,
  Bell,
  Settings,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  Minus,
  RefreshCw,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Save,
  Lock,
  Unlock,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Gift,
  Trophy,
  Medal,
  Flag,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Percent,
  Calculator,
  Database,
  Server,
  Cloud,
  Wifi,
  Signal,
  Battery,
  Power,
  Volume2,
  VolumeX,
  MicOff,
  CameraOff,
  VideoOff,
  ImageOff,
  FileOff,
  FolderOff,
  DownloadOff,
  UploadOff,
  ShareOff,
  MessageOff,
  BellOff,
  SettingsOff,
  SearchOff,
  FilterOff,
  GridOff,
  ListOff,
  PlusOff,
  MinusOff,
  RefreshOff,
  ExternalLinkOff,
  CopyOff,
  EditOff,
  TrashOff,
  SaveOff,
  LockOff,
  UnlockOff,
  EyeOn,
  ChevronDownOff,
  ChevronUpOff,
  ChevronLeftOff,
  ChevronRightOff,
  HomeOff,
  MenuOff,
  XOff,
  UserOff,
  MailOff,
  PhoneOff,
  MapPinOff,
  CalendarOff,
  ClockOff,
  DollarSignOff,
  CreditCardOff,
  ShoppingCartOff,
  GiftOff,
  TrophyOff,
  MedalOff,
  FlagOff,
  BookmarkOff,
  TagOff,
  HashOff,
  AtSignOff,
  PercentOff,
  CalculatorOff,
  DatabaseOff,
  ServerOff,
  CloudOff,
  WifiOff,
  SignalOff,
  BatteryOff,
  PowerOff
} from 'lucide-react';

export default function FenixHomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Cursor personalizado */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header com navegação */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Fênix Dev Academy</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#cursos" className="text-white hover:text-purple-300 transition-colors">Cursos</a>
              <a href="#metodologia" className="text-white hover:text-purple-300 transition-colors">Metodologia</a>
              <a href="#sucesso" className="text-white hover:text-purple-300 transition-colors">Sucessos</a>
              <a href="#preco" className="text-white hover:text-purple-300 transition-colors">Preços</a>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                Começar Agora
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-75 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-8 animate-bounce">
                    <Rocket className="h-20 w-20 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-7xl font-bold text-white mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  TRANSFORME SUA CARREIRA
                </span>
                <br />
                <span className="text-5xl text-white mt-4 block">
                  EM 6 MESES
                </span>
              </h1>

              <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                🚀 A plataforma mais revolucionária do Brasil para desenvolvedores!
                <br />
                <span className="text-purple-300 font-semibold">
                  De iniciante a profissional em tech com salários de R$ 15.000+
                </span>
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center gap-3 border border-white/20">
                  <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
                  <span className="text-white font-semibold text-lg">Tecnologia Revolucionária</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center gap-3 border border-white/20">
                  <Brain className="h-6 w-6 text-green-400 animate-pulse" />
                  <span className="text-white font-semibold text-lg">IA Avançada</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 flex items-center gap-3 border border-white/20">
                  <Crown className="h-6 w-6 text-purple-400 animate-bounce" />
                  <span className="text-white font-semibold text-lg">Premium Quality</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
                  <Rocket className="inline h-6 w-6 mr-3 group-hover:animate-bounce" />
                  <span className="text-xl">COMEÇAR AGORA - GRÁTIS</span>
                  <ArrowRight className="inline h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </button>
                <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40">
                  <Play className="inline h-6 w-6 mr-3 group-hover:animate-pulse" />
                  <span className="text-xl">VER DEMONSTRAÇÃO</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Estatísticas */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              📊 Números que Comprovam Nossa Excelência
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Resultados reais de desenvolvedores que transformaram suas carreiras conosco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center">
                <div className={`bg-gradient-to-r ${stat.color} rounded-3xl p-8 mb-6 transform group-hover:scale-110 transition-all duration-300 shadow-2xl`}>
                  <stat.icon className="h-16 w-16 text-white mx-auto" />
                </div>
                <div className="text-5xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
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

      {/* Seção de Recursos */}
      <section id="metodologia" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              🚀 Por Que a Fênix é Revolucionária?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tecnologia de ponta e metodologia comprovada para acelerar seu aprendizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20 hover:border-white/40">
                <div className={`bg-gradient-to-r ${feature.color} rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section id="sucesso" className="relative z-10 py-32 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              💬 Histórias de Sucesso Reais
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Desenvolvedores que transformaram suas vidas com a Fênix
            </p>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <div className="text-center">
                <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl text-white mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="text-white">
                  <div className="text-xl font-bold">{testimonials[currentTestimonial].name}</div>
                  <div className="text-lg text-purple-300">{testimonials[currentTestimonial].role}</div>
                  <div className="text-lg text-blue-300">{testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-purple-500' : 'bg-white/30'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-16 border border-white/20">
            <h2 className="text-5xl font-bold text-white mb-6">
              🎯 Pronto para Transformar Sua Carreira?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Junte-se a mais de 50.000 desenvolvedores que já transformaram suas vidas com a Fênix.
              <br />
              <span className="text-purple-300 font-semibold">
                Garantia de 6 meses ou seu dinheiro de volta!
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <button className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
                <Rocket className="inline h-6 w-6 mr-3 group-hover:animate-bounce" />
                <span className="text-xl">COMEÇAR AGORA - GRÁTIS</span>
                <ArrowRight className="inline h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40">
                <MessageCircle className="inline h-6 w-6 mr-3 group-hover:animate-pulse" />
                <span className="text-xl">FALAR COM CONSULTOR</span>
              </button>
            </div>

            <div className="flex justify-center items-center space-x-8 text-gray-400">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>Garantia de 6 meses</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>50K+ alunos</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                <span>98% de sucesso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Fênix Dev Academy</span>
              </div>
              <p className="text-gray-400 mb-6">
                A plataforma mais revolucionária do Brasil para desenvolvedores.
              </p>
              <div className="flex space-x-4">
                <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors cursor-pointer">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors cursor-pointer">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors cursor-pointer">
                  <Share2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Cursos</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">React Avançado</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Node.js Profissional</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Python Data Science</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DevOps & Docker</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Suporte</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comunidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Empresa</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Imprensa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                © 2025 Fênix Dev Academy. Todos os direitos reservados.
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}