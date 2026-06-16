import { computed } from 'vue'
import { preferencesManager } from './preferences'

function usePreferences() {
  const preferences = preferencesManager.getPreferences()

  const appPreferences = computed(() => preferences.app)

  const authPanelRight = computed(() => appPreferences.value.authPageLayout === 'panel-right')
  const authPanelLeft = computed(() => appPreferences.value.authPageLayout === 'panel-left')
  const authPanelCenter = computed(() => appPreferences.value.authPageLayout === 'panel-center')

  return {
    authPanelRight,
    authPanelLeft,
    authPanelCenter,
  }
}

export { usePreferences }
