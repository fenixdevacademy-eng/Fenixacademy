/**
 * 🇧🇷 Brazilian Tools Service - Ferramentas Brasileiras Integradas
 * Funcionalidades: Validações CPF/CNPJ, Sistema PIX, Compliance LGPD, CEP Lookup
 */

const QRCode = require('qrcode');
const crypto = require('crypto');
const axios = require('axios');

class BrazilianToolsService {
    constructor() {
        this.validators = {};
        this.pixService = null;
        this.lgpdService = null;
        this.cepService = null;

        this.init();
    }

    async init() {
        await this.setupValidators();
        await this.setupPIXService();
        await this.setupLGPDService();
        await this.setupCEPService();
        console.log('🇧🇷 Brazilian Tools Service inicializado com sucesso!');
    }

    /**
     * 🔐 Sistema de Validações Nacionais
     */
    async setupValidators() {
        this.validators = {
            cpf: this.createCPFValidator(),
            cnpj: this.createCNPJValidator(),
            phone: this.createPhoneValidator(),
            cep: this.createCEPValidator()
        };
    }

    createCPFValidator() {
        return {
            validate: (cpf) => {
                // Remove caracteres não numéricos
                const cleanCPF = cpf.replace(/\D/g, '');

                // Verifica se tem 11 dígitos
                if (cleanCPF.length !== 11) {
                    return { isValid: false, error: 'CPF deve ter 11 dígitos' };
                }

                // Verifica se todos os dígitos são iguais
                if (/^(\d)\1{10}$/.test(cleanCPF)) {
                    return { isValid: false, error: 'CPF inválido' };
                }

                // Validação do primeiro dígito verificador
                let sum = 0;
                for (let i = 0; i < 9; i++) {
                    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
                }
                let remainder = sum % 11;
                let digit1 = remainder < 2 ? 0 : 11 - remainder;

                // Validação do segundo dígito verificador
                sum = 0;
                for (let i = 0; i < 10; i++) {
                    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
                }
                remainder = sum % 11;
                let digit2 = remainder < 2 ? 0 : 11 - remainder;

                // Verifica se os dígitos verificadores estão corretos
                if (parseInt(cleanCPF.charAt(9)) !== digit1 || parseInt(cleanCPF.charAt(10)) !== digit2) {
                    return { isValid: false, error: 'CPF inválido' };
                }

                return {
                    isValid: true,
                    formatted: this.formatCPF(cleanCPF),
                    masked: this.maskCPF(cleanCPF),
                    clean: cleanCPF
                };
            },

            format: (cpf) => {
                const clean = cpf.replace(/\D/g, '');
                return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            },

            mask: (cpf) => {
                const clean = cpf.replace(/\D/g, '');
                return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-**');
            }
        };
    }

    createCNPJValidator() {
        return {
            validate: (cnpj) => {
                // Remove caracteres não numéricos
                const cleanCNPJ = cnpj.replace(/\D/g, '');

                // Verifica se tem 14 dígitos
                if (cleanCNPJ.length !== 14) {
                    return { isValid: false, error: 'CNPJ deve ter 14 dígitos' };
                }

                // Verifica se todos os dígitos são iguais
                if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
                    return { isValid: false, error: 'CNPJ inválido' };
                }

                // Validação do primeiro dígito verificador
                let sum = 0;
                const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
                for (let i = 0; i < 12; i++) {
                    sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
                }
                let remainder = sum % 11;
                let digit1 = remainder < 2 ? 0 : 11 - remainder;

                // Validação do segundo dígito verificador
                sum = 0;
                const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
                for (let i = 0; i < 13; i++) {
                    sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i];
                }
                remainder = sum % 11;
                let digit2 = remainder < 2 ? 0 : 11 - remainder;

                // Verifica se os dígitos verificadores estão corretos
                if (parseInt(cleanCNPJ.charAt(12)) !== digit1 || parseInt(cleanCNPJ.charAt(13)) !== digit2) {
                    return { isValid: false, error: 'CNPJ inválido' };
                }

                return {
                    isValid: true,
                    formatted: this.formatCNPJ(cleanCNPJ),
                    masked: this.maskCNPJ(cleanCNPJ),
                    clean: cleanCNPJ
                };
            },

            format: (cnpj) => {
                const clean = cnpj.replace(/\D/g, '');
                return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            },

            mask: (cnpj) => {
                const clean = cnpj.replace(/\D/g, '');
                return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '**.$2.$3/****-**');
            }
        };
    }

    createPhoneValidator() {
        return {
            validate: (phone) => {
                // Remove caracteres não numéricos
                const cleanPhone = phone.replace(/\D/g, '');

                // Verifica se tem 10 ou 11 dígitos (com DDD)
                if (cleanPhone.length < 10 || cleanPhone.length > 11) {
                    return { isValid: false, error: 'Telefone deve ter 10 ou 11 dígitos' };
                }

                // Verifica se começa com DDD válido
                const ddd = cleanPhone.substring(0, 2);
                const validDDDs = [
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28',
                    '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49',
                    '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69',
                    '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89',
                    '91', '92', '93', '94', '95', '96', '97', '98', '99'
                ];

                if (!validDDDs.includes(ddd)) {
                    return { isValid: false, error: 'DDD inválido' };
                }

                return {
                    isValid: true,
                    formatted: this.formatPhone(cleanPhone),
                    masked: this.maskPhone(cleanPhone),
                    clean: cleanPhone,
                    ddd: ddd
                };
            },

            format: (phone) => {
                const clean = phone.replace(/\D/g, '');
                if (clean.length === 11) {
                    return clean.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else {
                    return clean.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                }
            },

            mask: (phone) => {
                const clean = phone.replace(/\D/g, '');
                if (clean.length === 11) {
                    return clean.replace(/(\d{2})(\d{5})(\d{4})/, '($1) *****-$3');
                } else {
                    return clean.replace(/(\d{2})(\d{4})(\d{4})/, '($1) ****-$3');
                }
            }
        };
    }

    createCEPValidator() {
        return {
            validate: (cep) => {
                // Remove caracteres não numéricos
                const cleanCEP = cep.replace(/\D/g, '');

                // Verifica se tem 8 dígitos
                if (cleanCEP.length !== 8) {
                    return { isValid: false, error: 'CEP deve ter 8 dígitos' };
                }

                return {
                    isValid: true,
                    formatted: this.formatCEP(cleanCEP),
                    clean: cleanCEP
                };
            },

            format: (cep) => {
                const clean = cep.replace(/\D/g, '');
                return clean.replace(/(\d{5})(\d{3})/, '$1-$2');
            }
        };
    }

    /**
     * 💰 Sistema PIX Integrado
     */
    async setupPIXService() {
        this.pixService = {
            generateQRCode: this.generatePIXQRCode.bind(this),
            validatePIXData: this.validatePIXData.bind(this),
            simulateTransaction: this.simulatePIXTransaction.bind(this),
            processPayment: this.processPIXPayment.bind(this)
        };
    }

    async generatePIXQRCode(data) {
        try {
            const pixString = this.buildPIXString(data);
            const qrCode = await QRCode.toDataURL(pixString);

            return {
                qrCode,
                pixString,
                expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
                validationUrl: this.getPIXValidationUrl(data.transactionId),
                data: data
            };
        } catch (error) {
            console.error('❌ Erro ao gerar QR Code PIX:', error);
            throw error;
        }
    }

    buildPIXString(data) {
        // Implementação da string PIX seguindo o padrão do Banco Central
        const pixData = {
            merchantName: data.merchantName || 'Fenix Academy',
            merchantCity: data.merchantCity || 'São Paulo',
            amount: data.amount || '0.00',
            transactionId: data.transactionId || this.generateTransactionId(),
            description: data.description || 'Pagamento Fenix Academy'
        };

        // Formato: 00020126580014br.gov.bcb.pix0136{transactionId}520400005303986540{amount}5802BR5913{merchantName}6006{merchantCity}62070503***6304
        return `00020126580014br.gov.bcb.pix0136${pixData.transactionId}520400005303986540${pixData.amount}5802BR5913${pixData.merchantName}6006${pixData.merchantCity}62070503***6304`;
    }

    async validatePIXData(data) {
        const validations = [
            this.validateMerchantName(data.merchantName),
            this.validateAmount(data.amount),
            this.validateTransactionId(data.transactionId),
            this.validateCity(data.merchantCity)
        ];

        return {
            isValid: validations.every(v => v.isValid),
            errors: validations.filter(v => !v.isValid),
            warnings: validations.filter(v => v.warning),
            data: data
        };
    }

    async simulatePIXTransaction(data) {
        // Simula transação PIX sem custo real
        try {
            const simulation = {
                status: 'success',
                transactionId: data.transactionId || this.generateTransactionId(),
                processingTime: Math.random() * 2000 + 500, // 500ms a 2.5s
                fees: '0.00',
                estimatedSettlement: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
                qrCode: await this.generatePIXQRCode(data)
            };

            return simulation;
        } catch (error) {
            console.error('❌ Erro na simulação PIX:', error);
            throw error;
        }
    }

    async processPIXPayment(pixData) {
        // Processa pagamento PIX real (integração com gateway)
        try {
            // Aqui seria feita a integração real com o gateway PIX
            const payment = {
                status: 'processing',
                transactionId: pixData.transactionId,
                amount: pixData.amount,
                timestamp: new Date().toISOString(),
                gateway: 'pix-gateway'
            };

            return payment;
        } catch (error) {
            console.error('❌ Erro no processamento PIX:', error);
            throw error;
        }
    }

    /**
     * 🔒 Sistema de Compliance LGPD
     */
    async setupLGPDService() {
        this.lgpdService = {
            auditPrivacy: this.auditPrivacy.bind(this),
            generateConsent: this.generateConsent.bind(this),
            validateDataRetention: this.validateDataRetention.bind(this),
            generatePrivacyReport: this.generatePrivacyReport.bind(this)
        };
    }

    async auditPrivacy(code) {
        try {
            const analysis = {
                dataCollection: this.auditDataCollection(code),
                consentManagement: this.auditConsentManagement(code),
                dataRetention: this.auditDataRetention(code),
                dataSecurity: this.auditDataSecurity(code),
                userRights: this.auditUserRights(code)
            };

            return {
                ...analysis,
                complianceScore: this.calculateLGPDComplianceScore(analysis),
                recommendations: this.generateLGPDRecommendations(analysis),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('❌ Erro na auditoria LGPD:', error);
            throw error;
        }
    }

    auditDataCollection(code) {
        const dataCollectionPatterns = [
            /email/i,
            /cpf/i,
            /cnpj/i,
            /telefone/i,
            /endereco/i,
            /cep/i,
            /dados.*pessoal/i,
            /informacao.*usuario/i
        ];

        const findings = [];
        dataCollectionPatterns.forEach(pattern => {
            const matches = code.match(pattern);
            if (matches) {
                findings.push({
                    pattern: pattern.source,
                    matches: matches.length,
                    risk: 'medium'
                });
            }
        });

        return {
            hasDataCollection: findings.length > 0,
            findings,
            risk: findings.length > 0 ? 'medium' : 'low'
        };
    }

    auditConsentManagement(code) {
        const consentPatterns = [
            /consentimento/i,
            /consent/i,
            /aceito/i,
            /concordo/i,
            /permissao/i,
            /permission/i
        ];

        const findings = [];
        consentPatterns.forEach(pattern => {
            const matches = code.match(pattern);
            if (matches) {
                findings.push({
                    pattern: pattern.source,
                    matches: matches.length,
                    risk: 'low'
                });
            }
        });

        return {
            hasConsentManagement: findings.length > 0,
            findings,
            risk: findings.length === 0 ? 'high' : 'low'
        };
    }

    async generateConsent(config) {
        const consent = {
            id: this.generateConsentId(),
            userId: config.userId,
            timestamp: new Date().toISOString(),
            dataTypes: config.dataTypes || [],
            purpose: config.purpose || 'Serviços Fenix Academy',
            legalBasis: config.legalBasis || 'execution_of_contract',
            retentionPeriod: config.retentionPeriod || 365, // dias
            status: 'active',
            version: '1.0'
        };

        return consent;
    }

    /**
     * 📍 Sistema de CEP Lookup
     */
    async setupCEPService() {
        this.cepService = {
            lookup: this.lookupCEP.bind(this),
            validate: this.validators.cep.validate.bind(this.validators.cep),
            format: this.validators.cep.format.bind(this.validators.cep)
        };
    }

    async lookupCEP(cep) {
        try {
            const cleanCEP = cep.replace(/\D/g, '');

            if (cleanCEP.length !== 8) {
                throw new Error('CEP deve ter 8 dígitos');
            }

            // Usar API ViaCEP para buscar endereço
            const response = await axios.get(`https://viacep.com.br/ws/${cleanCEP}/json/`);

            if (response.data.erro) {
                throw new Error('CEP não encontrado');
            }

            return {
                cep: cleanCEP,
                formatted: this.formatCEP(cleanCEP),
                logradouro: response.data.logradouro,
                bairro: response.data.bairro,
                cidade: response.data.localidade,
                estado: response.data.uf,
                ibge: response.data.ibge,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('❌ Erro no lookup CEP:', error);
            throw error;
        }
    }

    // Métodos auxiliares
    generateTransactionId() {
        return crypto.randomBytes(16).toString('hex');
    }

    generateConsentId() {
        return crypto.randomBytes(8).toString('hex');
    }

    getPIXValidationUrl(transactionId) {
        return `https://pix.fenix.academy/validate/${transactionId}`;
    }

    validateMerchantName(name) {
        if (!name || name.length < 3) {
            return { isValid: false, error: 'Nome do comerciante deve ter pelo menos 3 caracteres' };
        }
        return { isValid: true };
    }

    validateAmount(amount) {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return { isValid: false, error: 'Valor deve ser um número positivo' };
        }
        return { isValid: true };
    }

    validateTransactionId(id) {
        if (!id || id.length < 10) {
            return { isValid: false, error: 'ID da transação deve ter pelo menos 10 caracteres' };
        }
        return { isValid: true };
    }

    validateCity(city) {
        if (!city || city.length < 2) {
            return { isValid: false, error: 'Cidade deve ter pelo menos 2 caracteres' };
        }
        return { isValid: true };
    }

    calculateLGPDComplianceScore(analysis) {
        let score = 100;

        if (!analysis.dataCollection.hasDataCollection) score -= 20;
        if (!analysis.consentManagement.hasConsentManagement) score -= 30;
        if (analysis.dataRetention.risk === 'high') score -= 25;
        if (analysis.dataSecurity.risk === 'high') score -= 25;

        return Math.max(0, score);
    }

    generateLGPDRecommendations(analysis) {
        const recommendations = [];

        if (!analysis.consentManagement.hasConsentManagement) {
            recommendations.push({
                priority: 'high',
                message: 'Implementar sistema de gerenciamento de consentimento',
                category: 'consent'
            });
        }

        if (analysis.dataRetention.risk === 'high') {
            recommendations.push({
                priority: 'medium',
                message: 'Definir políticas claras de retenção de dados',
                category: 'retention'
            });
        }

        return recommendations;
    }

    formatCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    maskCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-**');
    }

    formatCNPJ(cnpj) {
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    maskCNPJ(cnpj) {
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '**.$2.$3/****-**');
    }

    formatPhone(phone) {
        if (phone.length === 11) {
            return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {
            return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
    }

    maskPhone(phone) {
        if (phone.length === 11) {
            return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) *****-$3');
        } else {
            return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) ****-$3');
        }
    }

    formatCEP(cep) {
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
}

module.exports = BrazilianToolsService;
