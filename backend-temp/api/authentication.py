#!/usr/bin/env python3
"""
Sistema de Autenticação para Projetos Colaborativos - Fenix Academy
JWT, Roles, Permissões e Gerenciamento de Usuários
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict, Union
import jwt
import bcrypt
import uuid
from datetime import datetime, timedelta
import logging
import json
import os
from enum import Enum

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar FastAPI
app = FastAPI(
    title="Fenix Academy - Authentication API",
    description="Sistema de autenticação para projetos colaborativos",
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

# Configurações de segurança
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fenix_academy_secret_key_2024")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Inicializar security
security = HTTPBearer()

# Enums
class UserRole(str, Enum):
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"
    PROJECT_LEADER = "project_leader"
    PROJECT_MEMBER = "project_member"

class ProjectRole(str, Enum):
    LEADER = "leader"
    DEVELOPER = "developer"
    DESIGNER = "designer"
    TESTER = "tester"
    DOCUMENTER = "documenter"

class Permission(str, Enum):
    # Permissões de usuário
    READ_PROFILE = "read_profile"
    UPDATE_PROFILE = "update_profile"
    DELETE_PROFILE = "delete_profile"
    
    # Permissões de projeto
    CREATE_PROJECT = "create_project"
    JOIN_PROJECT = "join_project"
    LEAVE_PROJECT = "leave_project"
    DELETE_PROJECT = "delete_project"
    
    # Permissões de conteúdo
    CREATE_CONTENT = "create_content"
    EDIT_CONTENT = "edit_content"
    DELETE_CONTENT = "delete_content"
    VIEW_CONTENT = "view_content"
    
    # Permissões administrativas
    MANAGE_USERS = "manage_users"
    MANAGE_PROJECTS = "manage_projects"
    VIEW_ANALYTICS = "view_analytics"

# Modelos Pydantic
class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    full_name: str = Field(..., min_length=2, max_length=100)
    role: UserRole = UserRole.STUDENT

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    confirm_password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    bio: Optional[str] = Field(None, max_length=500)
    avatar_url: Optional[str] = None

class UserResponse(UserBase):
    id: str
    username: str
    full_name: str
    role: UserRole
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime] = None
    permissions: List[Permission]

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class ProjectBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=10, max_length=1000)
    course_id: str
    max_members: int = Field(5, ge=2, le=20)
    is_public: bool = True

class ProjectCreate(ProjectBase):
    pass

class ProjectMember(BaseModel):
    user_id: str
    role: ProjectRole
    joined_at: datetime
    permissions: List[Permission]

class ProjectResponse(ProjectBase):
    id: str
    leader_id: str
    members: List[ProjectMember]
    created_at: datetime
    updated_at: datetime
    status: str
    tags: List[str]

class ProjectJoinRequest(BaseModel):
    project_id: str
    user_id: str
    role: ProjectRole
    message: Optional[str] = None

# Banco de dados em memória (em produção, usar PostgreSQL/MongoDB)
users_db: Dict[str, Dict] = {}
projects_db: Dict[str, Dict] = {}
refresh_tokens_db: Dict[str, Dict] = {}

# Mapeamento de roles para permissões
ROLE_PERMISSIONS = {
    UserRole.STUDENT: [
        Permission.READ_PROFILE,
        Permission.UPDATE_PROFILE,
        Permission.JOIN_PROJECT,
        Permission.LEAVE_PROJECT,
        Permission.VIEW_CONTENT
    ],
    UserRole.INSTRUCTOR: [
        Permission.READ_PROFILE,
        Permission.UPDATE_PROFILE,
        Permission.CREATE_PROJECT,
        Permission.JOIN_PROJECT,
        Permission.LEAVE_PROJECT,
        Permission.CREATE_CONTENT,
        Permission.EDIT_CONTENT,
        Permission.DELETE_CONTENT,
        Permission.VIEW_CONTENT,
        Permission.VIEW_ANALYTICS
    ],
    UserRole.ADMIN: [
        Permission.READ_PROFILE,
        Permission.UPDATE_PROFILE,
        Permission.DELETE_PROFILE,
        Permission.CREATE_PROJECT,
        Permission.JOIN_PROJECT,
        Permission.LEAVE_PROJECT,
        Permission.DELETE_PROJECT,
        Permission.CREATE_CONTENT,
        Permission.EDIT_CONTENT,
        Permission.DELETE_CONTENT,
        Permission.VIEW_CONTENT,
        Permission.MANAGE_USERS,
        Permission.MANAGE_PROJECTS,
        Permission.VIEW_ANALYTICS
    ],
    UserRole.PROJECT_LEADER: [
        Permission.READ_PROFILE,
        Permission.UPDATE_PROFILE,
        Permission.CREATE_PROJECT,
        Permission.JOIN_PROJECT,
        Permission.LEAVE_PROJECT,
        Permission.CREATE_CONTENT,
        Permission.EDIT_CONTENT,
        Permission.DELETE_CONTENT,
        Permission.VIEW_CONTENT
    ]
}

# Funções de utilidade
def hash_password(password: str) -> str:
    """Hash de senha com bcrypt"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Verifica senha com bcrypt"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Cria token JWT de acesso"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict):
    """Cria token JWT de refresh"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Dict:
    """Verifica e decodifica token JWT"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expirado"
        )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )

def get_user_permissions(user_role: UserRole) -> List[Permission]:
    """Retorna permissões baseadas no role do usuário"""
    return ROLE_PERMISSIONS.get(user_role, [])

# Dependências
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict:
    """Obtém usuário atual baseado no token"""
    token = credentials.credentials
    payload = verify_token(token)
    user_id = payload.get("sub")
    
    if user_id is None or user_id not in users_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não encontrado"
        )
    
    return users_db[user_id]

async def get_current_active_user(current_user: Dict = Depends(get_current_user)) -> Dict:
    """Verifica se usuário está ativo"""
    if not current_user.get("is_active"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuário inativo"
        )
    return current_user

def require_permission(permission: Permission):
    """Decorator para verificar permissão específica"""
    async def permission_checker(current_user: Dict = Depends(get_current_active_user)):
        user_permissions = current_user.get("permissions", [])
        if permission not in user_permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permissão '{permission}' necessária"
            )
        return current_user
    return permission_checker

# Endpoints de autenticação
@app.post("/auth/register", response_model=UserResponse, tags=["Authentication"])
async def register_user(user: UserCreate):
    """Registra novo usuário"""
    # Validar confirmação de senha
    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Senhas não coincidem"
        )
    
    # Verificar se email já existe
    for existing_user in users_db.values():
        if existing_user["email"] == user.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email já registrado"
            )
    
    # Verificar se username já existe
    for existing_user in users_db.values():
        if existing_user["username"] == user.username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username já existe"
            )
    
    # Criar usuário
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user.password)
    permissions = get_user_permissions(user.role)
    
    new_user = {
        "id": user_id,
        "email": user.email,
        "username": user.username,
        "full_name": user.full_name,
        "role": user.role,
        "password_hash": hashed_password,
        "bio": None,
        "avatar_url": None,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "last_login": None,
        "permissions": permissions
    }
    
    users_db[user_id] = new_user
    
    logger.info(f"Usuário registrado: {user.email}")
    
    # Retornar usuário sem senha
    user_response = new_user.copy()
    del user_response["password_hash"]
    return UserResponse(**user_response)

@app.post("/auth/login", response_model=Token, tags=["Authentication"])
async def login_user(user_credentials: UserLogin):
    """Autentica usuário e retorna tokens"""
    # Buscar usuário por email
    user = None
    for u in users_db.values():
        if u["email"] == user_credentials.email:
            user = u
            break
    
    if not user or not verify_password(user_credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos"
        )
    
    if not user["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuário inativo"
        )
    
    # Atualizar último login
    user["last_login"] = datetime.utcnow()
    
    # Criar tokens
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["id"], "role": user["role"]},
        expires_delta=access_token_expires
    )
    
    refresh_token = create_refresh_token(data={"sub": user["id"]})
    
    # Armazenar refresh token
    refresh_tokens_db[refresh_token] = {
        "user_id": user["id"],
        "created_at": datetime.utcnow()
    }
    
    logger.info(f"Usuário logado: {user['email']}")
    
    # Retornar tokens e dados do usuário
    user_response = user.copy()
    del user_response["password_hash"]
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=UserResponse(**user_response)
    )

@app.post("/auth/refresh", response_model=Token, tags=["Authentication"])
async def refresh_access_token(refresh_request: RefreshTokenRequest):
    """Renova token de acesso usando refresh token"""
    try:
        payload = jwt.decode(refresh_request.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        token_type = payload.get("type")
        
        if user_id is None or token_type != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token inválido"
            )
        
        if user_id not in users_db:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuário não encontrado"
            )
        
        user = users_db[user_id]
        
        # Criar novo access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user["id"], "role": user["role"]},
            expires_delta=access_token_expires
        )
        
        # Criar novo refresh token
        new_refresh_token = create_refresh_token(data={"sub": user["id"]})
        
        # Remover refresh token antigo e adicionar novo
        if refresh_request.refresh_token in refresh_tokens_db:
            del refresh_tokens_db[refresh_request.refresh_token]
        
        refresh_tokens_db[new_refresh_token] = {
            "user_id": user["id"],
            "created_at": datetime.utcnow()
        }
        
        # Retornar novos tokens
        user_response = user.copy()
        del user_response["password_hash"]
        
        return Token(
            access_token=access_token,
            refresh_token=new_refresh_token,
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=UserResponse(**user_response)
        )
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token expirado"
        )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token inválido"
        )

@app.post("/auth/logout", tags=["Authentication"])
async def logout_user(current_user: Dict = Depends(get_current_user)):
    """Logout do usuário (invalida refresh token)"""
    # Em produção, implementar blacklist de tokens
    # Por enquanto, apenas retorna sucesso
    logger.info(f"Usuário deslogado: {current_user['email']}")
    return {"message": "Logout realizado com sucesso"}

# Endpoints de usuário
@app.get("/users/me", response_model=UserResponse, tags=["Users"])
async def get_current_user_info(current_user: Dict = Depends(get_current_active_user)):
    """Obtém informações do usuário atual"""
    user_response = current_user.copy()
    del user_response["password_hash"]
    return UserResponse(**user_response)

@app.put("/users/me", response_model=UserResponse, tags=["Users"])
async def update_current_user(
    user_update: UserUpdate,
    current_user: Dict = Depends(get_current_active_user)
):
    """Atualiza informações do usuário atual"""
    # Verificar se username já existe (se foi alterado)
    if user_update.username and user_update.username != current_user["username"]:
        for user in users_db.values():
            if user["username"] == user_update.username and user["id"] != current_user["id"]:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username já existe"
                )
    
    # Atualizar campos
    if user_update.username:
        current_user["username"] = user_update.username
    if user_update.full_name:
        current_user["full_name"] = user_update.full_name
    if user_update.bio is not None:
        current_user["bio"] = user_update.bio
    if user_update.avatar_url is not None:
        current_user["avatar_url"] = user_update.avatar_url
    
    logger.info(f"Usuário atualizado: {current_user['email']}")
    
    user_response = current_user.copy()
    del user_response["password_hash"]
    return UserResponse(**user_response)

@app.get("/users/{user_id}", response_model=UserResponse, tags=["Users"])
async def get_user_by_id(
    user_id: str,
    current_user: Dict = Depends(get_current_active_user)
):
    """Obtém informações de um usuário específico"""
    if user_id not in users_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    user = users_db[user_id]
    user_response = user.copy()
    del user_response["password_hash"]
    return UserResponse(**user_response)

# Endpoints de projeto
@app.post("/projects", response_model=ProjectResponse, tags=["Projects"])
async def create_project(
    project: ProjectCreate,
    current_user: Dict = Depends(require_permission(Permission.CREATE_PROJECT))
):
    """Cria novo projeto colaborativo"""
    project_id = str(uuid.uuid4())
    
    # Criar projeto
    new_project = {
        "id": project_id,
        "name": project.name,
        "description": project.description,
        "course_id": project.course_id,
        "max_members": project.max_members,
        "is_public": project.is_public,
        "leader_id": current_user["id"],
        "members": [
            {
                "user_id": current_user["id"],
                "role": ProjectRole.LEADER,
                "joined_at": datetime.utcnow(),
                "permissions": [Permission.CREATE_CONTENT, Permission.EDIT_CONTENT, Permission.DELETE_CONTENT, Permission.VIEW_CONTENT]
            }
        ],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "status": "active",
        "tags": []
    }
    
    projects_db[project_id] = new_project
    
    logger.info(f"Projeto criado: {project.name} por {current_user['email']}")
    
    return ProjectResponse(**new_project)

@app.get("/projects", response_model=List[ProjectResponse], tags=["Projects"])
async def list_projects(
    current_user: Dict = Depends(get_current_active_user),
    course_id: Optional[str] = None,
    is_public: Optional[bool] = None
):
    """Lista projetos disponíveis"""
    projects = []
    
    for project in projects_db.values():
        # Filtrar por curso se especificado
        if course_id and project["course_id"] != course_id:
            continue
        
        # Filtrar por visibilidade se especificado
        if is_public is not None and project["is_public"] != is_public:
            continue
        
        # Verificar se usuário pode ver o projeto
        if project["is_public"] or current_user["id"] in [m["user_id"] for m in project["members"]]:
            projects.append(project)
    
    return [ProjectResponse(**project) for project in projects]

@app.get("/projects/{project_id}", response_model=ProjectResponse, tags=["Projects"])
async def get_project(
    project_id: str,
    current_user: Dict = Depends(get_current_active_user)
):
    """Obtém detalhes de um projeto específico"""
    if project_id not in projects_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Projeto não encontrado"
        )
    
    project = projects_db[project_id]
    
    # Verificar se usuário pode ver o projeto
    if not project["is_public"] and current_user["id"] not in [m["user_id"] for m in project["members"]]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado ao projeto"
        )
    
    return ProjectResponse(**project)

@app.post("/projects/{project_id}/join", tags=["Projects"])
async def join_project(
    project_id: str,
    join_request: ProjectJoinRequest,
    current_user: Dict = Depends(require_permission(Permission.JOIN_PROJECT))
):
    """Entra em um projeto colaborativo"""
    if project_id not in projects_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Projeto não encontrado"
        )
    
    project = projects_db[project_id]
    
    # Verificar se projeto está ativo
    if project["status"] != "active":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Projeto não está ativo"
        )
    
    # Verificar se usuário já é membro
    if current_user["id"] in [m["user_id"] for m in project["members"]]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuário já é membro do projeto"
        )
    
    # Verificar limite de membros
    if len(project["members"]) >= project["max_members"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Projeto atingiu limite de membros"
        )
    
    # Adicionar membro
    new_member = {
        "user_id": current_user["id"],
        "role": join_request.role,
        "joined_at": datetime.utcnow(),
        "permissions": [Permission.VIEW_CONTENT]  # Permissões básicas para novos membros
    }
    
    project["members"].append(new_member)
    project["updated_at"] = datetime.utcnow()
    
    logger.info(f"Usuário {current_user['email']} entrou no projeto {project['name']}")
    
    return {
        "message": "Usuário adicionado ao projeto com sucesso",
        "project": ProjectResponse(**project)
    }

@app.post("/projects/{project_id}/leave", tags=["Projects"])
async def leave_project(
    project_id: str,
    current_user: Dict = Depends(require_permission(Permission.LEAVE_PROJECT))
):
    """Sai de um projeto colaborativo"""
    if project_id not in projects_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Projeto não encontrado"
        )
    
    project = projects_db[project_id]
    
    # Verificar se usuário é membro
    member_index = None
    for i, member in enumerate(project["members"]):
        if member["user_id"] == current_user["id"]:
            member_index = i
            break
    
    if member_index is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuário não é membro do projeto"
        )
    
    # Verificar se é o líder
    if project["leader_id"] == current_user["id"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Líder não pode sair do projeto. Transfira a liderança primeiro."
        )
    
    # Remover membro
    project["members"].pop(member_index)
    project["updated_at"] = datetime.utcnow()
    
    logger.info(f"Usuário {current_user['email']} saiu do projeto {project['name']}")
    
    return {"message": "Usuário removido do projeto com sucesso"}

# Endpoints administrativos
@app.get("/admin/users", response_model=List[UserResponse], tags=["Admin"])
async def list_all_users(
    current_user: Dict = Depends(require_permission(Permission.MANAGE_USERS))
):
    """Lista todos os usuários (apenas admin)"""
    users = []
    for user in users_db.values():
        user_response = user.copy()
        del user_response["password_hash"]
        users.append(UserResponse(**user_response))
    
    return users

@app.put("/admin/users/{user_id}/role", tags=["Admin"])
async def update_user_role(
    user_id: str,
    new_role: UserRole,
    current_user: Dict = Depends(require_permission(Permission.MANAGE_USERS))
):
    """Atualiza role de um usuário (apenas admin)"""
    if user_id not in users_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    user = users_db[user_id]
    old_role = user["role"]
    user["role"] = new_role
    user["permissions"] = get_user_permissions(new_role)
    
    logger.info(f"Role do usuário {user['email']} alterado de {old_role} para {new_role} por {current_user['email']}")
    
    return {
        "message": f"Role atualizado com sucesso de {old_role} para {new_role}",
        "user": UserResponse(**{k: v for k, v in user.items() if k != "password_hash"})
    }

# Endpoints de sistema
@app.get("/health", tags=["System"])
async def health_check():
    """Verifica saúde do sistema de autenticação"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "total_users": len(users_db),
        "total_projects": len(projects_db),
        "active_refresh_tokens": len(refresh_tokens_db)
    }

@app.get("/", tags=["Root"])
async def root():
    """Endpoint raiz da API de autenticação"""
    return {
        "message": "🔐 Fenix Academy - Authentication API",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "auth": "/auth/*",
            "users": "/users/*",
            "projects": "/projects/*",
            "admin": "/admin/*"
        }
    }

# Inicializar dados de exemplo
def initialize_sample_data():
    """Inicializa dados de exemplo para desenvolvimento"""
    if not users_db:
        # Criar usuário admin
        admin_id = str(uuid.uuid4())
        admin_permissions = get_user_permissions(UserRole.ADMIN)
        
        users_db[admin_id] = {
            "id": admin_id,
            "email": "admin@fenix.academy",
            "username": "admin",
            "full_name": "Administrador Fenix",
            "role": UserRole.ADMIN,
            "password_hash": hash_password("admin123"),
            "bio": "Administrador da plataforma Fenix Academy",
            "avatar_url": None,
            "is_active": True,
            "created_at": datetime.utcnow(),
            "last_login": None,
            "permissions": admin_permissions
        }
        
        # Criar usuário instrutor
        instructor_id = str(uuid.uuid4())
        instructor_permissions = get_user_permissions(UserRole.INSTRUCTOR)
        
        users_db[instructor_id] = {
            "id": instructor_id,
            "email": "instructor@fenix.academy",
            "username": "instructor",
            "full_name": "Instrutor Fenix",
            "role": UserRole.INSTRUCTOR,
            "password_hash": hash_password("instructor123"),
            "bio": "Instrutor da plataforma Fenix Academy",
            "avatar_url": None,
            "is_active": True,
            "created_at": datetime.utcnow(),
            "last_login": None,
            "permissions": instructor_permissions
        }
        
        # Criar usuário estudante
        student_id = str(uuid.uuid4())
        student_permissions = get_user_permissions(UserRole.STUDENT)
        
        users_db[student_id] = {
            "id": student_id,
            "email": "student@fenix.academy",
            "username": "student",
            "full_name": "Estudante Fenix",
            "role": UserRole.STUDENT,
            "password_hash": hash_password("student123"),
            "bio": "Estudante da plataforma Fenix Academy",
            "avatar_url": None,
            "is_active": True,
            "created_at": datetime.utcnow(),
            "last_login": None,
            "permissions": student_permissions
        }
        
        logger.info("Dados de exemplo inicializados")

# Inicializar dados ao importar
initialize_sample_data()

if __name__ == "__main__":
    import uvicorn
    
    print("🔐 Iniciando API de Autenticação...")
    print("=" * 50)
    print(f"👥 Usuários criados: {len(users_db)}")
    print(f"📊 Projetos: {len(projects_db)}")
    print("=" * 50)
    
    uvicorn.run(
        "authentication:app",
        host="0.0.0.0",
        port=8002,
        reload=True,
        log_level="info"
    )
