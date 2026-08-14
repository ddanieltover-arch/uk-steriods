export interface TaxConfig {
  enabled: boolean;
  inclusive: boolean;
  ratePercent: number; // e.g. 20 for 20%
  taxName: string; // e.g. "UK VAT"
}

export class TaxService {
  private static config: TaxConfig = {
    enabled: false, // Default: tax calculation inactive unless enabled
    inclusive: true,
    ratePercent: 20,
    taxName: "VAT",
  };

  static getConfig(): TaxConfig {
    return { ...this.config };
  }

  static updateConfig(newConfig: Partial<TaxConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Calculates tax amount in integer pence based on configuration
   */
  static calculateTax(subtotalAfterDiscountPence: number): number {
    if (!this.config.enabled || subtotalAfterDiscountPence <= 0) {
      return 0;
    }

    if (this.config.inclusive) {
      // Inclusive: Tax = Subtotal - (Subtotal / (1 + Rate))
      return Math.round(subtotalAfterDiscountPence - (subtotalAfterDiscountPence / (1 + this.config.ratePercent / 100)));
    } else {
      // Exclusive: Tax = Subtotal * (Rate / 100)
      return Math.round(subtotalAfterDiscountPence * (this.config.ratePercent / 100));
    }
  }
}
