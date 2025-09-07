# Sistema de Permissões - Fenix Academy

## Visão Geral

O sistema de permissões foi implementado para controlar o acesso ao conteúdo dos cursos baseado no nível de assinatura do usuário. O sistema oferece diferentes níveis de acesso com funcionalidades específicas para cada plano.

## Níveis de Permissão

### 1. Gratuito (FREE)
- **Preço**: R$ 0,00/mês
- **Acesso**: Limitado a 3 cursos básicos
- **Funcionalidades**:
  - Visualização de conteúdo básico
  - Suporte comunitário
- **Restrições**:
  - Sem acesso a exercícios
  - Sem downloads de recursos
  - Sem quizzes
  - Sem certificados

### 2. Básico (BASIC)
- **Preço**: R$ 29,90/mês
- **Acesso**: Todos os cursos básicos
- **Funcionalidades**:
  - Acesso a todos os cursos básicos
  - Exercícios práticos
  - Quizzes de avaliação
  - Certificados de conclusão
  - Suporte por email
- **Restrições**:
  - Sem downloads de recursos
  - Sem acesso a cursos avançados
  - Sem recursos premium

### 3. Premium (PREMIUM)
- **Preço**: R$ 99,90/mês
- **Acesso**: Todos os cursos
- **Funcionalidades**:
  - Acesso a todos os cursos
  - Downloads de recursos
  - Exercícios avançados
  - Quizzes completos
  - Certificados premium
  - Suporte prioritário
  - Recursos exclusivos
- **Restrições**:
  - Sem acesso a funcionalidades administrativas

### 4. Administrador (ADMIN)
- **Preço**: R$ 0,00/mês (acesso especial)
- **Acesso**: Total ao sistema
- **Funcionalidades**:
  - Acesso total a todos os recursos
  - Funcionalidades administrativas
  - Gerenciamento de usuários
  - Relatórios avançados
  - Suporte VIP

## Estrutura de Dados

### Interface UserPermissions
```typescript
interface UserPermissions {
    level: 'free' | 'basic' | 'premium' | 'admin';
    purchasedCourses: number[];
    canAccessContent: boolean;
    canDownloadResources: boolean;
    canTakeQuizzes: boolean;
    canAccessExercises: boolean;
    canViewTranscripts: boolean;
    canAccessAdvancedFeatures: boolean;
}
```

### Interface PermissionLevel
```typescript
interface PermissionLevel {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    restrictions: string[];
}
```

## Funções Utilitárias

### checkPermission(requiredLevel, userLevel)
Verifica se o usuário tem permissão para acessar um conteúdo específico.

### canAccessContent(content, userPermissions)
Verifica se o usuário pode acessar um conteúdo específico baseado em suas permissões.

### getPermissionColor(level)
Retorna a cor CSS para o nível de permissão.

### getPermissionLabel(level)
Retorna o label formatado para o nível de permissão.

### getPermissionMessage(contentType, requiredLevel)
Gera uma mensagem personalizada para conteúdo restrito.

## Componentes

### PermissionModal
Modal que exibe quando o usuário tenta acessar conteúdo restrito.

**Props**:
- `isOpen`: boolean - Controla a visibilidade do modal
- `onClose`: function - Função para fechar o modal
- `message`: string - Mensagem de permissão
- `requiredLevel`: string - Nível de permissão requerido
- `contentType`: string - Tipo de conteúdo (curso, módulo, aula)

### UserPermissionStatus
Componente que exibe o status atual das permissões do usuário.

**Props**:
- `userPermissions`: UserPermissions - Permissões do usuário
- `onUpgrade`: function - Função para fazer upgrade do plano

## Implementação no Conteúdo

### Controle de Acesso por Curso
```typescript
// Exemplo de curso com permissão
const courseWithPermission = {
    ...courseData,
    requiresPermission: true,
    permissionLevel: 'premium',
    modules: [
        {
            ...moduleData,
            requiresPermission: true,
            permissionLevel: 'premium',
            lessons: [
                {
                    ...lessonData,
                    requiresPermission: true,
                    permissionLevel: 'premium'
                }
            ]
        }
    ]
};
```

### Verificação de Permissão
```typescript
const canAccess = canAccessContent(content, userPermissions);
if (!canAccess) {
    handlePermissionDenied('conteúdo', content.permissionLevel);
}
```

## Fluxo de Permissões

### 1. Verificação de Acesso
1. Usuário tenta acessar conteúdo
2. Sistema verifica se o conteúdo requer permissão
3. Se requer, verifica o nível do usuário
4. Se não tem permissão, exibe modal

### 2. Modal de Permissão
1. Exibe mensagem explicativa
2. Mostra nível requerido
3. Lista benefícios do nível
4. Oferece opção de upgrade

### 3. Upgrade de Plano
1. Usuário clica em "Ver Planos"
2. Redireciona para página de preços
3. Após upgrade, permissões são atualizadas

## Integração com Cursos

### Cursos Gratuitos
- Primeiros 3 cursos são gratuitos
- Não requerem verificação de permissão
- Acesso total ao conteúdo

### Cursos Premium
- Cursos 4+ requerem permissão premium
- Verificação em módulos e aulas
- Controle granular de acesso

## Estados de UI

### Conteúdo Bloqueado
- Ícone de cadeado
- Opacidade reduzida
- Cursor não permitido
- Badge com nível requerido

### Conteúdo Disponível
- Ícone de play
- Interação normal
- Indicadores de progresso

### Modal de Permissão
- Overlay escuro
- Modal centralizado
- Informações detalhadas
- Botões de ação

## Melhorias Futuras

### Funcionalidades Planejadas
1. **Sistema de Trial**: Período gratuito para novos usuários
2. **Permissões Granulares**: Controle por aula específica
3. **Histórico de Acesso**: Log de tentativas de acesso
4. **Notificações**: Alertas sobre conteúdo bloqueado
5. **Analytics**: Relatórios de uso por nível

### Melhorias Técnicas
1. **Cache de Permissões**: Otimização de performance
2. **Validação Server-side**: Segurança adicional
3. **Sincronização**: Atualização em tempo real
4. **Testes**: Cobertura completa de testes
5. **Documentação**: Guias de implementação

## Arquivos Relacionados

- `frontend/app/utils/permissions.ts`: Sistema principal de permissões
- `frontend/app/components/PermissionModal.tsx`: Modal de permissão
- `frontend/app/components/UserPermissionStatus.tsx`: Status do usuário
- `frontend/app/courses-content/page.tsx`: Implementação no conteúdo

## Como Usar

### Para Desenvolvedores
1. Importe as funções de permissão
2. Adicione propriedades de permissão ao conteúdo
3. Use `canAccessContent()` para verificar acesso
4. Implemente `PermissionModal` para conteúdo bloqueado

### Para Usuários
1. Acesse conteúdo normalmente
2. Conteúdo bloqueado mostrará ícone de cadeado
3. Clique para ver modal de permissão
4. Faça upgrade para acessar conteúdo premium

## Segurança

### Validações
- Verificação client-side para UX
- Validação server-side obrigatória
- Logs de tentativas de acesso
- Rate limiting para tentativas

### Boas Práticas
- Nunca confiar apenas em validação client-side
- Sempre verificar permissões no servidor
- Logs detalhados de acesso
- Monitoramento de tentativas de bypass 