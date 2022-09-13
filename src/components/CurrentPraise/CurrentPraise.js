import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext'
import PraiseSlideShowPreview from '../PraiseSlideShowPreview/PraiseSlideShowPreview'
import './CurrentPraise.css'

export default function CurrentPraise() {
  const [currentPraise, setCurrentPraise] = useState()
  const { praiseQueueReducer: [praiseQueue, dispatchPraiseQueue] } = useAppContext()
  const { title, content } = praiseQueue?.current?.praise ?? {}

  useEffect(() => {
    if (title && content) {
      setCurrentPraise({
        title,
        content
      })
    }
  }, [title, content])

  return currentPraise && (
    <>
      <PraiseSlideShowPreview praise={currentPraise} />
    </>
  )
}
