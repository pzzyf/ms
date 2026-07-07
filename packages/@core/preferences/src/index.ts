import { preferencesManager } from './preferences'

export const { getPreferences, initPreferences, updatePreferences } =
  preferencesManager

export * from './use-preferences'

export const preferences = getPreferences()
