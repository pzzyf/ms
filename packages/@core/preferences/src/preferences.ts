import { reactive, readonly } from "vue";

import { defaultPreferences } from './config';


class PreferenceManager {
  private isInitialized = false;
  private state;

  constructor() {
    this.state = reactive({ ...defaultPreferences });
  }

  initPreferences = async (namespace: string) => {
    if (this.isInitialized) {
      return;
    }
    await this.saveToCache(namespace);
    this.isInitialized = true;
  }

  /**
   * 获取当前偏好设置（只读）
   */
  getPreferences = () => {
    return readonly(this.state);
  };

  private async saveToCache(namespace: string) {
    try {
      localStorage.setItem(`${namespace}-preferences`, JSON.stringify(this.state));
    } catch (error) {
      console.error('Failed to save preferences to cache:', error);
    }
  }

}

const preferencesManager = new PreferenceManager();

export { PreferenceManager, preferencesManager };
