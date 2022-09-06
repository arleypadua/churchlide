import { useState, useEffect, useRef } from "react";
import buildVerseFromContent from "../../helpers/buildVerseFromContent";
import { onMessage, cleanupListener, NEXT_ACTION, PREVIOUS_ACTION } from '../../pubsub/eventPublisher';
import './PraiseSlideShow.css'

function PraiseSlideShow({ praise }) {
  const { title, content } = praise;

  const [currentPage, setCurrentPage] = useState(0)
  const slideFocusRef = useRef(null)
  const verse = buildVerseFromContent(content)

  function previousSlide() {
    setCurrentPage((prev) => {
      const willSetTo = prev - 1
      console.log('trying to set to: ', willSetTo)
      if (willSetTo < 0) return prev
      console.log('setting to: ', willSetTo)
      return willSetTo
    })
  }

  function nextSlide() {
    setCurrentPage((prev) => {
      const willSetTo = prev + 1
      console.log('trying to set to: ', willSetTo)
      if (willSetTo > verse.length - 1) return prev
      console.log('setting to: ', willSetTo)
      return willSetTo
    })
  }

  function handleMessage(event) {
    const { type } = event.data;

    if (type === NEXT_ACTION) {
      nextSlide()
    }
    if (type === PREVIOUS_ACTION) {
      previousSlide()
    }
  }

  useEffect(() => {
    slideFocusRef.current.focus()

    setCurrentPage(0)

    onMessage(handleMessage)
    return () => cleanupListener(handleMessage)
  }, [title])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      previousSlide()
    } else if (e.key === 'ArrowRight') {
      nextSlide()
    }
  }

  return (
    <div ref={slideFocusRef} tabIndex={-1} onKeyDown={handleKeyDown} className="slide_show">
      <h1>{title}</h1>
      <section className="content">
        {
          verse.map(v => (
            <p
              key={v.page}
              className={`slide_verse ${v.page === currentPage ? "" : "slide_verse_hidden"}`}
              dangerouslySetInnerHTML={{ __html: v.lines }}>
            </p>
          ))
        }
      </section>
    </div>
  );
}

export default PraiseSlideShow