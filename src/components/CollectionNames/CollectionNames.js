import { useAppContext } from '../../AppContext';
import './CollectionNames.css'

export default function CollectionNames({ onNameClicked }) {
  const { appReducer: [app] } = useAppContext()
  const { loadedCollections } = app;
  const collectionNames = loadedCollections.map(c => c.name)
  
  return (
    <ul className='collection_names'>
      {
        collectionNames.map(n => (
          <li
            className='button button-light'
            key={n}
            onClick={() => onNameClicked?.(n)}
          >{n}</li>
        ))
      }
    </ul>
  )
}