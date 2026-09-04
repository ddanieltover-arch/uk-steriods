import { getSiteOrigin, SITE_NAME } from '../../seo/site';
import {
  AccountNotificationContext,
  escapeHtml,
  formatPence,
  OrderNotificationContext,
  RenderedEmail,
} from '../notification.types';
import {
  emailAddressBlock,
  emailButton,
  emailHeading,
  emailKeyValueGrid,
  emailOrderItemsTable,
  emailParagraph,
  emailPaymentInstructions,
  emailStatusBanner,
  emailSupportLine,
  emailTotalsTable,
  emailTrustStrip,
} from './components';
import { renderEmailLayout } from './layout';

function addressText(ctx: OrderNotificationContext): string {
  const a = ctx.shippingAddress || {};
  return [
    [a.firstName, a.lastName].filter(Boolean).join(' '),
    a.addressLine1,
    a.addressLine2,
    [a.city, a.county].filter(Boolean).join(', '),
    a.postcode,
    a.country || 'GB',
  ]
    .filter(Boolean)
    .join(', ');
}

function itemsText(ctx: OrderNotificationContext): string {
  return ctx.items
    .map(
      (item) =>
        `- ${item.productName}${item.variantName ? ` (${item.variantName})` : ''} | SKU ${item.productSku} × ${item.quantity} | ${formatPence(item.subtotalPence)}`
    )
    .join('\n');
}

function trackingLink(ctx: OrderNotificationContext): string {
  const origin = getSiteOrigin();
  if (ctx.userId) {
    return `${origin}/account/orders/${encodeURIComponent(ctx.orderNumber)}`;
  }
  if (ctx.trackingToken) {
    return `${origin}/track-order?order=${encodeURIComponent(ctx.orderNumber)}&token=${encodeURIComponent(ctx.trackingToken)}`;
  }
  return `${origin}/track-order`;
}

function supportEmail(ctx: OrderNotificationContext): string {
  return ctx.supportEmail || process.env.EMAIL_REPLY_TO || 'sales@uk-steroids.co.uk';
}

function orderMetaGrid(ctx: OrderNotificationContext): string {
  return emailKeyValueGrid([
    { label: 'Order number', value: ctx.orderNumber, highlight: true },
    { label: 'Order date', value: new Date(ctx.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { label: 'Payment method', value: ctx.paymentMethod.replace(/_/g, ' ') },
    { label: 'Delivery method', value: ctx.shippingMethodName || 'Standard UK delivery' },
  ]);
}

export function renderOrderCreated(ctx: OrderNotificationContext): RenderedEmail {
  const link = trackingLink(ctx);
  const name = ctx.customerName || 'there';

  if (ctx.isAdminCopy) {
    const subject = `New order ${ctx.orderNumber} — ${formatPence(ctx.totalPence)} | ${SITE_NAME}`;
    const customerEmail = ctx.customerEmail || ctx.recipientEmail;
    const bodyHtml = `
      ${emailStatusBanner('success', 'New order received', `Order ${ctx.orderNumber} was just placed and is awaiting payment.`)}
      ${emailHeading('Ops alert', `Customer: ${escapeHtml(name)} (${escapeHtml(customerEmail)})`)}
      ${orderMetaGrid(ctx)}
      ${emailOrderItemsTable(ctx)}
      ${emailTotalsTable(ctx)}
      ${emailPaymentInstructions(ctx)}
      ${emailAddressBlock(ctx)}
      ${emailButton(link, 'Open order tracking link')}
      ${emailSupportLine(supportEmail(ctx))}
    `;
    const { html } = renderEmailLayout({
      title: subject,
      preheader: `New order ${ctx.orderNumber} from ${customerEmail}`,
      bodyHtml,
    });
    const text = [
      `New order ${ctx.orderNumber}`,
      `Customer: ${name} <${customerEmail}>`,
      `Total: ${formatPence(ctx.totalPence)}`,
      `Payment: ${ctx.paymentMethod}`,
      `Deliver to: ${addressText(ctx)}`,
      `Track: ${link}`,
      '',
      itemsText(ctx),
    ].join('\n');
    return { subject, html, text };
  }

  const subject = `Order confirmed — ${ctx.orderNumber} | ${SITE_NAME}`;

  const bodyHtml = `
    ${emailStatusBanner('success', 'Thank you for your order', `We received order ${ctx.orderNumber} and it is awaiting payment.`)}
    ${emailHeading(`Hi ${name},`, 'Your order has been placed successfully. Contact our admin team for payment instructions and payment details to start processing.')}
    ${orderMetaGrid(ctx)}
    ${emailOrderItemsTable(ctx)}
    ${emailTotalsTable(ctx)}
    ${emailPaymentInstructions(ctx)}
    ${emailAddressBlock(ctx)}
    ${emailButton(link, 'View order & payment status')}
    ${emailSupportLine(supportEmail(ctx))}
    ${emailTrustStrip()}
  `;

  const { html } = renderEmailLayout({
    title: subject,
    preheader: `Order ${ctx.orderNumber} confirmed — payment instructions inside`,
    bodyHtml,
  });

  const text = [
    `Thank you for your order`,
    `Order: ${ctx.orderNumber}`,
    `Date: ${new Date(ctx.createdAt).toUTCString()}`,
    '',
    itemsText(ctx),
    '',
    `Subtotal: ${formatPence(ctx.subtotalPence)}`,
    ctx.discountPence > 0 ? `Discount: -${formatPence(ctx.discountPence)}` : '',
    `Shipping: ${formatPence(ctx.shippingPence)}`,
    ctx.taxPence > 0 ? `Tax: ${formatPence(ctx.taxPence)}` : '',
    `Total: ${formatPence(ctx.totalPence)}`,
    '',
    `Payment method: ${ctx.paymentMethod}`,
    `Contact ${supportEmail(ctx)} for payment instructions and payment details. Quote order ${ctx.orderNumber}.`,
    `Deliver to: ${addressText(ctx)}`,
    `Track: ${link}`,
    `Questions? Contact ${supportEmail(ctx)}`,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text };
}

export function renderPaymentConfirmed(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Payment received — ${ctx.orderNumber} | ${SITE_NAME}`;
  const link = trackingLink(ctx);

  const bodyHtml = `
    ${emailStatusBanner('success', 'Payment confirmed', `${formatPence(ctx.totalPence)} received for order ${ctx.orderNumber}.`)}
    ${emailHeading('Payment received', 'Your order will move into fulfilment shortly. We will email you again when it ships.')}
    ${emailKeyValueGrid([
      { label: 'Order number', value: ctx.orderNumber, highlight: true },
      { label: 'Amount paid', value: formatPence(ctx.totalPence), highlight: true },
      { label: 'Payment status', value: 'Confirmed' },
    ])}
    ${emailButton(link, 'View order details')}
    ${emailSupportLine(supportEmail(ctx))}
    ${emailTrustStrip()}
  `;

  const { html } = renderEmailLayout({
    title: subject,
    preheader: `Payment confirmed for order ${ctx.orderNumber}`,
    bodyHtml,
  });

  return {
    subject,
    html,
    text: `Payment confirmed for ${ctx.orderNumber}. Amount: ${formatPence(ctx.totalPence)}. View: ${link}`,
  };
}

export function renderOrderProcessing(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Order being prepared — ${ctx.orderNumber} | ${SITE_NAME}`;
  const link = trackingLink(ctx);

  const bodyHtml = `
    ${emailStatusBanner('info', 'Your order is being prepared', `Order ${ctx.orderNumber} is now in our fulfilment queue.`)}
    ${emailHeading('We are preparing your order', 'Our team is picking and packing your items. You will receive a shipping confirmation email once dispatched.')}
    ${emailKeyValueGrid([{ label: 'Order number', value: ctx.orderNumber, highlight: true }])}
    ${emailButton(link, 'Track order status')}
    ${emailSupportLine(supportEmail(ctx))}
    ${emailTrustStrip()}
  `;

  const { html } = renderEmailLayout({
    title: subject,
    preheader: `Order ${ctx.orderNumber} is being prepared`,
    bodyHtml,
  });

  return { subject, html, text: `Order ${ctx.orderNumber} is being prepared. Track: ${link}` };
}

export function renderOrderShipped(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Order shipped — ${ctx.orderNumber} | ${SITE_NAME}`;
  const link = trackingLink(ctx);

  const shipmentRows: Array<{ label: string; value: string; highlight?: boolean }> = [
    { label: 'Order number', value: ctx.orderNumber, highlight: true },
  ];
  if (ctx.shipmentProvider) shipmentRows.push({ label: 'Carrier', value: ctx.shipmentProvider });
  if (ctx.shipmentMethod) shipmentRows.push({ label: 'Service', value: ctx.shipmentMethod });
  if (ctx.trackingNumber) shipmentRows.push({ label: 'Tracking number', value: ctx.trackingNumber, highlight: true });
  if (ctx.estimatedDeliveryAt) {
    shipmentRows.push({
      label: 'Estimated delivery',
      value: new Date(ctx.estimatedDeliveryAt).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
    });
  }

  const bodyHtml = `
    ${emailStatusBanner('info', 'Your order is on its way', `Order ${ctx.orderNumber} has been dispatched.`)}
    ${emailHeading('Shipment dispatched', 'Your order is on its way in discreet, unbranded packaging.')}
    ${emailKeyValueGrid(shipmentRows)}
    ${emailParagraph('If a carrier tracking link is available, use your tracking number on the carrier website for live updates.')}
    ${emailButton(link, 'View order details')}
    ${emailSupportLine(supportEmail(ctx))}
    ${emailTrustStrip()}
  `;

  const { html } = renderEmailLayout({
    title: subject,
    preheader: `Order ${ctx.orderNumber} has shipped${ctx.trackingNumber ? ` — tracking ${ctx.trackingNumber}` : ''}`,
    bodyHtml,
  });

  const text = [
    `Order ${ctx.orderNumber} has shipped.`,
    ctx.shipmentProvider ? `Carrier: ${ctx.shipmentProvider}` : '',
    ctx.shipmentMethod ? `Method: ${ctx.shipmentMethod}` : '',
    ctx.trackingNumber ? `Tracking: ${ctx.trackingNumber}` : '',
    `View: ${link}`,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text };
}

export function renderOrderDelivered(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Order delivered — ${ctx.orderNumber} | ${SITE_NAME}`;
  const link = trackingLink(ctx);

  const bodyHtml = `
    ${emailStatusBanner('success', 'Delivered', `Order ${ctx.orderNumber} has been marked as delivered.`)}
    ${emailHeading('Delivery confirmed', 'We hope everything arrived as expected. If anything is missing or damaged, contact our support team.')}
    ${emailKeyValueGrid([{ label: 'Order number', value: ctx.orderNumber, highlight: true }])}
    ${emailButton(link, 'View order')}
    ${emailSupportLine(supportEmail(ctx))}
    ${emailTrustStrip()}
  `;

  const { html } = renderEmailLayout({
    title: subject,
    preheader: `Order ${ctx.orderNumber} delivered`,
    bodyHtml,
  });

  return { subject, html, text: `Order ${ctx.orderNumber} marked delivered. View: ${link}` };
}

export function renderOrderCancelled(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Order cancelled — ${ctx.orderNumber} | ${SITE_NAME}`;
  const link = trackingLink(ctx);
  const refundNote =
    ctx.paymentStatus === 'REFUNDED'
      ? 'Payment status shows this order as refunded.'
      : 'If you paid by bank transfer, any refund will follow only after payment status is updated by our team.';

  const bodyHtml = `
    ${emailStatusBanner('danger', 'Order cancelled', `Order ${ctx.orderNumber} has been cancelled.`)}
    ${emailHeading('Your order was cancelled', refundNote)}
    ${emailKeyValueGrid([{ label: 'Order number', value: ctx.orderNumber, highlight: true }])}
    ${emailButton(link, 'View order details')}
    ${emailSupportLine(supportEmail(ctx))}
  `;

  const { html } = renderEmailLayout({
    title: subject,
    preheader: `Order ${ctx.orderNumber} has been cancelled`,
    bodyHtml,
  });

  return { subject, html, text: `Order ${ctx.orderNumber} cancelled. ${refundNote} View: ${link}` };
}

export function renderAccountCreated(ctx: AccountNotificationContext): RenderedEmail {
  const subject = `Welcome to ${SITE_NAME}`;
  const origin = getSiteOrigin();

  const bodyHtml = `
    ${emailStatusBanner('success', 'Account created', `Welcome, ${ctx.firstName}!`)}
    ${emailHeading(`Welcome, ${ctx.firstName}`, `Your ${SITE_NAME} account for ${ctx.email} is ready.`)}
    ${emailParagraph('Sign in to view order history, save addresses, and track deliveries from your account dashboard. This message confirms account creation only — it is not a marketing newsletter.')}
    ${emailButton(`${origin}/account`, 'Go to your account')}
    ${emailParagraph(`Need help getting started? Contact <a href="mailto:${escapeHtml(process.env.EMAIL_REPLY_TO || 'sales@uk-steroids.co.uk')}" style="color:#0d9488;font-weight:700;text-decoration:none;">${escapeHtml(process.env.EMAIL_REPLY_TO || 'sales@uk-steroids.co.uk')}</a>.`)}
    ${emailTrustStrip()}
  `;

  const { html } = renderEmailLayout({
    title: subject,
    preheader: `Your ${SITE_NAME} account is ready`,
    bodyHtml,
  });

  return {
    subject,
    html,
    text: `Welcome ${ctx.firstName}. Your account (${ctx.email}) is ready. Visit ${origin}/account`,
  };
}

export function renderPasswordReset(ctx: AccountNotificationContext): RenderedEmail {
  const subject = `Reset your ${SITE_NAME} password`;
  const resetUrl = ctx.resetUrl || `${getSiteOrigin()}/reset-password`;

  const bodyHtml = `
    ${emailStatusBanner('warning', 'Password reset requested', 'Use the secure link below to choose a new password.')}
    ${emailHeading('Reset your password', `We received a request to reset the password for ${ctx.email}.`)}
    ${emailParagraph('This link expires shortly and can be used once. If you did not request a reset, you can safely ignore this email — your password will remain unchanged.')}
    ${emailButton(resetUrl, 'Reset password')}
    ${emailParagraph(`Link not working? Copy and paste this URL into your browser:<br /><span style="font-size:12px;color:#64748b;word-break:break-all;">${escapeHtml(resetUrl)}</span>`)}
  `;

  const { html } = renderEmailLayout({
    title: subject,
    preheader: `Reset your ${SITE_NAME} password`,
    bodyHtml,
  });

  return {
    subject,
    html,
    text: `Password reset for ${ctx.email}. Open: ${resetUrl}. If you did not request this, ignore this email.`,
  };
}

export function renderPasswordChanged(ctx: AccountNotificationContext): RenderedEmail {
  const subject = `Password changed — ${SITE_NAME}`;
  const when = ctx.changedAt || new Date().toISOString();

  const bodyHtml = `
    ${emailStatusBanner('success', 'Password updated', 'Your account password was changed successfully.')}
    ${emailHeading('Password changed', `The password for ${ctx.email} was changed on ${new Date(when).toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}.`)}
    ${emailParagraph('For security, other active sessions have been signed out. If you did not make this change, contact support immediately and reset your password.')}
    ${emailButton(`${getSiteOrigin()}/login`, 'Sign in to your account')}
  `;

  const { html } = renderEmailLayout({
    title: subject,
    preheader: `Your ${SITE_NAME} password was changed`,
    bodyHtml,
  });

  return {
    subject,
    html,
    text: `Password for ${ctx.email} changed at ${new Date(when).toUTCString()}. If this was not you, contact support.`,
  };
}
