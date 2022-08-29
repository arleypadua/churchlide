import React, { useState } from 'react'
import collections from '../data/collections'
import { NAVIGATE_ACTION, publishMessage } from '../pubsub/eventPublisher'

export default function PraiseList() {
  const [searchText, setSearchText] = useState('')

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }

  const searchPraises = (searchTerm) => {
    if (searchTerm === '') return []
    return collections.map(c => (
      { ...c, songs: c.songs.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())) }
    ))
  }

  const handlePraiseClick = (collection, praiseName) => {
    const praiseUrl = `/stage/praise/${collection}/${praiseName}`
    publishMessage(NAVIGATE_ACTION, praiseUrl)
  }

  const praises = searchPraises(searchText)

  return (
    <>
      <div>
        <input
          type="text"
          name="searchText"
          value={searchText}
          onChange={handleSearchTextChange}
        />

        {
          praises.map(({ name, songs }) => (
            <section>
              <h1 key={name}>{name}</h1>

              {songs.length !== 0 && songs.map(({ title }, index) => (
                <li
                  key={`${name}|${title}|${index}`}
                  onClick={() => handlePraiseClick(name, title)}
                >
                  {title}
                </li>
              ))}
            </section>
          ))
        }
      </div>
    </>
  )
}
