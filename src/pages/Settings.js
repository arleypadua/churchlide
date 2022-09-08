import React from 'react'
import PresentationThemeSettings from '../components/settings/PresentationThemeSettings/PresentationThemeSettings'
import SyncOneDrive from '../components/settings/SyncOneDrive/SyncOneDrive'
import './Settings.css'

export default function Settings() {
  return (
    <div className='settings'>
      <div className="settings__panel">
        <h1>Configurações</h1>
        <PresentationThemeSettings />
        <h1>Sincronizar</h1>
        <SyncOneDrive />
      </div>
    </div>
  )
}
