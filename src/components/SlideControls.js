import React from 'react'
import { NEXT_ACTION, PREVIOUS_ACTION, publishMessage } from '../pubsub/eventPublisher'

export default function SlideControls() {
  const handlePrevious = () => {
    publishMessage(PREVIOUS_ACTION)
  }

  const handleNext = () => {
    publishMessage(NEXT_ACTION)
  }

  return (
    <div>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}
