import { settingsInitialState } from "../AppReducer"

const SETTINGS_LEY = 'churchlide.settings'

export default {
  persistSettings: (settings) => {
    localStorage.setItem(SETTINGS_LEY, JSON.stringify(settings ?? settingsInitialState))
  },

  getSettings: (settings) => {
    const stored = localStorage.getItem(SETTINGS_LEY)
    if (!stored) return settingsInitialState

    return JSON.parse(stored)
  }
}