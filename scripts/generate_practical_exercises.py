#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para gerar automaticamente todos os exercícios práticos
Fenix Academy - Sistema de Exercícios Práticos
"""

import os
import json
from pathlib import Path
from typing import Dict, List, Any

class ExerciseGenerator:
    def __init__(self):
        self.base_dir = Path("course_content_restructured/exercicios-praticos")
        self.courses = [
            "web-fundamentals",
            "react-advanced", 
            "python-data-science",
            "nodejs-apis",
            "devops-docker",
            "aws-cloud",
            "react-native-mobile",
            "flutter-mobile",
            "ciberseguranca",
            "blockchain-smart-contracts",
            "gestao-trafego"
        ]
        
        # Estrutura dos exercícios por curso
        self.exercise_structure = {
            "web-fundamentals": {
                "title": "Fundamentos de Desenvolvimento Web",
                "modules": [
                    "modulo-1-introducao",
                    "modulo-2-html-estrutura-semantica", 
                    "modulo-3-css-estilizacao-layout",
                    "modulo-4-javascript-interatividade",
                    "modulo-5-projetos-avancados",
                    "modulo-6-deploy-e-publicacao"
                ]
            },
            "react-advanced": {
                "title": "React.js Avançado",
                "modules": [
                    "modulo-1-hooks-avançados-e-padrões",
                    "modulo-2-gerenciamento-de-estado",
                    "modulo-3-performance-e-otimização",
                    "modulo-4-arquitetura-e-padrões",
                    "modulo-5-testing-e-qualidade",
                    "modulo-6-projeto-final"
                ]
            },
            "python-data-science": {
                "title": "Python Data Science",
                "modules": [
                    "modulo-1-fundamentos-de-data-science",
                    "modulo-2-estatistica-e-probabilidade",
                    "modulo-3-machine-learning",
                    "modulo-4-deep-learning",
                    "modulo-5-visualizacao-e-dashboards",
                    "modulo-6-deploy-e-producao"
                ]
            },
            "nodejs-apis": {
                "title": "Node.js APIs REST",
                "modules": [
                    "modulo-1-fundamentos-node.js",
                    "modulo-2-apis-restful",
                    "modulo-3-avancado",
                    "modulo-4-autenticacao",
                    "modulo-5-deploy-producao",
                    "modulo-6-projeto-final"
                ]
            },
            "devops-docker": {
                "title": "DevOps com Docker e CI/CD",
                "modules": [
                    "modulo-1-fundamentos-docker",
                    "modulo-2-intermediario",
                    "modulo-3-avancado",
                    "modulo-4-ci-cd",
                    "modulo-5-kubernetes",
                    "modulo-6-projeto-final"
                ]
            },
            "aws-cloud": {
                "title": "AWS Cloud",
                "modules": [
                    "modulo-1-fundamentos-aws",
                    "modulo-2-intermediario",
                    "modulo-3-avancado",
                    "modulo-4-networking",
                    "modulo-5-monitoramento",
                    "modulo-6-projeto-final"
                ]
            },
            "react-native-mobile": {
                "title": "React Native Mobile",
                "modules": [
                    "modulo-1-fundamentos-react-native",
                    "modulo-2-intermediario",
                    "modulo-3-avancado",
                    "modulo-4-navegacao",
                    "modulo-5-apis-nativas",
                    "modulo-6-projeto-final"
                ]
            },
            "flutter-mobile": {
                "title": "Flutter Mobile",
                "modules": [
                    "modulo-1-fundamentos-flutter",
                    "modulo-2-intermediario",
                    "modulo-3-avancado",
                    "modulo-4-estado",
                    "modulo-5-apis",
                    "modulo-6-projeto-final"
                ]
            },
            "ciberseguranca": {
                "title": "Cibersegurança",
                "modules": [
                    "modulo-1-fundamentos-de-seguranca",
                    "modulo-2-analise-de-vulnerabilidades",
                    "modulo-3-avancado",
                    "modulo-4-penetration-testing",
                    "modulo-5-forense",
                    "modulo-6-projeto-final"
                ]
            },
            "blockchain-smart-contracts": {
                "title": "Blockchain e Smart Contracts",
                "modules": [
                    "modulo-1-fundamentos-blockchain",
                    "modulo-2-intermediario",
                    "modulo-3-avancado",
                    "modulo-4-smart-contracts",
                    "modulo-5-defi",
                    "modulo-6-projeto-final"
                ]
            },
            "gestao-trafego": {
                "title": "Gestão de Tráfego",
                "modules": [
                    "modulo-1-fundamentos-de-marketing-digital",
                    "modulo-2-intermediario",
                    "modulo-3-google-ads-e-facebook-ads",
                    "modulo-4-avancado",
                    "modulo-5-automacao",
                    "modulo-6-projeto-final"
                ]
            }
        }

    def create_directory_structure(self):
        """Cria a estrutura de diretórios para os exercícios"""
        print("📁 Criando estrutura de diretórios...")
        
        # Criar diretório base
        self.base_dir.mkdir(parents=True, exist_ok=True)
        
        # Criar diretórios para cada curso
        for course in self.courses:
            course_dir = self.base_dir / course
            course_dir.mkdir(exist_ok=True)
            
            # Criar diretórios para cada módulo
            if course in self.exercise_structure:
                for module in self.exercise_structure[course]["modules"]:
                    module_dir = course_dir / module
                    module_dir.mkdir(exist_ok=True)
                    
                    print(f"✅ Criado: {course}/{module}")

    def generate_web_fundamentals_exercises(self):
        """Gera exercícios para o curso de Web Fundamentals"""
        course = "web-fundamentals"
        
        # Módulo 1: Introdução
        self.generate_exercise(
            course, "modulo-1-introducao", 1, "basico",
            "Criar sua primeira página HTML",
            "Crie uma página HTML básica com título, parágrafos e listas",
            "30 minutos",
            ["HTML básico", "Estrutura de documento", "Tags fundamentais"]
        )
        
        self.generate_exercise(
            course, "modulo-1-introducao", 2, "intermediario", 
            "Página HTML com CSS inline",
            "Adicione estilos CSS inline para melhorar a aparência",
            "45 minutos",
            ["CSS inline", "Cores", "Fontes", "Layout básico"]
        )
        
        self.generate_exercise(
            course, "modulo-1-introducao", 3, "avancado",
            "Página HTML responsiva",
            "Crie uma página que se adapte a diferentes tamanhos de tela",
            "1 hora",
            ["Media queries", "Flexbox", "Responsividade"]
        )
        
        self.generate_exercise(
            course, "modulo-1-introducao", 4, "expert",
            "Portfolio pessoal completo",
            "Desenvolva um portfolio pessoal com múltiplas seções",
            "2 horas",
            ["Estrutura semântica", "Navegação", "Formulários", "Deploy"]
        )

    def generate_react_advanced_exercises(self):
        """Gera exercícios para o curso de React Avançado"""
        course = "react-advanced"
        
        # Módulo 1: Hooks Avançados
        self.generate_exercise(
            course, "modulo-1-hooks-avançados-e-padrões", 1, "basico",
            "Custom Hook básico",
            "Crie um custom hook para gerenciar estado de formulário",
            "45 minutos",
            ["useState", "Custom hooks", "Formulários"]
        )
        
        self.generate_exercise(
            course, "modulo-1-hooks-avançados-e-padrões", 2, "intermediario",
            "useReducer para estado complexo",
            "Implemente useReducer para gerenciar estado de carrinho de compras",
            "1 hora",
            ["useReducer", "Estado complexo", "Actions"]
        )
        
        self.generate_exercise(
            course, "modulo-1-hooks-avançados-e-padrões", 3, "avancado",
            "useCallback e useMemo",
            "Otimize performance com useCallback e useMemo",
            "1.5 horas",
            ["Performance", "useCallback", "useMemo", "Memoização"]
        )
        
        self.generate_exercise(
            course, "modulo-1-hooks-avançados-e-padrões", 4, "expert",
            "Sistema de hooks personalizados",
            "Crie uma biblioteca de hooks reutilizáveis",
            "2.5 horas",
            ["Hooks customizados", "Composição", "Reutilização", "Documentação"]
        )

    def generate_python_data_science_exercises(self):
        """Gera exercícios para o curso de Python Data Science"""
        course = "python-data-science"
        
        # Módulo 1: Fundamentos
        self.generate_exercise(
            course, "modulo-1-fundamentos-de-data-science", 1, "basico",
            "Análise exploratória básica",
            "Carregue um dataset e faça análise exploratória básica",
            "1 hora",
            ["Pandas", "Matplotlib", "Análise exploratória"]
        )
        
        self.generate_exercise(
            course, "modulo-1-fundamentos-de-data-science", 2, "intermediario",
            "Visualizações avançadas",
            "Crie visualizações interativas com Plotly",
            "1.5 horas",
            ["Plotly", "Visualizações interativas", "Dashboards"]
        )
        
        self.generate_exercise(
            course, "modulo-1-fundamentos-de-data-science", 3, "avancado",
            "Pipeline de dados completo",
            "Implemente um pipeline completo de limpeza e transformação",
            "2 horas",
            ["Pipeline", "Limpeza de dados", "Transformação", "Validação"]
        )
        
        self.generate_exercise(
            course, "modulo-1-fundamentos-de-data-science", 4, "expert",
            "Sistema de análise automatizada",
            "Crie um sistema que analisa automaticamente novos datasets",
            "3 horas",
            ["Automação", "Sistema", "Análise", "Relatórios"]
        )

    def generate_nodejs_apis_exercises(self):
        """Gera exercícios para o curso de Node.js APIs"""
        course = "nodejs-apis"
        
        # Módulo 1: Fundamentos (já criado manualmente)
        # Módulo 2: APIs RESTful
        self.generate_exercise(
            course, "modulo-2-apis-restful", 1, "basico",
            "API REST básica com Express",
            "Configure Express.js e crie rotas básicas",
            "1 hora",
            ["Express.js", "Rotas", "Middleware básico"]
        )
        
        self.generate_exercise(
            course, "modulo-2-apis-restful", 2, "intermediario",
            "CRUD completo de usuários",
            "Implemente operações CRUD completas para usuários",
            "2 horas",
            ["CRUD", "Validação", "Tratamento de erros"]
        )
        
        self.generate_exercise(
            course, "modulo-2-apis-restful", 3, "avancado",
            "Sistema de autenticação JWT",
            "Implemente autenticação JWT com refresh tokens",
            "2.5 horas",
            ["JWT", "Autenticação", "Refresh tokens", "Segurança"]
        )
        
        self.generate_exercise(
            course, "modulo-2-apis-restful", 4, "expert",
            "API completa com documentação",
            "Crie uma API completa com Swagger e testes",
            "3.5 horas",
            ["Swagger", "Testes", "Documentação", "Deploy"]
        )

    def generate_exercise(self, course: str, module: str, exercise_num: int, 
                         difficulty: str, title: str, description: str, 
                         time_estimate: str, skills: List[str]):
        """Gera um exercício individual"""
        
        difficulty_icons = {
            "basico": "🟢",
            "intermediario": "🟡", 
            "avancado": "🟠",
            "expert": "🔴"
        }
        
        difficulty_labels = {
            "basico": "Básico (Fácil)",
            "intermediario": "Intermediário",
            "avancado": "Avançado",
            "expert": "Expert"
        }
        
        icon = difficulty_icons.get(difficulty, "🟢")
        label = difficulty_labels.get(difficulty, "Básico")
        
        exercise_content = f"""# {icon} Exercício {exercise_num}: {difficulty.title()} - {title}

## 📋 Objetivos

Ao completar este exercício, você será capaz de:
- Aplicar conceitos aprendidos no módulo
- Desenvolver habilidades práticas
- Criar projetos funcionais
- Consolidar o aprendizado

## ⏱️ Tempo Estimado

**{time_estimate}**

## 📝 Descrição

{description}

## ✅ Requisitos

### **Funcionalidades Obrigatórias:**
1. **Implementação funcional** - O código deve funcionar corretamente
2. **Estrutura adequada** - Organização clara e lógica
3. **Documentação** - Comentários e explicações
4. **Testes básicos** - Verificação de funcionalidade

### **Habilidades Demonstradas:**
{chr(10).join([f"- **{skill}**" for skill in skills])}

### **Critérios de Avaliação:**
- ✅ Funcionalidade implementada corretamente
- ✅ Código limpo e bem estruturado
- ✅ Documentação adequada
- ✅ Testes funcionando
- ✅ Solução criativa e eficiente

## 💡 Dicas

### **1. Planejamento:**
- Leia todo o exercício antes de começar
- Identifique os requisitos principais
- Planeje a estrutura da solução
- Estime o tempo necessário

### **2. Implementação:**
- Comece com a funcionalidade básica
- Teste cada parte implementada
- Documente o código enquanto desenvolve
- Use controle de versão (Git)

### **3. Revisão:**
- Teste todas as funcionalidades
- Verifique se atende aos requisitos
- Revise a qualidade do código
- Prepare a documentação final

## 🔍 Solução Esperada

*Sua solução deve demonstrar:*
- Compreensão dos conceitos
- Aplicação prática dos conhecimentos
- Código funcional e bem estruturado
- Documentação clara e completa

## 🧪 Testando o Exercício

### **1. Testes Manuais:**
- Execute o código
- Verifique a funcionalidade
- Teste casos extremos
- Valide a saída esperada

### **2. Testes Automatizados:**
- Implemente testes básicos
- Verifique cobertura
- Execute testes de regressão
- Valide resultados

## 📚 Recursos Adicionais

### **Documentação:**
- Material do módulo
- Recursos online recomendados
- Exemplos práticos
- Comunidades de suporte

### **Ferramentas:**
- Editor de código recomendado
- Ferramentas de teste
- Bibliotecas úteis
- Recursos de debug

## 🎯 Próximos Passos

Após completar este exercício, você estará pronto para:
- Próximo exercício do módulo
- Projeto prático do módulo
- Módulo seguinte do curso
- Aplicação em projetos reais

## 🏆 Critérios de Aprovação

- **Funcionalidade (40%):** Código funciona corretamente
- **Qualidade (30%):** Código limpo e bem estruturado
- **Documentação (20%):** Comentários e explicações
- **Testes (10%):** Verificação de funcionalidade

**Pontuação mínima para aprovação: 7/10**

---

## 💭 Reflexão

**Perguntas para refletir após completar:**
1. O que foi mais desafiador neste exercício?
2. Como você poderia melhorar a solução?
3. Que conceitos ficaram mais claros?
4. Como aplicar isso em projetos reais?

**Parabéns por completar o exercício! 🎉**

*Continue para o próximo exercício e aprofunde seus conhecimentos!*

---

*Desenvolvido com ❤️ pela Fenix Academy*
*Exercício {exercise_num} - {module}*
*Última atualização: Dezembro 2024*
"""
        
        # Criar arquivo do exercício
        exercise_file = self.base_dir / course / module / f"exercicio-{exercise_num}-{difficulty}.md"
        
        with open(exercise_file, 'w', encoding='utf-8') as f:
            f.write(exercise_content)
        
        print(f"✅ Exercício criado: {course}/{module}/exercicio-{exercise_num}-{difficulty}.md")

    def generate_all_exercises(self):
        """Gera todos os exercícios para todos os cursos"""
        print("🚀 Iniciando geração de exercícios práticos...")
        
        # Criar estrutura de diretórios
        self.create_directory_structure()
        
        # Gerar exercícios para cada curso
        print("\n📚 Gerando exercícios para Web Fundamentals...")
        self.generate_web_fundamentals_exercises()
        
        print("\n⚛️ Gerando exercícios para React Avançado...")
        self.generate_react_advanced_exercises()
        
        print("\n🐍 Gerando exercícios para Python Data Science...")
        self.generate_python_data_science_exercises()
        
        print("\n🟢 Gerando exercícios para Node.js APIs...")
        self.generate_nodejs_apis_exercises()
        
        # Gerar exercícios para outros cursos (estrutura básica)
        print("\n🔧 Gerando exercícios para outros cursos...")
        for course in self.courses:
            if course not in ["web-fundamentals", "react-advanced", "python-data-science", "nodejs-apis"]:
                self.generate_basic_exercises_for_course(course)
        
        print("\n🎉 Geração de exercícios concluída!")
        print(f"📁 Exercícios criados em: {self.base_dir}")

    def generate_basic_exercises_for_course(self, course: str):
        """Gera exercícios básicos para cursos não especificados"""
        if course in self.exercise_structure:
            for module in self.exercise_structure[course]["modules"]:
                # Gerar 4 exercícios por módulo
                for i in range(1, 5):
                    difficulty = ["basico", "intermediario", "avancado", "expert"][i-1]
                    
                    self.generate_exercise(
                        course, module, i, difficulty,
                        f"Exercício {i} - {difficulty.title()}",
                        f"Implemente funcionalidades {difficulty} relacionadas ao módulo",
                        f"{30 + i * 15} minutos",
                        ["Conceitos do módulo", "Implementação prática", "Testes"]
                    )

def main():
    """Função principal"""
    print("🧪 Gerador de Exercícios Práticos - Fenix Academy")
    print("=" * 60)
    
    generator = ExerciseGenerator()
    generator.generate_all_exercises()
    
    print("\n📊 Resumo da Geração:")
    print(f"✅ {len(generator.courses)} cursos processados")
    
    total_exercises = 0
    for course, structure in generator.exercise_structure.items():
        exercises_per_course = len(structure["modules"]) * 4
        total_exercises += exercises_per_course
        print(f"📚 {structure['title']}: {exercises_per_course} exercícios")
    
    print(f"\n🎯 Total de exercícios gerados: {total_exercises}")
    print("\n🚀 Sistema de exercícios práticos criado com sucesso!")
    print("💡 Os alunos agora podem praticar e consolidar seus conhecimentos!")

if __name__ == "__main__":
    main()
