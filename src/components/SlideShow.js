import { useState, useEffect, useRef } from "react";
import { onMessage, cleanupListener, NEXT_ACTION, PREVIOUS_ACTION } from '../pubsub/eventPublisher';

function buildVerseFrom(content) {
    const verse = content.split('\n\n')
    return verse.map((v, index) => ({
        page: index,
        lines: v.replace(/(?:\r\n|\r|\n)/g, '<br />'),
    }))
}

function SlideShow({ praise }) {
    const { title, content } = praise;

    const [currentPage, setCurrentPage] = useState(0)
    const slideFocusRef = useRef(null)
    const verse = buildVerseFrom(content)

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
        document.body.classList.add('hide_overflow')
    }, [])

    useEffect(() => {
        slideFocusRef.current.focus()

        onMessage(handleMessage)
        return () => cleanupListener(handleMessage)
    }, [currentPage])

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

export default SlideShow