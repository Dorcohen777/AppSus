import { MailList } from "../cmps/mail-list.jsx"

export function MailMainDraft() {
    const filterBy = { 
        status: 'draft', 
        // isStared: 'any' 
    }

    return (
        <MailList filterBy={filterBy} />
    )
}