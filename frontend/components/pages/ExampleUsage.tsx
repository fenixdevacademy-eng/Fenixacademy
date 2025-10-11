'use client';

﻿import React from 'react';
import {
    IntegratedCourseSystem,
    CourseSystem,
    LessonDetail,
    CertificateSystem
} from './index';

/**
 * Exemplo de uso do Sistema de Cursos Fenix
 * 
 * Este arquivo demonstra como usar os diferentes componentes
 * do sistema de cursos em diferentes cenários.
 */

// Exemplo 1: Uso completo do sistema integrado
export const FullSystemExample: React.FC = () => {
    return (
        <div className="min-h-screen">
            <IntegratedCourseSystem />
        </div>
    );
}

// Exemplo 2: Apenas o sistema de cursos
export const CoursesOnlyExample: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Nossos Cursos
                </h1>
                <CourseSystem />
            </div>
        </div>
    );
}

// Exemplo 3: Apenas o sistema de certificados
export const CertificatesOnlyExample: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Meus Certificados
                </h1>
                <CertificateSystem />
            </div>
        </div>
    );
}

// Exemplo 4: Aula específica com dados mockados
export const SpecificLessonExample: React.FC = () => {
    const mockModule = {
        id: 1,
        title: 'HTML5 Semântico',
        focus: 'HTML5 Semântico',
        project: 'Portfólio Pessoal',
        lessons: [
            {
                id: 1,
                title: 'Introdução ao HTML5',
                duration: '90 min',
                type: 'text' as const,
                completed: false,
                content: 'Nesta aula, você aprenderá os fundamentos do HTML5...',
                objectives: [
                    'Compreender a evolução do HTML',
                    'Aprender elementos semânticos',
                    'Criar estrutura básica de documento'
                ],
                codeExample: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>Meu Site</title>
</head>
<body>
    <h1>Bem-vindo!</h1>
</body>
</html>`,
                resources: [
                    'Documentação MDN HTML5',
                    'Guia de Acessibilidade WCAG'
                ]
            }
        ],
        exercises: [
            {
                id: 1,
                title: 'Criar Estrutura Semântica',
                description: 'Crie uma página HTML5 com estrutura semântica...',
                difficulty: 'easy' as const,
                estimatedTime: '30 min',
                completed: false
            }
        ],
        projectDetails: {
            title: 'Portfólio Pessoal',
            description: 'Desenvolva um portfólio pessoal completo...',
            technologies: ['HTML5', 'CSS3', 'JavaScript'],
            requirements: [
                'Estrutura semântica HTML5',
                'Design responsivo',
                'Formulário de contato'
            ],
            deliverables: [
                'Código fonte no GitHub',
                'Site funcionando online'
            ]
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <LessonDetail
                module={mockModule}
                onBack={() => console.log('Voltar')}
            />
        </div>
    );
}

// Exemplo 5: Integração com roteamento (React Router)
export const WithRoutingExample: React.FC = () => {
    return (
        <div className="min-h-screen">
            {/* 
        Este exemplo mostra como integrar com React Router
        Em um projeto real, você usaria:
        
        import { BrowserRouter, Routes, Route } from 'react-router-dom';
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IntegratedCourseSystem />} />
            <Route path="/courses" element={<CourseSystem />} />
            <Route path="/certificates" element={<CertificateSystem />} />
            <Route path="/lesson/:moduleId" element={<LessonDetail />} />
          </Routes>
        </BrowserRouter>
      */}
            <IntegratedCourseSystem />
        </div>
    );
}

// Exemplo 6: Customização de tema
export const CustomThemeExample: React.FC = () => {
    return (
        <div className="min-h-screen" style={{
            '--primary-color': '#8B5CF6',
            '--secondary-color': '#06B6D4'
        } as React.CSSProperties}>
            <IntegratedCourseSystem />
        </div>
    );
}

// Exemplo 7: Com dados personalizados
export const CustomDataExample: React.FC = () => {
    // Em um projeto real, você carregaria os dados de uma API
    const customCourses = [
        {
            id: 'custom-course',
            name: 'Meu Curso Personalizado',
            description: 'Descrição do curso personalizado',
            // ... outros dados
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Cursos Personalizados
                </h1>
                {/* 
          Aqui você passaria os dados personalizados para o componente
          <CourseSystem courses={customCourses} />
        */}
                <CourseSystem />
            </div>
        </div>
    );
}

// Exemplo 8: Com callbacks personalizados
export const WithCallbacksExample: React.FC = () => {
    const handleModuleSelect = (moduleId: number) => {
        console.log('Módulo selecionado:', moduleId);
        // Lógica personalizada aqui
    }

    const handleLessonComplete = (lessonId: number) => {
        console.log('Aula concluída:', lessonId);
        // Atualizar progresso no backend
    }

    const handleCertificateDownload = (certificateId: string) => {
        console.log('Certificado baixado:', certificateId);
        // Lógica de download personalizada
    }

    return (
        <div className="min-h-screen">
            <IntegratedCourseSystem />
            {/* 
        Em um projeto real, você passaria essas funções como props:
        <IntegratedCourseSystem 
          onModuleSelect={handleModuleSelect}
          onLessonComplete={handleLessonComplete}
          onCertificateDownload={handleCertificateDownload}
        />
      */}
        </div>
    );
}

// Exemplo 9: Com estado global (Redux/Zustand)
export const WithGlobalStateExample: React.FC = () => {
    return (
        <div className="min-h-screen">
            {/* 
        Em um projeto real, você usaria um provider de estado:
        
        <Provider store={store}>
          <IntegratedCourseSystem />
        </Provider>
        
        Ou com Zustand:
        
        <CourseProvider>
          <IntegratedCourseSystem />
        </CourseProvider>
      */}
            <IntegratedCourseSystem />
        </div>
    );
}

// Exemplo 10: Com autenticação
export const WithAuthExample: React.FC = () => {
    const isAuthenticated = true; // Em um projeto real, viria do contexto de auth
    const user = { name: 'João Silva', role: 'student' } // Dados do usuário

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Faça login para acessar os cursos
                    </h1>
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg">
                        Entrar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <IntegratedCourseSystem />
        </div>
    );
}

export default FullSystemExample;

import {
    IntegratedCourseSystem,
    CourseSystem,
    LessonDetail,
    CertificateSystem
} from './index';

/**
 * Exemplo de uso do Sistema de Cursos Fenix
 * 
 * Este arquivo demonstra como usar os diferentes componentes
 * do sistema de cursos em diferentes cenários.
 */

// Exemplo 1: Uso completo do sistema integrado
export const FullSystemExample: React.FC = () => {
    return (
        <div className="min-h-screen">
            <IntegratedCourseSystem />
        </div>
    );
}

// Exemplo 2: Apenas o sistema de cursos
export const CoursesOnlyExample: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Nossos Cursos
                </h1>
                <CourseSystem />
            </div>
        </div>
    );
}

// Exemplo 3: Apenas o sistema de certificados
export const CertificatesOnlyExample: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Meus Certificados
                </h1>
                <CertificateSystem />
            </div>
        </div>
    );
}

// Exemplo 4: Aula específica com dados mockados
export const SpecificLessonExample: React.FC = () => {
    const mockModule = {
        id: 1,
        title: 'HTML5 Semântico',
        focus: 'HTML5 Semântico',
        project: 'Portfólio Pessoal',
        lessons: [
            {
                id: 1,
                title: 'Introdução ao HTML5',
                duration: '90 min',
                type: 'text' as const,
                completed: false,
                content: 'Nesta aula, você aprenderá os fundamentos do HTML5...',
                objectives: [
                    'Compreender a evolução do HTML',
                    'Aprender elementos semânticos',
                    'Criar estrutura básica de documento'
                ],
                codeExample: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>Meu Site</title>
</head>
<body>
    <h1>Bem-vindo!</h1>
</body>
</html>`,
                resources: [
                    'Documentação MDN HTML5',
                    'Guia de Acessibilidade WCAG'
                ]
            }
        ],
        exercises: [
            {
                id: 1,
                title: 'Criar Estrutura Semântica',
                description: 'Crie uma página HTML5 com estrutura semântica...',
                difficulty: 'easy' as const,
                estimatedTime: '30 min',
                completed: false
            }
        ],
        projectDetails: {
            title: 'Portfólio Pessoal',
            description: 'Desenvolva um portfólio pessoal completo...',
            technologies: ['HTML5', 'CSS3', 'JavaScript'],
            requirements: [
                'Estrutura semântica HTML5',
                'Design responsivo',
                'Formulário de contato'
            ],
            deliverables: [
                'Código fonte no GitHub',
                'Site funcionando online'
            ]
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <LessonDetail
                module={mockModule}
                onBack={() => console.log('Voltar')}
            />
        </div>
    );
}

// Exemplo 5: Integração com roteamento (React Router)
export const WithRoutingExample: React.FC = () => {
    return (
        <div className="min-h-screen">
            {/* 
        Este exemplo mostra como integrar com React Router
        Em um projeto real, você usaria:
        
        import { BrowserRouter, Routes, Route } from 'react-router-dom';
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IntegratedCourseSystem />} />
            <Route path="/courses" element={<CourseSystem />} />
            <Route path="/certificates" element={<CertificateSystem />} />
            <Route path="/lesson/:moduleId" element={<LessonDetail />} />
          </Routes>
        </BrowserRouter>
      */}
            <IntegratedCourseSystem />
        </div>
    );
}

// Exemplo 6: Customização de tema
export const CustomThemeExample: React.FC = () => {
    return (
        <div className="min-h-screen" style={{
            '--primary-color': '#8B5CF6',
            '--secondary-color': '#06B6D4'
        } as React.CSSProperties}>
            <IntegratedCourseSystem />
        </div>
    );
}

// Exemplo 7: Com dados personalizados
export const CustomDataExample: React.FC = () => {
    // Em um projeto real, você carregaria os dados de uma API
    const customCourses = [
        {
            id: 'custom-course',
            name: 'Meu Curso Personalizado',
            description: 'Descrição do curso personalizado',
            // ... outros dados
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Cursos Personalizados
                </h1>
                {/* 
          Aqui você passaria os dados personalizados para o componente
          <CourseSystem courses={customCourses} />
        */}
                <CourseSystem />
            </div>
        </div>
    );
}

// Exemplo 8: Com callbacks personalizados
export const WithCallbacksExample: React.FC = () => {
    const handleModuleSelect = (moduleId: number) => {
        console.log('Módulo selecionado:', moduleId);
        // Lógica personalizada aqui
    }

    const handleLessonComplete = (lessonId: number) => {
        console.log('Aula concluída:', lessonId);
        // Atualizar progresso no backend
    }

    const handleCertificateDownload = (certificateId: string) => {
        console.log('Certificado baixado:', certificateId);
        // Lógica de download personalizada
    }

    return (
        <div className="min-h-screen">
            <IntegratedCourseSystem />
            {/* 
        Em um projeto real, você passaria essas funções como props:
        <IntegratedCourseSystem 
          onModuleSelect={handleModuleSelect}
          onLessonComplete={handleLessonComplete}
          onCertificateDownload={handleCertificateDownload}
        />
      */}
        </div>
    );
}

// Exemplo 9: Com estado global (Redux/Zustand)
export const WithGlobalStateExample: React.FC = () => {
    return (
        <div className="min-h-screen">
            {/* 
        Em um projeto real, você usaria um provider de estado:
        
        <Provider store={store}>
          <IntegratedCourseSystem />
        </Provider>
        
        Ou com Zustand:
        
        <CourseProvider>
          <IntegratedCourseSystem />
        </CourseProvider>
      */}
            <IntegratedCourseSystem />
        </div>
    );
}

// Exemplo 10: Com autenticação
export const WithAuthExample: React.FC = () => {
    const isAuthenticated = true; // Em um projeto real, viria do contexto de auth
    const user = { name: 'João Silva', role: 'student' } // Dados do usuário

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Faça login para acessar os cursos
                    </h1>
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg">
                        Entrar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <IntegratedCourseSystem />
        </div>
    );
}






























































