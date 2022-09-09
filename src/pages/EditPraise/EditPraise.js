import './EditPraise.css'
import React from 'react'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePraise } from '../../AppReducer'

export default function AddPraise() {
  const navigate = useNavigate()
  const { collectionName, praiseName } = useParams()
  const { appReducer: [app, dispatchApp] } = useAppContext()
  const [editingPraiseTitle, setEditingPraiseTitle] = useState('')
  const [initialPraiseContent, setInitialPraiseContent] = useState('')
  const [editingPraiseContent, setEditingPraiseContent] = useState('')
  const [editDisabled, setEditDisabled] = useState(true)

  useEffect(() => {
    const editDisabledEvaluated = editingPraiseTitle.length === 0
      && editingPraiseContent.length === 0
    setEditDisabled(editDisabledEvaluated)
  }, [editingPraiseTitle, editingPraiseContent])

  useEffect(() => {
    const collection = app.loadedCollections.find(c => c.name === collectionName)
    if (!collection) return navigate('/')

    const praise = collection.songs.find(s => s.title === praiseName)
    if (!praise) return navigate('/')

    setEditingPraiseTitle(praise.title)
    setEditingPraiseContent(praise.content)
    setInitialPraiseContent(praise.content)
  }, [collectionName, praiseName])

  const editClick = () => {
    if (praiseName === editingPraiseTitle && initialPraiseContent === editingPraiseContent)
      return navigate('/')

    dispatchApp(updatePraise(collectionName, praiseName, editingPraiseTitle, editingPraiseContent))
    navigate('/')
  }

  return (
    <div className='add_praise'>
      <div className='add_praise__panel'>
        <h1>Editar Slide</h1>
        <input
          className='input input_full_width'
          type="text"
          value={collectionName}
          placeholder="Nome da Coletânea"
          disabled
        />

        <input
          className='input input_full_width'
          type="text"
          value={editingPraiseTitle}
          onChange={(e) => setEditingPraiseTitle(e.target.value)}
          placeholder="Título"
        />

        <textarea
          cols="30"
          rows="10"
          placeholder='Conteúdo'
          value={editingPraiseContent}
          onChange={(e) => setEditingPraiseContent(e.target.value)}
        ></textarea>
        <div>
          <button
            onClick={editClick}
            className="button"
            disabled={editDisabled}
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  )
}
