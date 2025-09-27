# 📚 API de Conteúdo Expandido - Fenix Academy

## 🎯 **Visão Geral**

Esta documentação descreve os endpoints da API para acessar o conteúdo expandido dos cursos da Fenix Academy, incluindo módulos, aulas, exercícios, quizzes e integração com o sistema de progresso.

## 🚀 **Endpoints Disponíveis**

### 📖 **Conteúdo dos Cursos**

#### 1. **Listar Todos os Cursos Expandidos**
```http
GET /api/expanded/courses/
```
**Resposta:**
```json
{
  "courses": [
    {
      "slug": "python-data-science",
      "name": "Python Data Science",
      "title": "🐍 Python Data Science",
      "description": "Transforme dados em insights com Python e ML",
      "stats": {
        "duration": 8,
        "hours": 32,
        "projects": 5
      }
    }
  ],
  "total": 11
}
```

#### 2. **Detalhes de um Curso Específico**
```http
GET /api/expanded/courses/{course_slug}/
```
**Exemplo:**
```http
GET /api/expanded/courses/python-data-science/
```

#### 3. **Módulos de um Curso**
```http
GET /api/expanded/courses/{course_slug}/modules/
```
**Parâmetros de Query:**
- `level` (opcional): Filtrar por nível (iniciante, intermediario, avancado)

#### 4. **Conteúdo de uma Aula Específica**
```http
GET /api/expanded/courses/{course_slug}/{level}/{lesson_file}/
```
**Exemplo:**
```http
GET /api/expanded/courses/python-data-science/avancado/aula-01-modulo-01-python-data-science-premium.md
```

### 🎯 **Exercícios e Quizzes**

#### 5. **Exercícios de um Curso**
```http
GET /api/expanded/courses/{course_slug}/exercises/
```
**Parâmetros de Query:**
- `level` (opcional): Filtrar por nível
- `type` (opcional): Filtrar por tipo (practical, coding)

#### 6. **Quizzes de um Curso**
```http
GET /api/expanded/courses/{course_slug}/quizzes/
```
**Parâmetros de Query:**
- `level` (opcional): Filtrar por nível
- `type` (opcional): Filtrar por tipo (multiple_choice, true_false)

#### 7. **Detalhes de um Exercício**
```http
GET /api/expanded/exercises/{course_slug}/{exercise_id}/
```

#### 8. **Detalhes de um Quiz**
```http
GET /api/expanded/quizzes/{course_slug}/{quiz_id}/
```

#### 9. **Submeter Resposta de Exercício**
```http
POST /api/expanded/exercises/{course_slug}/{exercise_id}/submit/
```
**Body:**
```json
{
  "answer": "Sua resposta aqui"
}
```

#### 10. **Submeter Resposta de Quiz**
```http
POST /api/expanded/quizzes/{course_slug}/{quiz_id}/submit/
```
**Body:**
```json
{
  "answer": "a"
}
```

### 📊 **Progresso e Estatísticas**

#### 11. **Progresso do Usuário em um Curso**
```http
GET /api/progress/courses/{course_slug}/
```
**Requer:** Autenticação

#### 12. **Inscrever-se em um Curso Expandido**
```http
POST /api/progress/courses/{course_slug}/enroll/
```
**Requer:** Autenticação

#### 13. **Marcar Aula como Concluída**
```http
POST /api/progress/lessons/{course_slug}/{lesson_file}/complete/
```
**Body:**
```json
{
  "time_spent": 30
}
```
**Requer:** Autenticação

#### 14. **Marcar Exercício como Concluído**
```http
POST /api/progress/exercises/{course_slug}/{exercise_id}/complete/
```
**Body:**
```json
{
  "is_correct": true
}
```
**Requer:** Autenticação

#### 15. **Conquistas do Usuário**
```http
GET /api/progress/achievements/
```
**Requer:** Autenticação

#### 16. **Dashboard de Aprendizado**
```http
GET /api/progress/dashboard/
```
**Requer:** Autenticação

### 🔍 **Busca e Estatísticas**

#### 17. **Buscar Conteúdo**
```http
GET /api/expanded/search/?q={query}
```
**Parâmetros de Query:**
- `q`: Termo de busca
- `course` (opcional): Filtrar por curso
- `level` (opcional): Filtrar por nível

#### 18. **Estatísticas dos Cursos**
```http
GET /api/expanded/stats/
```

#### 19. **Estatísticas de Exercícios e Quizzes**
```http
GET /api/expanded/activities/stats/
```

## 🎯 **Exemplos de Uso**

### **1. Listar todos os cursos disponíveis**
```bash
curl -X GET "http://localhost:8000/api/expanded/courses/"
```

### **2. Obter módulos do curso Python Data Science**
```bash
curl -X GET "http://localhost:8000/api/expanded/courses/python-data-science/modules/"
```

### **3. Obter exercícios do nível avançado**
```bash
curl -X GET "http://localhost:8000/api/expanded/courses/python-data-science/exercises/?level=avancado"
```

### **4. Buscar conteúdo sobre "machine learning"**
```bash
curl -X GET "http://localhost:8000/api/expanded/search/?q=machine%20learning"
```

### **5. Inscrever-se em um curso (com autenticação)**
```bash
curl -X POST "http://localhost:8000/api/progress/courses/python-data-science/enroll/" \
  -H "Authorization: Bearer {token}"
```

## 🔐 **Autenticação**

Alguns endpoints requerem autenticação. Use o token JWT no header:
```http
Authorization: Bearer {seu_token_jwt}
```

Para obter o token:
```http
POST /api/auth/token/
{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

## 📊 **Estrutura de Resposta Padrão**

### **Sucesso:**
```json
{
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

### **Erro:**
```json
{
  "error": "Mensagem de erro",
  "details": { ... }
}
```

## 🎯 **Códigos de Status HTTP**

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro interno do servidor

## 🚀 **Integração com Frontend**

### **React/Next.js Example:**
```javascript
// Listar cursos
const fetchCourses = async () => {
  const response = await fetch('/api/expanded/courses/');
  const data = await response.json();
  return data.courses;
};

// Obter exercícios de um curso
const fetchExercises = async (courseSlug) => {
  const response = await fetch(`/api/expanded/courses/${courseSlug}/exercises/`);
  const data = await response.json();
  return data.exercises;
};

// Submeter resposta de exercício
const submitExercise = async (courseSlug, exerciseId, answer) => {
  const response = await fetch(`/api/expanded/exercises/${courseSlug}/${exerciseId}/submit/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ answer })
  });
  return response.json();
};
```

## 📝 **Notas Importantes**

1. **Cache**: As respostas são cacheadas para melhor performance
2. **Rate Limiting**: Alguns endpoints têm limite de requisições
3. **Validação**: Todos os dados são validados antes do processamento
4. **Logs**: Todas as operações são logadas para auditoria
5. **Backup**: O conteúdo é automaticamente sincronizado com o sistema de backup

## 🔧 **Configuração**

### **Variáveis de Ambiente:**
```env
EXPANDED_CONTENT_PATH=/path/to/fenix-expanded-content
CACHE_TIMEOUT=3600
MAX_SEARCH_RESULTS=100
```

### **Dependências:**
- Django 4.2+
- Django REST Framework 3.14+
- Python 3.8+

---

**🎉 Parabéns! Agora você tem acesso completo à API de conteúdo expandido da Fenix Academy!**



