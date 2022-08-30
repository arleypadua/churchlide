export const ADD_PRAISE_TO_QUEUE = 'ADD_PRAISE_TO_QUEUE'
export const REMOVE_PRAISE_FROM_QUEUE = 'REMOVE_PRAISE_FROM_QUEUE'
export const SELECT_PRAISE = 'SELECT_PRAISE'

export const praiseQueueInitialState = {
  praiseQueue: [],
  current: undefined
}

export const addPraiseToQueue = (collection, praise) => ({
  type: ADD_PRAISE_TO_QUEUE,
  payload: {
    collection,
    praise
  }
})

export const removePraiseFromQueue = (collectionName, praiseTitle) => ({
  type: REMOVE_PRAISE_FROM_QUEUE,
  payload: {
    collectionName,
    praiseTitle
  }
})

export const selectPraise = (collectionName, praiseTitle) => ({
  type: SELECT_PRAISE,
  payload: {
    collectionName,
    praiseTitle
  }
})

export function praiseQueueReducer(state, action) {
  switch (action.type) {
    case ADD_PRAISE_TO_QUEUE:
      return {
        ...state,
        praiseQueue: [...state.praiseQueue, action.payload]
      }
    case REMOVE_PRAISE_FROM_QUEUE:
      const toRemove = state.praiseQueue.find(p => p.praise.title.includes(action.payload.praiseTitle))
      return {
        ...state,
        praiseQueue: state.praiseQueue
          .filter(i => i !== toRemove),
        current: state.current === toRemove
          ? undefined
          : state.current
      }
    case SELECT_PRAISE:
      const toSelect = state.praiseQueue.find(p => p.praise.title.includes(action.payload.praiseTitle))
      return {
        ...state,
        current: toSelect
      }
    default: return state
  }
}