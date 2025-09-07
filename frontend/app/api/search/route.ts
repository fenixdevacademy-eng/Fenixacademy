import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';
        const category = searchParams.get('category');
        const level = searchParams.get('level');
        const price = searchParams.get('price');
        const instructor = searchParams.get('instructor');

        // Mock search results
        const allCourses = [
            {
                id: 1,
                title: "Fundamentos de Desenvolvimento Web",
                description: "HTML, CSS, JavaScript e conceitos fundamentais para iniciantes.",
                instructor: "Prof. João Santos",
                level: "beginner",
                category: "Frontend",
                price: 197,
                originalPrice: 297,
                rating: 4.7,
                students: 3456,
                image: "/courses/web-fundamentals.jpg",
                tags: ["HTML", "CSS", "JavaScript", "Web", "Iniciante"]
            },
            {
                id: 2,
                title: "React JS Avançado",
                description: "Hooks avançados, performance, testes e arquitetura de aplicações React.",
                instructor: "Lucas Oliveira",
                level: "advanced",
                category: "Frontend",
                price: 447,
                originalPrice: 547,
                rating: 4.9,
                students: 2341,
                image: "/courses/react-advanced.jpg",
                tags: ["React", "JavaScript", "Hooks", "Performance", "Avançado"]
            },
            {
                id: 3,
                title: "Node.js APIs REST",
                description: "Desenvolva APIs robustas e escaláveis com Node.js e Express.",
                instructor: "Carlos Mendes",
                level: "intermediate",
                category: "Backend",
                price: 297,
                originalPrice: 397,
                rating: 4.9,
                students: 892,
                image: "/courses/nodejs.jpg",
                tags: ["Node.js", "Express", "APIs", "Backend", "JavaScript"]
            },
            {
                id: 4,
                title: "Python Data Science",
                description: "Análise de dados, machine learning e visualização com Python.",
                instructor: "Dr. Ana Rodrigues",
                level: "intermediate",
                category: "Data Science",
                price: 397,
                originalPrice: 497,
                rating: 4.8,
                students: 1567,
                image: "/courses/python-data.jpg",
                tags: ["Python", "Data Science", "Machine Learning", "Pandas", "NumPy"]
            },
            {
                id: 5,
                title: "DevOps e CI/CD",
                description: "Automatize deploy, monitoramento e infraestrutura como código.",
                instructor: "Roberto Silva",
                level: "advanced",
                category: "DevOps",
                price: 347,
                originalPrice: 447,
                rating: 4.8,
                students: 445,
                image: "/courses/devops.jpg",
                tags: ["DevOps", "Docker", "Kubernetes", "CI/CD", "Cloud"]
            }
        ];

        // Filter courses based on search parameters
        let filteredCourses = allCourses;

        // Search by query
        if (query) {
            const searchTerm = query.toLowerCase();
            filteredCourses = filteredCourses.filter(course =>
                course.title.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm) ||
                course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        // Filter by category
        if (category) {
            filteredCourses = filteredCourses.filter(course =>
                course.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filter by level
        if (level) {
            filteredCourses = filteredCourses.filter(course =>
                course.level.toLowerCase() === level.toLowerCase()
            );
        }

        // Filter by price range
        if (price) {
            const [min, max] = price.split('-').map(Number);
            filteredCourses = filteredCourses.filter(course => {
                if (max && !isNaN(max)) {
                    return course.price >= (min || 0) && course.price <= max;
                }
                if (min && !isNaN(min)) {
                    return course.price >= min;
                }
                return true;
            });
        }

        // Filter by instructor
        if (instructor) {
            filteredCourses = filteredCourses.filter(course =>
                course.instructor.toLowerCase().includes(instructor.toLowerCase())
            );
        }

        // Sort by relevance (rating * students count)
        filteredCourses.sort((a, b) => (b.rating * b.students) - (a.rating * a.students));

        return NextResponse.json({
            success: true,
            data: {
                courses: filteredCourses,
                total: filteredCourses.length,
                query,
                filters: {
                    category,
                    level,
                    price,
                    instructor
                }
            }
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao realizar busca'
            },
            { status: 500 }
        );
    }
} 