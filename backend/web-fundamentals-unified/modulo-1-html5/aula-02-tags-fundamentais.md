# 🏷️ Aula 2: Tags Fundamentais e Hierarquia Avançada
## Web Fundamentals - Módulo 1: Fundamentos HTML5

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 7  
🧪 **Exercícios**: 4  
📚 **Nível**: Iniciante  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar tags de formatação de texto
- ✅ Entender elementos de citação e código
- ✅ Aplicar elementos de agrupamento
- ✅ Criar estruturas de dados complexas
- ✅ Implementar elementos interativos
- ✅ Usar elementos de mídia HTML5
- ✅ Aplicar elementos de semântica avançada

---

## 📚 Conteúdo Principal

### 1. 🌟 Formatação de Texto Avançada

#### **Elementos de Ênfase e Destaque**
```html
<p>
    Este é um texto <strong>importante</strong> e 
    <em>enfatizado</em>.
</p>

<p>
    <mark>Texto destacado</mark> para chamar atenção.
</p>

<p>
    <small>Texto pequeno</small> para informações secundárias.
</p>

<p>
    <del>Texto deletado</del> e 
    <ins>texto inserido</ins>.
</p>

<p>
    <sub>Subscrito</sub> e 
    <sup>Sobrescrito</sup>.
</p>

<p>
    <u>Texto sublinhado</u> e 
    <s>Texto riscado</s>.
</p>
```

#### **Elementos de Citação**
```html
<!-- Citação em linha -->
<p>
    Como disse <cite>Albert Einstein</cite>: 
    <q>A imaginação é mais importante que o conhecimento.</q>
</p>

<!-- Citação em bloco -->
<blockquote cite="https://exemplo.com/fonte">
    <p>
        Esta é uma citação longa que ocupa várias linhas 
        e deve ser destacada do texto principal.
    </p>
    <footer>
        — <cite>Autor da Citação</cite>
    </footer>
</blockquote>

<!-- Abreviações -->
<p>
    <abbr title="HyperText Markup Language">HTML</abbr> 
    é a linguagem de marcação da web.
</p>

<!-- Definições -->
<p>
    <dfn>HTML</dfn> é uma linguagem de marcação.
</p>
```

### 2. 💻 Elementos de Código e Dados

#### **Código e Pré-formatação**
```html
<!-- Código em linha -->
<p>
    Use a função <code>console.log()</code> para imprimir no console.
</p>

<!-- Código em bloco -->
<pre><code>
function saudacao(nome) {
    return `Olá, ${nome}!`;
}

console.log(saudacao('Mundo'));
</code></pre>

<!-- Dados de entrada e saída -->
<p>
    Digite <kbd>Ctrl + C</kbd> para copiar.
</p>

<p>
    O resultado será: <samp>Arquivo copiado com sucesso!</samp>
</p>

<!-- Variáveis -->
<p>
    A variável <var>nome</var> contém o valor do usuário.
</p>
```

#### **Elementos de Dados e Medidas**
```html
<!-- Dados com unidades -->
<p>
    A temperatura é <data value="25">25°C</data>.
</p>

<!-- Medidas e progresso -->
<p>
    O arquivo tem <meter value="6" min="0" max="10">6 de 10</meter> MB.
</p>

<progress value="70" max="100">70%</progress>

<!-- Tempo e data -->
<p>
    O evento acontecerá em 
    <time datetime="2024-12-25T10:00:00">25 de dezembro às 10h</time>.
</p>
```

### 3. 📊 Elementos de Agrupamento e Estrutura

#### **Divisores e Agrupadores**
```html
<!-- Divisor temático -->
<section>
    <h2>Primeira Seção</h2>
    <p>Conteúdo da primeira seção.</p>
</section>

<hr>

<section>
    <h2>Segunda Seção</h2>
    <p>Conteúdo da segunda seção.</p>
</section>

<!-- Agrupador genérico -->
<div class="container">
    <h2>Título</h2>
    <p>Conteúdo agrupado.</p>
</div>

<!-- Span para texto inline -->
<p>
    Este é um <span class="destaque">texto destacado</span> 
    dentro do parágrafo.
</p>
```

#### **Elementos de Lista Avançados**
```html
<!-- Lista com itens complexos -->
<ul>
    <li>
        <h3>Frontend</h3>
        <p>Desenvolvimento da interface do usuário.</p>
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </li>
    <li>
        <h3>Backend</h3>
        <p>Desenvolvimento do servidor e banco de dados.</p>
        <ul>
            <li>Node.js</li>
            <li>Python</li>
            <li>PHP</li>
        </ul>
    </li>
</ul>

<!-- Lista de menu -->
<nav>
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#contato">Contato</a></li>
    </ul>
</nav>
```

### 4. 🎯 Elementos Interativos

#### **Detalhes e Resumo**
```html
<details>
    <summary>Clique para expandir</summary>
    <p>
        Este é o conteúdo que aparece quando você clica 
        no resumo acima.
    </p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</details>

<!-- Detalhes abertos por padrão -->
<details open>
    <summary>Informações Importantes</summary>
    <p>Este conteúdo está visível por padrão.</p>
</details>
```

#### **Elementos de Formulário Básicos**
```html
<!-- Campo de texto -->
<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome" required>

<!-- Área de texto -->
<label for="mensagem">Mensagem:</label>
<textarea id="mensagem" name="mensagem" rows="4" cols="50"></textarea>

<!-- Botão -->
<button type="submit">Enviar</button>

<!-- Campo de busca -->
<label for="busca">Buscar:</label>
<input type="search" id="busca" name="busca">
```

### 5. 🎵 Elementos de Mídia HTML5

#### **Áudio**
```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <p>Seu navegador não suporta áudio HTML5.</p>
</audio>

<!-- Áudio com atributos avançados -->
<audio controls preload="metadata" loop>
    <source src="musica.mp3" type="audio/mpeg">
    <track kind="captions" src="legendas.vtt" srclang="pt" label="Português">
</audio>
```

#### **Vídeo**
```html
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <p>Seu navegador não suporta vídeo HTML5.</p>
</video>

<!-- Vídeo com poster e legendas -->
<video controls poster="thumbnail.jpg">
    <source src="video.mp4" type="video/mp4">
    <track kind="subtitles" src="legendas.vtt" srclang="pt" label="Português">
    <track kind="captions" src="legendas.vtt" srclang="pt" label="Português">
</video>
```

### 6. 🎨 Elementos de Semântica Avançada

#### **Elementos de Artigo e Seção**
```html
<article>
    <header>
        <h1>Título do Artigo</h1>
        <p>Por <author>Nome do Autor</author> em <time>2024-01-15</time></p>
    </header>
    
    <section>
        <h2>Introdução</h2>
        <p>Conteúdo da introdução...</p>
    </section>
    
    <section>
        <h2>Desenvolvimento</h2>
        <p>Conteúdo do desenvolvimento...</p>
    </section>
    
    <footer>
        <p>Tags: <span>HTML</span>, <span>CSS</span>, <span>JavaScript</span></p>
    </footer>
</article>
```

#### **Elementos de Navegação e Conteúdo**
```html
<nav aria-label="Menu principal">
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#contato">Contato</a></li>
    </ul>
</nav>

<main>
    <section id="home">
        <h1>Página Principal</h1>
        <p>Conteúdo principal da página.</p>
    </section>
    
    <aside>
        <h2>Links Relacionados</h2>
        <ul>
            <li><a href="#artigo1">Artigo 1</a></li>
            <li><a href="#artigo2">Artigo 2</a></li>
        </ul>
    </aside>
</main>
```

### 7. 🔧 Elementos de Formulário Avançados

#### **Tipos de Input HTML5**
```html
<form>
    <!-- Texto -->
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome" required>
    
    <!-- Email -->
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <!-- Senha -->
    <label for="senha">Senha:</label>
    <input type="password" id="senha" name="senha" required>
    
    <!-- Número -->
    <label for="idade">Idade:</label>
    <input type="number" id="idade" name="idade" min="0" max="120">
    
    <!-- Data -->
    <label for="nascimento">Data de Nascimento:</label>
    <input type="date" id="nascimento" name="nascimento">
    
    <!-- Hora -->
    <label for="hora">Hora:</label>
    <input type="time" id="hora" name="hora">
    
    <!-- Cor -->
    <label for="cor">Cor Favorita:</label>
    <input type="color" id="cor" name="cor">
    
    <!-- Range -->
    <label for="volume">Volume:</label>
    <input type="range" id="volume" name="volume" min="0" max="100">
    
    <!-- Checkbox -->
    <label>
        <input type="checkbox" name="termos" required>
        Aceito os termos de uso
    </label>
    
    <!-- Radio -->
    <fieldset>
        <legend>Gênero:</legend>
        <label>
            <input type="radio" name="genero" value="masculino">
            Masculino
        </label>
        <label>
            <input type="radio" name="genero" value="feminino">
            Feminino
        </label>
    </fieldset>
    
    <!-- Select -->
    <label for="cidade">Cidade:</label>
    <select id="cidade" name="cidade">
        <option value="">Selecione uma cidade</option>
        <option value="sp">São Paulo</option>
        <option value="rj">Rio de Janeiro</option>
        <option value="bh">Belo Horizonte</option>
    </select>
    
    <!-- Botões -->
    <button type="submit">Enviar</button>
    <button type="reset">Limpar</button>
    <button type="button">Ação</button>
</form>
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Página de Documentação Técnica**
Crie uma página de documentação com:
- Título e subtítulos hierárquicos
- Código com syntax highlighting
- Citações e referências
- Lista de recursos
- Elementos interativos (details/summary)

**Critérios de avaliação:**
- ✅ Hierarquia de cabeçalhos
- ✅ Elementos de código apropriados
- ✅ Citações bem formatadas
- ✅ Interatividade funcional

### **Exercício 2: Formulário de Contato Completo**
Desenvolva um formulário com:
- Campos de texto, email, telefone
- Área de texto para mensagem
- Checkbox para newsletter
- Radio buttons para assunto
- Select para categoria
- Botões de ação

**Critérios de avaliação:**
- ✅ Tipos de input apropriados
- ✅ Labels associados corretamente
- ✅ Validação básica
- ✅ Estrutura semântica

### **Exercício 3: Página de Blog com Mídia**
Construa uma página de blog com:
- Artigo com header e footer
- Seção de conteúdo
- Áudio ou vídeo embutido
- Sidebar com links relacionados
- Navegação semântica

**Critérios de avaliação:**
- ✅ Estrutura de artigo
- ✅ Mídia funcional
- ✅ Navegação semântica
- ✅ Layout organizado

### **Exercício 4: Página de FAQ Interativa**
Crie uma página de perguntas frequentes com:
- Lista de perguntas
- Elementos details/summary
- Formatação de texto variada
- Links para recursos externos
- Estrutura acessível

**Critérios de avaliação:**
- ✅ Interatividade funcional
- ✅ Formatação apropriada
- ✅ Links externos
- ✅ Acessibilidade

---

## 💡 Dicas Importantes

### **1. Semântica e Acessibilidade**
- Use elementos semânticos apropriados
- Associe labels com inputs
- Use aria-label para elementos sem texto
- Mantenha hierarquia lógica

### **2. Performance**
- Use loading="lazy" para mídia
- Otimize imagens e vídeos
- Use formatos apropriados
- Preload recursos críticos

### **3. Validação**
- Valide formulários no frontend
- Use tipos de input apropriados
- Implemente mensagens de erro
- Teste em diferentes navegadores

### **4. SEO**
- Use elementos de citação
- Implemente dados estruturados
- Use meta tags apropriadas
- Estruture conteúdo logicamente

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Formulários avançados e validação
- Tabelas e dados estruturados
- Meta tags e SEO
- Acessibilidade avançada

---

## 📝 Checklist de Conclusão

- [ ] Dominou tags de formatação avançada
- [ ] Implementou elementos de código
- [ ] Criou estruturas de agrupamento
- [ ] Aplicou elementos interativos
- [ ] Usou elementos de mídia
- [ ] Completou os 4 exercícios
- [ ] Testou acessibilidade
- [ ] Validou HTML

**🎉 Parabéns! Você completou a Aula 2 com sucesso!**

---

## 📚 Recursos Adicionais

- [MDN HTML Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [HTML5 Form Elements](https://www.w3schools.com/html/html_form_elements.asp)
- [HTML5 Media Elements](https://www.w3schools.com/html/html5_audio.asp)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Próxima aula: Formulários e Validação Avançada*







