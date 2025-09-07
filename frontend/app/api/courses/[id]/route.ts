import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const courseId = parseInt(params.id);

        // Mock data for course details
        const courseDetails = {
            id: courseId,
            title: "Curso de Exemplo",
            description: "Descrição detalhada do curso",
            instructor: "Instrutor Exemplo",
            level: "intermediate",
            duration: "40 horas",
            students: 1500,
            rating: 4.8,
            price: 297,
            originalPrice: 397,
            image: "/courses/example.jpg",
            category: "Frontend",
            lessons: 35,
            certificate: true,
            discount: 25,
            modules: [
                {
                    id: 1,
                    title: "Módulo 1",
                    description: "Descrição do módulo",
                    duration: 8,
                    lessons: [
                        {
                            id: 1,
                            title: "Aula 1",
                            duration: 1800,
                            type: "video",
                            content: "Conteúdo da aula",
                            video_url: "https://example.com/video.mp4",
                            transcript: "Transcrição da aula",
                            resources: [],
                            exercises: []
                        }
                    ]
                }
            ]
        };

        return NextResponse.json({
            success: true,
            data: courseDetails
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao carregar detalhes do curso'
            },
            { status: 500 }
        );
    }
} 