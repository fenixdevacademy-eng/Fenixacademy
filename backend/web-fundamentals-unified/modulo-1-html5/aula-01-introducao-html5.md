# 🌐 Aula 1: Introdução ao HTML5 e Estrutura Semântica
## Web Fundamentals - Módulo 1: Fundamentos HTML5

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 6  
🧪 **Exercícios**: 4  
📚 **Nível**: Iniciante  

---

## 🎯 Objetivos de Aprendizado

- ✅ Compreender a evolução do HTML para HTML5
- ✅ Dominar a estrutura semântica moderna
- ✅ Criar páginas web acessíveis e SEO-friendly
- ✅ Entender tags e elementos fundamentais
- ✅ Aplicar boas práticas de desenvolvimento
- ✅ Implementar meta tags essenciais

---

## 📚 Conteúdo Principal

### 1. 🌟 O que é HTML5?

HTML5 (HyperText Markup Language 5) é a quinta versão da linguagem de marcação padrão para criar páginas web. É a espinha dorsal de qualquer site moderno.

**Características principais:**
- Linguagem de marcação, não de programação
- Define a estrutura e conteúdo da página
- Trabalha em conjunto com CSS e JavaScript
- Padrão web universal e acessível
- Suporte nativo a mídia (áudio, vídeo)
- APIs JavaScript integradas

**Evolução do HTML:**
```html
<!-- HTML 4.01 (1999) -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<!-- HTML5 (2014) -->
<!DOCTYPE html>
```

### 2. 🏗️ Estrutura Básica de uma Página HTML5

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descrição da página para SEO">
    <meta name="keywords" content="palavras, chave, separadas, por, vírgula">
    <meta name="author" content="Seu Nome">
    <title>Minha Primeira Página HTML5</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="favicon.ico">
</head>
<body>
    <header>
        <h1>Olá, Mundo!</h1>
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
            <p>Esta é minha primeira página web moderna.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Meu Site. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
```

**Elementos essenciais explicados:**
- `<!DOCTYPE html>`: Declaração do tipo de documento HTML5
- `<html lang="pt-BR">`: Elemento raiz com idioma definido
- `<head>`: Metadados e configurações da página
- `<body>`: Conteúdo visível da página
- `<header>`, `<main>`, `<footer>`: Elementos semânticos HTML5

### 3. 🏷️ Tags Fundamentais e Hierarquia

#### **Cabeçalhos (Headings) - Hierarquia Semântica**
```html
<h1>Título Principal da Página</h1>
<h2>Seção Principal</h2>
<h3>Subseção</h3>
<h4>Item de Subseção</h4>
<h5>Subitem</h5>
<h6>Menor Nível</h6>
```

**Regras importantes:**
- Use apenas um `<h1>` por página
- Mantenha a hierarquia lógica (não pule níveis)
- Use para estrutura, não para tamanho

#### **Parágrafos e Formatação de Texto**
```html
<p>Este é um parágrafo de texto normal.</p>

<p>
    <strong>Texto em negrito</strong> e 
    <em>texto em itálico</em>.
</p>

<p>
    <mark>Texto destacado</mark> e 
    <small>texto pequeno</small>.
</p>

<p>
    <del>Texto deletado</del> e 
    <ins>texto inserido</ins>.
</p>

<p>
    <sub>Subscrito</sub> e 
    <sup>Sobrescrito</sup>.
</p>

<!-- Quebras de linha e separadores -->
<p>Primeira linha<br>Segunda linha</p>
<hr>
<p>Parágrafo após linha horizontal</p>
```

#### **Listas Estruturadas**
```html
<!-- Lista não ordenada -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
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
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>

<!-- Lista aninhada -->
<ul>
    <li>Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </li>
    <li>Backend
        <ul>
            <li>Node.js</li>
            <li>Python</li>
            <li>PHP</li>
        </ul>
    </li>
</ul>
```

### 4. 🔗 Links e Navegação

#### **Tipos de Links**
```html
<!-- Link externo -->
<a href="https://www.google.com" target="_blank" rel="noopener">
    Ir para Google
</a>

<!-- Link interno -->
<a href="#secao-sobre">Ir para seção sobre</a>

<!-- Link para email -->
<a href="mailto:contato@exemplo.com">Enviar email</a>

<!-- Link para telefone -->
<a href="tel:+5511999999999">Ligar agora</a>

<!-- Link para download -->
<a href="documento.pdf" download>Baixar documento</a>

<!-- Link com título (tooltip) -->
<a href="#sobre" title="Saiba mais sobre nossa empresa">
    Sobre nós
</a>
```

#### **Navegação Semântica**
```html
<nav role="navigation" aria-label="Menu principal">
    <ul>
        <li><a href="#home" aria-current="page">Home</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#servicos">Serviços</a></li>
        <li><a href="#contato">Contato</a></li>
    </ul>
</nav>
```

### 5. 🖼️ Imagens e Mídia

#### **Imagens Responsivas e Acessíveis**
```html
<!-- Imagem básica -->
<img src="imagem.jpg" alt="Descrição da imagem">

<!-- Imagem responsiva -->
<img src="imagem.jpg" 
     alt="Descrição da imagem" 
     width="300" 
     height="200"
     loading="lazy">

<!-- Imagem com múltiplas resoluções -->
<img src="imagem-300.jpg" 
     srcset="imagem-300.jpg 300w, 
             imagem-600.jpg 600w, 
             imagem-900.jpg 900w"
     sizes="(max-width: 600px) 300px, 
            (max-width: 900px) 600px, 
            900px"
     alt="Descrição da imagem">

<!-- Imagem com fallback -->
<picture>
    <source media="(min-width: 800px)" srcset="imagem-grande.jpg">
    <source media="(min-width: 400px)" srcset="imagem-media.jpg">
    <img src="imagem-pequena.jpg" alt="Descrição da imagem">
</picture>
```

**Atributos importantes:**
- `src`: Caminho da imagem
- `alt`: Texto alternativo (obrigatório para acessibilidade)
- `width/height`: Dimensões (evita layout shift)
- `loading="lazy"`: Carregamento preguiçoso
- `srcset`: Múltiplas resoluções
- `sizes`: Tamanhos responsivos

### 6. 📱 Meta Tags Essenciais

#### **Meta Tags para SEO e Performance**
```html
<head>
    <!-- Charset (obrigatório) -->
    <meta charset="UTF-8">
    
    <!-- Viewport (responsividade) -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO -->
    <meta name="description" content="Descrição da página para SEO">
    <meta name="keywords" content="palavras, chave, separadas, por, vírgula">
    <meta name="author" content="Seu Nome">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph (redes sociais) -->
    <meta property="og:title" content="Título da Página">
    <meta property="og:description" content="Descrição da página">
    <meta property="og:image" content="imagem-compartilhamento.jpg">
    <meta property="og:url" content="https://seusite.com">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Título da Página">
    <meta name="twitter:description" content="Descrição da página">
    <meta name="twitter:image" content="imagem-compartilhamento.jpg">
    
    <!-- Performance -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="theme-color" content="#000000">
    
    <!-- Preload de recursos críticos -->
    <link rel="preload" href="fontes.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="estilos.css" as="style">
</head>
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Página de Apresentação Pessoal**
Crie uma página HTML5 completa com:
- Estrutura semântica (header, main, footer)
- Meta tags para SEO
- Seção "Sobre mim" com foto
- Lista de habilidades técnicas
- Links para redes sociais
- Formatação de texto variada

**Critérios de avaliação:**
- ✅ Estrutura semântica correta
- ✅ Meta tags completas
- ✅ Acessibilidade (alt em imagens)
- ✅ Hierarquia de cabeçalhos
- ✅ Links funcionais

### **Exercício 2: Receita de Culinária**
Desenvolva uma página com:
- Título da receita
- Lista de ingredientes (não ordenada)
- Passos numerados (lista ordenada)
- Tempo de preparo e porções
- Imagem da receita
- Informações nutricionais

**Critérios de avaliação:**
- ✅ Listas apropriadas
- ✅ Estrutura lógica
- ✅ Imagem com alt descritivo
- ✅ Formatação clara

### **Exercício 3: Portfólio Profissional**
Construa um portfólio básico com:
- Header com navegação
- Seção "Sobre mim"
- Seção "Projetos" com lista
- Seção "Contato" com links
- Footer com informações
- Meta tags para SEO

**Critérios de avaliação:**
- ✅ Navegação semântica
- ✅ Estrutura completa
- ✅ Links internos funcionais
- ✅ SEO otimizado

### **Exercício 4: Artigo de Blog**
Crie um artigo sobre tecnologia com:
- Título principal
- Subtítulos hierárquicos
- Parágrafos com formatação
- Listas de informações
- Links para referências
- Meta tags específicas

**Critérios de avaliação:**
- ✅ Hierarquia de cabeçalhos
- ✅ Formatação de texto
- ✅ Links externos
- ✅ Estrutura de artigo

---

## 💡 Dicas Importantes

### **1. Semântica HTML5**
- Use tags que fazem sentido para o conteúdo
- Prefira `<strong>` e `<em>` em vez de `<b>` e `<i>`
- Use elementos semânticos: `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`

### **2. Acessibilidade**
- Sempre inclua atributos `alt` em imagens
- Use `aria-label` para elementos sem texto
- Mantenha contraste adequado
- Estruture a navegação logicamente

### **3. SEO e Performance**
- Use meta tags descritivas
- Otimize imagens (tamanho e formato)
- Use `loading="lazy"` para imagens não críticas
- Preload recursos importantes

### **4. Validação**
- Valide seu HTML no [W3C Validator](https://validator.w3.org/)
- Teste em diferentes navegadores
- Verifique acessibilidade com ferramentas

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Tags fundamentais avançadas
- Estrutura de documentos complexos
- Boas práticas de organização
- Validação e debugging

---

## 📝 Checklist de Conclusão

- [ ] Entendeu a estrutura básica do HTML5
- [ ] Criou uma página HTML5 semântica
- [ ] Aplicou meta tags essenciais
- [ ] Implementou hierarquia de cabeçalhos
- [ ] Completou os 4 exercícios
- [ ] Testou a validação HTML
- [ ] Verificou acessibilidade básica

**🎉 Parabéns! Você completou a Aula 1 com sucesso!**

---

## 📚 Recursos Adicionais

- [MDN HTML5 Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3C HTML5 Specification](https://www.w3.org/TR/html5/)
- [HTML5 Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Próxima aula: Tags Fundamentais e Hierarquia Avançada*







