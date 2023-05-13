import { MailList } from "../cmps/mail-list.jsx"

export function MailMainSent() {
    const filterBy = { 
        status: 'sent', 
        // isStared: 'any'  
    }

    return (
        <MailList filterBy={filterBy} />
    )
}