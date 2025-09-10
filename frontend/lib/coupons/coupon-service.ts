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

export interface CouponValidation {
  isValid: boolean;
  discount: number;
  message: string;
  coupon?: Coupon;
}

export class CouponService {
  private static coupons: Coupon[] = [
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
    },
    {
      id: '3',
      code: 'FREESHIP',
      type: 'free_shipping',
      value: 0,
      minAmount: 200,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2024-12-31'),
      usageLimit: 100,
      usedCount: 0,
      isActive: true,
      description: 'Frete grátis para compras acima de R$ 200',
      applicableCourses: []
    }
  ];

  static async validateCoupon(code: string, amount: number, courseId?: string): Promise<CouponValidation> {
    try {
      const coupon = this.coupons.find(c => 
        c.code.toLowerCase() === code.toLowerCase() && 
        c.isActive &&
        new Date() >= c.validFrom &&
        new Date() <= c.validUntil
      );

      if (!coupon) {
        return {
          isValid: false,
          discount: 0,
          message: 'Cupom não encontrado ou expirado'
        };
      }

      // Verificar limite de uso
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        return {
          isValid: false,
          discount: 0,
          message: 'Cupom esgotado'
        };
      }

      // Verificar valor mínimo
      if (coupon.minAmount && amount < coupon.minAmount) {
        return {
          isValid: false,
          discount: 0,
          message: `Valor mínimo de R$ ${coupon.minAmount} necessário`
        };
      }

      // Verificar se o cupom se aplica ao curso
      if (coupon.applicableCourses && coupon.applicableCourses.length > 0) {
        if (!courseId || !coupon.applicableCourses.includes(courseId)) {
          return {
            isValid: false,
            discount: 0,
            message: 'Cupom não válido para este curso'
          };
        }
      }

      // Calcular desconto
      let discount = 0;
      if (coupon.type === 'percentage') {
        discount = (amount * coupon.value) / 100;
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
      } else if (coupon.type === 'fixed') {
        discount = Math.min(coupon.value, amount);
      } else if (coupon.type === 'free_shipping') {
        discount = 0; // Frete grátis não afeta o valor do produto
      }

      return {
        isValid: true,
        discount: Math.round(discount * 100) / 100,
        message: 'Cupom aplicado com sucesso',
        coupon
      };
    } catch (error) {
      console.error('Error validating coupon:', error);
      return {
        isValid: false,
        discount: 0,
        message: 'Erro ao validar cupom'
      };
    }
  }

  static async applyCoupon(code: string, amount: number, courseId?: string): Promise<CouponValidation> {
    const validation = await this.validateCoupon(code, amount, courseId);
    
    if (validation.isValid && validation.coupon) {
      // Incrementar contador de uso
      validation.coupon.usedCount++;
      
      // Atualizar no "banco de dados" (simulação)
      const index = this.coupons.findIndex(c => c.id === validation.coupon!.id);
      if (index !== -1) {
        this.coupons[index] = validation.coupon;
      }
    }

    return validation;
  }

  static async getCouponByCode(code: string): Promise<Coupon | null> {
    return this.coupons.find(c => c.code.toLowerCase() === code.toLowerCase()) || null;
  }

  static async getAllCoupons(): Promise<Coupon[]> {
    return this.coupons.filter(c => c.isActive);
  }

  static async createCoupon(coupon: Omit<Coupon, 'id' | 'usedCount'>): Promise<Coupon> {
    const newCoupon: Coupon = {
      ...coupon,
      id: Date.now().toString(),
      usedCount: 0
    };
    
    this.coupons.push(newCoupon);
    return newCoupon;
  }

  static async updateCoupon(id: string, updates: Partial<Coupon>): Promise<Coupon | null> {
    const index = this.coupons.findIndex(c => c.id === id);
    if (index !== -1) {
      this.coupons[index] = { ...this.coupons[index], ...updates };
      return this.coupons[index];
    }
    return null;
  }

  static async deleteCoupon(id: string): Promise<boolean> {
    const index = this.coupons.findIndex(c => c.id === id);
    if (index !== -1) {
      this.coupons.splice(index, 1);
      return true;
    }
    return false;
  }
}
