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

// Mock data para certificados
const mockCertificates: Certificate[] = [
    {
        id: '1',
        title: 'Certificado de Conclusão - Python Básico',
        course: 'Python para Iniciantes',
        instructor: 'Dr. João Silva',
        issuedDate: '2024-01-15',
        expiryDate: '2025-01-15',
        grade: 95,
        status: 'completed',
        verificationCode: 'FENIX-PYTHON-001',
        imageUrl: '/certificates/python-basic.png',
        description: 'Certificado de conclusão do curso de Python para iniciantes',
        skills: ['Python', 'Programação', 'Lógica de Programação'],
        hours: 40,
        level: 'beginner',
        userId: 'user123'
    },
    {
        id: '2',
        title: 'Certificado de Conclusão - React Avançado',
        course: 'React e Next.js Avançado',
        instructor: 'Dra. Maria Santos',
        issuedDate: '2024-02-20',
        expiryDate: '2025-02-20',
        grade: 88,
        status: 'completed',
        verificationCode: 'FENIX-REACT-002',
        imageUrl: '/certificates/react-advanced.png',
        description: 'Certificado de conclusão do curso de React e Next.js avançado',
        skills: ['React', 'Next.js', 'TypeScript', 'Hooks'],
        hours: 60,
        level: 'advanced',
        userId: 'user123'
    }
];

// GET /api/certificates/[id] - Buscar certificado por ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const certificate = mockCertificates.find(cert => cert.id === id);

        if (!certificate) {
            return NextResponse.json({
                success: false,
                error: 'CERTIFICATE_NOT_FOUND',
                message: 'Certificado não encontrado'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: certificate
        });
    } catch (error) {
        console.error('Error fetching certificate:', error);
        return NextResponse.json({
            success: false,
            error: 'FETCH_FAILED',
            message: 'Erro ao buscar certificado'
        }, { status: 500 });
    }
}

// PUT /api/certificates/[id] - Atualizar certificado
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        const certificateIndex = mockCertificates.findIndex(cert => cert.id === id);

        if (certificateIndex === -1) {
            return NextResponse.json({
                success: false,
                error: 'CERTIFICATE_NOT_FOUND',
                message: 'Certificado não encontrado'
            }, { status: 404 });
        }

        // Atualizar certificado
        mockCertificates[certificateIndex] = {
            ...mockCertificates[certificateIndex],
            ...body
        };

        return NextResponse.json({
            success: true,
            data: mockCertificates[certificateIndex]
        });
    } catch (error) {
        console.error('Error updating certificate:', error);
        return NextResponse.json({
            success: false,
            error: 'UPDATE_FAILED',
            message: 'Erro ao atualizar certificado'
        }, { status: 500 });
    }
}

// DELETE /api/certificates/[id] - Deletar certificado
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const certificateIndex = mockCertificates.findIndex(cert => cert.id === id);

        if (certificateIndex === -1) {
            return NextResponse.json({
                success: false,
                error: 'CERTIFICATE_NOT_FOUND',
                message: 'Certificado não encontrado'
            }, { status: 404 });
        }

        // Remover certificado
        mockCertificates.splice(certificateIndex, 1);

        return NextResponse.json({
            success: true,
            message: 'Certificado deletado com sucesso'
        });
    } catch (error) {
        console.error('Error deleting certificate:', error);
        return NextResponse.json({
            success: false,
            error: 'DELETE_FAILED',
            message: 'Erro ao deletar certificado'
        }, { status: 500 });
    }
}