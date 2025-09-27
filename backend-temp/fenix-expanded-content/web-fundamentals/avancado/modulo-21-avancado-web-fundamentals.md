# Aula 21: Desenvolvimento de APIs RESTful Avançadas

## 1. Introdução às APIs RESTful Avançadas

### 1.1 Conceitos Fundamentais

APIs RESTful avançadas são interfaces de programação que seguem os princípios REST (Representational State Transfer) com implementações robustas e escaláveis.

**Princípios REST Avançados:**
- **Stateless**: Cada requisição contém toda a informação necessária
- **Cacheable**: Respostas podem ser cacheadas
- **Uniform Interface**: Interface consistente e padronizada
- **Layered System**: Arquitetura em camadas
- **Code on Demand**: Execução de código sob demanda

**Características Avançadas:**
- Autenticação e autorização robustas
- Rate limiting e throttling
- Versionamento de API
- Documentação automática
- Monitoramento e logging
- Tratamento de erros padronizado

### 1.2 Arquitetura de API Avançada

```javascript
// Sistema de API RESTful avançada
class AdvancedRESTAPISystem {
  constructor() {
    this.features = {
      authentication: 'Autenticação robusta',
      authorization: 'Autorização baseada em roles',
      validation: 'Validação de dados',
      caching: 'Sistema de cache',
      monitoring: 'Monitoramento e logging'
    };
  }
  
  // Implementar sistema de API avançada
  implementAdvancedAPI() {
    return {
      apiServer: this.createAPIServer(),
      authentication: this.createAuthentication(),
      authorization: this.createAuthorization()
    };
  }
  
  // Servidor de API
  createAPIServer() {
    return `
      // Servidor de API RESTful avançada
      class AdvancedAPIServer {
        constructor() {
          this.routes = new Map();
          this.middleware = [];
          this.controllers = new Map();
          this.services = new Map();
          this.init();
        }
        
        init() {
          this.setupMiddleware();
          this.setupRoutes();
          this.setupErrorHandling();
          this.setupValidation();
        }
        
        // Configurar middleware
        setupMiddleware() {
          // Middleware de CORS
          this.addMiddleware('cors', this.corsMiddleware.bind(this));
          
          // Middleware de logging
          this.addMiddleware('logging', this.loggingMiddleware.bind(this));
          
          // Middleware de rate limiting
          this.addMiddleware('rateLimit', this.rateLimitMiddleware.bind(this));
          
          // Middleware de autenticação
          this.addMiddleware('auth', this.authMiddleware.bind(this));
          
          // Middleware de autorização
          this.addMiddleware('authorization', this.authorizationMiddleware.bind(this));
        }
        
        // Adicionar middleware
        addMiddleware(name, middleware) {
          this.middleware.push({
            name: name,
            handler: middleware
          });
          
          console.log(\`Middleware adicionado: \${name}\`);
        }
        
        // Middleware de CORS
        corsMiddleware(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
          res.setHeader('Access-Control-Allow-Credentials', 'true');
          
          if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
          }
          
          next();
        }
        
        // Middleware de logging
        loggingMiddleware(req, res, next) {
          const startTime = Date.now();
          
          // Log da requisição
          console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`);
          
          // Interceptar resposta
          const originalSend = res.send;
          res.send = function(data) {
            const duration = Date.now() - startTime;
            console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url} - \${res.statusCode} - \${duration}ms\`);
            originalSend.call(this, data);
          };
          
          next();
        }
        
        // Middleware de rate limiting
        rateLimitMiddleware(req, res, next) {
          const clientIP = req.ip || req.connection.remoteAddress;
          const rateLimitKey = \`rate_limit:\${clientIP}\`;
          
          // Verificar limite de requisições
          const currentRequests = parseInt(localStorage.getItem(rateLimitKey) || '0');
          
          if (currentRequests >= 100) { // 100 requests por minuto
            return res.status(429).json({
              error: 'Rate limit excedido',
              retryAfter: 60
            });
          }
          
          // Incrementar contador
          localStorage.setItem(rateLimitKey, currentRequests + 1);
          
          // Reset após 1 minuto
          setTimeout(() => {
            localStorage.removeItem(rateLimitKey);
          }, 60000);
          
          next();
        }
        
        // Middleware de autenticação
        authMiddleware(req, res, next) {
          const authHeader = req.headers.authorization;
          
          if (!authHeader) {
            return res.status(401).json({
              error: 'Token de autenticação não fornecido'
            });
          }
          
          try {
            const token = authHeader.replace('Bearer ', '');
            const decoded = this.verifyToken(token);
            
            req.user = decoded;
            next();
          } catch (error) {
            return res.status(401).json({
              error: 'Token inválido'
            });
          }
        }
        
        // Middleware de autorização
        authorizationMiddleware(req, res, next) {
          const requiredRole = req.route?.metadata?.requiredRole;
          
          if (!requiredRole) {
            return next();
          }
          
          if (!req.user || !req.user.roles.includes(requiredRole)) {
            return res.status(403).json({
              error: 'Acesso negado'
            });
          }
          
          next();
        }
        
        // Configurar rotas
        setupRoutes() {
          // Rotas de usuário
          this.addRoute('GET', '/api/users', 'getUsers', ['auth']);
          this.addRoute('GET', '/api/users/:id', 'getUser', ['auth']);
          this.addRoute('POST', '/api/users', 'createUser', ['auth', 'admin']);
          this.addRoute('PUT', '/api/users/:id', 'updateUser', ['auth', 'admin']);
          this.addRoute('DELETE', '/api/users/:id', 'deleteUser', ['auth', 'admin']);
          
          // Rotas de produto
          this.addRoute('GET', '/api/products', 'getProducts');
          this.addRoute('GET', '/api/products/:id', 'getProduct');
          this.addRoute('POST', '/api/products', 'createProduct', ['auth', 'admin']);
          this.addRoute('PUT', '/api/products/:id', 'updateProduct', ['auth', 'admin']);
          this.addRoute('DELETE', '/api/products/:id', 'deleteProduct', ['auth', 'admin']);
          
          // Rotas de pedido
          this.addRoute('GET', '/api/orders', 'getOrders', ['auth']);
          this.addRoute('GET', '/api/orders/:id', 'getOrder', ['auth']);
          this.addRoute('POST', '/api/orders', 'createOrder', ['auth']);
          this.addRoute('PUT', '/api/orders/:id', 'updateOrder', ['auth']);
          this.addRoute('DELETE', '/api/orders/:id', 'deleteOrder', ['auth', 'admin']);
        }
        
        // Adicionar rota
        addRoute(method, path, handler, middleware = []) {
          const routeKey = \`\${method}:\${path}\`;
          
          this.routes.set(routeKey, {
            method: method,
            path: path,
            handler: handler,
            middleware: middleware,
            metadata: {
              requiredRole: middleware.includes('admin') ? 'admin' : null
            }
          });
          
          console.log(\`Rota registrada: \${method} \${path}\`);
        }
        
        // Configurar tratamento de erros
        setupErrorHandling() {
          // Tratamento global de erros
          this.handleError = (error, req, res, next) => {
            console.error('Erro na API:', error);
            
            // Erro de validação
            if (error.name === 'ValidationError') {
              return res.status(400).json({
                error: 'Erro de validação',
                details: error.details
              });
            }
            
            // Erro de autenticação
            if (error.name === 'AuthenticationError') {
              return res.status(401).json({
                error: 'Erro de autenticação',
                message: error.message
              });
            }
            
            // Erro de autorização
            if (error.name === 'AuthorizationError') {
              return res.status(403).json({
                error: 'Erro de autorização',
                message: error.message
              });
            }
            
            // Erro interno
            return res.status(500).json({
              error: 'Erro interno do servidor',
              message: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno'
            });
          };
        }
        
        // Configurar validação
        setupValidation() {
          // Validador de dados
          this.validate = (schema, data) => {
            const { error, value } = schema.validate(data);
            
            if (error) {
              throw new Error(\`Erro de validação: \${error.details[0].message}\`);
            }
            
            return value;
          };
          
          // Schemas de validação
          this.schemas = {
            user: {
              name: Joi.string().min(2).max(100).required(),
              email: Joi.string().email().required(),
              password: Joi.string().min(6).required(),
              roles: Joi.array().items(Joi.string()).default(['user'])
            },
            product: {
              name: Joi.string().min(2).max(200).required(),
              description: Joi.string().min(10).max(1000),
              price: Joi.number().positive().required(),
              category: Joi.string().required(),
              stock: Joi.number().integer().min(0).default(0)
            },
            order: {
              userId: Joi.string().required(),
              products: Joi.array().items(Joi.object({
                productId: Joi.string().required(),
                quantity: Joi.number().integer().min(1).required()
              })).min(1).required(),
              shippingAddress: Joi.object({
                street: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                zipCode: Joi.string().required()
              }).required()
            }
          };
        }
        
        // Verificar token
        verifyToken(token) {
          try {
            return jwt.verify(token, process.env.JWT_SECRET);
          } catch (error) {
            throw new Error('Token inválido');
          }
        }
        
        // Processar requisição
        async processRequest(req, res) {
          try {
            // Executar middleware
            await this.executeMiddleware(req, res);
            
            // Encontrar rota
            const route = this.findRoute(req.method, req.url);
            
            if (!route) {
              return res.status(404).json({
                error: 'Rota não encontrada'
              });
            }
            
            // Executar rota
            await this.executeRoute(route, req, res);
            
          } catch (error) {
            this.handleError(error, req, res);
          }
        }
        
        // Executar middleware
        async executeMiddleware(req, res) {
          for (const middleware of this.middleware) {
            await new Promise((resolve, reject) => {
              middleware.handler(req, res, (error) => {
                if (error) reject(error);
                else resolve();
              });
            });
          }
        }
        
        // Encontrar rota
        findRoute(method, url) {
          const routeKey = \`\${method}:\${url}\`;
          return this.routes.get(routeKey);
        }
        
        // Executar rota
        async executeRoute(route, req, res) {
          const controller = this.controllers.get(route.handler);
          
          if (!controller) {
            throw new Error(\`Controller não encontrado: \${route.handler}\`);
          }
          
          // Validar dados se necessário
          if (req.body && this.schemas[route.handler]) {
            req.body = this.validate(this.schemas[route.handler], req.body);
          }
          
          // Executar controller
          await controller(req, res);
        }
      }
      
      // Inicializar servidor de API
      const apiServer = new AdvancedAPIServer();
    `;
  }
  
  // Sistema de autenticação
  createAuthentication() {
    return `
      // Sistema de autenticação avançada
      class AdvancedAuthentication {
        constructor() {
          this.strategies = new Map();
          this.sessions = new Map();
          this.init();
        }
        
        init() {
          this.setupJWTStrategy();
          this.setupSessionStrategy();
          this.setupOAuthStrategy();
        }
        
        // Configurar estratégia JWT
        setupJWTStrategy() {
          this.strategies.set('jwt', {
            name: 'JWT',
            authenticate: this.authenticateJWT.bind(this),
            generateToken: this.generateJWT.bind(this),
            verifyToken: this.verifyJWT.bind(this)
          });
        }
        
        // Configurar estratégia de sessão
        setupSessionStrategy() {
          this.strategies.set('session', {
            name: 'Session',
            authenticate: this.authenticateSession.bind(this),
            createSession: this.createSession.bind(this),
            destroySession: this.destroySession.bind(this)
          });
        }
        
        // Configurar estratégia OAuth
        setupOAuthStrategy() {
          this.strategies.set('oauth', {
            name: 'OAuth',
            authenticate: this.authenticateOAuth.bind(this),
            authorize: this.authorizeOAuth.bind(this),
            callback: this.handleOAuthCallback.bind(this)
          });
        }
        
        // Autenticar com JWT
        async authenticateJWT(credentials) {
          try {
            const { email, password } = credentials;
            
            // Verificar credenciais
            const user = await this.verifyCredentials(email, password);
            
            if (!user) {
              throw new Error('Credenciais inválidas');
            }
            
            // Gerar token
            const token = this.generateJWT(user);
            
            return {
              success: true,
              token: token,
              user: {
                id: user.id,
                email: user.email,
                roles: user.roles
              }
            };
          } catch (error) {
            return {
              success: false,
              error: error.message
            };
          }
        }
        
        // Gerar JWT
        generateJWT(user) {
          const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 horas
          };
          
          return jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: 'HS256'
          });
        }
        
        // Verificar JWT
        verifyJWT(token) {
          try {
            return jwt.verify(token, process.env.JWT_SECRET);
          } catch (error) {
            throw new Error('Token inválido');
          }
        }
        
        // Autenticar com sessão
        async authenticateSession(credentials) {
          try {
            const { email, password } = credentials;
            
            // Verificar credenciais
            const user = await this.verifyCredentials(email, password);
            
            if (!user) {
              throw new Error('Credenciais inválidas');
            }
            
            // Criar sessão
            const session = this.createSession(user);
            
            return {
              success: true,
              sessionId: session.id,
              user: {
                id: user.id,
                email: user.email,
                roles: user.roles
              }
            };
          } catch (error) {
            return {
              success: false,
              error: error.message
            };
          }
        }
        
        // Criar sessão
        createSession(user) {
          const sessionId = this.generateSessionId();
          
          const session = {
            id: sessionId,
            userId: user.id,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + (60 * 60 * 1000)), // 1 hora
            data: {
              userAgent: navigator.userAgent,
              ip: '127.0.0.1'
            }
          };
          
          this.sessions.set(sessionId, session);
          
          return session;
        }
        
        // Destruir sessão
        destroySession(sessionId) {
          return this.sessions.delete(sessionId);
        }
        
        // Autenticar com OAuth
        async authenticateOAuth(provider) {
          try {
            const authUrl = this.getOAuthURL(provider);
            
            return {
              success: true,
              authUrl: authUrl
            };
          } catch (error) {
            return {
              success: false,
              error: error.message
            };
          }
        }
        
        // Obter URL OAuth
        getOAuthURL(provider) {
          const config = {
            google: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              redirectUri: process.env.GOOGLE_REDIRECT_URI,
              scope: 'email profile'
            },
            facebook: {
              clientId: process.env.FACEBOOK_CLIENT_ID,
              redirectUri: process.env.FACEBOOK_REDIRECT_URI,
              scope: 'email public_profile'
            }
          };
          
          const providerConfig = config[provider];
          
          if (!providerConfig) {
            throw new Error(\`Provedor OAuth não suportado: \${provider}\`);
          }
          
          const baseUrl = this.getOAuthBaseURL(provider);
          const params = new URLSearchParams({
            client_id: providerConfig.clientId,
            redirect_uri: providerConfig.redirectUri,
            scope: providerConfig.scope,
            response_type: 'code',
            state: this.generateState()
          });
          
          return \`\${baseUrl}?\${params.toString()}\`;
        }
        
        // Obter URL base OAuth
        getOAuthBaseURL(provider) {
          const urls = {
            google: 'https://accounts.google.com/o/oauth2/v2/auth',
            facebook: 'https://www.facebook.com/v12.0/dialog/oauth'
          };
          
          return urls[provider];
        }
        
        // Gerar estado OAuth
        generateState() {
          return Math.random().toString(36).substring(2, 15);
        }
        
        // Verificar credenciais
        async verifyCredentials(email, password) {
          // Simular verificação no banco
          const users = [
            {
              id: '1',
              email: 'admin@example.com',
              password: 'admin123',
              roles: ['admin', 'user']
            },
            {
              id: '2',
              email: 'user@example.com',
              password: 'user123',
              roles: ['user']
            }
          ];
          
          const user = users.find(u => u.email === email && u.password === password);
          
          if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
          
          return null;
        }
        
        // Gerar ID de sessão
        generateSessionId() {
          return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        // Obter estratégia
        getStrategy(name) {
          return this.strategies.get(name);
        }
        
        // Obter todas as estratégias
        getAllStrategies() {
          return Array.from(this.strategies.values());
        }
      }
      
      // Inicializar autenticação
      const authentication = new AdvancedAuthentication();
    `;
  }
}

## 2. Sistema de Autorização

### 2.1 Controle de Acesso Baseado em Roles (RBAC)

```javascript
// Sistema de autorização avançada
class AdvancedAuthorizationSystem {
  constructor() {
    this.roles = new Map();
    this.permissions = new Map();
    this.policies = new Map();
    this.init();
  }
  
  // Inicializar sistema
  init() {
    this.setupRoles();
    this.setupPermissions();
    this.setupPolicies();
  }
  
  // Configurar roles
  setupRoles() {
    // Role de usuário
    this.roles.set('user', {
      name: 'Usuário',
      description: 'Usuário padrão do sistema',
      permissions: ['read:own_profile', 'update:own_profile', 'create:orders']
    });
    
    // Role de admin
    this.roles.set('admin', {
      name: 'Administrador',
      description: 'Administrador do sistema',
      permissions: ['*'] // Todas as permissões
    });
    
    // Role de moderador
    this.roles.set('moderator', {
      name: 'Moderador',
      description: 'Moderador de conteúdo',
      permissions: ['read:all_profiles', 'update:all_profiles', 'delete:content']
    });
    
    // Role de vendedor
    this.roles.set('seller', {
      name: 'Vendedor',
      description: 'Vendedor de produtos',
      permissions: ['read:own_products', 'create:products', 'update:own_products', 'delete:own_products']
    });
  }
  
  // Configurar permissões
  setupPermissions() {
    // Permissões de usuário
    this.permissions.set('read:own_profile', {
      name: 'Ler próprio perfil',
      description: 'Permite ler o próprio perfil do usuário',
      resource: 'profile',
      action: 'read',
      scope: 'own'
    });
    
    this.permissions.set('update:own_profile', {
      name: 'Atualizar próprio perfil',
      description: 'Permite atualizar o próprio perfil do usuário',
      resource: 'profile',
      action: 'update',
      scope: 'own'
    });
    
    // Permissões de produto
    this.permissions.set('read:all_products', {
      name: 'Ler todos os produtos',
      description: 'Permite ler todos os produtos do sistema',
      resource: 'product',
      action: 'read',
      scope: 'all'
    });
    
    this.permissions.set('create:products', {
      name: 'Criar produtos',
      description: 'Permite criar novos produtos',
      resource: 'product',
      action: 'create',
      scope: 'all'
    });
    
    // Permissões de pedido
    this.permissions.set('read:own_orders', {
      name: 'Ler próprios pedidos',
      description: 'Permite ler os próprios pedidos do usuário',
      resource: 'order',
      action: 'read',
      scope: 'own'
    });
    
    this.permissions.set('create:orders', {
      name: 'Criar pedidos',
      description: 'Permite criar novos pedidos',
      resource: 'order',
      action: 'create',
      scope: 'own'
    });
  }
  
  // Configurar políticas
  setupPolicies() {
    // Política de acesso a perfil
    this.policies.set('profile_access', {
      name: 'Acesso a Perfil',
      description: 'Controla o acesso aos perfis de usuário',
      rules: [
        {
          condition: 'user.id === resource.userId',
          permission: 'read:own_profile',
          allow: true
        },
        {
          condition: 'user.roles.includes("admin")',
          permission: 'read:all_profiles',
          allow: true
        },
        {
          condition: 'user.roles.includes("moderator")',
          permission: 'read:all_profiles',
          allow: true
        }
      ]
    });
    
    // Política de acesso a produtos
    this.policies.set('product_access', {
      name: 'Acesso a Produtos',
      description: 'Controla o acesso aos produtos',
      rules: [
        {
          condition: 'true',
          permission: 'read:all_products',
          allow: true
        },
        {
          condition: 'user.roles.includes("admin")',
          permission: 'create:products',
          allow: true
        },
        {
          condition: 'user.roles.includes("seller")',
          permission: 'create:products',
          allow: true
        }
      ]
    });
  }
  
  // Verificar permissão
  checkPermission(user, permission, resource = null) {
    // Verificar se usuário tem a permissão
    const hasPermission = this.userHasPermission(user, permission);
    
    if (!hasPermission) {
      return false;
    }
    
    // Verificar políticas
    const policy = this.findPolicy(permission);
    
    if (policy) {
      return this.evaluatePolicy(policy, user, resource);
    }
    
    return true;
  }
  
  // Verificar se usuário tem permissão
  userHasPermission(user, permission) {
    if (!user || !user.roles) {
      return false;
    }
    
    // Verificar se usuário tem role admin (todas as permissões)
    if (user.roles.includes('admin')) {
      return true;
    }
    
    // Verificar permissões específicas
    for (const role of user.roles) {
      const roleData = this.roles.get(role);
      
      if (roleData && roleData.permissions.includes(permission)) {
        return true;
      }
    }
    
    return false;
  }
  
  // Encontrar política
  findPolicy(permission) {
    for (const [key, policy] of this.policies) {
      const hasPermission = policy.rules.some(rule => rule.permission === permission);
      
      if (hasPermission) {
        return policy;
      }
    }
    
    return null;
  }
  
  // Avaliar política
  evaluatePolicy(policy, user, resource) {
    for (const rule of policy.rules) {
      if (this.evaluateCondition(rule.condition, user, resource)) {
        return rule.allow;
      }
    }
    
    return false;
  }
  
  // Avaliar condição
  evaluateCondition(condition, user, resource) {
    try {
      // Substituir variáveis na condição
      const evaluatedCondition = condition
        .replace('user.id', \`"\${user.id}"\`)
        .replace('resource.userId', \`"\${resource?.userId || ''}"\`)
        .replace('user.roles.includes("admin")', user.roles.includes('admin'))
        .replace('user.roles.includes("moderator")', user.roles.includes('moderator'))
        .replace('user.roles.includes("seller")', user.roles.includes('seller'));
      
      return eval(evaluatedCondition);
    } catch (error) {
      console.error('Erro ao avaliar condição:', error);
      return false;
    }
  }
  
  // Adicionar role
  addRole(name, data) {
    this.roles.set(name, data);
  }
  
  // Adicionar permissão
  addPermission(name, data) {
    this.permissions.set(name, data);
  }
  
  // Adicionar política
  addPolicy(name, data) {
    this.policies.set(name, data);
  }
  
  // Obter role
  getRole(name) {
    return this.roles.get(name);
  }
  
  // Obter permissão
  getPermission(name) {
    return this.permissions.get(name);
  }
  
  // Obter política
  getPolicy(name) {
    return this.policies.get(name);
  }
  
  // Obter todas as roles
  getAllRoles() {
    return Array.from(this.roles.values());
  }
  
  // Obter todas as permissões
  getAllPermissions() {
    return Array.from(this.permissions.values());
  }
  
  // Obter todas as políticas
  getAllPolicies() {
    return Array.from(this.policies.values());
  }
}

// Inicializar sistema de autorização
const authorization = new AdvancedAuthorizationSystem();
```

## 3. Estudo de Caso Brasileiro: Stone Pagamentos

### 3.1 API de Pagamentos da Stone

A Stone Pagamentos utiliza uma API robusta para processar pagamentos e transações.

```javascript
// Sistema de API inspirado na Stone
class StonePaymentAPISystem {
  constructor() {
    this.features = {
      payment: 'Processamento de pagamentos',
      webhook: 'Sistema de webhooks',
      reconciliation: 'Conciliação bancária',
      fraud: 'Detecção de fraude'
    };
  }
  
  // Implementar sistema da Stone
  implementStonePaymentAPI() {
    return {
      paymentProcessor: this.createPaymentProcessor(),
      webhookSystem: this.createWebhookSystem(),
      reconciliationSystem: this.createReconciliationSystem()
    };
  }
  
  // Processador de pagamentos
  createPaymentProcessor() {
    return `
      // Processador de pagamentos da Stone
      class StonePaymentProcessor {
        constructor() {
          this.paymentMethods = {
            credit: 'Cartão de crédito',
            debit: 'Cartão de débito',
            pix: 'PIX',
            boleto: 'Boleto bancário'
          };
          this.init();
        }
        
        init() {
          this.setupPaymentMethods();
          this.setupValidation();
          this.setupFraudDetection();
        }
        
        // Configurar métodos de pagamento
        setupPaymentMethods() {
          // Processar pagamento com cartão
          this.processCardPayment = async (paymentData) => {
            try {
              // Validar dados do pagamento
              const validation = this.validatePaymentData(paymentData);
              if (!validation.valid) {
                throw new Error(validation.errors.join(', '));
              }
              
              // Detectar fraude
              const fraudCheck = await this.checkFraud(paymentData);
              if (fraudCheck.risk === 'high') {
                throw new Error('Pagamento bloqueado por risco de fraude');
              }
              
              // Processar com gateway
              const result = await this.processWithGateway(paymentData);
              
              // Salvar transação
              const transaction = await this.saveTransaction(result);
              
              // Notificar webhooks
              await this.notifyWebhooks('payment.processed', transaction);
              
              return transaction;
            } catch (error) {
              console.error('Erro ao processar pagamento:', error);
              
              // Notificar falha
              await this.notifyWebhooks('payment.failed', {
                paymentData: paymentData,
                error: error.message
              });
              
              throw error;
            }
          };
          
          // Processar PIX
          this.processPixPayment = async (paymentData) => {
            try {
              // Gerar QR Code PIX
              const pixData = await this.generatePixQRCode(paymentData);
              
              // Salvar transação PIX
              const transaction = await this.savePixTransaction(pixData);
              
              // Notificar criação do PIX
              await this.notifyWebhooks('pix.created', transaction);
              
              return transaction;
            } catch (error) {
              console.error('Erro ao processar PIX:', error);
              throw error;
            }
          };
        }
        
        // Configurar validação
        setupValidation() {
          // Validar dados do pagamento
          this.validatePaymentData = (paymentData) => {
            const errors = [];
            
            if (!paymentData.amount || paymentData.amount <= 0) {
              errors.push('Valor inválido');
            }
            
            if (!paymentData.currency) {
              errors.push('Moeda não especificada');
            }
            
            if (paymentData.method === 'credit' || paymentData.method === 'debit') {
              if (!paymentData.cardNumber) {
                errors.push('Número do cartão não especificado');
              }
              
              if (!paymentData.expiryMonth || !paymentData.expiryYear) {
                errors.push('Data de expiração inválida');
              }
              
              if (!paymentData.cvv) {
                errors.push('CVV não especificado');
              }
            }
            
            if (paymentData.method === 'pix') {
              if (!paymentData.payerDocument) {
                errors.push('CPF/CNPJ do pagador não especificado');
              }
            }
            
            return {
              valid: errors.length === 0,
              errors: errors
            };
          };
        }
        
        // Configurar detecção de fraude
        setupFraudDetection() {
          // Verificar fraude
          this.checkFraud = async (paymentData) => {
            const riskFactors = [];
            
            // Verificar valor suspeito
            if (paymentData.amount > 10000) {
              riskFactors.push('valor_alto');
            }
            
            // Verificar horário suspeito
            const hour = new Date().getHours();
            if (hour < 6 || hour > 23) {
              riskFactors.push('horario_suspeito');
            }
            
            // Verificar localização
            if (paymentData.ip && this.isSuspiciousIP(paymentData.ip)) {
              riskFactors.push('ip_suspeito');
            }
            
            // Calcular risco
            const riskScore = riskFactors.length * 25;
            let risk = 'low';
            
            if (riskScore > 50) {
              risk = 'high';
            } else if (riskScore > 25) {
              risk = 'medium';
            }
            
            return {
              risk: risk,
              score: riskScore,
              factors: riskFactors
            };
          };
          
          // Verificar IP suspeito
          this.isSuspiciousIP = (ip) => {
            // Simular verificação de IP suspeito
            const suspiciousIPs = [
              '192.168.1.1',
              '10.0.0.1',
              '172.16.0.1'
            ];
            
            return suspiciousIPs.includes(ip);
          };
        }
        
        // Processar com gateway
        async processWithGateway(paymentData) {
          // Simular processamento com gateway
          const gatewayResponse = await fetch('https://api.gateway.stone.com.br/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.getGatewayToken()
            },
            body: JSON.stringify(paymentData)
          });
          
          if (!gatewayResponse.ok) {
            throw new Error('Erro no gateway de pagamento');
          }
          
          return await gatewayResponse.json();
        }
        
        // Gerar QR Code PIX
        async generatePixQRCode(paymentData) {
          // Simular geração de PIX
          const pixData = {
            qrCode: '00020126580014br.gov.bcb.pix0136' + Math.random().toString(36).substr(2, 20),
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
            amount: paymentData.amount,
            payerDocument: paymentData.payerDocument
          };
          
          return pixData;
        }
        
        // Salvar transação
        async saveTransaction(result) {
          const transaction = {
            id: 'txn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            amount: result.amount,
            currency: result.currency,
            status: result.status,
            method: result.method,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          // Simular salvamento no banco
          localStorage.setItem(\`transaction_\${transaction.id}\`, JSON.stringify(transaction));
          
          return transaction;
        }
        
        // Salvar transação PIX
        async savePixTransaction(pixData) {
          const transaction = {
            id: 'pix_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            amount: pixData.amount,
            currency: 'BRL',
            status: 'pending',
            method: 'pix',
            pixData: pixData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          // Simular salvamento no banco
          localStorage.setItem(\`transaction_\${transaction.id}\`, JSON.stringify(transaction));
          
          return transaction;
        }
        
        // Notificar webhooks
        async notifyWebhooks(event, data) {
          // Simular notificação de webhooks
          console.log(\`Webhook \${event}:\`, data);
        }
        
        // Obter token do gateway
        getGatewayToken() {
          // Simular token de autenticação
          return 'stone_gateway_token_' + Date.now();
        }
      }
      
      // Inicializar processador de pagamentos
      const stonePaymentProcessor = new StonePaymentProcessor();
    `;
  }
}
```

## 4. Exercícios Práticos

### 4.1 Exercício 1: Implementar Sistema de Autenticação

Implemente um sistema que:
- Use JWT para autenticação
- Implemente refresh tokens
- Suporte múltiplas estratégias

### 4.2 Exercício 2: Criar Sistema de Autorização

Crie um sistema que:
- Implemente RBAC
- Defina políticas de acesso
- Valide permissões em tempo real

### 4.3 Exercício 3: Desenvolver API de Pagamentos

Implemente uma API que:
- Processe diferentes métodos de pagamento
- Implemente detecção de fraude
- Use webhooks para notificações

## 5. Conclusão

Esta aula estabeleceu os fundamentos para desenvolvimento de APIs RESTful avançadas, abordando:

1. **Introdução às APIs RESTful**: Conceitos e princípios
2. **Arquitetura de API Avançada**: Middleware e validação
3. **Sistema de Autenticação**: JWT, sessões e OAuth
4. **Sistema de Autorização**: RBAC e políticas
5. **Estudo de Caso Brasileiro**: Stone Pagamentos como referência
6. **Exercícios Práticos**: Implementações hands-on

Os conceitos apresentados fornecem uma base sólida para implementar APIs robustas e escaláveis, essenciais para aplicações web modernas.

**🎉 PARABÉNS! Você completou a Aula 21: Desenvolvimento de APIs RESTful Avançadas!**












