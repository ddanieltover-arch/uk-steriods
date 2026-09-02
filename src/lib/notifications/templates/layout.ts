import { getSiteOrigin, SITE_NAME } from '../../seo/site';
import { escapeHtml } from '../notification.types';
import { EMAIL } from './design-tokens';
import { emailFooterLinks, emailLogoBlock } from './components';

export function renderEmailLayout(options: {
  title: string;
  preheader?: string;
  bodyHtml: string;
}): { html: string; textFallbackHint: string } {
  const title = escapeHtml(options.title);
  const preheader = escapeHtml(options.preheader || options.title);
  const year = new Date().getFullYear();
  const origin = getSiteOrigin();

  const html = `<!DOCTYPE html>
<html lang="en-GB" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @media only screen and (max-width: 620px) {
      .email-shell { width: 100% !important; }
      .email-body { padding: 24px 18px !important; }
      .email-header { padding: 18px 18px !important; }
      .email-footer { padding: 18px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${EMAIL.colors.bg};color:${EMAIL.colors.navy};font-family:${EMAIL.fonts.stack};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${EMAIL.colors.bg};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="email-shell" width="${EMAIL.width}" cellpadding="0" cellspacing="0" style="max-width:${EMAIL.width}px;width:100%;background:${EMAIL.colors.white};border:1px solid ${EMAIL.colors.border};border-radius:${EMAIL.radius.lg};overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.06);">
          <!-- Header -->
          <tr>
            <td class="email-header" style="background:linear-gradient(135deg, ${EMAIL.colors.navy} 0%, ${EMAIL.colors.navyMid} 100%);padding:22px 28px;">
              <a href="${escapeHtml(origin)}" style="text-decoration:none;">
                ${emailLogoBlock()}
              </a>
            </td>
          </tr>
          <tr>
            <td style="height:4px;background:linear-gradient(90deg, ${EMAIL.colors.teal} 0%, ${EMAIL.colors.lime} 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <!-- Body -->
          <tr>
            <td class="email-body" style="padding:32px 28px;">
              ${options.bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="email-footer" style="padding:22px 28px;background:${EMAIL.colors.bg};border-top:1px solid ${EMAIL.colors.border};">
              <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:${EMAIL.colors.slateLight};">
                This is a transactional message from ${escapeHtml(SITE_NAME)}. It is not a marketing newsletter.
              </p>
              ${emailFooterLinks()}
              <p style="margin:16px 0 0;font-size:11px;color:#94a3b8;line-height:1.5;">
                © ${year} ${escapeHtml(SITE_NAME)} · <a href="${escapeHtml(origin)}" style="color:${EMAIL.colors.slateLight};text-decoration:none;">${escapeHtml(origin.replace(/^https?:\/\//, ''))}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, textFallbackHint: options.title };
}

/** @deprecated Use emailButton from ./components — kept for backward compatibility. */
export function buttonHtml(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;background:${EMAIL.colors.teal};color:${EMAIL.colors.white};text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:${EMAIL.radius.md};">${escapeHtml(label)}</a>`;
}
