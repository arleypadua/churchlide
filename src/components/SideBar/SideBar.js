import React from 'react'
import './SideBar.css'

export default function SideBar() {
  return (
    <ul className='sidebar__menu'>
      <li className='active'><i className="ri-book-line ri-fw"></i></li>
      <li><i className="ri-music-2-line ri-fw"></i></li>
    </ul>
  )
}
