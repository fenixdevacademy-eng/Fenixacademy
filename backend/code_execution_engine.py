#!/usr/bin/env python3
"""
Motor de Execução de Código Real para Fenix Academy
Suporte a múltiplas linguagens com sandboxing seguro
"""

import subprocess
import tempfile
import os
import json
import time
import signal
import docker
import uuid
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Language(Enum):
    PYTHON = "python"
    JAVASCRIPT = "javascript"
    HTML = "html"
    CSS = "css"
    JAVA = "java"
    CPP = "cpp"
    GO = "go"
    RUST = "rust"
    PHP = "php"
    RUBY = "ruby"

@dataclass
class CodeExecutionRequest:
    code: str
    language: Language
    input_data: Optional[str] = None
    timeout: int = 30
    memory_limit: str = "512m"
    user_id: Optional[str] = None

@dataclass
class CodeExecutionResult:
    success: bool
    output: str
    error: Optional[str] = None
    execution_time: float
    memory_used: Optional[str] = None
    exit_code: int
    language: Language
    execution_id: str

class CodeExecutionEngine:
    """Motor principal de execução de código com sandboxing"""
    
    def __init__(self):
        self.docker_client = docker.from_env()
        self.supported_languages = {
            Language.PYTHON: {
                "image": "python:3.11-slim",
                "command": "python",
                "extension": ".py",
                "timeout": 30
            },
            Language.JAVASCRIPT: {
                "image": "node:18-slim",
                "command": "node",
                "extension": ".js",
                "timeout": 30
            },
            Language.HTML: {
                "image": "nginx:alpine",
                "command": "echo",
                "extension": ".html",
                "timeout": 10
            },
            Language.CSS: {
                "image": "nginx:alpine",
                "command": "echo",
                "extension": ".css",
                "timeout": 10
            },
            Language.JAVA: {
                "image": "openjdk:17-slim",
                "command": "java",
                "extension": ".java",
                "timeout": 45
            },
            Language.CPP: {
                "image": "gcc:latest",
                "command": "g++",
                "extension": ".cpp",
                "timeout": 60
            },
            Language.GO: {
                "image": "golang:1.21-alpine",
                "command": "go",
                "extension": ".go",
                "timeout": 45
            },
            Language.RUST: {
                "image": "rust:1.70-slim",
                "command": "rustc",
                "extension": ".rs",
                "timeout": 60
            },
            Language.PHP: {
                "image": "php:8.2-cli",
                "command": "php",
                "extension": ".php",
                "timeout": 30
            },
            Language.RUBY: {
                "image": "ruby:3.2-slim",
                "command": "ruby",
                "extension": ".rb",
                "timeout": 30
            }
        }
        
        # Configurações de segurança
        self.security_config = {
            "network_disabled": True,
            "read_only": True,
            "cap_drop": ["ALL"],
            "security_opt": ["no-new-privileges"],
            "mem_limit": "512m",
            "cpu_period": 100000,
            "cpu_quota": 50000,  # 50% CPU limit
        }
    
    def execute_code(self, request: CodeExecutionRequest) -> CodeExecutionResult:
        """Executa código de forma segura usando Docker"""
        execution_id = str(uuid.uuid4())
        start_time = time.time()
        
        try:
            if request.language not in self.supported_languages:
                return CodeExecutionResult(
                    success=False,
                    output="",
                    error=f"Linguagem {request.language.value} não suportada",
                    execution_time=0,
                    exit_code=1,
                    language=request.language,
                    execution_id=execution_id
                )
            
            lang_config = self.supported_languages[request.language]
            
            # Criar arquivo temporário
            with tempfile.NamedTemporaryFile(
                mode='w',
                suffix=lang_config["extension"],
                delete=False,
                encoding='utf-8'
            ) as temp_file:
                temp_file.write(request.code)
                temp_file_path = temp_file.name
            
            try:
                # Executar código baseado na linguagem
                if request.language in [Language.HTML, Language.CSS]:
                    result = self._execute_static_file(request, temp_file_path, lang_config)
                elif request.language == Language.CPP:
                    result = self._execute_cpp(request, temp_file_path, lang_config)
                elif request.language == Language.JAVA:
                    result = self._execute_java(request, temp_file_path, lang_config)
                elif request.language == Language.GO:
                    result = self._execute_go(request, temp_file_path, lang_config)
                elif request.language == Language.RUST:
                    result = self._execute_rust(request, temp_file_path, lang_config)
                else:
                    result = self._execute_interpreted(request, temp_file_path, lang_config)
                
                execution_time = time.time() - start_time
                
                return CodeExecutionResult(
                    success=result["success"],
                    output=result["output"],
                    error=result.get("error"),
                    execution_time=execution_time,
                    memory_used=result.get("memory_used"),
                    exit_code=result.get("exit_code", 0),
                    language=request.language,
                    execution_id=execution_id
                )
                
            finally:
                # Limpar arquivo temporário
                os.unlink(temp_file_path)
                
        except Exception as e:
            execution_time = time.time() - start_time
            logger.error(f"Erro na execução: {str(e)}")
            return CodeExecutionResult(
                success=False,
                output="",
                error=f"Erro interno: {str(e)}",
                execution_time=execution_time,
                exit_code=1,
                language=request.language,
                execution_id=execution_id
            )
    
    def _execute_interpreted(self, request: CodeExecutionRequest, file_path: str, lang_config: Dict) -> Dict:
        """Executa linguagens interpretadas (Python, JavaScript, PHP, Ruby)"""
        try:
            container = self.docker_client.containers.run(
                lang_config["image"],
                command=f"{lang_config['command']} {os.path.basename(file_path)}",
                volumes={
                    os.path.dirname(file_path): {
                        'bind': '/workspace',
                        'mode': 'ro'
                    }
                },
                working_dir='/workspace',
                **self.security_config,
                detach=True
            )
            
            try:
                # Aguardar execução com timeout
                container.wait(timeout=request.timeout)
                
                # Obter logs
                logs = container.logs().decode('utf-8')
                
                # Verificar se houve erro
                exit_code = container.attrs['State']['ExitCode']
                
                return {
                    "success": exit_code == 0,
                    "output": logs,
                    "error": None if exit_code == 0 else f"Exit code: {exit_code}",
                    "exit_code": exit_code
                }
                
            finally:
                container.remove(force=True)
                
        except Exception as e:
            return {
                "success": False,
                "output": "",
                "error": str(e),
                "exit_code": 1
            }
    
    def _execute_cpp(self, request: CodeExecutionRequest, file_path: str, lang_config: Dict) -> Dict:
        """Executa código C++ com compilação"""
        try:
            # Compilar
            compile_container = self.docker_client.containers.run(
                lang_config["image"],
                command=f"g++ -o /workspace/program {os.path.basename(file_path)}",
                volumes={
                    os.path.dirname(file_path): {
                        'bind': '/workspace',
                        'mode': 'rw'
                    }
                },
                working_dir='/workspace',
                **self.security_config,
                detach=True
            )
            
            try:
                compile_container.wait(timeout=30)
                if compile_container.attrs['State']['ExitCode'] != 0:
                    compile_logs = compile_container.logs().decode('utf-8')
                    return {
                        "success": False,
                        "output": "",
                        "error": f"Erro de compilação: {compile_logs}",
                        "exit_code": 1
                    }
                
                # Executar programa compilado
                exec_container = self.docker_client.containers.run(
                    lang_config["image"],
                    command="/workspace/program",
                    volumes={
                        os.path.dirname(file_path): {
                            'bind': '/workspace',
                            'mode': 'ro'
                        }
                    },
                    working_dir='/workspace',
                    **self.security_config,
                    detach=True
                )
                
                try:
                    exec_container.wait(timeout=request.timeout)
                    logs = exec_container.logs().decode('utf-8')
                    exit_code = exec_container.attrs['State']['ExitCode']
                    
                    return {
                        "success": exit_code == 0,
                        "output": logs,
                        "error": None if exit_code == 0 else f"Exit code: {exit_code}",
                        "exit_code": exit_code
                    }
                    
                finally:
                    exec_container.remove(force=True)
                    
            finally:
                compile_container.remove(force=True)
                
        except Exception as e:
            return {
                "success": False,
                "output": "",
                "error": str(e),
                "exit_code": 1
            }
    
    def _execute_java(self, request: CodeExecutionRequest, file_path: str, lang_config: Dict) -> Dict:
        """Executa código Java com compilação"""
        try:
            # Compilar
            compile_container = self.docker_client.containers.run(
                lang_config["image"],
                command=f"javac {os.path.basename(file_path)}",
                volumes={
                    os.path.dirname(file_path): {
                        'bind': '/workspace',
                        'mode': 'rw'
                    }
                },
                working_dir='/workspace',
                **self.security_config,
                detach=True
            )
            
            try:
                compile_container.wait(timeout=30)
                if compile_container.attrs['State']['ExitCode'] != 0:
                    compile_logs = compile_container.logs().decode('utf-8')
                    return {
                        "success": False,
                        "output": "",
                        "error": f"Erro de compilação: {compile_logs}",
                        "exit_code": 1
                    }
                
                # Executar programa compilado
                class_name = os.path.basename(file_path).replace('.java', '')
                exec_container = self.docker_client.containers.run(
                    lang_config["image"],
                    command=f"java {class_name}",
                    volumes={
                        os.path.dirname(file_path): {
                            'bind': '/workspace',
                            'mode': 'ro'
                        }
                    },
                    working_dir='/workspace',
                    **self.security_config,
                    detach=True
                )
                
                try:
                    exec_container.wait(timeout=request.timeout)
                    logs = exec_container.logs().decode('utf-8')
                    exit_code = exec_container.attrs['State']['ExitCode']
                    
                    return {
                        "success": exit_code == 0,
                        "output": logs,
                        "error": None if exit_code == 0 else f"Exit code: {exit_code}",
                        "exit_code": exit_code
                    }
                    
                finally:
                    exec_container.remove(force=True)
                    
            finally:
                compile_container.remove(force=True)
                
        except Exception as e:
            return {
                "success": False,
                "output": "",
                "error": str(e),
                "exit_code": 1
            }
    
    def _execute_go(self, request: CodeExecutionRequest, file_path: str, lang_config: Dict) -> Dict:
        """Executa código Go"""
        try:
            container = self.docker_client.containers.run(
                lang_config["image"],
                command=f"go run {os.path.basename(file_path)}",
                volumes={
                    os.path.dirname(file_path): {
                        'bind': '/workspace',
                        'mode': 'ro'
                    }
                },
                working_dir='/workspace',
                **self.security_config,
                detach=True
            )
            
            try:
                container.wait(timeout=request.timeout)
                logs = container.logs().decode('utf-8')
                exit_code = container.attrs['State']['ExitCode']
                
                return {
                    "success": exit_code == 0,
                    "output": logs,
                    "error": None if exit_code == 0 else f"Exit code: {exit_code}",
                    "exit_code": exit_code
                }
                
            finally:
                container.remove(force=True)
                
        except Exception as e:
            return {
                "success": False,
                "output": "",
                "error": str(e),
                "exit_code": 1
            }
    
    def _execute_rust(self, request: CodeExecutionRequest, file_path: str, lang_config: Dict) -> Dict:
        """Executa código Rust com compilação"""
        try:
            # Compilar
            compile_container = self.docker_client.containers.run(
                lang_config["image"],
                command=f"rustc {os.path.basename(file_path)} -o /workspace/program",
                volumes={
                    os.path.dirname(file_path): {
                        'bind': '/workspace',
                        'mode': 'rw'
                    }
                },
                working_dir='/workspace',
                **self.security_config,
                detach=True
            )
            
            try:
                compile_container.wait(timeout=60)
                if compile_container.attrs['State']['ExitCode'] != 0:
                    compile_logs = compile_container.logs().decode('utf-8')
                    return {
                        "success": False,
                        "output": "",
                        "error": f"Erro de compilação: {compile_logs}",
                        "exit_code": 1
                    }
                
                # Executar programa compilado
                exec_container = self.docker_client.containers.run(
                    "debian:buster-slim",
                    command="/workspace/program",
                    volumes={
                        os.path.dirname(file_path): {
                            'bind': '/workspace',
                            'mode': 'ro'
                        }
                    },
                    working_dir='/workspace',
                    **self.security_config,
                    detach=True
                )
                
                try:
                    exec_container.wait(timeout=request.timeout)
                    logs = exec_container.logs().decode('utf-8')
                    exit_code = exec_container.attrs['State']['ExitCode']
                    
                    return {
                        "success": exit_code == 0,
                        "output": logs,
                        "error": None if exit_code == 0 else f"Exit code: {exit_code}",
                        "exit_code": exit_code
                    }
                    
                finally:
                    exec_container.remove(force=True)
                    
            finally:
                compile_container.remove(force=True)
                
        except Exception as e:
            return {
                "success": False,
                "output": "",
                "error": str(e),
                "exit_code": 1
            }
    
    def _execute_static_file(self, request: CodeExecutionRequest, file_path: str, lang_config: Dict) -> Dict:
        """Executa arquivos estáticos (HTML, CSS)"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if request.language == Language.HTML:
                return {
                    "success": True,
                    "output": content,
                    "error": None,
                    "exit_code": 0
                }
            elif request.language == Language.CSS:
                return {
                    "success": True,
                    "output": f"CSS válido com {len(content.split(';'))} declarações",
                    "error": None,
                    "exit_code": 0
                }
            
        except Exception as e:
            return {
                "success": False,
                "output": "",
                "error": str(e),
                "exit_code": 1
            }
    
    def get_supported_languages(self) -> List[Dict]:
        """Retorna lista de linguagens suportadas"""
        return [
            {
                "language": lang.value,
                "name": lang.name.title(),
                "image": config["image"],
                "timeout": config["timeout"],
                "extension": config["extension"]
            }
            for lang, config in self.supported_languages.items()
        ]
    
    def health_check(self) -> Dict:
        """Verifica saúde do sistema de execução"""
        try:
            # Testar conexão Docker
            self.docker_client.ping()
            
            # Testar execução simples
            test_request = CodeExecutionRequest(
                code="print('Hello, World!')",
                language=Language.PYTHON,
                timeout=10
            )
            
            result = self.execute_code(test_request)
            
            return {
                "status": "healthy",
                "docker_available": True,
                "test_execution": result.success,
                "supported_languages": len(self.supported_languages)
            }
            
        except Exception as e:
            return {
                "status": "unhealthy",
                "docker_available": False,
                "error": str(e),
                "supported_languages": 0
            }

# Exemplo de uso
if __name__ == "__main__":
    engine = CodeExecutionEngine()
    
    # Teste de execução
    test_codes = [
        {
            "language": Language.PYTHON,
            "code": """
print("Hello from Python!")
for i in range(5):
    print(f"Count: {i}")
            """,
            "description": "Python básico"
        },
        {
            "language": Language.JAVASCRIPT,
            "code": """
console.log("Hello from JavaScript!");
for (let i = 0; i < 5; i++) {
    console.log(`Count: ${i}`);
}
            """,
            "description": "JavaScript básico"
        },
        {
            "language": Language.CPP,
            "code": """
#include <iostream>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    for (int i = 0; i < 5; i++) {
        cout << "Count: " << i << endl;
    }
    return 0;
}
            """,
            "description": "C++ básico"
        }
    ]
    
    print("🚀 Testando Motor de Execução de Código...")
    print("=" * 50)
    
    for test in test_codes:
        print(f"\n🧪 Testando: {test['description']}")
        print(f"Linguagem: {test['language'].value}")
        
        request = CodeExecutionRequest(
            code=test['code'],
            language=test['language'],
            timeout=30
        )
        
        result = engine.execute_code(request)
        
        print(f"✅ Sucesso: {result.success}")
        print(f"⏱️ Tempo: {result.execution_time:.2f}s")
        print(f"📤 Saída: {result.output[:100]}...")
        
        if result.error:
            print(f"❌ Erro: {result.error}")
    
    print("\n" + "=" * 50)
    print("🏥 Health Check:")
    health = engine.health_check()
    print(json.dumps(health, indent=2))
    
    print("\n🌐 Linguagens Suportadas:")
    languages = engine.get_supported_languages()
    for lang in languages:
        print(f"  • {lang['name']} ({lang['language']}) - Timeout: {lang['timeout']}s")
