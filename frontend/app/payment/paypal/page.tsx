'use client';

import { useState, useEffect } from 'react';
import {
    CheckCircle,
    AlertCircle,
    Clock,
    Mail,
    ArrowRight,
    Shield,
    CreditCard
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PayPalPaymentPage() {
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [paymentDetails, setPaymentDetails] = useState<any>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        // Simular verificação de pagamento PayPal
        const tx = searchParams.get('tx');
        const st = searchParams.get('st');

        if (tx && st === 'Completed') {
            setPaymentStatus('success');
            setPaymentDetails({
                transactionId: tx,
                amount: '197.00',
                currency: 'BRL',
                email: 'fenixdevacademy@gmail.com'
            });
        } else if (st === 'Canceled') {
            setPaymentStatus('error');
        }
    }, [searchParams]);

    const courseData = {
        title: "Fundamentos de Desenvolvimento Web",
        price: 197,
        instructor: "Alexandre Mendes",
        duration: "80 horas",
        lessons: 80
    };

    if (paymentStatus === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg border p-8">
                    <div className="text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pagamento Confirmado!</h2>
                        <p className="text-gray-600 mb-8">
                            Seu pagamento via PayPal foi processado com sucesso.
                        </p>

                        {/* Payment Details */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Detalhes do Pagamento</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Transação:</span>
                                    <span className="font-mono">{paymentDetails?.transactionId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Valor:</span>
                                    <span className="font-medium">R$ {paymentDetails?.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Método:</span>
                                    <span className="font-medium">PayPal</span>
                                </div>
                            </div>
                        </div>

                        {/* Course Access */}
                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-blue-900 mb-2">Acesso ao Curso</h3>
                            <div className="space-y-2 text-sm text-blue-800">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Curso: {courseData.title}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Instrutor: {courseData.instructor}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Duração: {courseData.duration}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Aulas: {courseData.lessons}</span>
                                </div>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="space-y-4">
                            <Link
                                href="/courses"
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                            >
                                Acessar Meus Cursos
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>

                            <div className="text-center">
                                <p className="text-sm text-gray-500">
                                    Você receberá um email de confirmação em breve.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (paymentStatus === 'error') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg border p-8">
                    <div className="text-center">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pagamento Cancelado</h2>
                        <p className="text-gray-600 mb-8">
                            O pagamento foi cancelado ou não foi processado corretamente.
                        </p>

                        <div className="space-y-4">
                            <Link
                                href="/payment"
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                            >
                                Tentar Novamente
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>

                            <Link
                                href="/courses"
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                            >
                                Voltar aos Cursos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg border p-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Processando Pagamento</h2>
                    <p className="text-gray-600 mb-8">
                        Aguarde enquanto processamos seu pagamento via PayPal...
                    </p>

                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600">Verificando transação...</span>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-blue-800">Pagamento Seguro</p>
                                <p className="text-sm text-blue-700 mt-1">
                                    Sua transação está sendo processada de forma segura pelo PayPal.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 