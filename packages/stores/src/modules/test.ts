import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDemoStore = defineStore('demo', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment(step = 1) {
    count.value += step
  }

  function decrement(step = 1) {
    count.value -= step
  }

  function reset() {
    count.value = 0
  }

  function setCount(value: number) {
    count.value = value
  }

  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset,
    setCount,
  }
})
