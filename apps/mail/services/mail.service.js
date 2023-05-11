import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from "../../../services/storage.service.js"

const MAIL_KEY = 'mailDB'


const demoMails = [
    {
        subject: 'Hello',
        body: 'Missed you for a while, how are you doing these days? hope I can see you again sometimes!',
    },
    {
        subject: 'Congratulations! You won 500$',
        body: 'You won 500$!!! click here to redeem',
    },
    {
        subject: 'You win!',
        body: 'You won at our yearly raffle for a Samsang X51SUPER, to recieve gift please reply to this mail with your credit card details',
    },
    {
        subject: 'Monthly Password Change',
        body: 'To continue using our services, we require you to periodically change your password every 1st day of the month, at 00:00 UTC+2',
    },
    {
        subject: 'Facebook',
        body: 'Your email reset confirmation code has been sent to the phone number you registered on our database. This code will be valid for 4 hours.',
    },
    {
        subject: 'Instagram',
        body: 'Your have 13 friends in common among you friends, whom you have not befriended yet!!! click here for more info',
    },
    {
        subject: 'YouTube',
        body: 'You can now choose your YouTube handle! As a reminder, in most cases, if you already have a personalized URL for your channel, we\'ve reserved this for you as your handle. If you\'re happy with that handle then you\'re all set. If you want a different handle from the one that we reserved, you can change it.',
    },
    {
        subject: 'Duolingo',
        body: 'Get back into French today with a quick lesson!  Let\'s learn Japanese today! Even one lesson makes a big difference.',
    },
    {
        subject: 'Call of Duty',
        body: 'Call of Duty Account Verification Code! An update to your account was requested at 2023-01-21 11:59. To ensure you made this request, we need to verify your email before making any changes. ',
    },
    {
        subject: 'YouTube Music Team',
        body: 'Updates to artist channels & related subscriptions!',
    },
    {
        subject: 'Twitter',
        body: 'An update on your account security!',
    },
]

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyNewMail,
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


function getEmptyNewMail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
    }
}

//------------PRIVATE FUNCTIONS------------//

function _createMails() {
    const newMails = storageService.loadFromStorage(MAIL_KEY) || []
    if (!newMails || newMails.length < 1) {
        newMails.push(
            _createMail(demoMails[utilService.getRandomIntInclusive(0,demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0,demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0,demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0,demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0,demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0,demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0,demoMails.length - 1)]),
        )
        console.log('newMails', newMails)
        storageService.saveToStorage(MAIL_KEY, newMails)
    }
}


function _createMail({ subject = 'empty', body = 'empty' }) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: utilService.getRandomPastTimestamp(),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
    }
}