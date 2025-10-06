'use client';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { courseSlug: string; projectId: string } }
) {
    try {
        const { courseSlug, projectId } = params;

        // Mock data para o projeto
        const project = {
            id: projectId,
            title: 'Aplicação de Lista de Tarefas com React',
            description: 'Crie uma aplicação completa de lista de tarefas usando React, com funcionalidades de adicionar, editar, excluir e marcar tarefas como concluídas.',
            objectives: [
                'Implementar um componente principal de lista de tarefas',
                'Criar formulário para adicionar novas tarefas',
                'Implementar funcionalidade de edição inline',
                'Adicionar sistema de filtros (todas, ativas, concluídas)',
                'Implementar persistência local com localStorage',
                'Adicionar validação de formulários',
                'Criar interface responsiva e acessível'
            ],
            requirements: [
                'Usar React com hooks (useState, useEffect)',
                'Implementar pelo menos 3 componentes reutilizáveis',
                'Usar CSS ou styled-components para estilização',
                'Implementar validação de formulários',
                'Código deve estar bem documentado',
                'Aplicação deve ser responsiva',
                'Implementar testes unitários (opcional)'
            ],
            deliverables: [
                'Código fonte completo no GitHub',
                'Aplicação funcionando em produção (Vercel/Netlify)',
                'README.md com instruções de instalação e uso',
                'Demonstração em vídeo (2-3 minutos)',
                'Documentação da arquitetura da aplicação'
            ],
            technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Git', 'GitHub'],
            difficulty: 'medium',
            points: 100,
            timeLimit: 7, // 7 dias
            isCompleted: false,
            submissions: [],
            maxSubmissions: 3,
            dueDate: '2024-02-15',
            resources: [
                {
                    id: '1',
                    title: 'Template do Projeto',
                    type: 'zip',
                    url: '/resources/project-template.zip',
                    description: 'Template inicial com estrutura de pastas e dependências'
                },
                {
                    id: '2',
                    title: 'Documentação React',
                    type: 'link',
                    url: 'https://reactjs.org/docs',
                    description: 'Documentação oficial do React'
                },
                {
                    id: '3',
                    title: 'Tutorial de Hooks',
                    type: 'video',
                    url: 'https://example.com/hooks-tutorial',
                    description: 'Vídeo explicativo sobre React Hooks'
                }
            ],
            criteria: [
                {
                    id: '1',
                    title: 'Funcionalidade Básica',
                    description: 'Aplicação permite adicionar, editar e excluir tarefas',
                    weight: 30,
                    isMet: false
                },
                {
                    id: '2',
                    title: 'Interface de Usuário',
                    description: 'Interface limpa, responsiva e intuitiva',
                    weight: 25,
                    isMet: false
                },
                {
                    id: '3',
                    title: 'Código Limpo',
                    description: 'Código bem estruturado, documentado e reutilizável',
                    weight: 20,
                    isMet: false
                },
                {
                    id: '4',
                    title: 'Funcionalidades Avançadas',
                    description: 'Implementa filtros, persistência e validações',
                    weight: 15,
                    isMet: false
                },
                {
                    id: '5',
                    title: 'Documentação',
                    description: 'README completo e documentação da arquitetura',
                    weight: 10,
                    isMet: false
                }
            ]
        };

        return NextResponse.json({
            success: true,
            project: project
        });

    } catch (error) {
        console.error('Erro ao buscar projeto:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { courseSlug: string; projectId: string } }
) {
    try {
        const { courseSlug, projectId } = params;
        const body = await request.json();
        const { title, description, files } = body;

        // Simular submissão do projeto
        const submission = {
            id: `submission-${Date.now()}`,
            title: title,
            description: description,
            files: files || [],
            submittedAt: new Date().toISOString(),
            status: 'pending',
            score: null,
            feedback: null,
            reviewer: null
        };

        return NextResponse.json({
            success: true,
            submission: submission,
            message: 'Projeto enviado com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao submeter projeto:', error);
        return NextResponse.json({
            success: false,
            error: 'Erro interno do servidor'
        }, { status: 500 });
    }
}








