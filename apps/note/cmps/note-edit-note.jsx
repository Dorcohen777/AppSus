const { useEffect, useState } = React


import { noteService } from '../services/note.service.js'
import { NewTextNote } from '../cmps/note-create-text.jsx'
import { asyncStorageService } from '../../../services/async-storage.service.js'

export function EditNote({ currNoteId, addNoteToList }) {

    const [currNote, setCurrNote] = useState(null)
    const [noteType, setNoteType] = useState('')


    useEffect(() => {
        findNote()

    }, [])

    function handleEditChange({ target }) {
        const newTxt = target.value
        setCurrNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                txt: newTxt

            }
        }))
        console.log(currNote)
    }


    function onEditSubmit(ev) {
        ev.preventDefault()

        if (noteType === "NoteTxt") {
            asyncStorageService.put('notesDB', currNote)
                .then(() => console.log('Updated note'))
                .catch((err) => console.log('failed to edit note', err))
            addNoteToList(currNote)
        }
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

    console.log('from edit', currNoteId)

    return (
        <div>
            <h1>edit note here</h1>
            {noteType === "NoteTxt" &&
                <div>
                    <form onSubmit={onEditSubmit}>
                        <h1>Enter new text</h1>
                        <input type="text" name="" onChange={handleEditChange} placeholder='enter new text' value={currNote.info.txt} />
                        <button>Save</button>
                    </form>
                </div>
            }
        </div>
    )

}