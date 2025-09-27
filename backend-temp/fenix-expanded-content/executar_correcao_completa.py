#!/usr/bin/env python3
"""
SCRIPT PRINCIPAL DE CORREÇÃO AUTOMÁTICA COMPLETA
Executa todas as partes da correção de conteúdo
"""

import os
import sys
import time
from pathlib import Path

def executar_parte(script_name: str, descricao: str) -> bool:
    """Executa uma parte específica do script"""
    print(f"\n{'='*60}")
    print(f"🚀 EXECUTANDO: {descricao}")
    print(f"{'='*60}")
    
    try:
        # Importar e executar o script
        if script_name == "parte1":
            from script_correcao_automatica_parte1 import CorretorConteudo
            corretor = CorretorConteudo()
            corretor.executar_correcao()
            return True
            
        elif script_name == "parte2":
            from script_correcao_automatica_parte2 import MelhoradorConteudo
            melhorador = MelhoradorConteudo()
            melhorador.executar_melhorias()
            return True
            
        elif script_name == "parte3":
            from script_correcao_automatica_parte3 import PadronizadorQualidade
            padronizador = PadronizadorQualidade()
            padronizador.executar_padronizacao()
            return True
            
        else:
            print(f"❌ Script {script_name} não encontrado!")
            return False
            
    except Exception as e:
        print(f"❌ Erro ao executar {script_name}: {e}")
        return False

def mostrar_menu():
    """Mostra o menu de opções"""
    print("\n" + "="*60)
    print("🎯 SCRIPT DE CORREÇÃO AUTOMÁTICA COMPLETA")
    print("="*60)
    print("📋 Escolha uma opção:")
    print()
    print("1️⃣  Executar TODAS as correções (Recomendado)")
    print("2️⃣  Parte 1: Corrigir código Python incorreto")
    print("3️⃣  Parte 2: Melhorar conteúdo genérico")
    print("4️⃣  Parte 3: Padronizar qualidade")
    print("5️⃣  Verificar status dos arquivos")
    print("6️⃣  Sair")
    print()
    print("="*60)

def verificar_status():
    """Verifica o status dos arquivos"""
    print("\n🔍 VERIFICANDO STATUS DOS ARQUIVOS")
    print("="*60)
    
    base_path = Path("backend/fenix-expanded-content")
    cursos = ['react-advanced', 'web-fundamentals', 'python-data-science', 'aws-cloud', 'devops-docker', 'csharp-automation']
    
    total_arquivos = 0
    arquivos_com_problemas = 0
    
    for curso in cursos:
        curso_path = base_path / curso
        if not curso_path.exists():
            continue
        
        print(f"\n📚 {curso.upper()}:")
        
        # Contar arquivos
        arquivos = list(curso_path.rglob("*.md"))
        arquivos = [f for f in arquivos if not f.name.endswith('.backup')]
        
        print(f"   📁 Total de arquivos: {len(arquivos)}")
        total_arquivos += len(arquivos)
        
        # Verificar problemas
        problemas_encontrados = 0
        for arquivo in arquivos[:5]:  # Verificar apenas primeiros 5
            try:
                with open(arquivo, 'r', encoding='utf-8') as f:
                    conteudo = f.read()
                
                # Verificar código Python incorreto
                if '```python' in conteudo and ('react' in curso or 'web' in curso):
                    problemas_encontrados += 1
                
                # Verificar conteúdo genérico
                if 'é uma tecnologia essencial para' in conteudo:
                    problemas_encontrados += 1
                    
            except Exception:
                pass
        
        if problemas_encontrados > 0:
            print(f"   ⚠️  Problemas encontrados: {problemas_encontrados}")
            arquivos_com_problemas += problemas_encontrados
        else:
            print(f"   ✅ Nenhum problema encontrado")
    
    print(f"\n📊 RESUMO GERAL:")
    print(f"   📁 Total de arquivos: {total_arquivos}")
    print(f"   ⚠️  Arquivos com problemas: {arquivos_com_problemas}")
    print(f"   ✅ Arquivos OK: {total_arquivos - arquivos_com_problemas}")
    
    if arquivos_com_problemas > 0:
        print(f"\n💡 Recomendação: Execute a correção automática!")
    else:
        print(f"\n🎉 Todos os arquivos estão em perfeito estado!")

def executar_todas_correcoes():
    """Executa todas as correções em sequência"""
    print("\n🚀 INICIANDO CORREÇÃO COMPLETA")
    print("="*60)
    print("⏱️  Tempo estimado: 10-15 minutos")
    print("📋 Processo: 3 partes sequenciais")
    print()
    
    partes = [
        ("parte1", "Parte 1: Corrigir código Python incorreto"),
        ("parte2", "Parte 2: Melhorar conteúdo genérico"),
        ("parte3", "Parte 3: Padronizar qualidade")
    ]
    
    sucessos = 0
    inicio = time.time()
    
    for i, (script, descricao) in enumerate(partes, 1):
        print(f"\n🔄 Executando {i}/3: {descricao}")
        
        if executar_parte(script, descricao):
            sucessos += 1
            print(f"✅ {descricao} - CONCLUÍDA!")
        else:
            print(f"❌ {descricao} - FALHOU!")
        
        # Pausa entre partes
        if i < len(partes):
            print(f"\n⏳ Aguardando 3 segundos antes da próxima parte...")
            time.sleep(3)
    
    fim = time.time()
    tempo_total = fim - inicio
    
    # Relatório final
    print("\n" + "="*60)
    print("📊 RELATÓRIO FINAL - CORREÇÃO COMPLETA")
    print("="*60)
    print(f"✅ Partes executadas com sucesso: {sucessos}/{len(partes)}")
    print(f"⏱️  Tempo total: {tempo_total:.1f} segundos")
    print(f"📁 Arquivos processados: Múltiplos cursos")
    print()
    
    if sucessos == len(partes):
        print("🎉 CORREÇÃO COMPLETA FINALIZADA COM SUCESSO!")
        print("💡 Seu conteúdo está pronto para lançamento!")
        print()
        print("📋 Próximos passos:")
        print("   1. Revisar as correções feitas")
        print("   2. Testar os códigos corrigidos")
        print("   3. Verificar a qualidade do conteúdo")
        print("   4. Lançar a plataforma!")
    else:
        print("⚠️  CORREÇÃO PARCIALMENTE CONCLUÍDA")
        print("💡 Algumas partes falharam. Verifique os erros acima.")
        print("🔄 Tente executar as partes individuais para corrigir.")

def main():
    """Função principal"""
    while True:
        mostrar_menu()
        
        try:
            opcao = input("🎯 Digite sua opção (1-6): ").strip()
            
            if opcao == "1":
                executar_todas_correcoes()
                break
                
            elif opcao == "2":
                executar_parte("parte1", "Parte 1: Corrigir código Python incorreto")
                break
                
            elif opcao == "3":
                executar_parte("parte2", "Parte 2: Melhorar conteúdo genérico")
                break
                
            elif opcao == "4":
                executar_parte("parte3", "Parte 3: Padronizar qualidade")
                break
                
            elif opcao == "5":
                verificar_status()
                input("\n⏳ Pressione Enter para continuar...")
                
            elif opcao == "6":
                print("\n👋 Até logo! Obrigado por usar o script de correção.")
                break
                
            else:
                print("\n❌ Opção inválida! Tente novamente.")
                time.sleep(1)
                
        except KeyboardInterrupt:
            print("\n\n👋 Script interrompido pelo usuário. Até logo!")
            break
        except Exception as e:
            print(f"\n❌ Erro inesperado: {e}")
            time.sleep(2)

if __name__ == "__main__":
    main()
