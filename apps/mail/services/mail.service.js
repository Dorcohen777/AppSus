import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"

const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    get,
    remove,
    save,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
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
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}


//------------PRIVATE FUNCTIONS------------//


function _createMail() {
    return {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
}