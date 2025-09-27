# CSS Grid e Flexbox Avançado

## 🎯 Objetivos de Aprendizado
- Dominar os conceitos fundamentais de css grid e flexbox avançado
- Aplicar css grid e flexbox avançado em projetos práticos
- Implementar soluções escaláveis e eficientes

## 📚 Conteúdo da Aula

### 1. Introdução
CSS Grid e Flexbox Avançado é uma tecnologia essencial para web fundamentals. Nesta aula, você aprenderá:

- Conceitos fundamentais
- Aplicações práticas
- Melhores práticas da indústria

### 2. Desenvolvimento dos Conceitos

#### 2.1 Fundamentos
Entenda os conceitos básicos de css grid e flexbox avançado e como aplicá-los.

#### 2.2 Implementação Prática
Aprenda a implementar css grid e flexbox avançado em projetos reais.

#### 2.3 Casos de Uso
Veja como grandes empresas usam css grid e flexbox avançado para resolver problemas complexos.

### 3. Exemplos Práticos

#### Exemplo Básico - CSS Grid
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Básico</title>
    <style>
        .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 100px);
            gap: 20px;
            padding: 20px;
            background-color: #f0f0f0;
        }
        
        .grid-item {
            background-color: #4CAF50;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="grid-container">
        <div class="grid-item">Item 1</div>
        <div class="grid-item">Item 2</div>
        <div class="grid-item">Item 3</div>
        <div class="grid-item">Item 4</div>
        <div class="grid-item">Item 5</div>
        <div class="grid-item">Item 6</div>
    </div>
</body>
</html>
```

#### Exemplo Avançado - Flexbox + Grid
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid + Flexbox Avançado</title>
    <style>
        .advanced-layout {
            display: grid;
            grid-template-areas: 
                "header header header"
                "sidebar main main"
                "footer footer footer";
            grid-template-columns: 250px 1fr 1fr;
            grid-template-rows: 80px 1fr 60px;
            min-height: 100vh;
            gap: 20px;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .header {
            grid-area: header;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .sidebar {
            grid-area: sidebar;
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .main {
            grid-area: main;
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .footer {
            grid-area: footer;
            background: #333;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
        }
        
        .flex-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .flex-item {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #2196F3;
        }
        
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #dee2e6;
            transition: transform 0.2s ease;
        }
        
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 768px) {
            .advanced-layout {
                grid-template-areas: 
                    "header"
                    "main"
                    "sidebar"
                    "footer";
                grid-template-columns: 1fr;
                grid-template-rows: auto 1fr auto auto;
            }
        }
    </style>
</head>
<body>
    <div class="advanced-layout">
        <header class="header">
            <h1>Layout Avançado com Grid + Flexbox</h1>
        </header>
        
        <aside class="sidebar">
            <div class="flex-container">
                <div class="flex-item">Menu Item 1</div>
                <div class="flex-item">Menu Item 2</div>
                <div class="flex-item">Menu Item 3</div>
                <div class="flex-item">Menu Item 4</div>
            </div>
        </aside>
        
        <main class="main">
            <h2>Conteúdo Principal</h2>
            <p>Este é um exemplo de layout responsivo usando CSS Grid e Flexbox.</p>
            
            <div class="card-grid">
                <div class="card">
                    <h3>Card 1</h3>
                    <p>Conteúdo do card usando grid responsivo.</p>
                </div>
                <div class="card">
                    <h3>Card 2</h3>
                    <p>Conteúdo do card usando grid responsivo.</p>
                </div>
                <div class="card">
                    <h3>Card 3</h3>
                    <p>Conteúdo do card usando grid responsivo.</p>
                </div>
            </div>
        </main>
        
        <footer class="footer">
            <p>&copy; 2024 Fenix Academy - CSS Grid + Flexbox Avançado</p>
        </footer>
    </div>
</body>
</html>
```

### 4. Exercícios Práticos

#### Exercício 1: Implementação Básica
Crie uma implementação básica de css grid e flexbox avançado.

#### Exercício 2: Aplicação Prática
Desenvolva uma aplicação que use css grid e flexbox avançado.

#### Exercício 3: Projeto Completo
Crie um projeto completo utilizando css grid e flexbox avançado.

### 5. Projeto Final

#### Objetivo
Desenvolva uma aplicação que demonstre domínio completo de css grid e flexbox avançado.

#### Requisitos
- Implementação robusta
- Testes automatizados
- Documentação completa
- Deploy em produção

### 6. Próximos Passos

- Prática contínua
- Projetos pessoais
- Contribuições open source
- Networking na comunidade

---

**Duração:** 60 minutos  
**Nível:** Avançado  
**Módulo:** 2  
**Aula:** 1  
**Curso:** Web Fundamentals

🎉 Continue evoluindo como desenvolvedor!


## ♿ **Acessibilidade Web - Padrões WCAG**

### **Implementação de Acessibilidade**
Acessibilidade não é opcional - é obrigatória para inclusão digital.

```html
<!-- HTML semântico e acessível -->
<main role="main">
    <h1>Página Principal</h1>
    
    <nav aria-label="Navegação principal">
        <ul>
            <li><a href="#home" aria-current="page">Início</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contact">Contato</a></li>
        </ul>
    </nav>
    
    <section aria-labelledby="content-heading">
        <h2 id="content-heading">Conteúdo Principal</h2>
        <p>Conteúdo da página...</p>
    </section>
</main>
```

### **ARIA Labels e Roles**
```html
<!-- Botões com contexto -->
<button 
    aria-label="Fechar modal"
    aria-expanded="false"
    aria-controls="modal-content"
>
    ✕
</button>

<!-- Formulários acessíveis -->
<form>
    <label for="email">Email:</label>
    <input 
        type="email" 
        id="email" 
        name="email"
        required
        aria-describedby="email-help"
    >
    <div id="email-help">Digite seu email válido</div>
</form>
```

---


### 7. Exemplo Prático Detalhado

#### Aula 6 - Web Fundamentals

```javascript
// Exemplo avançado: Aula 6 - Web Fundamentals
class ExemploAvancado {
    constructor(options = {}) {
        this.options = options;
        this.logger = options.logger || console;
    }
    
    async processar() {
        this.logger.info('Processando Aula 6 - Web Fundamentals');
        return 'Implementação avançada concluída';
    }
}

const exemplo = new ExemploAvancado();
exemplo.processar();
```

#### Explicação do Código

Este exemplo demonstra:

1. **Estrutura básica**: Como organizar o código
2. **Funcionalidades principais**: Implementação das características
3. **Boas práticas**: Padrões recomendados
4. **Tratamento de erros**: Como lidar com exceções
5. **Performance**: Otimizações aplicadas

#### Como Executar

1. **Pré-requisitos**:
   - Generic instalado
   - IDE configurada
   - Dependências instaladas

2. **Passos**:
   - Copie o código para seu projeto
   - Execute o comando de build
   - Teste a funcionalidade
   - Verifique os logs

3. **Testes**:
   - Execute testes unitários
   - Verifique integração
   - Valide performance

#### Variações e Extensões

- **Versão básica**: Implementação simplificada
- **Versão avançada**: Com recursos extras
- **Versão enterprise**: Para produção
- **Versão mobile**: Adaptada para dispositivos móveis

