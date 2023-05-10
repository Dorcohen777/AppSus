const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes }) {

    return (
        <ul className="ul-notes">

            {notes.map((note) => {
                return <li key={note.id}>
                    <section className="section-notes" >
                        <NotePreview note={note} />
                        <div className="div-actions">
                            <button><i className="fa-solid fa-trash"></i></button>
                            <button><i className="fa-solid fa-pen-to-square"></i></button>
                            <button><i className="fa-solid fa-palette"></i></button>
                            <button><i className="fa-solid fa-thumbtack"></i></button>
                            <button><i className="fa-solid fa-clone"></i></button>
                        </div>
                    </section>
                </li>
            })}
        </ul>
    )
}
