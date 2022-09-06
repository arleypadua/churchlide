import React from 'react'
import { useAppContext } from '../../AppContext'
import { setPresentationBackgroundColor, settingsInitialState } from '../../AppReducer'
import './PresentationThemeSettings.css'

export default function PresentationThemeSettings() {
  const { appReducer: [app, dispatchApp] } = useAppContext()
  const { settings: { presentationBackground: { color1, color2, color3 } } } = app

  const handleColorChange = ({ target: { name, value } }) => {
    dispatchApp(setPresentationBackgroundColor(name, value))
  }

  const handleStoreDefault = () => {
    dispatchApp(setPresentationBackgroundColor('color1', settingsInitialState.presentationBackground.color1))
    dispatchApp(setPresentationBackgroundColor('color2', settingsInitialState.presentationBackground.color2))
    dispatchApp(setPresentationBackgroundColor('color3', settingsInitialState.presentationBackground.color3))
  }

  return (
    <div className='theme_settings'>
      <div className="theme_settings__background_colors">
        <label htmlFor="color1">
          Color 1
          <input type="color" name="color1" id="color1" onChange={handleColorChange} value={color1} />
        </label>
        <label htmlFor="color2">
          Color 2
          <input type="color" name="color2" id="color2" onChange={handleColorChange} value={color2} />
        </label>
        <label htmlFor="color3">
          Color 3
          <input type="color" name="color3" id="color3" onChange={handleColorChange} value={color3} />
        </label>
      </div>
      <button className='button' onClick={handleStoreDefault}>Restaurar Padrão</button>
    </div>
  )
}
