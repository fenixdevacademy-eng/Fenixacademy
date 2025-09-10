# 📦 Aula 2: NPM e Gerenciamento de Dependências
## Web Fundamentals - Módulo 5: Ferramentas de Desenvolvimento

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar NPM e package.json
- ✅ Gerenciar dependências eficientemente
- ✅ Implementar scripts de automação
- ✅ Aplicar versionamento semântico
- ✅ Configurar auditoria de segurança
- ✅ Otimizar instalação de pacotes
- ✅ Trabalhar com workspaces
- ✅ Implementar CI/CD com NPM

---

## 📚 Conteúdo Principal

### 1. 🌟 Fundamentos do NPM

#### **O que é NPM?**
```bash
# NPM (Node Package Manager) é o gerenciador de pacotes do Node.js
# Permite instalar, gerenciar e compartilhar código JavaScript
# Maior repositório de pacotes do mundo
# Facilita reutilização de código

# Verificar versão do NPM
npm --version

# Verificar versão do Node.js
node --version

# Atualizar NPM
npm install -g npm@latest

# Verificar configurações
npm config list

# Ver configurações globais
npm config list -g
```

#### **Package.json - Coração do Projeto**
```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Descrição do projeto",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "keywords": ["javascript", "node", "web"],
  "author": "Seu Nome <seu.email@exemplo.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "eslint": "^8.42.0",
    "prettier": "^2.8.8"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/usuario/repositorio.git"
  },
  "bugs": {
    "url": "https://github.com/usuario/repositorio/issues"
  },
  "homepage": "https://github.com/usuario/repositorio#readme"
}
```

### 2. 📦 Gerenciamento de Dependências

#### **Instalação de Pacotes**
```bash
# Instalar dependência de produção
npm install express

# Instalar dependência de desenvolvimento
npm install --save-dev jest

# Instalar dependência global
npm install -g nodemon

# Instalar versão específica
npm install express@4.18.2

# Instalar versão mais recente
npm install express@latest

# Instalar todas as dependências do package.json
npm install

# Instalar sem salvar no package.json
npm install express --no-save

# Instalar e salvar como dependência opcional
npm install express --save-optional
```

#### **Atualização e Remoção**
```bash
# Verificar pacotes desatualizados
npm outdated

# Atualizar todos os pacotes
npm update

# Atualizar pacote específico
npm update express

# Atualizar para versão mais recente
npm install express@latest

# Remover pacote
npm uninstall express

# Remover pacote de desenvolvimento
npm uninstall --save-dev jest

# Remover pacote global
npm uninstall -g nodemon

# Limpar cache do NPM
npm cache clean --force
```

#### **Gerenciamento de Versões**
```bash
# Ver versões disponíveis de um pacote
npm view express versions --json

# Ver informações detalhadas de um pacote
npm view express

# Ver dependências de um pacote
npm view express dependencies

# Ver árvore de dependências
npm ls

# Ver árvore de dependências global
npm ls -g

# Ver dependências não utilizadas
npm ls --depth=0
```

### 3. 🚀 Scripts de Automação

#### **Scripts Básicos**
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "format": "prettier --write src/**/*.js",
    "clean": "rimraf dist",
    "prebuild": "npm run clean",
    "postbuild": "npm run test"
  }
}
```

#### **Scripts Avançados**
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:server": "nodemon src/server/index.js",
    "dev:client": "webpack serve --mode development",
    "build:prod": "npm run build:client && npm run build:server",
    "build:client": "webpack --mode production --config webpack.client.js",
    "build:server": "webpack --mode production --config webpack.server.js",
    "deploy": "npm run build:prod && npm run deploy:upload",
    "deploy:upload": "rsync -av dist/ usuario@servidor:/var/www/app/",
    "db:migrate": "knex migrate:latest",
    "db:seed": "knex seed:run",
    "db:reset": "npm run db:migrate:rollback && npm run db:migrate && npm run db:seed"
  }
}
```

#### **Executando Scripts**
```bash
# Executar script
npm run dev

# Executar script com argumentos
npm run test -- --verbose

# Executar script em modo silencioso
npm run build --silent

# Executar script com variáveis de ambiente
NODE_ENV=production npm run build

# Executar script em background
npm run dev &

# Executar múltiplos scripts
npm run lint && npm run test && npm run build
```

### 4. 🔢 Versionamento Semântico

#### **Semantic Versioning (SemVer)**
```bash
# Formato: MAJOR.MINOR.PATCH
# MAJOR: mudanças incompatíveis
# MINOR: funcionalidades compatíveis
# PATCH: correções de bugs

# Exemplos de versões:
1.0.0    # Versão inicial
1.0.1    # Correção de bug
1.1.0    # Nova funcionalidade
2.0.0    # Mudança incompatível

# Ranges de versão:
^1.2.3   # Compatível com 1.x.x (>=1.2.3 <2.0.0)
~1.2.3   # Compatível com 1.2.x (>=1.2.3 <1.3.0)
1.2.3    # Versão exata
>=1.2.3  # Maior ou igual
<=1.2.3  # Menor ou igual
1.2.3 - 1.2.5  # Range específico
```

#### **Gerenciando Versões**
```bash
# Ver versão atual
npm version

# Atualizar versão patch (1.0.0 -> 1.0.1)
npm version patch

# Atualizar versão minor (1.0.0 -> 1.1.0)
npm version minor

# Atualizar versão major (1.0.0 -> 2.0.0)
npm version major

# Atualizar para versão específica
npm version 1.5.0

# Atualizar versão com mensagem
npm version patch -m "Corrige bug na validação"

# Atualizar versão sem commit
npm version patch --no-git-tag-version
```

#### **Pre-release Versions**
```bash
# Versões de pré-lançamento
1.0.0-alpha.1    # Alpha
1.0.0-beta.1     # Beta
1.0.0-rc.1       # Release Candidate

# Criar versão alpha
npm version prerelease --preid=alpha

# Criar versão beta
npm version prerelease --preid=beta

# Instalar versão de pré-lançamento
npm install express@beta
```

### 5. 🔒 Auditoria de Segurança

#### **NPM Audit**
```bash
# Verificar vulnerabilidades
npm audit

# Verificar vulnerabilidades com detalhes
npm audit --audit-level=moderate

# Corrigir vulnerabilidades automaticamente
npm audit fix

# Corrigir vulnerabilidades forçadamente
npm audit fix --force

# Verificar vulnerabilidades em produção
npm audit --production

# Gerar relatório de auditoria
npm audit --json > audit-report.json
```

#### **Configuração de Segurança**
```json
{
  "audit": {
    "audit-level": "moderate",
    "audit-ci": true
  },
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "security": "npm audit && npm run lint"
  }
}
```

#### **Ferramentas de Segurança**
```bash
# Instalar ferramenta de segurança
npm install -g npm-check-updates

# Verificar atualizações disponíveis
ncu

# Atualizar package.json com versões mais recentes
ncu -u

# Verificar vulnerabilidades com Snyk
npm install -g snyk
snyk test
snyk monitor
```

### 6. ⚡ Otimização de Performance

#### **NPM Cache**
```bash
# Verificar tamanho do cache
npm cache verify

# Limpar cache
npm cache clean --force

# Configurar cache personalizado
npm config set cache /path/to/custom/cache

# Ver configurações de cache
npm config get cache
```

#### **Instalação Otimizada**
```bash
# Instalar apenas dependências de produção
npm install --production

# Instalar sem scripts opcionais
npm install --ignore-scripts

# Instalar com cache otimizado
npm install --prefer-offline

# Instalar com registry específico
npm install --registry https://registry.npmjs.org/

# Instalar com timeout personalizado
npm install --timeout 60000
```

#### **Configurações de Performance**
```bash
# Configurar registry
npm config set registry https://registry.npmjs.org/

# Configurar timeout
npm config set timeout 60000

# Configurar retry
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000

# Configurar maxsockets
npm config set maxsockets 15

# Configurar preferência de instalação
npm config set prefer-offline true
```

### 7. 🏢 Workspaces

#### **Configuração de Workspaces**
```json
{
  "name": "meu-monorepo",
  "version": "1.0.0",
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces"
  }
}
```

#### **Estrutura de Workspaces**
```bash
meu-monorepo/
├── package.json
├── packages/
│   ├── shared/
│   │   └── package.json
│   ├── ui-components/
│   │   └── package.json
│   └── utils/
│       └── package.json
└── apps/
    ├── web-app/
    │   └── package.json
    └── mobile-app/
        └── package.json
```

#### **Comandos de Workspace**
```bash
# Instalar dependência em workspace específico
npm install express --workspace=apps/web-app

# Executar script em workspace específico
npm run build --workspace=packages/shared

# Executar script em todos os workspaces
npm run test --workspaces

# Executar script em workspaces específicos
npm run build --workspace=apps/*

# Ver dependências de todos os workspaces
npm ls --workspaces
```

### 8. 🔄 CI/CD com NPM

#### **GitHub Actions**
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm run test
    
    - name: Build
      run: npm run build
    
    - name: Security audit
      run: npm audit --audit-level=moderate
```

#### **Scripts de Deploy**
```json
{
  "scripts": {
    "deploy:staging": "npm run build && npm run deploy:upload:staging",
    "deploy:production": "npm run build && npm run deploy:upload:production",
    "deploy:upload:staging": "rsync -av dist/ staging@servidor:/var/www/staging/",
    "deploy:upload:production": "rsync -av dist/ prod@servidor:/var/www/production/",
    "postdeploy": "npm run health-check"
  }
}
```

#### **Configuração de Ambiente**
```bash
# Variáveis de ambiente para diferentes ambientes
# .env.development
NODE_ENV=development
API_URL=http://localhost:3000
DB_URL=postgresql://localhost:5432/app_dev

# .env.staging
NODE_ENV=staging
API_URL=https://api-staging.exemplo.com
DB_URL=postgresql://staging-db:5432/app_staging

# .env.production
NODE_ENV=production
API_URL=https://api.exemplo.com
DB_URL=postgresql://prod-db:5432/app_prod
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Configuração de Projeto**
Configure um projeto NPM completo:
- Criar package.json
- Configurar scripts básicos
- Instalar dependências
- Configurar versionamento
- Implementar auditoria

**Critérios de avaliação:**
- ✅ Package.json configurado
- ✅ Scripts funcionais
- ✅ Dependências instaladas
- ✅ Versionamento configurado

### **Exercício 2: Scripts de Automação**
Implemente scripts avançados:
- Scripts de desenvolvimento
- Scripts de build
- Scripts de teste
- Scripts de deploy
- Scripts de manutenção

**Critérios de avaliação:**
- ✅ Scripts de desenvolvimento
- ✅ Scripts de build
- ✅ Scripts de teste
- ✅ Scripts de deploy

### **Exercício 3: Gerenciamento de Dependências**
Gerencie dependências eficientemente:
- Instalar dependências
- Atualizar pacotes
- Resolver conflitos
- Otimizar instalação
- Auditoria de segurança

**Critérios de avaliação:**
- ✅ Dependências gerenciadas
- ✅ Pacotes atualizados
- ✅ Conflitos resolvidos
- ✅ Segurança verificada

### **Exercício 4: CI/CD Pipeline**
Configure pipeline completo:
- GitHub Actions
- Testes automatizados
- Build automatizado
- Deploy automatizado
- Monitoramento

**Critérios de avaliação:**
- ✅ Pipeline configurado
- ✅ Testes automatizados
- ✅ Build automatizado
- ✅ Deploy automatizado

---

## 💡 Dicas Importantes

### **1. Package.json**
- Mantenha informações atualizadas
- Use scripts descritivos
- Configure engines corretamente
- Adicione metadados úteis

### **2. Dependências**
- Separe devDependencies de dependencies
- Use versionamento semântico
- Mantenha dependências atualizadas
- Faça auditoria regularmente

### **3. Scripts**
- Use nomes descritivos
- Combine scripts quando necessário
- Use pre/post hooks
- Documente scripts complexos

### **4. Performance**
- Use npm ci em produção
- Configure cache adequadamente
- Otimize instalação
- Monitore performance

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Build Tools e Bundling
- Webpack configuração
- Babel e transpilação
- CSS preprocessors

---

## 📝 Checklist de Conclusão

- [ ] Dominou NPM e package.json
- [ ] Gerenciou dependências eficientemente
- [ ] Implementou scripts de automação
- [ ] Aplicou versionamento semântico
- [ ] Configurou auditoria de segurança
- [ ] Otimizou instalação de pacotes
- [ ] Trabalhou com workspaces
- [ ] Implementou CI/CD com NPM
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou a Aula 2 com sucesso!**

---

## 📚 Recursos Adicionais

- [NPM Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [NPM Scripts Guide](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

---

*Próxima aula: Build Tools e Bundling*







