import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * 用户表：对标 be-mock 的 MOCK_USERS
 */
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  realName: text('real_name').notNull(),
  roles: text('roles', { mode: 'json' }).$type<string[]>().notNull(),
  homePath: text('home_path'),
});

/**
 * 权限码表：对标 be-mock 的 MOCK_CODES
 */
export const authCodes = sqliteTable('auth_codes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  codes: text('codes', { mode: 'json' }).$type<string[]>().notNull(),
});

/**
 * 时区表：对标 be-mock 的 TIME_ZONE_OPTIONS
 */
export const timezones = sqliteTable('timezones', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  offset: integer('offset').notNull(),
  timezone: text('timezone').notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
