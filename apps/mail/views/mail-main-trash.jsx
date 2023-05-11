import { MailList } from "../cmps/mail-list.jsx"

export function MailMainTrash() {
    const filterBy = { status:'trash'}

    return (
        <MailList filterBy={filterBy}/>
    )
}