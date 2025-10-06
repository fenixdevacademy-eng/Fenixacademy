'use client';

﻿// Calculadora de receita e projeções financeiras
export interface RevenueProjection {
  period: string;
  revenue: number;
  students: number;
  averageTicket: number;
  growth: number;
}

export interface RevenueData {
  currentYear: number;
  nextYear: number;
  growth: number;
  students: number;
  revenue: number;
}

export interface CostAnalysis {
  monthlyCosts: number;
  yearlyCosts: number;
  profitMargin: number;
  breakEvenStudents: number;
}

export class RevenueCalculator {
  private averageTicket: number;
  private growthRate: number;
  private currentStudents: number;

  constructor(averageTicket: number = 500, growthRate: number = 0.2, currentStudents: number = 100) {
    this.averageTicket = averageTicket;
    this.growthRate = growthRate;
    this.currentStudents = currentStudents;
  }

  calculateYearlyRevenue(): number {
    return this.currentStudents * this.averageTicket * 12;
  }

  calculateProjections(): RevenueData {
    const currentYear = this.calculateYearlyRevenue();
    const nextYear = currentYear * (1 + this.growthRate);
    const growth = this.growthRate * 100;
    const students = Math.round(currentYear / this.averageTicket);
    const revenue = Math.round(currentYear);

    return {
      currentYear: Math.round(currentYear),
      nextYear: Math.round(nextYear),
      growth: Math.round(growth * 100) / 100,
      students,
      revenue
    };
  }

  calculateCosts(): CostAnalysis {
    const monthlyCosts = 15000; // R$ 15.000 custos mensais
    const yearlyCosts = monthlyCosts * 12;
    const currentRevenue = this.calculateYearlyRevenue();
    const profitMargin = ((currentRevenue - yearlyCosts) / currentRevenue) * 100;
    const breakEvenStudents = Math.ceil(yearlyCosts / this.averageTicket);

    return {
      monthlyCosts,
      yearlyCosts,
      profitMargin: Math.round(profitMargin * 100) / 100,
      breakEvenStudents
    };
  }

  calculateMonthlyProjections(months: number = 12): RevenueProjection[] {
    const projections: RevenueProjection[] = [];
    const currentRevenue = this.calculateYearlyRevenue() / 12;

    for (let i = 0; i < months; i++) {
      const monthRevenue = currentRevenue * Math.pow(1 + this.growthRate / 12, i);
      const students = Math.round(monthRevenue / this.averageTicket);
      const growth = i === 0 ? 0 : (monthRevenue / (currentRevenue * Math.pow(1 + this.growthRate / 12, i - 1)) - 1) * 100;

      projections.push({
        period: `Mês ${i + 1}`,
        revenue: Math.round(monthRevenue),
        students,
        averageTicket: this.averageTicket,
        growth: Math.round(growth * 100) / 100
      });
    }

    return projections;
  }

  calculateYearlyProjections(years: number = 5): RevenueProjection[] {
    const projections: RevenueProjection[] = [];
    const currentRevenue = this.calculateYearlyRevenue();

    for (let i = 0; i < years; i++) {
      const yearRevenue = currentRevenue * Math.pow(1 + this.growthRate, i);
      const students = Math.round(yearRevenue / this.averageTicket);
      const growth = i === 0 ? 0 : this.growthRate * 100;

      projections.push({
        period: `Ano ${i + 1}`,
        revenue: Math.round(yearRevenue),
        students,
        averageTicket: this.averageTicket,
        growth: Math.round(growth * 100) / 100
      });
    }

    return projections;
  }

  updateParameters(averageTicket?: number, growthRate?: number, currentStudents?: number): void {
    if (averageTicket !== undefined) this.averageTicket = averageTicket;
    if (growthRate !== undefined) this.growthRate = growthRate;
    if (currentStudents !== undefined) this.currentStudents = currentStudents;
  }

  getROI(investment: number): number {
    const yearlyRevenue = this.calculateYearlyRevenue();
    const costs = this.calculateCosts().yearlyCosts;
    const profit = yearlyRevenue - costs;
    return (profit / investment) * 100;
  }

  getPaybackPeriod(investment: number): number {
    const monthlyProfit = (this.calculateYearlyRevenue() - this.calculateCosts().yearlyCosts) / 12;
    return Math.ceil(investment / monthlyProfit);
  }
}