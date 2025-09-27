"use client";

import React, { useState, useEffect } from 'react';
import {
    Shield,
    CheckCircle,
    ExternalLink,
    Copy,
    Download,
    Share2,
    Award,
    Lock,
    Eye,
    Globe,
    Hash,
    Calendar,
    User,
    BookOpen
} from 'lucide-react';

interface Certificate {
    id: string;
    title: string;
    description: string;
    issuer: string;
    recipient: string;
    course: string;
    grade: number;
    issuedAt: Date;
    expiresAt?: Date;
    blockchainHash: string;
    verificationUrl: string;
    skills: string[];
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    isVerified: boolean;
    isPublic: boolean;
}

interface VerificationResult {
    isValid: boolean;
    certificate: Certificate | null;
    error?: string;
}

export default function BlockchainCertification() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [verificationHash, setVerificationHash] = useState('');
    const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [showVerification, setShowVerification] = useState(false);

    // Dados mockados
    useEffect(() => {
        setCertificates([
            {
                id: '1',
                title: 'Certificado de Desenvolvimento Web Full Stack',
                description: 'Certificação completa em desenvolvimento web moderno',
                issuer: 'Fênix Dev Academy',
                recipient: 'João Silva',
                course: 'Full Stack Development Bootcamp',
                grade: 95,
                issuedAt: new Date('2024-01-15'),
                expiresAt: new Date('2026-01-15'),
                blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
                verificationUrl: 'https://verify.fenixdevacademy.com/cert/1a2b3c4d',
                skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
                level: 'Advanced',
                isVerified: true,
                isPublic: true
            },
            {
                id: '2',
                title: 'Certificado de Python para Data Science',
                description: 'Especialização em análise de dados com Python',
                issuer: 'Fênix Dev Academy',
                recipient: 'João Silva',
                course: 'Python Data Science Masterclass',
                grade: 88,
                issuedAt: new Date('2024-02-20'),
                blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
                verificationUrl: 'https://verify.fenixdevacademy.com/cert/2b3c4d5e',
                skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Machine Learning'],
                level: 'Intermediate',
                isVerified: true,
                isPublic: true
            },
            {
                id: '3',
                title: 'Certificado de React Avançado',
                description: 'Domínio completo do ecossistema React',
                issuer: 'Fênix Dev Academy',
                recipient: 'João Silva',
                course: 'React Advanced Patterns',
                grade: 92,
                issuedAt: new Date('2024-03-10'),
                blockchainHash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
                verificationUrl: 'https://verify.fenixdevacademy.com/cert/3c4d5e6f',
                skills: ['React', 'Redux', 'TypeScript', 'Testing', 'Performance'],
                level: 'Expert',
                isVerified: true,
                isPublic: false
            }
        ]);
    }, []);

    const verifyCertificate = async (hash: string) => {
        if (!hash.trim()) return;

        setIsVerifying(true);

        try {
            // Simular verificação blockchain
            await new Promise(resolve => setTimeout(resolve, 2000));

            const certificate = certificates.find(cert =>
                cert.blockchainHash.toLowerCase() === hash.toLowerCase()
            );

            if (certificate) {
                setVerificationResult({
                    isValid: true,
                    certificate
                });
            } else {
                setVerificationResult({
                    isValid: false,
                    certificate: null,
                    error: 'Certificado não encontrado ou inválido'
                });
            }
        } catch (error) {
            setVerificationResult({
                isValid: false,
                certificate: null,
                error: 'Erro na verificação. Tente novamente.'
            });
        } finally {
            setIsVerifying(false);
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Aqui você poderia adicionar uma notificação de sucesso
    }

    const shareCertificate = (certificate: Certificate) => {
        if (navigator.share) {
            navigator.share({
                title: certificate.title,
                text: `Confira meu certificado: ${certificate.title}`,
                url: certificate.verificationUrl
            });
        } else {
            copyToClipboard(certificate.verificationUrl);
        }
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner': return 'bg-green-100 text-green-800';
            case 'Intermediate': return 'bg-blue-100 text-blue-800';
            case 'Advanced': return 'bg-purple-100 text-purple-800';
            case 'Expert': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Certificações Blockchain</h2>
                        <p className="opacity-90">Certificados verificáveis e imutáveis na blockchain</p>
                    </div>
                    <button
                        onClick={() => setShowVerification(!showVerification)}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Shield className="w-5 h-5 mr-2 inline" />
                        Verificar Certificado
                    </button>
                </div>
            </div>

            {/* Verificação de Certificado */}
            {showVerification && (
                <div className="bg-white rounded-xl p-6 shadow-lg border">
                    <h3 className="text-lg font-bold mb-4">Verificar Certificado</h3>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={verificationHash}
                            onChange={(e) => setVerificationHash(e.target.value)}
                            placeholder="Cole o hash do certificado (0x...)"
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                            onClick={() => verifyCertificate(verificationHash)}
                            disabled={!verificationHash.trim() || isVerifying}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isVerifying ? 'Verificando...' : 'Verificar'}
                        </button>
                    </div>

                    {verificationResult && (
                        <div className={`p-4 rounded-lg ${verificationResult.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                            }`}>
                            {verificationResult.isValid ? (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="font-semibold text-green-800">Certificado Válido!</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Título:</strong> {verificationResult.certificate?.title}</p>
                                        <p><strong>Emissor:</strong> {verificationResult.certificate?.issuer}</p>
                                        <p><strong>Destinatário:</strong> {verificationResult.certificate?.recipient}</p>
                                        <p><strong>Nota:</strong> {verificationResult.certificate?.grade}%</p>
                                        <p><strong>Emitido em:</strong> {verificationResult.certificate?.issuedAt.toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-red-600" />
                                    <span className="font-semibold text-red-800">
                                        {verificationResult.error || 'Certificado inválido'}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Lista de Certificados */}
            <div className="space-y-4">
                {certificates.map((certificate) => (
                    <div key={certificate.id} className="bg-white rounded-xl p-6 shadow-lg border">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <Award className="w-6 h-6 text-emerald-600" />
                                    <h3 className="text-xl font-bold text-gray-900">{certificate.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(certificate.level)}`}>
                                        {certificate.level}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">{certificate.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" />
                                        {certificate.course}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {certificate.issuedAt.toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        {certificate.recipient}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {certificate.isPublic ? (
                                    <Globe className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Lock className="w-5 h-5 text-gray-400" />
                                )}
                                <span className="text-sm text-gray-500">
                                    {certificate.isPublic ? 'Público' : 'Privado'}
                                </span>
                            </div>
                        </div>

                        {/* Habilidades */}
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Habilidades Certificadas:</h4>
                            <div className="flex flex-wrap gap-2">
                                {certificate.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Informações da Blockchain */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Informações da Blockchain:</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Hash className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600">Hash:</span>
                                    <code className="bg-white px-2 py-1 rounded text-xs font-mono">
                                        {certificate.blockchainHash.substring(0, 20)}...
                                    </code>
                                    <button
                                        onClick={() => copyToClipboard(certificate.blockchainHash)}
                                        className="text-emerald-600 hover:text-emerald-700"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600">Verificação:</span>
                                    <a
                                        href={certificate.verificationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-600 hover:text-emerald-700 underline"
                                    >
                                        Verificar online
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-2xl font-bold text-gray-900">
                                    {certificate.grade}%
                                </div>
                                <div className="text-sm text-gray-600">
                                    Nota Final
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => shareCertificate(certificate)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Compartilhar
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                    <Download className="w-4 h-4" />
                                    Baixar PDF
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                    <Award className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{certificates.length}</div>
                    <div className="text-sm text-gray-600">Certificados Obtidos</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Verificação Blockchain</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                    <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">Global</div>
                    <div className="text-sm text-gray-600">Reconhecimento</div>
                </div>
            </div>
        </div>
    );
}




