import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params

        // Mapear slugs para pastas de conteúdo
        const courseContentMap: { [key: string]: string } = {
            'react-advanced': 'react-advanced',
            'web-fundamentals': 'web-fundamentals',
            'backend-development': 'backend-development',
            'frontend-development': 'frontend-development',
            'fullstack-development': 'fullstack-development',
            'mobile-development': 'mobile-development',
            'data-science': 'data-science',
            'python-data-science': 'python-data-science',
            'cybersecurity': 'cybersecurity',
            'devops-docker': 'devops-docker',
            'devops-engineering': 'devops-engineering',
            'nodejs-apis': 'nodejs-apis'
        }

        const courseFolder = courseContentMap[slug]
        if (!courseFolder) {
            return NextResponse.json({
                success: false,
                error: 'Curso não encontrado'
            }, { status: 404 })
        }

        // Caminho para o conteúdo do curso
        const contentPath = path.join('/app', 'backend', 'fenix-expanded-content', courseFolder, 'avancado')

        console.log('🔍 Tentando acessar:', contentPath)
        console.log('📁 Existe?', fs.existsSync(contentPath))

        // Verificar se a pasta existe
        if (!fs.existsSync(contentPath)) {
            return NextResponse.json({
                success: false,
                error: 'Conteúdo do curso não encontrado'
            }, { status: 404 })
        }

        // Listar arquivos de aula
        const files = fs.readdirSync(contentPath)
        const lessonFiles = files.filter(file => file.endsWith('.md'))

        // Ler as primeiras 3 aulas como preview
        const previewLessons: Array<{
            id: number;
            title: string;
            description: string;
            content: string;
            codeExamples: string[];
            fileName: string;
        }> = []

        for (let i = 0; i < Math.min(3, lessonFiles.length); i++) {
            const filePath = path.join(contentPath, lessonFiles[i])
            const content = fs.readFileSync(filePath, 'utf-8')

            // Extrair metadados do markdown
            const lines = content.split('\n')
            const title = lines.find(line => line.startsWith('# '))?.replace('# ', '') || 'Aula sem título'
            const description = lines.find(line => line.startsWith('## 🎯'))?.replace('## 🎯 ', '') || 'Descrição não disponível'

            // Extrair código se existir
            const codeBlocks = content.match(/```[\s\S]*?```/g) || []
            const codeExamples = codeBlocks.slice(0, 2).map(block =>
                block.replace(/```\w*\n?/, '').replace(/```$/, '').trim()
            )

            previewLessons.push({
                id: i + 1,
                title,
                description,
                content: content.substring(0, 1000) + '...', // Primeiros 1000 caracteres
                codeExamples,
                fileName: lessonFiles[i]
            })
        }

        // Informações do curso
        const courseInfo = {
            title: getCourseTitle(slug),
            description: getCourseDescription(slug),
            totalLessons: lessonFiles.length,
            estimatedHours: Math.ceil(lessonFiles.length * 1.5), // Estimativa
            level: 'Avançado',
            category: getCourseCategory(slug)
        }

        return NextResponse.json({
            success: true,
            course: courseInfo,
            previewLessons,
            totalLessons: lessonFiles.length
        })

    } catch (error) {
        console.error('Erro ao buscar conteúdo do curso:', error)
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 })
    }
}

function getCourseTitle(slug: string): string {
    const titles: { [key: string]: string } = {
        'react-advanced': 'React Avançado e Moderno',
        'web-fundamentals': 'Fundamentos de Desenvolvimento Web',
        'backend-development': 'Desenvolvimento Backend Avançado',
        'frontend-development': 'Desenvolvimento Frontend Avançado',
        'fullstack-development': 'Desenvolvimento Full Stack',
        'mobile-development': 'Desenvolvimento Mobile',
        'data-science': 'Ciência de Dados',
        'python-data-science': 'Python para Ciência de Dados',
        'cybersecurity': 'Cibersegurança',
        'devops-docker': 'DevOps e Docker',
        'devops-engineering': 'Engenharia DevOps',
        'nodejs-apis': 'Node.js e APIs'
    }
    return titles[slug] || 'Curso de Programação'
}

function getCourseDescription(slug: string): string {
    const descriptions: { [key: string]: string } = {
        'react-advanced': 'Domine React 18, hooks avançados, performance e padrões modernos de desenvolvimento.',
        'web-fundamentals': 'Aprenda HTML5, CSS3, JavaScript moderno e fundamentos essenciais da web.',
        'backend-development': 'Desenvolva APIs robustas, microserviços e arquiteturas escaláveis.',
        'frontend-development': 'Crie interfaces modernas com as melhores práticas e ferramentas atuais.',
        'fullstack-development': 'Torne-se um desenvolvedor completo dominando frontend e backend.',
        'mobile-development': 'Desenvolva aplicativos nativos e híbridos para iOS e Android.',
        'data-science': 'Analise dados, crie modelos de ML e extraia insights valiosos.',
        'python-data-science': 'Use Python para análise de dados, visualização e machine learning.',
        'cybersecurity': 'Proteja sistemas, identifique vulnerabilidades e implemente segurança.',
        'devops-docker': 'Automatize deployments, gerencie containers e infraestrutura como código.',
        'devops-engineering': 'Implemente práticas DevOps, CI/CD e monitoramento de sistemas.',
        'nodejs-apis': 'Construa APIs REST e GraphQL escaláveis com Node.js.'
    }
    return descriptions[slug] || 'Curso completo de programação com conteúdo prático e atualizado.'
}

function getCourseCategory(slug: string): string {
    const categories: { [key: string]: string } = {
        'react-advanced': 'Frontend',
        'web-fundamentals': 'Frontend',
        'backend-development': 'Backend',
        'frontend-development': 'Frontend',
        'fullstack-development': 'Full Stack',
        'mobile-development': 'Mobile',
        'data-science': 'Data Science',
        'python-data-science': 'Data Science',
        'cybersecurity': 'Security',
        'devops-docker': 'DevOps',
        'devops-engineering': 'DevOps',
        'nodejs-apis': 'Backend'
    }
    return categories[slug] || 'Programming'
}

