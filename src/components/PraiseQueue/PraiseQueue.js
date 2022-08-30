import React from 'react'
import { NAVIGATE_ACTION, publishMessage } from '../../pubsub/eventPublisher'
import { usePraiseQueueContext } from './PraiseQueueContext'
import './PraiseQueue.css'
import { removePraiseFromQueue } from './reducer'

function PraiseQueueEntry({ name, title, handlePraiseClick, handlePraiseDeleteClick }) {
  return (
    <li className='praise_queue__praise_entry'
      onClick={() => handlePraiseClick(name, title)}
    >
      <h1>{title}</h1>
      <i className="ri-close-fill" onClick={() => handlePraiseDeleteClick(name, title)}></i>
    </li>
  )
}

export default function PraiseQueue() {
  const { praiseQueue, dispatchPraiseQueue } = usePraiseQueueContext()

  const handlePraiseClick = (collection, praiseTitle) => {
    const praiseUrl = `/stage/praise/${collection}/${praiseTitle}`
    publishMessage(NAVIGATE_ACTION, praiseUrl)
  }

  const handlePraiseDeleteClick = (collection, praiseTitle) => {
    dispatchPraiseQueue(removePraiseFromQueue(collection, praiseTitle))
  }
  
  return (
    <ul>
      {
        praiseQueue.praiseQueue.map(p => {
          return (
            <PraiseQueueEntry 
              name={p.collection}
              title={p.praise.title}
              handlePraiseClick={handlePraiseClick}
              handlePraiseDeleteClick={handlePraiseDeleteClick}
            />
          )
        })
      }
    </ul>
  )
}
