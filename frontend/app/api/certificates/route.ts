import { NextRequest, NextResponse } from 'next/server';
import { createApiHandler } from '../../../lib/error-handler';

interface Certificate {
    id: string;
    title: string;
    course: string;
    instructor: string;
    issuedDate: string;
    expiryDate?: string;
    grade: number;
    status: 'completed' | 'in-progress' | 'expired';
    verificationCode: string;
    imageUrl: string;
    description: string;
    skills: string[];
    hours: number;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    userId: string;
}

const mockCertificates: Certificate[] = [
    {
        id: '1',
        title: 'Desenvolvimento Web Completo',
        course: 'Full Stack Web Development',
        instructor: 'Prof. João Silva',
        issuedDate: '2024-01-15',
        expiryDate: '2026-01-15',
        grade: 95,
        status: 'completed',
        verificationCode: 'FENIX-WEB-2024-001',
        imageUrl: '/api/placeholder/400/300',
        description: 'Certificado de conclusão do curso completo de desenvolvimento web, incluindo HTML, CSS, JavaScript, React, Node.js e banco de dados.',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        hours: 120,
        level: 'advanced',
        userId: 'user-1'
    },
    {
        id: '2',
        title: 'Python para Data Science',
        course: 'Data Science Fundamentals',
        instructor: 'Prof. Maria Santos',
        issuedDate: '2024-02-20',
        grade: 88,
        status: 'completed',
        verificationCode: 'FENIX-PYTHON-2024-002',
        imageUrl: '/api/placeholder/400/300',
        description: 'Certificado de conclusão do curso de Python aplicado à ciência de dados, incluindo análise estatística e machine learning.',
        skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
        hours: 80,
        level: 'intermediate',
        userId: 'user-1'
    },
    {
        id: '3',
        title: 'Fundamentos de UI/UX Design',
        course: 'Digital Design Mastery',
        instructor: 'Prof. Ana Costa',
        issuedDate: '2024-03-10',
        grade: 92,
        status: 'completed',
        verificationCode: 'FENIX-DESIGN-2024-003',
        imageUrl: '/api/placeholder/400/300',
        description: 'Certificado de conclusão do curso de design de interface e experiência do usuário.',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
        hours: 60,
        level: 'intermediate',
        userId: 'user-1'
    },
    {
        id: '4',
        title: 'DevOps e Cloud Computing',
        course: 'Cloud Infrastructure',
        instructor: 'Prof. Carlos Lima',
        issuedDate: '2024-04-05',
        grade: 0,
        status: 'in-progress',
        verificationCode: 'FENIX-DEVOPS-2024-004',
        imageUrl: '/api/placeholder/400/300',
        description: 'Curso em andamento sobre DevOps e computação em nuvem.',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
        hours: 100,
        level: 'advanced',
        userId: 'user-1'
    }
];

// GET /api/certificates - Listar certificados do usuário
export async function GET(request: NextRequest) {
    return createApiHandler(async () => {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || 'user-1';
        const status = searchParams.get('status');
        const level = searchParams.get('level');
        const search = searchParams.get('search');

        let filteredCertificates = mockCertificates.filter(cert => cert.userId === userId);

        // Filtros
        if (status && status !== 'all') {
            filteredCertificates = filteredCertificates.filter(cert => cert.status === status);
        }

        if (level && level !== 'all') {
            filteredCertificates = filteredCertificates.filter(cert => cert.level === level);
        }

        if (search) {
            const searchLower = search.toLowerCase();
            filteredCertificates = filteredCertificates.filter(cert =>
                cert.title.toLowerCase().includes(searchLower) ||
                cert.course.toLowerCase().includes(searchLower) ||
                cert.instructor.toLowerCase().includes(searchLower)
            );
        }

        return NextResponse.json({
            success: true,
            data: filteredCertificates,
            total: filteredCertificates.length
        });
    })();
}

// POST /api/certificates - Criar novo certificado
export async function POST(request: NextRequest) {
    return createApiHandler(async (request) => {
        const body = await request.json();
        const {
            title,
            course,
            instructor,
            grade,
            description,
            skills,
            hours,
            level,
            userId
        } = body;

        // Validação
        if (!title || !course || !instructor || !userId) {
            return NextResponse.json({
                success: false,
                error: 'Campos obrigatórios: title, course, instructor, userId'
            }, { status: 400 });
        }

        const newCertificate: Certificate = {
            id: `cert-${Date.now()}`,
            title,
            course,
            instructor,
            issuedDate: new Date().toISOString().split('T')[0],
            grade: grade || 0,
            status: grade >= 70 ? 'completed' : 'in-progress',
            verificationCode: `FENIX-${course.toUpperCase().replace(/\s/g, '-')}-${new Date().getFullYear()}-${String(mockCertificates.length + 1).padStart(3, '0')}`,
            imageUrl: '/api/placeholder/400/300',
            description: description || '',
            skills: skills || [],
            hours: hours || 0,
            level: level || 'beginner',
            userId
        };

        mockCertificates.push(newCertificate);

        return NextResponse.json({
            success: true,
            data: newCertificate,
            message: 'Certificado criado com sucesso'
        }, { status: 201 });
    })();
}


