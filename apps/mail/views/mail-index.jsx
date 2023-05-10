import { MailHeader } from "../cmps/mail-header.jsx"
import { MailMain } from "../cmps/mail-main.jsx"


export function MailIndex() {

    return (
        <section className="mail-index">
            <MailHeader />
            <MailMain/>
        </section>
    )
}

