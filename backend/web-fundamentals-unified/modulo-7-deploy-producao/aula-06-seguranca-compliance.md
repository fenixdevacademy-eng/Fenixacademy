# Aula 6: Segurança e Compliance

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Implementar medidas de segurança em produção
- Configurar autenticação e autorização robustas
- Implementar criptografia e proteção de dados
- Configurar firewalls e proteção de rede
- Implementar compliance e auditoria
- Gerenciar vulnerabilidades e patches

## 📚 Conteúdo da Aula

### 1. Introdução à Segurança em Produção

#### Princípios de Segurança
- **Confidencialidade**: Dados acessíveis apenas a autorizados
- **Integridade**: Dados não modificados indevidamente
- **Disponibilidade**: Serviços acessíveis quando necessário
- **Autenticidade**: Verificação da identidade
- **Não-repúdio**: Impossibilidade de negar ações

#### Ameaças Comuns

| Ameaça | Descrição | Impacto |
|--------|-----------|---------|
| **DDoS** | Ataque de negação de serviço | Indisponibilidade |
| **SQL Injection** | Injeção de código SQL | Vazamento de dados |
| **XSS** | Cross-site scripting | Roubo de sessão |
| **CSRF** | Cross-site request forgery | Ações não autorizadas |
| **Ransomware** | Criptografia de dados | Perda de dados |
| **Phishing** | Engenharia social | Credenciais comprometidas |

### 2. Hardening do Sistema

#### Hardening do Linux
```bash
#!/bin/bash
# hardening.sh

# Atualizar sistema
apt update && apt upgrade -y

# Instalar ferramentas de segurança
apt install -y fail2ban ufw unattended-upgrades

# Configurar firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Configurar fail2ban
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 3
EOF

systemctl enable fail2ban
systemctl start fail2ban

# Configurar atualizações automáticas
cat > /etc/apt/apt.conf.d/50unattended-upgrades << EOF
Unattended-Upgrade::Allowed-Origins {
    "\${distro_id}:\${distro_codename}-security";
    "\${distro_id}ESMApps:\${distro_codename}-apps-security";
    "\${distro_id}ESM:\${distro_codename}-infra-security";
};

Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

# Configurar SSH
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
systemctl restart ssh

# Configurar limites de recursos
cat >> /etc/security/limits.conf << EOF
* soft nofile 65536
* hard nofile 65536
* soft nproc 65536
* hard nproc 65536
EOF

echo "Hardening concluído"
```

#### Hardening do Docker
```dockerfile
# Dockerfile seguro
FROM node:18-alpine

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Instalar apenas dependências necessárias
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copiar e instalar dependências
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar código
COPY --chown=nextjs:nodejs . .

# Mudar para usuário não-root
USER nextjs

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Usar dumb-init para gerenciar processos
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]
```

### 3. Autenticação e Autorização

#### JWT com Refresh Token
```javascript
// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

// Gerar tokens
function generateTokens(user) {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    
    const accessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        issuer: 'minha-app',
        audience: 'minha-app-users'
    });
    
    const refreshToken = jwt.sign(
        { id: user.id, type: 'refresh' },
        JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_EXPIRES_IN }
    );
    
    return { accessToken, refreshToken };
}

// Middleware de autenticação
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token de acesso requerido' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        
        req.user = user;
        next();
    });
}

// Middleware de autorização
function authorize(roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Acesso negado' });
        }
        
        next();
    };
}

// Rate limiting para login
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 tentativas
    message: 'Muitas tentativas de login, tente novamente em 15 minutos',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
});

module.exports = {
    generateTokens,
    authenticateToken,
    authorize,
    loginLimiter
};
```

#### Implementação de Login
```javascript
// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const { generateTokens, authenticateToken, loginLimiter } = require('../auth');
const User = require('../models/User');

const router = express.Router();

// Login
router.post('/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validar entrada
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }
        
        // Buscar usuário
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        // Verificar senha
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        // Verificar se conta está ativa
        if (!user.active) {
            return res.status(401).json({ error: 'Conta desativada' });
        }
        
        // Gerar tokens
        const { accessToken, refreshToken } = generateTokens(user);
        
        // Salvar refresh token
        await User.findByIdAndUpdate(user.id, {
            refreshToken: refreshToken,
            lastLogin: new Date()
        });
        
        // Log de login
        console.log(`Login realizado: ${email} - ${req.ip}`);
        
        res.json({
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Refresh token
router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token requerido' });
        }
        
        // Verificar refresh token
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        
        // Buscar usuário
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ error: 'Refresh token inválido' });
        }
        
        // Gerar novos tokens
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
        
        // Atualizar refresh token
        await User.findByIdAndUpdate(user.id, {
            refreshToken: newRefreshToken
        });
        
        res.json({
            accessToken,
            refreshToken: newRefreshToken
        });
        
    } catch (error) {
        console.error('Erro no refresh:', error);
        res.status(403).json({ error: 'Refresh token inválido' });
    }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
    try {
        // Remover refresh token
        await User.findByIdAndUpdate(req.user.id, {
            refreshToken: null
        });
        
        res.json({ message: 'Logout realizado com sucesso' });
        
    } catch (error) {
        console.error('Erro no logout:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
```

### 4. Criptografia e Proteção de Dados

#### Criptografia de Dados Sensíveis
```javascript
// crypto.js
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const ALGORITHM = 'aes-256-gcm';
const KEY = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
const IV_LENGTH = 16;
const SALT_ROUNDS = 12;

// Criptografar dados
function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipher(ALGORITHM, KEY);
    cipher.setAAD(Buffer.from('minha-app', 'utf8'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
        encrypted,
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex')
    };
}

// Descriptografar dados
function decrypt(encryptedData) {
    const { encrypted, iv, authTag } = encryptedData;
    
    const decipher = crypto.createDecipher(ALGORITHM, KEY);
    decipher.setAAD(Buffer.from('minha-app', 'utf8'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}

// Hash de senha
async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// Verificar senha
async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Gerar chave de API
function generateApiKey() {
    return crypto.randomBytes(32).toString('hex');
}

// Hash de dados pessoais
function hashPersonalData(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

module.exports = {
    encrypt,
    decrypt,
    hashPassword,
    verifyPassword,
    generateApiKey,
    hashPersonalData
};
```

#### Proteção de Dados Pessoais (LGPD)
```javascript
// privacy.js
const { encrypt, hashPersonalData } = require('./crypto');

// Dados sensíveis que devem ser criptografados
const SENSITIVE_FIELDS = [
    'cpf', 'rg', 'passport', 'phone', 'address',
    'creditCard', 'bankAccount', 'medicalInfo'
];

// Criptografar dados sensíveis
function protectSensitiveData(data) {
    const protected = { ...data };
    
    SENSITIVE_FIELDS.forEach(field => {
        if (protected[field]) {
            protected[field] = encrypt(protected[field]);
        }
    });
    
    return protected;
}

// Descriptografar dados sensíveis
function unprotectSensitiveData(data) {
    const unprotected = { ...data };
    
    SENSITIVE_FIELDS.forEach(field => {
        if (unprotected[field] && typeof unprotected[field] === 'object') {
            unprotected[field] = decrypt(unprotected[field]);
        }
    });
    
    return unprotected;
}

// Anonimizar dados para logs
function anonymizeForLogs(data) {
    const anonymized = { ...data };
    
    // Remover campos sensíveis
    SENSITIVE_FIELDS.forEach(field => {
        if (anonymized[field]) {
            anonymized[field] = '[REDACTED]';
        }
    });
    
    // Hash de email para logs
    if (anonymized.email) {
        anonymized.email = hashPersonalData(anonymized.email);
    }
    
    return anonymized;
}

// Consentimento LGPD
function recordConsent(userId, purpose, granted) {
    return {
        userId,
        purpose,
        granted,
        timestamp: new Date(),
        ip: req.ip,
        userAgent: req.get('User-Agent')
    };
}

module.exports = {
    protectSensitiveData,
    unprotectSensitiveData,
    anonymizeForLogs,
    recordConsent
};
```

### 5. Proteção de Rede e Firewall

#### Configuração do Nginx com Segurança
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    # Configurações de segurança
    server_tokens off;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self'; frame-ancestors 'none';";

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
    limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;

    # Logs de segurança
    log_format security '$remote_addr - $remote_user [$time_local] "$request" '
                       '$status $body_bytes_sent "$http_referer" '
                       '"$http_user_agent" "$http_x_forwarded_for" '
                       'rt=$request_time uct="$upstream_connect_time" '
                       'uht="$upstream_header_time" urt="$upstream_response_time"';

    server {
        listen 80;
        server_name example.com;
        
        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name example.com;

        # SSL Configuration
        ssl_certificate /etc/ssl/certs/example.com.crt;
        ssl_certificate_key /etc/ssl/private/example.com.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Rate limiting
        limit_req zone=api burst=20 nodelay;
        limit_conn conn_limit_per_ip 10;

        # Block common attack patterns
        location ~* \.(php|asp|aspx|jsp)$ {
            return 444;
        }

        location ~* /\. {
            deny all;
        }

        location ~* \.(sql|log|conf)$ {
            deny all;
        }

        # API endpoints
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Timeouts
            proxy_connect_timeout 5s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # Login endpoint
        location /api/auth/login {
            limit_req zone=login burst=5 nodelay;
            
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Static files
        location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header Vary Accept-Encoding;
        }

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

#### Configuração do UFW (Uncomplicated Firewall)
```bash
#!/bin/bash
# firewall-setup.sh

# Reset UFW
ufw --force reset

# Default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (change port if needed)
ufw allow 22/tcp

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Allow specific IPs for admin access
ufw allow from 192.168.1.0/24 to any port 22

# Allow database access from specific IPs
ufw allow from 192.168.1.0/24 to any port 5432

# Allow Redis access from specific IPs
ufw allow from 192.168.1.0/24 to any port 6379

# Enable UFW
ufw --force enable

# Show status
ufw status verbose
```

### 6. Compliance e Auditoria

#### Logging de Auditoria
```javascript
// audit.js
const winston = require('winston');

// Logger de auditoria
const auditLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: 'logs/audit.log',
            maxsize: 5242880, // 5MB
            maxFiles: 10
        })
    ]
});

// Eventos de auditoria
const AUDIT_EVENTS = {
    USER_LOGIN: 'user.login',
    USER_LOGOUT: 'user.logout',
    USER_CREATE: 'user.create',
    USER_UPDATE: 'user.update',
    USER_DELETE: 'user.delete',
    DATA_ACCESS: 'data.access',
    DATA_MODIFY: 'data.modify',
    PERMISSION_GRANT: 'permission.grant',
    PERMISSION_REVOKE: 'permission.revoke',
    SYSTEM_CONFIG: 'system.config'
};

// Função de auditoria
function audit(event, userId, details = {}) {
    const auditEntry = {
        timestamp: new Date().toISOString(),
        event,
        userId,
        ip: req?.ip || 'unknown',
        userAgent: req?.get('User-Agent') || 'unknown',
        details: anonymizeForLogs(details)
    };
    
    auditLogger.info('AUDIT', auditEntry);
    
    // Enviar para sistema de auditoria externo se necessário
    if (process.env.AUDIT_ENDPOINT) {
        sendToAuditSystem(auditEntry);
    }
}

// Middleware de auditoria
function auditMiddleware(event) {
    return (req, res, next) => {
        const originalSend = res.send;
        
        res.send = function(data) {
            // Registrar evento após resposta
            if (res.statusCode < 400) {
                audit(event, req.user?.id, {
                    method: req.method,
                    url: req.url,
                    statusCode: res.statusCode
                });
            }
            
            originalSend.call(this, data);
        };
        
        next();
    };
}

// Enviar para sistema de auditoria externo
async function sendToAuditSystem(auditEntry) {
    try {
        const response = await fetch(process.env.AUDIT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AUDIT_TOKEN}`
            },
            body: JSON.stringify(auditEntry)
        });
        
        if (!response.ok) {
            console.error('Falha ao enviar auditoria:', response.status);
        }
    } catch (error) {
        console.error('Erro ao enviar auditoria:', error);
    }
}

module.exports = {
    audit,
    auditMiddleware,
    AUDIT_EVENTS
};
```

#### Implementação de Auditoria
```javascript
// routes/users.js
const express = require('express');
const { authenticateToken, authorize } = require('../auth');
const { audit, auditMiddleware, AUDIT_EVENTS } = require('../audit');

const router = express.Router();

// Criar usuário
router.post('/', 
    authenticateToken,
    authorize(['admin']),
    auditMiddleware(AUDIT_EVENTS.USER_CREATE),
    async (req, res) => {
        try {
            const user = await User.create(req.body);
            
            audit(AUDIT_EVENTS.USER_CREATE, req.user.id, {
                newUserId: user.id,
                email: user.email,
                role: user.role
            });
            
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Atualizar usuário
router.put('/:id',
    authenticateToken,
    authorize(['admin', 'user']),
    auditMiddleware(AUDIT_EVENTS.USER_UPDATE),
    async (req, res) => {
        try {
            const { id } = req.params;
            
            // Verificar se usuário pode atualizar
            if (req.user.role !== 'admin' && req.user.id !== id) {
                return res.status(403).json({ error: 'Acesso negado' });
            }
            
            const oldUser = await User.findById(id);
            const user = await User.findByIdAndUpdate(id, req.body, { new: true });
            
            audit(AUDIT_EVENTS.USER_UPDATE, req.user.id, {
                targetUserId: id,
                changes: getChanges(oldUser, user)
            });
            
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Deletar usuário
router.delete('/:id',
    authenticateToken,
    authorize(['admin']),
    auditMiddleware(AUDIT_EVENTS.USER_DELETE),
    async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            
            audit(AUDIT_EVENTS.USER_DELETE, req.user.id, {
                deletedUserId: id,
                email: user.email
            });
            
            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

module.exports = router;
```

### 7. Gerenciamento de Vulnerabilidades

#### Scanner de Vulnerabilidades
```bash
#!/bin/bash
# vulnerability-scan.sh

# Instalar ferramentas de segurança
apt update
apt install -y nmap nikto sqlmap

# Scanner de portas
echo "Scanning open ports..."
nmap -sS -O -v localhost > /var/log/security/port-scan.log

# Scanner de vulnerabilidades web
echo "Scanning web vulnerabilities..."
nikto -h http://localhost -output /var/log/security/web-scan.log

# Scanner de dependências Node.js
echo "Scanning Node.js dependencies..."
npm audit --audit-level moderate > /var/log/security/npm-audit.log

# Scanner de vulnerabilidades do sistema
echo "Scanning system vulnerabilities..."
apt list --upgradable > /var/log/security/system-updates.log

# Verificar permissões de arquivos
echo "Checking file permissions..."
find /var/www -type f -perm /o+w > /var/log/security/world-writable.log

# Verificar processos suspeitos
echo "Checking suspicious processes..."
ps aux | grep -E "(nc|netcat|ncat|socat)" > /var/log/security/suspicious-processes.log

echo "Vulnerability scan completed"
```

#### Monitoramento de Segurança
```javascript
// security-monitor.js
const fs = require('fs');
const path = require('path');

// Monitorar tentativas de login
function monitorLoginAttempts(req, res, next) {
    const ip = req.ip;
    const email = req.body.email;
    
    // Verificar se IP está bloqueado
    if (isIPBlocked(ip)) {
        return res.status(429).json({ error: 'IP bloqueado' });
    }
    
    // Registrar tentativa
    recordLoginAttempt(ip, email, req.get('User-Agent'));
    
    next();
}

// Verificar se IP está bloqueado
function isIPBlocked(ip) {
    const blockedIPs = getBlockedIPs();
    return blockedIPs.includes(ip);
}

// Registrar tentativa de login
function recordLoginAttempt(ip, email, userAgent) {
    const attempt = {
        ip,
        email,
        userAgent,
        timestamp: new Date().toISOString()
    };
    
    // Salvar em arquivo
    const logFile = path.join(__dirname, 'logs', 'login-attempts.log');
    fs.appendFileSync(logFile, JSON.stringify(attempt) + '\n');
    
    // Verificar se deve bloquear IP
    checkForBlocking(ip);
}

// Verificar se deve bloquear IP
function checkForBlocking(ip) {
    const attempts = getLoginAttempts(ip);
    const recentAttempts = attempts.filter(attempt => {
        const attemptTime = new Date(attempt.timestamp);
        const now = new Date();
        return (now - attemptTime) < 15 * 60 * 1000; // 15 minutos
    });
    
    if (recentAttempts.length >= 5) {
        blockIP(ip);
    }
}

// Bloquear IP
function blockIP(ip) {
    const blockedIPs = getBlockedIPs();
    if (!blockedIPs.includes(ip)) {
        blockedIPs.push(ip);
        fs.writeFileSync(
            path.join(__dirname, 'config', 'blocked-ips.json'),
            JSON.stringify(blockedIPs, null, 2)
        );
        
        console.log(`IP bloqueado: ${ip}`);
    }
}

// Obter IPs bloqueados
function getBlockedIPs() {
    try {
        const file = path.join(__dirname, 'config', 'blocked-ips.json');
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
        return [];
    }
}

// Obter tentativas de login
function getLoginAttempts(ip) {
    try {
        const logFile = path.join(__dirname, 'logs', 'login-attempts.log');
        const content = fs.readFileSync(logFile, 'utf8');
        return content.split('\n')
            .filter(line => line.trim())
            .map(line => JSON.parse(line))
            .filter(attempt => attempt.ip === ip);
    } catch (error) {
        return [];
    }
}

module.exports = {
    monitorLoginAttempts,
    isIPBlocked,
    blockIP
};
```

### 8. Projeto Prático: Sistema de Segurança Completo

#### Estrutura do Projeto
```
security-system/
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
├── scripts/
│   ├── hardening.sh
│   ├── firewall-setup.sh
│   └── vulnerability-scan.sh
├── config/
│   ├── blocked-ips.json
│   └── security-policies.json
├── logs/
│   ├── audit.log
│   ├── security.log
│   └── login-attempts.log
└── app/
    ├── auth.js
    ├── crypto.js
    ├── audit.js
    └── security-monitor.js
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
      - ./logs:/var/log/nginx
    depends_on:
      - app

  app:
    build: ./app
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - ENCRYPTION_KEY=${ENCRYPTION_KEY}
    volumes:
      - ./logs:/app/logs
      - ./config:/app/config
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: minha_app
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - backend

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - backend

  fail2ban:
    image: lscr.io/linuxserver/fail2ban:latest
    volumes:
      - ./config/fail2ban:/config
      - ./logs:/var/log
    environment:
      - PUID=1000
      - PGID=1000
    cap_add:
      - NET_ADMIN
      - NET_RAW

volumes:
  postgres_data:
  redis_data:

networks:
  backend:
    driver: bridge
```

#### Políticas de Segurança
```json
{
  "password_policy": {
    "min_length": 8,
    "require_uppercase": true,
    "require_lowercase": true,
    "require_numbers": true,
    "require_symbols": true,
    "max_age_days": 90
  },
  "session_policy": {
    "timeout_minutes": 15,
    "max_concurrent_sessions": 3,
    "require_reauth_for_sensitive": true
  },
  "audit_policy": {
    "retention_days": 2555,
    "log_level": "info",
    "include_personal_data": false
  },
  "backup_policy": {
    "encrypt_backups": true,
    "retention_days": 30,
    "test_restore_frequency": "weekly"
  }
}
```

## 🎯 Exercícios Práticos

### Exercício 1: Hardening do Sistema
1. Implemente hardening básico do Linux
2. Configure firewall e fail2ban
3. Configure atualizações automáticas

### Exercício 2: Autenticação Segura
1. Implemente JWT com refresh token
2. Configure rate limiting para login
3. Implemente auditoria de autenticação

### Exercício 3: Criptografia
1. Implemente criptografia de dados sensíveis
2. Configure proteção de dados pessoais
3. Implemente anonimização para logs

### Exercício 4: Monitoramento de Segurança
1. Configure logging de auditoria
2. Implemente monitoramento de tentativas de login
3. Configure alertas de segurança

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Princípios de Segurança**: Confidencialidade, integridade, disponibilidade
2. **Hardening**: Proteção do sistema operacional
3. **Autenticação**: JWT, refresh tokens, rate limiting
4. **Criptografia**: Proteção de dados sensíveis
5. **Proteção de Rede**: Firewall, Nginx seguro
6. **Compliance**: Auditoria e LGPD
7. **Vulnerabilidades**: Scanner e monitoramento
8. **Políticas**: Definição e implementação
9. **Monitoramento**: Logs de segurança
10. **Implementação**: Sistema completo

## 🚀 Próximos Passos

Agora você está pronto para o **Módulo 8: Projetos Finais**, onde aplicará todos os conhecimentos adquiridos em projetos práticos e completos.

## 📚 Recursos Adicionais

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [LGPD Guidelines](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [Security Best Practices](https://cheatsheetseries.owasp.org/)
- [Docker Security](https://docs.docker.com/engine/security/)

---

**🎉 Parabéns!** Você completou a Aula 6 do Módulo 7. Continue praticando e explore as possibilidades da segurança em produção!







