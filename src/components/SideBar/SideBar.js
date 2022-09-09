import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './SideBar.css'

const items = [
  {
    routePattern: /^\/$/,
    route: '/',
    icon: 'ri-music-2-line ri-fw'
  },
  {
    routePattern: /\/add-praise/,
    route: '/add-praise',
    icon: 'ri-add-line ri-fw'
  },
  {
    routePattern: /\/bible/,
    route: '/bible',
    icon: 'ri-book-line ri-fw'
  },
  {
    routePattern: /\/settings/,
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
            key={i.routePattern}
            className={i.routePattern.test(location.pathname) ? 'active' : ''}
            // className={location.pathname.startsWith(i.route) ? 'active' : ''}
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
