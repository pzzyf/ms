import type { FormRenderProps as FormRenderProperties } from '../types';

import { createContext } from '@ms-core/shadcn-ui';

import { computed } from 'vue';

export const [injectRenderFormProperties, provideFormRenderProperties] =
  createContext<FormRenderProperties>('FormRenderProps');

export function useFormContext() {
  const formRenderProperties = injectRenderFormProperties();

  const isVertical = computed(() => formRenderProperties.layout === 'vertical');

  const componentMap = computed(() => formRenderProperties.componentMap);

  const componentBindEventMap = computed(
    () => formRenderProperties.componentBindEventMap,
  );
  return {
    componentBindEventMap,
    componentMap,
    isVertical,
  };
}
