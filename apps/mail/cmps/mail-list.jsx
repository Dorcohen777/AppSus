import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"


const { useState, useEffect } = React

//TODO:Make status an array, in order to have a category house multiple statuses
export function MailList({ filterBy }) {
    const [mails, setMails] = useState([])

    useEffect(() => {
        console.log('filterBy', filterBy)
        loadMails()
    }, [])


    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
    }


    function onTrashMail(ev, id) {
        ev.preventDefault()
        console.log('id TRASH', id)
        if (filterBy.status !== 'trash') {
            mailService.changeMailState(id, { status: 'trash' })
                .then(mail => {
                    console.log('edited mail', mail)
                    loadMails()
                })
                .catch(err => {
                    console.log('err Could not save mail', err)
                })
        } else {
            mailService.remove(id)
                .then(() => {
                    console.log('Success Trashing Mail')
                    const updatedMails = mails.filter(mail => id !== mail.id)
                    setMails(updatedMails)
                })
                .catch((err) => {
                    console.log('Error Trashing Mail', err)
                })
        }
    }

    function onArchiveMail(ev, id) {
        ev.preventDefault()
        console.log('id ARCHIVE', id)
        if (filterBy.status === 'archive') {
            mailService.changeMailState(id, { status: 'inbox' })
                .then(mail => {
                    console.log('edited mail', mail)
                    loadMails()
                })
                .catch(err => {
                    console.log('err Could not save mail', err)
                })
        } else {
            mailService.changeMailState(id, { status: 'archive' })
                .then(mail => {
                    console.log('edited mail', mail)
                    loadMails()
                })
                .catch(err => {
                    console.log('err Could not save mail', err)
                })
        }
    }

    function onToggleReadState(ev, id, isRead) {
        ev.preventDefault()
        console.log('id TOGGLE READ STATE', id)
        mailService.changeMailState(id, { isRead: isRead })
            .then(mail => {
                console.log('edited mail', mail)
                loadMails()
            })
            .catch(err => {
                console.log('err Could not save mail', err)
            })
    }

    function onStarMail(ev, id, isStared) {
        ev.preventDefault()
        mailService.changeMailState(id, { isStared: isStared })
            .then(mail => {
                console.log('edited mail', mail)
                loadMails()
            })
            .catch(err => {
                console.log('err Could not save mail', err)
            })
    }

    return (
        <section className="mail-list">
            <h2>Mail list here</h2>
            <table className="mail-table">
                <tbody>
                    {mails.map((mail) =>
                        <MailPreview
                            key={`${mail.id}`}
                            mail={mail}
                            onTrashMail={onTrashMail}
                            onArchiveMail={onArchiveMail}
                            onToggleReadState={onToggleReadState}
                            onStarMail={onStarMail}
                        />
                    )}
                </tbody>
            </table>
        </section>
    )
}
