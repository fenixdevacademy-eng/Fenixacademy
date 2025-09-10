// Calculadora de receita e projeções financeiras
export interface RevenueProjection {
  period: string;
  revenue: number;
  students: number;
  averageTicket: number;
  growth: number;
}

export interface RevenueMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  averageTicket: number;
  totalStudents: number;
  conversionRate: number;
  churnRate: number;
  ltv: number; // Lifetime Value
  cac: number; // Customer Acquisition Cost
}

export interface CourseRevenue {
  courseId: string;
  courseName: string;
  revenue: number;
  students: number;
  averageTicket: number;
  completionRate: number;
}

export class RevenueCalculator {
  private static baseRevenue = 50000; // R$ 50.000 base
  private static growthRate = 0.15; // 15% crescimento mensal
  private static averageTicket = 299.90;
  private static conversionRate = 0.08; // 8%
  private static churnRate = 0.05; // 5%

  static calculateRevenueMetrics(months: number = 12): RevenueMetrics {
    const monthlyRevenue = this.baseRevenue * Math.pow(1 + this.growthRate, months - 1);
    const totalRevenue = this.calculateTotalRevenue(months);
    const totalStudents = Math.round(totalRevenue / this.averageTicket);
    const yearlyRevenue = this.calculateYearlyRevenue();
    const ltv = this.calculateLTV();
    const cac = this.calculateCAC();

    return {
      totalRevenue: Math.round(totalRevenue),
      monthlyRevenue: Math.round(monthlyRevenue),
      yearlyRevenue: Math.round(yearlyRevenue),
      averageTicket: this.averageTicket,
      totalStudents: totalStudents,
      conversionRate: this.conversionRate,
      churnRate: this.churnRate,
      ltv: Math.round(ltv),
      cac: Math.round(cac)
    };
  }

  static calculateProjections(months: number = 12): RevenueProjection[] {
    const projections: RevenueProjection[] = [];
    
    for (let i = 1; i <= months; i++) {
      const revenue = this.baseRevenue * Math.pow(1 + this.growthRate, i - 1);
      const students = Math.round(revenue / this.averageTicket);
      const growth = i === 1 ? 0 : this.growthRate * 100;
      
      projections.push({
        period: this.getMonthName(i),
        revenue: Math.round(revenue),
        students: students,
        averageTicket: this.averageTicket,
        growth: Math.round(growth * 100) / 100
      });
    }

    return projections;
  }

  static calculateCourseRevenue(courses: any[]): CourseRevenue[] {
    return courses.map(course => {
      const students = Math.floor(Math.random() * 500) + 100; // Simulação
      const completionRate = Math.random() * 0.3 + 0.7; // 70-100%
      const revenue = students * course.price * completionRate;
      
      return {
        courseId: course.id,
        courseName: course.title,
        revenue: Math.round(revenue),
        students: students,
        averageTicket: course.price,
        completionRate: Math.round(completionRate * 100) / 100
      };
    });
  }

  static calculateGlobalProjection(): {
    currentYear: number;
    nextYear: number;
    growth: number;
    students: number;
    revenue: number;
  } {
    const currentYear = this.calculateYearlyRevenue();
    const nextYear = currentYear * (1 + this.growthRate);
    const growth = this.growthRate * 100;
    const students = Math.round(currentYear / this.averageTicket);
    const revenue = Math.round(currentYear);

    return {
      currentYear: Math.round(currentYear),
      nextYear: Math.round(nextYear),
      growth: Math.round(growth * 100) / 100,
      students: students,
      revenue: revenue
    };
  }

  static calculateBreakEven(): {
    months: number;
    revenue: number;
    students: number;
  } {
    const monthlyCosts = 15000; // R$ 15.000 custos mensais
    const months = Math.ceil(monthlyCosts / (this.baseRevenue * this.growthRate));
    const revenue = months * this.baseRevenue;
    const students = Math.round(revenue / this.averageTicket);

    return {
      months: months,
      revenue: Math.round(revenue),
      students: students
    };
  }

  static calculateROI(investment: number): {
    roi: number;
    paybackPeriod: number;
    netProfit: number;
  } {
    const yearlyRevenue = this.calculateYearlyRevenue();
    const yearlyCosts = 180000; // R$ 180.000 custos anuais
    const netProfit = yearlyRevenue - yearlyCosts;
    const roi = ((netProfit - investment) / investment) * 100;
    const paybackPeriod = investment / (yearlyRevenue - yearlyCosts);

    return {
      roi: Math.round(roi * 100) / 100,
      paybackPeriod: Math.round(paybackPeriod * 100) / 100,
      netProfit: Math.round(netProfit)
    };
  }

  private static calculateTotalRevenue(months: number): number {
    let total = 0;
    for (let i = 1; i <= months; i++) {
      total += this.baseRevenue * Math.pow(1 + this.growthRate, i - 1);
    }
    return total;
  }

  private static calculateYearlyRevenue(): number {
    return this.calculateTotalRevenue(12);
  }

  private static calculateLTV(): number {
    const monthlyRevenue = this.averageTicket;
    const churnRate = this.churnRate;
    return monthlyRevenue / churnRate;
  }

  private static calculateCAC(): number {
    const marketingBudget = 10000; // R$ 10.000 mensal
    const newStudents = Math.round(this.baseRevenue * this.growthRate / this.averageTicket);
    return marketingBudget / newStudents;
  }

  private static getMonthName(month: number): string {
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    return months[(month - 1) % 12];
  }
}

// Instância do serviço para compatibilidade
export const revenueCalculator = new RevenueCalculator();
