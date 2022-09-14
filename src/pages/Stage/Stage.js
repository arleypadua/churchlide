import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BibleSlideShow from '../../components/BibleSlideShow/BibleSlideShow'
import PraiseSlideShow from '../../components/PraiseSlideShow/PraiseSlideShow'
import EmptyStateSlide from '../../components/EmptyStateSlide/EmptyStateSlide'
import { cleanupListener, COLLECTIONS_CHANGED, NAVIGATE_ACTION, onMessage, SETTINGS_CHANGED } from '../../pubsub/eventPublisher'
import togglePresentationTheme from '../../helpers/togglePresentationTheme'
import { useAppContext } from '../../AppContext'
import { loadCollections, loadSettings } from '../../AppReducer'

function PraiseStage() {
  const { collectionName, praiseName, slideIndex } = useParams()
  const { appReducer: [app, dispatchApp] } = useAppContext()
  const [praise, setPraise] = useState(undefined)

  useEffect(() => {
    const praise = app.loadedCollections
      .find(c => c.name === collectionName)?.songs
      .find(s => s.title.includes(praiseName))

    console.log(praise)

    setPraise(praise)
  }, [collectionName, praiseName])

  return (
    <>
      {
        praise
          ? <PraiseSlideShow praise={praise} slideIndex={slideIndex ?? 0} />
          : <EmptyStateSlide />
      }
    </>
  )
}

export default function Stage() {
  const location = useLocation()

  const navigate = useNavigate()
  
  const { appReducer: [app, dispatchApp] } = useAppContext()
  const { settings: { presentationBackground: { color1, color2, color3 } } } = app

  const handleEvent = (event) => {
    const { type, payload } = event.data
    if (type === NAVIGATE_ACTION) {
      navigate(payload)
    }
    if (type === SETTINGS_CHANGED) {
      dispatchApp(loadSettings())
    }
    if (type === COLLECTIONS_CHANGED) {
      dispatchApp(loadCollections())
    }
  }

  useEffect(() => {
    onMessage(handleEvent)

    return () => cleanupListener(handleEvent)
  }, [])

  useEffect(() => {
    togglePresentationTheme(color1, color2, color3)
  }, [color1, color2, color3])

  if (location.pathname.startsWith('/stage/empty')) return <EmptyStateSlide />
  if (location.pathname.startsWith('/stage/praise/')) return <PraiseStage />
  if (location.pathname.startsWith('/stage/bible/')) return <BibleSlideShow />

  return <>No route implemented for {location.pathname}</>
}
