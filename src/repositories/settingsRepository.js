import { settingsInitialState } from "../AppReducer"

const SETTINGS_KEY = 'churchlide.settings'

const settingsRepository = {
  persistSettings: (settings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings ?? settingsInitialState))
  },

  getSettings: () => {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (!stored) return settingsInitialState

    return JSON.parse(stored)
  }
}

export default settingsRepository