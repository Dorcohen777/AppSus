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

function createNewNote(value, type, newEntity, valueUrl) {
    console.log('from service', value, type)

    if (type === 'NoteTxt') {
        // let newText = buildNoteText(value)
        asyncStorageService.post(NOTES_KEY, newEntity)
            .then(() => console.log('added new note'))
            .catch((err) => console.log(err))
    } else if (type === 'NoteImg') {
        // let newImg = buildNoteImage(value, valueUrl)
        asyncStorageService.post(NOTES_KEY, newEntity)
            .then(() => console.log('added new image'))
            .catch((err) => console.log('failed to add new image', err))
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
        notes.push(_createNoteText())
        notes.push(_createNoteTodos())
        notes.push(_createNoteImg())
        notes.push(_createNoteText())
        notes.push(_createNoteText())
        notes.push(_createNoteText())
        notes.push(_createNoteImg())

        storageService.saveToStorage(NOTES_KEY, notes)
    }
}

function _createNoteText() {
    const textNote = {
        id: utilService.makeId(),
        createdAt: utilService.getCurrentDate(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: utilService.getRandomColor()
        },
        info: {
            txt: utilService.makeLorem(5)
        },
    }

    return textNote
}

function _createNoteImg() {
    const imgNote = {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/200/300',
            title: utilService.makeLorem(3),
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
            backgroundColor: 'white'
        },
    }
    return todosNote
}





