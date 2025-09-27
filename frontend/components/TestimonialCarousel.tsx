'use client';

/**
 * Carrossel de depoimentos
 * Exibe depoimentos de alunos de forma dinâmica
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar: string;
    course: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Maria Silva',
        role: 'Desenvolvedora Frontend',
        company: 'TechCorp',
        content: 'A Fenix Academy transformou completamente minha carreira. Em 6 meses consegui uma vaga como desenvolvedora sênior. O conteúdo é excepcional!',
        rating: 5,
        avatar: '/avatars/maria-silva.jpg',
        course: 'React Avançado'
    },
    {
        id: 2,
        name: 'João Santos',
        role: 'Data Scientist',
        company: 'DataLab',
        content: 'O curso de Python Data Science é incrível! Aprendi machine learning do zero e hoje trabalho com IA. Recomendo para todos!',
        rating: 5,
        avatar: '/avatars/joao-santos.jpg',
        course: 'Python Data Science'
    },
    {
        id: 3,
        name: 'Ana Costa',
        role: 'DevOps Engineer',
        company: 'CloudTech',
        content: 'A plataforma é completa e o suporte é excepcional. Consegui migrar para DevOps graças aos cursos da Fenix Academy.',
        rating: 5,
        avatar: '/avatars/ana-costa.jpg',
        course: 'AWS Cloud'
    },
    {
        id: 4,
        name: 'Carlos Oliveira',
        role: 'Full Stack Developer',
        company: 'StartupX',
        content: 'O IDE integrado é fantástico! Consigo praticar e aprender ao mesmo tempo. A experiência de aprendizado é única.',
        rating: 5,
        avatar: '/avatars/carlos-oliveira.jpg',
        course: 'Full Stack Development'
    },
    {
        id: 5,
        name: 'Fernanda Lima',
        role: 'Mobile Developer',
        company: 'AppMobile',
        content: 'Os projetos práticos me ajudaram a construir um portfólio sólido. Hoje trabalho com React Native graças à Fenix!',
        rating: 5,
        avatar: '/avatars/fernanda-lima.jpg',
        course: 'React Native'
    }
];

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    }

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    }

    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />

                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-blue-400/20">
                    <Quote className="w-12 h-12" />
                </div>

                <div className="relative z-10">
                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < currentTestimonial.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-600'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                        "{currentTestimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                            {currentTestimonial.name.charAt(0)}
                        </div>
                        <div className="text-white font-semibold text-lg">
                            {currentTestimonial.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                            {currentTestimonial.role} na {currentTestimonial.company}
                        </div>
                        <div className="text-blue-400 text-sm mt-1">
                            Curso: {currentTestimonial.course}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
                <button
                    onClick={prevTestimonial}
                    className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* Dots */}
                <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex
                                    ? 'bg-blue-500'
                                    : 'bg-gray-600 hover:bg-gray-500'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextTestimonial}
                    className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-4">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                >
                    {isAutoPlaying ? 'Pausar' : 'Reproduzir'} automaticamente
                </button>
            </div>
        </div>
    );
}

