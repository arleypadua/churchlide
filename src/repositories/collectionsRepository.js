import { appInitialState } from "../AppReducer"

const COLLECTIONS_KEY = 'churchlide.collections'

const collectionsRepository = {
  persistCollections: (collections) => {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections ?? appInitialState.loadedCollections))
  },

  getCollections: () => {
    const stored = localStorage.getItem(COLLECTIONS_KEY)
    if (!stored) return appInitialState.loadedCollections

    return JSON.parse(stored)
  }
}

export default collectionsRepository