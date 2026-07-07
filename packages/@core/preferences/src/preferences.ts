import { merge } from '@ms-core/shared/utils'

import { markRaw, reactive, readonly } from 'vue'

import { defaultPreferences } from './config'

class PreferenceManager {
  private isInitialized = false
  private state

  initPreferences = async (namespace: string) => {
    if (this.isInitialized) {
      return
    }
    await this.saveToCache(namespace)
    this.isInitialized = true
  }

  /**
   * 获取当前偏好设置（只读）
   */
  getPreferences = () => {
    return readonly(this.state)
  }

  updatePreferences = (update: any) => {
    const mergedState = merge({}, update, markRaw(this.state))
    Object.assign(this.state, mergedState)
  }

  constructor() {
    this.state = reactive({ ...defaultPreferences })
  }

  private async saveToCache(namespace: string) {
    try {
      localStorage.setItem(
        `${namespace}-preferences`,
        JSON.stringify(this.state),
      )
    } catch (error) {
      console.error('Failed to save preferences to cache:', error)
    }
  }
}

const preferencesManager = new PreferenceManager()

export { PreferenceManager, preferencesManager }
