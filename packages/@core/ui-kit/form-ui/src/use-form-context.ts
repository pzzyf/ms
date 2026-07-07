import type { ComputedRef } from 'vue'

import type { ZodType } from 'zod'

import type {
  ExtendedFormApi,
  FormActions,
  MsFormProps as MsFormProperties,
} from './types'

import { createContext } from '@ms-core/shadcn-ui'

import { isString, mergeWithArrayOverride, set } from '@ms-core/shared/utils'
import { useForm } from 'vee-validate'

import { computed, toRaw, unref, useSlots } from 'vue'
import { object, ZodIntersection, ZodNumber, ZodObject, ZodString } from 'zod'
import { getDefaultsForSchema } from 'zod-defaults'

type ExtendFormProperties = MsFormProperties & { formApi?: ExtendedFormApi }

export const [injectFormProperties, provideFormProperties] =
  createContext<
    [ComputedRef<ExtendFormProperties> | ExtendFormProperties, FormActions]
  >('MsFormProps')

export const [injectComponentReferenceMap, provideComponentReferenceMap] =
  createContext<Map<string, unknown>>('ComponentRefMap')

export function useFormInitial(
  properties: ComputedRef<MsFormProperties> | MsFormProperties,
) {
  const slots = useSlots()
  const initialValues = generateInitialValues()

  const form = useForm({
    ...(Object.keys(initialValues)?.length && { initialValues }),
  })

  const delegatedSlots = computed(() => {
    const resultSlots: string[] = []

    for (const key of Object.keys(slots)) {
      if (key !== 'default') {
        resultSlots.push(key)
      }
    }
    return resultSlots
  })

  function generateInitialValues() {
    const initialValues: Record<string, any> = {}

    const zodObject: Record<string, ZodType> = {}
    const schema = unref(properties).schema || []

    for (const item of schema) {
      if (Reflect.has(item, 'defaultValue')) {
        set(initialValues, item.fieldName, item.defaultValue)
      } else if (item.rules && !isString(item.rules)) {
        const rule = toRaw(item.rules)
        // 检查规则是否适合提取默认值
        const customDefaultValue = getCustomDefaultValue(rule)
        zodObject[item.fieldName] = rule
        if (customDefaultValue !== undefined) {
          initialValues[item.fieldName] = customDefaultValue
        }
      }
    }

    const schemaInitialValues = getDefaultsForSchema(object(zodObject))

    const zodDefaults: Record<string, any> = {}
    for (const key in schemaInitialValues) {
      set(zodDefaults, key, schemaInitialValues[key])
    }
    return mergeWithArrayOverride(initialValues, zodDefaults)
  }
  // 自定义默认值提取逻辑
  function getCustomDefaultValue(rule: any): any {
    rule = toRaw(rule)

    if (rule instanceof ZodString) {
      return '' // 默认为空字符串
    }
    if (rule instanceof ZodNumber) {
      return null // 默认为 null（避免显示 0）
    }
    if (rule instanceof ZodObject) {
      // 递归提取嵌套对象的默认值
      const defaultValues: Record<string, any> = {}
      for (const [key, valueSchema] of Object.entries(rule.shape)) {
        defaultValues[key] = getCustomDefaultValue(valueSchema)
      }
      return defaultValues
    }
    if (rule instanceof ZodIntersection) {
      // 对于交集类型，从schema 提取默认值
      const leftDefaultValue = getCustomDefaultValue(rule._def.left)
      const rightDefaultValue = getCustomDefaultValue(rule._def.right)

      // 如果左右两边都能提取默认值，合并它们
      if (
        typeof leftDefaultValue === 'object' &&
        typeof rightDefaultValue === 'object'
      ) {
        return { ...leftDefaultValue, ...rightDefaultValue }
      }

      // 否则优先使用左边的默认值
      return leftDefaultValue ?? rightDefaultValue
    }
    return undefined // 其他类型不提供默认值
  }

  return {
    delegatedSlots,
    form,
  }
}
