#!/usr/bin/env python3
"""
API para Execução de Código - Fenix Academy
Integração com o motor de execução de código real
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict
import asyncio
import json
import logging
from datetime import datetime
import uuid

# Importar o motor de execução
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from code_execution_engine import CodeExecutionEngine, CodeExecutionRequest, Language

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar FastAPI
app = FastAPI(
    title="Fenix Academy - Code Execution API",
    description="API para execução segura de código em múltiplas linguagens",
    version="2.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar motor de execução
code_engine = CodeExecutionEngine()

# Modelos Pydantic
class CodeExecutionRequestModel(BaseModel):
    code: str = Field(..., description="Código fonte para execução")
    language: str = Field(..., description="Linguagem de programação")
    input_data: Optional[str] = Field(None, description="Dados de entrada para o programa")
    timeout: int = Field(30, description="Timeout em segundos", ge=1, le=300)
    memory_limit: str = Field("512m", description="Limite de memória")
    user_id: Optional[str] = Field(None, description="ID do usuário")

class CodeExecutionResponseModel(BaseModel):
    execution_id: str
    success: bool
    output: str
    error: Optional[str] = None
    execution_time: float
    memory_used: Optional[str] = None
    exit_code: int
    language: str
    timestamp: datetime

class SupportedLanguageModel(BaseModel):
    language: str
    name: str
    image: str
    timeout: int
    extension: str

class HealthCheckModel(BaseModel):
    status: str
    docker_available: bool
    test_execution: bool
    supported_languages: int
    timestamp: datetime
    uptime: float

# Cache para resultados de execução
execution_cache: Dict[str, CodeExecutionResponseModel] = {}

@app.get("/", tags=["Root"])
async def root():
    """Endpoint raiz da API"""
    return {
        "message": "🚀 Fenix Academy - Code Execution API",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "execute": "/execute",
            "languages": "/languages",
            "health": "/health",
            "status": "/status/{execution_id}"
        }
    }

@app.post("/execute", response_model=CodeExecutionResponseModel, tags=["Code Execution"])
async def execute_code(request: CodeExecutionRequestModel):
    """Executa código de programação de forma segura"""
    try:
        # Validar linguagem
        try:
            language_enum = Language(request.language.lower())
        except ValueError:
            supported_langs = [lang.value for lang in Language]
            raise HTTPException(
                status_code=400,
                detail=f"Linguagem '{request.language}' não suportada. Linguagens disponíveis: {supported_langs}"
            )
        
        # Criar request para o motor
        execution_request = CodeExecutionRequest(
            code=request.code,
            language=language_enum,
            input_data=request.input_data,
            timeout=request.timeout,
            memory_limit=request.memory_limit,
            user_id=request.user_id
        )
        
        # Executar código
        logger.info(f"Executando código em {request.language} para usuário {request.user_id}")
        result = code_engine.execute_code(execution_request)
        
        # Criar resposta
        response = CodeExecutionResponseModel(
            execution_id=result.execution_id,
            success=result.success,
            output=result.output,
            error=result.error,
            execution_time=result.execution_time,
            memory_used=result.memory_used,
            exit_code=result.exit_code,
            language=result.language.value,
            timestamp=datetime.now()
        )
        
        # Armazenar no cache
        execution_cache[result.execution_id] = response
        
        logger.info(f"Execução {result.execution_id} concluída com sucesso: {result.success}")
        return response
        
    except Exception as e:
        logger.error(f"Erro na execução: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/execute/async/{execution_id}", tags=["Code Execution"])
async def execute_code_async(
    execution_id: str,
    background_tasks: BackgroundTasks,
    request: CodeExecutionRequestModel
):
    """Executa código de forma assíncrona"""
    try:
        # Validar linguagem
        try:
            language_enum = Language(request.language.lower())
        except ValueError:
            supported_langs = [lang.value for lang in Language]
            raise HTTPException(
                status_code=400,
                detail=f"Linguagem '{request.language}' não suportada. Linguagens disponíveis: {supported_langs}"
            )
        
        # Criar request para o motor
        execution_request = CodeExecutionRequest(
            code=request.code,
            language=language_enum,
            input_data=request.input_data,
            timeout=request.timeout,
            memory_limit=request.memory_limit,
            user_id=request.user_id
        )
        
        # Adicionar tarefa em background
        background_tasks.add_task(execute_code_background, execution_id, execution_request)
        
        return {
            "execution_id": execution_id,
            "status": "queued",
            "message": "Execução iniciada em background",
            "check_status": f"/status/{execution_id}"
        }
        
    except Exception as e:
        logger.error(f"Erro ao agendar execução: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

async def execute_code_background(execution_id: str, request: CodeExecutionRequest):
    """Executa código em background"""
    try:
        logger.info(f"Iniciando execução em background: {execution_id}")
        
        # Executar código
        result = code_engine.execute_code(request)
        
        # Criar resposta
        response = CodeExecutionResponseModel(
            execution_id=result.execution_id,
            success=result.success,
            output=result.output,
            error=result.error,
            execution_time=result.execution_time,
            memory_used=result.memory_used,
            exit_code=result.exit_code,
            language=result.language.value,
            timestamp=datetime.now()
        )
        
        # Armazenar no cache
        execution_cache[result.execution_id] = response
        
        logger.info(f"Execução em background {execution_id} concluída")
        
    except Exception as e:
        logger.error(f"Erro na execução em background {execution_id}: {str(e)}")
        
        # Criar resposta de erro
        error_response = CodeExecutionResponseModel(
            execution_id=execution_id,
            success=False,
            output="",
            error=f"Erro na execução: {str(e)}",
            execution_time=0,
            exit_code=1,
            language=request.language.value,
            timestamp=datetime.now()
        )
        
        execution_cache[execution_id] = error_response

@app.get("/status/{execution_id}", tags=["Code Execution"])
async def get_execution_status(execution_id: str):
    """Obtém o status de uma execução"""
    if execution_id not in execution_cache:
        raise HTTPException(status_code=404, detail="Execução não encontrada")
    
    return execution_cache[execution_id]

@app.get("/languages", response_model=List[SupportedLanguageModel], tags=["Languages"])
async def get_supported_languages():
    """Retorna lista de linguagens suportadas"""
    try:
        languages = code_engine.get_supported_languages()
        return [SupportedLanguageModel(**lang) for lang in languages]
    except Exception as e:
        logger.error(f"Erro ao obter linguagens: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/health", response_model=HealthCheckModel, tags=["Health"])
async def health_check():
    """Verifica a saúde do sistema de execução"""
    try:
        health = code_engine.health_check()
        
        # Adicionar timestamp e uptime
        health["timestamp"] = datetime.now()
        health["uptime"] = 0.0  # Em produção, calcular uptime real
        
        return HealthCheckModel(**health)
        
    except Exception as e:
        logger.error(f"Erro no health check: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/stats", tags=["Statistics"])
async def get_execution_stats():
    """Retorna estatísticas de execução"""
    try:
        total_executions = len(execution_cache)
        successful_executions = sum(1 for r in execution_cache.values() if r.success)
        failed_executions = total_executions - successful_executions
        
        # Estatísticas por linguagem
        language_stats = {}
        for result in execution_cache.values():
            lang = result.language
            if lang not in language_stats:
                language_stats[lang] = {"total": 0, "success": 0, "failed": 0}
            
            language_stats[lang]["total"] += 1
            if result.success:
                language_stats[lang]["success"] += 1
            else:
                language_stats[lang]["failed"] += 1
        
        # Tempo médio de execução
        avg_execution_time = 0
        if total_executions > 0:
            avg_execution_time = sum(r.execution_time for r in execution_cache.values()) / total_executions
        
        return {
            "total_executions": total_executions,
            "successful_executions": successful_executions,
            "failed_executions": failed_executions,
            "success_rate": (successful_executions / total_executions * 100) if total_executions > 0 else 0,
            "average_execution_time": round(avg_execution_time, 2),
            "language_statistics": language_stats,
            "cache_size": len(execution_cache),
            "timestamp": datetime.now()
        }
        
    except Exception as e:
        logger.error(f"Erro ao obter estatísticas: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.delete("/cache/clear", tags=["Cache"])
async def clear_execution_cache():
    """Limpa o cache de execuções"""
    try:
        cache_size = len(execution_cache)
        execution_cache.clear()
        
        return {
            "message": "Cache limpo com sucesso",
            "cleared_entries": cache_size,
            "timestamp": datetime.now()
        }
        
    except Exception as e:
        logger.error(f"Erro ao limpar cache: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/examples/{language}", tags=["Examples"])
async def get_code_examples(language: str):
    """Retorna exemplos de código para uma linguagem específica"""
    examples = {
        "python": {
            "hello_world": {
                "title": "Hello World",
                "description": "Programa básico em Python",
                "code": 'print("Hello, World!")',
                "expected_output": "Hello, World!"
            },
            "fibonacci": {
                "title": "Sequência de Fibonacci",
                "description": "Calcula os primeiros 10 números da sequência",
                "code": """
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
                """,
                "expected_output": "F(0) = 0\nF(1) = 1\nF(2) = 1\n..."
            }
        },
        "javascript": {
            "hello_world": {
                "title": "Hello World",
                "description": "Programa básico em JavaScript",
                "code": 'console.log("Hello, World!");',
                "expected_output": "Hello, World!"
            },
            "factorial": {
                "title": "Fatorial",
                "description": "Calcula o fatorial de um número",
                "code": """
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log("Fatorial de 5:", factorial(5));
                """,
                "expected_output": "Fatorial de 5: 120"
            }
        },
        "cpp": {
            "hello_world": {
                "title": "Hello World",
                "description": "Programa básico em C++",
                "code": """
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
                """,
                "expected_output": "Hello, World!"
            }
        }
    }
    
    if language.lower() not in examples:
        raise HTTPException(
            status_code=404,
            detail=f"Exemplos para linguagem '{language}' não encontrados"
        )
    
    return {
        "language": language,
        "examples": examples[language.lower()],
        "timestamp": datetime.now()
    }

# Middleware para logging
@app.middleware("http")
async def log_requests(request, call_next):
    start_time = datetime.now()
    
    # Processar request
    response = await call_next(request)
    
    # Calcular tempo de processamento
    process_time = (datetime.now() - start_time).total_seconds()
    
    # Log da requisição
    logger.info(
        f"{request.method} {request.url.path} - "
        f"Status: {response.status_code} - "
        f"Tempo: {process_time:.3f}s"
    )
    
    return response

if __name__ == "__main__":
    import uvicorn
    
    print("🚀 Iniciando API de Execução de Código...")
    print("=" * 50)
    
    # Verificar saúde do sistema
    try:
        health = code_engine.health_check()
        print(f"🏥 Status: {health['status']}")
        print(f"🐳 Docker: {'✅' if health['docker_available'] else '❌'}")
        print(f"🧪 Teste: {'✅' if health['test_execution'] else '❌'}")
        print(f"🌐 Linguagens: {health['supported_languages']}")
    except Exception as e:
        print(f"❌ Erro no health check: {e}")
    
    print("=" * 50)
    
    # Iniciar servidor
    uvicorn.run(
        "code_execution:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )
