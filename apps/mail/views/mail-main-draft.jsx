import { MailList } from "../cmps/mail-list.jsx"

export function MailMainDraft() {
    const filterBy = { status: 'draft' }
    
    return (
        <MailList filterBy={filterBy} />
    )
}