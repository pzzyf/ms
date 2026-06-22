<script setup lang="ts">
import type { FormSchema, MaybeComponentProps } from '../type'
import { FormField, FormItem, FormLabel, FormMessage, MsRenderContent, MsTooltip } from '@ms-core/shadcn-ui'
import { cn, isFunction, isString } from '@ms-core/shared/utils'
import { useFieldError } from 'vee-validate'
import { computed } from 'vue'

interface Props extends FormSchema {}

const {
  colon,
  hide,
  label,
  fieldName,
  labelClass,
  labelWidth,
  disabled,
  component,
  renderComponentContent,
} = defineProps<
  Props & {
    commonComponentProps?: MaybeComponentProps
  }
>()

const labelStyle = computed(() => {
  return labelClass?.includes('w-')
    ? {}
    : {
        width: `${labelWidth}px`,
      }
})

const visible = computed(() => {
  return !hide
})

const shouldRequired = computed(() => {
  if (!visible.value) {
    return false
  }
  return ''
})

const errors = useFieldError(fieldName)
const isInValid = computed(() => errors.value?.length > 0)

const shouldDisabled = computed(() => {
  return disabled
})

const FieldComponent = computed(() => {
  const finalComponent = isString(component)

  return finalComponent
})

const customContentRender = computed(() => {
  if (!isFunction(renderComponentContent)) {
    return {}
  }
  return {}
})

const renderContentKey = computed(() => {
  return Object.keys(customContentRender.value)
})
</script>

<template>
  <FormField v-if="!hide" v-slot="slotProps" :name="fieldName">
    <FormItem
      :class="{
        'form-valid-error': isInValid,
        'form-is-required': shouldRequired,
      }"
      class="relative flex"
      v-bind="$attrs"
    >
      <FormLabel
        v-if="!hideLabel"
        :class="
          cn(
            'flex leading-6',
            labelClass,
          )
        "
        :help="help"
        :colon="colon"
        :label="label"
        :required="shouldRequired && !hideRequiredMark"
        :style="labelStyle"
      >
        <template v-if="label">
          <MsRenderContent :content="label" />
        </template>
      </FormLabel>

      <div class="flex-auto overflow-hidden p-[1px]">
        <div :class="cn('relative flex w-full items-center', wrapperClass)">
          <FormControl :class="cn(controlClass)">
            <slot
              v-bind="{
                ...slotProps,
                disabled: shouldDisabled,
                isInValid,
              }"
            >
              <component
                :is="FieldComponent"
                :class="{
                  'border-destructive hover:border-destructive/80 focus:border-destructive focus:shadow-[0_0_0_2px_rgba(255,38,5,0.06)]':
                    isInValid,
                }"
                :disabled="shouldDisabled"
              >
                <template
                  v-for="name in renderContentKey"
                  :key="name"
                  #[name]="renderSlotProps"
                >
                  <MsRenderContent
                    :content="123"
                    v-bind="{ ...renderSlotProps, formContext: slotProps }"
                  />
                </template>
                <!-- <slot></slot> -->
              </component>
              <MsTooltip
                v-if="isInValid"
                :delay-duration="300"
                side="left"
              >
                <template #trigger>
                  <slot name="trigger">
                    <CircleAlert
                      :class="
                        cn(
                          'inline-flex size-5 cursor-pointer text-foreground/80 hover:text-foreground',
                        )
                      "
                    />
                  </slot>
                </template>
                <FormMessage />
              </MsTooltip>
            </slot>
          </FormControl>
          <!-- 自定义后缀 -->
          <div v-if="suffix" class="ml-1">
            <MsRenderContent :content="suffix" />
          </div>
          <FormDescription v-if="description" class="ml-1">
            <MsRenderContent :content="description" />
          </FormDescription>
        </div>

        <Transition name="slide-up">
          <FormMessage class="absolute" />
        </Transition>
      </div>
    </FormItem>
  </FormField>
</template>

<style scoped>

</style>
