'use client';

import { NextRequest, NextResponse } from 'next/server';

// Dados mockados das aulas
const COURSE_LESSONS = {
    'python-data-science': [
        {
            id: 'aula-1',
            title: 'Introdução ao Python',
            description: 'Primeiros passos com Python',
            duration: '2 horas',
            type: 'video',
            isLocked: false,
            order: 1,
            module: 'modulo-1',
            level: 'iniciante',
            videoUrl: '/videos/python-intro.mp4',
            transcript: 'Nesta aula, você aprenderá os conceitos básicos da linguagem Python...',
            resources: [
                {
                    title: 'Documentação Python',
                    url: 'https://docs.python.org/3/',
                    type: 'documentation'
                },
                {
                    title: 'Exercícios Práticos',
                    url: '/exercises/python-basics',
                    type: 'exercise'
                }
            ]
        },
        {
            id: 'aula-2',
            title: 'Variáveis e Tipos de Dados',
            description: 'Conhecendo os tipos de dados em Python',
            duration: '2 horas',
            type: 'video',
            isLocked: false,
            order: 2,
            module: 'modulo-1',
            level: 'iniciante',
            videoUrl: '/videos/python-variables.mp4',
            transcript: 'Nesta aula, você aprenderá sobre variáveis e tipos de dados em Python...',
            resources: [
                {
                    title: 'Tipos de Dados Python',
                    url: 'https://docs.python.org/3/library/stdtypes.html',
                    type: 'documentation'
                }
            ]
        },
        {
            id: 'aula-3',
            title: 'Estruturas de Controle',
            description: 'If, else, loops e estruturas condicionais',
            duration: '2 horas',
            type: 'video',
            isLocked: false,
            order: 3,
            module: 'modulo-1',
            level: 'iniciante',
            videoUrl: '/videos/python-control.mp4',
            transcript: 'Nesta aula, você aprenderá sobre estruturas de controle em Python...',
            resources: []
        },
        {
            id: 'aula-4',
            title: 'Funções em Python',
            description: 'Criando e usando funções',
            duration: '2 horas',
            type: 'video',
            isLocked: false,
            order: 4,
            module: 'modulo-1',
            level: 'iniciante',
            videoUrl: '/videos/python-functions.mp4',
            transcript: 'Nesta aula, você aprenderá sobre funções em Python...',
            resources: []
        },
        {
            id: 'aula-5',
            title: 'Introdução ao Pandas',
            description: 'Manipulação de dados com Pandas',
            duration: '3 horas',
            type: 'video',
            isLocked: false,
            order: 1,
            module: 'modulo-2',
            level: 'intermediario',
            videoUrl: '/videos/pandas-intro.mp4',
            transcript: 'Nesta aula, você aprenderá sobre a biblioteca Pandas...',
            resources: [
                {
                    title: 'Documentação Pandas',
                    url: 'https://pandas.pydata.org/docs/',
                    type: 'documentation'
                }
            ]
        },
        {
            id: 'aula-6',
            title: 'NumPy para Computação Numérica',
            description: 'Arrays e operações matemáticas',
            duration: '3 horas',
            type: 'video',
            isLocked: false,
            order: 2,
            module: 'modulo-2',
            level: 'intermediario',
            videoUrl: '/videos/numpy-intro.mp4',
            transcript: 'Nesta aula, você aprenderá sobre a biblioteca NumPy...',
            resources: []
        },
        {
            id: 'aula-7',
            title: 'Visualização com Matplotlib',
            description: 'Criando gráficos e visualizações',
            duration: '3 horas',
            type: 'video',
            isLocked: false,
            order: 3,
            module: 'modulo-2',
            level: 'intermediario',
            videoUrl: '/videos/matplotlib-intro.mp4',
            transcript: 'Nesta aula, você aprenderá sobre visualização de dados...',
            resources: []
        },
        {
            id: 'aula-8',
            title: 'Projeto Prático',
            description: 'Análise de dados do mundo real',
            duration: '3 horas',
            type: 'project',
            isLocked: false,
            order: 4,
            module: 'modulo-2',
            level: 'intermediario',
            videoUrl: null,
            transcript: 'Neste projeto, você aplicará todos os conceitos aprendidos...',
            resources: [
                {
                    title: 'Dataset do Projeto',
                    url: '/datasets/sales-data.csv',
                    type: 'dataset'
                }
            ]
        }
    ],
    'web-development': [
        {
            id: 'aula-1',
            title: 'Introdução ao React',
            description: 'Primeiros passos com React',
            duration: '3 horas',
            type: 'video',
            isLocked: false,
            order: 1,
            module: 'modulo-1',
            level: 'iniciante',
            videoUrl: '/videos/react-intro.mp4',
            transcript: 'Nesta aula, você aprenderá os conceitos básicos do React...',
            resources: [
                {
                    title: 'Documentação React',
                    url: 'https://react.dev/',
                    type: 'documentation'
                }
            ]
        },
        {
            id: 'aula-2',
            title: 'Componentes e Props',
            description: 'Criando e reutilizando componentes',
            duration: '3 horas',
            type: 'video',
            isLocked: false,
            order: 2,
            module: 'modulo-1',
            level: 'iniciante',
            videoUrl: '/videos/react-components.mp4',
            transcript: 'Nesta aula, você aprenderá sobre componentes e props...',
            resources: []
        },
        {
            id: 'aula-3',
            title: 'Estado e Ciclo de Vida',
            description: 'Gerenciando estado com useState e useEffect',
            duration: '3 horas',
            type: 'video',
            isLocked: false,
            order: 3,
            module: 'modulo-1',
            level: 'iniciante',
            videoUrl: '/videos/react-state.mp4',
            transcript: 'Nesta aula, você aprenderá sobre estado e ciclo de vida...',
            resources: []
        },
        {
            id: 'aula-4',
            title: 'Eventos e Formulários',
            description: 'Interação com o usuário',
            duration: '3 horas',
            type: 'video',
            isLocked: false,
            order: 4,
            module: 'modulo-1',
            level: 'iniciante',
            videoUrl: '/videos/react-events.mp4',
            transcript: 'Nesta aula, você aprenderá sobre eventos e formulários...',
            resources: []
        }
    ]
};

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        const { searchParams } = new URL(request.url);
        const level = searchParams.get('level');
        const module = searchParams.get('module');

        const lessons = COURSE_LESSONS[slug as keyof typeof COURSE_LESSONS] || [];

        let filteredLessons = lessons;

        // Filtrar por nível se especificado
        if (level) {
            filteredLessons = filteredLessons.filter(lesson =>
                lesson.level.toLowerCase() === level.toLowerCase()
            );
        }

        // Filtrar por módulo se especificado
        if (module) {
            filteredLessons = filteredLessons.filter(lesson =>
                lesson.module === module
            );
        }

        return NextResponse.json({
            success: true,
            lessons: filteredLessons,
            total: filteredLessons.length
        });

    } catch (error) {
        console.error('Erro ao buscar aulas do curso:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





