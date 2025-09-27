'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: number
    name: string
    email: string
    role: string
    createdAt: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    register: (name: string, email: string, password: string, confirmPassword: string) => Promise<{ success: boolean; error?: string }>
    logout: () => void
    checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const isAuthenticated = !!user

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (data.success) {
                setUser(data.user)
                return { success: true }
            } else {
                return { success: false, error: data.error }
            }
        } catch (error) {
            console.error('Erro no login:', error)
            return { success: false, error: 'Erro de conexão' }
        }
    }

    const register = async (name: string, email: string, password: string, confirmPassword: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            })

            const data = await response.json()

            if (data.success) {
                setUser(data.user)
                return { success: true }
            } else {
                return { success: false, error: data.error }
            }
        } catch (error) {
            console.error('Erro no registro:', error)
            return { success: false, error: 'Erro de conexão' }
        }
    }

    const logout = async () => {
        try {
            // Chamar API de logout
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.error('Erro no logout:', error)
        } finally {
            // Limpar dados locais
            setUser(null)
            router.push('/auth/login')
        }
    }

    const checkAuth = async (): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (data.success && data.user) {
                setUser(data.user)
                return true
            } else {
                setUser(null)
                return false
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error)
            setUser(null)
            return false
        }
    }

    useEffect(() => {
        const initAuth = async () => {
            setIsLoading(true)
            await checkAuth()
            setIsLoading(false)
        }

        initAuth()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated,
            login,
            register,
            logout,
            checkAuth
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


