'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function TestRedirectPage() {
    const router = useRouter()

    useEffect(() => {
        console.log('Teste de redirecionamento iniciado')
        console.log('Router disponível:', !!router)

        // Testar redirecionamento após 2 segundos
        const timer = setTimeout(() => {
            console.log('Executando redirecionamento de teste...')
            try {
                router.push('/dashboard')
                console.log('Redirecionamento executado com sucesso')
            } catch (error) {
                console.error('Erro no redirecionamento:', error)
                // Fallback
                window.location.href = '/dashboard'
            }
        }, 2000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
                <h1 className="text-2xl font-bold mb-4">Teste de Redirecionamento</h1>
                <p className="mb-4">Esta página irá redirecionar para /dashboard em 2 segundos...</p>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            </div>
        </div>
    )
}




