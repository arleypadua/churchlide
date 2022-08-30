import React from 'react'
import { usePraiseQueueContext } from '../PraiseQueue/PraiseQueueContext'
import './CurrentPraise.css'

export default function CurrentPraise() {
  const { praiseQueue: { current: { praise: { title, content } } } } = usePraiseQueueContext()
  console.log(title, content)

  return (
    <>
      <section className='current_praise__page'>
        <h1>{title}</h1>
        <p>P teste 1</p>
        <p>P teste 2</p>
        <p>P teste 3</p>
      </section>
    </>
  )
}
