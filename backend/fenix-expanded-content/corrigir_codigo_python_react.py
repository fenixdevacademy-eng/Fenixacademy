#!/usr/bin/env python3
"""
Script para corrigir código Python incorreto em cursos de React
Parte 1: Correção de código Python em React Advanced
"""

import os
import re
from pathlib import Path

def corrigir_react_advanced():
    """Corrige código Python incorreto em React Advanced"""
    print("🚀 CORRIGINDO CÓDIGO PYTHON EM REACT ADVANCED")
    print("=" * 60)
    
    # Diretório do curso React Advanced
    curso_path = Path("backend/fenix-expanded-content/react-advanced/avancado")
    
    if not curso_path.exists():
        print(f"❌ Diretório não encontrado: {curso_path}")
        return
    
    # Lista de arquivos para corrigir
    arquivos_para_corrigir = [
        "aula-01-modulo-01-react-advanced.md",
        "aula-02-modulo-01-react-advanced.md", 
        "aula-03-modulo-01-react-advanced.md",
        "aula-04-modulo-01-react-advanced.md",
        "aula-05-modulo-01-react-advanced.md"
    ]
    
    for arquivo in arquivos_para_corrigir:
        arquivo_path = curso_path / arquivo
        if arquivo_path.exists():
            print(f"\n📝 Corrigindo: {arquivo}")
            corrigir_arquivo_react(arquivo_path)
        else:
            print(f"⚠️  Arquivo não encontrado: {arquivo}")

def corrigir_arquivo_react(arquivo_path: Path):
    """Corrige um arquivo específico do React"""
    try:
        # Ler conteúdo atual
        with open(arquivo_path, 'r', encoding='utf-8') as f:
            conteudo = f.read()
        
        # Fazer backup
        backup_path = arquivo_path.with_suffix('.md.backup')
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(conteudo)
        
        # Aplicar correções
        conteudo_corrigido = aplicar_correcoes_react(conteudo)
        
        # Salvar arquivo corrigido
        with open(arquivo_path, 'w', encoding='utf-8') as f:
            f.write(conteudo_corrigido)
        
        print(f"    ✅ Corrigido e salvo backup em: {backup_path.name}")
        
    except Exception as e:
        print(f"    ❌ Erro ao corrigir {arquivo_path.name}: {str(e)}")

def aplicar_correcoes_react(conteudo: str) -> str:
    """Aplica correções específicas para React"""
    
    # 1. Corrigir código Python básico
    conteudo = re.sub(
        r'```python\n# Exemplo prático de (.+?)\ndef exemplo_basico\(\):\n    print\("Implementando (.+?)"\)\n    return "Sucesso"\n\nexemplo_basico\(\)\n```',
        r'```javascript\n// Exemplo prático de \1\nimport React, { useState, useEffect } from \'react\';\n\nfunction ExemploBasico() {\n    const [count, setCount] = useState(0);\n    \n    useEffect(() => {\n        console.log(\'useEffect executado\');\n    }, [count]);\n    \n    return (\n        <div>\n            <p>Count: {count}</p>\n            <button onClick={() => setCount(count + 1)}>\n                Incrementar\n            </button>\n        </div>\n    );\n}\n\nexport default ExemploBasico;\n```',
        conteudo
    )
    
    # 2. Corrigir código Python avançado
    conteudo = re.sub(
        r'```python\n# Implementação avançada de (.+?)\nclass (.+?):\n    def __init__\(self\):\n        self\.config = \{\}\n    \n    def process\(self\):\n        return "Implementação avançada"\n```',
        r'```javascript\n// Implementação avançada de \1\nimport React, { useState, useEffect, useCallback, useMemo } from \'react\';\n\nconst \2 = () => {\n    const [data, setData] = useState(null);\n    const [loading, setLoading] = useState(false);\n    \n    const fetchData = useCallback(async () => {\n        setLoading(true);\n        try {\n            const response = await fetch(\'/api/data\');\n            const result = await response.json();\n            setData(result);\n        } catch (error) {\n            console.error(\'Erro ao buscar dados:\', error);\n        } finally {\n            setLoading(false);\n        }\n    }, []);\n    \n    const memoizedValue = useMemo(() => {\n        return data ? data.length : 0;\n    }, [data]);\n    \n    useEffect(() => {\n        fetchData();\n    }, [fetchData]);\n    \n    return (\n        <div>\n            {loading ? (\n                <p>Carregando...</p>\n            ) : (\n                <div>\n                    <h3>Dados carregados: {memoizedValue}</h3>\n                    <pre>{JSON.stringify(data, null, 2)}</pre>\n                </div>\n            )}\n        </div>\n    );\n};\n\nexport default \2;\n```',
        conteudo
    )
    
    # 3. Corrigir texto genérico
    conteudo = re.sub(
        r'(.+?) é uma tecnologia essencial para react advanced\. Nesta aula, você aprenderá:',
        r'\1 são conceitos fundamentais do React moderno. Nesta aula, você aprenderá:',
        conteudo
    )
    
    # 4. Melhorar exercícios genéricos
    conteudo = re.sub(
        r'#### Exercício 1: Implementação Básica\nCrie uma implementação básica de (.+?)\.',
        r'#### Exercício 1: Componente com useState\nCrie um componente React que use useState para gerenciar um contador com botões de incrementar e decrementar.',
        conteudo
    )
    
    conteudo = re.sub(
        r'#### Exercício 2: Aplicação Prática\nDesenvolva uma aplicação que use (.+?)\.',
        r'#### Exercício 2: Hook Personalizado\nDesenvolva um hook personalizado que gerencie estado de formulário com validação.',
        conteudo
    )
    
    conteudo = re.sub(
        r'#### Exercício 3: Projeto Completo\nCrie um projeto completo utilizando (.+?)\.',
        r'#### Exercício 3: Aplicação React Completa\nCrie uma aplicação React completa com roteamento, gerenciamento de estado e integração com API.',
        conteudo
    )
    
    return conteudo

def main():
    """Função principal"""
    print("🔧 SCRIPT DE CORREÇÃO AUTOMÁTICA - REACT ADVANCED")
    print("=" * 60)
    print("Este script corrige código Python incorreto em cursos de React")
    print("Criando backups de segurança antes das correções...")
    print()
    
    corrigir_react_advanced()
    
    print("\n🎉 CORREÇÃO CONCLUÍDA!")
    print("=" * 60)
    print("✅ Código Python corrigido para JavaScript/React")
    print("✅ Textos genéricos personalizados")
    print("✅ Exercícios específicos para React")
    print("✅ Backups criados para segurança")
    print("\n📁 Verifique os arquivos .backup se precisar reverter")

if __name__ == "__main__":
    main()
