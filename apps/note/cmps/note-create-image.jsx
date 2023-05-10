
export function NewImageNote({ onSubmitNote, handleChange }) {
    return (
        <form onSubmit={onSubmitNote}>
            <input name="txt" type="text" placeholder="enter text" onChange={handleChange} className='input-create-note'/>
            <input name="url" type="text" placeholder="enter image url" onChange={handleChange} className='input-create-note'/>
            <button className='btn-create'>Add</button>
        </form>
    )
}