# 🎨 Aula 1: Introdução ao CSS3 e Seletores Avançados
## Web Fundamentals - Módulo 2: CSS3 e Layouts

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Iniciante  

---

## 🎯 Objetivos de Aprendizado

- ✅ Compreender a evolução do CSS para CSS3
- ✅ Dominar seletores básicos e avançados
- ✅ Aplicar propriedades de texto e cores
- ✅ Entender o modelo de caixa (Box Model)
- ✅ Implementar unidades de medida modernas
- ✅ Criar layouts responsivos básicos
- ✅ Aplicar pseudo-classes e pseudo-elementos
- ✅ Otimizar performance CSS

---

## 📚 Conteúdo Principal

### 1. 🌟 O que é CSS3?

CSS3 (Cascading Style Sheets 3) é a terceira versão da linguagem de estilização para páginas web. É responsável pela apresentação visual e layout dos elementos HTML.

**Características principais:**
- Separação de conteúdo (HTML) e apresentação (CSS)
- Cascata e herança de estilos
- Seletores poderosos e flexíveis
- Propriedades avançadas de layout
- Animações e transições
- Responsividade e media queries

**Evolução do CSS:**
```css
/* CSS 1 (1996) */
h1 { color: blue; }

/* CSS 2 (1998) */
h1 { color: blue; position: absolute; }

/* CSS3 (2005+) */
h1 { 
    color: blue; 
    position: absolute; 
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
}
```

### 2. 🎯 Seletores CSS3

#### **Seletores Básicos**
```css
/* Seletor de elemento */
h1 { color: blue; }

/* Seletor de classe */
.destaque { background: yellow; }

/* Seletor de ID */
#header { font-size: 24px; }

/* Seletor universal */
* { margin: 0; padding: 0; }

/* Seletor de atributo */
input[type="text"] { border: 1px solid #ccc; }
```

#### **Seletores Avançados**
```css
/* Seletor descendente */
nav ul li { list-style: none; }

/* Seletor filho direto */
nav > ul > li { display: inline-block; }

/* Seletor irmão adjacente */
h1 + p { margin-top: 0; }

/* Seletor irmão geral */
h1 ~ p { color: gray; }

/* Seletor de atributo com valor */
a[href^="https"] { color: green; }
a[href$=".pdf"] { color: red; }
a[href*="google"] { color: blue; }

/* Seletor de pseudo-classe */
a:hover { color: red; }
input:focus { border-color: blue; }
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(even) { background: white; }
li:nth-child(3n) { color: blue; }

/* Seletor de pseudo-elemento */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
p::before { content: "→ "; }
p::after { content: " ←"; }
```

#### **Seletores de Atributo Avançados**
```css
/* Atributo com valor exato */
input[type="email"] { border: 2px solid green; }

/* Atributo que começa com */
a[href^="https://"] { color: green; }

/* Atributo que termina com */
a[href$=".pdf"] { color: red; }

/* Atributo que contém */
a[href*="google"] { color: blue; }

/* Atributo com valor separado por espaço */
div[class~="destaque"] { background: yellow; }

/* Atributo com valor separado por hífen */
div[class|="menu"] { border: 1px solid black; }
```

### 3. 🎨 Propriedades de Texto e Cores

#### **Tipografia Avançada**
```css
/* Fontes */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: 0.5px;
    word-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    text-align: left;
    text-indent: 2em;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* Títulos */
h1 {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    text-transform: capitalize;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

/* Parágrafos */
p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    text-align: justify;
    hyphens: auto;
}
```

#### **Cores e Gradientes**
```css
/* Cores básicas */
.texto-azul { color: blue; }
.texto-hex { color: #0066cc; }
.texto-rgb { color: rgb(0, 102, 204); }
.texto-rgba { color: rgba(0, 102, 204, 0.8); }
.texto-hsl { color: hsl(210, 100%, 40%); }
.texto-hsla { color: hsla(210, 100%, 40%, 0.8); }

/* Gradientes lineares */
.gradiente-linear {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

.gradiente-linear-multiplo {
    background: linear-gradient(90deg, 
        #ff6b6b 0%, 
        #4ecdc4 25%, 
        #45b7d1 50%, 
        #96ceb4 75%, 
        #feca57 100%);
}

/* Gradientes radiais */
.gradiente-radial {
    background: radial-gradient(circle, #ff6b6b, #4ecdc4);
}

.gradiente-radial-posicao {
    background: radial-gradient(circle at top right, #ff6b6b, #4ecdc4);
}

/* Gradientes conicos */
.gradiente-conico {
    background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b);
}
```

### 4. 📦 Modelo de Caixa (Box Model)

#### **Propriedades do Box Model**
```css
.box {
    /* Conteúdo */
    width: 300px;
    height: 200px;
    
    /* Padding (espaçamento interno) */
    padding: 20px;
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 10px;
    padding-left: 15px;
    
    /* Border (borda) */
    border: 2px solid #333;
    border-top: 1px solid #666;
    border-radius: 10px;
    border-top-left-radius: 5px;
    
    /* Margin (espaçamento externo) */
    margin: 20px;
    margin-top: 10px;
    margin-right: auto;
    margin-bottom: 10px;
    margin-left: auto;
    
    /* Box-sizing */
    box-sizing: border-box; /* Inclui padding e border no width/height */
}
```

#### **Box-sizing e Layout**
```css
/* Box-sizing padrão */
.elemento-padrao {
    box-sizing: content-box; /* width/height = apenas conteúdo */
    width: 300px;
    padding: 20px;
    border: 2px solid #333;
    /* Largura total = 300px + 40px (padding) + 4px (border) = 344px */
}

/* Box-sizing border-box */
.elemento-border-box {
    box-sizing: border-box; /* width/height = conteúdo + padding + border */
    width: 300px;
    padding: 20px;
    border: 2px solid #333;
    /* Largura total = 300px (inclui tudo) */
}

/* Reset global */
* {
    box-sizing: border-box;
}
```

### 5. 📏 Unidades de Medida Modernas

#### **Unidades Relativas**
```css
/* Unidades relativas ao elemento pai */
.container {
    width: 80%; /* 80% da largura do pai */
    height: 50vh; /* 50% da altura da viewport */
    font-size: 1.2em; /* 1.2x o tamanho da fonte do pai */
    line-height: 1.5rem; /* 1.5x o tamanho da fonte raiz */
}

/* Unidades de viewport */
.header {
    height: 100vh; /* 100% da altura da viewport */
    width: 100vw; /* 100% da largura da viewport */
    font-size: 4vw; /* 4% da largura da viewport */
    margin: 2vh 0; /* 2% da altura da viewport */
}

/* Unidades de fonte */
.texto {
    font-size: 1.2rem; /* 1.2x o tamanho da fonte raiz */
    line-height: 1.5em; /* 1.5x o tamanho da fonte do elemento */
    width: 20ch; /* 20 caracteres */
    height: 5lh; /* 5 linhas */
}
```

#### **Unidades Absolutas e Relativas**
```css
/* Unidades absolutas */
.medidas-absolutas {
    width: 300px; /* Pixels */
    height: 200px;
    font-size: 16px;
    border: 1px solid #333;
    margin: 10px;
    padding: 15px;
}

/* Unidades relativas */
.medidas-relativas {
    width: 50%; /* Porcentagem do pai */
    height: 50vh; /* 50% da altura da viewport */
    font-size: 1.2em; /* 1.2x a fonte do pai */
    margin: 2rem; /* 2x a fonte raiz */
    padding: 1.5em; /* 1.5x a fonte do elemento */
}

/* Unidades de viewport */
.medidas-viewport {
    width: 100vw; /* 100% da largura da viewport */
    height: 100vh; /* 100% da altura da viewport */
    font-size: 4vw; /* 4% da largura da viewport */
    margin: 2vh 0; /* 2% da altura da viewport */
}
```

### 6. 🎭 Pseudo-classes e Pseudo-elementos

#### **Pseudo-classes de Estado**
```css
/* Links */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; text-decoration: underline; }
a:active { color: green; }

/* Formulários */
input:focus { 
    border-color: blue; 
    box-shadow: 0 0 5px rgba(0,0,255,0.3);
    outline: none;
}

input:valid { border-color: green; }
input:invalid { border-color: red; }
input:required { border-left: 3px solid orange; }

/* Elementos */
div:hover { background-color: #f0f0f0; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
```

#### **Pseudo-classes de Posição**
```css
/* Primeiro e último filho */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }

/* Filhos específicos */
li:nth-child(2) { color: blue; }
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(even) { background: white; }
li:nth-child(3n) { color: red; }
li:nth-child(3n+1) { color: green; }

/* Filhos do tipo */
p:first-of-type { font-size: 1.2em; }
p:last-of-type { margin-bottom: 0; }
p:nth-of-type(2) { color: blue; }
```

#### **Pseudo-elementos**
```css
/* Primeira linha e primeira letra */
p::first-line { font-weight: bold; }
p::first-letter { 
    font-size: 2em; 
    float: left; 
    margin-right: 5px;
}

/* Antes e depois */
.elemento::before {
    content: "→ ";
    color: blue;
    font-weight: bold;
}

.elemento::after {
    content: " ←";
    color: red;
    font-weight: bold;
}

/* Seleção de texto */
::selection {
    background-color: yellow;
    color: black;
}

::-moz-selection {
    background-color: yellow;
    color: black;
}
```

### 7. 🎨 Propriedades de Background Avançadas

#### **Backgrounds Múltiplos**
```css
.background-multiplo {
    background: 
        linear-gradient(45deg, rgba(255,0,0,0.3), rgba(0,255,0,0.3)),
        url('imagem.jpg') center/cover no-repeat,
        radial-gradient(circle, #ff6b6b, #4ecdc4);
}

/* Background com posicionamento */
.background-posicao {
    background-image: url('imagem.jpg');
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

/* Background com clip */
.background-clip {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

### 8. 🚀 Performance e Otimização

#### **Otimizações de Performance**
```css
/* Use transform em vez de position para animações */
.animacao-otimizada {
    transform: translateX(100px);
    transition: transform 0.3s ease;
}

/* Evite reflow/repaint */
.elemento-otimizado {
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000px;
}

/* Use contain para isolamento */
.container-otimizado {
    contain: layout style paint;
}

/* Otimize fontes */
@font-face {
    font-family: 'MinhaFonte';
    src: url('fonte.woff2') format('woff2');
    font-display: swap; /* Carrega fonte de fallback primeiro */
}
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Página de Estilo com Seletores Avançados**
Crie uma página com:
- Seletores de atributo para formulários
- Pseudo-classes para navegação
- Pseudo-elementos para formatação
- Gradientes e cores modernas
- Tipografia responsiva

**Critérios de avaliação:**
- ✅ Seletores avançados implementados
- ✅ Pseudo-classes funcionais
- ✅ Pseudo-elementos aplicados
- ✅ Design moderno e atrativo

### **Exercício 2: Layout com Box Model**
Desenvolva um layout com:
- Elementos com diferentes box-sizing
- Padding e margin calculados
- Bordas e border-radius
- Espaçamento consistente
- Layout responsivo

**Critérios de avaliação:**
- ✅ Box model compreendido
- ✅ Espaçamento consistente
- ✅ Layout bem estruturado
- ✅ Responsividade básica

### **Exercício 3: Tipografia e Cores Avançadas**
Construa uma página com:
- Tipografia hierárquica
- Cores e gradientes modernos
- Text-shadow e efeitos
- Fontes web otimizadas
- Legibilidade excelente

**Critérios de avaliação:**
- ✅ Tipografia bem estruturada
- ✅ Cores harmoniosas
- ✅ Efeitos visuais apropriados
- ✅ Legibilidade otimizada

### **Exercício 4: Componentes Interativos**
Crie componentes com:
- Estados hover e focus
- Transições suaves
- Pseudo-elementos decorativos
- Feedback visual
- Acessibilidade

**Critérios de avaliação:**
- ✅ Interatividade funcional
- ✅ Transições suaves
- ✅ Feedback visual
- ✅ Acessibilidade

---

## 💡 Dicas Importantes

### **1. Performance**
- Use transform em vez de position para animações
- Otimize fontes com font-display: swap
- Use contain para isolamento de layout
- Evite reflow/repaint desnecessário

### **2. Acessibilidade**
- Mantenha contraste adequado
- Use unidades relativas para texto
- Teste com zoom do navegador
- Implemente focus states

### **3. Responsividade**
- Use unidades de viewport (vw, vh)
- Implemente media queries
- Teste em diferentes dispositivos
- Use flexbox e grid para layouts

### **4. Manutenibilidade**
- Use variáveis CSS para cores
- Organize código em seções
- Comente código complexo
- Use metodologias como BEM

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Box Model e propriedades de layout
- Display e positioning
- Flexbox básico
- Layouts responsivos

---

## 📝 Checklist de Conclusão

- [ ] Compreendeu a evolução do CSS3
- [ ] Dominou seletores avançados
- [ ] Aplicou propriedades de texto e cores
- [ ] Entendeu o modelo de caixa
- [ ] Implementou unidades modernas
- [ ] Criou layouts responsivos básicos
- [ ] Aplicou pseudo-classes e pseudo-elementos
- [ ] Otimizou performance CSS
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes navegadores

**🎉 Parabéns! Você completou a Aula 1 com sucesso!**

---

## 📚 Recursos Adicionais

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Selectors](https://www.w3schools.com/css/css_selectors.asp)
- [CSS Box Model](https://www.w3schools.com/css/css_boxmodel.asp)
- [CSS Performance](https://web.dev/css-performance/)

---

*Próxima aula: Box Model e Propriedades de Layout*







