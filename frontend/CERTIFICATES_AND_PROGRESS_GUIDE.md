# Guia de Certificados e Progresso - Fenix Academy

## 📋 Visão Geral

Este documento descreve as funcionalidades de certificados e progresso implementadas na Fenix Academy, permitindo que os alunos acompanhem sua evolução e visualizem suas conquistas.

## 🏆 Funcionalidades de Certificados

### Página de Certificados (`/certificates`)

**Recursos Principais:**
- Visualização de todos os certificados conquistados
- Filtros por status, nível e busca por texto
- Ordenação por data, título, nota ou horas
- Modal de visualização detalhada
- Download e compartilhamento de certificados
- Códigos de verificação únicos

**Status dos Certificados:**
- ✅ **Concluídos**: Certificados com nota ≥ 70%
- 🔄 **Em Andamento**: Cursos em progresso
- ⏰ **Expirados**: Certificados com data de expiração vencida

**Níveis de Dificuldade:**
- 🟢 **Iniciante**: Cursos básicos
- 🟡 **Intermediário**: Cursos de nível médio
- 🟠 **Avançado**: Cursos complexos
- 🔴 **Expert**: Cursos especializados

### API de Certificados

**Endpoints Disponíveis:**

#### `GET /api/certificates`
Lista certificados do usuário com filtros opcionais.

**Parâmetros de Query:**
- `userId`: ID do usuário (padrão: 'user-1')
- `status`: Filtro por status (all, completed, in-progress, expired)
- `level`: Filtro por nível (all, beginner, intermediate, advanced, expert)
- `search`: Busca por texto no título, curso ou instrutor

**Exemplo de Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Desenvolvimento Web Completo",
      "course": "Full Stack Web Development",
      "instructor": "Prof. João Silva",
      "issuedDate": "2024-01-15",
      "expiryDate": "2026-01-15",
      "grade": 95,
      "status": "completed",
      "verificationCode": "FENIX-WEB-2024-001",
      "imageUrl": "/api/placeholder/400/300",
      "description": "Certificado de conclusão...",
      "skills": ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
      "hours": 120,
      "level": "advanced",
      "userId": "user-1"
    }
  ],
  "total": 1
}
```

#### `POST /api/certificates`
Cria um novo certificado.

**Campos Obrigatórios:**
- `title`: Título do certificado
- `course`: Nome do curso
- `instructor`: Nome do instrutor
- `userId`: ID do usuário

**Campos Opcionais:**
- `grade`: Nota (padrão: 0)
- `description`: Descrição do certificado
- `skills`: Array de habilidades desenvolvidas
- `hours`: Horas de estudo
- `level`: Nível do curso (padrão: 'beginner')

#### `GET /api/certificates/[id]`
Obtém um certificado específico por ID.

#### `PUT /api/certificates/[id]`
Atualiza um certificado existente.

#### `DELETE /api/certificates/[id]`
Remove um certificado.

#### `GET /api/certificates/verify`
Verifica um certificado por código de verificação.

**Parâmetros de Query:**
- `code`: Código de verificação do certificado

## 📊 Funcionalidades de Progresso

### Página de Progresso (`/progress`)

**Recursos Principais:**
- Dashboard com estatísticas gerais
- Gráficos de progresso semanal
- Lista detalhada de cursos com progresso
- Sistema de conquistas e pontos
- Filtros por categoria e período
- Acompanhamento de sequência de estudos

**Estatísticas Exibidas:**
- 📚 Cursos Concluídos vs Total
- ⏰ Horas Estudadas
- 🎯 Lições Completadas
- ⭐ Nota Média
- 🔥 Sequência Atual
- 🏆 Pontos Totais

### API de Progresso

**Endpoints Disponíveis:**

#### `GET /api/progress`
Obtém dados completos de progresso do usuário.

**Parâmetros de Query:**
- `userId`: ID do usuário (padrão: 'user-1')
- `category`: Filtro por categoria (all, Desenvolvimento, Data Science, Design, DevOps)
- `period`: Período de análise (week, month, year)

**Exemplo de Resposta:**
```json
{
  "success": true,
  "data": {
    "progress": [
      {
        "id": "1",
        "course": "Desenvolvimento Web Completo",
        "instructor": "Prof. João Silva",
        "progress": 85,
        "totalLessons": 40,
        "completedLessons": 34,
        "timeSpent": 45,
        "estimatedTime": 60,
        "lastAccessed": "2024-01-15",
        "status": "in-progress",
        "grade": 92,
        "streak": 7,
        "level": "advanced",
        "category": "Desenvolvimento",
        "difficulty": "hard",
        "startDate": "2024-01-01",
        "userId": "user-1"
      }
    ],
    "achievements": [
      {
        "id": "1",
        "title": "Primeiro Passo",
        "description": "Complete sua primeira lição",
        "icon": "🎯",
        "unlockedAt": "2024-01-01",
        "points": 10,
        "rarity": "common",
        "userId": "user-1"
      }
    ],
    "weeklyStats": [
      {
        "week": "2024-01-01",
        "hoursStudied": 12,
        "lessonsCompleted": 8,
        "streak": 3,
        "achievements": 1,
        "userId": "user-1"
      }
    ],
    "statistics": {
      "totalCourses": 4,
      "completedCourses": 1,
      "inProgressCourses": 2,
      "totalHoursStudied": 90,
      "totalLessonsCompleted": 71,
      "currentStreak": 7,
      "totalPoints": 360,
      "averageGrade": 90.0
    }
  }
}
```

#### `POST /api/progress`
Atualiza o progresso de um curso.

**Campos Obrigatórios:**
- `courseId`: ID do curso
- `userId`: ID do usuário

**Campos Opcionais:**
- `progress`: Percentual de progresso (0-100)
- `completedLessons`: Número de lições completadas
- `timeSpent`: Tempo gasto em horas
- `grade`: Nota obtida
- `status`: Status do curso

## 🎨 Design e Responsividade

### Características de Design:
- **Design Moderno**: Interface limpa e intuitiva
- **Dark Mode**: Suporte completo ao modo escuro
- **Animações**: Transições suaves com Framer Motion
- **Responsivo**: Adaptável a todos os dispositivos
- **Acessibilidade**: Componentes acessíveis e semânticos

### Breakpoints Responsivos:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Componentes Utilizados:
- **Cards**: Para exibição de certificados e cursos
- **Modais**: Para visualização detalhada
- **Filtros**: Para busca e organização
- **Gráficos**: Para visualização de progresso
- **Badges**: Para status e categorias
- **Progress Bars**: Para indicadores de progresso

## 🔧 Tecnologias Utilizadas

### Frontend:
- **Next.js 14**: Framework React
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Framer Motion**: Animações
- **Lucide React**: Ícones
- **React Hooks**: Gerenciamento de estado

### Backend:
- **Next.js API Routes**: Endpoints da API
- **TypeScript**: Tipagem estática
- **Error Handling**: Tratamento de erros centralizado

## 📱 Como Usar

### Para Alunos:

1. **Acessar Certificados:**
   - Navegue para `/certificates`
   - Visualize todos os certificados conquistados
   - Use filtros para encontrar certificados específicos
   - Clique em "Ver" para detalhes completos
   - Baixe ou compartilhe certificados concluídos

2. **Acompanhar Progresso:**
   - Navegue para `/progress`
   - Visualize estatísticas gerais no dashboard
   - Acompanhe progresso semanal nos gráficos
   - Veja detalhes de cada curso na lista
   - Confira conquistas desbloqueadas

### Para Desenvolvedores:

1. **Integração com APIs:**
   ```typescript
   // Buscar certificados
   const response = await fetch('/api/certificates?userId=user-1&status=completed');
   const data = await response.json();

   // Atualizar progresso
   const response = await fetch('/api/progress', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       courseId: '1',
       userId: 'user-1',
       progress: 85,
       completedLessons: 34
     })
   });
   ```

2. **Personalização:**
   - Modifique os dados mock em `mockCertificates` e `mockProgressData`
   - Ajuste os filtros e categorias conforme necessário
   - Personalize as conquistas e critérios de desbloqueio
   - Adicione novos campos aos modelos de dados

## 🚀 Próximos Passos

### Funcionalidades Futuras:
- [ ] Integração com banco de dados real
- [ ] Sistema de notificações para conquistas
- [ ] Relatórios de progresso em PDF
- [ ] Compartilhamento em redes sociais
- [ ] Sistema de badges e níveis de usuário
- [ ] Integração com sistema de gamificação
- [ ] Análise de progresso com IA
- [ ] Certificados com blockchain para verificação

### Melhorias Técnicas:
- [ ] Cache de dados para melhor performance
- [ ] Paginação para grandes volumes de dados
- [ ] Testes automatizados
- [ ] Documentação da API com Swagger
- [ ] Logs de auditoria para certificados
- [ ] Backup automático de dados

## 📞 Suporte

Para dúvidas ou problemas com as funcionalidades de certificados e progresso:

1. Verifique este guia primeiro
2. Consulte a documentação da API
3. Entre em contato com a equipe de desenvolvimento
4. Reporte bugs através do sistema de issues

---

**Desenvolvido com ❤️ pela equipe Fenix Academy**


