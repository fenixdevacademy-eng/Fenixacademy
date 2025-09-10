# 💾 Aula 5: Local Storage e Gerenciamento de Estado
## Web Fundamentals - Módulo 4: JavaScript Avançado

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar Local Storage e Session Storage
- ✅ Implementar IndexedDB para dados complexos
- ✅ Criar sistemas de gerenciamento de estado
- ✅ Aplicar padrões de state management
- ✅ Implementar persistência de dados
- ✅ Criar sistemas de cache inteligente
- ✅ Aplicar sincronização de dados
- ✅ Implementar offline-first applications

---

## 📚 Conteúdo Principal

### 1. 🌟 Local Storage e Session Storage

#### **Local Storage Básico**
```javascript
// Classe para gerenciar Local Storage
class LocalStorageManager {
    constructor() {
        this.storage = window.localStorage;
    }
    
    // Salvar dados
    setItem(chave, valor) {
        try {
            const valorSerializado = JSON.stringify(valor);
            this.storage.setItem(chave, valorSerializado);
            return true;
        } catch (erro) {
            console.error('Erro ao salvar no Local Storage:', erro);
            return false;
        }
    }
    
    // Recuperar dados
    getItem(chave, valorPadrao = null) {
        try {
            const valor = this.storage.getItem(chave);
            return valor ? JSON.parse(valor) : valorPadrao;
        } catch (erro) {
            console.error('Erro ao recuperar do Local Storage:', erro);
            return valorPadrao;
        }
    }
    
    // Remover item
    removeItem(chave) {
        this.storage.removeItem(chave);
    }
    
    // Limpar tudo
    clear() {
        this.storage.clear();
    }
    
    // Verificar se existe
    hasItem(chave) {
        return this.storage.getItem(chave) !== null;
    }
    
    // Obter todas as chaves
    getAllKeys() {
        return Object.keys(this.storage);
    }
    
    // Obter tamanho usado
    getSizeUsed() {
        let tamanho = 0;
        for (let chave in this.storage) {
            if (this.storage.hasOwnProperty(chave)) {
                tamanho += this.storage[chave].length + chave.length;
            }
        }
        return tamanho;
    }
}

// Usar Local Storage Manager
const storage = new LocalStorageManager();

// Salvar dados
storage.setItem('usuario', {
    nome: 'João',
    email: 'joao@email.com',
    preferencias: {
        tema: 'escuro',
        idioma: 'pt-BR'
    }
});

// Recuperar dados
const usuario = storage.getItem('usuario');
console.log(usuario);

// Verificar tamanho
console.log(`Tamanho usado: ${storage.getSizeUsed()} bytes`);
```

#### **Session Storage**
```javascript
// Classe para gerenciar Session Storage
class SessionStorageManager {
    constructor() {
        this.storage = window.sessionStorage;
    }
    
    setItem(chave, valor) {
        try {
            const valorSerializado = JSON.stringify(valor);
            this.storage.setItem(chave, valorSerializado);
            return true;
        } catch (erro) {
            console.error('Erro ao salvar no Session Storage:', erro);
            return false;
        }
    }
    
    getItem(chave, valorPadrao = null) {
        try {
            const valor = this.storage.getItem(chave);
            return valor ? JSON.parse(valor) : valorPadrao;
        } catch (erro) {
            console.error('Erro ao recuperar do Session Storage:', erro);
            return valorPadrao;
        }
    }
    
    removeItem(chave) {
        this.storage.removeItem(chave);
    }
    
    clear() {
        this.storage.clear();
    }
}

// Usar Session Storage
const sessionStorage = new SessionStorageManager();

// Salvar dados da sessão
sessionStorage.setItem('carrinho', [
    { id: 1, nome: 'Produto 1', preco: 10.00 },
    { id: 2, nome: 'Produto 2', preco: 20.00 }
]);

// Recuperar dados da sessão
const carrinho = sessionStorage.getItem('carrinho', []);
console.log(carrinho);
```

### 2. 🗄️ IndexedDB para Dados Complexos

#### **Configuração do IndexedDB**
```javascript
// Classe para gerenciar IndexedDB
class IndexedDBManager {
    constructor(nomeBanco, versao) {
        this.nomeBanco = nomeBanco;
        this.versao = versao;
        this.db = null;
    }
    
    // Abrir conexão
    async abrir() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.nomeBanco, this.versao);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                this.criarObjectStores(db);
            };
        });
    }
    
    // Criar object stores
    criarObjectStores(db) {
        // Object store para usuários
        if (!db.objectStoreNames.contains('usuarios')) {
            const usuarioStore = db.createObjectStore('usuarios', { keyPath: 'id', autoIncrement: true });
            usuarioStore.createIndex('email', 'email', { unique: true });
            usuarioStore.createIndex('nome', 'nome', { unique: false });
        }
        
        // Object store para produtos
        if (!db.objectStoreNames.contains('produtos')) {
            const produtoStore = db.createObjectStore('produtos', { keyPath: 'id', autoIncrement: true });
            produtoStore.createIndex('categoria', 'categoria', { unique: false });
            produtoStore.createIndex('preco', 'preco', { unique: false });
        }
        
        // Object store para pedidos
        if (!db.objectStoreNames.contains('pedidos')) {
            const pedidoStore = db.createObjectStore('pedidos', { keyPath: 'id', autoIncrement: true });
            pedidoStore.createIndex('usuarioId', 'usuarioId', { unique: false });
            pedidoStore.createIndex('data', 'data', { unique: false });
        }
    }
    
    // Adicionar item
    async adicionar(storeName, item) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        return new Promise((resolve, reject) => {
            const request = store.add(item);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    // Obter item por ID
    async obter(storeName, id) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        
        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    // Obter todos os itens
    async obterTodos(storeName) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    // Atualizar item
    async atualizar(storeName, item) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        return new Promise((resolve, reject) => {
            const request = store.put(item);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    // Remover item
    async remover(storeName, id) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    // Buscar por índice
    async buscarPorIndice(storeName, indice, valor) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const index = store.index(indice);
        
        return new Promise((resolve, reject) => {
            const request = index.getAll(valor);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}

// Usar IndexedDB
const dbManager = new IndexedDBManager('MeuApp', 1);

// Inicializar e usar
async function inicializarDB() {
    try {
        await dbManager.abrir();
        console.log('IndexedDB inicializado com sucesso');
        
        // Adicionar usuário
        const usuario = await dbManager.adicionar('usuarios', {
            nome: 'João Silva',
            email: 'joao@email.com',
            idade: 25
        });
        
        // Buscar usuário por email
        const usuarios = await dbManager.buscarPorIndice('usuarios', 'email', 'joao@email.com');
        console.log('Usuário encontrado:', usuarios);
        
    } catch (erro) {
        console.error('Erro ao inicializar IndexedDB:', erro);
    }
}

inicializarDB();
```

### 3. 🏗️ Sistema de Gerenciamento de Estado

#### **State Manager Básico**
```javascript
// Classe para gerenciar estado
class StateManager {
    constructor(estadoInicial = {}) {
        this.estado = estadoInicial;
        this.listeners = [];
        this.middlewares = [];
    }
    
    // Obter estado
    getState() {
        return { ...this.estado };
    }
    
    // Atualizar estado
    setState(novoEstado) {
        const estadoAnterior = { ...this.estado };
        this.estado = { ...this.estado, ...novoEstado };
        
        // Executar middlewares
        this.middlewares.forEach(middleware => {
            middleware(estadoAnterior, this.estado);
        });
        
        // Notificar listeners
        this.listeners.forEach(listener => {
            listener(this.estado, estadoAnterior);
        });
    }
    
    // Adicionar listener
    subscribe(listener) {
        this.listeners.push(listener);
        
        // Retornar função para remover listener
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    
    // Adicionar middleware
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
    }
    
    // Ações para atualizar estado
    dispatch(acao) {
        switch (acao.tipo) {
            case 'ADICIONAR_ITEM':
                this.setState({
                    itens: [...this.estado.itens, acao.item]
                });
                break;
                
            case 'REMOVER_ITEM':
                this.setState({
                    itens: this.estado.itens.filter(item => item.id !== acao.id)
                });
                break;
                
            case 'ATUALIZAR_ITEM':
                this.setState({
                    itens: this.estado.itens.map(item => 
                        item.id === acao.id ? { ...item, ...acao.atualizacoes } : item
                    )
                });
                break;
                
            case 'LIMPAR_ITENS':
                this.setState({
                    itens: []
                });
                break;
                
            default:
                console.warn('Ação não reconhecida:', acao.tipo);
        }
    }
}

// Usar State Manager
const stateManager = new StateManager({
    itens: [],
    carregando: false,
    erro: null
});

// Adicionar listener
const unsubscribe = stateManager.subscribe((novoEstado, estadoAnterior) => {
    console.log('Estado atualizado:', novoEstado);
    console.log('Estado anterior:', estadoAnterior);
});

// Adicionar middleware para logging
stateManager.addMiddleware((estadoAnterior, novoEstado) => {
    console.log('Middleware executado:', { estadoAnterior, novoEstado });
});

// Disparar ações
stateManager.dispatch({
    tipo: 'ADICIONAR_ITEM',
    item: { id: 1, nome: 'Item 1', preco: 10.00 }
});

stateManager.dispatch({
    tipo: 'ADICIONAR_ITEM',
    item: { id: 2, nome: 'Item 2', preco: 20.00 }
});

// Remover listener
unsubscribe();
```

### 4. 🔄 Persistência de Dados

#### **Sistema de Persistência**
```javascript
// Classe para persistir dados
class PersistenceManager {
    constructor(storage, chave) {
        this.storage = storage;
        this.chave = chave;
    }
    
    // Salvar estado
    salvar(estado) {
        try {
            this.storage.setItem(this.chave, estado);
            return true;
        } catch (erro) {
            console.error('Erro ao salvar estado:', erro);
            return false;
        }
    }
    
    // Carregar estado
    carregar(estadoPadrao = {}) {
        try {
            return this.storage.getItem(this.chave, estadoPadrao);
        } catch (erro) {
            console.error('Erro ao carregar estado:', erro);
            return estadoPadrao;
        }
    }
    
    // Limpar dados
    limpar() {
        this.storage.removeItem(this.chave);
    }
    
    // Verificar se existe
    existe() {
        return this.storage.hasItem(this.chave);
    }
}

// State Manager com persistência
class PersistentStateManager extends StateManager {
    constructor(estadoInicial = {}, storage, chave) {
        super(estadoInicial);
        this.persistence = new PersistenceManager(storage, chave);
        this.carregarEstado();
    }
    
    // Carregar estado salvo
    carregarEstado() {
        const estadoSalvo = this.persistence.carregar();
        if (estadoSalvo) {
            this.estado = { ...this.estado, ...estadoSalvo };
        }
    }
    
    // Salvar estado
    salvarEstado() {
        this.persistence.salvar(this.estado);
    }
    
    // Sobrescrever setState para salvar automaticamente
    setState(novoEstado) {
        super.setState(novoEstado);
        this.salvarEstado();
    }
}

// Usar State Manager persistente
const localStorage = new LocalStorageManager();
const persistentState = new PersistentStateManager(
    { itens: [], carregando: false },
    localStorage,
    'app-state'
);

// Adicionar item (será salvo automaticamente)
persistentState.dispatch({
    tipo: 'ADICIONAR_ITEM',
    item: { id: 1, nome: 'Item persistente', preco: 15.00 }
});
```

### 5. 🧠 Sistema de Cache Inteligente

#### **Cache com TTL e Invalidação**
```javascript
// Classe para cache inteligente
class CacheManager {
    constructor(ttl = 300000) { // 5 minutos por padrão
        this.cache = new Map();
        this.ttl = ttl;
        this.timers = new Map();
    }
    
    // Definir item no cache
    set(chave, valor, ttl = this.ttl) {
        // Limpar timer existente
        if (this.timers.has(chave)) {
            clearTimeout(this.timers.get(chave));
        }
        
        // Definir valor
        this.cache.set(chave, {
            valor,
            timestamp: Date.now(),
            ttl
        });
        
        // Definir timer para expiração
        const timer = setTimeout(() => {
            this.delete(chave);
        }, ttl);
        
        this.timers.set(chave, timer);
    }
    
    // Obter item do cache
    get(chave) {
        const item = this.cache.get(chave);
        
        if (!item) {
            return null;
        }
        
        // Verificar se expirou
        if (Date.now() - item.timestamp > item.ttl) {
            this.delete(chave);
            return null;
        }
        
        return item.valor;
    }
    
    // Remover item do cache
    delete(chave) {
        this.cache.delete(chave);
        
        if (this.timers.has(chave)) {
            clearTimeout(this.timers.get(chave));
            this.timers.delete(chave);
        }
    }
    
    // Limpar todo o cache
    clear() {
        this.cache.clear();
        this.timers.forEach(timer => clearTimeout(timer));
        this.timers.clear();
    }
    
    // Verificar se existe
    has(chave) {
        return this.get(chave) !== null;
    }
    
    // Obter estatísticas
    getStats() {
        return {
            tamanho: this.cache.size,
            chaves: Array.from(this.cache.keys()),
            memoriaUsada: this.estimarMemoria()
        };
    }
    
    // Estimar memória usada
    estimarMemoria() {
        let memoria = 0;
        for (const [chave, item] of this.cache) {
            memoria += chave.length * 2; // String UTF-16
            memoria += JSON.stringify(item.valor).length * 2;
            memoria += 24; // Overhead do objeto
        }
        return memoria;
    }
}

// Usar Cache Manager
const cache = new CacheManager(60000); // 1 minuto

// Definir item
cache.set('usuario', { nome: 'João', email: 'joao@email.com' });

// Obter item
const usuario = cache.get('usuario');
console.log(usuario);

// Verificar estatísticas
console.log(cache.getStats());
```

### 6. 🔄 Sincronização de Dados

#### **Sistema de Sincronização**
```javascript
// Classe para sincronizar dados
class DataSyncManager {
    constructor(apiClient, storage, cache) {
        this.apiClient = apiClient;
        this.storage = storage;
        this.cache = cache;
        this.syncQueue = [];
        this.isOnline = navigator.onLine;
        this.setupEventListeners();
    }
    
    // Configurar listeners de eventos
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processarFila();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }
    
    // Sincronizar dados
    async sincronizar(tipo, dados) {
        if (this.isOnline) {
            try {
                const resultado = await this.apiClient.post(`/sync/${tipo}`, dados);
                this.cache.set(`sync_${tipo}`, resultado);
                return resultado;
            } catch (erro) {
                // Adicionar à fila para sincronização posterior
                this.syncQueue.push({ tipo, dados, timestamp: Date.now() });
                this.storage.setItem('sync_queue', this.syncQueue);
                throw erro;
            }
        } else {
            // Adicionar à fila para sincronização posterior
            this.syncQueue.push({ tipo, dados, timestamp: Date.now() });
            this.storage.setItem('sync_queue', this.syncQueue);
            return { status: 'queued', message: 'Dados adicionados à fila de sincronização' };
        }
    }
    
    // Processar fila de sincronização
    async processarFila() {
        if (!this.isOnline || this.syncQueue.length === 0) {
            return;
        }
        
        const fila = [...this.syncQueue];
        this.syncQueue = [];
        
        for (const item of fila) {
            try {
                await this.apiClient.post(`/sync/${item.tipo}`, item.dados);
                console.log(`Item sincronizado: ${item.tipo}`);
            } catch (erro) {
                console.error(`Erro ao sincronizar ${item.tipo}:`, erro);
                // Re-adicionar à fila se falhar
                this.syncQueue.push(item);
            }
        }
        
        // Salvar fila atualizada
        this.storage.setItem('sync_queue', this.syncQueue);
    }
    
    // Carregar fila salva
    carregarFila() {
        const filaSalva = this.storage.getItem('sync_queue', []);
        this.syncQueue = filaSalva;
    }
    
    // Obter status da sincronização
    getStatus() {
        return {
            isOnline: this.isOnline,
            queueSize: this.syncQueue.length,
            queue: this.syncQueue
        };
    }
}

// Usar Data Sync Manager
const apiClient = new HttpClient('https://api.exemplo.com');
const localStorage = new LocalStorageManager();
const cache = new CacheManager();

const syncManager = new DataSyncManager(apiClient, localStorage, cache);

// Carregar fila salva
syncManager.carregarFila();

// Sincronizar dados
syncManager.sincronizar('usuarios', { nome: 'João', email: 'joao@email.com' })
    .then(resultado => console.log('Sincronizado:', resultado))
    .catch(erro => console.error('Erro:', erro));
```

### 7. 📱 Offline-First Applications

#### **Sistema Offline-First**
```javascript
// Classe para aplicação offline-first
class OfflineFirstApp {
    constructor() {
        this.isOnline = navigator.onLine;
        this.storage = new LocalStorageManager();
        this.cache = new CacheManager();
        this.syncManager = null;
        this.setupEventListeners();
    }
    
    // Configurar listeners
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.onConnectionChange(true);
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.onConnectionChange(false);
        });
    }
    
    // Callback para mudança de conexão
    onConnectionChange(isOnline) {
        if (isOnline) {
            this.sincronizarDados();
        } else {
            this.mostrarModoOffline();
        }
    }
    
    // Mostrar modo offline
    mostrarModoOffline() {
        console.log('Aplicação em modo offline');
        // Mostrar notificação para o usuário
        this.notificarUsuario('Aplicação em modo offline. Dados serão sincronizados quando a conexão for restaurada.');
    }
    
    // Sincronizar dados
    async sincronizarDados() {
        if (this.syncManager) {
            await this.syncManager.processarFila();
        }
    }
    
    // Salvar dados localmente
    salvarLocalmente(chave, dados) {
        this.storage.setItem(chave, dados);
        this.cache.set(chave, dados);
    }
    
    // Carregar dados
    carregarDados(chave, valorPadrao = null) {
        // Tentar cache primeiro
        let dados = this.cache.get(chave);
        
        if (dados) {
            return dados;
        }
        
        // Tentar storage local
        dados = this.storage.getItem(chave, valorPadrao);
        
        if (dados) {
            this.cache.set(chave, dados);
            return dados;
        }
        
        return valorPadrao;
    }
    
    // Notificar usuário
    notificarUsuario(mensagem) {
        // Implementar notificação (toast, modal, etc.)
        console.log('Notificação:', mensagem);
    }
    
    // Verificar se está online
    estaOnline() {
        return this.isOnline;
    }
    
    // Obter status da aplicação
    getStatus() {
        return {
            isOnline: this.isOnline,
            cacheSize: this.cache.getStats().tamanho,
            storageKeys: this.storage.getAllKeys()
        };
    }
}

// Usar aplicação offline-first
const app = new OfflineFirstApp();

// Salvar dados
app.salvarLocalmente('usuario', { nome: 'João', email: 'joao@email.com' });

// Carregar dados
const usuario = app.carregarDados('usuario');
console.log('Usuário carregado:', usuario);

// Verificar status
console.log('Status da aplicação:', app.getStatus());
```

### 8. 🔄 Sistema de Backup e Restore

#### **Backup e Restore**
```javascript
// Classe para backup e restore
class BackupManager {
    constructor(storage) {
        this.storage = storage;
    }
    
    // Criar backup
    criarBackup() {
        const dados = {};
        const chaves = this.storage.getAllKeys();
        
        chaves.forEach(chave => {
            dados[chave] = this.storage.getItem(chave);
        });
        
        const backup = {
            timestamp: new Date().toISOString(),
            versao: '1.0.0',
            dados
        };
        
        return backup;
    }
    
    // Salvar backup
    salvarBackup(backup) {
        const chave = `backup_${Date.now()}`;
        this.storage.setItem(chave, backup);
        return chave;
    }
    
    // Restaurar backup
    restaurarBackup(backup) {
        if (!backup || !backup.dados) {
            throw new Error('Backup inválido');
        }
        
        // Limpar dados atuais
        this.storage.clear();
        
        // Restaurar dados
        Object.entries(backup.dados).forEach(([chave, valor]) => {
            this.storage.setItem(chave, valor);
        });
        
        return true;
    }
    
    // Listar backups
    listarBackups() {
        const chaves = this.storage.getAllKeys();
        const backups = chaves
            .filter(chave => chave.startsWith('backup_'))
            .map(chave => {
                const backup = this.storage.getItem(chave);
                return {
                    chave,
                    timestamp: backup.timestamp,
                    versao: backup.versao,
                    tamanho: Object.keys(backup.dados).length
                };
            })
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        return backups;
    }
    
    // Remover backup
    removerBackup(chave) {
        this.storage.removeItem(chave);
    }
    
    // Exportar backup
    exportarBackup(backup) {
        const blob = new Blob([JSON.stringify(backup, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${backup.timestamp}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }
    
    // Importar backup
    async importarBackup(arquivo) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const backup = JSON.parse(event.target.result);
                    resolve(backup);
                } catch (erro) {
                    reject(new Error('Arquivo de backup inválido'));
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Erro ao ler arquivo'));
            };
            
            reader.readAsText(arquivo);
        });
    }
}

// Usar Backup Manager
const localStorage = new LocalStorageManager();
const backupManager = new BackupManager(localStorage);

// Criar backup
const backup = backupManager.criarBackup();
const chaveBackup = backupManager.salvarBackup(backup);

// Listar backups
const backups = backupManager.listarBackups();
console.log('Backups disponíveis:', backups);

// Exportar backup
backupManager.exportarBackup(backup);
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Sistema de Gerenciamento de Estado Completo**
Crie um sistema completo de gerenciamento de estado:
- State Manager com actions e reducers
- Persistência automática
- Middleware para logging
- Cache inteligente
- Sincronização com API

**Critérios de avaliação:**
- ✅ State Manager funcional
- ✅ Persistência implementada
- ✅ Middleware configurado
- ✅ Cache inteligente

### **Exercício 2: Aplicação Offline-First**
Desenvolva uma aplicação offline-first:
- Funcionamento offline completo
- Sincronização automática
- Cache inteligente
- Notificações de status
- Backup e restore

**Critérios de avaliação:**
- ✅ Funcionamento offline
- ✅ Sincronização automática
- ✅ Cache implementado
- ✅ Backup funcional

### **Exercício 3: Sistema de Cache Avançado**
Implemente um sistema de cache avançado:
- TTL configurável
- Invalidação automática
- Cache por camadas
- Métricas de performance
- Persistência local

**Critérios de avaliação:**
- ✅ TTL configurável
- ✅ Invalidação automática
- ✅ Cache por camadas
- ✅ Métricas implementadas

### **Exercício 4: Gerenciador de Dados com IndexedDB**
Construa um gerenciador de dados com IndexedDB:
- CRUD completo
- Relacionamentos entre dados
- Queries complexas
- Backup e restore
- Sincronização

**Critérios de avaliação:**
- ✅ CRUD completo
- ✅ Relacionamentos funcionais
- ✅ Queries complexas
- ✅ Backup implementado

---

## 💡 Dicas Importantes

### **1. Local Storage**
- Limite de ~5-10MB por domínio
- Dados persistem até serem limpos
- Use JSON.stringify/parse para objetos
- Trate erros de quota excedida

### **2. IndexedDB**
- Ideal para dados complexos
- Suporte a transações
- Queries por índices
- Assíncrono por natureza

### **3. State Management**
- Mantenha estado imutável
- Use actions para mudanças
- Implemente middleware para logging
- Separe estado por domínio

### **4. Offline-First**
- Sempre funcione offline
- Sincronize quando online
- Use cache inteligente
- Notifique mudanças de status

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Projeto: App de Tarefas Completo
- Integração de todos os conceitos
- Deploy e otimização
- Testes e debugging

---

## 📝 Checklist de Conclusão

- [ ] Dominou Local Storage e Session Storage
- [ ] Implementou IndexedDB para dados complexos
- [ ] Criou sistemas de gerenciamento de estado
- [ ] Aplicou padrões de state management
- [ ] Implementou persistência de dados
- [ ] Criou sistemas de cache inteligente
- [ ] Aplicou sincronização de dados
- [ ] Implementou offline-first applications
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou a Aula 5 com sucesso!**

---

## 📚 Recursos Adicionais

- [MDN Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Offline First](https://offlinefirst.org/)
- [State Management Patterns](https://redux.js.org/understanding/thinking-in-redux/three-principles)

---

*Próxima aula: Projeto: App de Tarefas Completo*







