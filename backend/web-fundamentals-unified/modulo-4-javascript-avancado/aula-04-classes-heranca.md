# 🏗️ Aula 4: Classes, Herança e Padrões de Design
## Web Fundamentals - Módulo 4: JavaScript Avançado

⏱️ **Duração**: 90 min  
🎯 **Objetivos**: 8  
🧪 **Exercícios**: 4  
📚 **Nível**: Intermediário  

---

## 🎯 Objetivos de Aprendizado

- ✅ Dominar classes ES6 e sintaxe moderna
- ✅ Implementar herança e polimorfismo
- ✅ Aplicar composição vs herança
- ✅ Entender prototypes e OOP avançada
- ✅ Implementar design patterns em JavaScript
- ✅ Criar sistemas modulares e extensíveis
- ✅ Aplicar SOLID principles
- ✅ Implementar factory e builder patterns

---

## 📚 Conteúdo Principal

### 1. 🌟 Classes ES6 Modernas

#### **Sintaxe Básica de Classes**
```javascript
// Classe básica
class Usuario {
    constructor(nome, email, idade) {
        this.nome = nome;
        this.email = email;
        this.idade = idade;
        this.criadoEm = new Date();
    }
    
    // Método de instância
    exibirInfo() {
        return `${this.nome} (${this.email}) - ${this.idade} anos`;
    }
    
    // Getter
    get infoCompleta() {
        return `${this.nome} - ${this.email} - Criado em: ${this.criadoEm.toLocaleDateString()}`;
    }
    
    // Setter
    set novaIdade(idade) {
        if (idade < 0 || idade > 150) {
            throw new Error('Idade inválida');
        }
        this.idade = idade;
    }
    
    // Método estático
    static validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Método privado (ES2022)
    #calcularIdadeEmDias() {
        const hoje = new Date();
        const diffTime = Math.abs(hoje - this.criadoEm);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    // Método público que usa método privado
    diasDesdeCriacao() {
        return this.#calcularIdadeEmDias();
    }
}

// Usar a classe
const usuario = new Usuario("João", "joao@email.com", 25);
console.log(usuario.exibirInfo());
console.log(usuario.infoCompleta);
usuario.novaIdade = 26;
console.log(Usuario.validarEmail("teste@email.com"));
```

#### **Campos de Classe (ES2022)**
```javascript
class Configuracao {
    // Campos públicos
    nome = "Configuração Padrão";
    versao = "1.0.0";
    
    // Campos privados
    #apiKey = "chave-secreta";
    #timeout = 5000;
    
    // Campos estáticos
    static ambiente = "desenvolvimento";
    static #configuracaoGlobal = {};
    
    constructor(opcoes = {}) {
        this.nome = opcoes.nome || this.nome;
        this.versao = opcoes.versao || this.versao;
        this.#apiKey = opcoes.apiKey || this.#apiKey;
        this.#timeout = opcoes.timeout || this.#timeout;
    }
    
    // Getter para campo privado
    get apiKey() {
        return this.#apiKey;
    }
    
    // Setter para campo privado
    set apiKey(novaChave) {
        if (!novaChave || novaChave.length < 10) {
            throw new Error('API key inválida');
        }
        this.#apiKey = novaChave;
    }
    
    // Método estático para configurar globalmente
    static configurarGlobal(config) {
        this.#configuracaoGlobal = { ...this.#configuracaoGlobal, ...config };
    }
    
    // Método estático para obter configuração global
    static obterGlobal() {
        return { ...this.#configuracaoGlobal };
    }
}
```

### 2. 🔄 Herança e Polimorfismo

#### **Herança Básica**
```javascript
// Classe base
class Animal {
    constructor(nome, especie) {
        this.nome = nome;
        this.especie = especie;
    }
    
    fazerSom() {
        return "Som genérico de animal";
    }
    
    mover() {
        return `${this.nome} está se movendo`;
    }
    
    // Método que pode ser sobrescrito
    exibirInfo() {
        return `${this.nome} é um ${this.especie}`;
    }
}

// Classe derivada
class Cachorro extends Animal {
    constructor(nome, raca) {
        super(nome, "cachorro");
        this.raca = raca;
    }
    
    // Sobrescrever método da classe pai
    fazerSom() {
        return "Au au!";
    }
    
    // Adicionar método específico
    latir() {
        return `${this.nome} está latindo: ${this.fazerSom()}`;
    }
    
    // Sobrescrever método com chamada ao pai
    exibirInfo() {
        return `${super.exibirInfo()} da raça ${this.raca}`;
    }
}

// Classe derivada
class Gato extends Animal {
    constructor(nome, cor) {
        super(nome, "gato");
        this.cor = cor;
    }
    
    fazerSom() {
        return "Miau!";
    }
    
    ronronar() {
        return `${this.nome} está ronronando`;
    }
    
    exibirInfo() {
        return `${super.exibirInfo()} de cor ${this.cor}`;
    }
}

// Usar as classes
const cachorro = new Cachorro("Rex", "Golden Retriever");
const gato = new Gato("Mimi", "branco");

console.log(cachorro.fazerSom()); // Au au!
console.log(gato.fazerSom()); // Miau!
console.log(cachorro.exibirInfo()); // Rex é um cachorro da raça Golden Retriever
console.log(gato.exibirInfo()); // Mimi é um gato de cor branco
```

#### **Herança Múltipla com Mixins**
```javascript
// Mixins
const Voar = {
    voar() {
        return `${this.nome} está voando`;
    }
};

const Nadar = {
    nadar() {
        return `${this.nome} está nadando`;
    }
};

const Correr = {
    correr() {
        return `${this.nome} está correndo`;
    }
};

// Função para aplicar mixins
function aplicarMixins(classeBase, ...mixins) {
    mixins.forEach(mixin => {
        Object.getOwnPropertyNames(mixin).forEach(nome => {
            if (nome !== 'constructor') {
                classeBase.prototype[nome] = mixin[nome];
            }
        });
    });
}

// Classe base
class Animal {
    constructor(nome) {
        this.nome = nome;
    }
}

// Classe com mixins
class Pato extends Animal {
    constructor(nome) {
        super(nome);
    }
}

// Aplicar mixins
aplicarMixins(Pato, Voar, Nadar, Correr);

// Usar a classe
const pato = new Pato("Donald");
console.log(pato.voar()); // Donald está voando
console.log(pato.nadar()); // Donald está nadando
console.log(pato.correr()); // Donald está correndo
```

### 3. 🧩 Composição vs Herança

#### **Composição**
```javascript
// Classes de composição
class Motor {
    constructor(tipo, potencia) {
        this.tipo = tipo;
        this.potencia = potencia;
        this.ligado = false;
    }
    
    ligar() {
        this.ligado = true;
        return `Motor ${this.tipo} ligado`;
    }
    
    desligar() {
        this.ligado = false;
        return `Motor ${this.tipo} desligado`;
    }
}

class Roda {
    constructor(tamanho, tipo) {
        this.tamanho = tamanho;
        this.tipo = tipo;
        this.pressao = 30;
    }
    
    calibrar(pressao) {
        this.pressao = pressao;
        return `Roda calibrada para ${pressao} PSI`;
    }
}

class Banco {
    constructor(material, cor) {
        this.material = material;
        this.cor = cor;
        this.ocupado = false;
    }
    
    ocupar() {
        this.ocupado = true;
        return `Banco ${this.cor} ocupado`;
    }
    
    desocupar() {
        this.ocupado = false;
        return `Banco ${this.cor} desocupado`;
    }
}

// Classe principal usando composição
class Carro {
    constructor(marca, modelo, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        
        // Composição - o carro TEM um motor, rodas e bancos
        this.motor = new Motor("V8", 300);
        this.rodas = [
            new Roda(17, "liga leve"),
            new Roda(17, "liga leve"),
            new Roda(17, "liga leve"),
            new Roda(17, "liga leve")
        ];
        this.bancos = [
            new Banco("couro", "preto"),
            new Banco("couro", "preto"),
            new Banco("couro", "preto"),
            new Banco("couro", "preto")
        ];
    }
    
    ligar() {
        return this.motor.ligar();
    }
    
    desligar() {
        return this.motor.desligar();
    }
    
    calibrarRodas(pressao) {
        return this.rodas.map(roda => roda.calibrar(pressao));
    }
    
    ocuparBanco(indice) {
        if (indice >= 0 && indice < this.bancos.length) {
            return this.bancos[indice].ocupar();
        }
        throw new Error('Índice de banco inválido');
    }
    
    exibirInfo() {
        return `${this.marca} ${this.modelo} ${this.ano} - Motor: ${this.motor.tipo} ${this.motor.potencia}HP`;
    }
}

// Usar composição
const carro = new Carro("Toyota", "Corolla", 2023);
console.log(carro.ligar());
console.log(carro.calibrarRodas(32));
console.log(carro.ocuparBanco(0));
console.log(carro.exibirInfo());
```

### 4. 🎯 Design Patterns

#### **Factory Pattern**
```javascript
// Factory Pattern
class VeiculoFactory {
    static criarVeiculo(tipo, dados) {
        switch (tipo) {
            case 'carro':
                return new Carro(dados.marca, dados.modelo, dados.ano);
            case 'moto':
                return new Moto(dados.marca, dados.modelo, dados.cilindrada);
            case 'caminhao':
                return new Caminhao(dados.marca, dados.modelo, dados.capacidade);
            default:
                throw new Error(`Tipo de veículo não suportado: ${tipo}`);
        }
    }
}

// Classes de veículos
class Carro {
    constructor(marca, modelo, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.tipo = 'carro';
    }
}

class Moto {
    constructor(marca, modelo, cilindrada) {
        this.marca = marca;
        this.modelo = modelo;
        this.cilindrada = cilindrada;
        this.tipo = 'moto';
    }
}

class Caminhao {
    constructor(marca, modelo, capacidade) {
        this.marca = marca;
        this.modelo = modelo;
        this.capacidade = capacidade;
        this.tipo = 'caminhao';
    }
}

// Usar factory
const veiculo1 = VeiculoFactory.criarVeiculo('carro', {
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: 2023
});

const veiculo2 = VeiculoFactory.criarVeiculo('moto', {
    marca: 'Honda',
    modelo: 'CB 600',
    cilindrada: 600
});
```

#### **Builder Pattern**
```javascript
// Builder Pattern
class UsuarioBuilder {
    constructor() {
        this.usuario = {};
    }
    
    setNome(nome) {
        this.usuario.nome = nome;
        return this;
    }
    
    setEmail(email) {
        this.usuario.email = email;
        return this;
    }
    
    setIdade(idade) {
        this.usuario.idade = idade;
        return this;
    }
    
    setTelefone(telefone) {
        this.usuario.telefone = telefone;
        return this;
    }
    
    setEndereco(endereco) {
        this.usuario.endereco = endereco;
        return this;
    }
    
    setPreferencias(preferencias) {
        this.usuario.preferencias = preferencias;
        return this;
    }
    
    build() {
        // Validações
        if (!this.usuario.nome) {
            throw new Error('Nome é obrigatório');
        }
        if (!this.usuario.email) {
            throw new Error('Email é obrigatório');
        }
        
        return new Usuario(this.usuario);
    }
}

class Usuario {
    constructor(dados) {
        this.nome = dados.nome;
        this.email = dados.email;
        this.idade = dados.idade;
        this.telefone = dados.telefone;
        this.endereco = dados.endereco;
        this.preferencias = dados.preferencias;
        this.criadoEm = new Date();
    }
}

// Usar builder
const usuario = new UsuarioBuilder()
    .setNome("João Silva")
    .setEmail("joao@email.com")
    .setIdade(25)
    .setTelefone("(11) 99999-9999")
    .setEndereco({
        rua: "Rua das Flores",
        numero: 123,
        cidade: "São Paulo"
    })
    .setPreferencias({
        tema: "escuro",
        idioma: "pt-BR"
    })
    .build();
```

#### **Observer Pattern**
```javascript
// Observer Pattern
class EventEmitter {
    constructor() {
        this.eventos = {};
    }
    
    on(evento, callback) {
        if (!this.eventos[evento]) {
            this.eventos[evento] = [];
        }
        this.eventos[evento].push(callback);
    }
    
    off(evento, callback) {
        if (this.eventos[evento]) {
            this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback);
        }
    }
    
    emit(evento, ...args) {
        if (this.eventos[evento]) {
            this.eventos[evento].forEach(callback => callback(...args));
        }
    }
}

// Classe que usa Observer
class CarrinhoCompras extends EventEmitter {
    constructor() {
        super();
        this.itens = [];
        this.total = 0;
    }
    
    adicionarItem(item) {
        this.itens.push(item);
        this.calcularTotal();
        this.emit('itemAdicionado', item);
        this.emit('carrinhoAtualizado', this.itens, this.total);
    }
    
    removerItem(id) {
        const itemRemovido = this.itens.find(item => item.id === id);
        if (itemRemovido) {
            this.itens = this.itens.filter(item => item.id !== id);
            this.calcularTotal();
            this.emit('itemRemovido', itemRemovido);
            this.emit('carrinhoAtualizado', this.itens, this.total);
        }
    }
    
    calcularTotal() {
        this.total = this.itens.reduce((total, item) => total + item.preco, 0);
    }
    
    finalizarCompra() {
        this.emit('compraFinalizada', this.itens, this.total);
        this.itens = [];
        this.total = 0;
    }
}

// Usar Observer
const carrinho = new CarrinhoCompras();

// Observadores
carrinho.on('itemAdicionado', (item) => {
    console.log(`Item adicionado: ${item.nome}`);
});

carrinho.on('carrinhoAtualizado', (itens, total) => {
    console.log(`Carrinho atualizado: ${itens.length} itens, Total: R$ ${total}`);
});

carrinho.on('compraFinalizada', (itens, total) => {
    console.log(`Compra finalizada: ${itens.length} itens, Total: R$ ${total}`);
});

// Usar o carrinho
carrinho.adicionarItem({ id: 1, nome: "Produto 1", preco: 10.00 });
carrinho.adicionarItem({ id: 2, nome: "Produto 2", preco: 20.00 });
carrinho.finalizarCompra();
```

### 5. 🏛️ SOLID Principles

#### **Single Responsibility Principle (SRP)**
```javascript
// ❌ Violação do SRP
class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    
    salvar() {
        // Lógica de persistência
        console.log('Salvando usuário no banco de dados');
    }
    
    enviarEmail() {
        // Lógica de envio de email
        console.log('Enviando email para o usuário');
    }
    
    validar() {
        // Lógica de validação
        console.log('Validando dados do usuário');
    }
}

// ✅ Aplicando SRP
class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

class UsuarioRepository {
    salvar(usuario) {
        console.log('Salvando usuário no banco de dados');
    }
}

class EmailService {
    enviarEmail(usuario) {
        console.log('Enviando email para o usuário');
    }
}

class UsuarioValidator {
    validar(usuario) {
        console.log('Validando dados do usuário');
    }
}
```

#### **Open/Closed Principle (OCP)**
```javascript
// ✅ Aplicando OCP
class Desconto {
    calcular(valor) {
        return valor;
    }
}

class DescontoPorcentagem extends Desconto {
    constructor(porcentagem) {
        super();
        this.porcentagem = porcentagem;
    }
    
    calcular(valor) {
        return valor * (1 - this.porcentagem / 100);
    }
}

class DescontoFixo extends Desconto {
    constructor(valor) {
        super();
        this.valor = valor;
    }
    
    calcular(valor) {
        return Math.max(0, valor - this.valor);
    }
}

class DescontoProgressivo extends Desconto {
    constructor(limite, porcentagem) {
        super();
        this.limite = limite;
        this.porcentagem = porcentagem;
    }
    
    calcular(valor) {
        if (valor > this.limite) {
            return valor * (1 - this.porcentagem / 100);
        }
        return valor;
    }
}

// Usar diferentes tipos de desconto
const descontos = [
    new DescontoPorcentagem(10),
    new DescontoFixo(50),
    new DescontoProgressivo(1000, 15)
];

const valorOriginal = 1200;
descontos.forEach(desconto => {
    const valorFinal = desconto.calcular(valorOriginal);
    console.log(`Valor final: R$ ${valorFinal}`);
});
```

### 6. 🔧 Singleton Pattern

#### **Singleton Básico**
```javascript
class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        
        this.connected = false;
        this.connectionString = '';
        DatabaseConnection.instance = this;
    }
    
    conectar(connectionString) {
        if (!this.connected) {
            this.connectionString = connectionString;
            this.connected = true;
            console.log('Conectado ao banco de dados');
        }
        return this;
    }
    
    desconectar() {
        this.connected = false;
        console.log('Desconectado do banco de dados');
    }
    
    executarQuery(query) {
        if (!this.connected) {
            throw new Error('Não conectado ao banco de dados');
        }
        console.log(`Executando query: ${query}`);
    }
}

// Usar singleton
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();

console.log(db1 === db2); // true - mesma instância

db1.conectar('mongodb://localhost:27017/mydb');
db2.executarQuery('SELECT * FROM usuarios');
```

#### **Singleton com Module Pattern**
```javascript
const ConfiguracaoSingleton = (() => {
    let instancia;
    
    class Configuracao {
        constructor() {
            if (instancia) {
                return instancia;
            }
            
            this.config = {
                apiUrl: 'https://api.exemplo.com',
                timeout: 5000,
                retries: 3
            };
            
            instancia = this;
        }
        
        get(chave) {
            return this.config[chave];
        }
        
        set(chave, valor) {
            this.config[chave] = valor;
        }
        
        getAll() {
            return { ...this.config };
        }
    }
    
    return Configuracao;
})();

// Usar singleton
const config1 = new ConfiguracaoSingleton();
const config2 = new ConfiguracaoSingleton();

console.log(config1 === config2); // true
config1.set('timeout', 10000);
console.log(config2.get('timeout')); // 10000
```

### 7. 🎨 Strategy Pattern

#### **Strategy Pattern**
```javascript
// Estratégias de pagamento
class EstrategiaPagamento {
    pagar(valor) {
        throw new Error('Método pagar deve ser implementado');
    }
}

class PagamentoCartao extends EstrategiaPagamento {
    pagar(valor) {
        console.log(`Pagando R$ ${valor} com cartão de crédito`);
        return { sucesso: true, metodo: 'cartao' };
    }
}

class PagamentoPix extends EstrategiaPagamento {
    pagar(valor) {
        console.log(`Pagando R$ ${valor} com PIX`);
        return { sucesso: true, metodo: 'pix' };
    }
}

class PagamentoBoleto extends EstrategiaPagamento {
    pagar(valor) {
        console.log(`Gerando boleto de R$ ${valor}`);
        return { sucesso: true, metodo: 'boleto', codigo: '123456789' };
    }
}

// Contexto que usa as estratégias
class ProcessadorPagamento {
    constructor() {
        this.estrategia = null;
    }
    
    setEstrategia(estrategia) {
        this.estrategia = estrategia;
    }
    
    processarPagamento(valor) {
        if (!this.estrategia) {
            throw new Error('Estratégia de pagamento não definida');
        }
        
        return this.estrategia.pagar(valor);
    }
}

// Usar strategy pattern
const processador = new ProcessadorPagamento();

// Pagamento com cartão
processador.setEstrategia(new PagamentoCartao());
processador.processarPagamento(100.00);

// Pagamento com PIX
processador.setEstrategia(new PagamentoPix());
processador.processarPagamento(50.00);

// Pagamento com boleto
processador.setEstrategia(new PagamentoBoleto());
processador.processarPagamento(200.00);
```

### 8. 🏗️ Builder Pattern Avançado

#### **Builder com Fluent Interface**
```javascript
class QueryBuilder {
    constructor() {
        this.query = {
            select: [],
            from: '',
            where: [],
            join: [],
            orderBy: [],
            limit: null,
            offset: null
        };
    }
    
    select(campos) {
        this.query.select = Array.isArray(campos) ? campos : [campos];
        return this;
    }
    
    from(tabela) {
        this.query.from = tabela;
        return this;
    }
    
    where(condicao) {
        this.query.where.push(condicao);
        return this;
    }
    
    join(tabela, condicao) {
        this.query.join.push({ tabela, condicao });
        return this;
    }
    
    orderBy(campo, direcao = 'ASC') {
        this.query.orderBy.push({ campo, direcao });
        return this;
    }
    
    limit(quantidade) {
        this.query.limit = quantidade;
        return this;
    }
    
    offset(posicao) {
        this.query.offset = posicao;
        return this;
    }
    
    build() {
        let sql = `SELECT ${this.query.select.join(', ')} FROM ${this.query.from}`;
        
        if (this.query.join.length > 0) {
            this.query.join.forEach(join => {
                sql += ` JOIN ${join.tabela} ON ${join.condicao}`;
            });
        }
        
        if (this.query.where.length > 0) {
            sql += ` WHERE ${this.query.where.join(' AND ')}`;
        }
        
        if (this.query.orderBy.length > 0) {
            const orderClause = this.query.orderBy
                .map(order => `${order.campo} ${order.direcao}`)
                .join(', ');
            sql += ` ORDER BY ${orderClause}`;
        }
        
        if (this.query.limit) {
            sql += ` LIMIT ${this.query.limit}`;
        }
        
        if (this.query.offset) {
            sql += ` OFFSET ${this.query.offset}`;
        }
        
        return sql;
    }
}

// Usar query builder
const query = new QueryBuilder()
    .select(['nome', 'email', 'idade'])
    .from('usuarios')
    .where('idade > 18')
    .where('ativo = true')
    .join('enderecos', 'usuarios.id = enderecos.usuario_id')
    .orderBy('nome', 'ASC')
    .limit(10)
    .offset(0)
    .build();

console.log(query);
```

---

## 🧪 Exercícios Práticos

### **Exercício 1: Sistema de E-commerce com OOP**
Crie um sistema de e-commerce usando OOP:
- Classes para Produto, Cliente, Pedido
- Herança para diferentes tipos de produtos
- Composição para carrinho de compras
- Factory para criar produtos
- Observer para notificações

**Critérios de avaliação:**
- ✅ Classes bem estruturadas
- ✅ Herança implementada
- ✅ Composição aplicada
- ✅ Design patterns utilizados

### **Exercício 2: Sistema de Notificações**
Desenvolva um sistema de notificações:
- Observer pattern para eventos
- Strategy pattern para diferentes tipos de notificação
- Factory para criar notificações
- Singleton para gerenciar o sistema
- Builder para configurar notificações

**Critérios de avaliação:**
- ✅ Observer pattern implementado
- ✅ Strategy pattern aplicado
- ✅ Factory funcional
- ✅ Singleton configurado

### **Exercício 3: Sistema de Cache Inteligente**
Implemente um sistema de cache com:
- Strategy pattern para diferentes algoritmos de cache
- Observer para invalidação automática
- Builder para configurar cache
- Factory para criar instâncias
- Decorator para adicionar funcionalidades

**Critérios de avaliação:**
- ✅ Strategy pattern implementado
- ✅ Observer funcional
- ✅ Builder configurado
- ✅ Decorator aplicado

### **Exercício 4: Framework de Validação**
Construa um framework de validação:
- Chain of Responsibility para validações
- Strategy para diferentes tipos de validação
- Builder para construir regras
- Factory para criar validadores
- Template Method para fluxo de validação

**Critérios de avaliação:**
- ✅ Chain of Responsibility
- ✅ Strategy pattern
- ✅ Builder funcional
- ✅ Template Method

---

## 💡 Dicas Importantes

### **1. Herança vs Composição**
- Prefira composição quando possível
- Use herança para relacionamentos "é um"
- Use composição para relacionamentos "tem um"
- Evite herança profunda

### **2. Design Patterns**
- Use patterns para resolver problemas específicos
- Não force patterns onde não são necessários
- Combine patterns quando apropriado
- Documente o uso de patterns

### **3. SOLID Principles**
- Aplique SRP para classes focadas
- Use OCP para extensibilidade
- Implemente LSP para substituição
- Aplique ISP para interfaces específicas
- Use DIP para inversão de dependência

### **4. Performance**
- Use classes para objetos com estado
- Prefira funções para operações simples
- Evite herança desnecessária
- Use mixins para funcionalidades transversais

---

## 🚀 Próximos Passos

Na próxima aula, você aprenderá sobre:
- Local Storage e Gerenciamento de Estado
- State Management patterns
- Redux e Context API
- Persistência de dados

---

## 📝 Checklist de Conclusão

- [ ] Dominou classes ES6 e sintaxe moderna
- [ ] Implementou herança e polimorfismo
- [ ] Aplicou composição vs herança
- [ ] Entendeu prototypes e OOP avançada
- [ ] Implementou design patterns em JavaScript
- [ ] Criou sistemas modulares e extensíveis
- [ ] Aplicou SOLID principles
- [ ] Implementou factory e builder patterns
- [ ] Completou os 4 exercícios
- [ ] Testou em diferentes cenários

**🎉 Parabéns! Você completou a Aula 4 com sucesso!**

---

## 📚 Recursos Adicionais

- [MDN Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [JavaScript Design Patterns](https://www.dofactory.com/javascript/design-patterns)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Composition over Inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)

---

*Próxima aula: Local Storage e Gerenciamento de Estado*
