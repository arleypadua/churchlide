import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext'
import './CurrentPraise.css'

export default function CurrentPraise() {
  const [currentPraise, setCurrentPraise] = useState()
  const { praiseQueue } = useAppContext()
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
