import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface PaymentData {
    planId: string;
    paymentMethod: 'credit' | 'pix' | 'boleto' | 'transfer';
    amount: number;
    installments?: number;
    cardData?: {
        cardNumber: string;
        expiryDate: string;
        cvv: string;
        cardName: string;
    };
    email?: string;
    phone?: string;
    cpf?: string;
}

interface PaymentResult {
    success: boolean;
    transactionId?: string;
    status?: string;
    message?: string;
    instructions?: string;
    bankData?: any;
    expiresAt?: string;
}

interface PaymentStatus {
    transactionId: string;
    status: string;
    message: string;
    canRetry: boolean;
    lastChecked: string;
    nextCheck: string;
}

export const usePayments = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

    const processPayment = useCallback(async (paymentData: PaymentData): Promise<PaymentResult> => {
        setIsProcessing(true);
        setPaymentStatus('processing');

        try {
            const response = await fetch('/api/payments/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const result = await response.json();

            if (result.success) {
                setPaymentStatus('success');
                toast.success(result.data.message);
                return {
                    success: true,
                    transactionId: result.data.transactionId,
                    status: result.data.status,
                    message: result.data.message,
                    instructions: result.data.instructions,
                    bankData: result.data.bankData,
                    expiresAt: result.data.expiresAt
                };
            } else {
                setPaymentStatus('error');
                toast.error(result.message || 'Erro no processamento do pagamento');
                return {
                    success: false,
                    message: result.message
                };
            }
        } catch (error) {
            setPaymentStatus('error');
            const errorMessage = 'Erro de conexão. Tente novamente.';
            toast.error(errorMessage);
            return {
                success: false,
                message: errorMessage
            };
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const checkPaymentStatus = useCallback(async (transactionId: string): Promise<PaymentStatus | null> => {
        try {
            const response = await fetch(`/api/payments/status?transactionId=${transactionId}`);
            const result = await response.json();

            if (result.success) {
                return result.data;
            } else {
                toast.error(result.message || 'Erro ao verificar status do pagamento');
                return null;
            }
        } catch (error) {
            toast.error('Erro de conexão ao verificar status');
            return null;
        }
    }, []);

    const getPaymentHistory = useCallback(async () => {
        try {
            const response = await fetch('/api/payments');
            const result = await response.json();

            if (result.success) {
                return result.data;
            } else {
                toast.error('Erro ao carregar histórico de pagamentos');
                return null;
            }
        } catch (error) {
            toast.error('Erro de conexão ao carregar histórico');
            return null;
        }
    }, []);

    const retryPayment = useCallback(async (paymentData: PaymentData): Promise<PaymentResult> => {
        return processPayment(paymentData);
    }, [processPayment]);

    const cancelPayment = useCallback(async (transactionId: string): Promise<boolean> => {
        try {
            // In a real application, this would call a cancel payment API
            toast.success('Pagamento cancelado com sucesso');
            return true;
        } catch (error) {
            toast.error('Erro ao cancelar pagamento');
            return false;
        }
    }, []);

    const downloadInvoice = useCallback(async (transactionId: string) => {
        try {
            // In a real application, this would generate and download the invoice
            toast.success('Nota fiscal baixada com sucesso');
        } catch (error) {
            toast.error('Erro ao baixar nota fiscal');
        }
    }, []);

    const copyToClipboard = useCallback((text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copiado para a área de transferência!`);
    }, []);

    const formatCurrency = useCallback((amount: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    }, []);

    const formatInstallments = useCallback((amount: number, installments: number): string => {
        const installmentAmount = amount / installments;
        return `${installments}x de ${formatCurrency(installmentAmount)} sem juros`;
    }, [formatCurrency]);

    const validateCardNumber = useCallback((cardNumber: string): boolean => {
        // Remove spaces and non-digits
        const cleaned = cardNumber.replace(/\D/g, '');

        // Check if it's a valid length (13-19 digits)
        if (cleaned.length < 13 || cleaned.length > 19) {
            return false;
        }

        // Luhn algorithm validation
        let sum = 0;
        let isEven = false;

        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned[i]);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }, []);

    const validateCPF = useCallback((cpf: string): boolean => {
        // Remove non-digits
        const cleaned = cpf.replace(/\D/g, '');

        // Check if it has 11 digits
        if (cleaned.length !== 11) {
            return false;
        }

        // Check for known invalid CPFs
        if (/^(\d)\1{10}$/.test(cleaned)) {
            return false;
        }

        // Validate CPF algorithm
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleaned[i]) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cleaned[9])) {
            return false;
        }

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleaned[i]) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cleaned[10])) {
            return false;
        }

        return true;
    }, []);

    const validateEmail = useCallback((email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, []);

    const validatePhone = useCallback((phone: string): boolean => {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    }, []);

    return {
        // State
        isProcessing,
        paymentStatus,

        // Actions
        processPayment,
        checkPaymentStatus,
        getPaymentHistory,
        retryPayment,
        cancelPayment,
        downloadInvoice,
        copyToClipboard,

        // Utilities
        formatCurrency,
        formatInstallments,
        validateCardNumber,
        validateCPF,
        validateEmail,
        validatePhone
    };
};




