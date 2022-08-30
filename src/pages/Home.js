import React, { useReducer } from "react"
import PraiseQueue from "../components/PraiseQueue/PraiseQueue"
import PraiseQueueContext from "../components/PraiseQueue/PraiseQueueContext"
import { praiseQueueInitialState, praiseQueueReducer } from "../components/PraiseQueue/reducer"
import PraiseSearch from "../components/PraiseSearch/PraiseSearch"
import SlideControls from "../components/SlideControls/SlideControls"
import "./Home.css"

export default function Home() {
  const [praiseQueue, dispatchPraiseQueue] = useReducer(praiseQueueReducer, praiseQueueInitialState)
  const praiseQueueProviderState = {
    praiseQueue,
    dispatchPraiseQueue
  }

  return (
    <PraiseQueueContext.Provider value={praiseQueueProviderState}>
      <main className="home__content">
        <div className="praise-search"><PraiseSearch /></div>
        <div className="praise-list"><PraiseQueue /></div>
        <div className="current-praise"><SlideControls /></div>
      </main>
    </PraiseQueueContext.Provider>
  )
}
