#!/usr/bin/env python
"""
Script para integrar sistema de pagamento
"""
import os
import re

def integrate_payment_components():
    """Integrar componentes de pagamento"""
    print("💳 Integrando sistema de pagamento...")
    
    # Adicionar import do StripePayment na página de pagamento
    payment_file = "app/payment/page.tsx"
    if os.path.exists(payment_file):
        with open(payment_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Adicionar import se não existir
        if 'StripePayment' not in content:
            content = content.replace(
                "import Link from 'next/link';",
                "import Link from 'next/link';\nimport StripePayment from '../components/StripePayment';"
            )
        
        # Adicionar componente Stripe na seção de cartão de crédito
        stripe_component = '''
        <StripePayment
          amount={course.price}
          courseTitle={course.title}
          onSuccess={() => setPaymentStep('success')}
          onError={(error) => console.error(error)}
        />
        '''
        
        # Substituir seção de cartão de crédito
        content = re.sub(
            r'<div className="space-y-4">\s*<div>\s*<label className="block text-white text-sm font-medium mb-2">\s*Número do Cartão\s*</label>.*?</div>\s*</div>',
            stripe_component,
            content,
            flags=re.DOTALL
        )
        
        with open(payment_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ Stripe integrado na página de pagamento")

def add_payment_links():
    """Adicionar links de pagamento nos cursos"""
    print("🔗 Adicionando links de pagamento...")
    
    courses_file = "app/courses/page.tsx"
    if os.path.exists(courses_file):
        with open(courses_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Adicionar botão de pagamento nos cards de curso
        payment_button = '''
        <Link
          href={`/payment?course=${course.id}`}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-center block"
        >
          Comprar Agora
        </Link>
        '''
        
        # Encontrar e adicionar botão de pagamento
        content = re.sub(
            r'(<div className="text-2xl font-bold text-white">.*?</div>)',
            r'\1\n{payment_button}',
            content
        )
        
        with open(courses_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ Links de pagamento adicionados")

def add_success_redirect():
    """Adicionar redirecionamento de sucesso"""
    print("✅ Adicionando redirecionamento de sucesso...")
    
    # Criar middleware para redirecionamento
    middleware_content = '''
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirecionar para página de sucesso após pagamento
  if (request.nextUrl.pathname === '/payment/success') {
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/payment/:path*']
}
'''
    
    middleware_file = "middleware.ts"
    if not os.path.exists(middleware_file):
        with open(middleware_file, 'w', encoding='utf-8') as f:
            f.write(middleware_content)
        print("✅ Middleware criado")

def add_payment_styles():
    """Adicionar estilos específicos para pagamento"""
    print("🎨 Adicionando estilos de pagamento...")
    
    globals_file = "app/globals.css"
    if os.path.exists(globals_file):
        with open(globals_file, 'a', encoding='utf-8') as f:
            f.write('''

/* Estilos específicos para pagamento */
.payment-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.payment-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  transition: all 0.3s ease;
}

.payment-input:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.payment-button {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.payment-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.payment-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Animações de pagamento */
@keyframes paymentSuccess {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.payment-success {
  animation: paymentSuccess 0.5s ease-out;
}

/* Loading spinner para pagamento */
.payment-loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
''')
        
        print("✅ Estilos de pagamento adicionados")

def main():
    """Função principal"""
    print("💳 Integrando sistema de pagamento completo")
    print("=" * 50)
    
    # Verificar se estamos na pasta correta
    if not os.path.exists('app'):
        print("❌ Pasta 'app' não encontrada!")
        print("📁 Certifique-se de estar na pasta frontend")
        return 1
    
    # Aplicar integrações
    integrate_payment_components()
    add_payment_links()
    add_success_redirect()
    add_payment_styles()
    
    print("\n✅ Sistema de pagamento integrado!")
    print("🚀 Execute: npm run dev")
    
    return 0

if __name__ == '__main__':
    import sys
    sys.exit(main()) 