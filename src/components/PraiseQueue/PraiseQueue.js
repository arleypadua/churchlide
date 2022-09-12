import React from 'react'
import { NAVIGATE_ACTION, publishMessage } from '../../pubsub/eventPublisher'
import { useAppContext } from '../../AppContext'
import './PraiseQueue.css'
import { removeAllFromQueue, removePraiseFromQueue, selectPraise } from './PraiseQueueReducer'
import { useNavigate } from 'react-router-dom'

function PraiseQueueEntry({ name, title, handlePraiseClick, handlePraiseDeleteClick }) {
  const navigate = useNavigate()

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`/edit-praise/${encodeURIComponent(name)}/${encodeURIComponent(title)}`)
  }

  const handleDeleteClick = (e) => {
    e.preventDefault()
    handlePraiseDeleteClick?.(name, title)
  }

  const handleEntryClick = (e) => {
    const { nativeEvent: { target: { id } } } = e;

    if (id === 'praise_entry_edit') return handleEditClick(e)
    if (id === 'praise_entry_delete') return handleDeleteClick(e)

    handlePraiseClick?.(name, title)
  }

  return (
    <li 
      id="praise_queue_entry"
      className='praise_queue__praise_entry'
      onClick={handleEntryClick}
    >
      <h1>{title}</h1>
      <i id="praise_entry_edit" className="ri-pencil-fill"></i>
      <i id="praise_entry_delete" className="ri-close-fill"></i>
    </li>
  )
}

export default function PraiseQueue() {
  const { praiseQueueReducer: [praiseQueue, dispatchPraiseQueue] } = useAppContext()

  const handlePraiseClick = (collection, praiseTitle) => {
    const praiseUrl = `/stage/praise/${encodeURIComponent(collection)}/${encodeURIComponent(praiseTitle)}`
    publishMessage(NAVIGATE_ACTION, praiseUrl)

    dispatchPraiseQueue(selectPraise(collection, praiseTitle))
  }

  const handlePraiseDeleteClick = (collection, praiseTitle) => {
    dispatchPraiseQueue(removePraiseFromQueue(collection, praiseTitle))
  }

  const handleCleanClick = () => {
    dispatchPraiseQueue(removeAllFromQueue())
  }

  return (
    <>
      <ul className='praise_queue'>
        {
          praiseQueue.praiseQueue.map((p, i) => {
            return (
              <PraiseQueueEntry
                key={`${p.collection}|${p.praise.title}|${i}`}
                name={p.collection}
                title={p.praise.title}
                handlePraiseClick={handlePraiseClick}
                handlePraiseDeleteClick={handlePraiseDeleteClick}
              />
            )
          })
        }
      </ul>
      <div
        className='praise_queue__clean'
        onClick={handleCleanClick}
        hidden={praiseQueue.praiseQueue.length === 0}
      >
        Limpar
      </div>
    </>
  )
}
