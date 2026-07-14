import type { Context } from 'hono';

/** 成功响应，与 be-mock 的 useResponseSuccess 对齐 */
export function success<T = any>(data: T) {
  return { code: 0, data, error: null, message: 'ok' } as const;
}

/** 失败响应，与 be-mock 的 useResponseError 对齐 */
export function fail(message: string, error: any = null) {
  return { code: -1, data: null, error, message } as const;
}

export function forbidden(c: Context, message = 'Forbidden Exception') {
  return c.json(fail(message, message), 403);
}

export function unauthorized(c: Context) {
  return c.json(fail('Unauthorized Exception', 'Unauthorized Exception'), 401);
}

export function badRequest(c: Context, message: string, error: any = null) {
  return c.json(fail(message, error), 400);
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** 简单分页工具，对标 be-mock 的 pagination */
export function pagination<T = any>(
  pageNo: number,
  pageSize: number,
  array: T[],
): T[] {
  const offset = (pageNo - 1) * pageSize;
  return offset + pageSize >= array.length
    ? array.slice(offset)
    : array.slice(offset, offset + pageSize);
}

export function pageSuccess<T = any>(
  page: number | string,
  pageSize: number | string,
  list: T[],
) {
  const items = pagination(Number(page), Number(pageSize), list);
  return success({ items, total: list.length });
}
