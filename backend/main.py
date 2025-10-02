from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import jwt
import hashlib
import json
from datetime import datetime, timedelta
import os

app = FastAPI(title="Fenix Dev Academy API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT Secret (in production, use environment variable)
JWT_SECRET = os.getenv("JWT_SECRET", "your-jwt-secret-key")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Pydantic models
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    confirmPassword: str

class User(BaseModel):
    id: int
    name: str
    email: str
    role: str
    created_at: str

class AuthResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None
    user: Optional[User] = None

# In-memory user storage (in production, use a database)
users_db = {
    "admin@fenix.com": {
        "id": 1,
        "name": "Admin",
        "email": "admin@fenix.com",
        "password": "admin123",  # In production, hash passwords
        "role": "admin",
        "created_at": "2024-01-01T00:00:00Z"
    },
    "user@fenix.com": {
        "id": 2,
        "name": "Usuário",
        "email": "user@fenix.com",
        "password": "user123",
        "role": "user",
        "created_at": "2024-01-01T00:00:00Z"
    },
    "dev@fenix.com": {
        "id": 3,
        "name": "Instrutor",
        "email": "dev@fenix.com",
        "password": "dev123",
        "role": "instructor",
        "created_at": "2024-01-01T00:00:00Z"
    },
    "cezar@fenix.com": {
        "id": 4,
        "name": "Cezar Camara Lins",
        "email": "cezar@fenix.com",
        "password": "cezar123",
        "role": "premium_user",
        "created_at": "2024-01-01T00:00:00Z"
    },
    "fenixdevacademy@gmail.com": {
        "id": 5,
        "name": "Fenix Dev Academy",
        "email": "fenixdevacademy@gmail.com",
        "password": "060223Lk!",
        "role": "premium_user",
        "created_at": "2024-01-01T00:00:00Z"
    }
}

def create_jwt_token(user_data: dict) -> str:
    """Create JWT token for user"""
    payload = {
        "user_id": user_data["id"],
        "email": user_data["email"],
        "role": user_data["role"],
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> dict:
    """Verify JWT token and return user data"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "Fenix Dev Academy API is running",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }

@app.post("/api/auth/login", response_model=AuthResponse)
async def login(login_data: LoginRequest):
    """User login endpoint"""
    email = login_data.email
    password = login_data.password
    
    # Check if user exists
    if email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user = users_db[email]
    
    # Check password (in production, use proper password hashing)
    if user["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create JWT token
    token = create_jwt_token(user)
    
    # Return user data without password
    user_response = User(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"],
        created_at=user["created_at"]
    )
    
    return AuthResponse(
        success=True,
        message="Login successful",
        token=token,
        user=user_response
    )

@app.post("/api/auth/register", response_model=AuthResponse)
async def register(register_data: RegisterRequest):
    """User registration endpoint"""
    name = register_data.name
    email = register_data.email
    password = register_data.password
    confirm_password = register_data.confirmPassword
    
    # Validate input
    if not name or not email or not password:
        raise HTTPException(status_code=400, detail="All fields are required")
    
    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    if email in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create new user
    new_user_id = max([user["id"] for user in users_db.values()]) + 1
    new_user = {
        "id": new_user_id,
        "name": name,
        "email": email,
        "password": password,  # In production, hash the password
        "role": "user",
        "created_at": datetime.utcnow().isoformat()
    }
    
    users_db[email] = new_user
    
    # Create JWT token
    token = create_jwt_token(new_user)
    
    # Return user data without password
    user_response = User(
        id=new_user["id"],
        name=new_user["name"],
        email=new_user["email"],
        role=new_user["role"],
        created_at=new_user["created_at"]
    )
    
    return AuthResponse(
        success=True,
        message="Registration successful",
        token=token,
        user=user_response
    )

@app.get("/api/auth/verify")
async def verify_token(authorization: Optional[str] = Header(None)):
    """Verify JWT token endpoint"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token required")
    
    token = authorization.split(" ")[1]
    
    try:
        payload = verify_jwt_token(token)
        user_email = payload.get("email")
        
        if user_email not in users_db:
            raise HTTPException(status_code=401, detail="User not found")
        
        user = users_db[user_email]
        user_response = User(
            id=user["id"],
            name=user["name"],
            email=user["email"],
            role=user["role"],
            created_at=user["created_at"]
        )
        
        return {
            "success": True,
            "message": "Token valid",
            "user": user_response
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/api/user/profile")
async def get_user_profile(authorization: Optional[str] = Header(None)):
    """Get complete user profile data"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token required")
    
    token = authorization.split(" ")[1]
    
    try:
        payload = verify_jwt_token(token)
        user_email = payload.get("email")
        
        if user_email not in users_db:
            raise HTTPException(status_code=401, detail="User not found")
        
        user = users_db[user_email]
        
        # Dados completos do usuário
        profile_data = {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "created_at": user["created_at"],
            "last_login": user.get("last_login"),
            "phone": user.get("phone"),
            "city": user.get("city"),
            "state": user.get("state"),
            "country": user.get("country"),
            "bio": user.get("bio"),
            "skills": user.get("skills", []),
            "interests": user.get("interests", []),
            "avatar": user.get("avatar")
        }
        
        return {
            "success": True,
            "data": profile_data
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.put("/api/user/profile")
async def update_user_profile(
    profile_data: dict,
    authorization: Optional[str] = Header(None)
):
    """Update user profile data"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token required")
    
    token = authorization.split(" ")[1]
    
    try:
        payload = verify_jwt_token(token)
        user_email = payload.get("email")
        
        if user_email not in users_db:
            raise HTTPException(status_code=401, detail="User not found")
        
        user = users_db[user_email]
        
        # Atualizar dados permitidos
        allowed_fields = ["name", "phone", "city", "state", "country", "bio", "skills", "interests"]
        for field in allowed_fields:
            if field in profile_data:
                user[field] = profile_data[field]
        
        return {
            "success": True,
            "message": "Profile updated successfully",
            "data": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "role": user["role"],
                "created_at": user["created_at"],
                "last_login": user.get("last_login"),
                "phone": user.get("phone"),
                "city": user.get("city"),
                "state": user.get("state"),
                "country": user.get("country"),
                "bio": user.get("bio"),
                "skills": user.get("skills", []),
                "interests": user.get("interests", []),
                "avatar": user.get("avatar")
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/api/user/dashboard")
async def get_user_dashboard(authorization: Optional[str] = Header(None)):
    """Get user dashboard data"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token required")
    
    token = authorization.split(" ")[1]
    
    try:
        payload = verify_jwt_token(token)
        user_email = payload.get("email")
        
        if user_email not in users_db:
            raise HTTPException(status_code=401, detail="User not found")
        
        user = users_db[user_email]
        
        # Dados do dashboard baseados no usuário real
        if user["email"] in ["cezar@fenix.com", "fenixdevacademy@gmail.com"]:
            # Usuários Premium - Acesso completo a todos os cursos da Fênix
            dashboard_data = {
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "email": user["email"],
                    "role": user["role"],
                    "created_at": user["created_at"],
                    "last_login": user.get("last_login")
                },
                "stats": {
                    "total_courses": 25,
                    "completed_courses": 8,
                    "in_progress_courses": 4,
                    "total_hours": 180,
                    "certificates": 8,
                    "streak": 25
                },
            "recent_activity": [
                {
                    "id": "1",
                    "type": "course",
                    "title": "React Avançado",
                    "description": f"Concluiu a lição sobre Hooks Customizados",
                    "timestamp": datetime.utcnow().isoformat(),
                    "status": "completed"
                },
                {
                    "id": "2",
                    "type": "quiz",
                    "title": "JavaScript ES6+",
                    "description": f"Completou o quiz com 95% de acerto",
                    "timestamp": (datetime.utcnow() - timedelta(days=1)).isoformat(),
                    "status": "completed"
                },
                {
                    "id": "3",
                    "type": "course",
                    "title": "Node.js Backend",
                    "description": f"Iniciou o módulo sobre Express.js",
                    "timestamp": (datetime.utcnow() - timedelta(days=2)).isoformat(),
                    "status": "in_progress"
                }
            ],
            "courses": [
                {
                    "id": "fundamentos-programacao",
                    "title": "Fundamentos de Programação",
                    "description": "Aprenda os conceitos básicos da programação",
                    "progress": 100,
                    "duration": "20h",
                    "level": "beginner",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": datetime.utcnow().isoformat()
                },
                {
                    "id": "html-css-basico",
                    "title": "HTML e CSS Básico",
                    "description": "Criação de páginas web com HTML e CSS",
                    "progress": 100,
                    "duration": "15h",
                    "level": "beginner",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=1)).isoformat()
                },
                {
                    "id": "javascript-fundamentos",
                    "title": "JavaScript Fundamentos",
                    "description": "Aprenda JavaScript do zero",
                    "progress": 100,
                    "duration": "30h",
                    "level": "beginner",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=2)).isoformat()
                },
                {
                    "id": "javascript-es6",
                    "title": "JavaScript ES6+",
                    "description": "Modern JavaScript com ES6, ES7, ES8 e ES9",
                    "progress": 100,
                    "duration": "25h",
                    "level": "intermediate",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=3)).isoformat()
                },
                {
                    "id": "react-fundamentos",
                    "title": "React Fundamentos",
                    "description": "Aprenda React do básico ao avançado",
                    "progress": 85,
                    "duration": "40h",
                    "level": "intermediate",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": datetime.utcnow().isoformat()
                },
                {
                    "id": "react-advanced",
                    "title": "React Avançado",
                    "description": "Aprenda React com Hooks, Context API e Performance",
                    "progress": 60,
                    "duration": "35h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=1)).isoformat()
                },
                {
                    "id": "nodejs-fundamentos",
                    "title": "Node.js Fundamentos",
                    "description": "Desenvolvimento backend com Node.js",
                    "progress": 100,
                    "duration": "30h",
                    "level": "intermediate",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=4)).isoformat()
                },
                {
                    "id": "nodejs-backend",
                    "title": "Node.js Backend Avançado",
                    "description": "Desenvolvimento de APIs com Node.js e Express",
                    "progress": 45,
                    "duration": "35h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=2)).isoformat()
                },
                {
                    "id": "python-fundamentos",
                    "title": "Python Fundamentos",
                    "description": "Aprenda Python do básico ao intermediário",
                    "progress": 100,
                    "duration": "25h",
                    "level": "beginner",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=5)).isoformat()
                },
                {
                    "id": "python-avancado",
                    "title": "Python Avançado",
                    "description": "Python avançado com OOP e frameworks",
                    "progress": 30,
                    "duration": "40h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=3)).isoformat()
                },
                {
                    "id": "django-fundamentos",
                    "title": "Django Fundamentos",
                    "description": "Desenvolvimento web com Django",
                    "progress": 0,
                    "duration": "35h",
                    "level": "intermediate",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "flask-avancado",
                    "title": "Flask Avançado",
                    "description": "Desenvolvimento de APIs com Flask",
                    "progress": 0,
                    "duration": "30h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "sql-fundamentos",
                    "title": "SQL Fundamentos",
                    "description": "Banco de dados e consultas SQL",
                    "progress": 100,
                    "duration": "20h",
                    "level": "beginner",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=6)).isoformat()
                },
                {
                    "id": "postgresql-avancado",
                    "title": "PostgreSQL Avançado",
                    "description": "Banco de dados PostgreSQL avançado",
                    "progress": 0,
                    "duration": "25h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "mongodb-fundamentos",
                    "title": "MongoDB Fundamentos",
                    "description": "Banco de dados NoSQL com MongoDB",
                    "progress": 0,
                    "duration": "20h",
                    "level": "intermediate",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "git-github",
                    "title": "Git e GitHub",
                    "description": "Controle de versão com Git e GitHub",
                    "progress": 100,
                    "duration": "15h",
                    "level": "beginner",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": (datetime.utcnow() - timedelta(days=7)).isoformat()
                },
                {
                    "id": "docker-fundamentos",
                    "title": "Docker Fundamentos",
                    "description": "Containerização com Docker",
                    "progress": 0,
                    "duration": "20h",
                    "level": "intermediate",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "kubernetes-avancado",
                    "title": "Kubernetes Avançado",
                    "description": "Orquestração de containers com Kubernetes",
                    "progress": 0,
                    "duration": "35h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "aws-fundamentos",
                    "title": "AWS Fundamentos",
                    "description": "Cloud computing com Amazon Web Services",
                    "progress": 0,
                    "duration": "40h",
                    "level": "intermediate",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "azure-avancado",
                    "title": "Azure Avançado",
                    "description": "Microsoft Azure para desenvolvedores",
                    "progress": 0,
                    "duration": "35h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "data-science-python",
                    "title": "Data Science com Python",
                    "description": "Análise de dados e machine learning",
                    "progress": 0,
                    "duration": "50h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "machine-learning",
                    "title": "Machine Learning",
                    "description": "Inteligência artificial e ML",
                    "progress": 0,
                    "duration": "45h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "cybersecurity-fundamentos",
                    "title": "Cybersecurity Fundamentos",
                    "description": "Segurança da informação e cibersegurança",
                    "progress": 0,
                    "duration": "30h",
                    "level": "intermediate",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "mobile-react-native",
                    "title": "React Native",
                    "description": "Desenvolvimento mobile com React Native",
                    "progress": 0,
                    "duration": "40h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                },
                {
                    "id": "flutter-avancado",
                    "title": "Flutter Avançado",
                    "description": "Desenvolvimento mobile com Flutter",
                    "progress": 0,
                    "duration": "35h",
                    "level": "advanced",
                    "thumbnail": "/api/placeholder/300/200",
                    "last_accessed": None
                }
            ]
        }
        else:
            # Outros usuários - dados padrão baseados no role
            dashboard_data = {
                "user": {
                    "id": user["id"],
                    "name": user["name"],
                    "email": user["email"],
                    "role": user["role"],
                    "created_at": user["created_at"],
                    "last_login": user.get("last_login")
                },
                "stats": {
                    "total_courses": 8 if user["role"] == "user" else 15 if user["role"] == "admin" else 12,
                    "completed_courses": 3 if user["role"] == "user" else 12 if user["role"] == "admin" else 8,
                    "in_progress_courses": 5 if user["role"] == "user" else 3 if user["role"] == "admin" else 4,
                    "total_hours": 45 if user["role"] == "user" else 120 if user["role"] == "admin" else 80,
                    "certificates": 3 if user["role"] == "user" else 12 if user["role"] == "admin" else 8,
                    "streak": 7 if user["role"] == "user" else 15 if user["role"] == "admin" else 10
                },
                "recent_activity": [
                    {
                        "id": "1",
                        "type": "course",
                        "title": "React Avançado",
                        "description": f"Concluiu a lição sobre Hooks Customizados",
                        "timestamp": datetime.utcnow().isoformat(),
                        "status": "completed"
                    },
                    {
                        "id": "2",
                        "type": "quiz",
                        "title": "JavaScript ES6+",
                        "description": f"Completou o quiz com 95% de acerto",
                        "timestamp": (datetime.utcnow() - timedelta(days=1)).isoformat(),
                        "status": "completed"
                    },
                    {
                        "id": "3",
                        "type": "course",
                        "title": "Node.js Backend",
                        "description": f"Iniciou o módulo sobre Express.js",
                        "timestamp": (datetime.utcnow() - timedelta(days=2)).isoformat(),
                        "status": "in_progress"
                    }
                ],
                "courses": [
                    {
                        "id": "react-advanced",
                        "title": "React Avançado",
                        "description": "Aprenda React com Hooks, Context API e Performance",
                        "progress": 85,
                        "duration": "40h",
                        "level": "advanced",
                        "thumbnail": "/api/placeholder/300/200",
                        "last_accessed": datetime.utcnow().isoformat()
                    },
                    {
                        "id": "javascript-es6",
                        "title": "JavaScript ES6+",
                        "description": "Modern JavaScript com ES6, ES7, ES8 e ES9",
                        "progress": 100,
                        "duration": "25h",
                        "level": "intermediate",
                        "thumbnail": "/api/placeholder/300/200",
                        "last_accessed": (datetime.utcnow() - timedelta(days=1)).isoformat()
                    },
                    {
                        "id": "nodejs-backend",
                        "title": "Node.js Backend",
                        "description": "Desenvolvimento de APIs com Node.js e Express",
                        "progress": 45,
                        "duration": "35h",
                        "level": "intermediate",
                        "thumbnail": "/api/placeholder/300/200",
                        "last_accessed": (datetime.utcnow() - timedelta(days=2)).isoformat()
                    }
                ]
            }
        
        return {
            "success": True,
            "data": dashboard_data
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3002)
