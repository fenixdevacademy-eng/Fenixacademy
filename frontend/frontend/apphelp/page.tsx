'use client';

import { useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';
import {
  Search,
  BookOpen,
  Video,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  FileText,
  Settings,
  CreditCard,
  User,
  Lock,
  Download
} from 'lucide-react';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    {
      title: 'Primeiros Passos',
      icon: BookOpen,
      description: 'Como começar na plataforma',
      color: 'text-blue-600'
    },
    {
      title: 'Cursos e Aulas',
      icon: Video,
      description: 'Dúvidas sobre o conteúdo',
      color: 'text-green-600'
    },
    {
      title: 'Pagamentos',
      icon: CreditCard,
      description: 'Informações sobre compras',
      color: 'text-purple-600'
    },
    {
      title: 'Conta e Perfil',
      icon: User,
      description: 'Configurações da conta',
      color: 'text-orange-600'
    },
    {
      title: 'Suporte Técnico',
      icon: Settings,
      description: 'Problemas técnicos',
      color: 'text-red-600'
    },
    {
      title: 'Certificados',
      icon: FileText,
      description: 'Emissão de certificados',
      color: 'text-indigo-600'
    }
  ];

  const faqs = [
    {
      question: 'Como acessar meus cursos comprados?',
      answer: 'Após fazer login, vá para "Meus Cursos" no menu principal. Todos os cursos que você comprou estarão disponíveis lá.',
      category: 'Cursos e Aulas'
    },
    {
      question: 'Como funciona o sistema de pagamento?',
      answer: 'Aceitamos PIX e cartão de crédito. O pagamento é processado de forma segura e você recebe acesso imediato após a confirmação.',
      category: 'Pagamentos'
    },
    {
      question: 'Posso cancelar minha inscrição?',
      answer: 'Sim, oferecemos garantia de 30 dias para todos os cursos. Se não estiver satisfeito, você pode solicitar reembolso.',
      category: 'Pagamentos'
    },
    {
      question: 'Como emitir meu certificado?',
      answer: 'Após concluir um curso, o certificado fica disponível automaticamente na seção "Certificados" do seu perfil.',
      category: 'Certificados'
    },
    {
      question: 'Os vídeos não carregam, o que fazer?',
      answer: 'Verifique sua conexão com a internet e tente limpar o cache do navegador. Se o problema persistir, entre em contato conosco.',
      category: 'Suporte Técnico'
    },
    {
      question: 'Como alterar minha senha?',
      answer: 'Vá para "Configurações" no seu perfil e clique em "Alterar Senha". Você receberá um email com instruções.',
      category: 'Conta e Perfil'
    },
    {
      question: 'Posso baixar os vídeos para assistir offline?',
      answer: 'Atualmente não oferecemos download dos vídeos, mas você pode assistir em qualquer dispositivo com internet.',
      category: 'Cursos e Aulas'
    },
    {
      question: 'Como funciona o suporte ao aluno?',
      answer: 'Oferecemos suporte por chat, email e comunidade. Nossa equipe responde em até 24 horas.',
      category: 'Suporte Técnico'
    }
  ];

  const contactMethods = [
    {
      title: 'Chat ao Vivo',
      description: 'Resposta em tempo real',
      icon: MessageCircle,
      action: 'Iniciar Chat',
      color: 'bg-green-500'
    },
    {
      title: 'Email',
      description: 'Resposta em até 24h',
      icon: Mail,
      action: 'Enviar Email',
      color: 'bg-blue-500'
    },
    {
      title: 'Telefone',
      description: 'Segunda a Sexta, 8h-18h',
      icon: Phone,
      action: 'Ligar Agora',
      color: 'bg-purple-500'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedComponent
            animation="slideUp"
            duration={0.8}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Central de Ajuda
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Encontre respostas para suas dúvidas e obtenha suporte quando precisar
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Pesquisar dúvidas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </AnimatedComponent>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Categories */}
        <section className="mb-16">
          <AnimatedComponent
            animation="slideUp"
            duration={0.8}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Categorias de Ajuda
            </h2>
            <p className="text-gray-600">
              Escolha uma categoria para encontrar respostas específicas
            </p>
          </AnimatedComponent>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <AnimatedComponent
                key={category.title}
                animation="slideUp"
                duration={0.5}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </AnimatedComponent>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <AnimatedComponent
            animation="slideUp"
            duration={0.8}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600">
              Respostas para as dúvidas mais comuns
            </p>
          </AnimatedComponent>

          <div className="max-w-4xl mx-auto">
            {filteredFaqs.map((faq, index) => (
              <AnimatedComponent
                key={index}
                animation="slideUp"
                duration={0.5}
                delay={index * 0.1}
                className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {faq.question}
                    </h3>
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {faq.category}
                    </span>
                  </div>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </AnimatedComponent>
            ))}
          </div>
        </section>

        {/* Contact Methods */}
        <section>
          <AnimatedComponent
            animation="slideUp"
            duration={0.8}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Precisa de Mais Ajuda?
            </h2>
            <p className="text-gray-600">
              Entre em contato conosco através dos canais abaixo
            </p>
          </AnimatedComponent>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <AnimatedComponent
                key={method.title}
                animation="slideUp"
                duration={0.5}
                delay={index * 0.1}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {method.description}
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                  {method.action}
                </button>
              </AnimatedComponent>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-16">
          <AnimatedComponent
            animation="slideUp"
            duration={0.8}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Links Úteis
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/courses" className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Ver Cursos</span>
              </a>
              <a href="/profile" className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <User className="w-5 h-5 text-green-600" />
                <span className="font-medium">Meu Perfil</span>
              </a>
              <a href="/payment" className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Pagamentos</span>
              </a>
              <a href="/contact" className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Contato</span>
              </a>
            </div>
          </AnimatedComponent>
        </section>
      </div>
    </div>
  );
}
