# 🌐 Aula 1: Introdução ao HTML e Estrutura Básica
## Módulo 1: Fundamentos HTML - Web Fundamentals

⏱️ **Duração**: 60 min  
🎯 **Objetivos**: 5  
🧪 **Exercícios**: 3  
📚 **Projetos**: 1  

---

## 🎯 Objetivos de Aprendizado
- ✅ Compreender o que é HTML e sua importância na web
- ✅ Entender a estrutura básica de um documento HTML
- ✅ Dominar as tags fundamentais e sua semântica
- ✅ Criar uma primeira página web funcional
- ✅ Aplicar boas práticas de organização e comentários

---

## 🌟 **INTRODUÇÃO AO TÓPICO**

### 🎬 **Hook Visual e Contexto**
Imagine que você está construindo uma casa. O HTML é como a estrutura, as paredes e a fundação. Sem ele, não há onde colocar a decoração (CSS) ou a funcionalidade (JavaScript). Esta aula é o primeiro passo para construir sua presença na web!

### 📋 **Agenda da Aula**
1. **O que é HTML?** → Conceitos fundamentais → Exemplos práticos
2. **Estrutura Básica** → Anatomia de uma página → Tags essenciais
3. **Primeira Página** → Hands-on coding → Projeto prático
4. **Boas Práticas** → Organização → Comentários e semântica

---

## 🏗️ **DESENVOLVIMENTO DOS CONCEITOS**

### 1️⃣ **O que é HTML?**

HTML (HyperText Markup Language) é a linguagem de marcação padrão para criar páginas web. É a espinha dorsal de qualquer site, responsável por estruturar o conteúdo.

**Características principais:**
- **Linguagem de marcação**, não de programação
- **Define a estrutura** e conteúdo da página
- **Trabalha em conjunto** com CSS e JavaScript
- **Padrão web universal** aceito por todos os navegadores
- **Semântico** - cada tag tem um significado específico

**Por que HTML é importante?**
- É a base de toda a web
- Permite criar conteúdo acessível
- Facilita o SEO (otimização para motores de busca)
- É a primeira linguagem que todo desenvolvedor web aprende

### 2️⃣ **Estrutura Básica de uma Página HTML**

#### **Anatomia de um Documento HTML**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Minha primeira página web">
    <meta name="keywords" content="HTML, CSS, JavaScript, Web Development">
    <meta name="author" content="Seu Nome">
    <title>Minha Primeira Página</title>
</head>
<body>
    <!-- Conteúdo visível da página vai aqui -->
    <header>
        <h1>Bem-vindo ao Meu Site</h1>
        <nav>
            <ul>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="inicio">
            <h2>Sobre Mim</h2>
            <p>Olá! Sou um desenvolvedor web apaixonado por criar experiências incríveis na internet.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 - Todos os direitos reservados</p>
    </footer>
</body>
</html>
```

#### **Elementos Essenciais Explicados**

- **`<!DOCTYPE html>`**: Declaração do tipo de documento (HTML5)
- **`<html lang="pt-BR">`**: Elemento raiz com atributo de idioma
- **`<head>`**: Metadados, configurações e recursos da página
- **`<body>`**: Conteúdo visível e interativo da página

### 3️⃣ **Tags Fundamentais e Sua Semântica**

#### **Tags de Cabeçalho (Headings)**
```html
<h1>Título Principal - Só deve haver um por página</h1>
<h2>Subtítulo Principal</h2>
<h3>Seção</h3>
<h4>Subseção</h4>
<h5>Item</h5>
<h6>Subitem</h6>
```

**Regra importante**: Use apenas um `<h1>` por página para SEO e acessibilidade.

#### **Tags de Texto e Conteúdo**
```html
<p>Este é um parágrafo de texto. Parágrafos são blocos de texto que formam unidades lógicas de conteúdo.</p>

<strong>Texto em negrito - para importância</strong>
<em>Texto em itálico - para ênfase</em>
<mark>Texto destacado - para relevância</mark>
<small>Texto pequeno - para informações secundárias</small>

<br> <!-- Quebra de linha - use com moderação -->
<hr> <!-- Linha horizontal - para separar seções -->
```

#### **Tags de Lista**
```html
<!-- Lista não ordenada -->
<ul>
    <li>Primeiro item da lista</li>
    <li>Segundo item da lista</li>
    <li>Terceiro item da lista</li>
</ul>

<!-- Lista ordenada -->
<ol>
    <li>Primeiro passo</li>
    <li>Segundo passo</li>
    <li>Terceiro passo</li>
</ol>

<!-- Lista de definição -->
<dl>
    <dt>HTML</dt>
    <dd>Linguagem de marcação para estruturar conteúdo web</dd>
    <dt>CSS</dt>
    <dd>Linguagem de estilização para design e layout</dd>
</dl>
```

### 4️⃣ **Links e Navegação**

#### **Links Básicos**
```html
<!-- Link externo -->
<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
    Ir para Google
</a>

<!-- Link interno (âncora) -->
<a href="#secao-sobre">Ir para seção Sobre</a>

<!-- Link para email -->
<a href="mailto:seu@email.com">Enviar email</a>

<!-- Link para telefone -->
<a href="tel:+5511999999999">Ligar agora</a>

<!-- Link para download -->
<a href="arquivo.pdf" download>Baixar PDF</a>
```

**Atributos importantes:**
- **`target="_blank"`**: Abre em nova aba
- **`rel="noopener noreferrer"`**: Segurança para links externos
- **`download`**: Força o download do arquivo

### 5️⃣ **Comentários e Organização**

#### **Comentários HTML**
```html
<!-- Este é um comentário HTML -->
<!-- 
    Comentários de múltiplas linhas
    são úteis para explicar seções complexas
    ou documentar o código
-->

<!-- Seção de navegação -->
<nav>
    <!-- Menu principal -->
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">Sobre</a></li>
    </ul>
</nav>
```

#### **Estrutura de Arquivos Recomendada**
```
projeto-web/
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos
├── js/
│   └── script.js      # JavaScript
├── images/             # Imagens
└── README.md           # Documentação
```

---

## 🧪 **EXERCÍCIOS PRÁTICOS**

### **Exercício 1: Página de Apresentação Pessoal**
Crie uma página HTML que apresente você mesmo, incluindo:
- Título principal com seu nome
- Seção "Sobre Mim" com uma breve descrição
- Lista de suas habilidades técnicas
- Links para suas redes sociais
- Informações de contato

**Código base para começar:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Portfólio</title>
</head>
<body>
    <!-- Seu código aqui -->
</body>
</html>
```

### **Exercício 2: Página de Receita de Culinária**
Desenvolva uma página para uma receita de culinária com:
- Título da receita
- Lista de ingredientes
- Passos numerados para preparo
- Tempo de preparo e porções
- Dicas e variações

### **Exercício 3: Blog Pessoal Simples**
Crie a estrutura de um blog com:
- Cabeçalho com navegação
- Seção de artigos recentes
- Barra lateral com categorias
- Rodapé com informações de contato

---

## 🚀 **PROJETO PRÁTICO: PORTFÓLIO PESSOAL**

### **Objetivo**
Criar uma página de portfólio profissional que demonstre suas habilidades em HTML.

### **Requisitos**
1. **Estrutura semântica** com header, main, section e footer
2. **Navegação funcional** entre seções
3. **Conteúdo organizado** em seções lógicas
4. **Links externos** para projetos e redes sociais
5. **Formulário de contato** básico

### **Estrutura Sugerida**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Portfólio - Desenvolvedor Web</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#projetos">Projetos</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="inicio">
            <h1>Seu Nome</h1>
            <h2>Desenvolvedor Web Full Stack</h2>
            <p>Transformando ideias em experiências digitais incríveis</p>
        </section>
        
        <section id="sobre">
            <h2>Sobre Mim</h2>
            <p>Sua história e experiência aqui...</p>
        </section>
        
        <section id="projetos">
            <h2>Meus Projetos</h2>
            <ul>
                <li>Projeto 1</li>
                <li>Projeto 2</li>
                <li>Projeto 3</li>
            </ul>
        </section>
        
        <section id="contato">
            <h2>Entre em Contato</h2>
            <form>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                
                <label for="mensagem">Mensagem:</label>
                <textarea id="mensagem" name="mensagem" required></textarea>
                
                <button type="submit">Enviar</button>
            </form>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 - Seu Nome. Todos os direitos reservados.</p>
        <p>Desenvolvido com ❤️ e muito café</p>
    </footer>
</body>
</html>
```

---

## 📚 **RECURSOS ADICIONAIS**

### **Documentação Oficial**
- [MDN Web Docs - HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML Living Standard](https://html.spec.whatwg.org/)

### **Ferramentas Úteis**
- **Validador HTML**: [W3C Validator](https://validator.w3.org/)
- **Editor de Código**: VS Code, Sublime Text, Atom
- **Navegadores**: Chrome, Firefox, Safari, Edge
- **DevTools**: F12 para inspecionar elementos

### **Próximos Passos**
- Aula 2: Tags de Cabeçalho e Parágrafos Avançados
- Aula 3: Listas e Links Complexos
- Aula 4: Imagens e Mídia

---

## 📝 **CHECKLIST DE CONCLUSÃO**

- [ ] Entendeu o que é HTML e sua importância
- [ ] Compreendeu a estrutura básica de um documento HTML
- [ ] Dominou as tags fundamentais e sua semântica
- [ ] Criou uma primeira página web funcional
- [ ] Aplicou boas práticas de organização e comentários
- [ ] Completou todos os exercícios práticos
- [ ] Desenvolveu o projeto de portfólio pessoal
- [ ] Testou a página em diferentes navegadores

---

## 🎉 **PARABÉNS!**

Você completou com sucesso a **Aula 1: Introdução ao HTML e Estrutura Básica**! 

Agora você tem uma base sólida em HTML e está pronto para avançar para a próxima aula, onde aprenderemos sobre tags de cabeçalho e parágrafos mais avançados.

**🚀 Continue praticando e construindo! A web é o seu playground!**

---

*Próxima aula: [Aula 2: Tags de Cabeçalho e Parágrafos Avançados](./02-tags-cabecalho.md)*
