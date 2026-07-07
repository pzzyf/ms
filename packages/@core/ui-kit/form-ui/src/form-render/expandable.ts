import type { Ref } from 'vue'

import type { FormRenderProps as FormRenderProperties } from '../types'

import {
  breakpointsTailwind,
  useBreakpoints,
  useElementVisibility,
} from '@vueuse/core'

import { computed, nextTick, onMounted, ref, watch } from 'vue'

function getRowStart(rowHeights: string[], itemTop: number) {
  let cumulativeHeight = 0

  for (const [index, rowHeight] of rowHeights.entries()) {
    cumulativeHeight += Number(rowHeight.replace('px', ''))
    if (itemTop < cumulativeHeight) {
      return index + 1
    }
  }

  return 0
}

/**
 * 动态计算行数
 */
export function useExpandable(
  properties: FormRenderProperties,
  wrapperReference: Readonly<Ref<HTMLElement | null>>,
) {
  const isVisible = useElementVisibility(wrapperReference)
  const rowMapping = ref<Record<number, number>>({})
  // 是否已经计算过一次
  const isCalculated = ref(false)

  const breakpoints = useBreakpoints(breakpointsTailwind)

  const keepFormItemIndex = computed(() => {
    const rows = properties.collapsedRows ?? 1
    const mapping = rowMapping.value
    let maxItem = 0
    for (let index = 1; index <= rows; index++) {
      maxItem += mapping?.[index] ?? 0
    }
    // 保持一行
    return maxItem - 1 || 1
  })

  watch(
    [
      () => properties.showCollapseButton,
      () => breakpoints.active().value,
      () => properties.schema?.length,
      () => isVisible.value,
    ],
    async ([value]) => {
      if (!value) {
        return
      }

      await nextTick()
      rowMapping.value = {}
      isCalculated.value = false
      await calculateRowMapping()
    },
  )

  async function calculateRowMapping() {
    if (!properties.showCollapseButton) {
      return
    }

    await nextTick()
    if (!wrapperReference.value) {
      return
    }

    const formItems = [...wrapperReference.value.children]

    const container = wrapperReference.value
    const containerStyles = window.getComputedStyle(container)
    const rowHeights = containerStyles
      .getPropertyValue('grid-template-rows')
      .split(' ')

    const containerRect = container?.getBoundingClientRect()

    for (const element of formItems) {
      const itemRect = element.getBoundingClientRect()

      // 计算元素在第几行
      const itemTop = itemRect.top - containerRect.top
      const rowStart = getRowStart(rowHeights, itemTop)
      if (rowStart > (properties?.collapsedRows ?? 1)) {
        continue
      }
      rowMapping.value[rowStart] = (rowMapping.value[rowStart] ?? 0) + 1
      isCalculated.value = true
    }
  }

  onMounted(() => {
    calculateRowMapping()
  })

  return { isCalculated, keepFormItemIndex, wrapperRef: wrapperReference }
}
