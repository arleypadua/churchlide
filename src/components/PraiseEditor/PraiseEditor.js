import React, { useRef } from 'react'

export default function PraiseEditor({ value, onChange, placeholder }) {
  const contentRef = useRef(null)

  const handleSurroundWithBis = () => {
    const selection = window.getSelection().toString()

    if (selection.includes('\n')) {
      document.execCommand('insertText', false, `<blockquote class="chave-bis">${selection}</blockquote>`)
    } else {
      document.execCommand('insertText', false, '<font color="yellow"><i>(BIS)</i></font>')
    }
  }

  return (
    <div>
      <div>
        <button
          className="button"
          onClick={handleSurroundWithBis}
        >Bis</button>
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
