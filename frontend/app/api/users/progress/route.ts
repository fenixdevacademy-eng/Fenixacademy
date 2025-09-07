import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        // Mock user progress data
        const userProgress = {
            userId: 1,
            courses: [
                {
                    courseId: 1,
                    courseTitle: "Fundamentos de Desenvolvimento Web",
                    progress: 100,
                    completedLessons: 28,
                    totalLessons: 28,
                    lastAccessed: "2024-01-20T10:30:00Z",
                    certificateEarned: true,
                    certificateUrl: "/certificates/web-fundamentals.pdf",
                    studyTime: 25.5,
                    currentModule: null,
                    currentLesson: null
                },
                {
                    courseId: 2,
                    courseTitle: "React JS Avançado",
                    progress: 85,
                    completedLessons: 30,
                    totalLessons: 35,
                    lastAccessed: "2024-01-19T15:45:00Z",
                    certificateEarned: false,
                    certificateUrl: null,
                    studyTime: 32.0,
                    currentModule: 4,
                    currentLesson: 3
                },
                {
                    courseId: 3,
                    courseTitle: "Node.js APIs REST",
                    progress: 60,
                    completedLessons: 19,
                    totalLessons: 32,
                    lastAccessed: "2024-01-18T09:15:00Z",
                    certificateEarned: false,
                    certificateUrl: null,
                    studyTime: 18.5,
                    currentModule: 3,
                    currentLesson: 2
                },
                {
                    courseId: 4,
                    courseTitle: "Python Data Science",
                    progress: 30,
                    completedLessons: 11,
                    totalLessons: 38,
                    lastAccessed: "2024-01-17T14:20:00Z",
                    certificateEarned: false,
                    certificateUrl: null,
                    studyTime: 12.0,
                    currentModule: 2,
                    currentLesson: 1
                }
            ],
            stats: {
                totalCoursesEnrolled: 4,
                totalCoursesCompleted: 1,
                totalStudyTime: 88.0,
                averageProgress: 68.75,
                currentStreak: 7,
                longestStreak: 15,
                totalCertificates: 1,
                totalPoints: 2450
            }
        };

        return NextResponse.json({
            success: true,
            data: userProgress
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao carregar progresso do usuário'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { courseId, lessonId, moduleId, completed, studyTime } = body;

        // Mock progress update
        const progressUpdate = {
            courseId,
            lessonId,
            moduleId,
            completed,
            studyTime,
            timestamp: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return NextResponse.json({
            success: true,
            data: progressUpdate,
            message: 'Progresso atualizado com sucesso'
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao atualizar progresso'
            },
            { status: 500 }
        );
    }
} 