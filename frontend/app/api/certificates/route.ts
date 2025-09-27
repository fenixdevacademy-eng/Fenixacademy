import { NextRequest, NextResponse } from 'next/server';

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
        title: 'React Avançado',
        course: 'React e Next.js Avançado',
        instructor: 'Prof. João Silva',
        issuedDate: '2024-01-15',
        grade: 95,
        status: 'completed',
        verificationCode: 'FENIX-REACT-2024-001',
        imageUrl: '/certificates/react-avancado.jpg',
        description: 'Certificado de conclusão do curso React e Next.js Avançado',
        skills: ['React', 'Next.js', 'TypeScript', 'Hooks', 'Context API'],
        hours: 40,
        level: 'advanced',
        userId: 'user-123'
    },
    {
        id: '2',
        title: 'Python Data Science',
        course: 'Python para Data Science',
        instructor: 'Prof. Maria Santos',
        issuedDate: '2024-02-20',
        grade: 88,
        status: 'completed',
        verificationCode: 'FENIX-PYTHON-2024-002',
        imageUrl: '/certificates/python-datascience.jpg',
        description: 'Certificado de conclusão do curso Python para Data Science',
        skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Machine Learning'],
        hours: 60,
        level: 'intermediate',
        userId: 'user-123'
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: 'User ID é obrigatório'
            }, { status: 400 });
        }

        const userCertificates = mockCertificates.filter(cert => cert.userId === userId);

        return NextResponse.json({
            success: true,
            certificates: userCertificates
        });

    } catch (error) {
        console.error('Erro ao buscar certificados:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}