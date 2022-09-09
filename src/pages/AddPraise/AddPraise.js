import './AddPraise.css'
import React from 'react'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext'
import { addPraiseToCollection } from '../../AppReducer'
import { useNavigate } from 'react-router-dom'

export default function AddPraise() {
  const navigate = useNavigate()
  const { appReducer: [app, dispatchApp] } = useAppContext()
  const [collectionName, setCollectionName] = useState('')
  const [praiseTitle, setPraiseTitle] = useState('')
  const [praiseContent, setPraiseContent] = useState('')
  const [addDisabled, setAddDisabled] = useState(true)

  useEffect(() => {
    const addDisabledEvaluated = collectionName.length === 0
      && praiseTitle.length === 0
      && praiseContent.length === 0
    setAddDisabled(addDisabledEvaluated)
  }, [collectionName, praiseTitle, praiseContent])

  const addClick = () => {
    dispatchApp(addPraiseToCollection(collectionName, praiseTitle, praiseContent))
    navigate('/')
  }

  return (
    <div className='add_praise'>
      <div className='add_praise__panel'>
        <h1>Adicionar Slide</h1>
        <input
          className='input input_full_width'
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Nome da Coletânea"
        />

        <input
          className='input input_full_width'
          type="text"
          value={praiseTitle}
          onChange={(e) => setPraiseTitle(e.target.value)}
          placeholder="Título"
        />

        <textarea
          cols="30"
          rows="10"
          placeholder='Conteúdo'
          value={praiseContent}
          onChange={(e) => setPraiseContent(e.target.value)}
        ></textarea>
        <div>
          <button
            onClick={addClick}
            className="button"
            disabled={addDisabled}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
