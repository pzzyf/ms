import { Hono } from 'hono';

import { success } from '#/lib/response';
import { db } from '#/db/client';
import { timezones } from '#/db/schema';

const miscRoutes = new Hono();

/**
 * GET /api/timezones
 * 时区列表（演示从数据库读取列表数据）
 */
miscRoutes.get('/timezones', (c) => {
  const list = db.select().from(timezones).all();
  return c.json(success(list));
});

export default miscRoutes;
