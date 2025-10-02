'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: string
    name: string
    email: string
    role: string
    access_level?: string
    phone?: string
    city?: string
    state?: string
    country?: string
    bio?: string
    skills?: string[]
    interests?: string[]
    created_at: string
    last_login?: string
    avatar?: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>
    register: (name: string, email: string, password: string, confirmPassword: string) => Promise<{ success: boolean; error?: string; user?: User }>
    logout: () => void
    checkAuth: () => Promise<boolean>
    refreshToken: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isInitialized, setIsInitialized] = useState(false)
    const router = useRouter()

    const isAuthenticated = !!user

    // Função para salvar dados no localStorage
    const saveAuthData = (userData: User, token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('fenix-jwt-token', token)
            localStorage.setItem('fenix_user', JSON.stringify(userData))
            console.log('💾 Dados salvos no localStorage')
        }
    }

    // Função para limpar dados do localStorage
    const clearAuthData = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('fenix-jwt-token')
            localStorage.removeItem('fenix_user')
            console.log('🗑️ Dados removidos do localStorage')
        }
    }

    // Função para obter dados do localStorage
    const getStoredAuthData = () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('fenix-jwt-token')
            const userData = localStorage.getItem('fenix_user')

            if (token && userData) {
                try {
                    return {
                        token,
                        user: JSON.parse(userData)
                    }
                } catch (error) {
                    console.error('❌ Erro ao parsear dados do localStorage:', error)
                    clearAuthData()
                }
            }
        }
        return null
    }

    // Função de login
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
        try {
            console.log('🔐 Iniciando login para:', email)
            setIsLoading(true)

            const response = await fetch('http://localhost:3002/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            console.log('📡 Resposta da API:', response.status)
            const data = await response.json()
            console.log('📦 Dados da resposta:', data)

            if (response.ok && data.success) {
                console.log('✅ Login bem-sucedido')

                // Salvar dados
                saveAuthData(data.user, data.token)
                setUser(data.user)

                console.log('👤 Usuário definido no contexto:', data.user.name)
                return { success: true, user: data.user }
            } else {
                console.log('❌ Erro no login:', data.error)
                return { success: false, error: data.error || 'Erro no login' }
            }
        } catch (error) {
            console.error('💥 Erro no login:', error)
            return { success: false, error: 'Erro de conexão' }
        } finally {
            setIsLoading(false)
        }
    }

    // Função de registro
    const register = async (name: string, email: string, password: string, confirmPassword: string): Promise<{ success: boolean; error?: string; user?: User }> => {
        try {
            console.log('📝 Iniciando registro para:', email)
            setIsLoading(true)

            const response = await fetch('http://localhost:3002/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            })

            console.log('📡 Resposta da API:', response.status)
            const data = await response.json()
            console.log('📦 Dados da resposta:', data)

            if (response.ok && data.success) {
                console.log('✅ Registro bem-sucedido')

                // Salvar dados
                saveAuthData(data.user, data.token)
                setUser(data.user)

                console.log('👤 Usuário definido no contexto:', data.user.name)
                return { success: true, user: data.user }
            } else {
                console.log('❌ Erro no registro:', data.error)
                return { success: false, error: data.error || 'Erro no registro' }
            }
        } catch (error) {
            console.error('💥 Erro no registro:', error)
            return { success: false, error: 'Erro de conexão' }
        } finally {
            setIsLoading(false)
        }
    }

    // Função de logout
    const logout = () => {
        console.log('👋 Fazendo logout')
        setUser(null)
        clearAuthData()
        router.push('/auth/login')
    }

    // Função para verificar autenticação
    const checkAuth = async (): Promise<boolean> => {
        try {
            console.log('🔍 Verificando autenticação...')

            const storedData = getStoredAuthData()
            if (!storedData) {
                console.log('❌ Nenhum dado de autenticação encontrado')
                return false
            }

            // Verificar token com a API
            const response = await fetch('http://localhost:3002/api/auth/verify', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${storedData.token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    console.log('✅ Token válido, usuário autenticado:', data.user.name)
                    // Só atualizar o usuário se for diferente do atual
                    if (!user || user.id !== data.user.id) {
                        setUser(data.user)
                    }
                    return true
                }
            }

            console.log('❌ Token inválido ou expirado')
            clearAuthData()
            setUser(null)
            return false
        } catch (error) {
            console.error('💥 Erro ao verificar autenticação:', error)
            clearAuthData()
            setUser(null)
            return false
        }
    }

    // Função para renovar token
    const refreshToken = async (): Promise<boolean> => {
        try {
            console.log('🔄 Renovando token...')
            return await checkAuth()
        } catch (error) {
            console.error('💥 Erro ao renovar token:', error)
            return false
        }
    }

    // Verificar autenticação ao carregar
    useEffect(() => {
        const initAuth = async () => {
            if (isInitialized) return

            console.log('🚀 Inicializando autenticação...')
            setIsLoading(true)

            try {
                // Verificar dados armazenados primeiro
                const storedData = getStoredAuthData()
                if (storedData) {
                    console.log('📦 Dados encontrados no localStorage, verificando token...')
                    // Verificar se o token ainda é válido
                    const isValid = await checkAuth()
                    if (!isValid) {
                        console.log('❌ Token inválido, limpando dados')
                        clearAuthData()
                        setUser(null)
                    }
                } else {
                    console.log('❌ Nenhum dado de autenticação encontrado')
                    setUser(null)
                }
            } catch (error) {
                console.error('💥 Erro na inicialização:', error)
                clearAuthData()
                setUser(null)
            } finally {
                setIsLoading(false)
                setIsInitialized(true)
                console.log('✅ Inicialização de autenticação concluída')
            }
        }

        initAuth()
    }, []) // Array vazio para executar apenas uma vez

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated,
            login,
            register,
            logout,
            checkAuth,
            refreshToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}
