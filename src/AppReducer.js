import collections from './data/collections'
import executeAsync from './helpers/executeAsync'
import { COLLECTIONS_CHANGED, publishMessage, SETTINGS_CHANGED } from './pubsub/eventPublisher'
import collectionsRepository from './repositories/collectionsRepository'
import settingsRepository from './repositories/settingsRepository'

export const LOAD_SETTINGS = 'LOAD_SETTINGS'
export const LOAD_COLLECTIONS = 'LOAD_COLLECTIONS'
export const SET_PRESENTATION_WINDOW = 'SET_PRESENTATION_WINDOW'
export const SET_PRESENTATION_BACKGROUND_COLOR = 'SET_PRESENTATION_BACKGROUND_COLOR'
export const ADD_PRAISE_TO_COLLECTION = 'ADD_PRAISE_TO_COLLECTION'

export const settingsInitialState = {
  presentationBackground: {
    color1: "#030040",
    color2: "#0c0ca3",
    color3: "#082233"
  }
}

export const appInitialState = {
  presentationWindow: undefined,
  settings: settingsInitialState,
  loadedCollections: collections
}

export const loadSettings = () => ({
  type: LOAD_SETTINGS
})

export const loadCollections = () => ({
  type: LOAD_COLLECTIONS
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

export const addPraiseToCollection = (collectionName, title, content) => ({
  type: ADD_PRAISE_TO_COLLECTION,
  payload: {
    collectionName,
    title,
    content
  }
})

export function appReducer(state, action) {
  switch (action.type) {
    case LOAD_SETTINGS: {
      return {
        ...state,
        settings: settingsRepository.getSettings()
      }
    }

    case LOAD_COLLECTIONS: {
      return {
        ...state,
        loadedCollections: collectionsRepository.getCollections()
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

    case ADD_PRAISE_TO_COLLECTION: {
      const newSong = { title: action.payload.title, content: action.payload.content }
      const existingCollection = state.loadedCollections.find(c => c.name === action.payload.collectionName)
      if (existingCollection) {
        const existingCollectionIndex = state.loadedCollections.indexOf(existingCollection)
        const mutatedCollection = { ...existingCollection }
        mutatedCollection.songs = [...mutatedCollection.songs, newSong]
        const mutatedCollections = [
          ...state.loadedCollections.slice(0, existingCollectionIndex),
          mutatedCollection,
          ...state.loadedCollections.slice(existingCollectionIndex + 1)
        ]

        executeAsync(() => {
          collectionsRepository.persistCollections(mutatedCollections)
          publishMessage(COLLECTIONS_CHANGED)
        })

        return {
          ...state,
          loadedCollections: mutatedCollections
        }
      } else {
        const mutatedCollections = [
          ...state.loadedCollections,
          { name: action.payload.collectionName, songs: [newSong] }
        ]

        executeAsync(() => {
          collectionsRepository.persistCollections(mutatedCollections)
          publishMessage(COLLECTIONS_CHANGED)
        })

        return {
          ...state,
          loadedCollections: mutatedCollections
        }
      }
    }

    default: return state
  }
}