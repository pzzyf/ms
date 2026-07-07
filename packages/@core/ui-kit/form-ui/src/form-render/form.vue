<script setup lang="ts">
import type { GenericObject } from 'vee-validate'

import type {
  FormCommonConfig,
  FormRenderProps as FormRenderProperties,
  FormSchema,
} from '../types'

import { Form } from '@ms-core/shadcn-ui'

import { cn, isFunction, mergeWithArrayOverride } from '@ms-core/shared/utils'
import { computed, useTemplateRef } from 'vue'

import { provideComponentReferenceMap } from '../use-form-context'
import { provideFormRenderProperties } from './context'
import { useExpandable } from './expandable'
import FormField from './form-field.vue'

interface Properties extends FormRenderProperties {}

const properties = withDefaults(
  defineProps<Properties & { globalCommonConfig?: FormCommonConfig }>(),
  {
    collapsedRows: 1,
    commonConfig: () => ({}),
    globalCommonConfig: () => ({}),
    showCollapseButton: false,
    wrapperClass: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  },
)

const emits = defineEmits<{
  submit: [event: any]
}>()

const wrapperClass = computed(() => {
  const cls = ['flex']
  if (properties.layout === 'inline') {
    cls.push('flex-wrap gap-x-2')
  } else {
    cls.push(properties.compact ? 'gap-x-2' : 'gap-x-4', 'flex-col grid')
  }
  return cn(...cls, properties.wrapperClass)
})

provideFormRenderProperties(properties)
provideComponentReferenceMap(new Map<string, unknown>())

const wrapperRef = useTemplateRef<HTMLElement>('wrapperRef')
const { isCalculated, keepFormItemIndex } = useExpandable(
  properties,
  wrapperRef,
)

const formComponent = computed(() => (properties.form ? 'form' : Form))

const formComponentProps = computed(() => {
  return properties.form
    ? {
        onSubmit: properties.form.handleSubmit((value) =>
          emits('submit', value),
        ),
      }
    : {
        onSubmit: (value: GenericObject) => emits('submit', value),
      }
})

const formCollapsed = computed(() => {
  return properties.collapsed && isCalculated.value
})

const computedSchema = computed(
  (): (Omit<FormSchema, 'formFieldProps'> & {
    commonComponentProps: Record<string, any>
    formFieldProps: Record<string, any>
  })[] => {
    const {
      colon = false,
      componentProps: componentProperties = {},
      controlClass = '',
      disabled,
      disabledOnChangeListener = true,
      disabledOnInputListener = true,
      emptyStateValue = undefined,
      formFieldProps: formFieldProperties = {},
      formItemClass = '',
      hideLabel = false,
      hideRequiredMark = false,
      labelClass = '',
      labelWidth = 100,
      modelPropName: modelPropertyName = '',
      wrapperClass = '',
    } = mergeWithArrayOverride(
      properties.commonConfig,
      properties.globalCommonConfig,
    )
    return (properties.schema || []).map((schema, index) => {
      const keepIndex = keepFormItemIndex.value

      const isHidden =
        // 折叠状态 & 显示折叠按钮 & 当前索引大于保留索引
        properties.showCollapseButton && !!formCollapsed.value && keepIndex
          ? keepIndex <= index
          : false

      // 处理函数形式的formItemClass
      let resolvedSchemaFormItemClass = schema.formItemClass
      if (isFunction(schema.formItemClass)) {
        try {
          resolvedSchemaFormItemClass = schema.formItemClass()
        } catch (error) {
          console.error('Error calling formItemClass function:', error)
          resolvedSchemaFormItemClass = ''
        }
      }

      return {
        colon,
        disabled,
        disabledOnChangeListener,
        disabledOnInputListener,
        emptyStateValue,
        hideLabel,
        hideRequiredMark,
        labelWidth,
        modelPropName: modelPropertyName,
        wrapperClass,
        ...schema,
        commonComponentProps: componentProperties,
        componentProps: schema.componentProps,
        controlClass: cn(controlClass, schema.controlClass),
        formFieldProps: {
          ...formFieldProperties,
          ...schema.formFieldProps,
        },
        formItemClass: cn(
          'flex-shrink-0',
          { hidden: isHidden },
          formItemClass,
          resolvedSchemaFormItemClass,
        ),
        labelClass: cn(labelClass, schema.labelClass),
      }
    })
  },
)
</script>

<template>
  <component :is="formComponent" v-bind="formComponentProps">
    <div ref="wrapperRef" :class="wrapperClass">
      <template v-for="cSchema in computedSchema" :key="cSchema.fieldName">
        <FormField
          v-bind="cSchema"
          :class="cSchema.formItemClass"
          :rules="cSchema.rules"
        >
          <template #default="slotProps">
            <slot v-bind="slotProps" :name="cSchema.fieldName"></slot>
          </template>
        </FormField>
      </template>
    </div>
  </component>
</template>
