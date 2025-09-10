'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigationConfig } from '../../navigation-config';

interface CourseModule {
    id: number;
    title: string;
    description: string;
    lessons: number;
    duration: string;
}

interface CourseContent {
    id: number;
    title: string;
    slug: string;
    category: string;
    totalLessons: number;
    totalModules: number;
    duration: string;
    modules: CourseModule[];
}

export default function CourseContentPage() {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

    const toggleModule = (courseId: number, moduleId: number) => {
        const key = courseId * 1000 + moduleId;
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(key)) {
            newExpanded.delete(key);
        } else {
            newExpanded.add(key);
        }
        setExpandedModules(newExpanded);
    };

    const coursesContent: CourseContent[] = [
        {
            id: 1,
            title: 'React Advanced',
            slug: 'react-advanced',
            category: 'Frontend',
            totalLessons: 57,
            totalModules: 12,
            duration: '75h',
            modules: [
                {
                    id: 1,
                    title: "Módulo 1: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 2,
                    title: "Módulo 2: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 3,
                    title: "Módulo 3: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 4,
                    title: "Módulo 4: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 5,
                    title: "Módulo 5: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 6,
                    title: "Módulo 6: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 7,
                    title: "Módulo 7: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 8,
                    title: "Módulo 8: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 9,
                    title: "Módulo 9: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 10,
                    title: "Módulo 10: React Avançado - Curso Completo",
                    description: "Conteúdo avançado do React Advanced",
                    lessons: 5,
                    duration: "8h"
                },
            ]
        },
        {
            id: 2,
            title: 'Python Data Science',
            slug: 'python-data-science',
            category: 'Data Science',
            totalLessons: 83,
            totalModules: 10,
            duration: '80h',
            modules: [
                {
                    id: 1,
                    title: "Módulo 1: 🐍 Fundamentos Python",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 11,
                    duration: "16h"
                },
                {
                    id: 2,
                    title: "Módulo 2: 🐍 Análise de Dados com Pandas",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 22,
                    duration: "33h"
                },
                {
                    id: 3,
                    title: "Módulo 3: 🐍 Visualização com Matplotlib/Seaborn",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 7,
                    duration: "10h"
                },
                {
                    id: 4,
                    title: "Módulo 4: 🐍 Machine Learning Básico",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 7,
                    duration: "10h"
                },
                {
                    id: 5,
                    title: "Módulo 5: 🐍 Deep Learning com TensorFlow",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 6,
                    title: "Módulo 6: 🐍 Processamento de Linguagem Natural",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 7,
                    title: "Módulo 7: 🐍 Big Data com PySpark",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 7,
                    duration: "10h"
                },
                {
                    id: 8,
                    title: "Módulo 8: 🐍 Deploy de Modelos ML",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 8,
                    duration: "12h"
                },
                {
                    id: 9,
                    title: "Módulo 9: Python Data Science - Curso Avançado",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 10,
                    title: "Módulo 10: Python Data Science - Curso Avançado",
                    description: "Conteúdo avançado do Python Data Science",
                    lessons: 3,
                    duration: "4h"
                },
            ]
        },
        {
            id: 3,
            title: 'AWS Cloud',
            slug: 'aws-cloud',
            category: 'Cloud',
            totalLessons: 56,
            totalModules: 12,
            duration: '85h',
            modules: [
                {
                    id: 1,
                    title: "Módulo 1: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 11,
                    duration: "16h"
                },
                {
                    id: 2,
                    title: "Módulo 2: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 3,
                    title: "Módulo 3: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 4,
                    title: "Módulo 4: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 5,
                    title: "Módulo 5: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 6,
                    title: "Módulo 6: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 7,
                    title: "Módulo 7: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 8,
                    title: "Módulo 8: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 9,
                    title: "Módulo 9: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 10,
                    title: "Módulo 10: AWS Cloud - Curso Avançado",
                    description: "Conteúdo avançado do Aws Cloud",
                    lessons: 5,
                    duration: "8h"
                },
            ]
        },
        {
            id: 4,
            title: 'DevOps Docker',
            slug: 'devops-docker',
            category: 'DevOps',
            totalLessons: 56,
            totalModules: 10,
            duration: '70h',
            modules: [
                {
                    id: 1,
                    title: "Módulo 1: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 2,
                    title: "Módulo 2: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 7,
                    duration: "10h"
                },
                {
                    id: 3,
                    title: "Módulo 3: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 8,
                    duration: "12h"
                },
                {
                    id: 4,
                    title: "Módulo 4: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 9,
                    duration: "14h"
                },
                {
                    id: 5,
                    title: "Módulo 5: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 6,
                    title: "Módulo 6: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 7,
                    title: "Módulo 7: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 8,
                    title: "Módulo 8: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 9,
                    title: "Módulo 9: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 10,
                    title: "Módulo 10: DevOps e Docker - Curso Avançado",
                    description: "Conteúdo avançado do Devops Docker",
                    lessons: 4,
                    duration: "6h"
                },
            ]
        },
        {
            id: 5,
            title: 'React Native Mobile',
            slug: 'react-native-mobile',
            category: 'Mobile',
            totalLessons: 74,
            totalModules: 12,
            duration: '90h',
            modules: [
                {
                    id: 1,
                    title: "Módulo 1: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 2,
                    title: "Módulo 2: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 7,
                    duration: "10h"
                },
                {
                    id: 3,
                    title: "Módulo 3: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 8,
                    duration: "12h"
                },
                {
                    id: 4,
                    title: "Módulo 4: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 9,
                    duration: "14h"
                },
                {
                    id: 5,
                    title: "Módulo 5: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 6,
                    title: "Módulo 6: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 7,
                    title: "Módulo 7: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 8,
                    title: "Módulo 8: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 9,
                    title: "Módulo 9: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 10,
                    title: "Módulo 10: React Native Mobile - Curso Avançado",
                    description: "Conteúdo avançado do React Native Mobile",
                    lessons: 6,
                    duration: "9h"
                },
            ]
        },
        {
            id: 6,
            title: 'Flutter Mobile',
            slug: 'flutter-mobile',
            category: 'Mobile',
            totalLessons: 56,
            totalModules: 10,
            duration: '85h',
            modules: [
                {
                    id: 1,
                    title: "Módulo 1: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 2,
                    title: "Módulo 2: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 7,
                    duration: "10h"
                },
                {
                    id: 3,
                    title: "Módulo 3: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 8,
                    duration: "12h"
                },
                {
                    id: 4,
                    title: "Módulo 4: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 9,
                    duration: "14h"
                },
                {
                    id: 5,
                    title: "Módulo 5: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 6,
                    title: "Módulo 6: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 7,
                    title: "Módulo 7: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 8,
                    title: "Módulo 8: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 9,
                    title: "Módulo 9: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 10,
                    title: "Módulo 10: Flutter Mobile - Curso Avançado",
                    description: "Conteúdo avançado do Flutter Mobile",
                    lessons: 6,
                    duration: "9h"
                },
            ]
        },
        {
            id: 7,
            title: 'Node.js APIs',
            slug: 'nodejs-apis',
            category: 'Backend',
            totalLessons: 63,
            totalModules: 13,
            duration: '75h',
            modules: [
                {
                    id: 1,
                    title: "Módulo 1: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 2,
                    title: "Módulo 2: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 3,
                    title: "Módulo 3: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 4,
                    title: "Módulo 4: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 5,
                    title: "Módulo 5: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 6,
                    title: "Módulo 6: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 7,
                    title: "Módulo 7: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 8,
                    title: "Módulo 8: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 9,
                    title: "Módulo 9: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 10,
                    title: "Módulo 10: Node.js APIs - Curso Avançado",
                    description: "Conteúdo avançado do Nodejs Apis",
                    lessons: 5,
                    duration: "8h"
                },
            ]
        },
        {
            id: 8,
            title: 'Blockchain Smart Contracts',
            slug: 'blockchain-smart-contracts',
            category: 'Blockchain',
            totalLessons: 56,
            totalModules: 12,
            duration: '90h',
            modules: [
                {
                    id: 1,
                    title: "Módulo 1: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 2,
                    title: "Módulo 2: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 7,
                    duration: "10h"
                },
                {
                    id: 3,
                    title: "Módulo 3: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 8,
                    duration: "12h"
                },
                {
                    id: 4,
                    title: "Módulo 4: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 9,
                    duration: "14h"
                },
                {
                    id: 5,
                    title: "Módulo 5: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 6,
                    title: "Módulo 6: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 7,
                    title: "Módulo 7: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 8,
                    title: "Módulo 8: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 9,
                    title: "Módulo 9: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 6,
                    duration: "9h"
                },
                {
                    id: 10,
                    title: "Módulo 10: Blockchain e Smart Contracts - Curso Avançado",
                    description: "Conteúdo avançado do Blockchain Smart Contracts",
                    lessons: 6,
                    duration: "9h"
                },
            ]
        },
        {
            id: 9,
            title: 'Gestão de Tráfego',
            slug: 'gestao-trafego',
            category: 'Marketing',
            totalLessons: 15,
            totalModules: 3,
            duration: '70h',
            modules: [
                {
                    id: 1,
                    title: "Módulo 1: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 2,
                    title: "Módulo 2: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 3,
                    title: "Módulo 3: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 5,
                    duration: "8h"
                },
                {
                    id: 4,
                    title: "Módulo 4: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 0,
                    duration: "0h"
                },
                {
                    id: 5,
                    title: "Módulo 5: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 0,
                    duration: "0h"
                },
                {
                    id: 6,
                    title: "Módulo 6: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 0,
                    duration: "0h"
                },
                {
                    id: 7,
                    title: "Módulo 7: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 0,
                    duration: "0h"
                },
                {
                    id: 8,
                    title: "Módulo 8: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 0,
                    duration: "0h"
                },
                {
                    id: 9,
                    title: "Módulo 9: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 0,
                    duration: "0h"
                },
                {
                    id: 10,
                    title: "Módulo 10: Gestão de Tráfego - Curso Avançado",
                    description: "Conteúdo avançado do Gestao Trafego",
                    lessons: 0,
                    duration: "0h"
                },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        📚 Conteúdo dos Cursos - Fenix Academy
                    </h1>
                    <p className="text-xl text-purple-200 mb-6">
                        Visualize o conteúdo detalhado de todos os 9 cursos atualizados com modelo Web Fundamentals
                    </p>
                    <div className="flex justify-center space-x-4 mb-6">
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                            ✅ 9 Cursos Atualizados
                        </div>
                        <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                            ✅ 516+ Aulas
                        </div>
                        <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium">
                            ✅ 720+ Horas
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {coursesContent.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all"
                        >
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                                        <div className="flex items-center space-x-4 text-purple-100">
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                                {course.category}
                                            </span>
                                            <span className="text-sm">
                                                📚 {course.totalModules} módulos
                                            </span>
                                            <span className="text-sm">
                                                🎯 {course.totalLessons} aulas
                                            </span>
                                            <span className="text-sm">
                                                ⏰ {course.duration}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-4xl font-bold text-purple-200">
                                            {course.id}
                                        </div>
                                        <Link
                                            href="/courses"
                                            className="inline-block mt-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                                        >
                                            🔄 Acessar Curso
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    📖 Módulos Disponíveis
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.modules.map((module) => {
                                        const isExpanded = expandedModules.has(course.id * 1000 + module.id);
                                        return (
                                            <div
                                                key={module.id}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-semibold text-gray-900">
                                                        Módulo {module.id}: {module.title}
                                                    </h4>
                                                    <button
                                                        onClick={() => toggleModule(course.id, module.id)}
                                                        className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                                    >
                                                        {isExpanded ? '🔽 Recolher' : '▶️ Expandir'}
                                                    </button>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    {module.description}
                                                </p>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>📚 {module.lessons} aulas</span>
                                                    <span>⏰ {module.duration}</span>
                                                </div>

                                                {isExpanded && (
                                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                                        <div className="text-xs text-gray-600">
                                                            <p><strong>Conteúdo Atualizado:</strong></p>
                                                            <p>Este módulo contém {module.lessons} aulas com conteúdo real e específico,
                                                                totalizando {module.duration} de conteúdo de alta qualidade.</p>
                                                            <p className="mt-2 text-purple-600">
                                                                💡 <strong>Dica:</strong> Cada aula inclui exercícios práticos,
                                                                projetos e casos brasileiros para maximizar o aprendizado.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/ceo-dashboard"
                        className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-purple-900 font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl"
                    >
                        👑 Voltar ao Dashboard do CEO
                    </Link>
                </div>

                <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        📊 Resumo do Conteúdo Atualizado
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h3 className="font-bold text-xl mb-2">Estatísticas Atualizadas</h3>
                            <ul className="space-y-1 text-purple-200">
                                <li>• Total de cursos: 9</li>
                                <li>• Total de módulos: 94+</li>
                                <li>• Total de aulas: 516+</li>
                                <li>• Horas de conteúdo: 720+</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-xl mb-2">Qualidade Garantida</h3>
                            <ul className="space-y-1 text-purple-200">
                                <li>• Modelo Web Fundamentals</li>
                                <li>• Conteúdo específico por tecnologia</li>
                                <li>• Casos brasileiros reais</li>
                                <li>• Projetos práticos integrados</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-xl mb-2">Recursos Avançados</h3>
                            <ul className="space-y-1 text-purple-200">
                                <li>• Aulas hands-on</li>
                                <li>• Código real e funcional</li>
                                <li>• Exercícios desafiadores</li>
                                <li>• Metodologia CS50</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}