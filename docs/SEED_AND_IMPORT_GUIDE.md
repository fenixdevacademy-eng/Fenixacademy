# Guia de Seed e Importação de Cursos

Este guia explica como popular o banco de dados da Fênix Dev Academy com cursos, módulos, lições e exercícios.

## 📋 Comandos Disponíveis

### 1. Seed Completo (Recomendado)

Para popular toda a plataforma com cursos reais de uma vez:

```bash
# Com Docker
docker compose exec backend python manage.py seed_all_courses

# Sem Docker
python manage.py seed_all_courses
```

**O que cria:**
- Cursos de Python, JavaScript, React, Node.js, SQL
- Conteúdos educacionais reais e detalhados
- Exercícios práticos e projetos
- Diferentes níveis de dificuldade

### 2. Seed de Cursos Básicos

Para criar cursos com conteúdos educacionais reais:

```bash
# Com Docker
docker compose exec backend python manage.py seed_real_courses

# Sem Docker
python manage.py seed_real_courses
```

**Cursos criados:**
- Python para Iniciantes (com fundamentos e estruturas de controle)
- JavaScript Moderno (com ES6+ features)

### 3. Seed de Cursos Avançados

Para criar cursos de nível intermediário/avançado:

```bash
# Com Docker
docker compose exec backend python manage.py seed_advanced_courses

# Sem Docker
python manage.py seed_advanced_courses
```

**Cursos criados:**
- React com Next.js (componentes e hooks)
- Node.js Backend (APIs REST)
- SQL e Banco de Dados (consultas e modelagem)

### 4. Seed Rápido (Dados de Exemplo)

Para criar dados de exemplo rapidamente:

```bash
# Com Docker
docker compose exec backend python manage.py seed_full_courses

# Sem Docker
python manage.py seed_full_courses
```

**O que cria:**
- 1 categoria: "Programação"
- 1 curso: "Python para Iniciantes"
- 3 módulos
- 2 lições por módulo
- 1 exercício por lição

### 5. Importação em Massa (JSON)

Para importar cursos completos de um arquivo JSON:

```bash
# Com Docker
docker compose exec backend python manage.py import_courses_json backend/courses_import.json

# Sem Docker
python manage.py import_courses_json backend/courses_import.json
```

## 📚 Conteúdos Incluídos

### Cursos Básicos
- **Python para Iniciantes**
  - Fundamentos do Python
  - Variáveis e tipos de dados
  - Estruturas de controle (if/elif/else)
  - Exercícios práticos com IMC, verificador de idade

- **JavaScript Moderno**
  - Arrow Functions
  - ES6+ features
  - Exercícios de conversão de funções

### Cursos Avançados
- **React com Next.js**
  - Componentes React
  - Props e State
  - Hooks básicos
  - Exercícios de criação de componentes

- **Node.js Backend**
  - Express.js
  - APIs REST
  - CRUD operations
  - Exercícios de API de tarefas

- **SQL e Banco de Dados**
  - Comandos SELECT e WHERE
  - Filtros e operadores
  - Consultas básicas
  - Exercícios práticos de SQL

## 📁 Estrutura do JSON

O arquivo JSON deve seguir esta estrutura:

```json
[
  {
    "title": "Nome do Curso",
    "slug": "slug-do-curso",
    "description": "Descrição do curso",
    "category": "Nome da Categoria",
    "difficulty": "beginner|intermediate|advanced",
    "status": "draft|published",
    "price_brl": 497,
    "is_free": false,
    "modules": [
      {
        "title": "Nome do Módulo",
        "description": "Descrição do módulo",
        "order": 1,
        "lessons": [
          {
            "title": "Nome da Lição",
            "content": "Conteúdo da lição (suporta Markdown)",
            "lesson_type": "text|video|interactive",
            "order": 1,
            "duration_minutes": 45,
            "exercises": [
              {
                "title": "Nome do Exercício",
                "description": "Descrição do exercício",
                "exercise_type": "coding|quiz|text",
                "difficulty": "easy|medium|hard",
                "instructions": "Instruções para o aluno",
                "starter_code": "Código inicial (opcional)",
                "solution_code": "Código da solução",
                "test_cases": [
                  {"input": "entrada", "output": "saída esperada"}
                ],
                "points": 10,
                "order": 1
              }
            ]
          }
        ]
      }
    ]
  }
]
```

## 🔧 Campos Opcionais

### Curso
- `description`: Descrição do curso
- `difficulty`: Nível de dificuldade (padrão: "beginner")
- `status`: Status do curso (padrão: "draft")
- `price_brl`: Preço em reais (padrão: 0)
- `is_free`: Se é gratuito (padrão: true)

### Módulo
- `description`: Descrição do módulo
- `order`: Ordem do módulo (padrão: 1)

### Lição
- `content`: Conteúdo da lição (suporta Markdown)
- `lesson_type`: Tipo da lição (padrão: "text")
- `order`: Ordem da lição (padrão: 1)
- `duration_minutes`: Duração em minutos (padrão: 30)

### Exercício
- `description`: Descrição do exercício
- `exercise_type`: Tipo do exercício (padrão: "coding")
- `difficulty`: Dificuldade (padrão: "easy")
- `instructions`: Instruções para o aluno
- `starter_code`: Código inicial
- `solution_code`: Código da solução
- `test_cases`: Casos de teste
- `points`: Pontos do exercício (padrão: 10)
- `order`: Ordem do exercício (padrão: 1)

## 📝 Exemplo de Uso

1. **Para popular toda a plataforma:**
   ```bash
   python manage.py seed_all_courses
   ```

2. **Para importar cursos customizados:**
   ```bash
   python manage.py import_courses_json seu_arquivo.json
   ```

3. **Para criar apenas cursos básicos:**
   ```bash
   python manage.py seed_real_courses
   ```

## 🚀 Dicas

- Use `seed_all_courses` para ter uma plataforma completa de demonstração
- Os comandos são idempotentes (podem rodar múltiplas vezes)
- Categorias são criadas automaticamente se não existirem
- Use UTF-8 para caracteres especiais no JSON
- O conteúdo das lições suporta Markdown para formatação

## 🔍 Troubleshooting

**Erro: "Arquivo não encontrado"**
- Verifique o caminho do arquivo JSON
- Use caminho absoluto se necessário

**Erro: "JSON inválido"**
- Valide o JSON em um validador online
- Verifique vírgulas e chaves

**Erro: "Campo obrigatório"**
- Verifique se todos os campos obrigatórios estão presentes
- Consulte a estrutura do JSON acima

**Erro: "Módulo não encontrado"**
- Verifique se o comando está sendo executado no diretório correto
- Certifique-se de que o Django está configurado corretamente 