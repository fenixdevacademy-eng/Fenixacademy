'use client';

import AnimatedComponent from '../../components/AnimatedComponent';
import { FileText, Shield, Users, CreditCard, Calendar } from 'lucide-react';

export default function TermsPage() {
    const sections = [
        {
            title: '1. Aceitação dos Termos',
            content: `
        Ao acessar e usar a plataforma Fenix Academy, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
      `
        },
        {
            title: '2. Descrição dos Serviços',
            content: `
        A Fenix Academy oferece cursos online de programação e tecnologia, incluindo:
        • Acesso a vídeos e materiais didáticos
        • Exercícios práticos e projetos
        • Certificados de conclusão
        • Suporte ao aluno
        • Comunidade de estudantes
      `
        },
        {
            title: '3. Cadastro e Conta do Usuário',
            content: `
        • Você deve fornecer informações verdadeiras e precisas
        • É responsável por manter a confidencialidade de sua senha
        • Não pode compartilhar sua conta com terceiros
        • Deve notificar imediatamente sobre uso não autorizado
      `
        },
        {
            title: '4. Pagamentos e Reembolsos',
            content: `
        • Preços são cobrados em Reais (BRL)
        • Pagamentos são processados de forma segura
        • Garantia de 30 dias para reembolso
        • Acesso vitalício aos cursos comprados
        • Não aceitamos devolução de cursos iniciados após 30 dias
      `
        },
        {
            title: '5. Uso Aceitável',
            content: `
        Você concorda em:
        • Usar os serviços apenas para fins educacionais
        • Não compartilhar conteúdo com terceiros
        • Não tentar acessar áreas restritas
        • Respeitar outros usuários e instrutores
        • Não usar bots ou automação
      `
        },
        {
            title: '6. Propriedade Intelectual',
            content: `
        • Todo o conteúdo é protegido por direitos autorais
        • Você recebe licença pessoal e não transferível
        • Não pode reproduzir, distribuir ou modificar o conteúdo
        • Projetos criados durante os cursos são de sua propriedade
      `
        },
        {
            title: '7. Privacidade e Dados',
            content: `
        • Coletamos dados para melhorar nossos serviços
        • Não vendemos suas informações pessoais
        • Usamos cookies para funcionalidade do site
        • Você pode solicitar exclusão de seus dados
        • Consulte nossa Política de Privacidade completa
      `
        },
        {
            title: '8. Limitação de Responsabilidade',
            content: `
        • Serviços são fornecidos "como estão"
        • Não garantimos resultados específicos
        • Não somos responsáveis por problemas técnicos de terceiros
        • Limitação de danos conforme legislação aplicável
      `
        },
        {
            title: '9. Modificações dos Termos',
            content: `
        • Podemos modificar estes termos a qualquer momento
        • Mudanças serão comunicadas por email
        • Uso continuado significa aceitação das mudanças
        • Versão atual sempre disponível no site
      `
        },
        {
            title: '10. Rescisão',
            content: `
        Podemos encerrar sua conta se:
        • Violar estes termos
        • Usar serviços de forma inadequada
        • Não pagar pelos serviços
        • Solicitar cancelamento
      `
        },
        {
            title: '11. Lei Aplicável',
            content: `
        • Estes termos são regidos pela lei brasileira
        • Disputas serão resolvidas em Itaboraí, RJ
        • Aceita a jurisdição exclusiva dos tribunais brasileiros
      `
        },
        {
            title: '12. Contato',
            content: `
        Para dúvidas sobre estes termos:
        • Email: fenixdevacademy@gmail.com
        • Telefone: +55 (21) 986289597
        • Endereço: Itaboraí, RJ - Brasil
      `
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                    >
                        <div className="flex justify-center mb-6">
                            <FileText className="w-16 h-16" />
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Termos de Uso
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                            Última atualização: Janeiro de 2024
                        </p>
                    </AnimatedComponent>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Introduction */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        className="bg-white rounded-2xl p-8 shadow-sm mb-12"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Introdução
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Bem-vindo à Fenix Academy! Estes Termos de Uso estabelecem as regras e condições para o uso de nossa plataforma de educação online.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Ao usar nossos serviços, você concorda com estes termos. Recomendamos que leia atentamente todo o documento antes de começar a usar a plataforma.
                        </p>
                    </AnimatedComponent>

                    {/* Terms Sections */}
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <AnimatedComponent
                                key={section.title}
                                animation="slideUp"
                                duration={0.5}
                                delay={index * 0.1}
                                className="bg-white rounded-xl p-6 shadow-sm"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {section.title}
                                </h3>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </div>
                            </AnimatedComponent>
                        ))}
                    </div>

                    {/* Additional Information */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-12"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Informações Importantes
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start space-x-3">
                                <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Segurança</h3>
                                    <p className="text-gray-600 text-sm">
                                        Sua segurança é nossa prioridade. Utilizamos as melhores práticas para proteger seus dados.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Comunidade</h3>
                                    <p className="text-gray-600 text-sm">
                                        Respeite outros usuários e contribua para um ambiente de aprendizado positivo.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CreditCard className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Pagamentos</h3>
                                    <p className="text-gray-600 text-sm">
                                        Todos os pagamentos são processados de forma segura com criptografia SSL.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Calendar className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Atualizações</h3>
                                    <p className="text-gray-600 text-sm">
                                        Estes termos podem ser atualizados. Verificamos regularmente para manter a transparência.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AnimatedComponent>

                    {/* Contact Section */}
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        className="bg-white rounded-2xl p-8 mt-8 text-center"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Dúvidas sobre os Termos?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Se você tiver dúvidas sobre estes termos, entre em contato conosco.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                            >
                                Fale Conosco
                            </a>
                            <a
                                href="/help"
                                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
                            >
                                Central de Ajuda
                            </a>
                        </div>
                    </AnimatedComponent>
                </div>
            </div>
        </div>
    );
} 