const { Link } = ReactRouterDOM

export function NoteList({ notes }) {

    console.log('notes from NoteList',notes)

    return (
        <div className="div-notes">
            {notes.map((note) => {

            })}
        </div>
    )
}
