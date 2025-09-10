# Aula 2: Autenticação e Autorização

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Entender os conceitos de autenticação e autorização
- Implementar autenticação JWT (JSON Web Tokens)
- Configurar OAuth 2.0 para login social
- Gerenciar sessões de usuário
- Implementar middleware de autenticação
- Criar um sistema de login completo

## 📚 Conteúdo da Aula

### 1. Conceitos Fundamentais

#### Autenticação vs Autorização
- **Autenticação**: Verificar quem é o usuário
- **Autorização**: Verificar o que o usuário pode fazer

```javascript
// Exemplo conceitual
const authenticate = (credentials) => {
    // Verifica se o usuário é quem diz ser
    return validateUser(credentials);
};

const authorize = (user, resource) => {
    // Verifica se o usuário tem permissão para acessar o recurso
    return checkPermissions(user, resource);
};
```

### 2. JSON Web Tokens (JWT)

#### Estrutura do JWT
```
header.payload.signature
```

```javascript
// Exemplo de JWT
const jwt = require('jsonwebtoken');

// Criar token
const createToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};

// Verificar token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Token inválido');
    }
};
```

#### Implementação Prática

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token de acesso requerido' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
```

### 3. OAuth 2.0

#### Fluxo de Autorização
1. **Authorization Code**: Para aplicações web
2. **Implicit**: Para SPAs (Single Page Applications)
3. **Client Credentials**: Para APIs
4. **Resource Owner Password**: Para aplicações confiáveis

```javascript
// Exemplo com Google OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
            user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            });
        }
        
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));
```

### 4. Gerenciamento de Sessões

#### Sessões com Express-Session

```javascript
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));
```

#### Middleware de Autenticação

```javascript
// middleware/sessionAuth.js
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Usuário não autenticado' });
    }
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (req.session.userRole === role) {
            next();
        } else {
            res.status(403).json({ error: 'Acesso negado' });
        }
    };
};

module.exports = { requireAuth, requireRole };
```

### 5. Implementação Completa

#### Modelo de Usuário

```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId;
        }
    },
    googleId: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### Rotas de Autenticação

```javascript
// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Verificar se usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        
        // Criar usuário
        const user = new User({ name, email, password });
        await user.save();
        
        // Gerar token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuário
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        // Verificar senha
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        // Gerar token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Perfil do usuário
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Logout (para JWT, apenas remover do cliente)
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;
```

### 6. Frontend - Gerenciamento de Estado

#### Context de Autenticação

```javascript
// context/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null
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

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token'),
        loading: true
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Verificar se o token ainda é válido
            fetch('/api/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Token inválido');
            })
            .then(user => {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user, token }
                });
            })
            .catch(() => {
                localStorage.removeItem('token');
                dispatch({ type: 'LOGOUT' });
            })
            .finally(() => {
                dispatch({ type: 'SET_LOADING', payload: false });
            });
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user: data.user, token: data.token }
                });
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: 'Erro de conexão' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
};
```

#### Componente de Login

```javascript
// components/LoginForm.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(formData.email, formData.password);
        
        if (!result.success) {
            setError(result.error);
        }
        
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    );
};

export default LoginForm;
```

### 7. Segurança Avançada

#### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 tentativas
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/auth/login', loginLimiter);
```

#### Validação de Entrada

```javascript
const { body, validationResult } = require('express-validator');

const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Senha deve ter pelo menos 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
```

### 8. Projeto Prático

#### Sistema de Login Completo

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const { authenticateToken } = require('./middleware/auth');

const app = express();

// Middleware de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);

// Rota protegida de exemplo
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({
        message: 'Esta é uma rota protegida',
        user: req.user
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

## 🎯 Exercícios Práticos

### Exercício 1: Implementar JWT
Crie um sistema de autenticação JWT com:
- Registro de usuário
- Login
- Middleware de autenticação
- Rota protegida

### Exercício 2: OAuth com Google
Implemente login com Google usando Passport.js:
- Configurar Google OAuth
- Criar estratégia de autenticação
- Implementar callback de retorno

### Exercício 3: Sistema de Permissões
Crie um sistema de roles e permissões:
- Usuário comum
- Administrador
- Middleware de autorização
- Rotas com diferentes níveis de acesso

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Conceitos fundamentais** de autenticação e autorização
2. **JWT** para autenticação stateless
3. **OAuth 2.0** para login social
4. **Gerenciamento de sessões** com Express
5. **Middleware de segurança** e validação
6. **Implementação completa** de um sistema de login
7. **Frontend** com Context API para gerenciamento de estado
8. **Segurança avançada** com rate limiting e validação

## 🚀 Próxima Aula

Na próxima aula, vamos explorar **APIs REST Avançadas**, incluindo:
- Design de APIs RESTful
- Versionamento de APIs
- Documentação com Swagger
- Testes de APIs
- Otimização e cache

## 📚 Recursos Adicionais

- [JWT.io](https://jwt.io/) - Debugger de JWT
- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749)
- [Passport.js](http://www.passportjs.org/) - Estratégias de autenticação
- [Express-Session](https://github.com/expressjs/session) - Gerenciamento de sessões
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Hash de senhas







