#!/usr/bin/env python3
"""
Aplicador de Conteúdo Técnico - Fenix Academy
Aplica o gerador de conteúdo técnico a todos os cursos
"""

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from technical_content_generator import TechnicalContentGenerator

class TechnicalContentApplier:
    def __init__(self):
        self.generator = TechnicalContentGenerator()
        self.courses = {
            'web-fundamentals': {
                'title': 'Web Fundamentals',
                'topics': [
                    'HTML5 e Semântica',
                    'CSS3 Avançado e Seletores',
                    'JavaScript ES6+ e Moderno',
                    'React Fundamentals',
                    'Node.js e Express',
                    'APIs RESTful',
                    'Autenticação JWT',
                    'Bancos de Dados SQL',
                    'MongoDB e NoSQL',
                    'Segurança Web',
                    'Performance e SEO',
                    'Progressive Web Apps',
                    'Docker e Containers',
                    'CI/CD com GitHub Actions',
                    'AWS e Cloud Computing',
                    'TypeScript',
                    'Testing com Jest',
                    'Redux e State Management',
                    'Next.js App Router'
                ]
            },
            'react-advanced': {
                'title': 'React Avançado e Moderno',
                'topics': [
                    'React 18 e Novas Features',
                    'Concurrent Features e Suspense',
                    'Server Components',
                    'Hooks Avançados',
                    'Custom Hooks',
                    'Context API Avançado',
                    'State Management com Redux Toolkit',
                    'Zustand e Jotai',
                    'React Query e Cache',
                    'Performance Optimization',
                    'Code Splitting e Lazy Loading',
                    'Error Boundaries',
                    'Testing com React Testing Library',
                    'Storybook e Component Library',
                    'Micro-frontends',
                    'React Native',
                    'Next.js 13+',
                    'Server-Side Rendering',
                    'Static Site Generation',
                    'Deployment e DevOps'
                ]
            },
            'nodejs-apis': {
                'title': 'Node.js e APIs Backend',
                'topics': [
                    'Introdução ao Node.js',
                    'Event Loop e Async Programming',
                    'NPM e Package Management',
                    'Express.js Fundamentos',
                    'Middleware e Routing',
                    'RESTful API Design',
                    'Autenticação e Authorization',
                    'JWT Tokens',
                    'OAuth 2.0',
                    'Database Integration',
                    'MongoDB com Mongoose',
                    'PostgreSQL com Sequelize',
                    'Redis para Cache',
                    'Testing APIs',
                    'Performance e Optimization',
                    'Microservices Architecture',
                    'Deployment e DevOps',
                    'Security Best Practices',
                    'API Documentation',
                    'Monitoring e Logging'
                ]
            },
            'python-data-science': {
                'title': 'Python para Data Science',
                'topics': [
                    'Introdução ao Python para Dados',
                    'NumPy Fundamentals',
                    'Pandas DataFrames',
                    'Data Cleaning e Preprocessing',
                    'Data Visualization com Matplotlib',
                    'Seaborn para Visualizações Avançadas',
                    'Plotly para Visualizações Interativas',
                    'Statistical Analysis',
                    'Machine Learning com Scikit-learn',
                    'Deep Learning com TensorFlow',
                    'PyTorch para Deep Learning',
                    'Jupyter Notebooks',
                    'Data Pipelines',
                    'Big Data com Apache Spark',
                    'Cloud Computing para Dados',
                    'Deployment de Modelos',
                    'A/B Testing',
                    'Time Series Analysis',
                    'Natural Language Processing',
                    'Computer Vision'
                ]
            },
            'devops-docker': {
                'title': 'DevOps e Docker',
                'topics': [
                    'Introdução ao DevOps',
                    'Docker Fundamentos',
                    'Dockerfile e Build',
                    'Docker Compose',
                    'Kubernetes Básico',
                    'CI/CD com GitHub Actions',
                    'Jenkins Pipeline',
                    'Infraestrutura como Código',
                    'Terraform Básico',
                    'Ansible Automation',
                    'Monitoramento e Observabilidade',
                    'Prometheus e Grafana',
                    'ELK Stack',
                    'Segurança DevOps',
                    'Cloud Platforms',
                    'AWS Services',
                    'Azure Services',
                    'Google Cloud',
                    'Microservices',
                    'Testing Strategies'
                ]
            }
        }
    
    def apply_to_course(self, course_key: str):
        """Aplica conteúdo técnico a um curso específico"""
        course = self.courses[course_key]
        base_path = f'backend/fenix-expanded-content/{course_key}/avancado'
        
        print(f"\n🚀 Aplicando conteúdo técnico para: {course['title']}")
        print(f"📊 Total de tópicos: {len(course['topics'])}")
        
        for i, topic in enumerate(course['topics'], 1):
            module_index = (i - 1) // 5  # 5 aulas por módulo
            module = f"Módulo {module_index + 1}: {topic.split()[0]}"
            
            lesson_content = self.generator.generate_technical_lesson(
                topic, 
                course['title'], 
                module, 
                i
            )
            
            # Salvar arquivo
            filename = f'aula-{i:02d}-modulo-{module_index+1:02d}-{course_key}.md'
            filepath = os.path.join(base_path, filename)
            
            os.makedirs(os.path.dirname(filepath), exist_ok=True)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(lesson_content)
            
            print(f"✅ Aula {i:02d} atualizada: {topic}")
    
    def apply_to_all_courses(self):
        """Aplica conteúdo técnico a todos os cursos"""
        print("🎓 FENIX ACADEMY - APLICADOR DE CONTEÚDO TÉCNICO")
        print("=" * 60)
        
        for course_key in self.courses.keys():
            try:
                self.apply_to_course(course_key)
                print(f"✅ {self.courses[course_key]['title']} - Concluído!")
            except Exception as e:
                print(f"❌ Erro em {course_key}: {str(e)}")
        
        print("\n🎉 Aplicação de conteúdo técnico concluída!")
        print("📚 Conteúdo específico e tecnicamente correto implementado!")

if __name__ == "__main__":
    applier = TechnicalContentApplier()
    
    if len(sys.argv) > 1:
        course_key = sys.argv[1]
        if course_key in applier.courses:
            applier.apply_to_course(course_key)
        else:
            print(f"❌ Curso não encontrado: {course_key}")
            print(f"Cursos disponíveis: {list(applier.courses.keys())}")
    else:
        applier.apply_to_all_courses()
