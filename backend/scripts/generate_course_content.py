#!/usr/bin/env python3
"""
Script para gerar conteúdo completo para todos os cursos da Fenix Academy
Inclui módulos, aulas, exercícios e materiais de apoio
"""

import os
import sys
import django

# Adicionar o diretório do projeto ao path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fenix_academy.settings.local')
django.setup()

from courses.models import Category, Course, Module, Lesson, Exercise

def create_course_content():
    """Gerar conteúdo completo para todos os cursos"""
    
    print("🎓 Gerando conteúdo completo para todos os cursos...")
    
    # Dados dos cursos com conteúdo completo
    courses_data = [
        {
            'title': 'Fundamentos de Desenvolvimento Web',
            'description': 'Aprenda HTML, CSS e JavaScript do zero. Construa sites responsivos e interativos.',
            'instructor': 'João Silva',
            'level': 'beginner',
            'price': 19700,
            'original_price': 29700,
            'category': 'Desenvolvimento Web',
            'modules': [
                {
                    'title': 'Introdução ao Desenvolvimento Web',
                    'description': 'Conceitos básicos e configuração do ambiente',
                    'lessons': [
                        {
                            'title': 'O que é Desenvolvimento Web?',
                            'content': '''
# O que é Desenvolvimento Web?

## Introdução

O desenvolvimento web é o processo de criação de sites e aplicações web. Envolve várias tecnologias e linguagens de programação.

## O que você vai aprender:

- História da World Wide Web
- Como a internet funciona
- Diferenças entre frontend e backend
- Ferramentas essenciais para desenvolvimento

## Conceitos Fundamentais

### HTML (Estrutura)
- Linguagem de marcação
- Define a estrutura do conteúdo
- Base de qualquer site

### CSS (Estilo)
- Linguagem de estilização
- Controla aparência visual
- Responsividade e animações

### JavaScript (Interatividade)
- Linguagem de programação
- Adiciona funcionalidades dinâmicas
- Manipulação do DOM

## Próximos Passos

No próximo módulo, vamos configurar seu ambiente de desenvolvimento e começar a programar!
                            ''',
                            'video_duration': 1800,  # 30 minutos
                            'type': 'video'
                        },
                        {
                            'title': 'História da Web',
                            'content': '''
# História da World Wide Web

## Tim Berners-Lee e o CERN

A World Wide Web foi criada em 1989 por Tim Berners-Lee no CERN (Organização Europeia para a Pesquisa Nuclear).

## Marcos Importantes

### 1991 - Primeiro Site
- Primeiro servidor web
- Primeiro navegador
- HTML básico

### 1993 - Navegador Mosaic
- Interface gráfica
- Popularização da web
- Nascimento da era comercial

### 1995 - JavaScript
- Criado por Brendan Eich
- Adiciona interatividade
- Revoluciona o desenvolvimento

### 2000s - Web 2.0
- Sites dinâmicos
- Redes sociais
- Aplicações web complexas

### 2010s - Mobile First
- Responsividade
- Progressive Web Apps
- Performance otimizada

## Impacto na Sociedade

A web transformou:
- Comunicação
- Comércio
- Educação
- Entretenimento
- Trabalho

## Futuro da Web

- Web 3.0
- Inteligência Artificial
- Realidade Virtual
- Internet das Coisas
                            ''',
                            'video_duration': 1800,
                            'type': 'video'
                        },
                        {
                            'title': 'Ferramentas Essenciais',
                            'content': '''
# Ferramentas Essenciais para Desenvolvimento Web

## Editor de Código

### Visual Studio Code
- Gratuito e open source
- Extensões poderosas
- Integração com Git
- IntelliSense avançado

### Sublime Text
- Rápido e leve
- Múltiplos cursores
- Personalização avançada

### Atom
- Criado pelo GitHub
- Altamente customizável
- Comunidade ativa

## Navegadores

### Chrome DevTools
- Inspeção de elementos
- Console JavaScript
- Network tab
- Performance tools

### Firefox Developer Tools
- Ferramentas similares
- Algumas funcionalidades únicas
- Boa para debugging

## Versionamento

### Git
- Controle de versão
- Colaboração em equipe
- Histórico de mudanças

### GitHub
- Repositório remoto
- Pull requests
- Issues e projetos

## Outras Ferramentas

### Terminal/CMD
- Navegação por arquivos
- Comandos Git
- Scripts de automação

### Figma/Sketch
- Design de interfaces
- Prototipagem
- Colaboração com designers

## Configuração Inicial

1. Instalar VS Code
2. Instalar extensões úteis
3. Configurar Git
4. Criar conta no GitHub
5. Familiarizar com DevTools
                            ''',
                            'video_duration': 3600,  # 1 hora
                            'type': 'video'
                        },
                        {
                            'title': 'Ambiente de Desenvolvimento',
                            'content': '''
# Configurando seu Ambiente de Desenvolvimento

## Passo a Passo

### 1. Instalar VS Code
```bash
# Baixar do site oficial
https://code.visualstudio.com/
```

### 2. Extensões Recomendadas
- Live Server
- Prettier
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

### 3. Configurar Git
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### 4. Criar Estrutura de Pastas
```
projeto-web/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
```

### 5. Primeiro Projeto

#### index.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Primeiro Site</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Olá, Mundo!</h1>
    <p>Este é meu primeiro site.</p>
    
    <script src="js/script.js"></script>
</body>
</html>
```

#### style.css
```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    text-align: center;
}
```

#### script.js
```javascript
console.log('JavaScript funcionando!');

// Adicionar interatividade
document.addEventListener('DOMContentLoaded', function() {
    const h1 = document.querySelector('h1');
    h1.addEventListener('click', function() {
        this.style.color = 'blue';
    });
});
```

## Próximos Passos

Agora você está pronto para começar a programar! No próximo módulo, vamos aprender HTML em detalhes.
                            ''',
                            'video_duration': 7200,  # 2 horas
                            'type': 'video'
                        }
                    ]
                },
                {
                    'title': 'HTML Básico',
                    'description': 'Estrutura e elementos HTML fundamentais',
                    'lessons': [
                        {
                            'title': 'Estrutura de um Documento HTML',
                            'content': '''
# Estrutura de um Documento HTML

## Anatomia do HTML

### DOCTYPE
```html
<!DOCTYPE html>
```
Declara que este é um documento HTML5.

### Elemento HTML
```html
<html lang="pt-BR">
```
Elemento raiz, contém todo o documento.

### Head
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Site</title>
</head>
```
Contém metadados e configurações.

### Body
```html
<body>
    <!-- Conteúdo visível aqui -->
</body>
```
Contém todo o conteúdo visível.

## Estrutura Completa

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Primeiro Site</title>
    <meta name="description" content="Descrição do meu site">
    <meta name="keywords" content="palavras, chave, aqui">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Título Principal</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home">
            <h2>Bem-vindo</h2>
            <p>Este é o conteúdo principal.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Meu Site. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
```

## Elementos Semânticos

### Header
- Cabeçalho da página
- Logo, navegação, título

### Main
- Conteúdo principal
- Único por página

### Section
- Seção de conteúdo
- Agrupamento lógico

### Article
- Conteúdo independente
- Posts, notícias, produtos

### Aside
- Conteúdo relacionado
- Sidebar, anúncios

### Footer
- Rodapé da página
- Links, informações de contato

## Boas Práticas

1. **Semântica**: Use elementos apropriados
2. **Estrutura**: Organize logicamente
3. **Acessibilidade**: Pense em todos os usuários
4. **SEO**: Otimize para motores de busca
5. **Manutenibilidade**: Código limpo e organizado
                            ''',
                            'video_duration': 3600,
                            'type': 'video'
                        },
                        {
                            'title': 'Tags Principais',
                            'content': '''
# Tags HTML Principais

## Cabeçalhos (Headings)

```html
<h1>Título Principal</h1>
<h2>Subtítulo</h2>
<h3>Seção</h3>
<h4>Subseção</h4>
<h5>Item</h5>
<h6>Subitem</h6>
```

**Hierarquia**: H1 é o mais importante, H6 o menos.

## Parágrafos e Texto

```html
<p>Este é um parágrafo de texto.</p>

<strong>Texto em negrito</strong>
<em>Texto em itálico</em>
<mark>Texto destacado</mark>
<small>Texto pequeno</small>
<del>Texto deletado</del>
<ins>Texto inserido</ins>
```

## Listas

### Lista Não Ordenada
```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

### Lista Ordenada
```html
<ol>
    <li>Primeiro item</li>
    <li>Segundo item</li>
    <li>Terceiro item</li>
</ol>
```

### Lista de Definição
```html
<dl>
    <dt>Termo</dt>
    <dd>Definição do termo</dd>
    <dt>Outro termo</dt>
    <dd>Outra definição</dd>
</dl>
```

## Links

```html
<!-- Link básico -->
<a href="https://exemplo.com">Visitar site</a>

<!-- Link interno -->
<a href="#secao">Ir para seção</a>

<!-- Link com target -->
<a href="https://exemplo.com" target="_blank">Abrir em nova aba</a>

<!-- Link com título -->
<a href="https://exemplo.com" title="Descrição do link">Link</a>
```

## Imagens

```html
<!-- Imagem básica -->
<img src="imagem.jpg" alt="Descrição da imagem">

<!-- Imagem com dimensões -->
<img src="imagem.jpg" alt="Descrição" width="300" height="200">

<!-- Imagem responsiva -->
<img src="imagem.jpg" alt="Descrição" style="max-width: 100%; height: auto;">
```

## Divisões

```html
<!-- Divisão genérica -->
<div class="container">
    <p>Conteúdo aqui</p>
</div>

<!-- Span inline -->
<span class="destaque">Texto destacado</span>
```

## Comentários

```html
<!-- Este é um comentário HTML -->
<!-- 
    Comentário
    em múltiplas
    linhas
-->
```

## Exercício Prático

Crie uma página HTML com:
1. Título principal
2. Lista de hobbies
3. Link para site favorito
4. Imagem de perfil
5. Informações de contato

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página Pessoal</title>
</head>
<body>
    <h1>João Silva</h1>
    
    <h2>Meus Hobbies</h2>
    <ul>
        <li>Programação</li>
        <li>Música</li>
        <li>Esportes</li>
    </ul>
    
    <h2>Site Favorito</h2>
    <a href="https://github.com" target="_blank">GitHub</a>
    
    <h2>Foto de Perfil</h2>
    <img src="perfil.jpg" alt="Minha foto de perfil" width="200">
    
    <h2>Contato</h2>
    <p>Email: joao@email.com</p>
    <p>Telefone: (11) 99999-9999</p>
</body>
</html>
```
                            ''',
                            'video_duration': 3600,
                            'type': 'video'
                        }
                    ]
                }
            ]
        },
        {
            'title': 'Python para Iniciantes',
            'description': 'Aprenda Python do zero e construa seus primeiros programas',
            'instructor': 'Maria Santos',
            'level': 'beginner',
            'price': 19700,
            'original_price': 29700,
            'category': 'Programação',
            'modules': [
                {
                    'title': 'Introdução ao Python',
                    'description': 'Conceitos básicos e primeira execução',
                    'lessons': [
                        {
                            'title': 'O que é Python?',
                            'content': '''
# O que é Python?

## Introdução

Python é uma linguagem de programação de alto nível, interpretada e orientada a objetos. Criada por Guido van Rossum em 1991.

## Características Principais

### Simplicidade
- Sintaxe clara e legível
- Fácil de aprender
- Código limpo e organizado

### Versatilidade
- Web development
- Data Science
- Machine Learning
- Automação
- Games
- Desktop apps

### Comunidade
- Grande comunidade ativa
- Muitas bibliotecas disponíveis
- Documentação excelente

## Por que Python?

### Para Iniciantes
- Sintaxe intuitiva
- Menos código para fazer mais
- Erros mais claros

### Para Profissionais
- Alta demanda no mercado
- Salários competitivos
- Múltiplas áreas de atuação

## Aplicações Práticas

### Web Development
- Django
- Flask
- FastAPI

### Data Science
- Pandas
- NumPy
- Matplotlib

### Machine Learning
- TensorFlow
- PyTorch
- Scikit-learn

### Automação
- Scripts de sistema
- Web scraping
- Processamento de arquivos

## Instalação

### Windows
1. Baixar do python.org
2. Marcar "Add to PATH"
3. Verificar instalação

### macOS
```bash
brew install python
```

### Linux
```bash
sudo apt-get install python3
```

## Primeiro Programa

```python
print("Olá, Mundo!")
```

## Próximos Passos

No próximo módulo, vamos instalar o Python e escrever nosso primeiro programa!
                            ''',
                            'video_duration': 1800,
                            'type': 'video'
                        },
                        {
                            'title': 'Instalando Python',
                            'content': '''
# Instalando Python

## Verificação de Instalação

### Windows
```bash
python --version
# ou
py --version
```

### macOS/Linux
```bash
python3 --version
```

## Instalação no Windows

### Passo 1: Download
1. Acesse python.org
2. Clique em "Downloads"
3. Baixe a versão mais recente

### Passo 2: Instalação
1. Execute o instalador
2. **IMPORTANTE**: Marque "Add Python to PATH"
3. Clique em "Install Now"

### Passo 3: Verificação
```bash
python --version
pip --version
```

## Instalação no macOS

### Usando Homebrew
```bash
# Instalar Homebrew (se não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Python
brew install python
```

### Verificação
```bash
python3 --version
pip3 --version
```

## Instalação no Linux

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install python3 python3-pip
```

### CentOS/RHEL
```bash
sudo yum install python3 python3-pip
```

### Verificação
```bash
python3 --version
pip3 --version
```

## IDE Recomendada

### VS Code
1. Instalar VS Code
2. Instalar extensão Python
3. Configurar ambiente

### PyCharm
- IDE completa
- Versão gratuita disponível
- Muitas funcionalidades

### Jupyter Notebook
- Ideal para Data Science
- Interface web
- Código interativo

## Primeiro Programa

### Criar arquivo
```python
# hello.py
print("Olá, Mundo!")
print("Bem-vindo ao Python!")
```

### Executar
```bash
python hello.py
# ou
python3 hello.py
```

## Pip - Gerenciador de Pacotes

### Instalar pacote
```bash
pip install nome_do_pacote
# ou
pip3 install nome_do_pacote
```

### Listar pacotes instalados
```bash
pip list
```

### Atualizar pip
```bash
pip install --upgrade pip
```

## Ambiente Virtual

### Criar ambiente
```bash
python -m venv meu_ambiente
# ou
python3 -m venv meu_ambiente
```

### Ativar ambiente
```bash
# Windows
meu_ambiente\\Scripts\\activate

# macOS/Linux
source meu_ambiente/bin/activate
```

### Desativar ambiente
```bash
deactivate
```

## Próximos Passos

Agora que temos o Python instalado, vamos aprender sobre variáveis e tipos de dados!
                            ''',
                            'video_duration': 3600,
                            'type': 'video'
                        }
                    ]
                }
            ]
        }
    ]
    
    # Criar categorias se não existirem
    for course_data in courses_data:
        category, created = Category.objects.get_or_create(
            name=course_data['category']
        )
        
        # Criar curso
        course, created = Course.objects.get_or_create(
            title=course_data['title'],
            defaults={
                'description': course_data['description'],
                'instructor': course_data['instructor'],
                'level': course_data['level'],
                'price': course_data['price'],
                'category': category,
                'duration': '80 horas',
                'lessons_count': 80,
                'students_count': 1247,
                'rating': 4.8,
                'certificate': True
            }
        )
        
        print(f"📚 Processando curso: {course.title}")
        
        # Criar módulos e aulas
        for module_index, module_data in enumerate(course_data['modules']):
            module, created = Module.objects.get_or_create(
                course=course,
                title=module_data['title'],
                defaults={
                    'description': module_data['description'],
                    'order': module_index + 1
                }
            )
            
            print(f"  📖 Módulo: {module.title}")
            
            # Criar aulas
            for lesson_index, lesson_data in enumerate(module_data['lessons']):
                lesson, created = Lesson.objects.get_or_create(
                    module=module,
                    title=lesson_data['title'],
                    defaults={
                        'content': lesson_data['content'],
                        'video_duration': lesson_data['video_duration'],
                        'order': lesson_index + 1,
                        'lesson_type': lesson_data['type']
                    }
                )
                
                print(f"    📝 Aula: {lesson.title}")
                
                # Criar exercícios para cada aula
                exercises = [
                    {
                        'title': 'Questionário sobre o conteúdo',
                        'content': 'Responda 5 perguntas sobre o que foi aprendido nesta aula.',
                        'type': 'quiz'
                    },
                    {
                        'title': 'Exercício prático',
                        'content': 'Aplique os conceitos aprendidos em um projeto prático.',
                        'type': 'practice'
                    },
                    {
                        'title': 'Desafio adicional',
                        'content': 'Resolva um problema mais complexo usando os conhecimentos da aula.',
                        'type': 'challenge'
                    }
                ]
                
                for exercise_index, exercise_data in enumerate(exercises):
                    exercise, created = Exercise.objects.get_or_create(
                        lesson=lesson,
                        title=exercise_data['title'],
                        defaults={
                            'content': exercise_data['content'],
                            'exercise_type': exercise_data['type'],
                            'order': exercise_index + 1
                        }
                    )
    
    print("✅ Conteúdo dos cursos gerado com sucesso!")
    print(f"📊 Resumo:")
    print(f"   - Cursos criados: {Course.objects.count()}")
    print(f"   - Módulos criados: {Module.objects.count()}")
    print(f"   - Aulas criadas: {Lesson.objects.count()}")
    print(f"   - Exercícios criados: {Exercise.objects.count()}")

if __name__ == '__main__':
    create_course_content() 