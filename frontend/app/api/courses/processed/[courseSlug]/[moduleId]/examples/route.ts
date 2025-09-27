import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface ExamplesParams {
    courseSlug: string;
    moduleId: string;
}

interface CodeExample {
    fileName: string;
    content: string;
    language: string;
    size: number;
    lastModified: string;
    path: string;
}

interface ExamplesResponse {
    success: boolean;
    module: {
        id: string;
        name: string;
        course: {
            slug: string;
            name: string;
            type: string;
        };
    };
    examples: CodeExample[];
    total: number;
    languages: string[];
    totalSize: number;
}

// Mapeamento de extensões para linguagens
const languageMapping: { [key: string]: string } = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'scala': 'scala',
    'sh': 'bash',
    'bash': 'bash',
    'ps1': 'powershell',
    'sql': 'sql',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'toml',
    'ini': 'ini',
    'env': 'env',
    'dockerfile': 'dockerfile',
    'md': 'markdown',
    'txt': 'text'
};

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
    { params }: { params: ExamplesParams }
) {
    try {
        const { courseSlug, moduleId } = params;

        // Verificar se o curso existe
        const courseInfo = courseMapping[courseSlug];
        if (!courseInfo) {
            return NextResponse.json({
                success: false,
                error: 'Curso não encontrado'
            }, { status: 404 });
        }

        // Caminho para os exemplos do módulo
        const processedCoursesPath = join(process.cwd(), 'scripts', 'processed_courses');
        const coursePath = join(processedCoursesPath, courseSlug);
        const modulePath = join(coursePath, moduleId);
        const examplesPath = join(modulePath, 'exemplos');

        if (!existsSync(examplesPath)) {
            return NextResponse.json({
                success: false,
                error: 'Exemplos não encontrados para este módulo',
                path: examplesPath
            }, { status: 404 });
        }

        // Listar todos os arquivos de exemplo
        const exampleFiles = readdirSync(examplesPath, { recursive: true })
            .filter(item => typeof item === 'string' && !item.includes('exemplos'))
            .map(item => item.toString());

        const examples: CodeExample[] = [];
        const languages = new Set<string>();
        let totalSize = 0;

        for (const file of exampleFiles) {
            const filePath = join(examplesPath, file);

            try {
                const stats = statSync(filePath);
                const content = readFileSync(filePath, 'utf-8');

                // Determinar linguagem pela extensão
                const extension = file.split('.').pop()?.toLowerCase() || '';
                const language = languageMapping[extension] || 'text';

                examples.push({
                    fileName: file,
                    content,
                    language,
                    size: content.length,
                    lastModified: stats.mtime.toISOString(),
                    path: file
                });

                languages.add(language);
                totalSize += content.length;

            } catch (error) {
                console.error(`Erro ao ler arquivo de exemplo ${file}:`, error);
                // Adicionar exemplo mesmo com erro
                examples.push({
                    fileName: file,
                    content: 'Erro ao ler arquivo',
                    language: 'text',
                    size: 0,
                    lastModified: new Date().toISOString(),
                    path: file
                });
            }
        }

        // Ordenar exemplos por linguagem e nome
        examples.sort((a, b) => {
            if (a.language !== b.language) {
                return a.language.localeCompare(b.language);
            }
            return a.fileName.localeCompare(b.fileName);
        });

        const response: ExamplesResponse = {
            success: true,
            module: {
                id: moduleId,
                name: `Módulo ${moduleId.replace('modulo-', '')}`,
                course: {
                    slug: courseSlug,
                    name: courseInfo.name,
                    type: courseInfo.type
                }
            },
            examples,
            total: examples.length,
            languages: Array.from(languages).sort(),
            totalSize
        };

        const nextResponse = NextResponse.json(response);
        nextResponse.headers.set('Cache-Control', 'private, max-age=300');
        return nextResponse;

    } catch (error) {
        console.error('Erro ao ler exemplos do módulo:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        }, { status: 500 });
    }
}












