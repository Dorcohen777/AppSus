const { useEffect, useState } = React

import { TextEditor } from './text-editor.jsx'
import { ImageEditor } from './image-editor.jsx'
import { VideoEditor } from './video-editor.jsx'

import { noteService } from '../services/note.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'


export function EditNote({ currNoteId, loadNotes }) {

    const [currNote, setCurrNote] = useState(null)
    const [noteType, setNoteType] = useState('')

    const [newTxt, setNewTxt] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const [newVideoUrl, setNewVideoUrl] = useState('')
    const [newVideoTitle, setVideoTitle] = useState('')

    useEffect(() => {
        findNote()

    }, [])

    function handleEditChange({ target }) {

        if (target.name === 'txt') {
            setNewTxt(target.value)
            if (noteType === 'NoteTxt') {
                setCurrNote(prevNote => ({
                    ...prevNote,
                    info: {
                        ...prevNote.info,
                        txt: target.value // use the updated value directly
                    }
                }))
            } else if (noteType === 'NoteImg') {
                setCurrNote(prevNote => ({
                    ...prevNote,
                    info: {
                        ...prevNote.info,
                        title: target.value // use the updated value directly
                    }
                }))
            }
        }

        // // start of video note editing
        // if (target.name === 'videoUrl') {
        //     setNewVideoUrl(target.value)
        //     setCurrNote(prevNote => ({
        //         ...prevNote,
        //         url: noteService.getYoutubeVideoId(target.value),
        //     }))
        // } else if (target.name = 'videoTitle') {
        //     setVideoTitle(target.value)
        //     setCurrNote(prevNote => ({
        //         ...prevNote,
        //         title: target.value
        //     }))
        // }
        // end of video note editing

        // start of image note editing
        if (target.name === 'url') {
            setNewUrl(target.value)
            if (noteType === 'NoteImg') {
                setCurrNote(prevNote => ({
                    ...prevNote,
                    info: {
                        ...prevNote.info,
                        url: target.value // use the updated value directly
                    }
                }))
            }
        }

    }

    function onEditSubmit(ev) {
        ev.preventDefault()
        onDoneEdit()
    }

    function onDoneEdit() {
        asyncStorageService.put('notesDB', currNote)
            .then(() => {
                console.log('Updated note')
                loadNotes()
            })
            .catch((err) => console.log('failed to edit note', err))

    }

    function findNote() {
        noteService.get(currNoteId)
            .then((note) => {
                console.log('from findNote', note)
                setCurrNote(note)
                setNoteType(note.type)
                console.log('noteType is:', noteType)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {noteType === 'NoteTxt' &&
                <TextEditor onEditSubmit={onEditSubmit} handleEditChange={handleEditChange} currNote={currNote} />
            }
            {noteType === 'NoteImg' &&
                <ImageEditor onEditSubmit={onEditSubmit} handleEditChange={handleEditChange} currNote={currNote} />
            }
            {noteType === 'NoteVideo' &&
                <VideoEditor onEditSubmit={onEditSubmit} handleEditChange={handleEditChange} currNote={currNote} />
            }
        </div>
    )

}