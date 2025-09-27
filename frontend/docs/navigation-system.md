# Sistema de Navegação Fenix Academy

Este documento descreve o sistema de navegação modernizado da Fenix Academy, incluindo componentes, hooks e utilitários.

## Visão Geral

O sistema de navegação foi completamente modernizado para oferecer:
- Navegação programática com estado de loading
- Componentes de botão com sistema de temas
- Breadcrumbs automáticos
- Navegação rápida com busca
- Redirecionamento condicional
- Hooks personalizados para navegação

## Componentes

### 1. NavigationButton

Componente de botão especializado para navegação com suporte a links internos e externos.

```tsx
import { NavigationButton } from '@/components/navigation';

// Navegação interna
<NavigationButton
  href="/courses"
  variant="primary"
  showArrow
>
  Ver Cursos
</NavigationButton>

// Link externo
<NavigationButton
  href="https://github.com"
  external
  variant="outline"
  icon={<ExternalLink className="h-4 w-4" />}
>
  GitHub
</NavigationButton>

// Navegação programática
<NavigationButton
  onClick={() => navigateToAI()}
  variant="gradient"
  hover="glow"
>
  IA Assistant
</NavigationButton>
```

**Props:**
- `href`: URL para navegação
- `external`: Se é um link externo
- `variant`: Estilo do botão (primary, secondary, outline, ghost, destructive, gradient)
- `size`: Tamanho (sm, md, lg, xl)
- `icon`: Ícone do botão
- `iconPosition`: Posição do ícone (left, right)
- `showArrow`: Mostrar seta de navegação
- `loading`: Estado de carregamento
- `animate`: Habilitar animações
- `hover`: Efeito de hover (scale, lift, glow, none)

### 2. Button (Atualizado)

Componente de botão base atualizado com sistema de temas e novas funcionalidades.

```tsx
import { Button } from '@/components/navigation';

<Button
  variant="gradient"
  size="lg"
  showArrow
  hover="scale"
  fullWidth
>
  Botão Completo
</Button>
```

**Novas Props:**
- `showArrow`: Mostrar seta
- `animate`: Habilitar animações
- `hover`: Efeito de hover
- `fullWidth`: Largura completa

### 3. Breadcrumb

Componente de breadcrumb automático com suporte a navegação.

```tsx
import { Breadcrumb } from '@/components/navigation';

// Breadcrumb automático
<Breadcrumb />

// Breadcrumb customizado
<Breadcrumb
  items={[
    { name: 'Cursos', href: '/courses' },
    { name: 'React', href: '/course/react' },
    { name: 'Aula 1', current: true }
  ]}
  showHome
  separator={<ChevronRight className="h-4 w-4" />}
/>
```

### 4. QuickNavigation

Componente de navegação rápida com busca e categorias.

```tsx
import { QuickNavigation } from '@/components/navigation';

<QuickNavigation
  showSearch
  showCategories
  maxItems={8}
/>
```

### 5. ConditionalRedirect

Componente para redirecionamento condicional com feedback visual.

```tsx
import { ConditionalRedirect } from '@/components/navigation';

<ConditionalRedirect
  condition={user.isAuthenticated}
  redirectTo="/dashboard"
  delay={1000}
  loadingMessage="Redirecionando..."
  successMessage="Redirecionamento concluído!"
  onRedirect={() => console.log('Redirecionado')}
/>
```

## Hooks

### useNavigation

Hook principal para navegação programática com estado e utilitários.

```tsx
import { useNavigation } from '@/hooks/useNavigation';

const MyComponent = () => {
  const {
    // Estado
    isLoading,
    error,
    currentPath,
    
    // Navegação básica
    navigate,
    goBack,
    goForward,
    refresh,
    
    // Navegação pré-definida
    navigateToHome,
    navigateToCourses,
    navigateToDashboard,
    navigateToAI,
    navigateToIDE,
    navigateToPayment,
    navigateToPricing,
    navigateToAbout,
    navigateToContact,
    navigateToBlog,
    navigateToCareers,
    navigateToSupport,
    navigateToHelp,
    navigateToSubscriptions,
    navigateToBecomeStudent,
    
    // Navegação de curso
    navigateToCourse,
    navigateToCourseLesson,
    navigateToCourseModule,
    navigateToCourseExercise,
    navigateToCourseQuiz,
    navigateToCourseProject,
    navigateToCoursePurchase,
    
    // Utilitários
    isCurrentPath,
    getCurrentCategory,
    requiresAuth,
    getBreadcrumb
  } = useNavigation();

  return (
    <div>
      <button onClick={() => navigateToCourses()}>
        Ir para Cursos
      </button>
      
      <button onClick={() => navigate('/custom-path')}>
        Navegação Customizada
      </button>
      
      {isCurrentPath('/dashboard') && (
        <p>Você está no dashboard</p>
      )}
    </div>
  );
};
```

## Rotas

### ROUTES

Objeto centralizado com todas as rotas da aplicação.

```tsx
import { ROUTES } from '@/lib/routes';

// Rotas públicas
ROUTES.HOME
ROUTES.COURSES
ROUTES.PRICING
ROUTES.ABOUT
ROUTES.CONTACT
ROUTES.BLOG
ROUTES.CAREERS
ROUTES.COMMUNITY

// Rotas de autenticação
ROUTES.LOGIN
ROUTES.REGISTER
ROUTES.LOGOUT

// Rotas de dashboard
ROUTES.DASHBOARD
ROUTES.PROFILE
ROUTES.SETTINGS
ROUTES.MY_COURSES
ROUTES.PROGRESS
ROUTES.CERTIFICATES

// Rotas de curso
ROUTES.COURSE_DETAIL('react-advanced')
ROUTES.COURSE_PURCHASE('react-advanced')
ROUTES.COURSE_LESSON('react-advanced', 'lesson-1')
ROUTES.COURSE_MODULE('react-advanced', 'module-1')
ROUTES.COURSE_EXERCISE('react-advanced', 'exercise-1')
ROUTES.COURSE_QUIZ('react-advanced', 'quiz-1')
ROUTES.COURSE_PROJECT('react-advanced', 'project-1')

// Rotas especiais
ROUTES.AI
ROUTES.ASSINATURAS
ROUTES.BECOME_STUDENT
ROUTES.IDE_ADVANCED
ROUTES.FENIX_IDE
```

### routeHelpers

Funções utilitárias para manipulação de rotas.

```tsx
import { routeHelpers } from '@/lib/routes';

// Gerar URLs de curso
routeHelpers.course('react-advanced')
routeHelpers.courseLesson('react-advanced', 'lesson-1')

// Verificar se rota está ativa
routeHelpers.isActive(currentPath, '/courses')

// Obter categoria da rota
routeHelpers.getCategory('/course/react')

// Verificar se rota requer autenticação
routeHelpers.requiresAuth('/dashboard')

// Obter breadcrumb
routeHelpers.getBreadcrumb('/course/react/lesson/1')
```

## Categorias de Rota

```tsx
import { ROUTE_CATEGORIES } from '@/lib/routes';

ROUTE_CATEGORIES.PUBLIC
ROUTE_CATEGORIES.AUTH
ROUTE_CATEGORIES.DASHBOARD
ROUTE_CATEGORIES.COURSE
ROUTE_CATEGORIES.EXPANDED
ROUTE_CATEGORIES.IDE
ROUTE_CATEGORIES.PAYMENT
ROUTE_CATEGORIES.ADMIN
ROUTE_CATEGORIES.SPECIAL
ROUTE_CATEGORIES.API
```

## Sistema de Temas

Todos os componentes de navegação utilizam o sistema de temas da Fenix Academy:

- `theme-primary`: Cor primária
- `theme-text`: Cor do texto
- `theme-text-secondary`: Cor do texto secundário
- `theme-surface`: Cor de superfície
- `theme-border`: Cor da borda
- `theme-gradient-primary`: Gradiente primário
- `theme-gradient-background`: Gradiente de fundo

## Exemplos de Uso

### Página de Cursos

```tsx
import { NavigationButton, Breadcrumb, useNavigation } from '@/components/navigation';

const CoursesPage = () => {
  const { navigateToCourse } = useNavigation();

  return (
    <div>
      <Breadcrumb />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="theme-surface rounded-lg p-6">
            <h3 className="text-xl font-bold theme-text">{course.title}</h3>
            <p className="theme-text-secondary mb-4">{course.description}</p>
            
            <NavigationButton
              onClick={() => navigateToCourse(course.slug)}
              variant="primary"
              showArrow
              fullWidth
            >
              Ver Curso
            </NavigationButton>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Dashboard com Navegação Rápida

```tsx
import { QuickNavigation, useNavigation } from '@/components/navigation';

const DashboardPage = () => {
  const { isCurrentPath } = useNavigation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <QuickNavigation />
      </div>
      
      <div className="lg:col-span-3">
        {/* Conteúdo do dashboard */}
      </div>
    </div>
  );
};
```

### Redirecionamento de Autenticação

```tsx
import { ConditionalRedirect } from '@/components/navigation';

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {/* Formulário de login */}
      
      <ConditionalRedirect
        condition={isAuthenticated}
        redirectTo="/dashboard"
        delay={1500}
        loadingMessage="Autenticando..."
        successMessage="Login realizado com sucesso!"
        onRedirect={() => console.log('Usuário autenticado')}
      />
    </div>
  );
};
```

## Migração

Para migrar componentes existentes:

1. **Botões simples**: Substitua por `Button` atualizado
2. **Links de navegação**: Use `NavigationButton`
3. **Navegação programática**: Use `useNavigation` hook
4. **Breadcrumbs**: Use componente `Breadcrumb`
5. **Redirecionamentos**: Use `ConditionalRedirect`

## Performance

- Navegação otimizada com estado de loading
- Prevenção de navegação dupla
- Lazy loading de componentes
- Cache de rotas ativas
- Debounce em buscas

## Acessibilidade

- Suporte completo a screen readers
- Navegação por teclado
- ARIA labels e roles
- Foco visível
- Contraste adequado

## Testes

Todos os componentes incluem:
- Testes unitários
- Testes de integração
- Testes de acessibilidade
- Testes de performance
