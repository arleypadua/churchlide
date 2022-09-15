import React from 'react'
import { useAppContext } from '../../AppContext'
import { setPresentationWindow } from '../../AppReducer'
import { NEXT_ACTION, PREVIOUS_ACTION, NAVIGATE_ACTION, publishMessage } from '../../pubsub/eventPublisher'

export default function SlideControls({ onPrevious, onNext }) {
  const { appReducer: [app, dispatchApp] } = useAppContext()

  const handlePrevious = () => {
    onPrevious?.()
    publishMessage(PREVIOUS_ACTION)
  }

  const handleNext = () => {
    onNext?.()
    publishMessage(NEXT_ACTION)
  }

  const handleEmptyState = () => {
    publishMessage(NAVIGATE_ACTION, '/stage/empty')
  }

  const handleOpenPresentation = () => {
    const closed = app?.presentationWindow?.closed ?? true
    if (closed) {
      const newWindow = window.open(process.env.REACT_APP_STAGE_PATH, '_brank', 'width=1024,height=768')
      dispatchApp(setPresentationWindow(newWindow))
    } else {
      app.presentationWindow.focus()
    }
  }

  return (
    <div>
      <button className='button button-primary' onClick={handleOpenPresentation}>
        <i className="ri-slideshow-line"></i> Abrir Apresentação
      </button>
      <button className='button button-primary' onClick={handleEmptyState}><i className="ri-home-line"></i></button>
      <button className='button button-primary' onClick={handlePrevious}><i className="ri-arrow-left-line"></i></button>
      <button className='button button-primary' onClick={handleNext}><i className="ri-arrow-right-line"></i></button>
    </div>
  )
}
