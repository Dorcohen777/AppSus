import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"


const { useState, useEffect } = React
const { Link } = ReactRouterDOM

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
        if (filterBy.status !== 'trash') mailService.changeMailState(id, { status: 'trash' })
        else {
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
        mailService.changeMailState(id, { status: 'archive' })
    }

    function onToggleReadState(ev, id) {
        ev.preventDefault()
        console.log('id TOGGLE READ STATE', id)
        mailService.changeMailState(id, { status: 'read' })
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
                        />

                    )}
                </tbody>
            </table>
        </section>
    )
}
