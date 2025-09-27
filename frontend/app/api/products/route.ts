import { NextRequest, NextResponse } from 'next/server';

// Dados mockados de produtos/cursos
const PRODUCTS = [
    {
        id: 'python-data-science',
        name: 'Python para Data Science',
        description: 'Aprenda Python do zero ao avançado com foco em Data Science e Machine Learning',
        price: 297,
        originalPrice: 597,
        discount: 50,
        category: 'programming',
        level: 'iniciante',
        duration: '40 horas',
        rating: 4.9,
        students: 1250,
        imageUrl: '/images/courses/python-data-science.jpg',
        features: [
            '40+ horas de conteúdo',
            'Projetos práticos',
            'Certificado de conclusão',
            'Acesso vitalício',
            'Suporte da comunidade'
        ],
        instructor: {
            name: 'Dr. Carlos Silva',
            title: 'Cientista de Dados Senior',
            experience: '10+ anos',
            avatar: '/images/instructors/carlos-silva.jpg'
        },
        modules: [
            {
                id: 'modulo-1',
                title: 'Fundamentos do Python',
                duration: '8 horas',
                lessons: 12
            },
            {
                id: 'modulo-2',
                title: 'Bibliotecas Essenciais',
                duration: '12 horas',
                lessons: 18
            },
            {
                id: 'modulo-3',
                title: 'Machine Learning',
                duration: '20 horas',
                lessons: 25
            }
        ]
    },
    {
        id: 'web-development',
        name: 'Desenvolvimento Web Completo',
        description: 'Domine React, Node.js e as melhores práticas de desenvolvimento web moderno',
        price: 397,
        originalPrice: 797,
        discount: 50,
        category: 'web-development',
        level: 'intermediario',
        duration: '60 horas',
        rating: 4.8,
        students: 2100,
        imageUrl: '/images/courses/web-development.jpg',
        features: [
            '60+ horas de conteúdo',
            'Projetos reais',
            'Certificado de conclusão',
            'Acesso vitalício',
            'Mentoria 1:1'
        ],
        instructor: {
            name: 'Ana Costa',
            title: 'Desenvolvedora Full Stack',
            experience: '8+ anos',
            avatar: '/images/instructors/ana-costa.jpg'
        },
        modules: [
            {
                id: 'modulo-1',
                title: 'Fundamentos do React',
                duration: '12 horas',
                lessons: 15
            },
            {
                id: 'modulo-2',
                title: 'Backend com Node.js',
                duration: '16 horas',
                lessons: 20
            },
            {
                id: 'modulo-3',
                title: 'Deploy e DevOps',
                duration: '8 horas',
                lessons: 10
            }
        ]
    },
    {
        id: 'machine-learning',
        name: 'Machine Learning Avançado',
        description: 'Aprenda algoritmos de Machine Learning e Deep Learning com Python e TensorFlow',
        price: 497,
        originalPrice: 997,
        discount: 50,
        category: 'ai-ml',
        level: 'avancado',
        duration: '80 horas',
        rating: 4.9,
        students: 890,
        imageUrl: '/images/courses/machine-learning.jpg',
        features: [
            '80+ horas de conteúdo',
            'Projetos de IA',
            'Certificado de conclusão',
            'Acesso vitalício',
            'Laboratório de IA'
        ],
        instructor: {
            name: 'Prof. Maria Santos',
            title: 'Especialista em IA',
            experience: '15+ anos',
            avatar: '/images/instructors/maria-santos.jpg'
        },
        modules: [
            {
                id: 'modulo-1',
                title: 'Fundamentos de ML',
                duration: '20 horas',
                lessons: 25
            },
            {
                id: 'modulo-2',
                title: 'Deep Learning',
                duration: '30 horas',
                lessons: 35
            },
            {
                id: 'modulo-3',
                title: 'Projetos Avançados',
                duration: '30 horas',
                lessons: 40
            }
        ]
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const level = searchParams.get('level');
        const search = searchParams.get('search');
        const id = searchParams.get('id');

        let filteredProducts = [...PRODUCTS];

        // Filtrar por ID se especificado
        if (id) {
            filteredProducts = filteredProducts.filter(product => product.id === id);
        }

        // Filtrar por categoria se especificada
        if (category) {
            filteredProducts = filteredProducts.filter(product =>
                product.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filtrar por nível se especificado
        if (level) {
            filteredProducts = filteredProducts.filter(product =>
                product.level.toLowerCase() === level.toLowerCase()
            );
        }

        // Filtrar por busca se especificada
        if (search) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        return NextResponse.json({
            success: true,
            products: filteredProducts,
            total: filteredProducts.length
        });

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}





