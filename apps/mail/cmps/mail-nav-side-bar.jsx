const { NavLink } = ReactRouterDOM

export function MailNavSideBar({ onAddMail }) {

    return (
        <section className="mail-nav-side-bar">
            <section className="btnLook btnNewMail" onClick={onAddMail}>New Mail</section>
            <section className="mail-nav-sidebar-links">
                <NavLink className="btnLook" to="/mail/inbox" >Inbox</NavLink>
                <NavLink className="btnLook" to="/mail/starred" >Starred</NavLink>
                <NavLink className="btnLook" to="/mail/all">All</NavLink>
                <NavLink className="btnLook" to="/mail/sent" >Sent</NavLink>
                <NavLink className="btnLook" to="/mail/draft" >Draft</NavLink>
                <NavLink className="btnLook" to="/mail/trash" >Trash</NavLink>
            </section>
        </section>
    )
}