import React, { useEffect } from 'react'
import togglePresentationTheme from '../../helpers/togglePresentationTheme'

export default function SlideShowEmptyState() {
  useEffect(() => {
    togglePresentationTheme()
  }, [])

  return (
    <div className="slide_show">
      <div className='slide_verse'>
        <h1>Empty State</h1>
      </div>
    </div>
  )
}
