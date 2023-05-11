import { MailList } from "../cmps/mail-list.jsx"

export function MailMainStarred() {
    const filterBy = { status:'starred'}

    return (
        <MailList filterBy={filterBy}/>
    )
}