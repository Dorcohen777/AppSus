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
                <div className="note-todos">
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

        </article>
    );
}
