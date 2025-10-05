'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Users, MessageCircle, Share2 } from 'lucide-react';

export default function FenixFooter() {
    return (
        <footer className="relative z-10 bg-gradient-to-r from-black/80 to-red-900/50 backdrop-blur-sm py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-2">
                                <Code className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                Fênix Dev Academy
                            </span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            A plataforma mais revolucionária do Brasil para desenvolvedores.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="/community" className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-3 hover:from-red-500/30 hover:to-orange-500/30 transition-colors">
                                <Users className="h-6 w-6 text-white" />
                            </Link>
                            <Link href="/contact" className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-lg p-3 hover:from-orange-500/30 hover:to-yellow-500/30 transition-colors">
                                <MessageCircle className="h-6 w-6 text-white" />
                            </Link>
                            <Link href="/share" className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-lg p-3 hover:from-yellow-500/30 hover:to-red-500/30 transition-colors">
                                <Share2 className="h-6 w-6 text-white" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                            Cursos
                        </h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/courses" className="hover:text-red-300 transition-colors">Todos os Cursos</Link></li>
                            <li><Link href="/courses/react" className="hover:text-orange-300 transition-colors">React Avançado</Link></li>
                            <li><Link href="/courses/nodejs" className="hover:text-yellow-300 transition-colors">Node.js Profissional</Link></li>
                            <li><Link href="/courses/python" className="hover:text-red-300 transition-colors">Python Data Science</Link></li>
                            <li><Link href="/courses/devops" className="hover:text-orange-300 transition-colors">DevOps & Docker</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            Plataforma
                        </h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/ide" className="hover:text-orange-300 transition-colors">IDE Online</Link></li>
                            <li><Link href="/ai" className="hover:text-yellow-300 transition-colors">IA Tutor</Link></li>
                            <li><Link href="/dashboard" className="hover:text-red-300 transition-colors">Dashboard</Link></li>
                            <li><Link href="/progress" className="hover:text-orange-300 transition-colors">Meu Progresso</Link></li>
                            <li><Link href="/certificates" className="hover:text-yellow-300 transition-colors">Certificados</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                            Empresa
                        </h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/about" className="hover:text-yellow-300 transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/careers" className="hover:text-red-300 transition-colors">Carreiras</Link></li>
                            <li><Link href="/blog" className="hover:text-orange-300 transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-yellow-300 transition-colors">Contato</Link></li>
                            <li><Link href="/help" className="hover:text-red-300 transition-colors">Central de Ajuda</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-red-500/30 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 mb-4 md:mb-0">
                            © 2025 Fênix Dev Academy. Todos os direitos reservados.
                        </div>
                        <div className="flex space-x-6 text-gray-400">
                            <Link href="/terms" className="hover:text-red-300 transition-colors">Termos de Uso</Link>
                            <Link href="/privacy" className="hover:text-orange-300 transition-colors">Privacidade</Link>
                            <Link href="/cookies" className="hover:text-yellow-300 transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}



