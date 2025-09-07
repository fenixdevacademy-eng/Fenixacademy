'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, Copy, Download } from 'lucide-react';

interface BrazilianToolsServiceProps {
    theme: 'dark' | 'light';
}

export default function BrazilianToolsService({ theme }: BrazilianToolsServiceProps) {
    const [activeTab, setActiveTab] = useState<'validation' | 'pix' | 'lgpd' | 'cep'>('validation');
    const [cpfInput, setCpfInput] = useState('');
    const [cnpjInput, setCnpjInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [cepInput, setCepInput] = useState('');
    const [validationResults, setValidationResults] = useState<any>(null);
    const [pixData, setPixData] = useState({
        key: '',
        keyType: 'email',
        amount: '',
        description: ''
    });
    const [lgpdData, setLgpdData] = useState({
        consentType: 'explicit',
        dataCategory: 'personal',
        retentionPeriod: '1',
        purpose: ''
    });

    // Validação de CPF
    const validateCPF = (cpf: string): boolean => {
        const cleanCPF = cpf.replace(/\D/g, '');

        if (cleanCPF.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

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
        const cleanCNPJ = cnpj.replace(/\D/g, '');

        if (cleanCNPJ.length !== 14) return false;
        if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

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

    // Validação de telefone brasileiro
    const validateBrazilianPhone = (phone: string): boolean => {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    };

    // Busca de CEP
    const searchCEP = async (cep: string) => {
        try {
            const cleanCEP = cep.replace(/\D/g, '');
            if (cleanCEP.length !== 8) return null;

            const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
            const data = await response.json();

            if (data.erro) return null;
            return data;
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            return null;
        }
    };

    // Executar validações
    const runValidations = () => {
        const results = {
            cpf: {
                value: cpfInput,
                isValid: validateCPF(cpfInput),
                formatted: cpfInput.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            },
            cnpj: {
                value: cnpjInput,
                isValid: validateCNPJ(cnpjInput),
                formatted: cnpjInput.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
            },
            phone: {
                value: phoneInput,
                isValid: validateBrazilianPhone(phoneInput),
                formatted: phoneInput.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
            }
        };

        setValidationResults(results);
    };

    // Gerar código PIX
    const generatePIXCode = () => {
        const pixCode = `00020126580014br.gov.bcb.pix0136${pixData.key}5204000053039865802BR5913${pixData.description}6006${pixData.amount}6304`;
        return pixCode;
    };

    // Gerar código de compliance LGPD
    const generateLGPDCode = () => {
        return `// LGPD Compliance - ${new Date().toISOString().split('T')[0]}
const lgpdConsent = {
    type: '${lgpdData.consentType}',
    dataCategory: '${lgpdData.dataCategory}',
    retentionPeriod: ${lgpdData.retentionPeriod},
    purpose: '${lgpdData.purpose}',
    timestamp: new Date().toISOString(),
    userConsent: true
};

// Armazenar consentimento
localStorage.setItem('lgpd_consent', JSON.stringify(lgpdConsent));

// Verificar compliance
function checkLGPDCompliance() {
    const consent = JSON.parse(localStorage.getItem('lgpd_consent') || '{}');
    return consent.userConsent && consent.timestamp;
}`;
    };

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            {/* Header */}
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                <h2 className="text-xl font-bold flex items-center space-x-2">
                    🇧🇷 <span>Brazilian Tools Service</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Ferramentas especializadas para o mercado brasileiro
                </p>
            </div>

            {/* Tabs */}
            <div className={`flex border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                {[
                    { id: 'validation', label: 'Validações', icon: CheckCircle },
                    { id: 'pix', label: 'PIX', icon: Copy },
                    { id: 'lgpd', label: 'LGPD', icon: AlertTriangle },
                    { id: 'cep', label: 'CEP', icon: Info }
                ].map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id as any)}
                        className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === id
                                ? `${theme === 'dark' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'}`
                                : `${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Validações */}
                {activeTab === 'validation' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Validações Brasileiras</h3>

                        {/* CPF */}
                        <div>
                            <label className="block text-sm font-medium mb-2">CPF</label>
                            <input
                                type="text"
                                value={cpfInput}
                                onChange={(e) => setCpfInput(e.target.value.replace(/\D/g, ''))}
                                placeholder="00000000000"
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                maxLength={11}
                            />
                        </div>

                        {/* CNPJ */}
                        <div>
                            <label className="block text-sm font-medium mb-2">CNPJ</label>
                            <input
                                type="text"
                                value={cnpjInput}
                                onChange={(e) => setCnpjInput(e.target.value.replace(/\D/g, ''))}
                                placeholder="00000000000000"
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                maxLength={14}
                            />
                        </div>

                        {/* Telefone */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Telefone</label>
                            <input
                                type="text"
                                value={phoneInput}
                                onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                                placeholder="11999999999"
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                maxLength={11}
                            />
                        </div>

                        <button
                            onClick={runValidations}
                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Validar Todos
                        </button>

                        {/* Resultados */}
                        {validationResults && (
                            <div className="space-y-3">
                                <h4 className="font-medium">Resultados:</h4>

                                {/* CPF Result */}
                                <div className={`p-3 rounded-lg ${validationResults.cpf.isValid
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    <div className="flex items-center space-x-2">
                                        {validationResults.cpf.isValid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        <span className="font-medium">CPF:</span>
                                        <span>{validationResults.cpf.formatted}</span>
                                        <span className={validationResults.cpf.isValid ? 'text-green-600' : 'text-red-600'}>
                                            {validationResults.cpf.isValid ? 'Válido' : 'Inválido'}
                                        </span>
                                    </div>
                                </div>

                                {/* CNPJ Result */}
                                <div className={`p-3 rounded-lg ${validationResults.cnpj.isValid
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    <div className="flex items-center space-x-2">
                                        {validationResults.cnpj.isValid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        <span className="font-medium">CNPJ:</span>
                                        <span>{validationResults.cnpj.formatted}</span>
                                        <span className={validationResults.cnpj.isValid ? 'text-green-600' : 'text-red-600'}>
                                            {validationResults.cnpj.isValid ? 'Válido' : 'Inválido'}
                                        </span>
                                    </div>
                                </div>

                                {/* Phone Result */}
                                <div className={`p-3 rounded-lg ${validationResults.phone.isValid
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    <div className="flex items-center space-x-2">
                                        {validationResults.phone.isValid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        <span className="font-medium">Telefone:</span>
                                        <span>{validationResults.phone.formatted}</span>
                                        <span className={validationResults.phone.isValid ? 'text-green-600' : 'text-red-600'}>
                                            {validationResults.phone.isValid ? 'Válido' : 'Inválido'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* PIX */}
                {activeTab === 'pix' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Gerador de PIX</h3>

                        <div>
                            <label className="block text-sm font-medium mb-2">Tipo de Chave</label>
                            <select
                                value={pixData.keyType}
                                onChange={(e) => setPixData({ ...pixData, keyType: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            >
                                <option value="email">E-mail</option>
                                <option value="cpf">CPF</option>
                                <option value="cnpj">CNPJ</option>
                                <option value="phone">Telefone</option>
                                <option value="random">Chave Aleatória</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Chave PIX</label>
                            <input
                                type="text"
                                value={pixData.key}
                                onChange={(e) => setPixData({ ...pixData, key: e.target.value })}
                                placeholder="Digite a chave PIX"
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Valor (R$)</label>
                            <input
                                type="number"
                                value={pixData.amount}
                                onChange={(e) => setPixData({ ...pixData, amount: e.target.value })}
                                placeholder="0.00"
                                step="0.01"
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Descrição</label>
                            <input
                                type="text"
                                value={pixData.description}
                                onChange={(e) => setPixData({ ...pixData, description: e.target.value })}
                                placeholder="Descrição do pagamento"
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            />
                        </div>

                        <button
                            onClick={() => {
                                const pixCode = generatePIXCode();
                                navigator.clipboard.writeText(pixCode);
                                alert('Código PIX copiado para a área de transferência!');
                            }}
                            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                            <Copy className="w-4 h-4" />
                            <span>Gerar e Copiar Código PIX</span>
                        </button>
                    </div>
                )}

                {/* LGPD */}
                {activeTab === 'lgpd' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Compliance LGPD</h3>

                        <div>
                            <label className="block text-sm font-medium mb-2">Tipo de Consentimento</label>
                            <select
                                value={lgpdData.consentType}
                                onChange={(e) => setLgpdData({ ...lgpdData, consentType: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            >
                                <option value="explicit">Explícito</option>
                                <option value="implicit">Implícito</option>
                                <option value="opt-out">Opt-out</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Categoria de Dados</label>
                            <select
                                value={lgpdData.dataCategory}
                                onChange={(e) => setLgpdData({ ...lgpdData, dataCategory: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            >
                                <option value="personal">Dados Pessoais</option>
                                <option value="sensitive">Dados Sensíveis</option>
                                <option value="anonymous">Dados Anonimizados</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Período de Retenção (anos)</label>
                            <input
                                type="number"
                                value={lgpdData.retentionPeriod}
                                onChange={(e) => setLgpdData({ ...lgpdData, retentionPeriod: e.target.value })}
                                min="1"
                                max="10"
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Finalidade</label>
                            <textarea
                                value={lgpdData.purpose}
                                onChange={(e) => setLgpdData({ ...lgpdData, purpose: e.target.value })}
                                placeholder="Descreva a finalidade do uso dos dados"
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            />
                        </div>

                        <button
                            onClick={() => {
                                const lgpdCode = generateLGPDCode();
                                navigator.clipboard.writeText(lgpdCode);
                                alert('Código de compliance LGPD copiado para a área de transferência!');
                            }}
                            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                            <Download className="w-4 h-4" />
                            <span>Gerar Código de Compliance</span>
                        </button>
                    </div>
                )}

                {/* CEP */}
                {activeTab === 'cep' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Busca de CEP</h3>

                        <div>
                            <label className="block text-sm font-medium mb-2">CEP</label>
                            <input
                                type="text"
                                value={cepInput}
                                onChange={(e) => setCepInput(e.target.value.replace(/\D/g, ''))}
                                placeholder="00000000"
                                className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                maxLength={8}
                            />
                        </div>

                        <button
                            onClick={async () => {
                                const cepData = await searchCEP(cepInput);
                                if (cepData) {
                                    alert(`CEP encontrado:\n${cepData.logradouro}, ${cepData.bairro}\n${cepData.localidade} - ${cepData.uf}\nCEP: ${cepData.cep}`);
                                } else {
                                    alert('CEP não encontrado ou inválido!');
                                }
                            }}
                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Buscar CEP
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}



