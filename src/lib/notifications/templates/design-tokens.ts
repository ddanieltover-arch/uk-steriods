/** Brand tokens for transactional email HTML (inline-safe, email-client friendly). */
export const EMAIL = {
  colors: {
    navy: '#0f172a',
    navyMid: '#1e293b',
    slate: '#475569',
    slateLight: '#64748b',
    border: '#e2e8f0',
    bg: '#f1f5f9',
    white: '#ffffff',
    teal: '#0d9488',
    tealDark: '#0f766e',
    tealLight: '#ccfbf1',
    tealBorder: '#99f6e4',
    lime: '#84cc16',
    success: '#059669',
    successBg: '#ecfdf5',
    warning: '#d97706',
    warningBg: '#fffbeb',
    danger: '#dc2626',
    dangerBg: '#fef2f2',
    info: '#0284c7',
    infoBg: '#f0f9ff',
  },
  fonts: {
    stack: "Arial, Helvetica, 'Segoe UI', sans-serif",
    mono: "Consolas, 'Courier New', monospace",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    pill: '999px',
  },
  width: 600,
} as const;

export type EmailStatusTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral';

export const STATUS_STYLES: Record<
  EmailStatusTone,
  { bg: string; border: string; text: string; label: string }
> = {
  success: {
    bg: EMAIL.colors.successBg,
    border: '#a7f3d0',
    text: EMAIL.colors.success,
    label: 'Confirmed',
  },
  info: {
    bg: EMAIL.colors.infoBg,
    border: '#bae6fd',
    text: EMAIL.colors.info,
    label: 'Update',
  },
  warning: {
    bg: EMAIL.colors.warningBg,
    border: '#fde68a',
    text: EMAIL.colors.warning,
    label: 'Action needed',
  },
  danger: {
    bg: EMAIL.colors.dangerBg,
    border: '#fecaca',
    text: EMAIL.colors.danger,
    label: 'Cancelled',
  },
  neutral: {
    bg: EMAIL.colors.bg,
    border: EMAIL.colors.border,
    text: EMAIL.colors.slate,
    label: 'Notification',
  },
};
