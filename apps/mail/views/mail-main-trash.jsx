import { MailList } from "../cmps/mail-list.jsx"

export function MailMainTrash() {
    const filterBy = {
        status: 'trash',
        // isStared: 'any'
    }

    return (
        <MailList filterBy={filterBy} />
    )
}