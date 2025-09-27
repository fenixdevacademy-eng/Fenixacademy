# 📚 Cursos Processados - Fenix Academy

## 🎯 **Visão Geral**

Sistema completo para exibir e navegar pelos conteúdos processados dos cursos da Fenix Academy, incluindo aulas expandidas, exemplos de código e metadados detalhados.

## 🚀 **Funcionalidades**

### **✅ API Completa**
- **4 endpoints** para diferentes tipos de conteúdo
- **Cache inteligente** para performance
- **Tratamento de erros** robusto
- **Metadados detalhados** de cada aula

### **✅ Interface Moderna**
- **Página de listagem** com filtros e busca
- **Página de curso** com navegação por módulos
- **Visualizador de aulas** com abas para conteúdo e exemplos
- **Design responsivo** para todos os dispositivos

### **✅ Recursos Avançados**
- **Navegação entre aulas** (anterior/próxima)
- **Detecção automática** de linguagens de código
- **Tempo de leitura** estimado
- **Estatísticas detalhadas** de cada curso

## 📁 **Estrutura de Arquivos**

```
frontend/
├── app/
│   ├── api/courses/processed/
│   │   ├── route.ts                           # Lista todos os cursos
│   │   ├── [courseSlug]/
│   │   │   ├── route.ts                      # Detalhes de um curso
│   │   │   ├── [moduleId]/
│   │   │   │   ├── [lessonId]/
│   │   │   │   │   └── route.ts             # Conteúdo de uma aula
│   │   │   │   └── examples/
│   │   │   │       └── route.ts             # Exemplos de código
│   ├── processed-courses/
│   │   ├── page.tsx                          # Lista de cursos
│   │   └── [courseSlug]/
│   │       └── page.tsx                      # Página do curso
├── API_PROCESSED_COURSES_DOCUMENTATION.md    # Documentação da API
├── test_processed_courses_api.js             # Script de testes
└── README_PROCESSED_COURSES.md               # Este arquivo
```

## 🛠️ **Como Usar**

### **1. Acessar a Lista de Cursos**
```
http://localhost:3000/processed-courses
```

**Recursos:**
- Filtros por tipo de curso
- Busca por nome ou descrição
- Ordenação por diferentes critérios
- Cards informativos com estatísticas

### **2. Explorar um Curso Específico**
```
http://localhost:3000/processed-courses/backend-development
```

**Recursos:**
- Sidebar com módulos e aulas
- Visualizador de conteúdo
- Abas para conteúdo e exemplos
- Navegação entre aulas

### **3. Usar a API Diretamente**

#### **Listar Cursos**
```javascript
const response = await fetch('/api/courses/processed/');
const data = await response.json();
console.log(data.courses);
```

#### **Buscar Curso Específico**
```javascript
const response = await fetch('/api/courses/processed/backend-development/');
const data = await response.json();
console.log(data.course);
```

#### **Carregar Aula**
```javascript
const response = await fetch('/api/courses/processed/backend-development/modulo-01/aula-01-modulo-01-backend-development/');
const data = await response.json();
console.log(data.lesson.content);
```

#### **Buscar Exemplos**
```javascript
const response = await fetch('/api/courses/processed/backend-development/modulo-01/examples/');
const data = await response.json();
console.log(data.examples);
```

## 🧪 **Testando a API**

Execute o script de testes:

```bash
cd frontend
node test_processed_courses_api.js
```

**O script testa:**
- Listagem de cursos
- Busca de curso específico
- Carregamento de módulo
- Carregamento de aula
- Tratamento de erros

## 📊 **Tipos de Curso Suportados**

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

## 🔧 **Configuração**

### **Pré-requisitos**
1. Conteúdos processados em `scripts/processed_courses/`
2. Next.js 13+ com App Router
3. Componentes UI (shadcn/ui)

### **Instalação**
```bash
# Instalar dependências
npm install

# Executar processador de cursos (se necessário)
cd scripts
python run_course_processor.py

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📈 **Performance**

### **Cache**
- **5 minutos** de cache para todas as respostas
- **Headers apropriados** para navegadores
- **Invalidação automática** quando conteúdo muda

### **Otimizações**
- **Lazy loading** de conteúdo
- **Compressão** de respostas
- **Tratamento de erros** eficiente
- **Logs detalhados** para debugging

## 🐛 **Troubleshooting**

### **Erro: "Conteúdo processado não encontrado"**
```bash
# Execute o processador de cursos
cd scripts
python run_course_processor.py
```

### **Erro: "Curso não encontrado"**
- Verifique se o slug do curso está correto
- Confirme se o curso existe em `scripts/processed_courses/`

### **Erro: "Aula não encontrada"**
- Verifique se o módulo e aula existem
- Confirme se os arquivos estão no local correto

## 🔄 **Atualização de Conteúdo**

### **Processar Novos Conteúdos**
```bash
cd scripts
python run_course_processor.py
```

### **Verificar Atualizações**
```bash
# Verificar data da última atualização
curl http://localhost:3000/api/courses/processed/ | jq '.lastProcessed'
```

## 📚 **Documentação Adicional**

- **API Documentation:** `API_PROCESSED_COURSES_DOCUMENTATION.md`
- **Script de Testes:** `test_processed_courses_api.js`
- **Processador de Cursos:** `scripts/README.md`

## 🎉 **Próximos Passos**

### **Melhorias Futuras**
- [ ] Sistema de progresso do usuário
- [ ] Favoritos e bookmarks
- [ ] Comentários e notas
- [ ] Busca full-text no conteúdo
- [ ] Exportação de aulas em PDF
- [ ] Modo offline com PWA

### **Integrações**
- [ ] Sistema de autenticação
- [ ] Banco de dados para progresso
- [ ] Analytics de uso
- [ ] Sistema de avaliações

---

*Cursos Processados - Fenix Academy v1.0*












