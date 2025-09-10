# 🎨 Aula 1: CSS Avançado e Flexbox
## Web Fundamentals - Nível Intermediário

⏱️ **Duração**: 60 min  
🎯 **Objetivos**: 6  
🧪 **Exercícios**: 4  

---

## 🎯 Objetivos de Aprendizado
- ✅ Dominar Flexbox para layouts flexíveis
- ✅ Criar layouts responsivos avançados
- ✅ Implementar animações CSS complexas
- ✅ Otimizar performance CSS
- ✅ Aplicar design patterns modernos
- ✅ Criar componentes reutilizáveis

---

## 📚 Conteúdo Principal

### 1. 🌟 Flexbox: O que é e por que usar?

Flexbox é um modelo de layout CSS que permite criar layouts flexíveis e responsivos de forma mais eficiente que métodos tradicionais.

**Vantagens do Flexbox:**
- Layouts flexíveis e adaptáveis
- Controle preciso sobre alinhamento
- Ordenação de elementos
- Distribuição de espaço automática
- Suporte nativo em todos os navegadores modernos

### 2. 🏗️ Conceitos Fundamentais do Flexbox

#### **Container Flex (Flex Container)**
```css
.flex-container {
    display: flex;
    /* ou display: inline-flex; */
}
```

#### **Itens Flex (Flex Items)**
```css
.flex-item {
    /* Propriedades específicas dos itens */
}
```

### 3. 🎯 Propriedades do Container

#### **Direção do Flex (flex-direction)**
```css
.flex-container {
    flex-direction: row;        /* Padrão: da esquerda para direita */
    flex-direction: row-reverse; /* Da direita para esquerda */
    flex-direction: column;     /* De cima para baixo */
    flex-direction: column-reverse; /* De baixo para cima */
}
```

#### **Quebra de Linha (flex-wrap)**
```css
.flex-container {
    flex-wrap: nowrap;    /* Padrão: não quebra linha */
    flex-wrap: wrap;      /* Quebra para nova linha */
    flex-wrap: wrap-reverse; /* Quebra para linha acima */
}
```

#### **Justificação (justify-content)**
```css
.flex-container {
    justify-content: flex-start;    /* Padrão: início */
    justify-content: flex-end;      /* Fim */
    justify-content: center;        /* Centro */
    justify-content: space-between; /* Espaço entre itens */
    justify-content: space-around;  /* Espaço ao redor */
    justify-content: space-evenly;  /* Espaço igual */
}
```

#### **Alinhamento Vertical (align-items)**
```css
.flex-container {
    align-items: stretch;     /* Padrão: estica */
    align-items: flex-start;  /* Topo */
    align-items: flex-end;    /* Baixo */
    align-items: center;      /* Centro */
    align-items: baseline;    /* Linha base do texto */
}
```

#### **Alinhamento de Múltiplas Linhas (align-content)**
```css
.flex-container {
    align-content: flex-start;
    align-content: flex-end;
    align-content: center;
    align-content: space-between;
    align-content: space-around;
    align-content: stretch; /* Padrão */
}
```

### 4. 🎯 Propriedades dos Itens

#### **Ordem (order)**
```css
.flex-item {
    order: 0; /* Padrão */
    order: 1; /* Move para o final */
    order: -1; /* Move para o início */
}
```

#### **Crescimento (flex-grow)**
```css
.flex-item {
    flex-grow: 0; /* Padrão: não cresce */
    flex-grow: 1; /* Cresce proporcionalmente */
    flex-grow: 2; /* Cresce 2x mais que outros */
}
```

#### **Encolhimento (flex-shrink)**
```css
.flex-item {
    flex-shrink: 1; /* Padrão: encolhe */
    flex-shrink: 0; /* Não encolhe */
    flex-shrink: 2; /* Encolhe 2x mais */
}
```

#### **Base (flex-basis)**
```css
.flex-item {
    flex-basis: auto; /* Padrão: tamanho do conteúdo */
    flex-basis: 200px; /* Largura fixa */
    flex-basis: 50%; /* Percentual */
}
```

#### **Shorthand (flex)**
```css
.flex-item {
    flex: 0 1 auto; /* grow shrink basis */
    flex: 1;        /* 1 1 0% */
    flex: auto;     /* 1 1 auto */
    flex: none;     /* 0 0 auto */
    flex: 2 1 200px; /* grow=2, shrink=1, basis=200px */
}
```

### 5. 🎨 Layouts Práticos com Flexbox

#### **Layout de Navegação**
```css
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #333;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #007bff;
}
```

#### **Layout de Cards**
```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
}

.card {
    flex: 1 1 300px; /* grow=1, shrink=1, basis=300px */
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 1.5rem;
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}
```

#### **Layout de Formulário**
```css
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.form-row {
    display: flex;
    gap: 1rem;
}

.form-row .form-group {
    flex: 1;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
}
```

### 6. 🚀 Animações CSS Avançadas

#### **Transições Suaves**
```css
.button {
    background: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.button:hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,123,255,0.3);
}
```

#### **Animações com Keyframes**
```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.slide-in {
    animation: slideIn 0.6s ease-out;
}
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Layout de Dashboard**
Crie um dashboard responsivo com:
- Header fixo com navegação
- Sidebar lateral colapsável
- Grid de cards principais
- Footer com informações

### **Exercício 2: Galeria de Imagens Flexível**
Desenvolva uma galeria que:
- Se adapta a diferentes tamanhos de tela
- Mantém proporções das imagens
- Inclui overlay com informações
- Suporta diferentes layouts

### **Exercício 3: Formulário Multi-step**
Construa um formulário com:
- Múltiplas etapas
- Navegação entre etapas
- Validação em tempo real
- Indicador de progresso

### **Exercício 4: Componente de Card Interativo**
Crie um card que:
- Inclui imagem, título, descrição
- Tem estados hover e active
- Suporta ações (like, compartilhar)
- É totalmente responsivo

---

## 💡 Dicas Avançadas

1. **Performance**: Use `will-change` para otimizar animações
2. **Acessibilidade**: Mantenha contraste e tamanhos adequados
3. **Responsividade**: Teste em diferentes breakpoints
4. **Reutilização**: Crie classes utilitárias para padrões comuns

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- CSS Grid para layouts complexos
- Custom Properties (CSS Variables)
- CSS-in-JS e metodologias modernas
- Otimização e minificação

---

## 📝 Checklist de Conclusão

- [ ] Dominou os conceitos do Flexbox
- [ ] Criou layouts responsivos avançados
- [ ] Implementou animações CSS complexas
- [ ] Otimizou performance CSS
- [ ] Aplicou design patterns modernos
- [ ] Completou os 4 exercícios

**🎉 Parabéns! Você completou a Aula 1 do nível Intermediário!**

---

*Próxima aula: CSS Grid e Layouts Complexos*
