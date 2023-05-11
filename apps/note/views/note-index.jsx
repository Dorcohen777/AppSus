const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { CreateNote } from '../views/note-create.jsx'
import { EditNote } from './note-edit-note.jsx'
import { ChangeColor } from '../cmps/note-change-color.jsx'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { func } from 'prop-types'

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

    function onCloneNote(noteId) {
        setNoteId(noteId)
        const noteToClone = notes.find(note => note.id === noteId);
        const newNote = cloneNote(noteToClone);
        asyncStorageService.post('notesDB', newNote)
            .then(() => {
                addNoteToList(newNote);
            })
            .catch((err) => {
                console.log('failed to clone note', err)
            })
    }

    // cloneing the object when user press clone btn
    function cloneNote(note) {
        const newNote = {
            ...note,
            id: utilService.makeId(),
        };
        return newNote;
    }

    // when user clicking to pin a note 
    function onPinClick(noteId) {
        const noteIndex = notes.findIndex(note => note.id === noteId);
        const pinnedNote = notes[noteIndex];
        notes.splice(noteIndex, 1);
        notes.unshift(pinnedNote);
        setNotes([...notes]);
    }



    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (
        <main>

            {isChangeColor && <ChangeColor currNoteId={currNoteId} loadNotes={loadNotes} />}
            {isNoteEdit && <EditNote currNoteId={currNoteId} loadNotes={loadNotes} />}
            <CreateNote addNoteToList={addNoteToList} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} onChangeColor={onChangeColor} onCloneNote={onCloneNote} cloneNote={cloneNote} onPinClick={onPinClick} />

        </main>
    )
}
