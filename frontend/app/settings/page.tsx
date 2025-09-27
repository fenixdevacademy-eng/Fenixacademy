'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Settings,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Monitor,
    Moon,
    Sun,
    Eye,
    EyeOff,
    Save,
    X,
    CheckCircle,
    AlertCircle,
    Lock,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Key,
    Trash2,
    Download,
    Upload,
    RefreshCw,
    HelpCircle,
    MessageCircle,
    Brain,
    Code,
    BookOpen,
    Award,
    Trophy,
    Flame,
    Target,
    BarChart3,
    TrendingUp,
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

interface UserSettings {
    profile: {
        name: string;
        email: string;
        phone: string;
        location: string;
        bio: string;
        avatar: string;
    }
    preferences: {
        theme: 'light' | 'dark' | 'system';
        language: 'pt' | 'en' | 'es';
        timezone: string;
        dateFormat: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd';
        timeFormat: '12h' | '24h';
    }
    notifications: {
        email: {
            courseUpdates: boolean;
            newCourses: boolean;
            achievements: boolean;
            weeklyDigest: boolean;
            marketing: boolean;
        }
        push: {
            courseReminders: boolean;
            newMessages: boolean;
            systemUpdates: boolean;
            achievements: boolean;
        }
        inApp: {
            showBanners: boolean;
            showToasts: boolean;
            soundEnabled: boolean;
        }
    }
    privacy: {
        profileVisibility: 'public' | 'private' | 'friends';
        showProgress: boolean;
        showAchievements: boolean;
        showCourses: boolean;
        allowMessages: boolean;
        dataSharing: boolean;
    }
    security: {
        twoFactorEnabled: boolean;
        loginAlerts: boolean;
        sessionTimeout: number;
        passwordExpiry: number;
    }
    accessibility: {
        highContrast: boolean;
        largeText: boolean;
        reducedMotion: boolean;
        screenReader: boolean;
        keyboardNavigation: boolean;
    }
}

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);

    const [settings, setSettings] = useState<UserSettings>({
        profile: {
            name: 'João Silva',
            email: 'joao.silva@email.com',
            phone: '+55 (21) 99999-9999',
            location: 'Rio de Janeiro, RJ',
            bio: 'Desenvolvedor apaixonado por tecnologia e sempre em busca de novos conhecimentos.',
            avatar: '/avatars/joao-silva.jpg'
        },
        preferences: {
            theme: 'dark',
            language: 'pt',
            timezone: 'America/Sao_Paulo',
            dateFormat: 'dd/mm/yyyy',
            timeFormat: '24h'
        },
        notifications: {
            email: {
                courseUpdates: true,
                newCourses: true,
                achievements: true,
                weeklyDigest: false,
                marketing: false
            },
            push: {
                courseReminders: true,
                newMessages: true,
                systemUpdates: true,
                achievements: true
            },
            inApp: {
                showBanners: true,
                showToasts: true,
                soundEnabled: true
            }
        },
        privacy: {
            profileVisibility: 'public',
            showProgress: true,
            showAchievements: true,
            showCourses: true,
            allowMessages: true,
            dataSharing: false
        },
        security: {
            twoFactorEnabled: false,
            loginAlerts: true,
            sessionTimeout: 30,
            passwordExpiry: 90
        },
        accessibility: {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            screenReader: false,
            keyboardNavigation: true
        }
    });

    const [formData, setFormData] = useState(settings.profile);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const sections = [
        { id: 'profile', label: 'Perfil', icon: <User className="w-4 h-4" /> },
        { id: 'preferences', label: 'Preferências', icon: <Palette className="w-4 h-4" /> },
        { id: 'notifications', label: 'Notificações', icon: <Bell className="w-4 h-4" /> },
        { id: 'privacy', label: 'Privacidade', icon: <Shield className="w-4 h-4" /> },
        { id: 'security', label: 'Segurança', icon: <Lock className="w-4 h-4" /> },
        { id: 'accessibility', label: 'Acessibilidade', icon: <Eye className="w-4 h-4" /> }
    ];

    const themes = [
        { value: 'light', label: 'Claro', icon: <Sun className="w-4 h-4" /> },
        { value: 'dark', label: 'Escuro', icon: <Moon className="w-4 h-4" /> },
        { value: 'system', label: 'Sistema', icon: <Monitor className="w-4 h-4" /> }
    ];

    const languages = [
        { value: 'pt', label: 'Português', flag: '🇧🇷' },
        { value: 'en', label: 'English', flag: '🇺🇸' },
        { value: 'es', label: 'Español', flag: '🇪🇸' }
    ];

    const timezones = [
        'America/Sao_Paulo',
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSettingChange = (path: string, value: any) => {
        setSettings(prev => {
            const keys = path.split('.');
            const newSettings = { ...prev }
            let current = newSettings as any;

            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newSettings;
        });
    }

    const handleSave = () => {
        setSettings(prev => ({
            ...prev,
            profile: formData
        }));
        setIsEditing(false);
    }

    const handleCancel = () => {
        setFormData(settings.profile);
        setIsEditing(false);
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implementar lógica de mudança de senha
        console.log('Mudando senha...');
        setShowPasswordForm(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }

    const handleDeleteAccount = () => {
        // Implementar lógica de exclusão de conta
        console.log('Excluindo conta...');
        setShowDeleteAccount(false);
    }

    const renderProfileSection = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Informações do Perfil</h3>
                {isEditing ? (
                    <div className="flex space-x-3">
                        <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Salvar
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Settings className="w-4 h-4 mr-2" />
                        Editar
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-white">{settings.profile.name}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-white">{settings.profile.email}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-white">{settings.profile.phone}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Localização</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-white">{settings.profile.location}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                {isEditing ? (
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ) : (
                    <p className="text-white">{settings.profile.bio}</p>
                )}
            </div>
        </div>
    );

    const renderPreferencesSection = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Preferências Gerais</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tema</label>
                    <div className="space-y-2">
                        {themes.map((theme) => (
                            <label key={theme.value} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="theme"
                                    value={theme.value}
                                    checked={settings.preferences.theme === theme.value}
                                    onChange={(e) => handleSettingChange('preferences.theme', e.target.value)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <div className="flex items-center space-x-2">
                                    {theme.icon}
                                    <span className="text-white">{theme.label}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Idioma</label>
                    <select
                        value={settings.preferences.language}
                        onChange={(e) => handleSettingChange('preferences.language', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {languages.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.flag} {lang.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Fuso Horário</label>
                    <select
                        value={settings.preferences.timezone}
                        onChange={(e) => handleSettingChange('preferences.timezone', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {timezones.map((tz) => (
                            <option key={tz} value={tz}>{tz}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Formato de Data</label>
                    <select
                        value={settings.preferences.dateFormat}
                        onChange={(e) => handleSettingChange('preferences.dateFormat', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="dd/mm/yyyy">DD/MM/AAAA</option>
                        <option value="mm/dd/yyyy">MM/DD/AAAA</option>
                        <option value="yyyy-mm-dd">AAAA-MM-DD</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderNotificationsSection = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Configurações de Notificação</h3>

            <div className="space-y-6">
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Notificações por Email</h4>
                    <div className="space-y-3">
                        {Object.entries(settings.notifications.email).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-white font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                    </h5>
                                    <p className="text-sm text-gray-400">
                                        {key === 'courseUpdates' && 'Receber atualizações sobre seus cursos'}
                                        {key === 'newCourses' && 'Notificar sobre novos cursos disponíveis'}
                                        {key === 'achievements' && 'Receber notificações de conquistas'}
                                        {key === 'weeklyDigest' && 'Resumo semanal de atividades'}
                                        {key === 'marketing' && 'Promoções e ofertas especiais'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleSettingChange(`notifications.email.${key}`, !value)}
                                    className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-600'
                                        }`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'
                                        }`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Notificações Push</h4>
                    <div className="space-y-3">
                        {Object.entries(settings.notifications.push).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <div>
                                    <h5 className="text-white font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                    </h5>
                                    <p className="text-sm text-gray-400">
                                        {key === 'courseReminders' && 'Lembretes de aulas e prazos'}
                                        {key === 'newMessages' && 'Novas mensagens da comunidade'}
                                        {key === 'systemUpdates' && 'Atualizações do sistema'}
                                        {key === 'achievements' && 'Conquistas desbloqueadas'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleSettingChange(`notifications.push.${key}`, !value)}
                                    className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-600'
                                        }`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'
                                        }`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPrivacySection = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Configurações de Privacidade</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Visibilidade do Perfil</label>
                    <select
                        value={settings.privacy.profileVisibility}
                        onChange={(e) => handleSettingChange('privacy.profileVisibility', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="public">Público</option>
                        <option value="friends">Apenas Amigos</option>
                        <option value="private">Privado</option>
                    </select>
                </div>

                {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                        <div>
                            <h5 className="text-white font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </h5>
                            <p className="text-sm text-gray-400">
                                {key === 'showProgress' && 'Mostrar progresso nos cursos'}
                                {key === 'showAchievements' && 'Exibir conquistas conquistadas'}
                                {key === 'showCourses' && 'Listar cursos em andamento'}
                                {key === 'allowMessages' && 'Permitir mensagens de outros usuários'}
                                {key === 'dataSharing' && 'Compartilhar dados para melhorias'}
                            </p>
                        </div>
                        <button
                            onClick={() => handleSettingChange(`privacy.${key}`, !value)}
                            className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-600'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSecuritySection = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Configurações de Segurança</h3>

            <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-white font-medium">Autenticação de Dois Fatores</h4>
                            <p className="text-sm text-gray-400">Adicione uma camada extra de segurança à sua conta</p>
                        </div>
                        <button
                            onClick={() => handleSettingChange('security.twoFactorEnabled', !settings.security.twoFactorEnabled)}
                            className={`w-12 h-6 rounded-full transition-colors ${settings.security.twoFactorEnabled ? 'bg-green-600' : 'bg-gray-600'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                        </button>
                    </div>
                    {settings.security.twoFactorEnabled && (
                        <div className="flex items-center space-x-2 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">2FA ativado</span>
                        </div>
                    )}
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-white font-medium">Alterar Senha</h4>
                            <p className="text-sm text-gray-400">Atualize sua senha regularmente</p>
                        </div>
                        <button
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Alterar
                        </button>
                    </div>

                    {showPasswordForm && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Senha Atual</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Nova Senha</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar Nova Senha</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Salvar Senha
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordForm(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-red-400 font-medium">Excluir Conta</h4>
                            <p className="text-sm text-red-300">Esta ação não pode ser desfeita</p>
                        </div>
                        <button
                            onClick={() => setShowDeleteAccount(true)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAccessibilitySection = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Configurações de Acessibilidade</h3>

            <div className="space-y-4">
                {Object.entries(settings.accessibility).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                        <div>
                            <h5 className="text-white font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </h5>
                            <p className="text-sm text-gray-400">
                                {key === 'highContrast' && 'Aumentar contraste para melhor legibilidade'}
                                {key === 'largeText' && 'Aumentar tamanho da fonte'}
                                {key === 'reducedMotion' && 'Reduzir animações e transições'}
                                {key === 'screenReader' && 'Otimizar para leitores de tela'}
                                {key === 'keyboardNavigation' && 'Navegação por teclado aprimorada'}
                            </p>
                        </div>
                        <button
                            onClick={() => handleSettingChange(`accessibility.${key}`, !value)}
                            className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-600'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link href="/" className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-2xl font-bold">
                                <span className="text-blue-500">FENIX</span> SETTINGS
                            </span>
                        </Link>
                        <nav className="hidden lg:flex space-x-8">
                            <Link href="/dashboard" className="text-white hover:text-blue-400">Dashboard</Link>
                            <Link href="/courses" className="text-white hover:text-blue-400">Cursos</Link>
                            <Link href="/ide-advanced" className="text-white hover:text-blue-400">IDE</Link>
                            <Link href="/settings" className="text-blue-400 font-semibold">Configurações</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-400 hover:text-white">
                                <Bell className="w-5 h-5" />
                            </button>
                            <Link href="/profile" className="text-white hover:text-blue-400">Perfil</Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Configurações</h3>
                            <div className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeSection === section.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                                            }`}
                                    >
                                        {section.icon}
                                        <span>{section.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-gray-800 rounded-xl p-6">
                            {activeSection === 'profile' && renderProfileSection()}
                            {activeSection === 'preferences' && renderPreferencesSection()}
                            {activeSection === 'notifications' && renderNotificationsSection()}
                            {activeSection === 'privacy' && renderPrivacySection()}
                            {activeSection === 'security' && renderSecuritySection()}
                            {activeSection === 'accessibility' && renderAccessibilitySection()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Modal */}
            {showDeleteAccount && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-white mb-4">Excluir Conta</h3>
                        <p className="text-gray-400 mb-6">
                            Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todos os seus dados serão perdidos permanentemente.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex-1"
                            >
                                Sim, Excluir
                            </button>
                            <button
                                onClick={() => setShowDeleteAccount(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex-1"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Actions */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
                <button className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                </button>
                <button className="bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}