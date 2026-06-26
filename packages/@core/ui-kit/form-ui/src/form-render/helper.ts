import type {
  ZodDefault,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodTypeAny,
} from 'zod'

import { isObject, isString } from '@ms-core/shared/utils'
import { toRaw } from 'vue'

interface ZodDefCompat {
  defaultValue?: unknown
  in?: ZodTypeAny
  innerType?: ZodTypeAny
  schema?: ZodTypeAny
  type?: string
  typeName?: string
}

function getZodDef(schema: ZodTypeAny): ZodDefCompat {
  const rawSchema = toRaw(schema) as any
  return (rawSchema._def ?? rawSchema.def ?? {}) as ZodDefCompat
}

function resolveZodDefaultValue(value: unknown) {
  return typeof value === 'function' ? (value as () => unknown)() : value
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseRules<
  ChildType extends ZodObject | ZodTypeAny = ZodTypeAny,
>(schema: ChildType | ZodTypeAny): ChildType | null {
  if (!schema || isString(schema))
    return null

  const def = getZodDef(schema)
  if (def.innerType)
    return getBaseRules(def.innerType as ChildType)

  if (def.schema)
    return getBaseRules(def.schema as ChildType)

  if (def.in)
    return getBaseRules(def.in as ChildType)

  return schema as ChildType
}

/**
 * Search for a "ZodDefault" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: ZodTypeAny): any {
  if (!schema || isString(schema)) {
    return
  }
  const typedSchema = schema as unknown as ZodDefault<ZodNumber | ZodString>
  const def = getZodDef(typedSchema)

  if (def.typeName === 'ZodDefault' || def.type === 'default') {
    return resolveZodDefaultValue(def.defaultValue)
  }

  if (def.innerType) {
    return getDefaultValueInZodStack(def.innerType)
  }
  if (def.schema) {
    return getDefaultValueInZodStack(def.schema)
  }
  if (def.in) {
    return getDefaultValueInZodStack(def.in)
  }

  return undefined
}

export function isEventObjectLike(obj: any) {
  if (!obj || !isObject(obj)) {
    return false
  }
  return Reflect.has(obj, 'target') && Reflect.has(obj, 'stopPropagation')
}
