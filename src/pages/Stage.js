import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PraiseSlideShow from '../components/PraiseSlideShow/PraiseSlideShow'
import SlideShowEmptyState from '../components/PraiseSlideShow/SlideShowEmptyState'
import collections from '../data/collections'
import { cleanupListener, NAVIGATE_ACTION, onMessage } from '../pubsub/eventPublisher'

export default function Stage() {
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
    onMessage(handleEvent)

    return () => cleanupListener(handleEvent)
  }, [])

  useEffect(() => {
    const praise = collections
      .find(c => c.name.includes(collectionName))?.songs
      .find(s => s.title.includes(praiseName))

    setPraise(praise)
  }, [collectionName, praiseName])

  return (
    <>
      {
        praise 
          ? <PraiseSlideShow praise={praise} />
          : <SlideShowEmptyState />
      }
    </>
  )
}
