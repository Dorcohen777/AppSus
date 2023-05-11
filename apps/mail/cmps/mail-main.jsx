import { MailList } from "../cmps/mail-list.jsx"
import { MailNavSideBar } from "../cmps/mail-nav-side-bar.jsx"

const { Outlet, Link } = ReactRouterDOM

export function MailMain({ onAddMail }) {
    // const params = useParams()

    //Here, right side of navbar changes, however navbar stays the same
    return (
        <section className="mail-main">
            {/* <MailNavSideBar onAddMail={onAddMail} /> */}

            <section className="mail-nav-side-bar">
                <h2>Mail Side Nav Bar Here</h2>
                <section className="btnLook" onClick={onAddMail}>New Mail</section>
                <section>
                    {/* <article>Inbox</article> */}
                    <Link className="btnLook" to="/mail/inbox" >Inbox</Link>
                    <article>Starred</article>
                    <article>Sent</article>
                    <article>Draft</article>
                    <article>Trash</article>
                </section>
            </section>

            {/* <MailList /> */}
            <section>
                <Outlet />
            </section>
        </section>
    )
}