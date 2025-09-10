import { NextRequest, NextResponse } from 'next/server';
import { createNextApiHandler } from '../../../lib/error-handler';

interface ProgressData {
    id: string;
    course: string;
    instructor: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    timeSpent: number;
    estimatedTime: number;
    lastAccessed: string;
    status: 'not-started' | 'in-progress' | 'completed' | 'paused';
    grade: number;
    streak: number;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    startDate: string;
    endDate?: string;
    userId: string;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
    points: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    userId: string;
}

interface WeeklyStats {
    week: string;
    hoursStudied: number;
    lessonsCompleted: number;
    streak: number;
    achievements: number;
    userId: string;
}

const mockProgressData: ProgressData[] = [
    {
        id: '1',
        course: 'Desenvolvimento Web Completo',
        instructor: 'Prof. João Silva',
        progress: 85,
        totalLessons: 40,
        completedLessons: 34,
        timeSpent: 45,
        estimatedTime: 60,
        lastAccessed: '2024-01-15',
        status: 'in-progress',
        grade: 92,
        streak: 7,
        level: 'advanced',
        category: 'Desenvolvimento',
        difficulty: 'hard',
        startDate: '2024-01-01',
        userId: 'user-1'
    },
    {
        id: '2',
        course: 'Python para Data Science',
        instructor: 'Prof. Maria Santos',
        progress: 100,
        totalLessons: 25,
        completedLessons: 25,
        timeSpent: 30,
        estimatedTime: 30,
        lastAccessed: '2024-01-14',
        status: 'completed',
        grade: 88,
        streak: 0,
        level: 'intermediate',
        category: 'Data Science',
        difficulty: 'medium',
        startDate: '2024-01-01',
        endDate: '2024-01-14',
        userId: 'user-1'
    },
    {
        id: '3',
        course: 'Fundamentos de UI/UX Design',
        instructor: 'Prof. Ana Costa',
        progress: 60,
        totalLessons: 20,
        completedLessons: 12,
        timeSpent: 15,
        estimatedTime: 25,
        lastAccessed: '2024-01-13',
        status: 'in-progress',
        grade: 0,
        streak: 3,
        level: 'intermediate',
        category: 'Design',
        difficulty: 'medium',
        startDate: '2024-01-05',
        userId: 'user-1'
    },
    {
        id: '4',
        course: 'DevOps e Cloud Computing',
        instructor: 'Prof. Carlos Lima',
        progress: 0,
        totalLessons: 30,
        completedLessons: 0,
        timeSpent: 0,
        estimatedTime: 40,
        lastAccessed: '',
        status: 'not-started',
        grade: 0,
        streak: 0,
        level: 'advanced',
        category: 'DevOps',
        difficulty: 'hard',
        startDate: '2024-01-20',
        userId: 'user-1'
    }
];

const mockAchievements: Achievement[] = [
    {
        id: '1',
        title: 'Primeiro Passo',
        description: 'Complete sua primeira lição',
        icon: '🎯',
        unlockedAt: '2024-01-01',
        points: 10,
        rarity: 'common',
        userId: 'user-1'
    },
    {
        id: '2',
        title: 'Maratonista',
        description: 'Estude por 7 dias consecutivos',
        icon: '🔥',
        unlockedAt: '2024-01-07',
        points: 50,
        rarity: 'rare',
        userId: 'user-1'
    },
    {
        id: '3',
        title: 'Perfeccionista',
        description: 'Obtenha 90% ou mais em um curso',
        icon: '⭐',
        unlockedAt: '2024-01-14',
        points: 100,
        rarity: 'epic',
        userId: 'user-1'
    },
    {
        id: '4',
        title: 'Conquistador',
        description: 'Complete 5 cursos',
        icon: '🏆',
        unlockedAt: '2024-01-15',
        points: 200,
        rarity: 'legendary',
        userId: 'user-1'
    }
];

const mockWeeklyStats: WeeklyStats[] = [
    { week: '2024-01-01', hoursStudied: 12, lessonsCompleted: 8, streak: 3, achievements: 1, userId: 'user-1' },
    { week: '2024-01-08', hoursStudied: 18, lessonsCompleted: 12, streak: 7, achievements: 2, userId: 'user-1' },
    { week: '2024-01-15', hoursStudied: 15, lessonsCompleted: 10, streak: 5, achievements: 1, userId: 'user-1' },
    { week: '2024-01-22', hoursStudied: 20, lessonsCompleted: 15, streak: 7, achievements: 1, userId: 'user-1' }
];

// GET /api/progress - Obter dados de progresso do usuário
export async function GET(request: NextRequest) {
    return createNextApiHandler(async (req: NextRequest) => {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId') || 'user-1';
        const category = searchParams.get('category');
        const period = searchParams.get('period') || 'week';

        // Filtrar dados por usuário
        let filteredProgressData = mockProgressData.filter(data => data.userId === userId);
        let filteredAchievements = mockAchievements.filter(achievement => achievement.userId === userId);
        let filteredWeeklyStats = mockWeeklyStats.filter(stat => stat.userId === userId);

        // Filtro por categoria
        if (category && category !== 'all') {
            filteredProgressData = filteredProgressData.filter(data => data.category === category);
        }

        // Calcular estatísticas gerais
        const totalCourses = filteredProgressData.length;
        const completedCourses = filteredProgressData.filter(course => course.status === 'completed').length;
        const inProgressCourses = filteredProgressData.filter(course => course.status === 'in-progress').length;
        const totalHoursStudied = filteredProgressData.reduce((sum, course) => sum + course.timeSpent, 0);
        const totalLessonsCompleted = filteredProgressData.reduce((sum, course) => sum + course.completedLessons, 0);
        const currentStreak = Math.max(...filteredProgressData.map(course => course.streak));
        const totalPoints = filteredAchievements.reduce((sum, achievement) => sum + achievement.points, 0);
        const averageGrade = filteredProgressData
            .filter(course => course.grade > 0)
            .reduce((sum, course) => sum + course.grade, 0) /
            filteredProgressData.filter(course => course.grade > 0).length;

        return NextResponse.json({
            success: true,
            data: {
                progress: filteredProgressData,
                achievements: filteredAchievements,
                weeklyStats: filteredWeeklyStats,
                statistics: {
                    totalCourses,
                    completedCourses,
                    inProgressCourses,
                    totalHoursStudied,
                    totalLessonsCompleted,
                    currentStreak,
                    totalPoints,
                    averageGrade: averageGrade || 0
                }
            }
        });
    })();
}

// POST /api/progress - Atualizar progresso do curso
export async function POST(request: NextRequest) {
    return createNextApiHandler(async (req: NextRequest) => {
        const body = await req.json();
        const {
            courseId,
            userId,
            progress,
            completedLessons,
            timeSpent,
            grade,
            status
        } = body;

        // Validação
        if (!courseId || !userId) {
            return NextResponse.json({
                success: false,
                error: 'Campos obrigatórios: courseId, userId'
            }, { status: 400 });
        }

        const progressIndex = mockProgressData.findIndex(
            data => data.id === courseId && data.userId === userId
        );

        if (progressIndex === -1) {
            return NextResponse.json({
                success: false,
                error: 'Progresso do curso não encontrado'
            }, { status: 404 });
        }

        // Atualizar progresso
        const updatedProgress = {
            ...mockProgressData[progressIndex],
            progress: progress !== undefined ? progress : mockProgressData[progressIndex].progress,
            completedLessons: completedLessons !== undefined ? completedLessons : mockProgressData[progressIndex].completedLessons,
            timeSpent: timeSpent !== undefined ? timeSpent : mockProgressData[progressIndex].timeSpent,
            grade: grade !== undefined ? grade : mockProgressData[progressIndex].grade,
            status: status || mockProgressData[progressIndex].status,
            lastAccessed: new Date().toISOString().split('T')[0]
        };

        // Atualizar status baseado no progresso
        if (updatedProgress.progress >= 100) {
            updatedProgress.status = 'completed';
            updatedProgress.endDate = new Date().toISOString().split('T')[0];
        } else if (updatedProgress.progress > 0) {
            updatedProgress.status = 'in-progress';
        }

        mockProgressData[progressIndex] = updatedProgress;

        return NextResponse.json({
            success: true,
            data: updatedProgress,
            message: 'Progresso atualizado com sucesso'
        });
    })();
}


