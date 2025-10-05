# Sistema de Cores da Fênix Academy

## 🎨 **Paleta de Cores Principal**

### **Cores Primárias**
- **Azul Principal**: `#3b82f6` (fenix-primary-500)
- **Roxo Principal**: `#8b5cf6` (fenix-secondary-500)
- **Ciano Principal**: `#06b6d4` (fenix-accent-500)

### **Cores de Status**
- **Sucesso**: `#10b981` (fenix-success-500)
- **Aviso**: `#f59e0b` (fenix-warning-500)
- **Erro**: `#ef4444` (fenix-error-500)

### **Cores de Background**
- **Escuro Principal**: `#0a0a0a` (fenix-dark-950)
- **Escuro Secundário**: `#1e293b` (fenix-dark-800)
- **Escuro Terciário**: `#334155` (fenix-dark-700)

## 🎯 **Como Usar**

### **Classes de Background**
```css
.bg-fenix-primary    /* Azul principal */
.bg-fenix-secondary  /* Roxo principal */
.bg-fenix-accent     /* Ciano principal */
.bg-fenix-success    /* Verde de sucesso */
.bg-fenix-warning    /* Amarelo de aviso */
.bg-fenix-error      /* Vermelho de erro */
.bg-fenix-dark       /* Background escuro */
```

### **Classes de Texto**
```css
.text-fenix-primary    /* Texto azul */
.text-fenix-secondary  /* Texto roxo */
.text-fenix-accent     /* Texto ciano */
.text-fenix-success    /* Texto verde */
.text-fenix-warning    /* Texto amarelo */
.text-fenix-error      /* Texto vermelho */
```

### **Classes de Borda**
```css
.border-fenix-primary    /* Borda azul */
.border-fenix-secondary  /* Borda roxa */
.border-fenix-accent     /* Borda ciano */
.border-fenix-success    /* Borda verde */
.border-fenix-warning    /* Borda amarela */
.border-fenix-error      /* Borda vermelha */
```

## 🎨 **Gradientes**

### **Gradientes Principais**
```css
.bg-gradient-fenix      /* Azul → Roxo → Ciano */
.bg-gradient-primary    /* Azul → Roxo */
.bg-gradient-secondary  /* Roxo → Ciano */
.bg-gradient-accent     /* Ciano → Verde */
.bg-gradient-success    /* Verde → Amarelo */
.bg-gradient-warning    /* Amarelo → Vermelho */
.bg-gradient-error      /* Vermelho → Vermelho escuro */
.bg-gradient-dark       /* Escuro → Cinza escuro */
.bg-gradient-glass      /* Vidro translúcido */
.bg-gradient-neon       /* Neon azul → roxo → ciano */
```

## 🔘 **Sistema de Botões**

### **Botões Principais**
```css
.btn-primary    /* Azul → Roxo com efeito shimmer */
.btn-secondary  /* Vidro translúcido */
.btn-accent     /* Ciano → Verde com efeito shimmer */
.btn-success    /* Verde com sombra */
.btn-warning    /* Amarelo com sombra */
.btn-error      /* Vermelho com sombra */
.btn-outline    /* Contorno azul */
```

## 🃏 **Sistema de Cards**

### **Cards Temáticos**
```css
.card           /* Card padrão com vidro */
.card-primary   /* Card azul/roxo */
.card-secondary /* Card roxo/ciano */
.card-accent    /* Card ciano/verde */
.card-success   /* Card verde */
.card-warning   /* Card amarelo */
.card-error     /* Card vermelho */
```

## ✨ **Efeitos de Texto**

### **Textos com Gradiente**
```css
.gradient-text           /* Gradiente completo com shimmer */
.gradient-text-neon      /* Gradiente com efeito neon */
.gradient-text-primary   /* Gradiente azul → roxo */
.gradient-text-secondary /* Gradiente roxo → ciano */
.gradient-text-accent    /* Gradiente ciano → verde */
```

## 🎨 **Variáveis CSS**

```css
:root {
  --fenix-primary: #3b82f6;
  --fenix-secondary: #8b5cf6;
  --fenix-accent: #06b6d4;
  --fenix-success: #10b981;
  --fenix-warning: #f59e0b;
  --fenix-error: #ef4444;
  --fenix-dark: #0a0a0a;
  --fenix-dark-800: #1e293b;
  --fenix-dark-700: #334155;
  --fenix-dark-600: #475569;
}
```

## 📱 **Responsividade**

Todas as classes são responsivas e se adaptam automaticamente a diferentes tamanhos de tela.

## 🎯 **Exemplos de Uso**

### **Botão Principal**
```jsx
<button className="btn-primary">
  Começar Agora
</button>
```

### **Card com Tema**
```jsx
<div className="card-primary">
  <h3 className="gradient-text-primary">Título</h3>
  <p className="text-white">Conteúdo do card</p>
</div>
```

### **Texto com Efeito Neon**
```jsx
<h1 className="gradient-text-neon">
  Transforme sua carreira
</h1>
```

### **Background com Gradiente**
```jsx
<div className="bg-gradient-fenix min-h-screen">
  <div className="card">
    <p>Conteúdo sobre gradiente</p>
  </div>
</div>
```

## 🚀 **Dicas de Uso**

1. **Consistência**: Use sempre as classes do sistema para manter a consistência visual
2. **Hierarquia**: Use cores primárias para elementos importantes, secundárias para elementos de apoio
3. **Acessibilidade**: Sempre teste o contraste entre texto e fundo
4. **Temas**: Use cards temáticos para diferentes tipos de conteúdo
5. **Efeitos**: Use gradientes e efeitos neon para elementos de destaque

## 🎨 **Paleta Completa**

### **Azul (Primary)**
- 50: `#eff6ff`
- 100: `#dbeafe`
- 200: `#bfdbfe`
- 300: `#93c5fd`
- 400: `#60a5fa`
- 500: `#3b82f6` ⭐
- 600: `#2563eb`
- 700: `#1d4ed8`
- 800: `#1e40af`
- 900: `#1e3a8a`

### **Roxo (Secondary)**
- 50: `#faf5ff`
- 100: `#f3e8ff`
- 200: `#e9d5ff`
- 300: `#d8b4fe`
- 400: `#c084fc`
- 500: `#8b5cf6` ⭐
- 600: `#7c3aed`
- 700: `#6d28d9`
- 800: `#5b21b6`
- 900: `#4c1d95`

### **Ciano (Accent)**
- 50: `#ecfeff`
- 100: `#cffafe`
- 200: `#a5f3fc`
- 300: `#67e8f9`
- 400: `#22d3ee`
- 500: `#06b6d4` ⭐
- 600: `#0891b2`
- 700: `#0e7490`
- 800: `#155e75`
- 900: `#164e63`

### **Verde (Success)**
- 50: `#ecfdf5`
- 100: `#d1fae5`
- 200: `#a7f3d0`
- 300: `#6ee7b7`
- 400: `#34d399`
- 500: `#10b981` ⭐
- 600: `#059669`
- 700: `#047857`
- 800: `#065f46`
- 900: `#064e3b`

### **Amarelo (Warning)**
- 50: `#fffbeb`
- 100: `#fef3c7`
- 200: `#fde68a`
- 300: `#fcd34d`
- 400: `#fbbf24`
- 500: `#f59e0b` ⭐
- 600: `#d97706`
- 700: `#b45309`
- 800: `#92400e`
- 900: `#78350f`

### **Vermelho (Error)**
- 50: `#fef2f2`
- 100: `#fee2e2`
- 200: `#fecaca`
- 300: `#fca5a5`
- 400: `#f87171`
- 500: `#ef4444` ⭐
- 600: `#dc2626`
- 700: `#b91c1c`
- 800: `#991b1b`
- 900: `#7f1d1d`

### **Escuro (Dark)**
- 50: `#f8fafc`
- 100: `#f1f5f9`
- 200: `#e2e8f0`
- 300: `#cbd5e1`
- 400: `#94a3b8`
- 500: `#64748b`
- 600: `#475569`
- 700: `#334155`
- 800: `#1e293b`
- 900: `#0f172a`
- 950: `#0a0a0a` ⭐


























