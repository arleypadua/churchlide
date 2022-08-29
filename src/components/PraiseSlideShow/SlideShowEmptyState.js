import React, { useEffect } from 'react'

export default function SlideShowEmptyState() {
  useEffect(() => {
    document.body.classList.add('hide_overflow')
  }, [])

  return (
    <div className="slide_show">
      <h1>Empty State</h1>
    </div>
  )
}
