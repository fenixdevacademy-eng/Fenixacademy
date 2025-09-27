'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Users, Star, Play, ArrowRight, ShoppingCart } from 'lucide-react';
import { ExpandedCourse } from '@/lib/expanded-content-api';
import { ExpandedCheckoutButton } from './ExpandedCheckoutButton';
import usePaymentStatus from '@/hooks/usePaymentStatus';

interface ExpandedCourseCardProps {
    course: ExpandedCourse;
    className?: string;
}

export function ExpandedCourseCard({ course, className = '' }: ExpandedCourseCardProps) {
    const { paymentStatus, redirectToCourse } = usePaymentStatus();

    const getDifficultyColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'iniciante':
                return 'bg-green-100 text-green-800';
            case 'intermediario':
                return 'bg-yellow-100 text-yellow-800';
            case 'avancado':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    const getCourseIcon = (slug: string) => {
        const iconMap: Record<string, string> = {
            'python-data-science': '🐍',
            'web-fundamentals': '🌐',
            'aws-cloud': '☁️',
            'cybersecurity': '🔒',
            'react-advanced': '⚛️',
            'devops-docker': '🐳',
            'mobile-development': '📱',
            'game-development': '🎮',
            'ui-ux-design': '🎨',
            'machine-learning': '🤖',
            'blockchain-smart-contracts': '🔗'
        }
        return iconMap[slug] || '📚';
    }

    return (
        <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${className}`}>
            {/* Course Header */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 p-6">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 flex items-center justify-between h-full">
                    <div className="text-white">
                        <div className="text-4xl mb-2">{getCourseIcon(course.slug)}</div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-blue-100 text-sm line-clamp-2">{course.description}</p>
                    </div>
                    <div className="text-white/80">
                        <Play className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
                {/* Stats */}
                {course.stats && (
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        {course.stats.duration && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.stats.duration} módulos</span>
                            </div>
                        )}
                        {course.stats.hours && (
                            <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{course.stats.hours}h</span>
                            </div>
                        )}
                        {course.stats.projects && (
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{course.stats.projects} projetos</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Course Features */}
                <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Conteúdo expandido 3x mais detalhado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span>Metodologia CS50 aplicada</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-green-500" />
                        <span>Casos brasileiros reais</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => redirectToCourse(course.slug, course.slug)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 group flex items-center justify-center gap-2"
                    >
                        <Play className="w-4 h-4" />
                        <span>{paymentStatus.isPaid ? 'Acessar Curso' : 'Ver Curso'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <Link
                        href={`/expanded-course/${course.slug}`}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 group flex items-center justify-center gap-2"
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>Ver Detalhes</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <ExpandedCheckoutButton
                        course={{
                            id: course.slug,
                            title: course.title,
                            description: course.description,
                            slug: course.slug
                        }}
                        tier="premium"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Course Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Conteúdo Expandido</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 font-medium">Disponível</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpandedCourseCard;