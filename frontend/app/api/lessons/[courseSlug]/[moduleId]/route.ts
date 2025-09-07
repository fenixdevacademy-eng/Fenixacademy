import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';

export async function GET(
    request: NextRequest,
    { params }: { params: { courseSlug: string; moduleId: string } }
) {
    try {
        const { courseSlug, moduleId } = params;

        // Caminho para o arquivo markdown real
        let modulePath = path.join(
            process.cwd(),
            'backend',
            'fenix-expanded-content',
            courseSlug,
            'avancado'
        );

        // Fallback para o caminho alternativo se necessário
        if (!fs.existsSync(modulePath)) {
            modulePath = path.join(
                process.cwd(),
                'course_content_restructured',
                courseSlug,
                'avancado'
            );
        }

        // Verificar se o diretório existe
        try {
            await fsPromises.access(modulePath);
        } catch {
            // Se não existir, retornar aulas padrão
            return NextResponse.json({
                lessons: [
                    {
                        id: 1,
                        title: `Aula 1 - Módulo ${moduleId}`,
                        moduleId: parseInt(moduleId),
                        content: `Esta é a aula 1 do módulo ${moduleId} do curso ${courseSlug}.`,
                        duration: '45 min',
                        type: 'text'
                    }
                ]
            });
        }

        // Ler todos os arquivos do diretório
        const files = await fsPromises.readdir(modulePath);

        // Filtrar arquivos que correspondem ao módulo específico
        const moduleFiles = files.filter(file => {
            const modulePattern = new RegExp(`^modulo-${moduleId.padStart(2, '0')}-avancado-${courseSlug}\\.md$`);
            return modulePattern.test(file);
        });

        console.log(`Módulo ${moduleId}: Encontrados ${moduleFiles.length} arquivos de aula`);

        const lessons = await Promise.all(
            moduleFiles.map(async (filename, index) => {
                try {
                    const filePath = path.join(modulePath, filename);
                    const content = await fsPromises.readFile(filePath, 'utf-8');

                    // Extrair título do conteúdo ou usar padrão
                    const titleMatch = content.match(/^#\s+(.+)$/m);
                    const title = titleMatch && titleMatch[1] ? titleMatch[1].trim() : `Aula ${index + 1}`;

                    return {
                        id: index + 1,
                        title,
                        moduleId: parseInt(moduleId),
                        content: content.substring(0, 200) + '...',
                        duration: '45 min',
                        type: 'text'
                    };
                } catch (error) {
                    console.error(`Error reading file ${filename}:`, error);
                    return null;
                }
            })
        );

        // Filtrar aulas válidas e ordenar
        const validLessons = lessons
            .filter((lesson): lesson is NonNullable<typeof lesson> => lesson !== null)
            .sort((a, b) => a.id - b.id);

        console.log(`Módulo ${moduleId}: ${validLessons.length} aulas válidas carregadas`);

        // Se não encontrar aulas, retornar aulas padrão
        if (validLessons.length === 0) {
            console.log(`Módulo ${moduleId}: Nenhuma aula encontrada, retornando aulas padrão`);
            return NextResponse.json({
                lessons: [
                    {
                        id: 1,
                        title: `Aula 1 - Módulo ${moduleId}`,
                        moduleId: parseInt(moduleId),
                        content: `Esta é a aula 1 do módulo ${moduleId} do curso ${courseSlug}.`,
                        duration: '45 min',
                        type: 'text'
                    }
                ]
            });
        }

        return NextResponse.json({ lessons: validLessons });
    } catch (error) {
        console.error('Error in lessons API:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
