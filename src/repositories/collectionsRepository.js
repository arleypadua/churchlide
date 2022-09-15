import { appInitialState } from "../AppReducer"
import { COLLECTIONS_CHANGED, publishMessage } from "../pubsub/eventPublisher"

const COLLECTIONS_KEY = 'churchlide.collections'

const collectionsRepository = {
  persistCollections: (collections, publishEvent = true) => {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections ?? appInitialState.loadedCollections))
    if (publishEvent) publishMessage(COLLECTIONS_CHANGED)
  },

  getCollections: () => {
    const stored = localStorage.getItem(COLLECTIONS_KEY)
    if (!stored) return appInitialState.loadedCollections

    return JSON.parse(stored)
  }
}

export default collectionsRepository