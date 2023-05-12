// note service
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

const NOTES_KEY = 'notesDB'
_createNotes()

export const noteService = {
    query,
    getDefaultFilter,
    createNewNote,
    buildNoteText,
    buildNoteImage,
    buildNoteTodo,
    buildNoteVideo,
    getYoutubeVideoId,
    remove,
    get,
}

function query(filterBy = {}) {
    return asyncStorageService.query(NOTES_KEY)
        .then((notes) => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.type))
            }

            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTES_KEY, noteId)
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || '',
    }
}

function createNewNote(type, newEntity,) {
    console.log('The new entity', newEntity)

    if (type === 'NoteTxt') {
        return asyncStorageService.post(NOTES_KEY, newEntity)
            .then(() => console.log('added new txt'))
            .catch((err) => console.log(err))

    } else if (type === 'NoteImg') {
        return asyncStorageService.post(NOTES_KEY, newEntity)
            .then(() => console.log('added new image'))
            .catch((err) => console.log('failed to add new image', err))

    } else if (type === "NoteVideo") {
        return asyncStorageService.post(NOTES_KEY, newEntity)
            .then(() => console.log('added new video'))
            .catch((err) => console.log('failed to add video', err))
    }
}


// for handing new image when user click add button
function buildNoteImage(txt, imgVal) {
    const imgNote = {
        id: '',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: imgVal,
            title: txt,
        },
        style: {
            backgroundColor: utilService.getRandomColor()
        },
    }
    return imgNote
}

function buildNoteVideo(txt, videoUrl) {
    videoUrl = getYoutubeVideoId(videoUrl)
    const videoNote = {
        id: '',
        type: 'NoteVideo',
        isPinned: false,
        title: txt,
        url: videoUrl
    }
    return videoNote
}
// get only youtube id from url
function getYoutubeVideoId(url) {
    const urlParams = new URLSearchParams(new URL(url).search)
    return urlParams.get('v')
}


// for handing new note when user click add button
function buildNoteText(txtVal) {
    const textNote = {
        id: '',
        createdAt: utilService.getCurrentDate(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: utilService.getRandomColor()
        },
        info: {
            txt: txtVal
        },
    }
    return textNote
}
// for handing new todo when user click add button
function buildNoteTodo(listValue) {

    const todosNote = {
        id: '',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'New list',
            todos: [
                { txt: listValue, doneAt: null },
                { txt: listValue, doneAt: null },
            ]
        },
        style: {
            backgroundColor: '#fff'
        },
    }
    return todosNote

}






















































////////////////////// Private functions //////////////////////

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNoteText(5))
        notes.push(_createNoteImg('amazing nature', 'data:image/jpeg;base64,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'))
        notes.push(_createNoteImg('solving the bug', 'data:image/jpeg;base64,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'))
        notes.push(_createNoteText(20))
        notes.push(_createNoteText(20))
        notes.push(_createNoteVideo("If Programming Was An Anime", "pKO9UjSeLew"))
        notes.push(_createNoteText(70))
        notes.push(_createNoteImg('wow', 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg'))
        storageService.saveToStorage(NOTES_KEY, notes)
    }
}

function _createNoteVideo(txt, url) {
    const videoDemo = {
        id: '',
        type: 'NoteVideo',
        isPinned: false,
        title: txt,
        url: url
    }
    return videoDemo
}

function _createNoteText(amount) {
    const textNote = {
        id: utilService.makeId(),
        createdAt: utilService.getCurrentDate(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: utilService.getRandomColor()
        },
        info: {
            txt: utilService.makeLorem(amount)
        },
    }

    return textNote
}

function _createNoteImg(txt, url) {
    const imgNote = {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: url,
            title: txt,
        },
        style: {
            backgroundColor: utilService.getRandomColor()
        },
    }
    return imgNote
}


function _createNoteTodos() {
    const todosNote = {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: utilService.makeLorem(4),
            todos: [
                { txt: utilService.makeLorem(3), doneAt: null },
                { txt: utilService.makeLorem(3), doneAt: utilService.getRandomFutureTimestamp() }
            ]
        },
        style: {
            backgroundColor: '#fff'
        },
    }
    return todosNote
}





