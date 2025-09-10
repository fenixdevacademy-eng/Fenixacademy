# Aula 5: Sistema de Notificações

## Objetivos da Aula
- Implementar sistema completo de notificações em tempo real
- Integrar notificações push, email e SMS
- Criar sistema de templates personalizáveis
- Desenvolver dashboard de notificações

## Estrutura do Sistema

### 1. Modelo de Notificação
```typescript
// src/types/Notification.ts
interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'payment' | 'promotion' | 'system' | 'security';
  title: string;
  message: string;
  data?: any;
  channels: ('email' | 'push' | 'sms' | 'in-app')[];
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledAt?: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  createdAt: Date;
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  subject: string;
  content: string;
  variables: string[];
  channels: string[];
  active: boolean;
}

interface NotificationPreferences {
  userId: string;
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  types: {
    order: boolean;
    payment: boolean;
    promotion: boolean;
    system: boolean;
    security: boolean;
  };
}
```

### 2. Serviço de Notificações
```typescript
// src/services/notificationService.ts
export class NotificationService {
  private emailService: EmailService;
  private pushService: PushService;
  private smsService: SMSService;
  private socketService: SocketService;

  constructor() {
    this.emailService = new EmailService();
    this.pushService = new PushService();
    this.smsService = new SMSService();
    this.socketService = new SocketService();
  }

  async sendNotification(notification: Notification): Promise<void> {
    try {
      // Salvar notificação no banco
      const savedNotification = await Notification.create(notification);

      // Enviar por cada canal
      for (const channel of notification.channels) {
        await this.sendByChannel(savedNotification, channel);
      }

      // Atualizar status
      await Notification.findByIdAndUpdate(savedNotification.id, {
        status: 'sent',
        sentAt: new Date()
      });
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      await Notification.findByIdAndUpdate(notification.id, {
        status: 'failed'
      });
    }
  }

  private async sendByChannel(notification: Notification, channel: string): Promise<void> {
    const user = await User.findById(notification.userId);
    if (!user) return;

    // Verificar preferências do usuário
    const preferences = await this.getUserPreferences(user.id);
    if (!preferences[channel]) return;

    switch (channel) {
      case 'email':
        await this.emailService.sendNotificationEmail(user.email, notification);
        break;
      case 'push':
        await this.pushService.sendPushNotification(user.pushToken, notification);
        break;
      case 'sms':
        await this.smsService.sendSMS(user.phone, notification);
        break;
      case 'in-app':
        await this.socketService.sendInAppNotification(user.id, notification);
        break;
    }
  }

  async sendBulkNotification(userIds: string[], notification: Omit<Notification, 'id' | 'userId'>): Promise<void> {
    const notifications = userIds.map(userId => ({
      ...notification,
      userId,
      id: generateId()
    }));

    // Processar em lotes para evitar sobrecarga
    const batchSize = 100;
    for (let i = 0; i < notifications.length; i += batchSize) {
      const batch = notifications.slice(i, i + batchSize);
      await Promise.all(batch.map(notif => this.sendNotification(notif)));
    }
  }

  async scheduleNotification(notification: Notification, scheduledAt: Date): Promise<void> {
    notification.scheduledAt = scheduledAt;
    notification.status = 'pending';
    
    await Notification.create(notification);
    
    // Agendar execução
    await this.scheduleNotificationExecution(notification.id, scheduledAt);
  }

  private async scheduleNotificationExecution(notificationId: string, scheduledAt: Date): Promise<void> {
    const delay = scheduledAt.getTime() - Date.now();
    
    if (delay > 0) {
      setTimeout(async () => {
        const notification = await Notification.findById(notificationId);
        if (notification && notification.status === 'pending') {
          await this.sendNotification(notification);
        }
      }, delay);
    }
  }

  async getUserPreferences(userId: string): Promise<NotificationPreferences> {
    let preferences = await NotificationPreferences.findOne({ userId });
    
    if (!preferences) {
      preferences = new NotificationPreferences({
        userId,
        email: true,
        push: true,
        sms: false,
        inApp: true,
        types: {
          order: true,
          payment: true,
          promotion: true,
          system: true,
          security: true
        }
      });
      await preferences.save();
    }
    
    return preferences;
  }

  async updateUserPreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<void> {
    await NotificationPreferences.findOneAndUpdate(
      { userId },
      preferences,
      { upsert: true }
    );
  }
}
```

## Notificações por Email

### 1. Serviço de Email
```typescript
// src/services/emailService.ts
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendNotificationEmail(email: string, notification: Notification): Promise<void> {
    try {
      const template = await this.getTemplate(notification.type);
      const html = this.renderTemplate(template, notification);

      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: notification.title,
        html
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw error;
    }
  }

  private async getTemplate(type: string): Promise<string> {
    const templatePath = path.join(__dirname, `../templates/email/${type}.hbs`);
    
    if (fs.existsSync(templatePath)) {
      return fs.readFileSync(templatePath, 'utf8');
    }
    
    // Template padrão
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>{{title}}</h2>
        <p>{{message}}</p>
        <div style="margin-top: 20px; padding: 20px; background-color: #f5f5f5;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            Esta é uma notificação automática. Não responda este email.
          </p>
        </div>
      </div>
    `;
  }

  private renderTemplate(template: string, notification: Notification): string {
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate({
      title: notification.title,
      message: notification.message,
      data: notification.data,
      date: new Date().toLocaleDateString('pt-BR')
    });
  }

  async sendBulkEmail(emails: string[], notification: Notification): Promise<void> {
    const template = await this.getTemplate(notification.type);
    const html = this.renderTemplate(template, notification);

    const promises = emails.map(email => 
      this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: notification.title,
        html
      })
    );

    await Promise.all(promises);
  }
}
```

### 2. Templates de Email
```handlebars
<!-- templates/email/order.hbs -->
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
    <h1 style="color: #333; margin: 0;">Pedido Confirmado!</h1>
  </div>
  
  <div style="padding: 20px;">
    <p>Olá,</p>
    <p>Seu pedido foi confirmado com sucesso!</p>
    
    <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px;">
      <h3>Detalhes do Pedido</h3>
      <p><strong>Número:</strong> #{{data.orderId}}</p>
      <p><strong>Total:</strong> R$ {{data.total}}</p>
      <p><strong>Status:</strong> {{data.status}}</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{data.trackingUrl}}" 
         style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
        Acompanhar Pedido
      </a>
    </div>
  </div>
  
  <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
    <p>Esta é uma notificação automática. Não responda este email.</p>
  </div>
</div>
```

## Notificações Push

### 1. Serviço de Push
```typescript
// src/services/pushService.ts
import webpush from 'web-push';

export class PushService {
  constructor() {
    webpush.setVapidDetails(
      process.env.VAPID_SUBJECT,
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
  }

  async sendPushNotification(pushToken: string, notification: Notification): Promise<void> {
    try {
      const payload = JSON.stringify({
        title: notification.title,
        body: notification.message,
        icon: '/icons/notification-icon.png',
        badge: '/icons/badge-icon.png',
        data: notification.data,
        actions: this.getNotificationActions(notification.type)
      });

      await webpush.sendNotification(pushToken, payload);
    } catch (error) {
      console.error('Erro ao enviar push notification:', error);
      throw error;
    }
  }

  private getNotificationActions(type: string): any[] {
    const actions = {
      order: [
        { action: 'view', title: 'Ver Pedido' },
        { action: 'track', title: 'Rastrear' }
      ],
      payment: [
        { action: 'view', title: 'Ver Detalhes' }
      ],
      promotion: [
        { action: 'view', title: 'Ver Oferta' },
        { action: 'dismiss', title: 'Dispensar' }
      ]
    };

    return actions[type] || [];
  }

  async sendBulkPushNotification(pushTokens: string[], notification: Notification): Promise<void> {
    const promises = pushTokens.map(token => 
      this.sendPushNotification(token, notification)
    );

    await Promise.all(promises);
  }
}
```

### 2. Service Worker para Push
```javascript
// public/sw.js
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    data: data.data,
    actions: data.actions,
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/orders/' + event.notification.data.orderId)
    );
  } else if (event.action === 'track') {
    event.waitUntil(
      clients.openWindow('/tracking/' + event.notification.data.orderId)
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
```

## Notificações SMS

### 1. Serviço de SMS
```typescript
// src/services/smsService.ts
import twilio from 'twilio';

export class SMSService {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendSMS(phone: string, notification: Notification): Promise<void> {
    try {
      const message = this.formatSMSMessage(notification);
      
      await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });
    } catch (error) {
      console.error('Erro ao enviar SMS:', error);
      throw error;
    }
  }

  private formatSMSMessage(notification: Notification): string {
    const maxLength = 160;
    let message = `${notification.title}: ${notification.message}`;
    
    if (message.length > maxLength) {
      message = message.substring(0, maxLength - 3) + '...';
    }
    
    return message;
  }

  async sendBulkSMS(phones: string[], notification: Notification): Promise<void> {
    const promises = phones.map(phone => 
      this.sendSMS(phone, notification)
    );

    await Promise.all(promises);
  }
}
```

## Notificações In-App

### 1. Serviço de Socket
```typescript
// src/services/socketService.ts
import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

export class SocketService {
  private io: SocketIOServer;
  private connectedUsers: Map<string, string> = new Map();

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
      }
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.io.on('connection', (socket) => {
      console.log('Usuário conectado:', socket.id);

      // Autenticar usuário
      socket.on('authenticate', (userId: string) => {
        this.connectedUsers.set(socket.id, userId);
        socket.join(`user:${userId}`);
      });

      // Marcar notificação como lida
      socket.on('markAsRead', async (notificationId: string) => {
        await Notification.findByIdAndUpdate(notificationId, {
          readAt: new Date()
        });
      });

      socket.on('disconnect', () => {
        this.connectedUsers.delete(socket.id);
        console.log('Usuário desconectado:', socket.id);
      });
    });
  }

  async sendInAppNotification(userId: string, notification: Notification): Promise<void> {
    try {
      // Salvar notificação no banco
      const savedNotification = await Notification.create(notification);

      // Enviar via socket
      this.io.to(`user:${userId}`).emit('notification', savedNotification);
    } catch (error) {
      console.error('Erro ao enviar notificação in-app:', error);
      throw error;
    }
  }

  async sendToAllUsers(notification: Notification): Promise<void> {
    try {
      const savedNotification = await Notification.create(notification);
      this.io.emit('notification', savedNotification);
    } catch (error) {
      console.error('Erro ao enviar notificação para todos:', error);
      throw error;
    }
  }

  async sendToUserGroup(userIds: string[], notification: Notification): Promise<void> {
    try {
      const savedNotification = await Notification.create(notification);
      
      userIds.forEach(userId => {
        this.io.to(`user:${userId}`).emit('notification', savedNotification);
      });
    } catch (error) {
      console.error('Erro ao enviar notificação para grupo:', error);
      throw error;
    }
  }
}
```

## Dashboard de Notificações

### 1. Componente de Notificações
```typescript
// src/components/notifications/NotificationCenter.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const NotificationCenter: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      setupSocketConnection();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    }
  };

  const setupSocketConnection = () => {
    const socket = io();
    
    socket.emit('authenticate', user.id);
    
    socket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH'
      });
      
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, readAt: new Date() }
            : notif
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/read-all', {
        method: 'PATCH'
      });
      
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, readAt: new Date() }))
      );
      
      setUnreadCount(0);
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  return (
    <div className="notification-center">
      <button
        className="notification-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notificações</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-read">
                Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>Nenhuma notificação</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.readAt ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {formatTime(notification.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="notification-footer">
            <a href="/notifications">Ver todas</a>
          </div>
        </div>
      )}
    </div>
  );
};

const getNotificationIcon = (type: string): string => {
  const icons = {
    order: '📦',
    payment: '💳',
    promotion: '🎉',
    system: '⚙️',
    security: '🔒'
  };
  return icons[type] || '📢';
};

const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
  return `${Math.floor(minutes / 1440)}d`;
};

export default NotificationCenter;
```

## Sistema de Templates

### 1. Gerenciador de Templates
```typescript
// src/components/admin/NotificationTemplates.tsx
import React, { useState, useEffect } from 'react';

const NotificationTemplates: React.FC = () => {
  const [templates, setTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/admin/notification-templates');
      const data = await response.json();
      setTemplates(data.templates);
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
    }
  };

  const saveTemplate = async (templateData: any) => {
    try {
      const url = isCreating 
        ? '/api/admin/notification-templates'
        : `/api/admin/notification-templates/${editingTemplate.id}`;
      
      const method = isCreating ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData)
      });

      if (response.ok) {
        fetchTemplates();
        setEditingTemplate(null);
        setIsCreating(false);
      }
    } catch (error) {
      console.error('Erro ao salvar template:', error);
    }
  };

  return (
    <div className="notification-templates">
      <div className="templates-header">
        <h2>Templates de Notificação</h2>
        <button
          onClick={() => {
            setIsCreating(true);
            setEditingTemplate(null);
          }}
          className="btn btn-primary"
        >
          Novo Template
        </button>
      </div>

      <div className="templates-list">
        {templates.map(template => (
          <div key={template.id} className="template-item">
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.type}</p>
              <span className={`status ${template.active ? 'active' : 'inactive'}`}>
                {template.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <div className="template-actions">
              <button
                onClick={() => setEditingTemplate(template)}
                className="btn btn-sm btn-secondary"
              >
                Editar
              </button>
              <button
                onClick={() => toggleTemplateStatus(template.id, template.active)}
                className="btn btn-sm btn-warning"
              >
                {template.active ? 'Desativar' : 'Ativar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {(editingTemplate || isCreating) && (
        <TemplateEditor
          template={editingTemplate}
          onSave={saveTemplate}
          onCancel={() => {
            setEditingTemplate(null);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
};

const TemplateEditor: React.FC<{ template: any; onSave: (data: any) => void; onCancel: () => void }> = ({
  template,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    type: template?.type || '',
    subject: template?.subject || '',
    content: template?.content || '',
    variables: template?.variables || [],
    channels: template?.channels || [],
    active: template?.active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="template-editor">
      <h3>{template ? 'Editar Template' : 'Novo Template'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="order">Pedido</option>
            <option value="payment">Pagamento</option>
            <option value="promotion">Promoção</option>
            <option value="system">Sistema</option>
            <option value="security">Segurança</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assunto</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Conteúdo</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            rows={10}
            required
          />
        </div>

        <div className="form-group">
          <label>Canais</label>
          <div className="checkbox-group">
            {['email', 'push', 'sms', 'in-app'].map(channel => (
              <label key={channel} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.channels.includes(channel)}
                  onChange={(e) => {
                    const channels = e.target.checked
                      ? [...formData.channels, channel]
                      : formData.channels.filter(c => c !== channel);
                    setFormData({...formData, channels});
                  }}
                />
                {channel}
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationTemplates;
```

## Exercícios Práticos

### 1. Sistema de Agendamento
- Notificações programadas
- Lembretes automáticos
- Campanhas de marketing

### 2. Análise de Engajamento
- Taxa de abertura
- Cliques em notificações
- Relatórios de performance

### 3. Personalização Avançada
- Segmentação de usuários
- A/B testing
- Machine learning para otimização

## Próximos Passos

1. **Aula 6**: Analytics e Relatórios

## Recursos Adicionais

- [Web Push Protocol](https://web.dev/push-notifications/)
- [Twilio SMS](https://www.twilio.com/docs/sms)
- [Socket.io](https://socket.io/)
- [Handlebars](https://handlebarsjs.com/)

---

**Tempo estimado**: 4-5 horas
**Dificuldade**: Avançado
**Pré-requisitos**: Aulas 1-4 do Módulo 8







