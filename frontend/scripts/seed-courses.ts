'use client';

﻿import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const courses = [
    // Web Development
    {
        id: 'react-avancado',
        title: 'React Avançado - Do Zero ao Profissional',
        description: 'Aprenda React com padrões avançados, hooks customizados e otimizações de performance.',
        slug: 'react-avancado',
        price: 297.00,
        duration: 40,
        level: 'intermediario',
        category: 'web'
    },
    {
        id: 'nodejs-completo',
        title: 'Node.js Completo - Backend Profissional',
        description: 'Desenvolva APIs robustas com Node.js, Express, MongoDB e autenticação JWT.',
        slug: 'nodejs-completo',
        price: 347.00,
        duration: 35,
        level: 'intermediario',
        category: 'web'
    },
    {
        id: 'javascript-moderno',
        title: 'JavaScript Moderno - ES6+ e Além',
        description: 'Domine as funcionalidades mais recentes do JavaScript e padrões modernos.',
        slug: 'javascript-moderno',
        price: 197.00,
        duration: 25,
        level: 'iniciante',
        category: 'web'
    },
    {
        id: 'typescript-profissional',
        title: 'TypeScript Profissional - Tipagem Avançada',
        description: 'Aprenda TypeScript do básico ao avançado com projetos reais.',
        slug: 'typescript-profissional',
        price: 247.00,
        duration: 30,
        level: 'intermediario',
        category: 'web'
    },
    {
        id: 'nextjs-fullstack',
        title: 'Next.js Full Stack - Aplicações Completas',
        description: 'Crie aplicações full-stack com Next.js, API Routes e deploy.',
        slug: 'nextjs-fullstack',
        price: 397.00,
        duration: 45,
        level: 'avancado',
        category: 'web'
    },
    {
        id: 'vuejs-completo',
        title: 'Vue.js Completo - Framework Progressivo',
        description: 'Aprenda Vue.js 3 com Composition API e ecossistema completo.',
        slug: 'vuejs-completo',
        price: 297.00,
        duration: 35,
        level: 'intermediario',
        category: 'web'
    },
    {
        id: 'angular-enterprise',
        title: 'Angular Enterprise - Aplicações Corporativas',
        description: 'Desenvolva aplicações enterprise com Angular e melhores práticas.',
        slug: 'angular-enterprise',
        price: 447.00,
        duration: 50,
        level: 'avancado',
        category: 'web'
    },
    {
        id: 'svelte-moderno',
        title: 'Svelte Moderno - Framework Compilado',
        description: 'Aprenda Svelte e SvelteKit para aplicações rápidas e modernas.',
        slug: 'svelte-moderno',
        price: 197.00,
        duration: 20,
        level: 'intermediario',
        category: 'web'
    },

    // Data Science
    {
        id: 'python-data-science',
        title: 'Python para Data Science - Análise Completa',
        description: 'Aprenda Python, Pandas, NumPy e Matplotlib para análise de dados.',
        slug: 'python-data-science',
        price: 347.00,
        duration: 40,
        level: 'iniciante',
        category: 'data'
    },
    {
        id: 'machine-learning-python',
        title: 'Machine Learning com Python - Algoritmos Práticos',
        description: 'Implemente algoritmos de ML com scikit-learn e TensorFlow.',
        slug: 'machine-learning-python',
        price: 497.00,
        duration: 60,
        level: 'avancado',
        category: 'data'
    },
    {
        id: 'deep-learning-tensorflow',
        title: 'Deep Learning com TensorFlow - Redes Neurais',
        description: 'Crie redes neurais profundas com TensorFlow e Keras.',
        slug: 'deep-learning-tensorflow',
        price: 597.00,
        duration: 70,
        level: 'avancado',
        category: 'data'
    },
    {
        id: 'sql-avancado',
        title: 'SQL Avançado - Consultas Complexas e Otimização',
        description: 'Domine SQL com consultas avançadas, índices e performance.',
        slug: 'sql-avancado',
        price: 197.00,
        duration: 25,
        level: 'intermediario',
        category: 'data'
    },
    {
        id: 'power-bi-completo',
        title: 'Power BI Completo - Dashboards e Relatórios',
        description: 'Crie dashboards profissionais com Power BI e DAX.',
        slug: 'power-bi-completo',
        price: 297.00,
        duration: 30,
        level: 'intermediario',
        category: 'data'
    },
    {
        id: 'tableau-avancado',
        title: 'Tableau Avançado - Visualização de Dados',
        description: 'Crie visualizações impressionantes com Tableau Desktop e Server.',
        slug: 'tableau-avancado',
        price: 397.00,
        duration: 35,
        level: 'avancado',
        category: 'data'
    },

    // Mobile
    {
        id: 'react-native-completo',
        title: 'React Native Completo - Apps Nativos',
        description: 'Desenvolva apps iOS e Android com React Native e Expo.',
        slug: 'react-native-completo',
        price: 397.00,
        duration: 45,
        level: 'intermediario',
        category: 'mobile'
    },
    {
        id: 'flutter-dart',
        title: 'Flutter com Dart - Apps Multiplataforma',
        description: 'Crie apps nativos com Flutter e linguagem Dart.',
        slug: 'flutter-dart',
        price: 347.00,
        duration: 40,
        level: 'intermediario',
        category: 'mobile'
    },
    {
        id: 'swift-ios',
        title: 'Swift para iOS - Desenvolvimento Nativo',
        description: 'Desenvolva apps iOS nativos com Swift e SwiftUI.',
        slug: 'swift-ios',
        price: 447.00,
        duration: 50,
        level: 'avancado',
        category: 'mobile'
    },
    {
        id: 'kotlin-android',
        title: 'Kotlin para Android - Desenvolvimento Nativo',
        description: 'Crie apps Android nativos com Kotlin e Jetpack Compose.',
        slug: 'kotlin-android',
        price: 397.00,
        duration: 45,
        level: 'avancado',
        category: 'mobile'
    },

    // Cybersecurity
    {
        id: 'ethical-hacking',
        title: 'Ethical Hacking - Segurança Ofensiva',
        description: 'Aprenda técnicas de hacking ético e testes de penetração.',
        slug: 'ethical-hacking',
        price: 597.00,
        duration: 60,
        level: 'avancado',
        category: 'security'
    },
    {
        id: 'cybersecurity-fundamentals',
        title: 'Fundamentos de Cybersecurity - Proteção Digital',
        description: 'Aprenda os conceitos básicos de segurança da informação.',
        slug: 'cybersecurity-fundamentals',
        price: 297.00,
        duration: 30,
        level: 'iniciante',
        category: 'security'
    },
    {
        id: 'penetration-testing',
        title: 'Penetration Testing - Testes de Invasão',
        description: 'Execute testes de penetração profissionais e relatórios.',
        slug: 'penetration-testing',
        price: 497.00,
        duration: 50,
        level: 'avancado',
        category: 'security'
    },

    // AI
    {
        id: 'inteligencia-artificial',
        title: 'Inteligência Artificial - Fundamentos e Aplicações',
        description: 'Aprenda IA, algoritmos e implementações práticas.',
        slug: 'inteligencia-artificial',
        price: 447.00,
        duration: 55,
        level: 'intermediario',
        category: 'ai'
    },
    {
        id: 'chatgpt-prompt-engineering',
        title: 'ChatGPT e Prompt Engineering - IA Generativa',
        description: 'Domine técnicas de prompt engineering e IA generativa.',
        slug: 'chatgpt-prompt-engineering',
        price: 197.00,
        duration: 20,
        level: 'iniciante',
        category: 'ai'
    },
    {
        id: 'computer-vision',
        title: 'Computer Vision - Visão Computacional',
        description: 'Processe imagens e vídeos com OpenCV e Python.',
        slug: 'computer-vision',
        price: 397.00,
        duration: 40,
        level: 'avancado',
        category: 'ai'
    }
]

async function main() {
    console.log('🌱 Iniciando seed dos cursos...')

    try {
        // Limpar cursos existentes
        await prisma.course.deleteMany({})
        console.log('🗑️ Cursos existentes removidos')

        // Criar novos cursos
        for (const course of courses) {
            await prisma.course.create({
                data: {
                    ...course,
                    isActive: true
                }
            })
            console.log(`✅ Curso criado: ${course.title}`)
        }

        console.log(`🎉 Seed concluído! ${courses.length} cursos criados.`)

    } catch (error) {
        console.error('❌ Erro no seed:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
