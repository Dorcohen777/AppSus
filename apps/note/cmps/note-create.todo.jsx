export function NewTodoNote({ onSubmitNote, handleChange }) {
    return (
        <form onSubmit={onSubmitNote}>
            <input
                onChange={handleChange}
                type="text"
                placeholder="Create new todo"
                className="input-create-note"
                name="txt"
            />
            <button className="btn-create">Add</button>
        </form>
    );
}