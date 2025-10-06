'use client';

﻿import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const course = searchParams.get('course');
        const level = searchParams.get('level');

        if (!query) {
            return NextResponse.json({
                success: false,
                error: 'Query parameter is required'
            }, { status: 400 });
        }

        // Dados mock para busca
        const mockResults = [
            {
                id: 'python-data-science',
                title: 'Python para Data Science',
                type: 'course',
                description: 'Aprenda Python do zero ao avançado com foco em Data Science e Machine Learning',
                level: 'Iniciante',
                duration: '40 horas',
                rating: 4.9,
                students: 1250,
                image: '/images/courses/python-data-science.jpg',
                tags: ['Python', 'Data Science', 'Machine Learning'],
                url: '/expanded-courses/python-data-science'
            },
            {
                id: 'web-development',
                title: 'Desenvolvimento Web Completo',
                type: 'course',
                description: 'Domine React, Node.js e as melhores práticas de desenvolvimento web moderno',
                level: 'Intermediário',
                duration: '60 horas',
                rating: 4.8,
                students: 2100,
                image: '/images/courses/web-development.jpg',
                tags: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
                url: '/expanded-courses/web-development'
            },
            {
                id: 'mobile-development',
                title: 'Desenvolvimento Mobile',
                type: 'course',
                description: 'Crie apps nativos e híbridos com React Native e Flutter',
                level: 'Intermediário',
                duration: '50 horas',
                rating: 4.7,
                students: 980,
                image: '/images/courses/mobile-development.jpg',
                tags: ['React Native', 'Flutter', 'Mobile', 'iOS', 'Android'],
                url: '/expanded-courses/mobile-development'
            }
        ];

        // Filtrar resultados baseado na query
        const filteredResults = mockResults.filter(result =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase()) ||
            result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        return NextResponse.json({
            success: true,
            results: filteredResults,
            total: filteredResults.length,
            query: query,
            filters: {
                course: course,
                level: level
            }
        });

    } catch (error) {
        console.error('Erro na API de busca:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}