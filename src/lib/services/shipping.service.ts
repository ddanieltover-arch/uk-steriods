import { EUROPEAN_COUNTRIES } from '../../data/countries';

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

export const SHIP_COUNTRY_STORAGE_KEY = 'ukp-ship-country';
export const SHIP_RATE_STORAGE_KEY = 'ukp-shipping-rate-id';

export const SHIPPING_PRICES = {
  ukStandardPence: 1000,
  ukExpressPence: 1500,
  ukDiscretePence: 2000,
  europePence: 2500,
  internationalPence: 3500,
} as const;

const EUROPE_CODES = new Set(EUROPEAN_COUNTRIES.map((c) => c.code));

export type ShippingZone = 'uk' | 'europe' | 'international';

function toRate(
  id: string,
  displayName: string,
  description: string,
  pricePence: number,
  estimatedMinDays: number,
  estimatedMaxDays: number,
  isFree = false
): ShippingRate {
  return {
    id,
    displayName,
    description,
    pricePence: isFree ? 0 : pricePence,
    estimatedMinDays,
    estimatedMaxDays,
    isFree,
    carrier: 'Tracked Delivery Provider',
  };
}

export const FREE_UK_SHIPPING_THRESHOLD_PENCE = 30000;

export class ShippingService {
  static getShippingZone(country = 'GB'): ShippingZone {
    const code = (country || 'GB').toUpperCase();
    if (code === 'GB' || code === 'UK') return 'uk';
    if (EUROPE_CODES.has(code)) return 'europe';
    return 'international';
  }

  static getFreeShippingThreshold(): number {
    return FREE_UK_SHIPPING_THRESHOLD_PENCE;
  }

  static setFreeShippingThreshold(_thresholdPence: number) {
    // UK free shipping is fixed at £300. Admin overrides are ignored.
  }

  static getShippingMethods(country = 'GB', subtotalPence = 0): ShippingRate[] {
    const zone = this.getShippingZone(country);
    const freeUkStandard = zone === 'uk' && subtotalPence >= FREE_UK_SHIPPING_THRESHOLD_PENCE;

    if (zone === 'uk') {
      return [
        toRate(
          'standard-delivery',
          'Royal Mail Tracked 48',
          '2 - 3 working days',
          SHIPPING_PRICES.ukStandardPence,
          2,
          3,
          freeUkStandard
        ),
        toRate(
          'express-delivery',
          'Royal Mail Special Delivery 24',
          '1 - 2 working days',
          SHIPPING_PRICES.ukExpressPence,
          1,
          2
        ),
        toRate(
          'discrete-delivery',
          'Discrete Delivery',
          'Plain packaging priority · 2 - 4 working days',
          SHIPPING_PRICES.ukDiscretePence,
          2,
          4
        ),
      ];
    }

    if (zone === 'europe') {
      return [
        toRate(
          'europe-delivery',
          'European tracked delivery',
          'Tracked from the UK · typically 4–8 working days',
          SHIPPING_PRICES.europePence,
          4,
          8
        ),
      ];
    }

    return [
      toRate(
        'international-delivery',
        'International tracked delivery',
        'Tracked from the UK · typically 7–14 working days',
        SHIPPING_PRICES.internationalPence,
        7,
        14
      ),
    ];
  }

  static getShippingCost(methodId: string, country = 'GB', subtotalPence = 0): number {
    return this.resolveRate(country, methodId, subtotalPence).pricePence;
  }

  static resolveRate(country = 'GB', methodId?: string, subtotalPence = 0): ShippingRate {
    const rates = this.getShippingMethods(country, subtotalPence);
    return rates.find((r) => r.id === methodId) || rates[0];
  }

  static async createShipment(orderId: string, methodId: string, country = 'GB') {
    const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
    const trackingNumber = `GB${randomDigits}TR`;
    const costPence = this.getShippingCost(methodId, country);

    return {
      trackingNumber,
      carrier: 'Tracked Delivery Provider',
      status: 'PENDING' as const,
      costPence,
    };
  }
}

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
