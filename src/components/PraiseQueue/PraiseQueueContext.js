import React from "react"

const PraiseQueueContext = React.createContext()

export function usePraiseQueueContext() {
  return React.useContext(PraiseQueueContext)
}

export default PraiseQueueContext