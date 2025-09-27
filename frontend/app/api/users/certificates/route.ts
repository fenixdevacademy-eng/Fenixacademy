import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
        try {
                // Mock certificates data
                const certificates = [
                        {
                                id: 1,
                                courseId: 1,
                                courseTitle: "Fundamentos de Desenvolvimento Web",
                                instructor: "Prof. João Santos",
                                issuedDate: "2024-01-15T10:30:00Z",
                                grade: 95,
                                verificationCode: "FENIX-WEB-2024-001"
                        },
                        {
                                id: 2,
                                courseId: 2,
                                courseTitle: "React JS Avançado",
                                instructor: "Prof. Maria Silva",
                                issuedDate: "2024-02-20T14:45:00Z",
                                grade: 88,
                                verificationCode: "FENIX-REACT-2024-002"
                        }
                ];

                return NextResponse.json({
                        success: true,
                        certificates
                });

        } catch (error) {
                console.error('Erro ao buscar certificados:', error);
                return NextResponse.json({
                        success: false,
                        error: 'Erro interno do servidor'
                }, { status: 500 });
        }
}