import { NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
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
            return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
        }

        // Caminho para os arquivos Markdown
        const coursePath = join(process.cwd(), 'course_content_restructured', courseFolder);

        console.log('🔍 Debug - Caminho do curso:', coursePath);
        console.log('🔍 Debug - Diretório atual:', process.cwd());

        try {
            // Verificar se o diretório existe
            if (!require('fs').existsSync(coursePath)) {
                console.log('❌ Diretório não encontrado:', coursePath);
                return NextResponse.json({
                    error: 'Diretório do curso não encontrado',
                    path: coursePath,
                    cwd: process.cwd()
                }, { status: 404 });
            }

            // Ler o README do curso
            const readmePath = join(coursePath, 'README.md');
            console.log('🔍 Debug - Tentando ler:', readmePath);
            const readmeContent = readFileSync(readmePath, 'utf-8');

            // Listar arquivos Markdown disponíveis (estão na pasta raiz do curso)
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
                readme: {
                    content: readmeContent,
                    size: readmeContent.length
                },
                modules,
                lastUpdated: new Date().toISOString()
            });

        } catch (error) {
            return NextResponse.json({
                error: 'Erro ao ler conteúdo do curso',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}
