export const SET_PRESENTATION_WINDOW = 'SET_PRESENTATION_WINDOW'

export const appInitialState = {
  presentationWindow: undefined
}

export const setPresentationWindow = (window) => ({
  type: SET_PRESENTATION_WINDOW,
  payload: window
})

export function appReducer(state, action) {
  switch (action.type) {
    case SET_PRESENTATION_WINDOW:
      return {
        ...state,
        presentationWindow: action.payload
      }
    default: return state
  }
}