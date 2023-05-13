import { MailList } from "../cmps/mail-list.jsx"

export function MailMainAll() {
    const filterBy = { status: 'any', isStared: 'any' }

    return (
        <MailList filterBy={filterBy} />
    )
}