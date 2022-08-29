import React from "react"
import PraiseSearch from "../components/PraiseSearch/PraiseSearch"
import SlideControls from "../components/SlideControls/SlideControls"
import "./Home.css"

export default function Home() {

  return (
    <>
      <h1>Home</h1>
      <SlideControls />
      <main className="home__content">
        <div className="praise-search"><PraiseSearch /></div>
        <div className="praise-list">Lista de Louvores</div>
        <div className="current-praise">Louvor Atual</div>
      </main>
    </>
  )
}
