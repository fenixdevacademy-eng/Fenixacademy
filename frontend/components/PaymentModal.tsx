'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X,
    CreditCard,
    Smartphone,
    QrCode,
    CheckCircle,
    AlertCircle,
    Loader2,
    Shield,
    Lock,
    Star
} from 'lucide-react'
import FunctionalButton from './FunctionalButton'

interface PaymentModalProps {
    isOpen: boolean
    onClose: () => void
    course: {
        id: number
        title: string
        price: string
        originalPrice: string
        image: string
    }
    onPaymentSuccess: (paymentMethod: string) => void
}

const paymentMethods = [
    {
        id: 'pix',
        name: 'PIX',
        description: 'Pagamento instantâneo',
        icon: <QrCode className="w-6 h-6" />,
        color: 'from-green-500 to-emerald-500',
        popular: true
    },
    {
        id: 'credit',
        name: 'Cartão de Crédito',
        description: 'Visa, Mastercard, Elo',
        icon: <CreditCard className="w-6 h-6" />,
        color: 'from-blue-500 to-cyan-500',
        popular: false
    },
    {
        id: 'debit',
        name: 'Cartão de Débito',
        description: 'Pagamento à vista',
        icon: <CreditCard className="w-6 h-6" />,
        color: 'from-purple-500 to-pink-500',
        popular: false
    },
    {
        id: 'boleto',
        name: 'Boleto Bancário',
        description: 'Pagamento em até 3 dias',
        icon: <Smartphone className="w-6 h-6" />,
        color: 'from-orange-500 to-red-500',
        popular: false
    }
]

export default function PaymentModal({ isOpen, onClose, course, onPaymentSuccess }: PaymentModalProps) {
    const [selectedMethod, setSelectedMethod] = useState('pix')
    const [isProcessing, setIsProcessing] = useState(false)
    const [step, setStep] = useState<'method' | 'processing' | 'success'>('method')

    const handlePayment = async () => {
        setIsProcessing(true)
        setStep('processing')

        // Simular processamento de pagamento
        await new Promise(resolve => setTimeout(resolve, 3000))

        setStep('success')
        setIsProcessing(false)

        // Simular sucesso do pagamento
        setTimeout(() => {
            onPaymentSuccess(selectedMethod)
            onClose()
        }, 2000)
    }

    const getDiscountPercentage = () => {
        const price = parseFloat(course.price.replace('R$ ', '').replace(',', '.'))
        const originalPrice = parseFloat(course.originalPrice.replace('R$ ', '').replace(',', '.'))
        return Math.round(((originalPrice - price) / originalPrice) * 100)
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">Finalizar Matrícula</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {step === 'method' && (
                        <>
                            {/* Course Info */}
                            <div className="bg-white/5 rounded-xl p-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-2xl font-bold text-green-400">{course.price}</span>
                                            <span className="text-gray-400 line-through">{course.originalPrice}</span>
                                            <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                                                -{getDiscountPercentage()}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="space-y-4 mb-8">
                                <h3 className="text-lg font-semibold text-white mb-4">Escolha a forma de pagamento</h3>
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedMethod === method.id
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-white/20 bg-white/5 hover:bg-white/10'
                                            }`}
                                        onClick={() => setSelectedMethod(method.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white`}>
                                                    {method.icon}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-white font-semibold">{method.name}</h4>
                                                        {method.popular && (
                                                            <span className="bg-yellow-500 text-black px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                                                <Star className="w-3 h-3" />
                                                                Popular
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-300 text-sm">{method.description}</p>
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 ${selectedMethod === method.id
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-white/30'
                                                }`}>
                                                {selectedMethod === method.id && (
                                                    <CheckCircle className="w-6 h-6 text-white" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Security Info */}
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-green-400" />
                                    <div>
                                        <h4 className="text-green-400 font-semibold">Pagamento 100% Seguro</h4>
                                        <p className="text-gray-300 text-sm">
                                            Seus dados são protegidos com criptografia SSL e não são armazenados em nossos servidores.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <FunctionalButton
                                    onClick={onClose}
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                >
                                    Cancelar
                                </FunctionalButton>
                                <FunctionalButton
                                    onClick={handlePayment}
                                    variant="primary"
                                    size="lg"
                                    icon={<Lock className="w-5 h-5" />}
                                    iconPosition="left"
                                    glowEffect={true}
                                    rippleEffect={true}
                                    className="flex-1"
                                >
                                    Pagar {course.price}
                                </FunctionalButton>
                            </div>
                        </>
                    )}

                    {step === 'processing' && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Loader2 className="w-10 h-10 text-white animate-spin" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Processando Pagamento</h3>
                            <p className="text-gray-300 mb-8">
                                Aguarde enquanto processamos sua matrícula...
                            </p>
                            <div className="w-full bg-white/10 rounded-full h-2">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Pagamento Aprovado!</h3>
                            <p className="text-gray-300 mb-8">
                                Sua matrícula foi realizada com sucesso. Você já pode acessar o curso!
                            </p>
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                                <p className="text-green-400 font-semibold">
                                    Bem-vindo(a) ao curso {course.title}!
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}


