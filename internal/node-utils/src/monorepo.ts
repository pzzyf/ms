import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import * as manypkg from '@manypkg/get-packages';
const { getPackages: getPackagesFunc } =
  manypkg;

/**
 * 查找大仓的根目录
 * @param cwd
 */
function findMonorepoRoot(cwd: string = process.cwd()) {
  let currentDir = resolve(cwd);

  while (true) {
    if (existsSync(join(currentDir, 'pnpm-lock.yaml'))) {
      return currentDir;
    }

    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) {
      return '';
    }

    currentDir = parentDir;
  }
}


/**
 * 获取大仓的所有包
 */
async function getPackages() {
  const root = findMonorepoRoot();

  return await getPackagesFunc(root);
}


export { findMonorepoRoot, getPackages };
