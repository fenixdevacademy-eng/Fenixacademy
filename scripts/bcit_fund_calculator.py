#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Calculadora do Fundo BCIT - Fenix Academy
CEO: Lucas Silva Petris
"""

import json
import os
from datetime import datetime, timedelta
import locale

# Configurar locale para formatação brasileira
try:
    locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')
except:
    try:
        locale.setlocale(locale.LC_ALL, 'Portuguese_Brazil.1252')
    except:
        pass

class BCITFundCalculator:
    def __init__(self):
        self.company_data = {
            "name": "Fenix Academy",
            "ceo": "Lucas Silva Petris",
            "current_revenue": 45000,
            "total_students": 1250,
            "completion_rate": 78.5
        }
        
        self.bcit_info = {
            "name": "British Columbia Institute of Technology",
            "location": "Vancouver, British Columbia, Canadá",
            "programs": {
                "computer_systems": {
                    "name": "Computer Systems Technology",
                    "duration": "2 anos",
                    "cost_cad": 45000,
                    "cost_brl": 170000,
                    "salary_range": "CAD 70.000 - 90.000/ano",
                    "alignment": "Perfeito para expandir conhecimentos da Fenix"
                },
                "business_management": {
                    "name": "Business Management",
                    "duration": "2 anos",
                    "cost_cad": 40000,
                    "cost_brl": 150000,
                    "salary_range": "CAD 60.000 - 80.000/ano",
                    "alignment": "Melhorar gestão da Fenix Academy"
                },
                "digital_design": {
                    "name": "Digital Design and Development",
                    "duration": "2 anos",
                    "cost_cad": 42000,
                    "cost_brl": 160000,
                    "salary_range": "CAD 65.000 - 85.000/ano",
                    "alignment": "Modernizar plataforma da Fenix"
                }
            }
        }
        
        self.fund_strategy = {
            "monthly_contribution": 6750,
            "target_amount": 121500,
            "target_months": 18,
            "investment_rate": 0.10,  # 10% ao ano
            "preparation_costs": 20000,
            "application_costs": 5000
        }
        
        self.revenue_projections = {
            "current": 45000,
            "month_6": 60000,
            "month_12": 75000,
            "month_18": 90000,
            "month_24": 108000,
            "month_36": 144000
        }
    
    def calculate_monthly_income_breakdown(self, monthly_revenue):
        """Calcula a distribuição mensal da renda"""
        
        breakdown = {
            "salario_base": monthly_revenue * 0.35,
            "bonus_performance": monthly_revenue * 0.15,
            "participacao_lucros": monthly_revenue * 0.25,
            "fundo_bcit": monthly_revenue * 0.15,
            "reserva_emergencia": monthly_revenue * 0.10
        }
        
        breakdown["total_ceo"] = breakdown["salario_base"] + breakdown["bonus_performance"] + (breakdown["participacao_lucros"] * 0.4)
        
        return breakdown
    
    def calculate_fund_projection(self, months=36):
        """Calcula projeção do fundo BCIT ao longo do tempo"""
        
        projections = []
        current_fund = 0
        
        for month in range(1, months + 1):
            # Calcular receita projetada para este mês
            if month <= 6:
                revenue = self.revenue_projections["month_6"]
            elif month <= 12:
                revenue = self.revenue_projections["month_12"]
            elif month <= 18:
                revenue = self.revenue_projections["month_18"]
            elif month <= 24:
                revenue = self.revenue_projections["month_24"]
            else:
                revenue = self.revenue_projections["month_36"]
            
            # Calcular contribuição mensal
            monthly_contribution = revenue * 0.15
            
            # Aplicar juros compostos
            if month > 1:
                current_fund = current_fund * (1 + self.fund_strategy["investment_rate"] / 12)
            
            current_fund += monthly_contribution
            
            projections.append({
                "month": month,
                "revenue": revenue,
                "monthly_contribution": monthly_contribution,
                "fund_balance": current_fund,
                "target_achieved": current_fund >= self.fund_strategy["target_amount"],
                "months_to_target": max(0, self.fund_strategy["target_months"] - month) if current_fund < self.fund_strategy["target_amount"] else 0
            })
        
        return projections
    
    def analyze_program_affordability(self):
        """Analisa a viabilidade financeira de cada programa"""
        
        projections = self.calculate_fund_projection(24)  # 2 anos
        
        analysis = {}
        
        for program_key, program in self.bcit_info["programs"].items():
            # Encontrar quando o fundo atinge o valor necessário
            target_month = None
            for proj in projections:
                if proj["fund_balance"] >= program["cost_brl"]:
                    target_month = proj["month"]
                    break
            
            analysis[program_key] = {
                "name": program["name"],
                "cost_brl": program["cost_brl"],
                "cost_cad": program["cost_cad"],
                "duration": program["duration"],
                "salary_range": program["salary_range"],
                "alignment": program["alignment"],
                "affordable_in_months": target_month,
                "fund_available_at_target": projections[target_month - 1]["fund_balance"] if target_month else 0,
                "surplus": (projections[target_month - 1]["fund_balance"] - program["cost_brl"]) if target_month else 0,
                "viability": "Viável" if target_month and target_month <= 24 else "Precisa de mais tempo"
            }
        
        return analysis
    
    def generate_financial_plan(self):
        """Gera plano financeiro completo"""
        
        monthly_breakdown = self.calculate_monthly_income_breakdown(self.company_data["current_revenue"])
        fund_projections = self.calculate_fund_projection(36)
        program_analysis = self.analyze_program_affordability()
        
        plan = {
            "company_info": self.company_data,
            "bcit_info": self.bcit_info,
            "fund_strategy": self.fund_strategy,
            "monthly_income_breakdown": monthly_breakdown,
            "fund_projections": fund_projections,
            "program_analysis": program_analysis,
            "summary": {
                "target_achieved_in_months": next((proj["month"] for proj in fund_projections if proj["target_achieved"]), None),
                "total_contribution_18_months": sum(proj["monthly_contribution"] for proj in fund_projections[:18]),
                "projected_fund_18_months": fund_projections[17]["fund_balance"],
                "best_program_option": min(program_analysis.values(), key=lambda x: x["affordable_in_months"] or 999)["name"]
            },
            "created_at": datetime.now().isoformat(),
            "version": "1.0"
        }
        
        return plan
    
    def print_detailed_report(self):
        """Imprime relatório detalhado"""
        
        print("\n" + "="*100)
        print("🎓 RELATÓRIO COMPLETO: FUNDO BCIT - FENIX ACADEMY")
        print("="*100)
        
        print(f"\n👨‍💼 CEO: {self.company_data['ceo']}")
        print(f"🏢 Empresa: {self.company_data['name']}")
        print(f"💰 Receita Atual: R$ {self.company_data['current_revenue']:,.2f}/mês")
        print(f"👥 Total de Alunos: {self.company_data['total_students']:,}")
        
        # Distribuição mensal da renda
        monthly_breakdown = self.calculate_monthly_income_breakdown(self.company_data["current_revenue"])
        
        print(f"\n💵 DISTRIBUIÇÃO MENSUAL DA RENDA:")
        print(f"   • Salário Base (35%): R$ {monthly_breakdown['salario_base']:,.2f}")
        print(f"   • Bônus Performance (15%): R$ {monthly_breakdown['bonus_performance']:,.2f}")
        print(f"   • Participação Lucros (25%): R$ {monthly_breakdown['participacao_lucros']:,.2f}")
        print(f"   • Fundo BCIT (15%): R$ {monthly_breakdown['fundo_bcit']:,.2f}")
        print(f"   • Reserva Emergência (10%): R$ {monthly_breakdown['reserva_emergencia']:,.2f}")
        print(f"   • Total CEO: R$ {monthly_breakdown['total_ceo']:,.2f}")
        
        # Projeções do fundo
        fund_projections = self.calculate_fund_projection(24)
        
        print(f"\n🎯 PROJEÇÕES DO FUNDO BCIT:")
        print(f"   • Contribuição Mensal: R$ {self.fund_strategy['monthly_contribution']:,.2f}")
        print(f"   • Meta: R$ {self.fund_strategy['target_amount']:,.2f}")
        print(f"   • Prazo: {self.fund_strategy['target_months']} meses")
        print(f"   • Taxa de Investimento: {self.fund_strategy['investment_rate']*100:.1f}% ao ano")
        
        print(f"\n📊 PROJEÇÕES POR PERÍODO:")
        key_months = [6, 12, 18, 24]
        for month in key_months:
            if month <= len(fund_projections):
                proj = fund_projections[month - 1]
                print(f"   • Mês {month}: R$ {proj['fund_balance']:,.2f} (Receita: R$ {proj['revenue']:,.2f})")
        
        # Análise dos programas
        program_analysis = self.analyze_program_affordability()
        
        print(f"\n🎓 ANÁLISE DOS PROGRAMAS BCIT:")
        for program_key, analysis in program_analysis.items():
            print(f"\n   📚 {analysis['name']}")
            print(f"      • Custo: CAD {analysis['cost_cad']:,} (R$ {analysis['cost_brl']:,})")
            print(f"      • Duração: {analysis['duration']}")
            print(f"      • Viabilidade: {analysis['viability']}")
            if analysis['affordable_in_months']:
                print(f"      • Acessível em: {analysis['affordable_in_months']} meses")
                print(f"      • Excedente: R$ {analysis['surplus']:,.2f}")
            print(f"      • Alinhamento: {analysis['alignment']}")
        
        # Resumo
        summary = {
            "target_achieved_in_months": next((proj["month"] for proj in fund_projections if proj["target_achieved"]), None),
            "total_contribution_18_months": sum(proj["monthly_contribution"] for proj in fund_projections[:18]),
            "projected_fund_18_months": fund_projections[17]["fund_balance"],
            "best_program_option": min(program_analysis.values(), key=lambda x: x["affordable_in_months"] or 999)["name"]
        }
        
        print(f"\n📋 RESUMO EXECUTIVO:")
        if summary["target_achieved_in_months"]:
            print(f"   ✅ Meta do fundo atingida em {summary['target_achieved_in_months']} meses")
        else:
            print(f"   ⏳ Meta do fundo será atingida em {self.fund_strategy['target_months']} meses")
        
        print(f"   💰 Total contribuído em 18 meses: R$ {summary['total_contribution_18_months']:,.2f}")
        print(f"   🎯 Fundo projetado em 18 meses: R$ {summary['projected_fund_18_months']:,.2f}")
        print(f"   🎓 Melhor opção de programa: {summary['best_program_option']}")
        
        print(f"\n🚀 PRÓXIMOS PASSOS:")
        print(f"   1. Abrir conta específica para Fundo BCIT")
        print(f"   2. Configurar investimentos automáticos")
        print(f"   3. Pesquisar programas específicos")
        print(f"   4. Preparar documentação para aplicação")
        
        print("\n" + "="*100)
        print("✅ RELATÓRIO COMPLETO GERADO!")
        print("="*100)
    
    def save_plan_to_file(self):
        """Salva o plano em arquivo JSON"""
        
        plan = self.generate_financial_plan()
        
        filename = f"bcit_fund_plan_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(plan, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Plano salvo em: {filename}")
        return filename

def main():
    """Função principal"""
    
    print("🎓 CALCULADORA DO FUNDO BCIT - FENIX ACADEMY")
    print("="*100)
    
    # Criar instância da calculadora
    calculator = BCITFundCalculator()
    
    # Gerar e imprimir relatório
    calculator.print_detailed_report()
    
    # Salvar plano em arquivo
    filename = calculator.save_plan_to_file()
    
    print(f"\n📁 Arquivo do plano salvo: {filename}")
    print("🎯 Próximo passo: Implementar as estratégias de remarketing para acelerar o fundo!")

if __name__ == "__main__":
    main()
