
export function NewTextNote({onSubmitNote, handleChange}) {
    return (
        <form onSubmit={onSubmitNote} className="create-form">
            <input onChange={handleChange} type="text" placeholder='Create new note' className='input-create-note' name="txt"/>
            <button className='btn-create'>Add</button>
        </form>
    )
}