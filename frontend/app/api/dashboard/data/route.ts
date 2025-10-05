import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { userDatabase } from '@/lib/database/users';

const JWT_SECRET = process.env.JWT_SECRET || 'fenix-dev-academy-super-secret-key-2024';

const mockCourses = [
    {
        id: 1,
        title: "React Avançado - Hooks e Context",
        progress: 85,
        nextLesson: "useReducer Hook",
        instructor: "Prof. João Silva",
        avatar: "👨‍💻",
        timeLeft: "2h 30min",
        difficulty: "Avançado",
        color: "from-blue-500 to-cyan-500",
        totalLessons: 24,
        completedLessons: 20
    },
    {
        id: 2,
        title: "Node.js e Express",
        progress: 45,
        nextLesson: "Middleware Personalizado",
        instructor: "Prof. Maria Costa",
        avatar: "👩‍💻",
        timeLeft: "4h 15min",
        difficulty: "Intermediário",
        color: "from-green-500 to-emerald-500",
        totalLessons: 18,
        completedLessons: 8
    },
    {
        id: 3,
        title: "Python para Data Science",
        progress: 20,
        nextLesson: "Pandas Básico",
        instructor: "Prof. Pedro Lima",
        avatar: "👨‍🔬",
        timeLeft: "6h 45min",
        difficulty: "Iniciante",
        color: "from-purple-500 to-violet-500",
        totalLessons: 30,
        completedLessons: 6
    }
];

const mockStats = {
    totalCourses: 25,
    completedCourses: 12,
    inProgressCourses: 3,
    totalHours: 156,
    thisWeekHours: 12,
    streak: 15,
    points: 2450,
    rank: 1,
    certificates: 8
};

const mockRecentActivity = [
    {
        id: 1,
        type: "course_completed",
        title: "JavaScript Moderno",
        time: "2 horas atrás",
        icon: "🎉",
        color: "text-green-500"
    },
    {
        id: 2,
        type: "lesson_started",
        title: "React Hooks - useEffect",
        time: "4 horas atrás",
        icon: "📚",
        color: "text-blue-500"
    },
    {
        id: 3,
        type: "certificate_earned",
        title: "Certificado React Avançado",
        time: "1 dia atrás",
        icon: "🏆",
        color: "text-yellow-500"
    }
];

const mockUpcomingEvents = [
    {
        id: 1,
        title: "Live: React Performance",
        instructor: "Prof. João Silva",
        time: "Hoje, 19:00",
        type: "Live",
        color: "from-red-500 to-pink-500"
    },
    {
        id: 2,
        title: "Workshop: TypeScript",
        instructor: "Prof. Maria Costa",
        time: "Amanhã, 14:00",
        type: "Workshop",
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        title: "Q&A: Node.js",
        instructor: "Prof. Pedro Lima",
        time: "Quinta, 16:00",
        type: "Q&A",
        color: "from-green-500 to-emerald-500"
    }
];

function authenticateToken(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { user: null, error: 'Token não fornecido' };
    }

    const token = authHeader.substring(7);

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const user = userDatabase.findById(decoded.id);

        if (!user) {
            return { user: null, error: 'Usuário não encontrado' };
        }

        return { user, error: null };
    } catch (error) {
        return { user: null, error: 'Token inválido' };
    }
}

export async function GET(request: NextRequest) {
    try {
        // Autenticar usuário
        const { user, error } = await authenticateToken(request);

        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            );
        }

        // Calcular estatísticas baseadas nos dados reais do usuário
        const userStats = {
            totalCourses: 25, // Total de cursos disponíveis
            completedCourses: user.coursesCompleted || 0,
            inProgressCourses: Math.max(0, 3), // Cursos em progresso
            totalHours: user.hoursStudied || 0,
            thisWeekHours: Math.floor((user.hoursStudied || 0) / 4), // Aproximação
            streak: user.streak || 0,
            points: user.points || 0,
            rank: user.rank || 999,
            certificates: Math.floor((user.coursesCompleted || 0) / 3) // 1 certificado a cada 3 cursos
        };

        // Gerar avatar baseado no nome
        const generateAvatar = (name: string) => {
            const names = name.split(' ');
            if (names.length >= 2) {
                return (names[0][0] + names[1][0]).toUpperCase();
            }
            return name.substring(0, 2).toUpperCase();
        };

        // Retornar dados do dashboard com informações reais do usuário
        const dashboardData = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                level: user.level || 1,
                title: user.title || 'Estudante',
                avatar: user.avatar || generateAvatar(user.name),
                progress: user.progress || 0,
                role: user.role,
                access_level: user.access_level,
                bio: user.bio,
                skills: user.skills || [],
                city: user.city,
                state: user.state,
                country: user.country
            },
            stats: userStats,
            courses: mockCourses, // Manter cursos mockados por enquanto
            recentActivity: mockRecentActivity, // Manter atividades mockadas por enquanto
            upcomingEvents: mockUpcomingEvents // Manter eventos mockados por enquanto
        };

        return NextResponse.json({
            success: true,
            data: dashboardData
        });

    } catch (error) {
        console.error('Erro na API do dashboard:', error);
        return NextResponse.json(
            { success: false, error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

