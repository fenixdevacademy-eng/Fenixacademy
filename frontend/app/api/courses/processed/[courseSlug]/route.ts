import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';

interface CourseParams {
    courseSlug: string;
}

interface ProcessedLesson {
    id: string;
    title: string;
    fileName: string;
    content: string;
    size: number;
    lastModified: string;
    hasCodeExamples: boolean;
    codeExamples?: string[];
}

interface ProcessedModule {
    id: string;
    name: string;
    path: string;
    lessons: ProcessedLesson[];
    totalLessons: number;
    readme?: string;
    examples?: {
        files: string[];
        totalFiles: number;
    };
}

interface ProcessedCourseResponse {
    success: boolean;
    course: {
        slug: string;
        name: string;
        description: string;
        type: string;
        totalModules: number;
        totalLessons: number;
        lastUpdated: string;
    };
    modules: ProcessedModule[];
    examples: {
        totalFiles: number;
        categories: string[];
    };
}

// Mapeamento de slugs para informações dos cursos
const courseMapping: { [key: string]: { name: string; description: string; type: string } } = {
    'backend-development': {
        name: 'Desenvolvimento Backend',
        description: 'Aprenda desenvolvimento backend com Node.js, APIs REST e bancos de dados',
        type: 'backend'
    },
    'frontend-development': {
        name: 'Desenvolvimento Frontend',
        description: 'Domine React, JavaScript moderno e desenvolvimento web responsivo',
        type: 'frontend'
    },
    'mobile-development': {
        name: 'Desenvolvimento Mobile',
        description: 'Crie apps móveis com React Native e Flutter',
        type: 'mobile'
    },
    'data-science': {
        name: 'Data Science',
        description: 'Análise de dados, machine learning e visualizações com Python',
        type: 'data_science'
    },
    'devops-docker': {
        name: 'DevOps e Docker',
        description: 'Containerização, CI/CD e automação de deploy',
        type: 'devops'
    },
    'aws-cloud': {
        name: 'AWS Cloud Computing',
        description: 'Infraestrutura na nuvem com Amazon Web Services',
        type: 'aws'
    },
    'cybersecurity': {
        name: 'Cybersecurity',
        description: 'Segurança da informação e proteção de sistemas',
        type: 'cybersecurity'
    },
    'blockchain-smart-contracts': {
        name: 'Blockchain e Smart Contracts',
        description: 'Desenvolvimento de contratos inteligentes e aplicações descentralizadas',
        type: 'blockchain'
    },
    'react-advanced': {
        name: 'React Avançado',
        description: 'Técnicas avançadas de React e ecossistema moderno',
        type: 'frontend'
    },
    'python-data-science': {
        name: 'Python Data Science',
        description: 'Análise de dados e machine learning com Python',
        type: 'data_science'
    },
    'web-fundamentals': {
        name: 'Fundamentos Web',
        description: 'HTML, CSS, JavaScript e conceitos fundamentais da web',
        type: 'web'
    },
    'full-stack-development': {
        name: 'Desenvolvimento Full Stack',
        description: 'Desenvolvimento completo de aplicações web',
        type: 'fullstack'
    },
    'ui-ux-design': {
        name: 'UI/UX Design',
        description: 'Design de interfaces e experiência do usuário',
        type: 'ui_ux'
    },
    'machine-learning': {
        name: 'Machine Learning',
        description: 'Algoritmos de aprendizado de máquina e inteligência artificial',
        type: 'data_science'
    },
    'react-native-mobile': {
        name: 'React Native Mobile',
        description: 'Desenvolvimento de apps móveis com React Native',
        type: 'mobile'
    },
    'flutter-mobile': {
        name: 'Flutter Mobile',
        description: 'Apps nativos com Flutter e Dart',
        type: 'mobile'
    },
    'nodejs-apis': {
        name: 'Node.js e APIs',
        description: 'Desenvolvimento de APIs robustas com Node.js',
        type: 'backend'
    },
    'csharp-automation': {
        name: 'C# e Automação',
        description: 'Desenvolvimento com C# e automação de processos',
        type: 'backend'
    },
    'game-development': {
        name: 'Desenvolvimento de Jogos',
        description: 'Criação de jogos e aplicações interativas',
        type: 'game'
    },
    'product-management': {
        name: 'Gestão de Produtos',
        description: 'Gestão e desenvolvimento de produtos digitais',
        type: 'management'
    },
    'gestao-trafego': {
        name: 'Gestão de Tráfego',
        description: 'Marketing digital e gestão de tráfego',
        type: 'marketing'
    }
};

export async function GET(
    request: NextRequest,
    { params }: { params: CourseParams }
) {
    try {
        const { courseSlug } = params;

        // Verificar se o curso existe no mapeamento
        const courseInfo = courseMapping[courseSlug];
        if (!courseInfo) {
            return NextResponse.json({
                success: false,
                error: 'Curso não encontrado',
                availableCourses: Object.keys(courseMapping)
            }, { status: 404 });
        }

        // Caminho para os conteúdos processados
        const processedCoursesPath = join(process.cwd(), 'scripts', 'processed_courses');
        const coursePath = join(processedCoursesPath, courseSlug);

        if (!existsSync(coursePath)) {
            return NextResponse.json({
                success: false,
                error: 'Conteúdo processado não encontrado',
                path: coursePath,
                suggestion: 'Execute o processador de cursos primeiro'
            }, { status: 404 });
        }

        // Listar módulos do curso
        const moduleDirs = readdirSync(coursePath)
            .filter(item => {
                const itemPath = join(coursePath, item);
                return statSync(itemPath).isDirectory() && item.startsWith('modulo-');
            })
            .sort((a, b) => {
                const aNum = parseInt(a.replace('modulo-', ''));
                const bNum = parseInt(b.replace('modulo-', ''));
                return aNum - bNum;
            });

        const modules: ProcessedModule[] = [];
        let totalLessons = 0;
        let totalExampleFiles = 0;
        const exampleCategories = new Set<string>();

        for (const moduleDir of moduleDirs) {
            const modulePath = join(coursePath, moduleDir);
            const moduleId = moduleDir;
            const moduleName = `Módulo ${moduleDir.replace('modulo-', '')}`;

            // Listar aulas do módulo
            const lessonFiles = readdirSync(modulePath)
                .filter(item => item.endsWith('.md') && item.startsWith('aula-'))
                .sort((a, b) => {
                    const aNum = parseInt(a.match(/aula-(\d+)/)?.[1] || '0');
                    const bNum = parseInt(b.match(/aula-(\d+)/)?.[1] || '0');
                    return aNum - bNum;
                });

            const lessons: ProcessedLesson[] = [];

            for (const lessonFile of lessonFiles) {
                const lessonPath = join(modulePath, lessonFile);
                const stats = statSync(lessonPath);

                try {
                    const content = readFileSync(lessonPath, 'utf-8');

                    // Extrair título da aula
                    const titleMatch = content.match(/^#\s*\*\*(.*?)\*\*/m);
                    const title = titleMatch ? titleMatch[1].trim() : lessonFile.replace('.md', '');

                    // Verificar se tem exemplos de código
                    const hasCodeExamples = content.includes('```') || content.includes('exemplos');

                    // Extrair exemplos de código (primeiros 2)
                    const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
                    const codeExamples = codeBlocks.slice(0, 2).map(block =>
                        block.replace(/```\w*\n?/, '').replace(/```$/, '').trim()
                    );

                    lessons.push({
                        id: lessonFile.replace('.md', ''),
                        title,
                        fileName: lessonFile,
                        content,
                        size: content.length,
                        lastModified: stats.mtime.toISOString(),
                        hasCodeExamples,
                        codeExamples: codeExamples.length > 0 ? codeExamples : undefined
                    });
                } catch (error) {
                    console.error(`Erro ao ler aula ${lessonFile}:`, error);
                    lessons.push({
                        id: lessonFile.replace('.md', ''),
                        title: lessonFile.replace('.md', ''),
                        fileName: lessonFile,
                        content: 'Erro ao ler arquivo',
                        size: 0,
                        lastModified: stats.mtime.toISOString(),
                        hasCodeExamples: false
                    });
                }
            }

            // Verificar se existe README do módulo
            const readmePath = join(modulePath, 'README.md');
            let readme: string | undefined;
            if (existsSync(readmePath)) {
                try {
                    readme = readFileSync(readmePath, 'utf-8');
                } catch (error) {
                    console.error(`Erro ao ler README do módulo ${moduleDir}:`, error);
                }
            }

            // Verificar exemplos de código do módulo
            const examplesPath = join(modulePath, 'exemplos');
            let examples: { files: string[]; totalFiles: number } | undefined;

            if (existsSync(examplesPath)) {
                try {
                    const exampleFiles = readdirSync(examplesPath, { recursive: true })
                        .filter(item => typeof item === 'string' && !item.includes('exemplos'))
                        .map(item => item.toString());

                    examples = {
                        files: exampleFiles,
                        totalFiles: exampleFiles.length
                    };

                    totalExampleFiles += exampleFiles.length;

                    // Categorizar exemplos por extensão
                    exampleFiles.forEach(file => {
                        const ext = file.split('.').pop()?.toLowerCase();
                        if (ext) {
                            exampleCategories.add(ext);
                        }
                    });
                } catch (error) {
                    console.error(`Erro ao ler exemplos do módulo ${moduleDir}:`, error);
                }
            }

            modules.push({
                id: moduleId,
                name: moduleName,
                path: moduleDir,
                lessons,
                totalLessons: lessons.length,
                readme,
                examples
            });

            totalLessons += lessons.length;
        }

        // Informações do curso
        const courseStats = statSync(coursePath);
        const course: ProcessedCourseResponse['course'] = {
            slug: courseSlug,
            name: courseInfo.name,
            description: courseInfo.description,
            type: courseInfo.type,
            totalModules: modules.length,
            totalLessons,
            lastUpdated: courseStats.mtime.toISOString()
        };

        const response: ProcessedCourseResponse = {
            success: true,
            course,
            modules,
            examples: {
                totalFiles: totalExampleFiles,
                categories: Array.from(exampleCategories)
            }
        };

        const nextResponse = NextResponse.json(response);
        nextResponse.headers.set('Cache-Control', 'private, max-age=300');
        return nextResponse;

    } catch (error) {
        console.error('Erro ao ler conteúdo processado do curso:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}












