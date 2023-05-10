import { MailList } from "../cmps/mail-list.jsx"
import { MailNavSideBar } from "../cmps/mail-nav-side-bar.jsx"

export function MailMain({onAddMail}) {
    return (
        <section className="mail-main">
            <MailNavSideBar onAddMail={onAddMail}/>
            <MailList />
        </section>
    )
}