import './PraiseEditor.css'
import React, { useRef } from 'react'

export default function PraiseEditor({ value, onChange, placeholder }) {
  const contentRef = useRef(null)

  const handleAddBis = () => {
    const selection = window.getSelection().toString()
    const { current: { selectionStart, selectionEnd } } = contentRef

    if (selectionStart !== selectionEnd) {
      document.execCommand('insertText', false, `<blockquote class="chave-bis">${selection}</blockquote>`)
    } else {
      document.execCommand('insertText', false, '<font color="yellow"><i>(BIS)</i></font>')
    }
  }

  const handleAddYellow = () => {
    const selection = window.getSelection().toString()
    const { current: { selectionStart, selectionEnd } } = contentRef

    if (selectionStart === selectionEnd) {
      document.execCommand('insertText', false, `<font color="yellow"><i></i></font>`)
    } else {
      document.execCommand('insertText', false, `<font color="yellow"><i>${selection}</i></font>`)
    }
  }

  const handleAddRepeat = (times) => {
    const selection = window.getSelection().toString()
    const { current: { selectionStart, selectionEnd } } = contentRef

    if (selectionStart !== selectionEnd) {
      document.execCommand('insertText', false, `<blockquote class="chave-${times}x">${selection}</blockquote>`)
    } else {
      document.execCommand('insertText', false, '<font color="yellow"><i>(2X)</i></font>')
    }
  }

  return (
    <div className="praise_editor">
      <div className='praise_editor__edit_bar'>
        <button
          className="praise_editor__button"
          onClick={handleAddYellow}
        >Amarelo</button>

        <button
          className="praise_editor__button"
          onClick={handleAddBis}
        >Bis</button>

        <button
          className="praise_editor__button"
          onClick={() => handleAddRepeat(2)}
        >2x</button>

        <button
          className="praise_editor__button"
          onClick={() => handleAddRepeat(3)}
        >3x</button>

        <button
          className="praise_editor__button"
          onClick={() => handleAddRepeat(4)}
        >4x</button>
      </div>
      <textarea
        className='text_area input_full_width tall'
        cols="30"
        rows="10"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        wrap="off"
        ref={contentRef}
      ></textarea>
    </div>
  )
}
