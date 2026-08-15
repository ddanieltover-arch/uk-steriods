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
      accountName: 'UK PERFORMANCE SUPPLIES LTD',
      sortCode: '20-45-89',
      accountNumber: '83920145',
      bankName: 'Barclays Bank UK PLC',
      totalPence: amountPence,
      formattedTotal,
      note: `Please use payment reference '${referenceCode}' when initiating your UK Faster Payments transfer. Orders dispatch upon receipt confirmation.`,
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
    const wallet = process.env.CRYPTO_WALLET_BTC || '';

    return {
      method: PaymentMethod.CRYPTO,
      referenceCode,
      accountName: wallet || 'Wallet details emailed after order',
      bankName: 'Bitcoin / USDT',
      totalPence: amountPence,
      formattedTotal,
      note: wallet
        ? `Send the GBP equivalent (${formattedTotal}) in BTC or USDT. Include payment reference '${referenceCode}'.`
        : `Pay ${formattedTotal} in BTC or USDT. Use reference '${referenceCode}'. Wallet details will be confirmed by email.`,
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
