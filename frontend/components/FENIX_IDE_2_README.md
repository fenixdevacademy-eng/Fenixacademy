# 🚀 Fenix IDE 2.0 - Clone do VS Code

## Visão Geral

A **Fenix IDE 2.0** é uma recriação completa da interface do Visual Studio Code, desenvolvida com React e TypeScript. Esta IDE oferece uma experiência de desenvolvimento idêntica ao VS Code, com todas as funcionalidades principais e uma interface visual fiel ao original.

## ✨ Funcionalidades Implementadas

### 🎨 Interface Visual
- **Layout idêntico ao VS Code**: Sidebar, editor, painel inferior e barra de status
- **Temas claro e escuro**: Replicação exata das cores e estilos do VS Code
- **Responsividade**: Adaptação para diferentes tamanhos de tela
- **Animações suaves**: Transições e efeitos visuais profissionais

### 📁 Gerenciamento de Arquivos
- **Explorador de arquivos**: Navegação hierárquica com pastas e arquivos
- **Sistema de abas**: Múltiplas abas com indicadores de modificação
- **Arquivos de exemplo**: Estrutura inicial com HTML, CSS, JavaScript e Markdown
- **Navegação por breadcrumbs**: Caminho completo do arquivo atual

### 🛠️ Painéis e Funcionalidades
- **EXPLORER**: Navegação de arquivos e pastas
- **SEARCH**: Busca em arquivos do projeto
- **SOURCE CONTROL**: Controle de versão Git integrado
- **RUN AND DEBUG**: Execução e depuração de código
- **EXTENSIONS**: Gerenciamento de extensões

### 📊 Painéis Inferiores
- **PROBLEMS**: Lista de erros, warnings e informações
- **OUTPUT**: Saída de compilação e logs
- **DEBUG CONSOLE**: Console de depuração
- **TERMINAL**: Terminal integrado com múltiplas sessões

### ⌨️ Editor de Código
- **Syntax highlighting**: Destaque de sintaxe para múltiplas linguagens
- **Numeração de linhas**: Indicadores de linha e coluna
- **Word wrap**: Quebra automática de linha
- **Fontes monospace**: Consolas e Courier New
- **Tamanho de fonte ajustável**: Configuração personalizada

### 🎯 Barra de Ferramentas
- **Novo arquivo**: Criação rápida de arquivos
- **Salvar**: Salvamento individual e em lote
- **Executar**: Execução de código
- **Terminal**: Acesso rápido ao terminal
- **Split editor**: Divisão da área de edição
- **Toggle sidebar/panel**: Controle de visibilidade
- **Configurações**: Acesso às configurações
- **Alternar tema**: Mudança entre claro/escuro

### 📱 Barra de Status
- **Git**: Branch atual e número de mudanças
- **Linguagem**: Linguagem do arquivo atual
- **Encoding**: Codificação de caracteres
- **Line ending**: Tipo de quebra de linha
- **Indentação**: Tipo e tamanho da indentação
- **Posição**: Linha e coluna atual
- **Problemas**: Contador de problemas
- **Terminal**: Número de terminais ativos

## 🏗️ Arquitetura Técnica

### Tecnologias Utilizadas
- **React 18**: Framework principal com hooks modernos
- **TypeScript**: Tipagem estática e melhor DX
- **Tailwind CSS**: Sistema de design utilitário
- **Lucide React**: Ícones vetoriais consistentes
- **CSS Custom Properties**: Sistema de temas dinâmicos

### Estrutura de Componentes
```
FenixIDE2/
├── FenixIDE2.tsx          # Componente principal
├── FenixIDE2.css          # Estilos CSS personalizados
└── FENIX_IDE_2_README.md  # Documentação
```

### Estados Principais
- **Arquivos**: Estrutura hierárquica com pastas e arquivos
- **Abas**: Sistema de abas com arquivos abertos
- **Painéis**: Configuração de visibilidade e ativação
- **Tema**: Alternância entre claro e escuro
- **Layout**: Redimensionamento de sidebar e painel inferior

## 🚀 Como Usar

### 1. Instalação
```bash
# Navegue para o diretório do projeto
cd frontend/components

# A IDE está pronta para uso
```

### 2. Funcionalidades Básicas
- **Abrir arquivo**: Clique em qualquer arquivo no explorador
- **Fechar aba**: Clique no X na aba ou use Ctrl+W
- **Salvar**: Use o botão Save ou Ctrl+S
- **Alternar painéis**: Clique nos cabeçalhos dos painéis
- **Redimensionar**: Arraste as bordas para ajustar tamanhos

### 3. Atalhos de Teclado
- **Ctrl+N**: Novo arquivo
- **Ctrl+S**: Salvar
- **Ctrl+Shift+S**: Salvar todos
- **Ctrl+W**: Fechar aba
- **Ctrl+Shift+W**: Fechar todas as abas
- **Ctrl+B**: Toggle sidebar
- **Ctrl+J**: Toggle painel inferior

### 4. Navegação
- **Explorador**: Navegue pela estrutura de arquivos
- **Busca**: Encontre texto em arquivos
- **Git**: Visualize mudanças e status
- **Debug**: Execute e depure código
- **Extensões**: Gerencie funcionalidades adicionais

## 🎨 Personalização

### Temas
- **Claro**: Interface clara com cores suaves
- **Escuro**: Interface escura com cores contrastantes
- **CSS Variables**: Sistema de cores baseado em variáveis CSS

### Layout
- **Sidebar**: Largura ajustável (200px - 400px)
- **Painel inferior**: Altura ajustável (150px - 400px)
- **Responsivo**: Adaptação automática para mobile

### Editor
- **Fonte**: Consolas, Courier New, monospace
- **Tamanho**: 12px - 20px configurável
- **Line height**: 1.5 para melhor legibilidade

## 🔧 Funcionalidades Avançadas

### Sistema de Arquivos
- **Estrutura hierárquica**: Pastas e subpastas
- **Tipos de arquivo**: Suporte para múltiplas linguagens
- **Indicadores visuais**: Modificações, status e tipo

### Controle de Versão
- **Git integrado**: Status de branch e mudanças
- **Indicadores visuais**: Número de arquivos modificados
- **Contadores**: Staged, unstaged e total de mudanças

### Terminal Integrado
- **Múltiplas sessões**: Bash, PowerShell, etc.
- **Histórico**: Comandos executados
- **Integração**: Acesso direto ao sistema

### Sistema de Problemas
- **Categorização**: Error, Warning, Info
- **Navegação**: Clique para ir ao arquivo/linha
- **Contadores**: Total e resolvidos

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 1024px - Layout completo
- **Tablet**: 768px - 1024px - Sidebar compacta
- **Mobile**: < 768px - Layout adaptado

### Adaptações
- **Sidebar**: Largura reduzida em telas menores
- **Abas**: Tamanho mínimo ajustado
- **Painéis**: Altura otimizada para touch

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] **Monaco Editor**: Editor de código avançado
- [ ] **IntelliSense**: Autocompletar inteligente
- [ ] **Debugger**: Depurador integrado
- [ ] **Extensions API**: Sistema de extensões
- [ ] **Multi-language**: Suporte para mais linguagens
- [ ] **Collaboration**: Colaboração em tempo real

### Melhorias Planejadas
- [ ] **Performance**: Otimização de renderização
- [ ] **Accessibility**: Melhor acessibilidade
- [ ] **Themes**: Mais opções de tema
- [ ] **Customization**: Configurações avançadas

## 🤝 Contribuição

### Como Contribuir
1. **Fork** o repositório
2. **Clone** para sua máquina local
3. **Crie** uma branch para sua feature
4. **Desenvolva** e teste suas mudanças
5. **Commit** com mensagens claras
6. **Push** para sua branch
7. **Abra** um Pull Request

### Padrões de Código
- **TypeScript**: Use tipagem estática
- **ESLint**: Siga as regras de linting
- **Prettier**: Formatação consistente
- **Commits**: Mensagens em português

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

## 🙏 Agradecimentos

- **VS Code Team**: Inspiração e referência de design
- **React Community**: Framework e ecossistema
- **Tailwind CSS**: Sistema de design utilitário
- **Lucide**: Ícones vetoriais de qualidade

---

**Desenvolvido com ❤️ no Brasil 🇧🇷**

*Fenix IDE 2.0 - A IDE mais avançada do Brasil*





