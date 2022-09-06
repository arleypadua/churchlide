import { publishMessage, SETTINGS_CHANGED } from './pubsub/eventPublisher'
import settingsRepository from './repositories/settingsRepository'

export const LOAD_INITIAL_SETTINGS = 'LOAD_INITIAL_SETTINGS'
export const SET_PRESENTATION_WINDOW = 'SET_PRESENTATION_WINDOW'
export const SET_PRESENTATION_BACKGROUND_COLOR = 'SET_PRESENTATION_BACKGROUND_COLOR'

export const settingsInitialState = {
  presentationBackground: {
    color1: "#030040",
    color2: "#0c0ca3",
    color3: "#082233"
  }
}

export const appInitialState = {
  presentationWindow: undefined,
  settings: settingsInitialState
}

export const loadInitialSettings = () => ({
  type: LOAD_INITIAL_SETTINGS
})

export const setPresentationWindow = (window) => ({
  type: SET_PRESENTATION_WINDOW,
  payload: window
})

export const setPresentationBackgroundColor = (colorName, colorValue) => ({
  type: SET_PRESENTATION_BACKGROUND_COLOR,
  payload: {
    colorName,
    colorValue
  }
})

export function appReducer(state, action) {
  switch (action.type) {
    case LOAD_INITIAL_SETTINGS: {
      return {
        ...state,
        settings: settingsRepository.getSettings()
      }
    }
      
    case SET_PRESENTATION_WINDOW: {
      return {
        ...state,
        presentationWindow: action.payload
      }
    }

    case SET_PRESENTATION_BACKGROUND_COLOR: {
      const stateSettings = state.settings ?? settingsInitialState
      const newSettings = {
        ...stateSettings,
        presentationBackground: {
          ...stateSettings.presentationBackground,
          [action.payload.colorName]: action.payload.colorValue
        }
      }
      settingsRepository.persistSettings(newSettings)
      publishMessage(SETTINGS_CHANGED)
      return {
        ...state,
        settings: newSettings
      }
    }

    default: return state
  }
}