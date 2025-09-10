# 🔧 Aula 1: Git e GitHub - Controle de Versão
## Web Fundamentals - Módulo 5: Ferramentas de Desenvolvimento

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar fundamentos do Git
- ✅ Executar comandos essenciais
- ✅ Trabalhar com branches e merge
- ✅ Colaborar via GitHub
- ✅ Implementar pull requests
- ✅ Aplicar Git flow
- ✅ Resolver conflitos
- ✅ Configurar workflows profissionais

---

## 📚 Conteúdo Principal

### 1. 🌟 Fundamentos do Git

#### **O que é Git?**
```bash
# Git é um sistema de controle de versão distribuído
# Permite rastrear mudanças em arquivos ao longo do tempo
# Facilita colaboração entre desenvolvedores
# Mantém histórico completo de alterações

# Verificar se Git está instalado
git --version

# Configurar usuário (primeira vez)
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"

# Verificar configurações
git config --list
```

#### **Conceitos Fundamentais**
```bash
# Repository (Repositório)
# - Diretório que contém o projeto
# - Armazena histórico completo
# - Pode ser local ou remoto

# Commit
# - Snapshot do projeto em um momento
# - Contém mudanças específicas
# - Tem mensagem descritiva

# Branch (Ramo)
# - Linha de desenvolvimento independente
# - Permite trabalhar em paralelo
# - Facilita colaboração

# Merge
# - Combina mudanças de branches
# - Integra funcionalidades
# - Resolve conflitos quando necessário
```

### 2. 🚀 Comandos Essenciais

#### **Inicialização e Status**
```bash
# Inicializar repositório
git init

# Clonar repositório existente
git clone https://github.com/usuario/repositorio.git

# Ver status dos arquivos
git status

# Ver histórico de commits
git log --oneline

# Ver mudanças não commitadas
git diff

# Ver mudanças de um commit específico
git show <commit-hash>
```

#### **Adicionando e Commitando**
```bash
# Adicionar arquivo específico
git add arquivo.txt

# Adicionar todos os arquivos
git add .

# Adicionar arquivos modificados
git add -u

# Commit com mensagem
git commit -m "Adiciona funcionalidade de login"

# Commit com mensagem detalhada
git commit -m "Adiciona funcionalidade de login

- Implementa validação de email
- Adiciona hash de senha
- Cria sistema de sessão"

# Adicionar e commit em uma linha
git commit -am "Corrige bug na validação"
```

#### **Trabalhando com Arquivos**
```bash
# Ver diferenças entre working directory e staging
git diff

# Ver diferenças entre staging e último commit
git diff --cached

# Ver diferenças entre dois commits
git diff commit1..commit2

# Remover arquivo do Git (mas manter local)
git rm --cached arquivo.txt

# Renomear arquivo
git mv arquivo-antigo.txt arquivo-novo.txt

# Desfazer mudanças em arquivo
git checkout -- arquivo.txt

# Desfazer mudanças em todos os arquivos
git checkout -- .
```

### 3. 🌿 Branches e Merge

#### **Criando e Gerenciando Branches**
```bash
# Listar branches
git branch

# Listar branches remotas
git branch -r

# Listar todas as branches
git branch -a

# Criar nova branch
git branch nova-funcionalidade

# Criar e mudar para nova branch
git checkout -b nova-funcionalidade

# Mudar para branch existente
git checkout main

# Mudar para branch remota
git checkout -b local-branch origin/remote-branch

# Deletar branch local
git branch -d nome-da-branch

# Deletar branch remota
git push origin --delete nome-da-branch
```

#### **Merge e Rebase**
```bash
# Merge de branch para main
git checkout main
git merge nova-funcionalidade

# Merge com mensagem específica
git merge nova-funcionalidade -m "Merge da funcionalidade X"

# Rebase (reorganizar commits)
git checkout nova-funcionalidade
git rebase main

# Rebase interativo
git rebase -i HEAD~3

# Abortar merge em caso de conflito
git merge --abort

# Abortar rebase
git rebase --abort
```

#### **Resolvendo Conflitos**
```bash
# Quando há conflito, Git marca os arquivos
# Editar arquivos manualmente para resolver
# Remover marcadores de conflito:
# <<<<<<< HEAD
# código da branch atual
# =======
# código da branch sendo mergeada
# >>>>>>> branch-name

# Após resolver conflitos:
git add arquivo-resolvido.txt
git commit -m "Resolve conflito em arquivo.txt"

# Usar ferramenta de merge
git mergetool
```

### 4. 🔄 GitHub e Colaboração

#### **Configurando GitHub**
```bash
# Adicionar repositório remoto
git remote add origin https://github.com/usuario/repositorio.git

# Ver repositórios remotos
git remote -v

# Alterar URL do repositório remoto
git remote set-url origin https://github.com/usuario/novo-repositorio.git

# Remover repositório remoto
git remote remove origin
```

#### **Push e Pull**
```bash
# Primeiro push (configurar upstream)
git push -u origin main

# Push para branch específica
git push origin nome-da-branch

# Push de todas as branches
git push --all origin

# Pull (baixar mudanças)
git pull origin main

# Pull de branch específica
git pull origin nome-da-branch

# Fetch (baixar sem mergear)
git fetch origin

# Merge após fetch
git merge origin/main
```

#### **Trabalhando com Forks**
```bash
# Fork no GitHub (via interface web)
# Clonar seu fork
git clone https://github.com/seu-usuario/repositorio.git

# Adicionar repositório original como upstream
git remote add upstream https://github.com/original/repositorio.git

# Sincronizar com upstream
git fetch upstream
git checkout main
git merge upstream/main

# Push para seu fork
git push origin main
```

### 5. 🔀 Pull Requests

#### **Criando Pull Requests**
```bash
# 1. Criar branch para feature
git checkout -b feature/nova-funcionalidade

# 2. Fazer mudanças e commits
git add .
git commit -m "Implementa nova funcionalidade"

# 3. Push da branch
git push origin feature/nova-funcionalidade

# 4. Criar PR via GitHub (interface web)
# - Ir para o repositório
# - Clicar em "Compare & pull request"
# - Preencher título e descrição
# - Adicionar reviewers
# - Clicar em "Create pull request"
```

#### **Boas Práticas para PRs**
```markdown
# Título do PR
feat: adiciona sistema de notificações

# Descrição do PR
## Descrição
Implementa sistema completo de notificações para usuários.

## Mudanças
- Adiciona componente NotificationCenter
- Implementa hooks para notificações
- Adiciona testes unitários
- Atualiza documentação

## Como testar
1. Fazer login na aplicação
2. Verificar notificações no canto superior direito
3. Testar diferentes tipos de notificação

## Screenshots
[Adicionar screenshots se aplicável]

## Checklist
- [ ] Código testado
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Sem console.logs
- [ ] Performance verificada
```

### 6. 🔄 Git Flow

#### **Estrutura do Git Flow**
```bash
# Branches principais
main        # Produção (sempre estável)
develop     # Desenvolvimento (integração)

# Branches de suporte
feature/*   # Novas funcionalidades
release/*   # Preparação para release
hotfix/*    # Correções urgentes
```

#### **Implementando Git Flow**
```bash
# Inicializar Git Flow
git flow init

# Criar feature
git flow feature start nova-funcionalidade

# Finalizar feature
git flow feature finish nova-funcionalidade

# Criar release
git flow release start 1.0.0

# Finalizar release
git flow release finish 1.0.0

# Criar hotfix
git flow hotfix start correcao-urgente

# Finalizar hotfix
git flow hotfix finish correcao-urgente
```

#### **Workflow Completo**
```bash
# 1. Clonar repositório
git clone https://github.com/empresa/projeto.git
cd projeto

# 2. Criar branch de feature
git checkout develop
git pull origin develop
git checkout -b feature/login-system

# 3. Desenvolver feature
git add .
git commit -m "Implementa sistema de login"

# 4. Push e criar PR
git push origin feature/login-system
# Criar PR via GitHub

# 5. Após aprovação, merge
git checkout develop
git pull origin develop
git branch -d feature/login-system

# 6. Criar release
git flow release start 1.2.0
# Fazer ajustes finais
git flow release finish 1.2.0
```

### 7. 🛠️ Comandos Avançados

#### **Stash e Cherry-pick**
```bash
# Salvar mudanças temporariamente
git stash

# Salvar com mensagem
git stash save "WIP: implementando feature X"

# Listar stashes
git stash list

# Aplicar stash
git stash apply

# Aplicar e remover stash
git stash pop

# Aplicar stash específico
git stash apply stash@{2}

# Cherry-pick (aplicar commit específico)
git cherry-pick <commit-hash>

# Cherry-pick de range
git cherry-pick commit1..commit2
```

#### **Reset e Revert**
```bash
# Reset suave (mantém mudanças no working directory)
git reset --soft HEAD~1

# Reset misto (mantém mudanças no working directory)
git reset --mixed HEAD~1

# Reset duro (remove todas as mudanças)
git reset --hard HEAD~1

# Reset para commit específico
git reset --hard <commit-hash>

# Revert (cria novo commit desfazendo mudanças)
git revert <commit-hash>

# Revert de merge
git revert -m 1 <merge-commit-hash>
```

#### **Log e Blame**
```bash
# Log com gráfico
git log --graph --oneline --all

# Log de arquivo específico
git log -- arquivo.txt

# Log com estatísticas
git log --stat

# Log com patches
git log -p

# Blame (quem modificou cada linha)
git blame arquivo.txt

# Blame com mais contexto
git blame -L 10,20 arquivo.txt
```

### 8. 🔧 Configurações e Hooks

#### **Configurações Avançadas**
```bash
# Configurar editor padrão
git config --global core.editor "code --wait"

# Configurar merge tool
git config --global merge.tool vscode

# Configurar diff tool
git config --global diff.tool vscode

# Configurar aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'

# Configurar autocrlf (Windows)
git config --global core.autocrlf true

# Configurar autocrlf (Linux/Mac)
git config --global core.autocrlf input
```

#### **Git Hooks**
```bash
# Hooks são scripts executados automaticamente
# Localizados em .git/hooks/

# Pre-commit hook (antes do commit)
#!/bin/sh
# Verificar se há console.logs
if git diff --cached --name-only | xargs grep -l "console\.log"; then
    echo "Erro: Remova console.logs antes de commitar"
    exit 1
fi

# Pre-push hook (antes do push)
#!/bin/sh
# Executar testes
npm test
if [ $? -ne 0 ]; then
    echo "Erro: Testes falharam"
    exit 1
fi

# Tornar hooks executáveis
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Configuração Inicial**
Configure seu ambiente Git:
- Instalar Git
- Configurar usuário e email
- Criar repositório local
- Fazer primeiro commit
- Configurar aliases úteis

**Critérios de avaliação:**
- ✅ Git instalado e configurado
- ✅ Repositório criado
- ✅ Primeiro commit realizado
- ✅ Aliases configurados

### **Exercício 2: Workflow com Branches**
Implemente workflow completo:
- Criar branch de feature
- Fazer commits organizados
- Resolver conflito simulado
- Fazer merge
- Deletar branch

**Critérios de avaliação:**
- ✅ Branch criada corretamente
- ✅ Commits bem organizados
- ✅ Conflito resolvido
- ✅ Merge realizado

### **Exercício 3: Colaboração via GitHub**
Configure colaboração:
- Criar repositório no GitHub
- Fazer fork de projeto
- Criar pull request
- Fazer code review
- Aprovar e mergear

**Critérios de avaliação:**
- ✅ Repositório criado
- ✅ Fork configurado
- ✅ PR criado
- ✅ Review realizado

### **Exercício 4: Git Flow Completo**
Implemente Git Flow:
- Configurar Git Flow
- Criar feature
- Criar release
- Criar hotfix
- Documentar processo

**Critérios de avaliação:**
- ✅ Git Flow configurado
- ✅ Feature implementada
- ✅ Release criada
- ✅ Hotfix aplicado

---

## 💡 Dicas Importantes

### **1. Mensagens de Commit**
- Use imperativo: "Adiciona" não "Adicionado"
- Seja específico e claro
- Limite a 50 caracteres no título
- Use corpo para explicar o "porquê"

### **2. Branches**
- Use nomes descritivos
- Prefixe com tipo: feature/, bugfix/, hotfix/
- Mantenha branches pequenas
- Delete branches após merge

### **3. Pull Requests**
- Seja descritivo na descrição
- Adicione screenshots quando necessário
- Peça review de colegas
- Mantenha PRs pequenas e focadas

### **4. Conflitos**
- Resolva conflitos rapidamente
- Comunique com a equipe
- Teste após resolver
- Use ferramentas de merge

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- NPM e gerenciamento de dependências
- Package.json e scripts
- Versionamento semântico
- Auditoria de segurança

---

## 📝 Checklist de Conclusão

- [ ] Dominou fundamentos do Git
- [ ] Executou comandos essenciais
- [ ] Trabalhou com branches e merge
- [ ] Colaborou via GitHub
- [ ] Implementou pull requests
- [ ] Aplicou Git flow
- [ ] Resolveu conflitos
- [ ] Configurou workflows profissionais
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou a Aula 1 com sucesso!**

---

## 📚 Recursos Adicionais

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

---

*Próxima aula: NPM e Gerenciamento de Dependências*







