import React, { useState } from 'react'
import { LINE_BREAK_REGEX } from '../../helpers/buildVerseFromContent';
import { useAppContext } from '../../AppContext';
import { addPraiseToQueue } from '../PraiseQueue/PraiseQueueReducer';
import './PraiseSearch.css'
import { useNavigate } from 'react-router-dom';

function sanitize(content) {
  if (!content) return content
  return content
    .replace(LINE_BREAK_REGEX, ' ')
    .replace(/<font color="yellow">/gi, '')
    .replace(/<\/font>/gi, '')
    .replace(/<i>/gi, '')
    .replace(/<\/i>/gi, '')
    .replace(/<blockquote class="chave-bis">/gi, '')
    .replace(/<blockquote class="chave-bis-small">/gi, '')
    .replace(/<\/blockquote>/gi, '')
    .replace(/\(BIS\)/gi, '')
    .slice(0, 50)
    .concat("...")
}

function PraiseEntry({ name, title, content, handlePraiseClick }) {
  const navigate = useNavigate()

  const handleEditClick = (e) => {
    navigate(`/edit-praise/${encodeURIComponent(name)}/${encodeURIComponent(title)}`)
  }

  const handleEntryClick = (e) => {
    const { target: { id } } = e;
    if (id === 'praise_entry_edit') return handleEditClick(e)

    handlePraiseClick?.(e)
  }

  return (
    <li className='praise_search__praise_entry'
      onClick={handleEntryClick}
    >
      <div className='praise_search__praise_entry__title_container'>
        <h1>{title}</h1>
        <i id="praise_entry_edit" className="ri-pencil-fill"></i>
      </div>
      <p>{sanitize(content)}</p>
    </li>
  )
}

export default function PraiseSearch() {
  const [searchText, setSearchText] = useState('')
  const {
    appReducer: [app],
    praiseQueueReducer: [, dispatchPraiseQueue] 
  } = useAppContext()

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }

  const searchPraises = (searchTerm) => {
    if (searchTerm === '') return []
    return app.loadedCollections.map(c => (
      { ...c, songs: c.songs.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())) }
    ))
  }

  const handlePraiseClick = (collection, praise) => {
    dispatchPraiseQueue(addPraiseToQueue(collection, praise))
  }

  const praises = searchPraises(searchText)

  return (
    <>
      <div className='praise_search'>
        <input
          className='input input_full_width'
          type="text"
          name="searchText"
          placeholder='Nome do Louvor'
          value={searchText}
          onChange={handleSearchTextChange}
        />

        {
          praises.map(({ name, songs }) => (
            <section key={name}>
              <h1>{name}</h1>

              {songs.length !== 0 && songs.map((song, index) => (
                <PraiseEntry
                  key={`${name}|${song.title}|${index}`}
                  handlePraiseClick={() => handlePraiseClick(name, song)}
                  name={name}
                  title={song.title}
                  content={song.content}
                />
              ))}
            </section>
          ))
        }
      </div>
    </>
  )
}
