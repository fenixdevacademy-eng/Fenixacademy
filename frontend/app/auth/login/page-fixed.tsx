'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Sparkles,
    Shield,
    Zap,
    CheckCircle,
    AlertCircle,
    Github,
    Chrome,
    Facebook
} from 'lucide-react'
import AdvancedParticles from '@/components/AdvancedParticles'
import VisualEffects from '@/components/VisualEffects'

export default function LoginPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        try {
            // Validação básica
            const newErrors: any = {}

            if (!formData.email.trim()) {
                newErrors.email = 'Email é obrigatório'
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email inválido'
            }

            if (!formData.password) {
                newErrors.password = 'Senha é obrigatória'
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors)
                setIsLoading(false)
                return
            }

            // Chamada para API de login
            const response = await fetch('/api/auth/login-simple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })

            const data = await response.json()

            if (response.ok) {
                // Sucesso - redirecionar para dashboard
                localStorage.setItem('fenix-jwt-token', data.token)
                window.location.href = '/dashboard'
            } else {
                // Erro - mostrar mensagem
                setErrors({ submit: data.error || 'Erro ao fazer login' })
            }
        } catch (error) {
            console.error('Erro no login:', error)
            setErrors({ submit: 'Erro de conexão. Tente novamente.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const socialProviders = [
        { name: 'Google', icon: Chrome, color: 'from-red-500 to-orange-500' },
        { name: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-900' },
        { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-800' }
    ]

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
            <AdvancedParticles />
            <VisualEffects />

            <div className={`w-full max-w-md transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold gradient-text-neon mb-2">Bem-vindo de volta!</h1>
                    <p className="text-gray-300">Entre na sua conta e continue aprendendo</p>
                </div>

                {/* Login Form */}
                <div className="glass-tech rounded-2xl p-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-white/90">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-white/20'
                                        }`}
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-400 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-white/90">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.password ? 'border-red-500' : 'border-white/20'
                                        }`}
                                    placeholder="Sua senha"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-300">Lembrar de mim</span>
                            </label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Esqueceu a senha?
                            </Link>
                        </div>

                        {/* Error Message */}
                        {errors.submit && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                <span className="text-red-400 text-sm">{errors.submit}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary group flex items-center justify-center space-x-2 py-4 text-lg disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Entrando...</span>
                                </>
                            ) : (
                                <>
                                    <span>Entrar</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-slate-900 text-gray-400">Ou continue com</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-3 gap-4">
                        {socialProviders.map((provider) => (
                            <button
                                key={provider.name}
                                className={`p-4 rounded-xl bg-gradient-to-r ${provider.color} text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                            >
                                <provider.icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{provider.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-gray-300">
                            Não tem uma conta?{' '}
                            <Link
                                href="/auth/register"
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                Cadastre-se aqui
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials */}
                <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h3 className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Credenciais de Demonstração
                    </h3>
                    <div className="space-y-2 text-sm text-gray-300">
                        <div>
                            <strong>Estudante:</strong> joao@exemplo.com / 12345678
                        </div>
                        <div>
                            <strong>Admin:</strong> admin@fenixdevacademy.com / admin123
                        </div>
                        <div>
                            <strong>Outro usuário:</strong> maria@exemplo.com / senha123
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


