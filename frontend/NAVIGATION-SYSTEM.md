# 🧭 Sistema de Navegação e Redirecionamento - Fenix Academy

## 📋 Visão Geral

O sistema de navegação da Fenix Academy foi projetado para fornecer uma experiência de usuário fluida e URLs limpas e SEO-friendly. Ele utiliza um sistema de redirecionamento inteligente que mapeia IDs numéricos para slugs descritivos.

## 🏗️ Arquitetura do Sistema

### 1. **Configuração Centralizada** (`navigation-config.ts`)
- Centraliza todas as rotas e configurações de navegação
- Fornece funções utilitárias para gerenciamento de URLs
- Define mapeamentos entre IDs de cursos e slugs

### 2. **Sistema de Redirecionamento** (`/courses/redirect`)
- Página intermediária que processa redirecionamentos
- Recebe IDs de cursos via query parameters
- Redireciona automaticamente para a URL correta do curso

### 3. **Rotas de Cursos** (`/course/[slug]`)
- URLs limpas e descritivas para cada curso
- Estrutura SEO-friendly
- Suporte a parâmetros dinâmicos

## 🔄 Fluxo de Navegação

```
Usuário clica em "Ver Curso" 
    ↓
Redirecionamento para `/courses/redirect?id=X`
    ↓
Processamento do ID e mapeamento para slug
    ↓
Redirecionamento automático para `/course/[slug]`
    ↓
Carregamento da página do curso
```

## 📁 Estrutura de Arquivos

```
frontend/app/
├── navigation-config.ts          # Configuração centralizada
├── courses/
│   ├── page.tsx                 # Lista de cursos
│   └── redirect.tsx             # Página de redirecionamento
├── course/
│   └── [slug]/
│       ├── page.tsx             # Página individual do curso
│       ├── layout.tsx           # Layout do curso
│       ├── route-config.ts      # Configuração de rotas do curso
│       └── index.ts             # Conteúdo do curso
└── test-redirect/
    └── page.tsx                 # Página de teste
```

## 🎯 Mapeamento de Cursos

| ID | Nome do Curso | Slug | Duração | Aulas |
|----|---------------|------|---------|-------|
| 1  | Fundamentos de Desenvolvimento Web | `fundamentos-desenvolvimento-web` | 70h | 72 |
| 2  | Python Data Science | `python-data-science` | 160h | 600 |
| 3  | React Avançado | `react-avancado` | 430h | 600 |
| 4  | Node.js Backend Development | `nodejs-backend-development` | 430h | 600 |
| 5  | Machine Learning com Python | `machine-learning-python` | 430h | 600 |
| 6  | Desenvolvimento Mobile | `desenvolvimento-mobile` | 430h | 600 |
| 7  | Cybersecurity e Ethical Hacking | `cybersecurity-ethical-hacking` | 430h | 600 |
| 8  | DevOps e CI/CD | `devops-cicd` | 430h | 600 |
| 9  | Flutter Mobile Development | `flutter-mobile` | 430h | 600 |
| 10 | AWS Cloud | `aws-cloud` | 430h | 600 |
| 11 | Blockchain e Smart Contracts | `blockchain-smart-contracts` | 430h | 600 |
| 12 | React Native Mobile Development | `react-native-mobile` | 430h | 600 |
| 13 | Data Engineering | `data-engineering` | 430h | 600 |
| 14 | Game Development | `game-development` | 430h | 600 |

## 🛠️ Funções Utilitárias

### `navigationConfig.getCourseUrl(id: number)`
Retorna a URL completa do curso baseada no ID.

### `navigationConfig.getRedirectUrl(id: number)`
Retorna a URL de redirecionamento para um curso específico.

### `navigationConfig.isValidCourseSlug(slug: string)`
Valida se um slug de curso é válido.

## 🔧 Como Usar

### 1. **Link Direto para um Curso**
```tsx
import Link from 'next/link';

<Link href="/course/react-avancado">
  Acessar React Avançado
</Link>
```

### 2. **Link via Redirecionamento**
```tsx
import { navigationConfig } from '../navigation-config';

<Link href={navigationConfig.getRedirectUrl(3)}>
  Ver Curso React Avançado
</Link>
```

### 3. **Navegação Programática**
```tsx
import { useRouter } from 'next/navigation';
import { navigationConfig } from '../navigation-config';

const router = useRouter();

// Redirecionar para um curso específico
const goToCourse = (courseId: number) => {
  const courseUrl = navigationConfig.getCourseUrl(courseId);
  router.push(courseUrl);
};
```

## 🧪 Testando o Sistema

Acesse `/test-redirect` para testar:
- ✅ Redirecionamento por ID
- ✅ Acesso direto por slug
- ✅ Validação de URLs
- ✅ Funcionamento de todos os cursos

## 🚀 Benefícios

### **Para Usuários:**
- URLs limpas e memoráveis
- Navegação intuitiva
- Carregamento rápido das páginas

### **Para SEO:**
- URLs descritivas
- Estrutura hierárquica clara
- Fácil indexação pelos motores de busca

### **Para Desenvolvedores:**
- Sistema centralizado e fácil de manter
- Funções utilitárias reutilizáveis
- Estrutura consistente e escalável

## 🔍 Solução de Problemas

### **Erro 404 ao acessar curso:**
1. Verificar se o slug está correto
2. Confirmar se o curso existe no mapeamento
3. Verificar se o arquivo do curso foi criado

### **Redirecionamento não funciona:**
1. Verificar se o ID está correto
2. Confirmar se a página de redirecionamento está funcionando
3. Verificar o console do navegador para erros

### **URL incorreta:**
1. Verificar a configuração em `navigation-config.ts`
2. Confirmar se o mapeamento está atualizado
3. Verificar se não há conflitos de rotas

## 📚 Recursos Adicionais

- **Documentação dos Cursos**: `frontend/app/course/[slug]/README.md`
- **Resumo Final**: `frontend/app/course/[slug]/final-summary.md`
- **Configuração de Rotas**: `frontend/app/course/[slug]/route-config.ts`
- **Página de Teste**: `/test-redirect`

---

## 🎉 Status: Sistema de Navegação Implementado com Sucesso!

O sistema de redirecionamento e navegação da Fenix Academy está funcionando perfeitamente, fornecendo:
- ✅ Redirecionamento automático para todos os 14 cursos
- ✅ URLs limpas e SEO-friendly
- ✅ Sistema centralizado e fácil de manter
- ✅ Página de teste para validação
- ✅ Documentação completa

**Todos os cursos agora podem ser acessados corretamente através do sistema de redirecionamento!** 🚀
