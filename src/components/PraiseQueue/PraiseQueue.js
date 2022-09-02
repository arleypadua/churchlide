import React from 'react'
import { NAVIGATE_ACTION, publishMessage } from '../../pubsub/eventPublisher'
import { useAppContext } from '../../AppContext'
import './PraiseQueue.css'
import { removePraiseFromQueue, selectPraise } from './PraiseQueueReducer'

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
  const { praiseQueueReducer: [praiseQueue, dispatchPraiseQueue] } = useAppContext()

  const handlePraiseClick = (collection, praiseTitle) => {
    const praiseUrl = `/stage/praise/${collection}/${praiseTitle}`
    publishMessage(NAVIGATE_ACTION, praiseUrl)
    
    dispatchPraiseQueue(selectPraise(collection, praiseTitle))
  }

  const handlePraiseDeleteClick = (collection, praiseTitle) => {
    dispatchPraiseQueue(removePraiseFromQueue(collection, praiseTitle))
  }
  
  return (
    <ul className='praise_queue'>
      {
        praiseQueue.praiseQueue.map(p => {
          return (
            <PraiseQueueEntry 
              key={`${p.collection}|${p.praise.title}`}
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
