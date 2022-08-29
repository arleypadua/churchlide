import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SlideShow from '../components/SlideShow'
import SlideShowEmptyState from '../components/SlideShowEmptyState'
import collections from '../data/collections'
import { cleanupListener, NAVIGATE_ACTION, onMessage } from '../pubsub/eventPublisher'

export default function PraiseSlideShow() {
  const navigate = useNavigate()
  const { collectionName, praiseName } = useParams()
  const [praise, setPraise] = useState(undefined)

  const handleEvent = (event) => {
    const { type, payload } = event.data
    if (type === NAVIGATE_ACTION) {
      navigate(payload)
    }
  }

  useEffect(() => {
    const praise = collections
      .find(c => c.name === collectionName)?.songs
      .find(s => s.title === praiseName)

    setPraise(praise)

    onMessage(handleEvent)

    return () => cleanupListener(handleEvent)
  }, [collectionName, praiseName])

  return (
    <>
      {
        praise 
          ? <SlideShow praise={praise} />
          : <SlideShowEmptyState />
      }
    </>
  )
}
