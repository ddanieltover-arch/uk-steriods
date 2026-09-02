import { getSiteOrigin, SITE_LOGO_PATH, SITE_NAME, SITE_TAGLINE } from '../../seo/site';
import {
  escapeHtml,
  formatPence,
  OrderNotificationContext,
} from '../notification.types';
import { EMAIL, EmailStatusTone, STATUS_STYLES } from './design-tokens';

export function emailHeading(title: string, subtitle?: string): string {
  return `
    <h1 style="margin:0 0 ${subtitle ? '8px' : '16px'};font-size:24px;line-height:1.25;font-weight:800;color:${EMAIL.colors.navy};letter-spacing:-0.02em;">
      ${escapeHtml(title)}
    </h1>
    ${
      subtitle
        ? `<p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:${EMAIL.colors.slate};">${escapeHtml(subtitle)}</p>`
        : ''
    }`;
}

export function emailParagraph(html: string): string {
  return `<p style="margin:0 0 16px;font-size:14px;line-height:1.65;color:${EMAIL.colors.slate};">${html}</p>`;
}

export function emailButton(href: string, label: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr>
        <td style="border-radius:${EMAIL.radius.md};background:${EMAIL.colors.teal};">
          <a href="${escapeHtml(href)}" target="_blank" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:${EMAIL.colors.white};text-decoration:none;border-radius:${EMAIL.radius.md};">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>`;
}

export function emailStatusBanner(tone: EmailStatusTone, title: string, detail?: string): string {
  const s = STATUS_STYLES[tone];
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-collapse:separate;border-radius:${EMAIL.radius.md};background:${s.bg};border:1px solid ${s.border};">
      <tr>
        <td style="padding:16px 18px;">
          <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${s.text};margin-bottom:6px;">
            ${escapeHtml(s.label)}
          </div>
          <div style="font-size:16px;font-weight:800;color:${EMAIL.colors.navy};line-height:1.3;">
            ${escapeHtml(title)}
          </div>
          ${
            detail
              ? `<div style="margin-top:6px;font-size:13px;line-height:1.5;color:${EMAIL.colors.slate};">${escapeHtml(detail)}</div>`
              : ''
          }
        </td>
      </tr>
    </table>`;
}

export function emailKeyValueGrid(
  rows: Array<{ label: string; value: string; highlight?: boolean }>
): string {
  const cells = rows
    .map(
      (row) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${EMAIL.colors.border};font-size:12px;color:${EMAIL.colors.slateLight};width:38%;vertical-align:top;">
          ${escapeHtml(row.label)}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid ${EMAIL.colors.border};font-size:13px;color:${row.highlight ? EMAIL.colors.tealDark : EMAIL.colors.navy};font-weight:${row.highlight ? '800' : '600'};text-align:right;vertical-align:top;">
          ${row.highlight ? escapeHtml(row.value) : escapeHtml(row.value)}
        </td>
      </tr>`
    )
    .join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
      ${cells}
    </table>`;
}

export function emailSectionTitle(title: string): string {
  return `
    <div style="margin:24px 0 12px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:${EMAIL.colors.slateLight};">
      ${escapeHtml(title)}
    </div>`;
}

export function emailOrderItemsTable(ctx: OrderNotificationContext): string {
  const rows = ctx.items
    .map((item) => {
      const name = escapeHtml(item.productName);
      const variant = item.variantName ? ` · ${escapeHtml(item.variantName)}` : '';
      return `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid ${EMAIL.colors.border};vertical-align:top;">
            <div style="font-size:14px;font-weight:700;color:${EMAIL.colors.navy};line-height:1.35;">
              ${name}${variant}
            </div>
            <div style="margin-top:4px;font-size:11px;color:${EMAIL.colors.slateLight};">
              SKU ${escapeHtml(item.productSku)} · Qty ${item.quantity}
            </div>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid ${EMAIL.colors.border};font-size:14px;font-weight:700;color:${EMAIL.colors.navy};text-align:right;white-space:nowrap;vertical-align:top;">
            ${escapeHtml(formatPence(item.subtotalPence))}
          </td>
        </tr>`;
    })
    .join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
      <tr>
        <td colspan="2" style="padding-bottom:8px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${EMAIL.colors.slateLight};">
          Order items
        </td>
      </tr>
      ${rows}
    </table>`;
}

export function emailTotalsTable(ctx: OrderNotificationContext): string {
  const lines: Array<{ label: string; value: string; bold?: boolean; accent?: boolean }> = [
    { label: 'Subtotal', value: formatPence(ctx.subtotalPence) },
  ];
  if (ctx.discountPence > 0) {
    lines.push({ label: 'Discount', value: `−${formatPence(ctx.discountPence)}`, accent: true });
  }
  lines.push({ label: 'Shipping', value: formatPence(ctx.shippingPence) });
  if (ctx.taxPence > 0) {
    lines.push({ label: 'Tax', value: formatPence(ctx.taxPence) });
  }
  lines.push({ label: 'Order total', value: formatPence(ctx.totalPence), bold: true });

  const rows = lines
    .map(
      (line) => `
      <tr>
        <td style="padding:${line.bold ? '12px' : '6px'} 0;font-size:${line.bold ? '15px' : '13px'};color:${line.bold ? EMAIL.colors.navy : EMAIL.colors.slate};font-weight:${line.bold ? '800' : '400'};">
          ${escapeHtml(line.label)}
        </td>
        <td style="padding:${line.bold ? '12px' : '6px'} 0;font-size:${line.bold ? '15px' : '13px'};color:${line.accent ? EMAIL.colors.tealDark : line.bold ? EMAIL.colors.navy : EMAIL.colors.slate};font-weight:${line.bold ? '800' : '600'};text-align:right;">
          ${escapeHtml(line.value)}
        </td>
      </tr>`
    )
    .join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0 0;padding-top:12px;border-top:2px solid ${EMAIL.colors.navy};">
      ${rows}
    </table>`;
}

export function emailPaymentInstructions(ctx: OrderNotificationContext): string {
  const p = ctx.paymentInstructions;
  if (!p) return '';

  const isCrypto = String(ctx.paymentMethod).toUpperCase() === 'CRYPTO';
  const title = isCrypto ? 'Crypto payment instructions' : 'Bank transfer instructions';

  const detailRows: Array<{ label: string; value: string; mono?: boolean }> = [];
  if (p.bankName) detailRows.push({ label: 'Provider', value: p.bankName });
  if (p.accountName) detailRows.push({ label: isCrypto ? 'Wallet / pay to' : 'Account name', value: p.accountName });
  if (p.sortCode) detailRows.push({ label: 'Sort code', value: p.sortCode, mono: true });
  if (p.accountNumber) detailRows.push({ label: 'Account number', value: p.accountNumber, mono: true });
  if (p.referenceCode) detailRows.push({ label: 'Payment reference', value: p.referenceCode, mono: true });
  if (p.formattedTotal) detailRows.push({ label: 'Amount due', value: p.formattedTotal });

  const rows = detailRows
    .map(
      (row) => `
      <tr>
        <td style="padding:8px 0;font-size:12px;color:${EMAIL.colors.tealDark};width:42%;">${escapeHtml(row.label)}</td>
        <td style="padding:8px 0;font-size:13px;font-weight:700;color:${EMAIL.colors.navy};text-align:right;font-family:${row.mono ? EMAIL.fonts.mono : EMAIL.fonts.stack};">
          ${escapeHtml(row.value)}
        </td>
      </tr>`
    )
    .join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border-collapse:separate;border-radius:${EMAIL.radius.md};background:${EMAIL.colors.tealLight};border:1px solid ${EMAIL.colors.tealBorder};">
      <tr>
        <td style="padding:18px 20px;">
          <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:${EMAIL.colors.tealDark};margin-bottom:12px;">
            ${escapeHtml(title)}
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
          ${
            p.note
              ? `<p style="margin:14px 0 0;font-size:12px;line-height:1.55;color:${EMAIL.colors.tealDark};">${escapeHtml(p.note)}</p>`
              : ''
          }
        </td>
      </tr>
    </table>`;
}

export function emailAddressBlock(ctx: OrderNotificationContext): string {
  const a = ctx.shippingAddress || {};
  const lines = [
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

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border-collapse:separate;border-radius:${EMAIL.radius.md};background:${EMAIL.colors.bg};border:1px solid ${EMAIL.colors.border};">
      <tr>
        <td style="padding:16px 18px;">
          <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:${EMAIL.colors.slateLight};margin-bottom:8px;">
            Delivery address
          </div>
          <div style="font-size:13px;line-height:1.6;color:${EMAIL.colors.navy};">${lines}</div>
        </td>
      </tr>
    </table>`;
}

export function emailTrustStrip(): string {
  const items = ['UK dispatch', 'Discreet packaging', 'Lab-tested batches'];
  const cells = items
    .map(
      (item) => `
      <td align="center" style="padding:8px 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${EMAIL.colors.slateLight};">
        ${escapeHtml(item)}
      </td>`
    )
    .join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;border-top:1px solid ${EMAIL.colors.border};">
      <tr>${cells}</tr>
    </table>`;
}

export function emailSupportLine(supportEmail: string): string {
  return emailParagraph(
    `Questions about your order? Reply to this email or contact <a href="mailto:${escapeHtml(supportEmail)}" style="color:${EMAIL.colors.teal};font-weight:700;text-decoration:none;">${escapeHtml(supportEmail)}</a>.`
  );
}

export function emailFooterLinks(): string {
  const origin = getSiteOrigin();
  const links = [
    { href: `${origin}/delivery-and-returns`, label: 'Delivery & returns' },
    { href: `${origin}/payment-methods`, label: 'Payment methods' },
    { href: `${origin}/track-order`, label: 'Track order' },
  ];

  const linkHtml = links
    .map(
      (link) =>
        `<a href="${escapeHtml(link.href)}" style="color:${EMAIL.colors.teal};text-decoration:none;font-weight:600;">${escapeHtml(link.label)}</a>`
    )
    .join('<span style="color:#cbd5e1;margin:0 8px;">|</span>');

  return `<div style="margin-top:12px;font-size:12px;line-height:1.8;">${linkHtml}</div>`;
}

export function emailLogoBlock(): string {
  const logoUrl = `${getSiteOrigin()}${SITE_LOGO_PATH}`;
  return `
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="vertical-align:middle;padding-right:12px;">
          <img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(SITE_NAME)}" width="44" height="44" style="display:block;border:0;border-radius:10px;" />
        </td>
        <td style="vertical-align:middle;">
          <div style="font-size:18px;font-weight:800;letter-spacing:0.02em;color:${EMAIL.colors.white};line-height:1.2;">
            ${escapeHtml(SITE_NAME)}
          </div>
          <div style="font-size:10px;color:#5eead4;text-transform:uppercase;letter-spacing:0.14em;margin-top:3px;">
            ${escapeHtml(SITE_TAGLINE.split('·')[0]?.trim() || 'UK catalogue')}
          </div>
        </td>
      </tr>
    </table>`;
}
