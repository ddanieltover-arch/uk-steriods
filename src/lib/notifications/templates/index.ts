import { getSiteOrigin, SITE_NAME } from '../../seo/site';
import {
  AccountNotificationContext,
  escapeHtml,
  formatPence,
  OrderNotificationContext,
  RenderedEmail,
} from '../notification.types';
import { buttonHtml, renderEmailLayout } from './layout';

function addressLines(ctx: OrderNotificationContext): string {
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
    .map((line) => escapeHtml(String(line)))
    .join('<br />');
}

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

function itemsHtml(ctx: OrderNotificationContext): string {
  const rows = ctx.items
    .map((item) => {
      const name = escapeHtml(item.productName);
      const variant = item.variantName ? ` (${escapeHtml(item.variantName)})` : '';
      return `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:13px;">${name}${variant}<br /><span style="color:#64748b;font-size:11px;">SKU ${escapeHtml(item.productSku)} × ${item.quantity}</span></td>
        <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:right;white-space:nowrap;">${escapeHtml(formatPence(item.subtotalPence))}</td>
      </tr>`;
    })
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;
}

function itemsText(ctx: OrderNotificationContext): string {
  return ctx.items
    .map(
      (item) =>
        `- ${item.productName}${item.variantName ? ` (${item.variantName})` : ''} | SKU ${item.productSku} × ${item.quantity} | ${formatPence(item.subtotalPence)}`
    )
    .join('\n');
}

function totalsHtml(ctx: OrderNotificationContext): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;font-size:13px;">
    <tr><td>Subtotal</td><td style="text-align:right;">${escapeHtml(formatPence(ctx.subtotalPence))}</td></tr>
    ${ctx.discountPence > 0 ? `<tr><td>Discount</td><td style="text-align:right;">-${escapeHtml(formatPence(ctx.discountPence))}</td></tr>` : ''}
    <tr><td>Shipping</td><td style="text-align:right;">${escapeHtml(formatPence(ctx.shippingPence))}</td></tr>
    ${ctx.taxPence > 0 ? `<tr><td>Tax</td><td style="text-align:right;">${escapeHtml(formatPence(ctx.taxPence))}</td></tr>` : ''}
    <tr><td style="padding-top:8px;font-weight:800;">Total</td><td style="padding-top:8px;text-align:right;font-weight:800;">${escapeHtml(formatPence(ctx.totalPence))}</td></tr>
  </table>`;
}

function paymentInstructionsHtml(ctx: OrderNotificationContext): string {
  const p = ctx.paymentInstructions;
  if (!p) return '';
  return `<div style="margin-top:20px;padding:16px;background:#f0fdfa;border:1px solid #99f6e4;border-radius:12px;">
    <div style="font-size:13px;font-weight:800;color:#0f766e;margin-bottom:8px;">Bank transfer instructions</div>
    <div style="font-size:13px;line-height:1.6;color:#134e4a;">
      ${p.bankName ? `<div>Bank: ${escapeHtml(p.bankName)}</div>` : ''}
      ${p.accountName ? `<div>Account name: ${escapeHtml(p.accountName)}</div>` : ''}
      ${p.sortCode ? `<div>Sort code: ${escapeHtml(p.sortCode)}</div>` : ''}
      ${p.accountNumber ? `<div>Account number: ${escapeHtml(p.accountNumber)}</div>` : ''}
      ${p.referenceCode ? `<div>Payment reference: <strong>${escapeHtml(p.referenceCode)}</strong></div>` : ''}
      ${p.formattedTotal ? `<div>Amount: ${escapeHtml(p.formattedTotal)}</div>` : ''}
      ${p.note ? `<div style="margin-top:8px;">${escapeHtml(p.note)}</div>` : ''}
    </div>
  </div>`;
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

function supportLine(ctx: OrderNotificationContext): string {
  const email = ctx.supportEmail || process.env.EMAIL_REPLY_TO || 'support@ukperformance.local';
  return `Questions? Contact ${email}.`;
}

export function renderOrderCreated(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Order ${ctx.orderNumber} confirmed — ${SITE_NAME}`;
  const link = trackingLink(ctx);
  const bodyHtml = `
    <h1 style="margin:0 0 12px;font-size:22px;">Thanks for your order</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      Hi ${escapeHtml(ctx.customerName || 'there')}, we received order <strong>${escapeHtml(ctx.orderNumber)}</strong>
      on ${escapeHtml(new Date(ctx.createdAt).toUTCString())}.
    </p>
    ${itemsHtml(ctx)}
    ${totalsHtml(ctx)}
    <p style="margin:16px 0 8px;font-size:13px;"><strong>Delivery method:</strong> ${escapeHtml(ctx.shippingMethodName || 'Standard UK delivery')}</p>
    <p style="margin:0 0 16px;font-size:13px;line-height:1.5;"><strong>Deliver to:</strong><br />${addressLines(ctx)}</p>
    <p style="margin:0 0 8px;font-size:13px;"><strong>Payment method:</strong> ${escapeHtml(ctx.paymentMethod)}</p>
    ${paymentInstructionsHtml(ctx)}
    <p style="margin:20px 0;">${buttonHtml(link, 'View order status')}</p>
    <p style="margin:0;font-size:12px;color:#64748b;">${escapeHtml(supportLine(ctx))}</p>
  `;
  const { html } = renderEmailLayout({ title: subject, preheader: `Order ${ctx.orderNumber} received`, bodyHtml });
  const text = [
    `Thanks for your order`,
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
    ctx.paymentInstructions?.referenceCode
      ? `Payment reference: ${ctx.paymentInstructions.referenceCode}`
      : '',
    ctx.paymentInstructions?.accountName
      ? `Account: ${ctx.paymentInstructions.accountName}`
      : '',
    ctx.paymentInstructions?.sortCode ? `Sort code: ${ctx.paymentInstructions.sortCode}` : '',
    ctx.paymentInstructions?.accountNumber
      ? `Account number: ${ctx.paymentInstructions.accountNumber}`
      : '',
    `Deliver to: ${addressText(ctx)}`,
    `Track: ${link}`,
    supportLine(ctx),
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text };
}

export function renderPaymentConfirmed(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Payment received for ${ctx.orderNumber} — ${SITE_NAME}`;
  const link = trackingLink(ctx);
  const bodyHtml = `
    <h1 style="margin:0 0 12px;font-size:22px;">Payment confirmed</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      We have confirmed payment of <strong>${escapeHtml(formatPence(ctx.totalPence))}</strong> for order
      <strong>${escapeHtml(ctx.orderNumber)}</strong>. Your order will move into fulfilment next.
    </p>
    <p style="margin:20px 0;">${buttonHtml(link, 'View order')}</p>
  `;
  const { html } = renderEmailLayout({ title: subject, bodyHtml });
  const text = `Payment confirmed for ${ctx.orderNumber}. Amount: ${formatPence(ctx.totalPence)}. View: ${link}`;
  return { subject, html, text };
}

export function renderOrderProcessing(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Order ${ctx.orderNumber} is being prepared — ${SITE_NAME}`;
  const link = trackingLink(ctx);
  const bodyHtml = `
    <h1 style="margin:0 0 12px;font-size:22px;">Your order is being prepared</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      Order <strong>${escapeHtml(ctx.orderNumber)}</strong> is now in processing. We will email you again when it ships.
    </p>
    <p style="margin:20px 0;">${buttonHtml(link, 'Track order')}</p>
  `;
  const { html } = renderEmailLayout({ title: subject, bodyHtml });
  return { subject, html, text: `Order ${ctx.orderNumber} is being prepared. Track: ${link}` };
}

export function renderOrderShipped(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Order ${ctx.orderNumber} has shipped — ${SITE_NAME}`;
  const link = trackingLink(ctx);
  const bodyHtml = `
    <h1 style="margin:0 0 12px;font-size:22px;">Your order is on its way</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      Order <strong>${escapeHtml(ctx.orderNumber)}</strong> has been dispatched.
    </p>
    <ul style="padding-left:18px;font-size:13px;line-height:1.7;color:#334155;">
      ${ctx.shipmentProvider ? `<li>Carrier: ${escapeHtml(ctx.shipmentProvider)}</li>` : ''}
      ${ctx.shipmentMethod ? `<li>Method: ${escapeHtml(ctx.shipmentMethod)}</li>` : ''}
      ${ctx.trackingNumber ? `<li>Tracking number: ${escapeHtml(ctx.trackingNumber)}</li>` : ''}
      ${ctx.estimatedDeliveryAt ? `<li>Estimated delivery: ${escapeHtml(new Date(ctx.estimatedDeliveryAt).toUTCString())}</li>` : ''}
    </ul>
    <p style="margin:12px 0;font-size:12px;color:#64748b;">Tracking links are only provided when a carrier integration is configured. Your tracking number can be used on the carrier's website.</p>
    <p style="margin:20px 0;">${buttonHtml(link, 'View order')}</p>
  `;
  const { html } = renderEmailLayout({ title: subject, bodyHtml });
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
  const subject = `Order ${ctx.orderNumber} delivered — ${SITE_NAME}`;
  const link = trackingLink(ctx);
  const bodyHtml = `
    <h1 style="margin:0 0 12px;font-size:22px;">Delivered</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      Order <strong>${escapeHtml(ctx.orderNumber)}</strong> has been marked as delivered.
    </p>
    <p style="margin:20px 0;">${buttonHtml(link, 'View order')}</p>
  `;
  const { html } = renderEmailLayout({ title: subject, bodyHtml });
  return { subject, html, text: `Order ${ctx.orderNumber} marked delivered. View: ${link}` };
}

export function renderOrderCancelled(ctx: OrderNotificationContext): RenderedEmail {
  const subject = `Order ${ctx.orderNumber} cancelled — ${SITE_NAME}`;
  const link = trackingLink(ctx);
  const refundNote =
    ctx.paymentStatus === 'REFUNDED'
      ? 'Payment status shows this order as refunded.'
      : 'If you paid by bank transfer, any refund will follow only after payment status is updated by our team.';
  const bodyHtml = `
    <h1 style="margin:0 0 12px;font-size:22px;">Order cancelled</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      Order <strong>${escapeHtml(ctx.orderNumber)}</strong> has been cancelled.
    </p>
    <p style="margin:0 0 16px;font-size:13px;color:#475569;">${escapeHtml(refundNote)}</p>
    <p style="margin:20px 0;">${buttonHtml(link, 'View order')}</p>
  `;
  const { html } = renderEmailLayout({ title: subject, bodyHtml });
  return { subject, html, text: `Order ${ctx.orderNumber} cancelled. ${refundNote} View: ${link}` };
}

export function renderAccountCreated(ctx: AccountNotificationContext): RenderedEmail {
  const subject = `Welcome to ${SITE_NAME}`;
  const origin = getSiteOrigin();
  const bodyHtml = `
    <h1 style="margin:0 0 12px;font-size:22px;">Welcome, ${escapeHtml(ctx.firstName)}</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      Your ${escapeHtml(SITE_NAME)} account for <strong>${escapeHtml(ctx.email)}</strong> is ready.
      This message confirms account creation only — it is not a marketing newsletter.
    </p>
    <p style="margin:20px 0;">${buttonHtml(`${origin}/account`, 'Go to your account')}</p>
  `;
  const { html } = renderEmailLayout({ title: subject, bodyHtml });
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
    <h1 style="margin:0 0 12px;font-size:22px;">Password reset</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      We received a request to reset the password for <strong>${escapeHtml(ctx.email)}</strong>.
      This link expires shortly and can be used once.
    </p>
    <p style="margin:20px 0;">${buttonHtml(resetUrl, 'Reset password')}</p>
    <p style="margin:0;font-size:12px;color:#64748b;">If you did not request this, you can ignore this email. Your password will remain unchanged.</p>
  `;
  const { html } = renderEmailLayout({ title: subject, bodyHtml });
  return {
    subject,
    html,
    text: `Password reset for ${ctx.email}. Open: ${resetUrl}. If you did not request this, ignore this email.`,
  };
}

export function renderPasswordChanged(ctx: AccountNotificationContext): RenderedEmail {
  const subject = `Your ${SITE_NAME} password was changed`;
  const when = ctx.changedAt || new Date().toISOString();
  const bodyHtml = `
    <h1 style="margin:0 0 12px;font-size:22px;">Password changed</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#475569;">
      The password for <strong>${escapeHtml(ctx.email)}</strong> was changed at ${escapeHtml(new Date(when).toUTCString())}.
      For security, other sessions have been signed out.
    </p>
    <p style="margin:0;font-size:12px;color:#64748b;">If you did not make this change, contact support immediately and reset your password.</p>
  `;
  const { html } = renderEmailLayout({ title: subject, bodyHtml });
  return {
    subject,
    html,
    text: `Password for ${ctx.email} changed at ${new Date(when).toUTCString()}. If this was not you, contact support.`,
  };
}
