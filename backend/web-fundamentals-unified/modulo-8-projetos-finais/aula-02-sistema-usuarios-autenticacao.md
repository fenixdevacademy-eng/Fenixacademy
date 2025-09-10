# Aula 2: Sistema de Usuários e Autenticação

## Objetivos da Aula
- Implementar sistema completo de autenticação
- Gerenciar perfis de usuários e permissões
- Integrar autenticação social (Google, Facebook)
- Implementar recuperação de senha e verificação de email

## Estrutura do Sistema

### 1. Modelo de Usuário
```typescript
// src/types/User.ts
interface User {
  id: string;
  email: string;
  password: string; // hash
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  isVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}
```

### 2. Autenticação com JWT
```typescript
// src/services/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
  private static readonly JWT_EXPIRES_IN = '7d';

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(user: User): string {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, this.JWT_SECRET);
  }

  static async register(userData: RegisterData): Promise<{ user: User; token: string }> {
    const { email, password, name } = userData;
    
    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    // Hash da senha
    const hashedPassword = await this.hashPassword(password);
    
    // Criar usuário
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role: 'user',
      isVerified: false,
      preferences: {
        theme: 'light',
        language: 'pt-BR',
        notifications: {
          email: true,
          push: false,
          sms: false
        }
      }
    });

    await user.save();

    // Gerar token
    const token = this.generateToken(user);

    // Enviar email de verificação
    await this.sendVerificationEmail(user);

    return { user, token };
  }

  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isValidPassword = await this.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas');
    }

    // Atualizar último login
    user.lastLogin = new Date();
    await user.save();

    const token = this.generateToken(user);
    return { user, token };
  }
}
```

### 3. Middleware de Autenticação
```typescript
// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  try {
    const decoded = AuthService.verifyToken(token);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permissão insuficiente' });
    }

    next();
  };
};
```

## Frontend - Componentes de Autenticação

### 1. Context de Autenticação
```typescript
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar token salvo no localStorage
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Verificar se token ainda é válido
      verifyToken(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token inválido, remover
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const { user, token } = await response.json();
      
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const { user, token } = await response.json();
      
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
```

### 2. Componente de Login
```typescript
// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Entrar</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" disabled={isLoading} className="login-btn">
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
      
      <div className="form-links">
        <a href="/forgot-password">Esqueceu a senha?</a>
        <a href="/register">Criar conta</a>
      </div>
    </form>
  );
};
```

### 3. Componente de Registro
```typescript
// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Criar Conta</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
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
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      
      <button type="submit" disabled={isLoading} className="register-btn">
        {isLoading ? 'Criando conta...' : 'Criar Conta'}
      </button>
      
      <div className="form-links">
        <a href="/login">Já tem uma conta? Entrar</a>
      </div>
    </form>
  );
};
```

## Autenticação Social

### 1. Google OAuth
```typescript
// src/services/googleAuth.ts
import { OAuth2Client } from 'google-auth-library';

export class GoogleAuthService {
  private static client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  static async verifyToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      
      const payload = ticket.getPayload();
      return {
        id: payload?.sub,
        email: payload?.email,
        name: payload?.name,
        picture: payload?.picture
      };
    } catch (error) {
      throw new Error('Token do Google inválido');
    }
  }

  static async authenticateWithGoogle(googleToken: string) {
    const googleUser = await this.verifyToken(googleToken);
    
    // Verificar se usuário já existe
    let user = await User.findOne({ email: googleUser.email });
    
    if (!user) {
      // Criar novo usuário
      user = new User({
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.picture,
        role: 'user',
        isVerified: true, // Google já verifica o email
        preferences: {
          theme: 'light',
          language: 'pt-BR',
          notifications: {
            email: true,
            push: false,
            sms: false
          }
        }
      });
      
      await user.save();
    } else {
      // Atualizar último login
      user.lastLogin = new Date();
      await user.save();
    }

    const token = AuthService.generateToken(user);
    return { user, token };
  }
}
```

### 2. Componente de Login Social
```typescript
// src/components/SocialLogin.tsx
import React from 'react';

const SocialLogin: React.FC = () => {
  const handleGoogleLogin = async () => {
    try {
      // Integrar com Google OAuth
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: 'google-token' })
      });

      if (response.ok) {
        const { user, token } = await response.json();
        // Atualizar contexto de autenticação
      }
    } catch (error) {
      console.error('Erro no login do Google:', error);
    }
  };

  return (
    <div className="social-login">
      <button onClick={handleGoogleLogin} className="google-btn">
        <img src="/icons/google.svg" alt="Google" />
        Continuar com Google
      </button>
      
      <button className="facebook-btn">
        <img src="/icons/facebook.svg" alt="Facebook" />
        Continuar com Facebook
      </button>
    </div>
  );
};
```

## Recuperação de Senha

### 1. Serviço de Email
```typescript
// src/services/emailService.ts
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export class EmailService {
  private static transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  static async sendPasswordResetEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Gerar token de reset
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hora

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Recuperação de Senha',
      html: `
        <h2>Recuperação de Senha</h2>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetUrl}">Redefinir Senha</a>
        <p>Este link expira em 1 hora.</p>
      `
    });
  }

  static async sendVerificationEmail(user: User) {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    await user.save();

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: 'Verificação de Email',
      html: `
        <h2>Verifique seu email</h2>
        <p>Clique no link abaixo para verificar sua conta:</p>
        <a href="${verificationUrl}">Verificar Email</a>
      `
    });
  }
}
```

### 2. API de Recuperação
```typescript
// routes/auth.ts
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    await EmailService.sendPasswordResetEmail(email);
    
    res.json({ message: 'Email de recuperação enviado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido ou expirado' });
    }

    user.password = await AuthService.hashPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

## Gerenciamento de Perfil

### 1. Componente de Perfil
```typescript
// src/components/UserProfile.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        // Atualizar contexto
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img 
          src={user?.avatar || '/default-avatar.png'} 
          alt="Avatar" 
          className="profile-avatar"
        />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdateProfile} className="profile-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-actions">
          <button onClick={() => setIsEditing(true)}>
            Editar Perfil
          </button>
          <button onClick={() => {/* Abrir modal de mudança de senha */}}>
            Alterar Senha
          </button>
        </div>
      )}
    </div>
  );
};
```

## Testes

### 1. Testes de Autenticação
```typescript
// tests/auth.test.ts
import request from 'supertest';
import app from '../app';

describe('Authentication', () => {
  test('should register a new user', async () => {
    const userData = {
      name: 'João Silva',
      email: 'joao@test.com',
      password: '123456'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(userData.email);
  });

  test('should login with valid credentials', async () => {
    const credentials = {
      email: 'joao@test.com',
      password: '123456'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials)
      .expect(200);

    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  test('should reject invalid credentials', async () => {
    const credentials = {
      email: 'joao@test.com',
      password: 'wrongpassword'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials)
      .expect(401);

    expect(response.body.error).toBe('Credenciais inválidas');
  });
});
```

## Exercícios Práticos

### 1. Implementar 2FA
- Adicionar autenticação de dois fatores
- Integrar com Google Authenticator
- Códigos de backup

### 2. Sistema de Permissões
- Roles e permissões granulares
- Middleware de autorização
- Interface de gerenciamento

### 3. Sessões e Segurança
- Gerenciamento de sessões ativas
- Logout de todos os dispositivos
- Detecção de login suspeito

## Próximos Passos

1. **Aula 3**: Dashboard Administrativo
2. **Aula 4**: Integração com APIs de Pagamento
3. **Aula 5**: Sistema de Notificações
4. **Aula 6**: Analytics e Relatórios

## Recursos Adicionais

- [JWT.io](https://jwt.io/)
- [Passport.js](http://www.passportjs.org/)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [Nodemailer](https://nodemailer.com/)

---

**Tempo estimado**: 4-5 horas
**Dificuldade**: Avançado
**Pré-requisitos**: Aula 1 do Módulo 8







