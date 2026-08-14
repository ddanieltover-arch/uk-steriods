import { SITE_NAME } from '../../seo/site';
import { escapeHtml } from '../notification.types';

export function renderEmailLayout(options: {
  title: string;
  preheader?: string;
  bodyHtml: string;
}): { html: string; textFallbackHint: string } {
  const title = escapeHtml(options.title);
  const preheader = escapeHtml(options.preheader || '');
  const year = new Date().getFullYear();

  const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;color:#0f172a;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:#0f172a;padding:20px 24px;">
              <div style="font-size:18px;font-weight:800;letter-spacing:0.04em;color:#ffffff;">${escapeHtml(SITE_NAME)}</div>
              <div style="font-size:11px;color:#5eead4;text-transform:uppercase;letter-spacing:0.12em;margin-top:4px;">Sports Nutrition</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;">
              ${options.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background:#f1f5f9;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">
              This is a transactional message from ${escapeHtml(SITE_NAME)}. It is not a marketing newsletter.
              <br />© ${year} ${escapeHtml(SITE_NAME)}. All rights reserved.
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

export function buttonHtml(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;background:#0d9488;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:12px 18px;border-radius:10px;">${escapeHtml(label)}</a>`;
}
