import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

interface LessonParams {
    courseSlug: string;
    moduleId: string;
    lessonId: string;
}

interface LessonContent {
    id: string;
    title: string;
    fileName: string;
    content: string;
    size: number;
    lastModified: string;
    module: {
        id: string;
        name: string;
        path: string;
    };
    course: {
        slug: string;
        name: string;
        type: string;
    };
    codeExamples: {
        files: string[];
        totalFiles: number;
        content: string[];
    };
    navigation: {
        previous?: {
            id: string;
            title: string;
            fileName: string;
        };
        next?: {
            id: string;
            title: string;
            fileName: string;
        };
    };
    metadata: {
        hasCodeBlocks: boolean;
        hasImages: boolean;
        hasLinks: boolean;
        wordCount: number;
        readingTime: number;
    };
}

interface LessonResponse {
    success: boolean;
    lesson: LessonContent;
}

// Mapeamento de slugs para informações dos cursos
const courseMapping: { [key: string]: { name: string; type: string } } = {
    'backend-development': { name: 'Desenvolvimento Backend', type: 'backend' },
    'frontend-development': { name: 'Desenvolvimento Frontend', type: 'frontend' },
    'mobile-development': { name: 'Desenvolvimento Mobile', type: 'mobile' },
    'data-science': { name: 'Data Science', type: 'data_science' },
    'devops-docker': { name: 'DevOps e Docker', type: 'devops' },
    'aws-cloud': { name: 'AWS Cloud Computing', type: 'aws' },
    'cybersecurity': { name: 'Cybersecurity', type: 'cybersecurity' },
    'blockchain-smart-contracts': { name: 'Blockchain e Smart Contracts', type: 'blockchain' },
    'react-advanced': { name: 'React Avançado', type: 'frontend' },
    'python-data-science': { name: 'Python Data Science', type: 'data_science' },
    'web-fundamentals': { name: 'Fundamentos Web', type: 'web' },
    'full-stack-development': { name: 'Desenvolvimento Full Stack', type: 'fullstack' },
    'ui-ux-design': { name: 'UI/UX Design', type: 'ui_ux' },
    'machine-learning': { name: 'Machine Learning', type: 'data_science' },
    'react-native-mobile': { name: 'React Native Mobile', type: 'mobile' },
    'flutter-mobile': { name: 'Flutter Mobile', type: 'mobile' },
    'nodejs-apis': { name: 'Node.js e APIs', type: 'backend' },
    'csharp-automation': { name: 'C# e Automação', type: 'backend' },
    'game-development': { name: 'Desenvolvimento de Jogos', type: 'game' },
    'product-management': { name: 'Gestão de Produtos', type: 'management' },
    'gestao-trafego': { name: 'Gestão de Tráfego', type: 'marketing' }
};

export async function GET(
    request: NextRequest,
    { params }: { params: LessonParams }
) {
    try {
        const { courseSlug, moduleId, lessonId } = params;

        // Verificar se o curso existe
        const courseInfo = courseMapping[courseSlug];
        if (!courseInfo) {
            return NextResponse.json({
                success: false,
                error: 'Curso não encontrado'
            }, { status: 404 });
        }

        // Caminho para o conteúdo da aula
        const processedCoursesPath = join(process.cwd(), 'scripts', 'processed_courses');
        const coursePath = join(processedCoursesPath, courseSlug);
        const modulePath = join(coursePath, moduleId);
        const lessonPath = join(modulePath, `${lessonId}.md`);

        if (!existsSync(lessonPath)) {
            return NextResponse.json({
                success: false,
                error: 'Aula não encontrada',
                path: lessonPath
            }, { status: 404 });
        }

        // Ler conteúdo da aula
        const stats = statSync(lessonPath);
        const content = readFileSync(lessonPath, 'utf-8');

        // Extrair título da aula
        const titleMatch = content.match(/^#\s*\*\*(.*?)\*\*/m);
        const title = titleMatch ? titleMatch[1].trim() : lessonId;

        // Extrair exemplos de código
        const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
        const codeExamples = codeBlocks.map(block =>
            block.replace(/```\w*\n?/, '').replace(/```$/, '').trim()
        );

        // Buscar arquivos de exemplo do módulo
        const examplesPath = join(modulePath, 'exemplos');
        let exampleFiles: string[] = [];
        let totalExampleFiles = 0;

        if (existsSync(examplesPath)) {
            try {
                exampleFiles = readdirSync(examplesPath, { recursive: true })
                    .filter(item => typeof item === 'string' && !item.includes('exemplos'))
                    .map(item => item.toString());
                totalExampleFiles = exampleFiles.length;
            } catch (error) {
                console.error(`Erro ao ler exemplos do módulo ${moduleId}:`, error);
            }
        }

        // Buscar aulas anterior e próxima
        const allLessonFiles = readdirSync(modulePath)
            .filter(item => item.endsWith('.md') && item.startsWith('aula-'))
            .sort((a, b) => {
                const aNum = parseInt(a.match(/aula-(\d+)/)?.[1] || '0');
                const bNum = parseInt(b.match(/aula-(\d+)/)?.[1] || '0');
                return aNum - bNum;
            });

        const currentIndex = allLessonFiles.findIndex(file => file === `${lessonId}.md`);

        let previousLesson: LessonContent['navigation']['previous'];
        let nextLesson: LessonContent['navigation']['next'];

        if (currentIndex > 0) {
            const prevFile = allLessonFiles[currentIndex - 1];
            const prevPath = join(modulePath, prevFile);
            try {
                const prevContent = readFileSync(prevPath, 'utf-8');
                const prevTitleMatch = prevContent.match(/^#\s*\*\*(.*?)\*\*/m);
                const prevTitle = prevTitleMatch ? prevTitleMatch[1].trim() : prevFile.replace('.md', '');

                previousLesson = {
                    id: prevFile.replace('.md', ''),
                    title: prevTitle,
                    fileName: prevFile
                };
            } catch (error) {
                console.error(`Erro ao ler aula anterior ${prevFile}:`, error);
            }
        }

        if (currentIndex < allLessonFiles.length - 1) {
            const nextFile = allLessonFiles[currentIndex + 1];
            const nextPath = join(modulePath, nextFile);
            try {
                const nextContent = readFileSync(nextPath, 'utf-8');
                const nextTitleMatch = nextContent.match(/^#\s*\*\*(.*?)\*\*/m);
                const nextTitle = nextTitleMatch ? nextTitleMatch[1].trim() : nextFile.replace('.md', '');

                nextLesson = {
                    id: nextFile.replace('.md', ''),
                    title: nextTitle,
                    fileName: nextFile
                };
            } catch (error) {
                console.error(`Erro ao ler próxima aula ${nextFile}:`, error);
            }
        }

        // Calcular metadados
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 palavras por minuto
        const hasCodeBlocks = codeBlocks.length > 0;
        const hasImages = content.includes('![') || content.includes('<img');
        const hasLinks = content.includes('[') && content.includes('](');

        const lesson: LessonContent = {
            id: lessonId,
            title,
            fileName: `${lessonId}.md`,
            content,
            size: content.length,
            lastModified: stats.mtime.toISOString(),
            module: {
                id: moduleId,
                name: `Módulo ${moduleId.replace('modulo-', '')}`,
                path: moduleId
            },
            course: {
                slug: courseSlug,
                name: courseInfo.name,
                type: courseInfo.type
            },
            codeExamples: {
                files: exampleFiles,
                totalFiles: totalExampleFiles,
                content: codeExamples
            },
            navigation: {
                previous: previousLesson,
                next: nextLesson
            },
            metadata: {
                hasCodeBlocks,
                hasImages,
                hasLinks,
                wordCount,
                readingTime
            }
        };

        const response: LessonResponse = {
            success: true,
            lesson
        };

        const nextResponse = NextResponse.json(response);
        nextResponse.headers.set('Cache-Control', 'private, max-age=300');
        return nextResponse;

    } catch (error) {
        console.error('Erro ao ler aula:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}












