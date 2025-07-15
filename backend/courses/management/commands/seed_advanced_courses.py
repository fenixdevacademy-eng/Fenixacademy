from django.core.management.base import BaseCommand
from courses.models import Course, Module, Lesson, Exercise, Category

class Command(BaseCommand):
    help = 'Popula o banco com cursos avançados de programação com conteúdos reais.'

    def handle(self, *args, **kwargs):
        # Cria ou obtém categorias
        categories = {
            'Desenvolvimento Web': {'color': '#2563EB', 'description': 'Frontend, Backend e Full Stack'},
            'Banco de Dados': {'color': '#059669', 'description': 'SQL, NoSQL e modelagem de dados'},
            'DevOps': {'color': '#7C3AED', 'description': 'Deploy, CI/CD e infraestrutura'}
        }
        
        created_categories = {}
        for name, data in categories.items():
            cat, _ = Category.objects.get_or_create(name=name, defaults={
                'description': data['description'],
                'color': data['color'],
                'is_active': True
            })
            created_categories[name] = cat

        # Dados dos cursos avançados
        courses_data = [
            {
                'title': 'React com Next.js',
                'slug': 'react-nextjs',
                'description': 'Desenvolva aplicações web modernas com React e Next.js. Aprenda SSR, SSG e otimizações.',
                'category': 'Desenvolvimento Web',
                'difficulty': 'advanced',
                'price_brl': 897,
                'modules': [
                    {
                        'title': 'Fundamentos do React',
                        'description': 'Componentes, props, state e hooks',
                        'lessons': [
                            {
                                'title': 'Componentes React',
                                'content': '''**Componentes** são a base do React. Eles permitem dividir a UI em partes independentes e reutilizáveis.

**Componente Funcional:**
```jsx
function Welcome(props) {
  return <h1>Olá, {props.name}!</h1>;
}
```

**Componente com Hooks:**
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
```

**Props:**
- Props são dados passados de um componente pai para um filho
- São somente leitura (imutáveis)
- Podem ser qualquer tipo de dado

**State:**
- State é o estado interno do componente
- Pode ser alterado usando setState
- Mudanças no state causam re-renderização''',
                                'lesson_type': 'text',
                                'duration_minutes': 60,
                                'exercises': [
                                    {
                                        'title': 'Criando um Componente',
                                        'description': 'Crie um componente de cartão de produto',
                                        'exercise_type': 'coding',
                                        'difficulty': 'medium',
                                        'instructions': 'Crie um componente ProductCard que recebe props: name, price, image. O componente deve exibir o nome, preço e imagem do produto.',
                                        'starter_code': 'import React from "react";\n\nfunction ProductCard(props) {\n  // Implemente o componente aqui\n}\n\nexport default ProductCard;',
                                        'solution_code': 'import React from "react";\n\nfunction ProductCard(props) {\n  return (\n    <div className="product-card">\n      <img src={props.image} alt={props.name} />\n      <h3>{props.name}</h3>\n      <p>R$ {props.price}</p>\n    </div>\n  );\n}\n\nexport default ProductCard;',
                                        'test_cases': [
                                            {"input": "ProductCard({name: 'Notebook', price: 2500, image: 'notebook.jpg'})", "output": "Componente renderizado com os dados corretos"}
                                        ],
                                        'points': 20
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                'title': 'Node.js Backend',
                'slug': 'nodejs-backend',
                'description': 'Construa APIs robustas com Node.js, Express e MongoDB. Aprenda autenticação, validação e deploy.',
                'category': 'Desenvolvimento Web',
                'difficulty': 'advanced',
                'price_brl': 797,
                'modules': [
                    {
                        'title': 'Express.js e APIs REST',
                        'description': 'Criação de APIs RESTful com Express',
                        'lessons': [
                            {
                                'title': 'Criando uma API REST',
                                'content': '''**Express.js** é um framework web minimalista e flexível para Node.js.

**Estrutura básica de uma API:**
```javascript
const express = require('express');
const app = express();

// Middleware para JSON
app.use(express.json());

// Rotas
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  // Lógica para criar usuário
  res.status(201).json({ message: 'Usuário criado' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

**Métodos HTTP:**
- GET: Buscar dados
- POST: Criar dados
- PUT: Atualizar dados (completo)
- PATCH: Atualizar dados (parcial)
- DELETE: Remover dados

**Status Codes:**
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error''',
                                'lesson_type': 'text',
                                'duration_minutes': 50,
                                'exercises': [
                                    {
                                        'title': 'API de Tarefas',
                                        'description': 'Crie uma API CRUD para gerenciar tarefas',
                                        'exercise_type': 'coding',
                                        'difficulty': 'hard',
                                        'instructions': 'Crie uma API Express com as seguintes rotas:\n- GET /tasks - Listar todas as tarefas\n- POST /tasks - Criar nova tarefa\n- PUT /tasks/:id - Atualizar tarefa\n- DELETE /tasks/:id - Deletar tarefa',
                                        'starter_code': 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\n// Array para armazenar tarefas\nlet tasks = [];\n\n// Implemente as rotas aqui\n\napp.listen(3000, () => {\n  console.log("Servidor rodando na porta 3000");\n});',
                                        'solution_code': 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\nlet tasks = [];\n\n// GET /tasks\napp.get("/tasks", (req, res) => {\n  res.json(tasks);\n});\n\n// POST /tasks\napp.post("/tasks", (req, res) => {\n  const { title, description } = req.body;\n  const task = {\n    id: Date.now(),\n    title,\n    description,\n    completed: false\n  };\n  tasks.push(task);\n  res.status(201).json(task);\n});\n\n// PUT /tasks/:id\napp.put("/tasks/:id", (req, res) => {\n  const { id } = req.params;\n  const { title, description, completed } = req.body;\n  \n  const taskIndex = tasks.findIndex(task => task.id == id);\n  if (taskIndex === -1) {\n    return res.status(404).json({ message: "Tarefa não encontrada" });\n  }\n  \n  tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed };\n  res.json(tasks[taskIndex]);\n});\n\n// DELETE /tasks/:id\napp.delete("/tasks/:id", (req, res) => {\n  const { id } = req.params;\n  const taskIndex = tasks.findIndex(task => task.id == id);\n  \n  if (taskIndex === -1) {\n    return res.status(404).json({ message: "Tarefa não encontrada" });\n  }\n  \n  tasks.splice(taskIndex, 1);\n  res.status(204).send();\n});\n\napp.listen(3000, () => {\n  console.log("Servidor rodando na porta 3000");\n});',
                                        'test_cases': [
                                            {"input": "POST /tasks with {title: 'Estudar', description: 'Estudar React'}", "output": "201 Created"},
                                            {"input": "GET /tasks", "output": "200 OK with tasks array"}
                                        ],
                                        'points': 25
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                'title': 'SQL e Banco de Dados',
                'slug': 'sql-banco-dados',
                'description': 'Domine SQL, modelagem de dados e administração de bancos relacionais.',
                'category': 'Banco de Dados',
                'difficulty': 'intermediate',
                'price_brl': 597,
                'modules': [
                    {
                        'title': 'Fundamentos SQL',
                        'description': 'Comandos básicos e consultas SQL',
                        'lessons': [
                            {
                                'title': 'SELECT e WHERE',
                                'content': '''**SQL (Structured Query Language)** é a linguagem padrão para bancos de dados relacionais.

**Comando SELECT básico:**
```sql
SELECT coluna1, coluna2 FROM tabela;
SELECT * FROM tabela;  -- Seleciona todas as colunas
```

**Filtros com WHERE:**
```sql
SELECT * FROM usuarios WHERE idade > 18;
SELECT nome, email FROM usuarios WHERE ativo = true;
```

**Operadores de comparação:**
- = (igual)
- != ou <> (diferente)
- > (maior que)
- < (menor que)
- >= (maior ou igual)
- <= (menor ou igual)
- LIKE (padrão de texto)
- IN (lista de valores)

**Exemplos práticos:**

1. **Buscar usuários ativos:**
```sql
SELECT nome, email FROM usuarios WHERE ativo = true;
```

2. **Buscar produtos com preço entre 10 e 100:**
```sql
SELECT nome, preco FROM produtos WHERE preco BETWEEN 10 AND 100;
```

3. **Buscar por padrão de texto:**
```sql
SELECT nome FROM usuarios WHERE nome LIKE 'João%';  -- Começa com João
SELECT nome FROM usuarios WHERE nome LIKE '%Silva';  -- Termina com Silva
SELECT nome FROM usuarios WHERE nome LIKE '%a%';     -- Contém a letra a
```''',
                                'lesson_type': 'text',
                                'duration_minutes': 45,
                                'exercises': [
                                    {
                                        'title': 'Consultas SQL Básicas',
                                        'description': 'Escreva consultas SQL para diferentes cenários',
                                        'exercise_type': 'coding',
                                        'difficulty': 'medium',
                                        'instructions': 'Dada a tabela "produtos" com colunas: id, nome, preco, categoria, estoque. Escreva consultas para:\n1. Listar todos os produtos\n2. Produtos com preço maior que 50\n3. Produtos da categoria "eletrônicos"\n4. Produtos com estoque menor que 10',
                                        'starter_code': '-- 1. Listar todos os produtos\nSELECT \n\n-- 2. Produtos com preço maior que 50\nSELECT \n\n-- 3. Produtos da categoria "eletrônicos"\nSELECT \n\n-- 4. Produtos com estoque menor que 10\nSELECT ',
                                        'solution_code': '-- 1. Listar todos os produtos\nSELECT * FROM produtos;\n\n-- 2. Produtos com preço maior que 50\nSELECT * FROM produtos WHERE preco > 50;\n\n-- 3. Produtos da categoria "eletrônicos"\nSELECT * FROM produtos WHERE categoria = "eletrônicos";\n\n-- 4. Produtos com estoque menor que 10\nSELECT * FROM produtos WHERE estoque < 10;',
                                        'test_cases': [
                                            {"input": "SELECT * FROM produtos WHERE preco > 50", "output": "Produtos com preço > 50"},
                                            {"input": "SELECT * FROM produtos WHERE categoria = 'eletrônicos'", "output": "Produtos da categoria eletrônicos"}
                                        ],
                                        'points': 20
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]

        created_courses = 0
        created_modules = 0
        created_lessons = 0
        created_exercises = 0

        for course_data in courses_data:
            # Cria curso
            course, created = Course.objects.get_or_create(
                slug=course_data['slug'],
                defaults={
                    'title': course_data['title'],
                    'description': course_data['description'],
                    'category': created_categories[course_data['category']],
                    'difficulty': course_data['difficulty'],
                    'status': 'published',
                    'price_brl': course_data['price_brl'],
                    'is_free': False,
                }
            )
            
            if created:
                created_courses += 1
                self.stdout.write(f'Curso criado: {course.title}')

            # Cria módulos
            for module_data in course_data['modules']:
                module, created = Module.objects.get_or_create(
                    course=course,
                    title=module_data['title'],
                    defaults={
                        'description': module_data['description'],
                        'order': module_data.get('order', 1),
                    }
                )
                
                if created:
                    created_modules += 1

                # Cria lições
                for lesson_data in module_data['lessons']:
                    lesson, created = Lesson.objects.get_or_create(
                        module=module,
                        title=lesson_data['title'],
                        defaults={
                            'content': lesson_data['content'],
                            'lesson_type': lesson_data['lesson_type'],
                            'order': lesson_data.get('order', 1),
                            'duration_minutes': lesson_data.get('duration_minutes', 30),
                        }
                    )
                    
                    if created:
                        created_lessons += 1

                    # Cria exercícios
                    for exercise_data in lesson_data.get('exercises', []):
                        exercise, created = Exercise.objects.get_or_create(
                            lesson=lesson,
                            title=exercise_data['title'],
                            defaults={
                                'description': exercise_data['description'],
                                'exercise_type': exercise_data['exercise_type'],
                                'difficulty': exercise_data['difficulty'],
                                'instructions': exercise_data['instructions'],
                                'starter_code': exercise_data.get('starter_code', ''),
                                'solution_code': exercise_data['solution_code'],
                                'test_cases': exercise_data['test_cases'],
                                'points': exercise_data['points'],
                                'order': exercise_data.get('order', 1),
                            }
                        )
                        
                        if created:
                            created_exercises += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Cursos avançados criados com sucesso!\n'
                f'Cursos criados: {created_courses}\n'
                f'Módulos criados: {created_modules}\n'
                f'Lições criadas: {created_lessons}\n'
                f'Exercícios criados: {created_exercises}'
            )
        ) 