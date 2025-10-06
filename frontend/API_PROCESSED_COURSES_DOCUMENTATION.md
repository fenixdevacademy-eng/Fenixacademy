# 📚 API de Cursos Processados - Fenix Academy

## 🎯 **Visão Geral**

Esta documentação descreve os endpoints da API para acessar os conteúdos processados dos cursos da Fenix Academy, incluindo módulos, aulas, exemplos de código e metadados.

## 🚀 **Endpoints Disponíveis**

### 📖 **Conteúdo dos Cursos Processados**

#### 1. **Listar Todos os Cursos Processados**
```http
GET /api/courses/processed/
```

**Resposta:**
```json
{
  "success": true,
  "courses": [
    {
      "slug": "backend-development",
      "name": "Desenvolvimento Backend",
      "description": "Aprenda desenvolvimento backend com Node.js, APIs REST e bancos de dados",
      "type": "backend",
      "totalModules": 60,
      "totalLessons": 1200,
      "lastUpdated": "2025-01-21T16:35:00.000Z",
      "hasContent": true,
      "stats": {
        "totalFiles": 2400,
        "averageModuleSize": 20,
        "codeExamples": 1200
      }
    }
  ],
  "total": 26,
  "lastProcessed": "2025-01-21T16:35:00.000Z"
}
```

#### 2. **Detalhes de um Curso Específico**
```http
GET /api/courses/processed/{courseSlug}/
```

**Exemplo:**
```http
GET /api/courses/processed/backend-development/
```

**Resposta:**
```json
{
  "success": true,
  "course": {
    "slug": "backend-development",
    "name": "Desenvolvimento Backend",
    "description": "Aprenda desenvolvimento backend com Node.js, APIs REST e bancos de dados",
    "type": "backend",
    "totalModules": 60,
    "totalLessons": 1200,
    "lastUpdated": "2025-01-21T16:35:00.000Z"
  },
  "modules": [
    {
      "id": "modulo-01",
      "name": "Módulo 1",
      "path": "modulo-01",
      "lessons": [
        {
          "id": "aula-01-modulo-01-backend-development",
          "title": "Fundamentos de Backend Development",
          "fileName": "aula-01-modulo-01-backend-development.md",
          "content": "# 📚 **Fundamentos de Backend Development**...",
          "size": 10637,
          "lastModified": "2025-01-21T16:33:00.000Z",
          "hasCodeExamples": true,
          "codeExamples": ["// Exemplo de código..."]
        }
      ],
      "totalLessons": 20,
      "readme": "# 📚 **Módulo 1 - Backend Development**...",
      "examples": {
        "files": ["api-rest.js", "database-model.sql", "auth-middleware.js"],
        "totalFiles": 3
      }
    }
  ],
  "examples": {
    "totalFiles": 2400,
    "categories": ["js", "sql", "py", "sh"]
  }
}
```

#### 3. **Conteúdo de uma Aula Específica**
```http
GET /api/courses/processed/{courseSlug}/{moduleId}/{lessonId}/
```

**Exemplo:**
```http
GET /api/courses/processed/backend-development/modulo-01/aula-01-modulo-01-backend-development/
```

**Resposta:**
```json
{
  "success": true,
  "lesson": {
    "id": "aula-01-modulo-01-backend-development",
    "title": "Fundamentos de Backend Development",
    "fileName": "aula-01-modulo-01-backend-development.md",
    "content": "# 📚 **Fundamentos de Backend Development**...",
    "size": 10637,
    "lastModified": "2025-01-21T16:33:00.000Z",
    "module": {
      "id": "modulo-01",
      "name": "Módulo 1",
      "path": "modulo-01"
    },
    "course": {
      "slug": "backend-development",
      "name": "Desenvolvimento Backend",
      "type": "backend"
    },
    "codeExamples": {
      "files": ["api-rest.js", "database-model.sql"],
      "totalFiles": 2,
      "content": ["// Exemplo de API REST...", "-- Exemplo de modelo SQL..."]
    },
    "navigation": {
      "previous": null,
      "next": {
        "id": "aula-02-modulo-01-backend-development",
        "title": "Arquitetura de APIs",
        "fileName": "aula-02-modulo-01-backend-development.md"
      }
    },
    "metadata": {
      "hasCodeBlocks": true,
      "hasImages": false,
      "hasLinks": true,
      "wordCount": 2500,
      "readingTime": 13
    }
  }
}
```

#### 4. **Exemplos de Código de um Módulo**
```http
GET /api/courses/processed/{courseSlug}/{moduleId}/examples/
```

**Exemplo:**
```http
GET /api/courses/processed/backend-development/modulo-01/examples/
```

**Resposta:**
```json
{
  "success": true,
  "module": {
    "id": "modulo-01",
    "name": "Módulo 1",
    "course": {
      "slug": "backend-development",
      "name": "Desenvolvimento Backend",
      "type": "backend"
    }
  },
  "examples": [
    {
      "fileName": "api-rest.js",
      "content": "const express = require('express');\nconst app = express();...",
      "language": "javascript",
      "size": 774,
      "lastModified": "2025-01-21T16:33:00.000Z",
      "path": "api-rest.js"
    },
    {
      "fileName": "database-model.sql",
      "content": "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,...",
      "language": "sql",
      "size": 902,
      "lastModified": "2025-01-21T16:33:00.000Z",
      "path": "database-model.sql"
    }
  ],
  "total": 3,
  "languages": ["javascript", "sql", "bash"],
  "totalSize": 2420
}
```

## 🎨 **Páginas Frontend**

### **1. Lista de Cursos Processados**
- **URL:** `/processed-courses`
- **Descrição:** Página principal que lista todos os cursos processados
- **Recursos:**
  - Filtros por tipo de curso
  - Busca por nome ou descrição
  - Ordenação por diferentes critérios
  - Estatísticas de cada curso
  - Cards informativos com badges de tipo

### **2. Página de Curso Específico**
- **URL:** `/processed-courses/[courseSlug]`
- **Descrição:** Página detalhada de um curso com navegação por módulos e aulas
- **Recursos:**
  - Sidebar com lista de módulos e aulas
  - Visualizador de conteúdo das aulas
  - Abas para conteúdo e exemplos
  - Navegação entre aulas
  - Metadados de cada aula (tamanho, tempo de leitura, etc.)

## 🔧 **Tipos de Curso Suportados**

| Tipo | Label | Cor | Descrição |
|------|-------|-----|-----------|
| `backend` | Backend | Azul | Desenvolvimento backend |
| `frontend` | Frontend | Verde | Desenvolvimento frontend |
| `mobile` | Mobile | Roxo | Desenvolvimento mobile |
| `data_science` | Data Science | Laranja | Ciência de dados |
| `devops` | DevOps | Cinza | DevOps e automação |
| `aws` | AWS | Amarelo | Amazon Web Services |
| `cybersecurity` | Cybersecurity | Vermelho | Segurança da informação |
| `blockchain` | Blockchain | Índigo | Blockchain e smart contracts |
| `web` | Web | Teal | Fundamentos web |
| `fullstack` | Full Stack | Rosa | Desenvolvimento full stack |
| `ui_ux` | UI/UX | Rosa | Design de interfaces |
| `game` | Games | Violeta | Desenvolvimento de jogos |
| `management` | Gestão | Slate | Gestão de produtos |
| `marketing` | Marketing | Âmbar | Marketing digital |

## 📊 **Recursos da API**

### **Metadados de Aulas**
- Título extraído do markdown
- Tamanho do arquivo
- Data de modificação
- Tempo estimado de leitura
- Presença de blocos de código
- Presença de imagens e links

### **Navegação**
- Aula anterior e próxima
- Lista de módulos do curso
- Lista de aulas por módulo

### **Exemplos de Código**
- Detecção automática de linguagem
- Conteúdo dos arquivos
- Estatísticas por linguagem
- Tamanho total dos exemplos

### **Cache e Performance**
- Cache de 5 minutos para todas as respostas
- Headers de cache apropriados
- Tratamento de erros robusto
- Logs detalhados para debugging

## 🚀 **Como Usar**

### **1. Listar Cursos**
```javascript
const response = await fetch('/api/courses/processed/');
const data = await response.json();
console.log(data.courses);
```

### **2. Buscar Curso Específico**
```javascript
const response = await fetch('/api/courses/processed/backend-development/');
const data = await response.json();
console.log(data.course);
```

### **3. Carregar Aula**
```javascript
const response = await fetch('/api/courses/processed/backend-development/modulo-01/aula-01-modulo-01-backend-development/');
const data = await response.json();
console.log(data.lesson.content);
```

### **4. Buscar Exemplos**
```javascript
const response = await fetch('/api/courses/processed/backend-development/modulo-01/examples/');
const data = await response.json();
console.log(data.examples);
```

## 🔍 **Filtros e Busca**

### **Filtros Disponíveis**
- **Tipo de curso:** Filtra por categoria (backend, frontend, etc.)
- **Busca textual:** Busca por nome ou descrição do curso
- **Ordenação:** Por nome, aulas, módulos, data de atualização, tipo

### **Parâmetros de Query**
- `search`: Termo de busca
- `type`: Tipo de curso
- `sort`: Critério de ordenação
- `limit`: Limite de resultados (padrão: sem limite)

## 📈 **Estatísticas**

A API fornece estatísticas detalhadas:
- Total de cursos processados
- Total de aulas por curso
- Total de exemplos de código
- Tamanho médio dos módulos
- Categorias de linguagens de programação
- Data da última atualização

## 🛠️ **Manutenção**

### **Atualização de Conteúdo**
1. Execute o processador de cursos: `python scripts/run_course_processor.py`
2. Os conteúdos são atualizados automaticamente
3. A API detecta mudanças nos arquivos
4. Cache é invalidado automaticamente

### **Monitoramento**
- Logs detalhados em console
- Tratamento de erros robusto
- Validação de parâmetros
- Verificação de existência de arquivos

---

*API de Cursos Processados - Fenix Academy v1.0*




























