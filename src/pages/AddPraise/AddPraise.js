import './AddPraise.css'
import React from 'react'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext'
import { addPraiseToCollection } from '../../AppReducer'
import { useNavigate } from 'react-router-dom'
import CollectionNames from '../../components/CollectionNames/CollectionNames'
import PraiseEditor from '../../components/PraiseEditor/PraiseEditor'

export default function AddPraise() {
  const navigate = useNavigate()
  const { appReducer: [app, dispatchApp] } = useAppContext()
  const [collectionName, setCollectionName] = useState('')
  const [collectionNameFocused, setCollectionNameFocused] = useState(true)
  const [praiseTitle, setPraiseTitle] = useState('')
  const [praiseContent, setPraiseContent] = useState('')
  const [addDisabled, setAddDisabled] = useState(true)

  useEffect(() => {
    const addDisabledEvaluated = collectionName.length === 0
      || praiseTitle.length === 0
      || praiseContent.length === 0
    setAddDisabled(addDisabledEvaluated)
  }, [collectionName, praiseTitle, praiseContent])

  const addClick = () => {
    dispatchApp(addPraiseToCollection(collectionName, praiseTitle, praiseContent))
    navigate('/')
  }

  const handleCollectionNameClicked = (collectionName) => {
    setCollectionName(collectionName)
  }

  const handleCollectionNameBlur = () => {
    setTimeout(() => setCollectionNameFocused(false), 100)
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
          onFocus={() => setCollectionNameFocused(true)}
          onBlur={handleCollectionNameBlur}
          placeholder="Nome da Coletânea"
        />

        {collectionNameFocused && <CollectionNames onNameClicked={handleCollectionNameClicked} />}

        <input
          className='input input_full_width'
          type="text"
          value={praiseTitle}
          onChange={(e) => setPraiseTitle(e.target.value)}
          placeholder="Título"
        />

        <PraiseEditor
          value={praiseContent}
          onChange={(e) => setPraiseContent(e.target.value)}
        />

        <div>
          <button
            onClick={addClick}
            className="button button-primary"
            disabled={addDisabled}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
