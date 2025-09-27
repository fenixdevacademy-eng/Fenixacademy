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
                    skills: '',
                    interests: ''
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
                skills: newProfile.skills ? newProfile.skills.split(',').filter((s: string) => s.trim()) : [],
                interests: newProfile.interests ? newProfile.interests.split(',').filter((s: string) => s.trim()) : [],
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

            console.log('📊 Novo perfil criado:', {
                id: newProfileData.id,
                userId: newProfileData.userId,
                userName: newProfileData.user.name,
                userEmail: newProfileData.user.email
            });

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
            skills: profile.skills ? profile.skills.split(',').filter((s: string) => s.trim()) : [],
            interests: profile.interests ? profile.interests.split(',').filter((s: string) => s.trim()) : [],
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

        console.log('📊 Perfil estruturado para envio:', {
            id: profileData.id,
            userId: profileData.userId,
            userName: profileData.user.name,
            userEmail: profileData.user.email,
            bio: profileData.bio
        });

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
        const skillsString = Array.isArray(skills) ? skills.join(',') : (typeof skills === 'string' ? skills : '');
        const interestsString = Array.isArray(interests) ? interests.join(',') : (typeof interests === 'string' ? interests : '');

        // Atualizar perfil
        const updatedProfile = await prisma.userProfile.upsert({
            where: { userId: user.id },
            update: {
                phone,
                location,
                bio,
                skills: skillsString,
                interests: interestsString,
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
                skills: skillsString,
                interests: interestsString,
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


