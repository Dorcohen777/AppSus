const { useState } = React

import { NotePreview } from "./note-preview.jsx"


export function NoteList({ notes, onRemoveNote, onEditNote, onChangeColor }) {


    console.log(notes)


    return (
        <ul className="ul-notes">

            {notes.map((note) => {
                return <li key={note.id}>

                    <section className="section-notes" >
                        <NotePreview note={note} />

                        <div className="div-actions">
                            <button onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash"></i></button>
                            <button onClick={() => onEditNote(note.id)}><i className="fa-solid fa-pen-to-square"></i></button>
                            <button onClick={() => onChangeColor(note.id)}><i className="fa-solid fa-palette"></i></button>
                            <button><i className="fa-solid fa-clone"></i></button>
                            <button><i className="fa-solid fa-thumbtack"></i></button>
                        </div>
                    </section>

                </li>
            })}
        </ul>
    )
}
