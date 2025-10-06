'use client';

﻿/**
 * Custom hooks for Expanded Content API
 * Provides easy-to-use hooks for managing expanded content state
 */

import { useState, useEffect, useCallback } from 'react';
import { expandedContentAPI, type ExpandedCourse, type ExpandedModule, type ExpandedLesson, type ExpandedExercise, type ExpandedQuiz, type UserProgress, type LearningDashboard } from '../lib/expanded-content-api';
import { expandedCourseService } from '../lib/expanded-course-service';
import { cacheManager } from '../lib/cache-manager';

// Hook for managing courses list
export function useExpandedCourses() {
    const [courses, setCourses] = useState<ExpandedCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Tentar cache primeiro
            const cachedCourses = await cacheManager.get<ExpandedCourse[]>('expanded_courses', {
                ttl: 10 * 60 * 1000, // 10 minutos
                storage: 'memory'
            });

            if (cachedCourses) {
                setCourses(cachedCourses);
                setLoading(false);
                return;
            }

            // Tentar API
            try {
                const coursesData = await expandedContentAPI.getCourses();
                setCourses(coursesData);
                // Cachear resultado
                await cacheManager.set('expanded_courses', coursesData, {
                    ttl: 10 * 60 * 1000,
                    storage: 'memory'
                });
            } catch (apiError) {
                console.error('Erro ao carregar cursos:', apiError);
                // Fallback temporário para lançamento - 25 cursos
                const fallbackCourses = [
                    {
                        id: 'python-data-science',
                        title: 'Python para Data Science',
                        slug: 'python-data-science',
                        description: 'Aprenda Python do zero ao avançado com foco em Data Science e Machine Learning',
                        level: 'Iniciante',
                        duration: '40 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.9,
                        students_count: 1250,
                        language: 'Português',
                        instructor: 'Dr. Carlos Silva',
                        image_url: '/images/courses/python-data-science.jpg',
                        is_featured: true,
                        is_new: false,
                        tags: ['Python', 'Data Science', 'Machine Learning'],
                        modules_count: 8,
                        lessons_count: 45,
                        exercises_count: 120,
                        quizzes_count: 15,
                        projects_count: 5,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de programação'],
                        learning_outcomes: [
                            'Dominar Python para análise de dados',
                            'Implementar algoritmos de Machine Learning',
                            'Criar visualizações profissionais'
                        ],
                        created_at: '2024-01-15T10:00:00Z',
                        updated_at: '2024-01-20T15:30:00Z'
                    },
                    {
                        id: 'web-development',
                        title: 'Desenvolvimento Web Completo',
                        slug: 'web-development',
                        description: 'Domine React, Node.js e as melhores práticas de desenvolvimento web moderno',
                        level: 'Intermediário',
                        duration: '60 horas',
                        price: 297,
                        original_price: 597,
                        discount_percentage: 50,
                        rating: 4.8,
                        students_count: 2100,
                        language: 'Português',
                        instructor: 'Ana Costa',
                        image_url: '/images/courses/web-development.jpg',
                        is_featured: true,
                        is_new: false,
                        tags: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
                        modules_count: 12,
                        lessons_count: 80,
                        exercises_count: 150,
                        quizzes_count: 20,
                        projects_count: 8,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de HTML/CSS'],
                        learning_outcomes: [
                            'Desenvolver aplicações full-stack',
                            'Dominar React e Node.js',
                            'Implementar boas práticas de desenvolvimento'
                        ],
                        created_at: '2024-01-10T10:00:00Z',
                        updated_at: '2024-01-18T15:30:00Z'
                    },
                    {
                        id: 'mobile-development',
                        title: 'Desenvolvimento Mobile',
                        slug: 'mobile-development',
                        description: 'Crie apps nativos e híbridos com React Native e Flutter',
                        level: 'Intermediário',
                        duration: '50 horas',
                        price: 247,
                        original_price: 497,
                        discount_percentage: 50,
                        rating: 4.7,
                        students_count: 980,
                        language: 'Português',
                        instructor: 'João Santos',
                        image_url: '/images/courses/mobile-development.jpg',
                        is_featured: false,
                        is_new: true,
                        tags: ['React Native', 'Flutter', 'Mobile', 'iOS', 'Android'],
                        modules_count: 10,
                        lessons_count: 65,
                        exercises_count: 100,
                        quizzes_count: 15,
                        projects_count: 6,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de JavaScript'],
                        learning_outcomes: [
                            'Desenvolver apps mobile nativos',
                            'Dominar React Native e Flutter',
                            'Publicar apps nas stores'
                        ],
                        created_at: '2024-01-20T10:00:00Z',
                        updated_at: '2024-01-25T15:30:00Z'
                    },
                    {
                        id: 'javascript-advanced',
                        title: 'JavaScript Avançado',
                        slug: 'javascript-advanced',
                        description: 'Domine JavaScript moderno, ES6+, TypeScript e frameworks avançados',
                        level: 'Avançado',
                        duration: '35 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.9,
                        students_count: 1800,
                        language: 'Português',
                        instructor: 'Maria Oliveira',
                        image_url: '/images/courses/javascript-advanced.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['JavaScript', 'TypeScript', 'ES6+', 'Async/Await'],
                        modules_count: 7,
                        lessons_count: 50,
                        exercises_count: 80,
                        quizzes_count: 12,
                        projects_count: 4,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de JavaScript'],
                        learning_outcomes: [
                            'Dominar JavaScript moderno',
                            'Implementar TypeScript',
                            'Usar frameworks avançados'
                        ],
                        created_at: '2024-01-05T10:00:00Z',
                        updated_at: '2024-01-15T15:30:00Z'
                    },
                    {
                        id: 'devops-aws',
                        title: 'DevOps com AWS',
                        slug: 'devops-aws',
                        description: 'Aprenda DevOps na prática usando AWS, Docker, Kubernetes e CI/CD',
                        level: 'Intermediário',
                        duration: '45 horas',
                        price: 347,
                        original_price: 697,
                        discount_percentage: 50,
                        rating: 4.8,
                        students_count: 750,
                        language: 'Português',
                        instructor: 'Pedro Lima',
                        image_url: '/images/courses/devops-aws.jpg',
                        is_featured: true,
                        is_new: false,
                        tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
                        modules_count: 9,
                        lessons_count: 60,
                        exercises_count: 90,
                        quizzes_count: 18,
                        projects_count: 7,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de Linux'],
                        learning_outcomes: [
                            'Implementar DevOps com AWS',
                            'Dominar Docker e Kubernetes',
                            'Configurar pipelines de CI/CD'
                        ],
                        created_at: '2024-01-12T10:00:00Z',
                        updated_at: '2024-01-22T15:30:00Z'
                    },
                    {
                        id: 'ai-machine-learning',
                        title: 'Inteligência Artificial e Machine Learning',
                        slug: 'ai-machine-learning',
                        description: 'Aprenda IA e ML do zero com TensorFlow, PyTorch e projetos práticos',
                        level: 'Avançado',
                        duration: '55 horas',
                        price: 397,
                        original_price: 797,
                        discount_percentage: 50,
                        rating: 4.9,
                        students_count: 650,
                        language: 'Português',
                        instructor: 'Dr. Sofia Chen',
                        image_url: '/images/courses/ai-machine-learning.jpg',
                        is_featured: true,
                        is_new: true,
                        tags: ['AI', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Deep Learning'],
                        modules_count: 11,
                        lessons_count: 75,
                        exercises_count: 120,
                        quizzes_count: 22,
                        projects_count: 9,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento de Python e matemática'],
                        learning_outcomes: [
                            'Implementar algoritmos de ML',
                            'Dominar TensorFlow e PyTorch',
                            'Criar modelos de Deep Learning'
                        ],
                        created_at: '2024-01-25T10:00:00Z',
                        updated_at: '2024-01-30T15:30:00Z'
                    },
                    {
                        id: 'java-spring-boot',
                        title: 'Java com Spring Boot',
                        slug: 'java-spring-boot',
                        description: 'Desenvolva aplicações robustas com Java e Spring Boot',
                        level: 'Intermediário',
                        duration: '50 horas',
                        price: 297,
                        original_price: 597,
                        discount_percentage: 50,
                        rating: 4.7,
                        students_count: 890,
                        language: 'Português',
                        instructor: 'Rafael Santos',
                        image_url: '/images/courses/java-spring.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Java', 'Spring Boot', 'REST API', 'Microservices'],
                        modules_count: 10,
                        lessons_count: 70,
                        exercises_count: 110,
                        quizzes_count: 16,
                        projects_count: 6,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de programação'],
                        learning_outcomes: [
                            'Dominar Java e Spring Boot',
                            'Criar APIs REST robustas',
                            'Implementar microserviços'
                        ],
                        created_at: '2024-01-08T10:00:00Z',
                        updated_at: '2024-01-16T15:30:00Z'
                    },
                    {
                        id: 'csharp-dotnet',
                        title: 'C# e .NET Core',
                        slug: 'csharp-dotnet',
                        description: 'Aprenda C# e .NET Core para desenvolvimento moderno',
                        level: 'Intermediário',
                        duration: '45 horas',
                        price: 247,
                        original_price: 497,
                        discount_percentage: 50,
                        rating: 4.6,
                        students_count: 720,
                        language: 'Português',
                        instructor: 'Marina Costa',
                        image_url: '/images/courses/csharp-dotnet.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['C#', '.NET Core', 'ASP.NET', 'Entity Framework'],
                        modules_count: 9,
                        lessons_count: 60,
                        exercises_count: 95,
                        quizzes_count: 14,
                        projects_count: 5,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de programação'],
                        learning_outcomes: [
                            'Dominar C# e .NET Core',
                            'Criar aplicações web modernas',
                            'Usar Entity Framework'
                        ],
                        created_at: '2024-01-14T10:00:00Z',
                        updated_at: '2024-01-21T15:30:00Z'
                    },
                    {
                        id: 'php-laravel',
                        title: 'PHP com Laravel',
                        slug: 'php-laravel',
                        description: 'Desenvolva aplicações web modernas com PHP e Laravel',
                        level: 'Intermediário',
                        duration: '40 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.5,
                        students_count: 680,
                        language: 'Português',
                        instructor: 'Carlos Mendes',
                        image_url: '/images/courses/php-laravel.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['PHP', 'Laravel', 'MySQL', 'Blade'],
                        modules_count: 8,
                        lessons_count: 55,
                        exercises_count: 85,
                        quizzes_count: 13,
                        projects_count: 4,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de HTML/CSS'],
                        learning_outcomes: [
                            'Dominar PHP e Laravel',
                            'Criar aplicações web robustas',
                            'Usar Eloquent ORM'
                        ],
                        created_at: '2024-01-18T10:00:00Z',
                        updated_at: '2024-01-25T15:30:00Z'
                    },
                    {
                        id: 'ruby-rails',
                        title: 'Ruby on Rails',
                        slug: 'ruby-rails',
                        description: 'Aprenda Ruby e Rails para desenvolvimento web ágil',
                        level: 'Intermediário',
                        duration: '35 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.4,
                        students_count: 540,
                        language: 'Português',
                        instructor: 'Sofia Lima',
                        image_url: '/images/courses/ruby-rails.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Ruby', 'Rails', 'PostgreSQL', 'RSpec'],
                        modules_count: 7,
                        lessons_count: 50,
                        exercises_count: 75,
                        quizzes_count: 12,
                        projects_count: 4,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de programação'],
                        learning_outcomes: [
                            'Dominar Ruby e Rails',
                            'Desenvolver aplicações web rapidamente',
                            'Implementar testes com RSpec'
                        ],
                        created_at: '2024-01-22T10:00:00Z',
                        updated_at: '2024-01-28T15:30:00Z'
                    },
                    {
                        id: 'go-programming',
                        title: 'Go Programming',
                        slug: 'go-programming',
                        description: 'Aprenda Go para desenvolvimento de sistemas e microserviços',
                        level: 'Intermediário',
                        duration: '30 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.8,
                        students_count: 420,
                        language: 'Português',
                        instructor: 'Diego Silva',
                        image_url: '/images/courses/go-programming.jpg',
                        is_featured: false,
                        is_new: true,
                        tags: ['Go', 'Goroutines', 'Microservices', 'Docker'],
                        modules_count: 6,
                        lessons_count: 40,
                        exercises_count: 60,
                        quizzes_count: 10,
                        projects_count: 3,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de programação'],
                        learning_outcomes: [
                            'Dominar Go e suas características',
                            'Criar microserviços eficientes',
                            'Usar Goroutines e Channels'
                        ],
                        created_at: '2024-01-28T10:00:00Z',
                        updated_at: '2024-02-02T15:30:00Z'
                    },
                    {
                        id: 'rust-systems',
                        title: 'Rust para Sistemas',
                        slug: 'rust-systems',
                        description: 'Aprenda Rust para desenvolvimento de sistemas seguros e performáticos',
                        level: 'Avançado',
                        duration: '40 horas',
                        price: 297,
                        original_price: 597,
                        discount_percentage: 50,
                        rating: 4.9,
                        students_count: 380,
                        language: 'Português',
                        instructor: 'Lucas Ferreira',
                        image_url: '/images/courses/rust-systems.jpg',
                        is_featured: false,
                        is_new: true,
                        tags: ['Rust', 'Systems Programming', 'Memory Safety', 'Performance'],
                        modules_count: 8,
                        lessons_count: 55,
                        exercises_count: 80,
                        quizzes_count: 15,
                        projects_count: 5,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento de programação e sistemas'],
                        learning_outcomes: [
                            'Dominar Rust e ownership',
                            'Desenvolver sistemas seguros',
                            'Otimizar performance'
                        ],
                        created_at: '2024-02-01T10:00:00Z',
                        updated_at: '2024-02-05T15:30:00Z'
                    },
                    {
                        id: 'swift-ios',
                        title: 'Swift para iOS',
                        slug: 'swift-ios',
                        description: 'Desenvolva apps iOS nativos com Swift e SwiftUI',
                        level: 'Intermediário',
                        duration: '45 horas',
                        price: 297,
                        original_price: 597,
                        discount_percentage: 50,
                        rating: 4.7,
                        students_count: 650,
                        language: 'Português',
                        instructor: 'Isabella Santos',
                        image_url: '/images/courses/swift-ios.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Swift', 'iOS', 'SwiftUI', 'Xcode'],
                        modules_count: 9,
                        lessons_count: 65,
                        exercises_count: 100,
                        quizzes_count: 16,
                        projects_count: 6,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de programação'],
                        learning_outcomes: [
                            'Dominar Swift e SwiftUI',
                            'Criar apps iOS nativos',
                            'Publicar na App Store'
                        ],
                        created_at: '2024-01-26T10:00:00Z',
                        updated_at: '2024-02-01T15:30:00Z'
                    },
                    {
                        id: 'kotlin-android',
                        title: 'Kotlin para Android',
                        slug: 'kotlin-android',
                        description: 'Desenvolva apps Android modernos com Kotlin',
                        level: 'Intermediário',
                        duration: '50 horas',
                        price: 297,
                        original_price: 597,
                        discount_percentage: 50,
                        rating: 4.6,
                        students_count: 780,
                        language: 'Português',
                        instructor: 'Gabriel Costa',
                        image_url: '/images/courses/kotlin-android.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Kotlin', 'Android', 'Jetpack Compose', 'Material Design'],
                        modules_count: 10,
                        lessons_count: 70,
                        exercises_count: 110,
                        quizzes_count: 18,
                        projects_count: 7,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de programação'],
                        learning_outcomes: [
                            'Dominar Kotlin e Android',
                            'Criar apps Android modernos',
                            'Usar Jetpack Compose'
                        ],
                        created_at: '2024-01-30T10:00:00Z',
                        updated_at: '2024-02-04T15:30:00Z'
                    },
                    {
                        id: 'vue-js',
                        title: 'Vue.js Completo',
                        slug: 'vue-js',
                        description: 'Aprenda Vue.js do zero ao avançado para desenvolvimento frontend',
                        level: 'Intermediário',
                        duration: '35 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.5,
                        students_count: 620,
                        language: 'Português',
                        instructor: 'Camila Oliveira',
                        image_url: '/images/courses/vue-js.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Vue.js', 'Vuex', 'Vue Router', 'Composition API'],
                        modules_count: 7,
                        lessons_count: 50,
                        exercises_count: 80,
                        quizzes_count: 12,
                        projects_count: 4,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de HTML/CSS/JS'],
                        learning_outcomes: [
                            'Dominar Vue.js e ecossistema',
                            'Criar SPAs modernas',
                            'Usar Composition API'
                        ],
                        created_at: '2024-01-24T10:00:00Z',
                        updated_at: '2024-01-30T15:30:00Z'
                    },
                    {
                        id: 'angular-complete',
                        title: 'Angular Completo',
                        slug: 'angular-complete',
                        description: 'Desenvolva aplicações enterprise com Angular',
                        level: 'Avançado',
                        duration: '55 horas',
                        price: 347,
                        original_price: 697,
                        discount_percentage: 50,
                        rating: 4.6,
                        students_count: 580,
                        language: 'Português',
                        instructor: 'Roberto Alves',
                        image_url: '/images/courses/angular-complete.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Angular', 'TypeScript', 'RxJS', 'NgRx'],
                        modules_count: 11,
                        lessons_count: 75,
                        exercises_count: 120,
                        quizzes_count: 20,
                        projects_count: 8,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento de TypeScript'],
                        learning_outcomes: [
                            'Dominar Angular e TypeScript',
                            'Criar aplicações enterprise',
                            'Usar RxJS e NgRx'
                        ],
                        created_at: '2024-01-19T10:00:00Z',
                        updated_at: '2024-01-26T15:30:00Z'
                    },
                    {
                        id: 'svelte-modern',
                        title: 'Svelte Moderno',
                        slug: 'svelte-modern',
                        description: 'Aprenda Svelte, o framework mais moderno do frontend',
                        level: 'Intermediário',
                        duration: '30 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.8,
                        students_count: 350,
                        language: 'Português',
                        instructor: 'Fernanda Lima',
                        image_url: '/images/courses/svelte-modern.jpg',
                        is_featured: false,
                        is_new: true,
                        tags: ['Svelte', 'SvelteKit', 'Modern Frontend', 'Performance'],
                        modules_count: 6,
                        lessons_count: 40,
                        exercises_count: 65,
                        quizzes_count: 10,
                        projects_count: 3,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de HTML/CSS/JS'],
                        learning_outcomes: [
                            'Dominar Svelte e SvelteKit',
                            'Criar apps ultra-rápidas',
                            'Entender o futuro do frontend'
                        ],
                        created_at: '2024-02-03T10:00:00Z',
                        updated_at: '2024-02-07T15:30:00Z'
                    },
                    {
                        id: 'next-js-advanced',
                        title: 'Next.js Avançado',
                        slug: 'next-js-advanced',
                        description: 'Domine Next.js para aplicações React de produção',
                        level: 'Avançado',
                        duration: '40 horas',
                        price: 297,
                        original_price: 597,
                        discount_percentage: 50,
                        rating: 4.9,
                        students_count: 920,
                        language: 'Português',
                        instructor: 'Thiago Silva',
                        image_url: '/images/courses/next-js-advanced.jpg',
                        is_featured: true,
                        is_new: false,
                        tags: ['Next.js', 'React', 'SSR', 'SSG', 'Vercel'],
                        modules_count: 8,
                        lessons_count: 60,
                        exercises_count: 95,
                        quizzes_count: 15,
                        projects_count: 6,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento de React'],
                        learning_outcomes: [
                            'Dominar Next.js e suas features',
                            'Implementar SSR e SSG',
                            'Otimizar performance'
                        ],
                        created_at: '2024-01-17T10:00:00Z',
                        updated_at: '2024-01-24T15:30:00Z'
                    },
                    {
                        id: 'nuxt-js-vue',
                        title: 'Nuxt.js para Vue',
                        slug: 'nuxt-js-vue',
                        description: 'Desenvolva aplicações Vue.js com Nuxt.js',
                        level: 'Intermediário',
                        duration: '35 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.4,
                        students_count: 480,
                        language: 'Português',
                        instructor: 'Patricia Santos',
                        image_url: '/images/courses/nuxt-js-vue.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Nuxt.js', 'Vue.js', 'SSR', 'Static Generation'],
                        modules_count: 7,
                        lessons_count: 50,
                        exercises_count: 75,
                        quizzes_count: 12,
                        projects_count: 4,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento de Vue.js'],
                        learning_outcomes: [
                            'Dominar Nuxt.js e Vue.js',
                            'Implementar SSR com Vue',
                            'Criar sites estáticos'
                        ],
                        created_at: '2024-01-23T10:00:00Z',
                        updated_at: '2024-01-29T15:30:00Z'
                    },
                    {
                        id: 'gatsby-react',
                        title: 'Gatsby com React',
                        slug: 'gatsby-react',
                        description: 'Crie sites estáticos ultra-rápidos com Gatsby e React',
                        level: 'Intermediário',
                        duration: '30 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.3,
                        students_count: 420,
                        language: 'Português',
                        instructor: 'André Costa',
                        image_url: '/images/courses/gatsby-react.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Gatsby', 'React', 'GraphQL', 'Static Sites'],
                        modules_count: 6,
                        lessons_count: 40,
                        exercises_count: 60,
                        quizzes_count: 10,
                        projects_count: 3,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento de React'],
                        learning_outcomes: [
                            'Dominar Gatsby e React',
                            'Criar sites estáticos rápidos',
                            'Usar GraphQL com Gatsby'
                        ],
                        created_at: '2024-01-27T10:00:00Z',
                        updated_at: '2024-02-02T15:30:00Z'
                    },
                    {
                        id: 'django-python',
                        title: 'Django com Python',
                        slug: 'django-python',
                        description: 'Desenvolva aplicações web robustas com Django',
                        level: 'Intermediário',
                        duration: '45 horas',
                        price: 247,
                        original_price: 497,
                        discount_percentage: 50,
                        rating: 4.5,
                        students_count: 680,
                        language: 'Português',
                        instructor: 'Bruno Lima',
                        image_url: '/images/courses/django-python.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Django', 'Python', 'PostgreSQL', 'REST API'],
                        modules_count: 9,
                        lessons_count: 65,
                        exercises_count: 100,
                        quizzes_count: 16,
                        projects_count: 6,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento de Python'],
                        learning_outcomes: [
                            'Dominar Django e Python',
                            'Criar APIs REST robustas',
                            'Implementar autenticação'
                        ],
                        created_at: '2024-01-21T10:00:00Z',
                        updated_at: '2024-01-28T15:30:00Z'
                    },
                    {
                        id: 'flask-python',
                        title: 'Flask com Python',
                        slug: 'flask-python',
                        description: 'Aprenda Flask para desenvolvimento web ágil com Python',
                        level: 'Iniciante',
                        duration: '30 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.4,
                        students_count: 550,
                        language: 'Português',
                        instructor: 'Juliana Santos',
                        image_url: '/images/courses/flask-python.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Flask', 'Python', 'SQLAlchemy', 'Jinja2'],
                        modules_count: 6,
                        lessons_count: 45,
                        exercises_count: 70,
                        quizzes_count: 12,
                        projects_count: 4,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de Python'],
                        learning_outcomes: [
                            'Dominar Flask e Python',
                            'Criar APIs web simples',
                            'Usar templates Jinja2'
                        ],
                        created_at: '2024-01-29T10:00:00Z',
                        updated_at: '2024-02-04T15:30:00Z'
                    },
                    {
                        id: 'express-nodejs',
                        title: 'Express.js com Node.js',
                        slug: 'express-nodejs',
                        description: 'Desenvolva APIs robustas com Express.js e Node.js',
                        level: 'Intermediário',
                        duration: '35 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.6,
                        students_count: 720,
                        language: 'Português',
                        instructor: 'Marcos Oliveira',
                        image_url: '/images/courses/express-nodejs.jpg',
                        is_featured: false,
                        is_new: false,
                        tags: ['Express.js', 'Node.js', 'MongoDB', 'JWT'],
                        modules_count: 7,
                        lessons_count: 50,
                        exercises_count: 80,
                        quizzes_count: 13,
                        projects_count: 5,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento de JavaScript'],
                        learning_outcomes: [
                            'Dominar Express.js e Node.js',
                            'Criar APIs REST completas',
                            'Implementar autenticação JWT'
                        ],
                        created_at: '2024-01-31T10:00:00Z',
                        updated_at: '2024-02-05T15:30:00Z'
                    },
                    {
                        id: 'fastapi-python',
                        title: 'FastAPI com Python',
                        slug: 'fastapi-python',
                        description: 'Crie APIs modernas e rápidas com FastAPI',
                        level: 'Intermediário',
                        duration: '30 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.7,
                        students_count: 450,
                        language: 'Português',
                        instructor: 'Renata Costa',
                        image_url: '/images/courses/fastapi-python.jpg',
                        is_featured: false,
                        is_new: true,
                        tags: ['FastAPI', 'Python', 'Pydantic', 'Async/Await'],
                        modules_count: 6,
                        lessons_count: 40,
                        exercises_count: 65,
                        quizzes_count: 10,
                        projects_count: 3,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento de Python'],
                        learning_outcomes: [
                            'Dominar FastAPI e Python',
                            'Criar APIs assíncronas',
                            'Usar Pydantic para validação'
                        ],
                        created_at: '2024-02-02T10:00:00Z',
                        updated_at: '2024-02-06T15:30:00Z'
                    }
                ];
                setCourses(fallbackCourses);
                setError(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return {
        courses,
        loading,
        error,
        refetch: fetchCourses}
}

// Hook for managing course detail
export function useExpandedCourse(slug: string) {
    const [course, setCourse] = useState<ExpandedCourse | null>(null);
    const [modules, setModules] = useState<ExpandedModule[]>([]);
    const [modulesByLevel, setModulesByLevel] = useState<Record<string, ExpandedModule[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCourse = useCallback(async () => {
        if (!slug) return;

        try {
            setLoading(true);
            setError(null);

            // Tentar API primeiro
            try {
                const courseData = await expandedContentAPI.getCourseDetail(slug);
                setCourse(courseData.course);
                setModules(courseData.modules);
                setModulesByLevel(courseData.modules_by_level);
            } catch (apiError) {
                console.error('Erro ao carregar curso:', apiError);
                // Fallback temporário para lançamento
                if (slug === 'python-data-science') {
                    const fallbackCourse = {
                        id: 'python-data-science',
                        title: 'Python para Data Science',
                        slug: 'python-data-science',
                        description: 'Aprenda Python do zero ao avançado com foco em Data Science',
                        level: 'Iniciante',
                        duration: '40 horas',
                        price: 197,
                        original_price: 397,
                        discount_percentage: 50,
                        rating: 4.9,
                        students_count: 1250,
                        language: 'Português',
                        instructor: 'Dr. Carlos Silva',
                        image_url: '/images/courses/python-data-science.jpg',
                        is_featured: true,
                        is_new: false,
                        tags: ['Python', 'Data Science', 'Machine Learning'],
                        modules_count: 8,
                        lessons_count: 45,
                        exercises_count: 120,
                        quizzes_count: 15,
                        projects_count: 5,
                        certificate_included: true,
                        lifetime_access: true,
                        mobile_friendly: true,
                        prerequisites: ['Conhecimento básico de programação'],
                        learning_outcomes: [
                            'Dominar Python para análise de dados',
                            'Implementar algoritmos de Machine Learning',
                            'Criar visualizações profissionais'
                        ],
                        created_at: '2024-01-15T10:00:00Z',
                        updated_at: '2024-01-20T15:30:00Z'
                    }
                    setCourse(fallbackCourse);
                    setModules([]);
                    setModulesByLevel({});
                    setError(null);
                } else {
                    setCourse(null);
                    setModules([]);
                    setModulesByLevel({});
                    setError('Curso não encontrado.');
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch course');
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchCourse();
    }, [fetchCourse]);

    return {
        course,
        modules,
        modulesByLevel,
        loading,
        error,
        refetch: fetchCourse}
}

// Hook for managing course modules
export function useExpandedModules(courseSlug: string, level?: string) {
    const [modules, setModules] = useState<ExpandedModule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchModules = useCallback(async () => {
        if (!courseSlug) return;

        try {
            setLoading(true);
            setError(null);
            const modulesData = await expandedContentAPI.getCourseModules(courseSlug, level);
            setModules(modulesData.modules);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch modules');
        } finally {
            setLoading(false);
        }
    }, [courseSlug, level]);

    useEffect(() => {
        fetchModules();
    }, [fetchModules]);

    return {
        modules,
        loading,
        error,
        refetch: fetchModules}
}

// Hook for managing lesson content
export function useExpandedLesson(courseSlug: string, level: string, lessonFile: string) {
    const [lesson, setLesson] = useState<ExpandedLesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLesson = useCallback(async () => {
        if (!courseSlug || !level || !lessonFile) return;

        try {
            setLoading(true);
            setError(null);
            const lessonData = await expandedContentAPI.getLessonContent(courseSlug, level, lessonFile);
            setLesson(lessonData.lesson);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch lesson');
        } finally {
            setLoading(false);
        }
    }, [courseSlug, level, lessonFile]);

    useEffect(() => {
        fetchLesson();
    }, [fetchLesson]);

    return {
        lesson,
        loading,
        error,
        refetch: fetchLesson}
}

// Hook for managing exercises
export function useExpandedExercises(courseSlug: string, level?: string, type?: string) {
    const [exercises, setExercises] = useState<ExpandedExercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExercises = useCallback(async () => {
        if (!courseSlug) return;

        try {
            setLoading(true);
            setError(null);
            const exercisesData = await expandedContentAPI.getCourseExercises(courseSlug, level, type);
            setExercises(exercisesData.exercises);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch exercises');
        } finally {
            setLoading(false);
        }
    }, [courseSlug, level, type]);

    useEffect(() => {
        fetchExercises();
    }, [fetchExercises]);

    return {
        exercises,
        loading,
        error,
        refetch: fetchExercises}
}

// Hook for managing quizzes
export function useExpandedQuizzes(courseSlug: string, level?: string, type?: string) {
    const [quizzes, setQuizzes] = useState<ExpandedQuiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQuizzes = useCallback(async () => {
        if (!courseSlug) return;

        try {
            setLoading(true);
            setError(null);
            const quizzesData = await expandedContentAPI.getCourseQuizzes(courseSlug, level, type);
            setQuizzes(quizzesData.quizzes);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch quizzes');
        } finally {
            setLoading(false);
        }
    }, [courseSlug, level, type]);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    return {
        quizzes,
        loading,
        error,
        refetch: fetchQuizzes}
}

// Hook for managing search
export function useExpandedSearch() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback(async (query: string, course?: string, level?: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const searchData = await expandedContentAPI.searchContent(query, course, level);
            setResults(searchData.results);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        results,
        loading,
        error,
        search}
}

// Hook for managing user progress
export function useExpandedProgress(courseSlug: string) {
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProgress = useCallback(async () => {
        if (!courseSlug) return;

        try {
            setLoading(true);
            setError(null);
            const progressData = await expandedContentAPI.getUserCourseProgress(courseSlug);
            setProgress(progressData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch progress');
        } finally {
            setLoading(false);
        }
    }, [courseSlug]);

    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    const enroll = useCallback(async () => {
        try {
            await expandedContentAPI.enrollInCourse(courseSlug);
            await fetchProgress(); // Refresh progress after enrollment
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to enroll');
        }
    }, [courseSlug, fetchProgress]);

    const markLessonCompleted = useCallback(async (lessonFile: string, timeSpent: number = 0) => {
        try {
            await expandedContentAPI.markLessonCompleted(courseSlug, lessonFile, timeSpent);
            await fetchProgress(); // Refresh progress after completion
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to mark lesson completed');
        }
    }, [courseSlug, fetchProgress]);

    const markExerciseCompleted = useCallback(async (exerciseId: string, isCorrect: boolean = true) => {
        try {
            await expandedContentAPI.markExerciseCompleted(courseSlug, exerciseId, isCorrect);
            await fetchProgress(); // Refresh progress after completion
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to mark exercise completed');
        }
    }, [courseSlug, fetchProgress]);

    return {
        progress,
        loading,
        error,
        enroll,
        markLessonCompleted,
        markExerciseCompleted,
        refetch: fetchProgress}
}

// Hook for managing learning dashboard
export function useExpandedDashboard() {
    const [dashboard, setDashboard] = useState<LearningDashboard | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const dashboardData = await expandedContentAPI.getLearningDashboard();
            setDashboard(dashboardData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch dashboard');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return {
        dashboard,
        loading,
        error,
        refetch: fetchDashboard}
}

// Hook for managing exercise submission
export function useExerciseSubmission() {
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const submitExercise = useCallback(async (
        courseSlug: string,
        exerciseId: string,
        answer: string
    ) => {
        try {
            setSubmitting(true);
            setError(null);
            const result = await expandedContentAPI.submitExerciseAnswer(courseSlug, exerciseId, answer);
            setResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit exercise');
        } finally {
            setSubmitting(false);
        }
    }, []);

    const submitQuiz = useCallback(async (
        courseSlug: string,
        quizId: string,
        answer: string
    ) => {
        try {
            setSubmitting(true);
            setError(null);
            const result = await expandedContentAPI.submitQuizAnswer(courseSlug, quizId, answer);
            setResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit quiz');
        } finally {
            setSubmitting(false);
        }
    }, []);

    return {
        submitting,
        result,
        error,
        submitExercise,
        submitQuiz}
}

