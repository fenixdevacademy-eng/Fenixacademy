# ⚡ Aula 3: Promises, Async/Await e Fetch API
## Web Fundamentals - Módulo 4: JavaScript Avançado

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar Promises avançadas e métodos estáticos
- ✅ Implementar Async/Await com error handling
- ✅ Usar Fetch API para requisições HTTP
- ✅ Aplicar interceptors e middleware
- ✅ Implementar retry logic e timeout
- ✅ Criar sistemas de cache com Promises
- ✅ Aplicar Promise.all, Promise.race e Promise.allSettled
- ✅ Implementar streaming e upload de arquivos

---

## 📚 Conteúdo Principal

### 1. 🌟 Promises Avançadas

#### **Métodos Estáticos de Promise**
```javascript
// Promise.all - todas as promises devem ser resolvidas
async function buscarDadosCompletos() {
    try {
        const [usuarios, produtos, pedidos] = await Promise.all([
            fetch('/api/usuarios').then(res => res.json()),
            fetch('/api/produtos').then(res => res.json()),
            fetch('/api/pedidos').then(res => res.json())
        ]);
        
        return { usuarios, produtos, pedidos };
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        throw erro;
    }
}

// Promise.allSettled - aguarda todas, independente do resultado
async function buscarDadosRobusto() {
    const resultados = await Promise.allSettled([
        fetch('/api/usuarios').then(res => res.json()),
        fetch('/api/produtos').then(res => res.json()),
        fetch('/api/pedidos').then(res => res.json())
    ]);
    
    return resultados.map((resultado, index) => {
        if (resultado.status === 'fulfilled') {
            return { sucesso: true, dados: resultado.value };
        } else {
            return { sucesso: false, erro: resultado.reason };
        }
    });
}

// Promise.race - primeira promise resolvida
async function buscarComTimeout() {
    const promiseDados = fetch('/api/dados').then(res => res.json());
    const promiseTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
    );
    
    try {
        const dados = await Promise.race([promiseDados, promiseTimeout]);
        return dados;
    } catch (erro) {
        console.error('Timeout ou erro:', erro);
        throw erro;
    }
}

// Promise.any - primeira promise resolvida (ES2021)
async function buscarDeMultiplasFontes() {
    const fontes = [
        fetch('/api/fonte1').then(res => res.json()),
        fetch('/api/fonte2').then(res => res.json()),
        fetch('/api/fonte3').then(res => res.json())
    ];
    
    try {
        const dados = await Promise.any(fontes);
        return dados;
    } catch (erro) {
        console.error('Todas as fontes falharam:', erro);
        throw erro;
    }
}
```

#### **Promise Chaining Avançado**
```javascript
// Chain complexo com transformações
function processarUsuario(id) {
    return fetch(`/api/usuarios/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(usuario => {
            // Enriquecer dados do usuário
            return Promise.all([
                fetch(`/api/usuarios/${id}/pedidos`).then(res => res.json()),
                fetch(`/api/usuarios/${id}/preferencias`).then(res => res.json())
            ]).then(([pedidos, preferencias]) => ({
                ...usuario,
                pedidos,
                preferencias
            }));
        })
        .then(usuarioEnriquecido => {
            // Salvar cache
            return salvarCache(`usuario_${id}`, usuarioEnriquecido)
                .then(() => usuarioEnriquecido);
        })
        .catch(erro => {
            console.error('Erro ao processar usuário:', erro);
            throw erro;
        });
}
```

### 2. 🔄 Async/Await Avançado

#### **Error Handling Robusto**
```javascript
// Try-catch com múltiplas operações
async function operacaoComplexa() {
    try {
        // Primeira operação
        const usuario = await buscarUsuario(123);
        
        // Segunda operação dependente
        const pedidos = await buscarPedidos(usuario.id);
        
        // Terceira operação independente
        const [preferencias, historico] = await Promise.all([
            buscarPreferencias(usuario.id),
            buscarHistorico(usuario.id)
        ]);
        
        return {
            usuario,
            pedidos,
            preferencias,
            historico
        };
        
    } catch (erro) {
        // Log detalhado do erro
        console.error('Erro na operação complexa:', {
            message: erro.message,
            stack: erro.stack,
            timestamp: new Date().toISOString()
        });
        
        // Re-throw com contexto adicional
        throw new Error(`Falha na operação: ${erro.message}`);
    }
}

// Error handling com fallbacks
async function buscarDadosComFallback(id) {
    try {
        return await buscarDadosPrimarios(id);
    } catch (erro) {
        console.warn('Fonte primária falhou, tentando fallback:', erro);
        
        try {
            return await buscarDadosSecundarios(id);
        } catch (erroSecundario) {
            console.error('Todas as fontes falharam:', erroSecundario);
            return await buscarDadosCache(id);
        }
    }
}
```

#### **Async Iterators**
```javascript
// Async generator para streaming de dados
async function* streamDados(url) {
    const response = await fetch(url);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    try {
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            yield chunk;
        }
    } finally {
        reader.releaseLock();
    }
}

// Usar async iterator
async function processarStream() {
    for await (const chunk of streamDados('/api/dados-stream')) {
        console.log('Chunk recebido:', chunk);
        // Processar chunk
    }
}
```

### 3. 🌐 Fetch API Avançada

#### **Requisições HTTP Completas**
```javascript
// Classe para requisições HTTP
class HttpClient {
    constructor(baseURL = '', options = {}) {
        this.baseURL = baseURL;
        this.defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...this.defaultOptions,
            ...options,
            headers: {
                ...this.defaultOptions.headers,
                ...options.headers
            }
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
            
        } catch (erro) {
            console.error('Erro na requisição:', erro);
            throw erro;
        }
    }
    
    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }
    
    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

// Usar o HttpClient
const api = new HttpClient('https://api.exemplo.com');

// Exemplos de uso
const usuarios = await api.get('/usuarios');
const novoUsuario = await api.post('/usuarios', { nome: 'João', email: 'joao@email.com' });
```

#### **Upload de Arquivos**
```javascript
// Upload de arquivo único
async function uploadArquivo(arquivo, endpoint = '/upload') {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Upload falhou: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (erro) {
        console.error('Erro no upload:', erro);
        throw erro;
    }
}

// Upload múltiplo com progresso
async function uploadMultiplo(arquivos, endpoint = '/upload-multiplo') {
    const formData = new FormData();
    arquivos.forEach((arquivo, index) => {
        formData.append(`arquivo_${index}`, arquivo);
    });
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Upload múltiplo falhou: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (erro) {
        console.error('Erro no upload múltiplo:', erro);
        throw erro;
    }
}
```

### 4. 🔧 Interceptors e Middleware

#### **Sistema de Interceptors**
```javascript
class InterceptorManager {
    constructor() {
        this.interceptors = [];
    }
    
    use(fulfilled, rejected) {
        this.interceptors.push({ fulfilled, rejected });
        return this.interceptors.length - 1;
    }
    
    eject(id) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
    
    async runInterceptors(promise, isRequest = true) {
        let currentPromise = promise;
        
        for (const interceptor of this.interceptors) {
            if (!interceptor) continue;
            
            try {
                if (isRequest) {
                    currentPromise = interceptor.fulfilled(currentPromise);
                } else {
                    currentPromise = interceptor.fulfilled(currentPromise);
                }
            } catch (erro) {
                if (interceptor.rejected) {
                    currentPromise = interceptor.rejected(erro);
                } else {
                    throw erro;
                }
            }
        }
        
        return currentPromise;
    }
}

// Cliente HTTP com interceptors
class HttpClientComInterceptors {
    constructor() {
        this.requestInterceptors = new InterceptorManager();
        this.responseInterceptors = new InterceptorManager();
    }
    
    async request(url, options = {}) {
        // Aplicar request interceptors
        let requestPromise = Promise.resolve({ url, options });
        requestPromise = await this.requestInterceptors.runInterceptors(requestPromise, true);
        
        const { url: finalUrl, options: finalOptions } = await requestPromise;
        
        // Fazer requisição
        let responsePromise = fetch(finalUrl, finalOptions);
        
        // Aplicar response interceptors
        responsePromise = await this.responseInterceptors.runInterceptors(responsePromise, false);
        
        return responsePromise;
    }
}

// Usar interceptors
const client = new HttpClientComInterceptors();

// Request interceptor para adicionar token
client.requestInterceptors.use(async (request) => {
    const token = localStorage.getItem('token');
    if (token) {
        request.options.headers = {
            ...request.options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    return request;
});

// Response interceptor para tratar erros
client.responseInterceptors.use(
    async (response) => {
        if (response.status === 401) {
            // Token expirado, redirecionar para login
            window.location.href = '/login';
        }
        return response;
    },
    async (erro) => {
        console.error('Erro na requisição:', erro);
        throw erro;
    }
);
```

### 5. 🔄 Retry Logic e Timeout

#### **Sistema de Retry**
```javascript
// Função de retry com backoff exponencial
async function retryComBackoff(fn, maxTentativas = 3, delayInicial = 1000) {
    let tentativa = 0;
    let delay = delayInicial;
    
    while (tentativa < maxTentativas) {
        try {
            return await fn();
        } catch (erro) {
            tentativa++;
            
            if (tentativa >= maxTentativas) {
                throw erro;
            }
            
            console.warn(`Tentativa ${tentativa} falhou, tentando novamente em ${delay}ms:`, erro);
            
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2; // Backoff exponencial
        }
    }
}

// Usar retry
const dados = await retryComBackoff(async () => {
    const response = await fetch('/api/dados');
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}, 3, 1000);

// Retry com jitter (aleatoriedade)
async function retryComJitter(fn, maxTentativas = 3, delayInicial = 1000) {
    let tentativa = 0;
    
    while (tentativa < maxTentativas) {
        try {
            return await fn();
        } catch (erro) {
            tentativa++;
            
            if (tentativa >= maxTentativas) {
                throw erro;
            }
            
            // Adicionar jitter para evitar thundering herd
            const jitter = Math.random() * 0.1 * delayInicial;
            const delay = delayInicial * Math.pow(2, tentativa - 1) + jitter;
            
            console.warn(`Tentativa ${tentativa} falhou, tentando novamente em ${delay}ms:`, erro);
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```

#### **Timeout com AbortController**
```javascript
// Timeout com AbortController
async function fetchComTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response;
    } catch (erro) {
        clearTimeout(timeoutId);
        
        if (erro.name === 'AbortError') {
            throw new Error(`Timeout de ${timeout}ms excedido`);
        }
        
        throw erro;
    }
}

// Usar timeout
try {
    const response = await fetchComTimeout('/api/dados', {}, 3000);
    const dados = await response.json();
    console.log('Dados recebidos:', dados);
} catch (erro) {
    console.error('Erro ou timeout:', erro);
}
```

### 6. 💾 Cache com Promises

#### **Sistema de Cache**
```javascript
class CacheManager {
    constructor(ttl = 300000) { // 5 minutos por padrão
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    set(chave, valor, ttl = this.ttl) {
        const expiracao = Date.now() + ttl;
        this.cache.set(chave, { valor, expiracao });
    }
    
    get(chave) {
        const item = this.cache.get(chave);
        
        if (!item) {
            return null;
        }
        
        if (Date.now() > item.expiracao) {
            this.cache.delete(chave);
            return null;
        }
        
        return item.valor;
    }
    
    delete(chave) {
        this.cache.delete(chave);
    }
    
    clear() {
        this.cache.clear();
    }
    
    // Cache com Promise
    async getOrSet(chave, fn, ttl = this.ttl) {
        const cached = this.get(chave);
        
        if (cached !== null) {
            return cached;
        }
        
        try {
            const valor = await fn();
            this.set(chave, valor, ttl);
            return valor;
        } catch (erro) {
            throw erro;
        }
    }
}

// Usar cache
const cache = new CacheManager();

async function buscarUsuario(id) {
    return cache.getOrSet(`usuario_${id}`, async () => {
        const response = await fetch(`/api/usuarios/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    }, 600000); // Cache por 10 minutos
}
```

### 7. 🔄 Promise.allSettled e Promise.any

#### **Promise.allSettled em Ação**
```javascript
// Buscar dados de múltiplas fontes
async function buscarDadosRobusto() {
    const fontes = [
        fetch('/api/fonte1').then(res => res.json()),
        fetch('/api/fonte2').then(res => res.json()),
        fetch('/api/fonte3').then(res => res.json())
    ];
    
    const resultados = await Promise.allSettled(fontes);
    
    const dados = [];
    const erros = [];
    
    resultados.forEach((resultado, index) => {
        if (resultado.status === 'fulfilled') {
            dados.push({
                fonte: `fonte${index + 1}`,
                dados: resultado.value
            });
        } else {
            erros.push({
                fonte: `fonte${index + 1}`,
                erro: resultado.reason
            });
        }
    });
    
    return { dados, erros };
}

// Usar resultados
const { dados, erros } = await buscarDadosRobusto();

if (dados.length > 0) {
    console.log('Dados obtidos:', dados);
} else {
    console.error('Todas as fontes falharam:', erros);
}
```

#### **Promise.any para Fallback**
```javascript
// Buscar dados com fallback automático
async function buscarDadosComFallback() {
    const fontes = [
        fetch('/api/primaria').then(res => res.json()),
        fetch('/api/secundaria').then(res => res.json()),
        fetch('/api/terciaria').then(res => res.json())
    ];
    
    try {
        const dados = await Promise.any(fontes);
        console.log('Dados obtidos da primeira fonte disponível:', dados);
        return dados;
    } catch (erro) {
        console.error('Todas as fontes falharam:', erro);
        throw new Error('Nenhuma fonte de dados disponível');
    }
}
```

### 8. 📊 Streaming e Processamento de Dados

#### **Streaming de Dados**
```javascript
// Processar stream de dados
async function processarStream(url) {
    const response = await fetch(url);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    try {
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            const linhas = chunk.split('\n');
            
            for (const linha of linhas) {
                if (linha.trim()) {
                    try {
                        const dados = JSON.parse(linha);
                        await processarDados(dados);
                    } catch (erro) {
                        console.warn('Erro ao processar linha:', linha, erro);
                    }
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}

// Processar dados em lotes
async function processarEmLotes(dados, tamanhoLote = 100) {
    const lotes = [];
    
    for (let i = 0; i < dados.length; i += tamanhoLote) {
        lotes.push(dados.slice(i, i + tamanhoLote));
    }
    
    const resultados = await Promise.allSettled(
        lotes.map(lote => processarLote(lote))
    );
    
    return resultados.map((resultado, index) => ({
        lote: index,
        sucesso: resultado.status === 'fulfilled',
        dados: resultado.status === 'fulfilled' ? resultado.value : null,
        erro: resultado.status === 'rejected' ? resultado.reason : null
    }));
}
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Cliente HTTP Robusto**
Crie um cliente HTTP completo com:
- Interceptors para autenticação
- Retry logic com backoff exponencial
- Timeout configurável
- Cache automático
- Error handling robusto

**Critérios de avaliação:**
- ✅ Interceptors funcionais
- ✅ Retry logic implementado
- ✅ Timeout configurável
- ✅ Cache automático

### **Exercício 2: Sistema de Upload**
Desenvolva um sistema de upload com:
- Upload múltiplo de arquivos
- Progress tracking
- Retry automático
- Validação de tipos
- Compressão de imagens

**Critérios de avaliação:**
- ✅ Upload múltiplo funcional
- ✅ Progress tracking
- ✅ Retry automático
- ✅ Validação robusta

### **Exercício 3: Cache Inteligente**
Implemente um sistema de cache com:
- TTL configurável
- Invalidação automática
- Cache por camadas
- Métricas de performance
- Persistência local

**Critérios de avaliação:**
- ✅ Cache funcional
- ✅ TTL configurável
- ✅ Invalidação automática
- ✅ Métricas implementadas

### **Exercício 4: Processador de Dados**
Construa um processador de dados com:
- Streaming de dados
- Processamento em lotes
- Error recovery
- Progress tracking
- Resultados parciais

**Critérios de avaliação:**
- ✅ Streaming implementado
- ✅ Processamento em lotes
- ✅ Error recovery
- ✅ Progress tracking

---

## 💡 Dicas Importantes

### **1. Error Handling**
- Sempre use try-catch com async/await
- Implemente fallbacks para operações críticas
- Log erros detalhadamente
- Use Promise.allSettled para operações independentes

### **2. Performance**
- Use Promise.all para operações paralelas
- Implemente cache para dados frequentes
- Use streaming para dados grandes
- Otimize retry logic com backoff

### **3. Robustez**
- Implemente timeout para todas as requisições
- Use AbortController para cancelar operações
- Implemente retry logic com jitter
- Trate todos os tipos de erro

### **4. Manutenibilidade**
- Separe lógica de requisição da lógica de negócio
- Use interceptors para funcionalidades transversais
- Documente APIs e contratos
- Teste cenários de erro

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Classes, Herança e Padrões de Design
- Prototypes e OOP avançada
- Design Patterns em JavaScript
- Composição vs Herança

---

## 📝 Checklist de Conclusão

- [ ] Dominou Promises avançadas e métodos estáticos
- [ ] Implementou Async/Await com error handling
- [ ] Usou Fetch API para requisições HTTP
- [ ] Aplicou interceptors e middleware
- [ ] Implementou retry logic e timeout
- [ ] Criou sistemas de cache com Promises
- [ ] Aplicou Promise.all, Promise.race e Promise.allSettled
- [ ] Implementou streaming e upload de arquivos
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou a Aula 3 com sucesso!**

---

## 📚 Recursos Adicionais

- [MDN Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Async/Await Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

---

*Próxima aula: Classes, Herança e Padrões de Design*
