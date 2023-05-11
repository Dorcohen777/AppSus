export function NotePreview({ note }) {


    return (

        <article className="note-item">
            {note.type === 'NoteTxt' && (
                <div className="note-txt" style={{ backgroundColor: note.style.backgroundColor }}>
                    <h3>{note.info.txt}</h3>
                    <h3>created at: {note.createdAt}</h3>
                </div>
            )}
            {note.type === 'NoteTodos' && (
                <div className="note-todos" style={{ backgroundColor: note.style.backgroundColor }}>
                    <h2>{note.info.title}</h2>
                    <ul className="ul-todos" >
                        {note.info.todos.map((todo, idx) => {
                            return (
                                <li key={idx}>
                                    {todo.txt}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            {note.type === 'NoteImg' && (
                <div className="note-img">
                    <img src={note.info.url} />
                    <h2>{note.info.title}</h2>
                </div>
            )}
            {note.type === 'NoteVideo' && (
                <div className="note-video">
                    <h2>{note.title}</h2>
                    <iframe
                        width="310"
                        height="315"
                        src="https://www.youtube.com/embed/tgbNymZ7vqY"
                    >
                    </iframe>


                </div>
            )}

        </article>
    );
}
