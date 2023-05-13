import { MailList } from "../cmps/mail-list.jsx"

const { useEffect } = React
const { useOutletContext } = ReactRouterDOM

export function MailMainInbox() {
    const [filterBy, setFilterBy] = useOutletContext()

    useEffect(() => {
        setFilterBy({ ...filterBy, status: 'inbox' })
    }, [])

    return (
        <MailList filterBy={filterBy} />
    )
}