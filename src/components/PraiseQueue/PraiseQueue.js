import React from 'react'
import { NAVIGATE_ACTION, publishMessage } from '../../pubsub/eventPublisher'
import { useAppContext } from '../../AppContext'
import './PraiseQueue.css'
import { removeAllFromQueue, removePraiseFromQueue, selectPraise } from './PraiseQueueReducer'
import { useNavigate } from 'react-router-dom'

function PraiseQueueEntry({ name, title, handlePraiseClick, handlePraiseDeleteClick }) {
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate(`/add-praise/${name}/${title}`)
  }

  return (
    <li className='praise_queue__praise_entry'
      onClick={() => handlePraiseClick(name, title)}
    >
      <h1>{title}</h1>
      <i className="ri-pencil-fill" onClick={() => handleEditClick(name, title)}></i>
      <i className="ri-close-fill" onClick={() => handlePraiseDeleteClick(name, title)}></i>
    </li>
  )
}

export default function PraiseQueue() {
  const { praiseQueueReducer: [praiseQueue, dispatchPraiseQueue] } = useAppContext()

  const handlePraiseClick = (collection, praiseTitle) => {
    const praiseUrl = `/stage/praise/${collection}/${praiseTitle}`
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
