import { MailList } from "../cmps/mail-list.jsx"

const { useEffect } = React
const { useOutletContext } = ReactRouterDOM

export function MailMainSent() {
    const [filterBy, setFilterBy] = useOutletContext()

    useEffect(() => {
        setFilterBy({ ...filterBy, status: 'sent' })
    }, [])

    return (
        <MailList filterBy={filterBy} />
    )
}