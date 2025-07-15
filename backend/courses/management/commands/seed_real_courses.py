from django.core.management.base import BaseCommand
from courses.models import Course, Module, Lesson, Exercise, Category
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Popula o banco com cursos reais de programação com conteúdos e exercícios práticos.'

    def handle(self, *args, **kwargs):
        # Cria categorias
        categories = {
            'Programação': {'color': '#FF6A00', 'description': 'Cursos de programação e desenvolvimento'},
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

        # Dados dos cursos reais
        courses_data = [
            {
                'title': 'Python para Iniciantes',
                'slug': 'python-para-iniciantes',
                'description': 'Aprenda Python do zero com projetos práticos. Do básico ao avançado com exercícios interativos.',
                'category': 'Programação',
                'difficulty': 'beginner',
                'price_brl': 497,
                'modules': [
                    {
                        'title': 'Fundamentos do Python',
                        'description': 'Introdução à linguagem Python e conceitos básicos',
                        'lessons': [
                            {
                                'title': 'Introdução ao Python',
                                'content': '''Python é uma linguagem de programação de alto nível, interpretada e de propósito geral. 
                                
**Características do Python:**
- Sintaxe simples e legível
- Tipagem dinâmica
- Orientação a objetos
- Grande biblioteca padrão
- Comunidade ativa

**Por que aprender Python?**
- Excelente para iniciantes
- Muito versátil (web, data science, IA, automação)
- Alta demanda no mercado
- Salários competitivos''',
                                'lesson_type': 'text',
                                'duration_minutes': 45,
                                'exercises': [
                                    {
                                        'title': 'Primeiro Programa',
                                        'description': 'Crie seu primeiro programa em Python',
                                        'exercise_type': 'coding',
                                        'difficulty': 'easy',
                                        'instructions': 'Escreva um programa que imprima "Olá, Mundo!" na tela',
                                        'starter_code': '# Escreva seu código aqui\n',
                                        'solution_code': 'print("Olá, Mundo!")',
                                        'test_cases': [{"input": "", "output": "Olá, Mundo!"}],
                                        'points': 10
                                    }
                                ]
                            },
                            {
                                'title': 'Variáveis e Tipos de Dados',
                                'content': '''**Variáveis** são espaços na memória para armazenar dados.

**Tipos Básicos em Python:**

1. **int** - Números inteiros
   ```python
   idade = 25
   ano = 2024
   ```

2. **float** - Números decimais
   ```python
   altura = 1.75
   peso = 70.5
   ```

3. **str** - Texto (strings)
   ```python
   nome = "João Silva"
   cidade = 'São Paulo'
   ```

4. **bool** - Verdadeiro/Falso
   ```python
   ativo = True
   logado = False
   ```

**Operações com Variáveis:**
```python
# Concatenação de strings
nome = "João"
sobrenome = "Silva"
nome_completo = nome + " " + sobrenome

# Operações matemáticas
a = 10
b = 5
soma = a + b
subtracao = a - b
multiplicacao = a * b
divisao = a / b
```''',
                                'lesson_type': 'text',
                                'duration_minutes': 60,
                                'exercises': [
                                    {
                                        'title': 'Criando e Usando Variáveis',
                                        'description': 'Pratique criando diferentes tipos de variáveis',
                                        'exercise_type': 'coding',
                                        'difficulty': 'easy',
                                        'instructions': 'Crie variáveis para armazenar seu nome (string), idade (inteiro), altura (float) e se você gosta de programação (boolean). Depois imprima todas as informações.',
                                        'starter_code': '# Crie as variáveis aqui\nnome = \nidade = \naltura = \ngosta_programacao = \n\n# Imprima as informações\nprint(f"Nome: {nome}")\nprint(f"Idade: {idade}")\nprint(f"Altura: {altura}m")\nprint(f"Gosta de programação: {gosta_programacao}")',
                                        'solution_code': 'nome = "João"\nidade = 25\naltura = 1.75\ngosta_programacao = True\n\nprint(f"Nome: {nome}")\nprint(f"Idade: {idade}")\nprint(f"Altura: {altura}m")\nprint(f"Gosta de programação: {gosta_programacao}")',
                                        'test_cases': [
                                            {"input": "", "output": "Nome: João\nIdade: 25\nAltura: 1.75m\nGosta de programação: True"}
                                        ],
                                        'points': 15
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'title': 'Estruturas de Controle',
                        'description': 'Aprenda sobre condicionais e loops',
                        'lessons': [
                            {
                                'title': 'Condicionais (if/elif/else)',
                                'content': '''**Estruturas condicionais** permitem que seu programa tome decisões baseadas em condições.

**Sintaxe básica:**
```python
if condicao:
    # código executado se a condição for True
elif outra_condicao:
    # código executado se a primeira condição for False e esta for True
else:
    # código executado se todas as condições forem False
```

**Exemplos práticos:**

1. **Verificar se é maior de idade:**
```python
idade = 20
if idade >= 18:
    print("Maior de idade")
else:
    print("Menor de idade")
```

2. **Classificar nota:**
```python
nota = 85
if nota >= 90:
    print("Excelente")
elif nota >= 80:
    print("Muito bom")
elif nota >= 70:
    print("Bom")
elif nota >= 60:
    print("Regular")
else:
    print("Reprovado")
```

3. **Verificar múltiplas condições:**
```python
idade = 25
tem_carteira = True

if idade >= 18 and tem_carteira:
    print("Pode dirigir")
elif idade >= 18:
    print("Pode tirar carteira")
else:
    print("Muito jovem para dirigir")
```''',
                                'lesson_type': 'text',
                                'duration_minutes': 50,
                                'exercises': [
                                    {
                                        'title': 'Calculadora de IMC',
                                        'description': 'Crie um programa que calcula o IMC e classifica o resultado',
                                        'exercise_type': 'coding',
                                        'difficulty': 'medium',
                                        'instructions': 'Crie uma função que recebe peso (kg) e altura (m) e retorna a classificação do IMC:\n- Abaixo do peso: IMC < 18.5\n- Peso normal: IMC 18.5-24.9\n- Sobrepeso: IMC 25-29.9\n- Obesidade: IMC >= 30',
                                        'starter_code': 'def calcular_imc(peso, altura):\n    # Calcule o IMC (peso / altura²)\n    # Retorne a classificação\n    pass\n\n# Teste sua função\nprint(calcular_imc(70, 1.75))\nprint(calcular_imc(50, 1.60))\nprint(calcular_imc(90, 1.70))',
                                        'solution_code': 'def calcular_imc(peso, altura):\n    imc = peso / (altura ** 2)\n    \n    if imc < 18.5:\n        return "Abaixo do peso"\n    elif imc < 25:\n        return "Peso normal"\n    elif imc < 30:\n        return "Sobrepeso"\n    else:\n        return "Obesidade"\n\nprint(calcular_imc(70, 1.75))\nprint(calcular_imc(50, 1.60))\nprint(calcular_imc(90, 1.70))',
                                        'test_cases': [
                                            {"input": "calcular_imc(70, 1.75)", "output": "Peso normal"},
                                            {"input": "calcular_imc(50, 1.60)", "output": "Abaixo do peso"},
                                            {"input": "calcular_imc(90, 1.70)", "output": "Obesidade"}
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
                'title': 'JavaScript Moderno',
                'slug': 'javascript-moderno',
                'description': 'Domine JavaScript ES6+ com projetos práticos e frameworks modernos.',
                'category': 'Desenvolvimento Web',
                'difficulty': 'intermediate',
                'price_brl': 697,
                'modules': [
                    {
                        'title': 'ES6+ Features',
                        'description': 'Recursos modernos do JavaScript',
                        'lessons': [
                            {
                                'title': 'Arrow Functions',
                                'content': '''**Arrow Functions** são uma forma mais concisa de escrever funções em JavaScript ES6+.

**Sintaxe tradicional vs Arrow Function:**

```javascript
// Sintaxe tradicional
function soma(a, b) {
    return a + b;
}

// Arrow function
const soma = (a, b) => a + b;
```

**Características das Arrow Functions:**
- Sintaxe mais curta
- Não têm seu próprio `this`
- Sempre são anônimas (mas podem ser atribuídas a variáveis)
- Retorno implícito para expressões simples

**Exemplos práticos:**

1. **Função simples:**
```javascript
// Tradicional
function quadrado(x) {
    return x * x;
}

// Arrow function
const quadrado = x => x * x;
```

2. **Função com múltiplos parâmetros:**
```javascript
// Tradicional
function multiplicar(a, b) {
    return a * b;
}

// Arrow function
const multiplicar = (a, b) => a * b;
```

3. **Função com múltiplas linhas:**
```javascript
// Tradicional
function calcularArea(base, altura) {
    const area = base * altura;
    return area;
}

// Arrow function
const calcularArea = (base, altura) => {
    const area = base * altura;
    return area;
};
```

4. **Sem parâmetros:**
```javascript
// Tradicional
function getRandomNumber() {
    return Math.random();
}

// Arrow function
const getRandomNumber = () => Math.random();
```''',
                                'lesson_type': 'text',
                                'duration_minutes': 40,
                                'exercises': [
                                    {
                                        'title': 'Convertendo Funções',
                                        'description': 'Converta funções tradicionais para arrow functions',
                                        'exercise_type': 'coding',
                                        'difficulty': 'medium',
                                        'instructions': 'Converta as seguintes funções para arrow functions:\n1. function soma(a, b) { return a + b; }\n2. function quadrado(x) { return x * x; }\n3. function saudacao(nome) { return `Olá, ${nome}!`; }',
                                        'starter_code': '// Converta estas funções para arrow functions\nfunction soma(a, b) {\n    return a + b;\n}\n\nfunction quadrado(x) {\n    return x * x;\n}\n\nfunction saudacao(nome) {\n    return `Olá, ${nome}!`;\n}\n\n// Teste suas funções\nconsole.log(soma(5, 3));\nconsole.log(quadrado(4));\nconsole.log(saudacao("João"));',
                                        'solution_code': 'const soma = (a, b) => a + b;\n\nconst quadrado = x => x * x;\n\nconst saudacao = nome => `Olá, ${nome}!`;\n\nconsole.log(soma(5, 3));\nconsole.log(quadrado(4));\nconsole.log(saudacao("João"));',
                                        'test_cases': [
                                            {"input": "soma(5, 3)", "output": "8"},
                                            {"input": "quadrado(4)", "output": "16"},
                                            {"input": "saudacao('João')", "output": "Olá, João!"}
                                        ],
                                        'points': 15
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
                f'Cursos reais criados com sucesso!\n'
                f'Cursos criados: {created_courses}\n'
                f'Módulos criados: {created_modules}\n'
                f'Lições criadas: {created_lessons}\n'
                f'Exercícios criados: {created_exercises}'
            )
        ) 