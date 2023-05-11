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
        setNewMail(prevBook => ({ ...prevBook, sentAt: Date.now() }))
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
            <button onClick={onCloseAddMail}>X</button>
            <section>
                <h2>New Message</h2>
            </section>
            <section>
                <h3>From: </h3>
                <span>{from}</span>
            </section>
            <section>
                <h3>To: </h3>
                <input type="text" name="to" value={to} onChange={handleChange}></input>
            </section>
            <section>
                <h3>Subject: </h3>
                <input type="text" name="subject" value={subject} onChange={handleChange}></input>
            </section>
            <section>
                <h3>Content: </h3>
                <input type="text" name="body" value={body} onChange={handleChange}></input>
            </section>
            <button onClick={onClickSend}>Send</button>
        </section>
    )
}