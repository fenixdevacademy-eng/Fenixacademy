'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

// Dados mockados dos cursos expandidos
const EXPANDED_COURSES = [
    {
        id: 'python-data-science',
        title: 'Python para Data Science',
        slug: 'python-data-science',
        description: 'Aprenda Python do zero ao avançado com foco em Data Science e Machine Learning',
        instructor: 'Dr. Carlos Silva',
        duration: '40 horas',
        level: 'iniciante',
        price: 297,
        originalPrice: 597,
        discount: 50,
        rating: 4.9,
        students: 1250,
        imageUrl: '/images/courses/python-data-science.jpg',
        tags: ['Python', 'Data Science', 'Machine Learning'],
        modules: [
            {
                id: 'modulo-1',
                title: 'Fundamentos do Python',
                description: 'Aprenda os conceitos básicos da linguagem Python',
                duration: '8 horas',
                lessons: [
                    {
                        id: 'aula-1',
                        title: 'Introdução ao Python',
                        description: 'Primeiros passos com Python',
                        duration: '2 horas',
                        type: 'video',
                        isLocked: false,
                        order: 1
                    }
                ],
                order: 1,
                level: 'iniciante'
            }
        ],
        requirements: ['Conhecimento básico de programação', 'Computador com Python instalado'],
        whatYouWillLearn: ['Programação em Python', 'Análise de dados', 'Machine Learning'],
        certificate: true,
        language: 'pt-BR',
        lastUpdated: '2024-01-15',
        emoji: '🐍',
        companies: ['Google', 'Microsoft', 'Amazon'],
        technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn']
    },
    {
        id: 'web-development',
        title: 'Desenvolvimento Web Completo',
        slug: 'web-development',
        description: 'Domine React, Node.js e as melhores práticas de desenvolvimento web moderno',
        instructor: 'Ana Costa',
        duration: '60 horas',
        level: 'intermediario',
        price: 397,
        originalPrice: 797,
        discount: 50,
        rating: 4.8,
        students: 2100,
        imageUrl: '/images/courses/web-development.jpg',
        tags: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
        modules: [
            {
                id: 'modulo-1',
                title: 'Fundamentos do React',
                description: 'Aprenda os conceitos básicos do React',
                duration: '12 horas',
                lessons: [
                    {
                        id: 'aula-1',
                        title: 'Introdução ao React',
                        description: 'Primeiros passos com React',
                        duration: '3 horas',
                        type: 'video',
                        isLocked: false,
                        order: 1
                    }
                ],
                order: 1,
                level: 'iniciante'
            }
        ],
        requirements: ['Conhecimento básico de JavaScript', 'Computador com Node.js instalado'],
        whatYouWillLearn: ['React', 'Node.js', 'MongoDB', 'APIs REST'],
        certificate: true,
        language: 'pt-BR',
        lastUpdated: '2024-01-20',
        emoji: '⚛️',
        companies: ['Facebook', 'Netflix', 'Airbnb'],
        technologies: ['React', 'Node.js', 'MongoDB', 'Express']
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const level = searchParams.get('level');
        const search = searchParams.get('search');

        let filteredCourses = [...EXPANDED_COURSES];

        // Filtrar por categoria
        if (category) {
            filteredCourses = filteredCourses.filter(course =>
                course.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
            );
        }

        // Filtrar por nível
        if (level) {
            filteredCourses = filteredCourses.filter(course =>
                course.level.toLowerCase() === level.toLowerCase()
            );
        }

        // Filtrar por busca
        if (search) {
            filteredCourses = filteredCourses.filter(course =>
                course.title.toLowerCase().includes(search.toLowerCase()) ||
                course.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        return NextResponse.json({
            success: true,
            courses: filteredCourses,
            total: filteredCourses.length
        });

    } catch (error) {
        console.error('Erro ao buscar cursos expandidos:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





