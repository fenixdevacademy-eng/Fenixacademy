'use client';

﻿// Utilitários para gerenciamento de cursos

export interface Course {
    id: number
    title: string
    slug: string
    description: string
    instructor: string
    rating: number
    students: number
    duration: string
    level: string
    price: string
    originalPrice: string
    image: string
    category: string
    tags: string[]
    isNew: boolean
    isPopular: boolean
}

// Função para gerar slug a partir do título
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}

// Função para validar se um curso existe
export function validateCourse(courseId: number, courses: Course[]): Course | null {
    return courses.find(course => course.id === courseId) || null
}

// Função para obter URL do curso (informações)
export function getCourseUrl(course: Course): string {
    return `/course-info/${course.slug || generateSlug(course.title)}`
}

// Função para obter URL de compra do curso
export function getCoursePurchaseUrl(course: Course): string {
    return `/payment?course=${course.id}`
}

// Função para obter URL de demonstração do curso (prévia)
export function getCourseDemoUrl(course: Course): string {
    return `/expanded-course/${course.slug || generateSlug(course.title)}`
}

// Mapeamento de categorias para cores
export const categoryColors = {
    web: 'from-blue-500 to-cyan-500',
    data: 'from-green-500 to-emerald-500',
    mobile: 'from-purple-500 to-pink-500',
    security: 'from-red-500 to-orange-500',
    ai: 'from-yellow-500 to-orange-500'
}

// Mapeamento de níveis para cores
export const levelColors = {
    'Iniciante': 'from-green-500 to-emerald-500',
    'Intermediário': 'from-yellow-500 to-orange-500',
    'Avançado': 'from-red-500 to-pink-500'
}

// Função para obter cor da categoria
export function getCategoryColor(category: string): string {
    return categoryColors[category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'
}

// Função para obter cor do nível
export function getLevelColor(level: string): string {
    return levelColors[level as keyof typeof levelColors] || 'from-gray-500 to-gray-600'
}


