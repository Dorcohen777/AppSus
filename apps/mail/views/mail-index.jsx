import { MailList } from "../cmps/mail-list.jsx"
import { MailNavSideBar } from "../cmps/mail-nav-side-bar.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"



export function MailIndex() {


    return (
        <section className="mail-index">
            <MailHeader />
            <MailNavSideBar />
            <MailList />
        </section>
    )
}

