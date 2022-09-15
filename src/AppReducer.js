import collections from './data/collections'
import executeAsync from './helpers/executeAsync'
import collectionsRepository from './repositories/collectionsRepository'
import settingsRepository from './repositories/settingsRepository'

export const LOAD_SETTINGS = 'LOAD_SETTINGS'
export const LOAD_COLLECTIONS = 'LOAD_COLLECTIONS'
export const SET_PRESENTATION_WINDOW = 'SET_PRESENTATION_WINDOW'
export const SET_PRESENTATION_BACKGROUND_COLOR = 'SET_PRESENTATION_BACKGROUND_COLOR'
export const ADD_PRAISE_TO_COLLECTION = 'ADD_PRAISE_TO_COLLECTION'
export const UPDATE_PRAISE = 'UPDATE_PRAISE'
export const REMOVE_PRAISE = 'REMOVE_PRAISE'

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

export const updatePraise = (collectionName, title, newTitle, newContent) => ({
  type: UPDATE_PRAISE,
  payload: {
    collectionName,
    title,
    newTitle,
    newContent,
  }
})

export const removePraise = (collectionName, title) => ({
  type: REMOVE_PRAISE,
  payload: {
    collectionName,
    title,
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
        })

        return {
          ...state,
          loadedCollections: mutatedCollections
        }
      }
    }

    case UPDATE_PRAISE: {
      const updatedSong = { title: action.payload.newTitle, content: action.payload.newContent }
      const existingCollection = state.loadedCollections.find(c => c.name === action.payload.collectionName)
      if (!existingCollection) return state

      const existingSong = existingCollection.songs.find(s => s.title === action.payload.title)
      if (!existingSong) return state

      const existingCollectionIndex = state.loadedCollections.indexOf(existingCollection)
      const existingSongIndex = existingCollection.songs.indexOf(existingSong)

      const mutatedCollection = { ...existingCollection }
      mutatedCollection.songs = [
        ...mutatedCollection.songs.slice(0, existingSongIndex),
        { ...existingSong, ...updatedSong },
        ...mutatedCollection.songs.slice(existingSongIndex + 1)
      ]

      const mutatedCollections = [
        ...state.loadedCollections.slice(0, existingCollectionIndex),
        mutatedCollection,
        ...state.loadedCollections.slice(existingCollectionIndex + 1)
      ]

      executeAsync(() => {
        collectionsRepository.persistCollections(mutatedCollections)
      })

      return {
        ...state,
        loadedCollections: mutatedCollections
      }
    }

    case REMOVE_PRAISE: {
      const existingCollection = state.loadedCollections.find(c => c.name === action.payload.collectionName)
      if (!existingCollection) return state
      const existingCollectionIndex = state.loadedCollections.indexOf(existingCollection)

      const existingSong = existingCollection.songs.find(s => s.title === action.payload.title)
      if (!existingSong) return state

      const mutatedCollection = { ...existingCollection }
      mutatedCollection.songs = mutatedCollection.songs.filter(s => s !== existingSong)

      let mutatedCollections = [
        ...state.loadedCollections.slice(0, existingCollectionIndex),
        mutatedCollection,
        ...state.loadedCollections.slice(existingCollectionIndex + 1)
      ]

      if (mutatedCollection.songs.length === 0) {
        mutatedCollections = mutatedCollections.filter(c => c !== mutatedCollection)
      }

      executeAsync(() => {
        collectionsRepository.persistCollections(mutatedCollections)
      })

      return {
        ...state,
        loadedCollections: mutatedCollections
      }
    }

    default: return state
  }
}