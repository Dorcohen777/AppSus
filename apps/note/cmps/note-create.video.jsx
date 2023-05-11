
export function NewVideoNote({ onSubmitNote, handleChange }) {
    return (
        <section>
            <form onSubmit={onSubmitNote}>
                <label htmlFor="">enter video title</label>
                <input onChange={handleChange} placeholder="enter video title" type="text" name="videoTitle" />
                <label htmlFor="">enter video url</label>
                <input onChange={handleChange} placeholder="enter video url" type="text" name="videoUrl" />
                <button className='btn-create'>Add</button>
            </form>
        </section>
    )
}