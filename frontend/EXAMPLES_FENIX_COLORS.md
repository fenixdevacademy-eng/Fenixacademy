# Exemplos de Uso do Sistema de Cores da Fênix Academy

## 🎨 **Exemplos Práticos para Todas as Páginas**

### **1. Página de Login/Registro**

```jsx
// Background principal
<div className="min-h-screen bg-fenix-dark">
  <AdvancedParticles />
  <VisualEffects />
  
  {/* Logo com gradiente */}
  <div className="p-4 bg-gradient-fenix rounded-2xl">
    <Code className="w-12 h-12 text-white" />
  </div>
  
  {/* Título com efeito neon */}
  <h1 className="text-4xl font-bold gradient-text-neon">
    Fênix Dev Academy
  </h1>
  
  {/* Formulário com vidro */}
  <div className="glass-tech rounded-2xl p-8">
    <form className="space-y-6">
      {/* Input com foco azul */}
      <input 
        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-fenix-primary focus:ring-2 focus:ring-fenix-primary/20"
        placeholder="Seu email"
      />
      
      {/* Botão principal */}
      <button className="btn-primary w-full">
        Entrar
      </button>
      
      {/* Botão secundário */}
      <button className="btn-secondary w-full">
        Criar Conta
      </button>
    </form>
  </div>
</div>
```

### **2. Página de Perfil**

```jsx
// Background principal
<div className="min-h-screen bg-fenix-dark">
  <AdvancedParticles />
  <VisualEffects />
  
  {/* Header com badge */}
  <div className="text-center mb-12">
    <div className="inline-flex items-center gap-2 bg-fenix-primary/10 border border-fenix-primary/20 rounded-full px-4 py-2 mb-6">
      <User className="w-5 h-5 text-fenix-primary" />
      <span className="text-fenix-primary font-medium">Meu Perfil</span>
    </div>
    
    <h1 className="text-4xl md:text-6xl font-bold gradient-text-neon mb-6">
      Bem-vindo, {user.name}!
    </h1>
  </div>
  
  {/* Cards de informações */}
  <div className="grid lg:grid-cols-3 gap-8">
    {/* Card principal */}
    <div className="card-primary">
      <h3 className="text-xl font-semibold text-white mb-4">Informações Pessoais</h3>
      <p className="text-gray-300">Gerencie seus dados</p>
    </div>
    
    {/* Card de progresso */}
    <div className="card-accent">
      <h3 className="text-xl font-semibold text-white mb-4">Progresso</h3>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div className="bg-gradient-accent h-2 rounded-full" style={{width: '75%'}}></div>
      </div>
    </div>
    
    {/* Card de conquistas */}
    <div className="card-success">
      <h3 className="text-xl font-semibold text-white mb-4">Conquistas</h3>
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-fenix-success rounded-full flex items-center justify-center">
          <Award className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  </div>
</div>
```

### **3. Página de Cursos**

```jsx
// Background principal
<div className="min-h-screen bg-fenix-dark">
  <AdvancedParticles />
  <VisualEffects />
  
  {/* Header */}
  <div className="text-center mb-12">
    <h1 className="text-4xl md:text-6xl font-bold gradient-text-neon mb-6">
      Nossos Cursos
    </h1>
    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
      Aprenda com os melhores especialistas e transforme sua carreira
    </p>
  </div>
  
  {/* Grid de cursos */}
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Curso de Frontend */}
    <div className="card-primary group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-fenix-primary/20 rounded-lg">
          <Code className="w-6 h-6 text-fenix-primary" />
        </div>
        <h3 className="text-xl font-semibold text-white">Frontend</h3>
      </div>
      <p className="text-gray-300 mb-6">React, Next.js, TypeScript</p>
      <button className="btn-primary w-full group-hover:scale-105 transition-transform">
        Começar Curso
      </button>
    </div>
    
    {/* Curso de Backend */}
    <div className="card-secondary group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-fenix-secondary/20 rounded-lg">
          <Database className="w-6 h-6 text-fenix-secondary" />
        </div>
        <h3 className="text-xl font-semibold text-white">Backend</h3>
      </div>
      <p className="text-gray-300 mb-6">Node.js, Python, APIs</p>
      <button className="btn-secondary w-full group-hover:scale-105 transition-transform">
        Começar Curso
      </button>
    </div>
    
    {/* Curso de Mobile */}
    <div className="card-accent group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-fenix-accent/20 rounded-lg">
          <Smartphone className="w-6 h-6 text-fenix-accent" />
        </div>
        <h3 className="text-xl font-semibold text-white">Mobile</h3>
      </div>
      <p className="text-gray-300 mb-6">React Native, Flutter</p>
      <button className="btn-accent w-full group-hover:scale-105 transition-transform">
        Começar Curso
      </button>
    </div>
  </div>
</div>
```

### **4. Página de Dashboard**

```jsx
// Background principal
<div className="min-h-screen bg-fenix-dark">
  <AdvancedParticles />
  <VisualEffects />
  
  {/* Header */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold gradient-text-neon mb-2">
      Dashboard
    </h1>
    <p className="text-gray-300">Acompanhe seu progresso e conquistas</p>
  </div>
  
  {/* Estatísticas */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {/* Cursos Concluídos */}
    <div className="card-success">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Cursos Concluídos</p>
          <p className="text-2xl font-bold text-white">12</p>
        </div>
        <div className="p-3 bg-fenix-success/20 rounded-lg">
          <BookOpen className="w-6 h-6 text-fenix-success" />
        </div>
      </div>
    </div>
    
    {/* Horas Estudadas */}
    <div className="card-primary">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Horas Estudadas</p>
          <p className="text-2xl font-bold text-white">156h</p>
        </div>
        <div className="p-3 bg-fenix-primary/20 rounded-lg">
          <Clock className="w-6 h-6 text-fenix-primary" />
        </div>
      </div>
    </div>
    
    {/* Certificados */}
    <div className="card-accent">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Certificados</p>
          <p className="text-2xl font-bold text-white">8</p>
        </div>
        <div className="p-3 bg-fenix-accent/20 rounded-lg">
          <Award className="w-6 h-6 text-fenix-accent" />
        </div>
      </div>
    </div>
    
    {/* Streak */}
    <div className="card-warning">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Streak Atual</p>
          <p className="text-2xl font-bold text-white">7 dias</p>
        </div>
        <div className="p-3 bg-fenix-warning/20 rounded-lg">
          <Zap className="w-6 h-6 text-fenix-warning" />
        </div>
      </div>
    </div>
  </div>
  
  {/* Progresso dos Cursos */}
  <div className="grid lg:grid-cols-2 gap-8">
    <div className="card">
      <h3 className="text-xl font-semibold text-white mb-6">Cursos em Andamento</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white">React Fundamentals</span>
          <span className="text-fenix-primary">75%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-gradient-primary h-2 rounded-full" style={{width: '75%'}}></div>
        </div>
      </div>
    </div>
    
    <div className="card">
      <h3 className="text-xl font-semibold text-white mb-6">Próximas Aulas</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
          <div className="w-2 h-2 bg-fenix-primary rounded-full"></div>
          <span className="text-white">Hooks Avançados - 14:00</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### **5. Página de Erro 404**

```jsx
// Background principal
<div className="min-h-screen bg-fenix-dark flex items-center justify-center">
  <div className="text-center">
    <div className="w-32 h-32 bg-fenix-error/20 rounded-full flex items-center justify-center mx-auto mb-8">
      <AlertCircle className="w-16 h-16 text-fenix-error" />
    </div>
    
    <h1 className="text-6xl font-bold gradient-text-neon mb-4">
      404
    </h1>
    
    <h2 className="text-2xl font-semibold text-white mb-4">
      Página não encontrada
    </h2>
    
    <p className="text-gray-300 mb-8 max-w-md mx-auto">
      A página que você está procurando não existe ou foi movida.
    </p>
    
    <div className="flex gap-4 justify-center">
      <button 
        onClick={() => router.back()}
        className="btn-secondary"
      >
        Voltar
      </button>
      <button 
        onClick={() => router.push('/')}
        className="btn-primary"
      >
        Ir para Home
      </button>
    </div>
  </div>
</div>
```

### **6. Componente de Loading**

```jsx
// Loading com cores da Fênix
<div className="min-h-screen bg-gradient-dark flex items-center justify-center">
  <div className="text-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fenix-primary mx-auto mb-4"></div>
    <p className="text-white text-xl">Carregando...</p>
  </div>
</div>
```

### **7. Notificações/Alertas**

```jsx
// Notificação de sucesso
<div className="fixed top-4 right-4 z-50">
  <div className="card-success p-4 flex items-center gap-3">
    <CheckCircle className="w-5 h-5 text-fenix-success" />
    <span className="text-white">Operação realizada com sucesso!</span>
  </div>
</div>

// Notificação de erro
<div className="fixed top-4 right-4 z-50">
  <div className="card-error p-4 flex items-center gap-3">
    <AlertCircle className="w-5 h-5 text-fenix-error" />
    <span className="text-white">Erro ao processar solicitação</span>
  </div>
</div>

// Notificação de aviso
<div className="fixed top-4 right-4 z-50">
  <div className="card-warning p-4 flex items-center gap-3">
    <AlertCircle className="w-5 h-5 text-fenix-warning" />
    <span className="text-white">Atenção: Verifique seus dados</span>
  </div>
</div>
```

### **8. Formulários**

```jsx
// Formulário com validação
<form className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-white mb-2">
      Nome completo
    </label>
    <input 
      type="text"
      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-fenix-primary focus:ring-2 focus:ring-fenix-primary/20 transition-colors"
      placeholder="Digite seu nome"
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-white mb-2">
      Email
    </label>
    <input 
      type="email"
      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-fenix-primary focus:ring-2 focus:ring-fenix-primary/20 transition-colors"
      placeholder="seu@email.com"
    />
  </div>
  
  <div className="flex gap-4">
    <button type="button" className="btn-secondary flex-1">
      Cancelar
    </button>
    <button type="submit" className="btn-primary flex-1">
      Salvar
    </button>
  </div>
</form>
```

### **9. Navegação/Header**

```jsx
// Header com navegação
<header className="bg-fenix-dark/80 backdrop-blur-sm border-b border-white/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-fenix rounded-lg">
          <Code className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold gradient-text-primary">
          Fênix Academy
        </span>
      </div>
      
      {/* Navegação */}
      <nav className="hidden md:flex items-center gap-6">
        <a href="/cursos" className="text-white hover:text-fenix-primary transition-colors">
          Cursos
        </a>
        <a href="/dashboard" className="text-white hover:text-fenix-primary transition-colors">
          Dashboard
        </a>
        <a href="/perfil" className="text-white hover:text-fenix-primary transition-colors">
          Perfil
        </a>
      </nav>
      
      {/* Botões de ação */}
      <div className="flex items-center gap-4">
        <button className="btn-outline">
          Login
        </button>
        <button className="btn-primary">
          Começar
        </button>
      </div>
    </div>
  </div>
</header>
```

### **10. Footer**

```jsx
// Footer com cores da Fênix
<footer className="bg-fenix-dark-800 border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid md:grid-cols-4 gap-8">
      {/* Logo e descrição */}
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-fenix rounded-lg">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text-primary">
            Fênix Academy
          </span>
        </div>
        <p className="text-gray-300 mb-6 max-w-md">
          Transforme sua carreira em tecnologia com os melhores cursos e especialistas.
        </p>
        <div className="flex gap-4">
          <button className="btn-primary">
            Começar Agora
          </button>
          <button className="btn-outline">
            Saiba Mais
          </button>
        </div>
      </div>
      
      {/* Links úteis */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Cursos</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-300 hover:text-fenix-primary transition-colors">Frontend</a></li>
          <li><a href="#" className="text-gray-300 hover:text-fenix-primary transition-colors">Backend</a></li>
          <li><a href="#" className="text-gray-300 hover:text-fenix-primary transition-colors">Mobile</a></li>
          <li><a href="#" className="text-gray-300 hover:text-fenix-primary transition-colors">DevOps</a></li>
        </ul>
      </div>
      
      {/* Contato */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-300 hover:text-fenix-primary transition-colors">Suporte</a></li>
          <li><a href="#" className="text-gray-300 hover:text-fenix-primary transition-colors">Comunidade</a></li>
          <li><a href="#" className="text-gray-300 hover:text-fenix-primary transition-colors">Blog</a></li>
          <li><a href="#" className="text-gray-300 hover:text-fenix-primary transition-colors">Sobre</a></li>
        </ul>
      </div>
    </div>
    
    <div className="border-t border-white/10 mt-8 pt-8 text-center">
      <p className="text-gray-400">
        © 2024 Fênix Academy. Todos os direitos reservados.
      </p>
    </div>
  </div>
</footer>
```

## 🎯 **Dicas de Implementação**

1. **Sempre use o background principal**: `bg-fenix-dark`
2. **Use gradientes para elementos de destaque**: `bg-gradient-fenix`
3. **Aplique efeitos de vidro**: `glass-tech` para formulários e cards
4. **Mantenha consistência**: Use sempre as classes do sistema
5. **Teste acessibilidade**: Verifique contraste entre texto e fundo
6. **Use animações sutis**: `hover:scale-105` para interatividade
7. **Aplique cores semânticas**: Verde para sucesso, vermelho para erro, etc.

## 🚀 **Próximos Passos**

1. Aplique o sistema de cores em todas as páginas existentes
2. Crie componentes reutilizáveis com as cores da Fênix
3. Implemente temas claro/escuro se necessário
4. Adicione mais variações de gradientes conforme necessário
5. Documente novos padrões de design que surgirem


























