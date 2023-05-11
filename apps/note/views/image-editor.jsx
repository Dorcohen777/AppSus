const {useRef } = React



export function ImageEditor({ onEditSubmit, handleEditChange, currNote }) {

    const panelRef = useRef(null)

    function onExitClick() {
        panelRef.current.style.display = 'none';
    }

    return (
        <div className="editor-panel" ref={panelRef}>
            <button className="btn-exit" onClick={() => onExitClick()}>X</button>
            <form onSubmit={onEditSubmit} className="editor-form">
                <h2>Enter new title</h2>
                <input type="text" name="txt" onChange={handleEditChange} value={currNote.info.title} />
                <h2>Enter new url</h2>
                <input type="url" name="url" onChange={handleEditChange} value={currNote.info.url} />
                <button>Save</button>
            </form>
        </div >
    )
}