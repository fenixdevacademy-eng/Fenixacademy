'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import Link from 'next/link'

interface ProfileData {
    id: number
    name: string
    email: string
    role: string
    created_at: string
    last_login?: string
    phone?: string
    city?: string
    state?: string
    country?: string
    bio?: string
    skills?: string[]
    interests?: string[]
    avatar?: string
}

export default function ProfilePage() {
    const [profileData, setProfileData] = useState<ProfileData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { user, isAuthenticated, logout } = useAuth()
    const router = useRouter()

    // Redirecionar se não estiver logado
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login')
        }
    }, [isAuthenticated, router])

    // Carregar dados do perfil
    useEffect(() => {
        if (user) {
            loadProfileData()
        }
    }, [user])

    const loadProfileData = async () => {
        setIsLoading(true)
        setError('')

        try {
            console.log('👤 Carregando dados reais do perfil para:', user?.email)

            // Buscar token do localStorage
            const token = localStorage.getItem('fenix-jwt-token')
            if (!token) {
                throw new Error('Token não encontrado')
            }

            // Buscar dados reais da API
            const response = await fetch('http://localhost:3002/api/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`)
            }

            const result = await response.json()

            if (result.success) {
                const data = result.data

                // Converter dados da API para o formato do componente
                const apiProfileData: ProfileData = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    created_at: data.created_at,
                    last_login: data.last_login,
                    phone: data.phone,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    bio: data.bio,
                    skills: data.skills,
                    interests: data.interests,
                    avatar: data.avatar
                }

                setProfileData(apiProfileData)
                console.log('✅ Dados do perfil carregados com sucesso:', data)
            } else {
                throw new Error(result.message || 'Erro ao carregar dados')
            }
        } catch (err) {
            console.error('❌ Erro ao carregar perfil:', err)
            setError('Erro ao carregar dados do perfil')

            // Fallback para dados básicos do contexto
            if (user) {
                setProfileData({
                    id: parseInt(user.id),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    created_at: user.created_at,
                    last_login: user.last_login,
                    phone: user.phone,
                    city: user.city,
                    state: user.state,
                    country: user.country,
                    bio: user.bio,
                    skills: user.skills,
                    interests: user.interests,
                    avatar: user.avatar
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (field: keyof ProfileData, value: string | string[]) => {
        if (profileData) {
            setProfileData(prev => ({
                ...prev!,
                [field]: value
            }))
        }
    }

    const handleSave = async () => {
        if (!profileData) return

        setIsSaving(true)
        setError('')
        setSuccess('')

        try {
            console.log('💾 Salvando dados reais do perfil:', profileData)

            // Buscar token do localStorage
            const token = localStorage.getItem('fenix-jwt-token')
            if (!token) {
                throw new Error('Token não encontrado')
            }

            // Preparar dados para envio (apenas campos editáveis)
            const updateData = {
                name: profileData.name,
                phone: profileData.phone,
                city: profileData.city,
                state: profileData.state,
                country: profileData.country,
                bio: profileData.bio,
                skills: profileData.skills,
                interests: profileData.interests
            }

            // Enviar dados para a API
            const response = await fetch('http://localhost:3002/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            })

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`)
            }

            const result = await response.json()

            if (result.success) {
                // Atualizar dados locais com a resposta da API
                const updatedData = result.data
                setProfileData({
                    id: updatedData.id,
                    name: updatedData.name,
                    email: updatedData.email,
                    role: updatedData.role,
                    created_at: updatedData.created_at,
                    last_login: updatedData.last_login,
                    phone: updatedData.phone,
                    city: updatedData.city,
                    state: updatedData.state,
                    country: updatedData.country,
                    bio: updatedData.bio,
                    skills: updatedData.skills,
                    interests: updatedData.interests,
                    avatar: updatedData.avatar
                })

                setSuccess('Perfil atualizado com sucesso!')
                setIsEditing(false)

                // Limpar mensagem de sucesso após 3 segundos
                setTimeout(() => setSuccess(''), 3000)

                console.log('✅ Perfil atualizado com sucesso:', updatedData)
            } else {
                throw new Error(result.message || 'Erro ao salvar perfil')
            }
        } catch (err) {
            console.error('❌ Erro ao salvar perfil:', err)
            setError('Erro ao salvar perfil. Tente novamente.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    const getRoleDisplayName = (role: string) => {
        const roleMap: { [key: string]: string } = {
            'admin': 'Administrador',
            'user': 'Usuário',
            'instructor': 'Instrutor',
            'student': 'Estudante'
        }
        return roleMap[role] || role
    }

    const getRoleColor = (role: string) => {
        const colorMap: { [key: string]: string } = {
            'admin': 'bg-red-100 text-red-800',
            'user': 'bg-blue-100 text-blue-800',
            'instructor': 'bg-green-100 text-green-800',
            'student': 'bg-purple-100 text-purple-800'
        }
        return colorMap[role] || 'bg-gray-100 text-gray-800'
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecionando para o login...</p>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando perfil...</p>
                </div>
            </div>
        )
    }

    if (!profileData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600">Erro ao carregar dados do perfil</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">
                                            {profileData.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                                    <p className="text-gray-600">{profileData.email}</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(profileData.role)}`}>
                                        {getRoleDisplayName(profileData.role)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Editar Perfil
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                        >
                                            {isSaving ? 'Salvando...' : 'Salvar'}
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-6">
                        {success}
                    </div>
                )}

                {/* Profile Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Informações Básicas */}
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Informações Pessoais</h2>
                            </div>
                            <div className="px-6 py-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        ) : (
                                            <p className="mt-1 text-sm text-gray-900">{profileData.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <p className="mt-1 text-sm text-gray-900">{profileData.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={profileData.phone || ''}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="(11) 99999-9999"
                                            />
                                        ) : (
                                            <p className="mt-1 text-sm text-gray-900">{profileData.phone || 'Não informado'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Função</label>
                                        <p className="mt-1 text-sm text-gray-900">{getRoleDisplayName(profileData.role)}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Biografia</label>
                                    {isEditing ? (
                                        <textarea
                                            value={profileData.bio || ''}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Conte um pouco sobre você..."
                                        />
                                    ) : (
                                        <p className="mt-1 text-sm text-gray-900">{profileData.bio || 'Nenhuma biografia informada'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Estatísticas */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Estatísticas</h3>
                            </div>
                            <div className="px-6 py-4 space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Membro desde</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {new Date(profileData.created_at).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Último acesso</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {profileData.last_login
                                            ? new Date(profileData.last_login).toLocaleDateString('pt-BR')
                                            : 'Primeiro acesso'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ações Rápidas */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Ações Rápidas</h3>
                            </div>
                            <div className="px-6 py-4 space-y-3">
                                <Link
                                    href="/dashboard"
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    📊 Dashboard
                                </Link>
                                <Link
                                    href="/courses"
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    📚 Meus Cursos
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    ⚙️ Configurações
                                </Link>
                                <Link
                                    href="/help"
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                >
                                    ❓ Ajuda
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}