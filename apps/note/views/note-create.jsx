const { useEffect, useState, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { NewImageNote } from '../cmps/note-create-image.jsx'
import { NewTextNote } from '../cmps/note-create-text.jsx'

export function CreateNote({ addNoteToList }) {


    const [inputValue, setInputValue] = useState('')
    const [inputValueUrl, setInputValueUrl] = useState('')

    const [isTxt, setIsTxt] = useState(false)
    const [isImg, setIsImg] = useState(false)
    const [isTodos, setIsTodos] = useState(false)

    const [showImageComponent, setShowImageComponent] = useState(false);
    const [showTextComponent, setShowTextComponent] = useState(false);

    useEffect(() => {
        setIsTxt(true)

    }, [])

    function onImageClick(ev) {
        console.log(ev)
        setShowTextComponent(false)
        setShowImageComponent(true);

        setIsImg(true)
        setIsTxt(false)
        setIsTodos(false)

    }

    function onTextClick() {
        setIsTxt(true)
        setIsImg(false)
        setIsTodos(false)

        setShowTextComponent(true)
        setShowImageComponent(false);
    }

    function handleChange({ target }) {
        if (target.name === 'txt') {
            setInputValue(target.value)
        }

        if (target.name === 'url') {

            setInputValueUrl(target.value)
        }
        console.log(inputValue)
    }

    // TODO when user choice image 
    // change component using continal rendering
    // create new image object and save it to local storage using createNewNote
    // re-redner component using addNoteToList

    function onSubmitNote(ev) {
        console.log('adding')
        ev.preventDefault()
        if (isTxt) {
            noteService.createNewNote(inputValue, "NoteTxt")
            const newNote = noteService.buildNoteText(inputValue)
            addNoteToList(newNote)
        } else if (isImg) {
            console.log('hello img', inputValue)
            console.log('your url is', inputValueUrl)
            noteService.createNewNote(inputValue, "NoteImg", inputValueUrl)
            const newImg = noteService.buildNoteImage(inputValue, inputValueUrl)
            addNoteToList(newImg)
        }
    }

    return (
        <section className='section-create'>

            <div className='div-create-note'>
                <h1>Choice your note</h1>
                <div>
                    <button onClick={() => onTextClick()}><i className="fa-solid fa-font"></i></button>
                    <button onClick={() => onImageClick()}><i className="fa-solid fa-image"></i></button>
                    <button><i className="fa-solid fa-video"></i></button>
                    <button><i className="fa-solid fa-list"></i></button>
                </div>
                {/*     {showImageComponent ? <ImageComponent /> : <TextComponent />} */}

                <div>
                    {showTextComponent && <NewTextNote onSubmitNote={onSubmitNote} handleChange={handleChange} />}
                    {showImageComponent && <NewImageNote onSubmitNote={onSubmitNote} handleChange={handleChange} />}
                </div>

            </div>

        </section>
    )
}