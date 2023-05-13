import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailAdd({ onCloseAddMail }) {

    const [newMail, setNewMail] = useState(mailService.getEmptyNewMail())

    useEffect(() => {
        if (newMail.sentAt) sendMail()
    }, [newMail])


    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        console.log('[field]: value', [field], value)
        setNewMail(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onClickSend(ev) {
        ev.preventDefault()
        setNewMail(prevBook => ({ ...prevBook, sentAt: Date.now(), status: 'sent' }))
    }

    function sendMail() {
        console.log('newMail', newMail)
        mailService.save(newMail)
            .then('Saved Successfully')
            .catch((err) => {
                console.log('err Failed Saving', err)
            })
            .finally(() => onCloseAddMail())
    }

    const { from, to, subject, body } = newMail
    return (
        <section className="mail-add-modal">
            <button className="mail-btn-exit" onClick={onCloseAddMail}>X</button>
            <section>
                <h2 className="h2-new-message">New Message</h2>
            </section>
            <section>
                <h3 className="h3-css-from">From: </h3>
                <span className="span-from">{from}</span>
            </section>
            <section>
                <h3 className="h3-mail-to">To: </h3>
                <input className="input-mail-to" type="text" name="to" value={to} onChange={handleChange}></input>
            </section>
            <section>
                <h3 className="h3-mail-subject">Subject: </h3>
                <input className="input-mail-subject" type="text" name="subject" value={subject} onChange={handleChange}></input>
            </section>
            <section>
                <h3 className="h3-mail-content">Content: </h3>
                <input className="input-mail-subject" type="text" name="body" value={body} onChange={handleChange}></input>
            </section>
            <button className="btn-send" onClick={onClickSend}>Send</button>
        </section>
    )
}