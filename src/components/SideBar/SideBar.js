import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './SideBar.css'

const items = [
  {
    route: '/',
    icon: 'ri-music-2-line ri-fw'
  },
  {
    route: '/add-praise',
    icon: 'ri-add-line ri-fw'
  },
  {
    route: '/bible',
    icon: 'ri-book-line ri-fw'
  },
  {
    route: '/settings',
    icon: 'ri-settings-3-line ri-fw'
  }
]

export default function SideBar() {
  const location = useLocation()

  return (
    <ul className='sidebar__menu'>
      {
        items.map(i => (
          <li 
            key={i.route}
            className={location.pathname === i.route ? 'active' : ''}
          >
            <Link to={i.route}>
              <i className={i.icon}></i>
            </Link>
          </li>
        ))
      }
    </ul>
  )
}
