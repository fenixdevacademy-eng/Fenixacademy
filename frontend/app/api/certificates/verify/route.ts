import { NextRequest, NextResponse } from 'next/server';
import { createNextApiHandler } from '../../../../lib/error-handler';

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

// GET /api/certificates/verify - Verificar certificado por código
export async function GET(request: NextRequest) {
    return createNextApiHandler(async (req: NextRequest) => {
        const { searchParams } = new URL(req.url);
        const verificationCode = searchParams.get('code');

        if (!verificationCode) {
            return NextResponse.json({
                success: false,
                error: 'Código de verificação é obrigatório'
            }, { status: 400 });
        }

        const certificate = mockCertificates.find(cert => cert.verificationCode === verificationCode);

        if (!certificate) {
            return NextResponse.json({
                success: false,
                error: 'Certificado não encontrado ou código inválido'
            }, { status: 404 });
        }

        // Verificar se o certificado não expirou
        if (certificate.expiryDate) {
            const expiryDate = new Date(certificate.expiryDate);
            const now = new Date();

            if (now > expiryDate) {
                return NextResponse.json({
                    success: false,
                    error: 'Certificado expirado',
                    data: {
                        ...certificate,
                        status: 'expired'
                    }
                }, { status: 410 });
            }
        }

        return NextResponse.json({
            success: true,
            data: certificate,
            message: 'Certificado verificado com sucesso'
        });
    })();
}


