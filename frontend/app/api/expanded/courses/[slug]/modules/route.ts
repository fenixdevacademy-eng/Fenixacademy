'use client';

import { NextRequest, NextResponse } from 'next/server';

// Dados mockados dos módulos
const COURSE_MODULES = {
    'python-data-science': [
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
        },
        {
            id: 'modulo-3',
            title: 'Machine Learning',
            description: 'Introdução ao Machine Learning com Scikit-learn',
            duration: '20 horas',
            lessons: [
                {
                    id: 'aula-9',
                    title: 'Introdução ao Machine Learning',
                    description: 'Conceitos fundamentais de ML',
                    duration: '4 horas',
                    type: 'video',
                    isLocked: true,
                    order: 1
                },
                {
                    id: 'aula-10',
                    title: 'Algoritmos de Classificação',
                    description: 'Regressão Logística, SVM, Random Forest',
                    duration: '6 horas',
                    type: 'video',
                    isLocked: true,
                    order: 2
                },
                {
                    id: 'aula-11',
                    title: 'Algoritmos de Regressão',
                    description: 'Regressão Linear, Polinomial, Ridge',
                    duration: '6 horas',
                    type: 'video',
                    isLocked: true,
                    order: 3
                },
                {
                    id: 'aula-12',
                    title: 'Projeto Final',
                    description: 'Projeto completo de Machine Learning',
                    duration: '4 horas',
                    type: 'project',
                    isLocked: true,
                    order: 4
                }
            ],
            order: 3,
            level: 'avancado'
        }
    ],
    'web-development': [
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
                },
                {
                    id: 'aula-2',
                    title: 'Componentes e Props',
                    description: 'Criando e reutilizando componentes',
                    duration: '3 horas',
                    type: 'video',
                    isLocked: false,
                    order: 2
                },
                {
                    id: 'aula-3',
                    title: 'Estado e Ciclo de Vida',
                    description: 'Gerenciando estado com useState e useEffect',
                    duration: '3 horas',
                    type: 'video',
                    isLocked: false,
                    order: 3
                },
                {
                    id: 'aula-4',
                    title: 'Eventos e Formulários',
                    description: 'Interação com o usuário',
                    duration: '3 horas',
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
            title: 'Backend com Node.js',
            description: 'Criando APIs com Node.js e Express',
            duration: '16 horas',
            lessons: [
                {
                    id: 'aula-5',
                    title: 'Introdução ao Node.js',
                    description: 'Primeiros passos com Node.js',
                    duration: '4 horas',
                    type: 'video',
                    isLocked: true,
                    order: 1
                },
                {
                    id: 'aula-6',
                    title: 'Express.js e Rotas',
                    description: 'Criando APIs REST com Express',
                    duration: '4 horas',
                    type: 'video',
                    isLocked: true,
                    order: 2
                },
                {
                    id: 'aula-7',
                    title: 'Banco de Dados MongoDB',
                    description: 'Integração com MongoDB',
                    duration: '4 horas',
                    type: 'video',
                    isLocked: true,
                    order: 3
                },
                {
                    id: 'aula-8',
                    title: 'Autenticação e Segurança',
                    description: 'JWT e middleware de segurança',
                    duration: '4 horas',
                    type: 'video',
                    isLocked: true,
                    order: 4
                }
            ],
            order: 2,
            level: 'intermediario'
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

        const modules = COURSE_MODULES[slug as keyof typeof COURSE_MODULES] || [];

        let filteredModules = modules;

        // Filtrar por nível se especificado
        if (level) {
            filteredModules = modules.filter(module =>
                module.level.toLowerCase() === level.toLowerCase()
            );
        }

        return NextResponse.json({
            success: true,
            modules: filteredModules,
            total: filteredModules.length
        });

    } catch (error) {
        console.error('Erro ao buscar módulos do curso:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





