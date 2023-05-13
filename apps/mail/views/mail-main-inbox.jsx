import { MailList } from "../cmps/mail-list.jsx"

export function MailMainInbox() {
    const filterBy = { 
        status: 'inbox', 
        // isStared: 'any'  
    }

    return (
        <MailList filterBy={filterBy} />
    )
}