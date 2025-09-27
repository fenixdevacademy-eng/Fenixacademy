#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para processar todos os cursos de uma vez, criando conteúdos específicos
e códigos de exemplos específicos para cada módulo de cada curso.

Autor: Fenix Academy
Data: 2024
"""

import os
import json
import re
import shutil
from pathlib import Path
from typing import Dict, List, Any, Optional
from datetime import datetime
import logging

# Importar módulos locais
from content_generators import ContentGenerator
from code_example_generators import CodeExampleGenerator
from course_analyzer import CourseAnalyzer

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('course_processing.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class CourseProcessor:
    """Classe principal para processar todos os cursos."""
    
    def __init__(self, base_path: str = "backend/fenix-expanded-content"):
        # Tentar primeiro o caminho relativo do diretório scripts
        self.base_path = Path("../backend/fenix-expanded-content")
        if not self.base_path.exists():
            # Se não existir, tentar o caminho fornecido
            self.base_path = Path(base_path)
        # Garantir que o caminho seja absoluto
        self.base_path = self.base_path.resolve()
        self.output_path = Path("processed_courses")
        self.courses_data = {}
        self.templates = {}
        
        # Criar diretório de saída se não existir
        self.output_path.mkdir(exist_ok=True)
        
        # Inicializar componentes
        self.content_generator = ContentGenerator()
        self.code_generator = CodeExampleGenerator()
        self.course_analyzer = CourseAnalyzer(str(self.base_path))
        
        # Inicializar templates
        self._load_templates()
    
    def _load_templates(self):
        """Carrega templates para diferentes tipos de conteúdo."""
        self.templates = {
            'lesson_header': self._get_lesson_header_template(),
            'code_example': self._get_code_example_template(),
            'practical_exercise': self._get_practical_exercise_template(),
            'brazilian_case': self._get_brazilian_case_template(),
            'module_readme': self._get_module_readme_template()
        }
    
    def discover_courses(self) -> Dict[str, Any]:
        """Descobre todos os cursos disponíveis na estrutura."""
        logger.info("Descobrindo cursos...")
        courses = {}
        
        if not self.base_path.exists():
            logger.error(f"Diretório base não encontrado: {self.base_path}")
            return courses
        
        # Percorrer todos os diretórios de cursos
        for course_dir in self.base_path.iterdir():
            if course_dir.is_dir() and not course_dir.name.startswith('.'):
                course_name = course_dir.name
                logger.info(f"Processando curso: {course_name}")
                
                # Descobrir módulos do curso
                modules = self._discover_modules(course_dir)
                courses[course_name] = {
                    'path': str(course_dir),
                    'modules': modules,
                    'total_modules': len(modules),
                    'total_lessons': sum(len(module.get('lessons', [])) for module in modules.values())
                }
        
        self.courses_data = courses
        logger.info(f"Encontrados {len(courses)} cursos")
        return courses
    
    def _discover_modules(self, course_path: Path) -> Dict[str, Any]:
        """Descobre módulos de um curso específico."""
        modules = {}
        modulos_path = course_path / "modulos"
        
        if not modulos_path.exists():
            logger.warning(f"Nenhum diretório 'modulos' encontrado em {course_path}")
            return modules
        
        for module_dir in modulos_path.iterdir():
            if module_dir.is_dir() and module_dir.name.startswith('modulo'):
                module_name = module_dir.name
                logger.info(f"  Processando módulo: {module_name}")
                
                # Descobrir aulas do módulo
                lessons = self._discover_lessons(module_dir)
                modules[module_name] = {
                    'path': str(module_dir),
                    'lessons': lessons,
                    'total_lessons': len(lessons)
                }
        
        return modules
    
    def _discover_lessons(self, module_path: Path) -> List[Dict[str, Any]]:
        """Descobre aulas de um módulo específico."""
        lessons = []
        aulas_path = module_path / "aulas"
        
        if not aulas_path.exists():
            logger.warning(f"Nenhum diretório 'aulas' encontrado em {module_path}")
            return lessons
        
        for lesson_file in aulas_path.glob("*.md"):
            if lesson_file.is_file():
                lesson_data = self._analyze_lesson(lesson_file)
                lessons.append(lesson_data)
        
        return sorted(lessons, key=lambda x: x.get('lesson_number', 0))
    
    def _analyze_lesson(self, lesson_file: Path) -> Dict[str, Any]:
        """Analisa uma aula específica para extrair informações."""
        try:
            with open(lesson_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extrair informações básicas
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
            
            # Extrair título da aula
            title_match = re.search(r'#\s*\*\*(.*?)\*\*', content)
            if title_match:
                lesson_data['title'] = title_match.group(1).strip()
            
            # Extrair objetivos de aprendizado
            objectives = self._extract_objectives(content)
            lesson_data['objectives'] = objectives
            
            # Extrair duração estimada
            duration_match = re.search(r'Duração Estimada:\s*(\d+)\s*min', content)
            if duration_match:
                lesson_data['duration'] = int(duration_match.group(1))
            
            # Extrair nível
            level_match = re.search(r'Nível:\s*(\w+)', content)
            if level_match:
                lesson_data['level'] = level_match.group(1)
            
            return lesson_data
            
        except Exception as e:
            logger.error(f"Erro ao analisar aula {lesson_file}: {e}")
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
    
    def process_all_courses(self):
        """Processa todos os cursos descobertos."""
        logger.info("Iniciando processamento de todos os cursos...")
        
        # Primeiro, analisar a estrutura dos cursos
        logger.info("Analisando estrutura dos cursos...")
        analysis = self.course_analyzer.analyze_all_courses()
        self.course_analyzer.print_summary()
        
        # Descobrir cursos
        courses = self.discover_courses()
        
        if not courses:
            logger.error("Nenhum curso encontrado para processar")
            return
        
        # Processar cada curso
        for course_name, course_data in courses.items():
            logger.info(f"Processando curso: {course_name}")
            self._process_course(course_name, course_data)
        
        # Gerar relatório final
        self._generate_final_report()
        
        logger.info("Processamento concluído!")
    
    def _process_course(self, course_name: str, course_data: Dict[str, Any]):
        """Processa um curso específico."""
        course_output_path = self.output_path / course_name
        course_output_path.mkdir(exist_ok=True)
        
        logger.info(f"  Processando {course_data['total_modules']} módulos e {course_data['total_lessons']} aulas...")
        
        # Processar cada módulo
        for module_name, module_data in course_data['modules'].items():
            self._process_module(course_name, module_name, module_data, course_output_path)
    
    def _process_module(self, course_name: str, module_name: str, module_data: Dict[str, Any], course_output_path: Path):
        """Processa um módulo específico."""
        module_output_path = course_output_path / module_name
        module_output_path.mkdir(exist_ok=True)
        
        logger.info(f"    Processando módulo: {module_name}")
        
        # Processar cada aula
        for lesson_data in module_data['lessons']:
            self._process_lesson(course_name, module_name, lesson_data, module_output_path)
        
        # Gerar README do módulo
        self._generate_module_readme(course_name, module_name, module_data, module_output_path)
    
    def _process_lesson(self, course_name: str, module_name: str, lesson_data: Dict[str, Any], module_output_path: Path):
        """Processa uma aula específica."""
        if 'error' in lesson_data:
            logger.error(f"      Erro na aula {lesson_data['file_name']}: {lesson_data['error']}")
            return
        
        logger.info(f"      Processando aula: {lesson_data.get('title', lesson_data['file_name'])}")
        
        # Ler conteúdo original
        try:
            with open(lesson_data['file_path'], 'r', encoding='utf-8') as f:
                original_content = f.read()
        except Exception as e:
            logger.error(f"      Erro ao ler arquivo {lesson_data['file_path']}: {e}")
            return
        
        # Gerar conteúdo melhorado
        enhanced_content = self._enhance_lesson_content(
            course_name, module_name, lesson_data, original_content
        )
        
        # Salvar conteúdo processado
        output_file = module_output_path / lesson_data['file_name']
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(enhanced_content)
        
        # Gerar códigos de exemplo específicos
        self._generate_specific_code_examples(
            course_name, module_name, lesson_data, module_output_path
        )
    
    def _enhance_lesson_content(self, course_name: str, module_name: str, lesson_data: Dict[str, Any], original_content: str) -> str:
        """Melhora o conteúdo de uma aula específica."""
        # Determinar tipo do curso
        course_type = self._determine_course_type(course_name)
        
        # Usar o gerador de conteúdo para melhorar a aula
        enhanced_content = self.content_generator.generate_enhanced_content(
            course_type, lesson_data, original_content
        )
        
        return enhanced_content
    
    def _determine_course_type(self, course_name: str) -> str:
        """Determina o tipo de curso baseado no nome."""
        course_name_lower = course_name.lower()
        
        type_mapping = {
            'backend': ['backend', 'api', 'server', 'node', 'python', 'java'],
            'frontend': ['frontend', 'react', 'vue', 'angular', 'html', 'css', 'javascript', 'web'],
            'mobile': ['mobile', 'react-native', 'flutter', 'ios', 'android'],
            'data_science': ['data', 'python', 'machine', 'learning', 'analytics', 'science'],
            'devops': ['devops', 'docker', 'kubernetes', 'ci', 'cd', 'deploy'],
            'cybersecurity': ['security', 'cyber', 'hack', 'penetration', 'ciberseguranca'],
            'fullstack': ['fullstack', 'full-stack', 'full', 'stack'],
            'ui_ux': ['ui', 'ux', 'design', 'interface', 'usuario'],
            'blockchain': ['blockchain', 'smart', 'contract', 'crypto', 'bitcoin'],
            'aws': ['aws', 'cloud', 'amazon', 'ec2', 's3']
        }
        
        for course_type, keywords in type_mapping.items():
            if any(keyword in course_name_lower for keyword in keywords):
                return course_type
        
        return 'generic'
    
    def _generate_specific_code_examples(self, course_name: str, module_name: str, lesson_data: Dict[str, Any], module_output_path: Path):
        """Gera códigos de exemplo específicos para a aula."""
        examples_path = module_output_path / "exemplos"
        examples_path.mkdir(exist_ok=True)
        
        # Determinar tipo do curso
        course_type = self._determine_course_type(course_name)
        
        # Usar o gerador de códigos para criar exemplos específicos
        self.code_generator.generate_code_examples(
            course_type, lesson_data, examples_path
        )
        
        logger.info(f"        Gerando códigos de exemplo para {lesson_data['file_name']}")
    
    def _generate_module_readme(self, course_name: str, module_name: str, module_data: Dict[str, Any], module_output_path: Path):
        """Gera README específico para o módulo."""
        readme_content = self.templates['module_readme'].format(
            course_name=course_name,
            module_name=module_name,
            total_lessons=module_data['total_lessons'],
            lessons_list=self._generate_lessons_list(module_data['lessons'])
        )
        
        readme_file = module_output_path / "README.md"
        with open(readme_file, 'w', encoding='utf-8') as f:
            f.write(readme_content)
    
    def _generate_lessons_list(self, lessons: List[Dict[str, Any]]) -> str:
        """Gera lista de aulas para o README do módulo."""
        lessons_list = []
        for lesson in lessons:
            title = lesson.get('title', lesson['file_name'])
            lessons_list.append(f"- [{title}]({lesson['file_name']})")
        return '\n'.join(lessons_list)
    
    def _generate_final_report(self):
        """Gera relatório final do processamento."""
        report = {
            'timestamp': datetime.now().isoformat(),
            'total_courses': len(self.courses_data),
            'total_modules': sum(course['total_modules'] for course in self.courses_data.values()),
            'total_lessons': sum(course['total_lessons'] for course in self.courses_data.values()),
            'courses': self.courses_data
        }
        
        report_file = self.output_path / "processing_report.json"
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Relatório salvo em: {report_file}")
    
    # Templates
    def _get_lesson_header_template(self) -> str:
        return """# 🎓 **{course_name} - {module_name}**

## 📚 **Aula {lesson_number}: {title}**

### 🎯 **Objetivos de Aprendizado**
{objectives}

**Duração Estimada:** {duration} min  
**Nível:** {level}  
**Tipo:** {type}  
**Pré-requisitos:** {prerequisites}

---
"""
    
    def _get_code_example_template(self) -> str:
        return """```{language}
// Exemplo prático de {topic}
{code}
```"""
    
    def _get_practical_exercise_template(self) -> str:
        return """## 🚀 **Exercício Prático**

### **Objetivo**
{objective}

### **Requisitos**
{requirements}

### **Solução Sugerida**
{solution}

---
"""
    
    def _get_brazilian_case_template(self) -> str:
        return """## 🇧🇷 **Caso Brasileiro: {company}**

### **Contexto e Desafio**
{context}

### **Solução Implementada**
{solution}

### **Resultados Alcançados**
{results}

---
"""
    
    def _get_module_readme_template(self) -> str:
        return """# 📚 **{module_name} - {course_name}**

## 🎯 **Objetivos do Módulo**

Este módulo foca em conceitos fundamentais e práticos de {course_name}.

### 📋 **Conteúdo do Módulo**

#### **Aulas Disponíveis**
{lessons_list}

#### **Exercícios Práticos**
- [Exercícios](./exemplos/)

---

## 🚀 **Como Estudar**

1. **Leia as aulas** em ordem sequencial
2. **Pratique** com os exercícios
3. **Implemente** os exemplos de código
4. **Teste** suas soluções

---

## 📊 **Progresso**

- [ ] Aula 01 concluída
- [ ] Aula 02 concluída
- [ ] Aula 03 concluída
- [ ] Aula 04 concluída
- [ ] Aula 05 concluída
- [ ] Exercícios práticos
- [ ] Projeto do módulo

---

*{module_name} - {course_name}*
"""

def main():
    """Função principal."""
    logger.info("Iniciando processamento de cursos...")
    
    processor = CourseProcessor()
    processor.process_all_courses()
    
    logger.info("Processamento concluído!")

if __name__ == "__main__":
    main()
