const { NavLink } = ReactRouterDOM

export function MailNavSideBar({ onAddMail }) {

    return (
        <section className="mail-nav-side-bar">
            <section className="btnLook btnNewMail" onClick={onAddMail}>New Mail</section>
            <section className="mail-nav-sidebar-links">
                <NavLink className="btnLook" to="/mail/inbox" ><i className="fa-regular fa-envelope"></i> Inbox </NavLink>
                <NavLink className="btnLook" to="/mail/starred" ><i className="fa-regular fa-star"></i> Starred </NavLink>
                <NavLink className="btnLook" to="/mail/all"><i className="fa-regular fa-folder"></i> All </NavLink>
                <NavLink className="btnLook" to="/mail/sent" ><i className="fa-regular fa-circle-right"></i> Sent </NavLink>
                <NavLink className="btnLook" to="/mail/draft" ><i className="fa-regular fa-file"></i> Draft </NavLink>
                <NavLink className="btnLook" to="/mail/trash" ><i className="fa-regular fa-trash-can"></i> Trash </NavLink>
            </section>
        </section>
    )
}