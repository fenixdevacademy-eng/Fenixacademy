import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        // Mock certificates data
        const certificates = [
            {
                id: 1,
                courseId: 1,
                courseTitle: "Fundamentos de Desenvolvimento Web",
                instructor: "Prof. João Santos",
                issueDate: "2024-01-15T10:30:00Z",
                certificateUrl: "/certificates/web-fundamentals.pdf",
                certificateId: "CERT-2024-001",
                grade: "A+",
                totalHours: 30,
                skills: ["HTML", "CSS", "JavaScript", "Git"],
                description: "Certificado de conclusão do curso de fundamentos de desenvolvimento web",
                validUntil: null, // Certificados não expiram
                verified: true
            },
            {
                id: 2,
                courseId: 2,
                courseTitle: "React JS Avançado",
                instructor: "Lucas Oliveira",
                issueDate: "2024-01-10T14:20:00Z",
                certificateUrl: "/certificates/react-advanced.pdf",
                certificateId: "CERT-2024-002",
                grade: "A",
                totalHours: 40,
                skills: ["React", "Hooks", "Performance", "Testing"],
                description: "Certificado de conclusão do curso avançado de React JS",
                validUntil: null,
                verified: true
            },
            {
                id: 3,
                courseId: 3,
                courseTitle: "Node.js APIs REST",
                instructor: "Carlos Mendes",
                issueDate: "2024-01-05T16:45:00Z",
                certificateUrl: "/certificates/nodejs-apis.pdf",
                certificateId: "CERT-2024-003",
                grade: "A-",
                totalHours: 35,
                skills: ["Node.js", "Express", "APIs", "MongoDB"],
                description: "Certificado de conclusão do curso de Node.js e APIs REST",
                validUntil: null,
                verified: true
            }
        ];

        return NextResponse.json({
            success: true,
            data: certificates,
            total: certificates.length
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao carregar certificados'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { courseId, courseTitle, instructor, totalHours, skills } = body;

        // Mock certificate generation
        const newCertificate = {
            id: Math.floor(Math.random() * 1000) + 4,
            courseId,
            courseTitle,
            instructor,
            issueDate: new Date().toISOString(),
            certificateUrl: `/certificates/${courseId}-${Date.now()}.pdf`,
            certificateId: `CERT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
            grade: "A",
            totalHours,
            skills,
            description: `Certificado de conclusão do curso ${courseTitle}`,
            validUntil: null,
            verified: true
        };

        return NextResponse.json({
            success: true,
            data: newCertificate,
            message: 'Certificado gerado com sucesso'
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao gerar certificado'
            },
            { status: 500 }
        );
    }
} 