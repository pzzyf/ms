import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import type { AppBindings } from '#/lib/types';

import authRoutes from '#/routes/auth';
import miscRoutes from '#/routes/misc';
import userRoutes from '#/routes/user';

const app = new Hono<AppBindings>();

app.use(logger());

app.use(
  '/api/*',
  cors({
    origin: (origin) => origin ?? '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowHeaders: [
      'Accept',
      'Authorization',
      'Content-Length',
      'Content-Type',
      'If-Match',
      'If-Modified-Since',
      'If-None-Match',
      'If-Unmodified-Since',
      'X-CSRF-TOKEN',
      'X-Requested-With',
    ],
    exposeHeaders: ['*'],
    credentials: true,
  }),
);

app.route('/api/auth', authRoutes);
app.route('/api/user', userRoutes);
app.route('/api', miscRoutes);

app.get('/', (c) =>
  c.html(`
<h1>Hello MS (Hono Backend)</h1>
<h2>Hono + Drizzle + SQLite service is running</h2>
<ul>
  <li><a href="/api/user/info">GET /api/user/info</a> (需登录)</li>
  <li><a href="/api/auth/codes">GET /api/auth/codes</a> (需登录)</li>
  <li>POST /api/auth/login</li>
  <li><a href="/api/timezones">GET /api/timezones</a></li>
</ul>
`),
);

export default app;
