'use client';

import { NextRequest, NextResponse } from 'next/server';

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
                    },
                    {
                        id: 'aula-2',
                        title: 'Variáveis e Tipos de Dados',
                        description: 'Conhecendo os tipos de dados em Python',
                        duration: '2 horas',
                        type: 'video',
                        isLocked: false,
                        order: 2
                    },
                    {
                        id: 'aula-3',
                        title: 'Estruturas de Controle',
                        description: 'If, else, loops e estruturas condicionais',
                        duration: '2 horas',
                        type: 'video',
                        isLocked: false,
                        order: 3
                    },
                    {
                        id: 'aula-4',
                        title: 'Funções em Python',
                        description: 'Criando e usando funções',
                        duration: '2 horas',
                        type: 'video',
                        isLocked: false,
                        order: 4
                    }
                ],
                order: 1,
                level: 'iniciante'
            },
            {
                id: 'modulo-2',
                title: 'Bibliotecas Essenciais',
                description: 'Pandas, NumPy e Matplotlib',
                duration: '12 horas',
                lessons: [
                    {
                        id: 'aula-5',
                        title: 'Introdução ao Pandas',
                        description: 'Manipulação de dados com Pandas',
                        duration: '3 horas',
                        type: 'video',
                        isLocked: false,
                        order: 1
                    },
                    {
                        id: 'aula-6',
                        title: 'NumPy para Computação Numérica',
                        description: 'Arrays e operações matemáticas',
                        duration: '3 horas',
                        type: 'video',
                        isLocked: false,
                        order: 2
                    },
                    {
                        id: 'aula-7',
                        title: 'Visualização com Matplotlib',
                        description: 'Criando gráficos e visualizações',
                        duration: '3 horas',
                        type: 'video',
                        isLocked: false,
                        order: 3
                    },
                    {
                        id: 'aula-8',
                        title: 'Projeto Prático',
                        description: 'Análise de dados do mundo real',
                        duration: '3 horas',
                        type: 'project',
                        isLocked: false,
                        order: 4
                    }
                ],
                order: 2,
                level: 'intermediario'
            }
        ],
        requirements: ['Conhecimento básico de programação', 'Computador com Python instalado'],
        whatYouWillLearn: ['Programação em Python', 'Análise de dados', 'Machine Learning', 'Visualização de dados'],
        certificate: true,
        language: 'pt-BR',
        lastUpdated: '2024-01-15',
        emoji: '🐍',
        companies: ['Google', 'Microsoft', 'Amazon'],
        technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib']
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

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;

        const course = EXPANDED_COURSES.find(c => c.slug === slug);

        if (!course) {
            return NextResponse.json({
                success: false,
                error: 'Curso não encontrado'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            course: course
        });

    } catch (error) {
        console.error('Erro ao buscar curso expandido:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





