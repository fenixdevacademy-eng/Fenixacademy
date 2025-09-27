import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateToken } from '@/lib/auth/middleware-db';

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

        // Buscar perfil do usuário
        const profile = await prisma.userProfile.findUnique({
            where: { userId: user.id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true
                    }
                }
            }
        });

        if (!profile) {
            // Criar perfil inicial se não existir
            const newProfile = await prisma.userProfile.create({
                data: {
                    userId: user.id,
                    joinDate: new Date(),
                    skills: [],
                    interests: []
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                            createdAt: true
                        }
                    }
                }
            });

            // Estruturar os dados do novo perfil
            const newProfileData = {
                id: newProfile.id,
                userId: newProfile.userId,
                phone: newProfile.phone,
                location: newProfile.location,
                bio: newProfile.bio,
                avatar: newProfile.avatar,
                skills: Array.isArray(newProfile.skills) ? newProfile.skills : [],
                interests: Array.isArray(newProfile.interests) ? newProfile.interests : [],
                joinDate: newProfile.joinDate,
                user: {
                    id: newProfile.user.id,
                    name: newProfile.user.name,
                    email: newProfile.user.email,
                    role: newProfile.user.role,
                    createdAt: newProfile.user.createdAt
                },
                stats: {
                    coursesCompleted: newProfile.coursesCompleted || 0,
                    totalHours: newProfile.totalHours || 0,
                    certificates: newProfile.certificates || 0,
                    totalPoints: newProfile.totalPoints || 0,
                    rank: newProfile.rank || 'Iniciante'
                },
                preferences: {
                    publicProfile: newProfile.publicProfile,
                    showProgress: newProfile.showProgress,
                    notifications: newProfile.notifications,
                    emailUpdates: newProfile.emailUpdates
                }
            }

            return NextResponse.json({
                success: true,
                profile: newProfileData
            });
        }

        // Estruturar os dados corretamente para o frontend
        const profileData = {
            id: profile.id,
            userId: profile.userId,
            phone: profile.phone,
            location: profile.location,
            bio: profile.bio,
            avatar: profile.avatar,
            skills: Array.isArray(profile.skills) ? profile.skills : [],
            interests: Array.isArray(profile.interests) ? profile.interests : [],
            joinDate: profile.joinDate,
            user: {
                id: profile.user.id,
                name: profile.user.name,
                email: profile.user.email,
                role: profile.user.role,
                createdAt: profile.user.createdAt
            },
            stats: {
                coursesCompleted: profile.coursesCompleted || 0,
                totalHours: profile.totalHours || 0,
                certificates: profile.certificates || 0,
                totalPoints: profile.totalPoints || 0,
                rank: profile.rank || 'Iniciante'
            },
            preferences: {
                publicProfile: profile.publicProfile,
                showProgress: profile.showProgress,
                notifications: profile.notifications,
                emailUpdates: profile.emailUpdates
            }
        }

        return NextResponse.json({
            success: true,
            profile: profileData
        });

    } catch (error) {
        console.error('Erro na API de perfil:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Autenticar usuário
        const { user, error } = await authenticateToken(request);
        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { phone, location, bio, skills, interests, preferences } = body;

        // Converter arrays para strings separadas por vírgula
        const skillsArray = Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s) : []);
        const interestsArray = Array.isArray(interests) ? interests : (typeof interests === 'string' ? interests.split(',').map(s => s.trim()).filter(s => s) : []);

        // Atualizar perfil
        const updatedProfile = await prisma.userProfile.upsert({
            where: { userId: user.id },
            update: {
                phone,
                location,
                bio,
                skills: skillsArray,
                interests: interestsArray,
                publicProfile: preferences?.publicProfile || false,
                showProgress: preferences?.showProgress !== undefined ? preferences.showProgress : true,
                notifications: preferences?.notifications !== undefined ? preferences.notifications : true,
                emailUpdates: preferences?.emailUpdates !== undefined ? preferences.emailUpdates : true,
                updatedAt: new Date()
            },
            create: {
                userId: user.id,
                phone,
                location,
                bio,
                skills: skillsArray,
                interests: interestsArray,
                publicProfile: preferences?.publicProfile || false,
                showProgress: preferences?.showProgress !== undefined ? preferences.showProgress : true,
                notifications: preferences?.notifications !== undefined ? preferences.notifications : true,
                emailUpdates: preferences?.emailUpdates !== undefined ? preferences.emailUpdates : true,
                joinDate: new Date()
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            profile: updatedProfile,
            message: 'Perfil atualizado com sucesso'
        });

    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
