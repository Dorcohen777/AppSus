
export function NewVideoNote({ onSubmitNote, handleChange }) {
    return (
        <section>
            <form onSubmit={onSubmitNote} className="create-form">
                <input onChange={handleChange} placeholder="enter video title" type="text" name="videoTitle" className='input-create-note' />
                <input onChange={handleChange} placeholder="enter video url" type="text" name="videoUrl" className='input-create-note' />
                <button className='btn-create'>Add</button>
            </form>
        </section>
    )
}