# 📱 Aula 6: Projeto - App de Tarefas Completo
## Web Fundamentals - Módulo 4: JavaScript Avançado

⏱️ **Duração**: 120 min  
🎯 **Objetivos**: 6  
🧪 **Exercícios**: 1  
📚 **Nível**: Avançado  

---

## 🎯 Objetivos de Aprendizado

- ✅ Integrar todos os conceitos do módulo
- ✅ Criar aplicação completa com ES6+
- ✅ Implementar gerenciamento de estado
- ✅ Aplicar Local Storage e IndexedDB
- ✅ Desenvolver interface responsiva
- ✅ Implementar funcionalidades avançadas

---

## 📚 Projeto: App de Tarefas Completo

### 1. 🏗️ Estrutura do Projeto

```javascript
// Estrutura de arquivos
/*
app-tarefas/
├── index.html
├── styles/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── scripts/
│   ├── app.js
│   ├── models/
│   │   ├── Task.js
│   │   ├── User.js
│   │   └── Category.js
│   ├── services/
│   │   ├── StorageService.js
│   │   ├── StateManager.js
│   │   └── ApiService.js
│   ├── components/
│   │   ├── TaskList.js
│   │   ├── TaskForm.js
│   │   ├── TaskItem.js
│   │   └── FilterBar.js
│   └── utils/
│       ├── DateUtils.js
│       ├── ValidationUtils.js
│       └── NotificationUtils.js
└── assets/
    ├── icons/
    └── images/
*/
```

### 2. 📋 Modelos de Dados

#### **Task Model**
```javascript
// models/Task.js
export class Task {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.title = data.title || '';
        this.description = data.description || '';
        this.completed = data.completed || false;
        this.priority = data.priority || 'medium';
        this.category = data.category || 'general';
        this.dueDate = data.dueDate || null;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.tags = data.tags || [];
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    toggle() {
        this.completed = !this.completed;
        this.updatedAt = new Date().toISOString();
    }
    
    update(data) {
        Object.assign(this, data);
        this.updatedAt = new Date().toISOString();
    }
    
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            completed: this.completed,
            priority: this.priority,
            category: this.category,
            dueDate: this.dueDate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            tags: this.tags
        };
    }
    
    static fromJSON(data) {
        return new Task(data);
    }
    
    get isOverdue() {
        if (!this.dueDate || this.completed) return false;
        return new Date(this.dueDate) < new Date();
    }
    
    get daysUntilDue() {
        if (!this.dueDate) return null;
        const today = new Date();
        const due = new Date(this.dueDate);
        const diffTime = due - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}
```

#### **User Model**
```javascript
// models/User.js
export class User {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.name = data.name || '';
        this.email = data.email || '';
        this.avatar = data.avatar || '';
        this.preferences = data.preferences || {
            theme: 'light',
            language: 'pt-BR',
            notifications: true,
            defaultPriority: 'medium'
        };
        this.createdAt = data.createdAt || new Date().toISOString();
    }
    
    generateId() {
        return 'user_' + Date.now().toString(36);
    }
    
    updatePreferences(preferences) {
        this.preferences = { ...this.preferences, ...preferences };
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            preferences: this.preferences,
            createdAt: this.createdAt
        };
    }
}
```

### 3. 🗄️ Serviços

#### **Storage Service**
```javascript
// services/StorageService.js
export class StorageService {
    constructor() {
        this.localStorage = window.localStorage;
        this.sessionStorage = window.sessionStorage;
        this.indexedDB = null;
        this.initIndexedDB();
    }
    
    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('TaskAppDB', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.indexedDB = request.result;
                resolve(this.indexedDB);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Object store para tarefas
                if (!db.objectStoreNames.contains('tasks')) {
                    const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });
                    taskStore.createIndex('category', 'category', { unique: false });
                    taskStore.createIndex('priority', 'priority', { unique: false });
                    taskStore.createIndex('completed', 'completed', { unique: false });
                }
                
                // Object store para usuários
                if (!db.objectStoreNames.contains('users')) {
                    db.createObjectStore('users', { keyPath: 'id' });
                }
            };
        });
    }
    
    // Local Storage
    setLocalItem(key, value) {
        try {
            this.localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Erro ao salvar no Local Storage:', error);
            return false;
        }
    }
    
    getLocalItem(key, defaultValue = null) {
        try {
            const item = this.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Erro ao recuperar do Local Storage:', error);
            return defaultValue;
        }
    }
    
    // IndexedDB
    async saveTask(task) {
        if (!this.indexedDB) return false;
        
        const transaction = this.indexedDB.transaction(['tasks'], 'readwrite');
        const store = transaction.objectStore('tasks');
        
        return new Promise((resolve, reject) => {
            const request = store.put(task.toJSON());
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }
    
    async getTasks() {
        if (!this.indexedDB) return [];
        
        const transaction = this.indexedDB.transaction(['tasks'], 'readonly');
        const store = transaction.objectStore('tasks');
        
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async deleteTask(taskId) {
        if (!this.indexedDB) return false;
        
        const transaction = this.indexedDB.transaction(['tasks'], 'readwrite');
        const store = transaction.objectStore('tasks');
        
        return new Promise((resolve, reject) => {
            const request = store.delete(taskId);
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }
}
```

#### **State Manager**
```javascript
// services/StateManager.js
export class StateManager {
    constructor() {
        this.state = {
            tasks: [],
            user: null,
            filters: {
                category: 'all',
                priority: 'all',
                status: 'all',
                search: ''
            },
            ui: {
                loading: false,
                error: null,
                theme: 'light'
            }
        };
        this.listeners = [];
        this.middlewares = [];
    }
    
    getState() {
        return { ...this.state };
    }
    
    setState(newState) {
        const previousState = { ...this.state };
        this.state = { ...this.state, ...newState };
        
        // Executar middlewares
        this.middlewares.forEach(middleware => {
            middleware(previousState, this.state);
        });
        
        // Notificar listeners
        this.listeners.forEach(listener => {
            listener(this.state, previousState);
        });
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
    }
    
    // Actions
    addTask(task) {
        const tasks = [...this.state.tasks, task];
        this.setState({ tasks });
    }
    
    updateTask(taskId, updates) {
        const tasks = this.state.tasks.map(task => 
            task.id === taskId ? { ...task, ...updates } : task
        );
        this.setState({ tasks });
    }
    
    deleteTask(taskId) {
        const tasks = this.state.tasks.filter(task => task.id !== taskId);
        this.setState({ tasks });
    }
    
    toggleTask(taskId) {
        const tasks = this.state.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        this.setState({ tasks });
    }
    
    setFilter(filterType, value) {
        const filters = { ...this.state.filters, [filterType]: value };
        this.setState({ filters });
    }
    
    setLoading(loading) {
        this.setState({ ui: { ...this.state.ui, loading } });
    }
    
    setError(error) {
        this.setState({ ui: { ...this.state.ui, error } });
    }
}
```

### 4. 🧩 Componentes

#### **Task List Component**
```javascript
// components/TaskList.js
export class TaskList {
    constructor(container, stateManager) {
        this.container = container;
        this.stateManager = stateManager;
        this.unsubscribe = null;
    }
    
    init() {
        this.unsubscribe = this.stateManager.subscribe((state) => {
            this.render(state);
        });
        this.render(this.stateManager.getState());
    }
    
    render(state) {
        const { tasks, filters } = state;
        const filteredTasks = this.filterTasks(tasks, filters);
        
        this.container.innerHTML = `
            <div class="task-list">
                <div class="task-list-header">
                    <h2>Tarefas (${filteredTasks.length})</h2>
                    <div class="task-stats">
                        <span class="completed">${filteredTasks.filter(t => t.completed).length} concluídas</span>
                        <span class="pending">${filteredTasks.filter(t => !t.completed).length} pendentes</span>
                    </div>
                </div>
                <div class="task-items">
                    ${filteredTasks.map(task => this.renderTaskItem(task)).join('')}
                </div>
            </div>
        `;
        
        this.attachEventListeners();
    }
    
    filterTasks(tasks, filters) {
        return tasks.filter(task => {
            if (filters.category !== 'all' && task.category !== filters.category) return false;
            if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
            if (filters.status !== 'all') {
                if (filters.status === 'completed' && !task.completed) return false;
                if (filters.status === 'pending' && task.completed) return false;
            }
            if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
            return true;
        });
    }
    
    renderTaskItem(task) {
        const priorityClass = `priority-${task.priority}`;
        const completedClass = task.completed ? 'completed' : '';
        const overdueClass = task.isOverdue ? 'overdue' : '';
        
        return `
            <div class="task-item ${priorityClass} ${completedClass} ${overdueClass}" data-task-id="${task.id}">
                <div class="task-checkbox">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="taskList.toggleTask('${task.id}')">
                </div>
                <div class="task-content">
                    <h3 class="task-title">${task.title}</h3>
                    ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                    <div class="task-meta">
                        <span class="task-category">${task.category}</span>
                        <span class="task-priority">${task.priority}</span>
                        ${task.dueDate ? `<span class="task-due">${this.formatDate(task.dueDate)}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-edit" onclick="taskList.editTask('${task.id}')">✏️</button>
                    <button class="btn-delete" onclick="taskList.deleteTask('${task.id}')">🗑️</button>
                </div>
            </div>
        `;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }
    
    attachEventListeners() {
        // Event listeners são anexados via onclick nos elementos
    }
    
    toggleTask(taskId) {
        this.stateManager.toggleTask(taskId);
    }
    
    editTask(taskId) {
        // Implementar edição
        console.log('Editar tarefa:', taskId);
    }
    
    deleteTask(taskId) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            this.stateManager.deleteTask(taskId);
        }
    }
    
    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}
```

### 5. 🎨 Estilos CSS

#### **Main CSS**
```css
/* styles/main.css */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --border-radius: 8px;
    --box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    --transition: all 0.3s ease;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--dark-color);
    background-color: var(--light-color);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    background: white;
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 30px;
}

.task-list {
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;
}

.task-list-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-stats {
    display: flex;
    gap: 20px;
}

.task-stats span {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: 500;
}

.task-stats .completed {
    background: var(--success-color);
    color: white;
}

.task-stats .pending {
    background: var(--warning-color);
    color: white;
}

.task-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    transition: var(--transition);
}

.task-item:hover {
    background: #f8f9fa;
}

.task-item.completed {
    opacity: 0.7;
}

.task-item.overdue {
    border-left: 4px solid var(--danger-color);
}

.task-checkbox {
    margin-right: 15px;
}

.task-content {
    flex: 1;
}

.task-title {
    font-size: 1.1em;
    margin-bottom: 5px;
}

.task-description {
    color: var(--secondary-color);
    font-size: 0.9em;
    margin-bottom: 10px;
}

.task-meta {
    display: flex;
    gap: 10px;
    font-size: 0.8em;
}

.task-meta span {
    padding: 2px 8px;
    border-radius: 12px;
    background: #e9ecef;
}

.task-actions {
    display: flex;
    gap: 10px;
}

.btn-edit, .btn-delete {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: var(--transition);
}

.btn-edit:hover {
    background: var(--info-color);
    color: white;
}

.btn-delete:hover {
    background: var(--danger-color);
    color: white;
}

.priority-high {
    border-left: 4px solid var(--danger-color);
}

.priority-medium {
    border-left: 4px solid var(--warning-color);
}

.priority-low {
    border-left: 4px solid var(--success-color);
}
```

### 6. 🚀 Aplicação Principal

#### **App.js**
```javascript
// app.js
import { Task } from './scripts/models/Task.js';
import { User } from './scripts/models/User.js';
import { StorageService } from './scripts/services/StorageService.js';
import { StateManager } from './scripts/services/StateManager.js';
import { TaskList } from './scripts/components/TaskList.js';

class TaskApp {
    constructor() {
        this.storageService = new StorageService();
        this.stateManager = new StateManager();
        this.taskList = null;
        this.init();
    }
    
    async init() {
        try {
            // Inicializar IndexedDB
            await this.storageService.initIndexedDB();
            
            // Carregar dados salvos
            await this.loadData();
            
            // Inicializar componentes
            this.initComponents();
            
            // Configurar event listeners
            this.setupEventListeners();
            
            console.log('App inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar app:', error);
        }
    }
    
    async loadData() {
        try {
            // Carregar tarefas
            const tasks = await this.storageService.getTasks();
            const taskObjects = tasks.map(taskData => Task.fromJSON(taskData));
            
            // Carregar usuário
            const userData = this.storageService.getLocalItem('user');
            const user = userData ? new User(userData) : null;
            
            // Atualizar estado
            this.stateManager.setState({
                tasks: taskObjects,
                user: user
            });
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }
    
    initComponents() {
        const taskListContainer = document.getElementById('task-list');
        if (taskListContainer) {
            this.taskList = new TaskList(taskListContainer, this.stateManager);
            this.taskList.init();
        }
    }
    
    setupEventListeners() {
        // Listener para mudanças de estado
        this.stateManager.subscribe(async (state) => {
            // Salvar tarefas automaticamente
            for (const task of state.tasks) {
                await this.storageService.saveTask(task);
            }
        });
        
        // Listener para formulário de nova tarefa
        const taskForm = document.getElementById('task-form');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewTask(e);
            });
        }
        
        // Listener para filtros
        const filterInputs = document.querySelectorAll('.filter-input');
        filterInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleFilterChange(e);
            });
        });
    }
    
    handleNewTask(event) {
        const formData = new FormData(event.target);
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            priority: formData.get('priority'),
            category: formData.get('category'),
            dueDate: formData.get('dueDate')
        };
        
        const task = new Task(taskData);
        this.stateManager.addTask(task);
        
        // Limpar formulário
        event.target.reset();
    }
    
    handleFilterChange(event) {
        const { name, value } = event.target;
        this.stateManager.setFilter(name, value);
    }
}

// Inicializar app quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.taskApp = new TaskApp();
});
```

### 7. 📱 HTML Principal

#### **index.html**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App de Tarefas - Fenix Academy</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/components.css">
    <link rel="stylesheet" href="styles/responsive.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>📋 App de Tarefas</h1>
            <p>Gerencie suas tarefas de forma eficiente</p>
        </header>
        
        <div class="main-content">
            <div class="sidebar">
                <form id="task-form" class="task-form">
                    <h3>Nova Tarefa</h3>
                    <div class="form-group">
                        <label for="title">Título</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Descrição</label>
                        <textarea id="description" name="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="priority">Prioridade</label>
                        <select id="priority" name="priority">
                            <option value="low">Baixa</option>
                            <option value="medium" selected>Média</option>
                            <option value="high">Alta</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="category">Categoria</label>
                        <select id="category" name="category">
                            <option value="general">Geral</option>
                            <option value="work">Trabalho</option>
                            <option value="personal">Pessoal</option>
                            <option value="shopping">Compras</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dueDate">Data de Vencimento</label>
                        <input type="date" id="dueDate" name="dueDate">
                    </div>
                    <button type="submit" class="btn btn-primary">Adicionar Tarefa</button>
                </form>
                
                <div class="filters">
                    <h3>Filtros</h3>
                    <div class="form-group">
                        <label for="filter-category">Categoria</label>
                        <select id="filter-category" name="category" class="filter-input">
                            <option value="all">Todas</option>
                            <option value="general">Geral</option>
                            <option value="work">Trabalho</option>
                            <option value="personal">Pessoal</option>
                            <option value="shopping">Compras</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="filter-priority">Prioridade</label>
                        <select id="filter-priority" name="priority" class="filter-input">
                            <option value="all">Todas</option>
                            <option value="high">Alta</option>
                            <option value="medium">Média</option>
                            <option value="low">Baixa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="filter-status">Status</label>
                        <select id="filter-status" name="status" class="filter-input">
                            <option value="all">Todas</option>
                            <option value="pending">Pendentes</option>
                            <option value="completed">Concluídas</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="filter-search">Buscar</label>
                        <input type="text" id="filter-search" name="search" class="filter-input" placeholder="Digite para buscar...">
                    </div>
                </div>
            </div>
            
            <div class="content">
                <div id="task-list"></div>
            </div>
        </div>
    </div>
    
    <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 🧪 Exercício Final

### **Projeto: App de Tarefas Completo**
Desenvolva um aplicativo completo de gerenciamento de tarefas:

**Funcionalidades obrigatórias:**
- ✅ CRUD completo de tarefas
- ✅ Filtros e busca
- ✅ Persistência local (Local Storage + IndexedDB)
- ✅ Gerenciamento de estado
- ✅ Interface responsiva
- ✅ Categorias e prioridades
- ✅ Data de vencimento
- ✅ Marcar como concluída
- ✅ Estatísticas básicas

**Funcionalidades extras:**
- ✅ Temas (claro/escuro)
- ✅ Notificações
- ✅ Backup/restore
- ✅ Sincronização offline
- ✅ Tags personalizadas
- ✅ Relatórios
- ✅ Exportar dados

**Critérios de avaliação:**
- ✅ Código organizado e modular
- ✅ Uso correto de ES6+
- ✅ Gerenciamento de estado funcional
- ✅ Persistência implementada
- ✅ Interface responsiva
- ✅ Funcionalidades extras implementadas

---

## 💡 Dicas de Implementação

### **1. Organização do Código**
- Use módulos ES6
- Separe responsabilidades
- Implemente padrões de design
- Documente o código

### **2. Performance**
- Use lazy loading
- Implemente virtual scrolling
- Otimize re-renders
- Use debounce para busca

### **3. UX/UI**
- Feedback visual para ações
- Loading states
- Error handling
- Acessibilidade

### **4. Testes**
- Teste funcionalidades
- Valide dados
- Teste em diferentes browsers
- Teste responsividade

---

## 🚀 Próximos Passos

Após completar este projeto, você estará pronto para:
- Módulo 5: Ferramentas de Desenvolvimento
- Aplicações mais complexas
- Frameworks modernos
- Deploy e produção

---

## 📝 Checklist de Conclusão

- [ ] Estrutura do projeto criada
- [ ] Modelos de dados implementados
- [ ] Serviços configurados
- [ ] Componentes desenvolvidos
- [ ] Estilos aplicados
- [ ] Aplicação principal funcional
- [ ] Funcionalidades obrigatórias implementadas
- [ ] Funcionalidades extras implementadas
- [ ] Testes realizados
- [ ] Projeto finalizado

**🎉 Parabéns! Você completou o Módulo 4 com sucesso!**

---

## 📚 Recursos Adicionais

- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [IndexedDB Guide](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

---

*Próximo módulo: Módulo 5 - Ferramentas de Desenvolvimento*







