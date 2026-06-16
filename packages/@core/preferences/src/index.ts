import { preferencesManager } from './preferences'

export const {
  getPreferences,
  initPreferences,
} = preferencesManager

export * from './use-preferences'

export const preferences = getPreferences()
