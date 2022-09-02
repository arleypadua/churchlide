import React, { useEffect } from 'react'
import togglePresentationTheme from '../../helpers/togglePresentationTheme'

export default function EmptyStateSlide() {
  // todo still be be done
  
  useEffect(() => {
    togglePresentationTheme()
  }, [])

  return (
    <div className="slide_show">
      <div className='slide_verse'>
        <h1></h1>
      </div>
    </div>
  )
}
