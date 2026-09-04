import { PaymentMethod, PaymentStatus } from '@prisma/client';

export const BANK_TRANSFER_MIN_PENCE = 10000;

export interface PaymentInstructions {
  method: PaymentMethod;
  referenceCode: string;
  accountName?: string;
  sortCode?: string;
  accountNumber?: string;
  bankName?: string;
  totalPence: number;
  formattedTotal: string;
  note: string;
}

export interface PaymentProvider {
  method: PaymentMethod;
  generatePaymentInstructions(orderId: string, amountPence: number, referenceCode: string): Promise<PaymentInstructions>;
  verifyPayment?(referenceCode: string): Promise<{ isVerified: boolean; message: string }>;
}

export class BankTransferProvider implements PaymentProvider {
  method: PaymentMethod = PaymentMethod.BANK_TRANSFER;

  async generatePaymentInstructions(
    orderId: string,
    amountPence: number,
    referenceCode: string
  ): Promise<PaymentInstructions> {
    const formattedTotal = `£${(amountPence / 100).toFixed(2)}`;

    return {
      method: PaymentMethod.BANK_TRANSFER,
      referenceCode,
      totalPence: amountPence,
      formattedTotal,
      note: `Contact our admin team with order reference '${referenceCode}' to receive payment instructions and payment details. Do not send funds until you have those details from us.`,
    };
  }

  async verifyPayment(referenceCode: string) {
    return {
      isVerified: false,
      message: `Bank transfer payment reference ${referenceCode} requires manual administrator verification.`,
    };
  }
}

export class CryptoPaymentProvider implements PaymentProvider {
  method: PaymentMethod = PaymentMethod.CRYPTO;

  async generatePaymentInstructions(
    orderId: string,
    amountPence: number,
    referenceCode: string
  ): Promise<PaymentInstructions> {
    const formattedTotal = `£${(amountPence / 100).toFixed(2)}`;

    return {
      method: PaymentMethod.CRYPTO,
      referenceCode,
      totalPence: amountPence,
      formattedTotal,
      note: `Contact our admin team with order reference '${referenceCode}' to receive crypto payment instructions and payment details for ${formattedTotal}. Do not send funds until you have those details from us.`,
    };
  }

  async verifyPayment(referenceCode: string) {
    return {
      isVerified: false,
      message: `Crypto payment reference ${referenceCode} requires manual administrator verification.`,
    };
  }
}

export class PaymentProviderRegistry {
  private static providers: Map<PaymentMethod, PaymentProvider> = new Map();

  static registerProvider(provider: PaymentProvider) {
    this.providers.set(provider.method, provider);
  }

  static getProvider(method: PaymentMethod): PaymentProvider {
    const provider = this.providers.get(method);
    if (!provider) {
      throw new Error(`No registered payment provider found for method: ${method}`);
    }
    return provider;
  }
}

// Register default BankTransferProvider
PaymentProviderRegistry.registerProvider(new BankTransferProvider());
PaymentProviderRegistry.registerProvider(new CryptoPaymentProvider());
