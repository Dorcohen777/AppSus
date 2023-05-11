
export function ImageEditor({ onEditSubmit, handleEditChange, currNote }) {

    return (
        <div className="editor-panel">
            <form onSubmit={onEditSubmit}>
                <h2>Enter new title</h2>
                <input type="text" name="txt" onChange={handleEditChange} value={currNote.info.title} />
                <h2>Enter new url</h2>
                <input type="url" name="url" onChange={handleEditChange} value={currNote.info.url} />
                <button>Save</button>
            </form>
        </div >
    )
}