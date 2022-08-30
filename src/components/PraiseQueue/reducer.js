export const ADD_PRAISE_TO_QUEUE = 'ADD_PRAISE_TO_QUEUE'
export const REMOVE_PRAISE_FROM_QUEUE = 'REMOVE_PRAISE_FROM_QUEUE'

export const praiseQueueInitialState = {
  praiseQueue: []
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

export function praiseQueueReducer(state, action) {
  switch (action.type) {
    case ADD_PRAISE_TO_QUEUE:
      return {
        ...state,
        praiseQueue: [...state.praiseQueue, action.payload]
      }
    case REMOVE_PRAISE_FROM_QUEUE:
      return {
        ...state,
        praiseQueue: state.praiseQueue
          .filter(i => !i.praise.title.includes(action.payload.praiseTitle))
      }
    default: return state
  }
}