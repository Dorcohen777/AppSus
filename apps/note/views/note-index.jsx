const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { CreateNote } from '../views/note-create.jsx'
import { EditNote } from './note-edit-note.jsx'
import { ChangeColor } from '../cmps/note-change-color.jsx'
import { asyncStorageService } from '../../../services/async-storage.service.js'

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))

    const [isChangeColor, setIsChangeColor] = useState(false) // toggle for color button

    const [isNoteEdit, setEditNote] = useState(false)
    const [currNoteId, setNoteId] = useState('')


    useEffect(() => {
        loadNotes()
    }, [filterBy])

    // load notes
    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes))
    }

    function addNoteToList(note) {
        setNotes((prevNotes) => [...prevNotes, note]);
    }

    // when user click on remove butotn
    function onRemoveNote(noteId) {
        loadNotes()
        noteService.remove(noteId).then(() => {
            const updateList = notes.filter(note => note.id !== noteId)
            setNotes(updateList)
        })
    }

    // when user click on edit button
    function onEditNote(noteId) {
        console.log(noteId)
        setEditNote(!isNoteEdit)
        setNoteId(noteId)
    }

    // when user click on color pallete
    function onChangeColor(noteId) {
        setIsChangeColor(!isChangeColor)
        setNoteId(noteId)
    }




    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (
        <main>

            {isChangeColor && <ChangeColor currNoteId={currNoteId} loadNotes={loadNotes} />}
            {isNoteEdit && <EditNote currNoteId={currNoteId} loadNotes={loadNotes} />}
            <CreateNote addNoteToList={addNoteToList} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} onChangeColor={onChangeColor} />

        </main>
    )
}
