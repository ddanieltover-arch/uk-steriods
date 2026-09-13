import { PaymentMethod } from '@prisma/client';
import {
  getCryptoWalletsFromEnv,
  hasCryptoWallets,
  type CryptoWalletAddresses,
} from '../commerce/crypto-wallets';

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
  btcAddress?: string;
  ethAddress?: string;
  bchAddress?: string;
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

function cryptoPaymentNote(
  referenceCode: string,
  formattedTotal: string,
  wallets: CryptoWalletAddresses
): string {
  if (!hasCryptoWallets(wallets)) {
    return `Contact our admin team with order reference '${referenceCode}' to receive crypto payment instructions and payment details for ${formattedTotal}. Do not send funds until you have those details from us.`;
  }

  return `Send crypto covering ${formattedTotal} to one of the wallet addresses below (BTC, ETH, or BCH). Use the correct network for each coin. Quote order reference '${referenceCode}' in the memo/description where your wallet supports it, then email us the transaction hash.`;
}

export class CryptoPaymentProvider implements PaymentProvider {
  method: PaymentMethod = PaymentMethod.CRYPTO;

  async generatePaymentInstructions(
    orderId: string,
    amountPence: number,
    referenceCode: string
  ): Promise<PaymentInstructions> {
    const formattedTotal = `£${(amountPence / 100).toFixed(2)}`;
    const wallets = getCryptoWalletsFromEnv();

    return {
      method: PaymentMethod.CRYPTO,
      referenceCode,
      totalPence: amountPence,
      formattedTotal,
      note: cryptoPaymentNote(referenceCode, formattedTotal, wallets),
      ...wallets,
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

/** Re-export for callers that only need wallet shape from stored instructions. */
export type { CryptoWalletAddresses };
