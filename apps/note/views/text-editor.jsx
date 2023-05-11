
export function TextEditor({ onEditSubmit, handleEditChange, currNote }) {
   console.log('currnote from textEditor', currNote) 
    return (
        <div className="editor-panel">
            <form onSubmit={onEditSubmit}>
                <h1>Enter new text</h1>
                <input type="text" name="txt" onChange={handleEditChange} placeholder='enter new text' value={currNote.info.txt} />
                <button>Save</button>
            </form>
        </div>
    )
}