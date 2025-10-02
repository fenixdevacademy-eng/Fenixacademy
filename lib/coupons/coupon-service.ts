export interface Coupon {
    id: string;
    code: string;
    description: string;
    discount: number;
    discountType: 'percentage' | 'fixed';
    minAmount?: number;
    maxDiscount?: number;
    validFrom: Date;
    validUntil: Date;
    usageLimit?: number;
    usedCount: number;
    isActive: boolean;
}

export class CouponService {
    private coupons: Coupon[] = [];

    validateCoupon(code: string, amount: number): { isValid: boolean; discount: number; message?: string } {
        const coupon = this.coupons.find(c => c.code === code && c.isActive);

        if (!coupon) {
            return {
                isValid: false,
                discount: 0,
                message: 'Cupom não encontrado ou inativo'
            };
        }

        if (new Date() < coupon.validFrom || new Date() > coupon.validUntil) {
            return {
                isValid: false,
                discount: 0,
                message: 'Cupom fora do período de validade'
            };
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return {
                isValid: false,
                discount: 0,
                message: 'Cupom esgotado'
            };
        }

        if (coupon.minAmount && amount < coupon.minAmount) {
            return {
                isValid: false,
                discount: 0,
                message: `Valor mínimo de R$ ${coupon.minAmount} necessário`
            };
        }

        let discount = 0;
        if (coupon.discountType === 'percentage') {
            discount = (amount * coupon.discount) / 100;
            if (coupon.maxDiscount) {
                discount = Math.min(discount, coupon.maxDiscount);
            }
        } else {
            discount = coupon.discount;
        }

        return {
            isValid: true,
            discount: Math.min(discount, amount),
            message: `Desconto de R$ ${discount.toFixed(2)} aplicado!`
        };
    }

    applyCoupon(code: string, amount: number): { success: boolean; discount: number; message?: string } {
        const validation = this.validateCoupon(code, amount);

        if (!validation.isValid) {
            return {
                success: false,
                discount: 0,
                message: validation.message
            };
        }

        const coupon = this.coupons.find(c => c.code === code);
        if (coupon) {
            coupon.usedCount++;
        }

        return {
            success: true,
            discount: validation.discount,
            message: validation.message
        };
    }

    createCoupon(coupon: Omit<Coupon, 'id' | 'usedCount'>): Coupon {
        const newCoupon: Coupon = {
            ...coupon,
            id: Date.now().toString(),
            usedCount: 0
        };

        this.coupons.push(newCoupon);
        return newCoupon;
    }

    getCoupon(code: string): Coupon | undefined {
        return this.coupons.find(c => c.code === code);
    }

    getAllCoupons(): Coupon[] {
        return this.coupons;
    }

    updateCoupon(id: string, updates: Partial<Coupon>): Coupon | null {
        const index = this.coupons.findIndex(c => c.id === id);
        if (index !== -1) {
            this.coupons[index] = { ...this.coupons[index], ...updates };
            return this.coupons[index];
        }
        return null;
    }

    deleteCoupon(id: string): boolean {
        const index = this.coupons.findIndex(c => c.id === id);
        if (index !== -1) {
            this.coupons.splice(index, 1);
            return true;
        }
        return false;
    }
}

export const couponService = new CouponService();











