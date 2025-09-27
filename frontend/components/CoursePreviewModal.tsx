'use client';

import React from 'react';
import { X, Play, Clock, Users, Star, CheckCircle, Gift, ArrowRight, BookOpen, Code, Award } from 'lucide-react';
import Link from 'next/link';

interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    originalPrice: number;
    duration: string;
    level: string;
    students: number;
    rating: number;
    lessons: number;
    projects: number;
    category: string;
    instructor: string;
    features: string[];
}

interface CoursePreviewModalProps {
    course: Course | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CoursePreviewModal({ course, isOpen, onClose }: CoursePreviewModalProps) {
    if (!isOpen || !course) return null;

    const discountPercentage = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    const isSpecialOffer = course.price === 97;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="theme-surface rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border theme-border">
                {/* Header */}
                <div className="sticky top-0 theme-surface border-b theme-border p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold theme-text">Prévia do Curso</h2>
                    <button
                        onClick={onClose}
                        className="theme-text-secondary hover:theme-text transition-colors p-2 rounded-lg hover:bg-gray-100"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Course Image and Basic Info */}
                        <div>
                            <div className="relative mb-6">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-48 object-cover rounded-xl border theme-border"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium">
                                        {course.category}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full font-medium">
                                        {course.level}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold theme-text mb-4">{course.title}</h3>
                            <p className="theme-text-secondary mb-6">{course.description}</p>

                            {/* Course Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5 theme-primary" />
                                    <span className="theme-text-secondary">{course.duration}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users className="w-5 h-5 theme-primary" />
                                    <span className="theme-text-secondary">{course.students.toLocaleString()} alunos</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <BookOpen className="w-5 h-5 theme-primary" />
                                    <span className="theme-text-secondary">{course.lessons} aulas</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Code className="w-5 h-5 theme-primary" />
                                    <span className="theme-text-secondary">{course.projects} projetos</span>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="theme-text-secondary text-sm">
                                    {course.rating} ({course.students.toLocaleString()} avaliações)
                                </span>
                            </div>

                            {/* Instructor */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                        {course.instructor.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div>
                                    <p className="theme-text font-medium">{course.instructor}</p>
                                    <p className="theme-text-secondary text-sm">Instrutor</p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing and Features */}
                        <div>
                            {/* Special Offer Banner */}
                            {isSpecialOffer && (
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl mb-6">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Gift className="w-6 h-6" />
                                        <span className="text-lg font-bold">OFERTA ESPECIAL!</span>
                                    </div>
                                    <p className="text-sm">
                                        Apenas para os primeiros 10.000 alunos! Acesso vitalício a TODOS os cursos da Fênix Academy.
                                    </p>
                                </div>
                            )}

                            {/* Pricing */}
                            <div className="theme-surface rounded-xl p-6 border theme-border mb-6">
                                <div className="text-center">
                                    {course.originalPrice > course.price && (
                                        <div className="mb-2">
                                            <span className="text-2xl line-through text-gray-500">
                                                R$ {course.originalPrice.toLocaleString()}
                                            </span>
                                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full font-medium">
                                                -{discountPercentage}%
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-4xl font-bold theme-text mb-2">
                                        R$ {course.price.toLocaleString()}
                                    </div>
                                    <p className="theme-text-secondary text-sm">
                                        {isSpecialOffer ? 'Acesso vitalício a todos os cursos' : 'Pagamento único'}
                                    </p>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold theme-text mb-4">O que você vai aprender:</h4>
                                <ul className="space-y-3">
                                    {course.features.map((feature, index) => (
                                        <li key={index} className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="theme-text text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Link
                                    href={`/payment?course=${course.id}`}
                                    className="w-full theme-gradient-primary text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Gift className="w-5 h-5" />
                                    {isSpecialOffer ? 'Adquirir Acesso Vitalício' : 'Comprar Agora'}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                <Link
                                    href={`/course/${course.id}`}
                                    className="w-full theme-surface theme-text hover:theme-primary px-6 py-3 rounded-xl font-medium transition-all duration-300 border theme-border flex items-center justify-center gap-2"
                                >
                                    <Play className="w-5 h-5" />
                                    Ver Detalhes Completos
                                </Link>
                            </div>

                            {/* Guarantee */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <div className="flex items-start space-x-3">
                                    <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <h5 className="font-semibold text-blue-900 text-sm">Garantia de 7 dias</h5>
                                        <p className="text-blue-700 text-xs">
                                            Se não ficar satisfeito, devolvemos seu dinheiro em até 7 dias.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
