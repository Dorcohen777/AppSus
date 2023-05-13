import { MailList } from "../cmps/mail-list.jsx"

export function MailMainStarred() {
    const filterBy = { status: 'any', isStared: true }

    return (
        <MailList filterBy={filterBy} />
    )
}