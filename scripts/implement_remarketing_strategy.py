#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para implementar estratégias de remarketing da Fenix Academy
CEO: Lucas Silva Petris
"""

import json
import os
from datetime import datetime, timedelta

class FenixRemarketingStrategy:
    def __init__(self):
        self.company_data = {
            "name": "Fenix Academy",
            "ceo": "Lucas Silva Petris",
            "current_revenue": 45000,
            "total_students": 1250,
            "completion_rate": 78.5
        }
        
        self.remarketing_config = {}
        self.audience_segments = {}
        self.campaign_strategies = {}
        
    def setup_google_ads_remarketing(self):
        """Configura estratégias de remarketing no Google Ads"""
        
        print("🚀 Configurando Google Ads Remarketing...")
        
        self.remarketing_config["google_ads"] = {
            "audiences": {
                "visitantes_site": {
                    "criteria": "Visitou o site nos últimos 30 dias",
                    "exclusions": "Já comprou curso",
                    "bid_adjustment": 1.5,
                    "budget": 2000,
                    "roi_target": 400
                },
                "abandonou_carrinho": {
                    "criteria": "Adicionou curso ao carrinho mas não comprou",
                    "exclusions": "Visitou página de pagamento",
                    "bid_adjustment": 2.0,
                    "budget": 1500,
                    "roi_target": 600
                },
                "visualizou_curso": {
                    "criteria": "Visualizou página de curso específico",
                    "exclusions": "Já comprou este curso",
                    "bid_adjustment": 1.8,
                    "budget": 1000,
                    "roi_target": 500
                }
            },
            "campaigns": [
                {
                    "name": "Remarketing - Visitantes Gerais",
                    "audience": "visitantes_site",
                    "budget": 2000,
                    "duration": "30 dias",
                    "messages": [
                        "Continue seu aprendizado na Fenix Academy",
                        "Oferta especial para você: 20% de desconto",
                        "Não perca a oportunidade de dominar tecnologia"
                    ]
                },
                {
                    "name": "Remarketing - Abandono de Carrinho",
                    "audience": "abandonou_carrinho",
                    "budget": 1500,
                    "duration": "7 dias",
                    "messages": [
                        "Complete sua compra - Oferta expira em 24h",
                        "Desconto de 20% válido por 48h",
                        "Última chance: Bônus exclusivo incluído"
                    ]
                },
                {
                    "name": "Remarketing - Interesse Específico",
                    "audience": "visualizou_curso",
                    "budget": 1000,
                    "duration": "14 dias",
                    "messages": [
                        "Domine [tecnologia] com projetos práticos",
                        "Curso completo + mentoria individual",
                        "Certificado reconhecido pelo mercado"
                    ]
                }
            ]
        }
        
        print("✅ Google Ads Remarketing configurado!")
        return self.remarketing_config["google_ads"]
    
    def setup_facebook_instagram_remarketing(self):
        """Configura estratégias de remarketing no Facebook/Instagram"""
        
        print("📘 Configurando Facebook/Instagram Remarketing...")
        
        self.remarketing_config["facebook_instagram"] = {
            "audiences": {
                "engajamento_alto": {
                    "criteria": "Interagiu com posts da Fenix",
                    "exclusions": "Já é aluno",
                    "lookalike": "1% similar aos melhores alunos",
                    "budget": 1500,
                    "roi_target": 350
                },
                "interesse_tecnologia": {
                    "criteria": "Interesse em programação, desenvolvimento",
                    "exclusions": "Já comprou curso",
                    "lookalike": "2% similar aos alunos existentes",
                    "budget": 2000,
                    "roi_target": 400
                },
                "visitantes_landing": {
                    "criteria": "Visitou landing page específica",
                    "exclusions": "Convertido",
                    "lookalike": "1% similar aos convertidos",
                    "budget": 1000,
                    "roi_target": 450
                }
            },
            "content_strategies": [
                {
                    "type": "Vídeos de Depoimentos",
                    "description": "Alunos que conseguiram emprego",
                    "frequency": "2x por semana",
                    "budget": 500
                },
                {
                    "type": "Sneak Peeks",
                    "description": "Aulas gratuitas dos cursos",
                    "frequency": "1x por semana",
                    "budget": 300
                },
                {
                    "type": "Webinars ao Vivo",
                    "description": "Especialistas da indústria",
                    "frequency": "2x por mês",
                    "budget": 800
                },
                {
                    "type": "Cases de Sucesso",
                    "description": "Projetos reais dos alunos",
                    "frequency": "1x por semana",
                    "budget": 400
                }
            ]
        }
        
        print("✅ Facebook/Instagram Remarketing configurado!")
        return self.remarketing_config["facebook_instagram"]
    
    def setup_email_marketing_remarketing(self):
        """Configura estratégias de email marketing remarketing"""
        
        print("📧 Configurando Email Marketing Remarketing...")
        
        self.remarketing_config["email_marketing"] = {
            "sequences": {
                "abandonou_curso": [
                    {
                        "day": 1,
                        "subject": "Continue de onde parou",
                        "content": "Lembrete do curso [nome] que você estava visualizando",
                        "offer": "Acesso gratuito por 7 dias"
                    },
                    {
                        "day": 3,
                        "subject": "Oferta especial para você",
                        "content": "20% de desconto válido por 48h",
                        "offer": "Desconto + bônus exclusivo"
                    },
                    {
                        "day": 7,
                        "subject": "Última chance",
                        "content": "Oferta expira em 24h + bônus exclusivo",
                        "offer": "30% de desconto + mentoria"
                    }
                ],
                "visitou_site": [
                    {
                        "day": 1,
                        "subject": "Bem-vindo à Fenix Academy",
                        "content": "Guia gratuito: Como escolher seu primeiro curso",
                        "offer": "Download gratuito"
                    },
                    {
                        "day": 5,
                        "subject": "Dica exclusiva para iniciantes",
                        "content": "5 tecnologias que estão bombando em 2024",
                        "offer": "Aula gratuita"
                    },
                    {
                        "day": 10,
                        "subject": "Oferta especial para novos visitantes",
                        "content": "Primeiro curso com 30% de desconto",
                        "offer": "Desconto + comunidade VIP"
                    }
                ],
                "alunos_inativos": [
                    {
                        "day": 1,
                        "subject": "Sua jornada não terminou aqui",
                        "content": "Continue aprendendo e dominando tecnologia",
                        "offer": "Acesso gratuito por 7 dias"
                    },
                    {
                        "day": 7,
                        "subject": "O que você está perdendo?",
                        "content": "Novos cursos e atualizações disponíveis",
                        "offer": "50% de desconto em qualquer curso"
                    },
                    {
                        "day": 14,
                        "subject": "Última oportunidade",
                        "content": "Não deixe sua carreira parar",
                        "offer": "Acesso vitalício com 70% de desconto"
                    }
                ]
            },
            "automation_rules": {
                "triggers": [
                    "Visualizou página de curso",
                    "Adicionou ao carrinho",
                    "Abandonou checkout",
                    "Não acessou em 30 dias",
                    "Completou curso"
                ],
                "actions": [
                    "Enviar email personalizado",
                    "Aplicar desconto",
                    "Oferecer bônus",
                    "Agendar follow-up",
                    "Atualizar segmento"
                ]
            }
        }
        
        print("✅ Email Marketing Remarketing configurado!")
        return self.remarketing_config["email_marketing"]
    
    def setup_advanced_segmentation(self):
        """Configura segmentação avançada para remarketing"""
        
        print("🎯 Configurando Segmentação Avançada...")
        
        self.audience_segments = {
            "alunos_inativos": {
                "criteria": "Não acessaram plataforma em 30 dias",
                "remarketing_channels": ["Email", "Facebook", "Google Ads"],
                "message": "Continue sua jornada de aprendizado",
                "offer": "Acesso gratuito por 7 dias",
                "roi_target": 800,
                "estimated_size": 250
            },
            "alunos_parciais": {
                "criteria": "Começaram mas não terminaram curso",
                "remarketing_channels": ["Email", "Notificações push"],
                "message": "Complete seu curso e receba certificado",
                "offer": "Mentoria individual gratuita",
                "roi_target": 600,
                "estimated_size": 180
            },
            "alunos_satisfeitos": {
                "criteria": "Completaram curso com nota alta",
                "remarketing_channels": ["Email", "Programa de referência"],
                "message": "Indique amigos e ganhe bônus",
                "offer": "20% de comissão por indicação",
                "roi_target": 1000,
                "estimated_size": 320
            },
            "alunos_engajados": {
                "criteria": "Participam ativamente da comunidade",
                "remarketing_channels": ["Email", "Programa de embaixadores"],
                "message": "Seja um embaixador da Fenix",
                "offer": "Acesso VIP + comissões especiais",
                "roi_target": 1200,
                "estimated_size": 150
            }
        }
        
        print("✅ Segmentação Avançada configurada!")
        return self.audience_segments
    
    def create_campaign_strategies(self):
        """Cria estratégias de campanhas integradas"""
        
        print("📊 Criando Estratégias de Campanhas...")
        
        self.campaign_strategies = {
            "black_friday": {
                "duration": "15 dias",
                "total_budget": 10000,
                "channels": ["Google Ads", "Facebook", "Instagram", "Email"],
                "audiences": ["Todos os segmentos", "Visitantes recentes", "Alunos inativos"],
                "offers": [
                    "50% de desconto em todos os cursos",
                    "Acesso vitalício com preço especial",
                    "Bônus: Mentoria individual + comunidade VIP"
                ],
                "roi_target": 500,
                "conversion_target": 200
            },
            "novos_cursos": {
                "duration": "30 dias",
                "total_budget": 5000,
                "channels": ["Google Ads", "Facebook", "Email"],
                "audiences": ["Alunos ativos", "Interesse em tecnologia", "Visitantes recentes"],
                "offers": [
                    "Acesso antecipado a novos cursos",
                    "Desconto de 30% para alunos existentes",
                    "Bônus: Workshop exclusivo"
                ],
                "roi_target": 400,
                "conversion_target": 100
            },
            "retencao": {
                "duration": "Contínuo",
                "total_budget": 3000,
                "channels": ["Email", "Notificações push", "Facebook"],
                "audiences": ["Alunos parciais", "Alunos inativos", "Baixo engajamento"],
                "offers": [
                    "Acesso gratuito por 7 dias",
                    "Mentoria individual",
                    "Descontos progressivos"
                ],
                "roi_target": 800,
                "conversion_target": 150
            }
        }
        
        print("✅ Estratégias de Campanhas criadas!")
        return self.campaign_strategies
    
    def calculate_roi_projections(self):
        """Calcula projeções de ROI para as estratégias"""
        
        print("💰 Calculando Projeções de ROI...")
        
        total_investment = 0
        projected_revenue = 0
        
        # Google Ads
        google_ads = self.remarketing_config.get("google_ads", {})
        for audience in google_ads.get("audiences", {}).values():
            total_investment += audience.get("budget", 0)
            projected_revenue += audience.get("budget", 0) * (audience.get("roi_target", 0) / 100)
        
        # Facebook/Instagram
        facebook = self.remarketing_config.get("facebook_instagram", {})
        for audience in facebook.get("audiences", {}).values():
            total_investment += audience.get("budget", 0)
            projected_revenue += audience.get("budget", 0) * (facebook.get("audiences", {}).get("roi_target", 0) / 100)
        
        # Campanhas especiais
        for campaign in self.campaign_strategies.values():
            total_investment += campaign.get("total_budget", 0)
            projected_revenue += campaign.get("total_budget", 0) * (campaign.get("roi_target", 0) / 100)
        
        roi_percentage = ((projected_revenue - total_investment) / total_investment) * 100 if total_investment > 0 else 0
        
        projections = {
            "total_investment": total_investment,
            "projected_revenue": projected_revenue,
            "projected_profit": projected_revenue - total_investment,
            "roi_percentage": roi_percentage,
            "breakdown": {
                "google_ads": {
                    "investment": sum(a.get("budget", 0) for a in google_ads.get("audiences", {}).values()),
                    "projected_revenue": sum(a.get("budget", 0) * (a.get("roi_target", 0) / 100) for a in google_ads.get("audiences", {}).values())
                },
                "facebook_instagram": {
                    "investment": sum(a.get("budget", 0) for a in facebook.get("audiences", {}).values()),
                    "projected_revenue": sum(a.get("budget", 0) * (facebook.get("audiences", {}).get("roi_target", 0) / 100) for a in facebook.get("audiences", {}).values())
                },
                "special_campaigns": {
                    "investment": sum(c.get("total_budget", 0) for c in self.campaign_strategies.values()),
                    "projected_revenue": sum(c.get("total_budget", 0) * (c.get("roi_target", 0) / 100) for c in self.campaign_strategies.values())
                }
            }
        }
        
        print("✅ Projeções de ROI calculadas!")
        return projections
    
    def generate_implementation_plan(self):
        """Gera plano de implementação detalhado"""
        
        print("📋 Gerando Plano de Implementação...")
        
        implementation_plan = {
            "phase_1_week_1": {
                "title": "Configuração Inicial",
                "tasks": [
                    "Configurar Google Ads Remarketing",
                    "Implementar Facebook Pixel",
                    "Criar primeiras audiences customizadas",
                    "Configurar Google Analytics 4"
                ],
                "deliverables": [
                    "Audiences configuradas no Google Ads",
                    "Pixel funcionando no site",
                    "Eventos sendo rastreados"
                ],
                "estimated_hours": 16
            },
            "phase_2_week_2_3": {
                "title": "Automação e Campanhas",
                "tasks": [
                    "Configurar automação de emails",
                    "Criar campanhas de remarketing",
                    "Implementar tracking de eventos",
                    "Configurar sequências de email"
                ],
                "deliverables": [
                    "Sequências de email funcionando",
                    "Campanhas ativas no Google Ads",
                    "Sistema de tracking implementado"
                ],
                "estimated_hours": 24
            },
            "phase_3_month_1": {
                "title": "Otimização e Expansão",
                "tasks": [
                    "Otimizar campanhas baseado em dados",
                    "Expandir para novos canais",
                    "Implementar segmentação avançada",
                    "Ajustar bids e orçamentos"
                ],
                "deliverables": [
                    "Campanhas otimizadas",
                    "Novos canais ativos",
                    "Segmentação implementada"
                ],
                "estimated_hours": 20
            },
            "phase_4_month_2_3": {
                "title": "Análise e Ajustes",
                "tasks": [
                    "Análise completa de performance",
                    "Ajustes estratégicos",
                    "Planejamento de expansão",
                    "Relatório de resultados"
                ],
                "deliverables": [
                    "Relatório de performance",
                    "Ajustes implementados",
                    "Plano de expansão"
                ],
                "estimated_hours": 16
            }
        }
        
        print("✅ Plano de Implementação gerado!")
        return implementation_plan
    
    def save_strategy_to_file(self):
        """Salva toda a estratégia em arquivo JSON"""
        
        strategy_data = {
            "company_info": self.company_data,
            "remarketing_config": self.remarketing_config,
            "audience_segments": self.audience_segments,
            "campaign_strategies": self.campaign_strategies,
            "roi_projections": self.calculate_roi_projections(),
            "implementation_plan": self.generate_implementation_plan(),
            "created_at": datetime.now().isoformat(),
            "version": "1.0"
        }
        
        filename = f"fenix_remarketing_strategy_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(strategy_data, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Estratégia salva em: {filename}")
        return filename
    
    def print_summary(self):
        """Imprime resumo da estratégia implementada"""
        
        print("\n" + "="*80)
        print("🎯 RESUMO DA ESTRATÉGIA DE REMARKETING - FENIX ACADEMY")
        print("="*80)
        
        print(f"\n👨‍💼 CEO: {self.company_data['ceo']}")
        print(f"🏢 Empresa: {self.company_data['name']}")
        print(f"💰 Receita Atual: R$ {self.company_data['current_revenue']:,}/mês")
        print(f"👥 Total de Alunos: {self.company_data['total_students']:,}")
        
        print("\n🚀 CANAIS DE REMARKETING CONFIGURADOS:")
        
        # Google Ads
        if "google_ads" in self.remarketing_config:
            google_ads = self.remarketing_config["google_ads"]
            total_budget = sum(a.get("budget", 0) for a in google_ads.get("audiences", {}).values())
            print(f"   📱 Google Ads: R$ {total_budget:,}/mês")
        
        # Facebook/Instagram
        if "facebook_instagram" in self.remarketing_config:
            facebook = self.remarketing_config["facebook_instagram"]
            total_budget = sum(a.get("budget", 0) for a in facebook.get("audiences", {}).values())
            print(f"   📘 Facebook/Instagram: R$ {total_budget:,}/mês")
        
        # Email Marketing
        if "email_marketing" in self.remarketing_config:
            print(f"   📧 Email Marketing: Configurado com automação")
        
        print(f"\n🎯 AUDIÊNCIAS SEGMENTADAS: {len(self.audience_segments)}")
        for segment_name, segment_data in self.audience_segments.items():
            print(f"   • {segment_name}: {segment_data.get('estimated_size', 0)} usuários")
        
        print(f"\n📊 CAMPANHAS ESPECIAIS: {len(self.campaign_strategies)}")
        for campaign_name, campaign_data in self.campaign_strategies.items():
            print(f"   • {campaign_name}: R$ {campaign_data.get('total_budget', 0):,}")
        
        # ROI Projections
        roi_data = self.calculate_roi_projections()
        print(f"\n💰 PROJEÇÕES DE ROI:")
        print(f"   • Investimento Total: R$ {roi_data['total_investment']:,}")
        print(f"   • Receita Projetada: R$ {roi_data['projected_revenue']:,}")
        print(f"   • Lucro Projetado: R$ {roi_data['projected_profit']:,}")
        print(f"   • ROI Projetado: {roi_data['roi_percentage']:.1f}%")
        
        print(f"\n⏱️ TEMPO TOTAL DE IMPLEMENTAÇÃO: 76 horas")
        print(f"📅 DURAÇÃO TOTAL: 3 meses")
        
        print("\n" + "="*80)
        print("✅ ESTRATÉGIA COMPLETA IMPLEMENTADA!")
        print("="*80)

def main():
    """Função principal para executar a implementação"""
    
    print("🚀 IMPLEMENTANDO ESTRATÉGIA DE REMARKETING - FENIX ACADEMY")
    print("="*80)
    
    # Criar instância da estratégia
    strategy = FenixRemarketingStrategy()
    
    # Implementar todas as estratégias
    strategy.setup_google_ads_remarketing()
    strategy.setup_facebook_instagram_remarketing()
    strategy.setup_email_marketing_remarketing()
    strategy.setup_advanced_segmentation()
    strategy.create_campaign_strategies()
    
    # Salvar estratégia em arquivo
    filename = strategy.save_strategy_to_file()
    
    # Imprimir resumo
    strategy.print_summary()
    
    print(f"\n📁 Arquivo da estratégia salvo: {filename}")
    print("🎯 Próximo passo: Implementar as estratégias seguindo o plano criado!")

if __name__ == "__main__":
    main()
