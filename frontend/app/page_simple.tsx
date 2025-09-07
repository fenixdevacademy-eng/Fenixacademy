import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🔥</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">FÉNIX DEV ACADEMY</h1>
                                <p className="text-blue-200 text-sm">Transforme sua carreira</p>
                            </div>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <Link href="/courses" className="text-blue-200 hover:text-white transition-colors duration-300">
                                Cursos
                            </Link>
                            <Link href="/about" className="text-blue-200 hover:text-white transition-colors duration-300">
                                Sobre
                            </Link>
                            <Link href="/contact" className="text-blue-200 hover:text-white transition-colors duration-300">
                                Contato
                            </Link>
                        </nav>

                        <div className="flex space-x-4">
                            <Link href="/auth/login" className="text-blue-200 hover:text-white px-4 py-2 rounded-lg transition-colors duration-300">
                                Login
                            </Link>
                            <Link href="/auth/register" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300">
                                Começar
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Conteúdo Principal */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Transforme sua{' '}
                                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    carreira
                                </span>{' '}
                                em tecnologia
                            </h1>

                            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
                                A FÉNIX DEV ACADEMY é sua porta de entrada para o mundo da programação.
                                Aprenda com projetos reais, mentoria especializada e uma comunidade
                                apaixonada por tecnologia.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="/courses" className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-8 py-4 rounded-xl text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95">
                                    Explorar Cursos
                                </Link>

                                <Link href="/auth/register" className="inline-block bg-white/10 backdrop-blur-lg text-white font-bold px-8 py-4 rounded-xl text-lg border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
                                    Começar Gratuitamente
                                </Link>
                            </div>

                            {/* Estatísticas */}
                            <div className="mt-12 grid grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-2">500+</div>
                                    <div className="text-blue-200 text-sm">Estudantes Ativos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-2">50+</div>
                                    <div className="text-blue-200 text-sm">Cursos Disponíveis</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-2">95%</div>
                                    <div className="text-blue-200 text-sm">Taxa de Sucesso</div>
                                </div>
                            </div>
                        </div>

                        {/* Logo da Fénix */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                {/* SVG da Fénix */}
                                <div className="w-96 h-96 relative">
                                    <svg width="384" height="384" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                                        <defs>
                                            <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: "#FF6B35", stopOpacity: 1 }} />
                                                <stop offset="50%" style={{ stopColor: "#F7931E", stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                                            </linearGradient>
                                            <filter id="glow">
                                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>

                                        {/* Círculo de fundo */}
                                        <circle cx="100" cy="100" r="90" fill="url(#phoenixGradient)" opacity="0.9" />

                                        {/* Corpo da Fênix */}
                                        <path d="M100 160 Q80 140 70 120 Q60 100 70 80 Q80 60 100 40 Q120 60 130 80 Q140 100 130 120 Q120 140 100 160"
                                            fill="#FF4500" stroke="#8B0000" strokeWidth="2" />

                                        {/* Asas */}
                                        <path d="M60 90 Q40 70 30 50 Q20 30 40 20 Q60 30 70 50 Q80 70 60 90"
                                            fill="#FF6347" stroke="#8B0000" strokeWidth="1.5" />
                                        <path d="M140 90 Q160 70 170 50 Q180 30 160 20 Q140 30 130 50 Q120 70 140 90"
                                            fill="#FF6347" stroke="#8B0000" strokeWidth="1.5" />

                                        {/* Cabeça */}
                                        <circle cx="100" cy="50" r="15" fill="#FFD700" />

                                        {/* Bico */}
                                        <path d="M100 35 L95 25 L105 25 Z" fill="#FF4500" />

                                        {/* Olhos */}
                                        <circle cx="95" cy="45" r="3" fill="#000" />
                                        <circle cx="105" cy="45" r="3" fill="#000" />

                                        {/* Chamas */}
                                        <path d="M90 30 Q85 20 90 15 Q95 20 90 30" fill="#FF4500" opacity="0.8" />
                                        <path d="M110 30 Q115 20 110 15 Q105 20 110 30" fill="#FF4500" opacity="0.8" />

                                        {/* Cauda com chamas */}
                                        <path d="M100 160 Q90 170 80 180 Q70 190 60 185 Q70 175 80 165 Q90 155 100 160"
                                            fill="#FFD700" opacity="0.9" />
                                        <path d="M100 160 Q110 170 120 180 Q130 190 140 185 Q130 175 120 165 Q110 155 100 160"
                                            fill="#FFD700" opacity="0.9" />

                                        {/* Efeito de brilho */}
                                        <circle cx="100" cy="100" r="60" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.3" filter="url(#glow)" />
                                    </svg>
                                </div>

                                {/* Efeito de brilho */}
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>

                                {/* Partículas flutuantes */}
                                <div className="absolute top-10 left-10 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
                                <div className="absolute top-20 right-20 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-bounce" style={{ animationDuration: '2.5s' }}></div>
                                <div className="absolute bottom-20 left-20 w-2 h-2 bg-red-400 rounded-full opacity-60 animate-bounce" style={{ animationDuration: '4s' }}></div>

                                {/* Texto FÉNIX DEV ACADEMY */}
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                                    <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                                        FÉNIX DEV
                                    </div>
                                    <div className="text-xl font-medium text-blue-200 drop-shadow-lg">
                                        ACADEMY
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ondas decorativas */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-auto">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            opacity=".25"
                            fill="#3B82F6" />
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.71,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                            opacity=".5"
                            fill="#3B82F6" />
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,114.44-6.33,172.56,2.81C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                            fill="#3B82F6" />
                    </svg>
                </div>
            </section>

            {/* Seção de Cursos */}
            <section className="py-20 bg-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Nossos Cursos
                        </h2>
                        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                            Escolha entre uma ampla variedade de cursos de programação,
                            desde fundamentos até tecnologias avançadas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Curso 1 */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Fundamentos Web</h3>
                            <p className="text-blue-200 mb-4">
                                Aprenda HTML, CSS e JavaScript do zero. Construa sites responsivos e interativos.
                            </p>
                            <Link href="/courses/fundamentos-desenvolvimento-web" className="text-blue-400 hover:text-blue-300 font-medium">
                                Saiba mais →
                            </Link>
                        </div>

                        {/* Curso 2 */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">⚛️</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">React Avançado</h3>
                            <p className="text-blue-200 mb-4">
                                Domine React com hooks, context, e padrões avançados de desenvolvimento.
                            </p>
                            <Link href="/courses/react-js-avancado" className="text-blue-400 hover:text-blue-300 font-medium">
                                Saiba mais →
                            </Link>
                        </div>

                        {/* Curso 3 */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🐍</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Python Data Science</h3>
                            <p className="text-blue-200 mb-4">
                                Explore análise de dados, machine learning e visualização com Python.
                            </p>
                            <Link href="/courses/python-data-science" className="text-blue-400 hover:text-blue-300 font-medium">
                                Saiba mais →
                            </Link>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/courses" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                            Ver Todos os Cursos
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black/20 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">FÉNIX DEV ACADEMY</h3>
                            <p className="text-blue-200">
                                Transformando carreiras através da educação em tecnologia.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Cursos</h4>
                            <ul className="space-y-2 text-blue-200">
                                <li><Link href="/courses" className="hover:text-white transition-colors">Todos os Cursos</Link></li>
                                <li><Link href="/courses/fundamentos-desenvolvimento-web" className="hover:text-white transition-colors">Fundamentos Web</Link></li>
                                <li><Link href="/courses/react-js-avancado" className="hover:text-white transition-colors">React Avançado</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Empresa</h4>
                            <ul className="space-y-2 text-blue-200">
                                <li><Link href="/about" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contato</Link></li>
                                <li><Link href="/careers" className="hover:text-white transition-colors">Carreiras</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Suporte</h4>
                            <ul className="space-y-2 text-blue-200">
                                <li><Link href="/help" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                                <li><Link href="/support" className="hover:text-white transition-colors">Suporte</Link></li>
                                <li><Link href="/community" className="hover:text-white transition-colors">Comunidade</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 mt-8 pt-8 text-center text-blue-200">
                        <p>&copy; 2024 FÉNIX DEV ACADEMY. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 