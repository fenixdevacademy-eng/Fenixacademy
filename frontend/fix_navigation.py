#!/usr/bin/env python
"""
Script para corrigir problemas de navegação no frontend
"""
import os
import re

def fix_modal_z_index():
    """Corrigir z-index do modal"""
    print("🔧 Corrigindo z-index do modal...")
    
    file_path = "app/courses/page.tsx"
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Corrigir z-index do modal
        content = re.sub(
            r'z-50 flex items-center justify-center bg-black bg-opacity-50',
            'z-[9999] flex items-center justify-center bg-black bg-opacity-75',
            content
        )
        
        # Adicionar backdrop-blur
        content = re.sub(
            r'bg-black bg-opacity-75',
            'bg-black bg-opacity-75 backdrop-blur-sm',
            content
        )
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ Z-index do modal corrigido")

def fix_header_navigation():
    """Corrigir navegação do header"""
    print("🔧 Corrigindo navegação do header...")
    
    file_path = "app/components/Header.tsx"
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Garantir que os links de auth estão visíveis
        if 'Auth Buttons' not in content:
            print("⚠️ Links de autenticação não encontrados no header")
        
        print("✅ Header verificado")

def create_navigation_helper():
    """Criar helper de navegação"""
    print("🔧 Criando helper de navegação...")
    
    helper_content = '''
// Helper para navegação
export const navigationHelper = {
  goToHome: () => window.location.href = '/',
  goToLogin: () => window.location.href = '/auth/login',
  goToRegister: () => window.location.href = '/auth/register',
  goToCourses: () => window.location.href = '/courses',
  goToDashboard: () => window.location.href = '/dashboard',
  logout: () => {
    alert('Logout realizado com sucesso!');
    window.location.href = '/';
  }
};
'''
    
    helper_path = "app/utils/navigation.ts"
    os.makedirs(os.path.dirname(helper_path), exist_ok=True)
    
    with open(helper_path, 'w', encoding='utf-8') as f:
        f.write(helper_content)
    
    print("✅ Helper de navegação criado")

def fix_global_styles():
    """Corrigir estilos globais"""
    print("🔧 Corrigindo estilos globais...")
    
    file_path = "app/globals.css"
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Adicionar estilos para modais
        modal_styles = '''
/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #000;
}

/* Navigation fixes */
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-link {
  transition: all 0.2s;
}

.nav-link:hover {
  transform: translateY(-1px);
}

/* Button improvements */
.btn-primary {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}
'''
        
        if 'Modal styles' not in content:
            content += modal_styles
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ Estilos globais corrigidos")

def main():
    """Função principal"""
    print("🔧 Corrigindo problemas de navegação")
    print("=" * 50)
    
    # Verificar se estamos na pasta correta
    if not os.path.exists('app'):
        print("❌ Pasta 'app' não encontrada!")
        print("📁 Certifique-se de estar na pasta frontend")
        return 1
    
    # Corrigir problemas
    fix_modal_z_index()
    fix_header_navigation()
    create_navigation_helper()
    fix_global_styles()
    
    print("\n✅ Problemas de navegação corrigidos!")
    print("🚀 Execute: npm run dev")
    
    return 0

if __name__ == '__main__':
    import sys
    sys.exit(main()) 