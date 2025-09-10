#!/usr/bin/env python3
"""
Script para refazer o conteúdo do curso Web Fundamentals em partes
Substitui o conteúdo incorreto pelo conteúdo correto e estruturado
"""

import os
import re
from pathlib import Path

class WebFundamentalsRefactor:
    def __init__(self):
        self.base_path = Path("backend/fenix-expanded-content/web-fundamentals/avancado")
        self.target_file = self.base_path / "aula-01-modulo-01-web-fundamentals.md"
        self.backup_file = self.base_path / "aula-01-modulo-01-web-fundamentals.md.backup"
        
    def create_backup(self):
        """Cria backup do arquivo original"""
        if self.target_file.exists():
            self.target_file.rename(self.backup_file)
            print(f"✅ Backup criado: {self.backup_file}")
    
    def part1_introduction_and_history(self):
        """Parte 1: Introdução e História da Web"""
        content = """# 🎓 **Web Fundamentals - Nível Avançado**
## 📚 **Aula 01 - Módulo 01: Introdução ao Desenvolvimento Web Moderno**
### 🎯 **Objetivos de Aprendizado**
- ✅ Compreender a evolução histórica da web e suas tecnologias
- ✅ Dominar os conceitos fundamentais da arquitetura web moderna
- ✅ Configurar ambiente de desenvolvimento profissional
- ✅ Aplicar melhores práticas da indústria em projetos reais
- ✅ Desenvolver habilidades práticas de programação web
**Duração Estimada:** 60 minutos  
**Nível:** Avançado  
**Pré-requisitos:** Conhecimento básico de computação
---
## 🌟 **INTRODUÇÃO AO TÓPICO**
### 🎬 **Hook Visual e Contexto**
### 📋 **Agenda da Aula**
1. **História e Evolução da Web** → Fundamentos teóricos → Casos práticos
2. **Arquitetura Web Moderna** → Componentes essenciais → Implementação
3. **Ambiente de Desenvolvimento** → Setup profissional → Primeiro projeto
---
## 🏗️ **DESENVOLVIMENTO DOS CONCEITOS**
### 1️⃣ **História e Evolução da Web**
#### **1.1 A Revolução da Web 1.0 à 4.0**
A World Wide Web nasceu em 1989 quando Tim Berners-Lee, um cientista do CERN, propôs um sistema de hipertexto para compartilhar informações entre pesquisadores. Esta invenção revolucionária transformou completamente a forma como nos comunicamos, trabalhamos e vivemos.

**Web 1.0 (1989-2004): A Era da Informação Estática**
A primeira geração da web caracterizou-se por páginas estáticas, onde os usuários eram meros consumidores de conteúdo. Sites como Yahoo!, Altavista e os primeiros portais corporativos dominavam o cenário. A interação era limitada e o conteúdo era controlado por poucos.

**Web 2.0 (2004-2016): A Revolução da Interação**
A segunda geração trouxe uma mudança paradigmática, transformando usuários de consumidores em produtores de conteúdo. Redes sociais como Facebook, YouTube e Twitter emergiram, permitindo que pessoas comuns criassem, compartilhassem e colaborassem em conteúdo digital. A web tornou-se uma plataforma de duas vias, onde a interação e a colaboração eram fundamentais.

**Web 3.0 (2016-2022): A Era da Inteligência Semântica**
A terceira geração introduziu conceitos de inteligência artificial, machine learning e dados semânticos. A web tornou-se mais inteligente, capaz de entender o contexto e fornecer respostas personalizadas. Empresas como Google, Amazon e Netflix utilizavam algoritmos avançados para oferecer experiências personalizadas aos usuários.

**Web 4.0 (2022-Presente): A Revolução da Web Imersiva**
A quarta geração representa a convergência entre realidade virtual, inteligência artificial e internet das coisas. A web torna-se imersiva, permitindo experiências tridimensionais e interações com o mundo físico através de dispositivos conectados. Metaverso, realidade aumentada e computação quântica são as tecnologias que definem esta nova era.

#### **1.2 Impacto no Mercado Brasileiro**
**Nubank: Revolucionando o Setor Bancário**
O Nubank, fundado em 2013, transformou completamente o setor bancário brasileiro através de uma plataforma web moderna. Utilizando tecnologias como React, Node.js e microserviços, a empresa criou uma experiência digital que rivaliza com os maiores bancos tradicionais, provando que a arquitetura web moderna pode democratizar serviços financeiros.

**iFood: Dominando o Mercado de Delivery**
O iFood, líder em delivery no Brasil, demonstra como uma arquitetura web escalável pode suportar milhões de transações simultâneas. Sua plataforma utiliza tecnologias como Kubernetes, Docker e APIs RESTful para garantir disponibilidade e performance, servindo como exemplo de como a web moderna pode transformar indústrias tradicionais.

**Mercado Livre: E-commerce de Sucesso**
O Mercado Livre, fundado na Argentina mas com forte presença no Brasil, demonstrou como uma plataforma web bem arquitetada pode dominar o mercado de e-commerce. A empresa utiliza tecnologias como Python, Java e sistemas de recomendação baseados em IA para oferecer uma experiência personalizada aos usuários.

### 2️⃣ **Arquitetura Web Moderna**
#### **2.1 Componentes Fundamentais**
**Frontend: A Interface do Usuário**
O frontend é responsável por toda a experiência visual e interativa que o usuário vê e toca. Tecnologias modernas como React, Vue.js e Angular permitem criar interfaces ricas e responsivas, enquanto ferramentas como Webpack e Vite otimizam o desempenho e a experiência de desenvolvimento.

**Backend: A Lógica de Negócio**
O backend processa as requisições, executa a lógica de negócio e gerencia os dados. Arquiteturas modernas utilizam microserviços, APIs RESTful e GraphQL para criar sistemas escaláveis e manuteníveis. Tecnologias como Node.js, Python (Django/Flask) e Java (Spring) são amplamente utilizadas.

**Banco de Dados: A Persistência de Dados**
Os bancos de dados modernos vão além do SQL tradicional, incluindo NoSQL (MongoDB, Cassandra), bancos de tempo real (Firebase) e soluções híbridas. A escolha da tecnologia de persistência impacta diretamente na performance e escalabilidade da aplicação.

**Infraestrutura: A Base de Suporte**
A infraestrutura moderna é baseada em cloud computing, containers (Docker) e orquestração (Kubernetes). Serviços como AWS, Google Cloud e Azure oferecem soluções escaláveis e confiáveis para hospedar aplicações web modernas.

#### **2.2 Padrões de Design Modernos**
**Arquitetura de Microserviços**
A arquitetura de microserviços divide a aplicação em serviços independentes e desacoplados, cada um responsável por uma funcionalidade específica. Esta abordagem facilita a manutenção, escalabilidade e deploy independente de cada componente.

**API-First Design**
O design API-first coloca a API como elemento central do desenvolvimento, permitindo que diferentes frontends (web, mobile, desktop) consumam os mesmos serviços. APIs RESTful e GraphQL são padrões modernos que facilitam a integração e o desenvolvimento de aplicações distribuídas.

**Event-Driven Architecture**
A arquitetura orientada a eventos permite que diferentes componentes da aplicação se comuniquem de forma assíncrona através de eventos. Esta abordagem é ideal para sistemas que precisam processar grandes volumes de dados em tempo real.

### 3️⃣ **Ambiente de Desenvolvimento Profissional**
#### **3.1 Ferramentas Essenciais**
**Editores de Código e IDEs**
Ferramentas modernas como Visual Studio Code, WebStorm e Sublime Text oferecem recursos avançados como IntelliSense, debugging integrado e extensões que aceleram o desenvolvimento. A escolha da ferramenta adequada pode aumentar significativamente a produtividade.

**Controle de Versão com Git**
Git é essencial para o desenvolvimento colaborativo moderno. Plataformas como GitHub, GitLab e Bitbucket facilitam o gerenciamento de repositórios, code review e integração contínua.

**Gerenciadores de Pacotes**
NPM (Node.js), Yarn, Composer (PHP) e pip (Python) são ferramentas essenciais para gerenciar dependências e automatizar tarefas de build. O uso correto dessas ferramentas garante a reprodutibilidade e manutenibilidade dos projetos.

**Ferramentas de Build e Bundling**
Webpack, Vite, Parcel e Rollup são ferramentas modernas que otimizam o código, minificam assets e criam builds de produção otimizados. A configuração adequada dessas ferramentas é crucial para a performance da aplicação.

---
"""
        return content

    def part2_javascript_advanced(self):
        """Parte 2: Módulo JavaScript Avançado"""
        content = """
## 📚 **MÓDULO 1: JavaScript Avançado (ES6+)**
### 🎯 **Objetivos de Aprendizado**
- ✅ Dominar recursos modernos do JavaScript (ES6+)
- ✅ Implementar programação funcional e orientada a objetos
- ✅ Gerenciar assincronia com Promises e async/await
- ✅ Aplicar padrões de design em JavaScript
- ✅ Otimizar performance e debugging

### 🏗️ **Conceitos Fundamentais**
#### **1.1 ES6+ Features Essenciais**
**Arrow Functions e Lexical Scoping**
```javascript
// Arrow functions com lexical scoping
const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price, 0);
};

// Comparação com function tradicional
function calculateTotalTraditional(items) {
    return items.reduce(function(total, item) {
        return total + item.price;
    }, 0);
}
```

**Destructuring e Spread Operator**
```javascript
// Destructuring de objetos
const { name, age, email } = user;
const [first, second, ...rest] = numbers;

// Spread operator para arrays e objetos
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProperty: value };
```

**Template Literals e Tagged Templates**
```javascript
// Template literals
const message = `Olá ${name}, você tem ${age} anos!`;

// Tagged templates para processamento customizado
const html = highlight`Código: ${code} com ${language}`;
```

#### **1.2 Programação Assíncrona Moderna**
**Promises e Async/Await**
```javascript
// Usando Promises
const fetchUserData = (userId) => {
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => data.user)
        .catch(error => console.error('Erro:', error));
};

// Usando async/await
const fetchUserDataAsync = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};
```

**Promise.all e Promise.race**
```javascript
// Executar múltiplas promises em paralelo
const fetchMultipleUsers = async (userIds) => {
    const promises = userIds.map(id => fetchUserData(id));
    return Promise.all(promises);
};

// Primeira promise que resolver
const fetchFastestData = async (urls) => {
    const promises = urls.map(url => fetch(url));
    return Promise.race(promises);
};
```

#### **1.3 Classes e Herança**
```javascript
// Classes ES6
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
    
    // Getters e setters
    get displayName() {
        return `${this.name} (${this.email})`;
    }
    
    set displayName(value) {
        const [name, email] = value.split(' (');
        this.name = name;
        this.email = email.replace(')', '');
    }
    
    // Métodos
    greet() {
        return `Olá, eu sou ${this.name}!`;
    }
    
    // Método estático
    static createAdmin(name, email) {
        const admin = new User(name, email);
        admin.isAdmin = true;
        return admin;
    }
}

// Herança
class AdminUser extends User {
    constructor(name, email, permissions) {
        super(name, email);
        this.permissions = permissions;
        this.isAdmin = true;
    }
    
    // Sobrescrever método
    greet() {
        return `Olá, eu sou ${this.name}, administrador do sistema!`;
    }
    
    // Novo método
    grantPermission(user, permission) {
        if (this.permissions.includes('grant_permissions')) {
            user.permissions = user.permissions || [];
            user.permissions.push(permission);
            return true;
        }
        return false;
    }
}
```

### 🛠️ **Implementação Prática**
#### **Projeto: Sistema de Gerenciamento de Tarefas**
```javascript
// taskManager.js
class TaskManager {
    constructor() {
        this.tasks = [];
        this.categories = new Set();
    }
    
    // Adicionar tarefa
    addTask(title, description, category = 'geral', priority = 'média') {
        const task = {
            id: Date.now(),
            title,
            description,
            category,
            priority,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.tasks.push(task);
        this.categories.add(category);
        return task;
    }
    
    // Filtrar tarefas
    getTasksByCategory(category) {
        return this.tasks.filter(task => task.category === category);
    }
    
    // Marcar como concluída
    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = true;
            task.updatedAt = new Date();
            return true;
        }
        return false;
    }
    
    // Estatísticas
    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        return {
            total,
            completed,
            pending,
            completionRate: total > 0 ? (completed / total) * 100 : 0
        };
    }
}

// Uso do TaskManager
const manager = new TaskManager();
manager.addTask('Estudar JavaScript', 'Revisar conceitos de ES6+', 'estudos', 'alta');
manager.addTask('Fazer exercícios', 'Praticar com projetos reais', 'estudos', 'média');
```

### 🎯 **Exercícios Práticos**
1. **Básico**: Implemente uma calculadora usando arrow functions
2. **Intermediário**: Crie um sistema de cache com Promises
3. **Avançado**: Desenvolva um gerenciador de estado simples

### 📝 **Projeto Final**
Desenvolva uma aplicação de blog com:
- Sistema de posts e comentários
- Autenticação de usuários
- Busca e filtros
- Interface responsiva

---
"""
        return content

    def part3_react_components(self):
        """Parte 3: Módulo React.js e Componentes"""
        content = """
## ⚛️ **MÓDULO 2: React.js e Componentes**
### 🎯 **Objetivos de Aprendizado**
- ✅ Dominar conceitos fundamentais do React
- ✅ Criar componentes reutilizáveis e performáticos
- ✅ Gerenciar estado com hooks e context
- ✅ Implementar roteamento e navegação
- ✅ Aplicar padrões de design em React

### 🏗️ **Conceitos Fundamentais**
#### **2.1 Componentes Funcionais e Hooks**
```jsx
// Componente funcional básico
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) throw new Error('Usuário não encontrado');
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (userId) {
            fetchUser();
        }
    }, [userId]);
    
    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!user) return <div>Usuário não encontrado</div>;
    
    return (
        <div className="user-profile">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <img src={user.avatar} alt={user.name} />
        </div>
    );
};

export default UserProfile;
```

#### **2.2 Custom Hooks**
```jsx
// Custom hook para gerenciar formulários
import { useState, useCallback } from 'react';

const useForm = (initialValues, validationRules = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    
    const handleChange = useCallback((name, value) => {
        setValues(prev => ({ ...prev, [name]: value }));
        
        // Validação em tempo real
        if (validationRules[name]) {
            const error = validationRules[name](value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    }, [validationRules]);
    
    const handleBlur = useCallback((name) => {
        setTouched(prev => ({ ...prev, [name]: true }));
    }, []);
    
    const handleSubmit = useCallback((onSubmit) => {
        return (e) => {
            e.preventDefault();
            
            // Validar todos os campos
            const newErrors = {};
            Object.keys(validationRules).forEach(field => {
                const error = validationRules[field](values[field]);
                if (error) newErrors[field] = error;
            });
            
            setErrors(newErrors);
            setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
            
            if (Object.keys(newErrors).length === 0) {
                onSubmit(values);
            }
        };
    }, [values, validationRules]);
    
    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    };
};

// Uso do custom hook
const LoginForm = () => {
    const validationRules = {
        email: (value) => {
            if (!value) return 'Email é obrigatório';
            if (!/\S+@\S+\.\S+/.test(value)) return 'Email inválido';
            return null;
        },
        password: (value) => {
            if (!value) return 'Senha é obrigatória';
            if (value.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
            return null;
        }
    };
    
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
        { email: '', password: '' },
        validationRules
    );
    
    const onSubmit = (formValues) => {
        console.log('Dados do formulário:', formValues);
        // Lógica de login
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="Email"
                />
                {touched.email && errors.email && <span>{errors.email}</span>}
            </div>
            
            <div>
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="Senha"
                />
                {touched.password && errors.password && <span>{errors.password}</span>}
            </div>
            
            <button type="submit">Entrar</button>
        </form>
    );
};
```

#### **2.3 Context API e Gerenciamento de Estado**
```jsx
// Context para autenticação
import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: action.payload,
                loading: false
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: null,
                loading: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    });
    
    const login = async (email, password) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) throw new Error('Credenciais inválidas');
            
            const user = await response.json();
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
    };
    
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };
    
    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
```

### 🛠️ **Implementação Prática**
#### **Projeto: Dashboard de E-commerce**
```jsx
// components/ProductCard.jsx
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { addToCart, isInCart } = useCart();
    
    const handleAddToCart = () => {
        addToCart(product);
    };
    
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };
    
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button 
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={toggleFavorite}
                >
                    ❤️
                </button>
            </div>
            
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">R$ {product.price.toFixed(2)}</p>
                <p className="description">{product.description}</p>
                
                <div className="product-actions">
                    <button 
                        className={`add-to-cart ${isInCart(product.id) ? 'in-cart' : ''}`}
                        onClick={handleAddToCart}
                    >
                        {isInCart(product.id) ? 'No Carrinho' : 'Adicionar ao Carrinho'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
```

### 🎯 **Exercícios Práticos**
1. **Básico**: Crie um componente de contador com useState
2. **Intermediário**: Implemente um sistema de busca com debounce
3. **Avançado**: Desenvolva um chat em tempo real

### 📝 **Projeto Final**
Desenvolva uma aplicação de gerenciamento de projetos com:
- Lista de projetos e tarefas
- Sistema de drag-and-drop
- Filtros e busca avançada
- Notificações em tempo real

---
"""
        return content

    def refactor_file(self, part_number):
        """Refatora o arquivo em partes"""
        print(f"🔄 Iniciando refatoração da Parte {part_number}...")
        
        # Criar backup se necessário
        if not self.backup_file.exists():
            self.create_backup()
        
        # Ler conteúdo atual
        if self.target_file.exists():
            with open(self.target_file, 'r', encoding='utf-8') as f:
                current_content = f.read()
        else:
            current_content = ""
        
        # Gerar novo conteúdo baseado na parte
        if part_number == 1:
            new_content = self.part1_introduction_and_history()
        elif part_number == 2:
            new_content = self.part2_javascript_advanced()
        elif part_number == 3:
            new_content = self.part3_react_components()
        else:
            print(f"❌ Parte {part_number} não implementada ainda")
            return False
        
        # Escrever novo conteúdo
        with open(self.target_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Parte {part_number} refatorada com sucesso!")
        return True

    def run_all_parts(self):
        """Executa todas as partes de refatoração"""
        print("🚀 Iniciando refatoração completa do Web Fundamentals...")
        
        parts = [
            ("Introdução e História da Web", 1),
            ("JavaScript Avançado", 2),
            ("React.js e Componentes", 3),
            # Adicionar mais partes conforme necessário
        ]
        
        for part_name, part_number in parts:
            print(f"\n📚 Refatorando: {part_name}")
            success = self.refactor_file(part_number)
            if not success:
                print(f"❌ Falha na refatoração da parte {part_number}")
                return False
        
        print("\n🎉 Refatoração completa finalizada!")
        return True

def main():
    """Função principal"""
    refactor = WebFundamentalsRefactor()
    
    print("🎓 Web Fundamentals Refactor")
    print("=" * 40)
    print("1. Refatorar Parte 1: Introdução e História")
    print("2. Refatorar Parte 2: JavaScript Avançado")
    print("3. Refatorar Parte 3: React.js e Componentes")
    print("4. Refatorar Todas as Partes")
    print("5. Sair")
    
    choice = input("\nEscolha uma opção (1-5): ").strip()
    
    if choice == "1":
        refactor.refactor_file(1)
    elif choice == "2":
        refactor.refactor_file(2)
    elif choice == "3":
        refactor.refactor_file(3)
    elif choice == "4":
        refactor.run_all_parts()
    elif choice == "5":
        print("👋 Até logo!")
    else:
        print("❌ Opção inválida!")

if __name__ == "__main__":
    main()






