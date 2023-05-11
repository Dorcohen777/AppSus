import { MailList } from "../cmps/mail-list.jsx"

export function MailMainInbox() {
    const filterBy = { status:'inbox'}
    
    return (
        <MailList filterBy={filterBy} />
    )
}