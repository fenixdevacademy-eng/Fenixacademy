'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  ArrowLeft, 
  Shield,
  Clock,
  Star,
  Users,
  Award
} from 'lucide-react'
import Link from 'next/link'

interface Course {
  id: number
  title: string
  slug: string
  description: string
  instructor: string
  rating: number
  students: number
  duration: string
  level: string
  price: string
  originalPrice: string
  image: string
  category: string
  tags: string[]
  isNew: boolean
  isPopular: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: '',
    cpf: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const courseId = searchParams.get('course')
    if (courseId) {
      // Simular busca do curso
      const mockCourse: Course = {
        id: parseInt(courseId),
        title: 'React Avançado - Do Zero ao Profissional',
        slug: 'react-avancado-do-zero-ao-profissional',
        description: 'Aprenda React com padrões avançados, hooks customizados e otimizações de performance.',
        instructor: 'João Silva',
        rating: 4.9,
        students: 15420,
        duration: '40h',
        level: 'Intermediário',
        price: 'R$ 297',
        originalPrice: 'R$ 497',
        image: '/api/placeholder/400/250',
        category: 'web',
        tags: ['React', 'JavaScript', 'Frontend', 'Hooks'],
        isNew: true,
        isPopular: true
      }
      setCourse(mockCourse)
    }
    setIsLoading(false)
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirecionar para página de sucesso
    router.push('/payment/success?course=' + course?.id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Curso não encontrado</h1>
          <Link href="/courses" className="btn-primary">
            Voltar aos Cursos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href={`/course/${course.slug}`} className="flex items-center text-white hover:text-blue-400 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Curso
          </Link>
          <div className="flex items-center text-white">
            <Shield className="w-5 h-5 mr-2" />
            <span className="text-sm">Compra 100% Segura</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informações do Curso */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h1 className="text-2xl font-bold text-white mb-4">Finalizar Compra</h1>
              
              {/* Curso Selecionado */}
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-4">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{course.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {course.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()} alunos
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Resumo do Pedido</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{course.title}</span>
                    <span className="text-white font-semibold">{course.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Preço original:</span>
                    <span className="text-gray-400 line-through">{course.originalPrice}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Desconto:</span>
                    <span className="text-green-400">-40%</span>
                  </div>
                  
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-green-400">{course.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Garantias */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                Garantias
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Garantia de 30 dias para reembolso
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Acesso vitalício ao conteúdo
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Certificado de conclusão
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Suporte especializado
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6">Informações de Pagamento</h2>
              
              {/* Métodos de Pagamento */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Método de Pagamento</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'credit' 
                        ? 'border-blue-500 bg-blue-500/20' 
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-white mx-auto mb-2" />
                    <span className="text-white text-sm">Cartão de Crédito</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'pix' 
                        ? 'border-blue-500 bg-blue-500/20' 
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    <div className="w-6 h-6 bg-green-500 rounded mx-auto mb-2"></div>
                    <span className="text-white text-sm">PIX</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'credit' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="João Silva"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'pix' && (
                <div className="text-center py-8">
                  <div className="w-32 h-32 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">PIX</span>
                  </div>
                  <p className="text-white mb-4">Pagamento instantâneo via PIX</p>
                  <p className="text-gray-400 text-sm">Você será redirecionado para o pagamento PIX</p>
                </div>
              )}

              {/* Informações Pessoais */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações Pessoais</h3>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Botão de Pagamento */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Finalizar Compra - {course.price}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                Seus dados estão protegidos com criptografia SSL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


