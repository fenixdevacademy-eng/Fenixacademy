
# 📚 Conteúdo dos Cursos - Fenix Academy

Este diretório contém todo o conteúdo estruturado dos cursos da Fenix Academy.

## 📁 Estrutura dos Arquivos

- `all_courses.json` - Estrutura completa de todos os cursos
- `web-fundamentals.json` - Curso de Fundamentos Web
- `react-advanced.json` - Curso de React Avançado
- `python-data.json` - Curso de Python para Data Science
- `nodejs-apis.json` - Curso de Node.js e APIs
- `devops-docker.json` - Curso de DevOps e Docker

## 🎯 Cursos Disponíveis

### 1. Fundamentos de Desenvolvimento Web
- **Duração**: 40 horas
- **Nível**: Iniciante
- **Preço**: R$ 497
- **Módulos**: 5 módulos com 20 aulas
- **Projetos**: Site pessoal, blog, e-commerce básico

### 2. React.js Avançado
- **Duração**: 60 horas
- **Nível**: Avançado
- **Preço**: R$ 747
- **Módulos**: 5 módulos com 20 aulas
- **Projetos**: Todo app, dashboard, aplicação completa

### 3. Python para Data Science
- **Duração**: 80 horas
- **Nível**: Intermediário
- **Preço**: R$ 997
- **Módulos**: 5 módulos com 20 aulas
- **Projetos**: Análise de dados, dashboard, ML básico

### 4. Node.js e APIs RESTful
- **Duração**: 50 horas
- **Nível**: Intermediário
- **Preço**: R$ 747
- **Módulos**: 5 módulos com 20 aulas
- **Projetos**: API REST, autenticação, deploy

### 5. DevOps e Docker
- **Duração**: 70 horas
- **Nível**: Avançado
- **Preço**: R$ 997
- **Módulos**: 5 módulos com 20 aulas
- **Projetos**: Pipeline CI/CD, monitoramento, infraestrutura

## 📋 Estrutura de Cada Curso

```json
{
  "course_info": {
    "title": "Nome do Curso",
    "description": "Descrição do curso",
    "difficulty": "beginner|intermediate|advanced",
    "duration": "X horas",
    "price_usd": 97,
    "price_brl": 497
  },
  "modules": [
    {
      "module_info": {
        "id": 1,
        "title": "Nome do Módulo",
        "description": "Descrição do módulo",
        "duration": 6,
        "lessons_count": 4
      },
      "lessons": [
        {
          "id": 1,
          "title": "Nome da Aula",
          "duration": 30,
          "video_url": "URL do vídeo",
          "transcript": "Transcrição da aula",
          "resources": [...],
          "exercises": [...],
          "quiz": {...}
        }
      ],
      "project": {
        "title": "Nome do Projeto",
        "description": "Descrição do projeto",
        "requirements": [...],
        "technologies": [...],
        "estimated_time": "6 horas",
        "difficulty": "intermediate"
      }
    }
  ]
}
```

## 🚀 Como Usar

1. **Importar no Frontend**: Use os arquivos JSON para popular o banco de dados
2. **API Integration**: Consuma os dados via API REST
3. **CMS**: Use como base para um sistema de gerenciamento de conteúdo
4. **SEO**: Gere páginas dinâmicas para cada curso

## 📊 Estatísticas

- **Total de Cursos**: 5
- **Total de Módulos**: 25
- **Total de Aulas**: 100
- **Total de Projetos**: 25
- **Total de Exercícios**: 300
- **Total de Quizzes**: 100

## 🔧 Tecnologias Utilizadas

- **Frontend**: React, Next.js, TypeScript
- **Backend**: Django, Django REST Framework
- **Banco de Dados**: PostgreSQL
- **Vídeos**: AWS S3
- **Deploy**: Docker, Kubernetes

## 📞 Suporte

Para dúvidas sobre o conteúdo:
- **Email**: fenixdevacademy@gmail.com
- **WhatsApp**: +55 (21) 98628-9597
- **Site**: https://fenixacademy.com

---
*Gerado automaticamente pelo script de geração de conteúdo*
