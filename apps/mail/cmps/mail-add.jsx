import { mailService } from "../services/mail.service.js"

const { useState } = React

export function MailAdd({ onCloseAddMail }) {

    const [newMail, setNewMail] = useState(mailService.getEmptyNewMail())

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    const { to, subject, body } = newMail
    return (
        <section className="mail-add-modal">
            <button onClick={onCloseAddMail}>X</button>
            <section>
                <span>New Message</span>
            </section>
            <section>
                <label>To:</label>
                <input></input>
            </section>
            <section>
                <label>Subject:</label>
                <input></input>
            </section>
            <section>
                <label>Content:</label>
                <input></input>
            </section>
            <button>Send</button>
        </section>
    )
}