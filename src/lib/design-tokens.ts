/**
 * Centralized Design System Tokens
 * Defines exact color palettes, typography scale, spacing scale, border radii, shadows, and motion transitions.
 */

export const DESIGN_TOKENS = {
  colors: {
    // Canvas & Surface
    bgApp: 'var(--color-bg-app, #f8fafc)',
    bgSurface: 'var(--color-bg-surface, #ffffff)',
    bgSubtle: 'var(--color-bg-subtle, #f1f5f9)',
    bgOverlay: 'var(--color-bg-overlay, rgba(15, 23, 42, 0.6))',

    // Text & Foreground
    fgPrimary: 'var(--color-fg-primary, #0f172a)',
    fgSecondary: 'var(--color-fg-secondary, #475569)',
    fgMuted: 'var(--color-fg-muted, #64748b)',
    fgInverse: 'var(--color-fg-inverse, #ffffff)',

    // Borders
    borderSubtle: 'var(--color-border-subtle, #f1f5f9)',
    borderDefault: 'var(--color-border-default, #e2e8f0)',
    borderStrong: 'var(--color-border-strong, #cbd5e1)',

    // Primary Brand Accent (Refined Emerald/Teal)
    primary: {
      default: '#0d9488', // teal-600
      hover: '#0f766e',   // teal-700
      light: '#f0fdf4',   // teal-50
      foreground: '#ffffff',
    },

    // Secondary Accent (Slate / Charcoal)
    secondary: {
      default: '#0f172a', // slate-900
      hover: '#1e293b',   // slate-800
      light: '#f8fafc',
      foreground: '#ffffff',
    },

    // Status Colors
    success: {
      default: '#16a34a',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      fg: '#14532d',
    },
    warning: {
      default: '#d97706',
      bg: '#fffbeb',
      border: '#fde68a',
      fg: '#78350f',
    },
    destructive: {
      default: '#dc2626',
      bg: '#fef2f2',
      border: '#fecaca',
      fg: '#7f1d1d',
    },
    info: {
      default: '#0284c7',
      bg: '#f0f9ff',
      border: '#bae6fd',
      fg: '#0c4a6e',
    },
  },

  typography: {
    fontFamilyPrimary: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    scale: {
      display: 'text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight',
      h1: 'text-2xl md:text-3xl font-black tracking-tight leading-snug',
      h2: 'text-xl md:text-2xl font-bold tracking-tight leading-snug',
      h3: 'text-lg md:text-xl font-bold tracking-snug leading-snug',
      h4: 'text-base font-bold tracking-tight leading-normal',
      bodyLarge: 'text-base font-medium leading-relaxed',
      body: 'text-sm font-normal leading-relaxed',
      bodySmall: 'text-xs font-normal leading-normal',
      caption: 'text-[11px] font-medium leading-normal text-slate-500',
      label: 'text-[11px] font-bold uppercase tracking-wider text-slate-600',
      price: 'font-black tracking-tight text-slate-900',
      navigation: 'text-xs font-bold uppercase tracking-wider',
    },
  },

  spacing: {
    '3xs': '0.125rem', // 2px
    '2xs': '0.25rem',  // 4px
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  radii: {
    xs: '0.25rem',   // 4px
    sm: '0.375rem',  // 6px
    md: '0.625rem',  // 10px
    lg: '0.875rem',  // 14px
    xl: '1.25rem',   // 20px
    '2xl': '1.75rem', // 28px
    full: '9999px',
  },

  shadows: {
    subtle: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
    card: '0 2px 4px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)',
    elevated: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
    drawer: '-10px 0 25px -5px rgba(15, 23, 42, 0.15)',
  },

  transitions: {
    fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
