import { serve } from '@hono/node-server';
import process from 'node:process';

import app from '#/app';
import { db } from '#/db/client';
import { seedDatabase } from '#/db/seed';

// 首次启动自动建表 + 写入种子数据
seedDatabase(db);

const port = Number(process.env.PORT ?? 5432);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(
    `Hono backend running at http://localhost:${info.port} (SQLite: ${process.env.DB_PATH ?? '.data/be.db'})`,
  );
});
