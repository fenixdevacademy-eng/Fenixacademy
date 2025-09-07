'use client';

import React from 'react';
import { CourseContent } from '../app/course/[slug]/types/course-types';
import AddToCartButton from './AddToCartButton';
import { Clock, BookOpen, Users, Star } from 'lucide-react';

interface CourseCardProps {
    course: CourseContent;
    className?: string;
}

export default function CourseCard({ course, className = '' }: CourseCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    return (
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/images/course-placeholder.jpg';
                    }}
                />

                {/* Badge de categoria */}
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90 text-gray-800">
                        {course.category}
                    </span>
                </div>

                {/* Badge de nível */}
                <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                        {course.level}
                    </span>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                </h3>

                {/* Descrição */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course.description}
                </p>

                {/* Estatísticas */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration_hours}h</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.total_modules} módulos</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.total_lessons} lições</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Preço e Botão */}
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(course.price)}
                    </div>

                    <AddToCartButton
                        course={{
                            id: course.id,
                            title: course.title,
                            price: course.price,
                            currency: course.currency,
                            thumbnail: course.thumbnail,
                            category: course.category,
                            level: course.level,
                            duration_hours: course.duration_hours,
                            total_lessons: course.total_lessons,
                            total_modules: course.total_modules,
                        }}
                        className="w-auto px-6"
                    />
                </div>

                {/* Certificado */}
                {course.certificate && (
                    <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-green-600">
                        <Star className="h-4 w-4" />
                        <span>Certificado Incluso</span>
                    </div>
                )}
            </div>
        </div>
    );
}
