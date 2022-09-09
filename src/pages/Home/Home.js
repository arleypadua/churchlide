import React from "react"
import CurrentPraise from "../../components/CurrentPraise/CurrentPraise"
import PraiseQueue from "../../components/PraiseQueue/PraiseQueue"
import PraiseSearch from "../../components/PraiseSearch/PraiseSearch"
import SlideControls from "../../components/SlideControls/SlideControls"
import "./Home.css"

export default function Home() {
  return (
    <main className="home">
      <div className="home__praise-search"><PraiseSearch /></div>
      <div className="home__praise-list"><PraiseQueue /></div>
      <div className="home__current-praise">
        <SlideControls />
        <CurrentPraise />
      </div>
    </main>
  )
}
