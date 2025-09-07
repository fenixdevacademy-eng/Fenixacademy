import { NextResponse } from 'next/server';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(
    _request: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { courseId } = params;

        // Mapear IDs dos cursos para nomes das pastas
        const courseMapping: { [key: string]: string } = {
            '1': 'web-fundamentals',
            '2': 'react-advanced',
            '3': 'nodejs-apis',
            '4': 'python-data-science',
            '5': 'devops-docker',
            '6': 'aws-cloud',
            '7': 'react-native-mobile',
            '8': 'flutter-mobile',
            '9': 'blockchain-smart-contracts',
            '10': 'ciberseguranca',
            '11': 'gestao-trafego'
        };

        const courseFolder = courseMapping[courseId];
        if (!courseFolder) {
            return NextResponse.json({
                error: 'Curso não encontrado',
                availableCourses: Object.keys(courseMapping).map(id => ({
                    id,
                    folder: courseMapping[id]
                }))
            }, { status: 404 });
        }

        // Tentar diferentes caminhos para encontrar o conteúdo
        const possiblePaths = [
            join(process.cwd(), 'course_content_restructured', courseFolder),
            join(process.cwd(), '..', 'course_content_restructured', courseFolder),
            join(process.cwd(), '..', '..', 'course_content_restructured', courseFolder),
            join(process.cwd(), '..', '..', '..', 'course_content_restructured', courseFolder),
            join(process.cwd(), '..', '..', '..', '..', 'course_content_restructured', courseFolder)
        ];

        let coursePath = null;
        for (const path of possiblePaths) {
            if (existsSync(path)) {
                coursePath = path;
                break;
            }
        }

        if (!coursePath) {
            console.log('❌ Nenhum caminho válido encontrado para:', courseFolder);
            console.log('🔍 Caminhos testados:', possiblePaths);

            // Retornar dados de exemplo em caso de erro para evitar loading infinito
            return NextResponse.json({
                courseId,
                courseFolder,
                coursePath: 'fallback',
                readme: {
                    content: `# ${courseFolder.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}\n\nCurso com padrão CS50 de Harvard`,
                    size: 100
                },
                modules: [
                    {
                        name: 'Conteúdo Principal',
                        files: [
                            {
                                name: 'Introdução',
                                content: 'Conteúdo de introdução ao curso',
                                size: 50
                            },
                            {
                                name: 'Fundamentos',
                                content: 'Fundamentos básicos do curso',
                                size: 75
                            }
                        ]
                    }
                ],
                lastUpdated: new Date().toISOString(),
                note: 'Usando dados de exemplo - diretório não encontrado'
            });
        }

        console.log('✅ Caminho encontrado:', coursePath);

        try {
            // Ler o README do curso
            const readmePath = join(coursePath, 'README.md');
            const readmeContent = readFileSync(readmePath, 'utf-8');

            // Listar arquivos Markdown disponíveis
            const markdownFiles = readdirSync(coursePath)
                .filter(item => {
                    return item.endsWith('.md') && !item.includes('.backup');
                })
                .map(fileName => {
                    const filePath = join(coursePath, fileName);
                    try {
                        const content = readFileSync(filePath, 'utf-8');
                        return {
                            name: fileName.replace('.md', ''),
                            content: content,
                            size: content.length
                        };
                    } catch (error) {
                        return {
                            name: fileName.replace('.md', ''),
                            content: 'Erro ao ler arquivo',
                            size: 0
                        };
                    }
                });

            // Organizar em módulos baseado no nome do arquivo
            const modules = [
                {
                    name: 'Conteúdo Principal',
                    files: markdownFiles
                }
            ];

            return NextResponse.json({
                courseId,
                courseFolder,
                coursePath,
                readme: {
                    content: readmeContent,
                    size: readmeContent.length
                },
                modules,
                lastUpdated: new Date().toISOString()
            });

        } catch (error) {
            console.log('❌ Erro ao ler conteúdo:', error);
            return NextResponse.json({
                error: 'Erro ao ler conteúdo do curso',
                details: error instanceof Error ? error.message : 'Erro desconhecido',
                coursePath
            }, { status: 500 });
        }

    } catch (error) {
        console.log('❌ Erro interno:', error);
        return NextResponse.json({
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}
