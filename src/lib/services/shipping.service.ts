import { ShipmentStatus } from '@prisma/client';

export interface ShippingMethodDto {
  id: string;
  displayName: string;
  description: string;
  pricePence: number;
  estimatedMinDays: number;
  estimatedMaxDays: number;
  active: boolean;
  availableCountries: string[];
}

export interface ShippingRate {
  id: string;
  displayName: string;
  description: string;
  pricePence: number;
  estimatedMinDays: number;
  estimatedMaxDays: number;
  isFree: boolean;
  carrier: string;
}

export class ShippingService {
  private static FREE_SHIPPING_THRESHOLD_PENCE = 10000; // £100.00 default threshold

  private static methods: ShippingMethodDto[] = [
    {
      id: 'standard-delivery',
      displayName: 'Standard Delivery',
      description: '2 - 3 Working Days',
      pricePence: 399,
      estimatedMinDays: 2,
      estimatedMaxDays: 3,
      active: true,
      availableCountries: ['GB', 'UK'],
    },
    {
      id: 'express-delivery',
      displayName: 'Express Delivery',
      description: '1 - 2 Working Days',
      pricePence: 699,
      estimatedMinDays: 1,
      estimatedMaxDays: 2,
      active: true,
      availableCountries: ['GB', 'UK'],
    },
  ];

  static getFreeShippingThreshold(): number {
    return this.FREE_SHIPPING_THRESHOLD_PENCE;
  }

  static setFreeShippingThreshold(thresholdPence: number) {
    this.FREE_SHIPPING_THRESHOLD_PENCE = thresholdPence;
  }

  static getShippingMethods(country = 'GB', subtotalPence = 0): ShippingRate[] {
    const isFreeShippingEligible = subtotalPence >= this.FREE_SHIPPING_THRESHOLD_PENCE;
    const countryUpper = (country || 'GB').toUpperCase();

    return this.methods
      .filter((m) => m.active && (m.availableCountries.length === 0 || m.availableCountries.includes(countryUpper) || m.availableCountries.includes('UK')))
      .map((m) => {
        const isFree = m.id === 'standard-delivery' && isFreeShippingEligible;
        return {
          id: m.id,
          displayName: m.displayName,
          description: m.description,
          pricePence: isFree ? 0 : m.pricePence,
          estimatedMinDays: m.estimatedMinDays,
          estimatedMaxDays: m.estimatedMaxDays,
          isFree,
          carrier: 'Tracked Delivery Provider',
        };
      });
  }

  static getShippingCost(methodId: string, country = 'GB', subtotalPence = 0): number {
    const rates = this.getShippingMethods(country, subtotalPence);
    const selected = rates.find((r) => r.id === methodId);
    if (!selected) {
      // Default to standard or first rate if method not found
      return rates[0]?.pricePence ?? 399;
    }
    return selected.pricePence;
  }

  static async createShipment(orderId: string, methodId: string) {
    const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
    const trackingNumber = `GB${randomDigits}TR`;
    const costPence = this.getShippingCost(methodId);

    return {
      trackingNumber,
      carrier: 'Tracked Delivery Provider',
      status: ShipmentStatus.PENDING,
      costPence,
    };
  }
}

// Backwards compatibility alias for registry
export class FlatRateShippingProvider {
  async getRates(country: string, subtotalPence: number) {
    return ShippingService.getShippingMethods(country, subtotalPence).map((r) => ({
      id: r.id,
      name: r.displayName,
      pricePence: r.pricePence,
      estimatedDelivery: r.description,
      carrier: r.carrier,
    }));
  }
}
