import { MailList } from "../cmps/mail-list.jsx"

const { useEffect } = React
const { useOutletContext } = ReactRouterDOM

export function MailMainDraft() {
    const [filterBy, setFilterBy] = useOutletContext()

    useEffect(() => {
        setFilterBy({ ...filterBy, status: 'draft' })
    }, [])

    return (
        <MailList filterBy={filterBy} />
    )
}