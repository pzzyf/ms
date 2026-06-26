import { isFunction, isObject, isString } from '@vue/shared'

/**
 * 检查传入的值是否为boolean
 * @param value
 * @returns 如果值是布尔值，返回true，否则返回false。
 */
function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

function getFirstNonNullOrUndefined<T>(
  ...values: (null | T | undefined)[]
): T | undefined {
  for (const value of values) {
    if (value !== undefined && value !== null) {
      return value
    }
  }
  return undefined
}

export {
  getFirstNonNullOrUndefined,
  isBoolean,
  isFunction,
  isObject,
  isString,
}
