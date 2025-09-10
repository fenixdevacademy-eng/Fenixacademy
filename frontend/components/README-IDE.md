# Fenix IDE Simplificada

## 🚀 **IDE Completa com Monaco Editor e IntelliSense**

A Fenix IDE Simplificada é uma IDE completa e funcional desenvolvida especificamente para todos os cursos da Fenix Academy, com foco no IntelliSense como prioridade principal.

## ✨ **Características Principais**

### **🧠 IntelliSense Avançado**
- **HTML**: Sugestões para todas as tags HTML5, templates completos, atributos
- **CSS**: Propriedades CSS, valores, seletores, flexbox, grid
- **JavaScript**: Funções ES6+, async/await, Promises, métodos de array
- **Python**: Funções built-in, estruturas de controle, classes, imports

### **⚡ Monaco Editor 100% Funcional**
- Syntax highlighting avançado
- Minimap integrado
- Word wrap inteligente
- Auto-completion contextual
- Snippets personalizados
- Temas VS Code-like

### **📁 Multi-arquivo**
- Navegação por abas
- Gerenciamento de arquivos
- Criação e exclusão de arquivos
- Suporte a diferentes linguagens

### **🎯 Curso Específico**
- Templates pré-configurados por tipo de curso
- Configurações otimizadas para cada linguagem
- Exemplos práticos incluídos

## 🛠️ **Como Usar**

### **1. Acessar a IDE**
```bash
# Navegar para a página da IDE
http://localhost:3000/ide-simple
```

### **2. Selecionar o Curso**
- Escolha entre: Web, Python, JavaScript, React, Node.js
- Cada curso tem templates e configurações específicas

### **3. Usar o IntelliSense**
- **HTML**: Digite `!` e pressione `Tab` para template HTML5
- **CSS**: Digite propriedades CSS e veja sugestões
- **JavaScript**: Use `Ctrl+Space` para forçar sugestões
- **Python**: Sugestões automáticas para funções e estruturas

### **4. Comandos Úteis**
- `Tab`: Aceitar sugestão
- `Ctrl+Space`: Forçar sugestões
- `Ctrl+S`: Salvar arquivos
- `F11`: Tela cheia

## 📋 **Recursos por Linguagem**

### **HTML**
```html
<!-- Digite ! e pressione Tab -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título</title>
</head>
<body>
    <h1>Cabeçalho</h1>
    <p>Conteúdo</p>
</body>
</html>
```

### **CSS**
```css
/* Sugestões automáticas para propriedades */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
}
```

### **JavaScript**
```javascript
// Sugestões para funções modernas
const fetchData = async () => {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
    }
};
```

### **Python**
```python
# Sugestões para funções Python
def calcular_media(numeros):
    """Calcula a média de uma lista de números"""
    return sum(numeros) / len(numeros)

# List comprehension
quadrados = [x**2 for x in range(10)]
```

## 🔧 **Configuração Técnica**

### **Monaco Editor**
- Versão: 0.44.0
- Carregamento via CDN
- Fallback local disponível
- Configurações otimizadas

### **IntelliSense**
- Trigger characters personalizados
- Snippets contextuais
- Auto-completion inteligente
- Syntax highlighting avançado

### **Arquivos de Configuração**
- `monaco-config.ts`: Configurações do Monaco Editor
- `FenixIDESimple.tsx`: Componente principal da IDE
- `IDEDemo.tsx`: Demonstração interativa

## 🎨 **Temas e Personalização**

### **Tema Padrão**
- VS Code Dark Theme
- Cores otimizadas para programação
- Contraste adequado
- Fácil leitura

### **Personalização**
- Tamanho da fonte ajustável
- Minimap configurável
- Word wrap inteligente
- Renderização de whitespace

## 📱 **Responsividade**

### **Desktop**
- Layout completo com sidebar
- Editor central
- Painel de saída
- Navegação por abas

### **Mobile**
- Layout adaptativo
- Editor otimizado para touch
- Navegação simplificada
- Controles acessíveis

## 🚀 **Performance**

### **Carregamento**
- Monaco Editor via CDN
- Carregamento assíncrono
- Fallback local
- Cache inteligente

### **IntelliSense**
- Sugestões instantâneas
- Cache de resultados
- Filtragem inteligente
- Performance otimizada

## 🔍 **Troubleshooting**

### **Problemas Comuns**

#### **Monaco Editor não carrega**
```bash
# Verificar conexão com CDN
# Usar fallback local
# Verificar console do navegador
```

#### **IntelliSense não funciona**
```bash
# Verificar trigger characters
# Usar Ctrl+Space para forçar
# Verificar linguagem do arquivo
```

#### **Sugestões não aparecem**
```bash
# Verificar configuração do editor
# Limpar cache do navegador
# Reiniciar a aplicação
```

## 📚 **Exemplos Práticos**

### **Curso Web**
- Template HTML5 completo
- Estilos CSS responsivos
- JavaScript interativo
- Projetos práticos

### **Curso Python**
- Funções e classes
- Estruturas de dados
- Tratamento de erros
- Bibliotecas populares

### **Curso JavaScript**
- ES6+ features
- Async/await
- Promises
- DOM manipulation

## 🎯 **Próximos Passos**

### **Melhorias Planejadas**
- [ ] Suporte a mais linguagens
- [ ] Temas personalizáveis
- [ ] Plugins e extensões
- [ ] Integração com Git
- [ ] Debugger integrado
- [ ] Terminal integrado

### **Recursos Avançados**
- [ ] IntelliSense para frameworks
- [ ] Snippets personalizados
- [ ] Auto-format
- [ ] Linting integrado
- [ ] Refactoring tools

## 📞 **Suporte**

Para dúvidas ou problemas:
- Verificar documentação
- Consultar exemplos
- Verificar console do navegador
- Contatar suporte técnico

---

**Fenix Academy - Transformando carreiras através da tecnologia** 🚀







