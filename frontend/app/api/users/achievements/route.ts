import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        // Mock achievements data
        const achievements = [
            {
                id: 1,
                name: "Primeiro Curso",
                description: "Completou seu primeiro curso na Fenix Academy",
                icon: "🎓",
                category: "learning",
                points: 100,
                earnedDate: "2024-01-15T10:30:00Z",
                progress: 100,
                totalRequired: 1,
                currentProgress: 1,
                rarity: "common"
            },
            {
                id: 2,
                name: "Estudioso Dedicado",
                description: "Manteve uma sequência de 7 dias de estudo",
                icon: "🔥",
                category: "streak",
                points: 250,
                earnedDate: "2024-01-18T09:15:00Z",
                progress: 100,
                totalRequired: 7,
                currentProgress: 7,
                rarity: "uncommon"
            },
            {
                id: 3,
                name: "Mestre do React",
                description: "Completou o curso avançado de React.js",
                icon: "⚛️",
                category: "course",
                points: 500,
                earnedDate: "2024-01-10T14:20:00Z",
                progress: 100,
                totalRequired: 1,
                currentProgress: 1,
                rarity: "rare"
            },
            {
                id: 4,
                name: "Certificado de Ouro",
                description: "Obteve 5 certificados de cursos",
                icon: "🏆",
                category: "certificates",
                points: 1000,
                earnedDate: null,
                progress: 60,
                totalRequired: 5,
                currentProgress: 3,
                rarity: "epic"
            },
            {
                id: 5,
                name: "Maratonista",
                description: "Manteve uma sequência de 30 dias de estudo",
                icon: "🏃",
                category: "streak",
                points: 1000,
                earnedDate: null,
                progress: 23,
                totalRequired: 30,
                currentProgress: 7,
                rarity: "legendary"
            },
            {
                id: 6,
                name: "Poliglota do Código",
                description: "Completou cursos em 3 tecnologias diferentes",
                icon: "🌍",
                category: "diversity",
                points: 750,
                earnedDate: null,
                progress: 67,
                totalRequired: 3,
                currentProgress: 2,
                rarity: "rare"
            }
        ];

        const stats = {
            totalAchievements: achievements.length,
            earnedAchievements: achievements.filter(a => a.earnedDate !== null).length,
            totalPoints: achievements.filter(a => a.earnedDate !== null).reduce((sum, a) => sum + a.points, 0),
            completionRate: Math.round((achievements.filter(a => a.earnedDate !== null).length / achievements.length) * 100)
        };

        return NextResponse.json({
            success: true,
            data: {
                achievements,
                stats
            }
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao carregar conquistas'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { achievementId, progress } = body;

        // Mock achievement progress update
        const achievementUpdate = {
            id: achievementId,
            progress,
            updatedAt: new Date().toISOString()
        };

        return NextResponse.json({
            success: true,
            data: achievementUpdate,
            message: 'Progresso da conquista atualizado'
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao atualizar progresso da conquista'
            },
            { status: 500 }
        );
    }
} 