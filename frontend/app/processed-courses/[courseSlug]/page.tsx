'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    BookOpen,
    Code,
    Clock,
    FileText,
    ChevronRight,
    Play,
    Download,
    ExternalLink,
    CheckCircle,
    Circle
} from 'lucide-react';

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

interface ProcessedCourse {
    slug: string;
    name: string;
    description: string;
    type: string;
    totalModules: number;
    totalLessons: number;
    lastUpdated: string;
}

interface ProcessedCourseResponse {
    success: boolean;
    course: ProcessedCourse;
    modules: ProcessedModule[];
    examples: {
        totalFiles: number;
        categories: string[];
    };
}

const typeLabels: { [key: string]: string } = {
    'backend': 'Backend',
    'frontend': 'Frontend',
    'mobile': 'Mobile',
    'data_science': 'Data Science',
    'devops': 'DevOps',
    'aws': 'AWS',
    'cybersecurity': 'Cybersecurity',
    'blockchain': 'Blockchain',
    'web': 'Web',
    'fullstack': 'Full Stack',
    'ui_ux': 'UI/UX',
    'game': 'Games',
    'management': 'Gestão',
    'marketing': 'Marketing'
};

const typeColors: { [key: string]: string } = {
    'backend': 'bg-blue-100 text-blue-800',
    'frontend': 'bg-green-100 text-green-800',
    'mobile': 'bg-purple-100 text-purple-800',
    'data_science': 'bg-orange-100 text-orange-800',
    'devops': 'bg-gray-100 text-gray-800',
    'aws': 'bg-yellow-100 text-yellow-800',
    'cybersecurity': 'bg-red-100 text-red-800',
    'blockchain': 'bg-indigo-100 text-indigo-800',
    'web': 'bg-teal-100 text-teal-800',
    'fullstack': 'bg-pink-100 text-pink-800',
    'ui_ux': 'bg-rose-100 text-rose-800',
    'game': 'bg-violet-100 text-violet-800',
    'management': 'bg-slate-100 text-slate-800',
    'marketing': 'bg-amber-100 text-amber-800'
};

export default function ProcessedCoursePage() {
    const params = useParams();
    const courseSlug = params.courseSlug as string;

    const [courseData, setCourseData] = useState<ProcessedCourseResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedModule, setSelectedModule] = useState<string | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

    useEffect(() => {
        if (courseSlug) {
            fetchCourseData();
        }
    }, [courseSlug]);

    const fetchCourseData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/courses/processed/${courseSlug}`);
            const data: ProcessedCourseResponse = await response.json();

            if (data.success) {
                setCourseData(data);
                // Selecionar primeiro módulo e primeira aula por padrão
                if (data.modules.length > 0) {
                    setSelectedModule(data.modules[0].id);
                    if (data.modules[0].lessons.length > 0) {
                        setSelectedLesson(data.modules[0].lessons[0].id);
                    }
                }
            } else {
                setError(data.error || 'Erro ao carregar curso');
            }
        } catch (err) {
            setError('Erro de conexão');
            console.error('Erro ao buscar curso:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error || !courseData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Erro</h1>
                    <p className="text-gray-600 mb-4">{error || 'Curso não encontrado'}</p>
                    <Link href="/processed-courses">
                        <Button>Voltar aos Cursos</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const { course, modules, examples } = courseData;
    const currentModule = modules.find(m => m.id === selectedModule);
    const currentLesson = currentModule?.lessons.find(l => l.id === selectedLesson);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Link href="/processed-courses" className="hover:text-blue-600">
                        Cursos Processados
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span>{course.name}</span>
                </div>

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {course.name}
                        </h1>
                        <p className="text-gray-600 mb-4 max-w-3xl">
                            {course.description}
                        </p>
                        <div className="flex items-center gap-4">
                            <Badge className={`${typeColors[course.type] || 'bg-gray-100 text-gray-800'}`}>
                                {typeLabels[course.type] || course.type}
                            </Badge>
                            <span className="text-sm text-gray-600">
                                Atualizado em {formatDate(course.lastUpdated)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="text-2xl font-bold">{course.totalModules}</p>
                                <p className="text-sm text-gray-600">Módulos</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-2xl font-bold">{course.totalLessons}</p>
                                <p className="text-sm text-gray-600">Aulas</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Code className="h-5 w-5 text-purple-500" />
                            <div>
                                <p className="text-2xl font-bold">{examples.totalFiles}</p>
                                <p className="text-sm text-gray-600">Exemplos</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-orange-500" />
                            <div>
                                <p className="text-2xl font-bold">
                                    {Math.ceil(course.totalLessons * 1.5)}h
                                </p>
                                <p className="text-sm text-gray-600">Estimativa</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Conteúdo Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar - Módulos e Aulas */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Módulos e Aulas</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-96 overflow-y-auto">
                                {modules.map((module) => (
                                    <div key={module.id} className="border-b last:border-b-0">
                                        <button
                                            onClick={() => {
                                                setSelectedModule(module.id);
                                                if (module.lessons.length > 0) {
                                                    setSelectedLesson(module.lessons[0].id);
                                                }
                                            }}
                                            className={`w-full p-4 text-left hover:bg-gray-50 ${selectedModule === module.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium">{module.name}</h3>
                                                <span className="text-sm text-gray-500">
                                                    {module.totalLessons} aulas
                                                </span>
                                            </div>
                                        </button>

                                        {selectedModule === module.id && (
                                            <div className="bg-gray-50">
                                                {module.lessons.map((lesson) => (
                                                    <button
                                                        key={lesson.id}
                                                        onClick={() => setSelectedLesson(lesson.id)}
                                                        className={`w-full p-3 pl-8 text-left hover:bg-gray-100 flex items-center gap-2 ${selectedLesson === lesson.id ? 'bg-blue-100' : ''
                                                            }`}
                                                    >
                                                        <Play className="h-4 w-4 text-gray-400" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium truncate">
                                                                {lesson.title}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                <span>{formatFileSize(lesson.size)}</span>
                                                                <span>•</span>
                                                                <span>{getReadingTime(lesson.content)} min</span>
                                                                {lesson.hasCodeExamples && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <Code className="h-3 w-3" />
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Conteúdo da Aula */}
                <div className="lg:col-span-2">
                    {currentLesson ? (
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl mb-2">
                                            {currentLesson.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {currentModule?.name} • {formatFileSize(currentLesson.size)} • {getReadingTime(currentLesson.content)} min de leitura
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {currentLesson.hasCodeExamples && (
                                            <Badge variant="secondary">
                                                <Code className="h-3 w-3 mr-1" />
                                                Com exemplos
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="content" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="content">Conteúdo</TabsTrigger>
                                        <TabsTrigger value="examples">Exemplos</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="content" className="mt-4">
                                        <div className="prose max-w-none">
                                            <div
                                                className="whitespace-pre-wrap"
                                                dangerouslySetInnerHTML={{
                                                    __html: currentLesson.content
                                                        .replace(/\n/g, '<br>')
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                                        .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
                                                        .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
                                                }}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="examples" className="mt-4">
                                        {currentLesson.codeExamples && currentLesson.codeExamples.length > 0 ? (
                                            <div className="space-y-4">
                                                {currentLesson.codeExamples.map((example, index) => (
                                                    <div key={index} className="border rounded-lg">
                                                        <div className="bg-gray-50 px-4 py-2 border-b">
                                                            <span className="text-sm font-medium">Exemplo {index + 1}</span>
                                                        </div>
                                                        <pre className="p-4 overflow-x-auto">
                                                            <code>{example}</code>
                                                        </pre>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <Code className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                                <p>Nenhum exemplo de código disponível para esta aula</p>
                                            </div>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="p-8 text-center">
                                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Selecione uma aula
                                </h3>
                                <p className="text-gray-600">
                                    Escolha uma aula do módulo para visualizar o conteúdo
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}



























