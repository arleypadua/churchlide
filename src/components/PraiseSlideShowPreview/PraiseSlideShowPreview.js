import './PraiseSlideShowPreview.css'
import React, { useState } from 'react'
import buildVerseFromContent from '../../helpers/buildVerseFromContent'
import { useEffect } from 'react'
import { cleanupListener, NAVIGATE_ACTION, NEXT_ACTION, onMessage, PREVIOUS_ACTION, publishMessage } from '../../pubsub/eventPublisher'

export default function PraiseSlideShowPreview({ praise }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { collection, title, content } = praise
  const preview = buildVerseFromContent(content)
    .map(v => `${v.lines}`)

  function previousSlide() {
    setCurrentSlide((prev) => {
      const willSetTo = prev - 1
      if (willSetTo < 0) return prev
      return willSetTo
    })
  }

  function nextSlide() {
    setCurrentSlide((prev) => {
      const willSetTo = prev + 1
      if (willSetTo > preview.length - 1) return prev
      return willSetTo
    })
  }

  const handleMessage = (event) => {
    const { type } = event.data;

    if (type === NEXT_ACTION) {
      nextSlide()
    }
    if (type === PREVIOUS_ACTION) {
      previousSlide()
    }
  }

  useEffect(() => {
    setCurrentSlide(0)
    onMessage(handleMessage)
    return () => cleanupListener(handleMessage)
  }, [title, content])

  const handleVerseClick = (slideIndex) => {
    setCurrentSlide(slideIndex)
    
    const praiseUrl = `/stage/praise/${encodeURIComponent(collection)}/${encodeURIComponent(title)}/${slideIndex}`
    publishMessage(NAVIGATE_ACTION, praiseUrl)
  }

  return (
    <div className='praise_slide_show_preview'>
      <h1>{title}</h1>
      {preview.map((p, index) => (
        <p
          className={`praise_slide_show_preview__slide ${currentSlide === index ? 'active' : ''}`}
          key={index}
          dangerouslySetInnerHTML={{ __html: p }}
          onClick={() => handleVerseClick(index)}
        ></p>
      ))}
    </div>
  )
}
