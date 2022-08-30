import React from 'react'
import { Link } from 'react-router-dom'
import { NEXT_ACTION, PREVIOUS_ACTION, NAVIGATE_ACTION, publishMessage } from '../../pubsub/eventPublisher'

export default function SlideControls() {
  const handlePrevious = () => {
    publishMessage(PREVIOUS_ACTION)
  }

  const handleNext = () => {
    publishMessage(NEXT_ACTION)
  }

  const handleEmptyState = () => {
    publishMessage(NAVIGATE_ACTION, '/stage')
  }

  const handleOpenPresentation = () => {
    window.open('/stage', '_brank', 'width=1024,height=768')
  }

  return (
    <div>
      <button className='button button-primary' onClick={handleOpenPresentation}>
        <i className="ri-slideshow-line"></i> Abrir Apresentação
        {/* <Link to="/stage" target={'_blank'}>Abrir Apresentação</Link> */}
      </button>
      <button className='button button-primary' onClick={handleEmptyState}><i className="ri-home-line"></i></button>
      <button className='button button-primary' onClick={handlePrevious}><i className="ri-arrow-left-line"></i></button>
      <button className='button button-primary' onClick={handleNext}><i className="ri-arrow-right-line"></i></button>
    </div>
  )
}
