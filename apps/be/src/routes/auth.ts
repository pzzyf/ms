import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

import type { AppBindings, SafeUser } from '#/lib/types';

import { db } from '#/db/client';
import { authCodes, users } from '#/db/schema';
import { clearRefreshTokenCookie, setRefreshTokenCookie } from '#/lib/cookie';
import { generateAccessToken, generateRefreshToken } from '#/lib/jwt';
import { badRequest, forbidden, success } from '#/lib/response';
import { authMiddleware } from '#/middleware/auth';

const authRoutes = new Hono<AppBindings>();

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

/**
 * POST /api/auth/login
 * 登录，签发 access token 并设置 refresh token cookie
 */
authRoutes.post(
  '/login',
  zValidator('json', loginSchema, (result, c) => {
    if (!result.success) {
      return badRequest(
        c,
        'Username and password are required',
        result.error.issues,
      );
    }
  }),
  async (c) => {
    const { username, password } = c.req.valid('json');

    const found = db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .get();

    if (!found || found.password !== password) {
      clearRefreshTokenCookie(c);
      return forbidden(c, 'Username or password is incorrect.');
    }

    const userRef = { id: found.id, username: found.username };
    const accessToken = await generateAccessToken(userRef);
    const refreshToken = await generateRefreshToken(userRef);

    setRefreshTokenCookie(c, refreshToken);

    const { password: _password, homePath, ...rest } = found;
    const userinfo: SafeUser = {
      ...rest,
      ...(homePath && { homePath }),
    };
    return c.json(success({ ...userinfo, accessToken }));
  },
);

/**
 * GET /api/auth/codes
 * 获取当前登录用户的权限码
 */
authRoutes.get('/codes', authMiddleware, (c) => {
  const user = c.get('user');
  const row = db
    .select()
    .from(authCodes)
    .where(eq(authCodes.username, user.username))
    .get();
  return c.json(success(row?.codes ?? []));
});

/**
 * GET /api/auth/logout
 * 清除 refresh token cookie
 */
authRoutes.post('/logout', (c) => {
  clearRefreshTokenCookie(c);
  return c.json(success(null));
});

export default authRoutes;
