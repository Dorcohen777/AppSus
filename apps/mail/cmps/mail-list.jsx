import { MailPreview } from "./mail-preview.jsx";

const { useState, useEffect } = React

export function MailList() {
    const [mails, setMails] = useState([])

    useEffect(() => {

    }, [])

    return (
        <section className="mail-list">
            <h2>Mail list here</h2>
            <table>
                <tbody>
                    <MailPreview mails={mails} />
                </tbody>
            </table>
        </section>
    )
}
