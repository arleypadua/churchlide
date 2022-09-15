import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BibleSlideShow from '../../components/BibleSlideShow/BibleSlideShow'
import PraiseSlideShow from '../../components/PraiseSlideShow/PraiseSlideShow'
import EmptyStateSlide from '../../components/EmptyStateSlide/EmptyStateSlide'
import { cleanupListener, NAVIGATE_ACTION, onMessage } from '../../pubsub/eventPublisher'
import togglePresentationTheme from '../../helpers/togglePresentationTheme'
import { useAppContext } from '../../AppContext'

function PraiseStage() {
  const { collectionName, praiseName, slideIndex } = useParams()
  const { appReducer: [app] } = useAppContext()
  const [praise, setPraise] = useState(undefined)

  useEffect(() => {
    const praise = app.loadedCollections
      .find(c => c.name === collectionName)?.songs
      .find(s => s.title.includes(praiseName))

    setPraise(praise)
  }, [app.loadedCollections, collectionName, praiseName])

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
  
  const { appReducer: [app] } = useAppContext()
  const { settings: { presentationBackground: { color1, color2, color3 } } } = app

  const handleEvent = (event) => {
    const { type, payload } = event.data
    if (type === NAVIGATE_ACTION) {
      navigate(payload)
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
