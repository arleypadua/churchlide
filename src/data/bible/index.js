import { PT_AA } from './pt_aa'
import { EN_KJV } from './en_kjv'

const LANGUAGES = {
  pt: "Português",
  en: "English"
}

const VERSIONS = {
  PT_AA: "Almeida Revisada",
  EN_KJV: "King James"
}

const BIBLE_CATALOG = {
  pt: {
    PT_AA: PT_AA
  },
  en: {
    EN_KJV: EN_KJV
  }
}

const getVersions = () => {
  const versions = []
  Object.keys(BIBLE_CATALOG).forEach(language => {
    Object.keys(BIBLE_CATALOG[language]).forEach(version => {
      versions.push({
        key: `${language}|${version}`,
        language,
        version,
        languageName: LANGUAGES[language],
        versionName: VERSIONS[version],
      })
    })
  })
  return versions
}

const getBooks = (versionKey) => {
  const version = getVersions().find(v => v.key === versionKey)
  if (!version) return []
  
  return BIBLE_CATALOG[version.language][version.version]
}

const getBook = (versionKey, bookAbbreviation) => {
  return getBooks(versionKey).find(b => b.abbrev === bookAbbreviation)
}

const getChapters = (versionKey, bookAbbreviation) => {
  return getBook(versionKey, bookAbbreviation)?.chapters?.flatMap((chapter, chapterIndex) => ({
    chapterIndex,
    chapterNumber: chapterIndex + 1,
    chapter
  })) ?? []
}

const getVerse = (versionKey, bookAbbreviation, chapterIndex) => {
  return getChapters(versionKey, bookAbbreviation)[chapterIndex]?.chapter?.flatMap((verse, verseIndex) => ({
    verseIndex,
    verseNumber: verseIndex + 1,
    verse
  })) ?? []
}

const next = (versionKey, bookAbbreviation, chapterIndex, verseIndex) => {
  chapterIndex = parseInt(chapterIndex)
  verseIndex = parseInt(verseIndex)

  const books = getBooks(versionKey)
  const currentBook = books.find(b => b.abbrev === bookAbbreviation)
  const currentBookIndex = books.indexOf(currentBook)
  
  const nextVerse = currentBook.chapters[chapterIndex]?.[verseIndex + 1]
  if (nextVerse) return { versionKey, bookAbbreviation, chapterIndex, verseIndex: verseIndex + 1 }

  const nextChapter = currentBook.chapters[chapterIndex + 1]?.[0]
  if (nextChapter) return { versionKey, bookAbbreviation, chapterIndex: chapterIndex + 1, verseIndex: 0 }

  const nextBook = books[currentBookIndex + 1]?.[0]
  if (nextBook) return { versionKey, bookAbbreviation: nextBook.abbrev, chapterIndex: 0, verseIndex: 0 }

  return { versionKey, bookAbbreviation: books[0].abbrev, chapterIndex: 0, verseIndex: 0 }
}

const previous = (versionKey, bookAbbreviation, chapterIndex, verseIndex) => {
  chapterIndex = parseInt(chapterIndex)
  verseIndex = parseInt(verseIndex)

  const books = getBooks(versionKey)
  const currentBook = books.find(b => b.abbrev === bookAbbreviation)
  const currentBookIndex = books.indexOf(currentBook)
  
  const previousVerse = currentBook.chapters[chapterIndex]?.[verseIndex - 1]
  if (previousVerse) return { versionKey, bookAbbreviation, chapterIndex, verseIndex: verseIndex - 1 }

  const previousChapter = currentBook.chapters[chapterIndex - 1]
  if (previousChapter) return { 
    versionKey, 
    bookAbbreviation, 
    chapterIndex: chapterIndex - 1, 
    verseIndex: previousChapter.length - 1
  }

  const previousBook = books[currentBookIndex - 1]?.[0]
  if (previousBook) return { 
    versionKey, 
    bookAbbreviation: previousBook.abbrev, 
    chapterIndex: previousBook.chapters.length - 1, 
    verseIndex: previousBook.chapters[previousBook.chapters.length - 1].length - 1
  }

  const lastBook = books[books.length - 1]
  return { 
    versionKey, 
    bookAbbreviation: lastBook.abbrev, 
    chapterIndex: lastBook.chapters.length - 1, 
    verseIndex: lastBook.chapters[lastBook.chapters.length - 1].length - 1
  }
}

const BIBLE_SET = {
  catalog: BIBLE_CATALOG,
  getVersions,
  getBooks,
  getBook,
  getChapters,
  getVerse,
  previous,
  next
}

export default BIBLE_SET