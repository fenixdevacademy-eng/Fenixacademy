# Fenix IDE 2.0 - Desktop Version

Uma versão desktop do Fenix IDE 2.0 construída com Electron, oferecendo uma experiência de desenvolvimento web completa e nativa.

## 🚀 Características

- **Editor Monaco** - Editor de código avançado com syntax highlighting
- **IntelliSense** - Autocompletar inteligente para HTML, CSS e JavaScript
- **Live Preview** - Visualização em tempo real do código
- **File Explorer** - Navegação de arquivos integrada
- **Multi-tab** - Suporte a múltiplas abas
- **Menu Nativo** - Menu de aplicação nativo do sistema operacional
- **Atalhos de Teclado** - Atalhos padrão para produtividade
- **Cross-platform** - Funciona no Windows, macOS e Linux

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos de Instalação

1. **Clone ou baixe o projeto**
   ```bash
   cd desktop
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o aplicativo**
   ```bash
   npm start
   ```

## 🛠️ Scripts Disponíveis

- `npm start` - Executa o aplicativo
- `npm run dev` - Executa em modo de desenvolvimento (com DevTools)
- `npm run build` - Constrói o aplicativo para produção
- `npm run build-win` - Constrói para Windows
- `npm run build-mac` - Constrói para macOS
- `npm run build-linux` - Constrói para Linux

## ⌨️ Atalhos de Teclado

### Arquivo
- `Ctrl+N` - Novo Arquivo
- `Ctrl+O` - Abrir Arquivo
- `Ctrl+S` - Salvar
- `Ctrl+Shift+S` - Salvar Como

### Edição
- `Ctrl+Z` - Desfazer
- `Ctrl+Y` - Refazer
- `Ctrl+X` - Cortar
- `Ctrl+C` - Copiar
- `Ctrl+V` - Colar
- `Ctrl+A` - Selecionar Tudo

### Execução
- `F5` - Executar Código
- `Shift+F5` - Parar Execução

### IntelliSense
- `Tab` - Aceitar sugestão
- `Ctrl+Space` - Forçar sugestões

### Visualização
- `F12` - DevTools
- `F11` - Tela Cheia
- `Ctrl+R` - Recarregar

## 🎯 Como Usar

### 1. Criando um Novo Arquivo
- Use `Ctrl+N` ou clique em "Novo" na toolbar
- Digite o nome do arquivo quando solicitado

### 2. Usando o IntelliSense
- Digite `!` e pressione `Tab` para o template HTML5
- Digite `<` e pressione `Tab` para tags HTML
- Use `Ctrl+Space` para forçar sugestões

### 3. Executando Código
- Clique em "Executar" ou pressione `F5`
- O preview será gerado automaticamente
- Use "Preview" para mostrar/ocultar o painel de visualização

### 4. Navegando Arquivos
- Use o File Explorer na sidebar
- Clique nos arquivos para abrir
- Use as abas para alternar entre arquivos

## 🔧 Estrutura do Projeto

```
desktop/
├── main.js              # Processo principal do Electron
├── index.html           # Interface principal
├── renderer.js          # Lógica do renderer
├── package.json         # Configurações do projeto
├── README.md           # Este arquivo
└── assets/             # Recursos (ícones, etc.)
```

## 🎨 Personalização

### Temas
O editor usa o tema `vs-dark` por padrão. Para alterar:
1. Abra `renderer.js`
2. Modifique a linha: `theme: 'vs-dark'`
3. Opções disponíveis: `vs-dark`, `vs-light`, `hc-black`

### IntelliSense
Para adicionar mais sugestões:
1. Abra `renderer.js`
2. Modifique a função `setupIntelliSense()`
3. Adicione novas sugestões no array `suggestions`

## 🐛 Solução de Problemas

### Monaco Editor não carrega
- **Problema**: "Erro ao carregar Monaco Editor"
- **Solução**: 
  1. Verifique sua conexão com a internet
  2. Execute `npm install` para instalar dependências locais
  3. Abra `test-monaco.html` no navegador para testar
  4. Se persistir, execute `npm run dev` para modo de desenvolvimento

### Aplicativo não inicia
- **Problema**: Aplicativo não abre
- **Solução**:
  1. Verifique se o Node.js está instalado: `node --version`
  2. Execute `npm install` novamente
  3. Verifique se não há erros no console
  4. Tente executar `npm run dev` para ver logs detalhados

### IntelliSense não funciona
- **Problema**: Sugestões não aparecem
- **Solução**:
  1. Pressione `Ctrl+Space` para forçar sugestões
  2. Verifique se o arquivo tem a extensão correta (.html, .css, .js)
  3. Recarregue o aplicativo com `Ctrl+R`
  4. Digite `!` e pressione `Tab` para testar

### Erro de CDN
- **Problema**: "CDN não disponível"
- **Solução**:
  1. O aplicativo tentará carregar localmente automaticamente
  2. Execute `npm install` para garantir dependências locais
  3. Verifique se a pasta `node_modules/monaco-editor` existe

### Teste de Funcionamento
Para testar se o Monaco Editor está funcionando:
1. Abra `test-monaco.html` no navegador
2. Verifique se todos os testes passam
3. Teste o IntelliSense digitando `!` e pressionando `Tab`

## 📝 Licença

MIT License - Veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Entre em contato com a equipe Fenix Academy

---

**Fenix IDE 2.0 Desktop** - Desenvolvido com ❤️ pela Fenix Academy
