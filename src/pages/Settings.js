import React from 'react'
import PresentationThemeSettings from '../components/PresentationThemeSettings/PresentationThemeSettings'
import './Settings.css'

export default function Settings() {
  return (
    <div className='settings'>
      <div className="settings__panel">
        <h1>Settings</h1>
        <PresentationThemeSettings />
      </div>
    </div>
  )
}
