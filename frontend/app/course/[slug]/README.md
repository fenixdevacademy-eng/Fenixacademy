# Sistema de Aulas Markdown - Fenix Academy

## Visão Geral

Este sistema permite que os cursos da Fenix Academy exibam conteúdo de aulas em formato Markdown, carregando dinamicamente os arquivos `.md` do backend e convertendo-os para HTML com formatação rica.

## Funcionalidades Implementadas

### ✅ **Carregamento de Aulas Markdown**
- API REST para carregar aulas individuais (`/api/lessons/[courseSlug]/[moduleId]/[lessonId]`)
- API para listar todas as aulas de um módulo (`/api/lessons/[courseSlug]/[moduleId]`)
- Cache inteligente para melhorar performance
- Conversão automática de Markdown para HTML

### ✅ **Interface de Usuário**
- Visualizador de aulas com formatação rica (prose)
- Navegação entre aulas (anterior/próxima)
- Lista de aulas organizadas por módulo
- Sistema de progresso visual

### ✅ **Sistema de Progresso**
- Rastreamento de aulas concluídas
- Persistência local (localStorage)
- Barra de progresso visual
- Estatísticas de conclusão

### ✅ **Navegação Inteligente**
- Seleção de módulos
- Seleção de aulas dentro de módulos
- Navegação sequencial entre aulas
- Estado persistente da seleção

## Estrutura de Arquivos

```
frontend/app/course/[slug]/
├── components/
│   ├── MarkdownLessonViewer.tsx    # Visualizador de aulas Markdown
│   └── CourseProgress.tsx          # Componente de progresso
├── hooks/
│   ├── useModuleLessons.ts         # Hook para carregar aulas do módulo
│   └── useCourseProgress.ts        # Hook para gerenciar progresso
├── services/
│   └── markdown-service.ts         # Serviço para carregar Markdown
├── api/
│   └── lessons/
│       ├── [courseSlug]/
│       │   ├── [moduleId]/
│       │   │   └── [lessonId]/
│       │   │       └── route.ts    # API para aula individual
│       │   └── [moduleId]/
│       │       └── route.ts        # API para listar aulas do módulo
└── page.tsx                        # Página principal do curso
```

## Como Usar

### 1. **Acessar um Curso**
```typescript
// Navegar para um curso específico
/course/web-fundamentals
/course/react-advanced
/course/nodejs-apis
```

### 2. **Selecionar um Módulo**
- Clique em um módulo na lista lateral esquerda
- O sistema carregará automaticamente as aulas do módulo

### 3. **Selecionar uma Aula**
- Clique em uma aula na lista central
- O conteúdo Markdown será carregado e exibido
- Use os botões de navegação para ir para a próxima/anterior aula

### 4. **Marcar Aula como Concluída**
- Clique em "Marcar como Concluída" após completar a aula
- O progresso será salvo automaticamente

## APIs Disponíveis

### **GET /api/lessons/[courseSlug]/[moduleId]/[lessonId]**
Carrega uma aula específica.

**Resposta:**
```json
{
  "id": 1,
  "title": "Introdução ao HTML5",
  "content": "# Conteúdo da aula em Markdown...",
  "moduleId": 1,
  "courseSlug": "web-fundamentals"
}
```

### **GET /api/lessons/[courseSlug]/[moduleId]**
Lista todas as aulas de um módulo.

**Resposta:**
```json
[
  {
    "id": 1,
    "title": "Aula 1",
    "content": "Primeiros 500 caracteres...",
    "moduleId": 1,
    "courseSlug": "web-fundamentals",
    "filename": "modulo-01-avancado-web-fundamentals.md"
  }
]
```

## Formato dos Arquivos Markdown

Os arquivos devem seguir esta estrutura:

```markdown
# Título da Aula

## Introdução
Conteúdo da introdução...

## Conceitos Principais
- Conceito 1
- Conceito 2

## Exemplos Práticos
```javascript
// Código de exemplo
console.log("Hello World");
```

## Exercícios
1. Exercício 1
2. Exercício 2
```

## Personalização

### **Estilos CSS**
O sistema usa Tailwind CSS com o plugin `@tailwindcss/typography` para estilizar o Markdown.

### **Temas**
Os estilos podem ser personalizados modificando as classes CSS no componente `MarkdownLessonViewer`.

### **Cache**
O sistema implementa cache inteligente para melhorar performance. O cache pode ser limpo usando:
```typescript
const markdownService = MarkdownService.getInstance();
markdownService.clearCache(); // Limpa todo o cache
markdownService.clearCourseCache('web-fundamentals'); // Limpa cache de um curso específico
```

## Próximos Passos

### **Funcionalidades Futuras**
- [ ] Sincronização com backend para progresso
- [ ] Sistema de notas e comentários
- [ ] Busca dentro das aulas
- [ ] Favoritos e bookmarks
- [ ] Compartilhamento de aulas
- [ ] Sistema de avaliação

### **Melhorias Técnicas**
- [ ] Otimização de performance
- [ ] Lazy loading de conteúdo
- [ ] PWA para acesso offline
- [ ] Analytics de uso
- [ ] A/B testing de interface

## Suporte

Para dúvidas ou problemas:
1. Verificar console do navegador para erros
2. Verificar se os arquivos Markdown existem no backend
3. Verificar se as APIs estão funcionando
4. Verificar se o Tailwind CSS está configurado corretamente

---

**Desenvolvido para Fenix Academy** 🚀
*Sistema de aulas Markdown integrado e responsivo*
