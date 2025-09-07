# 🚀 Sistema de Abas de Funcionalidades para Aulas

Este sistema implementa abas interativas para cada aula, oferecendo uma experiência de aprendizado rica e organizada.

## 📋 Abas Disponíveis

### 1. 📚 Conteúdo
- **Descrição**: Aula principal com conteúdo teórico e prático
- **Funcionalidades**: 
  - Renderização de markdown
  - Suporte a código inline
  - Estrutura hierárquica clara

### 2. 💻 Exercícios
- **Tipos**:
  - **Quiz**: Perguntas de múltipla escolha com feedback
  - **Prático**: Instruções passo a passo
  - **Desafio**: Projetos mais complexos
- **Funcionalidades**:
  - Sistema de pontuação
  - Feedback imediato
  - Dificuldade progressiva

### 3. 🎯 Projetos
- **Características**:
  - Objetivos claros
  - Entregáveis específicos
  - Tecnologias utilizadas
  - Prazo de entrega
  - Sistema de pontuação

### 4. ⚡ Fenix IDE
- **Editor Integrado**:
  - Templates pré-configurados
  - Desafios de código
  - Preview ao vivo
  - Auto-save
  - Múltiplos temas

### 5. 📖 Recursos
- **Categorias**:
  - Documentação oficial
  - Tutoriais interativos
  - Blogs e artigos
  - Ferramentas úteis
  - Cursos complementares
  - Vídeos explicativos

### 6. 🏆 Conquistas
- **Sistema de Badges**:
  - Conquistas desbloqueáveis
  - Progresso visual
  - Motivação para completar tarefas

### 7. 📊 Progresso
- **Métricas**:
  - Conteúdo completado
  - Exercícios realizados
  - Projetos entregues
  - Pontuação total
  - Tempo gasto

## 🛠️ Implementação

### 1. Estrutura de Dados

```typescript
interface Lesson {
    id: number;
    title: string;
    content: string;
    exercises: Exercise[];
    projects: Project[];
    fenixIDE: FenixIDE2;
    resources: Resource[];
    progress: Progress;
    achievements: Achievement[];
}
```

### 2. Uso do Componente

```tsx
import LessonTabs from './components/LessonTabs';

function LessonPage({ lesson }) {
    return (
        <div className="lesson-container">
            <LessonTabs lesson={lesson} />
        </div>
    );
}
```

### 3. Dados de Exemplo

```tsx
const lessonData = {
    id: 1,
    title: "Título da Aula",
    content: "# Conteúdo em Markdown",
    exercises: [
        {
            id: 1,
            title: "Exercício 1",
            type: "quiz",
            description: "Descrição do exercício",
            questions: [
                {
                    question: "Pergunta?",
                    options: ["Opção A", "Opção B", "Opção C"],
                    correct: 0,
                    explanation: "Explicação da resposta"
                }
            ]
        }
    ],
    // ... outros dados
};
```

## 🎨 Personalização

### 1. Temas e Cores

O componente usa Tailwind CSS e pode ser facilmente personalizado:

```css
/* Personalizar cores das abas */
.tab-active {
    @apply border-blue-500 text-blue-600;
}

.tab-inactive {
    @apply border-transparent text-gray-500;
}
```

### 2. Ícones

Os ícones são do Lucide React e podem ser substituídos:

```tsx
import { BookOpen, Code, Target } from 'lucide-react';

const tabs = [
    { id: 'content', label: '📚 Conteúdo', icon: BookOpen },
    { id: 'exercises', label: '💻 Exercícios', icon: Code },
    // ...
];
```

### 3. Layout Responsivo

O componente é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout em grid com múltiplas colunas
- **Tablet**: Layout adaptativo
- **Mobile**: Layout em coluna única

## 🔧 Funcionalidades Avançadas

### 1. Sistema de Quiz

```tsx
// Configurar quiz
const quiz = {
    type: "quiz",
    questions: [
        {
            question: "Pergunta?",
            options: ["A", "B", "C", "D"],
            correct: 0,
            explanation: "Explicação"
        }
    ]
};

// Resultados automáticos
const score = calculateQuizScore();
console.log(`Pontuação: ${score.correct}/${score.total}`);
```

### 2. Editor de Código

```tsx
// Configurar IDE
const fenixIDE2 = {
    enabled: true,
    defaultCode: "<!DOCTYPE html>...",
    templates: [
        {
            name: "Template Básico",
            description: "HTML básico",
            code: "<html>...</html>"
        }
    ],
    challenges: [
        {
            title: "Desafio CSS",
            description: "Estilize a página",
            hints: ["Use flexbox", "Adicione cores"]
        }
    ]
};
```

### 3. Sistema de Progresso

```tsx
// Acompanhar progresso
const progress = {
    contentCompleted: true,
    exercisesCompleted: 2,
    projectsCompleted: 1,
    totalScore: 150,
    maxScore: 300
};

// Calcular porcentagem
const percentage = (progress.totalScore / progress.maxScore) * 100;
```

## 📱 Responsividade

### Breakpoints

- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+

### Adaptações

```tsx
// Layout responsivo
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Conteúdo se adapta automaticamente */}
</div>

// Navegação responsiva
<nav className="flex space-x-8 overflow-x-auto">
    {/* Scroll horizontal em telas pequenas */}
</nav>
```

## 🚀 Próximos Passos

### 1. Integração com Backend

```tsx
// Carregar dados da API
useEffect(() => {
    const fetchLesson = async () => {
        const response = await fetch(`/api/lessons/${lessonId}`);
        const data = await response.json();
        setLesson(data);
    };
    
    fetchLesson();
}, [lessonId]);
```

### 2. Sistema de Autenticação

```tsx
// Verificar permissões
const { user, isAuthenticated } = useAuth();

if (!isAuthenticated) {
    return <LoginPrompt />;
}

if (!user.hasAccess(lesson.id)) {
    return <AccessDenied />;
}
```

### 3. Persistência de Dados

```tsx
// Salvar progresso
const saveProgress = async (progress) => {
    await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progress)
    });
};
```

## 📚 Recursos Adicionais

### 1. Documentação
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- [React Hooks](https://react.dev/reference/react/hooks)

### 2. Exemplos
- `LessonTabsDemo.tsx` - Demonstração completa
- `lesson-structure-example.ts` - Estrutura de dados
- `LessonTabs.tsx` - Componente principal

### 3. Testes

```tsx
// Testar componente
import { render, screen } from '@testing-library/react';
import LessonTabs from './LessonTabs';

test('renderiza todas as abas', () => {
    render(<LessonTabs lesson={mockLesson} />);
    
    expect(screen.getByText('📚 Conteúdo')).toBeInTheDocument();
    expect(screen.getByText('💻 Exercícios')).toBeInTheDocument();
    expect(screen.getByText('🎯 Projetos')).toBeInTheDocument();
});
```

## 🤝 Contribuição

Para contribuir com melhorias:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Adicione testes
5. Submeta um pull request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ pela equipe Fenix Academy**
