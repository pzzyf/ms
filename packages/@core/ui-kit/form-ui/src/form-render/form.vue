<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import type { FormCommonConfig, FormRenderProps, FormSchema } from '../types'
import { Form } from '@ms-core/shadcn-ui'
import { cn, isFunction, mergeWithArrayOverride } from '@ms-core/shared/utils'
import { computed } from 'vue'

import { provideFormRenderProps } from './context'
import FormField from './form-field.vue'

interface Props extends FormRenderProps {}

const props = withDefaults(
  defineProps<Props & { globalCommonConfig?: FormCommonConfig }>(),
  {
    collapsedRows: 1,
    commonConfig: () => ({}),
    globalCommonConfig: () => ({}),
    showCollapseButton: false,
    wrapperClass: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  },
)

const emits = defineEmits<{ submit: [event: any] }>()

provideFormRenderProps(props)

const wrapperClass = computed(() => {
  const cls = ['flex']
  if (props.layout === 'inline') {
    cls.push('flex-wrap gap-x-2')
  }
  else {
    cls.push(props.compact ? 'gap-x-2' : 'gap-x-4', 'flex-col grid')
  }
  return cn(...cls, props.wrapperClass)
})

const formComponents = computed(() => (props.form ? 'form' : Form))

const formComponentProps = computed(() => {
  return props.form
    ? {
      }
    : {
        onSubmit: (val: GenericObject) => emits('submit', val),
      }
})

const computedSchema = computed(
  (): (Omit<FormSchema, 'formFieldProps'> & {
    commonComponentProps: Record<string, any>
    formFieldProps: Record<string, any>
  })[] => {
    const {
      colon = false,
      componentProps = {},
      controlClass = '',
      disabled,
      disabledOnChangeListener = true,
      disabledOnInputListener = true,
      emptyStateValue = undefined,
      formFieldProps = {},
      formItemClass = '',
      hideLabel = false,
      hideRequiredMark = false,
      labelClass = '',
      labelWidth = 100,
      modelPropName = '',
      wrapperClass = '',
    } = mergeWithArrayOverride(props.commonConfig, props.globalCommonConfig)
    return (props.schema || []).map((schema) => {
      const hidden = false

      // 处理函数形式的formItemClass
      let resolvedSchemaFormItemClass = schema.formItemClass
      if (isFunction(schema.formItemClass)) {
        try {
          resolvedSchemaFormItemClass = schema.formItemClass()
        }
        catch (error) {
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
        modelPropName,
        wrapperClass,
        ...schema,
        commonComponentProps: componentProps,
        componentProps: schema.componentProps,
        controlClass: cn(controlClass, schema.controlClass),
        formFieldProps: {
          ...formFieldProps,
          ...schema.formFieldProps,
        },
        formItemClass: cn(
          'flex-shrink-0',
          { hidden },
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
  <component :is="formComponents" v-bind="formComponentProps">
    <div :class="wrapperClass">
      <template v-for="cSchema in computedSchema" :key="cSchema.fieldName">
        <FormField
          v-bind="cSchema"
          :class="cSchema.formItemClass"
          :rules="cSchema.rules"
        >
          <template #default="slotProps">
            <slot v-bind="slotProps" :name="cSchema.fieldName" />
          </template>
        </FormField>
      </template>
    </div>
  </component>
</template>

<style scoped></style>
