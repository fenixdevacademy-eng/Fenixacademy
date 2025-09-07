'use client';

import { useState } from 'react';
import {
    User,
    Mail,
    Lock,
    Bell,
    Shield,
    CreditCard,
    Globe,
    DollarSign,
    Settings,
    Save,
    Eye,
    EyeOff,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    CreditCard as CardIcon,
    Smartphone,
    Monitor,
    Wifi,
    WifiOff
} from 'lucide-react';
import Link from 'next/link';

interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    available: boolean;
    processingTime: string;
    fees: string;
}

interface Currency {
    code: string;
    name: string;
    symbol: string;
    rate: number;
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [profileData, setProfileData] = useState({
        name: 'Usuário Fenix',
        email: 'aluno@fenixacademy.com',
        phone: '+55 (21) 986289597',
        bio: 'Aluno dedicado da Fenix Academy',
        location: 'Itaboraí, RJ - Brasil',
        timezone: 'America/Sao_Paulo'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        courseUpdates: true,
        newCourses: true,
        achievements: true,
        marketing: false
    });

    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: 'public',
        showProgress: true,
        showAchievements: true,
        allowMessages: true,
        dataAnalytics: true
    });

    const paymentMethods: PaymentMethod[] = [
        {
            id: 'pix',
            name: 'PIX',
            icon: <Smartphone className="w-5 h-5" />,
            description: 'Pagamento instantâneo brasileiro',
            available: true,
            processingTime: 'Instantâneo',
            fees: 'Grátis'
        },
        {
            id: 'stripe',
            name: 'Cartão de Crédito',
            icon: <CardIcon className="w-5 h-5" />,
            description: 'Visa, Mastercard, American Express',
            available: true,
            processingTime: '2-3 dias',
            fees: '2.9% + R$ 0.30'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: <Globe className="w-5 h-5" />,
            description: 'Pagamento internacional seguro',
            available: true,
            processingTime: '1-2 dias',
            fees: '3.5% + R$ 0.50'
        },
        {
            id: 'crypto',
            name: 'Criptomoedas',
            icon: <DollarSign className="w-5 h-5" />,
            description: 'Bitcoin, Ethereum, USDT',
            available: true,
            processingTime: '10-30 minutos',
            fees: '1%'
        },
        {
            id: 'bank_transfer',
            name: 'Transferência Bancária',
            icon: <Monitor className="w-5 h-5" />,
            description: 'Transferência direta para conta',
            available: true,
            processingTime: '1-3 dias úteis',
            fees: 'R$ 5.00'
        }
    ];

    const currencies: Currency[] = [
        { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$', rate: 1 },
        { code: 'USD', name: 'Dólar Americano', symbol: '$', rate: 0.21 },
        { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.19 },
        { code: 'GBP', name: 'Libra Esterlina', symbol: '£', rate: 0.16 },
        { code: 'CAD', name: 'Dólar Canadense', symbol: 'C$', rate: 0.28 },
        { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$', rate: 0.32 }
    ];

    const [selectedCurrency, setSelectedCurrency] = useState('BRL');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('pix');

    const handleSave = async (section: string) => {
        setIsSaving(true);

        // Simular salvamento
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);

            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);
        }, 1000);
    };

    const formatPrice = (price: number, currency: string) => {
        const currencyData = currencies.find(c => c.code === currency);
        const convertedPrice = price * (currencyData?.rate || 1);
        return `${currencyData?.symbol}${convertedPrice.toFixed(2)}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-blue-600 hover:text-blue-700">
                                ← Voltar
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Settings className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
                            <nav className="space-y-2">
                                {[
                                    { id: 'profile', label: 'Perfil', icon: User },
                                    { id: 'security', label: 'Segurança', icon: Lock },
                                    { id: 'notifications', label: 'Notificações', icon: Bell },
                                    { id: 'privacy', label: 'Privacidade', icon: Shield },
                                    { id: 'payments', label: 'Pagamentos', icon: CreditCard }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Success Message */}
                        {saveSuccess && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 mb-6">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="text-green-800 font-medium">Configurações salvas com sucesso!</p>
                                </div>
                            </div>
                        )}

                        {/* Profile Settings */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-xl shadow-sm border p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações do Perfil</h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nome Completo
                                            </label>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Telefone
                                            </label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Localização
                                            </label>
                                            <input
                                                type="text"
                                                value={profileData.location}
                                                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Biografia
                                        </label>
                                        <textarea
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleSave('profile')}
                                            disabled={isSaving}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    <span>Salvando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    <span>Salvar Alterações</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Settings */}
                        {activeTab === 'security' && (
                            <div className="bg-white rounded-xl shadow-sm border p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Segurança</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Senha Atual
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="w-5 h-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nova Senha
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showNewPassword ? 'text' : 'password'}
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showNewPassword ? (
                                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="w-5 h-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirmar Nova Senha
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="w-5 h-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleSave('security')}
                                            disabled={isSaving}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    <span>Salvando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    <span>Alterar Senha</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Settings */}
                        {activeTab === 'notifications' && (
                            <div className="bg-white rounded-xl shadow-sm border p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Notificações</h2>
                                <div className="space-y-6">
                                    {Object.entries(notificationSettings).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Receber notificações sobre {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleSave('notifications')}
                                            disabled={isSaving}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    <span>Salvando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    <span>Salvar Preferências</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Settings */}
                        {activeTab === 'privacy' && (
                            <div className="bg-white rounded-xl shadow-sm border p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacidade</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Visibilidade do Perfil
                                        </label>
                                        <select
                                            value={privacySettings.profileVisibility}
                                            onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="public">Público</option>
                                            <option value="friends">Apenas Amigos</option>
                                            <option value="private">Privado</option>
                                        </select>
                                    </div>
                                    {Object.entries(privacySettings).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Permitir que outros vejam seu {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setPrivacySettings({ ...privacySettings, [key]: !value })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleSave('privacy')}
                                            disabled={isSaving}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    <span>Salvando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    <span>Salvar Configurações</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Settings */}
                        {activeTab === 'payments' && (
                            <div className="bg-white rounded-xl shadow-sm border p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações de Pagamento</h2>

                                {/* Currency Selection */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Moeda de Pagamento</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {currencies.map((currency) => (
                                            <button
                                                key={currency.code}
                                                onClick={() => setSelectedCurrency(currency.code)}
                                                className={`p-4 border rounded-lg text-left transition-colors ${selectedCurrency === currency.code
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="font-medium text-gray-900">{currency.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {formatPrice(197, currency.code)} por curso
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Métodos de Pagamento</h3>
                                    <div className="space-y-4">
                                        {paymentMethods.map((method) => (
                                            <div
                                                key={method.id}
                                                className={`p-4 border rounded-lg transition-colors ${selectedPaymentMethod === method.id
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600">
                                                            {method.icon}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{method.name}</h4>
                                                            <p className="text-sm text-gray-500">{method.description}</p>
                                                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                                                                <span>⏱️ {method.processingTime}</span>
                                                                <span>💳 {method.fees}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setSelectedPaymentMethod(method.id)}
                                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPaymentMethod === method.id
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {selectedPaymentMethod === method.id ? 'Selecionado' : 'Selecionar'}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* International Payment Info */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pagamento Internacional</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">Métodos Disponíveis</h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li>• PayPal (aceito mundialmente)</li>
                                                <li>• Cartões de crédito internacionais</li>
                                                <li>• Criptomoedas (Bitcoin, Ethereum)</li>
                                                <li>• Transferência bancária internacional</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">Informações Importantes</h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li>• Conversão automática de moedas</li>
                                                <li>• Taxas de câmbio em tempo real</li>
                                                <li>• Suporte em português e inglês</li>
                                                <li>• Certificado digital válido mundialmente</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleSave('payments')}
                                        disabled={isSaving}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                <span>Salvando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                <span>Salvar Configurações</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 