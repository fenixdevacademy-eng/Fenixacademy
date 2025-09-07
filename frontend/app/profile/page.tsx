'use client';

import { useState, useEffect } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import {
    User,
    Edit,
    Save,
    X,
    Settings,
    BookOpen,
    Award,
    Calendar,
    Clock,
    TrendingUp,
    LogIn,
    AlertCircle,
    CheckCircle,
    Info
} from 'lucide-react';
import useUserProfile from '../../hooks/useUserProfile';
import { useAuth } from '@/contexts/AuthContext';
import SEOHead from '../components/SEOHeadServer';

export default function ProfilePage() {
    const { profile, loading, error, updateProfile } = useUserProfile();
    const { isAuthenticated } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        bio: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.user_info?.name || '',
                email: profile.user_info?.email || '',
                phone: profile.user_info?.phone || '',
                location: profile.user_info?.location || '',
                bio: profile.user_info?.bio || ''
            });
        }
    }, [profile]);

    // Limpar mensagem após 5 segundos
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando seu perfil...</p>
                </div>
            </div>
        );
    }

    // Se não estiver autenticado, mostrar mensagem de login
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <LogIn className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Acesso Restrito
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Você precisa fazer login para acessar seu perfil.
                        </p>
                        <button
                            onClick={() => window.location.href = '/auth/login'}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Fazer Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Se houver erro, mostrar mensagem
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Erro ao Carregar Perfil
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Se não houver perfil, mostrar mensagem
    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Perfil Não Encontrado
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Não foi possível carregar seus dados de perfil.
                            Entre em contato com o suporte se o problema persistir.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);

        const result = await updateProfile({
            user_info: {
                ...profile.user_info,
                ...formData
            }
        });

        if (result.success) {
            setMessage({ type: 'success', text: result.message || 'Perfil atualizado com sucesso!' });
            setIsEditing(false);
        } else {
            setMessage({ type: 'error', text: result.error || 'Erro ao atualizar perfil' });
        }

        setIsSaving(false);
    };

    const handleCancel = () => {
        if (profile) {
            setFormData({
                name: profile.user_info?.name || '',
                email: profile.user_info?.email || '',
                phone: profile.user_info?.phone || '',
                location: profile.user_info?.location || '',
                bio: profile.user_info?.bio || ''
            });
        }
        setIsEditing(false);
        setMessage(null);
    };

    const stats = [
        {
            label: "Cursos Concluídos",
            value: profile?.user_info?.completedCourses || 0,
            icon: BookOpen,
            color: "text-blue-600"
        },
        {
            label: "Certificados",
            value: profile?.certificates?.length || 0,
            icon: Award,
            color: "text-green-600"
        },
        {
            label: "Dias Ativo",
            value: profile?.study_stats?.current_streak || 0,
            icon: Calendar,
            color: "text-purple-600"
        },
        {
            label: "Horas de Estudo",
            value: profile?.user_info?.studyHours || 0,
            icon: Clock,
            color: "text-orange-600"
        }
    ];

    return (
        <>
            <SEOHead
                title="Meu Perfil - Fenix Academy"
                description="Gerencie seu perfil, veja seu progresso nos cursos e acompanhe suas conquistas na Fenix Academy."
                keywords="perfil, progresso, cursos, certificados, conquistas, fenix academy"
            />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Header do Perfil */}
                    <AnimatedComponent>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                {/* Avatar */}
                                <div className="relative">
                                    <img
                                        src={profile.user_info?.avatar || "/avatars/default.jpg"}
                                        alt="Avatar"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                                    />
                                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Informações do Usuário */}
                                <div className="flex-1">
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Nome completo"
                                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
                                                />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="Email"
                                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
                                                />
                                                <input
                                                    type="text"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="Telefone"
                                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
                                                />
                                                <input
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    placeholder="Localização"
                                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
                                                />
                                            </div>
                                            <textarea
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                placeholder="Biografia"
                                                rows={3}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
                                            />
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={handleSave}
                                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                                                    disabled={isSaving}
                                                >
                                                    {isSaving ? (
                                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    ) : (
                                                        <Save className="h-4 w-4" />
                                                    )}
                                                    {isSaving ? 'Salvando...' : 'Salvar'}
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                                                    disabled={isSaving}
                                                >
                                                    <X className="h-4 w-4" />
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                                {profile.user_info?.name || 'Usuário'}
                                            </h1>
                                            <p className="text-gray-600 mb-2">
                                                {profile.user_info?.email}
                                            </p>
                                            {profile.user_info?.phone && (
                                                <p className="text-gray-600 mb-2">
                                                    {profile.user_info.phone}
                                                </p>
                                            )}
                                            {profile.user_info?.location && (
                                                <p className="text-gray-600 mb-2">
                                                    {profile.user_info.location}
                                                </p>
                                            )}
                                            {profile.user_info?.bio && (
                                                <p className="text-gray-700 mb-4">
                                                    {profile.user_info.bio}
                                                </p>
                                            )}
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                                    disabled={isSaving}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    Editar Perfil
                                                </button>
                                                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                                                    <Settings className="h-4 w-4" />
                                                    Configurações
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </AnimatedComponent>

                    {/* Estatísticas */}
                    <AnimatedComponent delay={200}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                                    <div className={`${stat.color} mb-3`}>
                                        <stat.icon className="h-8 w-8 mx-auto" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-800 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedComponent>

                    {/* Cursos Inscritos */}
                    <AnimatedComponent delay={400}>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                                Meus Cursos
                            </h2>

                            {profile.enrolled_courses && profile.enrolled_courses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {profile.enrolled_courses.map((course) => (
                                        <div key={course.id} className="bg-gray-50 rounded-xl p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <img
                                                    src={course.image || "/courses/default.jpg"}
                                                    alt={course.title}
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {course.instructor}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                    <span>Progresso</span>
                                                    <span>{course.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${course.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="text-sm text-gray-600">
                                                Último acesso: {new Date(course.lastAccessed).toLocaleDateString('pt-BR')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                        Nenhum curso inscrito
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        Comece sua jornada de aprendizado inscrevendo-se em um curso.
                                    </p>
                                    <button
                                        onClick={() => window.location.href = '/courses'}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Ver Cursos Disponíveis
                                    </button>
                                </div>
                            )}
                        </div>
                    </AnimatedComponent>

                    {/* Certificados */}
                    <AnimatedComponent delay={600}>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <Award className="h-6 w-6 text-green-600" />
                                Meus Certificados
                            </h2>

                            {profile.certificates && profile.certificates.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {profile.certificates.map((certificate) => (
                                        <div key={certificate.id} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                                            <div className="text-center mb-4">
                                                <Award className="h-12 w-12 text-green-600 mx-auto mb-2" />
                                                <h3 className="font-semibold text-gray-800">
                                                    {certificate.courseName}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {certificate.instructor}
                                                </p>
                                            </div>

                                            <div className="text-center">
                                                <p className="text-sm text-gray-600 mb-3">
                                                    Emitido em: {new Date(certificate.issueDate).toLocaleDateString('pt-BR')}
                                                </p>
                                                <a
                                                    href={certificate.certificateUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                                                >
                                                    Ver Certificado
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                        Nenhum certificado ainda
                                    </h3>
                                    <p className="text-gray-500">
                                        Complete seus cursos para receber certificados.
                                    </p>
                                </div>
                            )}
                        </div>
                    </AnimatedComponent>

                    {/* Conquistas */}
                    <AnimatedComponent delay={800}>
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                                Minhas Conquistas
                            </h2>

                            {profile.achievements && profile.achievements.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {profile.achievements.map((achievement) => (
                                        <div key={achievement.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                                            <div className="text-center mb-4">
                                                <div className="text-4xl mb-2">
                                                    {achievement.icon}
                                                </div>
                                                <h3 className="font-semibold text-gray-800">
                                                    {achievement.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {achievement.description}
                                                </p>
                                            </div>

                                            <div className="text-center">
                                                <p className="text-sm text-gray-600">
                                                    Conquistado em: {new Date(achievement.earnedDate).toLocaleDateString('pt-BR')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                        Nenhuma conquista ainda
                                    </h3>
                                    <p className="text-gray-500">
                                        Continue estudando para desbloquear conquistas.
                                    </p>
                                </div>
                            )}
                        </div>
                    </AnimatedComponent>
                </div>
            </div>
            {message && (
                <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-${message.type}-500 text-white px-4 py-2 rounded-lg shadow-lg z-50`}>
                    <div className="flex items-center">
                        {message.type === 'success' && <CheckCircle className="h-5 w-5 mr-2" />}
                        {message.type === 'error' && <AlertCircle className="h-5 w-5 mr-2" />}
                        {message.type === 'info' && <Info className="h-5 w-5 mr-2" />}
                        <span>{message.text}</span>
                    </div>
                </div>
            )}
        </>
    );
} 