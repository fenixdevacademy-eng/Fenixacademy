import React, { useState } from 'react';
import {
    Trophy,
    Award,
    Download,
    Share2,
    CheckCircle,
    Clock,
    Star,
    ExternalLink,
    Eye,
    Printer,
    Mail,
    Linkedin,
    Twitter,
    Facebook
} from 'lucide-react';

interface Certificate {
    id: string;
    title: string;
    level: 'iniciante' | 'intermediario' | 'avancado' | 'expert';
    course: string;
    modules: number[];
    status: 'not-started' | 'in-progress' | 'completed';
    completedDate?: string;
    score?: number;
    validUntil?: string;
    credentialId: string;
    description: string;
    skills: string[];
    requirements: string[];
}

interface Assessment {
    id: string;
    certificateId: string;
    title: string;
    type: 'theoretical' | 'practical';
    status: 'not-started' | 'in-progress' | 'completed';
    score?: number;
    maxScore: number;
    duration: string;
    questions?: number;
}

const CertificateSystem: React.FC = () => {
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [showAssessment, setShowAssessment] = useState(false);
    const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

    const certificates: Certificate[] = [
        {
            id: 'web-iniciante',
            title: 'Web Developer Iniciante',
            level: 'iniciante',
            course: 'Web Fundamentals',
            modules: [1, 2, 3, 4, 5],
            status: 'completed',
            completedDate: '2024-01-15',
            score: 95,
            validUntil: '2026-01-15',
            credentialId: 'FENIX-WD-001-2024',
            description: 'Certifica conhecimento em fundamentos de desenvolvimento web, incluindo HTML5, CSS3 e JavaScript básico.',
            skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'DOM Manipulation'],
            requirements: ['Conclusão dos módulos 1-5', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'web-intermediario',
            title: 'Web Developer Intermediário',
            level: 'intermediario',
            course: 'Web Fundamentals',
            modules: [6, 7, 8, 9, 10],
            status: 'in-progress',
            score: 78,
            credentialId: 'FENIX-WD-002-2024',
            description: 'Certifica conhecimento intermediário em desenvolvimento web, incluindo APIs, responsividade e performance.',
            skills: ['AJAX', 'APIs', 'Local Storage', 'CSS Grid', 'CSS Flexbox'],
            requirements: ['Conclusão dos módulos 6-10', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'web-avancado',
            title: 'Web Developer Avançado',
            level: 'avancado',
            course: 'Web Fundamentals',
            modules: [11, 12, 13, 14, 15],
            status: 'not-started',
            credentialId: 'FENIX-WD-003-2024',
            description: 'Certifica conhecimento avançado em desenvolvimento web, incluindo PWA, SEO e acessibilidade.',
            skills: ['PWA', 'Web APIs', 'Performance', 'Acessibilidade', 'SEO'],
            requirements: ['Conclusão dos módulos 11-15', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'web-expert',
            title: 'Web Developer Expert',
            level: 'expert',
            course: 'Web Fundamentals',
            modules: [16, 17, 18, 19, 20],
            status: 'not-started',
            credentialId: 'FENIX-WD-004-2024',
            description: 'Certifica expertise em desenvolvimento web, incluindo testing, build tools e deploy.',
            skills: ['Testing', 'Build Tools', 'Deploy', 'Performance', 'Arquitetura'],
            requirements: ['Conclusão dos módulos 16-20', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'react-iniciante',
            title: 'React Developer Iniciante',
            level: 'iniciante',
            course: 'React & Frontend Avançado',
            modules: [21, 22, 23, 24, 25],
            status: 'not-started',
            credentialId: 'FENIX-RD-001-2024',
            description: 'Certifica conhecimento em fundamentos do React, incluindo componentes, props e state.',
            skills: ['React', 'JSX', 'Components', 'Props', 'State'],
            requirements: ['Conclusão dos módulos 21-25', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'react-intermediario',
            title: 'React Developer Intermediário',
            level: 'intermediario',
            course: 'React & Frontend Avançado',
            modules: [26, 27, 28, 29, 30],
            status: 'not-started',
            credentialId: 'FENIX-RD-002-2024',
            description: 'Certifica conhecimento intermediário em React, incluindo hooks, context e routing.',
            skills: ['Hooks', 'Context API', 'React Router', 'Forms', 'API Integration'],
            requirements: ['Conclusão dos módulos 26-30', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'react-avancado',
            title: 'React Developer Avançado',
            level: 'avancado',
            course: 'React & Frontend Avançado',
            modules: [31, 32, 33, 34, 35],
            status: 'not-started',
            credentialId: 'FENIX-RD-003-2024',
            description: 'Certifica conhecimento avançado em React, incluindo Redux, testing e performance.',
            skills: ['Redux', 'State Management', 'Testing', 'Performance', 'Architecture'],
            requirements: ['Conclusão dos módulos 31-35', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'react-expert',
            title: 'React Developer Expert',
            level: 'expert',
            course: 'React & Frontend Avançado',
            modules: [36, 37, 38, 39, 40],
            status: 'not-started',
            credentialId: 'FENIX-RD-004-2024',
            description: 'Certifica expertise em React, incluindo Next.js, TypeScript e deploy.',
            skills: ['Next.js', 'TypeScript', 'Deploy', 'Performance', 'Best Practices'],
            requirements: ['Conclusão dos módulos 36-40', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'backend-iniciante',
            title: 'Backend Developer Iniciante',
            level: 'iniciante',
            course: 'Backend & Full-Stack',
            modules: [41, 42, 43, 44, 45],
            status: 'not-started',
            credentialId: 'FENIX-BD-001-2024',
            description: 'Certifica conhecimento em fundamentos de backend, incluindo Node.js e Express.',
            skills: ['Node.js', 'Express', 'Middleware', 'Routing', 'Templates'],
            requirements: ['Conclusão dos módulos 41-45', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'backend-intermediario',
            title: 'Backend Developer Intermediário',
            level: 'intermediario',
            course: 'Backend & Full-Stack',
            modules: [46, 47, 48, 49, 50],
            status: 'not-started',
            credentialId: 'FENIX-BD-002-2024',
            description: 'Certifica conhecimento intermediário em backend, incluindo autenticação e banco de dados.',
            skills: ['Authentication', 'Sessions', 'Database', 'Security', 'Validation'],
            requirements: ['Conclusão dos módulos 46-50', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'backend-avancado',
            title: 'Backend Developer Avançado',
            level: 'avancado',
            course: 'Backend & Full-Stack',
            modules: [51, 52, 53, 54, 55],
            status: 'not-started',
            credentialId: 'FENIX-BD-003-2024',
            description: 'Certifica conhecimento avançado em backend, incluindo APIs REST e MongoDB.',
            skills: ['MongoDB', 'REST APIs', 'API Design', 'Error Handling', 'Testing'],
            requirements: ['Conclusão dos módulos 51-55', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'backend-expert',
            title: 'Backend Developer Expert',
            level: 'expert',
            course: 'Backend & Full-Stack',
            modules: [56, 57, 58, 59, 60],
            status: 'not-started',
            credentialId: 'FENIX-BD-004-2024',
            description: 'Certifica expertise em backend, incluindo Docker, deploy e arquitetura.',
            skills: ['Docker', 'Deploy', 'Architecture', 'Microservices', 'DevOps'],
            requirements: ['Conclusão dos módulos 56-60', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        }
    ];

    const assessments: Assessment[] = [
        {
            id: 'web-iniciante-theoretical',
            certificateId: 'web-iniciante',
            title: 'Avaliação Teórica - Web Developer Iniciante',
            type: 'theoretical',
            status: 'completed',
            score: 95,
            maxScore: 100,
            duration: '90 min',
            questions: 50
        },
        {
            id: 'web-iniciante-practical',
            certificateId: 'web-iniciante',
            title: 'Avaliação Prática - Web Developer Iniciante',
            type: 'practical',
            status: 'completed',
            score: 92,
            maxScore: 100,
            duration: '7 dias'
        },
        {
            id: 'web-intermediario-theoretical',
            certificateId: 'web-intermediario',
            title: 'Avaliação Teórica - Web Developer Intermediário',
            type: 'theoretical',
            status: 'in-progress',
            score: 78,
            maxScore: 100,
            duration: '90 min',
            questions: 50
        },
        {
            id: 'web-intermediario-practical',
            certificateId: 'web-intermediario',
            title: 'Avaliação Prática - Web Developer Intermediário',
            type: 'practical',
            status: 'not-started',
            maxScore: 100,
            duration: '7 dias'
        }
    ];

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'iniciante': return 'bg-green-100 text-green-800';
            case 'intermediario': return 'bg-blue-100 text-blue-800';
            case 'avancado': return 'bg-orange-100 text-orange-800';
            case 'expert': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'not-started': return 'bg-gray-100 text-gray-800';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'not-started': return <Clock className="w-4 h-4" />;
            case 'in-progress': return <Star className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    }

    const getCourseColor = (course: string) => {
        switch (course) {
            case 'Web Fundamentals': return 'bg-blue-100 text-blue-800';
            case 'React & Frontend Avançado': return 'bg-green-100 text-green-800';
            case 'Backend & Full-Stack': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const filteredCertificates = certificates.filter(cert =>
        selectedCertificate ? cert.id === selectedCertificate.id : true
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🏆 Sistema de Certificados
                            </h1>
                            <p className="text-gray-600 mt-2">
                                12 Certificados Profissionais • Validação de Conhecimento
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">
                                    {certificates.filter(c => c.status === 'completed').length}
                                </div>
                                <div className="text-sm text-gray-500">Concluídos</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {certificates.filter(c => c.status === 'in-progress').length}
                                </div>
                                <div className="text-sm text-gray-500">Em Andamento</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-600">
                                    {certificates.filter(c => c.status === 'not-started').length}
                                </div>
                                <div className="text-sm text-gray-500">Disponíveis</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Certificates List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Meus Certificados</h2>
                            <div className="space-y-4">
                                {filteredCertificates.map((certificate) => (
                                    <div
                                        key={certificate.id}
                                        className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${selectedCertificate?.id === certificate.id
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                        onClick={() => setSelectedCertificate(certificate)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <Trophy className="w-6 h-6 text-yellow-500" />
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {certificate.title}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(certificate.level)}`}>
                                                        {certificate.level}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-4 mb-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCourseColor(certificate.course)}`}>
                                                        {certificate.course}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(certificate.status)}`}>
                                                        {getStatusIcon(certificate.status)}
                                                        <span className="ml-1">{certificate.status}</span>
                                                    </span>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-3">{certificate.description}</p>

                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <span>Módulos: {certificate.modules.join(', ')}</span>
                                                    {certificate.score && (
                                                        <span>Nota: {certificate.score}%</span>
                                                    )}
                                                    {certificate.completedDate && (
                                                        <span>Concluído: {new Date(certificate.completedDate).toLocaleDateString('pt-BR')}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="lg:col-span-1">
                        {selectedCertificate ? (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Detalhes do Certificado</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Informações</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">ID:</span>
                                                <span className="font-mono">{selectedCertificate.credentialId}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Nível:</span>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(selectedCertificate.level)}`}>
                                                    {selectedCertificate.level}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Curso:</span>
                                                <span className="text-right">{selectedCertificate.course}</span>
                                            </div>
                                            {selectedCertificate.score && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Nota:</span>
                                                    <span className="font-semibold text-green-600">{selectedCertificate.score}%</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Habilidades</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCertificate.skills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Requisitos</h3>
                                        <ul className="space-y-1 text-sm text-gray-600">
                                            {selectedCertificate.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start space-x-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-3">
                                        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                                            <Download className="w-4 h-4 mr-2" />
                                            Baixar Certificado
                                        </button>
                                        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                                            <Share2 className="w-4 h-4 mr-2" />
                                            Compartilhar
                                        </button>
                                        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Ver no LinkedIn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="text-center">
                                    <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Selecione um Certificado
                                    </h3>
                                    <p className="text-gray-600">
                                        Clique em um certificado para ver os detalhes
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowAssessment(true)}
                                    className="w-full flex items-center justify-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                                >
                                    <Award className="w-4 h-4 mr-2" />
                                    Iniciar Avaliação
                                </button>
                                <button className="w-full flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Ver no LinkedIn
                                </button>
                                <button className="w-full flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                                    <Download className="w-4 h-4 mr-2" />
                                    Baixar Todos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assessment Modal */}
                {showAssessment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Avaliações Disponíveis</h2>
                                    <button
                                        onClick={() => setShowAssessment(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {assessments.map((assessment) => (
                                        <div key={assessment.id} className="bg-gray-50 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold text-gray-900">{assessment.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(assessment.status)}`}>
                                                    {getStatusIcon(assessment.status)}
                                                    <span className="ml-1">{assessment.status}</span>
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="text-sm text-gray-600">
                                                    <strong>Tipo:</strong> {assessment.type === 'theoretical' ? 'Teórica' : 'Prática'}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <strong>Duração:</strong> {assessment.duration}
                                                </div>
                                                {assessment.questions && (
                                                    <div className="text-sm text-gray-600">
                                                        <strong>Questões:</strong> {assessment.questions}
                                                    </div>
                                                )}
                                                {assessment.score && (
                                                    <div className="text-sm text-gray-600">
                                                        <strong>Nota:</strong> {assessment.score}/{assessment.maxScore}
                                                    </div>
                                                )}

                                                <div className="flex space-x-2 mt-4">
                                                    <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                                        {assessment.status === 'not-started' ? 'Iniciar' : 'Continuar'}
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CertificateSystem;

import {
    Trophy,
    Award,
    Download,
    Share2,
    CheckCircle,
    Clock,
    Star,
    ExternalLink,
    Eye,
    Printer,
    Mail,
    Linkedin,
    Twitter,
    Facebook
} from 'lucide-react';

interface Certificate {
    id: string;
    title: string;
    level: 'iniciante' | 'intermediario' | 'avancado' | 'expert';
    course: string;
    modules: number[];
    status: 'not-started' | 'in-progress' | 'completed';
    completedDate?: string;
    score?: number;
    validUntil?: string;
    credentialId: string;
    description: string;
    skills: string[];
    requirements: string[];
}

interface Assessment {
    id: string;
    certificateId: string;
    title: string;
    type: 'theoretical' | 'practical';
    status: 'not-started' | 'in-progress' | 'completed';
    score?: number;
    maxScore: number;
    duration: string;
    questions?: number;
}

const CertificateSystem: React.FC = () => {
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [showAssessment, setShowAssessment] = useState(false);
    const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

    const certificates: Certificate[] = [
        {
            id: 'web-iniciante',
            title: 'Web Developer Iniciante',
            level: 'iniciante',
            course: 'Web Fundamentals',
            modules: [1, 2, 3, 4, 5],
            status: 'completed',
            completedDate: '2024-01-15',
            score: 95,
            validUntil: '2026-01-15',
            credentialId: 'FENIX-WD-001-2024',
            description: 'Certifica conhecimento em fundamentos de desenvolvimento web, incluindo HTML5, CSS3 e JavaScript básico.',
            skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'DOM Manipulation'],
            requirements: ['Conclusão dos módulos 1-5', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'web-intermediario',
            title: 'Web Developer Intermediário',
            level: 'intermediario',
            course: 'Web Fundamentals',
            modules: [6, 7, 8, 9, 10],
            status: 'in-progress',
            score: 78,
            credentialId: 'FENIX-WD-002-2024',
            description: 'Certifica conhecimento intermediário em desenvolvimento web, incluindo APIs, responsividade e performance.',
            skills: ['AJAX', 'APIs', 'Local Storage', 'CSS Grid', 'CSS Flexbox'],
            requirements: ['Conclusão dos módulos 6-10', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'web-avancado',
            title: 'Web Developer Avançado',
            level: 'avancado',
            course: 'Web Fundamentals',
            modules: [11, 12, 13, 14, 15],
            status: 'not-started',
            credentialId: 'FENIX-WD-003-2024',
            description: 'Certifica conhecimento avançado em desenvolvimento web, incluindo PWA, SEO e acessibilidade.',
            skills: ['PWA', 'Web APIs', 'Performance', 'Acessibilidade', 'SEO'],
            requirements: ['Conclusão dos módulos 11-15', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'web-expert',
            title: 'Web Developer Expert',
            level: 'expert',
            course: 'Web Fundamentals',
            modules: [16, 17, 18, 19, 20],
            status: 'not-started',
            credentialId: 'FENIX-WD-004-2024',
            description: 'Certifica expertise em desenvolvimento web, incluindo testing, build tools e deploy.',
            skills: ['Testing', 'Build Tools', 'Deploy', 'Performance', 'Arquitetura'],
            requirements: ['Conclusão dos módulos 16-20', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'react-iniciante',
            title: 'React Developer Iniciante',
            level: 'iniciante',
            course: 'React & Frontend Avançado',
            modules: [21, 22, 23, 24, 25],
            status: 'not-started',
            credentialId: 'FENIX-RD-001-2024',
            description: 'Certifica conhecimento em fundamentos do React, incluindo componentes, props e state.',
            skills: ['React', 'JSX', 'Components', 'Props', 'State'],
            requirements: ['Conclusão dos módulos 21-25', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'react-intermediario',
            title: 'React Developer Intermediário',
            level: 'intermediario',
            course: 'React & Frontend Avançado',
            modules: [26, 27, 28, 29, 30],
            status: 'not-started',
            credentialId: 'FENIX-RD-002-2024',
            description: 'Certifica conhecimento intermediário em React, incluindo hooks, context e routing.',
            skills: ['Hooks', 'Context API', 'React Router', 'Forms', 'API Integration'],
            requirements: ['Conclusão dos módulos 26-30', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'react-avancado',
            title: 'React Developer Avançado',
            level: 'avancado',
            course: 'React & Frontend Avançado',
            modules: [31, 32, 33, 34, 35],
            status: 'not-started',
            credentialId: 'FENIX-RD-003-2024',
            description: 'Certifica conhecimento avançado em React, incluindo Redux, testing e performance.',
            skills: ['Redux', 'State Management', 'Testing', 'Performance', 'Architecture'],
            requirements: ['Conclusão dos módulos 31-35', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'react-expert',
            title: 'React Developer Expert',
            level: 'expert',
            course: 'React & Frontend Avançado',
            modules: [36, 37, 38, 39, 40],
            status: 'not-started',
            credentialId: 'FENIX-RD-004-2024',
            description: 'Certifica expertise em React, incluindo Next.js, TypeScript e deploy.',
            skills: ['Next.js', 'TypeScript', 'Deploy', 'Performance', 'Best Practices'],
            requirements: ['Conclusão dos módulos 36-40', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'backend-iniciante',
            title: 'Backend Developer Iniciante',
            level: 'iniciante',
            course: 'Backend & Full-Stack',
            modules: [41, 42, 43, 44, 45],
            status: 'not-started',
            credentialId: 'FENIX-BD-001-2024',
            description: 'Certifica conhecimento em fundamentos de backend, incluindo Node.js e Express.',
            skills: ['Node.js', 'Express', 'Middleware', 'Routing', 'Templates'],
            requirements: ['Conclusão dos módulos 41-45', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'backend-intermediario',
            title: 'Backend Developer Intermediário',
            level: 'intermediario',
            course: 'Backend & Full-Stack',
            modules: [46, 47, 48, 49, 50],
            status: 'not-started',
            credentialId: 'FENIX-BD-002-2024',
            description: 'Certifica conhecimento intermediário em backend, incluindo autenticação e banco de dados.',
            skills: ['Authentication', 'Sessions', 'Database', 'Security', 'Validation'],
            requirements: ['Conclusão dos módulos 46-50', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'backend-avancado',
            title: 'Backend Developer Avançado',
            level: 'avancado',
            course: 'Backend & Full-Stack',
            modules: [51, 52, 53, 54, 55],
            status: 'not-started',
            credentialId: 'FENIX-BD-003-2024',
            description: 'Certifica conhecimento avançado em backend, incluindo APIs REST e MongoDB.',
            skills: ['MongoDB', 'REST APIs', 'API Design', 'Error Handling', 'Testing'],
            requirements: ['Conclusão dos módulos 51-55', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        },
        {
            id: 'backend-expert',
            title: 'Backend Developer Expert',
            level: 'expert',
            course: 'Backend & Full-Stack',
            modules: [56, 57, 58, 59, 60],
            status: 'not-started',
            credentialId: 'FENIX-BD-004-2024',
            description: 'Certifica expertise em backend, incluindo Docker, deploy e arquitetura.',
            skills: ['Docker', 'Deploy', 'Architecture', 'Microservices', 'DevOps'],
            requirements: ['Conclusão dos módulos 56-60', 'Aprovação na avaliação teórica', 'Aprovação na avaliação prática']
        }
    ];

    const assessments: Assessment[] = [
        {
            id: 'web-iniciante-theoretical',
            certificateId: 'web-iniciante',
            title: 'Avaliação Teórica - Web Developer Iniciante',
            type: 'theoretical',
            status: 'completed',
            score: 95,
            maxScore: 100,
            duration: '90 min',
            questions: 50
        },
        {
            id: 'web-iniciante-practical',
            certificateId: 'web-iniciante',
            title: 'Avaliação Prática - Web Developer Iniciante',
            type: 'practical',
            status: 'completed',
            score: 92,
            maxScore: 100,
            duration: '7 dias'
        },
        {
            id: 'web-intermediario-theoretical',
            certificateId: 'web-intermediario',
            title: 'Avaliação Teórica - Web Developer Intermediário',
            type: 'theoretical',
            status: 'in-progress',
            score: 78,
            maxScore: 100,
            duration: '90 min',
            questions: 50
        },
        {
            id: 'web-intermediario-practical',
            certificateId: 'web-intermediario',
            title: 'Avaliação Prática - Web Developer Intermediário',
            type: 'practical',
            status: 'not-started',
            maxScore: 100,
            duration: '7 dias'
        }
    ];

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'iniciante': return 'bg-green-100 text-green-800';
            case 'intermediario': return 'bg-blue-100 text-blue-800';
            case 'avancado': return 'bg-orange-100 text-orange-800';
            case 'expert': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'not-started': return 'bg-gray-100 text-gray-800';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'not-started': return <Clock className="w-4 h-4" />;
            case 'in-progress': return <Star className="w-4 h-4" />;
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    }

    const getCourseColor = (course: string) => {
        switch (course) {
            case 'Web Fundamentals': return 'bg-blue-100 text-blue-800';
            case 'React & Frontend Avançado': return 'bg-green-100 text-green-800';
            case 'Backend & Full-Stack': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const filteredCertificates = certificates.filter(cert =>
        selectedCertificate ? cert.id === selectedCertificate.id : true
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🏆 Sistema de Certificados
                            </h1>
                            <p className="text-gray-600 mt-2">
                                12 Certificados Profissionais • Validação de Conhecimento
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">
                                    {certificates.filter(c => c.status === 'completed').length}
                                </div>
                                <div className="text-sm text-gray-500">Concluídos</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {certificates.filter(c => c.status === 'in-progress').length}
                                </div>
                                <div className="text-sm text-gray-500">Em Andamento</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-600">
                                    {certificates.filter(c => c.status === 'not-started').length}
                                </div>
                                <div className="text-sm text-gray-500">Disponíveis</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Certificates List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Meus Certificados</h2>
                            <div className="space-y-4">
                                {filteredCertificates.map((certificate) => (
                                    <div
                                        key={certificate.id}
                                        className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${selectedCertificate?.id === certificate.id
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                        onClick={() => setSelectedCertificate(certificate)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <Trophy className="w-6 h-6 text-yellow-500" />
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {certificate.title}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(certificate.level)}`}>
                                                        {certificate.level}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-4 mb-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCourseColor(certificate.course)}`}>
                                                        {certificate.course}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(certificate.status)}`}>
                                                        {getStatusIcon(certificate.status)}
                                                        <span className="ml-1">{certificate.status}</span>
                                                    </span>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-3">{certificate.description}</p>

                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <span>Módulos: {certificate.modules.join(', ')}</span>
                                                    {certificate.score && (
                                                        <span>Nota: {certificate.score}%</span>
                                                    )}
                                                    {certificate.completedDate && (
                                                        <span>Concluído: {new Date(certificate.completedDate).toLocaleDateString('pt-BR')}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="lg:col-span-1">
                        {selectedCertificate ? (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Detalhes do Certificado</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Informações</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">ID:</span>
                                                <span className="font-mono">{selectedCertificate.credentialId}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Nível:</span>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(selectedCertificate.level)}`}>
                                                    {selectedCertificate.level}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Curso:</span>
                                                <span className="text-right">{selectedCertificate.course}</span>
                                            </div>
                                            {selectedCertificate.score && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Nota:</span>
                                                    <span className="font-semibold text-green-600">{selectedCertificate.score}%</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Habilidades</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCertificate.skills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Requisitos</h3>
                                        <ul className="space-y-1 text-sm text-gray-600">
                                            {selectedCertificate.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start space-x-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-3">
                                        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                                            <Download className="w-4 h-4 mr-2" />
                                            Baixar Certificado
                                        </button>
                                        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                                            <Share2 className="w-4 h-4 mr-2" />
                                            Compartilhar
                                        </button>
                                        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Ver no LinkedIn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="text-center">
                                    <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Selecione um Certificado
                                    </h3>
                                    <p className="text-gray-600">
                                        Clique em um certificado para ver os detalhes
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowAssessment(true)}
                                    className="w-full flex items-center justify-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                                >
                                    <Award className="w-4 h-4 mr-2" />
                                    Iniciar Avaliação
                                </button>
                                <button className="w-full flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Ver no LinkedIn
                                </button>
                                <button className="w-full flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                                    <Download className="w-4 h-4 mr-2" />
                                    Baixar Todos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assessment Modal */}
                {showAssessment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Avaliações Disponíveis</h2>
                                    <button
                                        onClick={() => setShowAssessment(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {assessments.map((assessment) => (
                                        <div key={assessment.id} className="bg-gray-50 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold text-gray-900">{assessment.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(assessment.status)}`}>
                                                    {getStatusIcon(assessment.status)}
                                                    <span className="ml-1">{assessment.status}</span>
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="text-sm text-gray-600">
                                                    <strong>Tipo:</strong> {assessment.type === 'theoretical' ? 'Teórica' : 'Prática'}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <strong>Duração:</strong> {assessment.duration}
                                                </div>
                                                {assessment.questions && (
                                                    <div className="text-sm text-gray-600">
                                                        <strong>Questões:</strong> {assessment.questions}
                                                    </div>
                                                )}
                                                {assessment.score && (
                                                    <div className="text-sm text-gray-600">
                                                        <strong>Nota:</strong> {assessment.score}/{assessment.maxScore}
                                                    </div>
                                                )}

                                                <div className="flex space-x-2 mt-4">
                                                    <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                                        {assessment.status === 'not-started' ? 'Iniciar' : 'Continuar'}
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CertificateSystem;



































