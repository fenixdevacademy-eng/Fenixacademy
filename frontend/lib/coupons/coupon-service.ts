// Serviço de cupons de desconto
export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  description?: string;
  applicableCourses?: string[];
}

export interface CouponValidationResult {
  isValid: boolean;
  discount: number;
  error?: string;
}

export class CouponService {
  private coupons: Coupon[] = [
    {
      id: '1',
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      minAmount: 50,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2024-12-31'),
      usageLimit: 1000,
      usedCount: 0,
      isActive: true,
      description: '10% de desconto para novos usuários',
      applicableCourses: []
    },
    {
      id: '2',
      code: 'STUDENT20',
      type: 'percentage',
      value: 20,
      minAmount: 100,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2024-12-31'),
      usageLimit: 500,
      usedCount: 0,
      isActive: true,
      description: '20% de desconto para estudantes',
      applicableCourses: []
    }
  ];

  validateCoupon(code: string, cartTotal: number, courseIds: string[] = []): CouponValidationResult {
    const coupon = this.coupons.find(c => c.code === code && c.isActive);

    if (!coupon) {
      return {
        isValid: false,
        discount: 0,
        error: 'Cupom não encontrado ou inativo'
      };
    }

    // Verificar validade temporal
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return {
        isValid: false,
        discount: 0,
        error: 'Cupom fora do período de validade'
      };
    }

    // Verificar limite de uso
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return {
        isValid: false,
        discount: 0,
        error: 'Cupom esgotado'
      };
    }

    // Verificar valor mínimo
    if (coupon.minAmount && cartTotal < coupon.minAmount) {
      return {
        isValid: false,
        discount: 0,
        error: `Valor mínimo de R$ ${coupon.minAmount} necessário`
      };
    }

    // Verificar cursos aplicáveis
    if (coupon.applicableCourses && coupon.applicableCourses.length > 0) {
      const hasApplicableCourse = courseIds.some(id => coupon.applicableCourses!.includes(id));
      if (!hasApplicableCourse) {
        return {
          isValid: false,
          discount: 0,
          error: 'Cupom não aplicável aos cursos selecionados'
        };
      }
    }

    // Calcular desconto
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (cartTotal * coupon.value) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    } else if (coupon.type === 'free_shipping') {
      discount = 0; // Frete grátis seria aplicado separadamente
    }

    return {
      isValid: true,
      discount: Math.round(discount * 100) / 100
    };
  }

  applyCoupon(code: string, cartTotal: number, courseIds: string[] = []): CouponValidationResult {
    const validation = this.validateCoupon(code, cartTotal, courseIds);

    if (validation.isValid) {
      const coupon = this.coupons.find(c => c.code === code);
      if (coupon) {
        coupon.usedCount++;
        this.saveCoupons();
      }
    }

    return validation;
  }

  getCoupon(code: string): Coupon | undefined {
    return this.coupons.find(c => c.code === code);
  }

  getAllCoupons(): Coupon[] {
    return this.coupons.filter(c => c.isActive);
  }

  createCoupon(coupon: Omit<Coupon, 'id' | 'usedCount'>): Coupon {
    const newCoupon: Coupon = {
      ...coupon,
      id: Date.now().toString(),
      usedCount: 0
    };

    this.coupons.push(newCoupon);
    this.saveCoupons();
    return newCoupon;
  }

  updateCoupon(id: string, updates: Partial<Coupon>): Coupon | null {
    const index = this.coupons.findIndex(c => c.id === id);
    if (index === -1) return null;

    this.coupons[index] = { ...this.coupons[index], ...updates };
    this.saveCoupons();
    return this.coupons[index];
  }

  deleteCoupon(id: string): boolean {
    const index = this.coupons.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.coupons.splice(index, 1);
    this.saveCoupons();
    return true;
  }

  private saveCoupons(): void {
    try {
      localStorage.setItem('fenix-coupons', JSON.stringify(this.coupons));
    } catch (error) {
      console.error('Erro ao salvar cupons:', error);
    }
  }

  private loadCoupons(): void {
    try {
      const saved = localStorage.getItem('fenix-coupons');
      if (saved) {
        this.coupons = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar cupons:', error);
    }
  }

  constructor() {
    this.loadCoupons();
  }
}

// Instância global do serviço
export const couponService = new CouponService();