

import { asyncStorageService } from '../../../services/async-storage.service.js'
import { noteService } from '../services/note.service.js'

export function ChangeColor({ currNoteId, loadNotes }) {

    const colors = ['#F0A6CA', '#A6E6E6', '#F7DDA8', '#C7CEEA', '#F4B6C3', '#E5C9A5', '#C7E2C3', '#E5B3A5']
    
    function onChooceColor(color) {
        
        noteService.get(currNoteId)
            .then((note) => {
                console.log(note)
                const updateNote = { ...note, style: { ...note.style, backgroundColor: color } }
                asyncStorageService.put('notesDB', updateNote)
                    .then(() => loadNotes())
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }
    
    return (
        <section>
            <div className="colors-container">
                {colors.map((color) => {
                    return (<div
                        className="div-color"
                        key={color}
                        style={{ backgroundColor: color }}
                        onClick={() => onChooceColor(color)}
                    >
                    </div>
                    )
                })}
            </div>
        </section >
    )
}