#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sistema de Avaliação e Certificação
Fenix Dev Academy - Sistema Completo de Avaliação
"""

import os
import json
from pathlib import Path

class AssessmentSystem:
    def __init__(self, base_path="."):
        self.base_path = Path(base_path)
        self.assessment_structure = self.define_assessment_structure()
        
    def define_assessment_structure(self):
        """Define a estrutura de avaliação para cada curso"""
        return {
            "web-fundamentals": {
                "name": "Web Fundamentals",
                "levels": {
                    "iniciante": {"modules": [1, 2, 3, 4, 5], "certificate": "Web Developer Iniciante"},
                    "intermediario": {"modules": [6, 7, 8, 9, 10], "certificate": "Web Developer Intermediário"},
                    "avancado": {"modules": [11, 12, 13, 14, 15], "certificate": "Web Developer Avançado"},
                    "expert": {"modules": [16, 17, 18, 19, 20], "certificate": "Web Developer Expert"}
                }
            },
            "react-frontend": {
                "name": "React & Frontend Avançado",
                "levels": {
                    "iniciante": {"modules": [1, 2, 3, 4, 5], "certificate": "React Developer Iniciante"},
                    "intermediario": {"modules": [6, 7, 8, 9, 10], "certificate": "React Developer Intermediário"},
                    "avancado": {"modules": [11, 12, 13, 14, 15], "certificate": "React Developer Avançado"},
                    "expert": {"modules": [16, 17, 18, 19, 20], "certificate": "React Developer Expert"}
                }
            },
            "backend-fullstack": {
                "name": "Backend & Full-Stack",
                "levels": {
                    "iniciante": {"modules": [1, 2, 3, 4, 5], "certificate": "Backend Developer Iniciante"},
                    "intermediario": {"modules": [6, 7, 8, 9, 10], "certificate": "Backend Developer Intermediário"},
                    "avancado": {"modules": [11, 12, 13, 14, 15], "certificate": "Backend Developer Avançado"},
                    "expert": {"modules": [16, 17, 18, 19, 20], "certificate": "Backend Developer Expert"}
                }
            }
        }
    
    def create_assessment_structure(self):
        """Cria a estrutura de avaliação para todos os cursos"""
        for course_key, course_info in self.assessment_structure.items():
            # Criar diretório de avaliações
            assessment_path = self.base_path / course_key / "avaliacoes"
            assessment_path.mkdir(exist_ok=True)
            
            # Criar README principal de avaliações
            self.create_assessment_readme(assessment_path, course_info)
            
            # Criar avaliações por nível
            for level_key, level_info in course_info["levels"].items():
                self.create_level_assessment(assessment_path, course_key, level_key, level_info)
    
    def create_assessment_readme(self, assessment_path, course_info):
        """Cria o README principal de avaliações"""
        readme_content = f"""# 🎓 **Sistema de Avaliação - {course_info['name']}**

<div align='center'>
<img src='https://img.shields.io/badge/Fenix-Education-#61DAFB?style=for-the-badge&logo=fenix' alt='Fenix Education'/>
<img src='https://img.shields.io/badge/Sistema-Avaliação-success?style=for-the-badge' alt='Sistema de Avaliação'/>
<img src='https://img.shields.io/badge/Certificação-Profissional-blue?style=for-the-badge' alt='Certificação'/>
</div>

---

## 🎯 **Sistema de Avaliação**

O sistema de avaliação da Fenix Dev Academy é projetado para validar seu conhecimento e prepará-lo para o mercado de trabalho.

### 📊 **Níveis de Certificação**

"""
        
        for level_key, level_info in course_info["levels"].items():
            level_name = level_key.title()
            modules = level_info["modules"]
            certificate = level_info["certificate"]
            
            readme_content += f"""#### **{level_name.title()}**
- **Módulos:** {modules[0]}-{modules[-1]}
- **Certificado:** {certificate}
- **Avaliação:** [Avaliação {level_name.title()}](./{level_key}/)

"""
        
        readme_content += """---

## 🚀 **Como Funciona**

### **1. Estudo dos Módulos**
- Complete todos os módulos do nível
- Pratique com os exercícios
- Desenvolva os projetos práticos

### **2. Avaliação Teórica**
- Quiz de 50 questões
- Tempo limite: 90 minutos
- Nota mínima: 70%

### **3. Avaliação Prática**
- Projeto prático completo
- Avaliação de código
- Apresentação técnica

### **4. Certificação**
- Certificado digital
- Badge no LinkedIn
- Portfólio validado

---

## 📋 **Critérios de Avaliação**

### **Avaliação Teórica (40%)**
- Conceitos fundamentais
- Melhores práticas
- Resolução de problemas
- Arquitetura e design

### **Avaliação Prática (60%)**
- Qualidade do código
- Funcionalidade do projeto
- Documentação técnica
- Deploy e produção

---

## 🏆 **Certificados Disponíveis**

"""
        
        for level_key, level_info in course_info["levels"].items():
            level_name = level_key.title()
            certificate = level_info["certificate"]
            readme_content += f"- **{certificate}** - Validação de conhecimento {level_name.lower()}\n"
        
        readme_content += """
---

## 📚 **Recursos de Estudo**

- **Material de Apoio:** Guias e tutoriais
- **Simulados:** Testes práticos
- **Comunidade:** Suporte entre alunos
- **Mentoria:** Acompanhamento personalizado

---

## 🤝 **Suporte**

- **Discord**: Comunidade ativa 24/7
- **Email**: avaliacoes@fenixdevacademy.com
- **WhatsApp**: Suporte direto

---

*Sistema de Avaliação - Fenix Dev Academy*  
*🌟 Certificando desenvolvedores de excelência*
"""
        
        with open(assessment_path / "README.md", "w", encoding="utf-8") as f:
            f.write(readme_content)
    
    def create_level_assessment(self, assessment_path, course_key, level_key, level_info):
        """Cria a avaliação para um nível específico"""
        level_path = assessment_path / level_key
        level_path.mkdir(exist_ok=True)
        
        # Criar README do nível
        self.create_level_readme(level_path, course_key, level_key, level_info)
        
        # Criar avaliação teórica
        self.create_theoretical_assessment(level_path, course_key, level_key, level_info)
        
        # Criar avaliação prática
        self.create_practical_assessment(level_path, course_key, level_key, level_info)
        
        # Criar simulados
        self.create_practice_tests(level_path, course_key, level_key, level_info)
    
    def create_level_readme(self, level_path, course_key, level_key, level_info):
        """Cria o README do nível de avaliação"""
        level_name = level_key.title()
        certificate = level_info["certificate"]
        modules = level_info["modules"]
        
        readme_content = f"""# 🎓 **Avaliação {level_name} - {certificate}**

## 🎯 **Objetivos da Avaliação**

Esta avaliação valida seu conhecimento em **{level_name.lower()}** e confere o certificado **{certificate}**.

### 📋 **Pré-requisitos**
- Conclusão dos módulos {modules[0]}-{modules[-1]}
- Projetos práticos desenvolvidos
- Exercícios completos

### 📊 **Estrutura da Avaliação**

#### **1. Avaliação Teórica (40%)**
- **Quiz:** 50 questões de múltipla escolha
- **Tempo:** 90 minutos
- **Nota Mínima:** 70%
- **Conteúdo:** Conceitos dos módulos {modules[0]}-{modules[-1]}

#### **2. Avaliação Prática (60%)**
- **Projeto:** Desenvolvimento completo
- **Tempo:** 7 dias
- **Apresentação:** 30 minutos
- **Critérios:** Código, funcionalidade, documentação

---

## 🚀 **Como Se Preparar**

### **1. Revisão do Conteúdo**
- Revise todos os módulos {modules[0]}-{modules[-1]}
- Pratique com os exercícios
- Estude os casos de uso reais

### **2. Simulados**
- [Simulado 1](./simulados/simulado-01.md)
- [Simulado 2](./simulados/simulado-02.md)
- [Simulado 3](./simulados/simulado-03.md)

### **3. Projeto Prático**
- [Especificações](./projeto-pratico/)
- [Critérios de Avaliação](./projeto-pratico/criterios.md)
- [Template](./projeto-pratico/template/)

---

## 📝 **Processo de Avaliação**

### **Passo 1: Inscrição**
1. Complete todos os módulos
2. Desenvolva os projetos
3. Inscreva-se na avaliação

### **Passo 2: Avaliação Teórica**
1. Acesse o quiz online
2. Responda as 50 questões
3. Aguarde o resultado

### **Passo 3: Avaliação Prática**
1. Receba o projeto
2. Desenvolva em 7 dias
3. Apresente sua solução

### **Passo 4: Certificação**
1. Aprovação nas duas avaliações
2. Recebimento do certificado
3. Badge no LinkedIn

---

## 🏆 **Certificado {certificate}**

### **Validação**
- Conhecimento técnico comprovado
- Projetos práticos desenvolvidos
- Habilidades de mercado validadas

### **Benefícios**
- Credibilidade profissional
- Diferencial no mercado
- Portfólio validado
- Networking na comunidade

---

## 📚 **Recursos de Apoio**

- **Material de Estudo:** [Guia Completo](./material-estudo/)
- **Vídeo Aulas:** [Canal YouTube](https://youtube.com/fenix-academy)
- **Comunidade:** [Discord](https://discord.gg/fenix-academy)
- **Suporte:** avaliacoes@fenixdevacademy.com

---

*Avaliação {level_name} - Fenix Dev Academy*
"""
        
        with open(level_path / "README.md", "w", encoding="utf-8") as f:
            f.write(readme_content)
    
    def create_theoretical_assessment(self, level_path, course_key, level_key, level_info):
        """Cria a avaliação teórica"""
        quiz_path = level_path / "avaliacao-teorica"
        quiz_path.mkdir(exist_ok=True)
        
        quiz_content = f"""# 📝 **Avaliação Teórica - {level_info['certificate']}**

## 🎯 **Instruções**

- **Total de Questões:** 50
- **Tempo Limite:** 90 minutos
- **Nota Mínima:** 70%
- **Tipo:** Múltipla escolha

### 📋 **Conteúdo Avaliado**

#### **Módulos {level_info['modules'][0]}-{level_info['modules'][-1]}**
- Conceitos fundamentais
- Melhores práticas
- Resolução de problemas
- Arquitetura e design

---

## 📊 **Questões de Exemplo**

### **Questão 1**
Qual é a principal vantagem do uso de componentes em React?

A) Melhor performance  
B) Reutilização de código  
C) Menor uso de memória  
D) Facilidade de debug  

**Resposta:** B

### **Questão 2**
Qual método é usado para atualizar o estado em React?

A) this.state = newValue  
B) this.setState(newValue)  
C) this.updateState(newValue)  
D) this.changeState(newValue)  

**Resposta:** B

---

## 🚀 **Como Acessar**

1. **Login:** Use suas credenciais da plataforma
2. **Avaliação:** Acesse o quiz online
3. **Tempo:** Você tem 90 minutos
4. **Resultado:** Receba imediatamente

---

## 📚 **Material de Estudo**

- [Guia de Estudo](./material-estudo/)
- [Conceitos Fundamentais](./conceitos/)
- [Melhores Práticas](./melhores-praticas/)
- [Casos de Uso](./casos-uso/)

---

*Avaliação Teórica - {level_info['certificate']}*
"""
        
        with open(quiz_path / "README.md", "w", encoding="utf-8") as f:
            f.write(quiz_content)
    
    def create_practical_assessment(self, level_path, course_key, level_key, level_info):
        """Cria a avaliação prática"""
        project_path = level_path / "projeto-pratico"
        project_path.mkdir(exist_ok=True)
        
        project_content = f"""# 🚀 **Projeto Prático - {level_info['certificate']}**

## 🎯 **Objetivo do Projeto**

Desenvolver uma aplicação completa que demonstre todos os conceitos aprendidos nos módulos {level_info['modules'][0]}-{level_info['modules'][-1]}.

## 📋 **Especificações**

### **Funcionalidades Obrigatórias**
- ✅ Implementação completa dos conceitos
- ✅ Interface moderna e responsiva
- ✅ Integração com APIs
- ✅ Testes automatizados
- ✅ Deploy em produção
- ✅ Documentação técnica

### **Tecnologias Utilizadas**
- **Frontend:** HTML5, CSS3, JavaScript, React
- **Backend:** Node.js, Express (se aplicável)
- **Banco de Dados:** MongoDB/SQLite (se aplicável)
- **Deploy:** Vercel/Netlify/Heroku

## 🏗️ **Estrutura do Projeto**

```
projeto-avaliacao-{level_key}/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/ (se aplicável)
│   ├── src/
│   └── package.json
├── docs/
│   └── README.md
└── tests/
    └── specs/
```

## 📝 **Entregáveis**

1. **Código Fonte:** Repositório no GitHub
2. **Documentação:** README detalhado
3. **Demo Online:** Aplicação funcionando
4. **Testes:** Suite de testes completa
5. **Apresentação:** Slides técnicos

## 🎯 **Critérios de Avaliação**

### **Código (30%)**
- Qualidade e organização
- Padrões de codificação
- Estrutura e arquitetura
- Comentários e documentação

### **Funcionalidade (25%)**
- Requisitos atendidos
- Funcionalidades implementadas
- Integração entre componentes
- Performance e otimização

### **Design (20%)**
- Interface moderna
- Responsividade
- Experiência do usuário
- Acessibilidade

### **Deploy (15%)**
- Aplicação em produção
- Configuração de ambiente
- Monitoramento
- Documentação de deploy

### **Apresentação (10%)**
- Explicação técnica
- Demonstração prática
- Resposta a perguntas
- Conhecimento demonstrado

---

## 📅 **Cronograma**

- **Dia 1-2:** Planejamento e setup
- **Dia 3-5:** Desenvolvimento
- **Dia 6:** Testes e deploy
- **Dia 7:** Apresentação

---

## 🚀 **Como Entregar**

1. **GitHub:** Crie um repositório público
2. **Deploy:** Coloque em produção
3. **Documentação:** Complete o README
4. **Apresentação:** Prepare slides técnicos
5. **Entrega:** Envie o link do repositório

---

*Projeto Prático - {level_info['certificate']}*
"""
        
        with open(project_path / "README.md", "w", encoding="utf-8") as f:
            f.write(project_content)
    
    def create_practice_tests(self, level_path, course_key, level_key, level_info):
        """Cria simulados para prática"""
        simulados_path = level_path / "simulados"
        simulados_path.mkdir(exist_ok=True)
        
        for i in range(1, 4):
            simulado_content = f"""# 📝 **Simulado {i} - {level_info['certificate']}**

## 🎯 **Instruções**

- **Total de Questões:** 25
- **Tempo Limite:** 45 minutos
- **Tipo:** Múltipla escolha
- **Objetivo:** Prática para avaliação oficial

### 📋 **Conteúdo do Simulado**

#### **Módulos {level_info['modules'][0]}-{level_info['modules'][-1]}**
- Conceitos fundamentais
- Melhores práticas
- Resolução de problemas
- Arquitetura e design

---

## 📊 **Questões de Exemplo**

### **Questão 1**
Qual é a principal vantagem do uso de componentes em React?

A) Melhor performance  
B) Reutilização de código  
C) Menor uso de memória  
D) Facilidade de debug  

### **Questão 2**
Qual método é usado para atualizar o estado em React?

A) this.state = newValue  
B) this.setState(newValue)  
C) this.updateState(newValue)  
D) this.changeState(newValue)  

### **Questão 3**
O que é JSX em React?

A) Uma linguagem de programação  
B) Uma extensão de sintaxe do JavaScript  
C) Um framework CSS  
D) Uma biblioteca de utilitários  

---

## 🚀 **Como Acessar**

1. **Login:** Use suas credenciais da plataforma
2. **Simulado:** Acesse o quiz online
3. **Tempo:** Você tem 45 minutos
4. **Resultado:** Receba imediatamente

---

## 📚 **Material de Estudo**

- [Guia de Estudo](./material-estudo/)
- [Conceitos Fundamentais](./conceitos/)
- [Melhores Práticas](./melhores-praticas/)
- [Casos de Uso](./casos-uso/)

---

*Simulado {i} - {level_info['certificate']}*
"""
            
            with open(simulados_path / f"simulado-{i:02d}.md", "w", encoding="utf-8") as f:
                f.write(simulado_content)
    
    def create_all_assessments(self):
        """Cria todo o sistema de avaliação"""
        print("🚀 Criando sistema de avaliação e certificação...")
        
        # Criar estrutura de avaliação
        self.create_assessment_structure()
        
        # Gerar relatório
        self.generate_assessment_report()
        
        print("✅ Sistema de avaliação criado com sucesso!")
        print(f"📊 Total de cursos: 3")
        print(f"🎓 Total de níveis: 12")
        print(f"📝 Total de avaliações: 24")
    
    def generate_assessment_report(self):
        """Gera relatório do sistema de avaliação"""
        report = {
            "total_courses": len(self.assessment_structure),
            "total_levels": sum(len(course["levels"]) for course in self.assessment_structure.values()),
            "total_assessments": sum(len(course["levels"]) * 2 for course in self.assessment_structure.values()),
            "courses": {}
        }
        
        for course_key, course_info in self.assessment_structure.items():
            report["courses"][course_key] = {
                "name": course_info["name"],
                "levels": len(course_info["levels"]),
                "certificates": list(course_info["levels"].values())
            }
        
        with open(self.base_path / "assessment_system_report.json", "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"📄 Relatório salvo em: {self.base_path / 'assessment_system_report.json'}")

if __name__ == "__main__":
    assessment = AssessmentSystem()
    assessment.create_all_assessments()

# -*- coding: utf-8 -*-
"""
Sistema de Avaliação e Certificação
Fenix Dev Academy - Sistema Completo de Avaliação
"""

import os
import json
from pathlib import Path

class AssessmentSystem:
    def __init__(self, base_path="."):
        self.base_path = Path(base_path)
        self.assessment_structure = self.define_assessment_structure()
        
    def define_assessment_structure(self):
        """Define a estrutura de avaliação para cada curso"""
        return {
            "web-fundamentals": {
                "name": "Web Fundamentals",
                "levels": {
                    "iniciante": {"modules": [1, 2, 3, 4, 5], "certificate": "Web Developer Iniciante"},
                    "intermediario": {"modules": [6, 7, 8, 9, 10], "certificate": "Web Developer Intermediário"},
                    "avancado": {"modules": [11, 12, 13, 14, 15], "certificate": "Web Developer Avançado"},
                    "expert": {"modules": [16, 17, 18, 19, 20], "certificate": "Web Developer Expert"}
                }
            },
            "react-frontend": {
                "name": "React & Frontend Avançado",
                "levels": {
                    "iniciante": {"modules": [1, 2, 3, 4, 5], "certificate": "React Developer Iniciante"},
                    "intermediario": {"modules": [6, 7, 8, 9, 10], "certificate": "React Developer Intermediário"},
                    "avancado": {"modules": [11, 12, 13, 14, 15], "certificate": "React Developer Avançado"},
                    "expert": {"modules": [16, 17, 18, 19, 20], "certificate": "React Developer Expert"}
                }
            },
            "backend-fullstack": {
                "name": "Backend & Full-Stack",
                "levels": {
                    "iniciante": {"modules": [1, 2, 3, 4, 5], "certificate": "Backend Developer Iniciante"},
                    "intermediario": {"modules": [6, 7, 8, 9, 10], "certificate": "Backend Developer Intermediário"},
                    "avancado": {"modules": [11, 12, 13, 14, 15], "certificate": "Backend Developer Avançado"},
                    "expert": {"modules": [16, 17, 18, 19, 20], "certificate": "Backend Developer Expert"}
                }
            }
        }
    
    def create_assessment_structure(self):
        """Cria a estrutura de avaliação para todos os cursos"""
        for course_key, course_info in self.assessment_structure.items():
            # Criar diretório de avaliações
            assessment_path = self.base_path / course_key / "avaliacoes"
            assessment_path.mkdir(exist_ok=True)
            
            # Criar README principal de avaliações
            self.create_assessment_readme(assessment_path, course_info)
            
            # Criar avaliações por nível
            for level_key, level_info in course_info["levels"].items():
                self.create_level_assessment(assessment_path, course_key, level_key, level_info)
    
    def create_assessment_readme(self, assessment_path, course_info):
        """Cria o README principal de avaliações"""
        readme_content = f"""# 🎓 **Sistema de Avaliação - {course_info['name']}**

<div align='center'>
<img src='https://img.shields.io/badge/Fenix-Education-#61DAFB?style=for-the-badge&logo=fenix' alt='Fenix Education'/>
<img src='https://img.shields.io/badge/Sistema-Avaliação-success?style=for-the-badge' alt='Sistema de Avaliação'/>
<img src='https://img.shields.io/badge/Certificação-Profissional-blue?style=for-the-badge' alt='Certificação'/>
</div>

---

## 🎯 **Sistema de Avaliação**

O sistema de avaliação da Fenix Dev Academy é projetado para validar seu conhecimento e prepará-lo para o mercado de trabalho.

### 📊 **Níveis de Certificação**

"""
        
        for level_key, level_info in course_info["levels"].items():
            level_name = level_key.title()
            modules = level_info["modules"]
            certificate = level_info["certificate"]
            
            readme_content += f"""#### **{level_name.title()}**
- **Módulos:** {modules[0]}-{modules[-1]}
- **Certificado:** {certificate}
- **Avaliação:** [Avaliação {level_name.title()}](./{level_key}/)

"""
        
        readme_content += """---

## 🚀 **Como Funciona**

### **1. Estudo dos Módulos**
- Complete todos os módulos do nível
- Pratique com os exercícios
- Desenvolva os projetos práticos

### **2. Avaliação Teórica**
- Quiz de 50 questões
- Tempo limite: 90 minutos
- Nota mínima: 70%

### **3. Avaliação Prática**
- Projeto prático completo
- Avaliação de código
- Apresentação técnica

### **4. Certificação**
- Certificado digital
- Badge no LinkedIn
- Portfólio validado

---

## 📋 **Critérios de Avaliação**

### **Avaliação Teórica (40%)**
- Conceitos fundamentais
- Melhores práticas
- Resolução de problemas
- Arquitetura e design

### **Avaliação Prática (60%)**
- Qualidade do código
- Funcionalidade do projeto
- Documentação técnica
- Deploy e produção

---

## 🏆 **Certificados Disponíveis**

"""
        
        for level_key, level_info in course_info["levels"].items():
            level_name = level_key.title()
            certificate = level_info["certificate"]
            readme_content += f"- **{certificate}** - Validação de conhecimento {level_name.lower()}\n"
        
        readme_content += """
---

## 📚 **Recursos de Estudo**

- **Material de Apoio:** Guias e tutoriais
- **Simulados:** Testes práticos
- **Comunidade:** Suporte entre alunos
- **Mentoria:** Acompanhamento personalizado

---

## 🤝 **Suporte**

- **Discord**: Comunidade ativa 24/7
- **Email**: avaliacoes@fenixdevacademy.com
- **WhatsApp**: Suporte direto

---

*Sistema de Avaliação - Fenix Dev Academy*  
*🌟 Certificando desenvolvedores de excelência*
"""
        
        with open(assessment_path / "README.md", "w", encoding="utf-8") as f:
            f.write(readme_content)
    
    def create_level_assessment(self, assessment_path, course_key, level_key, level_info):
        """Cria a avaliação para um nível específico"""
        level_path = assessment_path / level_key
        level_path.mkdir(exist_ok=True)
        
        # Criar README do nível
        self.create_level_readme(level_path, course_key, level_key, level_info)
        
        # Criar avaliação teórica
        self.create_theoretical_assessment(level_path, course_key, level_key, level_info)
        
        # Criar avaliação prática
        self.create_practical_assessment(level_path, course_key, level_key, level_info)
        
        # Criar simulados
        self.create_practice_tests(level_path, course_key, level_key, level_info)
    
    def create_level_readme(self, level_path, course_key, level_key, level_info):
        """Cria o README do nível de avaliação"""
        level_name = level_key.title()
        certificate = level_info["certificate"]
        modules = level_info["modules"]
        
        readme_content = f"""# 🎓 **Avaliação {level_name} - {certificate}**

## 🎯 **Objetivos da Avaliação**

Esta avaliação valida seu conhecimento em **{level_name.lower()}** e confere o certificado **{certificate}**.

### 📋 **Pré-requisitos**
- Conclusão dos módulos {modules[0]}-{modules[-1]}
- Projetos práticos desenvolvidos
- Exercícios completos

### 📊 **Estrutura da Avaliação**

#### **1. Avaliação Teórica (40%)**
- **Quiz:** 50 questões de múltipla escolha
- **Tempo:** 90 minutos
- **Nota Mínima:** 70%
- **Conteúdo:** Conceitos dos módulos {modules[0]}-{modules[-1]}

#### **2. Avaliação Prática (60%)**
- **Projeto:** Desenvolvimento completo
- **Tempo:** 7 dias
- **Apresentação:** 30 minutos
- **Critérios:** Código, funcionalidade, documentação

---

## 🚀 **Como Se Preparar**

### **1. Revisão do Conteúdo**
- Revise todos os módulos {modules[0]}-{modules[-1]}
- Pratique com os exercícios
- Estude os casos de uso reais

### **2. Simulados**
- [Simulado 1](./simulados/simulado-01.md)
- [Simulado 2](./simulados/simulado-02.md)
- [Simulado 3](./simulados/simulado-03.md)

### **3. Projeto Prático**
- [Especificações](./projeto-pratico/)
- [Critérios de Avaliação](./projeto-pratico/criterios.md)
- [Template](./projeto-pratico/template/)

---

## 📝 **Processo de Avaliação**

### **Passo 1: Inscrição**
1. Complete todos os módulos
2. Desenvolva os projetos
3. Inscreva-se na avaliação

### **Passo 2: Avaliação Teórica**
1. Acesse o quiz online
2. Responda as 50 questões
3. Aguarde o resultado

### **Passo 3: Avaliação Prática**
1. Receba o projeto
2. Desenvolva em 7 dias
3. Apresente sua solução

### **Passo 4: Certificação**
1. Aprovação nas duas avaliações
2. Recebimento do certificado
3. Badge no LinkedIn

---

## 🏆 **Certificado {certificate}**

### **Validação**
- Conhecimento técnico comprovado
- Projetos práticos desenvolvidos
- Habilidades de mercado validadas

### **Benefícios**
- Credibilidade profissional
- Diferencial no mercado
- Portfólio validado
- Networking na comunidade

---

## 📚 **Recursos de Apoio**

- **Material de Estudo:** [Guia Completo](./material-estudo/)
- **Vídeo Aulas:** [Canal YouTube](https://youtube.com/fenix-academy)
- **Comunidade:** [Discord](https://discord.gg/fenix-academy)
- **Suporte:** avaliacoes@fenixdevacademy.com

---

*Avaliação {level_name} - Fenix Dev Academy*
"""
        
        with open(level_path / "README.md", "w", encoding="utf-8") as f:
            f.write(readme_content)
    
    def create_theoretical_assessment(self, level_path, course_key, level_key, level_info):
        """Cria a avaliação teórica"""
        quiz_path = level_path / "avaliacao-teorica"
        quiz_path.mkdir(exist_ok=True)
        
        quiz_content = f"""# 📝 **Avaliação Teórica - {level_info['certificate']}**

## 🎯 **Instruções**

- **Total de Questões:** 50
- **Tempo Limite:** 90 minutos
- **Nota Mínima:** 70%
- **Tipo:** Múltipla escolha

### 📋 **Conteúdo Avaliado**

#### **Módulos {level_info['modules'][0]}-{level_info['modules'][-1]}**
- Conceitos fundamentais
- Melhores práticas
- Resolução de problemas
- Arquitetura e design

---

## 📊 **Questões de Exemplo**

### **Questão 1**
Qual é a principal vantagem do uso de componentes em React?

A) Melhor performance  
B) Reutilização de código  
C) Menor uso de memória  
D) Facilidade de debug  

**Resposta:** B

### **Questão 2**
Qual método é usado para atualizar o estado em React?

A) this.state = newValue  
B) this.setState(newValue)  
C) this.updateState(newValue)  
D) this.changeState(newValue)  

**Resposta:** B

---

## 🚀 **Como Acessar**

1. **Login:** Use suas credenciais da plataforma
2. **Avaliação:** Acesse o quiz online
3. **Tempo:** Você tem 90 minutos
4. **Resultado:** Receba imediatamente

---

## 📚 **Material de Estudo**

- [Guia de Estudo](./material-estudo/)
- [Conceitos Fundamentais](./conceitos/)
- [Melhores Práticas](./melhores-praticas/)
- [Casos de Uso](./casos-uso/)

---

*Avaliação Teórica - {level_info['certificate']}*
"""
        
        with open(quiz_path / "README.md", "w", encoding="utf-8") as f:
            f.write(quiz_content)
    
    def create_practical_assessment(self, level_path, course_key, level_key, level_info):
        """Cria a avaliação prática"""
        project_path = level_path / "projeto-pratico"
        project_path.mkdir(exist_ok=True)
        
        project_content = f"""# 🚀 **Projeto Prático - {level_info['certificate']}**

## 🎯 **Objetivo do Projeto**

Desenvolver uma aplicação completa que demonstre todos os conceitos aprendidos nos módulos {level_info['modules'][0]}-{level_info['modules'][-1]}.

## 📋 **Especificações**

### **Funcionalidades Obrigatórias**
- ✅ Implementação completa dos conceitos
- ✅ Interface moderna e responsiva
- ✅ Integração com APIs
- ✅ Testes automatizados
- ✅ Deploy em produção
- ✅ Documentação técnica

### **Tecnologias Utilizadas**
- **Frontend:** HTML5, CSS3, JavaScript, React
- **Backend:** Node.js, Express (se aplicável)
- **Banco de Dados:** MongoDB/SQLite (se aplicável)
- **Deploy:** Vercel/Netlify/Heroku

## 🏗️ **Estrutura do Projeto**

```
projeto-avaliacao-{level_key}/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/ (se aplicável)
│   ├── src/
│   └── package.json
├── docs/
│   └── README.md
└── tests/
    └── specs/
```

## 📝 **Entregáveis**

1. **Código Fonte:** Repositório no GitHub
2. **Documentação:** README detalhado
3. **Demo Online:** Aplicação funcionando
4. **Testes:** Suite de testes completa
5. **Apresentação:** Slides técnicos

## 🎯 **Critérios de Avaliação**

### **Código (30%)**
- Qualidade e organização
- Padrões de codificação
- Estrutura e arquitetura
- Comentários e documentação

### **Funcionalidade (25%)**
- Requisitos atendidos
- Funcionalidades implementadas
- Integração entre componentes
- Performance e otimização

### **Design (20%)**
- Interface moderna
- Responsividade
- Experiência do usuário
- Acessibilidade

### **Deploy (15%)**
- Aplicação em produção
- Configuração de ambiente
- Monitoramento
- Documentação de deploy

### **Apresentação (10%)**
- Explicação técnica
- Demonstração prática
- Resposta a perguntas
- Conhecimento demonstrado

---

## 📅 **Cronograma**

- **Dia 1-2:** Planejamento e setup
- **Dia 3-5:** Desenvolvimento
- **Dia 6:** Testes e deploy
- **Dia 7:** Apresentação

---

## 🚀 **Como Entregar**

1. **GitHub:** Crie um repositório público
2. **Deploy:** Coloque em produção
3. **Documentação:** Complete o README
4. **Apresentação:** Prepare slides técnicos
5. **Entrega:** Envie o link do repositório

---

*Projeto Prático - {level_info['certificate']}*
"""
        
        with open(project_path / "README.md", "w", encoding="utf-8") as f:
            f.write(project_content)
    
    def create_practice_tests(self, level_path, course_key, level_key, level_info):
        """Cria simulados para prática"""
        simulados_path = level_path / "simulados"
        simulados_path.mkdir(exist_ok=True)
        
        for i in range(1, 4):
            simulado_content = f"""# 📝 **Simulado {i} - {level_info['certificate']}**

## 🎯 **Instruções**

- **Total de Questões:** 25
- **Tempo Limite:** 45 minutos
- **Tipo:** Múltipla escolha
- **Objetivo:** Prática para avaliação oficial

### 📋 **Conteúdo do Simulado**

#### **Módulos {level_info['modules'][0]}-{level_info['modules'][-1]}**
- Conceitos fundamentais
- Melhores práticas
- Resolução de problemas
- Arquitetura e design

---

## 📊 **Questões de Exemplo**

### **Questão 1**
Qual é a principal vantagem do uso de componentes em React?

A) Melhor performance  
B) Reutilização de código  
C) Menor uso de memória  
D) Facilidade de debug  

### **Questão 2**
Qual método é usado para atualizar o estado em React?

A) this.state = newValue  
B) this.setState(newValue)  
C) this.updateState(newValue)  
D) this.changeState(newValue)  

### **Questão 3**
O que é JSX em React?

A) Uma linguagem de programação  
B) Uma extensão de sintaxe do JavaScript  
C) Um framework CSS  
D) Uma biblioteca de utilitários  

---

## 🚀 **Como Acessar**

1. **Login:** Use suas credenciais da plataforma
2. **Simulado:** Acesse o quiz online
3. **Tempo:** Você tem 45 minutos
4. **Resultado:** Receba imediatamente

---

## 📚 **Material de Estudo**

- [Guia de Estudo](./material-estudo/)
- [Conceitos Fundamentais](./conceitos/)
- [Melhores Práticas](./melhores-praticas/)
- [Casos de Uso](./casos-uso/)

---

*Simulado {i} - {level_info['certificate']}*
"""
            
            with open(simulados_path / f"simulado-{i:02d}.md", "w", encoding="utf-8") as f:
                f.write(simulado_content)
    
    def create_all_assessments(self):
        """Cria todo o sistema de avaliação"""
        print("🚀 Criando sistema de avaliação e certificação...")
        
        # Criar estrutura de avaliação
        self.create_assessment_structure()
        
        # Gerar relatório
        self.generate_assessment_report()
        
        print("✅ Sistema de avaliação criado com sucesso!")
        print(f"📊 Total de cursos: 3")
        print(f"🎓 Total de níveis: 12")
        print(f"📝 Total de avaliações: 24")
    
    def generate_assessment_report(self):
        """Gera relatório do sistema de avaliação"""
        report = {
            "total_courses": len(self.assessment_structure),
            "total_levels": sum(len(course["levels"]) for course in self.assessment_structure.values()),
            "total_assessments": sum(len(course["levels"]) * 2 for course in self.assessment_structure.values()),
            "courses": {}
        }
        
        for course_key, course_info in self.assessment_structure.items():
            report["courses"][course_key] = {
                "name": course_info["name"],
                "levels": len(course_info["levels"]),
                "certificates": list(course_info["levels"].values())
            }
        
        with open(self.base_path / "assessment_system_report.json", "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"📄 Relatório salvo em: {self.base_path / 'assessment_system_report.json'}")

if __name__ == "__main__":
    assessment = AssessmentSystem()
    assessment.create_all_assessments()




















