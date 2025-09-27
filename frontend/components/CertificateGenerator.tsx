'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
    Download,
    Share2,
    CheckCircle,
    Award,
    Calendar,
    User,
    BookOpen,
    Clock,
    Star
} from 'lucide-react'
import FunctionalButton from './FunctionalButton'

interface CertificateData {
    id: string
    courseTitle: string
    studentName: string
    completedAt: Date
    duration: string
    grade: number
    instructor: string
    certificateId: string
}

interface CertificateGeneratorProps {
    certificate: CertificateData
    onClose?: () => void
    className?: string
}

export default function CertificateGenerator({
    certificate,
    onClose,
    className = ''
}: CertificateGeneratorProps) {
    const [isGenerating, setIsGenerating] = useState(false)
    const certificateRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        if (!certificateRef.current) return

        setIsGenerating(true)

        try {
            // Simular geração de PDF
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Aqui você implementaria a geração real do PDF
            // Por exemplo, usando html2canvas + jsPDF
            console.log('Gerando certificado PDF...')

            // Simular download
            const link = document.createElement('a')
            link.download = `certificado-${certificate.certificateId}.pdf`
            link.href = '#'
            link.click()

        } catch (error) {
            console.error('Erro ao gerar certificado:', error)
        } finally {
            setIsGenerating(false)
        }
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Certificado de Conclusão - ${certificate.courseTitle}`,
                    text: `Concluí o curso ${certificate.courseTitle} na Fênix Dev Academy!`,
                    url: window.location.href
                })
            } catch (error) {
                console.log('Compartilhamento cancelado')
            }
        } else {
            // Fallback para copiar link
            navigator.clipboard.writeText(window.location.href)
            alert('Link copiado para a área de transferência!')
        }
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Certificate */}
                <div
                    ref={certificateRef}
                    className="relative bg-gradient-to-br from-yellow-50 to-orange-50 p-12 text-center"
                    style={{ aspectRatio: '16/10' }}
                >
                    {/* Decorative Border */}
                    <div className="absolute inset-4 border-4 border-yellow-400 rounded-lg"></div>
                    <div className="absolute inset-8 border-2 border-yellow-300 rounded-lg"></div>

                    {/* Header */}
                    <div className="relative z-10 space-y-6">
                        {/* Logo/Icon */}
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                            <Award className="w-10 h-10 text-white" />
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                Certificado de Conclusão
                            </h1>
                            <p className="text-xl text-gray-600">
                                Fênix Dev Academy
                            </p>
                        </div>

                        {/* Student Info */}
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700">
                                Certificamos que
                            </p>
                            <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-yellow-400 pb-2 inline-block">
                                {certificate.studentName}
                            </h2>
                            <p className="text-lg text-gray-700">
                                concluiu com sucesso o curso
                            </p>
                            <h3 className="text-2xl font-semibold text-blue-600">
                                {certificate.courseTitle}
                            </h3>
                        </div>

                        {/* Course Details */}
                        <div className="grid grid-cols-2 gap-8 mt-8">
                            <div className="text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    <span className="font-semibold text-gray-700">Data de Conclusão:</span>
                                </div>
                                <p className="text-gray-600">{formatDate(certificate.completedAt)}</p>
                            </div>

                            <div className="text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-5 h-5 text-gray-600" />
                                    <span className="font-semibold text-gray-700">Duração:</span>
                                </div>
                                <p className="text-gray-600">{certificate.duration}</p>
                            </div>

                            <div className="text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="w-5 h-5 text-gray-600" />
                                    <span className="font-semibold text-gray-700">Instrutor:</span>
                                </div>
                                <p className="text-gray-600">{certificate.instructor}</p>
                            </div>

                            <div className="text-left">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-5 h-5 text-gray-600" />
                                    <span className="font-semibold text-gray-700">Nota:</span>
                                </div>
                                <p className="text-gray-600">{certificate.grade}/10</p>
                            </div>
                        </div>

                        {/* Certificate ID */}
                        <div className="mt-8 pt-6 border-t border-gray-300">
                            <p className="text-sm text-gray-500">
                                Certificado ID: {certificate.certificateId}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Verifique a autenticidade em: fenixdevacademy.com.br/verify
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 bg-gray-50 border-t">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <FunctionalButton
                            onClick={handleDownload}
                            variant="primary"
                            size="lg"
                            icon={<Download className="w-5 h-5" />}
                            iconPosition="left"
                            glowEffect={true}
                            rippleEffect={true}
                            loading={isGenerating}
                            loadingText="Gerando PDF..."
                            className="flex-1"
                        >
                            Baixar Certificado
                        </FunctionalButton>

                        <FunctionalButton
                            onClick={handleShare}
                            variant="outline"
                            size="lg"
                            icon={<Share2 className="w-5 h-5" />}
                            iconPosition="left"
                            glowEffect={true}
                            rippleEffect={true}
                            className="flex-1"
                        >
                            Compartilhar
                        </FunctionalButton>

                        {onClose && (
                            <FunctionalButton
                                onClick={onClose}
                                variant="secondary"
                                size="lg"
                                className="flex-1"
                            >
                                Fechar
                            </FunctionalButton>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}


