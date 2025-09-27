'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Award,
    Download,
    Share,
    Eye,
    CheckCircle,
    Star,
    Calendar,
    Clock,
    User,
    Code,
    BookOpen,
    Zap,
    Globe,
    Shield,
    ArrowRight,
    Search,
    MessageCircle,
    Home,
    ChevronRight,
    Filter,
    ExternalLink,
    Copy,
    TrendingUp,
    Target,
    Trophy,
    Medal,
    Gift,
    Bell,
    Settings,
    Plus,
    FileText,
    QrCode,
    Share2,
    Upload,
    RefreshCw,
    Verified,
    AlertCircle
} from 'lucide-react';
import { PageWrapperFunctional } from '@/components/PageWrapperFunctional';
import FenixLogo from '@/components/FenixLogo';
import { ROUTES } from '@/lib/routes';

interface Certificate {
    id: string;
    title: string;
    course: string;
    instructor: string;
    issueDate: string;
    status: 'completed' | 'in-progress' | 'expired';
    grade: number;
    maxGrade: number;
    verificationCode: string;
    isVerified: boolean;
    skills: string[];
}

export default function CertificatesPage() {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const certificates: Certificate[] = [
        {
            id: '1',
            title: 'Certificado de Conclusão',
            course: 'Python para Data Science',
            instructor: 'Dr. Ana Silva',
            issueDate: '2025-01-15',
            status: 'completed',
            grade: 95,
            maxGrade: 100,
            verificationCode: 'FENIX-PYTHON-2025-001',
            isVerified: true,
            skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
        },
        {
            id: '2',
            title: 'Certificado de Conclusão',
            course: 'React.js Avançado',
            instructor: 'Carlos Mendes',
            issueDate: '2025-01-10',
            status: 'completed',
            grade: 88,
            maxGrade: 100,
            verificationCode: 'FENIX-REACT-2025-002',
            isVerified: true,
            skills: ['React', 'TypeScript', 'Next.js', 'Hooks']
        },
        {
            id: '3',
            title: 'Certificado de Conclusão',
            course: 'Node.js e APIs REST',
            instructor: 'Maria Santos',
            issueDate: '2025-01-05',
            status: 'completed',
            grade: 92,
            maxGrade: 100,
            verificationCode: 'FENIX-NODEJS-2025-003',
            isVerified: true,
            skills: ['Node.js', 'Express', 'MongoDB', 'JWT']
        },
        {
            id: '4',
            title: 'Certificado de Conclusão',
            course: 'Flutter Mobile Development',
            instructor: 'João Oliveira',
            issueDate: '2025-01-01',
            status: 'in-progress',
            grade: 75,
            maxGrade: 100,
            verificationCode: 'FENIX-FLUTTER-2025-004',
            isVerified: false,
            skills: ['Flutter', 'Dart', 'Mobile Development']
        }
    ];

    const statusOptions = [
        { id: 'all', name: 'Todos', color: 'bg-gray-600' },
        { id: 'completed', name: 'Concluídos', color: 'bg-green-600' },
        { id: 'in-progress', name: 'Em Progresso', color: 'bg-yellow-600' },
        { id: 'expired', name: 'Expirados', color: 'bg-red-600' }
    ];

    const filteredCertificates = certificates.filter(cert => {
        const matchesStatus = selectedStatus === 'all' || cert.status === selectedStatus;
        const matchesSearch = cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cert.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-600';
            case 'in-progress': return 'bg-yellow-600';
            case 'expired': return 'bg-red-600';
            default: return 'bg-gray-600';
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Concluído';
            case 'in-progress': return 'Em Progresso';
            case 'expired': return 'Expirado';
            default: return 'Desconhecido';
        }
    }

    const getGradeColor = (grade: number) => {
        if (grade >= 90) return 'text-green-500';
        if (grade >= 80) return 'text-yellow-500';
        if (grade >= 70) return 'text-orange-500';
        return 'text-red-500';
    }

    return (
        <PageWrapperFunctional>
            <div className="min-h-screen theme-bg">
                {/* Header */}
                <header className="theme-surface border-b theme-border sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <FenixLogo className="w-8 h-8" />
                                <div>
                                    <h1 className="text-xl font-bold theme-text">Certificados</h1>
                                    <p className="text-sm theme-text-secondary">Fenix Academy</p>
                                </div>
                            </div>

                            <nav className="hidden lg:flex items-center space-x-8">
                                <Link href={ROUTES.COURSES} className="theme-text-secondary hover:theme-primary transition-colors">Cursos</Link>
                                <Link href={ROUTES.IDE_ADVANCED} className="theme-text-secondary hover:theme-primary transition-colors">IDE</Link>
                                <Link href={ROUTES.AI} className="theme-text-secondary hover:theme-primary transition-colors">IA</Link>
                                <Link href="/certificates" className="theme-primary font-semibold">Certificados</Link>
                            </nav>

                            <div className="flex items-center space-x-4">
                                <button className="p-2 theme-surface hover:theme-surface-hover border theme-border rounded-lg transition-colors">
                                    <Bell className="w-4 h-4 theme-text" />
                                </button>
                                <button className="theme-gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Novo Certificado
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm theme-text-secondary mb-8">
                        <Home className="w-4 h-4" />
                        <ChevronRight className="w-4 h-4" />
                        <Link href={ROUTES.DASHBOARD} className="hover:theme-primary transition-colors">Dashboard</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="theme-text font-medium">Certificados</span>
                    </div>

                    {/* Hero Section */}
                    <div className="theme-gradient-background rounded-2xl p-8 mb-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 theme-gradient-primary/20 rounded-2xl flex items-center justify-center">
                                    <Award className="w-8 h-8 theme-primary" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        Meus Certificados
                                    </h1>
                                    <p className="text-white/80">
                                        Visualize, compartilhe e gerencie todos os seus certificados de conclusão
                                    </p>
                                </div>
                            </div>

                            {/* Search and Filters */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Buscar certificados..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 theme-surface border theme-border rounded-lg theme-text placeholder-theme-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="px-4 py-3 theme-surface border theme-border rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status.id} value={status.id}>{status.name}</option>
                                    ))}
                                </select>

                                <button className="px-4 py-3 theme-surface hover:theme-surface-hover border theme-border rounded-lg transition-colors flex items-center gap-2">
                                    <Filter className="w-4 h-4 theme-text" />
                                    <span className="hidden sm:inline theme-text">Filtrar</span>
                                </button>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                            <Trophy className="w-full h-full text-white" />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="theme-surface rounded-xl p-6 border theme-border hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold theme-text">
                                        {certificates.filter(c => c.status === 'completed').length}
                                    </div>
                                    <div className="text-sm theme-text-secondary">Concluídos</div>
                                </div>
                            </div>
                            <div className="flex items-center text-green-500 text-sm">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                +2 este mês
                            </div>
                        </div>

                        <div className="theme-surface rounded-xl p-6 border theme-border hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold theme-text">
                                        {certificates.filter(c => c.status === 'in-progress').length}
                                    </div>
                                    <div className="text-sm theme-text-secondary">Em Progresso</div>
                                </div>
                            </div>
                            <div className="flex items-center text-yellow-500 text-sm">
                                <Target className="w-4 h-4 mr-1" />
                                75% concluído
                            </div>
                        </div>

                        <div className="theme-surface rounded-xl p-6 border theme-border hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                    <Verified className="w-6 h-6 text-blue-500" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold theme-text">
                                        {certificates.filter(c => c.isVerified).length}
                                    </div>
                                    <div className="text-sm theme-text-secondary">Verificados</div>
                                </div>
                            </div>
                            <div className="flex items-center text-blue-500 text-sm">
                                <Shield className="w-4 h-4 mr-1" />
                                100% validados
                            </div>
                        </div>

                        <div className="theme-surface rounded-xl p-6 border theme-border hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                    <Trophy className="w-6 h-6 text-purple-500" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold theme-text">
                                        {Math.round(certificates.reduce((acc, cert) => acc + cert.grade, 0) / certificates.length)}
                                    </div>
                                    <div className="text-sm theme-text-secondary">Média Geral</div>
                                </div>
                            </div>
                            <div className="flex items-center text-purple-500 text-sm">
                                <Star className="w-4 h-4 mr-1" />
                                Excelente desempenho
                            </div>
                        </div>
                    </div>

                    {/* Certificates Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCertificates.map((certificate) => (
                            <div key={certificate.id} className="theme-surface rounded-xl overflow-hidden border theme-border hover:shadow-xl transition-all duration-300 group hover:scale-105">
                                {/* Certificate Header */}
                                <div className="relative h-48 theme-gradient-primary">
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <Award className="w-16 h-16 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                                            <h3 className="text-xl font-bold text-white px-4">{certificate.course}</h3>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${certificate.status === 'completed' ? 'bg-green-500' :
                                            certificate.status === 'in-progress' ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}>
                                            {getStatusText(certificate.status)}
                                        </div>
                                    </div>
                                    {certificate.isVerified && (
                                        <div className="absolute top-4 left-4">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Certificate Content */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-bold theme-text">{certificate.title}</h4>
                                        <div className="flex items-center space-x-2">
                                            <span className={`text-2xl font-bold ${getGradeColor(certificate.grade)}`}>
                                                {certificate.grade}
                                            </span>
                                            <span className="theme-text-secondary">/ {certificate.maxGrade}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center text-sm theme-text-secondary">
                                            <User className="w-4 h-4 mr-2 theme-primary" />
                                            <span>{certificate.instructor}</span>
                                        </div>
                                        <div className="flex items-center text-sm theme-text-secondary">
                                            <Calendar className="w-4 h-4 mr-2 theme-primary" />
                                            <span>{new Date(certificate.issueDate).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                        <div className="flex items-center text-sm theme-text-secondary">
                                            <QrCode className="w-4 h-4 mr-2 theme-primary" />
                                            <span className="font-mono text-xs">{certificate.verificationCode}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {certificate.skills.slice(0, 3).map((skill, index) => (
                                            <span key={index} className="px-3 py-1 theme-gradient-primary/20 theme-primary text-xs rounded-full font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                        {certificate.skills.length > 3 && (
                                            <span className="px-3 py-1 theme-surface-hover theme-text-secondary text-xs rounded-full font-medium">
                                                +{certificate.skills.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-2">
                                            <button className="p-2 theme-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-300 group">
                                                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            </button>
                                            <button className="p-2 theme-surface hover:theme-surface-hover border theme-border rounded-lg transition-colors">
                                                <Share2 className="w-4 h-4 theme-text" />
                                            </button>
                                            <button className="p-2 theme-surface hover:theme-surface-hover border theme-border rounded-lg transition-colors">
                                                <Eye className="w-4 h-4 theme-text" />
                                            </button>
                                            <button className="p-2 theme-surface hover:theme-surface-hover border theme-border rounded-lg transition-colors">
                                                <Copy className="w-4 h-4 theme-text" />
                                            </button>
                                        </div>
                                        <button className="theme-primary hover:theme-primary/80 text-sm font-semibold transition-colors flex items-center gap-1">
                                            Ver Detalhes
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCertificates.length === 0 && (
                        <div className="text-center py-16 theme-surface rounded-xl border theme-border">
                            <div className="w-24 h-24 theme-gradient-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="w-12 h-12 theme-primary" />
                            </div>
                            <h3 className="text-2xl font-bold theme-text mb-4">Nenhum certificado encontrado</h3>
                            <p className="theme-text-secondary mb-8">Tente ajustar os filtros ou termo de busca</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedStatus('all');
                                }}
                                className="theme-gradient-primary text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="theme-gradient-background rounded-2xl p-8 mt-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Quer ganhar mais certificados?
                            </h2>
                            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                                Explore nossos cursos e adicione mais certificados ao seu portfólio profissional
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={ROUTES.COURSES}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Ver Cursos
                                </Link>
                                <Link
                                    href="/comecar-agora"
                                    className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                    Começar Agora
                                </Link>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                            <Medal className="w-full h-full text-white" />
                        </div>
                    </div>

                    {/* Floating Actions */}
                    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                        <button className="theme-gradient-primary text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="bg-purple-500 hover:bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                            <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapperFunctional>
    );
}