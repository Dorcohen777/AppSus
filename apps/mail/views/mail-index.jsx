import { MailList } from "../cmps/mail-list.jsx"
import { MailNavSideBar } from "../cmps/mail-nav-side-bar.jsx"

export function MailIndex() {


    return (
        <section className="mail-index">
            <h1>Hello Mail App</h1>
            <section>
                <MailNavSideBar />
                <MailList />
            </section>
        </section>
    )
}

