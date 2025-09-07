# Página de Conteúdo dos Cursos

## Visão Geral

A página `/courses-content` foi criada para hospedar o conteúdo de todos os cursos em uma interface unificada e navegável. Esta página permite aos usuários navegar entre diferentes cursos e visualizar seu conteúdo de forma organizada.

## Funcionalidades

### 1. Navegação entre Cursos
- **Botões de navegação**: Setas para navegar entre cursos
- **Indicador de curso atual**: Mostra qual curso está sendo visualizado
- **Informações do curso**: Nível, duração, número de alunos e avaliação

### 2. Estrutura de Conteúdo
- **Módulos expansíveis**: Lista de módulos que podem ser expandidos/recolhidos
- **Aulas organizadas**: Cada módulo contém uma lista de aulas
- **Indicadores visuais**: Ícones para mostrar o tipo de conteúdo (vídeo, texto, etc.)

### 3. Visualização de Conteúdo
- **Player de vídeo**: Área para reprodução de vídeos
- **Abas de conteúdo**: 
  - **Conteúdo**: Texto da aula com formatação
  - **Exercícios**: Lista de exercícios práticos
  - **Quiz**: Perguntas de avaliação
  - **Recursos**: Links e materiais complementares

### 4. Interface Responsiva
- **Sidebar**: Navegação do conteúdo (largura fixa)
- **Área principal**: Conteúdo da aula selecionada
- **Header**: Informações do curso e navegação

## Estrutura de Dados

### Interface CourseContent
```typescript
interface CourseContent {
    id: number;
    title: string;
    description: string;
    instructor: string;
    level: string;
    duration: string;
    students: number;
    rating: number;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    lessons: number;
    certificate: boolean;
    featured?: boolean;
    new?: boolean;
    discount?: number;
    modules: Module[];
}
```

### Interface Module
```typescript
interface Module {
    id: number;
    title: string;
    description: string;
    duration: number;
    lessons: Lesson[];
    completed?: boolean;
}
```

### Interface Lesson
```typescript
interface Lesson {
    id: number;
    title: string;
    duration: number;
    type: 'video' | 'text' | 'quiz' | 'exercise' | 'project';
    content?: string;
    video_url?: string;
    transcript?: string;
    resources?: any[];
    exercises?: any[];
    completed?: boolean;
}
```

## Navegação

### Acesso à Página
1. **Página de cursos** (`/courses`): Botão "Ver Conteúdo" no header
2. **Página individual do curso** (`/course/[id]`): Botão "Ver Conteúdo" no card de compra
3. **URL direta**: `/courses-content`

### Navegação na Página
- **Setas**: Navegar entre cursos
- **Módulos**: Clicar para expandir/recolher
- **Aulas**: Clicar para selecionar e visualizar
- **Abas**: Alternar entre conteúdo, exercícios, quiz e recursos

## Estados da Aplicação

### Estados Principais
- `selectedCourse`: Curso atualmente selecionado
- `currentLesson`: Aula atualmente visualizada
- `expandedModules`: Módulos que estão expandidos
- `activeTab`: Aba ativa (conteúdo, exercícios, quiz, recursos)
- `courseIndex`: Índice do curso atual na lista

### Estados de UI
- **Loading**: Mostrado enquanto carrega o conteúdo
- **Error**: Tratamento de erros (curso não encontrado)
- **Empty**: Estado vazio quando não há conteúdo

## Integração com Dados

### Dados Mock
Atualmente, a página usa dados mock baseados em `coursesData` do arquivo `courseData.ts`. Cada curso é expandido com:

- **Módulos**: Introdução e Fundamentos
- **Aulas**: Conteúdo introdutório e conceitos básicos
- **Recursos**: Links para documentação e código fonte
- **Exercícios**: Exercícios práticos com instruções

### Futuras Integrações
- **API**: Conectar com backend para dados reais
- **Conteúdo JSON**: Integrar com arquivos JSON de conteúdo
- **Progresso**: Salvar progresso do usuário
- **Autenticação**: Verificar acesso aos cursos

## Estilização

### Design System
- **Cores**: Gradientes azuis e cinzas
- **Tipografia**: Hierarquia clara com títulos e subtítulos
- **Espaçamento**: Consistente com o resto da aplicação
- **Componentes**: Reutilização de componentes existentes

### Responsividade
- **Desktop**: Layout completo com sidebar e área principal
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Layout simplificado (futura implementação)

## Melhorias Futuras

### Funcionalidades Planejadas
1. **Progresso do usuário**: Salvar e mostrar progresso
2. **Notas**: Sistema de anotações
3. **Discussões**: Comentários e perguntas
4. **Downloads**: Download de materiais
5. **Certificados**: Emissão de certificados

### Melhorias Técnicas
1. **Performance**: Lazy loading de conteúdo
2. **Cache**: Cache de dados para melhor performance
3. **Offline**: Suporte para visualização offline
4. **Acessibilidade**: Melhorar acessibilidade
5. **Testes**: Cobertura de testes

## Arquivos Relacionados

- `frontend/app/courses-content/page.tsx`: Página principal
- `frontend/app/course/[id]/courseData.ts`: Dados dos cursos
- `frontend/app/courses/page.tsx`: Página de listagem (link adicionado)
- `frontend/app/course/[id]/page.tsx`: Página individual (link adicionado)

## Como Usar

1. Acesse `/courses-content`
2. Use as setas para navegar entre cursos
3. Clique nos módulos para expandir
4. Selecione uma aula para visualizar
5. Use as abas para alternar entre tipos de conteúdo
6. Volte para a listagem de cursos usando o link no header 