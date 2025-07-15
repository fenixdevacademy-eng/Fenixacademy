'use client';

import React from 'react';
import { Check, Star, Users, Award, Zap, Shield, Clock, Target } from 'lucide-react';

const benefits = [
  {
    icon: Star,
    title: "Acesso Vitalício",
    description: "Acesso a todos os cursos e atualizações futuras sem custo adicional"
  },
  {
    icon: Users,
    title: "Comunidade Exclusiva",
    description: "Grupo privado com outros fundadores e mentores especializados"
  },
  {
    icon: Award,
    title: "Certificados Premium",
    description: "Certificados especiais com selo de fundador da Fenix Academy"
  },
  {
    icon: Zap,
    title: "Suporte Prioritário",
    description: "Atendimento VIP com resposta em até 2 horas"
  },
  {
    icon: Shield,
    title: "Garantia de 30 Dias",
    description: "Devolução total do dinheiro se não ficar satisfeito"
  },
  {
    icon: Target,
    title: "Roadmap Personalizado",
    description: "Plano de estudos personalizado baseado nos seus objetivos"
  },
  // Novos benefícios para retenção
  {
    icon: Clock,
    title: "Acesso Antecipado a Novos Cursos",
    description: "Seja o primeiro a acessar todos os lançamentos da Fenix Academy"
  },
  {
    icon: Users,
    title: "Participação em Decisões da Plataforma",
    description: "Vote e sugira novos cursos, funcionalidades e melhorias"
  },
  {
    icon: Award,
    title: "Brindes Exclusivos",
    description: "Receba kits, camisetas e materiais exclusivos dos fundadores"
  },
  {
    icon: Zap,
    title: "Consultoria de Carreira",
    description: "Sessões anuais de consultoria individual com especialistas do mercado"
  },
  {
    icon: Shield,
    title: "Grupo VIP de Networking",
    description: "Acesso a um grupo VIP com grandes nomes do mercado de tecnologia"
  },
  {
    icon: Target,
    title: "Descontos Vitalícios em Parceiros",
    description: "Descontos exclusivos em empresas parceiras de tecnologia e educação"
  },
  {
    icon: Star,
    title: "Participação em Eventos Presenciais",
    description: "Convite para eventos e meetups presenciais exclusivos para fundadores"
  },
  {
    icon: Users,
    title: "Sorteios Exclusivos",
    description: "Participe de sorteios mensais de livros, cursos e mentorias"
  },
  {
    icon: Award,
    title: "Badge Especial no Perfil",
    description: "Destaque-se com um selo exclusivo de fundador em seu perfil"
  },
  {
    icon: Zap,
    title: "Acesso a Masterclasses",
    description: "Participe de masterclasses exclusivas com experts do mercado"
  },
  {
    icon: Shield,
    title: "Prioridade em Vagas de Mentoria",
    description: "Tenha prioridade para vagas em mentorias individuais e grupos fechados"
  },
];

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Desenvolvedor Full Stack",
    content: "O plano de fundador foi o melhor investimento que fiz na minha carreira. Em 6 meses consegui uma vaga com salário 3x maior.",
    rating: 5
  },
  {
    name: "Ana Costa",
    role: "Tech Lead",
    content: "A comunidade exclusiva é incrível. Conheci pessoas que hoje são meus sócios em projetos.",
    rating: 5
  },
  {
    name: "Pedro Santos",
    role: "Empreendedor",
    content: "O suporte prioritário salvou meu projeto várias vezes. Valeu cada centavo investido.",
    rating: 5
  }
];

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Plano Fundador
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Seja um dos primeiros a fazer parte da revolução da educação em tecnologia. 
              Acesso vitalício a todos os cursos e benefícios exclusivos.
            </p>
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">R$ 997</div>
                <div className="text-sm opacity-90">ou 12x R$ 97</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">R$ 1.997</div>
                <div className="text-sm opacity-90 line-through">Preço normal</div>
              </div>
            </div>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200">
              Quero Ser Fundador
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Benefícios Exclusivos
            </h2>
            <p className="text-xl text-gray-600">
              O que você ganha ao se tornar um fundador da Fenix Academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O Que Está Incluído
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para se tornar um desenvolvedor completo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Cursos Inclusos
              </h3>
              <div className="space-y-4">
                {[
                  "Fundamentos de Desenvolvimento Web",
                  "React.js Avançado",
                  "Node.js e APIs RESTful",
                  "Python para Data Science",
                  "DevOps e Docker",
                  "Flutter para Mobile",
                  "Todos os cursos futuros"
                ].map((course, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Recursos Extras
              </h3>
              <div className="space-y-4">
                {[
                  "Projetos práticos completos",
                  "Code reviews personalizados",
                  "Mentoria em grupo mensal",
                  "Acesso a eventos exclusivos",
                  "Networking com outros fundadores",
                  "Suporte técnico prioritário",
                  "Certificados especiais"
                ].map((resource, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{resource}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O Que Dizem Nossos Fundadores
            </h2>
            <p className="text-xl text-gray-600">
              Histórias reais de quem já transformou sua carreira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Não Perca Esta Oportunidade
          </h2>
          <p className="text-xl mb-8">
            O preço do plano fundador aumenta a cada 100 vendas. 
            Garanta seu lugar agora!
          </p>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8">
            <div className="text-2xl font-bold mb-2">Oferta Limitada</div>
            <div className="text-lg">
              Apenas <span className="font-bold text-yellow-300">47 vagas</span> restantes
            </div>
          </div>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200">
            Quero Ser Fundador Agora
          </button>
          <p className="text-sm mt-4 opacity-90">
            Garantia de 30 dias ou seu dinheiro de volta
          </p>
        </div>
      </div>
    </div>
  );
} 