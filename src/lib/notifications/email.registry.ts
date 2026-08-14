import { NotificationEventType } from '@prisma/client';
import {
  AccountNotificationContext,
  NotificationPayload,
  OrderNotificationContext,
  RenderedEmail,
} from './notification.types';
import {
  renderAccountCreated,
  renderOrderCancelled,
  renderOrderCreated,
  renderOrderDelivered,
  renderOrderProcessing,
  renderOrderShipped,
  renderPasswordChanged,
  renderPasswordReset,
  renderPaymentConfirmed,
} from './templates';

export function renderNotificationEmail(
  eventType: NotificationEventType,
  payload: NotificationPayload
): RenderedEmail {
  if (payload.kind === 'order') {
    return renderOrderEmail(eventType, payload.data);
  }
  return renderAccountEmail(eventType, payload.data);
}

function renderOrderEmail(eventType: NotificationEventType, data: OrderNotificationContext): RenderedEmail {
  switch (eventType) {
    case 'ORDER_CREATED':
    case 'PAYMENT_INSTRUCTIONS':
      return renderOrderCreated(data);
    case 'PAYMENT_CONFIRMED':
      return renderPaymentConfirmed(data);
    case 'ORDER_PROCESSING':
      return renderOrderProcessing(data);
    case 'ORDER_SHIPPED':
      return renderOrderShipped(data);
    case 'ORDER_DELIVERED':
      return renderOrderDelivered(data);
    case 'ORDER_CANCELLED':
      return renderOrderCancelled(data);
    default:
      throw new Error(`Unsupported order notification event: ${eventType}`);
  }
}

function renderAccountEmail(
  eventType: NotificationEventType,
  data: AccountNotificationContext
): RenderedEmail {
  switch (eventType) {
    case 'ACCOUNT_CREATED':
      return renderAccountCreated(data);
    case 'PASSWORD_RESET_REQUESTED':
      return renderPasswordReset(data);
    case 'PASSWORD_CHANGED':
      return renderPasswordChanged(data);
    default:
      throw new Error(`Unsupported account notification event: ${eventType}`);
  }
}

/** Safe demo fixtures for preview routes — never real customer data. */
export function getDemoOrderContext(): OrderNotificationContext {
  return {
    orderId: 'demo-order-id',
    orderNumber: 'ORD-DEMO-0001',
    createdAt: new Date().toISOString(),
    recipientEmail: 'demo@example.test',
    customerName: 'Demo Customer',
    userId: null,
    items: [
      {
        productName: 'Pharmaqo Testosterone-E 300',
        productSku: 'PHARMAQO-TEST-E',
        variantName: '10ml Vial (300mg/ml)',
        quantity: 1,
        unitPricePence: 4290,
        subtotalPence: 4290,
      },
    ],
    subtotalPence: 2999,
    shippingPence: 395,
    taxPence: 0,
    discountPence: 0,
    totalPence: 3394,
    paymentMethod: 'BANK_TRANSFER',
    paymentStatus: 'AWAITING_TRANSFER',
    shippingMethodName: 'Royal Mail Tracked 48',
    shippingAddress: {
      firstName: 'Demo',
      lastName: 'Customer',
      addressLine1: '1 Example Street',
      city: 'London',
      postcode: 'E1 1AA',
      country: 'GB',
    },
    paymentInstructions: {
      method: 'BANK_TRANSFER',
      referenceCode: 'ORD-DEMO-0001',
      accountName: 'DEMO MERCHANTS LTD',
      sortCode: '00-00-00',
      accountNumber: '00000000',
      bankName: 'UK Commercial Bank PLC',
      formattedTotal: '£33.94',
      note: 'Use the payment reference when transferring.',
    },
    trackingToken: 'track_demo_token',
    supportEmail: 'support@example.test',
  };
}

export function getDemoAccountContext(): AccountNotificationContext {
  return {
    userId: 'demo-user-id',
    email: 'demo@example.test',
    firstName: 'Demo',
    lastName: 'Customer',
    resetUrl: `${process.env.SITE_URL || 'http://localhost:3001'}/reset-password?token=demo-token-not-valid`,
    changedAt: new Date().toISOString(),
  };
}
