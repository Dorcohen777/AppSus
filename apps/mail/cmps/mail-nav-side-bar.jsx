const { NavLink } = ReactRouterDOM


export function MailNavSideBar({ onAddMail }) {


    return (
        <section className="mail-nav-side-bar">
            <h2>Mail Side Nav Bar Here</h2>
            <section className="btnLook" onClick={onAddMail}>New Mail</section>
            <section className="mail-nav-sidebar-links">
                <NavLink className="btnLook" to="/mail/inbox" >Inbox</NavLink>
                <NavLink className="btnLook" to="/mail/starred" >Starred</NavLink>
                <NavLink className="btnLook" to="/mail/sent" >Sent</NavLink>
                <NavLink className="btnLook" to="/mail/draft" >Draft</NavLink>
                <NavLink className="btnLook" to="/mail/trash" >Trash</NavLink>
            </section>
        </section>
    )
}