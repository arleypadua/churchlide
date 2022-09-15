import { settingsInitialState } from "../AppReducer"
import { publishMessage, SETTINGS_CHANGED } from "../pubsub/eventPublisher"

const SETTINGS_KEY = 'churchlide.settings'

const settingsRepository = {
  persistSettings: (settings, publishEvent = true) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings ?? settingsInitialState))
    if (publishEvent) publishMessage(SETTINGS_CHANGED)
  },

  getSettings: () => {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (!stored) return settingsInitialState

    return JSON.parse(stored)
  }
}

export default settingsRepository