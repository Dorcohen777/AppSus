const {useRef } = React



export function TextEditor({ onEditSubmit, handleEditChange, currNote, setEditNote }) {

    const panelRef = useRef(null)

    function onExitClick() {
        panelRef.current.style.display = 'none';
    }

    return (
        <div className="editor-panel" ref={panelRef}>
            <button className="btn-exit" onClick={() => onExitClick()}>X</button>
            <form onSubmit={onEditSubmit} className="editor-form">
                <h2>Enter new text</h2>
                <input type="text" name="txt" onChange={handleEditChange} placeholder='enter new text' value={currNote.info.txt} />
                <button>Save</button>
            </form>
        </div>
    )
}