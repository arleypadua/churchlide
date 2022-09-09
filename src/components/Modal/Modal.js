import './Modal.css'
import React from 'react'

export default function Modal({ show, textMessage, showConfirmationButtons, onConfirm, onCancel }) {
  const handleCancel = () => {
    onCancel?.()
  }

  const handleConfirm = () => {
    onConfirm?.()
  }

  return (
    show && (
      <div className='modal__overlay'>
        <div className='modal__window'>
          <div className='modal__content'>{textMessage}</div>
          {showConfirmationButtons && (
            <div className="modal__confirmationButtons">
              <button className="button" onClick={handleCancel}>Não</button>
              <button className="button button-primary" onClick={handleConfirm}>Sim</button>
            </div>
          )}
        </div>
      </div>
    )
  )
}
