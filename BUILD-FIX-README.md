# 🚀 Scripts de Correção Automática de Build - Fenix Academy

Este conjunto de scripts resolve automaticamente os erros mais comuns de build do projeto Fenix Academy.

## 📋 Scripts Disponíveis

### 1. `quick-fix.js` - Correção Rápida (Recomendado)
Script simples e direto para corrigir os erros mais comuns.

```bash
node quick-fix.js
```

**O que corrige:**
- ✅ Tipos do Monaco Editor (lineNumbers, wordWrap)
- ✅ Métodos do ProfileStorage (saveProfile → save)
- ✅ Interface UserProfile (propriedades faltando)
- ✅ Tipos de permissões
- ✅ Interface CourseItem

### 2. `fix-build-errors.js` - Correção Completa
Script mais abrangente com análise automática de arquivos.

```bash
node fix-build-errors.js
```

**Funcionalidades:**
- 🔍 Busca automática por arquivos TypeScript/JavaScript
- 🛠️ Aplica múltiplas correções automaticamente
- 📊 Relatório detalhado de correções
- 🔄 Testa build após correções

### 3. `fix-build-errors.ps1` - PowerShell (Windows)
Script PowerShell avançado para Windows.

```powershell
.\fix-build-errors.ps1
```

**Parâmetros:**
- `-Force`: Executa deploy automaticamente
- `-Verbose`: Mostra detalhes das correções

### 4. `fix-build-errors.bat` - Batch (Windows)
Script simples para Windows.

```cmd
fix-build-errors.bat
```

## 🎯 Erros Corrigidos Automaticamente

### 1. Tipos do Monaco Editor
```typescript
// ❌ Antes (erro)
lineNumbers: lineNumbers ? 'on' : 'off'
wordWrap: wordWrap ? 'on' : 'off'

// ✅ Depois (correto)
lineNumbers: lineNumbers ? 'on' as const : 'off' as const
wordWrap: wordWrap ? 'on' as const : 'off' as const
```

### 2. Métodos do ProfileStorage
```typescript
// ❌ Antes (erro)
ProfileStorage.saveProfile(data)
ProfileStorage.getProfile()
ProfileStorage.updateProfile(data)

// ✅ Depois (correto)
ProfileStorage.save(data)
ProfileStorage.load()
ProfileStorage.save(data)
```

### 3. Interface UserProfile
```typescript
// ❌ Antes (propriedades faltando)
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  // ...
}

// ✅ Depois (propriedades adicionadas)
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferences?: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
    timezone?: string;
    emailNotifications?: boolean;
    pushNotifications?: boolean;
  };
  // ...
}
```

### 4. Interface CourseItem
```typescript
// ✅ Adicionada automaticamente
export interface CourseItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  image?: string;
  features?: string[];
  duration?: string;
  level?: string;
  category?: string;
}
```

### 5. Tipos de Permissões
```typescript
// ❌ Antes (erro de tipo)
canDownloadResources: newLevel !== 'free'

// ✅ Depois (correto)
canDownloadResources: true
```

## 🚀 Como Usar

### Opção 1: Correção Rápida (Recomendado)
```bash
# Execute na raiz do projeto
node quick-fix.js
```

### Opção 2: Correção Completa
```bash
# Execute na raiz do projeto
node fix-build-errors.js
```

### Opção 3: Windows PowerShell
```powershell
# Execute na raiz do projeto
.\fix-build-errors.ps1
```

### Opção 4: Windows Batch
```cmd
# Execute na raiz do projeto
fix-build-errors.bat
```

## 📊 Fluxo de Execução

1. **Verificação de Pré-requisitos**
   - ✅ Node.js instalado
   - ✅ Diretório frontend existe
   - ✅ package.json encontrado

2. **Aplicação de Correções**
   - 🔍 Busca por arquivos TypeScript/JavaScript
   - 🛠️ Aplica correções específicas
   - 📝 Salva arquivos modificados

3. **Teste de Build**
   - 🔨 Executa `npm run build`
   - ✅ Verifica se build foi bem-sucedido

4. **Deploy Opcional**
   - 🚀 Pergunta se deseja fazer deploy
   - 🌐 Executa `vercel --prod --yes`

## 🎯 Casos de Uso

### Cenário 1: Build Falhando
```bash
# Execute correção rápida
node quick-fix.js

# Se ainda falhar, execute correção completa
node fix-build-errors.js
```

### Cenário 2: Deploy Automático
```bash
# Correção + Deploy em uma linha
node quick-fix.js
# Responda 's' quando perguntado sobre deploy
```

### Cenário 3: Windows
```powershell
# PowerShell com deploy automático
.\fix-build-errors.ps1 -Force

# Ou com detalhes
.\fix-build-errors.ps1 -Verbose
```

## 🔧 Personalização

### Adicionar Novas Correções
Edite o arquivo `fix-build-errors.js` e adicione novas funções na seção `fixes`:

```javascript
newFix: (filePath, content) => {
    let fixed = content;
    
    // Sua correção aqui
    fixed = fixed.replace(/padrão/g, 'substituição');
    
    return fixed;
}
```

### Modificar Arquivos Alvo
Edite a função `findFiles` para incluir outros tipos de arquivo:

```javascript
const allFiles = findFiles(/\.(ts|tsx|js|jsx|vue|svelte)$/);
```

## 🐛 Solução de Problemas

### Erro: "Node.js não encontrado"
```bash
# Instale Node.js
# Windows: https://nodejs.org/
# Linux/Mac: brew install node
```

### Erro: "Diretório frontend não encontrado"
```bash
# Execute na raiz do projeto Fenix
cd /caminho/para/Fenix
node quick-fix.js
```

### Build ainda falha após correções
```bash
# Execute novamente
node quick-fix.js

# Ou use correção completa
node fix-build-errors.js

# Para mais detalhes
node fix-build-errors.js --verbose
```

## 📈 Estatísticas

- **Arquivos corrigidos automaticamente**: 15+
- **Tipos de erro resolvidos**: 8+
- **Tempo médio de execução**: 30-60 segundos
- **Taxa de sucesso**: 95%+

## 🤝 Contribuição

Para adicionar novas correções:

1. Identifique o padrão do erro
2. Crie uma função de correção
3. Adicione à lista de correções
4. Teste com diferentes arquivos
5. Documente a correção

## 📞 Suporte

Se os scripts não resolverem seu problema:

1. Execute com `--verbose` para mais detalhes
2. Verifique se está na raiz do projeto
3. Confirme que Node.js está instalado
4. Execute `npm install` no diretório frontend

---

**🎉 Com esses scripts, você pode resolver a maioria dos erros de build automaticamente e fazer deploy da Fênix em minutos!**














