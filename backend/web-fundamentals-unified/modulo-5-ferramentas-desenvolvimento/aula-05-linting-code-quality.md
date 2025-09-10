# 🔍 Aula 5: Linting e Code Quality
## Web Fundamentals - Módulo 5: Ferramentas de Desenvolvimento

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar ESLint e configuração
- ✅ Implementar Prettier para formatação
- ✅ Configurar Husky para git hooks
- ✅ Aplicar pre-commit hooks
- ✅ Implementar code review guidelines
- ✅ Configurar ferramentas de análise
- ✅ Automatizar qualidade de código
- ✅ Integrar com CI/CD

---

## 📚 Conteúdo Principal

### 1. 🌟 Fundamentos do ESLint

#### **O que é ESLint?**
```bash
# ESLint é uma ferramenta de análise estática de código
# Identifica problemas em código JavaScript/TypeScript
# Aplicável a padrões de código e erros
# Altamente configurável e extensível

# Instalação
npm install --save-dev eslint

# Instalação com TypeScript
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Inicialização
npx eslint --init

# Execução
npx eslint src/
```

#### **Configuração Básica**
```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    // Regras personalizadas
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};
```

### 2. 🎨 Prettier para Formatação

#### **Configuração do Prettier**
```bash
# Instalação
npm install --save-dev prettier

# Configuração
npx prettier --init

# Execução
npx prettier --write src/
```

#### **Arquivo de Configuração**
```javascript
// .prettierrc.js
module.exports = {
  // Configurações básicas
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  
  // Configurações avançadas
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  
  // Configurações específicas por arquivo
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always'
      }
    }
  ]
};
```

#### **Integração com ESLint**
```bash
# Instalação
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

# Configuração
```

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier' // Deve ser o último
  ],
  plugins: [
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error'
  }
};
```

### 3. 🪝 Husky e Git Hooks

#### **Configuração do Husky**
```bash
# Instalação
npm install --save-dev husky

# Inicialização
npx husky install

# Adicionar hook
npx husky add .husky/pre-commit "npm test"
```

#### **Hooks Essenciais**
```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Executar linting
npm run lint

# Executar testes
npm run test

# Verificar formatação
npm run format:check
```

```bash
# .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Verificar mensagem de commit
npx commitlint --edit $1
```

```bash
# .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Executar testes completos
npm run test:ci

# Verificar build
npm run build
```

### 4. 🔍 Code Review Guidelines

#### **Checklist de Code Review**
```markdown
# Code Review Checklist

## Funcionalidade
- [ ] Código funciona conforme esperado
- [ ] Casos de borda foram considerados
- [ ] Tratamento de erros implementado
- [ ] Performance adequada

## Qualidade de Código
- [ ] Código limpo e legível
- [ ] Nomes descritivos para variáveis/funções
- [ ] Comentários adequados
- [ ] Sem código duplicado

## Testes
- [ ] Testes unitários implementados
- [ ] Testes de integração quando necessário
- [ ] Coverage adequado
- [ ] Testes passando

## Segurança
- [ ] Sem vulnerabilidades conhecidas
- [ ] Validação de entrada
- [ ] Sanitização de dados
- [ ] Autenticação/autorização adequada

## Performance
- [ ] Sem vazamentos de memória
- [ ] Queries otimizadas
- [ ] Lazy loading quando apropriado
- [ ] Caching implementado

## Acessibilidade
- [ ] Semântica HTML adequada
- [ ] Contraste de cores
- [ ] Navegação por teclado
- [ ] Screen readers compatíveis
```

#### **Ferramentas de Análise**
```bash
# Instalação de ferramentas
npm install --save-dev sonarjs eslint-plugin-sonarjs
npm install --save-dev eslint-plugin-security
npm install --save-dev eslint-plugin-import
```

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:security/recommended',
    'plugin:import/recommended'
  ],
  plugins: [
    'sonarjs',
    'security',
    'import'
  ],
  rules: {
    // Regras de segurança
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'error',
    
    // Regras de qualidade
    'sonarjs/cognitive-complexity': 'error',
    'sonarjs/no-duplicate-string': 'error',
    
    // Regras de importação
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error'
  }
};
```

### 5. 🛠️ Configurações Avançadas

#### **ESLint Avançado**
```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // Regras TypeScript
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Regras React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Regras gerais
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error'
  },
  overrides: [
    {
      files: ['*.test.js', '*.test.ts', '*.spec.js', '*.spec.ts'],
      env: {
        jest: true
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
};
```

#### **Prettier Avançado**
```javascript
// .prettierrc.js
module.exports = {
  // Configurações básicas
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  
  // Configurações avançadas
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  
  // Configurações específicas por arquivo
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always'
      }
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2
      }
    }
  ]
};
```

### 6. 🔄 Automação de Qualidade

#### **Scripts de Qualidade**
```json
{
  "scripts": {
    "lint": "eslint src/ --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src/ --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/",
    "quality": "npm run lint && npm run format:check && npm run test",
    "quality:fix": "npm run lint:fix && npm run format"
  }
}
```

#### **Configuração de CI/CD**
```yaml
# .github/workflows/quality.yml
name: Code Quality

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  quality:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Check formatting
      run: npm run format:check
    
    - name: Run tests
      run: npm run test:ci
```

### 7. 📊 Métricas de Qualidade

#### **Configuração de Métricas**
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    // Métricas de complexidade
    'complexity': ['error', 10],
    'max-depth': ['error', 4],
    'max-lines': ['error', 300],
    'max-lines-per-function': ['error', 50],
    'max-params': ['error', 4],
    
    // Métricas de manutenibilidade
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};
```

#### **Relatórios de Qualidade**
```bash
# Instalação de ferramentas de relatório
npm install --save-dev eslint-formatter-pretty
npm install --save-dev eslint-formatter-json
```

```json
{
  "scripts": {
    "lint:report": "eslint src/ --format=pretty --output-file=lint-report.txt",
    "lint:json": "eslint src/ --format=json --output-file=lint-report.json"
  }
}
```

### 8. 🔧 Integração com Editores

#### **Configuração do VS Code**
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "prettier.requireConfig": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

#### **Extensões Recomendadas**
```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss"
  ]
}
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Configuração Básica**
Configure ESLint e Prettier:
- Instalar dependências
- Configurar arquivos de configuração
- Testar funcionamento
- Integrar com editor

**Critérios de avaliação:**
- ✅ ESLint configurado
- ✅ Prettier configurado
- ✅ Integração funcionando
- ✅ Editor configurado

### **Exercício 2: Git Hooks**
Implemente hooks com Husky:
- Instalar Husky
- Configurar pre-commit
- Configurar pre-push
- Testar funcionamento

**Critérios de avaliação:**
- ✅ Husky instalado
- ✅ Hooks configurados
- ✅ Funcionamento testado
- ✅ Integração com Git

### **Exercício 3: Code Review**
Implemente processo de review:
- Criar checklist
- Configurar ferramentas
- Implementar métricas
- Documentar processo

**Critérios de avaliação:**
- ✅ Checklist criado
- ✅ Ferramentas configuradas
- ✅ Métricas implementadas
- ✅ Processo documentado

### **Exercício 4: Automação Completa**
Automatize qualidade de código:
- Configurar scripts
- Integrar com CI/CD
- Implementar relatórios
- Monitorar qualidade

**Critérios de avaliação:**
- ✅ Scripts configurados
- ✅ CI/CD integrado
- ✅ Relatórios implementados
- ✅ Qualidade monitorada

---

## 💡 Dicas Importantes

### **1. ESLint**
- Configure regras apropriadas para seu projeto
- Use presets quando possível
- Personalize regras conforme necessário
- Mantenha configuração atualizada

### **2. Prettier**
- Configure formatação consistente
- Use overrides para arquivos específicos
- Integre com ESLint
- Mantenha configuração simples

### **3. Git Hooks**
- Use Husky para gerenciar hooks
- Configure hooks apropriados
- Teste hooks regularmente
- Documente processo

### **4. Qualidade**
- Monitore métricas regularmente
- Use ferramentas de análise
- Implemente processo de review
- Automatize quando possível

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- CI/CD e Deploy
- GitHub Actions
- Deploy automatizado
- Monitoramento

---

## 📝 Checklist de Conclusão

- [ ] Dominou ESLint e configuração
- [ ] Implementou Prettier para formatação
- [ ] Configurou Husky para git hooks
- [ ] Aplicou pre-commit hooks
- [ ] Implementou code review guidelines
- [ ] Configurou ferramentas de análise
- [ ] Automatizou qualidade de código
- [ ] Integrou com CI/CD
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou a Aula 5 com sucesso!**

---

## 📚 Recursos Adicionais

- [ESLint Documentation](https://eslint.org/docs/user-guide/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Code Review Guidelines](https://google.github.io/eng-practices/review/)

---

*Próxima aula: CI/CD e Deploy*







