'use client';

﻿import React from 'react'
import Link from 'next/link'
import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Heart
} from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        company: [
            { name: 'Sobre Nós', href: '/about' },
            { name: 'Carreiras', href: '/careers' },
            { name: 'Contato', href: '/contact' },
            { name: 'Blog', href: '/blog' },
        ],
        courses: [
            { name: 'React', href: '/courses/react' },
            { name: 'Node.js', href: '/courses/nodejs' },
            { name: 'Python', href: '/courses/python' },
            { name: 'Data Science', href: '/courses/data-science' },
        ],
        support: [
            { name: 'Central de Ajuda', href: '/help' },
            { name: 'Comunidade', href: '/community' },
            { name: 'Suporte Técnico', href: '/support' },
            { name: 'Status', href: '/status' },
        ],
        legal: [
            { name: 'Termos de Uso', href: '/terms' },
            { name: 'Privacidade', href: '/privacy' },
            { name: 'Cookies', href: '/cookies' },
            { name: 'Licenças', href: '/licenses' },
        ]}

    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com/fenixdevacademy', icon: Github },
        { name: 'Twitter', href: 'https://twitter.com/fenixdevacademy', icon: Twitter },
        { name: 'LinkedIn', href: 'https://linkedin.com/company/fenixdevacademy', icon: Linkedin },
    ]

    return (
        <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">F</span>
                            </div>
                            <span className="text-xl font-bold text-white">Fênix Dev Academy</span>
                        </Link>
                        <p className="text-gray-300 mb-6 max-w-md">
                            Transformando vidas através da programação. Aprenda com os melhores especialistas
                            e conquiste o emprego dos seus sonhos.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm text-gray-300">
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>fenixdevacademy@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>21 986289597</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>Rio de Janeiro, RJ - Brasil</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Empresa</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Courses Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Cursos</h3>
                        <ul className="space-y-2">
                            {footerLinks.courses.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Suporte</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex space-x-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <Link
                                href="/terms"
                                className="hover:text-white transition-colors duration-300"
                            >
                                Termos
                            </Link>
                            <Link
                                href="/privacy"
                                className="hover:text-white transition-colors duration-300"
                            >
                                Privacidade
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-gray-300 text-sm">
                            © {currentYear} Fênix Dev Academy. Todos os direitos reservados.
                        </p>
                        <p className="text-gray-300 text-sm flex items-center">
                            Feito com <Heart className="w-4 h-4 text-red-500 mx-1" /> no Brasil
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

