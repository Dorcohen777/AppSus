import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from "../../../services/storage.service.js"

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
}





function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            // if (filterBy.name) {
            //     console.log('mails', mails)
            //     const regExp = new RegExp(filterBy.name, 'i')
            //     mails = mails.filter(mail => regExp.test(mail.title))
            // }

            // if (filterBy.price) {
            //     mails = mails.filter(mail => mail.listPrice.amount >= filterBy.price)
            // }
            return mails
        })
}

function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}


//------------PRIVATE FUNCTIONS------------//

function _createMails() {
    const newMails = storageService.loadFromStorage(MAIL_KEY) || []
    if (!newMails || newMails.length < 1) {
        newMails.push(_createMail(), _createMail(), _createMail())
        console.log('newMails', newMails)
        storageService.saveToStorage(MAIL_KEY, newMails)
    }
}


function _createMail() {
    return {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: utilService.getRandomPastTimestamp(),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
    }
}