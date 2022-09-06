import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import bible from '../../data/bible'
import { cleanupListener, NEXT_ACTION, onMessage, PREVIOUS_ACTION } from '../../pubsub/eventPublisher'
import './BibleSlideShow.css'

export default function BibleSlideShow() {
  const navigate = useNavigate()
  const { versionKey, bookAbbreviation, chapterIndex, verseIndex } = useParams()
  
  const [currentVerse, setCurrentVerse] = useState('')
  const [currentBook, setCurrentBook] = useState('')

  const title = `${currentBook} - ${parseInt(chapterIndex) + 1}:${parseInt(verseIndex) + 1}`

  const buildUrlForReference = (ref) => {
    return `/stage/bible/${ref.versionKey}/${ref.bookAbbreviation}/${ref.chapterIndex}/${ref.verseIndex}`
  }

  const nextVerse = () => {
    const next = bible.next(versionKey, bookAbbreviation, chapterIndex, verseIndex)
    navigate(buildUrlForReference(next))
  }

  const previousVerse = () => {
    const previous = bible.previous(versionKey, bookAbbreviation, chapterIndex, verseIndex)
    navigate(buildUrlForReference(previous))
  }

  const handleMessage = (event) => {
    const { type } = event.data;

    if (type === NEXT_ACTION) {
      nextVerse()
    }
    if (type === PREVIOUS_ACTION) {
      previousVerse()
    }
  }

  useEffect(() => {
    const bookName = bible.getBook(versionKey, bookAbbreviation)?.name
    setCurrentBook(bookName)

    const verse = bible.getVerse(versionKey, bookAbbreviation, chapterIndex)[verseIndex].verse
    setCurrentVerse(verse)

    onMessage(handleMessage)
    return () => cleanupListener(handleMessage)
  }, [versionKey, bookAbbreviation, chapterIndex, verseIndex])

  return (
    <div className='bible_slide_show'>
      <h1>{title}</h1>
      <section className='bible_slide_show__verse'>
        <span>{currentVerse}</span>
      </section>
      
    </div>
  )
}
