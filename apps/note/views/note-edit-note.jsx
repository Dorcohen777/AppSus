const { useEffect, useState, useRef } = React

import { TextEditor } from './text-editor.jsx'
import { ImageEditor } from './image-editor.jsx'

import { noteService } from '../services/note.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'


export function EditNote({ currNoteId, loadNotes }) {

    const [currNote, setCurrNote] = useState(null)
    const [noteType, setNoteType] = useState('')

    const [newTxt, setNewTxt] = useState('')
    const [newUrl, setNewUrl] = useState('')


    useEffect(() => {
        findNote()

    }, [])

    function handleEditChange({ target }) {

        if (target.name === 'txt') {
            setNewTxt(target.value)
            if (noteType === 'NoteTxt') {
                setCurrNote(prevNote => ({
                    ...prevNote,
                    info: {
                        ...prevNote.info,
                        txt: target.value // use the updated value directly
                    }
                }))
            } else if (noteType === 'NoteImg') {
                setCurrNote(prevNote => ({
                    ...prevNote,
                    info: {
                        ...prevNote.info,
                        title: target.value // use the updated value directly
                    }
                }))
            }
        }

        if (target.name === 'url') {
            setNewUrl(target.value)
            if (noteType === 'NoteImg') {
                setCurrNote(prevNote => ({
                    ...prevNote,
                    info: {
                        ...prevNote.info,
                        url: target.value // use the updated value directly
                    }
                }))
            }
        }


    }

    function onEditSubmit(ev) {
        ev.preventDefault()
        onDoneEdit()

    }

    function onDoneEdit() {
        asyncStorageService.put('notesDB', currNote)
            .then(() => {
                console.log('Updated note')
                loadNotes()
            })
            .catch((err) => console.log('failed to edit note', err))

    }

    function findNote() {
        noteService.get(currNoteId)
            .then((note) => {
                console.log('from findNote', note)
                setCurrNote(note)
                setNoteType(note.type)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {noteType === 'NoteTxt' &&
                <TextEditor onEditSubmit={onEditSubmit} handleEditChange={handleEditChange} currNote={currNote} />
            }
            {noteType === 'NoteImg' &&
                <ImageEditor onEditSubmit={onEditSubmit} handleEditChange={handleEditChange} currNote={currNote} />
            }
        </div>
    )

}