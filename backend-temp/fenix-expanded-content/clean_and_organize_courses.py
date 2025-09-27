#!/usr/bin/env python3
"""
Script para limpar e organizar a estrutura dos cursos da Fênix Academy
Aplica melhorias estruturais e remove arquivos desnecessários
"""

import os
import shutil
import re
from pathlib import Path
import json
from datetime import datetime

class CourseOrganizer:
    def __init__(self, base_path="."):
        self.base_path = Path(base_path)
        self.courses = []
        self.cleaned_files = 0
        self.organized_courses = 0
        
    def find_courses(self):
        """Encontra todos os cursos na pasta"""
        print("🔍 Procurando cursos...")
        
        for item in self.base_path.iterdir():
            if item.is_dir() and not item.name.startswith('.') and not item.name.endswith('.py'):
                # Verificar se é um curso (tem estrutura de aulas)
                if self.is_course_directory(item):
                    self.courses.append(item)
                    print(f"  ✅ Encontrado: {item.name}")
        
        print(f"📊 Total de cursos encontrados: {len(self.courses)}")
        return self.courses
    
    def is_course_directory(self, path):
        """Verifica se um diretório é um curso"""
        # Verificar se tem subdiretórios típicos de curso
        subdirs = [d.name for d in path.iterdir() if d.is_dir()]
        course_indicators = ['avancado', 'intermediario', 'iniciante', 'modulos', 'projetos']
        
        return any(indicator in subdirs for indicator in course_indicators)
    
    def clean_duplicate_files(self, course_path):
        """Remove arquivos duplicados e backups"""
        print(f"🧹 Limpando {course_path.name}...")
        
        files_removed = 0
        
        for root, dirs, files in os.walk(course_path):
            for file in files:
                file_path = Path(root) / file
                
                # Remover arquivos .backup
                if file.endswith('.backup'):
                    file_path.unlink()
                    files_removed += 1
                    print(f"  🗑️ Removido backup: {file}")
                
                # Remover arquivos duplicados (mesmo nome com sufixos diferentes)
                elif self.is_duplicate_file(file_path):
                    file_path.unlink()
                    files_removed += 1
                    print(f"  🗑️ Removido duplicata: {file}")
        
        self.cleaned_files += files_removed
        return files_removed
    
    def is_duplicate_file(self, file_path):
        """Verifica se um arquivo é duplicata"""
        name = file_path.stem
        parent = file_path.parent
        
        # Padrões de duplicatas
        duplicate_patterns = [
            r'^aula-\d+-modulo-\d+-.*-premium$',
            r'^aula-\d+-modulo-\d+-.*-web-fundamentals$',
            r'^aula-\d+-modulo-\d+-.*-introdução-ao-.*$'
        ]
        
        for pattern in duplicate_patterns:
            if re.match(pattern, name):
                # Verificar se existe versão sem sufixo
                base_name = re.sub(r'-(premium|web-fundamentals|introdução-ao-.*)$', '', name)
                base_file = parent / f"{base_name}.md"
                
                if base_file.exists():
                    return True
        
        return False
    
    def standardize_course_structure(self, course_path):
        """Padroniza a estrutura de um curso"""
        print(f"📁 Organizando estrutura de {course_path.name}...")
        
        # Criar estrutura padrão
        standard_dirs = ['modulos', 'projetos', 'recursos', 'exercicios']
        
        for dir_name in standard_dirs:
            dir_path = course_path / dir_name
            if not dir_path.exists():
                dir_path.mkdir()
                print(f"  📂 Criado diretório: {dir_name}")
        
        # Reorganizar aulas existentes
        self.reorganize_lessons(course_path)
        
        # Criar README principal do curso
        self.create_course_readme(course_path)
        
        self.organized_courses += 1
    
    def reorganize_lessons(self, course_path):
        """Reorganiza as aulas em módulos"""
        print(f"  📚 Reorganizando aulas de {course_path.name}...")
        
        # Encontrar todas as aulas
        lessons = []
        for root, dirs, files in os.walk(course_path):
            for file in files:
                if file.endswith('.md') and file.startswith('aula-'):
                    lessons.append(Path(root) / file)
        
        # Agrupar por módulo
        modules = {}
        for lesson in lessons:
            # Extrair número do módulo do nome do arquivo
            match = re.search(r'aula-\d+-modulo-(\d+)', lesson.name)
            if match:
                module_num = int(match.group(1))
                if module_num not in modules:
                    modules[module_num] = []
                modules[module_num].append(lesson)
        
        # Criar estrutura de módulos
        modulos_dir = course_path / 'modulos'
        for module_num, module_lessons in modules.items():
            module_dir = modulos_dir / f'modulo-{module_num:02d}'
            module_dir.mkdir(exist_ok=True)
            
            # Mover aulas para o módulo
            aulas_dir = module_dir / 'aulas'
            aulas_dir.mkdir(exist_ok=True)
            
            for lesson in module_lessons:
                new_path = aulas_dir / lesson.name
                if not new_path.exists():
                    shutil.move(str(lesson), str(new_path))
                    print(f"    📄 Movido: {lesson.name} -> modulo-{module_num:02d}/aulas/")
    
    def create_course_readme(self, course_path):
        """Cria README principal do curso"""
        course_name = course_path.name.replace('-', ' ').title()
        
        readme_content = f"""# 🎓 **{course_name}**

<div align='center'>
<img src='https://img.shields.io/badge/Fenix-Education-#61DAFB?style=for-the-badge&logo=fenix' alt='Fenix Education'/>
<img src='https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge' alt='Status'/>
<img src='https://img.shields.io/badge/Última_Atualização-{datetime.now().year}-blue?style=for-the-badge' alt='Última Atualização'/>
</div>

---

## 🎯 **Objetivos do Curso**

Este curso foi projetado para fornecer conhecimento prático e aplicável em **{course_name}**, preparando você para o mercado de trabalho com projetos reais e casos brasileiros.

### 🌟 **Por que escolher este curso?**
- **Conteúdo PRÁTICO** - Aprenda fazendo, não só lendo
- **Projetos REAIS** - Casos de empresas brasileiras
- **Hands-on IMEDIATO** - Comandos que funcionam
- **Carreira ACELERADA** - Preparação para o mercado
- **Suporte FENIX** - Comunidade ativa

### 📊 **Estrutura do Curso**
- **Módulos**: Organizados por complexidade
- **Aulas**: Conteúdo específico e prático
- **Projetos**: Aplicações reais
- **Exercícios**: Prática hands-on

---

## 📚 **Módulos Disponíveis**

"""
        
        # Adicionar módulos encontrados
        modulos_dir = course_path / 'modulos'
        if modulos_dir.exists():
            for module_dir in sorted(modulos_dir.iterdir()):
                if module_dir.is_dir() and module_dir.name.startswith('modulo-'):
                    module_num = module_dir.name.split('-')[1]
                    readme_content += f"### **Módulo {module_num}**\n"
                    readme_content += f"- [Aulas](./modulos/{module_dir.name}/aulas/)\n"
                    readme_content += f"- [Exercícios](./modulos/{module_dir.name}/exercicios/)\n\n"
        
        readme_content += """---

## 🚀 **Como Começar**

1. **Escolha um módulo** que corresponda ao seu nível
2. **Siga as aulas** em ordem sequencial
3. **Pratique** com os exercícios
4. **Implemente** os projetos práticos

---

## 💰 **Preço e Acesso**

- **R$ 297,00** - Acesso vitalício
- **Sem mensalidades** - Pague uma vez, acesse para sempre
- **Atualizações gratuitas** - Conteúdo sempre atualizado
- **Suporte da comunidade** - Ajuda quando precisar

---

## 🤝 **Suporte**

- **Discord**: Comunidade ativa 24/7
- **GitHub**: Issues e discussões técnicas
- **Email**: suporte@fenixdevacademy.com

---

<div align='center'>
<h3>🚀 Comece sua jornada em {course_name} agora mesmo!</h3>
<p>Escolha um módulo acima e transforme sua carreira!</p>
</div>

---

*🎯 Curso {course_name} - Fenix Education*  
*🌟 Transformando carreiras através da educação de qualidade*
"""
        
        readme_path = course_path / 'README.md'
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(readme_content)
        
        print(f"  📝 Criado README principal")
    
    def create_module_readmes(self, course_path):
        """Cria READMEs para cada módulo"""
        modulos_dir = course_path / 'modulos'
        
        if not modulos_dir.exists():
            return
        
        for module_dir in modulos_dir.iterdir():
            if module_dir.is_dir() and module_dir.name.startswith('modulo-'):
                module_num = module_dir.name.split('-')[1]
                
                readme_content = f"""# 📚 **Módulo {module_num} - {course_path.name.replace('-', ' ').title()}**

## 🎯 **Objetivos do Módulo**

Este módulo foca em conceitos fundamentais e práticos de **{course_path.name.replace('-', ' ').title()}**.

### 📋 **Conteúdo do Módulo**

#### **Aulas Disponíveis**
"""
                
                # Listar aulas do módulo
                aulas_dir = module_dir / 'aulas'
                if aulas_dir.exists():
                    for aula_file in sorted(aulas_dir.glob('*.md')):
                        aula_name = aula_file.stem.replace('-', ' ').title()
                        readme_content += f"- [{aula_name}](./aulas/{aula_file.name})\n"
                
                readme_content += f"""
#### **Exercícios Práticos**
- [Exercícios](./exercicios/)

---

## 🚀 **Como Estudar**

1. **Leia as aulas** em ordem sequencial
2. **Pratique** com os exercícios
3. **Implemente** os exemplos de código
4. **Teste** suas soluções

---

## 📊 **Progresso**

- [ ] Aula 1 concluída
- [ ] Aula 2 concluída
- [ ] Aula 3 concluída
- [ ] Exercícios práticos
- [ ] Projeto do módulo

---

*Módulo {module_num} - {course_path.name.replace('-', ' ').title()}*
"""
                
                readme_path = module_dir / 'README.md'
                with open(readme_path, 'w', encoding='utf-8') as f:
                    f.write(readme_content)
                
                print(f"    📝 Criado README para módulo {module_num}")
    
    def create_practical_projects(self, course_path):
        """Cria projetos práticos para o curso"""
        projetos_dir = course_path / 'projetos'
        
        if not projetos_dir.exists():
            projetos_dir.mkdir()
        
        # Projetos baseados no tipo de curso
        course_type = course_path.name.lower()
        
        if 'web' in course_type or 'frontend' in course_type:
            projects = [
                {
                    'name': 'projeto-01-portfolio-pessoal',
                    'title': 'Portfolio Pessoal Responsivo',
                    'description': 'Crie um portfolio pessoal moderno e responsivo usando HTML5, CSS3 e JavaScript.'
                },
                {
                    'name': 'projeto-02-ecommerce-basico',
                    'title': 'E-commerce Básico',
                    'description': 'Desenvolva uma loja online simples com carrinho de compras e checkout.'
                },
                {
                    'name': 'projeto-03-dashboard-interativo',
                    'title': 'Dashboard Interativo',
                    'description': 'Crie um dashboard com gráficos e visualizações de dados.'
                }
            ]
        elif 'python' in course_type or 'data' in course_type:
            projects = [
                {
                    'name': 'projeto-01-analise-dados-covid',
                    'title': 'Análise de Dados COVID-19',
                    'description': 'Analise dados reais da pandemia no Brasil usando Pandas e Matplotlib.'
                },
                {
                    'name': 'projeto-02-predicao-vendas',
                    'title': 'Predição de Vendas',
                    'description': 'Modele e prediga vendas usando Machine Learning com Scikit-learn.'
                },
                {
                    'name': 'projeto-03-dashboard-financeiro',
                    'title': 'Dashboard Financeiro',
                    'description': 'Crie visualizações interativas de dados financeiros.'
                }
            ]
        elif 'react' in course_type:
            projects = [
                {
                    'name': 'projeto-01-todo-app',
                    'title': 'App de Tarefas (Todo)',
                    'description': 'Desenvolva um app completo de gerenciamento de tarefas com React.'
                },
                {
                    'name': 'projeto-02-blog-dinamico',
                    'title': 'Blog Dinâmico',
                    'description': 'Crie um blog com sistema de posts, comentários e autenticação.'
                },
                {
                    'name': 'projeto-03-dashboard-admin',
                    'title': 'Dashboard Administrativo',
                    'description': 'Desenvolva um painel administrativo completo com gráficos e tabelas.'
                }
            ]
        else:
            # Projetos genéricos
            projects = [
                {
                    'name': 'projeto-01-aplicacao-basica',
                    'title': 'Aplicação Básica',
                    'description': 'Desenvolva uma aplicação básica para praticar os conceitos fundamentais.'
                },
                {
                    'name': 'projeto-02-sistema-intermediario',
                    'title': 'Sistema Intermediário',
                    'description': 'Crie um sistema mais complexo com múltiplas funcionalidades.'
                },
                {
                    'name': 'projeto-03-aplicacao-avancada',
                    'title': 'Aplicação Avançada',
                    'description': 'Desenvolva uma aplicação completa e profissional.'
                }
            ]
        
        # Criar projetos
        for i, project in enumerate(projects, 1):
            project_dir = projetos_dir / project['name']
            project_dir.mkdir(exist_ok=True)
            
            # README do projeto
            project_readme = f"""# 🚀 **{project['title']}**

## 📋 **Descrição do Projeto**

{project['description']}

## 🎯 **Objetivos de Aprendizado**

- Aplicar conceitos práticos do curso
- Desenvolver projeto real e funcional
- Implementar melhores práticas
- Criar portfolio profissional

## 🛠️ **Tecnologias Utilizadas**

- Tecnologias específicas do curso
- Ferramentas de desenvolvimento
- Bibliotecas e frameworks

## 📚 **Requisitos**

- Conhecimento das aulas anteriores
- Ambiente de desenvolvimento configurado
- Acesso à internet

## 🚀 **Como Executar**

1. Clone o repositório
2. Instale as dependências
3. Execute o projeto
4. Acesse no navegador

## 📁 **Estrutura do Projeto**

```
{project['name']}/
├── README.md
├── src/
│   ├── components/
│   ├── pages/
│   └── utils/
├── public/
└── package.json
```

## 🎨 **Funcionalidades**

- [ ] Funcionalidade 1
- [ ] Funcionalidade 2
- [ ] Funcionalidade 3
- [ ] Responsividade
- [ ] Testes

## 📊 **Próximos Passos**

- [ ] Implementar funcionalidade X
- [ ] Adicionar testes
- [ ] Otimizar performance
- [ ] Deploy em produção

---

*Projeto {i} - {course_path.name.replace('-', ' ').title()}*
"""
            
            with open(project_dir / 'README.md', 'w', encoding='utf-8') as f:
                f.write(project_readme)
            
            print(f"    🚀 Criado projeto: {project['title']}")
    
    def run_organization(self):
        """Executa o processo completo de organização"""
        print("🚀 Iniciando organização dos cursos da Fênix Academy...")
        print("=" * 60)
        
        # Encontrar cursos
        courses = self.find_courses()
        
        if not courses:
            print("❌ Nenhum curso encontrado!")
            return
        
        print(f"\n📊 Processando {len(courses)} cursos...")
        print("=" * 60)
        
        for course in courses:
            print(f"\n🎓 Processando: {course.name}")
            print("-" * 40)
            
            # Limpar arquivos duplicados
            files_removed = self.clean_duplicate_files(course)
            print(f"  🗑️ Arquivos removidos: {files_removed}")
            
            # Padronizar estrutura
            self.standardize_course_structure(course)
            
            # Criar READMEs dos módulos
            self.create_module_readmes(course)
            
            # Criar projetos práticos
            self.create_practical_projects(course)
            
            print(f"  ✅ {course.name} organizado com sucesso!")
        
        # Relatório final
        print("\n" + "=" * 60)
        print("🎉 ORGANIZAÇÃO CONCLUÍDA COM SUCESSO!")
        print("=" * 60)
        print(f"📊 Cursos processados: {self.organized_courses}")
        print(f"🗑️ Arquivos removidos: {self.cleaned_files}")
        print(f"📁 Estrutura padronizada: {self.organized_courses} cursos")
        print(f"🚀 Projetos criados: {self.organized_courses * 3} projetos")
        
        print("\n🎯 Melhorias aplicadas:")
        print("  ✅ Estrutura de pastas padronizada")
        print("  ✅ Arquivos duplicados removidos")
        print("  ✅ READMEs informativos criados")
        print("  ✅ Projetos práticos adicionados")
        print("  ✅ Organização hierárquica implementada")
        
        print("\n🚀 Os cursos da Fênix Academy estão agora organizados e prontos!")

if __name__ == "__main__":
    organizer = CourseOrganizer()
    organizer.run_organization()










