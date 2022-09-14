import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext'
import PraiseSlideShowPreview from '../PraiseSlideShowPreview/PraiseSlideShowPreview'
import './CurrentPraise.css'

export default function CurrentPraise() {
  const [currentPraise, setCurrentPraise] = useState()
  const { praiseQueueReducer: [praiseQueue, dispatchPraiseQueue] } = useAppContext()
  const { collection, praise: { title, content } } = praiseQueue?.current ?? {}

  useEffect(() => {
    if (title && content) {
      setCurrentPraise({
        collection,
        title,
        content
      })
    }
  }, [collection, title, content])

  return currentPraise && (
    <>
      <PraiseSlideShowPreview praise={currentPraise} />
    </>
  )
}
