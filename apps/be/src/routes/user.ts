import { Hono } from 'hono';

import type { AppBindings } from '#/lib/types';

import { success } from '#/lib/response';
import { authMiddleware } from '#/middleware/auth';

const userRoutes = new Hono<AppBindings>();

/**
 * GET /api/user/info
 * 获取当前登录用户信息
 */
userRoutes.get('/info', authMiddleware, (c) => {
  const user = c.get('user');
  return c.json(success(user));
});

export default userRoutes;
