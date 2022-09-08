import React from 'react'
import { useState } from 'react'
import { useAppContext } from '../AppContext'
import { addPraiseToCollection } from '../AppReducer'

export default function AddPraise() {
  const { appReducer: [app, dispatchApp] } = useAppContext()
  const [collectionName, setCollectionName] = useState('')
  const [praiseTitle, setPraiseTitle] = useState('')
  const [praiseContent, setPraiseContent] = useState('')
  //const [addDisabled, setAddDisabled] = useState(true)

  const addClick = () => {
    dispatchApp(addPraiseToCollection(collectionName, praiseTitle, praiseContent))
  }

  return (
    <div>
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
        <button onClick={addClick} className="button">Adicionar</button>
      </div>
    </div>
  )
}
