#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Analisador de estrutura de cursos para identificar padrões e tipos.
"""

import re
import json
from pathlib import Path
from typing import Dict, List, Any, Optional
from collections import Counter

class CourseAnalyzer:
    """Analisador de estrutura e conteúdo dos cursos."""
    
    def __init__(self, base_path: str = "backend/fenix-expanded-content"):
        # Tentar primeiro o caminho relativo do diretório scripts
        self.base_path = Path("../backend/fenix-expanded-content")
        if not self.base_path.exists():
            # Se não existir, tentar o caminho fornecido
            self.base_path = Path(base_path)
        # Garantir que o caminho seja absoluto
        self.base_path = self.base_path.resolve()
        self.course_types = {}
        self.analysis_results = {}
    
    def analyze_all_courses(self) -> Dict[str, Any]:
        """Analisa todos os cursos e retorna estatísticas detalhadas."""
        print("Iniciando análise de cursos...")
        
        courses = self._discover_courses()
        analysis = {
            'total_courses': len(courses),
            'course_types': {},
            'module_patterns': {},
            'lesson_patterns': {},
            'content_analysis': {},
            'recommendations': []
        }
        
        for course_name, course_data in courses.items():
            course_analysis = self._analyze_course(course_name, course_data)
            analysis['course_types'][course_name] = course_analysis['type']
            analysis['module_patterns'][course_name] = course_analysis['module_patterns']
            analysis['lesson_patterns'][course_name] = course_analysis['lesson_patterns']
            analysis['content_analysis'][course_name] = course_analysis['content_analysis']
        
        # Gerar recomendações
        analysis['recommendations'] = self._generate_recommendations(analysis)
        
        self.analysis_results = analysis
        return analysis
    
    def _discover_courses(self) -> Dict[str, Any]:
        """Descobre todos os cursos disponíveis."""
        courses = {}
        
        if not self.base_path.exists():
            return courses
        
        for course_dir in self.base_path.iterdir():
            if course_dir.is_dir() and not course_dir.name.startswith('.'):
                course_name = course_dir.name
                modules = self._discover_modules(course_dir)
                courses[course_name] = {
                    'path': str(course_dir),
                    'modules': modules,
                    'total_modules': len(modules)
                }
        
        return courses
    
    def _discover_modules(self, course_path: Path) -> Dict[str, Any]:
        """Descobre módulos de um curso."""
        modules = {}
        modulos_path = course_path / "modulos"
        
        if not modulos_path.exists():
            return modules
        
        for module_dir in modulos_path.iterdir():
            if module_dir.is_dir() and module_dir.name.startswith('modulo'):
                module_name = module_dir.name
                lessons = self._discover_lessons(module_dir)
                modules[module_name] = {
                    'path': str(module_dir),
                    'lessons': lessons,
                    'total_lessons': len(lessons)
                }
        
        return modules
    
    def _discover_lessons(self, module_path: Path) -> List[Dict[str, Any]]:
        """Descobre aulas de um módulo."""
        lessons = []
        aulas_path = module_path / "aulas"
        
        if not aulas_path.exists():
            return lessons
        
        for lesson_file in aulas_path.glob("*.md"):
            if lesson_file.is_file():
                lesson_data = self._analyze_lesson_file(lesson_file)
                lessons.append(lesson_data)
        
        return sorted(lessons, key=lambda x: x.get('lesson_number', 0))
    
    def _analyze_course(self, course_name: str, course_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analisa um curso específico."""
        course_type = self._determine_course_type(course_name, course_data)
        module_patterns = self._analyze_module_patterns(course_data['modules'])
        lesson_patterns = self._analyze_lesson_patterns(course_data['modules'])
        content_analysis = self._analyze_course_content(course_data['modules'])
        
        return {
            'type': course_type,
            'module_patterns': module_patterns,
            'lesson_patterns': lesson_patterns,
            'content_analysis': content_analysis
        }
    
    def _determine_course_type(self, course_name: str, course_data: Dict[str, Any]) -> str:
        """Determina o tipo de curso baseado no nome e conteúdo."""
        course_name_lower = course_name.lower()
        
        # Mapeamento de tipos de curso
        type_mapping = {
            'backend': ['backend', 'api', 'server', 'node', 'python', 'java'],
            'frontend': ['frontend', 'react', 'vue', 'angular', 'html', 'css', 'javascript'],
            'mobile': ['mobile', 'react-native', 'flutter', 'ios', 'android'],
            'data_science': ['data', 'python', 'machine', 'learning', 'analytics', 'science'],
            'devops': ['devops', 'docker', 'kubernetes', 'ci', 'cd', 'deploy'],
            'cybersecurity': ['security', 'cyber', 'hack', 'penetration', 'ciberseguranca'],
            'fullstack': ['fullstack', 'full-stack', 'full', 'stack'],
            'ui_ux': ['ui', 'ux', 'design', 'interface', 'usuario'],
            'blockchain': ['blockchain', 'smart', 'contract', 'crypto', 'bitcoin'],
            'aws': ['aws', 'cloud', 'amazon', 'ec2', 's3'],
            'web': ['web', 'fundamentals', 'basico', 'introducao']
        }
        
        for course_type, keywords in type_mapping.items():
            if any(keyword in course_name_lower for keyword in keywords):
                return course_type
        
        return 'generic'
    
    def _analyze_module_patterns(self, modules: Dict[str, Any]) -> Dict[str, Any]:
        """Analisa padrões dos módulos."""
        if not modules:
            return {}
        
        module_numbers = []
        lesson_counts = []
        
        for module_name, module_data in modules.items():
            # Extrair número do módulo
            match = re.search(r'modulo-(\d+)', module_name)
            if match:
                module_numbers.append(int(match.group(1)))
            
            lesson_counts.append(module_data['total_lessons'])
        
        return {
            'total_modules': len(modules),
            'module_numbers': sorted(module_numbers),
            'avg_lessons_per_module': sum(lesson_counts) / len(lesson_counts) if lesson_counts else 0,
            'max_lessons_in_module': max(lesson_counts) if lesson_counts else 0,
            'min_lessons_in_module': min(lesson_counts) if lesson_counts else 0
        }
    
    def _analyze_lesson_patterns(self, modules: Dict[str, Any]) -> Dict[str, Any]:
        """Analisa padrões das aulas."""
        all_lessons = []
        objectives_count = Counter()
        duration_count = Counter()
        level_count = Counter()
        
        for module_data in modules.values():
            for lesson in module_data['lessons']:
                all_lessons.append(lesson)
                
                # Contar objetivos
                for obj in lesson.get('objectives', []):
                    objectives_count[obj] += 1
                
                # Contar durações
                duration = lesson.get('duration', 0)
                if duration > 0:
                    duration_count[duration] += 1
                
                # Contar níveis
                level = lesson.get('level', 'unknown')
                level_count[level] += 1
        
        return {
            'total_lessons': len(all_lessons),
            'avg_duration': sum(lesson.get('duration', 0) for lesson in all_lessons) / len(all_lessons) if all_lessons else 0,
            'common_objectives': objectives_count.most_common(10),
            'duration_distribution': dict(duration_count),
            'level_distribution': dict(level_count),
            'lessons_with_code': sum(1 for lesson in all_lessons if lesson.get('has_code_blocks', False)),
            'lessons_with_exercises': sum(1 for lesson in all_lessons if lesson.get('has_exercises', False)),
            'lessons_with_brazilian_cases': sum(1 for lesson in all_lessons if lesson.get('has_brazilian_cases', False))
        }
    
    def _analyze_course_content(self, modules: Dict[str, Any]) -> Dict[str, Any]:
        """Analisa o conteúdo dos cursos."""
        all_lessons = []
        for module_data in modules.values():
            all_lessons.extend(module_data['lessons'])
        
        if not all_lessons:
            return {}
        
        # Análise de conteúdo
        total_content_length = sum(lesson.get('content_length', 0) for lesson in all_lessons)
        avg_content_length = total_content_length / len(all_lessons)
        
        # Análise de estrutura
        has_code_blocks = sum(1 for lesson in all_lessons if lesson.get('has_code_blocks', False))
        has_exercises = sum(1 for lesson in all_lessons if lesson.get('has_exercises', False))
        has_brazilian_cases = sum(1 for lesson in all_lessons if lesson.get('has_brazilian_cases', False))
        
        return {
            'total_content_length': total_content_length,
            'avg_content_length': avg_content_length,
            'lessons_with_code_percentage': (has_code_blocks / len(all_lessons)) * 100,
            'lessons_with_exercises_percentage': (has_exercises / len(all_lessons)) * 100,
            'lessons_with_brazilian_cases_percentage': (has_brazilian_cases / len(all_lessons)) * 100,
            'content_quality_score': self._calculate_content_quality_score(all_lessons)
        }
    
    def _calculate_content_quality_score(self, lessons: List[Dict[str, Any]]) -> float:
        """Calcula um score de qualidade do conteúdo."""
        if not lessons:
            return 0.0
        
        score = 0.0
        total_lessons = len(lessons)
        
        # Pontuação baseada em características do conteúdo
        for lesson in lessons:
            lesson_score = 0.0
            
            # Código presente
            if lesson.get('has_code_blocks', False):
                lesson_score += 2.0
            
            # Exercícios presentes
            if lesson.get('has_exercises', False):
                lesson_score += 2.0
            
            # Casos brasileiros
            if lesson.get('has_brazilian_cases', False):
                lesson_score += 1.5
            
            # Duração adequada (entre 30 e 120 minutos)
            duration = lesson.get('duration', 0)
            if 30 <= duration <= 120:
                lesson_score += 1.0
            elif duration > 0:
                lesson_score += 0.5
            
            # Conteúdo com tamanho adequado
            content_length = lesson.get('content_length', 0)
            if 1000 <= content_length <= 10000:
                lesson_score += 1.0
            elif content_length > 0:
                lesson_score += 0.5
            
            # Objetivos definidos
            objectives = lesson.get('objectives', [])
            if len(objectives) >= 3:
                lesson_score += 1.0
            elif len(objectives) > 0:
                lesson_score += 0.5
            
            score += lesson_score
        
        return (score / (total_lessons * 8.0)) * 100  # Normalizar para 0-100
    
    def _analyze_lesson_file(self, lesson_file: Path) -> Dict[str, Any]:
        """Analisa um arquivo de aula específico."""
        try:
            with open(lesson_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            lesson_data = {
                'file_path': str(lesson_file),
                'file_name': lesson_file.name,
                'content_length': len(content),
                'has_code_blocks': '```' in content,
                'has_exercises': 'exercício' in content.lower() or 'desafio' in content.lower(),
                'has_brazilian_cases': 'brasileiro' in content.lower() or 'brasil' in content.lower(),
                'lesson_number': self._extract_lesson_number(lesson_file.name),
                'module_number': self._extract_module_number(lesson_file.name)
            }
            
            # Extrair título
            title_match = re.search(r'#\s*\*\*(.*?)\*\*', content)
            if title_match:
                lesson_data['title'] = title_match.group(1).strip()
            
            # Extrair objetivos
            lesson_data['objectives'] = self._extract_objectives(content)
            
            # Extrair duração
            duration_match = re.search(r'Duração Estimada:\s*(\d+)\s*min', content)
            if duration_match:
                lesson_data['duration'] = int(duration_match.group(1))
            
            # Extrair nível
            level_match = re.search(r'Nível:\s*(\w+)', content)
            if level_match:
                lesson_data['level'] = level_match.group(1)
            
            return lesson_data
            
        except Exception as e:
            return {
                'file_path': str(lesson_file),
                'file_name': lesson_file.name,
                'error': str(e)
            }
    
    def _extract_lesson_number(self, filename: str) -> int:
        """Extrai número da aula do nome do arquivo."""
        match = re.search(r'aula-(\d+)', filename)
        return int(match.group(1)) if match else 0
    
    def _extract_module_number(self, filename: str) -> int:
        """Extrai número do módulo do nome do arquivo."""
        match = re.search(r'modulo-(\d+)', filename)
        return int(match.group(1)) if match else 0
    
    def _extract_objectives(self, content: str) -> List[str]:
        """Extrai objetivos de aprendizado do conteúdo."""
        objectives = []
        lines = content.split('\n')
        in_objectives = False
        
        for line in lines:
            if 'Objetivos de Aprendizado' in line or 'Objetivos do Módulo' in line:
                in_objectives = True
                continue
            elif in_objectives and line.strip().startswith('-'):
                obj = line.strip()[1:].strip()
                if obj.startswith('✅') or obj.startswith('-'):
                    obj = obj[1:].strip()
                objectives.append(obj)
            elif in_objectives and line.strip() and not line.startswith(' '):
                break
        
        return objectives
    
    def _generate_recommendations(self, analysis: Dict[str, Any]) -> List[str]:
        """Gera recomendações baseadas na análise."""
        recommendations = []
        
        # Análise geral
        total_courses = analysis['total_courses']
        if total_courses == 0:
            recommendations.append("Nenhum curso encontrado. Verifique a estrutura de diretórios.")
            return recommendations
        
        # Análise por tipo de curso
        course_types = analysis['course_types']
        type_counts = Counter(course_types.values())
        
        if type_counts['generic'] > total_courses * 0.3:
            recommendations.append("Muitos cursos classificados como 'generic'. Considere melhorar a nomenclatura dos diretórios.")
        
        # Análise de qualidade de conteúdo
        for course_name, content_analysis in analysis['content_analysis'].items():
            quality_score = content_analysis.get('content_quality_score', 0)
            
            if quality_score < 50:
                recommendations.append(f"Curso '{course_name}' tem score de qualidade baixo ({quality_score:.1f}%). Considere melhorar o conteúdo.")
            elif quality_score < 70:
                recommendations.append(f"Curso '{course_name}' tem score de qualidade médio ({quality_score:.1f}%). Há espaço para melhorias.")
        
        # Análise de padrões de módulos
        for course_name, module_patterns in analysis['module_patterns'].items():
            avg_lessons = module_patterns.get('avg_lessons_per_module', 0)
            
            if avg_lessons < 5:
                recommendations.append(f"Curso '{course_name}' tem poucas aulas por módulo ({avg_lessons:.1f}). Considere adicionar mais conteúdo.")
            elif avg_lessons > 25:
                recommendations.append(f"Curso '{course_name}' tem muitas aulas por módulo ({avg_lessons:.1f}). Considere dividir em mais módulos.")
        
        # Análise de padrões de aulas
        for course_name, lesson_patterns in analysis['lesson_patterns'].items():
            code_percentage = lesson_patterns.get('lessons_with_code_percentage', 0)
            exercise_percentage = lesson_patterns.get('lessons_with_exercises_percentage', 0)
            brazilian_cases_percentage = lesson_patterns.get('lessons_with_brazilian_cases_percentage', 0)
            
            if code_percentage < 50:
                recommendations.append(f"Curso '{course_name}' tem poucos códigos de exemplo ({code_percentage:.1f}%). Adicione mais exemplos práticos.")
            
            if exercise_percentage < 30:
                recommendations.append(f"Curso '{course_name}' tem poucos exercícios ({exercise_percentage:.1f}%). Adicione mais atividades práticas.")
            
            if brazilian_cases_percentage < 20:
                recommendations.append(f"Curso '{course_name}' tem poucos casos brasileiros ({brazilian_cases_percentage:.1f}%). Adicione mais exemplos do mercado brasileiro.")
        
        return recommendations
    
    def save_analysis_report(self, output_path: str = "course_analysis_report.json"):
        """Salva o relatório de análise."""
        if not self.analysis_results:
            self.analyze_all_courses()
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.analysis_results, f, indent=2, ensure_ascii=False)
        
        print(f"Relatório de análise salvo em: {output_path}")
    
    def print_summary(self):
        """Imprime um resumo da análise."""
        if not self.analysis_results:
            self.analyze_all_courses()
        
        print("\n" + "="*60)
        print("RESUMO DA ANÁLISE DE CURSOS")
        print("="*60)
        
        print(f"Total de cursos: {self.analysis_results['total_courses']}")
        
        # Tipos de curso
        course_types = self.analysis_results['course_types']
        type_counts = Counter(course_types.values())
        print(f"\nDistribuição por tipo:")
        for course_type, count in type_counts.most_common():
            print(f"  {course_type}: {count} cursos")
        
        # Recomendações
        recommendations = self.analysis_results['recommendations']
        if recommendations:
            print(f"\nRecomendações ({len(recommendations)}):")
            for i, rec in enumerate(recommendations, 1):
                print(f"  {i}. {rec}")
        
        print("\n" + "="*60)
