import process from 'node:process';
import { sign, verify } from 'hono/jwt';

import type { SafeUser } from './types';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? 'access_token_secret';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET ?? 'refresh_token_secret';
const ALG = 'HS256' as const;
const ONE_DAY = 60 * 60 * 24; // 秒

export interface JwtPayload {
  id: number;
  username: string;
  iat: number;
  exp: number;
}

type UserRef = Pick<SafeUser, 'id' | 'username'>;

export function generateAccessToken(user: UserRef): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return sign(
    { ...user, iat: now, exp: now + 7 * ONE_DAY },
    ACCESS_TOKEN_SECRET,
    ALG,
  );
}

export function generateRefreshToken(user: UserRef): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return sign(
    { ...user, iat: now, exp: now + 30 * ONE_DAY },
    REFRESH_TOKEN_SECRET,
    ALG,
  );
}

export async function verifyAccessToken(
  token: string,
): Promise<JwtPayload | null> {
  try {
    const payload = (await verify(
      token,
      ACCESS_TOKEN_SECRET,
      ALG,
    )) as unknown as JwtPayload;
    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === 'number' && payload.exp < now) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string,
): Promise<JwtPayload | null> {
  try {
    const payload = (await verify(
      token,
      REFRESH_TOKEN_SECRET,
      ALG,
    )) as unknown as JwtPayload;
    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === 'number' && payload.exp < now) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
