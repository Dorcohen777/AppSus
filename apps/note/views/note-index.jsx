const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { CreateNote } from '../views/note-create.jsx'

export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes))
    }

    function addNoteToList(note) {
        setNotes((prevNotes) => [...prevNotes, note]);
    }


    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (
        <main>
            <h1>Hello from note app</h1>
            <CreateNote addNoteToList={addNoteToList} />
            <NoteList notes={notes} />
        </main>
    )
}
