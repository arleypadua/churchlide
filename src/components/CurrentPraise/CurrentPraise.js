import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext'
import PraiseSlideShowPreview from '../PraiseSlideShowPreview/PraiseSlideShowPreview'
import './CurrentPraise.css'

export default function CurrentPraise() {
  const [currentPraise, setCurrentPraise] = useState()
  const {
    appReducer: [app, dispatcheApp],
    praiseQueueReducer: [praiseQueue, dispatchPraiseQueue]
  } = useAppContext()
  const { collection, praise: { title, content }, selectedSlideIndex } = praiseQueue?.current ?? { praise: {} }

  useEffect(() => {
    if (title && content) {
      const praise = app.loadedCollections
        .find(c => c.name === collection)?.songs
        .find(s => s.title.includes(title))

      setCurrentPraise({
        collection,
        title: praise.title,
        content: praise.content,
        selectedSlideIndex
      })
    }
  }, [app.loadedCollections, collection, title, content, selectedSlideIndex])

  return currentPraise && (
    <>
      <PraiseSlideShowPreview praise={currentPraise} />
    </>
  )
}
