# Aula 5: WebSockets

## 🎯 Objetivos da Aula

Ao final desta aula, você será capaz de:
- Entender os conceitos de WebSockets
- Implementar comunicação em tempo real com Socket.io
- Criar um sistema de chat
- Implementar notificações push
- Gerenciar salas e usuários
- Integrar WebSockets com APIs REST

## 📚 Conteúdo da Aula

### 1. Introdução aos WebSockets

#### O que são WebSockets?
WebSockets são um protocolo de comunicação que permite comunicação bidirecional em tempo real entre cliente e servidor.

#### Vantagens dos WebSockets
- **Tempo real**: Comunicação instantânea
- **Bidirecional**: Cliente e servidor podem enviar dados
- **Eficiente**: Menos overhead que HTTP
- **Persistente**: Conexão mantida aberta
- **Baixa latência**: Ideal para aplicações interativas

#### Comparação HTTP vs WebSocket

```javascript
// HTTP - Request/Response
fetch('/api/messages')
    .then(response => response.json())
    .then(data => console.log(data));

// WebSocket - Comunicação bidirecional
const socket = io();
socket.emit('sendMessage', { text: 'Olá!' });
socket.on('newMessage', (data) => {
    console.log('Nova mensagem:', data);
});
```

### 2. Socket.io - Implementação

#### Configuração do Servidor

```javascript
// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configurar CORS para Socket.io
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Middleware de autenticação para Socket.io
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;
            socket.userName = decoded.name;
            next();
        } catch (error) {
            next(new Error('Token inválido'));
        }
    } else {
        next(new Error('Token não fornecido'));
    }
});

// Gerenciar conexões
io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.userName} (${socket.id})`);
    
    // Adicionar usuário à lista de usuários online
    socket.join('online-users');
    io.to('online-users').emit('userOnline', {
        id: socket.userId,
        name: socket.userName
    });
    
    // Eventos do chat
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('userJoined', {
            user: socket.userName,
            room: roomId
        });
    });
    
    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        socket.to(roomId).emit('userLeft', {
            user: socket.userName,
            room: roomId
        });
    });
    
    socket.on('sendMessage', (data) => {
        const message = {
            id: Date.now(),
            text: data.text,
            user: socket.userName,
            userId: socket.userId,
            room: data.room,
            timestamp: new Date().toISOString()
        };
        
        // Enviar mensagem para todos na sala
        io.to(data.room).emit('newMessage', message);
        
        // Salvar mensagem no banco de dados
        saveMessage(message);
    });
    
    socket.on('typing', (data) => {
        socket.to(data.room).emit('userTyping', {
            user: socket.userName,
            isTyping: data.isTyping
        });
    });
    
    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.userName}`);
        
        // Remover usuário da lista de online
        io.to('online-users').emit('userOffline', {
            id: socket.userId,
            name: socket.userName
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

#### Cliente Socket.io

```javascript
// client/socket.js
import io from 'socket.io-client';

class SocketManager {
    constructor() {
        this.socket = null;
        this.isConnected = false;
    }
    
    connect(token) {
        this.socket = io('http://localhost:3000', {
            auth: {
                token: token
            }
        });
        
        this.socket.on('connect', () => {
            console.log('Conectado ao servidor');
            this.isConnected = true;
        });
        
        this.socket.on('disconnect', () => {
            console.log('Desconectado do servidor');
            this.isConnected = false;
        });
        
        this.socket.on('connect_error', (error) => {
            console.error('Erro de conexão:', error.message);
        });
        
        return this.socket;
    }
    
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }
    
    joinRoom(roomId) {
        if (this.socket) {
            this.socket.emit('joinRoom', roomId);
        }
    }
    
    leaveRoom(roomId) {
        if (this.socket) {
            this.socket.emit('leaveRoom', roomId);
        }
    }
    
    sendMessage(text, roomId) {
        if (this.socket) {
            this.socket.emit('sendMessage', {
                text,
                room: roomId
            });
        }
    }
    
    startTyping(roomId) {
        if (this.socket) {
            this.socket.emit('typing', {
                room: roomId,
                isTyping: true
            });
        }
    }
    
    stopTyping(roomId) {
        if (this.socket) {
            this.socket.emit('typing', {
                room: roomId,
                isTyping: false
            });
        }
    }
}

export default new SocketManager();
```

### 3. Sistema de Chat

#### Componente de Chat

```javascript
// components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import socketManager from '../client/socket';

const Chat = ({ roomId, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [typingUsers, setTypingUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    
    useEffect(() => {
        // Conectar ao socket
        const socket = socketManager.connect(localStorage.getItem('token'));
        
        // Entrar na sala
        socketManager.joinRoom(roomId);
        
        // Event listeners
        socket.on('newMessage', (message) => {
            setMessages(prev => [...prev, message]);
        });
        
        socket.on('userJoined', (data) => {
            console.log(`${data.user} entrou na sala ${data.room}`);
        });
        
        socket.on('userLeft', (data) => {
            console.log(`${data.user} saiu da sala ${data.room}`);
        });
        
        socket.on('userTyping', (data) => {
            if (data.isTyping) {
                setTypingUsers(prev => [...prev.filter(u => u !== data.user), data.user]);
            } else {
                setTypingUsers(prev => prev.filter(u => u !== data.user));
            }
        });
        
        socket.on('userOnline', (user) => {
            setOnlineUsers(prev => [...prev.filter(u => u.id !== user.id), user]);
        });
        
        socket.on('userOffline', (user) => {
            setOnlineUsers(prev => prev.filter(u => u.id !== user.id));
        });
        
        // Carregar mensagens existentes
        loadMessages(roomId);
        
        return () => {
            socketManager.leaveRoom(roomId);
            socketManager.disconnect();
        };
    }, [roomId]);
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const loadMessages = async (roomId) => {
        try {
            const response = await fetch(`/api/messages/${roomId}`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
        }
    };
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        
        if (newMessage.trim()) {
            socketManager.sendMessage(newMessage.trim(), roomId);
            setNewMessage('');
        }
    };
    
    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        
        // Indicar que está digitando
        socketManager.startTyping(roomId);
        
        // Limpar timeout anterior
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        
        // Parar de indicar que está digitando após 3 segundos
        typingTimeoutRef.current = setTimeout(() => {
            socketManager.stopTyping(roomId);
        }, 3000);
    };
    
    return (
        <div className="chat-container">
            <div className="chat-header">
                <h3>Sala: {roomId}</h3>
                <div className="online-users">
                    {onlineUsers.map(user => (
                        <span key={user.id} className="online-user">
                            {user.name}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="messages-container">
                {messages.map(message => (
                    <div 
                        key={message.id} 
                        className={`message ${message.userId === currentUser.id ? 'own' : 'other'}`}
                    >
                        <div className="message-header">
                            <span className="message-user">{message.user}</span>
                            <span className="message-time">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="message-text">{message.text}</div>
                    </div>
                ))}
                
                {typingUsers.length > 0 && (
                    <div className="typing-indicator">
                        {typingUsers.join(', ')} está digitando...
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="message-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleTyping}
                    placeholder="Digite sua mensagem..."
                    className="message-input"
                />
                <button type="submit" className="send-button">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Chat;
```

#### Estilos do Chat

```css
/* styles/chat.css */
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

.chat-header {
    background: #f5f5f5;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.online-users {
    display: flex;
    gap: 0.5rem;
}

.online-user {
    background: #4CAF50;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.8rem;
}

.messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    background: #fafafa;
}

.message {
    margin-bottom: 1rem;
    max-width: 70%;
}

.message.own {
    margin-left: auto;
}

.message.other {
    margin-right: auto;
}

.message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    font-size: 0.8rem;
    color: #666;
}

.message-text {
    background: white;
    padding: 0.75rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.message.own .message-text {
    background: #007bff;
    color: white;
}

.typing-indicator {
    font-style: italic;
    color: #666;
    padding: 0.5rem;
}

.message-form {
    display: flex;
    padding: 1rem;
    background: white;
    border-top: 1px solid #ddd;
}

.message-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    margin-right: 0.5rem;
}

.send-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.3s;
}

.send-button:hover {
    background: #0056b3;
}
```

### 4. Notificações Push

#### Sistema de Notificações

```javascript
// services/notificationService.js
const { Expo } = require('expo-server-sdk');

class NotificationService {
    constructor() {
        this.expo = new Expo();
    }
    
    async sendPushNotification(token, title, body, data = {}) {
        if (!Expo.isExpoPushToken(token)) {
            console.error('Token inválido:', token);
            return;
        }
        
        const message = {
            to: token,
            sound: 'default',
            title,
            body,
            data
        };
        
        try {
            const ticket = await this.expo.sendPushNotificationsAsync([message]);
            console.log('Notificação enviada:', ticket);
            return ticket;
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
        }
    }
    
    async sendToMultipleUsers(tokens, title, body, data = {}) {
        const messages = tokens.map(token => ({
            to: token,
            sound: 'default',
            title,
            body,
            data
        }));
        
        try {
            const tickets = await this.expo.sendPushNotificationsAsync(messages);
            return tickets;
        } catch (error) {
            console.error('Erro ao enviar notificações:', error);
        }
    }
}

module.exports = new NotificationService();
```

#### Integração com WebSocket

```javascript
// server.js - Adicionar ao servidor existente
const notificationService = require('./services/notificationService');

io.on('connection', (socket) => {
    // ... código existente ...
    
    socket.on('sendMessage', async (data) => {
        const message = {
            id: Date.now(),
            text: data.text,
            user: socket.userName,
            userId: socket.userId,
            room: data.room,
            timestamp: new Date().toISOString()
        };
        
        // Enviar mensagem para todos na sala
        io.to(data.room).emit('newMessage', message);
        
        // Enviar notificação push para usuários offline
        const roomUsers = await getRoomUsers(data.room);
        const offlineUsers = roomUsers.filter(user => 
            user.id !== socket.userId && !user.isOnline
        );
        
        if (offlineUsers.length > 0) {
            const tokens = offlineUsers.map(user => user.pushToken).filter(Boolean);
            await notificationService.sendToMultipleUsers(
                tokens,
                `Nova mensagem de ${socket.userName}`,
                data.text,
                { roomId: data.room, messageId: message.id }
            );
        }
        
        // Salvar mensagem no banco
        await saveMessage(message);
    });
    
    // ... resto do código ...
});
```

### 5. Gerenciamento de Salas

#### Sistema de Salas

```javascript
// services/roomService.js
const Room = require('../models/Room');
const User = require('../models/User');

class RoomService {
    async createRoom(name, description, creatorId) {
        const room = new Room({
            name,
            description,
            creator: creatorId,
            members: [creatorId],
            createdAt: new Date()
        });
        
        return await room.save();
    }
    
    async joinRoom(roomId, userId) {
        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error('Sala não encontrada');
        }
        
        if (!room.members.includes(userId)) {
            room.members.push(userId);
            await room.save();
        }
        
        return room;
    }
    
    async leaveRoom(roomId, userId) {
        const room = await Room.findById(roomId);
        if (room) {
            room.members = room.members.filter(id => id !== userId);
            await room.save();
        }
        
        return room;
    }
    
    async getRoomMembers(roomId) {
        const room = await Room.findById(roomId).populate('members');
        return room ? room.members : [];
    }
    
    async getUserRooms(userId) {
        return await Room.find({ members: userId });
    }
}

module.exports = new RoomService();
```

#### Modelo de Sala

```javascript
// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isPrivate: {
        type: Boolean,
        default: false
    },
    settings: {
        allowInvites: {
            type: Boolean,
            default: true
        },
        maxMembers: {
            type: Number,
            default: 100
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

roomSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Room', roomSchema);
```

### 6. Integração com APIs REST

#### Rotas para Chat

```javascript
// routes/chat.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Room = require('../models/Room');
const roomService = require('../services/roomService');
const { authenticateToken } = require('../middleware/auth');

// Criar sala
router.post('/rooms', authenticateToken, async (req, res) => {
    try {
        const { name, description, isPrivate } = req.body;
        const room = await roomService.createRoom(name, description, req.user.id);
        
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Listar salas do usuário
router.get('/rooms', authenticateToken, async (req, res) => {
    try {
        const rooms = await roomService.getUserRooms(req.user.id);
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Entrar em sala
router.post('/rooms/:roomId/join', authenticateToken, async (req, res) => {
    try {
        const room = await roomService.joinRoom(req.params.roomId, req.user.id);
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sair de sala
router.post('/rooms/:roomId/leave', authenticateToken, async (req, res) => {
    try {
        const room = await roomService.leaveRoom(req.params.roomId, req.user.id);
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar mensagens de uma sala
router.get('/rooms/:roomId/messages', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;
        const messages = await Message.find({ room: req.params.roomId })
            .populate('user', 'name')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        res.json(messages.reverse());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar membros de uma sala
router.get('/rooms/:roomId/members', authenticateToken, async (req, res) => {
    try {
        const members = await roomService.getRoomMembers(req.params.roomId);
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

### 7. Projeto Prático Completo

#### Estrutura do Projeto

```
websocket-chat/
├── server.js
├── package.json
├── .env
├── models/
│   ├── User.js
│   ├── Room.js
│   └── Message.js
├── services/
│   ├── roomService.js
│   └── notificationService.js
├── routes/
│   └── chat.js
├── middleware/
│   └── auth.js
├── client/
│   ├── socket.js
│   └── components/
│       ├── Chat.js
│       ├── RoomList.js
│       └── UserList.js
└── styles/
    └── chat.css
```

#### Aplicação Principal

```javascript
// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const chatRoutes = require('./routes/chat');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const server = http.createServer(app);

// Configurar Socket.io
const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Rotas
app.use('/api/chat', chatRoutes);

// Middleware de autenticação para Socket.io
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;
            socket.userName = decoded.name;
            next();
        } catch (error) {
            next(new Error('Token inválido'));
        }
    } else {
        next(new Error('Token não fornecido'));
    }
});

// Gerenciar conexões WebSocket
io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.userName} (${socket.id})`);
    
    // Adicionar usuário à lista de online
    socket.join('online-users');
    io.to('online-users').emit('userOnline', {
        id: socket.userId,
        name: socket.userName
    });
    
    // Eventos do chat
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('userJoined', {
            user: socket.userName,
            room: roomId
        });
    });
    
    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        socket.to(roomId).emit('userLeft', {
            user: socket.userName,
            room: roomId
        });
    });
    
    socket.on('sendMessage', async (data) => {
        const message = {
            id: Date.now(),
            text: data.text,
            user: socket.userName,
            userId: socket.userId,
            room: data.room,
            timestamp: new Date().toISOString()
        };
        
        // Enviar mensagem para todos na sala
        io.to(data.room).emit('newMessage', message);
        
        // Salvar mensagem no banco
        try {
            const Message = require('./models/Message');
            await Message.create(message);
        } catch (error) {
            console.error('Erro ao salvar mensagem:', error);
        }
    });
    
    socket.on('typing', (data) => {
        socket.to(data.room).emit('userTyping', {
            user: socket.userName,
            isTyping: data.isTyping
        });
    });
    
    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.userName}`);
        
        // Remover usuário da lista de online
        io.to('online-users').emit('userOffline', {
            id: socket.userId,
            name: socket.userName
        });
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        connections: io.engine.clientsCount
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`WebSocket disponível em ws://localhost:${PORT}`);
});

module.exports = { app, io };
```

## 🎯 Exercícios Práticos

### Exercício 1: Chat Básico
Implemente um sistema de chat com:
- Conexão WebSocket
- Envio e recebimento de mensagens
- Lista de usuários online
- Indicador de digitação

### Exercício 2: Sistema de Salas
Crie um sistema de salas com:
- Criação e gerenciamento de salas
- Entrada e saída de salas
- Lista de membros
- Histórico de mensagens

### Exercício 3: Notificações Push
Implemente notificações push com:
- Registro de tokens
- Envio de notificações
- Integração com WebSocket
- Notificações offline

## 📝 Resumo da Aula

Nesta aula, você aprendeu:

1. **Conceitos de WebSockets** e comunicação em tempo real
2. **Socket.io** para implementação de WebSockets
3. **Sistema de chat** completo
4. **Notificações push** com Expo
5. **Gerenciamento de salas** e usuários
6. **Integração com APIs REST**
7. **Projeto prático completo** com chat
8. **Boas práticas** de desenvolvimento

## 🚀 Próxima Aula

Na próxima aula, vamos explorar **Integração de APIs**, incluindo:
- Consumo de APIs externas
- Rate limiting e cache
- Tratamento de erros
- Monitoramento e logs
- Projeto final integrado

## 📚 Recursos Adicionais

- [Socket.io](https://socket.io/) - Biblioteca WebSocket
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - API nativa
- [Expo Push Notifications](https://docs.expo.dev/push-notifications/overview/) - Notificações push
- [WebRTC](https://webrtc.org/) - Comunicação peer-to-peer
- [Socket.io Client](https://socket.io/docs/v4/client-api/) - Cliente JavaScript







