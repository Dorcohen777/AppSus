const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes }) {

    console.log('notes from NoteList', notes)

    return (
        <ul className="ul-notes">

            {notes.map((note) => {
                return <li key={note.id}>
                    <section className="section-notes" >
                        <NotePreview note={note} />
                        <div className="div-actions">
                            <button>remove</button>
                            <button>edit</button>
                            <button>change color</button>
                        </div>
                    </section>
                </li>
            })}
        </ul>
    )
}
