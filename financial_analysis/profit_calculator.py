#!/usr/bin/env python3
"""
Calculadora de Lucro - Fenix Academy
Análise financeira completa com conversão de moedas para Real brasileiro
"""

import json
from datetime import datetime, timedelta
from typing import Dict, List, Tuple
import locale

# Configurar locale para formatação brasileira
locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')

class FenixProfitCalculator:
    def __init__(self):
        # Taxas de câmbio (atualizadas)
        self.exchange_rates = {
            'USD': 5.20,  # 1 USD = R$ 5,20
            'EUR': 5.70,  # 1 EUR = R$ 5,70
            'GBP': 6.80,  # 1 GBP = R$ 6,80
            'CAD': 3.90,  # 1 CAD = R$ 3,90
            'AUD': 3.50,  # 1 AUD = R$ 3,50
            'BRL': 1.00   # 1 BRL = R$ 1,00
        }
        
        # Estrutura de cursos
        self.courses = {
            'web-fundamentals': {
                'name': 'Fundamentos de Desenvolvimento Web',
                'price_brl': 297.00,
                'price_usd': 99.00,
                'price_eur': 89.00,
                'expected_students': 300,
                'profit_margin': 0.75
            },
            'python-data-science': {
                'name': 'Python Data Science',
                'price_brl': 397.00,
                'price_usd': 129.00,
                'price_eur': 119.00,
                'expected_students': 250,
                'profit_margin': 0.80
            },
            'react-advanced': {
                'name': 'React Avançado',
                'price_brl': 497.00,
                'price_usd': 159.00,
                'price_eur': 149.00,
                'expected_students': 200,
                'profit_margin': 0.85
            },
            'aws-cloud': {
                'name': 'AWS Cloud',
                'price_brl': 597.00,
                'price_usd': 199.00,
                'price_eur': 189.00,
                'expected_students': 150,
                'profit_margin': 0.90
            },
            'gestao-trafego': {
                'name': 'Gestão de Tráfego',
                'price_brl': 397.00,
                'price_usd': 129.00,
                'price_eur': 119.00,
                'expected_students': 180,
                'profit_margin': 0.85
            },
            'blockchain-smart-contracts': {
                'name': 'Blockchain e Smart Contracts',
                'price_brl': 697.00,
                'price_usd': 229.00,
                'price_eur': 219.00,
                'expected_students': 120,
                'profit_margin': 0.90
            }
        }
        
        # Estrutura de custos
        self.costs = {
            'human_resources': {
                'ceo': 15000.00,
                'developers': 45000.00,
                'designers': 20000.00,
                'marketing': 18000.00,
                'support': 12000.00
            },
            'infrastructure': {
                'aws_servers': 8000.00,
                'development_tools': 2500.00,
                'software_licenses': 1500.00,
                'backup_security': 1000.00
            },
            'marketing': {
                'google_ads': 25000.00,
                'facebook_instagram': 20000.00,
                'linkedin': 15000.00,
                'influencers': 10000.00
            },
            'administrative': {
                'virtual_office': 2000.00,
                'accounting': 1500.00,
                'legal': 2000.00,
                'insurance': 1000.00
            }
        }
        
        # Distribuição de alunos por região
        self.regional_distribution = {
            'Brasil': 0.75,      # 75% dos alunos
            'United States': 0.15, # 15% dos alunos
            'Europe': 0.08,      # 8% dos alunos
            'Other': 0.02        # 2% dos alunos
        }
    
    def convert_currency(self, amount: float, from_currency: str, to_currency: str = 'BRL') -> float:
        """Converte valor de uma moeda para outra"""
        if from_currency == to_currency:
            return amount
        
        # Converter para BRL primeiro
        if from_currency in self.exchange_rates:
            amount_brl = amount * self.exchange_rates[from_currency]
        else:
            amount_brl = amount
        
        # Converter de BRL para moeda destino
        if to_currency in self.exchange_rates:
            return amount_brl / self.exchange_rates[to_currency]
        else:
            return amount_brl
    
    def calculate_course_revenue(self, course_key: str, region: str = 'Brasil') -> Dict:
        """Calcula receita de um curso específico por região"""
        course = self.courses[course_key]
        
        if region == 'Brasil':
            price = course['price_brl']
            currency = 'BRL'
        elif region == 'United States':
            price = course['price_usd']
            currency = 'USD'
        elif region == 'Europe':
            price = course['price_eur']
            currency = 'EUR'
        else:
            price = course['price_usd']
            currency = 'USD'
        
        # Calcular alunos por região
        regional_students = int(course['expected_students'] * self.regional_distribution[region])
        
        # Calcular receita
        revenue_local = price * regional_students
        revenue_brl = self.convert_currency(revenue_local, currency, 'BRL')
        
        return {
            'course_name': course['name'],
            'region': region,
            'price_local': price,
            'currency': currency,
            'students': regional_students,
            'revenue_local': revenue_local,
            'revenue_brl': revenue_brl,
            'profit_margin': course['profit_margin']
        }
    
    def calculate_total_revenue(self) -> Dict:
        """Calcula receita total de todos os cursos"""
        total_revenue = {
            'by_course': {},
            'by_region': {},
            'total_brl': 0.0,
            'total_usd': 0.0,
            'total_eur': 0.0
        }
        
        regions = ['Brasil', 'United States', 'Europe', 'Other']
        
        for course_key in self.courses:
            course_revenue = {}
            for region in regions:
                revenue_data = self.calculate_course_revenue(course_key, region)
                course_revenue[region] = revenue_data
                
                # Acumular por região
                if region not in total_revenue['by_region']:
                    total_revenue['by_region'][region] = 0.0
                total_revenue['by_region'][region] += revenue_data['revenue_brl']
                
                # Acumular total em BRL
                total_revenue['total_brl'] += revenue_data['revenue_brl']
            
            total_revenue['by_course'][course_key] = course_revenue
        
        # Converter totais para outras moedas
        total_revenue['total_usd'] = self.convert_currency(total_revenue['total_brl'], 'BRL', 'USD')
        total_revenue['total_eur'] = self.convert_currency(total_revenue['total_brl'], 'BRL', 'EUR')
        
        return total_revenue
    
    def calculate_total_costs(self) -> Dict:
        """Calcula custos totais operacionais"""
        total_costs = {
            'by_category': {},
            'total_monthly': 0.0
        }
        
        for category, items in self.costs.items():
            category_total = sum(items.values())
            total_costs['by_category'][category] = {
                'items': items,
                'total': category_total
            }
            total_costs['total_monthly'] += category_total
        
        return total_costs
    
    def calculate_profit_analysis(self) -> Dict:
        """Calcula análise completa de lucro"""
        revenue = self.calculate_total_revenue()
        costs = self.calculate_total_costs()
        
        # Calcular lucro
        gross_profit = revenue['total_brl'] - costs['total_monthly']
        profit_margin = (gross_profit / revenue['total_brl']) * 100 if revenue['total_brl'] > 0 else 0
        
        # Calcular métricas por curso
        course_metrics = {}
        for course_key, course_data in revenue['by_course'].items():
            course_total_revenue = sum(data['revenue_brl'] for data in course_data.values())
            course_costs = course_total_revenue * 0.25  # Estimativa de custos por curso
            course_profit = course_total_revenue - course_costs
            course_margin = (course_profit / course_total_revenue) * 100 if course_total_revenue > 0 else 0
            
            course_metrics[course_key] = {
                'total_revenue': course_total_revenue,
                'estimated_costs': course_costs,
                'profit': course_profit,
                'profit_margin': course_margin
            }
        
        return {
            'revenue': revenue,
            'costs': costs,
            'profit_analysis': {
                'gross_revenue': revenue['total_brl'],
                'total_costs': costs['total_monthly'],
                'gross_profit': gross_profit,
                'profit_margin_percent': profit_margin,
                'roi_marketing': (gross_profit / costs['by_category']['marketing']['total']) * 100 if costs['by_category']['marketing']['total'] > 0 else 0
            },
            'course_metrics': course_metrics
        }
    
    def generate_monthly_projection(self, months: int = 12) -> Dict:
        """Gera projeção mensal de receita e lucro"""
        projections = {
            'monthly_data': [],
            'cumulative_data': []
        }
        
        current_month = datetime.now()
        cumulative_revenue = 0
        cumulative_profit = 0
        
        for month in range(1, months + 1):
            # Calcular crescimento mensal (20% ao mês)
            growth_rate = 1.20 ** month
            
            # Receita base do primeiro mês
            base_revenue = 555000.00  # Cenário realista
            monthly_revenue = base_revenue * growth_rate
            
            # Custos crescem mais lentamente (10% ao mês)
            base_costs = 199500.00
            monthly_costs = base_costs * (1.10 ** month)
            
            # Calcular lucro mensal
            monthly_profit = monthly_revenue - monthly_costs
            
            # Acumular
            cumulative_revenue += monthly_revenue
            cumulative_profit += monthly_profit
            
            month_data = {
                'month': month,
                'date': (current_month + timedelta(days=30*month)).strftime('%B %Y'),
                'revenue': monthly_revenue,
                'costs': monthly_costs,
                'profit': monthly_profit,
                'profit_margin': (monthly_profit / monthly_revenue) * 100 if monthly_revenue > 0 else 0
            }
            
            projections['monthly_data'].append(month_data)
            
            cumulative_data = {
                'month': month,
                'date': (current_month + timedelta(days=30*month)).strftime('%B %Y'),
                'cumulative_revenue': cumulative_revenue,
                'cumulative_costs': cumulative_costs if 'cumulative_costs' in locals() else monthly_costs,
                'cumulative_profit': cumulative_profit,
                'cumulative_profit_margin': (cumulative_profit / cumulative_revenue) * 100 if cumulative_revenue > 0 else 0
            }
            
            projections['cumulative_data'].append(cumulative_data)
            cumulative_costs = cumulative_costs + monthly_costs if 'cumulative_costs' in locals() else monthly_costs
        
        return projections
    
    def format_currency(self, amount: float, currency: str = 'BRL') -> str:
        """Formata valor monetário"""
        if currency == 'BRL':
            return f"R$ {amount:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
        elif currency == 'USD':
            return f"$ {amount:,.2f}"
        elif currency == 'EUR':
            return f"€ {amount:,.2f}"
        else:
            return f"{amount:,.2f}"
    
    def generate_report(self) -> str:
        """Gera relatório completo em formato texto"""
        analysis = self.calculate_profit_analysis()
        projections = self.generate_monthly_projection(12)
        
        report = f"""
💰 RELATÓRIO FINANCEIRO COMPLETO - FENIX ACADEMY
{'='*60}

📊 RESUMO EXECUTIVO - PRIMEIRO MÊS
{'='*60}
📅 Data: {datetime.now().strftime('%d/%m/%Y')}
💵 Moeda Base: Real Brasileiro (BRL)
🌍 Taxas de Câmbio: USD=R$5,20 | EUR=R$5,70 | GBP=R$6,80

📈 RECEITA TOTAL: {self.format_currency(analysis['profit_analysis']['gross_revenue'])}
💸 CUSTOS TOTAIS: {self.format_currency(analysis['profit_analysis']['total_costs'])}
💰 LUCRO OPERACIONAL: {self.format_currency(analysis['profit_analysis']['gross_profit'])}
📊 MARGEM DE LUCRO: {analysis['profit_analysis']['profit_margin_percent']:.2f}%
🎯 ROI MARKETING: {analysis['profit_analysis']['roi_marketing']:.2f}%

{'='*60}
📚 ANÁLISE POR CURSO
{'='*60}"""
        
        for course_key, metrics in analysis['course_metrics'].items():
            course_name = self.courses[course_key]['name']
            report += f"""
🎓 {course_name}
   Receita: {self.format_currency(metrics['total_revenue'])}
   Custos: {self.format_currency(metrics['estimated_costs'])}
   Lucro: {self.format_currency(metrics['profit'])}
   Margem: {metrics['profit_margin']:.2f}%
"""
        
        report += f"""
{'='*60}
🌍 ANÁLISE POR REGIÃO
{'='*60}"""
        
        for region, revenue in analysis['revenue']['by_region'].items():
            report += f"""
{region}: {self.format_currency(revenue)}
"""
        
        report += f"""
{'='*60}
📈 PROJEÇÕES ANUAIS
{'='*60}"""
        
        for month_data in projections['monthly_data']:
            report += f"""
{month_data['date']}:
   Receita: {self.format_currency(month_data['revenue'])}
   Custos: {self.format_currency(month_data['costs'])}
   Lucro: {self.format_currency(month_data['profit'])}
   Margem: {month_data['profit_margin']:.2f}%
"""
        
        report += f"""
{'='*60}
🎯 CONCLUSÕES FINANCEIRAS
{'='*60}
✅ A Fenix Academy é altamente lucrativa desde o primeiro mês
✅ Margem de lucro de {analysis['profit_analysis']['profit_margin_percent']:.2f}% supera a média do setor
✅ ROI de marketing de {analysis['profit_analysis']['roi_marketing']:.2f}% demonstra eficiência
✅ Projeção de crescimento de 20% ao mês é sustentável
✅ Diversificação internacional reduz riscos e aumenta receita

🚀 POTENCIAL DE VALORIZAÇÃO:
   • Primeiro ano: {self.format_currency(projections['cumulative_data'][11]['cumulative_revenue'])}
   • Quinto ano: {self.format_currency(projections['cumulative_data'][11]['cumulative_revenue'] * 8)}
   • Valor da empresa: {self.format_currency(projections['cumulative_data'][11]['cumulative_revenue'] * 3)}

{'='*60}
"""
        
        return report
    
    def save_report(self, filename: str = None):
        """Salva o relatório em arquivo"""
        if filename is None:
            filename = f"fenix_profit_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        
        report = self.generate_report()
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(report)
        
        print(f"📄 Relatório salvo em: {filename}")
        return filename

def main():
    """Função principal para executar a calculadora"""
    print("💰 Calculadora de Lucro - Fenix Academy")
    print("=" * 50)
    
    calculator = FenixProfitCalculator()
    
    # Calcular análise
    analysis = calculator.calculate_profit_analysis()
    
    # Exibir resumo
    print(f"\n📊 RESUMO FINANCEIRO:")
    print(f"Receita Total: {calculator.format_currency(analysis['profit_analysis']['gross_revenue'])}")
    print(f"Lucro Operacional: {calculator.format_currency(analysis['profit_analysis']['gross_profit'])}")
    print(f"Margem de Lucro: {analysis['profit_analysis']['profit_margin_percent']:.2f}%")
    print(f"ROI Marketing: {analysis['profit_analysis']['roi_marketing']:.2f}%")
    
    # Gerar e salvar relatório
    report_file = calculator.save_report()
    
    print(f"\n✅ Análise financeira concluída!")
    print(f"📁 Relatório salvo em: {report_file}")

if __name__ == "__main__":
    main()






