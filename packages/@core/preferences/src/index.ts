import { preferencesManager } from './preferences'

export const {
  getPreferences,
  initPreferences,
} = preferencesManager

export const preferences = getPreferences()
