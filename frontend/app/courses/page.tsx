'use client';

import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Code, 
  Brain, 
  Target, 
  Award, 
  Users, 
  Clock, 
  Star, 
  Play, 
  BookOpen, 
  Zap, 
  Shield, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  Filter, 
  Search, 
  Grid, 
  List,
  Heart,
  Bookmark,
  Share2,
  Download,
  Eye,
  MousePointer,
  Keyboard,
  Monitor,
  Smartphone,
  Database,
  Server,
  Cloud,
  Globe,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  RefreshCw,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Save,
  Settings,
  Bell,
  MessageCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Gift,
  Trophy,
  Medal,
  Flag,
  Tag,
  Hash,
  AtSign,
  Percent,
  Calculator,
  Wifi,
  Signal,
  Battery,
  Power,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Video,
  VideoOff,
  Image,
  ImageOff,
  FileText,
  FileOff,
  Folder,
  FolderOff,
  Upload,
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
  EyeOff,
  ChevronDownOff,
  ChevronUpOff,
  Home,
  Menu,
  X,
  ArrowLeft,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'Todos os Cursos', icon: Grid, count: 24 },
    { id: 'frontend', name: 'Frontend', icon: Monitor, count: 8 },
    { id: 'backend', name: 'Backend', icon: Server, count: 6 },
    { id: 'fullstack', name: 'Full Stack', icon: Code, count: 4 },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 3 },
    { id: 'devops', name: 'DevOps', icon: Cloud, count: 2 },
    { id: 'data', name: 'Data Science', icon: Database, count: 1 }
  ];

  const courses = [
    {
      id: 1,
      title: "React Avançado - Do Zero ao Profissional",
      description: "Domine React com hooks, context, redux e construa aplicações escaláveis",
      instructor: "Carlos Silva",
      instructorAvatar: "👨‍💻",
      duration: "120 horas",
      students: 15420,
      rating: 4.9,
      price: 497,
      originalPrice: 997,
      level: "Avançado",
      category: "frontend",
      image: "🚀",
      tags: ["React", "JavaScript", "Hooks", "Redux"],
      features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
      isPopular: true,
      isNew: false
    },
    {
      id: 2,
      title: "Node.js Profissional - APIs e Microserviços",
      description: "Construa APIs robustas e microserviços escaláveis com Node.js",
      instructor: "Ana Santos",
      instructorAvatar: "👩‍💼",
      duration: "100 horas",
      students: 12850,
      rating: 4.8,
      price: 397,
      originalPrice: 797,
      level: "Intermediário",
      category: "backend",
      image: "⚡",
      tags: ["Node.js", "Express", "MongoDB", "APIs"],
      features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
      isPopular: true,
      isNew: false
    },
    {
      id: 3,
      title: "Python Data Science - IA e Machine Learning",
      description: "Aprenda Python para análise de dados, IA e machine learning",
      instructor: "Pedro Costa",
      instructorAvatar: "👨‍🚀",
      duration: "150 horas",
      students: 9850,
      rating: 4.9,
      price: 597,
      originalPrice: 1197,
      level: "Avançado",
      category: "data",
      image: "🧠",
      tags: ["Python", "Pandas", "Scikit-learn", "TensorFlow"],
      features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
      isPopular: false,
      isNew: true
    },
    {
      id: 4,
      title: "Flutter Mobile - Apps Nativos",
      description: "Desenvolva apps mobile nativos para iOS e Android com Flutter",
      instructor: "Maria Oliveira",
      instructorAvatar: "👩‍💻",
      duration: "80 horas",
      students: 7650,
      rating: 4.7,
      price: 297,
      originalPrice: 597,
      level: "Intermediário",
      category: "mobile",
      image: "📱",
      tags: ["Flutter", "Dart", "Mobile", "iOS", "Android"],
      features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
      isPopular: false,
      isNew: false
    },
    {
      id: 5,
      title: "DevOps & Docker - Deploy Profissional",
      description: "Domine Docker, Kubernetes e CI/CD para deploy profissional",
      instructor: "João Silva",
      instructorAvatar: "👨‍🔧",
      duration: "90 horas",
      students: 5420,
      rating: 4.8,
      price: 397,
      originalPrice: 797,
      level: "Avançado",
      category: "devops",
      image: "🐳",
      tags: ["Docker", "Kubernetes", "CI/CD", "AWS"],
      features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
      isPopular: false,
      isNew: false
    },
    {
      id: 6,
      title: "JavaScript Full Stack - Completo",
      description: "Curso completo de JavaScript do frontend ao backend",
      instructor: "Carlos Silva",
      instructorAvatar: "👨‍💻",
      duration: "200 horas",
      students: 22150,
      rating: 4.9,
      price: 697,
      originalPrice: 1397,
      level: "Iniciante",
      category: "fullstack",
      image: "💻",
      tags: ["JavaScript", "React", "Node.js", "MongoDB"],
      features: ["Projetos Reais", "Certificado", "Suporte 24/7", "Garantia 6 meses"],
      isPopular: true,
      isNew: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
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
              <a href="/" className="text-white hover:text-purple-300 transition-colors">Home</a>
              <a href="/courses" className="text-purple-300 font-semibold">Cursos</a>
              <a href="/metodologia" className="text-white hover:text-purple-300 transition-colors">Metodologia</a>
              <a href="/sucesso" className="text-white hover:text-purple-300 transition-colors">Sucessos</a>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                Começar Agora
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                CURSOS REVOLUCIONÁRIOS
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              🚀 Transforme sua carreira com nossos cursos de desenvolvimento de alto nível.
              <br />
              <span className="text-purple-300 font-semibold">
                Aprenda com os melhores e construa projetos reais!
              </span>
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    <category.icon className="h-5 w-5" />
                    <span>{category.name}</span>
                    <span className="bg-white/20 rounded-full px-2 py-1 text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-center items-center space-x-4">
                <span className="text-gray-300">Visualização:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="relative z-10 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {filteredCourses.length} Cursos Encontrados
            </h2>
            <p className="text-gray-300">
              Escolha o curso perfeito para acelerar sua carreira
            </p>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="group bg-white/10 backdrop-blur-sm rounded-3xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20 hover:border-white/40 relative overflow-hidden"
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    {course.isPopular && (
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        🔥 Popular
                      </span>
                    )}
                    {course.isNew && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ✨ Novo
                      </span>
                    )}
                  </div>
                  
                  {/* Course Image */}
                  <div className="text-6xl mb-4 text-center">{course.image}</div>
                  
                  {/* Course Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {course.description}
                    </p>
                  </div>
                  
                  {/* Instructor */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl">{course.instructorAvatar}</div>
                    <div>
                      <div className="text-white font-medium text-sm">{course.instructor}</div>
                      <div className="text-gray-400 text-xs">Instrutor</div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      {course.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-xs text-gray-300">
                          <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-white">
                          R$ {course.price}
                        </div>
                        <div className="text-sm text-gray-400 line-through">
                          R$ {course.originalPrice}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-sm">
                          {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 group">
                      <Play className="inline h-5 w-5 mr-2 group-hover:animate-pulse" />
                      Começar Agora
                      <ArrowRight className="inline h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <div className="flex items-start space-x-6">
                    <div className="text-6xl">{course.image}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                              {course.level}
                            </span>
                            {course.isPopular && (
                              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                🔥 Popular
                              </span>
                            )}
                            {course.isNew && (
                              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                ✨ Novo
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {course.title}
                          </h3>
                          
                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {course.description}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white mb-1">
                            R$ {course.price}
                          </div>
                          <div className="text-gray-400 line-through mb-2">
                            R$ {course.originalPrice}
                          </div>
                          <div className="text-green-400 font-bold">
                            {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{course.students.toLocaleString()} alunos</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        
                        <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105">
                          <Play className="inline h-5 w-5 mr-2" />
                          Começar Agora
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-16 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">
              🎯 Não Encontrou o Curso Ideal?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Nossa equipe de especialistas pode criar um curso personalizado para suas necessidades específicas.
            </p>
            
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105">
              <MessageCircle className="inline h-6 w-6 mr-3" />
              Falar com Especialista
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}