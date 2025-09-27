import { NextRequest, NextResponse } from 'next/server';
import { readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';

interface ProcessedCourse {
    slug: string;
    name: string;
    description: string;
    type: string;
    totalModules: number;
    totalLessons: number;
    lastUpdated: string;
    hasContent: boolean;
    stats: {
        totalFiles: number;
        averageModuleSize: number;
        codeExamples: number;
    }
}

interface ProcessedCoursesResponse {
    success: boolean;
    courses: ProcessedCourse[];
    total: number;
    lastProcessed: string;
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
}

export async function GET(request: NextRequest) {
    try {
        // Caminho para os conteúdos processados
        const processedCoursesPath = join(process.cwd(), 'scripts', 'processed_courses');

        if (!existsSync(processedCoursesPath)) {
            return NextResponse.json({
                success: false,
                error: 'Diretório de cursos processados não encontrado',
                suggestion: 'Execute o processador de cursos primeiro'
            }, { status: 404 });
        }

        // Listar todos os cursos processados
        const courseDirs = readdirSync(processedCoursesPath)
            .filter(item => {
                const itemPath = join(processedCoursesPath, item);
                return statSync(itemPath).isDirectory() && !item.startsWith('.');
            })
            .sort();

        const courses: ProcessedCourse[] = [];
        let lastProcessed = '';

        for (const courseDir of courseDirs) {
            const coursePath = join(processedCoursesPath, courseDir);
            const courseInfo = courseMapping[courseDir];

            if (!courseInfo) {
                // Pular cursos não mapeados
                continue;
            }

            try {
                const stats = statSync(coursePath);
                lastProcessed = stats.mtime.toISOString();

                // Contar módulos
                const moduleDirs = readdirSync(coursePath)
                    .filter(item => {
                        const itemPath = join(coursePath, item);
                        return statSync(itemPath).isDirectory() && item.startsWith('modulo-');
                    });

                let totalLessons = 0;
                let totalFiles = 0;
                let codeExamples = 0;

                // Contar aulas e arquivos em cada módulo
                for (const moduleDir of moduleDirs) {
                    const modulePath = join(coursePath, moduleDir);

                    // Contar aulas
                    const lessonFiles = readdirSync(modulePath)
                        .filter(item => item.endsWith('.md') && item.startsWith('aula-'));
                    totalLessons += lessonFiles.length;

                    // Contar arquivos de exemplo
                    const examplesPath = join(modulePath, 'exemplos');
                    if (existsSync(examplesPath)) {
                        try {
                            const exampleFiles = readdirSync(examplesPath, { recursive: true })
                                .filter(item => typeof item === 'string' && !item.includes('exemplos'));
                            totalFiles += exampleFiles.length;
                            codeExamples += exampleFiles.length;
                        } catch (error) {
                            console.error(`Erro ao contar exemplos do módulo ${moduleDir}:`, error);
                        }
                    }
                }

                courses.push({
                    slug: courseDir,
                    name: courseInfo.name,
                    description: courseInfo.description,
                    type: courseInfo.type,
                    totalModules: moduleDirs.length,
                    totalLessons,
                    lastUpdated: stats.mtime.toISOString(),
                    hasContent: totalLessons > 0,
                    stats: {
                        totalFiles,
                        averageModuleSize: moduleDirs.length > 0 ? Math.round(totalLessons / moduleDirs.length) : 0,
                        codeExamples
                    }
                });

            } catch (error) {
                console.error(`Erro ao processar curso ${courseDir}:`, error);
                // Adicionar curso mesmo com erro, mas marcado como sem conteúdo
                courses.push({
                    slug: courseDir,
                    name: courseInfo.name,
                    description: courseInfo.description,
                    type: courseInfo.type,
                    totalModules: 0,
                    totalLessons: 0,
                    lastUpdated: new Date().toISOString(),
                    hasContent: false,
                    stats: {
                        totalFiles: 0,
                        averageModuleSize: 0,
                        codeExamples: 0
                    }
                });
            }
        }

        // Ordenar cursos por tipo e nome
        courses.sort((a, b) => {
            if (a.type !== b.type) {
                return a.type.localeCompare(b.type);
            }
            return a.name.localeCompare(b.name);
        });

        const response: ProcessedCoursesResponse = {
            success: true,
            courses,
            total: courses.length,
            lastProcessed
        }

        const nextResponse = NextResponse.json(response);
        nextResponse.headers.set('Cache-Control', 'private, max-age=300');
        return nextResponse;

    } catch (error) {
        console.error('Erro ao listar cursos processados:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}












