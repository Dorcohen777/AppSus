const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { CreateNote } from '../views/note-create.jsx'
import { EditNote } from './note-edit-note.jsx'

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))
    const [isNoteEdit, setEditNote] = useState(false)
    const [currNoteId, setNoteId] = useState('')

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes))
    }

    function addNoteToList(note) {
        setNotes((prevNotes) => [...prevNotes, note]);
    }

    function onRemoveNote(noteId) {
        loadNotes()
        noteService.remove(noteId).then(() => {
            const updateList = notes.filter(note => note.id !== noteId)
            setNotes(updateList)
        })
    }

    function onEditNote(noteId) {
        console.log(noteId)
        setEditNote(!isNoteEdit)
        setNoteId(noteId)
    }


    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (
        <main>
            <h1>Hello from note app</h1>
            {isNoteEdit && <EditNote currNoteId={currNoteId} loadNotes={loadNotes} />}
            <CreateNote addNoteToList={addNoteToList} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />
        </main>
    )
}
