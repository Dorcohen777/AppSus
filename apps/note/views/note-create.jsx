const { useEffect, useState, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM

// import { NoteList } from '../cmps/note-list.jsx'
import { noteService } from '../services/note.service.js'
import { NewImageNote } from '../cmps/note-create-image.jsx'
import { NewTextNote } from '../cmps/note-create-text.jsx'
import { NewTodoNote } from '../cmps/note-create.todo.jsx'


export function CreateNote({ addNoteToList, setEditNote }) {


    const [inputValue, setInputValue] = useState('')
    const [inputValueUrl, setInputValueUrl] = useState('')

    const [isTxt, setIsTxt] = useState(false)
    const [isImg, setIsImg] = useState(false)
    const [isTodos, setIsTodos] = useState(false)
    const [isVideo, setIsVideo] = useState(false)

    const [showImageComponent, setShowImageComponent] = useState(false);
    const [showTextComponent, setShowTextComponent] = useState(false);
    const [showTodoComponent, setShowTodoComponent] = useState(false);
    const [showVideoComponent, setShowVideoComponent] = useState(false);

    useEffect(() => {
        setIsTxt(true)

    }, [])

    function onImageClick() {
        setShowImageComponent(true);
        setShowTextComponent(false)
        setShowTodoComponent(false)
        setShowVideoComponent(false)

        setIsImg(true)
        setIsTxt(false)
        setIsTodos(false)
        setIsVideo(false)
    }

    function onVideoClick() {
        setShowVideoComponent(true)
        setShowImageComponent(false)
        setShowTextComponent(false)
        setShowTodoComponent(false)

        setIsVideo(true)
        setIsTxt(false)
        setIsImg(false)
        setIsTodos(false)
    }

    function onTextClick() {
        setShowTextComponent(true)
        setShowImageComponent(false)
        setShowTodoComponent(false)
        setShowVideoComponent(false)

        setIsTxt(true)
        setIsImg(false)
        setIsTodos(false)
        setIsVideo(false)
    }

    function onTodoClick() {
        setShowTodoComponent(true)
        setShowImageComponent(false)
        setShowTextComponent(false)
        setShowVideoComponent(false)

        setIsTodos(true)
        setIsImg(false)
        setIsTxt(false)
        setIsVideo(false)
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

    function onSubmitNote(ev) {
        ev.preventDefault()
        if (isTxt) {
            const newNote = noteService.buildNoteText(inputValue)
            noteService.createNewNote(inputValue, "NoteTxt", newNote)
            addNoteToList(newNote)
        } else if (isImg) {
            const newImg = noteService.buildNoteImage(inputValue, inputValueUrl)
            noteService.createNewNote(inputValue, "NoteImg", newImg, inputValueUrl)
            addNoteToList(newImg)
        } else if (isTodos) {
            const newTodo = noteService.buildNoteTodo(todos);
            noteService.createNewNote(inputValue, "NoteTodo", newTodo);
            addNoteToList(newTodo);
        } else if (isVideo) {

        }
    }

    return (
        <section className='section-create'>

            <div className='div-create-note'>
                <h1>Choose your note</h1>

                <div>
                    <button onClick={() => onTextClick()}><i className="fa-solid fa-font"></i></button>
                    <button onClick={() => onImageClick()}><i className="fa-solid fa-image"></i></button>
                    <button onClick={() => onTodoClick()}><i className="fa-solid fa-list"></i></button>
                    <button onClick={() => onVideoClick()}><i className="fa-solid fa-video"></i></button>
                </div>

                <div>
                    {showTextComponent && <NewTextNote onSubmitNote={onSubmitNote} handleChange={handleChange} />}
                    {showImageComponent && <NewImageNote onSubmitNote={onSubmitNote} handleChange={handleChange} />}
                    {showTodoComponent && <NewTodoNote onSubmitNote={onSubmitNote} handleChange={handleChange} />}
                    {showVideoComponent && <NewVideoNote />}
                </div>

            </div>

        </section>
    )
}