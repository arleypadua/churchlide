import { useState, useEffect, useRef } from "react";
import buildVerseFromContent from "../../helpers/buildVerseFromContent";
import togglePresentationTheme from '../../helpers/togglePresentationTheme'
import { onMessage, cleanupListener, NEXT_ACTION, PREVIOUS_ACTION } from '../../pubsub/eventPublisher';
import './PraiseSlideShow.css'

function PraiseSlideShow({ praise }) {
    const { title, content } = praise;

    const [currentPage, setCurrentPage] = useState(0)
    const slideFocusRef = useRef(null)
    const verse = buildVerseFromContent(content)

    function previousSlide() {
        if (currentPage === 0) return
        setCurrentPage((prev) => prev - 1)
    }

    function nextSlide() {
        if (currentPage === verse.length - 1) return
        setCurrentPage((prev) => prev + 1)
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
      togglePresentationTheme()
    }, [])

    useEffect(() => {
        slideFocusRef.current.focus()

        onMessage(handleMessage)
        return () => cleanupListener(handleMessage)
    }, [currentPage])

    useEffect(() => {
      setCurrentPage(0)
    }, [title, content])

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