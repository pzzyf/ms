import { createMiddleware } from 'hono/factory';
import { eq } from 'drizzle-orm';

import type { AppBindings, SafeUser } from '#/lib/types';

import { db } from '#/db/client';
import { users } from '#/db/schema';
import { verifyAccessToken } from '#/lib/jwt';
import { unauthorized } from '#/lib/response';

/**
 * 校验 Bearer access token，通过后将用户信息挂到 c.var.user
 */
export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return unauthorized(c);
  }

  const token = authHeader.slice('Bearer '.length);
  const payload = await verifyAccessToken(token);
  if (!payload) {
    return unauthorized(c);
  }

  const found = db
    .select()
    .from(users)
    .where(eq(users.username, payload.username))
    .get();
  if (!found) {
    return unauthorized(c);
  }

  const { password: _password, homePath, ...rest } = found;
  const userinfo: SafeUser = {
    ...rest,
    ...(homePath && { homePath }),
  };
  c.set('user', userinfo);
  await next();
});
