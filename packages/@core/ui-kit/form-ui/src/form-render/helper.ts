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
  let currentSchema = schema

  while (currentSchema && !isString(currentSchema)) {
    const def = getZodDef(currentSchema)
    const nextSchema = def.innerType ?? def.schema ?? def.in

    if (!nextSchema) {
      return currentSchema as ChildType
    }

    currentSchema = nextSchema as ChildType
  }

  return null
}

/**
 * Search for a "ZodDefault" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: ZodTypeAny): any {
  let currentSchema = schema

  while (currentSchema && !isString(currentSchema)) {
    const typedSchema = currentSchema as unknown as ZodDefault<
      ZodNumber | ZodString
    >
    const def = getZodDef(typedSchema)

    if (def.typeName === 'ZodDefault' || def.type === 'default') {
      return resolveZodDefaultValue(def.defaultValue)
    }

    const nextSchema = def.innerType ?? def.schema ?? def.in
    if (!nextSchema) {
      return undefined
    }
    currentSchema = nextSchema
  }
}

export function isEventObjectLike(object: any) {
  if (!object || !isObject(object)) {
    return false
  }
  return Reflect.has(object, 'target') && Reflect.has(object, 'stopPropagation')
}
