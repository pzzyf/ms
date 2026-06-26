import type { Component } from 'vue'

import type {
  BaseFormComponentType,
  FormCommonConfig,
  MsFormAdapterOptions,
} from './types'

import {
  MsButton,
  MsCheckbox,
  Input as MsInput,
  MsInputPassword,
  MsSelect,
} from '@ms-core/shadcn-ui'

import { globalShareState } from '@ms-core/shared/global-state'
import { defineRule } from 'vee-validate'
import { h } from 'vue'

const DEFAULT_MODEL_PROP_NAME = 'modelValue'

export const DEFAULT_FORM_COMMON_CONFIG: FormCommonConfig = {}

export const COMPONENT_MAP: Record<string, Component> = {
  DefaultButton: h(MsButton, { size: 'sm', variant: 'outline' }),
  PrimaryButton: h(MsButton, { size: 'sm', variant: 'default' }),
  MsInput,
  MsSelect,
  MsCheckbox,
  MsInputPassword,
}

export const COMPONENT_BIND_EVENT_MAP: Partial<
  Record<BaseFormComponentType, string>
> = {
  MsCheckbox: 'checked',
}

export function setupMsForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: MsFormAdapterOptions<T>) {
  const { config, defineRules } = options

  const {
    disabledOnChangeListener = true,
    disabledOnInputListener = true,
    emptyStateValue = undefined,
  } = (config || {}) as FormCommonConfig

  Object.assign(DEFAULT_FORM_COMMON_CONFIG, {
    disabledOnChangeListener,
    disabledOnInputListener,
    emptyStateValue,
  })

  if (defineRules) {
    for (const key of Object.keys(defineRules)) {
      defineRule(key, defineRules[key as never])
    }
  }

  const baseModelPropName
    = config?.baseModelPropName ?? DEFAULT_MODEL_PROP_NAME
  const modelPropNameMap = config?.modelPropNameMap as
    | Record<BaseFormComponentType, string>
    | undefined

  const components = globalShareState.getComponents()

  for (const component of Object.keys(components)) {
    const key = component as BaseFormComponentType
    COMPONENT_MAP[key] = components[component as never]

    if (baseModelPropName !== DEFAULT_MODEL_PROP_NAME) {
      COMPONENT_BIND_EVENT_MAP[key] = baseModelPropName
    }

    // 覆盖特殊组件的modelPropName
    if (modelPropNameMap && modelPropNameMap[key]) {
      COMPONENT_BIND_EVENT_MAP[key] = modelPropNameMap[key]
    }
  }
}
