'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Award,
    Download,
    Share2,
    Eye,
    Calendar,
    Clock,
    Star,
    CheckCircle,
    Trophy,
    Medal,
    Award as Certificate,
    Filter,
    Search,
    SortAsc,
    SortDesc
} from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';

interface Certificate {
    id: string;
    title: string;
    course: string;
    instructor: string;
    issuedDate: string;
    expiryDate?: string;
    grade: number;
    status: 'completed' | 'in-progress' | 'expired';
    verificationCode: string;
    imageUrl: string;
    description: string;
    skills: string[];
    hours: number;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

const mockCertificates: Certificate[] = [
    {
        id: '1',
        title: 'Desenvolvimento Web Completo',
        course: 'Full Stack Web Development',
        instructor: 'Prof. João Silva',
        issuedDate: '2024-01-15',
        expiryDate: '2026-01-15',
        grade: 95,
        status: 'completed',
        verificationCode: 'FENIX-WEB-2024-001',
        imageUrl: '/api/placeholder/400/300',
        description: 'Certificado de conclusão do curso completo de desenvolvimento web, incluindo HTML, CSS, JavaScript, React, Node.js e banco de dados.',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        hours: 120,
        level: 'advanced'
    },
    {
        id: '2',
        title: 'Python para Data Science',
        course: 'Data Science Fundamentals',
        instructor: 'Prof. Maria Santos',
        issuedDate: '2024-02-20',
        grade: 88,
        status: 'completed',
        verificationCode: 'FENIX-PYTHON-2024-002',
        imageUrl: '/api/placeholder/400/300',
        description: 'Certificado de conclusão do curso de Python aplicado à ciência de dados, incluindo análise estatística e machine learning.',
        skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
        hours: 80,
        level: 'intermediate'
    },
    {
        id: '3',
        title: 'Fundamentos de UI/UX Design',
        course: 'Digital Design Mastery',
        instructor: 'Prof. Ana Costa',
        issuedDate: '2024-03-10',
        grade: 92,
        status: 'completed',
        verificationCode: 'FENIX-DESIGN-2024-003',
        imageUrl: '/api/placeholder/400/300',
        description: 'Certificado de conclusão do curso de design de interface e experiência do usuário.',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
        hours: 60,
        level: 'intermediate'
    },
    {
        id: '4',
        title: 'DevOps e Cloud Computing',
        course: 'Cloud Infrastructure',
        instructor: 'Prof. Carlos Lima',
        issuedDate: '2024-04-05',
        grade: 0,
        status: 'in-progress',
        verificationCode: 'FENIX-DEVOPS-2024-004',
        imageUrl: '/api/placeholder/400/300',
        description: 'Curso em andamento sobre DevOps e computação em nuvem.',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
        hours: 100,
        level: 'advanced'
    }
];

export default function CertificatesPage() {
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
    const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>(mockCertificates);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [levelFilter, setLevelFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    // Filtros e busca
    useEffect(() => {
        let filtered = certificates;

        // Filtro por status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(cert => cert.status === statusFilter);
        }

        // Filtro por nível
        if (levelFilter !== 'all') {
            filtered = filtered.filter(cert => cert.level === levelFilter);
        }

        // Busca por texto
        if (searchTerm) {
            filtered = filtered.filter(cert =>
                cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cert.instructor.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Ordenação
        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'date':
                    comparison = new Date(a.issuedDate).getTime() - new Date(b.issuedDate).getTime();
                    break;
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'grade':
                    comparison = a.grade - b.grade;
                    break;
                case 'hours':
                    comparison = a.hours - b.hours;
                    break;
                default:
                    comparison = 0;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        setFilteredCertificates(filtered);
    }, [certificates, searchTerm, statusFilter, levelFilter, sortBy, sortOrder]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-100';
            case 'in-progress': return 'text-blue-600 bg-blue-100';
            case 'expired': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'in-progress': return <Clock className="w-4 h-4" />;
            case 'expired': return <Trophy className="w-4 h-4" />;
            default: return <Certificate className="w-4 h-4" />;
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'text-green-600 bg-green-100';
            case 'intermediate': return 'text-yellow-600 bg-yellow-100';
            case 'advanced': return 'text-orange-600 bg-orange-100';
            case 'expert': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const handleDownload = (certificate: Certificate) => {
        // Simular download do certificado
        console.log('Downloading certificate:', certificate.title);
        // Aqui você implementaria a lógica real de download
    };

    const handleShare = (certificate: Certificate) => {
        // Simular compartilhamento do certificado
        console.log('Sharing certificate:', certificate.title);
        // Aqui você implementaria a lógica real de compartilhamento
    };

    const handleView = (certificate: Certificate) => {
        setSelectedCertificate(certificate);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                Meus Certificados
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Visualize e gerencie todos os seus certificados conquistados
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {certificates.filter(c => c.status === 'completed').length} Conquistados
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {certificates.filter(c => c.status === 'in-progress').length} Em Andamento
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtros e Busca */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Busca */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar certificados..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Filtro por Status */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="completed">Concluídos</option>
                            <option value="in-progress">Em Andamento</option>
                            <option value="expired">Expirados</option>
                        </select>

                        {/* Filtro por Nível */}
                        <select
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="all">Todos os Níveis</option>
                            <option value="beginner">Iniciante</option>
                            <option value="intermediate">Intermediário</option>
                            <option value="advanced">Avançado</option>
                            <option value="expert">Expert</option>
                        </select>

                        {/* Ordenação */}
                        <div className="flex space-x-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="date">Data</option>
                                <option value="title">Título</option>
                                <option value="grade">Nota</option>
                                <option value="hours">Horas</option>
                            </select>
                            <button
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Certificados */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                {filteredCertificates.length === 0 ? (
                    <div className="text-center py-12">
                        <Certificate className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Nenhum certificado encontrado
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Tente ajustar os filtros ou comece um novo curso.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCertificates.map((certificate) => (
                            <motion.div
                                key={certificate.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
                            >
                                {/* Imagem do Certificado */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                                    <div className="absolute top-4 right-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                                            {getStatusIcon(certificate.status)}
                                            <span className="ml-1 capitalize">{certificate.status}</span>
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-semibold text-lg mb-1">
                                            {certificate.title}
                                        </h3>
                                        <p className="text-white text-sm opacity-90">
                                            {certificate.course}
                                        </p>
                                    </div>
                                </div>

                                {/* Conteúdo do Certificado */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Medal className="w-4 h-4 text-yellow-500" />
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(certificate.level)}`}>
                                                {certificate.level}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {certificate.grade}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span>Emitido em {new Date(certificate.issuedDate).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <Clock className="w-4 h-4 mr-2" />
                                            <span>{certificate.hours} horas</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <Award className="w-4 h-4 mr-2" />
                                            <span>Prof. {certificate.instructor}</span>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {certificate.skills.slice(0, 3).map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                            {certificate.skills.length > 3 && (
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                                    +{certificate.skills.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Ações */}
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleView(certificate)}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            Ver
                                        </button>
                                        {certificate.status === 'completed' && (
                                            <>
                                                <button
                                                    onClick={() => handleDownload(certificate)}
                                                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Baixar
                                                </button>
                                                <button
                                                    onClick={() => handleShare(certificate)}
                                                    className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                                >
                                                    <Share2 className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de Visualização do Certificado */}
            {selectedCertificate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {selectedCertificate.title}
                                </h2>
                                <button
                                    onClick={() => setSelectedCertificate(null)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <span className="sr-only">Fechar</span>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Imagem do Certificado */}
                                <div className="relative">
                                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
                                        <div className="absolute inset-0 bg-black bg-opacity-20" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white">
                                                <Certificate className="w-16 h-16 mx-auto mb-4" />
                                                <h3 className="text-xl font-bold mb-2">{selectedCertificate.title}</h3>
                                                <p className="text-sm opacity-90">{selectedCertificate.course}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detalhes do Certificado */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            Detalhes do Certificado
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Código de Verificação:</span>
                                                <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                    {selectedCertificate.verificationCode}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Data de Emissão:</span>
                                                <span>{new Date(selectedCertificate.issuedDate).toLocaleDateString('pt-BR')}</span>
                                            </div>
                                            {selectedCertificate.expiryDate && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Data de Expiração:</span>
                                                    <span>{new Date(selectedCertificate.expiryDate).toLocaleDateString('pt-BR')}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Nota:</span>
                                                <span className="font-semibold">{selectedCertificate.grade}%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Horas:</span>
                                                <span>{selectedCertificate.hours} horas</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Instrutor:</span>
                                                <span>Prof. {selectedCertificate.instructor}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                                            Habilidades Desenvolvidas
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCertificate.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                                            Descrição
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {selectedCertificate.description}
                                        </p>
                                    </div>

                                    {selectedCertificate.status === 'completed' && (
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleDownload(selectedCertificate)}
                                                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Baixar Certificado
                                            </button>
                                            <button
                                                onClick={() => handleShare(selectedCertificate)}
                                                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                            >
                                                <Share2 className="w-4 h-4 mr-2" />
                                                Compartilhar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


