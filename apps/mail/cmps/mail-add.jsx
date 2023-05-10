const { useState } = React

export function MailAdd({ onCloseAddMail }) {

    const [newMail, setNewMail] = useState({})


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