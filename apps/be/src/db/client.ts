import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import * as schema from './schema';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DB_PATH = process.env.DB_PATH ?? resolve(__dirname, '../../.data/be.db');

// 确保数据目录存在（零配置，首次运行自动创建）
const dir = dirname(DB_PATH);
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

const sqlite = new Database(DB_PATH);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

// 自动建表，免迁移即可启动（如需正式迁移可使用 `pnpm db:push`）
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    real_name TEXT NOT NULL,
    roles TEXT NOT NULL,
    home_path TEXT
  );

  CREATE TABLE IF NOT EXISTS auth_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    codes TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS timezones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    offset INTEGER NOT NULL,
    timezone TEXT NOT NULL
  );
`);

export const db = drizzle(sqlite, { schema });
export type DB = typeof db;
