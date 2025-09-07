export interface CourseContent {
    title: string;
    courseId: string;
    modules: ModuleContent[];
}

export interface ModuleContent {
    id: number;
    title: string;
    lessons: LessonContent[];
}

export interface LessonContent {
    id: number;
    title: string;
    type: 'video' | 'text' | 'exercise' | 'project' | 'ide';
    content: string;
    duration: string;
    ideConfig?: {
        initialCode?: {
            html?: string;
            css?: string;
            js?: string;
        };
        templates?: string[];
        exercises?: string[];
    };
}

// Conteúdo para Fundamentos de Desenvolvimento Web - 72 aulas
export const webFundamentalsContent: CourseContent = {
    title: 'Fundamentos de Desenvolvimento Web - CS50 Style',
    courseId: 'fundamentos-desenvolvimento-web',
    modules: [
        {
            id: 1,
            title: 'Fundamentos e Introdução',
            lessons: [
                {
                    id: 1,
                    title: 'Resumo Executivo e Objetivos',
                    type: 'text',
                    duration: '45 min',
                    content: `# 🌐 FUNDAMENTOS DE DESENVOLVIMENTO WEB - CS50 STYLE

## 📋 RESUMO EXECUTIVO

Este curso oferece uma jornada completa do básico ao avançado em desenvolvimento web, seguindo a metodologia CS50 da Universidade de Harvard. Os alunos aprenderão HTML5, CSS3 e JavaScript ES6+ através de projetos práticos, exercícios interativos e uma IDE integrada.

### 🚀 DIFERENCIAIS CS50
- **Metodologia Harvard**: Aprendizado baseado em projetos reais
- **IDE Integrada**: Ambiente de desenvolvimento completo com preview em tempo real
- **Gamificação**: Sistema de conquistas, níveis e progresso
- **Projetos Práticos**: Portfolio profissional, Landing Page e Dashboard interativo
- **Exercícios Interativos**: Desafios práticos com feedback imediato
- **Mentoria Virtual**: Sistema de dicas e explicações contextuais

## 🎯 OBJETIVOS DE APRENDIZAGEM (Taxonomia de Bloom)

### 🧠 CONHECIMENTO (Lembrar)
- Identificar elementos HTML5 semânticos e suas funções
- Reconhecer estrutura DOM e hierarquia de elementos
- Compreender regras CSS, especificidade e cascata
- Entender conceitos de responsividade, acessibilidade e SEO
- Conhecer boas práticas de desenvolvimento web moderno

### 🔍 COMPREENSÃO (Entender)
- Explicar como HTML estrutura o conteúdo de forma semântica
- Descrever como CSS controla a apresentação e layout
- Entender como JavaScript adiciona interatividade e dinamismo
- Compreender o modelo de caixa CSS e posicionamento
- Explicar conceitos de flexbox, grid e responsividade

### 🛠️ APLICAÇÃO (Aplicar)
- Criar páginas responsivas e interativas para diferentes dispositivos
- Implementar layouts complexos com Flexbox e CSS Grid
- Desenvolver formulários robustos com validação client-side
- Criar animações, transições e micro-interações CSS
- Implementar funcionalidades JavaScript para melhorar UX

### 🔬 ANÁLISE (Analisar)
- Debugar problemas de layout, funcionalidade e compatibilidade
- Otimizar performance, acessibilidade e SEO
- Analisar código para identificar melhorias e refatoração
- Identificar e resolver problemas cross-browser
- Analisar e otimizar estrutura HTML para semântica

### ⚖️ AVALIAÇÃO (Avaliar)
- Revisar código para boas práticas e padrões web
- Testar acessibilidade, usabilidade e responsividade
- Avaliar performance, SEO e otimizações
- Comparar diferentes abordagens de implementação
- Validar código HTML, CSS e JavaScript

### 🎨 CRIAÇÃO (Criar)
- Desenvolver projetos web completos e profissionais
- Criar componentes reutilizáveis e modulares
- Implementar funcionalidades avançadas e inovadoras
- Construir aplicações web responsivas e acessíveis
- Criar experiências de usuário excepcionais

## 📋 MAPA COMPLETO DO CURSO

### 🚀 MÓDULO 1: Fundamentos e Introdução (3 aulas)
- Resumo Executivo e Objetivos
- IDE CS50 Integrada
- Configuração do Ambiente de Desenvolvimento

### 🌐 MÓDULO 2: HTML5 Semântico (5 aulas)
- Introdução ao HTML5 e Semântica
- Estrutura de Documento e Metadados
- Elementos de Texto e Formatação
- Formulários e Validação HTML5
- Tabelas e Dados Estruturados

### 🎨 MÓDULO 3: CSS3 Fundamentos (6 aulas)
- Introdução ao CSS3 e Seletores
- Modelo de Caixa e Posicionamento
- Cores, Tipografia e Backgrounds
- Flexbox para Layouts Flexíveis
- CSS Grid para Layouts Complexos
- Responsividade e Media Queries

### ⚡ MÓDULO 4: JavaScript Básico (8 aulas)
- Introdução ao JavaScript ES6+
- Variáveis, Tipos e Operadores
- Estruturas de Controle e Loops
- Funções e Escopo
- Arrays e Objetos
- Manipulação do DOM
- Eventos e Interatividade
- Validação de Formulários

### 🔧 MÓDULO 5: Ferramentas e Workflow (4 aulas)
- Git e Controle de Versão
- DevTools e Debugging
- Performance e Otimização
- Deploy e Hosting

### 🎯 MÓDULO 6: Projetos Práticos (6 aulas)
- Portfolio Pessoal Responsivo
- Landing Page para Produto
- Dashboard Interativo
- Formulário Multi-step
- Galeria de Imagens
- Projeto Final Integrado

## 🏆 SISTEMA DE CONQUISTAS

### 🎯 Conquistas de Progresso
- **Primeira Aula**: Complete sua primeira aula
- **Módulo Completo**: Finalize um módulo inteiro
- **Projeto Concluído**: Termine um projeto prático
- **Responsividade**: Crie uma página totalmente responsiva
- **Acessibilidade**: Implemente padrões de acessibilidade

### 🚀 Conquistas de Habilidade
- **HTML Master**: Domine todos os conceitos HTML5
- **CSS Wizard**: Seja especialista em CSS3
- **JavaScript Ninja**: Aprenda JavaScript avançado
- **Performance Guru**: Otimize para máxima velocidade
- **SEO Expert**: Implemente SEO técnico

## 📊 AVALIAÇÃO E PROGRESSO

### 🎯 Critérios de Avaliação
- **Exercícios Práticos**: 40% da nota
- **Projetos**: 30% da nota
- **Participação**: 20% da nota
- **Auto-avaliação**: 10% da nota

### 📈 Sistema de Progresso
- **Níveis**: 1-10 com experiência baseada em atividades
- **Pontos**: Sistema de gamificação com recompensas
- **Badges**: Conquistas visuais para motivação
- **Ranking**: Comparação com outros alunos

## 🎯 RESULTADO ESPERADO

Ao final deste curso, você será capaz de:
- ✅ Desenvolver websites profissionais e responsivos
- ✅ Implementar layouts modernos com CSS Grid e Flexbox
- ✅ Criar interações dinâmicas com JavaScript
- ✅ Otimizar performance e acessibilidade
- ✅ Deployar projetos em produção
- ✅ Continuar aprendendo frameworks modernos

**🎓 Certificado CS50 Style**: Reconhecimento da qualidade Harvard`
                },
                {
                    id: 2,
                    title: 'IDE CS50 Integrada',
                    type: 'ide',
                    duration: '90 min',
                    content: `# 🛠️ IDE CS50 INTEGRADA

## 🌟 VISÃO GERAL

A IDE CS50 é um ambiente de desenvolvimento integrado de última geração que oferece suporte completo para Web Development, Python, Data Science e muito mais. Desenvolvida seguindo os padrões da Universidade de Harvard, oferece uma experiência profissional em um ambiente educacional.

## ✨ CARACTERÍSTICAS PRINCIPAIS

### 🔧 **Editor Multi-linguagem**
- **HTML5**: Syntax highlighting, autocomplete e validação
- **CSS3**: IntelliSense para propriedades e valores
- **JavaScript ES6+**: Debugging avançado e refatoração
- **Python**: Interpretador integrado e gerenciamento de pacotes
- **Markdown**: Preview em tempo real com formatação

### 🖥️ **Live Preview**
- **Visualização em Tempo Real**: Alterações refletem instantaneamente
- **Multi-dispositivo**: Simula diferentes resoluções e orientações
- **Hot Reload**: Recarrega automaticamente ao salvar
- **Console Integrado**: Logs e erros em tempo real
- **Network Inspector**: Monitora requisições e performance

### 🐛 **Debug Console Profissional**
- **Breakpoints Inteligentes**: Pausa execução em pontos específicos
- **Step-through**: Execução linha por linha
- **Variable Inspector**: Visualiza estado das variáveis
- **Call Stack**: Rastreia execução de funções
- **Performance Profiler**: Identifica gargalos de performance

### 📱 **Device Simulator**
- **Resoluções Comuns**: Desktop, tablet, mobile
- **Orientação**: Portrait e landscape
- **Touch Events**: Simula interações touch
- **Network Throttling**: Testa performance em conexões lentas
- **Accessibility Testing**: Verifica padrões de acessibilidade

### 🎨 **Templates Premium**
- **Landing Pages**: Templates para produtos e serviços
- **Portfolios**: Estruturas profissionais para desenvolvedores
- **Dashboards**: Interfaces administrativas completas
- **E-commerce**: Lojas online funcionais
- **Blogs**: Sistemas de publicação de conteúdo

## 🚀 CONFIGURAÇÃO INICIAL

### ⚙️ **Primeira Execução**
\`\`\`bash
# Instalação automática de dependências
npm install -g @cs50/ide-cli

# Configuração do ambiente
cs50 ide setup

# Inicialização do projeto
cs50 ide init my-web-project
\`\`\`

### 🔧 **Configurações Recomendadas**
\`\`\`json
{
  "editor.fontSize": 14,
  "editor.fontFamily": "Fira Code, Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.rulers": [80, 120],
  "editor.wordWrap": "bounded",
  "editor.minimap.enabled": false,
  "workbench.colorTheme": "CS50 Dark",
  "workbench.iconTheme": "CS50 Icons"
}
\`\`\`

## 📁 ESTRUTURA DE PROJETOS

### 🗂️ **Organização Padrão**
\`\`\`
my-web-project/
├── src/
│   ├── html/
│   │   ├── index.html
│   │   ├── about.html
│   │   └── contact.html
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── utils.js
│   │   └── components.js
│   └── assets/
│       ├── images/
│       ├── fonts/
│       └── icons/
├── dist/
├── tests/
├── docs/
└── package.json
\`\`\`

## 🎯 EXERCÍCIO PRÁTICO: CONFIGURAÇÃO DA IDE

### 📋 **Objetivos**
- Configurar ambiente de desenvolvimento
- Criar primeiro projeto
- Familiarizar-se com interface
- Executar primeiro código

### 🛠️ **Passos**
1. **Instalação**: Execute o comando de instalação
2. **Configuração**: Ajuste preferências pessoais
3. **Projeto**: Crie projeto "meu-primeiro-site"
4. **Estrutura**: Organize pastas conforme padrão
5. **Teste**: Crie arquivo HTML básico e visualize

### 💻 **Código de Teste**
\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Primeiro Site - CS50</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
        }
        .feature {
            background: rgba(255,255,255,0.2);
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Bem-vindo à IDE CS50!</h1>
        
        <div class="feature">
            <h3>✨ Live Preview</h3>
            <p>Altere este texto e veja as mudanças em tempo real!</p>
        </div>
        
        <div class="feature">
            <h3>🎨 CSS Integrado</h3>
            <p>Modifique os estilos e veja o resultado instantaneamente.</p>
        </div>
        
        <div class="feature">
            <h3>⚡ JavaScript</h3>
            <p>Adicione interatividade com JavaScript ES6+.</p>
        </div>
        
        <div class="feature">
            <h3>📱 Responsivo</h3>
            <p>Teste em diferentes dispositivos com o simulador.</p>
        </div>
    </div>
    
    <script>
        // Adicione interatividade aqui
        document.querySelectorAll('.feature').forEach(feature => {
            feature.addEventListener('click', () => {
                feature.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    feature.style.transform = 'scale(1)';
                }, 200);
            });
        });
    </script>
</body>
</html>
\`\`\`

## 🎯 PSET: CONFIGURAÇÃO E PRIMEIRO PROJETO

### 📊 **Nível Básico**
- ✅ Configurar IDE com tema personalizado
- ✅ Criar estrutura de pastas padrão
- ✅ Implementar página HTML básica
- ✅ Adicionar estilos CSS inline
- ✅ Testar live preview

### 🚀 **Nível Intermediário**
- ✅ Organizar CSS em arquivo separado
- ✅ Implementar JavaScript básico
- ✅ Criar navegação entre páginas
- ✅ Adicionar responsividade básica
- ✅ Implementar tema claro/escuro

### 🏆 **Nível Desafio**
- ✅ Criar sistema de componentes CSS
- ✅ Implementar roteamento client-side
- ✅ Adicionar animações e transições
- ✅ Implementar modo offline
- ✅ Criar sistema de temas dinâmicos

## 🧪 TESTES E VALIDAÇÃO

### 🔍 **Critérios de Avaliação**
- **Funcionalidade**: 30% - Tudo funciona conforme esperado
- **Código**: 25% - Boas práticas e organização
- **Design**: 20% - Visual atrativo e responsivo
- **Performance**: 15% - Carregamento rápido
- **Acessibilidade**: 10% - Padrões WCAG

### 🎯 **Checklist de Validação**
- [ ] Página carrega sem erros
- [ ] Live preview funciona corretamente
- [ ] Código está organizado e comentado
- [ ] CSS está em arquivo separado
- [ ] JavaScript adiciona interatividade
- [ ] Design é responsivo
- [ ] Performance é aceitável

## 🐛 DEBUGGING E SOLUÇÃO DE PROBLEMAS

### ❌ **Problemas Comuns**
1. **Live Preview não funciona**
   - Verifique se arquivo está salvo
   - Reinicie servidor de preview
   - Verifique console para erros

2. **CSS não aplica**
   - Verifique caminho do arquivo CSS
   - Confirme sintaxe CSS
   - Use DevTools para inspecionar

3. **JavaScript não executa**
   - Verifique console para erros
   - Confirme se script está carregado
   - Teste no DevTools

### 🔧 **Ferramentas de Debug**
- **Console do Navegador**: Logs e erros
- **DevTools**: Inspeção de elementos
- **Network Tab**: Monitoramento de recursos
- **Performance Tab**: Análise de performance
- **Accessibility Tab**: Verificação de acessibilidade

## 📚 REFERÊNCIAS E RECURSOS

### 🌐 **Documentação Oficial**
- [IDE CS50 Documentation](https://cs50.readthedocs.io/ide/)
- [HTML5 Specification](https://html.spec.whatwg.org/)
- [CSS3 Specification](https://www.w3.org/TR/css-2021/)
- [JavaScript ES6+ Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### 🎓 **Cursos Relacionados**
- CS50 Web Programming with Python and JavaScript
- CS50 Mobile App Development with React Native
- CS50 Game Development

### 🛠️ **Ferramentas Complementares**
- **Prettier**: Formatação de código
- **ESLint**: Linting JavaScript
- **Stylelint**: Linting CSS
- **Live Server**: Servidor de desenvolvimento
- **Browser Sync**: Sincronização entre dispositivos

## 📖 GLOSSÁRIO

- **IDE**: Integrated Development Environment - Ambiente de Desenvolvimento Integrado
- **Live Preview**: Visualização em tempo real das alterações
- **Hot Reload**: Recarregamento automático ao salvar arquivos
- **Syntax Highlighting**: Destaque de sintaxe para melhor legibilidade
- **IntelliSense**: Sugestões inteligentes de código
- **Breakpoint**: Ponto de pausa para debugging
- **Call Stack**: Pilha de chamadas de funções
- **Performance Profiling**: Análise de performance do código
- **Cross-browser**: Compatibilidade entre diferentes navegadores
- **Responsive Design**: Design que se adapta a diferentes dispositivos

## 🎯 PRÓXIMOS PASSOS

Após dominar a IDE CS50, você estará preparado para:
1. **Desenvolver projetos web completos**
2. **Implementar layouts responsivos avançados**
3. **Criar aplicações JavaScript interativas**
4. **Otimizar performance e acessibilidade**
5. **Colaborar em projetos em equipe**

**🚀 Continue sua jornada CS50 e transforme-se em um desenvolvedor web profissional!**`
                },
                {
                    id: 3,
                    title: 'Configuração do Ambiente',
                    type: 'text',
                    duration: '30 min',
                    content: `# ⚙️ CONFIGURAÇÃO DO AMBIENTE DE DESENVOLVIMENTO

## 🌟 VISÃO GERAL

A configuração adequada do ambiente de desenvolvimento é fundamental para o sucesso no aprendizado de programação web. Nesta aula, você aprenderá a configurar um ambiente profissional completo, seguindo as melhores práticas da indústria e os padrões CS50.

## 🎯 OBJETIVOS DE APRENDIZAGEM

### 🧠 **Conhecimento**
- Identificar as ferramentas essenciais para desenvolvimento web
- Compreender a função de cada ferramenta no workflow
- Reconhecer diferentes sistemas operacionais e suas particularidades

### 🔍 **Compreensão**
- Explicar por que cada ferramenta é necessária
- Entender como as ferramentas se integram
- Compreender o conceito de ambiente de desenvolvimento

### 🛠️ **Aplicação**
- Instalar e configurar todas as ferramentas necessárias
- Criar e gerenciar projetos de desenvolvimento
- Configurar variáveis de ambiente e PATH

### 🔬 **Análise**
- Diagnosticar problemas de instalação
- Comparar diferentes versões de ferramentas
- Avaliar a compatibilidade entre ferramentas

## 🛠️ FERRAMENTAS ESSENCIAIS

### 🐍 **Python Setup (3.8+)**

#### **Instalação no Windows**
\`\`\`powershell
# Baixar Python do site oficial
# https://www.python.org/downloads/

# Verificar instalação
python --version
pip --version

# Atualizar pip
python -m pip install --upgrade pip

# Instalar ferramentas essenciais
pip install virtualenv
pip install ipython
pip install jupyter
\`\`\`

#### **Instalação no macOS**
\`\`\`bash
# Usar Homebrew (recomendado)
brew install python

# Ou usar pyenv para múltiplas versões
brew install pyenv
pyenv install 3.11.0
pyenv global 3.11.0

# Verificar instalação
python3 --version
pip3 --version
\`\`\`

#### **Instalação no Linux (Ubuntu/Debian)**
\`\`\`bash
# Atualizar sistema
sudo apt update && sudo apt upgrade

# Instalar Python
sudo apt install python3 python3-pip python3-venv

# Instalar ferramentas de desenvolvimento
sudo apt install build-essential libssl-dev libffi-dev python3-dev

# Verificar instalação
python3 --version
pip3 --version
\`\`\`

### 🌐 **Web Development Setup**

#### **Node.js & npm**
\`\`\`bash
# Windows - Baixar do site oficial
# https://nodejs.org/

# macOS com Homebrew
brew install node

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version

# Instalar ferramentas globais
npm install -g live-server
npm install -g prettier
npm install -g eslint
npm install -g stylelint
\`\`\`

#### **Git e GitHub**
\`\`\`bash
# Windows - Baixar do site oficial
# https://git-scm.com/

# macOS
brew install git

# Linux
sudo apt install git

# Configuração inicial
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
git config --global init.defaultBranch main

# Verificar instalação
git --version
\`\`\`

#### **DevTools e Extensões**
\`\`\`bash
# Chrome DevTools (já incluído)
# Firefox Developer Tools (já incluído)
# Safari Web Inspector (já incluído)

# Extensões recomendadas para Chrome
# - React Developer Tools
# - Vue.js devtools
# - Redux DevTools
# - Lighthouse
# - ColorZilla
# - WhatFont
\`\`\`

### 📊 **Data Science Setup**

#### **Jupyter Notebooks**
\`\`\`bash
# Instalar Jupyter
pip install jupyter notebook
pip install jupyterlab

# Iniciar Jupyter
jupyter notebook
# ou
jupyter lab

# Instalar kernels adicionais
pip install ipykernel
python -m ipykernel install --user --name=python3
\`\`\`

#### **Bibliotecas Essenciais**
\`\`\`bash
# NumPy para computação numérica
pip install numpy

# Pandas para manipulação de dados
pip install pandas

# Matplotlib para visualização
pip install matplotlib

# Seaborn para gráficos estatísticos
pip install seaborn

# Scikit-learn para machine learning
pip install scikit-learn

# Jupyter para notebooks interativos
pip install jupyter
\`\`\`

## 🚀 CONFIGURAÇÃO AVANÇADA

### 🔧 **Variáveis de Ambiente**

#### **Windows (PowerShell)**
\`\`\`powershell
# Definir variáveis temporárias
$env:PATH += ";C:\\Python311;C:\\Python311\\Scripts"

# Definir variáveis permanentes
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\\Python311", "User")

# Verificar variáveis
echo $env:PATH
echo $env:PYTHONPATH
\`\`\`

#### **macOS/Linux (Bash)**
\`\`\`bash
# Adicionar ao ~/.bashrc ou ~/.zshrc
export PATH="/usr/local/bin:$PATH"
export PYTHONPATH="/usr/local/lib/python3.11/site-packages:$PYTHONPATH"

# Recarregar configuração
source ~/.bashrc
# ou
source ~/.zshrc

# Verificar variáveis
echo $PATH
echo $PYTHONPATH
\`\`\`

### 🐍 **Virtual Environments**

#### **Criar e Ativar Ambiente**
\`\`\`bash
# Criar ambiente virtual
python -m venv myproject-env

# Ativar ambiente (Windows)
myproject-env\\Scripts\\activate

# Ativar ambiente (macOS/Linux)
source myproject-env/bin/activate

# Verificar ambiente ativo
which python
pip list

# Desativar ambiente
deactivate
\`\`\`

#### **Gerenciar Dependências**
\`\`\`bash
# Instalar dependências
pip install -r requirements.txt

# Gerar requirements.txt
pip freeze > requirements.txt

# Atualizar dependências
pip install --upgrade -r requirements.txt
\`\`\`

### 📦 **Package Managers**

#### **npm (Node.js)**
\`\`\`bash
# Inicializar projeto
npm init -y

# Instalar dependências
npm install express cors helmet

# Instalar dependências de desenvolvimento
npm install --save-dev nodemon eslint prettier

# Scripts no package.json
\`\`\`json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
\`\`\`
\`\`\`

#### **pip (Python)**
\`\`\`bash
# Instalar pacotes
pip install flask django requests

# Instalar com versão específica
pip install "django>=4.0,<5.0"

# Listar pacotes instalados
pip list

# Desinstalar pacote
pip uninstall package-name
\`\`\`

## 🎯 EXERCÍCIO PRÁTICO: CONFIGURAÇÃO COMPLETA

### 📋 **Objetivos**
- Configurar ambiente de desenvolvimento completo
- Criar primeiro projeto Python
- Configurar primeiro projeto Node.js
- Testar todas as ferramentas instaladas

### 🛠️ **Passos**

#### **1. Verificação de Instalações**
\`\`\`bash
# Verificar todas as ferramentas
echo "=== VERIFICAÇÃO DE INSTALAÇÕES ==="
echo "Python: $(python --version)"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Git: $(git --version)"
echo "Pip: $(pip --version)"
\`\`\`

#### **2. Projeto Python - Calculadora Simples**
\`\`\`bash
# Criar projeto Python
mkdir calculadora-python
cd calculadora-python

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # macOS/Linux
# ou
venv\\Scripts\\activate  # Windows

# Criar arquivo principal
\`\`\`python
# calculadora.py
class Calculadora:
    def __init__(self):
        self.historico = []
    
    def somar(self, a, b):
        resultado = a + b
        self.historico.append(f"{a} + {b} = {resultado}")
        return resultado
    
    def subtrair(self, a, b):
        resultado = a - b
        self.historico.append(f"{a} - {b} = {resultado}")
        return resultado
    
    def multiplicar(self, a, b):
        resultado = a * b
        self.historico.append(f"{a} * {b} = {resultado}")
        return resultado
    
    def dividir(self, a, b):
        if b == 0:
            raise ValueError("Divisão por zero não é permitida")
        resultado = a / b
        self.historico.append(f"{a} / {b} = {resultado}")
        return resultado
    
    def ver_historico(self):
        return self.historico

# Teste da calculadora
if __name__ == "__main__":
    calc = Calculadora()
    
    print("=== CALCULADORA PYTHON ===")
    print(f"Soma: 5 + 3 = {calc.somar(5, 3)}")
    print(f"Subtração: 10 - 4 = {calc.subtrair(10, 4)}")
    print(f"Multiplicação: 6 * 7 = {calc.multiplicar(6, 7)}")
    print(f"Divisão: 15 / 3 = {calc.dividir(15, 3)}")
    
    print("\\n=== HISTÓRICO ===")
    for operacao in calc.ver_historico():
        print(operacao)
\`\`\`

#### **3. Projeto Node.js - Servidor Web Simples**
\`\`\`bash
# Criar projeto Node.js
mkdir servidor-web
cd servidor-web

# Inicializar projeto
npm init -y

# Instalar dependências
npm install express cors

# Criar arquivo principal
\`\`\`javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rotas
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo ao Servidor Web CS50!',
        timestamp: new Date().toISOString(),
        status: 'online'
    });
});

app.get('/api/status', (req, res) => {
    res.json({
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        platform: process.platform,
        nodeVersion: process.version
    });
});

app.post('/api/echo', (req, res) => {
    const { message } = req.body;
    res.json({
        original: message,
        echo: message,
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(\`🚀 Servidor rodando na porta \${PORT}\`);
    console.log(\`📱 Acesse: http://localhost:\${PORT}\`);
    console.log(\`📊 Status: http://localhost:\${PORT}/api/status\`);
});

// Tratamento de erros
process.on('uncaughtException', (err) => {
    console.error('Erro não capturado:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promise rejeitada não tratada:', reason);
    process.exit(1);
});
\`\`\`

#### **4. Testar Ambos os Projetos**
\`\`\`bash
# Testar projeto Python
cd calculadora-python
python calculadora.py

# Testar projeto Node.js (em outro terminal)
cd servidor-web
npm start

# Testar servidor
curl http://localhost:3000
curl http://localhost:3000/api/status
\`\`\`

## 🎯 PSET: CONFIGURAÇÃO E TESTE DE AMBIENTE

### 📊 **Nível Básico**
- ✅ Instalar Python 3.8+ e verificar versão
- ✅ Instalar Node.js e npm
- ✅ Configurar Git com nome e email
- ✅ Criar ambiente virtual Python
- ✅ Executar calculadora Python

### 🚀 **Nível Intermediário**
- ✅ Configurar variáveis de ambiente
- ✅ Criar projeto Node.js com Express
- ✅ Implementar rotas básicas de API
- ✅ Usar middleware CORS e JSON
- ✅ Testar API com diferentes métodos HTTP

### 🏆 **Nível Desafio**
- ✅ Implementar sistema de logs estruturados
- ✅ Adicionar autenticação básica
- ✅ Implementar rate limiting
- ✅ Adicionar validação de entrada
- ✅ Criar documentação da API

## 🧪 TESTES E VALIDAÇÃO

### 🔍 **Critérios de Avaliação**
- **Instalação**: 25% - Todas as ferramentas funcionam
- **Configuração**: 25% - Ambiente configurado corretamente
- **Funcionalidade**: 30% - Projetos executam sem erros
- **Código**: 20% - Boas práticas e organização

### 🎯 **Checklist de Validação**
- [ ] Python 3.8+ instalado e funcionando
- [ ] Node.js e npm instalados
- [ ] Git configurado com nome e email
- [ ] Ambiente virtual Python criado
- [ ] Projeto Python executa sem erros
- [ ] Projeto Node.js inicia corretamente
- [ ] API responde às requisições
- [ ] Código está organizado e comentado

## 🐛 DEBUGGING E SOLUÇÃO DE PROBLEMAS

### ❌ **Problemas Comuns**

#### **1. Python não encontrado**
\`\`\`bash
# Windows
# Verificar se Python está no PATH
echo $env:PATH

# Adicionar Python ao PATH
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\\Python311", "User")

# macOS/Linux
which python3
echo $PATH
export PATH="/usr/local/bin:$PATH"
\`\`\`

#### **2. npm não encontrado**
\`\`\`bash
# Verificar instalação Node.js
node --version

# Reinstalar Node.js se necessário
# Windows: Baixar do site oficial
# macOS: brew reinstall node
# Linux: sudo apt reinstall nodejs
\`\`\`

#### **3. Erro de permissão**
\`\`\`bash
# macOS/Linux
sudo chown -R $USER /usr/local/lib/node_modules
sudo chown -R $USER ~/.npm

# Windows (PowerShell como Administrador)
# Executar PowerShell como administrador
\`\`\`

#### **4. Conflito de versões Python**
\`\`\`bash
# Usar pyenv para gerenciar versões
brew install pyenv  # macOS
pyenv install 3.11.0
pyenv global 3.11.0

# Ou usar conda
conda create -n myenv python=3.11
conda activate myenv
\`\`\`

### 🔧 **Ferramentas de Debug**

#### **Verificação de Sistema**
\`\`\`bash
# Informações do sistema
uname -a  # Linux/macOS
systeminfo  # Windows

# Versões das ferramentas
python --version
node --version
npm --version
git --version

# Variáveis de ambiente
env | grep -i python
env | grep -i node
env | grep -i path
\`\`\`

#### **Testes de Conectividade**
\`\`\`bash
# Testar conexão com repositórios
pip install --upgrade pip --dry-run
npm ping

# Testar download de pacotes
pip install requests --dry-run
npm install express --dry-run
\`\`\`

## 📚 REFERÊNCIAS E RECURSOS

### 🌐 **Documentação Oficial**
- [Python Documentation](https://docs.python.org/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Git Documentation](https://git-scm.com/doc)
- [Express.js Documentation](https://expressjs.com/)

### 🎓 **Tutoriais e Cursos**
- [Python for Beginners](https://docs.python.org/3/tutorial/)
- [Node.js Getting Started](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs/)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)
- [Express.js Tutorial](https://expressjs.com/en/starter/installing.html)

### 🛠️ **Ferramentas Complementares**
- **Docker**: Containerização de aplicações
- **Vagrant**: Ambientes de desenvolvimento virtualizados
- **Ansible**: Automação de configuração
- **Terraform**: Infraestrutura como código
- **Jenkins**: Integração contínua

### 📱 **IDEs e Editores**
- **VS Code**: Editor leve e extensível
- **PyCharm**: IDE Python profissional
- **WebStorm**: IDE JavaScript/Node.js
- **Sublime Text**: Editor rápido e eficiente
- **Vim/Emacs**: Editores para usuários avançados

## 📖 GLOSSÁRIO

- **Ambiente Virtual**: Isolamento de dependências Python
- **Package Manager**: Gerenciador de pacotes (npm, pip)
- **PATH**: Variável de ambiente que lista diretórios executáveis
- **Middleware**: Software que processa requisições HTTP
- **API**: Interface de programação de aplicações
- **CORS**: Compartilhamento de recursos entre origens
- **Git**: Sistema de controle de versão distribuído
- **npm**: Gerenciador de pacotes para Node.js
- **pip**: Gerenciador de pacotes para Python
- **Virtual Environment**: Ambiente Python isolado

## 🎯 PRÓXIMOS PASSOS

Após configurar seu ambiente de desenvolvimento, você estará preparado para:

1. **Desenvolver aplicações Python robustas**
2. **Criar APIs web com Node.js e Express**
3. **Gerenciar dependências e versões**
4. **Colaborar em projetos com Git**
5. **Deployar aplicações em produção**

## 🏆 CONQUISTAS DESBLOQUEADAS

- **🎯 Primeiro Ambiente**: Configure seu primeiro ambiente de desenvolvimento
- **🐍 Python Master**: Domine a configuração Python
- **🌐 Node.js Ninja**: Configure ambiente Node.js completo
- **🔧 DevOps Beginner**: Aprenda ferramentas de desenvolvimento
- **📦 Package Manager**: Gerencie dependências como um profissional

**🚀 Seu ambiente está configurado! Continue sua jornada CS50 e transforme-se em um desenvolvedor profissional!**`
                }
            ]
        },
        {
            id: 2,
            title: 'HTML5 Semântico',
            lessons: [
                {
                    id: 4,
                    title: 'Introdução ao HTML5',
                    type: 'text',
                    duration: '45 min',
                    content: '# 🌐 HTML5 SEMÂNTICO\n\n## 🎯 ESTRUTURA SEMÂNTICA\n```html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Fenix Academy</title>\n</head>\n<body>\n    <header>\n        <nav>\n            <ul>\n                <li><a href="#home">Home</a></li>\n                <li><a href="#cursos">Cursos</a></li>\n            </ul>\n        </nav>\n    </header>\n    \n    <main>\n        <section id="hero">\n            <h1>Bem-vindo à Fenix Academy</h1>\n            <p>Aprenda programação com metodologia CS50</p>\n        </section>\n    </main>\n    \n    <footer>\n        <p>&copy; 2025 Fenix Academy</p>\n    </footer>\n</body>\n</html>\n```'
                },
                {
                    id: 5,
                    title: 'Elementos de Texto',
                    type: 'exercise',
                    duration: '40 min',
                    content: '# 📝 ELEMENTOS DE TEXTO\n\n## 🎯 EXERCÍCIO: ESTRUTURA DE ARTIGO\n```html\n<article class="blog-post">\n    <header>\n        <h1>Como Aprender Programação em 2025</h1>\n        <time datetime="2025-01-15">15 de Janeiro, 2025</time>\n        <address>Por <a href="/author/joao">João Silva</a></address>\n    </header>\n    \n    <section class="introduction">\n        <h2>Introdução</h2>\n        <p>Programação é uma habilidade essencial no mundo moderno...</p>\n    </section>\n    \n    <section class="content">\n        <h2>Por onde começar?</h2>\n        <p>Existem várias linguagens para iniciantes...</p>\n        \n        <h3>1. Python</h3>\n        <p>Python é ideal para iniciantes...</p>\n        \n        <h3>2. JavaScript</h3>\n        <p>JavaScript é essencial para web...</p>\n    </section>\n    \n    <footer>\n        <p>Compartilhe este artigo:</p>\n        <ul>\n            <li><a href="#" aria-label="Compartilhar no Twitter">Twitter</a></li>\n            <li><a href="#" aria-label="Compartilhar no LinkedIn">LinkedIn</a></li>\n        </ul>\n    </footer>\n</article>\n```'
                },
                {
                    id: 18,
                    title: 'Formulários e Validação HTML5',
                    type: 'exercise',
                    duration: '60 min',
                    content: '# 📝 FORMULÁRIOS E VALIDAÇÃO HTML5\n\n## 🎯 EXERCÍCIO: FORMULÁRIO DE CADASTRO\n```html\n<form class="signup-form" novalidate>\n    <fieldset>\n        <legend>Informações Pessoais</legend>\n        \n        <div class="form-group">\n            <label for="fullname">Nome Completo *</label>\n            <input type="text" id="fullname" name="fullname" required\n                   minlength="3" maxlength="100"\n                   pattern="[A-Za-zÀ-ÿ\\s]+"\n                   title="Digite apenas letras e espaços">\n            <span class="error-message"></span>\n        </div>\n        \n        <div class="form-group">\n            <label for="email">Email *</label>\n            <input type="email" id="email" name="email" required\n                   placeholder="seu@email.com">\n            <span class="error-message"></span>\n        </div>\n        \n        <div class="form-group">\n            <label for="phone">Telefone</label>\n            <input type="tel" id="phone" name="phone"\n                   pattern="[0-9]{2}[0-9]{4,5}[0-9]{4}"\n                   placeholder="11999999999"\n                   title="Digite apenas números">\n            <span class="error-message"></span>\n        </div>\n        \n        <div class="form-group">\n            <label for="birthdate">Data de Nascimento</label>\n            <input type="date" id="birthdate" name="birthdate"\n                   max="2005-12-31">\n        </div>\n    </fieldset>\n    \n    <fieldset>\n        <legend>Preferências</legend>\n        \n        <div class="form-group">\n            <label>Interesse em:</label>\n            <div class="checkbox-group">\n                <label>\n                    <input type="checkbox" name="interests" value="web">\n                    Desenvolvimento Web\n                </label>\n                <label>\n                    <input type="checkbox" name="interests" value="mobile">\n                    Desenvolvimento Mobile\n                </label>\n                <label>\n                    <input type="checkbox" name="interests" value="data">\n                    Data Science\n                </label>\n            </div>\n        </div>\n        \n        <div class="form-group">\n            <label for="experience">Nível de Experiência</label>\n            <select id="experience" name="experience">\n                <option value="">Selecione...</option>\n                <option value="beginner">Iniciante</option>\n                <option value="intermediate">Intermediário</option>\n                <option value="advanced">Avançado</option>\n            </select>\n        </div>\n        \n        <div class="form-group">\n            <label for="bio">Biografia</label>\n            <textarea id="bio" name="bio" rows="4" maxlength="500"\n                      placeholder="Conte um pouco sobre você..."></textarea>\n            <span class="char-count">0/500</span>\n        </div>\n    </fieldset>\n    \n    <div class="form-actions">\n        <button type="submit" class="btn btn-primary">Cadastrar</button>\n        <button type="reset" class="btn btn-secondary">Limpar</button>\n    </div>\n</form>\n```'
                },
                {
                    id: 19,
                    title: 'Tabelas e Dados Estruturados',
                    type: 'exercise',
                    duration: '50 min',
                    content: '# 📊 TABELAS E DADOS ESTRUTURADOS\n\n## 🎯 EXERCÍCIO: TABELA DE CURSOS\n```html\n<div class="courses-table-container">\n    <table class="courses-table" role="table" aria-label="Lista de Cursos Disponíveis">\n        <caption>Cursos Disponíveis na Fenix Academy</caption>\n        \n        <thead>\n            <tr>\n                <th scope="col">Curso</th>\n                <th scope="col">Duração</th>\n                <th scope="col">Nível</th>\n                <th scope="col">Preço</th>\n                <th scope="col">Ações</th>\n            </tr>\n        </thead>\n        \n        <tbody>\n            <tr>\n                <td data-label="Curso">\n                    <strong>Fundamentos Web</strong>\n                    <small>HTML5, CSS3, JavaScript</small>\n                </td>\n                <td data-label="Duração">72 aulas</td>\n                <td data-label="Nível">\n                    <span class="badge badge-beginner">Iniciante</span>\n                </td>\n                <td data-label="Preço">R$ 197</td>\n                <td data-label="Ações">\n                    <button class="btn btn-sm btn-primary">Ver Curso</button>\n                </td>\n            </tr>\n            <tr>\n                <td data-label="Curso">\n                    <strong>Python Data Science</strong>\n                    <small>NumPy, Pandas, ML</small>\n                </td>\n                <td data-label="Duração">42 aulas</td>\n                <td data-label="Nível">\n                    <span class="badge badge-intermediate">Intermediário</span>\n                </td>\n                <td data-label="Preço">R$ 297</td>\n                <td data-label="Ações">\n                    <button class="btn btn-sm btn-primary">Ver Curso</button>\n                </td>\n            </tr>\n            <tr>\n                <td data-label="Curso">\n                    <strong>React Avançado</strong>\n                    <small>Hooks, Context, Performance</small>\n                </td>\n                <td data-label="Duração">36 aulas</td>\n                <td data-label="Nível">\n                    <span class="badge badge-advanced">Avançado</span>\n                </td>\n                <td data-label="Preço">R$ 397</td>\n                <td data-label="Ações">\n                    <button class="btn btn-sm btn-primary">Ver Curso</button>\n                </td>\n            </tr>\n        </tbody>\n        \n        <tfoot>\n            <tr>\n                <td colspan="3"><strong>Total de Cursos:</strong></td>\n                <td colspan="2"><strong>3 cursos disponíveis</strong></td>\n            </tr>\n        </tfoot>\n    </table>\n</div>\n```'
                },
                {
                    id: 20,
                    title: 'Multimídia e Conteúdo Interativo',
                    type: 'exercise',
                    duration: '55 min',
                    content: '# 🎬 MULTIMÍDIA E CONTEÚDO INTERATIVO\n\n## 🎯 EXERCÍCIO: GALERIA MULTIMÍDIA\n```html\n<section class="multimedia-gallery">\n    <h2>Galeria de Conteúdo Interativo</h2>\n    \n    <!-- Galeria de Imagens -->\n    <div class="image-gallery">\n        <h3>Imagens Responsivas</h3>\n        <figure class="gallery-item">\n            <picture>\n                <source media="(min-width: 1200px)" srcset="image-large.jpg">\n                <source media="(min-width: 768px)" srcset="image-medium.jpg">\n                <img src="image-small.jpg" alt="Descrição da imagem" loading="lazy">\n            </picture>\n            <figcaption>Imagem responsiva com múltiplas resoluções</figcaption>\n        </figure>\n    </div>\n    \n    <!-- Player de Vídeo -->\n    <div class="video-player">\n        <h3>Vídeo Tutorial</h3>\n        <video controls preload="metadata" poster="video-thumbnail.jpg">\n            <source src="tutorial.mp4" type="video/mp4">\n            <source src="tutorial.webm" type="video/webm">\n            <track kind="subtitles" src="subtitles-pt.vtt" srclang="pt" label="Português">\n            <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English">\n            <p>Seu navegador não suporta vídeo HTML5.</p>\n        </video>\n    </div>\n    \n    <!-- Player de Áudio -->\n    <div class="audio-player">\n        <h3>Podcast CS50</h3>\n        <audio controls preload="metadata">\n            <source src="podcast.mp3" type="audio/mpeg">\n            <source src="podcast.ogg" type="audio/ogg">\n            <p>Seu navegador não suporta áudio HTML5.</p>\n        </audio>\n    </div>\n    \n    <!-- Canvas para Gráficos -->\n    <div class="canvas-demo">\n        <h3>Gráfico Interativo</h3>\n        <canvas id="chartCanvas" width="400" height="300"></canvas>\n        <div class="canvas-controls">\n            <button onclick="updateChart()">Atualizar Gráfico</button>\n            <button onclick="clearChart()">Limpar</button>\n        </div>\n    </div>\n    \n    <!-- SVG Animado -->\n    <div class="svg-animations">\n        <h3>Animações SVG</h3>\n        <svg width="200" height="200" viewBox="0 0 200 200">\n            <circle cx="100" cy="100" r="50" fill="none" stroke="#2563eb" stroke-width="4">\n                <animate attributeName="r" values="50;80;50" dur="2s" repeatCount="indefinite"/>\n                <animate attributeName="stroke-width" values="4;8;4" dur="2s" repeatCount="indefinite"/>\n            </circle>\n        </svg>\n    </div>\n</section>\n```'
                }
            ]
        },
        {
            id: 3,
            title: 'CSS3 Fundamentos',
            lessons: [
                {
                    id: 6,
                    title: 'Introdução ao CSS3',
                    type: 'text',
                    duration: '50 min',
                    content: '# 🎨 CSS3 FUNDAMENTOS\n\n## 🎯 SELETORES E ESPECIFICIDADE\n```css\n/* Reset básico */\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\n/* Variáveis CSS */\n:root {\n    --primary-color: #2563eb;\n    --secondary-color: #7c3aed;\n    --text-color: #1f2937;\n    --background-color: #f9fafb;\n    --border-radius: 8px;\n    --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n}\n\n/* Estilos base */\nbody {\n    font-family: \'Inter\', -apple-system, BlinkMacSystemFont, sans-serif;\n    line-height: 1.6;\n    color: var(--text-color);\n    background-color: var(--background-color);\n}\n\n/* Componentes reutilizáveis */\n.btn {\n    display: inline-block;\n    padding: 12px 24px;\n    background-color: var(--primary-color);\n    color: white;\n    text-decoration: none;\n    border-radius: var(--border-radius);\n    transition: all 0.3s ease;\n    border: none;\n    cursor: pointer;\n}\n\n.btn:hover {\n    background-color: #1d4ed8;\n    transform: translateY(-2px);\n    box-shadow: var(--box-shadow);\n}\n\n.btn-secondary {\n    background-color: var(--secondary-color);\n}\n\n.btn-secondary:hover {\n    background-color: #6d28d9;\n}\n```'
                },
                {
                    id: 7,
                    title: 'Flexbox Layout',
                    type: 'exercise',
                    duration: '55 min',
                    content: '# 🔄 FLEXBOX LAYOUT\n\n## 🎯 EXERCÍCIO: NAVEGAÇÃO RESPONSIVA\n```css\n/* Navegação principal */\n.nav-main {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 1rem 2rem;\n    background-color: white;\n    box-shadow: var(--box-shadow);\n    position: sticky;\n    top: 0;\n    z-index: 1000;\n}\n\n.nav-brand {\n    font-size: 1.5rem;\n    font-weight: bold;\n    color: var(--primary-color);\n    text-decoration: none;\n}\n\n.nav-menu {\n    display: flex;\n    list-style: none;\n    gap: 2rem;\n    align-items: center;\n}\n\n.nav-link {\n    color: var(--text-color);\n    text-decoration: none;\n    padding: 0.5rem 1rem;\n    border-radius: var(--border-radius);\n    transition: all 0.3s ease;\n}\n\n.nav-link:hover {\n    background-color: var(--background-color);\n    color: var(--primary-color);\n}\n\n.nav-link.active {\n    background-color: var(--primary-color);\n    color: white;\n}\n\n/* Responsividade */\n@media (max-width: 768px) {\n    .nav-menu {\n        display: none;\n    }\n    \n    .nav-toggle {\n        display: block;\n    }\n}\n```'
                }
            ]
        },
        {
            id: 4,
            title: 'JavaScript Básico',
            lessons: [
                {
                    id: 8,
                    title: 'Introdução ao JavaScript',
                    type: 'text',
                    duration: '45 min',
                    content: '# ⚡ JAVASCRIPT BÁSICO\n\n## 🎯 VARIÁVEIS E TIPOS\n```javascript\n// ES6+ Modern JavaScript\nconst PI = 3.14159;\nlet radius = 5;\nvar oldWay = "não use mais";\n\n// Template literals\nconst area = PI * radius ** 2;\nconst message = `O círculo com raio ${radius} tem área ${area.toFixed(2)}`;\n\n// Destructuring\nconst user = {\n    name: "João Silva",\n    email: "joao@fenix.com",\n    role: "student"\n};\n\nconst { name, email, role } = user;\nconsole.log(`Usuário: ${name} (${role})`);\n\n// Arrow functions\nconst calculateArea = (r) => PI * r ** 2;\nconst greetUser = (userName) => `Olá, ${userName}!`;\n\n// Arrays modernos\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\n\nconsole.log("Números:", numbers);\nconsole.log("Dobrados:", doubled);\nconsole.log("Pares:", evens);\nconsole.log("Soma:", sum);\n```'
                },
                {
                    id: 9,
                    title: 'Manipulação do DOM',
                    type: 'exercise',
                    duration: '60 min',
                    content: '# 🌳 MANIPULAÇÃO DO DOM\n\n## 🎯 EXERCÍCIO: TODO LIST INTERATIVA\n```javascript\nclass TodoList {\n    constructor() {\n        this.todos = [];\n        this.todoInput = document.getElementById(\'todo-input\');\n        this.todoList = document.getElementById(\'todo-list\');\n        this.addButton = document.getElementById(\'add-todo\');\n        \n        this.initializeEventListeners();\n        this.loadFromLocalStorage();\n    }\n    \n    initializeEventListeners() {\n        this.addButton.addEventListener(\'click\', () => this.addTodo());\n        this.todoInput.addEventListener(\'keypress\', (e) => {\n            if (e.key === \'Enter\') this.addTodo();\n        });\n    }\n    \n    addTodo() {\n        const text = this.todoInput.value.trim();\n        if (!text) return;\n        \n        const todo = {\n            id: Date.now(),\n            text,\n            completed: false,\n            createdAt: new Date()\n        };\n        \n        this.todos.push(todo);\n        this.renderTodos();\n        this.saveToLocalStorage();\n        this.todoInput.value = \'\';\n    }\n    \n    toggleTodo(id) {\n        const todo = this.todos.find(t => t.id === id);\n        if (todo) {\n            todo.completed = !todo.completed;\n            this.renderTodos();\n            this.saveToLocalStorage();\n        }\n    }\n    \n    deleteTodo(id) {\n        this.todos = this.todos.filter(t => t.id !== id);\n        this.renderTodos();\n        this.saveToLocalStorage();\n    }\n    \n    renderTodos() {\n        this.todoList.innerHTML = \'\';\n        \n        this.todos.forEach(todo => {\n            const li = document.createElement(\'li\');\n            li.className = \'todo-item\';\n            li.innerHTML = `\n                <input type="checkbox" \n                       ${todo.completed ? \'checked\' : \'\'} \n                       onchange="todoList.toggleTodo(${todo.id})">\n                <span class="${todo.completed ? \'completed\' : \'\'}">${todo.text}</span>\n                <button onclick="todoList.deleteTodo(${todo.id})" class="delete-btn">🗑️</button>\n            `;\n            this.todoList.appendChild(li);\n        });\n        \n        this.updateStats();\n    }\n    \n    updateStats() {\n        const total = this.todos.length;\n        const completed = this.todos.filter(t => t.completed).length;\n        const pending = total - completed;\n        \n        document.getElementById(\'stats\').innerHTML = `\n            <p>Total: ${total} | Concluídas: ${completed} | Pendentes: ${pending}</p>\n        `;\n    }\n    \n    saveToLocalStorage() {\n        localStorage.setItem(\'todos\', JSON.stringify(this.todos));\n    }\n    \n    loadFromLocalStorage() {\n        const saved = localStorage.getItem(\'todos\');\n        if (saved) {\n            this.todos = JSON.parse(saved);\n            this.renderTodos();\n        }\n    }\n}\n\n// Inicializar quando DOM estiver pronto\ndocument.addEventListener(\'DOMContentLoaded\', () => {\n    window.todoList = new TodoList();\n});\n```'
                },
                {
                    id: 10,
                    title: 'Eventos e Interatividade',
                    type: 'exercise',
                    duration: '50 min',
                    content: '# 🎯 EVENTOS E INTERATIVIDADE\n\n## 🎯 EXERCÍCIO: FORMULÁRIO INTERATIVO\n```javascript\nclass FormValidator {\n    constructor(formId) {\n        this.form = document.getElementById(formId);\n        this.fields = this.form.querySelectorAll(\'[data-validate]\');\n        this.submitButton = this.form.querySelector(\'[type="submit"]\');\n        \n        this.initializeValidation();\n    }\n    \n    initializeValidation() {\n        this.fields.forEach(field => {\n            field.addEventListener(\'blur\', () => this.validateField(field));\n            field.addEventListener(\'input\', () => this.clearError(field));\n        });\n        \n        this.form.addEventListener(\'submit\', (e) => this.handleSubmit(e));\n    }\n    \n    validateField(field) {\n        const value = field.value.trim();\n        const rules = field.dataset.validate.split(\'|\');\n        \n        for (const rule of rules) {\n            const [ruleName, ruleValue] = rule.split(\':\');\n            \n            if (!this.checkRule(ruleName, value, ruleValue)) {\n                this.showError(field, this.getErrorMessage(ruleName, ruleValue));\n                return false;\n            }\n        }\n        \n        this.clearError(field);\n        return true;\n    }\n    \n    checkRule(rule, value, ruleValue) {\n        switch (rule) {\n            case \'required\':\n                return value.length > 0;\n            case \'min\':\n                return value.length >= parseInt(ruleValue);\n            case \'max\':\n                return value.length <= parseInt(ruleValue);\n            case \'email\':\n                return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);\n            case \'pattern\':\n                return new RegExp(ruleValue).test(value);\n            default:\n                return true;\n        }\n    }\n    \n    getErrorMessage(rule, ruleValue) {\n        const messages = {\n            required: \'Este campo é obrigatório\',\n            min: `Mínimo de ${ruleValue} caracteres`,\n            max: `Máximo de ${ruleValue} caracteres`,\n            email: \'Email inválido\',\n            pattern: \'Formato inválido\'\n        };\n        return messages[rule] || \'Campo inválido\';\n    }\n    \n    showError(field, message) {\n        this.clearError(field);\n        \n        const errorDiv = document.createElement(\'div\');\n        errorDiv.className = \'error-message\';\n        errorDiv.textContent = message;\n        errorDiv.style.color = \'#dc2626\';\n        errorDiv.style.fontSize = \'0.875rem\';\n        errorDiv.style.marginTop = \'0.25rem\';\n        \n        field.parentNode.appendChild(errorDiv);\n        field.classList.add(\'error\');\n    }\n    \n    clearError(field) {\n        const errorDiv = field.parentNode.querySelector(\'.error-message\');\n        if (errorDiv) {\n            errorDiv.remove();\n        }\n        field.classList.remove(\'error\');\n    }\n    \n    handleSubmit(e) {\n        e.preventDefault();\n        \n        let isValid = true;\n        this.fields.forEach(field => {\n            if (!this.validateField(field)) {\n                isValid = false;\n            }\n        });\n        \n        if (isValid) {\n            this.submitForm();\n        }\n    }\n    \n    submitForm() {\n        const formData = new FormData(this.form);\n        const data = Object.fromEntries(formData.entries());\n        \n        console.log(\'Dados do formulário:\', data);\n        alert(\'Formulário enviado com sucesso!\');\n    }\n}\n\n// Uso\n// <form id="contact-form">\n//   <input type="text" data-validate="required|min:3" placeholder="Nome">\n//   <input type="email" data-validate="required|email" placeholder="Email">\n//   <textarea data-validate="required|min:10" placeholder="Mensagem"></textarea>\n//   <button type="submit">Enviar</button>\n// </form>\n\n// Inicializar validação\ndocument.addEventListener(\'DOMContentLoaded\', () => {\n    new FormValidator(\'contact-form\');\n});\n```'
                }
            ]
        },
        {
            id: 5,
            title: 'JavaScript Avançado',
            lessons: [
                {
                    id: 11,
                    title: 'Async/Await e Promises',
                    type: 'text',
                    duration: '55 min',
                    content: '# 🚀 JAVASCRIPT AVANÇADO\n\n## 🎯 ASYNC/AWAIT E PROMISES\n```javascript\n// API Service com async/await\nclass ApiService {\n    constructor(baseURL) {\n        this.baseURL = baseURL;\n        this.token = localStorage.getItem(\'authToken\');\n    }\n    \n    async request(endpoint, options = {}) {\n        const url = `${this.baseURL}${endpoint}`;\n        \n        const config = {\n            headers: {\n                \'Content-Type\': \'application/json\',\n                ...(this.token && { Authorization: `Bearer ${this.token}` }),\n                ...options.headers\n            },\n            ...options\n        };\n        \n        try {\n            const response = await fetch(url, config);\n            \n            if (!response.ok) {\n                throw new Error(`HTTP error! status: ${response.status}`);\n            }\n            \n            const data = await response.json();\n            return { success: true, data };\n            \n        } catch (error) {\n            console.error(\'API Error:\', error);\n            return { success: false, error: error.message };\n        }\n    }\n    \n    // Métodos CRUD\n    async get(endpoint) {\n        return this.request(endpoint);\n    }\n    \n    async post(endpoint, data) {\n        return this.request(endpoint, {\n            method: \'POST\',\n            body: JSON.stringify(data)\n        });\n    }\n    \n    async put(endpoint, data) {\n        return this.request(endpoint, {\n            method: \'PUT\',\n            body: JSON.stringify(data)\n        });\n    }\n    \n    async delete(endpoint) {\n        return this.request(endpoint, {\n            method: \'DELETE\'\n        });\n    }\n}\n\n// Uso do serviço\nconst api = new ApiService(\'https://api.fenixacademy.com\');\n\n// Exemplo de uso\nasync function loadCourses() {\n    try {\n        const result = await api.get(\'/courses\');\n        \n        if (result.success) {\n            displayCourses(result.data);\n        } else {\n            showError(\'Erro ao carregar cursos\');\n        }\n        \n    } catch (error) {\n        console.error(\'Erro inesperado:\', error);\n        showError(\'Erro inesperado\');\n    }\n}\n\n// Função para exibir cursos\nfunction displayCourses(courses) {\n    const container = document.getElementById(\'courses-container\');\n    \n    if (courses.length === 0) {\n        container.innerHTML = \'<p>Nenhum curso encontrado</p>\';\n        return;\n    }\n    \n    const coursesHTML = courses.map(course => `\n        <div class="course-card">\n            <h3>${course.title}</h3>\n            <p>${course.description}</p>\n            <span class="duration">${course.duration}</span>\n            <button onclick="enrollCourse(${course.id})">Matricular</button>\n        </div>\n    `).join(\'\');\n    \n    container.innerHTML = coursesHTML;\n}\n\n// Função para mostrar erros\nfunction showError(message) {\n    const errorDiv = document.createElement(\'div\');\n    errorDiv.className = \'error-message\';\n    errorDiv.textContent = message;\n    \n    document.body.appendChild(errorDiv);\n    \n    setTimeout(() => {\n        errorDiv.remove();\n    }, 5000);\n}\n\n// Carregar cursos quando página carregar\ndocument.addEventListener(\'DOMContentLoaded\', loadCourses);\n```'
                },
                {
                    id: 12,
                    title: 'Modules e ES6+',
                    type: 'exercise',
                    duration: '45 min',
                    content: '# 📦 MODULES E ES6+\n\n## 🎯 EXERCÍCIO: SISTEMA DE MÓDULOS\n```javascript\n// utils.js - Módulo de utilitários\nexport const formatCurrency = (amount, currency = \'BRL\') => {\n    return new Intl.NumberFormat(\'pt-BR\', {\n        style: \'currency\',\n        currency: currency\n    }).format(amount);\n};\n\nexport const formatDate = (date) => {\n    return new Intl.DateTimeFormat(\'pt-BR\', {\n        year: \'numeric\',\n        month: \'long\',\n        day: \'numeric\'\n    }).format(new Date(date));\n};\n\nexport const debounce = (func, wait) => {\n    let timeout;\n    return function executedFunction(...args) {\n        const later = () => {\n            clearTimeout(timeout);\n            func(...args);\n        };\n        clearTimeout(timeout);\n        timeout = setTimeout(later, wait);\n    };\n};\n\nexport const throttle = (func, limit) => {\n    let inThrottle;\n    return function() {\n        const args = arguments;\n        const context = this;\n        if (!inThrottle) {\n            func.apply(context, args);\n            inThrottle = true;\n            setTimeout(() => inThrottle = false, limit);\n        }\n    };\n};\n\n// validation.js - Módulo de validação\nexport class Validator {\n    static isEmail(email) {\n        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n        return emailRegex.test(email);\n    }\n    \n    static isStrongPassword(password) {\n        // Mínimo 8 caracteres, pelo menos 1 maiúscula, 1 minúscula, 1 número\n        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$/;\n        return passwordRegex.test(password);\n    }\n    \n    static isCPF(cpf) {\n        cpf = cpf.replace(/[\\D]/g, \'\');\n        if (cpf.length !== 11) return false;\n        \n        // Verificar se todos os dígitos são iguais\n        if (/^(\\d)\\1+$/.test(cpf)) return false;\n        \n        // Validar CPF\n        let sum = 0;\n        for (let i = 0; i < 9; i++) {\n            sum += parseInt(cpf.charAt(i)) * (10 - i);\n        }\n        let remainder = (sum * 10) % 11;\n        if (remainder === 10 || remainder === 11) remainder = 0;\n        if (remainder !== parseInt(cpf.charAt(9))) return false;\n        \n        sum = 0;\n        for (let i = 0; i < 10; i++) {\n            sum += parseInt(cpf.charAt(i)) * (11 - i);\n        }\n        remainder = (sum * 10) % 11;\n        if (remainder === 10 || remainder === 11) remainder = 0;\n        if (remainder !== parseInt(cpf.charAt(10))) return false;\n        \n        return true;\n    }\n}\n\n// storage.js - Módulo de armazenamento\nexport class StorageManager {\n    constructor(prefix = \'fenix_\') {\n        this.prefix = prefix;\n    }\n    \n    set(key, value) {\n        try {\n            const serializedValue = JSON.stringify(value);\n            localStorage.setItem(this.prefix + key, serializedValue);\n            return true;\n        } catch (error) {\n            console.error(\'Erro ao salvar no localStorage:\', error);\n            return false;\n        }\n    }\n    \n    get(key, defaultValue = null) {\n        try {\n            const item = localStorage.getItem(this.prefix + key);\n            return item ? JSON.parse(item) : defaultValue;\n        } catch (error) {\n            console.error(\'Erro ao ler do localStorage:\', error);\n            return defaultValue;\n        }\n    }\n    \n    remove(key) {\n        localStorage.removeItem(this.prefix + key);\n    }\n    \n    clear() {\n        const keys = Object.keys(localStorage);\n        keys.forEach(key => {\n            if (key.startsWith(this.prefix)) {\n                localStorage.removeItem(key);\n            }\n        });\n    }\n}\n\n// main.js - Arquivo principal\nimport { formatCurrency, formatDate, debounce } from \'./utils.js\';\nimport { Validator } from \'./validation.js\';\nimport { StorageManager } from \'./storage.js\';\n\n// Inicializar módulos\nconst storage = new StorageManager();\n\n// Exemplo de uso\nconsole.log(formatCurrency(1250.50)); // R$ 1.250,50\nconsole.log(formatDate(new Date())); // 15 de janeiro de 2025\n\n// Validar formulário com debounce\nconst searchInput = document.getElementById(\'search\');\nconst debouncedSearch = debounce((query) => {\n    performSearch(query);\n}, 300);\n\nsearchInput.addEventListener(\'input\', (e) => {\n    debouncedSearch(e.target.value);\n});\n\n// Salvar preferências do usuário\nfunction saveUserPreferences(preferences) {\n    if (storage.set(\'userPreferences\', preferences)) {\n        console.log(\'Preferências salvas com sucesso\');\n    }\n}\n\n// Carregar preferências do usuário\nfunction loadUserPreferences() {\n    return storage.get(\'userPreferences\', {\n        theme: \'light\',\n        language: \'pt-BR\',\n        notifications: true\n    });\n}\n```'
                },
                {
                    id: 13,
                    title: 'JavaScript Avançado',
                    type: 'exercise',
                    duration: '80 min',
                    content: '# 🚀 ES6+ FEATURES E MODERN JAVASCRIPT\n\n## 🎯 EXERCÍCIO: APLICAÇÃO MODERNA COM ES6+\n```javascript\n// Módulo principal da aplicação\nimport { UserService } from \'./services/UserService.js\';\nimport { ProductService } from \'./services/ProductService.js\';\nimport { CartManager } from \'./managers/CartManager.js\';\nimport { EventEmitter } from \'./utils/EventEmitter.js\';\nimport { debounce, throttle } from \'./utils/helpers.js\';\n\n// Classe principal da aplicação\nclass ECommerceApp {\n    constructor() {\n        this.userService = new UserService();\n        this.productService = new ProductService();\n        this.cartManager = new CartManager();\n        this.eventEmitter = new EventEmitter();\n        \n        this.state = {\n            user: null,\n            products: [],\n            cart: [],\n            filters: {},\n            loading: false\n        };\n        \n        this.init();\n    }\n    \n    async init() {\n        try {\n            this.state.loading = true;\n            \n            // Carregar dados em paralelo\n            const [user, products] = await Promise.all([\n                this.userService.getCurrentUser(),\n                this.productService.getProducts()\n            ]);\n            \n            this.updateState({ user, products });\n            this.setupEventListeners();\n            this.render();\n            \n        } catch (error) {\n            console.error(\'Erro ao inicializar aplicação:\', error);\n            this.showError(\'Falha ao carregar dados\');\n        } finally {\n            this.state.loading = false;\n        }\n    }\n    \n    updateState(newState) {\n        this.state = { ...this.state, ...newState };\n        this.eventEmitter.emit(\'stateChanged\', this.state);\n    }\n    \n    setupEventListeners() {\n        // Event listeners com debounce para performance\n        const searchInput = document.getElementById(\'search\');\n        searchInput.addEventListener(\'input\', debounce(this.handleSearch.bind(this), 300));\n        \n        // Throttle para scroll events\n        window.addEventListener(\'scroll\', throttle(this.handleScroll.bind(this), 100));\n        \n        // Custom events\n        this.eventEmitter.on(\'productAdded\', this.handleProductAdded.bind(this));\n        this.eventEmitter.on(\'userLoggedIn\', this.handleUserLogin.bind(this));\n    }\n    \n    async handleSearch(event) {\n        const query = event.target.value.trim();\n        \n        if (query.length < 2) {\n            this.updateState({ products: this.state.products });\n            return;\n        }\n        \n        try {\n            const filteredProducts = await this.productService.searchProducts(query);\n            this.updateState({ products: filteredProducts });\n        } catch (error) {\n            console.error(\'Erro na busca:\', error);\n        }\n    }\n    \n    handleScroll = () => {\n        const scrollTop = window.pageYOffset;\n        const header = document.querySelector(\'.header\');\n        \n        if (scrollTop > 100) {\n            header.classList.add(\'scrolled\');\n        } else {\n            header.classList.remove(\'scrolled\');\n        }\n    }\n    \n    async addToCart(productId) {\n        try {\n            const product = this.state.products.find(p => p.id === productId);\n            if (!product) throw new Error(\'Produto não encontrado\');\n            \n            await this.cartManager.addItem(product);\n            this.eventEmitter.emit(\'productAdded\', product);\n            \n            this.showSuccess(\`${product.name} adicionado ao carrinho!\`);\n            \n        } catch (error) {\n            console.error(\'Erro ao adicionar ao carrinho:\', error);\n            this.showError(\'Falha ao adicionar produto\');\n        }\n    }\n    \n    async checkout() {\n        if (!this.state.user) {\n            this.showError(\'Faça login para continuar\');\n            return;\n        }\n        \n        if (this.state.cart.length === 0) {\n            this.showError(\'Carrinho vazio\');\n            return;\n        }\n        \n        try {\n            const order = await this.cartManager.createOrder(this.state.user.id);\n            this.showSuccess(\`Pedido #${order.id} criado com sucesso!\`);\n            this.updateState({ cart: [] });\n            \n        } catch (error) {\n            console.error(\'Erro no checkout:\', error);\n            this.showError(\'Falha ao processar pedido\');\n        }\n    }\n    \n    render() {\n        const app = document.getElementById(\'app\');\n        \n        app.innerHTML = \`\n            <div class="ecommerce-app">\n                <header class="header">\n                    <nav class="nav">\n                        <div class="nav-brand">🛒 E-Commerce</div>\n                        <div class="nav-search">\n                            <input type="text" id="search" placeholder="Buscar produtos...">\n                        </div>\n                        <div class="nav-actions">\n                            <button class="btn btn-cart" onclick="app.showCart()">\n                                🛒 <span class="cart-count">${this.state.cart.length}</span>\n                            </button>\n                            ${this.state.user ? \`\n                                <div class="user-menu">\n                                    <img src="${this.state.user.avatar}" alt="Avatar" class="avatar">\n                                    <span>${this.state.user.name}</span>\n                                </div>\n                            \` : \`\n                                <button class="btn btn-primary" onclick="app.login()">Login</button>\n                            \`}\n                        </div>\n                    </nav>\n                </header>\n                \n                <main class="main">\n                    ${this.state.loading ? \`\n                        <div class="loading">Carregando...</div>\n                    \` : \`\n                        <div class="products-grid">\n                            ${this.state.products.map(product => \`\n                                <div class="product-card" key="${product.id}">\n                                    <img src="${product.image}" alt="${product.name}">\n                                    <h3>${product.name}</h3>\n                                    <p>${product.description}</p>\n                                    <div class="product-price">R$ ${product.price.toFixed(2)}</div>\n                                    <button class="btn btn-primary" onclick="app.addToCart(${product.id})">\n                                        Adicionar ao Carrinho\n                                    </button>\n                                </div>\n                            \`).join(\'\')}\n                        </div>\n                    \`}\n                </main>\n            </div>\n        \`;\n    }\n    \n    showSuccess(message) {\n        // Implementar toast de sucesso\n        console.log(\'✅\', message);\n    }\n    \n    showError(message) {\n        // Implementar toast de erro\n        console.error(\'❌\', message);\n    }\n}\n\n// Inicializar aplicação\nconst app = new ECommerceApp();\nwindow.app = app;\n```'
                },
                {
                    id: 14,
                    title: 'Módulos ES6 e Sistema de Importação',
                    type: 'exercise',
                    duration: '65 min',
                    content: '# 📦 MÓDULOS ES6 E SISTEMA DE IMPORTAÇÃO\n\n## 🎯 EXERCÍCIO: SISTEMA DE MÓDULOS COMPLETO\n\n### 📁 **Estrutura de Arquivos**\n\`\`\`\nsrc/\n├── main.js                 # Arquivo principal\n├── services/              # Serviços da aplicação\n│   ├── UserService.js\n│   ├── ProductService.js\n│   └── ApiService.js\n├── managers/              # Gerenciadores de estado\n│   ├── CartManager.js\n│   ├── UserManager.js\n│   └── NotificationManager.js\n├── utils/                 # Utilitários e helpers\n│   ├── EventEmitter.js\n│   ├── Storage.js\n│   ├── Validation.js\n│   └── helpers.js\n├── components/            # Componentes reutilizáveis\n│   ├── Modal.js\n│   ├── Toast.js\n│   └── Loading.js\n└── constants/             # Constantes e configurações\n    ├── config.js\n    └── constants.js\n\`\`\`\n\n### 🔧 **Arquivo Principal (main.js)**\n\`\`\`javascript\n// main.js - Ponto de entrada da aplicação\nimport { App } from \'./components/App.js\';\nimport { config } from \'./constants/config.js\';\nimport { initializeServices } from \'./services/index.js\';\nimport { setupErrorHandling } from \'./utils/ErrorHandler.js\';\n\n// Configuração global\nwindow.APP_CONFIG = config;\n\n// Inicialização da aplicação\nasync function bootstrap() {\n    try {\n        // Configurar tratamento de erros\n        setupErrorHandling();\n        \n        // Inicializar serviços\n        await initializeServices();\n        \n        // Criar e renderizar aplicação\n        const app = new App();\n        app.render();\n        \n        console.log(\'🚀 Aplicação inicializada com sucesso!\');\n        \n    } catch (error) {\n        console.error(\'❌ Falha ao inicializar aplicação:\', error);\n        showFatalError(error);\n    }\n}\n\n// Aguardar DOM estar pronto\nif (document.readyState === \'loading\') {\n    document.addEventListener(\'DOMContentLoaded\', bootstrap);\n} else {\n    bootstrap();\n}\n\`\`\`\n\n### 🛠️ **Serviços (services/)**\n\`\`\`javascript\n// services/UserService.js\nexport class UserService {\n    constructor() {\n        this.baseUrl = \'/api/users\';\n        this.currentUser = null;\n    }\n    \n    async getCurrentUser() {\n        try {\n            const token = localStorage.getItem(\'authToken\');\n            if (!token) return null;\n            \n            const response = await fetch(\`${this.baseUrl}/me\`, {\n                headers: { \'Authorization\': \`Bearer ${token}\` }\n            });\n            \n            if (!response.ok) throw new Error(\'Token inválido\');\n            \n            this.currentUser = await response.json();\n            return this.currentUser;\n            \n        } catch (error) {\n            console.error(\'Erro ao buscar usuário:\', error);\n            localStorage.removeItem(\'authToken\');\n            return null;\n        }\n    }\n    \n    async login(credentials) {\n        try {\n            const response = await fetch(\`${this.baseUrl}/login\`, {\n                method: \'POST\',\n                headers: { \'Content-Type\': \'application/json\' },\n                body: JSON.stringify(credentials)\n            });\n            \n            if (!response.ok) {\n                const error = await response.json();\n                throw new Error(error.message);\n            }\n            \n            const { user, token } = await response.json();\n            \n            localStorage.setItem(\'authToken\', token);\n            this.currentUser = user;\n            \n            return user;\n            \n        } catch (error) {\n            console.error(\'Erro no login:\', error);\n            throw error;\n        }\n    }\n    \n    async logout() {\n        try {\n            const token = localStorage.getItem(\'authToken\');\n            if (token) {\n                await fetch(\`${this.baseUrl}/logout\`, {\n                    method: \'POST\',\n                    headers: { \'Authorization\': \`Bearer ${token}\` }\n                });\n            }\n        } catch (error) {\n            console.error(\'Erro no logout:\', error);\n        } finally {\n            localStorage.removeItem(\'authToken\');\n            this.currentUser = null;\n        }\n    }\n}\n\n// services/ProductService.js\nexport class ProductService {\n    constructor() {\n        this.baseUrl = \'/api/products\';\n        this.cache = new Map();\n    }\n    \n    async getProducts(filters = {}) {\n        const cacheKey = JSON.stringify(filters);\n        \n        if (this.cache.has(cacheKey)) {\n            return this.cache.get(cacheKey);\n        }\n        \n        try {\n            const queryParams = new URLSearchParams(filters);\n            const response = await fetch(\`${this.baseUrl}?${queryParams}\`);\n            \n            if (!response.ok) throw new Error(\'Falha ao buscar produtos\');\n            \n            const products = await response.json();\n            \n            // Cache por 5 minutos\n            setTimeout(() => this.cache.delete(cacheKey), 5 * 60 * 1000);\n            this.cache.set(cacheKey, products);\n            \n            return products;\n            \n        } catch (error) {\n            console.error(\'Erro ao buscar produtos:\', error);\n            throw error;\n        }\n    }\n    \n    async searchProducts(query) {\n        return this.getProducts({ search: query });\n    }\n}\n\n// services/index.js - Barrel export\nexport { UserService } from \'./UserService.js\';\nexport { ProductService } from \'./ProductService.js\';\nexport { ApiService } from \'./ApiService.js\';\n\`\`\`\n\n### 🎯 **Gerenciadores (managers/)**\n\`\`\`javascript\n// managers/CartManager.js\nexport class CartManager {\n    constructor() {\n        this.items = this.loadFromStorage();\n        this.eventEmitter = null;\n    }\n    \n    setEventEmitter(eventEmitter) {\n        this.eventEmitter = eventEmitter;\n    }\n    \n    addItem(product, quantity = 1) {\n        const existingItem = this.items.find(item => item.id === product.id);\n        \n        if (existingItem) {\n            existingItem.quantity += quantity;\n        } else {\n            this.items.push({\n                ...product,\n                quantity,\n                addedAt: new Date()\n            });\n        }\n        \n        this.saveToStorage();\n        this.emitChange();\n        \n        return this.items;\n    }\n    \n    removeItem(productId) {\n        this.items = this.items.filter(item => item.id !== productId);\n        this.saveToStorage();\n        this.emitChange();\n        \n        return this.items;\n    }\n    \n    updateQuantity(productId, quantity) {\n        const item = this.items.find(item => item.id === productId);\n        if (item) {\n            if (quantity <= 0) {\n                this.removeItem(productId);\n            } else {\n                item.quantity = quantity;\n                this.saveToStorage();\n                this.emitChange();\n            }\n        }\n        \n        return this.items;\n    }\n    \n    getTotal() {\n        return this.items.reduce((total, item) => {\n            return total + (item.price * item.quantity);\n        }, 0);\n    }\n    \n    clear() {\n        this.items = [];\n        this.saveToStorage();\n        this.emitChange();\n    }\n    \n    loadFromStorage() {\n        try {\n            const stored = localStorage.getItem(\'cart\');\n            return stored ? JSON.parse(stored) : [];\n        } catch (error) {\n            console.error(\'Erro ao carregar carrinho:\', error);\n            return [];\n        }\n    }\n    \n    saveToStorage() {\n        try {\n            localStorage.setItem(\'cart\', JSON.stringify(this.items));\n        } catch (error) {\n            console.error(\'Erro ao salvar carrinho:\', error);\n        }\n    }\n    \n    emitChange() {\n        if (this.eventEmitter) {\n            this.eventEmitter.emit(\'cartChanged\', {\n                items: this.items,\n                total: this.getTotal()\n            });\n        }\n    }\n}\n\`\`\`\n\n### 🧰 **Utilitários (utils/)**\n\`\`\`javascript\n// utils/EventEmitter.js\nexport class EventEmitter {\n    constructor() {\n        this.events = {};\n    }\n    \n    on(event, callback) {\n        if (!this.events[event]) {\n            this.events[event] = [];\n        }\n        this.events[event].push(callback);\n    }\n    \n    off(event, callback) {\n        if (!this.events[event]) return;\n        \n        this.events[event] = this.events[event].filter(cb => cb !== callback);\n    }\n    \n    emit(event, data) {\n        if (!this.events[event]) return;\n        \n        this.events[event].forEach(callback => {\n            try {\n                callback(data);\n            } catch (error) {\n                console.error(\`Erro no evento ${event}:\`, error);\n            }\n        });\n    }\n    \n    once(event, callback) {\n        const onceCallback = (data) => {\n            callback(data);\n            this.off(event, onceCallback);\n        };\n        this.on(event, onceCallback);\n    }\n}\n\n// utils/helpers.js\nexport const debounce = (func, wait) => {\n    let timeout;\n    return function executedFunction(...args) {\n        const later = () => {\n            clearTimeout(timeout);\n            func(...args);\n        };\n        clearTimeout(timeout);\n        timeout = setTimeout(later, wait);\n    };\n};\n\nexport const throttle = (func, limit) => {\n    let inThrottle;\n    return function() {\n        const args = arguments;\n        const context = this;\n        if (!inThrottle) {\n            func.apply(context, args);\n            inThrottle = true;\n            setTimeout(() => inThrottle = false, limit);\n        }\n    };\n};\n\nexport const deepClone = (obj) => {\n    if (obj === null || typeof obj !== \'object\') return obj;\n    if (obj instanceof Date) return new Date(obj.getTime());\n    if (obj instanceof Array) return obj.map(item => deepClone(item));\n    if (typeof obj === \'object\') {\n        const clonedObj = {};\n        for (const key in obj) {\n            if (obj.hasOwnProperty(key)) {\n                clonedObj[key] = deepClone(obj[key]);\n            }\n        }\n        return clonedObj;\n    }\n};\n\`\`\`\n\n### 📋 **Constantes (constants/)**\n\`\`\`javascript\n// constants/config.js\nexport const config = {\n    api: {\n        baseUrl: process.env.NODE_ENV === \'production\' \n            ? \'https://api.exemplo.com\' \n            : \'http://localhost:3000\',\n        timeout: 10000,\n        retries: 3\n    },\n    \n    app: {\n        name: \'E-Commerce App\',\n        version: \'1.0.0\',\n        debug: process.env.NODE_ENV !== \'production\'\n    },\n    \n    storage: {\n        prefix: \'ecommerce_\',\n        expiration: 24 * 60 * 60 * 1000 // 24 horas\n    }\n};\n\n// constants/constants.js\nexport const EVENTS = {\n    USER_LOGIN: \'userLogin\',\n    USER_LOGOUT: \'userLogout\',\n    CART_UPDATE: \'cartUpdate\',\n    PRODUCT_ADD: \'productAdd\',\n    PRODUCT_REMOVE: \'productRemove\'\n};\n\nexport const HTTP_STATUS = {\n    OK: 200,\n    CREATED: 201,\n    NO_CONTENT: 204,\n    BAD_REQUEST: 400,\n    UNAUTHORIZED: 401,\n    FORBIDDEN: 403,\n    NOT_FOUND: 404,\n    INTERNAL_SERVER_ERROR: 500\n};\n\nexport const VALIDATION_RULES = {\n    EMAIL: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,\n    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$/,\n    PHONE: /^[0-9]{2}[0-9]{4,5}[0-9]{4}$/\n};\n\`\`\`'
                },
                {
                    id: 15,
                    title: 'Ferramentas e Workflow',
                    type: 'exercise',
                    duration: '40 min',
                    content: '# 🔧 FERRAMENTAS E WORKFLOW\n\n## 🎯 GIT E CONTROLE DE VERSÃO\n```bash\n# Configuração inicial\ngit config --global user.name "Seu Nome"\ngit config --global user.email "seu@email.com"\n\n# Inicializar repositório\nmkdir meu-projeto\ncd meu-projeto\ngit init\n\n# Primeiro commit\ngit add .\ngit commit -m "Commit inicial: Estrutura básica do projeto"\n\n# Criar branch para feature\ngit checkout -b feature/nova-funcionalidade\n\n# Fazer alterações e commitar\ngit add .\ngit commit -m "Adiciona nova funcionalidade"\n\n# Voltar para main e fazer merge\ngit checkout main\ngit merge feature/nova-funcionalidade\n\n# Deletar branch da feature\ngit branch -d feature/nova-funcionalidade\n\n# Ver histórico\ngit log --oneline --graph --all\n\n# Desfazer último commit (mantendo alterações)\ngit reset --soft HEAD~1\n\n# Desfazer alterações em arquivo específico\ngit checkout -- nome-do-arquivo\n\n# Stash de alterações temporárias\ngit stash\ngit stash pop\n```'
                },
                {
                    id: 16,
                    title: 'DevTools e Debugging',
                    type: 'exercise',
                    duration: '50 min',
                    content: '# 🐛 DEVTOOLS E DEBUGGING\n\n## 🎯 EXERCÍCIO: DEBUGGING AVANÇADO\n```javascript\n// Função com bug para debugging\nfunction calculateTotal(items) {\n    console.group(\'Calculando total\');\n    console.log(\'Items recebidos:\', items);\n    \n    let total = 0;\n    \n    for (let i = 0; i < items.length; i++) {\n        const item = items[i];\n        console.log(`Processando item ${i}:`, item);\n        \n        // Bug: não está verificando se price existe\n        if (item.price && typeof item.price === \'number\') {\n            total += item.price;\n            console.log(`Preço adicionado: ${item.price}, Total atual: ${total}`);\n        } else {\n            console.warn(`Item sem preço válido:`, item);\n        }\n    }\n    \n    console.log(\'Total final:\', total);\n    console.groupEnd();\n    \n    return total;\n}\n\n// Dados de teste\nconst testItems = [\n    { name: \'Laptop\', price: 2500 },\n    { name: \'Mouse\', price: 89.90 },\n    { name: \'Teclado\', price: \'199.90\' }, // Bug: string em vez de number\n    { name: \'Monitor\', price: 899.90 },\n    { name: \'Cabo\', price: null }, // Bug: preço null\n    { name: \'Adaptador\' } // Bug: sem preço\n];\n\n// Testar função\nconsole.log(\'=== TESTE DA FUNÇÃO ===\');\nconst result = calculateTotal(testItems);\nconsole.log(\'Resultado final:\', result);\n\n// Função melhorada com validação\nfunction calculateTotalImproved(items) {\n    if (!Array.isArray(items)) {\n        throw new Error(\'Items deve ser um array\');\n    }\n    \n    return items.reduce((total, item, index) => {\n        if (!item || typeof item !== \'object\') {\n            console.warn(`Item inválido no índice ${index}:`, item);\n            return total;\n        }\n        \n        const price = parseFloat(item.price);\n        if (isNaN(price) || price < 0) {\n            console.warn(`Preço inválido para item ${index}:`, item.price);\n            return total;\n        }\n        \n        return total + price;\n    }, 0);\n}\n\n// Testar função melhorada\nconsole.log(\'\\n=== TESTE DA FUNÇÃO MELHORADA ===\');\ntry {\n    const improvedResult = calculateTotalImproved(testItems);\n    console.log(\'Resultado melhorado:\', improvedResult);\n} catch (error) {\n    console.error(\'Erro na função melhorada:\', error);\n}\n\n// Performance profiling\nconsole.log(\'\\n=== PERFORMANCE PROFILING ===\');\n\n// Teste de performance\nconst largeArray = Array.from({ length: 10000 }, (_, i) => ({\n    name: `Item ${i}`,\n    price: Math.random() * 1000\n}));\n\nconsole.time(\'calculateTotal\');\nconst largeResult = calculateTotal(largeArray);\nconsole.timeEnd(\'calculateTotal\');\n\nconsole.time(\'calculateTotalImproved\');\nconst largeImprovedResult = calculateTotalImproved(largeArray);\nconsole.timeEnd(\'calculateTotalImproved\');\n\nconsole.log(\'Diferença nos resultados:\', Math.abs(largeResult - largeImprovedResult));\n```'
                },
                {
                    id: 27,
                    title: 'Async/Await e Promises Avançadas',
                    type: 'exercise',
                    duration: '70 min',
                    content: '# ⚡ ASYNC/AWAIT E PROMISES AVANÇADAS\n\n## 🎯 EXERCÍCIO: SISTEMA DE REQUISIÇÕES ASSÍNCRONAS\n\n### 🔄 **Promise Utilities**\n\`\`\`javascript\n// utils/PromiseUtils.js\nexport class PromiseUtils {\n    static async retry(fn, maxRetries = 3, baseDelay = 1000) {\n        let lastError;\n        for (let attempt = 1; attempt <= maxRetries; attempt++) {\n            try {\n                return await fn();\n            } catch (error) {\n                lastError = error;\n                if (attempt === maxRetries) {\n                    throw new Error(\`Falha após ${maxRetries} tentativas: ${error.message}\`);\n                }\n                const delay = baseDelay * Math.pow(2, attempt - 1);\n                await this.sleep(delay);\n            }\n        }\n    }\n    \n    static timeout(promise, ms) {\n        return Promise.race([\n            promise,\n            new Promise((_, reject) => \n                setTimeout(() => reject(new Error(\'Timeout\')), ms)\n            )\n        ]);\n    }\n    \n    static sleep(ms) {\n        return new Promise(resolve => setTimeout(resolve, ms));\n    }\n}\n\`\`\`'
                },
                {
                    id: 28,
                    title: 'Manipulação Avançada do DOM',
                    type: 'exercise',
                    duration: '65 min',
                    content: '# 🌳 MANIPULAÇÃO AVANÇADA DO DOM\n\n## 🎯 EXERCÍCIO: SISTEMA DE COMPONENTES\n\`\`\`javascript\nclass Component {\n    constructor(element, props = {}) {\n        this.element = element;\n        this.props = props;\n        this.state = {};\n        this.children = new Map();\n        this.init();\n    }\n    \n    init() {\n        this.render();\n        this.bindEvents();\n    }\n    \n    setState(newState) {\n        this.state = { ...this.state, ...newState };\n        this.render();\n    }\n    \n    render() {\n        // Implementação específica do componente\n    }\n    \n    bindEvents() {\n        // Binding de eventos específicos\n    }\n    \n    destroy() {\n        this.element.remove();\n    }\n}\n\`\`\`'
                },
                {
                    id: 29,
                    title: 'Sistema de Eventos Customizados',
                    type: 'exercise',
                    duration: '60 min',
                    content: '# 🎯 SISTEMA DE EVENTOS CUSTOMIZADOS\n\n## 🎯 EXERCÍCIO: EVENT BUS\n\`\`\`javascript\nclass EventBus {\n    constructor() {\n        this.events = {};\n    }\n    \n    on(event, callback) {\n        if (!this.events[event]) {\n            this.events[event] = [];\n        }\n        this.events[event].push(callback);\n    }\n    \n    emit(event, data) {\n        if (this.events[event]) {\n            this.events[event].forEach(callback => callback(data));\n        }\n    }\n    \n    off(event, callback) {\n        if (this.events[event]) {\n            this.events[event] = this.events[event].filter(cb => cb !== callback);\n        }\n    }\n}\n\`\`\`'
                },
                {
                    id: 30,
                    title: 'Validação e Formulários Avançados',
                    type: 'exercise',
                    duration: '70 min',
                    content: '# ✅ VALIDAÇÃO E FORMULÁRIOS AVANÇADOS\n\n## 🎯 EXERCÍCIO: SISTEMA DE VALIDAÇÃO\n\`\`\`javascript\nclass FormValidator {\n    constructor(form, rules) {\n        this.form = form;\n        this.rules = rules;\n        this.errors = new Map();\n        this.init();\n    }\n    \n    init() {\n        this.form.addEventListener(\'submit\', this.handleSubmit.bind(this));\n        this.form.querySelectorAll(\'input\').forEach(input => {\n            input.addEventListener(\'blur\', this.validateField.bind(this, input));\n            input.addEventListener(\'input\', this.clearFieldError.bind(this, input));\n        });\n    }\n    \n    validateField(field) {\n        const fieldName = field.name;\n        const value = field.value.trim();\n        const fieldRules = this.rules[fieldName];\n        \n        if (!fieldRules) return true;\n        \n        for (const rule of fieldRules) {\n            if (!this.validateRule(value, rule)) {\n                this.showFieldError(field, rule.message);\n                return false;\n            }\n        }\n        \n        this.clearFieldError(field);\n        return true;\n    }\n    \n    validateRule(value, rule) {\n        switch (rule.type) {\n            case \'required\':\n                return value.length > 0;\n            case \'minLength\':\n                return value.length >= rule.value;\n            case \'maxLength\':\n                return value.length <= rule.value;\n            case \'pattern\':\n                return rule.value.test(value);\n            case \'custom\':\n                return rule.value(value);\n            default:\n                return true;\n        }\n    }\n}\n\`\`\`'
                },
                {
                    id: 31,
                    title: 'Git e Controle de Versão Avançado',
                    type: 'exercise',
                    duration: '75 min',
                    content: '# 🔧 GIT E CONTROLE DE VERSÃO AVANÇADO\n\n## 🎯 EXERCÍCIO: WORKFLOW GIT PROFISSIONAL\n\`\`\`bash\n# Configuração inicial\ngit config --global user.name "Seu Nome"\ngit config --global user.email "seu@email.com"\ngit config --global init.defaultBranch main\n\n# Workflow de feature branch\n# 1. Criar branch para nova funcionalidade\ngit checkout -b feature/nova-funcionalidade\n\n# 2. Desenvolver e fazer commits frequentes\ngit add .\ngit commit -m "feat: adiciona validação de formulário"\n\ngit add .\ngit commit -m "feat: implementa sistema de notificações"\n\ngit add .\ngit commit -m "test: adiciona testes para validação"\n\n# 3. Fazer push da branch\ngit push origin feature/nova-funcionalidade\n\n# 4. Criar Pull Request no GitHub\n# 5. Code review e merge\n# 6. Deletar branch local\ngit checkout main\ngit pull origin main\ngit branch -d feature/nova-funcionalidade\n\`\`\`'
                },
                {
                    id: 32,
                    title: 'DevTools e Debugging Profissional',
                    type: 'exercise',
                    duration: '70 min',
                    content: '# 🐛 DEVTOOLS E DEBUGGING PROFISSIONAL\n\n## 🎯 EXERCÍCIO: DEBUGGING AVANÇADO\n\`\`\`javascript\n// Função com bug para debugging\nfunction calculateTotal(items) {\n    console.group(\'Calculando total\');\n    console.log(\'Items recebidos:\', items);\n    \n    let total = 0;\n    \n    for (let i = 0; i < items.length; i++) {\n        const item = items[i];\n        console.log(`Processando item ${i}:`, item);\n        \n        // Bug: não está verificando se price existe\n        if (item.price && typeof item.price === \'number\') {\n            total += item.price;\n            console.log(`Preço adicionado: ${item.price}, Total atual: ${total}`);\n        } else {\n            console.warn(`Item sem preço válido:`, item);\n        }\n    }\n    \n    console.log(\'Total final:\', total);\n    console.groupEnd();\n    \n    return total;\n}\n\n// Dados de teste\nconst testItems = [\n    { name: \'Laptop\', price: 2500 },\n    { name: \'Mouse\', price: 89.90 },\n    { name: \'Teclado\', price: \'199.90\' }, // Bug: string em vez de number\n    { name: \'Monitor\', price: 899.90 },\n    { name: \'Cabo\', price: null }, // Bug: preço null\n    { name: \'Adaptador\' } // Bug: sem preço\n];\n\n// Testar função\nconsole.log(\'=== TESTE DA FUNÇÃO ===\');\nconst result = calculateTotal(testItems);\nconsole.log(\'Resultado final:\', result);\n\`\`\`'
                },
                {
                    id: 33,
                    title: 'Performance e Otimização Web',
                    type: 'exercise',
                    duration: '65 min',
                    content: '# ⚡ PERFORMANCE E OTIMIZAÇÃO WEB\n\n## 🎯 EXERCÍCIO: OTIMIZAÇÃO DE PERFORMANCE\n\`\`\`javascript\n// Classe para monitoramento de performance\nclass PerformanceMonitor {\n    constructor() {\n        this.metrics = {};\n        this.observers = [];\n        this.init();\n    }\n    \n    init() {\n        // Observer para mudanças de performance\n        if (\'PerformanceObserver\' in window) {\n            const observer = new PerformanceObserver((list) => {\n                for (const entry of list.getEntries()) {\n                    this.recordMetric(entry.name, entry.duration);\n                }\n            });\n            \n            observer.observe({ entryTypes: [\'measure\', \'navigation\'] });\n        }\n        \n        // Monitorar Core Web Vitals\n        this.observeCoreWebVitals();\n    }\n    \n    observeCoreWebVitals() {\n        // LCP (Largest Contentful Paint)\n        if (\'PerformanceObserver\' in window) {\n            const lcpObserver = new PerformanceObserver((list) => {\n                const entries = list.getEntries();\n                const lastEntry = entries[entries.length - 1];\n                this.recordMetric(\'LCP\', lastEntry.startTime);\n            });\n            lcpObserver.observe({ entryTypes: [\'largest-contentful-paint\'] });\n        }\n        \n        // FID (First Input Delay)\n        if (\'PerformanceObserver\' in window) {\n            const fidObserver = new PerformanceObserver((list) => {\n                for (const entry of list.getEntries()) {\n                    this.recordMetric(\'FID\', entry.processingStart - entry.startTime);\n                }\n            });\n            fidObserver.observe({ entryTypes: [\'first-input\'] });\n        }\n        \n        // CLS (Cumulative Layout Shift)\n        if (\'PerformanceObserver\' in window) {\n            let clsValue = 0;\n            const clsObserver = new PerformanceObserver((list) => {\n                for (const entry of list.getEntries()) {\n                    if (!entry.hadRecentInput) {\n                        clsValue += entry.value;\n                    }\n                }\n                this.recordMetric(\'CLS\', clsValue);\n            });\n            clsObserver.observe({ entryTypes: [\'layout-shift\'] });\n        }\n    }\n    \n    recordMetric(name, value) {\n        if (!this.metrics[name]) {\n            this.metrics[name] = [];\n        }\n        this.metrics[name].push(value);\n        \n        // Notificar observadores\n        this.notifyObservers(name, value);\n    }\n    \n    getMetric(name) {\n        const values = this.metrics[name];\n        if (!values || values.length === 0) return null;\n        \n        return {\n            current: values[values.length - 1],\n            average: values.reduce((a, b) => a + b, 0) / values.length,\n            min: Math.min(...values),\n            max: Math.max(...values),\n            count: values.length\n        };\n    }\n    \n    addObserver(callback) {\n        this.observers.push(callback);\n    }\n    \n    notifyObservers(name, value) {\n        this.observers.forEach(callback => {\n            try {\n                callback(name, value);\n            } catch (error) {\n                console.error(\'Erro no observer:\', error);\n            }\n        });\n    }\n}\n\`\`\`'
                },
                {
                    id: 34,
                    title: 'Deploy e Hosting Profissional',
                    type: 'exercise',
                    duration: '60 min',
                    content: '# 🚀 DEPLOY E HOSTING PROFISSIONAL\n\n## 🎯 EXERCÍCIO: PIPELINE DE DEPLOY\n\`\`\`yaml\n# .github/workflows/deploy.yml\nname: Deploy to Production\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3\n    - name: Setup Node.js\n      uses: actions/setup-node@v3\n      with:\n        node-version: \'18\'\n        cache: \'npm\'\n    - name: Install dependencies\n      run: npm ci\n    - name: Run tests\n      run: npm test\n    - name: Run linting\n      run: npm run lint\n    - name: Build project\n      run: npm run build\n\n  deploy:\n    needs: test\n    runs-on: ubuntu-latest\n    if: github.ref == \'refs/heads/main\'\n    steps:\n    - uses: actions/checkout@v3\n    - name: Deploy to Vercel\n      uses: amondnet/vercel-action@v20\n      with:\n        vercel-token: ${{ secrets.VERCEL_TOKEN }}\n        vercel-org-id: ${{ secrets.ORG_ID }}\n        vercel-project-id: ${{ secrets.PROJECT_ID }}\n        vercel-args: \'--prod\'\n\`\`\`'
                },
                {
                    id: 35,
                    title: 'Portfolio Pessoal Responsivo',
                    type: 'project',
                    duration: '120 min',
                    content: '# 🎨 PROJETO: PORTFOLIO PESSOAL RESPONSIVO\n\n## 🎯 OBJETIVOS\n- Criar um portfolio profissional e responsivo\n- Implementar design moderno e acessível\n- Adicionar interatividade com JavaScript\n- Otimizar para SEO e performance\n\n## 📋 ESTRUTURA DO PROJETO\n\`\`\`html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="Portfolio de João Silva - Desenvolvedor Web Full Stack">\n    <meta name="keywords" content="desenvolvedor, web, frontend, backend, portfolio">\n    <title>João Silva - Desenvolvedor Web</title>\n    <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n    <!-- Header com navegação -->\n    <header class="header">\n        <nav class="nav">\n            <div class="nav-brand">JS</div>\n            <ul class="nav-menu">\n                <li><a href="#home" class="nav-link">Home</a></li>\n                <li><a href="#about" class="nav-link">Sobre</a></li>\n                <li><a href="#projects" class="nav-link">Projetos</a></li>\n                <li><a href="#skills" class="nav-link">Habilidades</a></li>\n                <li><a href="#contact" class="nav-link">Contato</a></li>\n            </ul>\n            <button class="nav-toggle" aria-label="Menu">☰</button>\n        </nav>\n    </header>\n    \n    <!-- Seção Hero -->\n    <section id="home" class="hero">\n        <div class="hero-content">\n            <h1 class="hero-title">João Silva</h1>\n            <p class="hero-subtitle">Desenvolvedor Web Full Stack</p>\n            <p class="hero-description">\n                Transformando ideias em experiências digitais incríveis\n            </p>\n            <div class="hero-buttons">\n                <a href="#projects" class="btn btn-primary">Ver Projetos</a>\n                <a href="#contact" class="btn btn-secondary">Contato</a>\n            </div>\n        </div>\n        <div class="hero-image">\n            <img src="profile.jpg" alt="João Silva" class="profile-img">\n        </div>\n    </section>\n    \n    <!-- Seção Sobre -->\n    <section id="about" class="about">\n        <div class="container">\n            <h2 class="section-title">Sobre Mim</h2>\n            <div class="about-content">\n                <div class="about-text">\n                    <p>Sou um desenvolvedor web apaixonado por criar soluções inovadoras...</p>\n                    <p>Com 5 anos de experiência, já trabalhei em projetos para empresas...</p>\n                </div>\n                <div class="about-stats">\n                    <div class="stat">\n                        <span class="stat-number">50+</span>\n                        <span class="stat-label">Projetos</span>\n                    </div>\n                    <div class="stat">\n                        <span class="stat-number">5</span>\n                        <span class="stat-label">Anos Exp.</span>\n                    </div>\n                    <div class="stat">\n                        <span class="stat-number">30+</span>\n                        <span class="stat-label">Clientes</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n    \n    <!-- Seção Projetos -->\n    <section id="projects" class="projects">\n        <div class="container">\n            <h2 class="section-title">Meus Projetos</h2>\n            <div class="projects-grid" id="projects-grid">\n                <!-- Projetos serão carregados via JavaScript -->\n            </div>\n        </div>\n    </section>\n    \n    <!-- Seção Habilidades -->\n    <section id="skills" class="skills">\n        <div class="container">\n            <h2 class="section-title">Habilidades</h2>\n            <div class="skills-grid">\n                <div class="skill-category">\n                    <h3>Frontend</h3>\n                    <div class="skill-items">\n                        <span class="skill-item">HTML5</span>\n                        <span class="skill-item">CSS3</span>\n                        <span class="skill-item">JavaScript</span>\n                        <span class="skill-item">React</span>\n                        <span class="skill-item">Vue.js</span>\n                    </div>\n                </div>\n                <div class="skill-category">\n                    <h3>Backend</h3>\n                    <div class="skill-items">\n                        <span class="skill-item">Node.js</span>\n                        <span class="skill-item">Python</span>\n                        <span class="skill-item">PHP</span>\n                        <span class="skill-item">MySQL</span>\n                        <span class="skill-item">MongoDB</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n    \n    <!-- Seção Contato -->\n    <section id="contact" class="contact">\n        <div class="container">\n            <h2 class="section-title">Entre em Contato</h2>\n            <div class="contact-content">\n                <div class="contact-info">\n                    <h3>Informações de Contato</h3>\n                    <p>📧 joao@email.com</p>\n                    <p>📱 (11) 99999-9999</p>\n                    <p>📍 São Paulo, SP</p>\n                </div>\n                <form class="contact-form" id="contact-form">\n                    <div class="form-group">\n                        <label for="name">Nome</label>\n                        <input type="text" id="name" name="name" required>\n                    </div>\n                    <div class="form-group">\n                        <label for="email">Email</label>\n                        <input type="email" id="email" name="email" required>\n                    </div>\n                    <div class="form-group">\n                        <label for="message">Mensagem</label>\n                        <textarea id="message" name="message" rows="5" required></textarea>\n                    </div>\n                    <button type="submit" class="btn btn-primary">Enviar Mensagem</button>\n                </form>\n            </div>\n        </div>\n    </section>\n    \n    <!-- Footer -->\n    <footer class="footer">\n        <div class="container">\n            <p>&copy; 2025 João Silva. Todos os direitos reservados.</p>\n        </div>\n    </footer>\n    \n    <script src="script.js"></script>\n</body>\n</html>\n\`\`\`'
                },
                {
                    id: 36,
                    title: 'Landing Page para Produto',
                    type: 'project',
                    duration: '150 min',
                    content: '# 🚀 PROJETO: LANDING PAGE PARA PRODUTO\n\n## 🎯 OBJETIVOS\n- Criar uma landing page persuasiva e conversiva\n- Implementar design responsivo e otimizado para conversão\n- Adicionar funcionalidades interativas e formulários\n- Aplicar princípios de UX/UI e copywriting\n\n## 📋 ESTRUTURA DO PROJETO\n\`\`\`html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="Descubra o produto revolucionário que vai transformar sua vida">\n    <title>Produto Revolucionário - Transforme sua Vida Hoje</title>\n    <link rel="stylesheet" href="landing.css">\n</head>\n<body>\n    <!-- Header com CTA principal -->\n    <header class="hero-header">\n        <nav class="nav">\n            <div class="logo">ProdutoX</div>\n            <div class="nav-cta">\n                <a href="#cta" class="btn btn-secondary">Começar Agora</a>\n            </div>\n        </nav>\n        \n        <div class="hero-section">\n            <div class="hero-content">\n                <h1 class="hero-title">Transforme sua Vida em 30 Dias</h1>\n                <p class="hero-subtitle">\n                    Descubra o método comprovado que já ajudou mais de 10.000 pessoas\n                </p>\n                <div class="hero-benefits">\n                    <div class="benefit">✅ Resultados em 30 dias</div>\n                    <div class="benefit">✅ Garantia de 100 dias</div>\n                    <div class="benefit">✅ Suporte 24/7</div>\n                </div>\n                <div class="hero-cta">\n                    <a href="#cta" class="btn btn-primary btn-large">\n                        Quero Começar Agora - R$ 97\n                    </a>\n                    <p class="cta-note">Oferta por tempo limitado</p>\n                </div>\n            </div>\n            <div class="hero-image">\n                <img src="product-hero.jpg" alt="Produto em ação">\n            </div>\n        </div>\n    </header>\n    \n    <!-- Seção de Benefícios -->\n    <section class="benefits">\n        <div class="container">\n            <h2>Por que escolher nosso produto?</h2>\n            <div class="benefits-grid">\n                <div class="benefit-card">\n                    <div class="benefit-icon">🚀</div>\n                    <h3>Resultados Rápidos</h3>\n                    <p>Veja mudanças significativas em apenas 30 dias</p>\n                </div>\n                <div class="benefit-card">\n                    <div class="benefit-icon">💎</div>\n                    <h3>Qualidade Premium</h3>\n                    <p>Material de alta qualidade com metodologia comprovada</p>\n                </div>\n                <div class="benefit-card">\n                    <div class="benefit-icon">🎯</div>\n                    <h3>Foco no Sucesso</h3>\n                    <p>Estratégias específicas para seu objetivo</p>\n                </div>\n            </div>\n        </div>\n    </section>\n    \n    <!-- Seção de Depoimentos -->\n    <section class="testimonials">\n        <div class="container">\n            <h2>O que nossos clientes dizem</h2>\n            <div class="testimonials-grid">\n                <div class="testimonial-card">\n                    <div class="testimonial-content">\n                        "Transformou completamente minha abordagem. Resultados incríveis!"\n                    </div>\n                    <div class="testimonial-author">\n                        <img src="client1.jpg" alt="Cliente 1">\n                        <div>\n                            <strong>Maria Silva</strong>\n                            <span>Empresária</span>\n                        </div>\n                    </div>\n                </div>\n                <!-- Mais depoimentos... -->\n            </div>\n        </div>\n    </section>\n    \n    <!-- Seção CTA Final -->\n    <section id="cta" class="final-cta">\n        <div class="container">\n            <h2>Pronto para transformar sua vida?</h2>\n            <p>Junte-se a mais de 10.000 pessoas que já transformaram suas vidas</p>\n            \n            <div class="pricing-card">\n                <div class="price">\n                    <span class="original-price">R$ 197</span>\n                    <span class="current-price">R$ 97</span>\n                    <span class="discount">50% OFF</span>\n                </div>\n                \n                <div class="features">\n                    <div class="feature">✅ Acesso vitalício ao curso</div>\n                    <div class="feature">✅ 30 dias de garantia</div>\n                    <div class="feature">✅ Suporte premium</div>\n                    <div class="feature">✅ Bônus exclusivos</div>\n                </div>\n                \n                <form class="purchase-form" id="purchase-form">\n                    <input type="text" placeholder="Nome completo" required>\n                    <input type="email" placeholder="Email" required>\n                    <button type="submit" class="btn btn-primary btn-large">\n                        Quero Transformar Minha Vida\n                    </button>\n                </form>\n                \n                <p class="guarantee">\n                    🔒 Pagamento 100% seguro | ⏰ Oferta por tempo limitado\n                </p>\n            </div>\n        </div>\n    </section>\n    \n    <!-- Footer -->\n    <footer class="footer">\n        <div class="container">\n            <p>&copy; 2025 ProdutoX. Todos os direitos reservados.</p>\n        </div>\n    </footer>\n    \n    <script src="landing.js"></script>\n</body>\n</html>\n\`\`\`'
                },
                {
                    id: 37,
                    title: 'Dashboard Interativo',
                    type: 'project',
                    duration: '180 min',
                    content: '# 📊 PROJETO: DASHBOARD INTERATIVO\n\n## 🎯 OBJETIVOS\n- Criar um dashboard administrativo completo e responsivo\n- Implementar visualizações de dados interativas\n- Adicionar funcionalidades de CRUD e filtros\n- Aplicar princípios de design de interfaces administrativas\n\n## 📋 ESTRUTURA DO PROJETO\n\`\`\`html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Dashboard Admin - Fenix Academy</title>\n    <link rel="stylesheet" href="dashboard.css">\n    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n</head>\n<body>\n    <div class="dashboard-container">\n        <!-- Sidebar de Navegação -->\n        <aside class="sidebar">\n            <div class="sidebar-header">\n                <h2>Fenix Academy</h2>\n            </div>\n            <nav class="sidebar-nav">\n                <ul>\n                    <li class="nav-item active">\n                        <a href="#overview">📊 Visão Geral</a>\n                    </li>\n                    <li class="nav-item">\n                        <a href="#users">👥 Usuários</a>\n                    </li>\n                    <li class="nav-item">\n                        <a href="#courses">📚 Cursos</a>\n                    </li>\n                    <li class="nav-item">\n                        <a href="#analytics">📈 Analytics</a>\n                    </li>\n                    <li class="nav-item">\n                        <a href="#settings">⚙️ Configurações</a>\n                    </li>\n                </ul>\n            </nav>\n        </aside>\n        \n        <!-- Conteúdo Principal -->\n        <main class="main-content">\n            <!-- Header com Estatísticas -->\n            <header class="dashboard-header">\n                <h1>Dashboard Administrativo</h1>\n                <div class="stats-overview">\n                    <div class="stat-card">\n                        <div class="stat-icon">👥</div>\n                        <div class="stat-content">\n                            <span class="stat-number">1,247</span>\n                            <span class="stat-label">Usuários Ativos</span>\n                        </div>\n                    </div>\n                    <div class="stat-card">\n                        <div class="stat-icon">📚</div>\n                        <div class="stat-content">\n                            <span class="stat-number">8</span>\n                            <span class="stat-label">Cursos Disponíveis</span>\n                        </div>\n                    </div>\n                    <div class="stat-card">\n                        <div class="stat-icon">🎯</div>\n                        <div class="stat-content">\n                            <span class="stat-number">89%</span>\n                            <span class="stat-label">Taxa de Conclusão</span>\n                        </div>\n                    </div>\n                    <div class="stat-card">\n                        <div class="stat-icon">💰</div>\n                        <div class="stat-content">\n                            <span class="stat-number">R$ 45.2k</span>\n                            <span class="stat-label">Receita Mensal</span>\n                        </div>\n                    </div>\n                </div>\n            </header>\n            \n            <!-- Seção de Gráficos -->\n            <section class="charts-section">\n                <div class="chart-container">\n                    <h3>Usuários por Mês</h3>\n                    <canvas id="usersChart"></canvas>\n                </div>\n                <div class="chart-container">\n                    <h3>Distribuição por Curso</h3>\n                    <canvas id="coursesChart"></canvas>\n                </div>\n            </section>\n            \n            <!-- Tabela de Usuários Recentes -->\n            <section class="recent-users">\n                <div class="section-header">\n                    <h3>Usuários Recentes</h3>\n                    <button class="btn btn-primary" onclick="addUser()">+ Novo Usuário</button>\n                </div>\n                <div class="table-container">\n                    <table class="data-table">\n                        <thead>\n                            <tr>\n                                <th>Nome</th>\n                                <th>Email</th>\n                                <th>Curso</th>\n                                <th>Progresso</th>\n                                <th>Status</th>\n                                <th>Ações</th>\n                            </tr>\n                        </thead>\n                        <tbody id="users-table-body">\n                            <!-- Dados serão carregados via JavaScript -->\n                        </tbody>\n                    </table>\n                </div>\n            </section>\n            \n            <!-- Seção de Atividades -->\n            <section class="activity-feed">\n                <h3>Atividades Recentes</h3>\n                <div class="activity-list" id="activity-list">\n                    <!-- Atividades serão carregadas via JavaScript -->\n                </div>\n            </section>\n        </main>\n    </div>\n    \n    <!-- Modal para Adicionar/Editar Usuário -->\n    <div id="user-modal" class="modal">\n        <div class="modal-content">\n            <div class="modal-header">\n                <h3>Adicionar Usuário</h3>\n                <span class="close">&times;</span>\n            </div>\n            <form id="user-form">\n                <div class="form-group">\n                    <label for="user-name">Nome</label>\n                    <input type="text" id="user-name" name="name" required>\n                </div>\n                <div class="form-group">\n                    <label for="user-email">Email</label>\n                    <input type="email" id="user-email" name="email" required>\n                </div>\n                <div class="form-group">\n                    <label for="user-course">Curso</label>\n                    <select id="user-course" name="course" required>\n                        <option value="">Selecione um curso</option>\n                        <option value="web-fundamentals">Fundamentos Web</option>\n                        <option value="python-data">Python Data Science</option>\n                        <option value="react-advanced">React Avançado</option>\n                    </select>\n                </div>\n                <div class="form-actions">\n                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>\n                    <button type="submit" class="btn btn-primary">Salvar</button>\n                </div>\n            </form>\n        </div>\n    </div>\n    \n    <script src="dashboard.js"></script>\n</body>\n</html>\n\`\`\`'
                },
                {
                    id: 38,
                    title: 'Formulário Multi-step',
                    type: 'project',
                    duration: '90 min',
                    content: '# 📝 PROJETO: FORMULÁRIO MULTI-STEP\n\n## 🎯 OBJETIVOS\n- Criar formulário com múltiplas etapas\n- Implementar validação em tempo real\n- Adicionar navegação entre etapas\n- Salvar progresso automaticamente\n\n## 📋 ESTRUTURA DO PROJETO\n\`\`\`html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Formulário Multi-step - CS50</title>\n    <link rel="stylesheet" href="form.css">\n</head>\n<body>\n    <div class="form-container">\n        <div class="form-header">\n            <h1>Cadastro Completo</h1>\n            <div class="progress-bar">\n                <div class="progress-step active" data-step="1">1</div>\n                <div class="progress-step" data-step="2">2</div>\n                <div class="progress-step" data-step="3">3</div>\n                <div class="progress-step" data-step="4">4</div>\n            </div>\n        </div>\n        \n        <form id="multi-step-form">\n            <!-- Etapa 1: Informações Pessoais -->\n            <div class="form-step active" data-step="1">\n                <h2>Informações Pessoais</h2>\n                <div class="form-group">\n                    <label for="fullname">Nome Completo *</label>\n                    <input type="text" id="fullname" name="fullname" required>\n                </div>\n                <div class="form-group">\n                    <label for="email">Email *</label>\n                    <input type="email" id="email" name="email" required>\n                </div>\n                <div class="form-group">\n                    <label for="phone">Telefone</label>\n                    <input type="tel" id="phone" name="phone">\n                </div>\n                <div class="form-group">\n                    <label for="birthdate">Data de Nascimento</label>\n                    <input type="date" id="birthdate" name="birthdate">\n                </div>\n                <div class="form-actions">\n                    <button type="button" class="btn btn-next" onclick="nextStep()">Próximo</button>\n                </div>\n            </div>\n            \n            <!-- Etapa 2: Endereço -->\n            <div class="form-step" data-step="2">\n                <h2>Endereço</h2>\n                <div class="form-group">\n                    <label for="street">Rua *</label>\n                    <input type="text" id="street" name="street" required>\n                </div>\n                <div class="form-row">\n                    <div class="form-group">\n                        <label for="number">Número *</label>\n                        <input type="text" id="number" name="number" required>\n                    </div>\n                    <div class="form-group">\n                        <label for="complement">Complemento</label>\n                        <input type="text" id="complement" name="complement">\n                    </div>\n                </div>\n                <div class="form-row">\n                    <div class="form-group">\n                        <label for="city">Cidade *</label>\n                        <input type="text" id="city" name="city" required>\n                    </div>\n                    <div class="form-group">\n                        <label for="state">Estado *</label>\n                        <select id="state" name="state" required>\n                            <option value="">Selecione...</option>\n                            <option value="SP">São Paulo</option>\n                            <option value="RJ">Rio de Janeiro</option>\n                            <option value="MG">Minas Gerais</option>\n                        </select>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="zipcode">CEP *</label>\n                    <input type="text" id="zipcode" name="zipcode" required>\n                </div>\n                <div class="form-actions">\n                    <button type="button" class="btn btn-prev" onclick="prevStep()">Anterior</button>\n                    <button type="button" class="btn btn-next" onclick="nextStep()">Próximo</button>\n                </div>\n            </div>\n            \n            <!-- Etapa 3: Preferências -->\n            <div class="form-step" data-step="3">\n                <h2>Preferências</h2>\n                <div class="form-group">\n                    <label>Interesse em:</label>\n                    <div class="checkbox-group">\n                        <label>\n                            <input type="checkbox" name="interests" value="web">\n                            Desenvolvimento Web\n                        </label>\n                        <label>\n                            <input type="checkbox" name="interests" value="mobile">\n                            Desenvolvimento Mobile\n                        </label>\n                        <label>\n                            <input type="checkbox" name="interests" value="data">\n                            Data Science\n                        </label>\n                        <label>\n                            <input type="checkbox" name="interests" value="ai">\n                            Inteligência Artificial\n                        </label>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="experience">Nível de Experiência</label>\n                    <select id="experience" name="experience">\n                        <option value="">Selecione...</option>\n                        <option value="beginner">Iniciante</option>\n                        <option value="intermediate">Intermediário</option>\n                        <option value="advanced">Avançado</option>\n                    </select>\n                </div>\n                <div class="form-group">\n                    <label for="bio">Biografia</label>\n                    <textarea id="bio" name="bio" rows="4" maxlength="500" placeholder="Conte um pouco sobre você..."></textarea>\n                    <span class="char-count">0/500</span>\n                </div>\n                <div class="form-actions">\n                    <button type="button" class="btn btn-prev" onclick="prevStep()">Anterior</button>\n                    <button type="button" class="btn btn-next" onclick="nextStep()">Próximo</button>\n                </div>\n            </div>\n            \n            <!-- Etapa 4: Revisão e Envio -->\n            <div class="form-step" data-step="4">\n                <h2>Revisão e Envio</h2>\n                <div class="review-section">\n                    <h3>Informações Pessoais</h3>\n                    <div id="review-personal"></div>\n                    \n                    <h3>Endereço</h3>\n                    <div id="review-address"></div>\n                    \n                    <h3>Preferências</h3>\n                    <div id="review-preferences"></div>\n                </div>\n                \n                <div class="form-group">\n                    <label>\n                        <input type="checkbox" id="terms" name="terms" required>\n                        Concordo com os termos e condições\n                    </label>\n                </div>\n                \n                <div class="form-actions">\n                    <button type="button" class="btn btn-prev" onclick="prevStep()">Anterior</button>\n                    <button type="submit" class="btn btn-submit">Enviar Cadastro</button>\n                </div>\n            </div>\n        </form>\n    </div>\n    \n    <script src="form.js"></script>\n</body>\n</html>\n\`\`\`'
                },
                {
                    id: 39,
                    title: 'Galeria de Imagens Interativa',
                    type: 'project',
                    duration: '100 min',
                    content: '# 🖼️ PROJETO: GALERIA DE IMAGENS INTERATIVA\n\n## 🎯 OBJETIVOS\n- Criar galeria de imagens responsiva\n- Implementar lightbox e zoom\n- Adicionar filtros e categorias\n- Otimizar carregamento de imagens\n\n## 📋 ESTRUTURA DO PROJETO\n\`\`\`html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Galeria de Imagens - CS50</title>\n    <link rel="stylesheet" href="gallery.css">\n</head>\n<body>\n    <div class="gallery-container">\n        <!-- Header da Galeria -->\n        <header class="gallery-header">\n            <h1>Galeria de Imagens</h1>\n            <div class="gallery-controls">\n                <div class="search-box">\n                    <input type="text" id="search" placeholder="Buscar imagens...">\n                </div>\n                <div class="filter-buttons">\n                    <button class="filter-btn active" data-filter="all">Todas</button>\n                    <button class="filter-btn" data-filter="nature">Natureza</button>\n                    <button class="filter-btn" data-filter="city">Cidade</button>\n                    <button class="filter-btn" data-filter="people">Pessoas</button>\n                    <button class="filter-btn" data-filter="abstract">Abstrato</button>\n                </div>\n                <div class="view-options">\n                    <button class="view-btn" data-view="grid">Grid</button>\n                    <button class="view-btn active" data-view="masonry">Masonry</button>\n                    <button class="view-btn" data-view="list">Lista</button>\n                </div>\n            </div>\n        </header>\n        \n        <!-- Grid de Imagens -->\n        <div class="gallery-grid" id="gallery-grid">\n            <!-- Imagens serão carregadas via JavaScript -->\n        </div>\n        \n        <!-- Paginação -->\n        <div class="pagination">\n            <button class="page-btn" data-page="prev">← Anterior</button>\n            <div class="page-numbers">\n                <span class="page-number active">1</span>\n                <span class="page-number">2</span>\n                <span class="page-number">3</span>\n            </div>\n            <button class="page-btn" data-page="next">Próximo →</button>\n        </div>\n    </div>\n    \n    <!-- Lightbox Modal -->\n    <div id="lightbox" class="lightbox">\n        <div class="lightbox-content">\n            <button class="lightbox-close">&times;</button>\n            <button class="lightbox-nav lightbox-prev">‹</button>\n            <button class="lightbox-nav lightbox-next">›</button>\n            <div class="lightbox-image-container">\n                <img id="lightbox-image" src="" alt="">\n            </div>\n            <div class="lightbox-caption">\n                <h3 id="lightbox-title"></h3>\n                <p id="lightbox-description"></p>\n            </div>\n        </div>\n    </div>\n    \n    <!-- Upload Modal -->\n    <div id="upload-modal" class="modal">\n        <div class="modal-content">\n            <div class="modal-header">\n                <h3>Adicionar Nova Imagem</h3>\n                <span class="close">&times;</span>\n            </div>\n            <form id="upload-form">\n                <div class="form-group">\n                    <label for="image-file">Selecionar Imagem</label>\n                    <input type="file" id="image-file" accept="image/*" required>\n                </div>\n                <div class="form-group">\n                    <label for="image-title">Título</label>\n                    <input type="text" id="image-title" required>\n                </div>\n                <div class="form-group">\n                    <label for="image-category">Categoria</label>\n                    <select id="image-category" required>\n                        <option value="">Selecione...</option>\n                        <option value="nature">Natureza</option>\n                        <option value="city">Cidade</option>\n                        <option value="people">Pessoas</option>\n                        <option value="abstract">Abstrato</option>\n                    </select>\n                </div>\n                <div class="form-group">\n                    <label for="image-description">Descrição</label>\n                    <textarea id="image-description" rows="3"></textarea>\n                </div>\n                <div class="form-actions">\n                    <button type="button" class="btn btn-secondary" onclick="closeUploadModal()">Cancelar</button>\n                    <button type="submit" class="btn btn-primary">Upload</button>\n                </div>\n            </form>\n        </div>\n    </div>\n    \n    <script src="gallery.js"></script>\n</body>\n</html>\n\`\`\`'
                },
                {
                    id: 40,
                    title: 'Projeto Final Integrado',
                    type: 'project',
                    duration: '240 min',
                    content: '# 🏆 PROJETO FINAL INTEGRADO\n\n## 🎯 OBJETIVOS\n- Integrar todos os conhecimentos aprendidos\n- Criar aplicação web completa e funcional\n- Implementar design responsivo e acessível\n- Deploy em produção\n\n## 📋 ESTRUTURA DO PROJETO\n\`\`\`html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Fenix Academy - Projeto Final</title>\n    <link rel="stylesheet" href="main.css">\n    <link rel="stylesheet" href="components.css">\n    <link rel="stylesheet" href="responsive.css">\n</head>\n<body>\n    <!-- Header com Navegação -->\n    <header class="header">\n        <nav class="nav">\n            <div class="nav-brand">\n                <img src="logo.svg" alt="Fenix Academy" class="logo">\n                <span class="brand-text">Fenix Academy</span>\n            </div>\n            <ul class="nav-menu">\n                <li><a href="#home" class="nav-link">Home</a></li>\n                <li><a href="#courses" class="nav-link">Cursos</a></li>\n                <li><a href="#about" class="nav-link">Sobre</a></li>\n                <li><a href="#contact" class="nav-link">Contato</a></li>\n            </ul>\n            <div class="nav-actions">\n                <button class="btn btn-secondary" onclick="openLoginModal()">Login</button>\n                <button class="btn btn-primary" onclick="openSignupModal()">Cadastrar</button>\n            </div>\n            <button class="nav-toggle" aria-label="Menu">☰</button>\n        </nav>\n    </header>\n    \n    <!-- Seção Hero -->\n    <section id="home" class="hero">\n        <div class="hero-content">\n            <h1 class="hero-title">Aprenda Programação com Metodologia CS50</h1>\n            <p class="hero-subtitle">\n                Domine as tecnologias mais modernas com projetos práticos e mentoria especializada\n            </p>\n            <div class="hero-features">\n                <div class="feature">\n                    <span class="feature-icon">🎯</span>\n                    <span>Projetos Reais</span>\n                </div>\n                <div class="feature">\n                    <span class="feature-icon">🚀</span>\n                    <span>IDE Integrada</span>\n                </div>\n                <div class="feature">\n                    <span class="feature-icon">🏆</span>\n                    <span>Certificado Harvard</span>\n                </div>\n            </div>\n            <div class="hero-cta">\n                <button class="btn btn-primary btn-large" onclick="scrollToCourses()">\n                    Ver Cursos Disponíveis\n                </button>\n                <button class="btn btn-secondary btn-large" onclick="openDemoModal()">\n                    Ver Demo\n                </button>\n            </div>\n        </div>\n        <div class="hero-visual">\n            <div class="code-editor">\n                <div class="editor-header">\n                    <div class="editor-buttons">\n                        <span class="btn-red"></span>\n                        <span class="btn-yellow"></span>\n                        <span class="btn-green"></span>\n                    </div>\n                    <span class="editor-title">main.js</span>\n                </div>\n                <div class="editor-content">\n                    <pre><code>// Aplicação React\nimport React from \'react\';\nimport { useState, useEffect } from \'react\';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = `Contador: ${count}`;\n  }, [count]);\n  \n  return (\n    <div>\n      <h1>Contador: {count}</h1>\n      <button onClick={() => setCount(count + 1)}>\n        Incrementar\n      </button>\n    </div>\n  );\n}\n\nexport default App;</code></pre>\n                </div>\n            </div>\n        </div>\n    </section>\n    \n    <!-- Seção de Cursos -->\n    <section id="courses" class="courses">\n        <div class="container">\n            <h2 class="section-title">Nossos Cursos</h2>\n            <p class="section-subtitle">Escolha o caminho que melhor se adapta aos seus objetivos</p>\n            \n            <div class="courses-grid" id="courses-grid">\n                <!-- Cursos serão carregados via JavaScript -->\n            </div>\n        </div>\n    </section>\n    \n    <!-- Seção Sobre -->\n    <section id="about" class="about">\n        <div class="container">\n            <div class="about-content">\n                <div class="about-text">\n                    <h2>Por que escolher a Fenix Academy?</h2>\n                    <p>\n                        Somos uma plataforma de educação em tecnologia que combina a metodologia \n                        comprovada da Universidade de Harvard (CS50) com as tecnologias mais modernas \n                        do mercado.\n                    </p>\n                    <div class="about-stats">\n                        <div class="stat">\n                            <span class="stat-number">10,000+</span>\n                            <span class="stat-label">Alunos</span>\n                        </div>\n                        <div class="stat">\n                            <span class="stat-number">50+</span>\n                            <span class="stat-label">Projetos</span>\n                        </div>\n                        <div class="stat">\n                            <span class="stat-number">95%</span>\n                            <span class="stat-label">Satisfação</span>\n                        </div>\n                    </div>\n                </div>\n                <div class="about-image">\n                    <img src="about-image.jpg" alt="Equipe Fenix Academy">\n                </div>\n            </div>\n        </div>\n    </section>\n    \n    <!-- Seção de Depoimentos -->\n    <section class="testimonials">\n        <div class="container">\n            <h2 class="section-title">O que nossos alunos dizem</h2>\n            <div class="testimonials-grid" id="testimonials-grid">\n                <!-- Depoimentos serão carregados via JavaScript -->\n            </div>\n        </div>\n    </section>\n    \n    <!-- Seção de Contato -->\n    <section id="contact" class="contact">\n        <div class="container">\n            <div class="contact-content">\n                <div class="contact-info">\n                    <h2>Entre em Contato</h2>\n                    <p>Estamos aqui para ajudar você a alcançar seus objetivos em tecnologia.</p>\n                    \n                    <div class="contact-methods">\n                        <div class="contact-method">\n                            <span class="contact-icon">📧</span>\n                            <div>\n                                <strong>Email</strong>\n                                <span>contato@fenixacademy.com</span>\n                            </div>\n                        </div>\n                        <div class="contact-method">\n                            <span class="contact-icon">📱</span>\n                            <div>\n                                <strong>WhatsApp</strong>\n                                <span>(11) 99999-9999</span>\n                            </div>\n                        </div>\n                        <div class="contact-method">\n                            <span class="contact-icon">📍</span>\n                            <div>\n                                <strong>Endereço</strong>\n                                <span>São Paulo, SP - Brasil</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \n                <form class="contact-form" id="contact-form">\n                    <div class="form-group">\n                        <label for="contact-name">Nome</label>\n                        <input type="text" id="contact-name" name="name" required>\n                    </div>\n                    <div class="form-group">\n                        <label for="contact-email">Email</label>\n                        <input type="email" id="contact-email" name="email" required>\n                    </div>\n                    <div class="form-group">\n                        <label for="contact-subject">Assunto</label>\n                        <select id="contact-subject" name="subject" required>\n                            <option value="">Selecione...</option>\n                            <option value="general">Dúvida Geral</option>\n                            <option value="course">Informações sobre Cursos</option>\n                            <option value="technical">Suporte Técnico</option>\n                            <option value="partnership">Parcerias</option>\n                        </select>\n                    </div>\n                    <div class="form-group">\n                        <label for="contact-message">Mensagem</label>\n                        <textarea id="contact-message" name="message" rows="5" required></textarea>\n                    </div>\n                    <button type="submit" class="btn btn-primary btn-large">\n                        Enviar Mensagem\n                    </button>\n                </form>\n            </div>\n        </div>\n    </section>\n    \n    <!-- Footer -->\n    <footer class="footer">\n        <div class="container">\n            <div class="footer-content">\n                <div class="footer-section">\n                    <h3>Fenix Academy</h3>\n                    <p>Transformando vidas através da tecnologia com metodologia CS50.</p>\n                    <div class="social-links">\n                        <a href="#" aria-label="Facebook">📘</a>\n                        <a href="#" aria-label="Instagram">📷</a>\n                        <a href="#" aria-label="LinkedIn">💼</a>\n                        <a href="#" aria-label="YouTube">📺</a>\n                    </div>\n                </div>\n                \n                <div class="footer-section">\n                    <h4>Cursos</h4>\n                    <ul>\n                        <li><a href="#">Fundamentos Web</a></li>\n                        <li><a href="#">Python Data Science</a></li>\n                        <li><a href="#">React Avançado</a></li>\n                        <li><a href="#">Node.js Backend</a></li>\n                    </ul>\n                </div>\n                \n                <div class="footer-section">\n                    <h4>Recursos</h4>\n                    <ul>\n                        <li><a href="#">Blog</a></li>\n                        <li><a href="#">Documentação</a></li>\n                        <li><a href="#">Comunidade</a></li>\n                        <li><a href="#">Suporte</a></li>\n                    </ul>\n                </div>\n                \n                <div class="footer-section">\n                    <h4>Empresa</h4>\n                    <ul>\n                        <li><a href="#">Sobre Nós</a></li>\n                        <li><a href="#">Carreiras</a></li>\n                        <li><a href="#">Imprensa</a></li>\n                        <li><a href="#">Contato</a></li>\n                    </ul>\n                </div>\n            </div>\n            \n            <div class="footer-bottom">\n                <p>&copy; 2025 Fenix Academy. Todos os direitos reservados.</p>\n                <div class="footer-links">\n                    <a href="#">Termos de Uso</a>\n                    <a href="#">Política de Privacidade</a>\n                    <a href="#">Cookies</a>\n                </div>\n            </div>\n        </div>\n    </footer>\n    \n    <!-- Modais -->\n    <div id="login-modal" class="modal">\n        <!-- Conteúdo do modal de login -->\n    </div>\n    \n    <div id="signup-modal" class="modal">\n        <!-- Conteúdo do modal de cadastro -->\n    </div>\n    \n    <div id="demo-modal" class="modal">\n        <!-- Conteúdo do modal de demo -->\n    </div>\n    \n    <script src="main.js"></script>\n    <script src="components.js"></script>\n    <script src="utils.js"></script>\n</body>\n</html>\n\`\`\`'
                },
                {
                    id: 41,
                    title: 'JavaScript Interativo',
                    type: 'text',
                    duration: '80 min',
                    content: '# 🌐 JAVASCRIPT INTERATIVO\n\n## 🎯 OBJETIVOS\n- Dominar APIs web modernas\n- Implementar Service Workers e PWA\n- Gerenciar storage client-side\n- Criar aplicações offline-first\n\n## 📚 CONCEITOS CHAVE\n- **Web APIs**: Geolocalização, Notificações, Câmera\n- **Service Workers**: Cache, Background Sync, Push\n- **Storage**: LocalStorage, SessionStorage, IndexedDB\n- **PWA**: Manifest, Install, Offline\n\n## 💻 EXEMPLOS PRÁTICOS\n```javascript\n// Exemplo de uso de APIs web\nif (navigator.geolocation) {\n    navigator.geolocation.getCurrentPosition(\n        (position) => {\n            console.log(`Lat: ${position.coords.latitude}`);\n            console.log(`Lng: ${position.coords.longitude}`);\n        },\n        (error) => console.error(error)\n    );\n}\n```'
                }
            ]
        }
    ]
};

// Conteúdo para Python Data Science - 42 aulas
export const pythonDataScienceContent: CourseContent = {
    title: 'Python Data Science - CS50 Style',
    courseId: 'python-data-science',
    modules: [
        {
            id: 1,
            title: 'Fundamentos de Python para Data Science',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução ao Python e Ambiente de Desenvolvimento',
                    type: 'text',
                    duration: '45 min',
                    content: '# 🐍 INTRODUÇÃO AO PYTHON E AMBIENTE DE DESENVOLVIMENTO\n\n## 🎯 OBJETIVOS\n- Configurar ambiente Python para Data Science\n- Compreender o ecossistema Python científico\n- Dominar Jupyter Notebooks e IDEs\n- Primeiros passos com bibliotecas essenciais\n\n## 🚀 AMBIENTE ANACONDA\n```bash\n# Instalar Anaconda\n# Download: https://www.anaconda.com/products/distribution\n\n# Criar ambiente virtual\nconda create -n datascience python=3.9\nconda activate datascience\n\n# Instalar bibliotecas essenciais\nconda install pandas numpy matplotlib seaborn scikit-learn jupyter\n```\n\n## 💻 PRIMEIRO NOTEBOOK\n```python\n# Importações essenciais\nimport numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\nprint("Bem-vindo ao Python Data Science!")\nprint(f"NumPy versão: {np.__version__}")\nprint(f"Pandas versão: {pd.__version__}")\n\n# Verificar instalação\ndata = {"nome": ["Ana", "Bruno", "Carla"], "idade": [25, 30, 28]}\ndf = pd.DataFrame(data)\nprint(df)\n```'
                },
                {
                    id: 2,
                    title: 'Fundamentos de Python: Estruturas de Dados',
                    type: 'exercise',
                    duration: '60 min',
                    content: '# 📊 ESTRUTURAS DE DADOS EM PYTHON\n\n## 🎯 EXERCÍCIO: ANÁLISE DE VENDAS\n```python\n# Dados de vendas mensais\nvendas_2024 = {\n    "Janeiro": [1500, 2300, 1800, 2100],\n    "Fevereiro": [1600, 2400, 1900, 2200],\n    "Março": [1700, 2500, 2000, 2300]\n}\n\n# Calcular estatísticas\nfor mes, valores in vendas_2024.items():\n    print(f"\\n=== {mes.upper()} ===")\n    print(f"Total: R$ {sum(valores):,.2f}")\n    print(f"Média: R$ {sum(valores)/len(valores):,.2f}")\n    print(f"Máximo: R$ {max(valores):,.2f}")\n    print(f"Mínimo: R$ {min(valores):,.2f}")\n\n# Análise com list comprehension\ntotal_trimestre = sum([sum(vendas) for vendas in vendas_2024.values()])\nprint(f"\\nTotal do trimestre: R$ {total_trimestre:,.2f}")\n\n# Vendas acima da média\nmedia_geral = total_trimestre / sum([len(vendas) for vendas in vendas_2024.values()])\nvendas_altas = [venda for vendas in vendas_2024.values() for venda in vendas if venda > media_geral]\nprint(f"Vendas acima da média ({media_geral:.2f}): {len(vendas_altas)} vendas")\n```'
                },
                {
                    id: 3,
                    title: 'NumPy: Computação Numérica',
                    type: 'exercise',
                    duration: '70 min',
                    content: '# 🔢 NUMPY: COMPUTAÇÃO NUMÉRICA\n\n## 🎯 EXERCÍCIO: ANÁLISE DE PERFORMANCE\n```python\nimport numpy as np\nimport time\n\n# Comparação de performance: Lista vs NumPy\nprint("=== COMPARAÇÃO DE PERFORMANCE ===")\n\n# Criar dados\nsize = 1000000\npython_list = list(range(size))\nnumpy_array = np.arange(size)\n\n# Teste 1: Soma\nstart = time.time()\nsum_list = sum(python_list)\ntime_list = time.time() - start\n\nstart = time.time()\nsum_numpy = np.sum(numpy_array)\ntime_numpy = time.time() - start\n\nprint(f"Soma - Lista Python: {time_list:.4f}s")\nprint(f"Soma - NumPy: {time_numpy:.4f}s")\nprint(f"NumPy é {time_list/time_numpy:.1f}x mais rápido\\n")\n\n# Array operations\ndata = np.random.normal(100, 15, 1000)  # Média 100, desvio 15\nprint("=== ESTATÍSTICAS DESCRITIVAS ===")\nprint(f"Média: {np.mean(data):.2f}")\nprint(f"Mediana: {np.median(data):.2f}")\nprint(f"Desvio padrão: {np.std(data):.2f}")\nprint(f"Variância: {np.var(data):.2f}")\nprint(f"Mínimo: {np.min(data):.2f}")\nprint(f"Máximo: {np.max(data):.2f}")\n\n# Operações matriciais\nmatrix_a = np.random.randint(1, 10, (3, 3))\nmatrix_b = np.random.randint(1, 10, (3, 3))\n\nprint("\\n=== OPERAÇÕES MATRICIAIS ===")\nprint("Matriz A:")\nprint(matrix_a)\nprint("\\nMatriz B:")\nprint(matrix_b)\nprint("\\nMultiplicação de matrizes:")\nprint(np.dot(matrix_a, matrix_b))\n```'
                }
            ]
        },
        {
            id: 2,
            title: 'Pandas Avançado e Análise de Dados',
            lessons: [
                {
                    id: 2,
                    title: 'Pipeline CI/CD com GitHub Actions',
                    type: 'exercise',
                    duration: '90 min',
                    content: '# �� PIPELINE CI/CD COM GITHUB ACTIONS\n\n## 🎯 EXERCÍCIO: PIPELINE COMPLETO PARA APLICAÇÃO WEB\n```yaml\n# .github/workflows/ci-cd-pipeline.yml\nname: 🚀 Fenix Academy CI/CD Pipeline\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\n  workflow_dispatch:\n\nenv:\n  NODE_VERSION: \'18.x\'\n  PYTHON_VERSION: \'3.11\'\n  DOCKER_IMAGE: fenix-academy/web-app\n  REGISTRY: ghcr.io\n\njobs:\n  # 🔍 ANÁLISE DE CÓDIGO\n  code-analysis:\n    name: 🔍 Análise de Código\n    runs-on: ubuntu-latest\n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔧 Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: ${{ env.NODE_VERSION }}\n          cache: \'npm\'\n          \n      - name: 📦 Instalar dependências\n        run: npm ci\n        \n      - name: �� Linting com ESLint\n        run: npm run lint\n        \n      - name: �� Formatação com Prettier\n        run: npm run format:check\n        \n      - name: 🔒 Análise de segurança com npm audit\n        run: npm audit --audit-level=moderate\n        \n      - name: 📊 Cobertura de código com SonarCloud\n        uses: sonarqube-quality-gate-action@master\n        env:\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}\n        with:\n          args: >\n            -Dsonar.projectKey=fenix-academy-web-app\n            -Dsonar.organization=fenix-academy\n            -Dsonar.host.url=https://sonarcloud.io\n            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info\n            \n      - name: 📈 Upload coverage para Codecov\n        uses: codecov/codecov-action@v3\n        with:\n          file: ./coverage/lcov.info\n          flags: unittests\n          name: codecov-umbrella\n          fail_ci_if_error: false\n\n  # �� TESTES AUTOMATIZADOS\n  testing:\n    name: 🧪 Testes Automatizados\n    runs-on: ubuntu-latest\n    needs: code-analysis\n    strategy:\n      matrix:\n        node-version: [16.x, 18.x, 20.x]\n        os: [ubuntu-latest, windows-latest, macos-latest]\n        \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔧 Setup Node.js ${{ matrix.node-version }}\n        uses: actions/setup-node@v4\n        with:\n          node-version: ${{ matrix.node-version }}\n          cache: \'npm\'\n          \n      - name: 📦 Instalar dependências\n        run: npm ci\n        \n      - name: 🧪 Executar testes unitários\n        run: npm run test:unit\n        \n      - name: �� Executar testes de integração\n        run: npm run test:integration\n        \n      - name: �� Executar testes E2E\n        run: npm run test:e2e\n        \n      - name: �� Gerar relatório de cobertura\n        run: npm run test:coverage\n        \n      - name: 📤 Upload artefatos de teste\n        uses: actions/upload-artifact@v3\n        with:\n          name: test-results-${{ matrix.os }}-${{ matrix.node-version }}\n          path: |\n            coverage/\n            test-results/\n            \n      - name: 📈 Publicar resultados de teste\n        uses: dorny/test-reporter@v1\n        if: always()\n        with:\n          name: Test Results\n          path: test-results/*.xml\n          reporter: java-junit\n\n  # 🐳 BUILD E CONTAINERIZAÇÃO\n  build:\n    name: 🐳 Build e Containerização\n    runs-on: ubuntu-latest\n    needs: [code-analysis, testing]\n    outputs:\n      image-tag: ${{ steps.meta.outputs.tags }}\n      \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔐 Login no GitHub Container Registry\n        uses: docker/login-action@v2\n        with:\n          registry: ${{ env.REGISTRY }}\n          username: ${{ github.actor }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n          \n      - name: �� Setup Docker Buildx\n        uses: docker/setup-buildx-action@v2\n        \n      - name: 📋 Extrair metadados\n        id: meta\n        uses: docker/metadata-action@v4\n        with:\n          images: ${{ env.REGISTRY }}/${{ github.repository }}\n          tags: |\n            type=ref,event=branch\n            type=ref,event=pr\n            type=sha,prefix={{branch}}-,suffix={{sha}}\n            type=raw,value=latest,enable={{is_default_branch}}\n            \n      - name: 🔍 Análise de segurança da imagem\n        uses: aquasecurity/trivy-action@master\n        with:\n          image-ref: ${{ env.REGISTRY }}/${{ github.repository }}:${{ github.sha }}\n          format: \'sarif\'\n          output: \'trivy-results.sarif\'\n          \n      - name: 📤 Upload relatório de segurança\n        uses: github/codeql-action/upload-sarif@v2\n        if: always()\n        with:\n          sarif_file: \'trivy-results.sarif\'\n          \n      - name: 🐳 Build e push da imagem\n        uses: docker/build-push-action@v4\n        with:\n          context: .\n          push: true\n          tags: ${{ steps.meta.outputs.tags }}\n          labels: ${{ steps.meta.outputs.labels }}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max\n          \n      - name: 📋 Gerar SBOM\n        uses: anchore/sbom-action@v0\n        with:\n          image: ${{ env.REGISTRY }}/${{ github.repository }}:${{ github.sha }}\n          format: spdx-json\n          output-file: sbom.spdx.json\n          \n      - name: 📤 Upload SBOM\n        uses: actions/upload-artifact@v3\n        with:\n          name: sbom\n          path: sbom.spdx.json\n\n  # 🚀 DEPLOY AUTOMATIZADO\n  deploy-staging:\n    name: 🚀 Deploy Staging\n    runs-on: ubuntu-latest\n    needs: build\n    environment:\n      name: staging\n      url: https://staging.fenixacademy.com\n      \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔐 Configurar credenciais AWS\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n          aws-region: ${{ secrets.AWS_REGION }}\n          \n      - name: 🔧 Setup Terraform\n        uses: hashicorp/setup-terraform@v2\n        with:\n          terraform_version: 1.5.0\n          \n      - name: 🔍 Terraform Init\n        run: terraform init\n        working-directory: ./infrastructure\n        \n      - name: 🔍 Terraform Plan\n        run: terraform plan -out=tfplan\n        working-directory: ./infrastructure\n        \n      - name: 🚀 Terraform Apply\n        run: terraform apply tfplan\n        working-directory: ./infrastructure\n        \n      - name: 🐳 Deploy no ECS\n        run: |\n          aws ecs update-service \\\n            --cluster fenix-academy-staging \\\n            --service web-app \\\n            --force-new-deployment\n        \n      - name: 🔍 Verificar health check\n        run: |\n          for i in {1..30}; do\n            if curl -f https://staging.fenixacademy.com/health; then\n              echo \"✅ Aplicação está saudável\"\n              break\n            fi\n            echo \"⏳ Aguardando aplicação... ($i/30)\"\n            sleep 10\n          done\n        \n      - name: 📱 Notificar Slack\n        uses: 8398a7/action-slack@v3\n        if: always()\n        with:\n          status: ${{ job.status }}\n          channel: \'#deployments\'\n          text: \'Deploy Staging ${{ job.status }}\'\n        env:\n          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}\n\n  # �� DEPLOY PRODUÇÃO\n  deploy-production:\n    name: 🚀 Deploy Produção\n    runs-on: ubuntu-latest\n    needs: [build, deploy-staging]\n    environment:\n      name: production\n      url: https://fenixacademy.com\n      \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔐 Configurar credenciais AWS\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n          aws-region: ${{ secrets.AWS_REGION }}\n          \n      - name: 🔧 Setup Terraform\n        uses: hashicorp/setup-terraform@v2\n        with:\n          terraform_version: 1.5.0\n          \n      - name: 🔍 Terraform Init\n        run: terraform init\n        working-directory: ./infrastructure\n        \n      - name: 🔍 Terraform Plan\n        run: terraform plan -out=tfplan\n        working-directory: ./infrastructure\n        \n      - name: 🚀 Terraform Apply\n        run: terraform apply tfplan\n        working-directory: ./infrastructure\n        \n      - name: 🐳 Deploy no ECS\n        run: |\n          aws ecs update-service \\\n            --cluster fenix-academy-production \\\n            --service web-app \\\n            --force-new-deployment\n        \n      - name: 🔍 Verificar health check\n        run: |\n          for i in {1..30}; do\n            if curl -f https://fenixacademy.com/health; then\n              echo \"✅ Aplicação está saudável\"\n              break\n            fi\n            echo \"⏳ Aguardando aplicação... ($i/30)\"\n            sleep 10\n          done\n        \n      - name: 📱 Notificar Slack\n        uses: 8398a7/action-slack@v3\n        if: always()\n        with:\n          status: ${{ job.status }}\n          channel: \'#deployments\'\n          text: \'Deploy Produção ${{ job.status }}\'\n        env:\n          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}\n\n  # 📊 RELATÓRIOS E MÉTRICAS\n  reporting:\n    name: 📊 Relatórios e Métricas\n    runs-on: ubuntu-latest\n    needs: [deploy-staging, deploy-production]\n    if: always()\n    \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: �� Gerar relatório de deploy\n        run: |\n          echo \"# 🚀 Relatório de Deploy - $(date)\" > deploy-report.md\n          echo \"## 📈 Métricas\" >> deploy-report.md\n          echo \"- Build Time: ${{ needs.build.outputs.build-time }}\" >> deploy-report.md\n          echo \"- Test Coverage: ${{ needs.testing.outputs.coverage }}\" >> deploy-report.md\n          echo \"- Deploy Success: ${{ needs.deploy-production.result == \'success\' }}\" >> deploy-report.md\n          \n      - name: �� Upload relatório\n        uses: actions/upload-artifact@v3\n        with:\n          name: deploy-report\n          path: deploy-report.md\n          \n      - name: 📱 Notificar resultados finais\n        uses: 8398a7/action-slack@v3\n        with:\n          status: ${{ job.status }}\n          channel: \'#deployments\'\n          text: |\n            🚀 Pipeline CI/CD concluído!\n            ✅ Build: ${{ needs.build.result }}\n            ✅ Staging: ${{ needs.deploy-staging.result }}\n            ✅ Produção: ${{ needs.deploy-production.result }}\n        env:\n          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}\n```\n\n## 🔧 CONFIGURAÇÃO ADICIONAL\n\n### **Secrets necessários no GitHub:**\n```bash\n# AWS Credentials\nAWS_ACCESS_KEY_ID=your_access_key\nAWS_SECRET_ACCESS_KEY=your_secret_key\nAWS_REGION=us-east-1\n\n# SonarCloud\nSONAR_TOKEN=your_sonar_token\n\n# Slack\nSLACK_WEBHOOK_URL=your_webhook_url\n```\n\n### **Arquivo de configuração do projeto:**\n```json\n// package.json\n{\n  \"name\": \"fenix-academy-web-app\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"lint\": \"eslint . --ext .js,.jsx,.ts,.tsx\",\n    \"format:check\": \"prettier --check .\",\n    \"format\": \"prettier --write .\",\n    \"test:unit\": \"jest --testPathPattern=__tests__/unit\",\n    \"test:integration\": \"jest --testPathPattern=__tests__/unit\",\n    \"test:e2e\": \"cypress run\",\n    \"test:coverage\": \"jest --coverage\",\n    \"build\": \"next build\",\n    \"start\": \"next start\"\n  },\n  \"devDependencies\": {\n    \"@types/jest\": \"^29.5.0\",\n    \"@typescript-eslint/eslint-plugin\": \"^6.0.0\",\n    \"@typescript-eslint/parser\": \"^6.0.0\",\n    \"eslint\": \"^8.45.0\",\n    \"eslint-config-prettier\": \"^9.0.0\",\n    \"eslint-plugin-prettier\": \"^5.0.0\",\n    \"jest\": \"^29.5.0\",\n    \"prettier\": \"^3.0.0\",\n    \"cypress\": \"^12.17.0\"\n  }\n}\n```\n\n### **Dockerfile otimizado:**\n```dockerfile\n# Dockerfile para aplicação Next.js\nFROM node:18-alpine AS base\n\n# Instalar dependências apenas quando necessário\nFROM base AS deps\nRUN apk add --no-cache libc6-compat\nWORKDIR /app\n\n# Copiar arquivos de dependências\nCOPY package.json package-lock.json* ./\nRUN npm ci --only=production && npm cache clean --force\n\n# Build da aplicação\nFROM base AS builder\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\n\n# Gerar build de produção\nRUN npm run build\n\n# Imagem de produção\nFROM base AS runner\nWORKDIR /app\n\nENV NODE_ENV production\n\n# Criar usuário não-root\nRUN addgroup --system --gid 1001 nodejs\nRUN adduser --system --uid 1001 nextjs\n\n# Copiar aplicação\nCOPY --from=builder /app/public ./public\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static\n\nUSER nextjs\n\nEXPOSE 3000\n\nENV PORT 3000\nENV HOSTNAME \"0.0.0.0\"\n\nCMD [\"node\", \"server.js\"]\n```\n\n## 🎯 BENEFÍCIOS DESTE PIPELINE\n\n### **🔍 Qualidade do Código:**\n- Linting e formatação automática\n- Análise de segurança com Trivy\n- Cobertura de testes com SonarCloud\n- SBOM para rastreabilidade\n\n### **�� Testes Robustos:**\n- Testes em múltiplas versões do Node.js\n- Testes cross-platform (Windows, macOS, Linux)\n- Testes unitários, integração e E2E\n- Relatórios detalhados de cobertura\n\n### **🐳 Containerização Segura:**\n- Build multi-stage otimizado\n- Análise de vulnerabilidades\n- Cache de layers para builds rápidos\n- Imagens minimalistas e seguras\n\n### **🚀 Deploy Automatizado:**\n- Deploy em múltiplos ambientes\n- Infraestrutura como código com Terraform\n- Health checks automáticos\n- Rollback automático em caso de falha\n\n### **📊 Monitoramento e Feedback:**\n- Notificações em tempo real\n- Métricas de deploy\n- Relatórios automáticos\n- Integração com Slack\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Configurar monitoramento com Prometheus e Grafana\n2. Implementar infraestrutura como código com Terraform\n3. Configurar segurança e compliance\n4. Implementar observabilidade e tracing\n5. Otimizar performance e custos\n\n**🎓 Dica**: Este pipeline é um exemplo avançado. Comece implementando as partes básicas (lint, test, build) e gradualmente adicione as funcionalidades mais avançadas!'
                }
            ]
        }
    ]
};
// Conteúdo para React Avançado - 36 aulas
export const reactAdvancedContent: CourseContent = {
    title: 'React Avançado - CS50 Style',
    courseId: 'react-avancado',
    modules: [
        {
            id: 1,
            title: 'Hooks Avançados e Performance',
            lessons: [
                {
                    id: 1,
                    title: 'useState e useEffect Avançado',
                    type: 'exercise',
                    duration: '75 min',
                    content: '# ⚛️ USESTATE E USEEFFECT AVANÇADO\n\n## 🎯 EXERCÍCIO: SISTEMA DE CARRINHO INTELIGENTE\n```jsx\nimport React, { useState, useEffect, useCallback } from "react";\n\n// Hook customizado para localStorage\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      console.error("Erro ao ler localStorage:", error);\n      return initialValue;\n    }\n  });\n\n  const setValue = useCallback((value) => {\n    try {\n      setStoredValue(value);\n      window.localStorage.setItem(key, JSON.stringify(value));\n    } catch (error) {\n      console.error("Erro ao salvar no localStorage:", error);\n    }\n  }, [key]);\n\n  return [storedValue, setValue];\n}\n\n// Componente principal do carrinho\nfunction CarrinhoInteligente() {\n  const [itens, setItens] = useLocalStorage("carrinho", []);\n  const [desconto, setDesconto] = useState(0);\n  const [loading, setLoading] = useState(false);\n\n  // Effect para calcular desconto baseado na quantidade\n  useEffect(() => {\n    const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);\n    \n    if (totalItens >= 10) {\n      setDesconto(15); // 15% para 10+ itens\n    } else if (totalItens >= 5) {\n      setDesconto(10); // 10% para 5+ itens\n    } else {\n      setDesconto(0);\n    }\n  }, [itens]);\n\n  // Effect para salvar analytics\n  useEffect(() => {\n    if (itens.length > 0) {\n      const analytics = {\n        timestamp: new Date().toISOString(),\n        totalItens: itens.length,\n        valorTotal: calcularTotal()\n      };\n      \n      // Simular envio de analytics\n      console.log("Analytics enviado:", analytics);\n    }\n  }, [itens]);\n\n  const adicionarItem = useCallback((produto) => {\n    setItens(prevItens => {\n      const existeItem = prevItens.find(item => item.id === produto.id);\n      \n      if (existeItem) {\n        return prevItens.map(item =>\n          item.id === produto.id\n            ? { ...item, quantidade: item.quantidade + 1 }\n            : item\n        );\n      }\n      \n      return [...prevItens, { ...produto, quantidade: 1 }];\n    });\n  }, [setItens]);\n\n  const removerItem = useCallback((produtoId) => {\n    setItens(prevItens => prevItens.filter(item => item.id !== produtoId));\n  }, [setItens]);\n\n  const calcularTotal = useCallback(() => {\n    const subtotal = itens.reduce((acc, item) => \n      acc + (item.preco * item.quantidade), 0\n    );\n    return subtotal * (1 - desconto / 100);\n  }, [itens, desconto]);\n\n  const finalizarCompra = async () => {\n    setLoading(true);\n    \n    try {\n      // Simular API call\n      await new Promise(resolve => setTimeout(resolve, 2000));\n      \n      alert(`Compra finalizada! Total: R$ ${calcularTotal().toFixed(2)}`);\n      setItens([]);\n    } catch (error) {\n      alert("Erro na compra. Tente novamente.");\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  return (\n    <div className="carrinho-container">\n      <h2>🛒 Carrinho Inteligente</h2>\n      \n      {desconto > 0 && (\n        <div className="desconto-badge">\n          🎉 Desconto de {desconto}% aplicado!\n        </div>\n      )}\n\n      <div className="itens-lista">\n        {itens.map(item => (\n          <div key={item.id} className="item-card">\n            <span>{item.nome}</span>\n            <span>Qtd: {item.quantidade}</span>\n            <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>\n            <button onClick={() => removerItem(item.id)}>❌</button>\n          </div>\n        ))}\n      </div>\n\n      <div className="carrinho-footer">\n        <h3>Total: R$ {calcularTotal().toFixed(2)}</h3>\n        <button \n          onClick={finalizarCompra}\n          disabled={loading || itens.length === 0}\n          className="btn-finalizar"\n        >\n          {loading ? "Processando..." : "Finalizar Compra"}\n        </button>\n      </div>\n    </div>\n  );\n}\n\nexport default CarrinhoInteligente;\n```'
                },
                {
                    id: 2,
                    title: 'useContext e useReducer',
                    type: 'exercise',
                    duration: '80 min',
                    content: '# 🔄 USECONTEXT E USEREDUCER\n\n## 🎯 EXERCÍCIO: GERENCIADOR DE ESTADO GLOBAL\n```jsx\nimport React, { createContext, useContext, useReducer, useEffect } from "react";\n\n// Types\nconst actionTypes = {\n  SET_USER: "SET_USER",\n  SET_THEME: "SET_THEME",\n  ADD_NOTIFICATION: "ADD_NOTIFICATION",\n  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",\n  UPDATE_PREFERENCES: "UPDATE_PREFERENCES",\n  RESET_STATE: "RESET_STATE"\n};\n\n// Estado inicial\nconst initialState = {\n  user: null,\n  theme: "light",\n  notifications: [],\n  preferences: {\n    language: "pt-BR",\n    emailNotifications: true,\n    pushNotifications: false\n  },\n  isLoading: false\n};\n\n// Reducer principal\nfunction appReducer(state, action) {\n  switch (action.type) {\n    case actionTypes.SET_USER:\n      return {\n        ...state,\n        user: action.payload,\n        isLoading: false\n      };\n\n    case actionTypes.SET_THEME:\n      return {\n        ...state,\n        theme: action.payload\n      };\n\n    case actionTypes.ADD_NOTIFICATION:\n      return {\n        ...state,\n        notifications: [\n          ...state.notifications,\n          {\n            id: Date.now(),\n            ...action.payload,\n            timestamp: new Date().toISOString()\n          }\n        ]\n      };\n\n    case actionTypes.REMOVE_NOTIFICATION:\n      return {\n        ...state,\n        notifications: state.notifications.filter(\n          notification => notification.id !== action.payload\n        )\n      };\n\n    case actionTypes.UPDATE_PREFERENCES:\n      return {\n        ...state,\n        preferences: {\n          ...state.preferences,\n          ...action.payload\n        }\n      };\n\n    case actionTypes.RESET_STATE:\n      return initialState;\n\n    default:\n      throw new Error(`Ação não reconhecida: ${action.type}`);\n  }\n}\n\n// Context\nconst AppContext = createContext();\n\n// Provider\nexport function AppProvider({ children }) {\n  const [state, dispatch] = useReducer(appReducer, initialState);\n\n  // Persistir tema no localStorage\n  useEffect(() => {\n    const savedTheme = localStorage.getItem("theme");\n    if (savedTheme) {\n      dispatch({ type: actionTypes.SET_THEME, payload: savedTheme });\n    }\n  }, []);\n\n  useEffect(() => {\n    localStorage.setItem("theme", state.theme);\n    document.documentElement.setAttribute("data-theme", state.theme);\n  }, [state.theme]);\n\n  // Auto-remover notificações após 5 segundos\n  useEffect(() => {\n    const timers = state.notifications.map(notification => {\n      if (notification.autoRemove !== false) {\n        return setTimeout(() => {\n          dispatch({\n            type: actionTypes.REMOVE_NOTIFICATION,\n            payload: notification.id\n          });\n        }, 5000);\n      }\n      return null;\n    }).filter(Boolean);\n\n    return () => timers.forEach(clearTimeout);\n  }, [state.notifications]);\n\n  // Actions\n  const actions = {\n    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),\n    setTheme: (theme) => dispatch({ type: actionTypes.SET_THEME, payload: theme }),\n    addNotification: (notification) => dispatch({\n      type: actionTypes.ADD_NOTIFICATION,\n      payload: notification\n    }),\n    removeNotification: (id) => dispatch({\n      type: actionTypes.REMOVE_NOTIFICATION,\n      payload: id\n    }),\n    updatePreferences: (preferences) => dispatch({\n      type: actionTypes.UPDATE_PREFERENCES,\n      payload: preferences\n    }),\n    resetState: () => dispatch({ type: actionTypes.RESET_STATE })\n  };\n\n  const value = {\n    ...state,\n    ...actions\n  };\n\n  return (\n    <AppContext.Provider value={value}>\n      {children}\n    </AppContext.Provider>\n  );\n}\n\n// Hook customizado\nexport function useApp() {\n  const context = useContext(AppContext);\n  if (!context) {\n    throw new Error("useApp deve ser usado dentro de AppProvider");\n  }\n  return context;\n}\n\n// Componente de exemplo\nfunction App() {\n  const {\n    user,\n    theme,\n    notifications,\n    preferences,\n    setUser,\n    setTheme,\n    addNotification,\n    removeNotification,\n    updatePreferences\n  } = useApp();\n\n  const handleLogin = () => {\n    setUser({\n      id: 1,\n      name: "João Silva",\n      email: "joao@email.com",\n      avatar: "https://via.placeholder.com/64"\n    });\n    \n    addNotification({\n      type: "success",\n      title: "Login realizado!",\n      message: "Bem-vindo de volta, João!"\n    });\n  };\n\n  const toggleTheme = () => {\n    const newTheme = theme === "light" ? "dark" : "light";\n    setTheme(newTheme);\n    \n    addNotification({\n      type: "info",\n      title: "Tema alterado",\n      message: `Tema ${newTheme} ativado`\n    });\n  };\n\n  return (\n    <div className={`app theme-${theme}`}>\n      <header>\n        <h1>App com Context + Reducer</h1>\n        <button onClick={toggleTheme}>\n          {theme === "light" ? "🌙" : "☀️"} Trocar tema\n        </button>\n      </header>\n\n      <main>\n        {user ? (\n          <div className="user-info">\n            <img src={user.avatar} alt={user.name} />\n            <h2>Olá, {user.name}!</h2>\n            <p>{user.email}</p>\n          </div>\n        ) : (\n          <button onClick={handleLogin}>Fazer Login</button>\n        )}\n      </main>\n\n      {/* Notificações */}\n      <div className="notifications">\n        {notifications.map(notification => (\n          <div\n            key={notification.id}\n            className={`notification notification-${notification.type}`}\n          >\n            <h4>{notification.title}</h4>\n            <p>{notification.message}</p>\n            <button onClick={() => removeNotification(notification.id)}>\n              ×\n            </button>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}\n\nexport default function AppWithProvider() {\n  return (\n    <AppProvider>\n      <App />\n    </AppProvider>\n  );\n}\n```'
                }
            ]
        }
    ]
};

// Conteúdo para Node.js Backend Development - 24 aulas
export const nodeJsBackendContent: CourseContent = {
    title: 'Node.js Backend Development - CS50 Style',
    courseId: 'nodejs-backend-development',
    modules: [
        {
            id: 1,
            title: 'Fundamentos Node.js e APIs RESTful',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução ao Node.js e NPM',
                    type: 'text',
                    duration: '60 min',
                    content: '# 🚀 INTRODUÇÃO AO NODE.JS E NPM\n\n## 🎯 OBJETIVOS\n- Compreender o Node.js e seu ecossistema\n- Configurar ambiente de desenvolvimento\n- Dominar NPM e gerenciamento de pacotes\n- Criar primeiro servidor HTTP\n\n## 📚 CONCEITOS FUNDAMENTAIS\n\n### O que é Node.js?\nNode.js é um runtime JavaScript construído no motor V8 do Chrome, permitindo executar JavaScript no servidor.\n\n**Características principais:**\n- **Single-threaded**: Um único thread principal\n- **Event-driven**: Baseado em eventos\n- **Non-blocking I/O**: Operações assíncronas\n- **Cross-platform**: Funciona em múltiplos sistemas\n\n## 💻 CONFIGURAÇÃO DO AMBIENTE\n```bash\n# Verificar instalação\nnode --version\nnpm --version\n\n# Inicializar projeto\nmkdir fenix-api\ncd fenix-api\nnpm init -y\n\n# Instalar dependências essenciais\nnpm install express cors helmet morgan dotenv\nnpm install -D nodemon jest supertest\n```\n\n## 🔧 PRIMEIRO SERVIDOR\n```javascript\n// server.js\nconst express = require("express");\nconst cors = require("cors");\nconst helmet = require("helmet");\nconst morgan = require("morgan");\nrequire("dotenv").config();\n\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\n// Middlewares de segurança\napp.use(helmet());\napp.use(cors());\napp.use(morgan("combined"));\napp.use(express.json({ limit: "10mb" }));\napp.use(express.urlencoded({ extended: true }));\n\n// Rotas básicas\napp.get("/", (req, res) => {\n  res.json({\n    message: "🚀 Fenix Academy API",\n    version: "1.0.0",\n    status: "active",\n    timestamp: new Date().toISOString()\n  });\n});\n\napp.get("/health", (req, res) => {\n  res.json({\n    status: "healthy",\n    uptime: process.uptime(),\n    memory: process.memoryUsage(),\n    timestamp: new Date().toISOString()\n  });\n});\n\n// Middleware de erro\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({\n    error: "Algo deu errado!",\n    message: process.env.NODE_ENV === "development" ? err.message : "Erro interno"\n  });\n});\n\n// 404 Handler\napp.use("*", (req, res) => {\n  res.status(404).json({\n    error: "Rota não encontrada",\n    path: req.originalUrl,\n    method: req.method\n  });\n});\n\napp.listen(PORT, () => {\n  console.log(`🚀 Servidor rodando na porta ${PORT}`);\n  console.log(`📱 Acesse: http://localhost:${PORT}`);\n});\n\nmodule.exports = app;\n```'
                },
                {
                    id: 2,
                    title: 'Express.js e Middleware',
                    type: 'exercise',
                    duration: '75 min',
                    content: '# 🛠️ EXPRESS.JS E MIDDLEWARE\n\n## 🎯 EXERCÍCIO: API DE CURSOS COM MIDDLEWARE\n```javascript\n// middleware/auth.js\nconst jwt = require("jsonwebtoken");\n\nfunction authenticateToken(req, res, next) {\n  const authHeader = req.headers["authorization"];\n  const token = authHeader && authHeader.split(" ")[1];\n\n  if (!token) {\n    return res.status(401).json({\n      error: "Token de acesso requerido"\n    });\n  }\n\n  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {\n    if (err) {\n      return res.status(403).json({\n        error: "Token inválido"\n      });\n    }\n    req.user = user;\n    next();\n  });\n}\n\nfunction authorizeRole(roles) {\n  return (req, res, next) => {\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({\n        error: "Acesso negado para este recurso"\n      });\n    }\n    next();\n  };\n}\n\nmodule.exports = { authenticateToken, authorizeRole };\n\n// middleware/validation.js\nfunction validateCourse(req, res, next) {\n  const { title, description, duration, level } = req.body;\n  const errors = [];\n\n  if (!title || title.trim().length < 3) {\n    errors.push("Título deve ter pelo menos 3 caracteres");\n  }\n\n  if (!description || description.trim().length < 10) {\n    errors.push("Descrição deve ter pelo menos 10 caracteres");\n  }\n\n  if (!duration || duration < 1) {\n    errors.push("Duração deve ser maior que 0");\n  }\n\n  if (!["beginner", "intermediate", "advanced"].includes(level)) {\n    errors.push("Nível deve ser: beginner, intermediate ou advanced");\n  }\n\n  if (errors.length > 0) {\n    return res.status(400).json({\n      error: "Dados inválidos",\n      details: errors\n    });\n  }\n\n  next();\n}\n\nmodule.exports = { validateCourse };\n\n// routes/courses.js\nconst express = require("express");\nconst { authenticateToken, authorizeRole } = require("../middleware/auth");\nconst { validateCourse } = require("../middleware/validation");\nconst router = express.Router();\n\n// Dados simulados\nlet courses = [\n  {\n    id: 1,\n    title: "Fundamentos de Desenvolvimento Web",\n    description: "Aprenda HTML, CSS e JavaScript do zero",\n    duration: 72,\n    level: "beginner",\n    price: 199.90,\n    instructor: "Prof. Silva",\n    createdAt: new Date().toISOString()\n  },\n  {\n    id: 2,\n    title: "Python Data Science",\n    description: "Análise de dados com Python, Pandas e NumPy",\n    duration: 42,\n    level: "intermediate",\n    price: 299.90,\n    instructor: "Prof. Santos",\n    createdAt: new Date().toISOString()\n  }\n];\n\n// GET /api/courses - Listar todos os cursos\nrouter.get("/", (req, res) => {\n  const { level, search, limit = 10, page = 1 } = req.query;\n  let filteredCourses = courses;\n\n  // Filtrar por nível\n  if (level) {\n    filteredCourses = filteredCourses.filter(course => course.level === level);\n  }\n\n  // Buscar por título ou descrição\n  if (search) {\n    const searchLower = search.toLowerCase();\n    filteredCourses = filteredCourses.filter(course =>\n      course.title.toLowerCase().includes(searchLower) ||\n      course.description.toLowerCase().includes(searchLower)\n    );\n  }\n\n  // Paginação\n  const startIndex = (page - 1) * limit;\n  const endIndex = page * limit;\n  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);\n\n  res.json({\n    courses: paginatedCourses,\n    pagination: {\n      total: filteredCourses.length,\n      page: parseInt(page),\n      limit: parseInt(limit),\n      totalPages: Math.ceil(filteredCourses.length / limit)\n    }\n  });\n});\n\n// GET /api/courses/:id - Obter curso específico\nrouter.get("/:id", (req, res) => {\n  const id = parseInt(req.params.id);\n  const course = courses.find(c => c.id === id);\n\n  if (!course) {\n    return res.status(404).json({\n      error: "Curso não encontrado"\n    });\n  }\n\n  res.json(course);\n});\n\n// POST /api/courses - Criar novo curso (apenas admins)\nrouter.post("/",\n  authenticateToken,\n  authorizeRole(["admin"]),\n  validateCourse,\n  (req, res) => {\n    const newCourse = {\n      id: courses.length + 1,\n      ...req.body,\n      instructor: req.user.name,\n      createdAt: new Date().toISOString()\n    };\n\n    courses.push(newCourse);\n\n    res.status(201).json({\n      message: "Curso criado com sucesso",\n      course: newCourse\n    });\n  }\n);\n\n// PUT /api/courses/:id - Atualizar curso\nrouter.put("/:id",\n  authenticateToken,\n  authorizeRole(["admin", "instructor"]),\n  validateCourse,\n  (req, res) => {\n    const id = parseInt(req.params.id);\n    const courseIndex = courses.findIndex(c => c.id === id);\n\n    if (courseIndex === -1) {\n      return res.status(404).json({\n        error: "Curso não encontrado"\n      });\n    }\n\n    courses[courseIndex] = {\n      ...courses[courseIndex],\n      ...req.body,\n      updatedAt: new Date().toISOString()\n    };\n\n    res.json({\n      message: "Curso atualizado com sucesso",\n      course: courses[courseIndex]\n    });\n  }\n);\n\n// DELETE /api/courses/:id - Deletar curso\nrouter.delete("/:id",\n  authenticateToken,\n  authorizeRole(["admin"]),\n  (req, res) => {\n    const id = parseInt(req.params.id);\n    const courseIndex = courses.findIndex(c => c.id === id);\n\n    if (courseIndex === -1) {\n      return res.status(404).json({\n        error: "Curso não encontrado"\n      });\n    }\n\n    const deletedCourse = courses.splice(courseIndex, 1)[0];\n\n    res.json({\n      message: "Curso deletado com sucesso",\n      course: deletedCourse\n    });\n  }\n);\n\nmodule.exports = router;\n```'
                }
            ]
        }
    ]
};

// Conteúdo para Machine Learning com Python - 18 aulas
export const machineLearningContent: CourseContent = {
    title: 'Machine Learning com Python - CS50 Style',
    courseId: 'machine-learning-python',
    modules: [
        {
            id: 1,
            title: 'Fundamentos de Machine Learning',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução ao Machine Learning',
                    type: 'text',
                    duration: '70 min',
                    content: '# 🤖 INTRODUÇÃO AO MACHINE LEARNING\n\n## 🎯 OBJETIVOS\n- Compreender conceitos fundamentais de ML\n- Diferenciar tipos de aprendizado\n- Configurar ambiente Python para ML\n- Primeiros algoritmos de classificação\n\n## 📚 CONCEITOS FUNDAMENTAIS\n\n### O que é Machine Learning?\nMachine Learning é um subcampo da Inteligência Artificial que permite aos computadores aprenderem e melhorarem automaticamente através da experiência, sem serem explicitamente programados.\n\n**Tipos de Aprendizado:**\n- **Supervisionado**: Dados com labels conhecidos\n- **Não Supervisionado**: Dados sem labels\n- **Por Reforço**: Aprendizado através de tentativa e erro\n\n## 💻 CONFIGURAÇÃO DO AMBIENTE\n```bash\n# Criar ambiente virtual para ML\nconda create -n ml-python python=3.9\nconda activate ml-python\n\n# Instalar bibliotecas essenciais\nconda install scikit-learn pandas numpy matplotlib seaborn jupyter\nconda install -c conda-forge xgboost lightgbm catboost\n\n# Verificar instalação\npython -c "import sklearn; print(f\'Scikit-learn: {sklearn.__version__}\')"\n```\n\n## 🔬 PRIMEIRO MODELO: CLASSIFICAÇÃO\n```python\nimport numpy as np\nimport pandas as pd\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score, classification_report\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Carregar dataset clássico\niris = load_iris()\nX = iris.data\nY = iris.target\nfeature_names = iris.feature_names\ntarget_names = iris.target_names\n\nprint("=== DATASET IRIS ===")\nprint(f"Shape: {X.shape}")\nprint(f"Features: {feature_names}")\nprint(f"Targets: {target_names}")\nprint(f"Distribuição das classes:")\nfor i, name in enumerate(target_names):\n    count = np.sum(Y == i)\n    print(f"  {name}: {count} amostras")\n\n# Dividir dados em treino e teste\nX_train, X_test, Y_train, Y_test = train_test_split(\n    X, Y, test_size=0.3, random_state=42, stratify=Y\n)\n\nprint(f"\\n=== DIVISÃO DOS DADOS ===")\nprint(f"Treino: {X_train.shape[0]} amostras")\nprint(f"Teste: {X_test.shape[0]} amostras")\n\n# Treinar modelo Random Forest\nrf_model = RandomForestClassifier(\n    n_estimators=100,\n    random_state=42,\n    n_jobs=-1\n)\n\nrf_model.fit(X_train, Y_train)\n\n# Fazer predições\nY_pred = rf_model.predict(X_test)\n\n# Avaliar modelo\naccuracy = accuracy_score(Y_test, Y_pred)\nprint(f"\\n=== RESULTADOS ===")\nprint(f"Acurácia: {accuracy:.4f} ({accuracy*100:.2f}%)")\nprint(f"\\nRelatório de Classificação:")\nprint(classification_report(Y_test, Y_pred, target_names=target_names))\n\n# Feature Importance\nfeature_importance = rf_model.feature_importances_\nfeature_importance_df = pd.DataFrame({\n    "feature": feature_names,\n    "importance": feature_importance\n}).sort_values("importance", ascending=False)\n\nprint(f"\\n=== IMPORTÂNCIA DAS FEATURES ===")\nprint(feature_importance_df)\n\n# Visualização\nplt.figure(figsize=(12, 5))\n\n# Feature Importance\nplt.subplot(1, 2, 1)\nsns.barplot(data=feature_importance_df, x="importance", y="feature")\nplt.title("Importância das Features")\nplt.xlabel("Importância")\n\n# Matriz de Confusão\nplt.subplot(1, 2, 2)\nfrom sklearn.metrics import confusion_matrix\ncm = confusion_matrix(Y_test, Y_pred)\nsns.heatmap(cm, annot=True, fmt="d", cmap="Blues",\n            xticklabels=target_names, yticklabels=target_names)\nplt.title("Matriz de Confusão")\nplt.ylabel("Valor Real")\nplt.xlabel("Predição")\n\nplt.tight_layout()\nplt.show()\n\nprint("\\n🎉 Primeiro modelo de ML treinado com sucesso!")\n```'
                },
                {
                    id: 2,
                    title: 'Pré-processamento e Feature Engineering',
                    type: 'exercise',
                    duration: '80 min',
                    content: '# 🔧 PRÉ-PROCESSAMENTO E FEATURE ENGINEERING\n\n## 🎯 EXERCÍCIO: SISTEMA DE CRÉDITO BANCÁRIO\n```python\nimport pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report, roc_auc_score\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Dataset simulado de crédito bancário\nnp.random.seed(42)\nn_samples = 10000\n\n# Gerar dados realistas\ncredit_data = {\n    "idade": np.random.normal(35, 12, n_samples).astype(int),\n    "renda_mensal": np.random.lognormal(8, 0.5, n_samples).round(2),\n    "score_credito": np.random.normal(650, 100, n_samples).astype(int),\n    "emprestimos_ativos": np.random.poisson(2, n_samples),\n    "historico_pagamento": np.random.choice([0, 1, 2, 3, 4, 5], n_samples),\n    "tipo_emprego": np.random.choice(["CLT", "PJ", "Autônomo", "Aposentado"], n_samples),\n    "estado_civil": np.random.choice(["Solteiro", "Casado", "Divorciado", "Viúvo"], n_samples),\n    "educacao": np.random.choice(["Fundamental", "Médio", "Superior", "Pós-graduação"], n_samples),\n    "residencia_atual": np.random.choice(["Própria", "Alugada", "Familiar"], n_samples),\n    "tempo_banco": np.random.exponential(5, n_samples).astype(int)\n}\n\n# Criar DataFrame\ndf = pd.DataFrame(credit_data)\n\n# Adicionar target (aprovado/negado)\n# Regra baseada em múltiplos fatores\ndf["aprovado"] = (\n    (df["score_credito"] > 600) &\n    (df["renda_mensal"] > 3000) &\n    (df["historico_pagamento"] < 3) &\n    (df["emprestimos_ativos"] < 5)\n).astype(int)\n\nprint("=== ANÁLISE EXPLORATÓRIA ===")\nprint(f"Shape: {df.shape}")\nprint(f"\\nDistribuição do target:")\nprint(df["aprovado"].value_counts(normalize=True))\nprint(f"\\nPrimeiras linhas:")\nprint(df.head())\n\n# Verificar tipos de dados\nprint(f"\\n=== TIPOS DE DADOS ===")\nprint(df.dtypes)\nprint(f"\\nValores únicos por coluna:")\nfor col in df.select_dtypes(include=["object"]).columns:\n    print(f"{col}: {df[col].nunique()} valores únicos")\n\n# Separar features numéricas e categóricas\nnumeric_features = df.select_dtypes(include=["int64", "float64"]).columns.tolist()\nnumeric_features.remove("aprovado")\n\ncategorical_features = df.select_dtypes(include=["object"]).columns.tolist()\n\nprint(f"\\n=== FEATURES ===")\nprint(f"Numéricas: {numeric_features}")\nprint(f"Categóricas: {categorical_features}")\n\n# Dividir dados\nX = df.drop("aprovado", axis=1)\ny = df["aprovado"]\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42, stratify=y\n)\n\n# Criar pipeline de pré-processamento\nnumeric_transformer = Pipeline(steps=[\n    ("imputer", SimpleImputer(strategy="median")),\n    ("scaler", StandardScaler())\n])\n\ncategorical_transformer = Pipeline(steps=[\n    ("imputer", SimpleImputer(strategy="constant", fill_value="missing")),\n    ("onehot", OneHotEncoder(drop="first", sparse=False, handle_unknown="ignore"))\n])\n\n# Combinar transformadores\npreprocessor = ColumnTransformer(\n    transformers=[\n        ("num", numeric_transformer, numeric_features),\n        ("cat", categorical_transformer, categorical_features)\n    ]\n)\n\n# Pipeline completo\nmodel = Pipeline(steps=[\n    ("preprocessor", preprocessor),\n    ("classifier", RandomForestClassifier(n_estimators=100, random_state=42))\n])\n\nprint("\\n=== TREINANDO MODELO ===")\nmodel.fit(X_train, y_train)\n\n# Predições\ny_pred = model.predict(X_test)\ny_pred_proba = model.predict_proba(X_test)[:, 1]\n\n# Avaliação\nprint(f"\\n=== RESULTADOS ===")\nprint("Relatório de Classificação:")\nprint(classification_report(y_test, y_pred))\n\nroc_auc = roc_auc_score(y_test, y_pred_proba)\nprint(f"ROC AUC: {roc_auc:.4f}")\n\n# Feature importance\nfeature_names = (\n    numeric_features +\n    [f"{col}_{val}" for col, vals in \n     model.named_steps["preprocessor"].named_transformers_["cat"].named_steps["onehot"].categories_\n     for val in vals[1:]]\n)\n\nimportance = model.named_steps["classifier"].feature_importances_\nfeature_importance_df = pd.DataFrame({\n    "feature": feature_names,\n    "importance": importance\n}).sort_values("importance", ascending=False)\n\nprint(f"\\n=== TOP 10 FEATURES MAIS IMPORTANTES ===")\nprint(feature_importance_df.head(10))\n\n# Visualização\nplt.figure(figsize=(15, 6))\n\n# Feature Importance\nplt.subplot(1, 2, 1)\ntop_features = feature_importance_df.head(15)\nsns.barplot(data=top_features, x="importance", y="feature")\nplt.title("Top 15 Features Mais Importantes")\nplt.xlabel("Importância")\n\n# Distribuição do target\nplt.subplot(1, 2, 2)\nsns.countplot(data=df, x="aprovado")\nplt.title("Distribuição do Target (Aprovado/Negado)")\nplt.xlabel("Aprovado")\nplt.ylabel("Contagem")\n\nplt.tight_layout()\nplt.show()\n\nprint("\\n🎉 Pipeline de ML completo implementado!")\n```'
                }
            ]
        }
    ]
};

// Conteúdo para Desenvolvimento Mobile - 30 aulas
export const mobileDevelopmentContent: CourseContent = {
    title: 'Desenvolvimento Mobile - CS50 Style',
    courseId: 'desenvolvimento-mobile',
    modules: [
        {
            id: 1,
            title: 'React Native e Expo',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução ao React Native',
                    type: 'text',
                    duration: '75 min',
                    content: '# 📱 INTRODUÇÃO AO REACT NATIVE\n\n## 🎯 OBJETIVOS\n- Compreender React Native e sua arquitetura\n- Configurar ambiente Expo\n- Criar primeiro app mobile\n- Navegação básica entre telas\n\n## 📚 CONCEITOS FUNDAMENTAIS\n\n### O que é React Native?\nReact Native é um framework que permite desenvolver aplicações móveis nativas usando JavaScript/React, com componentes que se traduzem para código nativo iOS e Android.\n\n**Vantagens:**\n- **Cross-platform**: Um código para iOS e Android\n- **Performance nativa**: Componentes nativos reais\n- **Hot Reload**: Desenvolvimento rápido\n- **Ecosistema React**: Hooks, Context, etc.\n\n## 💻 CONFIGURAÇÃO DO AMBIENTE\n```bash\n# Instalar Expo CLI globalmente\nnpm install -g @expo/cli\n\n# Verificar instalação\nexpo --version\n\n# Criar novo projeto\nnpx create-expo-app FenixMobileApp\ncd FenixMobileApp\n\n# Instalar dependências essenciais\nnpm install @react-navigation/native @react-navigation/stack\nnpm install react-native-screens react-native-safe-area-context\nnpm install @react-native-async-storage/async-storage\nnpm install expo-linear-gradient expo-vector-icons\n\n# Iniciar projeto\nexpo start\n```\n\n## 🔧 PRIMEIRO APP: FENIX ACADEMY MOBILE\n```jsx\n// App.js\nimport React from "react";\nimport { NavigationContainer } from "@react-navigation/native";\nimport { createStackNavigator } from "@react-navigation/stack";\nimport { StatusBar } from "expo-status-bar";\nimport { SafeAreaProvider } from "react-native-safe-area-context";\n\n// Telas\nimport HomeScreen from "./screens/HomeScreen";\nimport CoursesScreen from "./screens/CoursesScreen";\nimport CourseDetailScreen from "./screens/CourseDetailScreen";\nimport ProfileScreen from "./screens/ProfileScreen";\n\nconst Stack = createStackNavigator();\n\nexport default function App() {\n  return (\n    <SafeAreaProvider>\n      <NavigationContainer>\n        <StatusBar style="auto" />\n        <Stack.Navigator\n          initialRouteName="Home"\n          screenOptions={{\n            headerStyle: {\n              backgroundColor: "#2E86AB",\n            },\n            headerTintColor: "#fff",\n            headerTitleStyle: {\n              fontWeight: "bold",\n            },\n          }}\n        >\n          <Stack.Screen \n            name="Home" \n            component={HomeScreen} \n            options={{ title: "Fenix Academy" }}\n          />\n          <Stack.Screen \n            name="Courses" \n            component={CoursesScreen} \n            options={{ title: "Cursos" }}\n          />\n          <Stack.Screen \n            name="CourseDetail" \n            component={CourseDetailScreen} \n            options={{ title: "Detalhes do Curso" }}\n          />\n          <Stack.Screen \n            name="Profile" \n            component={ProfileScreen} \n            options={{ title: "Perfil" }}\n          />\n        </Stack.Navigator>\n      </NavigationContainer>\n    </SafeAreaProvider>\n  );\n}\n\n// screens/HomeScreen.js\nimport React from "react";\nimport {\n  View,\n  Text,\n  StyleSheet,\n  TouchableOpacity,\n  ScrollView,\n  Image,\n} from "react-native";\nimport { LinearGradient } from "expo-linear-gradient";\nimport { Ionicons } from "@expo/vector-icons";\n\nconst HomeScreen = ({ navigation }) => {\n  const featuredCourses = [\n    {\n      id: 1,\n      title: "Fundamentos Web",\n      description: "HTML, CSS e JavaScript do zero",\n      duration: "72 aulas",\n      level: "Iniciante",\n      image: "https://via.placeholder.com/300x200/2E86AB/FFFFFF?text=Web",\n    },\n    {\n      id: 2,\n      title: "Python Data Science",\n      description: "Análise de dados com Python",\n      duration: "42 aulas",\n      level: "Intermediário",\n      image: "https://via.placeholder.com/300x200/A23B72/FFFFFF?text=Python",\n    },\n    {\n      id: 3,\n      title: "React Avançado",\n      description: "Hooks, Context e Performance",\n      duration: "36 aulas",\n      level: "Avançado",\n      image: "https://via.placeholder.com/300x200/F18F01/FFFFFF?text=React",\n    },\n  ];\n\n  const CourseCard = ({ course }) => (\n    <TouchableOpacity\n      style={styles.courseCard}\n      onPress={() =>\n        navigation.navigate("CourseDetail", { courseId: course.id })\n      }\n    >\n      <Image source={{ uri: course.image }} style={styles.courseImage} />\n      <View style={styles.courseInfo}>\n        <Text style={styles.courseTitle}>{course.title}</Text>\n        <Text style={styles.courseDescription}>{course.description}</Text>\n        <View style={styles.courseMeta}>\n          <Text style={styles.courseDuration}>{course.duration}</Text>\n          <Text style={styles.courseLevel}>{course.level}</Text>\n        </View>\n      </View>\n    </TouchableOpacity>\n  );\n\n  return (\n    <ScrollView style={styles.container}>\n      <LinearGradient\n        colors={["#2E86AB", "#A23B72"]}\n        style={styles.header}\n      >\n        <Text style={styles.headerTitle}>🚀 Fenix Academy</Text>\n        <Text style={styles.headerSubtitle}>\n          Aprenda programação do básico ao avançado\n        </Text>\n      </LinearGradient>\n\n      <View style={styles.content}>\n        <Text style={styles.sectionTitle}>Cursos em Destaque</Text>\n        {featuredCourses.map((course) => (\n          <CourseCard key={course.id} course={course} />\n        ))}\n\n        <TouchableOpacity\n          style={styles.seeAllButton}\n          onPress={() => navigation.navigate("Courses")}\n        >\n          <Text style={styles.seeAllButtonText}>Ver Todos os Cursos</Text>\n          <Ionicons name="arrow-forward" size={20} color="#2E86AB" />\n        </TouchableOpacity>\n      </View>\n    </ScrollView>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: "#f5f5f5",\n  },\n  header: {\n    paddingTop: 60,\n    paddingBottom: 40,\n    paddingHorizontal: 20,\n    alignItems: "center",\n  },\n  headerTitle: {\n    fontSize: 28,\n    fontWeight: "bold",\n    color: "#fff",\n    marginBottom: 10,\n  },\n  headerSubtitle: {\n    fontSize: 16,\n    color: "#fff",\n    textAlign: "center",\n    opacity: 0.9,\n  },\n  content: {\n    padding: 20,\n  },\n  sectionTitle: {\n    fontSize: 22,\n    fontWeight: "bold",\n    marginBottom: 20,\n    color: "#333",\n  },\n  courseCard: {\n    backgroundColor: "#fff",\n    borderRadius: 12,\n    marginBottom: 16,\n    shadowColor: "#000",\n    shadowOffset: {\n      width: 0,\n      height: 2,\n    },\n    shadowOpacity: 0.1,\n    shadowRadius: 3.84,\n    elevation: 5,\n  },\n  courseImage: {\n    width: "100%",\n    height: 150,\n    borderTopLeftRadius: 12,\n    borderTopRightRadius: 12,\n  },\n  courseInfo: {\n    padding: 16,\n  },\n  courseTitle: {\n    fontSize: 18,\n    fontWeight: "bold",\n    marginBottom: 8,\n    color: "#333",\n  },\n  courseDescription: {\n    fontSize: 14,\n    color: "#666",\n    marginBottom: 12,\n    lineHeight: 20,\n  },\n  courseMeta: {\n    flexDirection: "row",\n    justifyContent: "space-between",\n  },\n  courseDuration: {\n    fontSize: 12,\n    color: "#2E86AB",\n    fontWeight: "600",\n  },\n  courseLevel: {\n    fontSize: 12,\n    color: "#A23B72",\n    fontWeight: "600",\n  },\n  seeAllButton: {\n    flexDirection: "row",\n    alignItems: "center",\n    justifyContent: "center",\n    backgroundColor: "#fff",\n    padding: 16,\n    borderRadius: 12,\n    marginTop: 20,\n    borderWidth: 2,\n    borderColor: "#2E86AB",\n  },\n  seeAllButtonText: {\n    fontSize: 16,\n    fontWeight: "600",\n    color: "#2E86Ad",\n    marginRight: 8,\n  },\n});\n\nexport default HomeScreen;\n```'
                },
                {
                    id: 2,
                    title: 'Navegação e Estado Global',
                    type: 'exercise',
                    duration: '80 min',
                    content: '# 🧭 NAVEGAÇÃO E ESTADO GLOBAL\n\n## 🎯 EXERCÍCIO: SISTEMA DE AUTENTICAÇÃO MOBILE\n```jsx\n// context/AuthContext.js\nimport React, { createContext, useContext, useReducer, useEffect } from "react";\nimport AsyncStorage from "@react-native-async-storage/async-storage";\n\nconst AuthContext = createContext();\n\nconst initialState = {\n  user: null,\n  token: null,\n  isLoading: true,\n  isAuthenticated: false,\n};\n\nfunction authReducer(state, action) {\n  switch (action.type) {\n    case "LOGIN_START":\n      return { ...state, isLoading: true };\n    case "LOGIN_SUCCESS":\n      return {\n        ...state,\n        user: action.payload.user,\n        token: action.payload.token,\n        isAuthenticated: true,\n        isLoading: false,\n      };\n    case "LOGIN_FAILURE":\n      return { ...state, isLoading: false };\n    case "LOGOUT":\n      return {\n        ...state,\n        user: null,\n        token: null,\n        isAuthenticated: false,\n        isLoading: false,\n      };\n    case "UPDATE_PROFILE":\n      return {\n        ...state,\n        user: { ...state.user, ...action.payload },\n      };\n    default:\n      return state;\n  }\n}\n\nexport function AuthProvider({ children }) {\n  const [state, dispatch] = useReducer(authReducer, initialState);\n\n  // Verificar token salvo ao iniciar\n  useEffect(() => {\n    checkAuthToken();\n  }, []);\n\n  const checkAuthToken = async () => {\n    try {\n      const token = await AsyncStorage.getItem("authToken");\n      const userData = await AsyncStorage.getItem("userData");\n\n      if (token && userData) {\n        const user = JSON.parse(userData);\n        dispatch({\n          type: "LOGIN_SUCCESS",\n          payload: { user, token },\n        });\n      } else {\n        dispatch({ type: "LOGOUT" });\n      }\n    } catch (error) {\n      console.error("Erro ao verificar token:", error);\n      dispatch({ type: "LOGOUT" });\n    }\n  };\n\n  const login = async (email, password) => {\n    dispatch({ type: "LOGIN_START" });\n\n    try {\n      // Simular API call\n      await new Promise((resolve) => setTimeout(resolve, 1500));\n\n      // Mock de resposta da API\n      const mockResponse = {\n        user: {\n          id: 1,\n          name: "João Silva",\n          email: email,\n          avatar: "https://via.placeholder.com/100",\n          courses: [1, 2, 3],\n          progress: {\n            completed: 15,\n            total: 72,\n          },\n        },\n        token: "mock_jwt_token_" + Date.now(),\n      };\n\n      // Salvar no AsyncStorage\n      await AsyncStorage.setItem("authToken", mockResponse.token);\n      await AsyncStorage.setItem("userData", JSON.stringify(mockResponse.user));\n\n      dispatch({\n        type: "LOGIN_SUCCESS",\n        payload: mockResponse,\n      });\n\n      return { success: true };\n    } catch (error) {\n      dispatch({ type: "LOGIN_FAILURE" });\n      return { success: false, error: error.message };\n    }\n  };\n\n  const logout = async () => {\n    try {\n      await AsyncStorage.removeItem("authToken");\n      await AsyncStorage.removeItem("userData");\n      dispatch({ type: "LOGOUT" });\n    } catch (error) {\n      console.error("Erro ao fazer logout:", error);\n    }\n  };\n\n  const updateProfile = async (updates) => {\n    try {\n      const updatedUser = { ...state.user, ...updates };\n      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));\n      dispatch({ type: "UPDATE_PROFILE", payload: updates });\n      return { success: true };\n    } catch (error) {\n      return { success: false, error: error.message };\n    }\n  };\n\n  const value = {\n    ...state,\n    login,\n    logout,\n    updateProfile,\n  };\n\n  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;\n}\n\nexport function useAuth() {\n  const context = useContext(AuthContext);\n  if (!context) {\n    throw new Error("useAuth deve ser usado dentro de AuthProvider");\n  }\n  return context;\n}\n\n// screens/LoginScreen.js\nimport React, { useState } from "react";\nimport {\n  View,\n  Text,\n  TextInput,\n  TouchableOpacity,\n  StyleSheet,\n  Alert,\n  KeyboardAvoidingView,\n  Platform,\n} from "react-native";\nimport { LinearGradient } from "expo-linear-gradient";\nimport { Ionicons } from "@expo/vector-icons";\nimport { useAuth } from "../context/AuthContext";\n\nconst LoginScreen = ({ navigation }) => {\n  const [email, setEmail] = useState("");\n  const [password, setPassword] = useState("");\n  const [showPassword, setShowPassword] = useState(false);\n  const { login, isLoading } = useAuth();\n\n  const handleLogin = async () => {\n    if (!email || !password) {\n      Alert.alert("Erro", "Por favor, preencha todos os campos");\n      return;\n    }\n\n    const result = await login(email, password);\n    if (!result.success) {\n      Alert.alert("Erro", result.error || "Falha no login");\n    }\n  };\n\n  return (\n    <KeyboardAvoidingView\n      style={styles.container}\n      behavior={Platform.OS === "ios" ? "padding" : "height"}\n    >\n      <LinearGradient\n        colors={["#2E86AB", "#A23B72"]}\n        style={styles.header}\n      >\n        <View style={styles.logoContainer}>\n          <Ionicons name="school" size={80} color="#fff" />\n          <Text style={styles.logoText}>Fenix Academy</Text>\n        </View>\n      </LinearGradient>\n\n      <View style={styles.formContainer}>\n        <Text style={styles.title}>Bem-vindo de volta!</Text>\n        <Text style={styles.subtitle}>Faça login para continuar aprendendo</Text>\n\n        <View style={styles.inputContainer}>\n          <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />\n          <TextInput\n            style={styles.input}\n            placeholder="Email"\n            value={email}\n            onChangeText={setEmail}\n            keyboardType="email-address"\n            autoCapitalize="none"\n            autoCorrect={false}\n          />\n        </View>\n\n        <View style={styles.inputContainer}>\n          <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />\n          <TextInput\n            style={styles.input}\n            placeholder="Senha"\n            value={password}\n            onChangeText={setPassword}\n            secureTextEntry={!showPassword}\n            autoCapitalize="none"\n          />\n          <TouchableOpacity\n            style={styles.eyeButton}\n            onPress={() => setShowPassword(!showPassword)}\n          >\n            <Ionicons\n              name={showPassword ? "eye-off" : "eye"}\n              size={20}\n              color="#666"\n            />\n          </TouchableOpacity>\n        </View>\n\n        <TouchableOpacity\n          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}\n          onPress={handleLogin}\n          disabled={isLoading}\n        >\n          <Text style={styles.loginButtonText}>\n            {isLoading ? "Entrando..." : "Entrar"}\n          </Text>\n        </TouchableOpacity>\n\n        <TouchableOpacity\n          style={styles.forgotPasswordButton}\n          onPress={() => Alert.alert("Info", "Funcionalidade em desenvolvimento")}\n        >\n          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>\n        </TouchableOpacity>\n\n        <View style={styles.divider}>\n          <View style={styles.dividerLine} />\n          <Text style={styles.dividerText}>ou</Text>\n          <View style={styles.dividerLine} />\n        </View>\n\n        <TouchableOpacity\n          style={styles.registerButton}\n          onPress={() => Alert.alert("Info", "Funcionalidade em desenvolvimento")}\n        >\n          <Text style={styles.registerButtonText}>Criar nova conta</Text>\n        </TouchableOpacity>\n      </View>\n    </KeyboardAvoidingView>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: "#f5f5f5",\n  },\n  header: {\n    flex: 1,\n    justifyContent: "center",\n    alignItems: "center",\n    paddingHorizontal: 20,\n  },\n  logoContainer: {\n    alignItems: "center",\n  },\n  logoText: {\n    fontSize: 28,\n    fontWeight: "bold",\n    color: "#fff",\n    marginTop: 20,\n  },\n  formContainer: {\n    flex: 1,\n    backgroundColor: "#fff",\n    borderTopLeftRadius: 30,\n    borderTopRightRadius: 30,\n    paddingHorizontal: 30,\n    paddingTop: 40,\n  },\n  title: {\n    fontSize: 24,\n    fontWeight: "bold",\n    color: "#333",\n    marginBottom: 10,\n    textAlign: "center",\n  },\n  subtitle: {\n    fontSize: 16,\n    color: "#666",\n    marginBottom: 30,\n    textAlign: "center",\n  },\n  inputContainer: {\n    flexDirection: "row",\n    alignItems: "center",\n    backgroundColor: "#f8f9fa",\n    borderRadius: 12,\n    marginBottom: 20,\n    paddingHorizontal: 15,\n    borderWidth: 1,\n    borderColor: "#e9ecef",\n  },\n  inputIcon: {\n    marginRight: 10,\n  },\n  input: {\n    flex: 1,\n    height: 50,\n    fontSize: 16,\n    color: "#333",\n  },\n  eyeButton: {\n    padding: 5,\n  },\n  loginButton: {\n    backgroundColor: "#2E86AB",\n    borderRadius: 12,\n    height: 50,\n    justifyContent: "center",\n    alignItems: "center",\n    marginBottom: 20,\n  },\n  loginButtonDisabled: {\n    opacity: 0.6,\n  },\n  loginButtonText: {\n    color: "#fff",\n    fontSize: 16,\n    fontWeight: "600",\n  },\n  forgotPasswordButton: {\n    alignItems: "center",\n    marginBottom: 20,\n  },\n  forgotPasswordText: {\n    color: "#2E86AB",\n    fontSize: 14,\n  },\n  divider: {\n    flexDirection: "row",\n    alignItems: "center",\n    marginBottom: 20,\n  },\n  dividerLine: {\n    flex: 1,\n    height: 1,\n    backgroundColor: "#e9ecef",\n  },\n  dividerText: {\n    marginHorizontal: 15,\n    color: "#666",\n    fontSize: 14,\n  },\n  registerButton: {\n    borderWidth: 2,\n    borderColor: "#2E86AB",\n    borderRadius: 12,\n    height: 50,\n    justifyContent: "center",\n    alignItems: "center",\n  },\n  registerButtonText: {\n    color: "#2E86AB",\n    fontSize: 16,\n    fontWeight: "600",\n  },\n});\n\nexport default LoginScreen;\n```'
                }
            ]
        }
    ]
};

// Conteúdo para Cybersecurity e Ethical Hacking - 28 aulas
export const cybersecurityContent: CourseContent = {
    title: 'Cybersecurity e Ethical Hacking - CS50 Style',
    courseId: 'cybersecurity-ethical-hacking',
    modules: [
        {
            id: 1,
            title: 'Fundamentos de Segurança da Informação',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução à Cybersecurity',
                    type: 'text',
                    duration: '70 min',
                    content: `# 🛡️ INTRODUÇÃO À CYBERSECURITY

## 🎯 OBJETIVOS
- Compreender princípios fundamentais de segurança
- Identificar ameaças e vulnerabilidades comuns
- Implementar práticas básicas de proteção
- Introdução ao Ethical Hacking

## 📚 CONCEITOS FUNDAMENTAIS

### O que é Cybersecurity?
Cybersecurity é o conjunto de práticas, tecnologias e processos destinados a proteger sistemas, redes e dados contra ataques digitais, danos ou acessos não autorizados.

**Princípios da Segurança da Informação (CIA):**
- **Confidencialidade**: Garantir que informações sejam acessíveis apenas a pessoas autorizadas
- **Integridade**: Manter a precisão e completude dos dados
- **Disponibilidade**: Garantir acesso aos recursos quando necessário

## 🔒 TIPOS DE AMEAÇAS

### Ameaças Comuns:
- **Malware**: Vírus, worms, trojans, ransomware
- **Phishing**: Engenharia social para roubar credenciais
- **DDoS**: Ataques de negação de serviço
- **SQL Injection**: Injeção de código malicioso
- **Cross-Site Scripting (XSS)**: Execução de scripts maliciosos

## 💻 LABORATÓRIO: ANÁLISE DE VULNERABILIDADES

### Scanner de Vulnerabilidades em Python
Neste laboratório, você aprenderá a criar um scanner básico de vulnerabilidades web usando Python.

**Principais funcionalidades:**
- Detecção de SQL Injection
- Identificação de XSS
- Análise de Directory Traversal
- Verificação de Information Disclosure

**Ferramentas utilizadas:**
- Python requests
- Regular expressions
- urllib.parse
- colorama para output colorido

### Exemplo de uso:
1. Configurar ambiente Python
2. Instalar dependências (requests, colorama)
3. Implementar scanner básico
4. Testar em ambiente controlado
5. Analisar resultados

## 🔐 PRINCÍPIOS DE SEGURANÇA

### Defesa em Profundidade:
- Múltiplas camadas de proteção
- Princípio do menor privilégio
- Segregação de redes
- Monitoramento contínuo

### Gestão de Riscos:
- Identificação de ativos
- Avaliação de ameaças
- Análise de vulnerabilidades
- Implementação de controles

## 🚀 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Configurar ambientes de teste
2. Implementar ferramentas de análise
3. Realizar testes de penetração
4. Documentar vulnerabilidades
5. Propor correções

**🎓 Dica**: Cybersecurity é uma área em constante evolução. Mantenha-se sempre atualizado com as últimas ameaças e técnicas de proteção!`
                },
                {
                    id: 2,
                    title: 'Análise de Redes e Packet Sniffing',
                    type: 'exercise',
                    duration: '85 min',
                    content: `# 🌐 ANÁLISE DE REDES E PACKET SNIFFING

## 🎯 EXERCÍCIO: ANALISADOR DE TRÁFEGO DE REDE

### Objetivo
Criar um analisador de tráfego de rede usando Python e Scapy para identificar padrões e atividades suspeitas.

### Conceitos Fundamentais

**Packet Sniffing:**
- Captura de pacotes de dados em uma rede
- Análise de protocolos (TCP, UDP, HTTP, DNS)
- Identificação de padrões de tráfego
- Detecção de atividades anômalas

**Protocolos de Rede:**
- **TCP**: Protocolo confiável orientado à conexão
- **UDP**: Protocolo simples sem conexão
- **HTTP/HTTPS**: Protocolo de transferência web
- **DNS**: Sistema de nomes de domínio

### Implementação do Analisador

**Componentes principais:**
1. **Captura de Pacotes**: Usar Scapy para interceptar tráfego
2. **Análise de Protocolos**: Identificar tipos de comunicação
3. **Estatísticas de Tráfego**: Gerar métricas de uso
4. **Detecção de Anomalias**: Identificar padrões suspeitos

**Funcionalidades implementadas:**
- Análise de requisições HTTP
- Monitoramento de consultas DNS
- Estatísticas de IPs e portas
- Visualização de dados com gráficos
- Relatórios detalhados de segurança

### Ferramentas Utilizadas

**Python Libraries:**
- **Scapy**: Manipulação de pacotes de rede
- **Matplotlib**: Geração de gráficos
- **Pandas**: Análise de dados
- **JSON**: Armazenamento de resultados

### Exemplo de Uso

1. **Configurar ambiente**:
   - Instalar Python 3.8+
   - pip install scapy matplotlib pandas

2. **Executar análise**:
   - Definir interface de rede
   - Configurar duração da captura
   - Analisar resultados

3. **Interpretar resultados**:
   - Verificar estatísticas de protocolos
   - Identificar IPs mais ativos
   - Detectar atividades suspeitas

### Considerações de Segurança

**Aspectos éticos:**
- Usar apenas em redes autorizadas
- Respeitar privacidade de usuários
- Seguir políticas de segurança corporativa
- Documentar todas as atividades

**Precauções legais:**
- Obter autorização antes do uso
- Manter logs de auditoria
- Proteger dados capturados
- Seguir regulamentações locais

## 🚀 PRÓXIMOS PASSOS

No próximo módulo, você aprenderá a:
1. Implementar IDS (Intrusion Detection System)
2. Configurar alertas automatizados
3. Realizar análise forense de rede
4. Criar dashboards de monitoramento
5. Integrar com ferramentas SIEM

**🎓 Dica**: Packet sniffing é uma habilidade fundamental em cybersecurity. Use sempre de forma ética e autorizada!`
                }
            ]
        }
    ]
};

// Conteúdo para DevOps e CI/CD - 40 aulas
export const devopsContent: CourseContent = {
    title: 'DevOps e CI/CD - CS50 Style',
    courseId: 'devops-cicd',
    modules: [
        {
            id: 1,
            title: 'Fundamentos de DevOps',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução ao DevOps e Cultura',
                    type: 'text',
                    duration: '75 min',
                    content: '# 🚀 INTRODUÇÃO AO DEVOPS E CULTURA\n\n## 🎯 OBJETIVOS\n- Compreender princípios fundamentais do DevOps\n- Entender a cultura de colaboração e automação\n- Implementar práticas de integração contínua\n- Configurar pipelines de entrega contínua\n\n## 📚 CONCEITOS FUNDAMENTAIS\n\n### O que é DevOps?\nDevOps é uma cultura, filosofia e conjunto de práticas que automatiza e integra os processos entre equipes de desenvolvimento de software e operações de TI. O objetivo é entregar aplicações e serviços de alta qualidade de forma mais rápida e confiável.\n\n**Princípios Fundamentais:**\n- **Colaboração**: Desenvolvedores e operações trabalham juntos\n- **Automação**: Eliminar tarefas manuais e repetitivas\n- **Integração Contínua**: Código integrado e testado constantemente\n- **Entrega Contínua**: Software sempre pronto para produção\n- **Monitoramento**: Observabilidade e feedback contínuo\n- **Segurança**: DevSecOps integrado ao pipeline\n\n## 🔄 CICLO DE VIDA DEVOPS\n\n### 1. **PLAN** (Planejamento)\n- Definição de requisitos e objetivos\n- Planejamento de sprints e releases\n- Definição de métricas de sucesso\n\n### 2. **CODE** (Desenvolvimento)\n- Desenvolvimento colaborativo\n- Code reviews e pair programming\n- Padrões de código e linting\n\n### 3. **BUILD** (Construção)\n- Compilação e build automatizado\n- Gerenciamento de dependências\n- Versionamento de artefatos\n\n### 4. **TEST** (Testes)\n- Testes automatizados (unit, integration, e2e)\n- Testes de segurança e performance\n- Testes de regressão\n\n### 5. **DEPLOY** (Implantação)\n- Deploy automatizado em múltiplos ambientes\n- Blue-green deployments\n- Rollback automático em caso de falha\n\n### 6. **OPERATE** (Operação)\n- Monitoramento e observabilidade\n- Logs centralizados\n- Alertas e notificações\n\n### 7. **MONITOR** (Monitoramento)\n- Métricas de negócio e técnica\n- Análise de performance\n- Feedback para melhorias\n\n## 💻 LABORATÓRIO: AMBIENTE DEVOPS BÁSICO\n```bash\n#!/bin/bash\n# Fenix Academy - Setup DevOps Environment\n# Este script configura um ambiente DevOps básico\n\necho \"🚀 FENIX ACADEMY - CONFIGURANDO AMBIENTE DEVOPS\"\necho \"==================================================\"\n\n# Verificar se Docker está instalado\nif ! command -v docker &> /dev/null; then\n    echo \"📦 Instalando Docker...\"\n    curl -fsSL https://get.docker.com -o get-docker.sh\n    sudo sh get-docker.sh\n    sudo usermod -aG docker $USER\n    echo \"✅ Docker instalado com sucesso!\"\nelse\n    echo \"✅ Docker já está instalado\"\nfi\n\n# Verificar se Docker Compose está instalado\nif ! command -v docker-compose &> /dev/null; then\n    echo \"📦 Instalando Docker Compose...\"\n    sudo curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose\n    sudo chmod +x /usr/local/bin/docker-compose\n    echo \"✅ Docker Compose instalado com sucesso!\"\nelse\n    echo \"✅ Docker Compose já está instalado\"\nfi\n\n# Verificar se Git está instalado\nif ! command -v git &> /dev/null; then\n    echo \"📦 Instalando Git...\"\n    sudo apt-get update\n    sudo apt-get install -y git\n    echo \"✅ Git instalado com sucesso!\"\nelse\n    echo \"✅ Git já está instalado\"\nfi\n\n# Verificar se Node.js está instalado\nif ! command -v node &> /dev/null; then\n    echo \"📦 Instalando Node.js...\"\n    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -\n    sudo apt-get install -y nodejs\n    echo \"✅ Node.js instalado com sucesso!\"\nelse\n    echo \"✅ Node.js já está instalado\"\nfi\n\n# Verificar se Python está instalado\nif ! command -v python3 &> /dev/null; then\n    echo \"📦 Instalando Python...\"\n    sudo apt-get update\n    sudo apt-get install -y python3 python3-pip\n    echo \"✅ Python instalado com sucesso!\"\nelse\n    echo \"✅ Python já está instalado\"\nfi\n\n# Criar estrutura de diretórios para projetos DevOps\nmkdir -p ~/devops-projects\nmkdir -p ~/devops-projects/ci-cd\nmkdir -p ~/devops-projects/monitoring\nmkdir -p ~/devops-projects/infrastructure\nmkdir -p ~/devops-projects/security\n\n# Configurar Git global\nif [ -z \"$(git config --global user.name)\" ]; then\n    echo \"🔧 Configurando Git...\"\n    git config --global user.name \"Fenix Academy Student\"\n    git config --global user.email \"student@fenixacademy.com\"\n    echo \"✅ Git configurado!\"\nfi\n\n# Criar arquivo de configuração do ambiente\ncat > ~/devops-projects/setup.md << EOF\n# 🚀 AMBIENTE DEVOPS FENIX ACADEMY\n\n## 📋 COMPONENTES INSTALADOS\n- ✅ Docker\n- ✅ Docker Compose\n- ✅ Git\n- ✅ Node.js\n- ✅ Python3\n\n## 🗂️ ESTRUTURA DE DIRETÓRIOS\n\`\`\`\n~/devops-projects/\n├── ci-cd/           # Pipelines de CI/CD\n├── monitoring/       # Monitoramento e observabilidade\n├── infrastructure/   # Infraestrutura como código\n└── security/         # Segurança e compliance\n\`\`\`\n\n## 🎯 PRÓXIMOS PASSOS\n1. Configurar repositório Git\n2. Criar primeiro pipeline CI/CD\n3. Implementar monitoramento básico\n4. Configurar infraestrutura como código\n\n## 📚 RECURSOS ADICIONAIS\n- [Docker Documentation](https://docs.docker.com/)\n- [GitHub Actions](https://docs.github.com/en/actions)\n- [Jenkins Documentation](https://www.jenkins.io/doc/)\n- [Terraform Documentation](https://www.terraform.io/docs)\nEOF\n\necho \"\\n🎉 AMBIENTE DEVOPS CONFIGURADO COM SUCESSO!\"\necho \"📁 Diretórios criados em: ~/devops-projects\"\necho \"📖 Documentação disponível em: ~/devops-projects/setup.md\"\necho \"\\n🚀 Próximo passo: Configurar primeiro pipeline CI/CD!\"\n```\n\n## 🔧 FERRAMENTAS ESSENCIAIS\n\n### **Containerização e Orquestração:**\n- **Docker**: Containerização de aplicações\n- **Kubernetes**: Orquestração de containers\n- **Docker Compose**: Orquestração local\n\n### **CI/CD:**\n- **Jenkins**: Automação de pipelines\n- **GitHub Actions**: CI/CD integrado ao GitHub\n- **GitLab CI**: CI/CD integrado ao GitLab\n- **ArgoCD**: Deploy contínuo para Kubernetes\n\n### **Infraestrutura como Código:**\n- **Terraform**: Provisionamento de infraestrutura\n- **Ansible**: Automação de configuração\n- **CloudFormation**: Infraestrutura AWS\n\n### **Monitoramento e Observabilidade:**\n- **Prometheus**: Coleta de métricas\n- **Grafana**: Visualização e dashboards\n- **ELK Stack**: Logs centralizados\n- **Jaeger**: Rastreamento distribuído\n\n## 📊 MÉTRICAS DE SUCESSO DEVOPS\n\n### **DORA Metrics (DevOps Research and Assessment):**\n- **Deployment Frequency**: Frequência de deploys\n- **Lead Time for Changes**: Tempo do commit ao deploy\n- **Mean Time to Recovery (MTTR)**: Tempo para recuperar de falhas\n- **Change Failure Rate**: Taxa de falhas em mudanças\n\n### **Métricas Técnicas:**\n- **Build Time**: Tempo de construção\n- **Test Coverage**: Cobertura de testes\n- **Deployment Success Rate**: Taxa de sucesso de deploys\n- **Infrastructure Provisioning Time**: Tempo para provisionar infraestrutura\n\n## 🎯 BENEFÍCIOS DO DEVOPS\n\n### **Para Desenvolvedores:**\n- Deploy mais rápido e frequente\n- Feedback mais rápido sobre mudanças\n- Menos tempo em tarefas operacionais\n- Ambiente de desenvolvimento consistente\n\n### **Para Operações:**\n- Infraestrutura mais estável e previsível\n- Automação de tarefas repetitivas\n- Melhor visibilidade sobre sistemas\n- Resposta mais rápida a incidentes\n\n### **Para o Negócio:**\n- Time-to-market reduzido\n- Maior qualidade do software\n- Redução de custos operacionais\n- Maior satisfação do cliente\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Configurar um pipeline de CI/CD completo\n2. Implementar testes automatizados\n3. Configurar deploy automatizado\n4. Implementar monitoramento básico\n5. Configurar infraestrutura como código\n\n**🎓 Lembre-se**: DevOps é uma jornada, não um destino. Comece pequeno, melhore continuamente e expanda gradualmente suas práticas!'
                },
                {
                    id: 2,
                    title: 'Pipeline CI/CD com GitHub Actions',
                    type: 'exercise',
                    duration: '90 min',
                    content: '# �� PIPELINE CI/CD COM GITHUB ACTIONS\n\n## 🎯 EXERCÍCIO: PIPELINE COMPLETO PARA APLICAÇÃO WEB\n```yaml\n# .github/workflows/ci-cd-pipeline.yml\nname: 🚀 Fenix Academy CI/CD Pipeline\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\n  workflow_dispatch:\n\nenv:\n  NODE_VERSION: \'18.x\'\n  PYTHON_VERSION: \'3.11\'\n  DOCKER_IMAGE: fenix-academy/web-app\n  REGISTRY: ghcr.io\n\njobs:\n  # 🔍 ANÁLISE DE CÓDIGO\n  code-analysis:\n    name: 🔍 Análise de Código\n    runs-on: ubuntu-latest\n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔧 Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: ${{ env.NODE_VERSION }}\n          cache: \'npm\'\n          \n      - name: 📦 Instalar dependências\n        run: npm ci\n        \n      - name: �� Linting com ESLint\n        run: npm run lint\n        \n      - name: �� Formatação com Prettier\n        run: npm run format:check\n        \n      - name: 🔒 Análise de segurança com npm audit\n        run: npm audit --audit-level=moderate\n        \n      - name: 📊 Cobertura de código com SonarCloud\n        uses: sonarqube-quality-gate-action@master\n        env:\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}\n        with:\n          args: >\n            -Dsonar.projectKey=fenix-academy-web-app\n            -Dsonar.organization=fenix-academy\n            -Dsonar.host.url=https://sonarcloud.io\n            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info\n            \n      - name: 📈 Upload coverage para Codecov\n        uses: codecov/codecov-action@v3\n        with:\n          file: ./coverage/lcov.info\n          flags: unittests\n          name: codecov-umbrella\n          fail_ci_if_error: false\n\n  # �� TESTES AUTOMATIZADOS\n  testing:\n    name: 🧪 Testes Automatizados\n    runs-on: ubuntu-latest\n    needs: code-analysis\n    strategy:\n      matrix:\n        node-version: [16.x, 18.x, 20.x]\n        os: [ubuntu-latest, windows-latest, macos-latest]\n        \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔧 Setup Node.js ${{ matrix.node-version }}\n        uses: actions/setup-node@v4\n        with:\n          node-version: ${{ matrix.node-version }}\n          cache: \'npm\'\n          \n      - name: 📦 Instalar dependências\n        run: npm ci\n        \n      - name: 🧪 Executar testes unitários\n        run: npm run test:unit\n        \n      - name: �� Executar testes de integração\n        run: npm run test:integration\n        \n      - name: �� Executar testes E2E\n        run: npm run test:e2e\n        \n      - name: �� Gerar relatório de cobertura\n        run: npm run test:coverage\n        \n      - name: 📤 Upload artefatos de teste\n        uses: actions/upload-artifact@v3\n        with:\n          name: test-results-${{ matrix.os }}-${{ matrix.node-version }}\n          path: |\n            coverage/\n            test-results/\n            \n      - name: 📈 Publicar resultados de teste\n        uses: dorny/test-reporter@v1\n        if: always()\n        with:\n          name: Test Results\n          path: test-results/*.xml\n          reporter: java-junit\n\n  # 🐳 BUILD E CONTAINERIZAÇÃO\n  build:\n    name: 🐳 Build e Containerização\n    runs-on: ubuntu-latest\n    needs: [code-analysis, testing]\n    outputs:\n      image-tag: ${{ steps.meta.outputs.tags }}\n      \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔐 Login no GitHub Container Registry\n        uses: docker/login-action@v2\n        with:\n          registry: ${{ env.REGISTRY }}\n          username: ${{ github.actor }}\n          password: ${{ secrets.GITHUB_TOKEN }}\n          \n      - name: �� Setup Docker Buildx\n        uses: docker/setup-buildx-action@v2\n        \n      - name: 📋 Extrair metadados\n        id: meta\n        uses: docker/metadata-action@v4\n        with:\n          images: ${{ env.REGISTRY }}/${{ github.repository }}\n          tags: |\n            type=ref,event=branch\n            type=ref,event=pr\n            type=sha,prefix={{branch}}-,suffix={{sha}}\n            type=raw,value=latest,enable={{is_default_branch}}\n            \n      - name: 🔍 Análise de segurança da imagem\n        uses: aquasecurity/trivy-action@master\n        with:\n          image-ref: ${{ env.REGISTRY }}/${{ github.repository }}:${{ github.sha }}\n          format: \'sarif\'\n          output: \'trivy-results.sarif\'\n          \n      - name: 📤 Upload relatório de segurança\n        uses: github/codeql-action/upload-sarif@v2\n        if: always()\n        with:\n          sarif_file: \'trivy-results.sarif\'\n          \n      - name: 🐳 Build e push da imagem\n        uses: docker/build-push-action@v4\n        with:\n          context: .\n          push: true\n          tags: ${{ steps.meta.outputs.tags }}\n          labels: ${{ steps.meta.outputs.labels }}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max\n          \n      - name: 📋 Gerar SBOM\n        uses: anchore/sbom-action@v0\n        with:\n          image: ${{ env.REGISTRY }}/${{ github.repository }}:${{ github.sha }}\n          format: spdx-json\n          output-file: sbom.spdx.json\n          \n      - name: 📤 Upload SBOM\n        uses: actions/upload-artifact@v3\n        with:\n          name: sbom\n          path: sbom.spdx.json\n\n  # 🚀 DEPLOY AUTOMATIZADO\n  deploy-staging:\n    name: 🚀 Deploy Staging\n    runs-on: ubuntu-latest\n    needs: build\n    environment:\n      name: staging\n      url: https://staging.fenixacademy.com\n      \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔐 Configurar credenciais AWS\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n          aws-region: ${{ secrets.AWS_REGION }}\n          \n      - name: 🔧 Setup Terraform\n        uses: hashicorp/setup-terraform@v2\n        with:\n          terraform_version: 1.5.0\n          \n      - name: 🔍 Terraform Init\n        run: terraform init\n        working-directory: ./infrastructure\n        \n      - name: 🔍 Terraform Plan\n        run: terraform plan -out=tfplan\n        working-directory: ./infrastructure\n        \n      - name: 🚀 Terraform Apply\n        run: terraform apply tfplan\n        working-directory: ./infrastructure\n        \n      - name: 🐳 Deploy no ECS\n        run: |\n          aws ecs update-service \\\n            --cluster fenix-academy-staging \\\n            --service web-app \\\n            --force-new-deployment\n        \n      - name: 🔍 Verificar health check\n        run: |\n          for i in {1..30}; do\n            if curl -f https://staging.fenixacademy.com/health; then\n              echo \"✅ Aplicação está saudável\"\n              break\n            fi\n            echo \"⏳ Aguardando aplicação... ($i/30)\"\n            sleep 10\n          done\n        \n      - name: 📱 Notificar Slack\n        uses: 8398a7/action-slack@v3\n        if: always()\n        with:\n          status: ${{ job.status }}\n          channel: \'#deployments\'\n          text: \'Deploy Staging ${{ job.status }}\'\n        env:\n          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}\n\n  # �� DEPLOY PRODUÇÃO\n  deploy-production:\n    name: 🚀 Deploy Produção\n    runs-on: ubuntu-latest\n    needs: [build, deploy-staging]\n    environment:\n      name: production\n      url: https://fenixacademy.com\n      \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: 🔐 Configurar credenciais AWS\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n          aws-region: ${{ secrets.AWS_REGION }}\n          \n      - name: 🔧 Setup Terraform\n        uses: hashicorp/setup-terraform@v2\n        with:\n          terraform_version: 1.5.0\n          \n      - name: 🔍 Terraform Init\n        run: terraform init\n        working-directory: ./infrastructure\n        \n      - name: 🔍 Terraform Plan\n        run: terraform plan -out=tfplan\n        working-directory: ./infrastructure\n        \n      - name: 🚀 Terraform Apply\n        run: terraform apply tfplan\n        working-directory: ./infrastructure\n        \n      - name: 🐳 Deploy no ECS\n        run: |\n          aws ecs update-service \\\n            --cluster fenix-academy-production \\\n            --service web-app \\\n            --force-new-deployment\n        \n      - name: 🔍 Verificar health check\n        run: |\n          for i in {1..30}; do\n            if curl -f https://fenixacademy.com/health; then\n              echo \"✅ Aplicação está saudável\"\n              break\n            fi\n            echo \"⏳ Aguardando aplicação... ($i/30)\"\n            sleep 10\n          done\n        \n      - name: 📱 Notificar Slack\n        uses: 8398a7/action-slack@v3\n        if: always()\n        with:\n          status: ${{ job.status }}\n          channel: \'#deployments\'\n          text: \'Deploy Produção ${{ job.status }}\'\n        env:\n          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}\n\n  # 📊 RELATÓRIOS E MÉTRICAS\n  reporting:\n    name: 📊 Relatórios e Métricas\n    runs-on: ubuntu-latest\n    needs: [deploy-staging, deploy-production]\n    if: always()\n    \n    steps:\n      - name: �� Checkout do código\n        uses: actions/checkout@v4\n        \n      - name: �� Gerar relatório de deploy\n        run: |\n          echo \"# 🚀 Relatório de Deploy - $(date)\" > deploy-report.md\n          echo \"## 📈 Métricas\" >> deploy-report.md\n          echo \"- Build Time: ${{ needs.build.outputs.build-time }}\" >> deploy-report.md\n          echo \"- Test Coverage: ${{ needs.testing.outputs.coverage }}\" >> deploy-report.md\n          echo \"- Deploy Success: ${{ needs.deploy-production.result == \'success\' }}\" >> deploy-report.md\n          \n      - name: �� Upload relatório\n        uses: actions/upload-artifact@v3\n        with:\n          name: deploy-report\n          path: deploy-report.md\n          \n      - name: 📱 Notificar resultados finais\n        uses: 8398a7/action-slack@v3\n        with:\n          status: ${{ job.status }}\n          channel: \'#deployments\'\n          text: |\n            🚀 Pipeline CI/CD concluído!\n            ✅ Build: ${{ needs.build.result }}\n            ✅ Staging: ${{ needs.deploy-staging.result }}\n            ✅ Produção: ${{ needs.deploy-production.result }}\n        env:\n          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}\n```\n\n## 🔧 CONFIGURAÇÃO ADICIONAL\n\n### **Secrets necessários no GitHub:**\n```bash\n# AWS Credentials\nAWS_ACCESS_KEY_ID=your_access_key\nAWS_SECRET_ACCESS_KEY=your_secret_key\nAWS_REGION=us-east-1\n\n# SonarCloud\nSONAR_TOKEN=your_sonar_token\n\n# Slack\nSLACK_WEBHOOK_URL=your_webhook_url\n```\n\n### **Arquivo de configuração do projeto:**\n```json\n// package.json\n{\n  \"name\": \"fenix-academy-web-app\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"lint\": \"eslint . --ext .js,.jsx,.ts,.tsx\",\n    \"format:check\": \"prettier --check .\",\n    \"format\": \"prettier --write .\",\n    \"test:unit\": \"jest --testPathPattern=__tests__/unit\",\n    \"test:integration\": \"jest --testPathPattern=__tests__/unit\",\n    \"test:e2e\": \"cypress run\",\n    \"test:coverage\": \"jest --coverage\",\n    \"build\": \"next build\",\n    \"start\": \"next start\"\n  },\n  \"devDependencies\": {\n    \"@types/jest\": \"^29.5.0\",\n    \"@typescript-eslint/eslint-plugin\": \"^6.0.0\",\n    \"@typescript-eslint/parser\": \"^6.0.0\",\n    \"eslint\": \"^8.45.0\",\n    \"eslint-config-prettier\": \"^9.0.0\",\n    \"eslint-plugin-prettier\": \"^5.0.0\",\n    \"jest\": \"^29.5.0\",\n    \"prettier\": \"^3.0.0\",\n    \"cypress\": \"^12.17.0\"\n  }\n}\n```\n\n### **Dockerfile otimizado:**\n```dockerfile\n# Dockerfile para aplicação Next.js\nFROM node:18-alpine AS base\n\n# Instalar dependências apenas quando necessário\nFROM base AS deps\nRUN apk add --no-cache libc6-compat\nWORKDIR /app\n\n# Copiar arquivos de dependências\nCOPY package.json package-lock.json* ./\nRUN npm ci --only=production && npm cache clean --force\n\n# Build da aplicação\nFROM base AS builder\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\n\n# Gerar build de produção\nRUN npm run build\n\n# Imagem de produção\nFROM base AS runner\nWORKDIR /app\n\nENV NODE_ENV production\n\n# Criar usuário não-root\nRUN addgroup --system --gid 1001 nodejs\nRUN adduser --system --uid 1001 nextjs\n\n# Copiar aplicação\nCOPY --from=builder /app/public ./public\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static\n\nUSER nextjs\n\nEXPOSE 3000\n\nENV PORT 3000\nENV HOSTNAME \"0.0.0.0\"\n\nCMD [\"node\", \"server.js\"]\n```\n\n## 🎯 BENEFÍCIOS DESTE PIPELINE\n\n### **🔍 Qualidade do Código:**\n- Linting e formatação automática\n- Análise de segurança com Trivy\n- Cobertura de testes com SonarCloud\n- SBOM para rastreabilidade\n\n### **�� Testes Robustos:**\n- Testes em múltiplas versões do Node.js\n- Testes cross-platform (Windows, macOS, Linux)\n- Testes unitários, integração e E2E\n- Relatórios detalhados de cobertura\n\n### **🐳 Containerização Segura:**\n- Build multi-stage otimizado\n- Análise de vulnerabilidades\n- Cache de layers para builds rápidos\n- Imagens minimalistas e seguras\n\n### **🚀 Deploy Automatizado:**\n- Deploy em múltiplos ambientes\n- Infraestrutura como código com Terraform\n- Health checks automáticos\n- Rollback automático em caso de falha\n\n### **📊 Monitoramento e Feedback:**\n- Notificações em tempo real\n- Métricas de deploy\n- Relatórios automáticos\n- Integração com Slack\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Configurar monitoramento com Prometheus e Grafana\n2. Implementar infraestrutura como código com Terraform\n3. Configurar segurança e compliance\n4. Implementar observabilidade e tracing\n5. Otimizar performance e custos\n\n**🎓 Dica**: Este pipeline é um exemplo avançado. Comece implementando as partes básicas (lint, test, build) e gradualmente adicione as funcionalidades mais avançadas!'
                }
            ]
        }
    ]
};

// Conteúdo para Flutter Mobile - 36 aulas
export const flutterContent: CourseContent = {
    title: 'Flutter Mobile - CS50 Style',
    courseId: 'flutter-mobile',
    modules: [
        {
            id: 1,
            title: 'Fundamentos do Flutter',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução ao Flutter e Dart',
                    type: 'text',
                    duration: '80 min',
                    content: '# 🚀 INTRODUÇÃO AO FLUTTER E DART\n\n## 🎯 OBJETIVOS\n- Compreender Flutter e sua arquitetura\n- Aprender fundamentos da linguagem Dart\n- Configurar ambiente de desenvolvimento\n- Criar primeiro app Flutter\n\n## 📚 CONCEITOS FUNDAMENTAIS\n\n### O que é Flutter?\nFlutter é um framework de desenvolvimento multiplataforma criado pelo Google que permite criar aplicações nativas para iOS, Android, Web e Desktop usando uma única base de código.\n\n**Vantagens:**\n- **Hot Reload**: Desenvolvimento rápido com atualizações em tempo real\n- **Performance nativa**: Compilação para código nativo\n- **Widgets ricos**: Biblioteca extensa de componentes\n- **Material Design e Cupertino**: Suporte nativo para ambas as plataformas\n\n## 💻 CONFIGURAÇÃO DO AMBIENTE\n```bash\n# Instalar Flutter SDK\n# Baixar de: https://flutter.dev/docs/get-started/install\n\n# Verificar instalação\nflutter doctor\n\n# Criar novo projeto\nflutter create fenix_mobile_app\ncd fenix_mobile_app\n\n# Executar app\nflutter run\n```\n\n## 🔧 PRIMEIRO APP: FENIX ACADEMY MOBILE\n```dart\n// main.dart\nimport \'package:flutter/material.dart\';\nimport \'package:flutter/services.dart\';\nimport \'screens/home_screen.dart\';\nimport \'screens/courses_screen.dart\';\nimport \'screens/profile_screen.dart\';\nimport \'theme/app_theme.dart\';\n\nvoid main() {\n  runApp(const FenixAcademyApp());\n}\n\nclass FenixAcademyApp extends StatelessWidget {\n  const FenixAcademyApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: \'Fenix Academy\',\n      theme: AppTheme.lightTheme,\n      darkTheme: AppTheme.darkTheme,\n      themeMode: ThemeMode.system,\n      debugShowCheckedModeBanner: false,\n      home: const MainNavigation(),\n    );\n  }\n}\n\nclass MainNavigation extends StatefulWidget {\n  const MainNavigation({super.key});\n\n  @override\n  State<MainNavigation> createState() => _MainNavigationState();\n}\n\nclass _MainNavigationState extends State<MainNavigation> {\n  int _currentIndex = 0;\n\n  final List<Widget> _screens = [\n    const HomeScreen(),\n    const CoursesScreen(),\n    const ProfileScreen(),\n  ];\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      body: IndexedStack(\n        index: _currentIndex,\n        children: _screens,\n      ),\n      bottomNavigationBar: Container(\n        decoration: BoxDecoration(\n          boxShadow: [\n            BoxShadow(\n              color: Colors.black.withOpacity(0.1),\n              blurRadius: 10,\n              offset: const Offset(0, -5),\n            ),\n          ],\n        ),\n        child: BottomNavigationBar(\n          currentIndex: _currentIndex,\n          onTap: (index) => setState(() => _currentIndex = index),\n          type: BottomNavigationBarType.fixed,\n          backgroundColor: Colors.white,\n          selectedItemColor: AppTheme.primaryColor,\n          unselectedItemColor: Colors.grey,\n          items: const [\n            BottomNavigationBarItem(\n              icon: Icon(Icons.home),\n              label: \'Início\',\n            ),\n            BottomNavigationBarItem(\n              icon: Icon(Icons.school),\n              label: \'Cursos\',\n            ),\n            BottomNavigationBarItem(\n              icon: Icon(Icons.person),\n              label: \'Perfil\',\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}\n```\n\n## 🎨 TEMAS E ESTILOS\n\n### **AppTheme:**\n```dart\n// theme/app_theme.dart\nimport \'package:flutter/material.dart\';\n\nclass AppTheme {\n  static const Color primaryColor = Color(0xFF2E86AB);\n  static const Color secondaryColor = Color(0xFFA23B72);\n  static const Color accentColor = Color(0xFFF18F01);\n  static const Color backgroundColor = Color(0xFFF5F5F5);\n\n  static ThemeData get lightTheme {\n    return ThemeData(\n      primarySwatch: Colors.blue,\n      primaryColor: primaryColor,\n      scaffoldBackgroundColor: backgroundColor,\n      appBarTheme: const AppBarTheme(\n        backgroundColor: primaryColor,\n        foregroundColor: Colors.white,\n        elevation: 0,\n      ),\n      elevatedButtonTheme: ElevatedButtonThemeData(\n        style: ElevatedButton.styleFrom(\n          backgroundColor: primaryColor,\n          foregroundColor: Colors.white,\n          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),\n          shape: RoundedRectangleBorder(\n            borderRadius: BorderRadius.circular(8),\n          ),\n        ),\n      ),\n      cardTheme: CardTheme(\n        elevation: 4,\n        shape: RoundedRectangleBorder(\n          borderRadius: BorderRadius.circular(12),\n        ),\n      ),\n    );\n  }\n\n  static ThemeData get darkTheme {\n    return ThemeData.dark().copyWith(\n      primaryColor: primaryColor,\n      scaffoldBackgroundColor: const Color(0xFF121212),\n      appBarTheme: const AppBarTheme(\n        backgroundColor: Color(0xFF1E1E1E),\n        foregroundColor: Colors.white,\n        elevation: 0,\n      ),\n    );\n  }\n}\n```\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Implementar navegação entre telas\n2. Gerenciar estado com Provider/Bloc\n3. Integrar com APIs REST\n4. Implementar autenticação\n5. Publicar app nas lojas\n\n**🎓 Dica**: Flutter é excelente para desenvolvimento rápido. Use o Hot Reload para iterar rapidamente e testar suas ideias!'
                },
                {
                    id: 2,
                    title: 'Widgets e Layouts Avançados',
                    type: 'exercise',
                    duration: '85 min',
                    content: '# 🎨 WIDGETS E LAYOUTS AVANÇADOS\n\n## 🎯 EXERCÍCIO: DASHBOARD INTERATIVO\n```dart\n// widgets/dashboard_widget.dart\nimport \'package:flutter/material.dart\';\nimport \'../models/course_progress.dart\';\nimport \'../theme/app_theme.dart\';\nimport \'package:fl_chart/fl_chart.dart\';\n\nclass DashboardWidget extends StatelessWidget {\n  const DashboardWidget({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return Container(\n      padding: const EdgeInsets.all(16),\n      child: Column(\n        crossAxisAlignment: CrossAxisAlignment.start,\n        children: [\n          const Text(\n            \'Seu Progresso\',\n            style: TextStyle(\n              fontSize: 20,\n              fontWeight: FontWeight.bold,\n            ),\n          ),\n          const SizedBox(height: 16),\n          Row(\n            children: [\n              Expanded(\n                child: _buildProgressCard(\n                  title: \'Cursos Concluídos\',\n                  value: \'15\',\n                  total: \'72\',\n                  icon: Icons.check_circle,\n                  color: Colors.green,\n                ),\n              ),\n              const SizedBox(width: 16),\n              Expanded(\n                child: _buildProgressCard(\n                  title: \'Horas Estudadas\',\n                  value: \'48\',\n                  total: \'120\',\n                  icon: Icons.timer,\n                  color: Colors.blue,\n                ),\n              ),\n            ],\n          ),\n          const SizedBox(height: 24),\n          _buildChartSection(),\n          const SizedBox(height: 24),\n          _buildRecentActivity(),\n        ],\n      ),\n    );\n  }\n\n  Widget _buildProgressCard({\n    required String title,\n    required String value,\n    required String total,\n    required IconData icon,\n    required Color color,\n  }) {\n    return Container(\n      padding: const EdgeInsets.all(16),\n      decoration: BoxDecoration(\n        color: Colors.white,\n        borderRadius: BorderRadius.circular(12),\n        boxShadow: [\n          BoxShadow(\n            color: Colors.black.withOpacity(0.1),\n            blurRadius: 8,\n            offset: const Offset(0, 2),\n          ),\n        ],\n      ),\n      child: Column(\n        crossAxisAlignment: CrossAxisAlignment.start,\n        children: [\n          Row(\n            children: [\n              Icon(icon, color: color, size: 24),\n              const SizedBox(width: 8),\n              Expanded(\n                child: Text(\n                  title,\n                  style: const TextStyle(\n                    fontSize: 14,\n                    color: Colors.grey,\n                  ),\n                ),\n              ),\n            ],\n          ),\n          const SizedBox(height: 12),\n          Text(\n            \'$value/$total\',\n            style: TextStyle(\n              fontSize: 24,\n              fontWeight: FontWeight.bold,\n              color: color,\n            ),\n          ),\n          const SizedBox(height: 8),\n          LinearProgressIndicator(\n            value: int.parse(value) / int.parse(total),\n            backgroundColor: Colors.grey[300],\n            valueColor: AlwaysStoppedAnimation<Color>(color),\n          ),\n        ],\n      ),\n    );\n  }\n\n  Widget _buildChartSection() {\n    return Container(\n      padding: const EdgeInsets.all(16),\n      decoration: BoxDecoration(\n        color: Colors.white,\n        borderRadius: BorderRadius.circular(12),\n        boxShadow: [\n          BoxShadow(\n            color: Colors.black.withOpacity(0.1),\n            blurRadius: 8,\n            offset: const Offset(0, 2),\n          ),\n        ],\n      ),\n      child: Column(\n        crossAxisAlignment: CrossAxisAlignment.start,\n        children: [\n          const Text(\n            \'Atividade Semanal\',\n            style: TextStyle(\n              fontSize: 18,\n              fontWeight: FontWeight.bold,\n            ),\n          ),\n          const SizedBox(height: 16),\n          SizedBox(\n            height: 200,\n            child: LineChart(\n              LineChartData(\n                gridData: FlGridData(show: false),\n                titlesData: FlTitlesData(\n                  leftTitles: AxisTitles(\n                    sideTitles: SideTitles(\n                      showTitles: true,\n                      reservedSize: 40,\n                      getTitlesWidget: (value, meta) {\n                        return Text(\n                          value.toInt().toString(),\n                          style: const TextStyle(fontSize: 12),\n                        );\n                      },\n                    ),\n                  ),\n                  bottomTitles: AxisTitles(\n                    sideTitles: SideTitles(\n                      showTitles: true,\n                      getTitlesWidget: (value, meta) {\n                        const days = [\'Seg\', \'Ter\', \'Qua\', \'Qui\', \'Sex\', \'Sáb\', \'Dom\'];\n                        return Text(\n                          days[value.toInt()],\n                          style: const TextStyle(fontSize: 12),\n                        );\n                      },\n                    ),\n                  ),\n                  rightTitles: AxisTitles(\n                    sideTitles: SideTitles(showTitles: false),\n                  ),\n                  topTitles: AxisTitles(\n                    sideTitles: SideTitles(showTitles: false),\n                  ),\n                ),\n                borderData: FlBorderData(show: false),\n                lineBarsData: [\n                  LineChartBarData(\n                    spots: const [\n                      FlSpot(0, 3),\n                      FlSpot(1, 5),\n                      FlSpot(2, 2),\n                      FlSpot(3, 7),\n                      FlSpot(4, 4),\n                      FlSpot(5, 6),\n                      FlSpot(6, 3),\n                    ],\n                    isCurved: true,\n                    color: AppTheme.primaryColor,\n                    barWidth: 3,\n                    dotData: FlDotData(show: true),\n                    belowBarData: BarAreaData(\n                      show: true,\n                      color: AppTheme.primaryColor.withOpacity(0.1),\n                    ),\n                  ),\n                ],\n              ),\n            ),\n          ),\n        ],\n      ),\n    );\n  }\n\n  Widget _buildRecentActivity() {\n    return Container(\n      padding: const EdgeInsets.all(16),\n      decoration: BoxDecoration(\n        color: Colors.white,\n        borderRadius: BorderRadius.circular(12),\n        boxShadow: [\n          BoxShadow(\n            color: Colors.black.withOpacity(0.1),\n            blurRadius: 8,\n            offset: const Offset(0, 2),\n          ),\n        ],\n      ),\n      child: Column(\n        crossAxisAlignment: CrossAxisAlignment.start,\n        children: [\n          const Text(\n            \'Atividade Recente\',\n            style: TextStyle(\n              fontSize: 18,\n              fontWeight: FontWeight.bold,\n            ),\n          ),\n          const SizedBox(height: 16),\n          _buildActivityItem(\n            icon: Icons.play_circle,\n            title: \'Aula 15: Introdução ao React\',\n            subtitle: \'Fundamentos Web - há 2 horas\',\n            color: Colors.blue,\n          ),\n          const Divider(),\n          _buildActivityItem(\n            icon: Icons.assignment_turned_in,\n            title: \'Exercício concluído\',\n            subtitle: \'Python Data Science - há 1 dia\',\n            color: Colors.green,\n          ),\n          const Divider(),\n          _buildActivityItem(\n            icon: Icons.emoji_events,\n            title: \'Conquista desbloqueada\',\n            subtitle: \'Primeiro Projeto - há 3 dias\',\n            color: Colors.orange,\n          ),\n        ],\n      ),\n    );\n  }\n\n  Widget _buildActivityItem({\n    required IconData icon,\n    required String title,\n    required String subtitle,\n    required Color color,\n  }) {\n    return Padding(\n      padding: const EdgeInsets.symmetric(vertical: 8),\n      child: Row(\n        children: [\n          Container(\n            padding: const EdgeInsets.all(8),\n            decoration: BoxDecoration(\n              color: color.withOpacity(0.1),\n              borderRadius: BorderRadius.circular(8),\n            ),\n            child: Icon(icon, color: color, size: 20),\n          ),\n          const SizedBox(width: 12),\n          Expanded(\n            child: Column(\n              crossAxisAlignment: CrossAxisAlignment.start,\n              children: [\n                Text(\n                  title,\n                  style: const TextStyle(\n                    fontSize: 16,\n                    fontWeight: FontWeight.w600,\n                  ),\n                ),\n                Text(\n                  subtitle,\n                  style: TextStyle(\n                    fontSize: 14,\n                    color: Colors.grey[600],\n                  ),\n                ),\n              ],\n            ),\n          ),\n        ],\n      ),\n    );\n  }\n}\n```\n\n## 🔧 DEPENDÊNCIAS NECESSÁRIAS\n\n### **pubspec.yaml:**\n```yaml\ndependencies:\n  flutter:\n    sdk: flutter\n  fl_chart: ^0.65.0\n  http: ^1.1.0\n  provider: ^6.1.1\n  shared_preferences: ^2.2.2\n  cached_network_image: ^3.3.0\n  flutter_svg: ^2.0.9\n\n  cupertino_icons: ^1.0.2\n\ndev_dependencies:\n  flutter_test:\n    sdk: flutter\n  flutter_lints: ^3.0.0\n```\n\n## 🎯 BENEFÍCIOS DESTE DASHBOARD\n\n### **📊 Visualização de Dados:**\n- Gráficos interativos com fl_chart\n- Progresso visual com barras e indicadores\n- Métricas claras e organizadas\n\n### **🎨 Design Responsivo:**\n- Layout adaptável para diferentes tamanhos de tela\n- Cards com sombras e bordas arredondadas\n- Cores consistentes com o tema do app\n\n### **⚡ Performance:**\n- Widgets otimizados para renderização\n- Uso eficiente de const constructors\n- Lazy loading para listas grandes\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Implementar gerenciamento de estado\n2. Integrar com APIs REST\n3. Implementar autenticação\n4. Adicionar animações e transições\n5. Testar e debugar o app\n\n**🎓 Dica**: Use o Flutter Inspector para debugar layouts e o Performance Overlay para otimizar a performance!'
                }
            ]
        }
    ]
};

// Conteúdo para React Native Mobile - 32 aulas
export const reactNativeContent: CourseContent = {
    title: 'React Native Mobile - CS50 Style',
    courseId: 'react-native-mobile',
    modules: [
        {
            id: 1,
            title: 'Fundamentos do React Native',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução ao React Native',
                    type: 'text',
                    duration: '75 min',
                    content: '# 📱 INTRODUÇÃO AO REACT NATIVE\n\n## 🎯 OBJETIVOS\n- Compreender React Native e sua arquitetura\n- Configurar ambiente de desenvolvimento\n- Criar primeiro app mobile\n- Navegação básica entre telas\n\n## 📚 CONCEITOS FUNDAMENTAIS\n\n### O que é React Native?\nReact Native é um framework que permite desenvolver aplicações móveis nativas usando JavaScript/React, com componentes que se traduzem para código nativo iOS e Android.\n\n**Vantagens:**\n- **Cross-platform**: Um código para iOS e Android\n- **Performance nativa**: Componentes nativos reais\n- **Hot Reload**: Desenvolvimento rápido\n- **Ecosistema React**: Hooks, Context, etc.\n\n## 💻 CONFIGURAÇÃO DO AMBIENTE\n```bash\n# Instalar Expo CLI globalmente\nnpm install -g @expo/cli\n\n# Verificar instalação\nexpo --version\n\n# Criar novo projeto\nnpx create-expo-app FenixMobileApp\ncd FenixMobileApp\n\n# Instalar dependências essenciais\nnpm install @react-navigation/native @react-navigation/stack\nnpm install react-native-screens react-native-safe-area-context\nnpm install @react-native-async-storage/async-storage\nnpm install expo-linear-gradient expo-vector-icons\n\n# Iniciar projeto\nexpo start\n```\n\n## 🔧 PRIMEIRO APP: FENIX ACADEMY MOBILE\n```jsx\n// App.js\nimport React from "react";\nimport { NavigationContainer } from "@react-navigation/native";\nimport { createStackNavigator } from "@react-navigation/stack";\nimport { StatusBar } from "expo-status-bar";\nimport { SafeAreaProvider } from "react-native-safe-area-context";\n\n// Telas\nimport HomeScreen from "./screens/HomeScreen";\nimport CoursesScreen from "./screens/CoursesScreen";\nimport CourseDetailScreen from "./screens/CourseDetailScreen";\nimport ProfileScreen from "./screens/ProfileScreen";\n\nconst Stack = createStackNavigator();\n\nexport default function App() {\n  return (\n    <SafeAreaProvider>\n      <NavigationContainer>\n        <StatusBar style="auto" />\n        <Stack.Navigator\n          initialRouteName="Home"\n          screenOptions={{\n            headerStyle: {\n              backgroundColor: "#2E86AB",\n            },\n            headerTintColor: "#fff",\n            headerTitleStyle: {\n              fontWeight: "bold",\n            },\n          }}\n        >\n          <Stack.Screen \n            name="Home" \n            component={HomeScreen} \n            options={{ title: "Fenix Academy" }}\n          />\n          <Stack.Screen \n            name="Courses" \n            component={CoursesScreen} \n            options={{ title: "Cursos" }}\n          />\n          <Stack.Screen \n            name="CourseDetail" \n            component={CourseDetailScreen} \n            options={{ title: "Detalhes do Curso" }}\n          />\n          <Stack.Screen \n            name="Profile" \n            component={ProfileScreen} \n            options={{ title: "Perfil" }}\n          />\n        </Stack.Navigator>\n      </NavigationContainer>\n    </SafeAreaProvider>\n  );\n}\n```\n\n## 🎨 COMPONENTES NATIVOS\n\n### **Componentes Básicos:**\n- **View**: Container básico (equivalente ao div)\n- **Text**: Exibição de texto\n- **Image**: Exibição de imagens\n- **ScrollView**: Scroll vertical\n- **FlatList**: Lista otimizada para performance\n- **TouchableOpacity**: Botão com feedback visual\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Implementar navegação entre telas\n2. Gerenciar estado com Context/Redux\n3. Integrar com APIs REST\n4. Implementar autenticação\n5. Publicar app nas lojas\n\n**🎓 Dica**: React Native é excelente para desenvolvedores web que querem criar apps mobile!'
                },
                {
                    id: 2,
                    title: 'Navegação e Estado Global',
                    type: 'exercise',
                    duration: '80 min',
                    content: '# 🧭 NAVEGAÇÃO E ESTADO GLOBAL\n\n## 🎯 EXERCÍCIO: SISTEMA DE AUTENTICAÇÃO MOBILE\n```jsx\n// context/AuthContext.js\nimport React, { createContext, useContext, useReducer, useEffect } from "react";\nimport AsyncStorage from "@react-native-async-storage/async-storage";\n\nconst AuthContext = createContext();\n\nconst initialState = {\n  user: null,\n  token: null,\n  isLoading: true,\n  isAuthenticated: false,\n};\n\nfunction authReducer(state, action) {\n  switch (action.type) {\n    case "LOGIN_START":\n      return { ...state, isLoading: true };\n    case "LOGIN_SUCCESS":\n      return {\n        ...state,\n        user: action.payload.user,\n        token: action.payload.token,\n        isAuthenticated: true,\n        isLoading: false,\n      };\n    case "LOGIN_FAILURE":\n      return { ...state, isLoading: false };\n    case "LOGOUT":\n      return {\n        ...state,\n        user: null,\n        token: null,\n        isAuthenticated: false,\n        isLoading: false,\n      };\n    case "UPDATE_PROFILE":\n      return {\n        ...state,\n        user: { ...state.user, ...action.payload },\n      };\n    default:\n      return state;\n  }\n}\n\nexport function AuthProvider({ children }) {\n  const [state, dispatch] = useReducer(authReducer, initialState);\n\n  // Verificar token salvo ao iniciar\n  useEffect(() => {\n    checkAuthToken();\n  }, []);\n\n  const checkAuthToken = async () => {\n    try {\n      const token = await AsyncStorage.getItem("authToken");\n      const userData = await AsyncStorage.getItem("userData");\n\n      if (token && userData) {\n        const user = JSON.parse(userData);\n        dispatch({\n          type: "LOGIN_SUCCESS",\n          payload: { user, token },\n        });\n      } else {\n        dispatch({ type: "LOGOUT" });\n      }\n    } catch (error) {\n      console.error("Erro ao verificar token:", error);\n      dispatch({ type: "LOGOUT" });\n    }\n  };\n\n  const login = async (email, password) => {\n    dispatch({ type: "LOGIN_START" });\n\n    try {\n      // Simular API call\n      await new Promise((resolve) => setTimeout(resolve, 1500));\n\n      // Mock de resposta da API\n      const mockResponse = {\n        user: {\n          id: 1,\n          name: "João Silva",\n          email: email,\n          avatar: "https://via.placeholder.com/100",\n          courses: [1, 2, 3],\n          progress: {\n            completed: 15,\n            total: 72,\n          },\n        },\n        token: "mock_jwt_token_" + Date.now(),\n      };\n\n      // Salvar no AsyncStorage\n      await AsyncStorage.setItem("authToken", mockResponse.token);\n      await AsyncStorage.setItem("userData", JSON.stringify(mockResponse.user));\n\n      dispatch({\n        type: "LOGIN_SUCCESS",\n        payload: mockResponse,\n      });\n\n      return { success: true };\n    } catch (error) {\n      dispatch({ type: "LOGIN_FAILURE" });\n      return { success: false, error: error.message };\n    }\n  };\n\n  const logout = async () => {\n    try {\n      await AsyncStorage.removeItem("authToken");\n      await AsyncStorage.removeItem("userData");\n      dispatch({ type: "LOGOUT" });\n    } catch (error) {\n      console.error("Erro ao fazer logout:", error);\n    }\n  };\n\n  const updateProfile = async (updates) => {\n    try {\n      const updatedUser = { ...state.user, ...updates };\n      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));\n      dispatch({ type: "UPDATE_PROFILE", payload: updates });\n      return { success: true };\n    } catch (error) {\n      return { success: false, error: error.message };\n    }\n  };\n\n  const value = {\n    ...state,\n    login,\n    logout,\n    updateProfile,\n  };\n\n  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;\n}\n\nexport function useAuth() {\n  const context = useContext(AuthContext);\n  if (!context) {\n    throw new Error("useAuth deve ser usado dentro de AuthProvider");\n  }\n  return context;\n}\n```\n\n## 🔧 DEPENDÊNCIAS NECESSÁRIAS\n\n### **package.json:**\n```json\n{\n  \"dependencies\": {\n    \"@react-navigation/native\": \"^6.1.9\",\n    \"@react-navigation/stack\": \"^6.3.20\",\n    \"react-native-screens\": \"^3.29.0\",\n    \"react-native-safe-area-context\": \"^4.9.0\",\n    \"@react-native-async-storage/async-storage\": \"^1.21.0\",\n    \"expo-linear-gradient\": \"~12.7.1\",\n    \"expo-vector-icons\": \"^14.0.0\"\n  }\n}\n```\n\n## 🎯 BENEFÍCIOS DESTE SISTEMA\n\n### **🔐 Autenticação Segura:**\n- Gerenciamento de estado com useReducer\n- Persistência de dados com AsyncStorage\n- Context API para estado global\n- Proteção de rotas\n\n### **⚡ Performance:**\n- Estado otimizado com useReducer\n- Lazy loading de componentes\n- Memoização com useMemo e useCallback\n- FlatList para listas grandes\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Implementar navegação entre telas\n2. Gerenciar estado com Provider/Redux\n3. Integrar com APIs REST\n4. Implementar autenticação\n5. Adicionar animações e transições\n\n**🎓 Dica**: Use o React DevTools para debugar estado e o Performance Monitor para otimizar a performance!'
                }
            ]
        }
    ]
};

// Conteúdo para AWS Cloud - 38 aulas
export const awsCloudContent: CourseContent = {
    title: 'AWS Cloud - CS50 Style',
    courseId: 'aws-cloud',
    modules: [
        {
            id: 1,
            title: 'Fundamentos da AWS',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução à AWS e Cloud Computing',
                    type: 'text',
                    duration: '70 min',
                    content: '# ☁️ INTRODUÇÃO À AWS E CLOUD COMPUTING\n\n## 🎯 OBJETIVOS\n- Compreender conceitos fundamentais de cloud computing\n- Entender a arquitetura da AWS\n- Configurar conta AWS e IAM\n- Primeiros passos com serviços básicos\n\n## 📚 CONCEITOS FUNDAMENTAIS\n\n### O que é Cloud Computing?\nCloud Computing é o fornecimento de recursos de computação sob demanda através da internet, com pagamento apenas pelo que for usado.\n\n**Modelos de Serviço:**\n- **IaaS** (Infrastructure as a Service): Servidores, storage, redes\n- **PaaS** (Platform as a Service): Ambiente de desenvolvimento\n- **SaaS** (Software as a Service): Aplicações prontas para uso\n\n**Modelos de Implantação:**\n- **Pública**: Recursos compartilhados (AWS, Azure, GCP)\n- **Privada**: Recursos dedicados à organização\n- **Híbrida**: Combinação de público e privado\n\n## 🏗️ ARQUITETURA AWS\n\n### **Regiões e Zonas de Disponibilidade:**\n- **Regiões**: Localizações geográficas independentes\n- **AZs**: Data centers isolados dentro de uma região\n- **Edge Locations**: Pontos de presença para CDN\n\n### **Serviços Principais:**\n- **Compute**: EC2, Lambda, ECS, EKS\n- **Storage**: S3, EBS, EFS, Glacier\n- **Database**: RDS, DynamoDB, ElastiCache\n- **Networking**: VPC, Route 53, CloudFront\n- **Security**: IAM, KMS, CloudTrail\n\n## 💻 LABORATÓRIO: CONFIGURAÇÃO INICIAL\n```bash\n#!/bin/bash\n# Fenix Academy - Setup AWS Environment\n# Este script configura um ambiente AWS básico\n\necho \"☁️ FENIX ACADEMY - CONFIGURANDO AMBIENTE AWS\"\necho \"=============================================\"\n\n# Verificar se AWS CLI está instalado\nif ! command -v aws &> /dev/null; then\n    echo \"📦 Instalando AWS CLI...\"\n    \n    # Para Ubuntu/Debian\n    if command -v apt-get &> /dev/null; then\n        curl \"https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip\" -o \"awscliv2.zip\"\n        unzip awscliv2.zip\n        sudo ./aws/install\n        rm -rf aws awscliv2.zip\n    # Para macOS\n    elif command -v brew &> /dev/null; then\n        brew install awscli\n    # Para Windows (usar chocolatey)\n    else\n        echo \"⚠️  Instale o AWS CLI manualmente para seu sistema operacional\"\n        echo \"📖 Guia: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html\"\n    fi\n    \n    echo \"✅ AWS CLI instalado com sucesso!\"\nelse\n    echo \"✅ AWS CLI já está instalado\"\nfi\n\n# Verificar se Terraform está instalado\nif ! command -v terraform &> /dev/null; then\n    echo \"📦 Instalando Terraform...\"\n    \n    # Para Ubuntu/Debian\n    if command -v apt-get &> /dev/null; then\n        wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg\n        echo \"deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main\" | sudo tee /etc/apt/sources.list.d/hashicorp.list\n        sudo apt update && sudo apt install terraform\n    # Para macOS\n    elif command -v brew &> /dev/null; then\n        brew install terraform\n    else\n        echo \"⚠️  Instale o Terraform manualmente para seu sistema operacional\"\n        echo \"📖 Guia: https://developer.hashicorp.com/terraform/downloads\"\n    fi\n    \n    echo \"✅ Terraform instalado com sucesso!\"\nelse\n    echo \"✅ Terraform já está instalado\"\nfi\n\n# Criar estrutura de diretórios para projetos AWS\nmkdir -p ~/aws-projects\nmkdir -p ~/aws-projects/ec2-instances\nmkdir -p ~/aws-projects/s3-storage\nmkdir -p ~/aws-projects/rds-databases\nmkdir -p ~/aws-projects/lambda-functions\nmkdir -p ~/aws-projects/vpc-networking\nmkdir -p ~/aws-projects/terraform\n\n# Configurar AWS CLI (usuário deve configurar manualmente)\necho \"\\n🔧 CONFIGURAÇÃO DO AWS CLI\"\necho \"⚠️  Execute os seguintes comandos para configurar suas credenciais:\"\necho \"aws configure\"\necho \"\\n📋 Informações necessárias:\"\necho \"- AWS Access Key ID\"\necho \"- AWS Secret Access Key\"\necho \"- Default region (ex: us-east-1)\"\necho \"- Default output format (json)\"\n\necho \"\\n📁 Estrutura de diretórios criada em: ~/aws-projects\"\necho \"🚀 Próximo passo: Configurar credenciais AWS e criar primeiro projeto!\"\n```\n\n## 🔐 SEGURANÇA E IAM\n\n### **Princípios de Segurança:**\n- **Princípio do Menor Privilégio**: Apenas permissões necessárias\n- **Separação de Responsabilidades**: Diferentes usuários para diferentes funções\n- **Auditoria**: Logs de todas as ações\n- **Criptografia**: Dados em repouso e em trânsito\n\n### **IAM (Identity and Access Management):**\n- **Usuários**: Contas para pessoas ou aplicações\n- **Grupos**: Coleções de usuários\n- **Políticas**: Permissões em formato JSON\n- **Roles**: Permissões temporárias para recursos\n\n## 💰 MODELO DE PREÇOS\n\n### **Princípios de Cobrança:**\n- **Pay-as-you-go**: Pague apenas pelo que usar\n- **Reserved Instances**: Desconto para uso de longo prazo\n- **Spot Instances**: Preços baixos para workloads flexíveis\n- **Savings Plans**: Descontos para uso consistente\n\n### **Otimização de Custos:**\n- **Right-sizing**: Escolher o tamanho correto dos recursos\n- **Auto-scaling**: Ajustar automaticamente baseado na demanda\n- **Lifecycle Policies**: Gerenciar dados automaticamente\n- **Cost Explorer**: Analisar e otimizar gastos\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Configurar VPC e networking\n2. Criar e gerenciar instâncias EC2\n3. Configurar S3 e storage\n4. Implementar RDS e databases\n5. Configurar monitoramento e alertas\n\n**🎓 Dica**: AWS oferece uma camada gratuita (Free Tier) para novos usuários. Use-a para praticar sem custos!'
                },
                {
                    id: 2,
                    title: 'VPC e Networking',
                    type: 'exercise',
                    duration: '85 min',
                    content: '# 🌐 VPC E NETWORKING\n\n## 🎯 EXERCÍCIO: ARQUITETURA DE REDE COMPLETA\n```hcl\n# terraform/vpc.tf\n# Fenix Academy - VPC e Networking com Terraform\n\nterraform {\n  required_version = \">= 1.0\"\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region = var.aws_region\n}\n\n# VPC Principal\nresource \"aws_vpc\" \"main\" {\n  cidr_block           = var.vpc_cidr\n  enable_dns_hostnames = true\n  enable_dns_support   = true\n  \n  tags = {\n    Name        = \"${var.project_name}-vpc\"\n    Environment = var.environment\n    Project     = var.project_name\n    ManagedBy   = \"Terraform\"\n  }\n}\n\n# Internet Gateway\nresource \"aws_internet_gateway\" \"main\" {\n  vpc_id = aws_vpc.main.id\n  \n  tags = {\n    Name        = \"${var.project_name}-igw\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\n# Subnets Públicas\nresource \"aws_subnet\" \"public\" {\n  count             = length(var.public_subnets)\n  vpc_id            = aws_vpc.main.id\n  cidr_block        = var.public_subnets[count.index]\n  availability_zone = var.availability_zones[count.index]\n  \n  map_public_ip_on_launch = true\n  \n  tags = {\n    Name        = \"${var.project_name}-public-${count.index + 1}\"\n    Environment = var.environment\n    Project     = var.project_name\n    Type        = \"Public\"\n  }\n}\n\n# Subnets Privadas\nresource \"aws_subnet\" \"private\" {\n  count             = length(var.private_subnets)\n  vpc_id            = aws_vpc.main.id\n  cidr_block        = var.private_subnets[count.index]\n  availability_zone = var.availability_zones[count.index]\n  \n  tags = {\n    Name        = \"${var.project_name}-private-${count.index + 1}\"\n    Environment = var.environment\n    Project     = var.project_name\n    Type        = \"Private\"\n  }\n}\n\n# Subnets de Database\nresource \"aws_subnet\" \"database\" {\n  count             = length(var.database_subnets)\n  vpc_id            = aws_vpc.main.id\n  cidr_block        = var.database_subnets[count.index]\n  availability_zone = var.availability_zones[count.index]\n  \n  tags = {\n    Name        = \"${var.project_name}-database-${count.index + 1}\"\n    Environment = var.environment\n    Project     = var.project_name\n    Type        = \"Database\"\n  }\n}\n\n# Route Table Pública\nresource \"aws_route_table\" \"public\" {\n  vpc_id = aws_vpc.main.id\n  \n  route {\n    cidr_block = \"0.0.0.0/0\"\n    gateway_id = aws_internet_gateway.main.id\n  }\n  \n  tags = {\n    Name        = \"${var.project_name}-public-rt\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\n# Route Table Privada\nresource \"aws_route_table\" \"private\" {\n  vpc_id = aws_vpc.main.id\n  \n  tags = {\n    Name        = \"${var.project_name}-private-rt\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\n# Route Table de Database\nresource \"aws_route_table\" \"database\" {\n  vpc_id = aws_vpc.main.id\n  \n  tags = {\n    Name        = \"${var.project_name}-database-rt\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\n# Associações de Route Tables\nresource \"aws_route_table_association\" \"public\" {\n  count          = length(var.public_subnets)\n  subnet_id      = aws_subnet.public[count.index].id\n  route_table_id = aws_route_table.public.id\n}\n\nresource \"aws_route_table_association\" \"private\" {\n  count          = length(var.private_subnets)\n  subnet_id      = aws_subnet.private[count.index].id\n  route_table_id = aws_route_table.private.id\n}\n\nresource \"aws_route_table_association\" \"database\" {\n  count          = length(var.database_subnets)\n  subnet_id      = aws_subnet.database[count.index].id\n  route_table_id = aws_route_table.database.id\n}\n\n# NAT Gateway para subnets privadas\nresource \"aws_eip\" \"nat\" {\n  count = var.enable_nat_gateway ? 1 : 0\n  domain = \"vpc\"\n  \n  tags = {\n    Name        = \"${var.project_name}-nat-eip\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\nresource \"aws_nat_gateway\" \"main\" {\n  count         = var.enable_nat_gateway ? 1 : 0\n  allocation_id = aws_eip.nat[0].id\n  subnet_id     = aws_subnet.public[0].id\n  \n  tags = {\n    Name        = \"${var.project_name}-nat-gateway\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\n# Adicionar rota para NAT Gateway nas subnets privadas\nresource \"aws_route\" \"private_nat_gateway\" {\n  count                  = var.enable_nat_gateway ? length(var.private_subnets) : 0\n  route_table_id         = aws_route_table.private.id\n  destination_cidr_block = \"0.0.0.0/0\"\n  nat_gateway_id         = aws_nat_gateway.main[0].id\n}\n\n# Security Groups\nresource \"aws_security_group\" \"web\" {\n  name_prefix = \"${var.project_name}-web-sg\"\n  vpc_id      = aws_vpc.main.id\n  \n  description = \"Security group for web servers\"\n  \n  ingress {\n    description = \"HTTP from anywhere\"\n    from_port   = 80\n    to_port     = 80\n    protocol    = \"tcp\"\n    cidr_blocks = [\"0.0.0.0/0\"]\n  }\n  \n  ingress {\n    description = \"HTTPS from anywhere\"\n    from_port   = 443\n    to_port     = 443\n    protocol    = \"tcp\"\n    cidr_blocks = [\"0.0.0.0/0\"]\n  }\n  \n  ingress {\n    description = \"SSH from anywhere (apenas para desenvolvimento)\"\n    from_port   = 22\n    to_port     = 22\n    protocol    = \"tcp\"\n    cidr_blocks = [\"0.0.0.0/0\"]\n  }\n  \n  egress {\n    from_port   = 0\n    to_port     = 0\n    protocol    = \"-1\"\n    cidr_blocks = [\"0.0.0.0/0\"]\n  }\n  \n  tags = {\n    Name        = \"${var.project_name}-web-sg\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\nresource \"aws_security_group\" \"database\" {\n  name_prefix = \"${var.project_name}-database-sg\"\n  vpc_id      = aws_vpc.main.id\n  \n  description = \"Security group for database servers\"\n  \n  ingress {\n    description = \"MySQL from web servers\"\n    from_port   = 3306\n    to_port     = 3306\n    protocol    = \"tcp\"\n    security_groups = [aws_security_group.web.id]\n  }\n  \n  ingress {\n    description = \"PostgreSQL from web servers\"\n    from_port   = 5432\n    to_port     = 5432\n    protocol    = \"tcp\"\n    security_groups = [aws_security_group.web.id]\n  }\n  \n  egress {\n    from_port   = 0\n    to_port     = 0\n    protocol    = \"-1\"\n    cidr_blocks = [\"0.0.0.0/0\"]\n  }\n  \n  tags = {\n    Name        = \"${var.project_name}-database-sg\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\n# VPC Endpoints para serviços AWS\nresource \"aws_vpc_endpoint\" \"s3\" {\n  vpc_id       = aws_vpc.main.id\n  service_name = \"com.amazonaws.${var.aws_region}.s3\"\n  \n  tags = {\n    Name        = \"${var.project_name}-s3-endpoint\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\nresource \"aws_vpc_endpoint\" \"dynamodb\" {\n  vpc_id       = aws_vpc.main.id\n  service_name = \"com.amazonaws.${var.aws_region}.dynamodb\"\n  \n  tags = {\n    Name        = \"${var.project_name}-dynamodb-endpoint\"\n    Environment = var.environment\n    Project     = var.project_name\n  }\n}\n\n# Outputs\noutput \"vpc_id\" {\n  description = \"ID da VPC criada\"\n  value       = aws_vpc.main.id\n}\n\noutput \"public_subnet_ids\" {\n  description = \"IDs das subnets públicas\"\n  value       = aws_subnet.public[*].id\n}\n\noutput \"private_subnet_ids\" {\n  description = \"IDs das subnets privadas\"\n  value       = aws_subnet.private[*].id\n}\n\noutput \"database_subnet_ids\" {\n  description = \"IDs das subnets de database\"\n  value       = aws_subnet.database[*].id\n}\n\noutput \"web_security_group_id\" {\n  description = \"ID do security group para web servers\"\n  value       = aws_security_group.web.id\n}\n\noutput \"database_security_group_id\" {\n  description = \"ID do security group para databases\"\n  value       = aws_security_group.database.id\n}\n```\n\n## 🔧 CONFIGURAÇÃO DE VARIÁVEIS\n\n### **variables.tf:**\n```hcl\nvariable \"aws_region\" {\n  description = \"Região AWS para deploy\"\n  type        = string\n  default     = \"us-east-1\"\n}\n\nvariable \"project_name\" {\n  description = \"Nome do projeto\"\n  type        = string\n  default     = \"fenix-academy\"\n}\n\nvariable \"environment\" {\n  description = \"Ambiente (dev, staging, prod)\"\n  type        = string\n  default     = \"dev\"\n}\n\nvariable \"vpc_cidr\" {\n  description = \"CIDR block para a VPC\"\n  type        = string\n  default     = \"10.0.0.0/16\"\n}\n\nvariable \"public_subnets\" {\n  description = \"CIDR blocks para subnets públicas\"\n  type        = list(string)\n  default     = [\"10.0.1.0/24\", \"10.0.2.0/24\"]\n}\n\nvariable \"private_subnets\" {\n  description = \"CIDR blocks para subnets privadas\"\n  type        = list(string)\n  default     = [\"10.0.10.0/24\", \"10.0.11.0/24\"]\n}\n\nvariable \"database_subnets\" {\n  description = \"CIDR blocks para subnets de database\"\n  type        = list(string)\n  default     = [\"10.0.20.0/24\", \"10.0.21.0/24\"]\n}\n\nvariable \"availability_zones\" {\n  description = \"Zonas de disponibilidade\"\n  type        = list(string)\n  default     = [\"us-east-1a\", \"us-east-1b\"]\n}\n\nvariable \"enable_nat_gateway\" {\n  description = \"Habilitar NAT Gateway para subnets privadas\"\n  type        = bool\n  default     = true\n}\n```\n\n## 🚀 DEPLOY E TESTE\n\n### **Comandos para deploy:**\n```bash\n# Inicializar Terraform\nterraform init\n\n# Verificar plano\nterraform plan\n\n# Aplicar configuração\nterraform apply\n\n# Verificar recursos criados\nterraform show\n\n# Destruir recursos (cuidado!)\nterraform destroy\n```\n\n## 🎯 BENEFÍCIOS DESTA ARQUITETURA\n\n### **🔒 Segurança:**\n- Subnets isoladas por tipo de recurso\n- Security groups restritivos\n- NAT Gateway para acesso controlado à internet\n- VPC Endpoints para serviços AWS\n\n### **📈 Escalabilidade:**\n- Múltiplas AZs para alta disponibilidade\n- Subnets separadas para diferentes tipos de recursos\n- Estrutura preparada para auto-scaling\n\n### **💰 Otimização de Custos:**\n- NAT Gateway apenas quando necessário\n- VPC Endpoints para reduzir custos de transferência\n- Estrutura modular e reutilizável\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Criar e gerenciar instâncias EC2\n2. Configurar S3 e storage\n3. Implementar RDS e databases\n4. Configurar auto-scaling\n5. Implementar monitoramento e alertas\n\n**🎓 Dica**: Use o AWS VPC Wizard para criar rapidamente uma VPC básica, mas aprenda a criar manualmente para entender todos os componentes!'
                }
            ]
        }
    ]
};

// Conteúdo para Blockchain e Smart Contracts - 26 aulas
// Conteúdo para Blockchain e Smart Contracts - 26 aulas
export const blockchainContent: CourseContent = {
    title: 'Blockchain e Smart Contracts - CS50 Style',
    courseId: 'blockchain-smart-contracts',
    modules: [
        {
            id: 1,
            title: 'Fundamentos de Blockchain',
            lessons: [
                {
                    id: 1,
                    title: 'Introdução ao Blockchain e Criptomoedas',
                    type: 'text',
                    duration: '75 min',
                    content: '# ⛓️ INTRODUÇÃO AO BLOCKCHAIN E CRIPTOMOEDAS\n\n## 🎯 OBJETIVOS\n- Compreender conceitos fundamentais de blockchain\n- Entender como funcionam criptomoedas\n- Aprender sobre descentralização e consenso\n- Introdução a smart contracts\n\n## 📚 CONCEITOS FUNDAMENTAIS\n\n### O que é Blockchain?\nBlockchain é uma tecnologia de registro distribuído que permite criar um livro-razão digital imutável e compartilhado entre múltiplas partes sem necessidade de um intermediário central.\n\n**Características Principais:**\n- **Descentralização**: Não há autoridade central\n- **Imutabilidade**: Dados não podem ser alterados\n- **Transparência**: Todas as transações são visíveis\n- **Segurança**: Criptografia avançada\n- **Consenso**: Acordo entre participantes\n\n## �� ESTRUTURA DO BLOCKCHAIN\n\n### **Blocos:**\n- **Header**: Metadados do bloco (hash anterior, timestamp, nonce)\n- **Body**: Lista de transações\n- **Hash**: Identificador único do bloco\n\n### **Cadeia de Blocos:**\n- Cada bloco contém o hash do bloco anterior\n- Forma uma cadeia cronológica\n- Alterar um bloco invalida todos os posteriores\n\n## 💰 CRIPTOMOEDAS\n\n### **Bitcoin (BTC):**\n- Primeira criptomoeda descentralizada\n- Criada por Satoshi Nakamoto em 2009\n- Supply limitado a 21 milhões\n- Algoritmo de consenso: Proof of Work (PoW)\n\n### **Ethereum (ETH):**\n- Plataforma para smart contracts\n- Criada por Vitalik Buterin em 2015\n- Suporte a aplicações descentralizadas (dApps)\n- Transição para Proof of Stake (PoS)\n\n## �� MECANISMOS DE CONSENSO\n\n### **Proof of Work (PoW):**\n- Mineração através de computação intensiva\n- Recompensa por resolver puzzles criptográficos\n- Alto consumo de energia\n- Exemplo: Bitcoin, Litecoin\n\n### **Proof of Stake (PoS):**\n- Validação baseada em quantidade de tokens\n- Menor consumo de energia\n- Maior escalabilidade\n- Exemplo: Ethereum 2.0, Cardano\n\n## 💻 LABORATÓRIO: CRIANDO UMA BLOCKCHAIN SIMPLES\n```python\n#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"\nFenix Academy - Blockchain Simples em Python\nImplementação educacional para entender conceitos fundamentais\n\"\"\"\n\nimport hashlib\nimport json\nimport time\nfrom typing import List, Dict, Any\nfrom dataclasses import dataclass, asdict\nfrom datetime import datetime\n\n@dataclass\nclass Transaction:\n    \"\"\"Representa uma transação na blockchain\"\"\"\n    sender: str\n    recipient: str\n    amount: float\n    timestamp: float\n    \n    def to_dict(self) -> Dict[str, Any]:\n        \"\"\"Converter transação para dicionário\"\"\"\n        return asdict(self)\n    \n    def calculate_hash(self) -> str:\n        \"\"\"Calcular hash da transação\"\"\"\n        transaction_string = json.dumps(self.to_dict(), sort_keys=True)\n        return hashlib.sha256(transaction_string.encode()).hexdigest()\n\n@dataclass\nclass Block:\n    \"\"\"Representa um bloco na blockchain\"\"\"\n    index: int\n    timestamp: float\n    transactions: List[Transaction]\n    previous_hash: str\n    nonce: int = 0\n    \n    def calculate_hash(self) -> str:\n        \"\"\"Calcular hash do bloco\"\"\"\n        block_string = json.dumps({\n            \'index\': self.index,\n            \'timestamp\': self.timestamp,\n            \'transactions\': [tx.to_dict() for tx in self.transactions],\n            \'previous_hash\': self.previous_hash,\n            \'nonce\': self.nonce\n        }, sort_keys=True)\n        return hashlib.sha256(block_string.encode()).hexdigest()\n    \n    def mine_block(self, difficulty: int) -> None:\n        \"\"\"Minerar o bloco com dificuldade especificada\"\"\"\n        target = \'0\' * difficulty\n        \n        while self.calculate_hash()[:difficulty] != target:\n            self.nonce += 1\n            self.timestamp = time.time()\n        \n        print(f\"�� Bloco {self.index} minerado! Nonce: {self.nonce}\")\n        print(f\"🔗 Hash: {self.calculate_hash()}\")\n\nclass Blockchain:\n    \"\"\"Implementação de uma blockchain simples\"\"\"\n    \n    def __init__(self):\n        self.chain: List[Block] = []\n        self.difficulty = 4\n        self.pending_transactions: List[Transaction] = []\n        self.mining_reward = 10.0\n        \n        # Criar bloco genesis\n        self.create_genesis_block()\n    \n    def create_genesis_block(self) -> None:\n        \"\"\"Criar o primeiro bloco da blockchain\"\"\"\n        genesis_block = Block(\n            index=0,\n            timestamp=time.time(),\n            transactions=[],\n            previous_hash=\'0\'\n        )\n        \n        self.chain.append(genesis_block)\n        print(\"🌱 Bloco Genesis criado!\")\n        print(f\"🔗 Hash: {genesis_block.calculate_hash()}\")\n    \n    def get_latest_block(self) -> Block:\n        \"\"\"Obter o último bloco da cadeia\"\"\"\n        return self.chain[-1]\n    \n    def add_transaction(self, sender: str, recipient: str, amount: float) -> None:\n        \"\"\"Adicionar nova transação à lista pendente\"\"\"\n        transaction = Transaction(\n            sender=sender,\n            recipient=recipient,\n            amount=amount,\n            timestamp=time.time()\n        )\n        \n        self.pending_transactions.append(transaction)\n        print(f\"📝 Transação adicionada: {sender} -> {recipient}: {amount} tokens\")\n    \n    def mine_pending_transactions(self, miner_address: str) -> None:\n        \"\"\"Minerar transações pendentes\"\"\"\n        if not self.pending_transactions:\n            print(\"⚠️  Nenhuma transação pendente para minerar\")\n            return\n        \n        # Criar novo bloco\n        block = Block(\n            index=len(self.chain),\n            timestamp=time.time(),\n            transactions=self.pending_transactions,\n            previous_hash=self.get_latest_block().calculate_hash()\n        )\n        \n        # Minerar o bloco\n        print(f\"⛏️  Minerando bloco {block.index}...\")\n        block.mine_block(self.difficulty)\n        \n        # Adicionar à cadeia\n        self.chain.append(block)\n        \n        # Limpar transações pendentes e adicionar recompensa\n        self.pending_transactions = [\n            Transaction(\n                sender=\"Sistema\",\n                recipient=miner_address,\n                amount=self.mining_reward,\n                timestamp=time.time()\n            )\n        ]\n        \n        print(f\"✅ Bloco {block.index} adicionado à blockchain!\")\n        print(f\"💰 Recompensa de {self.mining_reward} tokens enviada para {miner_address}\")\n    \n    def is_chain_valid(self) -> bool:\n        \"\"\"Verificar se a blockchain é válida\"\"\"\n        for i in range(1, len(self.chain)):\n            current_block = self.chain[i]\n            previous_block = self.chain[i-1]\n            \n            # Verificar hash do bloco atual\n            if current_block.calculate_hash() != current_block.calculate_hash():\n                print(f\"❌ Hash inválido no bloco {i}\")\n                return False\n            \n            # Verificar link com bloco anterior\n            if current_block.previous_hash != previous_block.calculate_hash():\n                print(f\"❌ Link inválido no bloco {i}\")\n                return False\n            \n            # Verificar proof of work\n            if current_block.calculate_hash()[:self.difficulty] != \'0\' * self.difficulty:\n                print(f\"❌ Proof of work inválido no bloco {i}\")\n                return False\n        \n        print(\"✅ Blockchain válida!\")\n        return True\n    \n    def get_balance(self, address: str) -> float:\n        \"\"\"Calcular saldo de um endereço\"\"\"\n        balance = 0.0\n        \n        for block in self.chain:\n            for transaction in block.transactions:\n                if transaction.sender == address:\n                    balance -= transaction.amount\n                if transaction.recipient == address:\n                    balance += transaction.amount\n        \n        return balance\n    \n    def print_chain(self) -> None:\n        \"\"\"Imprimir toda a blockchain\"\"\"\n        print(\"\\n\" + \"=\"*60)\n        print(\"⛓️  BLOCKCHAIN COMPLETA\")\n        print(\"=\"*60)\n        \n        for block in self.chain:\n            print(f\"\\n�� BLOCO {block.index}\")\n            print(f\"⏰ Timestamp: {datetime.fromtimestamp(block.timestamp)}\")\n            print(f\"🔗 Hash Anterior: {block.previous_hash}\")\n            print(f\"�� Hash Atual: {block.calculate_hash()}\")\n            print(f\"⛏️  Nonce: {block.nonce}\")\n            print(f\"📝 Transações: {len(block.transactions)}\")\n            \n            for i, tx in enumerate(block.transactions):\n                print(f\"  {i+1}. {tx.sender} -> {tx.recipient}: {tx.amount} tokens\")\n        \n        print(\"\\n\" + \"=\"*60)\n\n# Exemplo de uso\nif __name__ == \"__main__\":\n    print(\"⛓️  FENIX ACADEMY - BLOCKCHAIN SIMPLES\")\n    print(\"=\"*50)\n    \n    # Criar blockchain\n    fenix_coin = Blockchain()\n    \n    # Adicionar algumas transações\n    fenix_coin.add_transaction(\"Alice\", \"Bob\", 50.0)\n    fenix_coin.add_transaction(\"Bob\", \"Charlie\", 30.0)\n    fenix_coin.add_transaction(\"Charlie\", \"David\", 20.0)\n    \n    # Minerar transações\n    print(\"\\n⛏️  MINERANDO PRIMEIRO BLOCO...\")\n    fenix_coin.mine_pending_transactions(\"Minerador_1\")\n    \n    # Adicionar mais transações\n    fenix_coin.add_transaction(\"David\", \"Eve\", 15.0)\n    fenix_coin.add_transaction(\"Eve\", \"Frank\", 25.0)\n    \n    # Minerar segundo bloco\n    print(\"\\n⛏️  MINERANDO SEGUNDO BLOCO...\")\n    fenix_coin.mine_pending_transactions(\"Minerador_2\")\n    \n    # Verificar validade da blockchain\n    print(\"\\n🔍 VERIFICANDO VALIDADE DA BLOCKCHAIN...\")\n    fenix_coin.is_chain_valid()\n    \n    # Mostrar saldos\n    print(\"\\n💰 SALDOS DOS PARTICIPANTES:\")\n    participants = [\"Alice\", \"Bob\", \"Charlie\", \"David\", \"Eve\", \"Frank\", \"Minerador_1\", \"Minerador_2\"]\n    for participant in participants:\n        balance = fenix_coin.get_balance(participant)\n        print(f\"  {participant}: {balance} tokens\")\n    \n    # Mostrar blockchain completa\n    fenix_coin.print_chain()\n```\n\n## 🎯 CONCEITOS AVANÇADOS\n\n### **Smart Contracts:**\n- Código executado automaticamente na blockchain\n- Condições pré-definidas e imutáveis\n- Exemplo: Ethereum, Solana, Cardano\n\n### **DeFi (Decentralized Finance):**\n- Serviços financeiros sem intermediários\n- Lending, borrowing, trading descentralizado\n- Exemplos: Uniswap, Aave, Compound\n\n### **NFTs (Non-Fungible Tokens):**\n- Tokens únicos e não-intercambiáveis\n- Representam ativos digitais únicos\n- Exemplos: Arte digital, música, jogos\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Desenvolver smart contracts com Solidity\n2. Criar dApps (aplicações descentralizadas)\n3. Implementar DeFi protocols\n4. Configurar ambiente de desenvolvimento\n5. Deploy em redes de teste\n\n**�� Dica**: Blockchain é uma tecnologia revolucionária. Comece com conceitos básicos e gradualmente explore aplicações mais avançadas!'
                },
                {
                    id: 2,
                    title: 'Smart Contracts com Solidity',
                    type: 'exercise',
                    duration: '90 min',
                    content: '# 📜 SMART CONTRACTS COM SOLIDITY\n\n## 🎯 EXERCÍCIO: TOKEN ERC-20 PERSONALIZADO\n\n### Objetivo\nCriar um token ERC-20 personalizado para a Fenix Academy com funcionalidades avançadas como staking e sistema de recompensas por cursos.\n\n### Funcionalidades do Token\n\n**🎓 Sistema Educacional:**\n- Recompensas por conclusão de cursos\n- Staking para incentivar participação\n- Sistema de gamificação\n\n**🔒 Segurança:**\n- OpenZeppelin para contratos seguros\n- Pausable para emergências\n- ReentrancyGuard contra ataques\n\n**⚡ Funcionalidades:**\n- Staking com recompensas\n- Sistema de cursos\n- Minting e burning controlado\n- Pausable/unpausable\n\n### Estrutura do Contrato\n\n**Importações:**\n- ERC20: Funcionalidades básicas do token\n- Ownable: Controle de acesso\n- Pausable: Pausar/despausar operações\n- ReentrancyGuard: Proteção contra ataques\n\n**Variáveis de Estado:**\n- Supply inicial: 1 milhão de tokens\n- Taxa de recompensa: 5% ao ano\n- Período mínimo de staking: 30 dias\n\n**Mappings:**\n- Informações de staking por usuário\n- Dados dos cursos\n- Histórico de conclusão de cursos\n\n### Sistema de Staking\n\n**Funcionalidades:**\n1. **startStaking**: Iniciar staking de tokens\n2. **claimStakingReward**: Reclamar recompensas\n3. **endStaking**: Finalizar staking e receber tokens\n\n**Recompensas:**\n- Calculadas baseadas no tempo staked\n- Taxa anual de 5%\n- Período mínimo de 30 dias\n\n### Sistema de Cursos\n\n**Estrutura:**\n- ID único do curso\n- Nome do curso\n- Recompensa por conclusão\n- Status ativo/inativo\n\n**Cursos Disponíveis:**\n- Python Data Science: 1000 tokens\n- React Avançado: 800 tokens\n- Node.js Backend: 900 tokens\n- Machine Learning: 1200 tokens\n- Mobile Development: 1000 tokens\n- Cybersecurity: 1100 tokens\n- DevOps: 1000 tokens\n- Flutter: 900 tokens\n- React Native: 900 tokens\n- AWS Cloud: 1200 tokens\n- Blockchain: 1500 tokens\n\n### Configuração do Ambiente\n\n**Dependências:**\n- OpenZeppelin Contracts 5.0.0\n- Hardhat 2.19.0\n- Nomic Foundation Toolbox 4.0.0\n\n**Scripts:**\n- compile: Compilar contratos\n- test: Executar testes\n- deploy:testnet: Deploy em rede de teste\n- deploy:mainnet: Deploy em mainnet\n\n### Benefícios\n\n**🎯 Educacional:**\n- Incentivo para completar cursos\n- Sistema de gamificação\n- Recompensas tangíveis\n\n**�� Técnico:**\n- Contrato seguro e auditado\n- Funcionalidades avançadas\n- Código reutilizável\n\n**�� Econômico:**\n- Staking com recompensas\n- Sistema de incentivos\n- Tokenomics bem definido\n\n## 🚀 PRÓXIMOS PASSOS\n\nNo próximo módulo, você aprenderá a:\n1. Deploy em redes de teste\n2. Criar frontend para interação\n3. Implementar testes automatizados\n4. Deploy em mainnet\n5. Integrar com dApps\n\n**�� Dica**: Use o Hardhat para desenvolvimento local e testes. Sempre teste extensivamente antes de fazer deploy em mainnet!'
                }
            ]
        }
    ]
};

// Função para obter conteúdo do curso por ID
export function getCourseContent(courseId: string): CourseContent | null {
    const courseMap: { [key: string]: CourseContent } = {
        'fundamentos-desenvolvimento-web': webFundamentalsContent,
        'python-data-science': pythonDataScienceContent,
        'react-avancado': reactAdvancedContent,
        'nodejs-backend-development': nodeJsBackendContent,
        'machine-learning-python': machineLearningContent,
        'desenvolvimento-mobile': mobileDevelopmentContent,
        'cybersecurity-ethical-hacking': cybersecurityContent,
        'devops-cicd': devopsContent,
        'flutter-mobile': flutterContent,
        'react-native-mobile': reactNativeContent,
        'aws-cloud': awsCloudContent,
        'blockchain-smart-contracts': blockchainContent
    };

    return courseMap[courseId] || null;
}