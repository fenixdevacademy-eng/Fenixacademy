'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { logout } from '../../lib/auth/auth-utils'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Award,
    BookOpen,
    Clock,
    Star,
    Edit,
    Save,
    X,
    Settings,
    Shield,
    Zap,
    Target,
    Heart,
    Globe,
    Code,
    Database,
    Smartphone,
    Lock
} from 'lucide-react'
// import AdvancedParticles from '@/components/AdvancedParticles'
// import VisualEffects from '@/components/VisualEffects'

interface UserProfile {
    id: number
    userId: number
    phone?: string
    location?: string
    bio?: string
    avatar?: string
    skills: string[]
    interests: string[]
    joinDate: string
    user: {
        id: number
        name: string
        email: string
        role: string
        createdAt: string
    }
    stats: {
        coursesCompleted: number
        totalHours: number
        certificates: number
        totalPoints: number
        rank: string
    }
    preferences: {
        publicProfile: boolean
        showProgress: boolean
        notifications: boolean
        emailUpdates: boolean
    }
}

export default function ProfilePage() {
    const router = useRouter()
    const { user, isAuthenticated, isLoading: authLoading, checkAuth } = useAuth()
    const [isLoaded, setIsLoaded] = useState(false)
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({
        phone: '',
        location: '',
        bio: '',
        skills: '',
        interests: ''
    })
    const [error, setError] = useState('')

    useEffect(() => {
        const initProfile = async () => {
            if (authLoading) return

            if (!isAuthenticated) {
                router.push('/auth/login')
                return
            }

            setIsLoaded(true)
            await fetchProfile()
        }

        initProfile()
    }, [authLoading, isAuthenticated, router])

    // Verificar autenticação periodicamente
    useEffect(() => {
        if (isAuthenticated) {
            const interval = setInterval(async () => {
                const isStillAuthenticated = await checkAuth()
                if (!isStillAuthenticated) {
                    router.push('/auth/login')
                }
            }, 30000) // Verificar a cada 30 segundos

            return () => clearInterval(interval)
        }
    }, [isAuthenticated, checkAuth, router])

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('fenix-jwt-token')
            if (!token) {
                console.error('Token não encontrado')
                return
            }

            const response = await fetch('/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Token inválido, redirecionando para login')
                    router.push('/auth/login')
                    return
                }
                throw new Error(`Erro ao carregar perfil: ${response.status}`)
            }

            const data = await response.json()
            if (data.success) {
                setProfile(data.profile)
                setEditData({
                    phone: data.profile.phone || '',
                    location: data.profile.location || '',
                    bio: data.profile.bio || '',
                    skills: Array.isArray(data.profile.skills) ? data.profile.skills.join(', ') : (data.profile.skills || ''),
                    interests: Array.isArray(data.profile.interests) ? data.profile.interests.join(', ') : (data.profile.interests || '')
                })
            } else {
                throw new Error(data.error || 'Erro ao carregar perfil')
            }
        } catch (error) {
            console.error('Erro ao carregar perfil:', error)
            setError('Erro ao carregar dados do perfil')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('fenix-jwt-token')
            if (!token) return

            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: editData.phone,
                    location: editData.location,
                    bio: editData.bio,
                    skills: editData.skills.split(',').map(s => s.trim()).filter(s => s),
                    interests: editData.interests.split(',').map(s => s.trim()).filter(s => s),
                    preferences: profile?.preferences
                })
            })

            if (!response.ok) {
                throw new Error('Erro ao atualizar perfil')
            }

            const data = await response.json()
            if (data.success) {
                await fetchProfile() // Recarregar dados
                setIsEditing(false)
            }
        } catch (error) {
            console.error('Erro ao salvar perfil:', error)
            setError('Erro ao salvar alterações')
        }
    }

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/auth/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fenix-primary mx-auto mb-4"></div>
                    <p className="text-white text-xl">Carregando perfil...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-fenix-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-fenix-error" />
                    </div>
                    <p className="text-white text-xl mb-4">Acesso não autorizado</p>
                    <p className="text-gray-300 mb-6">Você precisa fazer login para acessar seu perfil</p>
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="btn-primary"
                    >
                        Fazer Login
                    </button>
                </div>
            </div>
        )
    }

    if (!profile && !isLoading) {
        return (
            <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-fenix-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-fenix-error" />
                    </div>
                    <p className="text-white text-xl mb-4">Erro ao carregar perfil</p>
                    {error && <p className="text-gray-300 mb-4">{error}</p>}
                    <div className="space-x-4">
                        <button
                            onClick={() => fetchProfile()}
                            className="btn-primary"
                        >
                            Tentar Novamente
                        </button>
                        <button
                            onClick={() => router.push('/auth/login')}
                            className="btn-tech"
                        >
                            Fazer Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-fenix-dark">
            <AdvancedParticles />
            <VisualEffects />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-fenix-primary/10 border border-fenix-primary/20 rounded-full px-4 py-2 mb-6">
                        <User className="w-5 h-5 text-fenix-primary" />
                        <span className="text-fenix-primary font-medium">Meu Perfil</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold gradient-text-neon mb-6">
                        Bem-vindo, {profile?.user.name || 'Usuário'}!
                    </h1>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Gerencie suas informações pessoais e acompanhe seu progresso na Fênix Academy
                    </p>
                </div>

                {/* Informações do Usuário */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {/* Card Principal */}
                    <div className="lg:col-span-2">
                        <div className="glass-tech rounded-2xl p-8">
                            <div className="flex items-start justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Informações Pessoais</h2>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="btn-tech flex items-center gap-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    {isEditing ? 'Cancelar' : 'Editar'}
                                </button>
                            </div>

                            {isEditing ? (
                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Telefone
                                            </label>
                                            <input
                                                type="tel"
                                                value={editData.phone}
                                                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="(11) 99999-9999"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Localização
                                            </label>
                                            <input
                                                type="text"
                                                value={editData.location}
                                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="São Paulo, SP"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            value={editData.bio}
                                            onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Conte um pouco sobre você..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Habilidades (separadas por vírgula)
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.skills}
                                            onChange={(e) => setEditData({ ...editData, skills: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="React, Node.js, Python, JavaScript"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Interesses (separados por vírgula)
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.interests}
                                            onChange={(e) => setEditData({ ...editData, interests: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Desenvolvimento Web, Data Science, Mobile"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleSave}
                                            className="btn-primary flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            Salvar Alterações
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="btn-tech flex items-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-blue-500/20">
                                                <Mail className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Email</p>
                                                <p className="text-white font-medium">{profile?.user.email || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-green-500/20">
                                                <Phone className="w-6 h-6 text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Telefone</p>
                                                <p className="text-white font-medium">{profile?.phone || 'Não informado'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-purple-500/20">
                                                <MapPin className="w-6 h-6 text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Localização</p>
                                                <p className="text-white font-medium">{profile?.location || 'Não informado'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-orange-500/20">
                                                <Calendar className="w-6 h-6 text-orange-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Membro desde</p>
                                                <p className="text-white font-medium">
                                                    {profile?.joinDate ? new Date(profile.joinDate).toLocaleDateString('pt-BR') : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {profile?.bio && (
                                        <div>
                                            <p className="text-sm text-gray-400 mb-2">Sobre mim</p>
                                            <p className="text-white leading-relaxed">{profile.bio}</p>
                                        </div>
                                    )}

                                    {profile?.skills && profile.skills.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-400 mb-3">Habilidades</p>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {profile?.interests && profile.interests.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-400 mb-3">Interesses</p>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.interests.map((interest, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                                                    >
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar com Estatísticas */}
                    <div className="space-y-6">
                        {/* Estatísticas */}
                        <div className="glass-tech rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Award className="w-6 h-6 text-yellow-400" />
                                Estatísticas
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="w-5 h-5 text-blue-400" />
                                        <span className="text-gray-300">Cursos Concluídos</span>
                                    </div>
                                    <span className="text-white font-bold text-xl">{profile?.stats.coursesCompleted || 0}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-green-400" />
                                        <span className="text-gray-300">Horas Estudadas</span>
                                    </div>
                                    <span className="text-white font-bold text-xl">{profile?.stats.totalHours || 0}h</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Star className="w-5 h-5 text-yellow-400" />
                                        <span className="text-gray-300">Certificados</span>
                                    </div>
                                    <span className="text-white font-bold text-xl">{profile?.stats.certificates || 0}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-5 h-5 text-purple-400" />
                                        <span className="text-gray-300">Pontos</span>
                                    </div>
                                    <span className="text-white font-bold text-xl">{profile?.stats.totalPoints || 0}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Target className="w-5 h-5 text-red-400" />
                                        <span className="text-gray-300">Rank</span>
                                    </div>
                                    <span className="text-white font-bold text-xl">{profile?.stats.rank || 'Iniciante'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Ações Rápidas */}
                        <div className="glass-tech rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Settings className="w-6 h-6 text-blue-400" />
                                Ações
                            </h3>

                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push('/courses')}
                                    className="w-full btn-tech flex items-center gap-3 justify-start"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Ver Cursos
                                </button>

                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="w-full btn-tech flex items-center gap-3 justify-start"
                                >
                                    <Target className="w-5 h-5" />
                                    Dashboard
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full btn-tech flex items-center gap-3 justify-start text-red-400 hover:text-red-300"
                                >
                                    <Lock className="w-5 h-5" />
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status do Usuário */}
                <div className="glass-tech rounded-2xl p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{profile?.user.name || 'Usuário'}</h3>
                                <p className="text-gray-300">
                                    {profile?.user.role === 'admin' ? 'Administrador' : 'Estudante'} •
                                    Membro desde {profile?.user.createdAt ? new Date(profile.user.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                                <Shield className="w-4 h-4" />
                                Conta Ativa
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}