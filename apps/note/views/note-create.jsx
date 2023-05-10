const { useEffect, useState, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'

export function CreateNote() {

    const [inputValue, setInputValue] = useState('')

    function onImageClick(ev) {
        console.log('click')
        console.log(ev)
    }

    function handleChange({ target }) {
        setInputValue(target.value)
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        
        console.log(inputValue)
    }

    return (
        <section className='section-create'>

            <div className='div-create-note'>

                <form onSubmit={onSubmitNote}>
                    <input onChange={handleChange} type="search" placeholder='Create new note' className='input-create-note' />
                    <button className='btn-create'>Add</button>
                </form>

                <div>
                    <button><i className="fa-solid fa-font"></i></button>
                    <button onClick={(ev) => onImageClick(ev)}><i className="fa-solid fa-image"></i></button>
                    <button><i className="fa-solid fa-video"></i></button>
                    <button><i className="fa-solid fa-list"></i></button>
                </div>

            </div>

        </section>
    )
}