/**
 * Browser API client: cookie session + double-submit CSRF.
 * Does not store session tokens in localStorage.
 */

const CSRF_COOKIE = 'csrf_token';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

let csrfWarmup: Promise<void> | null = null;

async function ensureCsrf(): Promise<string | null> {
  let token = readCookie(CSRF_COOKIE);
  if (token) return token;
  if (!csrfWarmup) {
    csrfWarmup = fetch('/api/v1/auth/csrf', { credentials: 'include' })
      .then(() => undefined)
      .catch(() => undefined)
      .finally(() => {
        csrfWarmup = null;
      });
  }
  await csrfWarmup;
  return readCookie(CSRF_COOKIE);
}

export type ApiFetchOptions = RequestInit & {
  /** Skip CSRF header (safe for GET; usually unnecessary) */
  skipCsrf?: boolean;
};

export async function apiFetch(input: string, init: ApiFetchOptions = {}): Promise<Response> {
  const method = (init.method || 'GET').toUpperCase();
  const headers = new Headers(init.headers || {});

  if (!headers.has('Content-Type') && init.body && typeof init.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  const needsCsrf =
    !init.skipCsrf &&
    method !== 'GET' &&
    method !== 'HEAD' &&
    method !== 'OPTIONS';

  if (needsCsrf) {
    const csrf = await ensureCsrf();
    if (csrf) headers.set('X-CSRF-Token', csrf);
  }

  // Clear legacy token storage if present (migration)
  try {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('auth_token')) {
      localStorage.removeItem('auth_token');
    }
  } catch {
    /* ignore */
  }

  return fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  });
}

export async function apiJson<T = unknown>(input: string, init: ApiFetchOptions = {}): Promise<T> {
  const res = await apiFetch(input, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      (data as { error?: { message?: string } | string })?.error &&
      typeof (data as { error: unknown }).error === 'object'
        ? ((data as { error: { message?: string } }).error.message || 'Request failed')
        : typeof (data as { error?: string }).error === 'string'
          ? (data as { error: string }).error
          : 'Request failed';
    throw new Error(message);
  }
  return data as T;
}
