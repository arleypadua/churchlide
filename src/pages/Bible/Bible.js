import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SlideControls from '../../components/SlideControls/SlideControls'
import bible from '../../data/bible'
import { NAVIGATE_ACTION, publishMessage } from '../../pubsub/eventPublisher'
import './Bible.css'

export default function Bible() {
  const [versions, setVersions] = useState([])
  const [selectedVersionKey, setSelectedVersionKey] = useState()

  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState()

  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState()

  const [verseCollection, setVerseCollection] = useState([])
  const [selectedVerse, setSelectedVerse] = useState()

  const selectVersion = (versionKey) => {
    setSelectedVersionKey(versionKey)
    const booksAvailable = bible.getBooks(versionKey)
    setBooks(booksAvailable)

    selectBook(versionKey, booksAvailable[0].abbrev)
  }

  const selectBook = (versionKey, bookAbbreviation, chapterIndex, verseIndex) => {
    setSelectedBook(bookAbbreviation)
    const chaptersAvailable = bible.getChapters(versionKey, bookAbbreviation)
    setChapters(chaptersAvailable)

    selectChapter(versionKey, bookAbbreviation, chapterIndex ?? 0, verseIndex ?? 0)
  }

  const selectChapter = (versionKey, bookAbbreviation, chapterIndex, verseIndex) => {
    setSelectedChapter(chapterIndex)
    const availableVerse = bible.getVerse(versionKey, bookAbbreviation, chapterIndex)
    setVerseCollection(availableVerse)

    selectVerse(versionKey, bookAbbreviation, chapterIndex, verseIndex ?? 0)
  }

  const selectVerse = (versionKey, bookAbbreviation, chapterIndex, verseIndex) => {
    setSelectedVerse(verseIndex)
  }

  useEffect(() => {
    const versionsFromCatalog = bible.getVersions()
    setVersions(versionsFromCatalog)

    selectVersion(versionsFromCatalog[0].key)
  }, [])

  const handlePrevious = () => {
    const { bookAbbreviation, chapterIndex, verseIndex } = bible.previous(selectedVersionKey, selectedBook, selectedChapter, selectedVerse)
    selectBook(selectedVersionKey, bookAbbreviation, chapterIndex, verseIndex)
  }

  const handleNext = () => {
    const { bookAbbreviation, chapterIndex, verseIndex } = bible.next(selectedVersionKey, selectedBook, selectedChapter, selectedVerse)
    selectBook(selectedVersionKey, bookAbbreviation, chapterIndex, verseIndex)
  }

  const handleChangeVersion = (e) => {
    selectVersion(e.target.value)
  }

  const handleChangeBook = (e) => {
    selectBook(selectedVersionKey, e.target.value)
  }

  const handleChangeChapter = (e) => {
    selectChapter(selectedVersionKey, selectedBook, parseInt(e.target.value))
  }

  const handleChangeVerse = (e) => {
    selectVerse(selectedVersionKey, selectedBook, selectedChapter, parseInt(e.target.value))
  }

  const handleVerseClick = (verse) => {
    console.log(verse.verseIndex)
    selectVerse(selectedVersionKey, selectedBook, selectedChapter, verse.verseIndex)
  }

  const handleOpenPresentation = () => {
    const url = `/stage/bible/${selectedVersionKey}/${selectedBook}/${selectedChapter}/${selectedVerse}`
    publishMessage(NAVIGATE_ACTION, url)
  }

  return (
    <div className='bible'>
      <div className="bible__index">
        <select
          value={selectedVersionKey}
          onChange={handleChangeVersion}
          className="select bg-white"
          placeholder='Versão'
        >
          {
            versions.map(({ key, languageName, versionName }) => (
              <option value={key}>
                {languageName}: {versionName}
              </option>
            ))
          }
        </select>
        <select
          value={selectedBook}
          onChange={handleChangeBook}
          className="select bg-white"
          placeholder='Livro'
        >
          {
            books.map(v => (
              <option value={v.abbrev}>
                {v.name}
              </option>
            ))
          }
        </select>
        <select
          value={selectedChapter}
          onChange={handleChangeChapter}
          className="select bg-white"
          placeholder='Capítulo'
        >
          {
            chapters.map(c => (
              <option value={c.chapterIndex}>
                {c.chapterNumber}
              </option>
            ))
          }
        </select>
        <select
          value={selectedVerse}
          onChange={handleChangeVerse}
          className="select bg-white"
          placeholder='Versículo'
        >
          {
            verseCollection.map(verse => (
              <option value={verse.verseIndex}>
                {verse.verseNumber}
              </option>
            ))
          }
        </select>
        <SlideControls onPrevious={handlePrevious} onNext={handleNext} />
        <button className='button button-primary' onClick={handleOpenPresentation}>
          <i className="ri-slideshow-line"></i> Apresentar Bíblia
        </button>
      </div>
      <div className='bible__chapter'>
        {
          verseCollection.map(verse => (
            <span
              key={verse.verseIndex}
              onClick={() => handleVerseClick(verse)}
              className={verse.verseIndex === selectedVerse ? 'bible__verse__selected' : ''}
            >
              {verse.verse}
            </span>
          ))
        }
      </div>
    </div>
  )
}
