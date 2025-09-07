'use client';

import React, { useState, useEffect } from 'react';
import {
    FileText,
    Code,
    Download,
    Star,
    Search,
    Filter,
    Plus,
    Edit3,
    Trash2,
    Copy,
    Zap,
    Globe,
    Database,
    Smartphone,
    Monitor,
    Server
} from 'lucide-react';

interface Template {
    id: string;
    name: string;
    description: string;
    category: 'brazilian' | 'framework' | 'project' | 'utility';
    language: string;
    framework?: string;
    tags: string[];
    content: string;
    rating: number;
    downloads: number;
    isCustom: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface IntelligentTemplateSystemProps {
    theme: 'dark' | 'light';
}

export default function IntelligentTemplateSystem({ theme }: IntelligentTemplateSystemProps) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'brazilian' | 'framework' | 'project'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('all');
    const [selectedFramework, setSelectedFramework] = useState('all');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    // Templates padrão brasileiros
    const defaultTemplates: Template[] = [
        {
            id: '1',
            name: 'Formulário CPF/CNPJ',
            description: 'Formulário de validação brasileira com CPF e CNPJ',
            category: 'brazilian',
            language: 'javascript',
            framework: 'react',
            tags: ['cpf', 'cnpj', 'validação', 'brasil', 'formulário'],
            content: `import React, { useState } from 'react';

// Validação de CPF
const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    if (/^(\\d)\\1{10}$/.test(cleanCPF)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
};

// Validação de CNPJ
const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/\\D/g, '');
    
    if (cleanCNPJ.length !== 14) return false;
    if (/^(\\d)\\1{13}$/.test(cleanCNPJ)) return false;
    
    let sum = 0;
    let weight = 2;
    for (let i = 11; i >= 0; i--) {
        sum += parseInt(cleanCNPJ.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    sum = 0;
    weight = 2;
    for (let i = 12; i >= 0; i--) {
        sum += parseInt(cleanCNPJ.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return digit1 === parseInt(cleanCNPJ.charAt(12)) && 
           digit2 === parseInt(cleanCNPJ.charAt(13));
};

const BrazilianValidationForm: React.FC = () => {
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cpfValid, setCpfValid] = useState<boolean | null>(null);
    const [cnpjValid, setCnpjValid] = useState<boolean | null>(null);

    const handleCpfChange = (value: string) => {
        const cleanValue = value.replace(/\\D/g, '');
        setCpf(cleanValue);
        if (cleanValue.length === 11) {
            setCpfValid(validateCPF(cleanValue));
        } else {
            setCpfValid(null);
        }
    };

    const handleCnpjChange = (value: string) => {
        const cleanValue = value.replace(/\\D/g, '');
        setCnpj(cleanValue);
        if (cleanValue.length === 14) {
            setCnpjValid(validateCNPJ(cleanValue));
        } else {
            setCnpjValid(null);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🇧🇷 Validação Brasileira
            </h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        CPF
                    </label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => handleCpfChange(e.target.value)}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className={\`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent \${
                            cpfValid === null ? 'border-gray-300' :
                            cpfValid ? 'border-green-500' : 'border-red-500'
                        }\`}
                    />
                    {cpfValid !== null && (
                        <p className={\`text-sm mt-1 \${
                            cpfValid ? 'text-green-600' : 'text-red-600'
                        }\`}>
                            {cpfValid ? '✅ CPF válido' : '❌ CPF inválido'}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNPJ
                    </label>
                    <input
                        type="text"
                        value={cnpj}
                        onChange={(e) => handleCnpjChange(e.target.value)}
                        placeholder="00.000.000/0000-00"
                        maxLength={18}
                        className={\`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent \${
                            cnpjValid === null ? 'border-gray-300' :
                            cnpjValid ? 'border-green-500' : 'border-red-500'
                        }\`}
                    />
                    {cnpjValid !== null && (
                        <p className={\`text-sm mt-1 \${
                            cnpjValid ? 'text-green-600' : 'text-red-600'
                        }\`}>
                            {cnpjValid ? '✅ CNPJ válido' : '❌ CNPJ inválido'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrazilianValidationForm;`,
            rating: 4.8,
            downloads: 1250,
            isCustom: false,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        },
        {
            id: '2',
            name: 'Integração PIX',
            description: 'Sistema de pagamento PIX para aplicações brasileiras',
            category: 'brazilian',
            language: 'typescript',
            framework: 'node',
            tags: ['pix', 'pagamento', 'brasil', 'api', 'typescript'],
            content: `import axios from 'axios';

interface PIXData {
    key: string;
    keyType: 'email' | 'cpf' | 'cnpj' | 'phone' | 'random';
    amount: number;
    description: string;
    merchantName: string;
    merchantCity: string;
}

interface PIXResponse {
    success: boolean;
    qrCode: string;
    qrCodeImage: string;
    transactionId: string;
    expiresAt: string;
}

class PIXService {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string, sandbox: boolean = true) {
        this.apiKey = apiKey;
        this.baseUrl = sandbox 
            ? 'https://api-pix-sandbox.banco.com.br' 
            : 'https://api-pix.banco.com.br';
    }

    async generatePIX(data: PIXData): Promise<PIXResponse> {
        try {
            const response = await axios.post(
                \`\${this.baseUrl}/v1/pix/qrcode\`,
                {
                    ...data,
                    currency: 'BRL',
                    country: 'BR'
                },
                {
                    headers: {
                        'Authorization': \`Bearer \${this.apiKey}\`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return {
                success: true,
                qrCode: response.data.qrCode,
                qrCodeImage: response.data.qrCodeImage,
                transactionId: response.data.transactionId,
                expiresAt: response.data.expiresAt
            };
        } catch (error) {
            console.error('Erro ao gerar PIX:', error);
            throw new Error('Falha ao gerar código PIX');
        }
    }

    async checkPaymentStatus(transactionId: string): Promise<{
        status: 'pending' | 'completed' | 'failed' | 'expired';
        amount?: number;
        paidAt?: string;
    }> {
        try {
            const response = await axios.get(
                \`\${this.baseUrl}/v1/pix/status/\${transactionId}\`,
                {
                    headers: {
                        'Authorization': \`Bearer \${this.apiKey}\`
                    }
                }
            );

            return {
                status: response.data.status,
                amount: response.data.amount,
                paidAt: response.data.paidAt
            };
        } catch (error) {
            console.error('Erro ao verificar status:', error);
            throw new Error('Falha ao verificar status do pagamento');
        }
    }

    generatePIXCode(data: PIXData): string {
        // Implementação do código PIX estático
        const pixCode = \`00020126580014br.gov.bcb.pix0136\${data.key}5204000053039865802BR5913\${data.merchantName}6006\${data.merchantCity}62070503***6304\`;
        return pixCode;
    }
}

// Exemplo de uso
const pixService = new PIXService('sua_api_key_aqui');

const pixData: PIXData = {
    key: 'exemplo@email.com',
    keyType: 'email',
    amount: 99.99,
    description: 'Produto exemplo',
    merchantName: 'Empresa Exemplo',
    merchantCity: 'São Paulo'
};

// Gerar PIX
pixService.generatePIX(pixData)
    .then(response => {
        console.log('PIX gerado:', response);
    })
    .catch(error => {
        console.error('Erro:', error);
    });

export default PIXService;`,
            rating: 4.9,
            downloads: 2100,
            isCustom: false,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        },
        {
            id: '3',
            name: 'Compliance LGPD',
            description: 'Sistema de compliance com a Lei Geral de Proteção de Dados',
            category: 'brazilian',
            language: 'javascript',
            framework: 'react',
            tags: ['lgpd', 'compliance', 'privacidade', 'brasil', 'dados'],
            content: `import React, { useState, useEffect } from 'react';

interface LGPDConsent {
    id: string;
    type: 'explicit' | 'implicit' | 'opt-out';
    dataCategory: 'personal' | 'sensitive' | 'anonymous';
    purpose: string;
    retentionPeriod: number;
    userConsent: boolean;
    timestamp: string;
    ipAddress: string;
    userAgent: string;
}

interface LGPDData {
    id: string;
    category: 'personal' | 'sensitive' | 'anonymous';
    description: string;
    purpose: string;
    retentionPeriod: number;
    isEncrypted: boolean;
    accessLevel: 'public' | 'private' | 'restricted';
}

class LGPDService {
    private consents: LGPDConsent[] = [];
    private dataInventory: LGPDData[] = [];

    // Registrar consentimento do usuário
    registerConsent(consent: Omit<LGPDConsent, 'id' | 'timestamp' | 'ipAddress' | 'userAgent'>): string {
        const newConsent: LGPDConsent = {
            ...consent,
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            ipAddress: this.getClientIP(),
            userAgent: navigator.userAgent
        };

        this.consents.push(newConsent);
        localStorage.setItem('lgpd_consents', JSON.stringify(this.consents));
        
        return newConsent.id;
    }

    // Verificar se o usuário deu consentimento
    hasConsent(purpose: string, dataCategory: string): boolean {
        const consent = this.consents.find(c => 
            c.purpose === purpose && 
            c.dataCategory === dataCategory && 
            c.userConsent
        );
        return !!consent;
    }

    // Registrar dados pessoais
    registerData(data: Omit<LGPDData, 'id'>): string {
        const newData: LGPDData = {
            ...data,
            id: this.generateId()
        };

        this.dataInventory.push(newData);
        localStorage.setItem('lgpd_data_inventory', JSON.stringify(this.dataInventory));
        
        return newData.id;
    }

    // Solicitar exclusão de dados (Direito do usuário)
    requestDataDeletion(userId: string, dataIds: string[]): Promise<boolean> {
        return new Promise((resolve) => {
            // Simular processo de exclusão
            setTimeout(() => {
                this.dataInventory = this.dataInventory.filter(data => !dataIds.includes(data.id));
                localStorage.setItem('lgpd_data_inventory', JSON.stringify(this.dataInventory));
                
                // Registrar solicitação de exclusão
                const deletionRequest = {
                    id: this.generateId(),
                    userId,
                    dataIds,
                    timestamp: new Date().toISOString(),
                    status: 'completed'
                };
                
                const deletionRequests = JSON.parse(localStorage.getItem('lgpd_deletion_requests') || '[]');
                deletionRequests.push(deletionRequest);
                localStorage.setItem('lgpd_deletion_requests', JSON.stringify(deletionRequests));
                
                resolve(true);
            }, 1000);
        });
    }

    // Gerar relatório de compliance
    generateComplianceReport(): {
        totalConsents: number;
        totalDataRecords: number;
        complianceScore: number;
        recommendations: string[];
    } {
        const totalConsents = this.consents.length;
        const totalDataRecords = this.dataInventory.length;
        
        let complianceScore = 100;
        const recommendations: string[] = [];

        // Verificar se todos os dados têm propósito definido
        const dataWithoutPurpose = this.dataInventory.filter(data => !data.purpose);
        if (dataWithoutPurpose.length > 0) {
            complianceScore -= 20;
            recommendations.push('Definir propósito para todos os dados pessoais');
        }

        // Verificar se dados sensíveis têm consentimento explícito
        const sensitiveData = this.dataInventory.filter(data => data.category === 'sensitive');
        const explicitConsents = this.consents.filter(c => 
            c.type === 'explicit' && c.userConsent
        );
        
        if (sensitiveData.length > explicitConsents.length) {
            complianceScore -= 30;
            recommendations.push('Dados sensíveis requerem consentimento explícito');
        }

        // Verificar período de retenção
        const longRetentionData = this.dataInventory.filter(data => data.retentionPeriod > 5);
        if (longRetentionData.length > 0) {
            complianceScore -= 15;
            recommendations.push('Revisar período de retenção de dados');
        }

        return {
            totalConsents,
            totalDataRecords,
            complianceScore: Math.max(0, complianceScore),
            recommendations
        };
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    private getClientIP(): string {
        // Em produção, isso viria do servidor
        return '127.0.0.1';
    }
}

// Componente React para consentimento LGPD
const LGPDConsentForm: React.FC = () => {
    const [lgpdService] = useState(() => new LGPDService());
    const [consentData, setConsentData] = useState({
        type: 'explicit' as const,
        dataCategory: 'personal' as const,
        purpose: '',
        retentionPeriod: 1,
        userConsent: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (consentData.userConsent) {
            const consentId = lgpdService.registerConsent(consentData);
            alert(\`Consentimento registrado com ID: \${consentId}\`);
        } else {
            alert('É necessário dar consentimento para continuar');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🔒 Consentimento LGPD
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Consentimento
                    </label>
                    <select
                        value={consentData.type}
                        onChange={(e) => setConsentData({
                            ...consentData,
                            type: e.target.value as any
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="explicit">Explícito</option>
                        <option value="implicit">Implícito</option>
                        <option value="opt-out">Opt-out</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria de Dados
                    </label>
                    <select
                        value={consentData.dataCategory}
                        onChange={(e) => setConsentData({
                            ...consentData,
                            dataCategory: e.target.value as any
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="personal">Dados Pessoais</option>
                        <option value="sensitive">Dados Sensíveis</option>
                        <option value="anonymous">Dados Anonimizados</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Finalidade
                    </label>
                    <textarea
                        value={consentData.purpose}
                        onChange={(e) => setConsentData({
                            ...consentData,
                            purpose: e.target.value
                        })}
                        placeholder="Descreva a finalidade do uso dos dados"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Período de Retenção (anos)
                    </label>
                    <input
                        type="number"
                        value={consentData.retentionPeriod}
                        onChange={(e) => setConsentData({
                            ...consentData,
                            retentionPeriod: parseInt(e.target.value)
                        })}
                        min="1"
                        max="10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="consent"
                        checked={consentData.userConsent}
                        onChange={(e) => setConsentData({
                            ...consentData,
                            userConsent: e.target.checked
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="ml-2 block text-sm text-gray-900">
                        Concordo com o processamento dos meus dados pessoais
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Confirmar Consentimento
                </button>
            </form>
        </div>
    );
};

export { LGPDService, LGPDConsentForm };`,
            rating: 4.7,
            downloads: 1800,
            isCustom: false,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        }
    ];

    useEffect(() => {
        // Carregar templates padrão
        setTemplates(defaultTemplates);
        setFilteredTemplates(defaultTemplates);
    }, []);

    // Filtrar templates
    useEffect(() => {
        let filtered = templates;

        // Filtro por categoria
        if (activeTab !== 'all') {
            filtered = filtered.filter(template => template.category === activeTab);
        }

        // Filtro por linguagem
        if (selectedLanguage !== 'all') {
            filtered = filtered.filter(template => template.language === selectedLanguage);
        }

        // Filtro por framework
        if (selectedFramework !== 'all') {
            filtered = filtered.filter(template => template.framework === selectedFramework);
        }

        // Filtro por busca
        if (searchTerm) {
            filtered = filtered.filter(template =>
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredTemplates(filtered);
    }, [templates, activeTab, selectedLanguage, selectedFramework, searchTerm]);

    // Copiar template para área de transferência
    const copyTemplate = (template: Template) => {
        navigator.clipboard.writeText(template.content);
        alert('Template copiado para a área de transferência!');
    };

    // Baixar template
    const downloadTemplate = (template: Template) => {
        const blob = new Blob([template.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${template.name}.${template.language}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            {/* Header */}
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold flex items-center space-x-2">
                            🎨 <span>Intelligent Template System</span>
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Templates inteligentes e contextuais para desenvolvimento
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 ${theme === 'dark' ? 'hover:bg-blue-700' : 'hover:bg-blue-700'
                            }`}
                    >
                        <Plus className="w-4 h-4" />
                        <span>Novo Template</span>
                    </button>
                </div>
            </div>

            {/* Filtros */}
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Tabs */}
                    <div className="flex space-x-1">
                        {[
                            { id: 'all', label: 'Todos', icon: Code },
                            { id: 'brazilian', label: 'Brasileiros', icon: Globe },
                            { id: 'framework', label: 'Frameworks', icon: Zap },
                            { id: 'project', label: 'Projetos', icon: FileText }
                        ].map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id as any)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${activeTab === id
                                        ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`
                                        : `${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Busca */}
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar templates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Filtros adicionais */}
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className={`px-3 py-2 border rounded-lg ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                    >
                        <option value="all">Todas as linguagens</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                    </select>

                    <select
                        value={selectedFramework}
                        onChange={(e) => setSelectedFramework(e.target.value)}
                        className={`px-3 py-2 border rounded-lg ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                    >
                        <option value="all">Todos os frameworks</option>
                        <option value="react">React</option>
                        <option value="vue">Vue</option>
                        <option value="angular">Angular</option>
                        <option value="node">Node.js</option>
                        <option value="django">Django</option>
                    </select>
                </div>
            </div>

            {/* Lista de Templates */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {filteredTemplates.map((template) => (
                        <div
                            key={template.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                }`}
                            onClick={() => setSelectedTemplate(template)}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{template.description}</p>
                                </div>
                                {template.isCustom && (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                        Custom
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center space-x-2 mb-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${template.category === 'brazilian' ? 'bg-green-100 text-green-800' :
                                        template.category === 'framework' ? 'bg-blue-100 text-blue-800' :
                                            'bg-purple-100 text-purple-800'
                                    }`}>
                                    {template.category}
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                    {template.language}
                                </span>
                                {template.framework && (
                                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                        {template.framework}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm">{template.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Download className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm">{template.downloads}</span>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyTemplate(template);
                                    }}
                                    className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Copy className="w-4 h-4" />
                                    <span>Copiar</span>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        downloadTemplate(template);
                                    }}
                                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Baixar</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de Template Selecionado */}
            {selectedTemplate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`w-11/12 h-5/6 max-w-4xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl flex flex-col`}>
                        <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
                            <h3 className="text-xl font-bold">{selectedTemplate.name}</h3>
                            <button
                                onClick={() => setSelectedTemplate(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <pre className={`text-sm overflow-x-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                                {selectedTemplate.content}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



