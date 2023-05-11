import { MailList } from "../cmps/mail-list.jsx"

export function MailMainSent() {
    const filterBy = { status:'sent'}
    
    return (
        <MailList filterBy={filterBy}/>
    )
}