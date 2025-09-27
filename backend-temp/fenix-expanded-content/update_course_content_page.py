#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🔄 ATUALIZADOR DA PÁGINA COURSE-CONTENT
======================================

Script para atualizar a página de course-content com os dados reais dos cursos
atualizados com o modelo Web Fundamentals.
"""

import os
import json
from pathlib import Path
from typing import Dict, List, Any
import re

class CourseContentUpdater:
    """Atualizador da página de course-content"""
    
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.frontend_path = self.base_path.parent.parent / "frontend"
        self.course_content_page = self.frontend_path / "app" / "courses-content" / "page.tsx"
        
        # Configurações dos cursos atualizados
        self.updated_courses = {
            "react-advanced": {
                "name": "React Advanced",
                "emoji": "⚛️",
                "category": "Frontend",
                "total_lessons": 57,
                "total_modules": 12,
                "duration": "75h",
                "description": "Desenvolvimento avançado com React, Hooks, Context API e Performance"
            },
            "python-data-science": {
                "name": "Python Data Science",
                "emoji": "🐍",
                "category": "Data Science",
                "total_lessons": 83,
                "total_modules": 10,
                "duration": "80h",
                "description": "Ciência de dados com Python, Pandas, NumPy e Machine Learning"
            },
            "aws-cloud": {
                "name": "AWS Cloud",
                "emoji": "☁️",
                "category": "Cloud",
                "total_lessons": 56,
                "total_modules": 12,
                "duration": "85h",
                "description": "Computação em nuvem com AWS, arquitetura e microserviços"
            },
            "devops-docker": {
                "name": "DevOps Docker",
                "emoji": "🐳",
                "category": "DevOps",
                "total_lessons": 56,
                "total_modules": 10,
                "duration": "70h",
                "description": "DevOps e containerização com Docker e Kubernetes"
            },
            "react-native-mobile": {
                "name": "React Native Mobile",
                "emoji": "📱",
                "category": "Mobile",
                "total_lessons": 74,
                "total_modules": 12,
                "duration": "90h",
                "description": "Desenvolvimento mobile com React Native e APIs"
            },
            "flutter-mobile": {
                "name": "Flutter Mobile",
                "emoji": "🎯",
                "category": "Mobile",
                "total_lessons": 56,
                "total_modules": 10,
                "duration": "85h",
                "description": "Desenvolvimento mobile com Flutter e Dart"
            },
            "nodejs-apis": {
                "name": "Node.js APIs",
                "emoji": "🚀",
                "category": "Backend",
                "total_lessons": 63,
                "total_modules": 13,
                "duration": "75h",
                "description": "APIs e backend com Node.js, Express e MongoDB"
            },
            "blockchain-smart-contracts": {
                "name": "Blockchain Smart Contracts",
                "emoji": "⛓️",
                "category": "Blockchain",
                "total_lessons": 56,
                "total_modules": 12,
                "duration": "90h",
                "description": "Blockchain e contratos inteligentes com Ethereum"
            },
            "gestao-trafego": {
                "name": "Gestão de Tráfego",
                "emoji": "📈",
                "category": "Marketing",
                "total_lessons": 15,
                "total_modules": 3,
                "duration": "70h",
                "description": "Marketing digital e gestão de tráfego"
            }
        }
    
    def get_course_modules(self, course_slug: str) -> List[Dict[str, Any]]:
        """Obtém módulos de um curso específico"""
        course_path = self.base_path / course_slug / "avancado"
        
        if not course_path.exists():
            return []
        
        # Busca arquivos de módulos
        module_files = list(course_path.glob("modulo-*.md"))
        modules = []
        
        for i, module_file in enumerate(module_files[:10]):  # Máximo 10 módulos
            # Conta aulas do módulo
            lesson_files = list(course_path.glob(f"aula-*-modulo-{i+1:02d}-*.md"))
            
            modules.append({
                "id": i + 1,
                "title": f"Módulo {i+1}: {self._extract_module_title(module_file)}",
                "description": f"Conteúdo avançado do {course_slug.replace('-', ' ').title()}",
                "lessons": len(lesson_files),
                "duration": f"{len(lesson_files) * 1.5:.0f}h"
            })
        
        return modules
    
    def _extract_module_title(self, module_file: Path) -> str:
        """Extrai título do módulo do arquivo"""
        try:
            with open(module_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Busca por título no formato # Título
                match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                if match:
                    return match.group(1).strip()
        except:
            pass
        return "Conteúdo Avançado"
    
    def generate_course_content_data(self) -> List[Dict[str, Any]]:
        """Gera dados atualizados dos cursos"""
        courses_data = []
        
        for course_slug, course_info in self.updated_courses.items():
            modules = self.get_course_modules(course_slug)
            
            course_data = {
                "id": len(courses_data) + 1,
                "title": course_info["name"],
                "slug": course_slug,
                "category": course_info["category"],
                "totalLessons": course_info["total_lessons"],
                "totalModules": course_info["total_modules"],
                "duration": course_info["duration"],
                "description": course_info["description"],
                "emoji": course_info["emoji"],
                "modules": modules
            }
            
            courses_data.append(course_data)
        
        return courses_data
    
    def update_course_content_page(self) -> bool:
        """Atualiza a página de course-content"""
        try:
            # Gera dados atualizados
            courses_data = self.generate_course_content_data()
            
            # Lê o arquivo atual
            with open(self.course_content_page, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Gera novo conteúdo
            new_content = self._generate_updated_page_content(courses_data)
            
            # Salva o arquivo atualizado
            with open(self.course_content_page, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✅ Página course-content atualizada com {len(courses_data)} cursos")
            return True
            
        except Exception as e:
            print(f"❌ Erro ao atualizar página: {e}")
            return False
    
    def _generate_updated_page_content(self, courses_data: List[Dict[str, Any]]) -> str:
        """Gera conteúdo atualizado da página"""
        
        # Gera a seção de cursos
        courses_section = ""
        for course in courses_data:
            modules_html = ""
            for module in course["modules"]:
                modules_html += f'''                {{
                    id: {module["id"]},
                    title: "{module["title"]}",
                    description: "{module["description"]}",
                    lessons: {module["lessons"]},
                    duration: "{module["duration"]}"
                }},
'''
            
            courses_section += f'''        {{
            id: {course["id"]},
            title: '{course["title"]}',
            slug: '{course["slug"]}',
            category: '{course["category"]}',
            totalLessons: {course["totalLessons"]},
            totalModules: {course["totalModules"]},
            duration: '{course["duration"]}',
            modules: [
{modules_html}            ]
        }},
'''
        
        # Template da página atualizada
        total_lessons = sum(course['totalLessons'] for course in courses_data)
        total_hours = sum(int(course['duration'].replace('h', '')) for course in courses_data)
        
        page_content = f''''use client';

import {{ useState }} from 'react';
import Link from 'next/link';
import {{ navigationConfig }} from '../../navigation-config';

interface CourseModule {{
    id: number;
    title: string;
    description: string;
    lessons: number;
    duration: string;
}}

interface CourseContent {{
    id: number;
    title: string;
    slug: string;
    category: string;
    totalLessons: number;
    totalModules: number;
    duration: string;
    modules: CourseModule[];
}}

export default function CourseContentPage() {{
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());

    const toggleModule = (courseId: number, moduleId: number) => {{
        const key = courseId * 1000 + moduleId;
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(key)) {{
            newExpanded.delete(key);
        }} else {{
            newExpanded.add(key);
        }}
        setExpandedModules(newExpanded);
    }};

    const coursesContent: CourseContent[] = [
{courses_section}    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        📚 Conteúdo dos Cursos - Fenix Academy
                    </h1>
                    <p className="text-xl text-purple-200 mb-6">
                        Visualize o conteúdo detalhado de todos os {len(courses_data)} cursos atualizados com modelo Web Fundamentals
                    </p>
                    <div className="flex justify-center space-x-4 mb-6">
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                            ✅ {len(courses_data)} Cursos Atualizados
                        </div>
                        <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                            ✅ {total_lessons}+ Aulas
                        </div>
                        <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium">
                            ✅ {total_hours}+ Horas
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {{coursesContent.map((course) => (
                        <div
                            key={{course.id}}
                            className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all"
                        >
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold mb-2">{{course.title}}</h2>
                                        <div className="flex items-center space-x-4 text-purple-100">
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                                {{course.category}}
                                            </span>
                                            <span className="text-sm">
                                                📚 {{course.totalModules}} módulos
                                            </span>
                                            <span className="text-sm">
                                                🎯 {{course.totalLessons}} aulas
                                            </span>
                                            <span className="text-sm">
                                                ⏰ {{course.duration}}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-4xl font-bold text-purple-200">
                                            {{course.id}}
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
                                    {{course.modules.map((module) => {{
                                        const isExpanded = expandedModules.has(course.id * 1000 + module.id);
                                        return (
                                            <div
                                                key={{module.id}}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-semibold text-gray-900">
                                                        Módulo {{module.id}}: {{module.title}}
                                                    </h4>
                                                    <button
                                                        onClick={{() => toggleModule(course.id, module.id)}}
                                                        className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                                    >
                                                        {{isExpanded ? '🔽 Recolher' : '▶️ Expandir'}}
                                                    </button>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    {{module.description}}
                                                </p>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <span>📚 {{module.lessons}} aulas</span>
                                                    <span>⏰ {{module.duration}}</span>
                                                </div>

                                                {{isExpanded && (
                                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                                        <div className="text-xs text-gray-600">
                                                            <p><strong>Conteúdo Atualizado:</strong></p>
                                                            <p>Este módulo contém {{module.lessons}} aulas com conteúdo real e específico,
                                                                totalizando {{module.duration}} de conteúdo de alta qualidade.</p>
                                                            <p className="mt-2 text-purple-600">
                                                                💡 <strong>Dica:</strong> Cada aula inclui exercícios práticos,
                                                                projetos e casos brasileiros para maximizar o aprendizado.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}}
                                            </div>
                                        );
                                    }})}}
                                </div>
                            </div>
                        </div>
                    ))}}
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
                                <li>• Total de cursos: {len(courses_data)}</li>
                                <li>• Total de módulos: {sum(course['totalModules'] for course in courses_data)}+</li>
                                <li>• Total de aulas: {total_lessons}+</li>
                                <li>• Horas de conteúdo: {total_hours}+</li>
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
}}'''
        
        return page_content

def main():
    """Função principal"""
    print("🔄 FENIX ACADEMY - ATUALIZADOR DA PÁGINA COURSE-CONTENT")
    print("=" * 60)
    
    # Caminho base
    base_path = Path(__file__).parent
    updater = CourseContentUpdater(base_path)
    
    try:
        # Atualiza a página
        success = updater.update_course_content_page()
        
        if success:
            print("🎉 Página course-content atualizada com sucesso!")
            print("📊 Cursos atualizados com modelo Web Fundamentals")
            print("✅ Dados reais dos cursos aplicados")
        else:
            print("❌ Falha na atualização da página")
            return 1
        
    except Exception as e:
        print(f"❌ Erro durante a execução: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
