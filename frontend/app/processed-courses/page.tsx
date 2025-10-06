'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, Code, Clock, FileText, Filter } from 'lucide-react';

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
}

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
}

export default function ProcessedCoursesPage() {
    const [courses, setCourses] = useState<ProcessedCourse[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<ProcessedCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        filterAndSortCourses();
    }, [courses, searchTerm, selectedType, sortBy]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/courses/processed');
            const data: ProcessedCoursesResponse = await response.json();

            if (data.success) {
                setCourses(data.courses);
            } else {
                setError(data.error || 'Erro ao carregar cursos');
            }
        } catch (err) {
            setError('Erro de conexão');
            console.error('Erro ao buscar cursos:', err);
        } finally {
            setLoading(false);
        }
    }

    const filterAndSortCourses = () => {
        let filtered = courses.filter(course => {
            const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === 'all' || course.type === selectedType;
            return matchesSearch && matchesType;
        });

        // Ordenar cursos
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'lessons':
                    return b.totalLessons - a.totalLessons;
                case 'modules':
                    return b.totalModules - a.totalModules;
                case 'updated':
                    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
                case 'type':
                    return a.type.localeCompare(b.type);
                default:
                    return 0;
            }
        });

        setFilteredCourses(filtered);
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Erro</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button onClick={fetchCourses}>Tentar Novamente</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Cursos Processados
                </h1>
                <p className="text-gray-600">
                    Explore todos os cursos com conteúdo expandido e exemplos de código
                </p>
            </div>

            {/* Filtros */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Busca */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Buscar cursos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Filtro por tipo */}
                    <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os tipos</SelectItem>
                            {Object.entries(typeLabels).map(([key, label]) => (
                                <SelectItem key={key} value={key}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Ordenação */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Ordenar por" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Nome</SelectItem>
                            <SelectItem value="lessons">Aulas</SelectItem>
                            <SelectItem value="modules">Módulos</SelectItem>
                            <SelectItem value="updated">Atualizado</SelectItem>
                            <SelectItem value="type">Tipo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Estatísticas */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {filteredCourses.length} cursos
                    </span>
                    <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {filteredCourses.reduce((sum, course) => sum + course.totalLessons, 0)} aulas
                    </span>
                    <span className="flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        {filteredCourses.reduce((sum, course) => sum + course.stats.codeExamples, 0)} exemplos
                    </span>
                </div>
            </div>

            {/* Lista de cursos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <Card key={course.slug} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-lg mb-2">{course.name}</CardTitle>
                                    <CardDescription className="text-sm text-gray-600 mb-3">
                                        {course.description}
                                    </CardDescription>
                                </div>
                                <Badge className={`${typeColors[course.type] || 'bg-gray-100 text-gray-800'}`}>
                                    {typeLabels[course.type] || course.type}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {/* Estatísticas */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-blue-500" />
                                        <span>{course.totalModules} módulos</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-green-500" />
                                        <span>{course.totalLessons} aulas</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Code className="h-4 w-4 text-purple-500" />
                                        <span>{course.stats.codeExamples} exemplos</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-orange-500" />
                                        <span>{course.stats.averageModuleSize} aulas/módulo</span>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${course.hasContent ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <span className="text-sm text-gray-600">
                                            {course.hasContent ? 'Conteúdo disponível' : 'Sem conteúdo'}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        Atualizado em {formatDate(course.lastUpdated)}
                                    </span>
                                </div>

                                {/* Ações */}
                                <div className="pt-2">
                                    <Link href={`/processed-courses/${course.slug}`}>
                                        <Button
                                            className="w-full"
                                            disabled={!course.hasContent}
                                        >
                                            {course.hasContent ? 'Explorar Curso' : 'Conteúdo Indisponível'}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhum curso encontrado
                    </h3>
                    <p className="text-gray-600">
                        Tente ajustar os filtros ou termos de busca
                    </p>
                </div>
            )}
        </div>
    );
}




























