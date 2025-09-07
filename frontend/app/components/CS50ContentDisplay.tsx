'use client';

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Code, FileText, Check, Download } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

interface CodeExercise {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    expectedOutput: string;
    language: string;
}

interface File {
    name: string;
    content: string;
}

interface Module {
    name: string;
    files: File[];
}

interface CourseContent {
    readme: {
        content: string;
    };
    modules: Module[];
}

interface CS50ContentDisplayProps {
    courseId: string;
    moduleName?: string;
    fileName?: string;
}

export default function CS50ContentDisplay({ courseId, moduleName, fileName }: CS50ContentDisplayProps) {
    const { currentLanguage } = useLanguage();
    const [content, setContent] = useState<CourseContent | null>(null);
    const [displayContent, setDisplayContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'content' | 'exercises' | 'modules'>('content');
    const [selectedModule, setSelectedModule] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [codeEditor, setCodeEditor] = useState<{
        isOpen: boolean;
        exercise: CodeExercise | null;
    }>({
        isOpen: false,
        exercise: null
    });

    const practicalExercises: CodeExercise[] = [
        {
            id: '1',
            title: getTranslation('htmlStructureTitle', currentLanguage),
            description: getTranslation('htmlStructureDescription', currentLanguage),
            initialCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Primeira Página</title>
</head>
<body>
    <h1>Bem-vindo à Programação</h1>
    <p>Esta é minha primeira página HTML!</p>
</body>
</html>`,
            expectedOutput: 'Página HTML básica com estrutura completa',
            language: 'html'
        },
        {
            id: '2',
            title: getTranslation('cssStylingTitle', currentLanguage),
            description: getTranslation('cssStylingDescription', currentLanguage),
            initialCode: `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    line-height: 1.6;
}`,
            expectedOutput: 'Página com estilos CSS aplicados',
            language: 'css'
        },
        {
            id: '3',
            title: getTranslation('javascriptInteractiveTitle', currentLanguage),
            description: getTranslation('javascriptInteractiveDescription', currentLanguage),
            initialCode: `function changeText() {
    const heading = document.querySelector('h1');
    heading.textContent = 'Texto Alterado com JavaScript!';
}

// Adicione este botão ao HTML:
// <button onclick="changeText()">Alterar Texto</button>`,
            expectedOutput: 'Botão funcional que altera o texto',
            language: 'javascript'
        }
    ];

    useEffect(() => {
        fetchCourseContent();
    }, [courseId, moduleName, fileName]);

    const fetchCourseContent = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/courses/content/${courseId}`);

            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const data: CourseContent = await response.json();
            setContent(data);

            let contentToShow = data.readme.content;

            if (moduleName && fileName) {
                const module = data.modules.find(m => m.name === moduleName);
                if (module) {
                    const file = module.files.find(f => f.name === fileName);
                    if (file) {
                        contentToShow = file.content;
                    }
                }
            } else if (moduleName) {
                const module = data.modules.find(m => m.name === moduleName);
                if (module && module.files.length > 0) {
                    const firstFile = module.files[0];
                    if (firstFile) {
                        contentToShow = firstFile.content;
                    }
                }
            }

            setDisplayContent(contentToShow);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    const renderMarkdown = (markdown: string) => {
        try {
            marked.setOptions({
                breaks: true,
                gfm: true
            });
            return marked(markdown);
        } catch (err) {
            return markdown;
        }
    };

    const openCodeEditor = (exercise: CodeExercise) => {
        setCodeEditor({ isOpen: true, exercise });
    };

    const closeCodeEditor = () => {
        setCodeEditor({ isOpen: false, exercise: null });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Carregando...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Ocorreu um erro
                    </h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchCourseContent}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Conteúdo CS50
                            </h1>
                            <LanguageSelector 
                                currentLanguage={currentLanguage}
                                onLanguageChange={(language) => {
                                    // Aqui você pode implementar a lógica para mudar o idioma
                                    console.log('Idioma alterado para:', language);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('content')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'content'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Conteúdo
                        </button>
                        <button
                            onClick={() => setActiveTab('exercises')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'exercises'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Exercícios
                        </button>
                        <button
                            onClick={() => setActiveTab('modules')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'modules'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Módulos
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === 'content' && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="prose max-w-none">
                                <div
                                    className="markdown-content"
                                    dangerouslySetInnerHTML={{ __html: renderMarkdown(displayContent) }}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'exercises' && (
                        <div className="space-y-6">
                            {practicalExercises.map((exercise) => (
                                <div key={exercise.id} className="bg-white rounded-lg shadow p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{exercise.title}</h3>
                                            <p className="text-gray-600 mt-1">{exercise.description}</p>
                                        </div>
                                        <button
                                            onClick={() => openCodeEditor(exercise)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                        >
                                            <Code className="w-4 h-4 mr-2" />
                                            Abrir Editor
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'modules' && content && (
                        <div className="space-y-6">
                            {content.modules.map((module) => (
                                <div key={module.name} className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{module.name}</h3>
                                    <div className="space-y-3">
                                        {module.files.map((file) => (
                                            <div key={file.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <FileText className="w-5 h-5 text-gray-400" />
                                                    <span className="text-gray-700">{file.name}</span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setSelectedModule(module.name);
                                                        setSelectedFile(file.name);
                                                        setActiveTab('content');
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Visualizar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal do Editor de Código */}
            {codeEditor.isOpen && codeEditor.exercise && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-6xl max-h-[90vh] overflow-hidden">
                        {/* Header do Modal */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">{codeEditor.exercise.title}</h2>
                                <p className="text-gray-300 text-sm">{codeEditor.exercise.description}</p>
                            </div>
                            <button
                                onClick={closeCodeEditor}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Corpo do Modal */}
                        <div className="flex h-96">
                            {/* Editor de Código */}
                            <div className="flex-1 border-r border-gray-200">
                                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-700">
                                        Editor de Código - {codeEditor.exercise.language.toUpperCase()}
                                    </span>
                                </div>
                                <textarea
                                    className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
                                    defaultValue={codeEditor.exercise.initialCode}
                                    placeholder="Digite seu código aqui..."
                                />
                            </div>

                            {/* Preview/Resultado */}
                            <div className="flex-1">
                                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-700">Resultado Esperado</span>
                                </div>
                                <div className="p-4 bg-white h-full overflow-auto">
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <h4 className="font-medium text-gray-800 mb-2">Saída Esperada</h4>
                                        <p className="text-gray-600 text-sm">{codeEditor.exercise.expectedOutput}</p>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                                            <Check className="w-4 h-4 mr-2" />
                                            Executar Código
                                        </button>

                                        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                                            <Download className="w-4 h-4 mr-2" />
                                            Baixar Solução
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Estilos para o conteúdo Markdown */}
            <style jsx global>{`
                .markdown-content h1 {
                    @apply text-3xl font-bold text-gray-900 mb-4 mt-6;
                }
                .markdown-content h2 {
                    @apply text-2xl font-semibold text-gray-800 mb-3 mt-5;
                }
                .markdown-content h3 {
                    @apply text-xl font-semibold text-gray-800 mb-2 mt-4;
                }
                .markdown-content p {
                    @apply text-gray-700 mb-3 leading-relaxed;
                }
                .markdown-content ul, .markdown-content ol {
                    @apply mb-3 pl-6;
                }
                .markdown-content li {
                    @apply text-gray-700 mb-1;
                }
                .markdown-content code {
                    @apply bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono;
                }
                .markdown-content pre {
                    @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4;
                }
                .markdown-content pre code {
                    @apply bg-transparent text-gray-100 p-0;
                }
                .markdown-content blockquote {
                    @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4;
                }
                .markdown-content a {
                    @apply text-blue-600 hover:text-blue-800 underline;
                }
                .markdown-content table {
                    @apply w-full border-collapse border border-gray-300 mb-4;
                }
                .markdown-content th, .markdown-content td {
                    @apply border border-gray-300 px-3 py-2 text-left;
                }
                .markdown-content th {
                    @apply bg-gray-100 font-semibold;
                }
            `}</style>
        </div>
    );
}
