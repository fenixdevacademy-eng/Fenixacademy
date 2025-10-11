# 🎓 Sistema de Cursos Fenix - Componentes TSX

## 📋 Visão Geral

Este sistema implementa uma plataforma completa de educação online com **60 módulos**, **1.200 aulas** e **12 certificados** profissionais, desenvolvido em TypeScript React (TSX).

## 🚀 Componentes Disponíveis

### 1. **IntegratedCourseSystem** (Principal)
Componente principal que integra todo o sistema de cursos.

```tsx
import { IntegratedCourseSystem } from './components/pages';

function App() {
  return <IntegratedCourseSystem />;
}
```

**Características:**
- ✅ Navegação completa entre cursos, aulas e certificados
- ✅ Sidebar responsiva
- ✅ Dashboard com estatísticas
- ✅ Sistema de busca
- ✅ Notificações

### 2. **CourseSystem**
Exibe todos os cursos e módulos disponíveis.

```tsx
import { CourseSystem } from './components/pages';

function CoursesPage() {
  return <CourseSystem />;
}
```

**Características:**
- ✅ 3 cursos especializados (Web Fundamentals, React, Backend)
- ✅ 60 módulos organizados
- ✅ Sistema de progresso
- ✅ Filtros por nível (iniciante, intermediário, avançado, expert)
- ✅ Modal de avaliações

### 3. **LessonDetail**
Interface detalhada para visualização de aulas.

```tsx
import { LessonDetail } from './components/pages';

function LessonPage({ module }) {
  return <LessonDetail module={module} onBack={() => {}} />;
}
```

**Características:**
- ✅ Player de aulas com navegação
- ✅ Objetivos de aprendizado
- ✅ Exemplos de código
- ✅ Recursos adicionais
- ✅ Sistema de exercícios
- ✅ Projetos práticos

### 4. **CertificateSystem**
Sistema completo de certificados e avaliações.

```tsx
import { CertificateSystem } from './components/pages';

function CertificatesPage() {
  return <CertificateSystem />;
}
```

**Características:**
- ✅ 12 certificados profissionais
- ✅ Sistema de avaliações (teórica + prática)
- ✅ Download de certificados
- ✅ Compartilhamento social
- ✅ Validação de credenciais

## 📊 Estrutura de Dados

### Cursos Disponíveis

#### **Web Fundamentals** (Módulos 1-20)
- **Foco:** Fundamentos do desenvolvimento web
- **Nível:** Iniciante a Expert
- **Aulas:** 400 (20 por módulo)
- **Certificados:** 4 níveis

#### **React & Frontend Avançado** (Módulos 21-40)
- **Foco:** Desenvolvimento frontend moderno
- **Nível:** Intermediário a Expert
- **Aulas:** 400 (20 por módulo)
- **Certificados:** 4 níveis

#### **Backend & Full-Stack** (Módulos 41-60)
- **Foco:** Desenvolvimento backend e full-stack
- **Nível:** Intermediário a Expert
- **Aulas:** 400 (20 por módulo)
- **Certificados:** 4 níveis

### Níveis de Certificação

1. **Iniciante** - Módulos 1-5, 21-25, 41-45
2. **Intermediário** - Módulos 6-10, 26-30, 46-50
3. **Avançado** - Módulos 11-15, 31-35, 51-55
4. **Expert** - Módulos 16-20, 36-40, 56-60

## 🎯 Funcionalidades Principais

### ✅ Sistema de Cursos
- Navegação intuitiva entre cursos
- Filtros por nível e categoria
- Sistema de busca avançada
- Progresso em tempo real

### ✅ Sistema de Aulas
- Player de vídeo integrado
- Navegação sequencial
- Objetivos de aprendizado
- Exemplos de código interativos
- Recursos adicionais

### ✅ Sistema de Exercícios
- Exercícios práticos por módulo
- Diferentes níveis de dificuldade
- Sistema de pontuação
- Feedback imediato

### ✅ Sistema de Projetos
- Projetos práticos únicos
- Especificações detalhadas
- Critérios de avaliação
- Templates disponíveis

### ✅ Sistema de Certificação
- 12 certificados profissionais
- Avaliações teóricas e práticas
- Download de certificados
- Compartilhamento social
- Validação de credenciais

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Responsive Design** - Mobile-first

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎨 Design System

### Cores Principais
- **Primary:** Indigo (#4F46E5)
- **Success:** Green (#10B981)
- **Warning:** Yellow (#F59E0B)
- **Error:** Red (#EF4444)
- **Info:** Blue (#3B82F6)

### Componentes
- Cards com sombras suaves
- Botões com estados hover/focus
- Modais responsivos
- Sidebar colapsível
- Grid system flexível

## 🚀 Como Usar

### 1. Instalação
```bash
npm install
```

### 2. Importação
```tsx
import { IntegratedCourseSystem } from './components/pages';
```

### 3. Uso Básico
```tsx
function App() {
  return (
    <div className="App">
      <IntegratedCourseSystem />
    </div>
  );
}
```

### 4. Personalização
```tsx
// Customizar dados dos cursos
const customCourses = [
  // ... seus cursos personalizados
];

// Usar componente específico
<CourseSystem courses={customCourses} />
```

## 📈 Métricas do Sistema

- **Total de Módulos:** 60
- **Total de Aulas:** 1.200
- **Total de Exercícios:** 1.200
- **Total de Projetos:** 60
- **Total de Certificados:** 12
- **Total de Avaliações:** 24

## 🔧 Configuração Avançada

### Customização de Temas
```tsx
// Personalizar cores
const theme = {
  primary: '#your-color',
  secondary: '#your-color',
  // ...
};
```

### Integração com API
```tsx
// Conectar com backend
const apiConfig = {
  baseURL: 'https://api.fenix-academy.com',
  endpoints: {
    courses: '/courses',
    lessons: '/lessons',
    certificates: '/certificates'
  }
};
```

## 📚 Documentação Adicional

- [Guia de Componentes](./components-guide.md)
- [API Reference](./api-reference.md)
- [Troubleshooting](./troubleshooting.md)
- [Contributing](./contributing.md)

## 🤝 Suporte

Para dúvidas ou suporte:
- 📧 Email: suporte@fenixdevacademy.com
- 💬 Discord: [Comunidade Fenix](https://discord.gg/fenix-academy)
- 📖 Docs: [Documentação Oficial](https://docs.fenix.academy)

---

**🎓 Fenix Dev Academy - Transformando carreiras através da educação de qualidade**


## 📋 Visão Geral

Este sistema implementa uma plataforma completa de educação online com **60 módulos**, **1.200 aulas** e **12 certificados** profissionais, desenvolvido em TypeScript React (TSX).

## 🚀 Componentes Disponíveis

### 1. **IntegratedCourseSystem** (Principal)
Componente principal que integra todo o sistema de cursos.

```tsx
import { IntegratedCourseSystem } from './components/pages';

function App() {
  return <IntegratedCourseSystem />;
}
```

**Características:**
- ✅ Navegação completa entre cursos, aulas e certificados
- ✅ Sidebar responsiva
- ✅ Dashboard com estatísticas
- ✅ Sistema de busca
- ✅ Notificações

### 2. **CourseSystem**
Exibe todos os cursos e módulos disponíveis.

```tsx
import { CourseSystem } from './components/pages';

function CoursesPage() {
  return <CourseSystem />;
}
```

**Características:**
- ✅ 3 cursos especializados (Web Fundamentals, React, Backend)
- ✅ 60 módulos organizados
- ✅ Sistema de progresso
- ✅ Filtros por nível (iniciante, intermediário, avançado, expert)
- ✅ Modal de avaliações

### 3. **LessonDetail**
Interface detalhada para visualização de aulas.

```tsx
import { LessonDetail } from './components/pages';

function LessonPage({ module }) {
  return <LessonDetail module={module} onBack={() => {}} />;
}
```

**Características:**
- ✅ Player de aulas com navegação
- ✅ Objetivos de aprendizado
- ✅ Exemplos de código
- ✅ Recursos adicionais
- ✅ Sistema de exercícios
- ✅ Projetos práticos

### 4. **CertificateSystem**
Sistema completo de certificados e avaliações.

```tsx
import { CertificateSystem } from './components/pages';

function CertificatesPage() {
  return <CertificateSystem />;
}
```

**Características:**
- ✅ 12 certificados profissionais
- ✅ Sistema de avaliações (teórica + prática)
- ✅ Download de certificados
- ✅ Compartilhamento social
- ✅ Validação de credenciais

## 📊 Estrutura de Dados

### Cursos Disponíveis

#### **Web Fundamentals** (Módulos 1-20)
- **Foco:** Fundamentos do desenvolvimento web
- **Nível:** Iniciante a Expert
- **Aulas:** 400 (20 por módulo)
- **Certificados:** 4 níveis

#### **React & Frontend Avançado** (Módulos 21-40)
- **Foco:** Desenvolvimento frontend moderno
- **Nível:** Intermediário a Expert
- **Aulas:** 400 (20 por módulo)
- **Certificados:** 4 níveis

#### **Backend & Full-Stack** (Módulos 41-60)
- **Foco:** Desenvolvimento backend e full-stack
- **Nível:** Intermediário a Expert
- **Aulas:** 400 (20 por módulo)
- **Certificados:** 4 níveis

### Níveis de Certificação

1. **Iniciante** - Módulos 1-5, 21-25, 41-45
2. **Intermediário** - Módulos 6-10, 26-30, 46-50
3. **Avançado** - Módulos 11-15, 31-35, 51-55
4. **Expert** - Módulos 16-20, 36-40, 56-60

## 🎯 Funcionalidades Principais

### ✅ Sistema de Cursos
- Navegação intuitiva entre cursos
- Filtros por nível e categoria
- Sistema de busca avançada
- Progresso em tempo real

### ✅ Sistema de Aulas
- Player de vídeo integrado
- Navegação sequencial
- Objetivos de aprendizado
- Exemplos de código interativos
- Recursos adicionais

### ✅ Sistema de Exercícios
- Exercícios práticos por módulo
- Diferentes níveis de dificuldade
- Sistema de pontuação
- Feedback imediato

### ✅ Sistema de Projetos
- Projetos práticos únicos
- Especificações detalhadas
- Critérios de avaliação
- Templates disponíveis

### ✅ Sistema de Certificação
- 12 certificados profissionais
- Avaliações teóricas e práticas
- Download de certificados
- Compartilhamento social
- Validação de credenciais

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Responsive Design** - Mobile-first

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎨 Design System

### Cores Principais
- **Primary:** Indigo (#4F46E5)
- **Success:** Green (#10B981)
- **Warning:** Yellow (#F59E0B)
- **Error:** Red (#EF4444)
- **Info:** Blue (#3B82F6)

### Componentes
- Cards com sombras suaves
- Botões com estados hover/focus
- Modais responsivos
- Sidebar colapsível
- Grid system flexível

## 🚀 Como Usar

### 1. Instalação
```bash
npm install
```

### 2. Importação
```tsx
import { IntegratedCourseSystem } from './components/pages';
```

### 3. Uso Básico
```tsx
function App() {
  return (
    <div className="App">
      <IntegratedCourseSystem />
    </div>
  );
}
```

### 4. Personalização
```tsx
// Customizar dados dos cursos
const customCourses = [
  // ... seus cursos personalizados
];

// Usar componente específico
<CourseSystem courses={customCourses} />
```

## 📈 Métricas do Sistema

- **Total de Módulos:** 60
- **Total de Aulas:** 1.200
- **Total de Exercícios:** 1.200
- **Total de Projetos:** 60
- **Total de Certificados:** 12
- **Total de Avaliações:** 24

## 🔧 Configuração Avançada

### Customização de Temas
```tsx
// Personalizar cores
const theme = {
  primary: '#your-color',
  secondary: '#your-color',
  // ...
};
```

### Integração com API
```tsx
// Conectar com backend
const apiConfig = {
  baseURL: 'https://api.fenix-academy.com',
  endpoints: {
    courses: '/courses',
    lessons: '/lessons',
    certificates: '/certificates'
  }
};
```

## 📚 Documentação Adicional

- [Guia de Componentes](./components-guide.md)
- [API Reference](./api-reference.md)
- [Troubleshooting](./troubleshooting.md)
- [Contributing](./contributing.md)

## 🤝 Suporte

Para dúvidas ou suporte:
- 📧 Email: suporte@fenixdevacademy.com
- 💬 Discord: [Comunidade Fenix](https://discord.gg/fenix-academy)
- 📖 Docs: [Documentação Oficial](https://docs.fenix.academy)

---

**🎓 Fenix Dev Academy - Transformando carreiras através da educação de qualidade**




































































