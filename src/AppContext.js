import React from "react"

const AppContext = React.createContext()

export function useAppContext() {
  return React.useContext(AppContext)
}

export default AppContext