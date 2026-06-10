import { reactive, readonly } from "vue";

import { defaultPreferences } from './config';


class PreferenceManager {
  private isInitialized = false;
  private state;

  constructor() {
    this.state = reactive({ ...defaultPreferences });
  }

  initPreferences = async () =>  {
    if (this.isInitialized) {
      return;
    }
    this.isInitialized = true;
  }

  /**
   * 获取当前偏好设置（只读）
   */
  getPreferences = () => {
    return readonly(this.state);
  };

}

const preferencesManager = new PreferenceManager();

export { PreferenceManager, preferencesManager };
