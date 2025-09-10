#!/usr/bin/env python3
"""
Script de teste para verificar se o gerador está funcionando
"""

import sys
import os

# Adicionar o diretório atual ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from generate_detailed_content import DetailedContentGenerator
    print("✅ Importação do DetailedContentGenerator: OK")
except ImportError as e:
    print(f"❌ Erro na importação: {e}")
    sys.exit(1)

def test_generator():
    """Testa o gerador com uma aula de exemplo"""
    try:
        generator = DetailedContentGenerator()
        print("✅ Instanciação do gerador: OK")
        
        # Dados de teste
        module = {
            "id": 1,
            "title": "Fundamentos Essenciais do Desenvolvimento Web"
        }
        
        lesson = {
            "id": 1,
            "title": "Introdução ao Desenvolvimento Web Moderno",
            "type": "text",
            "duration": "75 min"
        }
        
        # Gerar conteúdo
        content = generator.generate_enhanced_lesson_content(module, lesson)
        print("✅ Geração de conteúdo: OK")
        print(f"📄 Tamanho do conteúdo: {len(content)} caracteres")
        
        # Verificar se o conteúdo contém elementos esperados
        expected_elements = [
            "# 🎓 **Web Fundamentals",
            "## 🎯 **Objetivos de Aprendizado**",
            "## 🌟 **INTRODUÇÃO AO TÓPICO**",
            "## 🏗️ **DESENVOLVIMENTO DOS CONCEITOS**",
            "## 🇧🇷 **CASOS BRASILEIROS APLICADOS**",
            "## 🚀 **APLICAÇÃO PRÁTICA INTEGRADA**",
            "## 📝 **CONCLUSÃO E PRÓXIMOS PASSOS**"
        ]
        
        missing_elements = []
        for element in expected_elements:
            if element not in content:
                missing_elements.append(element)
        
        if missing_elements:
            print(f"⚠️  Elementos faltando: {missing_elements}")
        else:
            print("✅ Estrutura do conteúdo: OK")
        
        # Salvar arquivo de teste
        test_file = "test_lesson_output.md"
        with open(test_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"💾 Arquivo de teste salvo: {test_file}")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro durante o teste: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    print("🧪 TESTE DO GERADOR DE CONTEÚDO")
    print("=" * 50)
    
    success = test_generator()
    
    print("=" * 50)
    if success:
        print("🎉 TESTE CONCLUÍDO COM SUCESSO!")
    else:
        print("❌ TESTE FALHOU!")
    
    return success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)


