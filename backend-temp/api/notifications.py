#!/usr/bin/env python3
"""
Sistema de Notificações e Comunicação - Fenix Academy
Notificações push, email, chat e sistema de mensagens
"""

from fastapi import FastAPI, HTTPException, Depends, status, BackgroundTasks, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any, Set
import asyncio
import json
import logging
from datetime import datetime, timedelta
import uuid
import os
from enum import Enum
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar FastAPI
app = FastAPI(
    title="Fenix Academy - Notifications API",
    description="Sistema de notificações e comunicação",
    version="2.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enums
class NotificationType(str, Enum):
    SYSTEM = "system"
    COURSE = "course"
    PROJECT = "project"
    ACHIEVEMENT = "achievement"
    REMINDER = "reminder"
    SOCIAL = "social"
    PAYMENT = "payment"

class NotificationPriority(str, Enum):
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"
    URGENT = "urgent"

class NotificationStatus(str, Enum):
    UNREAD = "unread"
    READ = "read"
    ARCHIVED = "archived"

class MessageType(str, Enum):
    TEXT = "text"
    IMAGE = "image"
    FILE = "file"
    SYSTEM = "system"

# Modelos Pydantic
class NotificationCreate(BaseModel):
    user_id: str
    title: str
    message: str
    notification_type: NotificationType
    priority: NotificationPriority = NotificationPriority.NORMAL
    data: Optional[Dict[str, Any]] = None
    expires_at: Optional[datetime] = None

class MessageCreate(BaseModel):
    sender_id: str
    receiver_id: str
    content: str
    message_type: MessageType = MessageType.TEXT
    metadata: Optional[Dict[str, Any]] = None

class ChatRoomCreate(BaseModel):
    name: str
    description: Optional[str] = None
    is_public: bool = True
    max_members: int = 50

class EmailTemplate(BaseModel):
    subject: str
    html_content: str
    text_content: str

# Dados em memória (em produção, usar banco de dados)
notifications_db: Dict[str, Dict] = {}
messages_db: Dict[str, Dict] = {}
chat_rooms_db: Dict[str, Dict] = {}
user_sessions: Dict[str, WebSocket] = {}
email_templates_db: Dict[str, Dict] = {}

# Configurações de email
EMAIL_CONFIG = {
    "smtp_server": os.getenv("SMTP_SERVER", "smtp.gmail.com"),
    "smtp_port": int(os.getenv("SMTP_PORT", "587")),
    "smtp_username": os.getenv("SMTP_USERNAME", ""),
    "smtp_password": os.getenv("SMTP_PASSWORD", ""),
    "from_email": os.getenv("FROM_EMAIL", "noreply@fenix.academy")
}

# Inicializar templates de email
def initialize_email_templates():
    """Inicializa templates de email padrão"""
    templates = {
        "welcome": {
            "subject": "🎉 Bem-vindo à Fenix Academy!",
            "html_content": """
            <html>
            <body>
                <h1>🎉 Bem-vindo à Fenix Academy!</h1>
                <p>Olá {user_name},</p>
                <p>Estamos muito felizes em tê-lo conosco!</p>
                <p>Com a Fenix Academy, você terá acesso a:</p>
                <ul>
                    <li>🚀 20 cursos especializados</li>
                    <li>🎮 Elementos interativos</li>
                    <li>🤖 Machine Learning personalizado</li>
                    <li>💻 Execução de código em tempo real</li>
                </ul>
                <p>Comece sua jornada agora mesmo!</p>
                <p>Atenciosamente,<br>Equipe Fenix Academy</p>
            </body>
            </html>
            """,
            "text_content": """
            Bem-vindo à Fenix Academy!
            
            Olá {user_name},
            
            Estamos muito felizes em tê-lo conosco!
            
            Com a Fenix Academy, você terá acesso a:
            - 20 cursos especializados
            - Elementos interativos
            - Machine Learning personalizado
            - Execução de código em tempo real
            
            Comece sua jornada agora mesmo!
            
            Atenciosamente,
            Equipe Fenix Academy
            """
        },
        "course_completion": {
            "subject": "🏆 Curso Concluído com Sucesso!",
            "html_content": """
            <html>
            <body>
                <h1>🏆 Parabéns!</h1>
                <p>Olá {user_name},</p>
                <p>Você concluiu o curso <strong>{course_name}</strong> com sucesso!</p>
                <p>Seu certificado está disponível para download.</p>
                <p>Continue aprendendo e evoluindo!</p>
                <p>Atenciosamente,<br>Equipe Fenix Academy</p>
            </body>
            </html>
            """,
            "text_content": """
            Parabéns!
            
            Olá {user_name},
            
            Você concluiu o curso {course_name} com sucesso!
            
            Seu certificado está disponível para download.
            
            Continue aprendendo e evoluindo!
            
            Atenciosamente,
            Equipe Fenix Academy
            """
        },
        "payment_success": {
            "subject": "💳 Pagamento Confirmado",
            "html_content": """
            <html>
            <body>
                <h1>💳 Pagamento Confirmado</h1>
                <p>Olá {user_name},</p>
                <p>Seu pagamento foi processado com sucesso!</p>
                <p>Plano: <strong>{plan_name}</strong></p>
                <p>Valor: <strong>${amount}</strong></p>
                <p>Obrigado por escolher a Fenix Academy!</p>
                <p>Atenciosamente,<br>Equipe Fenix Academy</p>
            </body>
            </html>
            """,
            "text_content": """
            Pagamento Confirmado
            
            Olá {user_name},
            
            Seu pagamento foi processado com sucesso!
            
            Plano: {plan_name}
            Valor: ${amount}
            
            Obrigado por escolher a Fenix Academy!
            
            Atenciosamente,
            Equipe Fenix Academy
            """
        }
    }
    
    for template_id, template in templates.items():
        email_templates_db[template_id] = template
    
    logger.info(f"Templates de email inicializados: {len(email_templates_db)}")

# Endpoints principais
@app.get("/", tags=["Root"])
async def root():
    """Endpoint raiz da API de notificações"""
    return {
        "message": "🔔 Fenix Academy - Notifications API",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "notifications": "/notifications/*",
            "messages": "/messages/*",
            "chat": "/chat/*",
            "email": "/email/*",
            "websocket": "/ws/{user_id}"
        }
    }

# Endpoints de notificações
@app.post("/notifications", tags=["Notifications"])
async def create_notification(notification: NotificationCreate):
    """Cria nova notificação"""
    notification_id = str(uuid.uuid4())
    
    new_notification = {
        "id": notification_id,
        "user_id": notification.user_id,
        "title": notification.title,
        "message": notification.message,
        "notification_type": notification.notification_type,
        "priority": notification.priority,
        "status": NotificationStatus.UNREAD,
        "data": notification.data or {},
        "created_at": datetime.utcnow().isoformat(),
        "expires_at": notification.expires_at.isoformat() if notification.expires_at else None,
        "read_at": None
    }
    
    notifications_db[notification_id] = new_notification
    
    # Enviar notificação em tempo real se usuário estiver online
    if notification.user_id in user_sessions:
        try:
            await user_sessions[notification.user_id].send_text(
                json.dumps({
                    "type": "notification",
                    "data": new_notification
                })
            )
        except Exception as e:
            logger.error(f"Erro ao enviar notificação em tempo real: {e}")
    
    logger.info(f"Notificação criada: {notification_id} para usuário {notification.user_id}")
    
    return {
        "message": "Notificação criada com sucesso",
        "notification": new_notification
    }

@app.get("/notifications/user/{user_id}", tags=["Notifications"])
async def get_user_notifications(
    user_id: str,
    status_filter: Optional[NotificationStatus] = None,
    limit: int = 50,
    offset: int = 0
):
    """Obtém notificações de um usuário"""
    user_notifications = [
        notif for notif in notifications_db.values()
        if notif["user_id"] == user_id
    ]
    
    # Filtrar por status se especificado
    if status_filter:
        user_notifications = [
            notif for notif in user_notifications
            if notif["status"] == status_filter
        ]
    
    # Ordenar por data de criação (mais recentes primeiro)
    user_notifications.sort(
        key=lambda x: x["created_at"],
        reverse=True
    )
    
    # Aplicar paginação
    total = len(user_notifications)
    paginated_notifications = user_notifications[offset:offset + limit]
    
    return {
        "user_id": user_id,
        "notifications": paginated_notifications,
        "total": total,
        "limit": limit,
        "offset": offset,
        "has_more": offset + limit < total
    }

@app.put("/notifications/{notification_id}/read", tags=["Notifications"])
async def mark_notification_read(notification_id: str):
    """Marca notificação como lida"""
    if notification_id not in notifications_db:
        raise HTTPException(
            status_code=404,
            detail="Notificação não encontrada"
        )
    
    notification = notifications_db[notification_id]
    notification["status"] = NotificationStatus.READ
    notification["read_at"] = datetime.utcnow().isoformat()
    
    logger.info(f"Notificação marcada como lida: {notification_id}")
    
    return {
        "message": "Notificação marcada como lida",
        "notification": notification
    }

@app.put("/notifications/{notification_id}/archive", tags=["Notifications"])
async def archive_notification(notification_id: str):
    """Arquiva uma notificação"""
    if notification_id not in notifications_db:
        raise HTTPException(
            status_code=404,
            detail="Notificação não encontrada"
        )
    
    notification = notifications_db[notification_id]
    notification["status"] = NotificationStatus.ARCHIVED
    
    logger.info(f"Notificação arquivada: {notification_id}")
    
    return {
        "message": "Notificação arquivada",
        "notification": notification
    }

@app.delete("/notifications/{notification_id}", tags=["Notifications"])
async def delete_notification(notification_id: str):
    """Remove uma notificação"""
    if notification_id not in notifications_db:
        raise HTTPException(
            status_code=404,
            detail="Notificação não encontrada"
        )
    
    del notifications_db[notification_id]
    
    logger.info(f"Notificação removida: {notification_id}")
    
    return {"message": "Notificação removida com sucesso"}

# Endpoints de mensagens
@app.post("/messages", tags=["Messages"])
async def create_message(message: MessageCreate):
    """Cria nova mensagem"""
    message_id = str(uuid.uuid4())
    
    new_message = {
        "id": message_id,
        "sender_id": message.sender_id,
        "receiver_id": message.receiver_id,
        "content": message.content,
        "message_type": message.message_type,
        "metadata": message.metadata or {},
        "created_at": datetime.utcnow().isoformat(),
        "read_at": None
    }
    
    messages_db[message_id] = new_message
    
    # Enviar mensagem em tempo real se destinatário estiver online
    if message.receiver_id in user_sessions:
        try:
            await user_sessions[message.receiver_id].send_text(
                json.dumps({
                    "type": "message",
                    "data": new_message
                })
            )
        except Exception as e:
            logger.error(f"Erro ao enviar mensagem em tempo real: {e}")
    
    logger.info(f"Mensagem criada: {message_id} de {message.sender_id} para {message.receiver_id}")
    
    return {
        "message": "Mensagem enviada com sucesso",
        "message_data": new_message
    }

@app.get("/messages/conversation/{user1_id}/{user2_id}", tags=["Messages"])
async def get_conversation(
    user1_id: str,
    user2_id: str,
    limit: int = 100,
    offset: int = 0
):
    """Obtém conversa entre dois usuários"""
    conversation_messages = [
        msg for msg in messages_db.values()
        if (msg["sender_id"] == user1_id and msg["receiver_id"] == user2_id) or
           (msg["sender_id"] == user2_id and msg["receiver_id"] == user1_id)
    ]
    
    # Ordenar por data de criação (mais antigas primeiro)
    conversation_messages.sort(key=lambda x: x["created_at"])
    
    # Aplicar paginação
    total = len(conversation_messages)
    paginated_messages = conversation_messages[offset:offset + limit]
    
    return {
        "conversation": {
            "user1_id": user1_id,
            "user2_id": user2_id
        },
        "messages": paginated_messages,
        "total": total,
        "limit": limit,
        "offset": offset,
        "has_more": offset + limit < total
    }

@app.put("/messages/{message_id}/read", tags=["Messages"])
async def mark_message_read(message_id: str):
    """Marca mensagem como lida"""
    if message_id not in messages_db:
        raise HTTPException(
            status_code=404,
            detail="Mensagem não encontrada"
        )
    
    message = messages_db[message_id]
    message["read_at"] = datetime.utcnow().isoformat()
    
    logger.info(f"Mensagem marcada como lida: {message_id}")
    
    return {
        "message": "Mensagem marcada como lida",
        "message_data": message
    }

# Endpoints de chat
@app.post("/chat/rooms", tags=["Chat"])
async def create_chat_room(chat_room: ChatRoomCreate):
    """Cria nova sala de chat"""
    room_id = str(uuid.uuid4())
    
    new_room = {
        "id": room_id,
        "name": chat_room.name,
        "description": chat_room.description,
        "is_public": chat_room.is_public,
        "max_members": chat_room.max_members,
        "created_by": "system",  # Em produção, usar ID do usuário atual
        "created_at": datetime.utcnow().isoformat(),
        "members": [],
        "messages": []
    }
    
    chat_rooms_db[room_id] = new_room
    
    logger.info(f"Sala de chat criada: {room_id}")
    
    return {
        "message": "Sala de chat criada com sucesso",
        "room": new_room
    }

@app.get("/chat/rooms", tags=["Chat"])
async def list_chat_rooms():
    """Lista salas de chat disponíveis"""
    public_rooms = [
        room for room in chat_rooms_db.values()
        if room["is_public"]
    ]
    
    return {
        "rooms": public_rooms,
        "total": len(public_rooms)
    }

@app.get("/chat/rooms/{room_id}", tags=["Chat"])
async def get_chat_room(room_id: str):
    """Obtém detalhes de uma sala de chat"""
    if room_id not in chat_rooms_db:
        raise HTTPException(
            status_code=404,
            detail="Sala de chat não encontrada"
        )
    
    return chat_rooms_db[room_id]

# WebSocket para comunicação em tempo real
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    """Endpoint WebSocket para comunicação em tempo real"""
    await websocket.accept()
    
    # Registrar sessão do usuário
    user_sessions[user_id] = websocket
    
    logger.info(f"Usuário {user_id} conectado via WebSocket")
    
    try:
        # Enviar notificação de conexão
        await websocket.send_text(
            json.dumps({
                "type": "connection",
                "data": {
                    "user_id": user_id,
                    "status": "connected",
                    "timestamp": datetime.utcnow().isoformat()
                }
            })
        )
        
        # Manter conexão ativa
        while True:
            # Aguardar mensagens do cliente
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Processar mensagem recebida
            await process_websocket_message(user_id, message, websocket)
            
    except WebSocketDisconnect:
        logger.info(f"Usuário {user_id} desconectado")
    except Exception as e:
        logger.error(f"Erro no WebSocket para usuário {user_id}: {e}")
    finally:
        # Remover sessão do usuário
        if user_id in user_sessions:
            del user_sessions[user_id]

async def process_websocket_message(user_id: str, message: Dict[str, Any], websocket: WebSocket):
    """Processa mensagem recebida via WebSocket"""
    message_type = message.get("type")
    
    try:
        if message_type == "ping":
            # Responder com pong para manter conexão ativa
            await websocket.send_text(
                json.dumps({
                    "type": "pong",
                    "timestamp": datetime.utcnow().isoformat()
                })
            )
        
        elif message_type == "join_room":
            # Usuário quer entrar em uma sala de chat
            room_id = message.get("room_id")
            if room_id and room_id in chat_rooms_db:
                room = chat_rooms_db[room_id]
                if user_id not in room["members"]:
                    room["members"].append(user_id)
                
                await websocket.send_text(
                    json.dumps({
                        "type": "room_joined",
                        "data": {
                            "room_id": room_id,
                            "room_name": room["name"]
                        }
                    })
                )
        
        elif message_type == "chat_message":
            # Usuário enviou mensagem para sala de chat
            room_id = message.get("room_id")
            content = message.get("content")
            
            if room_id and content and room_id in chat_rooms_db:
                room = chat_rooms_db[room_id]
                
                # Adicionar mensagem à sala
                chat_message = {
                    "id": str(uuid.uuid4()),
                    "sender_id": user_id,
                    "content": content,
                    "timestamp": datetime.utcnow().isoformat()
                }
                
                room["messages"].append(chat_message)
                
                # Enviar mensagem para todos os membros da sala
                for member_id in room["members"]:
                    if member_id in user_sessions and member_id != user_id:
                        try:
                            await user_sessions[member_id].send_text(
                                json.dumps({
                                    "type": "chat_message",
                                    "data": {
                                        "room_id": room_id,
                                        "message": chat_message
                                    }
                                })
                            )
                        except Exception as e:
                            logger.error(f"Erro ao enviar mensagem para {member_id}: {e}")
        
        else:
            logger.warning(f"Tipo de mensagem desconhecido: {message_type}")
            
    except Exception as e:
        logger.error(f"Erro ao processar mensagem WebSocket: {e}")
        await websocket.send_text(
            json.dumps({
                "type": "error",
                "data": {
                    "message": "Erro ao processar mensagem",
                    "error": str(e)
                }
            })
        )

# Endpoints de email
@app.post("/email/send", tags=["Email"])
async def send_email(
    to_email: str,
    template_id: str,
    variables: Dict[str, Any],
    background_tasks: BackgroundTasks
):
    """Envia email usando template"""
    if template_id not in email_templates_db:
        raise HTTPException(
            status_code=404,
            detail="Template de email não encontrado"
        )
    
    template = email_templates_db[template_id]
    
    # Adicionar tarefa de envio em background
    background_tasks.add_task(
        send_email_background,
        to_email,
        template,
        variables
    )
    
    return {
        "message": "Email agendado para envio",
        "template_id": template_id,
        "to_email": to_email
    }

async def send_email_background(to_email: str, template: Dict[str, str], variables: Dict[str, Any]):
    """Envia email em background"""
    try:
        # Substituir variáveis no template
        subject = template["subject"]
        html_content = template["html_content"]
        text_content = template["text_content"]
        
        for key, value in variables.items():
            placeholder = "{" + key + "}"
            subject = subject.replace(placeholder, str(value))
            html_content = html_content.replace(placeholder, str(value))
            text_content = text_content.replace(placeholder, str(value))
        
        # Criar mensagem
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = EMAIL_CONFIG["from_email"]
        msg["To"] = to_email
        
        # Adicionar conteúdo
        text_part = MIMEText(text_content, "plain")
        html_part = MIMEText(html_content, "html")
        
        msg.attach(text_part)
        msg.attach(html_part)
        
        # Enviar email
        with smtplib.SMTP(EMAIL_CONFIG["smtp_server"], EMAIL_CONFIG["smtp_port"]) as server:
            server.starttls()
            server.login(EMAIL_CONFIG["smtp_username"], EMAIL_CONFIG["smtp_password"])
            server.send_message(msg)
        
        logger.info(f"Email enviado com sucesso para: {to_email}")
        
    except Exception as e:
        logger.error(f"Erro ao enviar email para {to_email}: {e}")

@app.get("/email/templates", tags=["Email"])
async def list_email_templates():
    """Lista templates de email disponíveis"""
    return {
        "templates": list(email_templates_db.keys()),
        "total": len(email_templates_db)
    }

@app.get("/email/templates/{template_id}", tags=["Email"])
async def get_email_template(template_id: str):
    """Obtém template de email específico"""
    if template_id not in email_templates_db:
        raise HTTPException(
            status_code=404,
            detail="Template não encontrado"
        )
    
    return email_templates_db[template_id]

# Endpoints de sistema
@app.get("/health", tags=["System"])
async def health_check():
    """Verifica saúde do sistema de notificações"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "total_notifications": len(notifications_db),
        "total_messages": len(messages_db),
        "total_chat_rooms": len(chat_rooms_db),
        "active_connections": len(user_sessions),
        "email_templates": len(email_templates_db),
        "email_configured": bool(EMAIL_CONFIG["smtp_username"] and EMAIL_CONFIG["smtp_password"])
    }

@app.post("/notifications/bulk", tags=["Notifications"])
async def create_bulk_notifications(
    notifications: List[NotificationCreate],
    background_tasks: BackgroundTasks
):
    """Cria múltiplas notificações de uma vez"""
    created_notifications = []
    
    for notification in notifications:
        notification_id = str(uuid.uuid4())
        
        new_notification = {
            "id": notification_id,
            "user_id": notification.user_id,
            "title": notification.title,
            "message": notification.message,
            "notification_type": notification.notification_type,
            "priority": notification.priority,
            "status": NotificationStatus.UNREAD,
            "data": notification.data or {},
            "created_at": datetime.utcnow().isoformat(),
            "expires_at": notification.expires_at.isoformat() if notification.expires_at else None,
            "read_at": None
        }
        
        notifications_db[notification_id] = new_notification
        created_notifications.append(new_notification)
    
    # Enviar notificações em background
    background_tasks.add_task(send_bulk_notifications, created_notifications)
    
    logger.info(f"Notificações em massa criadas: {len(created_notifications)}")
    
    return {
        "message": f"{len(created_notifications)} notificações criadas com sucesso",
        "notifications": created_notifications
    }

async def send_bulk_notifications(notifications: List[Dict[str, Any]]):
    """Envia notificações em massa"""
    for notification in notifications:
        user_id = notification["user_id"]
        
        # Enviar notificação em tempo real se usuário estiver online
        if user_id in user_sessions:
            try:
                await user_sessions[user_id].send_text(
                    json.dumps({
                        "type": "notification",
                        "data": notification
                    })
                )
            except Exception as e:
                logger.error(f"Erro ao enviar notificação em massa para {user_id}: {e}")

# Inicializar dados padrão
initialize_email_templates()

if __name__ == "__main__":
    import uvicorn
    
    print("🔔 Iniciando API de Notificações...")
    print("=" * 50)
    print(f"📧 Templates de email: {len(email_templates_db)}")
    print(f"📧 Email configurado: {'Sim' if EMAIL_CONFIG['smtp_username'] else 'Não'}")
    print("=" * 50)
    
    uvicorn.run(
        "notifications:app",
        host="0.0.0.0",
        port=8005,
        reload=True,
        log_level="info"
    )
