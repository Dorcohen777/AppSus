const { useRef } = React

export function VideoEditor({ onEditSubmit, handleEditChange, currNote, setEditNote }) {

    const panelRef = useRef(null)

    function onExitClick() {
        panelRef.current.style.display = 'none';
    }

    return (
        <section>
            <div className="editor-panel" ref={panelRef}>
                <button className="btn-exit" onClick={() => onExitClick()}>X</button>

                <form onSubmit={onEditSubmit} className="editor-form">

                    <h2>Enter video url</h2>
                    <input type="text" name="videoUrl" onChange={handleEditChange} value={currNote.url} placeholder="enter new url" />

                    <h2>Enter new title</h2>
                    <input type="text" name="videoTitle" onChange={handleEditChange} value={currNote.title} />

                    <button>Save</button>
                </form>
            </div>
        </section>
    )
}