'use client';

import AnimatedComponent from '../../components/AnimatedComponent';
import { Shield, Lock, Eye } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                    >
                        <div className="flex justify-center mb-6">
                            <Shield className="w-16 h-16" />
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            Política de Privacidade
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                            Como protegemos e utilizamos seus dados pessoais
                        </p>
                    </AnimatedComponent>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <AnimatedComponent
                        animation="slideUp"
                        duration={0.8}
                        className="bg-white rounded-2xl p-8 shadow-sm"
                    >
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Lock className="w-6 h-6 mr-2 text-blue-600" />
                                Proteção de Dados
                            </h2>

                            <p className="text-gray-600 mb-6">
                                Na Fenix Academy, sua privacidade é nossa prioridade. Esta política descreve como coletamos,
                                usamos e protegemos suas informações pessoais.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Informações que Coletamos</h3>
                            <ul className="list-disc pl-6 mb-6 text-gray-600">
                                <li>Nome, email e informações de contato</li>
                                <li>Dados de perfil e preferências de aprendizado</li>
                                <li>Progresso nos cursos e atividades na plataforma</li>
                                <li>Informações de pagamento (processadas de forma segura)</li>
                                <li>Dados de uso da plataforma para melhorias</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Como Utilizamos suas Informações</h3>
                            <ul className="list-disc pl-6 mb-6 text-gray-600">
                                <li>Fornecer acesso aos cursos e funcionalidades da plataforma</li>
                                <li>Personalizar sua experiência de aprendizado</li>
                                <li>Enviar notificações importantes sobre seus cursos</li>
                                <li>Melhorar nossos serviços e desenvolver novos recursos</li>
                                <li>Processar pagamentos de forma segura</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Segurança dos Dados</h3>
                            <p className="text-gray-600 mb-6">
                                Implementamos medidas de segurança rigorosas para proteger suas informações:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-600">
                                <li>Criptografia SSL/TLS para transmissão de dados</li>
                                <li>Armazenamento seguro em servidores protegidos</li>
                                <li>Controle de acesso restrito aos dados pessoais</li>
                                <li>Monitoramento contínuo de segurança</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Seus Direitos</h3>
                            <p className="text-gray-600 mb-6">
                                Você tem o direito de:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-600">
                                <li>Acessar e revisar seus dados pessoais</li>
                                <li>Corrigir informações imprecisas</li>
                                <li>Solicitar a exclusão de seus dados</li>
                                <li>Optar por não receber comunicações promocionais</li>
                                <li>Exportar seus dados em formato legível</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cookies e Tecnologias Similares</h3>
                            <p className="text-gray-600 mb-6">
                                Utilizamos cookies e tecnologias similares para:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-600">
                                <li>Manter você logado na plataforma</li>
                                <li>Lembrar suas preferências</li>
                                <li>Analisar o uso da plataforma</li>
                                <li>Melhorar a experiência do usuário</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Compartilhamento de Dados</h3>
                            <p className="text-gray-600 mb-6">
                                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros,
                                exceto quando:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-600">
                                <li>Você autoriza explicitamente</li>
                                <li>É necessário para processar pagamentos</li>
                                <li>Exigido por lei ou ordem judicial</li>
                                <li>Para proteger nossos direitos e segurança</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Retenção de Dados</h3>
                            <p className="text-gray-600 mb-6">
                                Mantemos suas informações pelo tempo necessário para:
                            </p>
                            <ul className="list-disc pl-6 mb-6 text-gray-600">
                                <li>Fornecer nossos serviços</li>
                                <li>Cumprir obrigações legais</li>
                                <li>Resolver disputas</li>
                                <li>Fazer cumprir nossos termos</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Alterações na Política</h3>
                            <p className="text-gray-600 mb-6">
                                Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças
                                significativas através de email ou na plataforma.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contato</h3>
                            <p className="text-gray-600 mb-6">
                                Se você tiver dúvidas sobre esta política ou quiser exercer seus direitos,
                                entre em contato conosco:
                            </p>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <p className="text-gray-700">
                                    <strong>Email:</strong> privacy@fenixacademy.com<br />
                                    <strong>Telefone:</strong> +55 (21) 98628-9597<br />
                                    <strong>Endereço:</strong> Itaboraí, RJ - Brasil
                                </p>
                            </div>

                            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                                <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                                    <Eye className="w-5 h-5 mr-2" />
                                    Transparência Total
                                </h4>
                                <p className="text-blue-800">
                                    Acreditamos na transparência total sobre como utilizamos seus dados.
                                    Esta política é atualizada regularmente e sempre disponível para consulta.
                                </p>
                            </div>
                        </div>
                    </AnimatedComponent>
                </div>
            </div>
        </div>
    );
} 