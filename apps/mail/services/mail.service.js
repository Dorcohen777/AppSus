import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"
import { storageService } from "../../../services/storage.service.js"

const MAIL_KEY = 'mailDB'


const demoMails = [
    {
        subject: 'Hello',
        body: 'Missed you for a while,',
        txt: 'Missed you for a while, how are you doing these days? hope I can see you again sometimes!',
        status: 'sent',
    },
    {
        subject: 'Congratulations!!',
        body: 'You won 500$!!!',
        txt: 'You won 500$!!! click here to redeem',
        status: 'inbox',
    },
    {
        subject: 'You win!',
        body: 'You won at',
        txt: 'You won at our yearly raffle for a Samsang X51SUPER, to recieve gift please reply to this mail with your credit card details',
        status: 'inbox',
    },
    {
        subject: 'Monthly Password Change',
        body: 'To continue using our services,',
        txt: 'To continue using our services, we require you to periodically change your password every 1st day of the month, at 00:00 UTC+2',
        status: 'inbox',
    },
    {
        subject: 'Facebook',
        body: 'Your email reset',
        txt: 'Your email reset confirmation code has been sent to the phone number you registered on our database. This code will be valid for 4 hours.',
        status: 'inbox',
    },
    {
        subject: 'Instagram',
        body: 'Your have 13 friends in common',
        txt: 'Your have 13 friends in common among you friends, whom you have not befriended yet!!! click here for more info',
        status: 'inbox',
    },
    {
        subject: 'YouTube',
        body: 'You can now choose',
        txt: 'You can now choose your YouTube handle! As a reminder, in most cases, if you already have a personalized URL for your channel, we\'ve reserved this for you as your handle. If you\'re happy with that handle then you\'re all set. If you want a different handle from the one that we reserved, you can change it.',
        status: 'inbox',
    },
    {
        subject: 'Duolingo',
        body: 'Get back into French',
        txt: 'Get back into French today with a quick lesson!  Let\'s learn Japanese today! Even one lesson makes a big difference.',
        status: 'inbox',
    },
    {
        subject: 'Call of Duty',
        body: 'Account Verification Code',
        txt: 'Call of Duty Account Verification Code! An update to your account was requested at 2023-01-21 11:59. To ensure you made this request, we need to verify your email before making any changes.',
        status: 'draft',
    },
    {
        subject: 'YouTube Music Team',
        body: 'Updates to artist channels & related subscriptions!',
        txt: 'Updates to artist channels & related subscriptions!',
        status: 'sent',
    },
    {
        subject: 'Twitter',
        body: 'Account security',
        txt: 'An update on your account security!',
        status: 'inbox',
    },
]

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyNewMail,
    changeMailState,
}


function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {


            return mails.filter(mail => {

                // return mail.status === filterBy.status

                let currFilterStatus = 'any'
                let currFilterIsStared = 'any'
                for (const filterByKey in filterBy) {
                    if (filterByKey === 'status') currFilterStatus = filterBy[filterByKey]
                    if (filterByKey === 'isStared') currFilterIsStared = filterBy[filterByKey]
                }
                // console.log('==================')
                // console.log('mail.status', 'mail.isStarred ->', mail.status, mail.isStared)
                // console.log(`(currFilterStatus === 'any')`, (currFilterStatus === 'any'))
                // console.log('(currFilterStatus === mail.status)', (currFilterStatus === mail.status))
                // console.log(`(currFilterIsStared === 'any')`, (currFilterIsStared === 'any'))
                // console.log('(currFilterIsStared === mail.isStared)', (currFilterIsStared === mail.isStared))
                // console.log('==================')
                return (
                    ((currFilterStatus === 'any') || (currFilterStatus === mail.status)) &&
                    ((currFilterIsStared === 'any') || (currFilterIsStared === mail.isStared))
                )
            }
            )
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


function changeMailState(id, state = {}) {
    console.log('state', state)
    console.log('id', id)
    return get(id)
        .then(prevMail => {
            const editedMail = ({ ...prevMail, ...state, removedAt: (state.status === 'trash') ? Date.now() : null })
            console.log('editedMail', editedMail)
            return save(editedMail)
        })
        .catch(err => {
            console.log('err Could not Get mail', err)
        })
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
            _createMail(demoMails[utilService.getRandomIntInclusive(0, demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0, demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0, demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0, demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0, demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0, demoMails.length - 1)]),
            _createMail(demoMails[utilService.getRandomIntInclusive(0, demoMails.length - 1)]),
        )
        console.log('newMails', newMails)
        storageService.saveToStorage(MAIL_KEY, newMails)
    }
}


function _createMail({ subject, body, status, txt }) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: utilService.getRandomPastTimestamp(),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        status,
        txt,
        isStared: false, // (optional property, if missing: show all)
        // lables: ['important', 'romantic'] // has any of the labels
    }
}