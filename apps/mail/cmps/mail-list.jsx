import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"


const { useState, useEffect } = React

export function MailList() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(setMails)
    }

    function onTrashMail(id) {
        console.log('id TRASH', id)
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

    function onArchiveMail(id) {
        console.log('id ARCHIVE', id)
    }

    function onToggleReadState(id) {
        console.log('id TOGGLE READ STATE', id)
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
                        />)}
                </tbody>
            </table>
        </section>
    )
}
