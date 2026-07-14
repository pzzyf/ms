import { eq } from 'drizzle-orm';

import type { DB } from './client';

import { authCodes, timezones, users } from './schema';

const seedUsers = [
  {
    id: 0,
    username: 'ms',
    password: '123456',
    realName: 'Ms',
    roles: ['super'],
  },
  {
    id: 1,
    username: 'admin',
    password: '123456',
    realName: 'Admin',
    roles: ['admin'],
    homePath: '/workspace',
  },
  {
    id: 2,
    username: 'jack',
    password: '123456',
    realName: 'Jack',
    roles: ['user'],
    homePath: '/analytics',
  },
];

const seedCodes = [
  {
    username: 'ms',
    codes: ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010'],
  },
  { username: 'admin', codes: ['AC_100010', 'AC_100020', 'AC_100030'] },
  { username: 'jack', codes: ['AC_1000001', 'AC_1000002'] },
];

const seedTimezones = [
  { offset: -5, timezone: 'America/New_York' },
  { offset: 0, timezone: 'Europe/London' },
  { offset: 8, timezone: 'Asia/Shanghai' },
  { offset: 9, timezone: 'Asia/Tokyo' },
  { offset: 9, timezone: 'Asia/Seoul' },
];

/**
 * 首次启动时自动写入种子数据，表为空才写入，可安全重复执行。
 */
export function seedDatabase(db: DB) {
  if (db.select().from(users).all().length === 0) {
    db.insert(users).values(seedUsers).run();
  }

  for (const row of seedCodes) {
    const exists = db
      .select()
      .from(authCodes)
      .where(eq(authCodes.username, row.username))
      .get();
    if (!exists) {
      db.insert(authCodes).values(row).run();
    }
  }

  if (db.select().from(timezones).all().length === 0) {
    db.insert(timezones).values(seedTimezones).run();
  }
}
