import type { Context } from 'hono';

import { deleteCookie, getCookie, setCookie } from 'hono/cookie';

const COOKIE_NAME = 'jwt';
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'None' as const,
  secure: true,
  path: '/',
};

export function setRefreshTokenCookie(c: Context, refreshToken: string) {
  setCookie(c, COOKIE_NAME, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 24 * 60 * 60, // 秒
  });
}

export function clearRefreshTokenCookie(c: Context) {
  deleteCookie(c, COOKIE_NAME, COOKIE_OPTIONS);
}

export function getRefreshTokenFromCookie(c: Context): string | undefined {
  return getCookie(c, COOKIE_NAME);
}
