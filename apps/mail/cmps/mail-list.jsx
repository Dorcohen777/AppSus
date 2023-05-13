import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"


const { useState, useEffect } = React

//TODO: need to rethink where mail-list, mail-filter, mail-preview and mail-index will be, and their load order
export function MailList({ filterBy }) {
    const [mails, setMails] = useState(null)
    // const [editFilterBy, setEditFilterBy] = useState()

    useEffect(() => {
        console.log('filterBy from Mail List', filterBy)
        loadMails()
    }, [filterBy])

    useEffect(() => {
        console.log('filterBy from Mail List', filterBy)

    }, [mails])



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
                // reFilterMails()
                // setMails(mail)
            })
            .catch(err => {
                console.log('err Could not save mail', err)
            })
    }

    if (!mails) return <span className="loading-notification">Loading list...</span>
    if (mails.length < 1) return <span className="loading-notification">Empty List</span>
    return (
        <section className="mail-list">
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
