import { createDefu } from 'defu'

export { createDefu as createMerge, defu as merge } from 'defu'

export const mergeWithArrayOverride = createDefu(
  (originObject, key, updates) => {
    if (!(Array.isArray(originObject[key]) && Array.isArray(updates))) {
      return
    }

    originObject[key] = updates
    return true
  },
)
