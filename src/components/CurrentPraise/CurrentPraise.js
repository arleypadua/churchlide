import React, { useEffect, useState } from 'react'
import { usePraiseQueueContext } from '../PraiseQueue/PraiseQueueContext'
import './CurrentPraise.css'

export default function CurrentPraise() {
  const [currentPraise, setCurrentPraise] = useState()
  const { praiseQueue } = usePraiseQueueContext()
  const { title, content } = praiseQueue?.current?.praise ?? {}

  useEffect(() => {
    if (title && content) {
      setCurrentPraise({
        title,
        content
      })
    }
  }, [title, content])

  const handleContentChange = event => {
    setCurrentPraise((prev) => ({ ...prev, content: event.target.value }));
  };

  return currentPraise && (
    <>
      <textarea 
        value={currentPraise.content}
        onChange={handleContentChange}
      ></textarea>
    </>
  )
}
