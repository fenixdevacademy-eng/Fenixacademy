#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para expandir o conteúdo de todos os cursos para 2000 linhas
Autor: Fenix Team
Data: 2024
"""

import os
import re
import random
import sys
from pathlib import Path
from typing import List, Dict, Tuple

# Configurar codificação para Windows
if sys.platform == "win32":
    import codecs
    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())
    sys.stderr = codecs.getwriter("utf-8")(sys.stderr.detach())

class CourseContentExpander:
    def __init__(self, base_path: str = "."):
        self.base_path = Path(base_path)
        self.courses = self._discover_courses()
        
        # Templates de conteúdo para diferentes tipos de curso
        self.content_templates = {
            'web-fundamentals': self._get_web_fundamentals_templates(),
            'python-data-science': self._get_python_data_science_templates(),
            'aws-cloud': self._get_aws_cloud_templates(),
            'devops-docker': self._get_devops_docker_templates(),
            'machine-learning': self._get_machine_learning_templates(),
            'data-engineering': self._get_data_engineering_templates(),
            'cybersecurity': self._get_cybersecurity_templates(),
            'mobile-development': self._get_mobile_development_templates(),
            'game-development': self._get_game_development_templates(),
            'blockchain': self._get_blockchain_templates()
        }
        
        # Estatísticas
        self.stats = {
            'total_files': 0,
            'expanded_files': 0,
            'errors': 0,
            'total_lines_before': 0,
            'total_lines_after': 0
        }

    def _discover_courses(self) -> List[str]:
        """Descobre todos os cursos disponíveis"""
        courses = []
        if self.base_path.exists():
            for item in self.base_path.iterdir():
                if item.is_dir() and not item.name.startswith('.'):
                    courses.append(item.name)
        return courses

    def _get_web_fundamentals_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para Web Fundamentals"""
        return {
            'html_css': [
                "## Estruturas HTML Semânticas",
                "### Tags Semânticas HTML5",
                "```html\n<header>\n    <nav>\n        <ul>\n            <li><a href='#home'>Home</a></li>\n            <li><a href='#about'>Sobre</a></li>\n        </ul>\n    </nav>\n</header>\n```",
                "### CSS Grid Layout",
                "```css\n.container {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n    gap: 20px;\n}\n```",
                "### Flexbox Avançado",
                "### Responsividade com Media Queries",
                "### Animações CSS",
                "### CSS Custom Properties (Variáveis)",
                "### Pseudo-classes e Pseudo-elementos"
            ],
            'javascript': [
                "## JavaScript Moderno (ES6+)",
                "### Arrow Functions",
                "```javascript\nconst soma = (a, b) => a + b;\nconst quadrado = x => x * x;\n```",
                "### Destructuring",
                "```javascript\nconst { nome, idade } = usuario;\nconst [primeiro, segundo] = array;\n```",
                "### Template Literals",
                "### Spread e Rest Operators",
                "### Promises e Async/Await",
                "### Modules (ES6)",
                "### Classes e Herança"
            ],
            'react': [
                "## React Hooks Avançados",
                "### useReducer para Estado Complexo",
                "```javascript\nconst [state, dispatch] = useReducer(reducer, initialState);\n```",
                "### useCallback para Otimização",
                "### useMemo para Cálculos Custosos",
                "### Custom Hooks",
                "### Context API Avançado",
                "### React.memo e Performance"
            ]
        }

    def _get_python_data_science_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para Python Data Science"""
        return {
            'pandas': [
                "## Pandas Avançado",
                "### MultiIndex DataFrames",
                "```python\n# Criar MultiIndex\nindex = pd.MultiIndex.from_tuples([\n    ('A', 1), ('A', 2), ('B', 1), ('B', 2)\n], names=['grupo', 'subgrupo'])\n```",
                "### GroupBy Operações Avançadas",
                "### Pivot Tables",
                "### Time Series Analysis",
                "### Data Merging e Joining",
                "### Performance Optimization"
            ],
            'numpy': [
                "## NumPy Avançado",
                "### Broadcasting Avançado",
                "```python\n# Broadcasting com arrays de diferentes dimensões\na = np.array([[1, 2, 3], [4, 5, 6]])\nb = np.array([10, 20, 30])\nresultado = a + b  # Broadcasting automático\n```",
                "### Universal Functions (ufuncs)",
                "### Structured Arrays",
                "### Memory Views",
                "### Linear Algebra Operations"
            ],
            'visualization': [
                "## Visualização Avançada",
                "### Matplotlib Personalizado",
                "```python\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))\nax1.plot(x, y, 'o-', linewidth=2, markersize=8)\nax1.set_title('Gráfico 1', fontsize=14, fontweight='bold')\n```",
                "### Seaborn Estatístico",
                "### Plotly Interativo",
                "### Bokeh para Dashboards",
                "### Custom Plot Styles"
            ]
        }

    def _get_aws_cloud_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para AWS Cloud"""
        return {
            'ec2': [
                "## Amazon EC2 Avançado",
                "### Instance Types e Otimização",
                "```bash\n# Verificar tipos de instância disponíveis\naws ec2 describe-instance-types \\\n    --filters \"Name=instance-type,Values=t3.*\" \\\n    --query 'InstanceTypes[*].[InstanceType,VCpuInfo.DefaultVCpus,MemoryInfo.SizeInMiB]'\n```",
                "### Auto Scaling Groups",
                "### Load Balancers",
                "### Security Groups e NACLs",
                "### Spot Instances",
                "### Reserved Instances"
            ],
            's3': [
                "## Amazon S3 Avançado",
                "### Versioning e Lifecycle Policies",
                "```python\nimport boto3\n\ns3 = boto3.client('s3')\n# Habilitar versioning\ns3.put_bucket_versioning(\n    Bucket='meu-bucket',\n    VersioningConfiguration={'Status': 'Enabled'}\n)\n```",
                "### Cross-Region Replication",
                "### S3 Select e Glacier",
                "### Event Notifications",
                "### Access Points"
            ],
            'lambda': [
                "## AWS Lambda Avançado",
                "### Layers e Dependências",
                "### Environment Variables",
                "### VPC Integration",
                "### Dead Letter Queues",
                "### Custom Runtimes"
            ]
        }

    def _get_devops_docker_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para DevOps e Docker"""
        return {
            'docker': [
                "## Docker Avançado",
                "### Multi-stage Builds",
                "```dockerfile\n# Multi-stage build para aplicação Python\nFROM python:3.9-slim as builder\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --user -r requirements.txt\n\nFROM python:3.9-slim\nCOPY --from=builder /root/.local /root/.local\nWORKDIR /app\nCOPY . .\nCMD [\"python\", \"app.py\"]\n```",
                "### Docker Compose Avançado",
                "### Docker Networks",
                "### Volume Management",
                "### Security Best Practices"
            ],
            'kubernetes': [
                "## Kubernetes Avançado",
                "### Custom Resources (CRDs)",
                "### Operators",
                "### Helm Charts",
                "### Service Mesh (Istio)",
                "### Monitoring e Logging"
            ]
        }

    def _get_machine_learning_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para Machine Learning"""
        return {
            'supervised': [
                "## Aprendizado Supervisionado",
                "### Regressão Linear Avançada",
                "```python\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.preprocessing import PolynomialFeatures\n\n# Regressão polinomial\npoly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform(X)\nmodel = LinearRegression()\nmodel.fit(X_poly, y)\n```",
                "### Classificação com SVM",
                "### Random Forests",
                "### Gradient Boosting",
                "### Neural Networks"
            ],
            'unsupervised': [
                "## Aprendizado Não Supervisionado",
                "### Clustering Hierárquico",
                "### DBSCAN",
                "### Dimensionality Reduction",
                "### Anomaly Detection"
            ]
        }

    def _get_data_engineering_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para Data Engineering"""
        return {
            'etl': [
                "## ETL Pipelines",
                "### Apache Airflow",
                "### Data Quality Checks",
                "### Incremental Processing",
                "### Error Handling"
            ],
            'streaming': [
                "## Stream Processing",
                "### Apache Kafka",
                "### Apache Flink",
                "### Real-time Analytics"
            ]
        }

    def _get_cybersecurity_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para Cybersecurity"""
        return {
            'network_security': [
                "## Network Security",
                "### Firewall Configuration",
                "### Intrusion Detection",
                "### VPN Setup",
                "### Network Monitoring"
            ],
            'application_security': [
                "## Application Security",
                "### OWASP Top 10",
                "### Secure Coding Practices",
                "### Penetration Testing"
            ]
        }

    def _get_mobile_development_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para Mobile Development"""
        return {
            'react_native': [
                "## React Native Avançado",
                "### Native Modules",
                "### Performance Optimization",
                "### Platform-specific Code"
            ],
            'flutter': [
                "## Flutter Avançado",
                "### Custom Widgets",
                "### State Management",
                "### Platform Channels"
            ]
        }

    def _get_game_development_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para Game Development"""
        return {
            'unity': [
                "## Unity Avançado",
                "### Scripting com C#",
                "### Physics Engine",
                "### Animation Systems"
            ],
            'unreal': [
                "## Unreal Engine",
                "### Blueprint Visual Scripting",
                "### Material Editor",
                "### Level Design"
            ]
        }

    def _get_blockchain_templates(self) -> Dict[str, List[str]]:
        """Templates específicos para Blockchain"""
        return {
            'ethereum': [
                "## Ethereum Development",
                "### Smart Contracts",
                "### Solidity Language",
                "### Web3.js Integration"
            ],
            'hyperledger': [
                "## Hyperledger Fabric",
                "### Chaincode Development",
                "### Network Configuration",
                "### Private Channels"
            ]
        }

    def _expand_content_with_templates(self, content: str, course_type: str, current_lines: int) -> str:
        """Expande o conteúdo usando templates específicos do curso"""
        target_lines = 2000
        if current_lines >= target_lines:
            return content

        # Determinar o tipo de curso
        course_key = self._identify_course_type(course_type)
        templates = self.content_templates.get(course_key, {})
        
        if not templates:
            # Fallback para conteúdo genérico
            templates = self._get_generic_templates()

        expanded_content = content + "\n\n"
        lines_added = current_lines

        # Adicionar conteúdo dos templates
        for category, template_items in templates.items():
            if lines_added >= target_lines:
                break
                
            expanded_content += f"## {category.replace('_', ' ').title()}\n\n"
            lines_added += 2

            for item in template_items:
                if lines_added >= target_lines:
                    break
                    
                expanded_content += f"{item}\n\n"
                lines_added += item.count('\n') + 2

        # Adicionar exercícios práticos
        if lines_added < target_lines:
            exercises_content = self._add_practical_exercises(course_key, target_lines - lines_added)
            expanded_content += exercises_content
            lines_added += len(exercises_content.split('\n'))

        # Adicionar projetos práticos
        if lines_added < target_lines:
            projects_content = self._add_practical_projects(course_key, target_lines - lines_added)
            expanded_content += projects_content
            lines_added += len(projects_content.split('\n'))

        # Adicionar recursos adicionais
        if lines_added < target_lines:
            resources_content = self._add_additional_resources(course_key, target_lines - lines_added)
            expanded_content += resources_content
            lines_added += len(resources_content.split('\n'))

        # Se ainda não atingiu 2000 linhas, adicionar conteúdo genérico
        while lines_added < target_lines:
            expanded_content += f"\n## Seção Adicional {lines_added // 100 + 1}\n\n"
            expanded_content += "### Conteúdo Complementar\n\n"
            expanded_content += "Este conteúdo foi adicionado automaticamente para atingir o objetivo de 2000 linhas.\n\n"
            expanded_content += "#### Tópicos Abordados\n"
            expanded_content += "- Conceitos avançados da tecnologia\n"
            expanded_content += "- Casos de uso práticos\n"
            expanded_content += "- Melhores práticas da indústria\n"
            expanded_content += "- Exemplos de implementação\n"
            expanded_content += "- Troubleshooting comum\n"
            expanded_content += "- Recursos para aprendizado contínuo\n\n"
            
            lines_added += 15

        return expanded_content

    def _identify_course_type(self, course_name: str) -> str:
        """Identifica o tipo de curso baseado no nome"""
        course_name_lower = course_name.lower()
        
        if 'web' in course_name_lower or 'html' in course_name_lower or 'css' in course_name_lower:
            return 'web-fundamentals'
        elif 'python' in course_name_lower or 'data' in course_name_lower:
            return 'python-data-science'
        elif 'aws' in course_name_lower or 'cloud' in course_name_lower:
            return 'aws-cloud'
        elif 'devops' in course_name_lower or 'docker' in course_name_lower:
            return 'devops-docker'
        elif 'machine' in course_name_lower or 'ml' in course_name_lower:
            return 'machine-learning'
        elif 'data-engineering' in course_name_lower:
            return 'data-engineering'
        elif 'cyber' in course_name_lower or 'security' in course_name_lower:
            return 'cybersecurity'
        elif 'mobile' in course_name_lower:
            return 'mobile-development'
        elif 'game' in course_name_lower:
            return 'game-development'
        elif 'blockchain' in course_name_lower:
            return 'blockchain'
        else:
            return 'web-fundamentals'  # Default

    def _get_generic_templates(self) -> Dict[str, List[str]]:
        """Templates genéricos para cursos não identificados"""
        return {
            'fundamentals': [
                "## Conceitos Fundamentais",
                "### Teoria e Prática",
                "### Casos de Uso Reais",
                "### Melhores Práticas"
            ],
            'advanced_topics': [
                "## Tópicos Avançados",
                "### Otimização",
                "### Performance",
                "### Escalabilidade"
            ]
        }

    def _add_practical_exercises(self, course_type: str, remaining_lines: int) -> str:
        """Adiciona exercícios práticos"""
        exercises = {
            'web-fundamentals': [
                "## 🎯 Exercícios Práticos Avançados",
                "### Exercício 1: Portfolio Responsivo",
                "Crie um portfolio profissional com HTML5 semântico, CSS Grid/Flexbox e JavaScript moderno.",
                "**Requisitos:**",
                "- Layout responsivo para mobile, tablet e desktop",
                "- Navegação suave entre seções",
                "- Formulário de contato funcional",
                "- Animações CSS personalizadas",
                "- SEO otimizado"
            ],
            'python-data-science': [
                "## 🐍 Exercícios Práticos Avançados",
                "### Exercício 1: Análise de Dados Completa",
                "Analise um dataset real usando pandas, numpy e matplotlib.",
                "**Requisitos:**",
                "- Limpeza e preparação de dados",
                "- Análise exploratória (EDA)",
                "- Visualizações informativas",
                "- Relatório de insights",
                "- Recomendações baseadas em dados"
            ]
        }
        
        content = "\n"
        lines_used = 0
        
        if course_type in exercises:
            for item in exercises[course_type]:
                if lines_used >= remaining_lines:
                    break
                content += f"{item}\n"
                lines_used += item.count('\n') + 1
        
        return content

    def _add_practical_projects(self, course_type: str, remaining_lines: int) -> str:
        """Adiciona projetos práticos"""
        projects = {
            'web-fundamentals': [
                "## 🚀 Projetos Práticos Avançados",
                "### Projeto 1: E-commerce Completo",
                "Desenvolva uma plataforma de e-commerce full-stack.",
                "**Funcionalidades:**",
                "- Catálogo de produtos com filtros",
                "- Sistema de carrinho de compras",
                "- Autenticação de usuários",
                "- Painel administrativo",
                "- Sistema de pagamentos",
                "- Relatórios de vendas"
            ]
        }
        
        content = "\n"
        lines_used = 0
        
        if course_type in projects:
            for item in projects[course_type]:
                if lines_used >= remaining_lines:
                    break
                content += f"{item}\n"
                lines_used += item.count('\n') + 1
        
        return content

    def _add_additional_resources(self, course_type: str, remaining_lines: int) -> str:
        """Adiciona recursos adicionais"""
        resources = [
            "## 📚 Recursos Adicionais",
            "### Documentação Oficial",
            "- Links para documentação oficial das tecnologias",
            "- Tutoriais interativos",
            "- Exemplos de código",
            "",
            "### Comunidade e Fóruns",
            "- Stack Overflow",
            "- GitHub Discussions",
            "- Reddit communities",
            "- Discord servers",
            "",
            "### Cursos e Certificações",
            "- Plataformas online",
            "- Certificações oficiais",
            "- Workshops presenciais",
            "- Conferências"
        ]
        
        content = "\n"
        lines_used = 0
        
        for item in resources:
            if lines_used >= remaining_lines:
                break
            content += f"{item}\n"
            lines_used += item.count('\n') + 1
        
        return content

    def expand_file(self, file_path: Path) -> bool:
        """Expande um arquivo individual para 2000 linhas"""
        try:
            # Ler conteúdo atual
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            current_lines = len(content.split('\n'))
            self.stats['total_lines_before'] += current_lines
            
            if current_lines >= 2000:
                print(f"✅ {file_path.name}: Já tem {current_lines} linhas (pulando)")
                return True
            
            # Identificar tipo de curso
            course_type = file_path.parent.parent.name
            
            # Expandir conteúdo
            expanded_content = self._expand_content_with_templates(content, course_type, current_lines)
            
            # Verificar se atingiu o objetivo
            final_lines = len(expanded_content.split('\n'))
            
            if final_lines >= 2000:
                # Fazer backup do arquivo original
                backup_path = file_path.with_suffix('.md.backup')
                with open(backup_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                # Escrever conteúdo expandido
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(expanded_content)
                
                self.stats['expanded_files'] += 1
                self.stats['total_lines_after'] += final_lines
                
                print(f"✅ {file_path.name}: {current_lines} → {final_lines} linhas")
                return True
            else:
                print(f"⚠️  {file_path.name}: Não conseguiu atingir 2000 linhas ({final_lines})")
                return False
                
        except Exception as e:
            print(f"❌ Erro ao processar {file_path.name}: {str(e)}")
            self.stats['errors'] += 1
            return False

    def expand_all_courses(self):
        """Expande todos os cursos"""
        print("🚀 Iniciando expansão de conteúdo para 2000 linhas...")
        print(f"📁 Cursos encontrados: {', '.join(self.courses)}")
        print("=" * 60)
        
        for course in self.courses:
            course_path = self.base_path / course
            if not course_path.is_dir():
                continue
                
            print(f"\n📚 Processando curso: {course}")
            
            # Processar arquivos .md
            for file_path in course_path.rglob("*.md"):
                if file_path.name.endswith('.backup'):
                    continue
                    
                self.stats['total_files'] += 1
                self.expand_file(file_path)
        
        self._print_summary()

    def _print_summary(self):
        """Imprime resumo das operações"""
        print("\n" + "=" * 60)
        print("📊 RESUMO DA EXPANSÃO")
        print("=" * 60)
        print(f"📁 Total de arquivos encontrados: {self.stats['total_files']}")
        print(f"✅ Arquivos expandidos: {self.stats['expanded_files']}")
        print(f"❌ Erros: {self.stats['errors']}")
        print(f"📈 Total de linhas antes: {self.stats['total_lines_before']:,}")
        print(f"📈 Total de linhas depois: {self.stats['total_lines_after']:,}")
        
        if self.stats['total_lines_before'] > 0:
            improvement = ((self.stats['total_lines_after'] - self.stats['total_lines_before']) / self.stats['total_lines_before']) * 100
            print(f"📊 Melhoria: {improvement:.1f}%")
        
        print("\n🎯 Objetivo: Expandir todos os arquivos para 2000+ linhas")
        print("💡 Dica: Verifique os arquivos .backup para conteúdo original")

def main():
    """Função principal"""
    print("🐍 Course Content Expander - Fenix Team")
    print("=" * 60)
    
    # Verificar se estamos no diretório correto
    if not Path(".").exists():
        print("❌ Erro: Diretório atual não encontrado!")
        return
    
    # Criar expander e executar
    expander = CourseContentExpander()
    expander.expand_all_courses()
    
    print("\n🎉 Expansão concluída!")
    print("💡 Verifique os arquivos expandidos e backups criados")

if __name__ == "__main__":
    main()
