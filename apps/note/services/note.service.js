// note service
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

const NOTES_KEY = 'notesDB'
_createNotes()

export const noteService = {
    query,
    getDefaultFilter,
    
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






function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || '',
    }
}

// Private functions 
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
        createdAt: getCurrentDate(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: getRandomColor()
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
            backgroundColor: getRandomColor()
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
                { txt: utilService.makeLorem(3), doneAt: getRandomFutureTimestamp() }
            ]
        }
    }
    return todosNote
}

// return current date
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1 and pad with a leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Pad with a leading zero if needed
    return `${year}-${month}-${day}`;
}

// return random color
function getRandomColor() {
    const letters = '0123456789ABCDEF'; // Hexadecimal digits
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; // Pick a random digit and append to the color string
    }
    return color;
}

function getRandomFutureTimestamp() {
    const now = Date.now(); // Get the current timestamp
    const maxOffset = 1000 * 60 * 60 * 24 * 365; // Maximum offset of 1 year (in milliseconds)
    const randomOffset = Math.floor(Math.random() * maxOffset); // Generate a random offset between 0 and maxOffset
    const futureTimestamp = now + randomOffset; // Add the offset to the current timestamp to get a future timestamp
    return futureTimestamp;
}




