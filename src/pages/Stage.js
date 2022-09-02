import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BibleSlideShow from '../components/BibleSlideShow/BibleSlideShow'
import PraiseSlideShow from '../components/PraiseSlideShow/PraiseSlideShow'
import EmptyStateSlide from '../components/EmptyStateSlide/EmptyStateSlide'
import collections from '../data/collections'
import { cleanupListener, NAVIGATE_ACTION, onMessage } from '../pubsub/eventPublisher'

function PraiseStage() {
  const { collectionName, praiseName } = useParams()
  const [praise, setPraise] = useState(undefined)

  useEffect(() => {
    const praise = collections
      .find(c => c.name.includes(collectionName))?.songs
      .find(s => s.title.includes(praiseName))

    console.log(praise)

    setPraise(praise)
  }, [collectionName, praiseName])

  return (
    <>
      {
        praise
          ? <PraiseSlideShow praise={praise} />
          : <EmptyStateSlide />
      }
    </>
  )
}

export default function Stage() {
  const location = useLocation()

  const navigate = useNavigate()

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

  if (location.pathname.startsWith('/stage/empty')) return <EmptyStateSlide />
  if (location.pathname.startsWith('/stage/praise/')) return <PraiseStage />
  if (location.pathname.startsWith('/stage/bible/')) return <BibleSlideShow />

  return <>No route implemented for {location.pathname}</>
}
