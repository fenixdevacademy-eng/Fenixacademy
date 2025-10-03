import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

interface CourseParams {
    courseId: string;
}

interface MarkdownFile {
    name: string;
    content: string;
    size: number;
}

interface CourseContentResponse {
    readme: string;
    files: MarkdownFile[];
    lastUpdated: string;
    courseInfo?: {
        id: string;
        name: string;
        description: string;
    };
}

export async function GET(
    request: NextRequest,
    { params }: { params: CourseParams }
) {
    try {
        const { courseId } = params;

        // Mapear IDs dos cursos para nomes das pastas
        const courseMapping: { [key: string]: { folder: string; name: string; description: string } } = {
            '1': {
                folder: 'web-fundamentals',
                name: 'Fundamentos de Desenvolvimento Web',
                description: 'Aprenda HTML, CSS e JavaScript do zero'
            },
            '2': {
                folder: 'react-advanced',
                name: 'React Avançado',
                description: 'Técnicas avançadas de React e ecossistema'
            },
            '3': {
                folder: 'nodejs-apis',
                name: 'Node.js e APIs',
                description: 'Desenvolvimento de APIs robustas com Node.js'
            },
            '4': {
                folder: 'python-data-science',
                name: 'Python para Data Science',
                description: 'Análise de dados e machine learning com Python'
            },
            '5': {
                folder: 'devops-docker',
                name: 'DevOps e Docker',
                description: 'Containerização e automação de deploy'
            },
            '6': {
                folder: 'aws-cloud',
                name: 'AWS Cloud Computing',
                description: 'Infraestrutura na nuvem com Amazon Web Services'
            },
            '7': {
                folder: 'react-native-mobile',
                name: 'React Native Mobile',
                description: 'Desenvolvimento de apps móveis multiplataforma'
            },
            '8': {
                folder: 'flutter-mobile',
                name: 'Flutter Mobile',
                description: 'Apps nativos com Flutter e Dart'
            },
            '9': {
                folder: 'blockchain-smart-contracts',
                name: 'Blockchain e Smart Contracts',
                description: 'Desenvolvimento de contratos inteligentes'
            },
            '10': {
                folder: 'ciberseguranca',
                name: 'Cibersegurança',
                description: 'Proteção e segurança de sistemas'
            },
            '11': {
                folder: 'gestao-trafego',
                name: 'Gestão de Tráfego',
                description: 'Marketing digital e gestão de tráfego'
            }
        };

        const courseInfo = courseMapping[courseId];
        if (!courseInfo) {
            return NextResponse.json(
                {
                    error: 'Curso não encontrado',
                    availableCourses: Object.keys(courseMapping)
                },
                { status: 404 }
            );
        }

        // Caminho para os arquivos Markdown
        const coursePath = join('/app', 'course_content_restructured', courseInfo.folder);

        if (!existsSync(coursePath)) {
            return NextResponse.json({
                error: 'Diretório do curso não encontrado',
                path: coursePath,
                cwd: '/app',
                courseInfo
            }, { status: 404 });
        }

        // Ler o README do curso
        const readmePath = join(coursePath, 'README.md');
        const readmeContent = existsSync(readmePath) ? readFileSync(readmePath, 'utf-8') : '';

        // Listar arquivos Markdown disponíveis (na pasta raiz do curso)
        const markdownFiles: MarkdownFile[] = readdirSync(coursePath)
            .filter(item => item.endsWith('.md') && !item.includes('.backup'))
            .map(fileName => {
    const filePath = join(coursePath, fileName);
                try {
                    const content = readFileSync(filePath, 'utf-8');
                    return {
                        name: fileName.replace('.md', ''),
                        content,
    size: content.length
            };
                } catch (error) {
                    console.error(`Erro ao ler arquivo ${fileName}:`, error);
                    return {
                        name: fileName.replace('.md', ''),
                        content: 'Erro ao ler arquivo',
    size: 0
                    };
                }
            });

        const response: CourseContentResponse = {
            readme: readmeContent,
            files: markdownFiles,
            lastUpdated: new Date().toISOString(),
            courseInfo: {
                id: courseId,
                name: courseInfo.name,
                description: courseInfo.description
            }
        };

        const nextResponse = NextResponse.json(response);
        nextResponse.headers.set('Cache-Control', 'private, max-age=300');
        return nextResponse;

    } catch (error) {
        console.error('Erro ao ler conteúdo do curso:', error);
        return NextResponse.json({
            error: 'Erro ao ler conteúdo do curso',
    details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
    }
}