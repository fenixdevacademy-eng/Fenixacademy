import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateToken } from '@/lib/auth/middleware';
import { upload, deleteFile, getFileUrl } from '@/lib/upload/service';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        // Autenticar usuário
        const { user, error } = await authenticateToken(request);
        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('avatar') as File;

        if (!file) {
            return NextResponse.json({
                success: false,
                error: 'Arquivo de avatar é obrigatório'
            }, { status: 400 });
        }

        // Validar tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                success: false,
                error: 'Tipo de arquivo não permitido. Use JPEG, PNG, GIF ou WEBP'
            }, { status: 400 });
        }

        // Validar tamanho do arquivo (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({
                success: false,
                error: 'Arquivo muito grande. Tamanho máximo: 5MB'
            }, { status: 400 });
        }

        // Gerar nome único para o arquivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.name);
        const filename = `avatar-${user.id}-${uniqueSuffix}${ext}`;

        // Salvar arquivo
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

        await writeFile(filePath, buffer);

        // Buscar perfil atual para deletar avatar anterior
        const currentProfile = await prisma.userProfile.findUnique({
            where: { userId: user.id }
        });

        if (currentProfile?.avatar) {
            const oldFilename = path.basename(currentProfile.avatar);
            deleteFile(oldFilename);
        }

        // Atualizar perfil com novo avatar
        const updatedProfile = await prisma.userProfile.upsert({
            where: { userId: user.id },
            update: { avatar: getFileUrl(filename) },
            create: {
                userId: user.id,
                avatar: getFileUrl(filename)
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Avatar atualizado com sucesso',
            avatar: updatedProfile.avatar
        });

    } catch (error) {
        console.error('Erro no upload do avatar:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        // Autenticar usuário
        const { user, error } = await authenticateToken(request);
        if (error || !user) {
            return NextResponse.json(
                { success: false, error: error || 'Não autorizado' },
                { status: 401 }
            );
        }

        // Buscar perfil atual
        const profile = await prisma.userProfile.findUnique({
            where: { userId: user.id }
        });

        if (profile?.avatar) {
            // Deletar arquivo do servidor
            const filename = path.basename(profile.avatar);
            deleteFile(filename);

            // Remover avatar do banco de dados
            await prisma.userProfile.update({
                where: { userId: user.id },
                data: { avatar: null }
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Avatar removido com sucesso'
        });

    } catch (error) {
        console.error('Erro ao remover avatar:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}
